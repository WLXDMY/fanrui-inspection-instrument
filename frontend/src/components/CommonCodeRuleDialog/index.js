/*
 * @Author: youjuan.hu
 * @Date: 2022-11-25 12:28:07
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-12-12 14:42:47
 * @Description: 编码规则组件全局注册
 */
import CommonCodeRuleDialog from './index.vue'
const CommonCodeRule = {
  install: function(Vue) {
    Vue.component('common-code-rule-dialog', CommonCodeRuleDialog)
  }
}

// 导出组件
export default CommonCodeRule
