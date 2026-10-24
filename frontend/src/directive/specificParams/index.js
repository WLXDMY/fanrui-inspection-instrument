/*
 * @Author: chenzejie
 * @Date: 2023-02-14 12:00:28
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-02-14 14:20:19
 * @Description:
 */
import specificParams from './specificParams'

const install = function(Vue) {
  Vue.directive('specificParams', specificParams)
}

if (window.Vue) {
  window['specificParams'] = specificParams
  Vue.use(install); // eslint-disable-line
}

specificParams.install = install
export default specificParams
