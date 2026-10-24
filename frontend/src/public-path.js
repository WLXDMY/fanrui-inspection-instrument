/*
 * @Author: zhaozhuo
 * @Date: 2022-10-18 10:42:33
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @LastEditTime: 2023-02-25 20:43:49
 * @Description: ...
 */
import Popper from 'element-ui/lib/utils/vue-popper'

/* eslint-disable no-undef */
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  console.log(__webpack_public_path__)
}

// 处理气泡未删除问题
if (window.__MICRO_APP_ENVIRONMENT__) {
  const rawPopperBeforeDestroy = Popper.beforeDestroy
  Popper.beforeDestroy = function() {
    rawPopperBeforeDestroy.apply(this, arguments)
    const microAppBody = document.querySelector(`micro-app[name="${window.__MICRO_APP_NAME__}"] micro-app-body`)
    if (this.popperElm && this.popperElm.parentNode === microAppBody) {
      this.popperElm.removeEventListener('click', stop)
      document.body.removeChild(this.popperElm)
    }
  }
}
