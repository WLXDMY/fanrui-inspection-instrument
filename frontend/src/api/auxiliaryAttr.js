/*
 * @Author: chenzejie
 * @Date: 2023-01-12 10:16:52
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-02-14 09:49:17
 * @Description:
 */
// 物料特征参数
import request from '@/utils/request'

// 查询物料特征参数列表
export function getAuxiliaryAttrList(data) {
  return request({
    url: '/api/auxiliary/attr/list',
    method: 'post',
    data
  })
}

// 新增特征参数
export function auxiliaryAttrAdd(data) {
  return request({
    url: '/api/auxiliary/attr/add',
    method: 'post',
    data
  })
}

// 新增生效状态的特征参数
export function auxiliaryAttrAddRelease(data) {
  return request({
    url: '/api/auxiliary/attr/add/release',
    method: 'post',
    data
  })
}

// 更新特征参数
export function auxiliaryAttrUpdate(data) {
  return request({
    url: '/api/auxiliary/attr/update',
    method: 'put',
    data
  })
}

// 获取物料特征参数详情
export function getAuxiliaryAttrDetail(auxiliaryAttrCode) {
  return request({
    url: `/api/auxiliary/attr/detail?auxiliaryAttrCode=${auxiliaryAttrCode}`,
    method: 'get'
  })
}

// 删除特征参数
export function deleteAuxiliaryAttr(auxiliaryAttrCode) {
  return request({
    url: `/api/auxiliary/attr/delete?auxiliaryAttrCode=${auxiliaryAttrCode}`,
    method: 'delete'
  })
}

// 审批特征参数
export function approveAuxiliaryAttr(params) {
  return request({
    url: '/api/auxiliary/attr/examine/approve',
    method: 'get',
    params
  })
}

// 批量审批特征参数
export function approveAuxiliaryAttrBatch(data) {
  return request({
    url: '/api/auxiliary/attr/approve/batch',
    method: 'post',
    data
  })
}

// 获取特征参数状态枚举
export function getAuxiliaryAttrState() {
  return request({
    url: '/api/auxiliary/attr/state',
    method: 'get'
  })
}

// 获取特征值状态枚举
export function getAuxiliaryAttrValueState() {
  return request({
    url: '/api/auxiliary/attr/value/state',
    method: 'get'
  })
}
