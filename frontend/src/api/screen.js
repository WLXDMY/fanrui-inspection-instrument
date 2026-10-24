/*
 * @Author: your name
 * @Date: 2021-07-22 11:26:11
 * @LastEditTime: 2023-06-14 09:47:31
 * @LastEditors: xqm 13697256625@163.com
 * @Description: In User Settings Edit
 * @FilePath: \product-templates\src\api\screen.js
 */

import request from '@/utils/request'

// 获取曲线图数据
export function getAllList(params) {
  return request({
    url: `/api/screens/production/output/list`,
    method: 'get'
  })
}

// 获取列表数据
export function getLeftList(params) {
  return request({
    url: '/api/screens/production/information',
    method: 'get'
  })
}

// 获取大屏告警信息
export function getAlarmList() {
  return request({
    url: `/api/screens/production/alarm/list`,
    method: 'get'
  })
}

// 获取工单状态
export function workordersAllState() {
  return request({
    url: `/api/workorders/all/state`,
    method: 'get'
  })
}
