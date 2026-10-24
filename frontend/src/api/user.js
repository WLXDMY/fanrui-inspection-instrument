/*
 * @Descripttion:
 * @version:
 * @Author: zhangzheng
 * @Date: 2020-12-04 11:31:53
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-05-12 16:13:09
 */
import request from '@/utils/request'

export function login(data) {
  var newData = ''
  function paramUrl(data) {
    // eslint-disable-next-line no-unused-vars
    for (const k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k) === true) {
        newData +=
          encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }
  paramUrl(data)
  return request({
    url: '/api/oauth/token',
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   notNeedToken: true
    // },
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/users/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// 获取用户权限列表
export function getUserAuth() {
  return request({
    url: `/api/permissions/list`,
    method: 'get'
  })
}

// 全局是否开启物料特征参数
export function getSpecificParams(data) {
  return request({
    url: '/api/config/enable/config/get',
    method: 'post',
    data
  })
}

// 获取路由配置文件
export function getRouteInfoList(params) {
  return request({
    url: '/api/sys/get/routeInfo',
    method: 'get',
    params
  })
}
