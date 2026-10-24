/*
 * @Author: zhaozhuo
 * @Date: 2022-01-04 16:03:14
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-05-29 14:50:33
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import qualitiesManage from './modules/qualitiesManage'
import qualityManagement from '@quality-management-routes'
// import commonTabRoutes from './modules/commonTabRoutes'
import constant from '@constant-routes'
import commonLayoutRoutes from '@common-layout-routes'
// export const asyncRoutes = [qualitiesManage, qualityManagement]
export const asyncRoutes = [qualityManagement, commonLayoutRoutes]

export const constantRoutes = [...constant]
const isStandaloneUpload = process.env.VUE_APP_STANDALONE_UPLOAD === 'true'
const createRouter = () =>
  new Router({
    mode: isStandaloneUpload ? 'hash' : 'history',
    base: isStandaloneUpload ? '/' : '/genieos/qms3.0',
    routes: []
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
