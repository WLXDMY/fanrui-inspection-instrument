/*
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-06-24 14:27:39
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-29 14:02:53
 * @Description:
 */
/*
 * @Author: zhaozhuo
 * @Date: 2021-12-31 16:27:47
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-11-13 09:11:33
 * @Description:
 */
import './public-path'
import Vue from 'vue'
import Cookies from 'js-cookie'
import echarts from 'echarts'
import Element from 'element-ui'
import vGanttChart from 'v-gantt-chart'
import App from './App.vue'
import store from './store'
import * as filters from './filters'
import { stateColor } from './importCommon.js'
import commonObj, { getStockCommon } from '@/utils/common.js'
import { queryString } from '@/utils/validate.js'
import permission from '@/directive/permission/index.js'
import specificParams from '@/directive/specificParams/index.js'
import drag from '@/directive/drag/index.js'
import router from '@/router/index.js'
import { installLocalSourcePreview } from '@/local-source-preview.js'
import '@/router/routesBeforeEach.js'
import './icons'
// 引入自定义组件。index.js是组件的默认入口
import CommonCodeRuleDialog from '@/components/CommonCodeRuleDialog'
// 样式
import 'normalize.css/normalize.css'
import '@/styles/element-variables.scss'
import '../node_modules/@ag-grid-community/core/dist/styles/ag-grid.css'
import '../node_modules/@ag-grid-community/core/dist/styles/ag-theme-alpine.css'
import '@/styles/index.scss'
import '@/styles/yelink-factory.scss'
import '@/styles/gantt.scss'
import validateConfirm from '@/utils/validateConfirm.js'
import validateDialog from '@/plugins/validateDialog/index.js'
import MaterialSelectComplex from '@/plugins/MaterialSelectComplex/index.js'
import MaterialSelectComplex2 from '@/plugins/MaterialSelectComplex2/index.js'
import MaterialSelectComplex3 from '@/plugins/MaterialSelectComplex3/index.js'

// form 表校验失败时提供的一个提示弹窗方法
Vue.prototype.$validateConfirm = validateConfirm

// lodash
import _ from 'lodash'
Vue.prototype.$_ = _

// import subMicroApp from '@micro-zoe/micro-app'
// import UmyUi from 'umy-ui'
// import 'umy-ui/lib/theme-chalk/index.css';// 引入样式

// Vue.use(UmyUi);
Vue.prototype.$getStockCommon = getStockCommon
Vue.prototype.$queryString = queryString
// 添加所有默认方法
for (const key in commonObj) {
  Vue.prototype[`$${key}`] = commonObj[key]
}
// 注册挂载
Vue.use(CommonCodeRuleDialog)
Vue.use(permission)
Vue.use(specificParams)
Vue.use(drag)
Vue.use(vGanttChart)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.use(validateDialog)
Vue.use(MaterialSelectComplex)
Vue.use(MaterialSelectComplex2)
Vue.use(MaterialSelectComplex3)

Vue.prototype.$echarts = echarts
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
  // renderPatch(props);
}

export async function unmount() {
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
  // router = null;
}
// 微前端环境下
if (!window.__POWERED_BY_QIANKUN__) {
  installLocalSourcePreview()
  render()
}

export const eventBus = new Vue()
