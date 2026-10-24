import Vue from 'vue'
import ValidateDialog from './index.vue'
let dialogInstance = null

// 处理参数生成表格数据
async function handleParams(forms, lengthInfo) {
  if (
    (!forms || forms?.length < 1) &&
    (!lengthInfo || lengthInfo?.length < 1)
  ) {
    console.error('未传入需要校验的表格和长度')
    return []
  }
  const promiseResults = await Promise.allSettled(
    forms?.map(async form => await form.formEntity.validate()) || []
  )
  console.log('🚀 ~ handleParams ~ promiseResults:', promiseResults)
  const tableData = []

  // 需要校验长度
  lengthInfo?.forEach((lengthItem, index) => {
    if (lengthItem.lengths !== 0) return
    const [position, tabName] = lengthItem.positionInfo.split('__')
    tableData.push({
      position,
      tabName,
      fieldName: '----',
      descriptions: `至少需要添加一条${position}`
    })
  })

  forms?.forEach((form, index) => {
    if (promiseResults[index].status !== 'rejected') return
    // 使用 split 方法按 '__' 分割字符串
    const [position, tabName] = form.positionInfo.split('__')

    // 获取所有未通过验证的字段
    form.formEntity?.fields.forEach(field => {
      if (field.validateState === 'error') {
        if (field.$el.closest('.el-table__fixed-body-wrapper')) return
        let label
        if (field.label?.endsWith(':') || field.label?.endsWith('：')) {
          label = field.label.slice(0, -1)
        } else {
          label = field.label
        }
        if (label === undefined) {
          try {
            const prop = field.prop.replace(/.*\.(.*)$/, (m, v) => v)
            // 支持u-table
            ;(
              field.$parent._props?.columns ||
              field.$parent?.columns ||
              field.$parent.$parent._props?.columns
            ).forEach(item => {
              if (item.property === prop) {
                label = item.label
              }
            })
          } catch (e) {
            console.log('label err ->', e)
          }
        }
        tableData.push({
          position,
          tabName,
          fieldName: label,
          descriptions:
            field.validateMessage === '请输入'
              ? `单据基本信息“${label}”是必填项`
              : field.validateMessage,
          dom: field.$el
        })
      }
    })
  })
  return tableData
}

const init = () => {
  const TipsDialogConstructor = Vue.extend(ValidateDialog)
  // 构造函数可以传参，data，method
  dialogInstance = new TipsDialogConstructor({})
  dialogInstance.$mount()
  document.body.appendChild(dialogInstance.$el)
}

const caller = async options => {
  return new Promise((resolve, reject) => {
    handleParams(options.forms, options.lengthInfo)
      .then(res => {
        if (res?.length > 0) {
          if (!dialogInstance) {
            init()
          }
          dialogInstance.getParams({ ...options, tableData: res })
          resolve(false)
        } else resolve(true)
      })
      .catch(e => {
        console.error(e)
      })
  })
}
export default {
  install(Vue, opts = {}) {
    Vue.prototype.$validateDialog = caller
  }
}
