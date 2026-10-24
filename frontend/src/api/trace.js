/*
 * @Author: your name
 * @Date: 2021-07-21 16:19:47
 * @LastEditTime: 2023-02-23 10:04:33
 * @LastEditors: xqm 13697256625@163.com
 * @Description: In User Settings Edit
 * @FilePath: \dfs\src\api\yelink\trace.js
 */
import request from '@/utils/request'
import { download, upload } from '@/api/fileTransfer'

// 获取追溯工单信息
export function getTraceOder(params) {
  return request({
    url: `/api/workorders/trace/work/order/info/${params}`,
    method: 'get'
  })
}

// 获取追溯采购信息
export function getTracePro(params) {
  return request({
    url: `/api/workorders/trace/purchase/info/${params}`,
    method: 'get'
  })
}

// 获取追溯设计追溯
export function getTraceDesign(params) {
  return request({
    url: `/api/workorders/trace/design/info/${params}`,
    method: 'get'
  })
}

// 获取追溯 仓储信息
export function getTraceWarehousing(params) {
  return request({
    url: `/api/workorders/trace/storage/info/${params}`,
    method: 'get'
  })
}

// 获取所有的工单列表
export function getAllOrderList(params) {
  return request({
    url: `/api/workorders/list`,
    method: 'get'
  })
}

// 获取生成追溯消息
export function getProductList(params) {
  return request({
    url: `/api/workorders/trace/product/info/${params}`,
    method: 'get'
  })
}

// 获取追溯质量消息
export function getQuality(params) {
  return request({
    url: `/api/workorders/trace/quality/info/${params}`,
    method: 'get'
  })
}

// 获取追溯物料信息
export function getFeedRecordTraceMaterial(params) {
  return request({
    url: `/api/feed/record/trace/material`,
    method: 'get',
    params
  })
}

// 获取设备运行参数
export function getEquipmentOperatingParameters(params) {
  return request({
    url: `/api/workorders/trace/product/info/${params}`,
    method: 'get'
  })
}

// 获取作业工单信息
export function getAssignmentOperationOrderDetail(params) {
  return request({
    url: `/assignment/operation/order/detail`,
    method: 'get',
    params
  })
}

// 获取作业工单-报工信息
export function getAssignmentOperationOrderHistoryCount(params) {
  return request({
    url: `/assignment/operation/order/history/count`,
    method: 'get',
    params
  })
}

// 获取作业工单-设备运行参数
export function getSensorsRecordByOperationOrder(params) {
  return request({
    url: `/api/sensors/record/by/operation/order`,
    method: 'get',
    params
  })
}

// 获取作业工单-设备运行参数导出
export function exportSensorsExcel(params) {
  return download('/api/sensors/excel/export', params)
}

// 获取作业工单-生产追溯查询上料记录
export function getFeedRecordByOperationOrder(params) {
  return request({
    url: `/assignment/feed/record/list`,
    method: 'get',
    params
  })
}

/**
 * 单品追溯
 */

// 获取单品追溯列表
export function getSingleProductTraceList(query) {
  return request({
    url: `/api/code/record/list`,
    method: 'POST',
    data: query
  })
}

// 获取单品追溯详情
export function getSingleProductTraceDetail(params) {
  return request({
    url: `/api/code/record/detail`,
    method: 'get',
    params
  })
}

// 获取单品追溯详情-上报指标
export function getSingleProductTraceTargetList(params) {
  return request({
    url: `/api/code/record/target/list`,
    method: 'get',
    params
  })
}

// 获取工位列表
export function getRecordFacList() {
  return request({
    url: `/api/code/record/fac/list`,
    method: 'get'
  })
}

// 导出单品追溯
export function exportSingleProductTrace(params) {
  return download('/api/code/record/excel/export', params)
}

// 报工记录
export function getRecordHistory(params) {
  return request({
    url: '/api/lines/history/count',
    method: 'get',
    params
  })
}

/**
 * 单品追溯-追溯报表
 */
// 获取追溯报表列表（分页）
export function getRecordTraceReportList(query) {
  return request({
    url: '/api/code/record/trace/report/list',
    method: 'post',
    data: query
  })
}

// 获取生产过程信息详情
export function getRecordTraceReportDetail(query) {
  return request({
    url: '/api/code/record/trace/report/detail',
    method: 'post',
    data: query
  })
}

// 获取生产过程信息参数详情
export function getRecordTraceReportCourseDetail(params) {
  return request({
    url: '/api/code/record/trace/course/detail',
    method: 'get',
    params
  })
}

// 工单追溯模板默认导出
export function workOrderTraceTemplateExport(params) {
  return download('/api/work/order/trace/template/export', params)
}

// 上传用户的excel模板
export function workOrderTraceTemplateUpload(file) {
  return upload(`/api/work/order/trace/template/upload`, file)
}

// 导出工单追溯数据
export function workOrderTraceDataExport(params) {
  return download('/api/work/order/trace/data/export', params)
}

// 工单追溯 下载默认导入模板
export function downDefaultPrintTemplate(params) {
  return download('/api/work/order/trace/default/template', params)
}

// 工单追溯-单据列表
export function getTemplateList(params = { modelType: 5 }) {
  return request({
    url: '/api/upload/file/list',
    method: 'get',
    params
  })
}

// 工单追溯-单据列表上传
export function getUploadExportTemplate(file, params = { modelType: 5 }) {
  return upload('/api/upload/file/upload', file, params)
}

// 工单追溯-单据列表下载
export function getTemplateExport(params) {
  return download(
    '/ams/product/orders/template/export',
    params
  )
}

// 工单追溯-单据列表删除
export function getTemplateDelete(params) {
  return request({
    url: '/api/upload/file/delete',
    method: 'delete',
    params
  })
}

// 工单追溯-单据列表下载pdf
export function postPrintPdf(params) {
  return download('/api/work/order/trace/print/pdf', params, 'post')
}

// 工单追溯-单据列表下载excel
export function postExportExcel(params) {
  return download('/api/work/order/trace/export/excel', params, 'post')
}

// 从fastdfs下载默认模板
export function getExportTemplateExportDefault(params) {
  return download(
    '/api/code/record/default/export/template/download',
    params
  )
}

// 获取上传的单据列表
export function getExportTemplateList() {
  return request({
    url: '/api/code/record/export/template/list',
    method: 'get'
  })
}

// 上传单据模板到fastdfs
export function postExportTemplateUpload(file) {
  return upload('/api/code/record/export/template/upload', file)
}

// 从fast-dfs下载指定模板
export function getExportTemplateExport(params) {
  return download('/api/code/record/export/template/download', params)
}

// 从fast-dfs删除指定模板
export function deleteExportTemplateExportDelete(params) {
  return request({
    url: '/api/code/record/export/template/delete',
    method: 'delete',
    params
  })
}

// 导出单据为pdf
export function postExportPrintPDF(params) {
  return download('/api/code/record/export/pdf', params, 'post')
}

// 导出单据为excel
export function postExportExportExcel(params) {
  return download('/api/code/record/export/excel', params, 'post')
}
