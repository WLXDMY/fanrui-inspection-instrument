/*
 * @Author: zhaozhuo
 * @Date: 2022-09-08 09:34:42
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-10-19 17:05:57
 * @Description: ...
 */
import {
  getToken,
  removeToken,
  setToken,
  setTokenType,
  setFreshToken
} from '@/utils/auth'
import { resetRouter } from '@/router/index.js'
import { Notification } from 'element-ui'
import { login } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {},
  authList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_AUTHLIST: (state, authList) => {
    state.authList = authList
  }
}

const actions = {
  // 退出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }, 20)
    })
  },

  // 清除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // 处理登录信息
  getUserInfo({ commit }) {
    const username = window.prompt('用户名')
    let password = ''
    if (username) {
      password = window.prompt('密码')
    }
    if (!username || !password) {
      return
    }
    const param = {
      client_id: 'web-admin-client',
      client_secret: 'web-secret-8888',
      username,
      password,
      grant_type: 'password'
    }
    return login(param)
      .then(response => {
        if (response.data.code === '200') {
          Notification({
            title: '成功',
            message: '登录成功',
            type: 'success',
            duration: 500
          })
          commit('SET_TOKEN', response.data.data.access_token)
          setTokenType(response.data.data.token_type)
          setToken(response.data.data.access_token)
          setFreshToken(response.data.data.refresh_token)
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
