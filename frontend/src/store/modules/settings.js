/*
 * @Author: zhaozhuo
 * @Date: 2022-07-22 14:08:31
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @LastEditTime: 2023-04-03 15:39:20
 * @Description: ...
 */
import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo, isNotAppletENV } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  isNotAppletENV: isNotAppletENV,
  currentSystem: sessionStorage.getItem('currentSystem') || 'system',
  printDpi: 96
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

