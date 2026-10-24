/*
 * @Author: zhaozhuo
 * @Date: 2021-12-31 18:18:18
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-07-30 10:56:28
 * @Description:
 */

import { asyncRoutes, constantRoutes } from '@/router'
import { backAsyncRoutes, backConstantRoutes } from '@/router/backstageManagement.js'
import { getUserAuth, getInfo, getSpecificParams, getRouteInfoList } from '@/api/user'

/**
 * @param {Array} list 后端权限数据
 * @param {*} route 本地路由
 */
function hasPermission2(list, route) {
  if (route.path) {
    return list.some(el => route.path === el.path || route.hidden)
  } else {
    return true
  }
}
/**
 * 设置路由重定向
 * @param {*} routes
 * @returns
 */
export function loadRedirect(routes) {
  const res = []
  routes.forEach(el => {
    if (!el.redirect) {
      if (el.children) {
        el.children = loadRedirect(el.children)
        if (el.children.length !== 0) {
          const notHiddenPath = el.children.find(route => !route.hidden)
          notHiddenPath && (el.redirect = notHiddenPath.path)
        }
      }
    }
    res.push(el)
  })
  return res
}

/**
 * 根据权限列表匹配路由列表
 * @param {*} routes
 * @param {*} list
 * @returns
 */
export function filterAsyncRoutes2(routes, list) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission2(list, tmp)) {
      if (tmp.children) {
        if (tmp.children.filter(el => !el.hidden).length !== 1) {
          tmp.children = filterAsyncRoutes2(tmp.children, list)
        }
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  // 菜单路由
  routes: [],
  // 按钮权限
  authList: [],
  // 前台路由
  frontRoutes: [],
  authListData: [],
  userInfo: {},
  showSpecificParams: false,
  routeInfo: [] // 接口返回的全路由
}

const mutations = {
  SET_ROUTE_INFO: (state, routes) => {
    state.routeInfo = routes
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_AUTHLIST: (state, authList) => {
    state.authList = authList
  },
  FRONT_ROUTES: (state, routes) => {
    state.frontRoutes = routes
  },
  SET_AUTH_LIST_DATA: (state, routes) => {
    state.authListData = routes
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_SHOWSPECIFICPARAMS: (state, showSpecificParams) => {
    state.showSpecificParams = showSpecificParams
  }
}

const actions = {
  generateRoutes({ commit }, data) {
    return Promise.allSettled([
      getInfo({}),
      getUserAuth(),
      getSpecificParams({ fullPathCode: 'material.materialSkuConfig' }),
      getRouteInfoList()
    ]).then(resArr => {
      const { data: routeInfo } = resArr[3]?.value.data
      const userInfoData = resArr[0]?.value?.data?.data
      let authListData = resArr[1].value.data.data
      const showSpecificParams = resArr[2].value?.data.data?.enable || false
      if (!showSpecificParams) {
        // 去除物料特征参数菜单栏
        authListData = authListData.filter(item => item.path !== '/product-management/auxiliary-attr')
      }
      const authList = authListData.filter(el => el.path.indexOf('/') === -1)

      const { type } = data || {}
      const currentSystem = sessionStorage.getItem('currentSystem') || type
      const myRoute =
        currentSystem !== 'back'
          ? authListData.filter(el => el.path.indexOf('/') !== -1 && !el.isBackStage)
          : authListData.filter(el => el.path.indexOf('/') !== -1 && el.isBackStage)
      // 合并路由
      const allRoute = asyncRoutes.concat(backAsyncRoutes)
      // 权限列表
      const accessedRoutes = loadRedirect(filterAsyncRoutes2(allRoute, authListData))
      // 判断是配置中心路由还是控制台路由
      const setRoute = loadRedirect(filterAsyncRoutes2(allRoute, myRoute))
      commit('SET_ROUTE_INFO', routeInfo)
      commit('SET_AUTH_LIST_DATA', authListData)
      commit('SET_AUTHLIST', authList)
      commit('FRONT_ROUTES', asyncRoutes)
      commit('SET_ROUTES', setRoute)

      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfoData))
      // commit('global/SET_USERINFO', userInfoData, { root: true })
      // commit('global/SET_AUTHLIST', authListData, { root: true })
      // commit('global/SET_SHOWSPECIFICPARAMS', showSpecificParams, {
      //   root: true
      // })
      commit('SET_USERINFO', userInfoData)
      commit('SET_SHOWSPECIFICPARAMS', showSpecificParams)

      const tem = currentSystem === 'back' ? backConstantRoutes : constantRoutes
      return [...accessedRoutes, ...tem]
    })
  },
  switchRoute({ commit, state }, data) {
    const { authList, authListData } = state
    const myRoute =
      data?.type !== 'back'
        ? authListData.filter(el => el.path.indexOf('/') !== -1 && !el.isBackStage)
        : authListData.filter(el => el.path.indexOf('/') !== -1 && el.isBackStage)
    // 合并路由
    const allRoute = asyncRoutes.concat(backAsyncRoutes)
    // const allRoute = data?.type !=='back' ? asyncRoutes : backAsyncRoutes
    // 权限列表
    const accessedRoutes = loadRedirect(filterAsyncRoutes2(allRoute, authListData))
    // 判断是配置中心路由还是控制台路由
    const setRoute = loadRedirect(filterAsyncRoutes2(allRoute, myRoute))
    commit('SET_AUTHLIST', authList)
    commit('FRONT_ROUTES', setRoute)
    commit('SET_ROUTES', setRoute)
    commit('global/SET_AUTHLIST', authListData, { root: true })

    const tem = data?.type === 'back' ? backConstantRoutes : constantRoutes
    return [...accessedRoutes, ...tem]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
