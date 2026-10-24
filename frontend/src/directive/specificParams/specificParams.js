/*
 * @Author: your name
 * @Date: 2021-09-17 15:16:55
 * @LastEditTime: 2023-02-21 18:59:25
 * @LastEditors: chenzejie
 * @Description: In User Settings Edit
 * @FilePath: \master\src\directive\permission\permission.js
 */
import store from '@/store'

function checkSpecificParams(el, binding) {
  const showSpecificParams = store.getters && store.getters.showSpecificParams
  !showSpecificParams && el.parentNode && el.parentNode.removeChild(el)
}

export default {
  inserted(el, binding) {
    checkSpecificParams(el, binding)
  },
  update(el, binding) {
    checkSpecificParams(el, binding)
  }
}
