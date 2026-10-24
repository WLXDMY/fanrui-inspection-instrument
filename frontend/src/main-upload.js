/*
 * 检验仪器平台上传包的精简入口。
 * 这里只移除检验仪器未使用的全局插件；普通 QMS 仍由 main.js 启动。
 */
import './public-path'
import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import App from './App.vue'
import store from './store'
import * as filters from './filters'
import { stateColor } from './importCommon.js'
import commonObj from '@/utils/common.js'
import permission from '@/directive/permission/index.js'
import drag from '@/directive/drag/index.js'
import router from '@/router/index.js'
import { installLocalSourcePreview } from '@/local-source-preview.js'
import '@/router/routesBeforeEach.js'
import './icons'
import CommonCodeRuleDialog from '@/components/CommonCodeRuleDialog'
import 'normalize.css/normalize.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import '@/styles/yelink-factory.scss'
import validateDialog from '@/plugins/validateDialog/index.js'
import { ensureUploadRuntime } from '@/utils/upload-runtime'

function refreshUploadRuntime() {
  ensureUploadRuntime({ forceRefresh: true }).catch(() => undefined)
}

window.addEventListener('online', refreshUploadRuntime)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') refreshUploadRuntime()
})

for (const key in commonObj) {
  Vue.prototype[`$${key}`] = commonObj[key]
}

Vue.use(permission)
Vue.use(drag)
Vue.use(CommonCodeRuleDialog)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})
Vue.use(validateDialog)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
window.stateColor = stateColor

Vue.directive('number', {
  bind(el) {
    el.oninput = () => {
      el.children[0].value = el.children[0].value.replace(/[^\d.]/g, '')
    }
  }
})

Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false

let app = null
function render(props = {}) {
  const { container } = props
  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#qms3-sub') : '#qms3-sub')
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  Vue.prototype.$parentProps = props
  const _historyState = JSON.parse(sessionStorage.getItem('_historyState') || '{}')
  Vue.prototype._historyState = _historyState
  store.commit('permission/SET_AUTHLIST', props.authList)
  store.commit('permission/FRONT_ROUTES', props.front_routes)
  render(props)
}

export async function update(props) {
  console.log(props, '手动拉起')
}

export async function unmount() {
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
}

if (!window.__POWERED_BY_QIANKUN__) {
  installLocalSourcePreview()
  render()
}

export const eventBus = new Vue()
