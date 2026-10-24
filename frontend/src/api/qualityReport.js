/*
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-07-30 11:24:29
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-08-01 13:55:13
 * @Description: 缺陷分析接口
 */

import request from '@/utils/request'
import { upload, download } from '@/api/fileTransfer'

// 生产报工明细表
export function qualityRecordList(data) {
  return request({
    url: '/api/defect/statement/record/list',
    method: 'post',
    data
  })
}

// 工位质检明细表
export function exportQualityTemplate(params) {
  return download('/api/defect/statement/record/default/export/template', params, 'get')
}

export function queryQualityUploadFileList() {
  return request({
    url: `/api/upload/file/list?modelType=18`,
    method: 'get'
  })
}

export function uploadQualityFileUpload(file) {
  return upload('/api/upload/file/upload?modelType=18', file)
}

export function qualityExcelExport(params, id) {
  if (id) {
    return download(`/api/defect/statement/record/excel/exports?templateId=${id}`, params, 'post')
  } else {
    return download(`/api/defect/statement/record/excel/exports`, params, 'post')
  }
}

// 不良汇总
// 下载默认导出模板
export function exportBadSummaryTemplate(params) {
  return download('/api/defect/statement/default/export/template', params, 'get')
}

// 导出
export function defectExport(params) {
  return download('/qms/product/v1/analysis/defect/export', params, 'post')
}

export function queryBadSummaryUploadFileList(type) {
  return request({
    url: `/api/upload/file/list?modelType=${type}`,
    method: 'get'
  })
}

export function uploadBadSummaryFileUpload(file, type) {
  return upload(`/api/upload/file/upload?modelType=${type}`, file)
}

export function badSummaryExcelExport(params, id) {
  if (id) {
    return download(`/api/defect/statement/excel/exports?templateId=${id}`, params, 'post')
  } else {
    return download(`/api/defect/statement/excel/exports`, params, 'post')
  }
}

// 通过id删除上传的单据模板
export function uploadFileDelete(params) {
  return request({
    url: `/api/upload/file/delete`,
    method: 'delete',
    params
  })
}
export function downLoadExportTemplate(params) {
  return download('/api/upload/file/download', params)
}

// 缺陷分析-列表总接口
export function defectPageList(params) {
  return request({
    url: `/qms/product/v1/analysis/defect/page`,
    // url: `/api/defect/statement/list/by/type`,
    method: 'post',
    data: params
  })
}

// 不良汇总-不良分布-列表
export function getBadSummaryDistributionList(data) {
  return request({
    url: '/api/defect/statement/defect/distribution',
    method: 'post',
    data
  })
}

// 不良汇总-不良分布-下载导出模板
export function BadSummaryDistributionDefaultExportTemplate() {
  return download('/api/defect/statement/defect/distribution/default/export/template')
}

export function BadSummaryDistributionExcelExport(data) {
  return request({
    url: `/api/defect/statement/defect/distribution/excel/export`,
    method: 'post',
    data
  })
}

// 生产进度-生产工单总览-进度
export function BadSummaryDistributionExportProgress(taskId) {
  return request({
    url: `/api/statement/export/task/${taskId}`,
    method: 'get'
  })
}

// 生产进度-生产工单总览-日志
export function BadSummaryDistributionLog(params) {
  return request({
    url: `/api/defect/statement/defect/distribution/list/task/page`,
    method: 'get',
    params
  })
}

// 方案配置接口
//  查询方案列表
export function getSchemeList(params) {
  return request({
    url: `/api/column/configuration/get/by/user`,
    method: 'get',
    params
  })
}

// 首次进入Tab页使用的列配置方案
export function getSchemeconfigList(params) {
  return request({
    url: `/api/column/configuration/get/appoint/configuration`,
    method: 'get',
    params
  })
}

// 点击具体方案引用列配置
export function getSpecialConfiguration(id) {
  return request({
    url: `/api/column/configuration/get/configuration/detail/${id}`,
    method: 'get'
  })
}

export function saveSchemeConfig(data) {
  return request({
    url: `/api/column/configuration/save/entity`,
    method: 'post',
    data
  })
}

export function updateSchemeConfig(data) {
  return request({
    url: `/api/column/configuration/update/entity`,
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

export function deleteSchemeConfig(id) {
  return request({
    url: `/api/column/configuration/delete/detail/${id}`,
    method: 'delete'
  })
}

