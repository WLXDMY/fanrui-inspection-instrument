/*
 * @Author: zhaozhuo
 * @Date: 2021-12-31 18:24:13
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-10-09 15:09:51
 * @Description:
 */
import { getToken } from '@/utils/auth'

const getters = {
  // global
  authList: state => {
    return state.permission?.authList
  },
  // 是否全局开启物料特征参数
  showSpecificParams: state => {
    return state.permission?.showSpecificParams
  },
  userInfo: state => {
    return state.permission?.userInfo
  },
  avatar: state => {
    return state.permission?.userInfo?.headerUrl
  },

  // permission
  front_routes: state => state.permission.frontRoutes,
  permission_routes: state => state.permission.routes,

  // tagsView
  currentCarousel: state => state.tagsView.currentCarousel,

  // app
  sidebar: state => state.app.sidebar,

  // user
  token: state => {
    return state.user.token || getToken()
  },
  gunter: state => state.tagsView.gunter,

  // customized
  componentNameList: state => state.customized.componentNameList,

  redirectPath: state => state.settings.redirectPath,

  currentSystem: state => state.settings.currentSystem,

  printDpi: state => state.settings.printDpi,
  routeInfo: state => state.permission.routeInfo,
  fieldRuleDetail: state => state.fieldsConfig.fieldRuleDetail
}
export default getters
