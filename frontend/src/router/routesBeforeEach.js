/*
 * @Author: zhaozhuo
 * @Date: 2022-08-11 10:22:38
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-01-23 16:06:41
 * @Description: ...
 */
import Vue from 'vue'
import router from '@/router/index.js'
import store from '@/store'
import { getToken } from '@/utils/auth' // get token from cookie
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { jingZhiPushDownRouterHandler } from '@/utils/jingzhiPushDown.js'

NProgress.configure({ showSpinner: false })

const subAppRoutes = ['/screen/', '/backstage/']
// 判断路径是否存在子路由
const isExistSubRoutes = path => {
  // 遍历子路由数组，判断路径是否以子路由开头
  return subAppRoutes.some(route => path.startsWith(route))
}

router.beforeEach(async(to, from, next) => {
  // 全面精制化, 下推时需要判断路由是否是下推路由
  jingZhiPushDownRouterHandler()

  // const ischangeRoute = jingZhiPushDownRouterHandler(router)
  // if (ischangeRoute) {
  //   // next()
  //   return
  // }
  if (isExistSubRoutes(to.path)) {
    return
  }
  // NProgress.start()
  const token = getToken()
  const isLocalSourcePreview = process.env.VUE_APP_LOCAL_SOURCE_PREVIEW === 'true'
  if (token || isLocalSourcePreview) {
    // 是否存在路由
    const front_routes = store.getters.front_routes
    const routes = router.getRoutes()
    // console.log(routes, 'routes')
    const isExistRoutes = routes.length > 0
    if (isExistRoutes) {
      if (to.path !== '/') {
        next()
        if (window.__POWERED_BY_QIANKUN__) {
          const matched = to.matched.filter(item => item.meta && item.meta.title)
          const levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
          const list = levelList.map(item => {
            return {
              path: item.path,
              meta: item.meta,
              redirect: item.redirect
            }
          })
          Vue.prototype.$parentProps.setGlobalState({ RouteMatched: list })
        }
      } else {
        next({ ...to, path: front_routes[0].path })
      }
    } else {
      const accessRoutes = await store.dispatch('permission/generateRoutes')
      router.addRoutes(accessRoutes)
      next({ ...to })
    }
  } else {
    if (window.__POWERED_BY_QIANKUN__) {
      Vue.prototype.$parentProps.setGlobalState({ name: 'login' })
    } else {
      await store.dispatch('user/getUserInfo')
      next({ ...to, replace: true })
    }
  }
})

router.afterEach(() => {
  // NProgress.done()
})

router.onError(error => {
  const pattern = /Loading chunk ([\w-\d])+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    window.location.reload()
  }
})
