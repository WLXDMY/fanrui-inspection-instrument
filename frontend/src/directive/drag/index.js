/*
 * @Author: youjuan.hu
 * @Date: 2023-02-03 17:35:01
 * @LastEditors: youjuan.hu
 * @LastEditTime: 2023-02-03 17:42:20
 * @Description: 拖拽缩放 用于弹框
 */
import drag from './drag'

const install = function(Vue) {
  Vue.directive('drag', drag)
}

if (window.Vue) {
  window['drag'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
