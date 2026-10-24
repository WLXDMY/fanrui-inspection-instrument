import { checkSerialCode } from '@/api/quality-manage'
import { Notification } from 'element-ui'
// 流水码检验封装
export async function checkSerialCodeList(serialCodeList, originalQuantity) {
  const serialCodeStatus = await checkSerialCode()
  if (serialCodeStatus.data.code === '200') {
    const { firstItemBindSerialCodeFlag } = serialCodeStatus.data.data
    if (firstItemBindSerialCodeFlag) {
      // 流水码不能为空
      if (!serialCodeList || !serialCodeList.length) {
        Notification.error({
          title: '错误',
          message: '流水码不能为空'
        })
        return false
      }
      // 校验流水码是否有重复
      if (serialCodeList.length !== [...new Set(serialCodeList)].length) {
        Notification.error({
          title: '错误',
          message: '产品流水码重复!请检查后再提交'
        })
        return false
      }
      console.log('数量 -> ', serialCodeList.length, originalQuantity)
      // 流水码必须等于送检数量
      if (serialCodeList.length !== Number(originalQuantity)) {
        Notification.error({
          title: '错误',
          message: '流水码个数与送检数量不符,请检查后再提交'
        })
        return false
      }
    } else {
      console.log('流水码检验配置未开启 -> ')
    }

    return true
  }
}
