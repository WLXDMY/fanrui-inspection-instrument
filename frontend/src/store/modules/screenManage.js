const state = {
  screenInfo: {}
}

const mutations = {
  SCREE_INFO: (state, view) => {
    state.screenInfo = view
  }
}

const actions = {
  screenInfo({ commit }, view) {
    commit('SCREE_INFO', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
