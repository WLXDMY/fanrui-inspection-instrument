/*
 * @Author: zhaozhuo
 * @Date: 2021-12-23 16:14:48
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-24 17:39:10
 * @Description:
 */
import { getCustomizationComponentName } from '@/api/customized'
import { Notification } from 'element-ui'

const state = {
  componentNameList: null
}

const mutations = {
  SET_COMPONENTNAMELIST: (state, componentNameList) => {
    state.componentNameList = componentNameList
  }
}

const actions = {
  getCustomizationComponentName({ commit, state }, param) {
    const { componentNameList } = state
    if (componentNameList) {
      return componentNameList
    }
    return new Promise((resolve, reject) => {
      getCustomizationComponentName(param)
        .then(response => {
          const { code, data, message } = response.data
          if (code === '200') {
            commit('SET_COMPONENTNAMELIST', data)
            resolve(data)
          } else {
            Notification({
              title: '提示',
              message: message || '获取定制化数据失败',
              type: 'error',
              duration: 2 * 1000
            })
            resolve([])
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
