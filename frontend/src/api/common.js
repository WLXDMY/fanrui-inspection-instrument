/*
 * @Author: shunhua.liang
 * @Date: 2021-12-24 12:08:56
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-13 09:56:28
 * @Description:
 */

import request from '@/utils/request'
import { download } from '@/api/fileTransfer'

// 自定义接口
export function requestFun(url, method, params) {
  const config = {
    url,
    method
  }
  if (method === 'get') {
    config['params'] = params
  } else {
    config['data'] = params
  }
  return request(config)
}

// 查物料列表
export function materialsList(params) {
  return request({
    url: `/api/materials/list`,
    method: 'post',
    data: params
  })
}

// 根据物料code查物料
export function getMaterialsDetail(params) {
  return request({
    url: `/api/materials/detail/code?code=${params}`,
    method: 'get'
  })
}

// 获取公司信息
export function getCompanyInfo(params) {
  return request({
    url: '/api/companies',
    method: 'get',
    params
  })
}

// 查询未禁用用户列表
export function enableduser(query) {
  return request({
    url: '/api/users/list/company/enabled',
    method: 'get',
    params: query
  })
}

// 文件上传
export function uploadFile(data) {
  return request({
    url: '/api/resource/add/file',
    method: 'post',
    data
  })
}

// 文件上传
export function uploadSeal(params, data) {
  return request({
    url: '/api/resource/add',
    method: 'post',
    params,
    data
  })
}

// 获取是否有作业工单特性
export function getBaseFuncConfigIsOpenOperationOrder() {
  return request({
    url: `/ams/base/func/config/is/open/operation/order`,
    method: 'get'
  })
}

// 获取是否有作业工单特性new
export function getBaseFuncConfigIsOpenOperationOrderNew(params) {
  return request({
    url: `/api/companies/is/open/operation/order`,
    method: 'get',
    params
  })
}

// 获取下推配置
export function getFuncConfigDetail() {
  return request({
    url: `/ams/base/func/config/detail`,
    method: 'get'
  })
}

// 获取打印列表详情
export function getPrintTemplateSelect(id) {
  return request({
    url: `/api/print/template/select/${id}`,
    method: 'get'
  })
}

// 获取有启用字段全集
export function getMaterialWordList() {
  return request({
    url: `/api/material/filed/config/list/using`,
    method: 'get'
  })
}

// 获取有启用字段全集
export function pushDownConfig(data) {
  return request({
    url: `/api/config/push/down/get`,
    method: 'post',
    data
  })
}
// 业务配置-编辑页面取消配置
export function configGetOrderEditConfig(data) {
  return request({
    url: `/api/config/list/config/get/order/editConfig/traceOrderList`,
    method: 'post',
    data
  })
}

// 分页查询当前导出任务列表
export function getExportHistoryDataTaskPageList(params) {
  return request({
    url: `/api/workorders/export/task/page`,
    method: 'get',
    params
  })
}
// 下载导出附件
export function downLoadDefaultExportTemplate(params) {
  return download(`/api/workorders/default/export/template`, params)
}

// 通过类型编号获取签名配置
export function getApproveSignatureConfigByCode(code) {
  return request({
    url: `/api/approve/signature/config/${code}`,
    method: 'get'
  })
}

// 通过全路径获取字段规则配置
export function postFormConfigFieldRuleDetail(data) {
  return request({
    url: `/api/form/config/field/rule/detail`,
    method: 'post',
    data
  })
}

// 查询物料类型字段
export function getMaterialTypeKeyList(id) {
  return request({
    url: `/api/material/filed/config/type/list/${id}`,
    method: 'get'
  })
}
