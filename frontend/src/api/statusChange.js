/*
 * @Author: chenzejie
 * @Date: 2023-02-20 10:50:05
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-03-15 09:40:20
 * @Description:
 */
import request from '@/utils/request'

// 获取当前系统状态
export function getSystemStatus() {
  return request({
    url: '/api/sys/status/get',
    method: 'get'
  })
}

// 切换系统状态
export function postSystemStatus(data) {
  return request({
    url: '/api/sys/status/change',
    method: 'post',
    data
  })
}

