/*
 * @Author: zhaozhuo
 * @Date: 2022-10-19 15:11:52
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-02-14 14:39:25
 * @Description: ...
 */

const state = {
  userInfo: {},
  authList: [],
  showSpecificParams: false
}

export function setGlobalData(paramsArr) {
  const globalData = window.microApp?.getGlobalData() || {}
  paramsArr.forEach(param => {
    const key = param.key
    const val = param.val
    globalData[key] = val
  })
  window.microApp?.setGlobalData(globalData)
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_AUTHLIST: (state, authList) => {
    state.authList = authList
  },
  SET_SHOWSPECIFICPARAMS: (state, enable) => {
    state.showSpecificParams = enable
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
