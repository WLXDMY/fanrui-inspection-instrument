/*
 * 本文件只存在于 17_检验仪器APP 的源码副本中。
 * 正式环境由精制主应用向 QMS 微前端注入路由与按钮权限；本地独立运行时，
 * 用同一套原始路由和页面组件补齐这部分宿主上下文。
 */
import router, { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

const instrumentActions = [
  'qms-product-inspection.inspection-manage.instrument:add',
  'qms-product-inspection.inspection-manage.instrument:batchUpdate',
  'qms-product-inspection.inspection-manage.instrument:update',
  'qms-product-inspection.inspection-manage.instrument:select',
  'qms-product-inspection.inspection-manage.instrument:delete',
  'qms-product-inspection.inspection-manage.instrument:columnConfigList'
]

const instrumentRoutePaths = new Set([
  '/inspection-manage/qms-product-inspection/instrument',
  '/inspection-manage/qms-product-inspection/instrument/add',
  '/inspection-manage/qms-product-inspection/instrument/detail',
  '/inspection-manage/qms-product-inspection/instrument/edit',
  '/inspection-manage/qms-product-inspection/instrument-classify'
])

function getInstrumentOnlyRoutes() {
  const qualityManagementRoute = asyncRoutes.find(route => route.path === '/inspection-manage')
  if (!qualityManagementRoute) return []

  return [{
    ...qualityManagementRoute,
    children: qualityManagementRoute.children.filter(route => instrumentRoutePaths.has(route.path))
  }]
}

export function installLocalSourcePreview() {
  if (process.env.VUE_APP_LOCAL_SOURCE_PREVIEW !== 'true') return

  const instrumentOnlyRoutes = getInstrumentOnlyRoutes()
  const routes = [
    {
      path: '/',
      redirect: '/inspection-manage/qms-product-inspection/instrument'
    },
    ...instrumentOnlyRoutes,
    ...constantRoutes
  ]
  const authList = instrumentActions.map(path => ({ path }))

  store.commit('permission/SET_AUTHLIST', authList)
  store.commit('permission/FRONT_ROUTES', instrumentOnlyRoutes)
  store.commit('permission/SET_ROUTES', instrumentOnlyRoutes)
  router.addRoutes(routes)
}
