/*
 * @Author: zhaozhuo
 * @Date: 2022-04-12 17:03:25
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-15 10:29:30
 * @Description:
 */

const state = {
  routeFrom: null
}

const mutations = {
  SET_ROUTERFROM: (state, routeFrom) => {
    state.routeFrom = routeFrom
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
