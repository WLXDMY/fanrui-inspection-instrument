/*
 * @Author: your name
 * @Date: 2021-04-09 14:02:02
 * @LastEditTime: 2023-03-31 18:31:28
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @Description: In User Settings Edit
 * @FilePath: \workplace\dfs\src\api\yelink\basisInfo.js
 */

import request from '@/utils/request'
// 库房管理接口模块
// 获取条款列表信息
export function getTermList(params) {
  return request({
    url: '/api/dicts/terms/list',
    method: 'post',
    data: params || {}
  })
}
// 新增条款信息列表
export function addTermItem(params) {
  return request({
    url: '/api/dicts/terms/insert',
    method: 'post',
    data: params
  })
}
// 获取条款类型
export function getTermsType(params) {
  return request({
    url: '/api/dicts/terms/type',
    method: 'get',
    params
  })
}
// 删除条款
export function delTermsItem(params) {
  return request({
    url: `/api/dicts/terms/delete/${params.id}`,
    method: 'delete'
  })
}
// 修改条款信息
export function modifyTermsItem(params) {
  return request({
    url: '/api/dicts/terms/update',
    method: 'put',
    data: params
  })
}
//
export function uploadFiles(param) {
  return request({
    url: '/api/resource/add',
    method: 'post',
    data: param
  })
}

// 分页查询dfs相关数据库信息表
export function getDataBaseInfo(params) {
  return request({
    url: '/api/sys/table/list',
    method: 'get',
    params
  })
}
// 获取dfs全部的数据库表信息
export function getAllTableDataBase(params) {
  return request({
    url: '/api/sys/table/all',
    method: 'get',
    params
  })
}
// 清理数据
export function clearDataBaseLog(params) {
  return request({
    url: '/api/sys/table/clean',
    method: 'delete',
    params
  })
}

// 获取单位的列表
export function getUnitList(params) {
  return request({
    url: '/api/dicts/unit/list',
    method: 'get',
    params
  })
}

// 新增单位
export function addUnit(params) {
  return request({
    url: '/api/dicts/unit/insert',
    method: 'post',
    data: params
  })
}

// 修改单位
export function editUnit(params) {
  return request({
    url: '/api/dicts/unit/update',
    method: 'put',
    data: params
  })
}

// 删除单位
export function deleteUnitById(id) {
  return request({
    url: `/api/dicts/unit/delete/${id}`,
    method: 'delete'
  })
}

/**
 *
 * 物料类型配置
 *
 */
// 新增物料类型
export function addMaterialType(params) {
  return request({
    url: '/api/dicts/material/type/insert',
    method: 'post',
    data: params
  })
}

// 修改物料类型
export function editMaterialType(params) {
  return request({
    url: '/api/dicts/material/type/update',
    method: 'put',
    data: params
  })
}

// 删除物料类型
export function deleteMaterialTypeById(id) {
  return request({
    url: `/api/dicts/material/type/delete/${id}`,
    method: 'delete'
  })
}

// 获取物料的列表
export function getMaterialTypeList(params) {
  return request({
    url: '/api/dicts/common/type/list',
    method: 'get',
    params
  })
}

/**
 * 设备类型配置
 *
 */
// 新增设备类型
export function addDeviceType(params) {
  return request({
    url: '/api/dicts/device/sort/insert',
    method: 'post',
    data: params
  })
}

// 修改设备类型
export function editDeviceType(params) {
  return request({
    url: '/api/dicts/device/sort/update',
    method: 'put',
    data: params
  })
}

// // 删除设备类型
// export function deleteDeviceTypeById(id) {
//     return request({
//         url:`/api/dicts/device/sort/delete/${id}`,
//         method:'delete',
//     })
// }

// 获取设备类型的列表
export function getDeviceTypeList(params) {
  return request({
    url: '/api/dicts/device/sort/list',
    method: 'get',
    params
  })
}

/**
 * 班次配置
 *
 */
// 新增班次配置
export function addShiftConfig(params) {
  return request({
    url: '/api/shift/insert',
    method: 'post',
    data: params
  })
}

// 修改班次配置
export function editShiftConfig(params) {
  return request({
    url: '/api/shift/update',
    method: 'put',
    data: params
  })
}

// 删除班次配置
export function deleteShiftConfigById(id) {
  return request({
    url: `/api/shift/delete/${id}`,
    method: 'delete'
  })
}

// 查询所有班次
export function getShiftConfigList(params) {
  return request({
    url: '/api/shift/list',
    method: 'get',
    params
  })
}

// ---------------------------------------------------------------------------------------------------
// 化验元素配置的接口
// 获取元素列表
export function getElementList(params) {
  return request({
    url: '/api/laboratory/offset/list',
    method: 'get',
    params
  })
}
// 新增展示元素
export function newAddShowElement(data) {
  return request({
    url: '/api/laboratory/offset/add',
    method: 'post',
    data
  })
}
// 删除展示元素
export function deleteShowElement(id) {
  return request({
    url: `/api/laboratory/offset/delete/${id}`,
    method: 'delete'
  })
}
// 修改元素偏差值
export function editElementValue(params) {
  return request({
    url: '/api/laboratory/offset/edit',
    method: 'put',
    data: params
  })
}
// 模糊查询某个接口
export function likeSearch(elementName) {
  return request({
    url: `/api/laboratory/offset/select/${elementName}`,
    method: 'get'
  })
}

/**
 * 编码规则
 *
 */
// 新增编码规则
export function addNumRule(params) {
  return request({
    url: '/api/numberRule/add',
    method: 'post',
    data: params
  })
}

// 修改编码规则
export function editNumRule(params) {
  return request({
    url: '/api/numberRule/update',
    method: 'post',
    data: params
  })
}

// 删除编码规则
export function deleteNumRuleById(id) {
  return request({
    url: `/api/numberRule/delete?id=${id}`,
    method: 'delete'
  })
}

// 获取编码规则的列表
export function getNumRuleList(params) {
  return request({
    url: '/api/numberRule/getAll',
    method: 'get',
    params
  })
}

// 获取编码规则类型
export function getNumRuleType() {
  return request({
    url: '/api/numberRule/getType',
    method: 'get'
  })
}

// 获取编码规则2
export function getNumRulePre2() {
  return request({
    url: '/api/numberRule/getTypePre2',
    method: 'get'
  })
}

// 获取编码规则3
export function getNumRulePre3() {
  return request({
    url: '/api/numberRule/getTypePre3',
    method: 'get'
  })
}

// 获取编码规则类详情
export function getNumRuleDetailById(params) {
  return request({
    url: '/api/numberRule/getDetailById',
    method: 'get',
    params
  })
}
// 通过类型获取规则详情
export function getNumRuleDetailByType(params) {
  return request({
    url: '/api/numberRule/getDetailByType',
    method: 'get',
    params
  })
}
// 通过类型获取规则详情(生产工单单独使用)
export function getNumberRuleGetDetailByCodeType(params) {
  return request({
    url: `/api/numberRule/getDetailByCodeType/${params}`,
    method: 'get'
  })
}
// 通过id获取规则详情
export function getNumRuleSeqByType(params) {
  return request({
    url: '/api/numberRule/getSeqByType',
    method: 'post',
    data: params
  })
}
// 通过类型编号获取编码规则的列表
export function getNumRuleListByType(ruleType) {
  return request({
    url: `/api/numberRule/getAll?ruleType=${ruleType}`,
    method: 'get'
  })
}

// 获取编码规则的列表带类型名称
export function getNumRuleByType(ruleType) {
  return request({
    url: `/api/numberRule/get/rules?ruleType=${ruleType}`,
    method: 'get'
  })
}

// 编码规则中自增序号配置的列表接口
export function getNumRuleConfigList() {
  return request({
    url: '/api/numberRule/config/list',
    method: 'get'
  })
}

// 通过类型获取编码规则中自增序号配置的列表接口
export function getNumRuleConfigListByType(ruleType) {
  return request({
    url: `/api/numberRule/config/list?ruleType=${ruleType}`,
    method: 'get'
  })
}

// 保存编码规则数据
export function saveNumRule(params) {
  return request({
    url: '/api/numberRule/batch/update',
    method: 'post',
    data: params
  })
}
