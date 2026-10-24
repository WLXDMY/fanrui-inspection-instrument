/*
 * @Author: zhaozhuo
 * @Date: 2022-01-13 12:31:40
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-03-21 18:13:59
 * @Description:
 */
//
import request from '@/utils/request'
/**
 * 通用功能
 *
 *
 */
// 是否有审批功能
export function isExistApprove(code) {
  return request({
    url: `/api/approve/config/${code}`,
    method: 'get'
  })
}

// 检验单-是否有审批功能
export function isExistApproveInspection(data) {
  return request({
    url: `/qms/product/v1/inspects/approve/config?type=${data.type}&categoryCode=${data.categoryCode}`,
    method: 'get'
  })
}

export function businessConfigUpdate(data) {
  return request({
    url: `/api/business/config/value/dto`,
    method: 'post',
    data
  })
}
