import { MessageBox } from 'element-ui'
import {
  getInspectNumberCheckConfig,
  checkInspectNumber
} from '@/api/quality-manage'

const status = Object.freeze({
  ERR: 0,
  CONTINUE: 1,
  BREAK: 2
})

function to(promise) {
  // 如果不是 promise 就返回自身
  if (!promise.then) return promise
  // 核心代码
  return promise
    .then(data => {
      return [null, data]
    })
    .catch(err => [err])
}

function verifyFn(forcedCheck = false, message) {
  return new Promise((resolve) => {
    MessageBox.confirm(
      message || `单据的当前送检数量和历史送检数量，超过计划数量${forcedCheck ? ', 不允许提交' : ''}`, '提示', {
        confirmButtonText: '确认提交',
        cancelButtonText: '取消',
        showClose: false, // 是否显示右上角的关闭按钮（true）
        showConfirmButton: !forcedCheck, // 是否显示确定按钮（true）
        closeOnClickModal: false, // 是否可以通过点击 modal 关闭 MessageBox（false）
        type: 'warning'
      }).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}

// 获取送检数量校验配置
function getConfig() {
  return new Promise((resolve, reject) => {
    getInspectNumberCheckConfig().then(res => {
      if (res.data.code === '200') {
        const { inspectNumEnable, inspectNumParity } = res.data.data
        // 1. inspectNumEnable 表示送检数量检验是否启用, true: 启用, false:关闭
        // 如果启用,调用接口 checkInspectNumber 去校验送检数量
        // 2. 在 1 的基础上,如果启用,需要判断 inspectNumParity 的返回值, 1: 校验提醒, 2: 强制校验
        resolve({
          enable: inspectNumEnable,
          force: inspectNumParity !== 1
        })
      } else {
        reject(res.data.message)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
// 校验送检数量
/**
 * @param {{workOrderId: number, materialBatchList: array, inspectNum: number, inspectionSheetType: number, inspectionSheetId?: number}} params
*/
function getCheck(params) {
  return new Promise((resolve, reject) => {
    checkInspectNumber(params).then(res => {
      console.log('查询数据 -> ', res)
      if (res.data.code === '200') {
        const { checkLimit, checkPrompt, inspectNumOver } = res.data.data
        resolve({
          isOver: inspectNumOver,
          forceMessage: checkLimit,
          tipMessage: checkPrompt
        })
      } else {
        reject(res.data.message)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

// 做校验
/**
 * 返回值 分别为 0, 1 和 2,其中:
 * @desc 0 (ERR)表示接口错误
 * @desc 1 (CONTINUE)表示允许提交订单
 * @desc 2 (BREAK)表示不允许提交订单
 * @param {{workOrderNumber: string, materialBatchList: array, inspectNum: number, inspectionSheetType: number, inspectionSheetId?: number}} params
 * @returns Promise<0|1|2>
 */
export default async function handleInspectNumberCheck(params) {
  const [configErr, configData] = await to(getConfig())
  if (configErr) return status.ERR
  const { enable, force } = configData
  console.log('获取校验配置数据 -> ', configData)

  // 校验没开, 希望保存数据的进程继续
  if (!enable) return status.CONTINUE

  // 查询校验接口
  const [verifyErr, verifyData] = await to(getCheck(params))

  // 校验接口出错
  if (verifyErr) return status.ERR

  // 校验接口数据
  const { isOver, forceMessage, tipMessage } = verifyData
  // 数量没有超出, 希望保存数据的进程继续
  // console.log('是否超出 -> ', isOver)
  if (!isOver) return status.CONTINUE

  // 强制校验
  if (force) {
    await verifyFn(true, forceMessage)
    // 这里希望打断保存数据的进程
    return status.BREAK
  } else {
    // 仅提示
    const isSubmit = await verifyFn(false, tipMessage)
    // 点确定则继续提交数据
    if (isSubmit) {
      return status.CONTINUE
    }

    // 点取消则不要走下面的流程
    return status.BREAK
  }
}
