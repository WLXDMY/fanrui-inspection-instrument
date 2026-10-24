/*
 * @Author: shunhua.liang
 * @Date: 2022-05-12 11:22:47
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-08-01 17:57:47
 * @Description: 获取用户列设置
 */
import request from '@/utils/request'

// 获取用户列配置
export function getColumnList(params) {
  return request({
    url: '/api/columns/get/user/column',
    method: 'get',
    params
  })
}

// 按用户保存或编辑列配置
export function saveCurrentColumnList(data) {
  return request({
    url: '/api/columns/user/column',
    method: 'put',
    data
  })
}

export function updateSpecialSchemeConfig(data) {
  return request({
    url: `/api/column/configuration/update/entity/detail`,
    method: 'put',
    data
  })
}
