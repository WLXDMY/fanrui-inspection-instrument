import axios from 'axios'
import store from '@/store'
import { Message, Notification } from 'element-ui'
import { getToken, getTokenType } from '@/utils/auth'

export const CancelToken = axios.CancelToken

// 上传
const fileTransferServiceUpload = axios.create({
  withCredentials: false, // 是否存cookie
  baseURL: process.env.VUE_APP_NGINX_PATH,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' // form表单格式相当于multipart/form-data
    // 'Content-Type': 'application/json'
  }
})
// 请求拦截器
fileTransferServiceUpload.interceptors.request.use(
  config => {
    // 请求头加入token检验
    if (store.getters.token) {
      config.headers['Authorization'] = getTokenType() + ' ' + getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 文件上传
 * @param {string} url 地址
 * @param {Object} file 文件对象
 */
export function upload(url, file, paramObj) {
  const param = new FormData()
  // 上传文件对象 名称file与后台控制器参数要一致
  param.append('file', file)
  if (paramObj) {
    if (typeof paramObj !== 'object') {
      return new Error('额外参数错误，不是一个object')
    }
    for (const key in paramObj) {
      param.append(key, paramObj[key])
    }
  }
  return new Promise((resolve, reject) => {
    // if (file.size >= 1048576) {
    //   console.log('文件信息', file)
    //   Message({
    //     message: '文件上传失败,请上传1M以内的文件',
    //     type: 'error'
    //   })
    //   reject(new Error('上传文件内容过大'))
    // } else {
    fileTransferServiceUpload
      .post(url, param)
      .then(res => {
        if (+res.data.code == 200) {
          resolve(res.data.data)
        } else if (+res.data.code === 9801 || +res.data.code === 9802) {
          Notification({
            title: '提示',
            message: res.data.message || '导入失败，所填写产线或物料不存在',
            type: 'warning',
            duration: 1 * 1000
          })
          reject(res.data)
        } else if (+res.data.status === 1) {
          resolve(res.data)
        } else {
          Message({
            message: res.data.message || '上传失败',
            type: 'error'
          })
          reject(res.data)
        }
      })
      .catch(err => {
        reject(err)
      })
    // }
  })
}

// 文件下载服务
const fileTransferServiceDownload = axios.create({
  baseURL: process.env.VUE_APP_NGINX_PATH,
  withCredentials: false, // 是否存cookie
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    'Content-Type': 'application/json'
  },
  responseType: 'blob' // 下载的响应成二进制数据流
})

// 文件下载服务请求拦截器
fileTransferServiceDownload.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getTokenType() + ' ' + getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
fileTransferServiceDownload.interceptors.response.use(
  response => {
    if (response.status == 200) {
      const res = response.data
      // 导出时获取后端返回的filename后缀  生产日报中使用 送检单详情导出使用
      if (response.headers['content-disposition']) {
        if (response.headers['content-disposition'].indexOf('filename') >= 0) {
          res.filename = response.headers['content-disposition']
        }
      }
      return res
    } else {
      Message({
        message: response.msg || '系统繁忙',
        type: 'error'
      })
    }
  },
  error => {
    const { message } = error
    if (message == 'cancelToken') {
      return new Promise(() => {})
    }
    if (error && error.response) {
      const err = error.response
      Message({
        message: '系统异常',
        type: 'error'
      })
      return Promise.reject(err)
    } else {
      Message({
        message: error.message || '系统繁忙',
        type: 'error'
      })
      return Promise.reject(error)
    }
  }
)
/**
 * 下载
 * @param {String} url 地址
 * @param {Object} params 参数
 * @param {String} type 请求方式
 */
export function download(url, params, type, cancelToken) {
  return new Promise((resolve, reject) => {
    if (type && type === 'post') {
      fileTransferServiceDownload.post(url, params).then(res => {
        try {
          // console.log('res', res)
          // 此处res将返回一个blob文件对象
          // 文件不对，流文件转为json
          if (res.type === 'application/json') {
            const reader = new FileReader()
            reader.onload = async function () {
              // console.log('reader.result', reader.result)
              const a = JSON.parse(reader.result) // 此处的msg就是后端返回的msg内容
              reject(a)
            }
            reader.readAsText(res)
          } else {
            resolve(res)
          }
        } catch (err) {
          return Promise.reject(new Error('返回的数据类型不对'))
        }
      })
    } else {
      fileTransferServiceDownload.get(url, { params, cancelToken }).then(res => {
        try {
          // 此处res将返回一个blob文件对象
          // 文件不对，流文件转为json
          if (res.type == 'application/json') {
            const reader = new FileReader()
            reader.onload = async function () {
              // console.log('reader.result', reader.result)
              const a = JSON.parse(reader.result) // 此处的msg就是后端返回的msg内容
              const { code, message } = a
              if (+code === 9552) {
                Notification({
                  title: '提示',
                  message: message || '请先导入模板',
                  type: 'warning',
                  duration: 2 * 1000
                })
              }
              reject(a)
            }
            reader.readAsText(res)
          } else {
            resolve(res)
          }
        } catch (err) {
          return Promise.reject(new Error('返回的数据类型不对'))
        }
      })
    }
  })
}

/**
 * 下载文件带内容
 * @param {String} url 地址
 * @param {Object} params 参数
 * @param {String} type 请求方式
 */
export function downloadAndFile(url, params, type) {
  return new Promise((resolve, reject) => {
    if (type && type == 'post') {
      fileTransferServiceDownload.post(url, params).then(res => {
        try {
          // console.log('res', res)
          // 此处res将返回一个blob文件对象
          // 文件不对，流文件转为json
          if (res.type == 'application/json') {
            const reader = new FileReader()
            reader.onload = async function () {
              // console.log('reader.result', reader.result)
              const a = JSON.parse(reader.result) // 此处的msg就是后端返回的msg内容
              reject(a)
            }
            reader.readAsText(res)
          } else {
            resolve(res)
          }
        } catch (err) {
          return Promise.reject(new Error('返回的数据类型不对'))
        }
      })
    } else {
      let data
      if (typeof url === 'object') {
        data = url.url
      } else {
        data = url
      }
      fileTransferServiceDownload.get(data + '?id=' + url.params).then(res => {
        try {
          // 此处res将返回一个blob文件对象
          // 文件不对，流文件转为json
          if (res.type == 'application/json') {
            const reader = new FileReader()
            reader.onload = async function () {
              // console.log('reader.result', reader.result)
              const a = JSON.parse(reader.result) // 此处的msg就是后端返回的msg内容
              reject(a)
            }
            reader.readAsText(res)
          } else {
            resolve(res)
          }
        } catch (err) {
          return Promise.reject(new Error('返回的数据类型不对'))
        }
      })
    }
  })
}
