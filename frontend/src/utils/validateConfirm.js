/*
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-06-24 14:27:39
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-09-18 15:06:36
 * @Description:
 */
import { MessageBox } from 'element-ui'

/**
 * 根据表单对象，弹出提示框，提示用户未填写的必选项。
 *
 * @param {object} form - 表单对象。
 * @return {void}
 */
export default function showValidationErrors(form) {
  if (!form || typeof form !== 'object') {
    return
  }
  // 获取所有未通过验证的字段
  const invalidFields = form?.fields.map(field => {
    if (field.validateState === 'error') {
      let label
      if (field.label?.endsWith(':') || field.label?.endsWith('：')) {
        label = field.label.slice(0, -1)
      } else {
        label = field.label
      }
      // 如果没有获取到 label，尝试从 prop 中获取
      // 一般来说无法获取到 label 的原因是因为新增或者编辑菜单中存在
      // *物料信息* 表的校验,这种表比较特殊,没有设置 label,所以需要
      // 从 prop 中获取
      if (label === undefined) {
        try {
          const prop = field.prop.replace(/.*\.(.*)$/, (m, v) => v)
          field.$parent._props.columns.forEach(item => {
            if (item.property === prop) {
              label = item.label
            }
          })
        } catch (e) {
          console.log('label err ->', e)
        }
      }
      return label ? `<strong><i style="color: red">${label}</i></strong>` : ''
    }
  }).filter(e => e)

  if (!invalidFields.length) {
    return
  }
  // 弹出提示框，提示用户未填写的必选项
  MessageBox.confirm(
    `无法保存,存在必选项为空,请补充后再保存!以下必选项为空:
      ${[...new Set(invalidFields)].join(', ')}
    `, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,
      type: 'warning'
    })
}

