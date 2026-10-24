/*
 * @Author: your name
 * @Date: 2020-12-02 15:10:36
 * @LastEditTime: 2024-06-05 11:07:40
 * @LastEditors: dingfei dingf@yelinked.com
 * @Description: In User Settings Edit
 * @FilePath: \36.svn喜哥代码库-智慧工厂\master\src\utils\request.js
 */
import Vue from 'vue'
import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { MessageBox, Notification } from 'element-ui'
import store from '@/store'
import { getToken, getTokenType } from '@/utils/auth'
import { login } from '@/api/user'
import { getFreshToken, setToken, setTokenType, setFreshToken } from '@/utils/auth'
import { ensureUploadRuntime, getUploadFactoryBaseUrl } from '@/utils/upload-runtime'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: process.env.VUE_APP_NGINX_PATH, // url = base url + request url
  withCredentials: true // send cookies when cross-domain requests
  // timeout: 10 * 1000 // request timeout
  // timeout: 3 * 60 * 1000
})

// request interceptor
service.interceptors.request.use(
  async config => {
    await ensureUploadRuntime()
    // do something before request is sent
    const token = getToken()
    if (token && !config.headers.notNeedToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Content-Type'] = 'application/json'
      config.headers['Authorization'] = (getTokenType() || 'Bearer') + ' ' + token
    }
    if (process.env.VUE_APP_UPLOAD_PACKAGE === 'true') {
      config.baseURL = getUploadFactoryBaseUrl()
    }
    const runningStatus = localStorage.getItem('yelinkEnv')
    if (runningStatus) {
      config.headers['Running-Status'] = runningStatus
    } else {
      delete config.headers['Running-Status']
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

function refresh() {
  login({
    client_id: 'web-admin-client',
    client_secret: 'web-secret-8888',
    username: '',
    password: '',
    grant_type: 'refresh_token',
    refresh_token: getFreshToken()
  }).then(res => {
    // console.log(res, '刷新token')
    if (res.data.code === '200') {
      setToken(res.data.data.access_token)
      setTokenType(res.data.data.token_type)
      setFreshToken(res.data.data.refresh_token)
      location.reload()
    }
  })
}

function resetLogin(name) {
  if (window.__POWERED_BY_QIANKUN__) {
    const path = name ? `login?redirect=${name}` : 'login'
    Vue.prototype.$parentProps.setGlobalState({ name: path })
  } else {
    location.reload()
  }
}

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log(response, '响应拦截')
    // if the custom code is not 20000, it is judged as an error.
    // console.log(getFreshToken(), 'fresh-token')
    // qms新接口 status  1|成功  0|失败
    if (response.data.code !== '200' && response.data.status === 0) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (response.data.code === '3002') {
        refresh()
      } else if (response.data.code === '10086') {
        MessageBox.confirm('系统状态已切换', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            resetLogin()
          })
        })
      } else if (response.data.code === '3005' || response.data.code === '3007') {
        MessageBox.confirm('您登陆已过期,请重新登录', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            resetLogin()
          })
        })
      } else if (+response.data.code === 1103) {
        Notification({
          title: '提示',
          message: response.data.message || '下推失败',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code >= 1536 && +response.data.code <= 1551) {
        Notification({
          title: '提示',
          message: response.data.message || '当前登录用户不允许审批或批准',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code >= 7001 && +response.data.code <= 7024) {
        Notification({
          title: '提示',
          message: response.data.message || '当前登录用户不允许审批或批准',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code >= 8501 && +response.data.code <= 8505) {
        Notification({
          title: '提示',
          message: response.data.message || '当前登录用户不允许审批或批准',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code >= 3100 && +response.data.code <= 3103) {
        Notification({
          title: '提示',
          message: response.data.message || '无法删除或无法移动',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 9111) {
        Notification({
          title: '提示',
          message: response.data.message || '新增重复，同个批次一天只可新增一条指标记录',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 9112) {
        Notification({
          title: '提示',
          message: response.data.message || '所传入的指标不可以为空',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 9113) {
        Notification({
          title: '提示',
          message: response.data.message || '未找到相关记录',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 6124) {
        Notification({
          title: '提示',
          message: response.data.message || '该制造单元已绑定工单，不允许删除',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 9116) {
        Notification({
          title: '提示',
          message: response.data.message || '该工位非检验工位',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 1167) {
        Notification({
          title: '提示',
          message: response.data.message || '同步失败',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 9801 || +response.data.code === 9802) {
        Notification({
          title: '提示',
          message: response.data.message || '导入失败，所填写产线或物料不存在',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 1170 || +response.data.code === 1170) {
        Notification({
          title: '提示',
          message: response.data.message || '工单计划结束时间不能早于计划开始时间或工单创建时间',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 1167) {
        Notification({
          title: '提示',
          message: response.data.message || '暂无可同步的销售订单',
          type: 'warning',
          duration: 2 * 1000
        })
        return response
      } else if (+response.data.code === 1169 || +response.data.code === 1172) {
        Notification({
          title: '提示',
          message: response.data.message || '暂无可齐备性检验的订单或工单',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 1168) {
        Notification({
          title: '提示',
          message: response.data.message || '该订单已下发，不能进行操作',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4507) {
        Notification({
          title: '提示',
          message: response.data.message || '日历模板编号已存在',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4508) {
        Notification({
          title: '提示',
          message: response.data.message || '日历模板不存在',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4509) {
        Notification({
          title: '提示',
          message: response.data.message || '日历模板明细不存在',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4510) {
        Notification({
          title: '提示',
          message: response.data.message || '模板明细的日期类型不能为空',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4511) {
        Notification({
          title: '提示',
          message: response.data.message || '模板明细的工作类型不能为空',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4512) {
        Notification({
          title: '提示',
          message: response.data.message || '模板明细的优先级不能为空',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4513) {
        Notification({
          title: '提示',
          message: response.data.message || '日历编号已存在',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4514) {
        Notification({
          title: '提示',
          message: response.data.message || '结束时间不可早于开始时间',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4515) {
        Notification({
          title: '提示',
          message: response.data.message || '日历已被使用，不可删除',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 4516) {
        Notification({
          title: '提示',
          message: response.data.message || '日历配置已存在',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 1171) {
        Notification({
          title: '提示',
          message: response.data.message || '工单计划开始时间不能早于工单创建时间',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 1173) {
        Notification({
          title: '提示',
          message: response.data.message || '该生产订单不能排程',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 1176) {
        Notification({
          title: '提示',
          message: response.data.message || '非成品订单不能拆单',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 1177) {
        Notification({
          title: '提示',
          message: response.data.message || '该单不满足挪单要求，请重新选择',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 5136) {
        Notification({
          title: '提示',
          message: response.data.message || '该设备类型已绑定设备实例，不可删除',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 6130 || +response.data.code === 6131) {
        Notification({
          title: '提示',
          message: response.data.message || '未找到该产线，请重新配置',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 8111) {
        Notification({
          title: '提示',
          message: response.data.message || '该告警类型未找到',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 8112) {
        Notification({
          title: '提示',
          message: response.data.message || '未传入参数，请传入参数！',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 9552) {
        Notification({
          title: '提示',
          message: response.data.message || '请先导入模板',
          type: 'warning',
          duration: 2 * 1000
        })
      } else if (+response.data.code === 7075 || +response.data.code === 7104 || +response.data.code === 7103) {
        return response
      } else {
        const whitecard = ['/api/users/info'] // 不报错接口，例如：精制账户在dfs系统无用户信息
        if (!whitecard.includes(response.config.url)) {
          Notification({
            title: '错误',
            message: response.data.message || response.data.errorDes || '系统繁忙',
            type: 'error',
            duration: 2 * 1000
          })
        }
      }
      return Promise.reject(new Error(response.data.message || response.data.errorDes || 'Error'))
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    console.log('systemmanagement error', error)
    if (/401/.test(error.message) && process.env.VUE_APP_LOCAL_SOURCE_PREVIEW !== 'true') {
      store.dispatch('user/resetToken').then(() => {
        const { pathname } = window.location || {}
        resetLogin(pathname)
      })
    }
    Notification({
      title: '错误',
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
