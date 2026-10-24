/*
 * @Author: zhaozhuo
 * @Date: 2021-12-31 16:27:47
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-01-06 12:18:07
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// 需要持久化的模块,排除 fieldsConfig
const persistencePaths = modulesFiles
  .keys()
  .flatMap(item =>
    item.includes('fieldsConfig') ? [] : [item.replace(/^\.\/(.*)\.\w+$/, '$1')]
  )

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState({
      key: 'systemmanagementVuex',
      storage: window.sessionStorage,
      paths: persistencePaths
    })
  ]
})

export default store
