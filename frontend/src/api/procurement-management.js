// 采购接口文件
import request from '@/utils/request'
import qs from 'qs'
import { download, upload } from '@/api/fileTransfer'

/**
 *
 * 供应商档案页面
 *
 */
// 查询供应商列表
export function getSupplierState() {
  return request({
    url: `/api/suppliers/state`,
    method: 'get'
  })
}

// 查询供应商详细信息
export function getSupplierDetail(code) {
  return request({
    url: `/api/suppliers/detail/${code}`,
    method: 'get'
  })
}

// 查询供应商列表
export function getSupplierList(query) {
  return request({
    url: `/api/suppliers/list?${qs.stringify(query)}`,
    method: 'get'
  })
}

// 添加供应商
export function insertSupplier(query) {
  return request({
    url: '/api/suppliers/insert',
    method: 'post',
    data: query
  })
}

// 供应商档案保存且生效
export function insertSupplierSaveAndEffect(query) {
  return request({
    url: '/api/suppliers/insert/released',
    method: 'post',
    data: query
  })
}
// 删除供应商
export function deleteSupplier(id) {
  return request({
    url: `/api/suppliers/delete/${id}`,
    method: 'delete'
  })
}

// 修改供应商
export function updateSupplier(query) {
  return request({
    url: '/api/suppliers/update',
    method: 'put',
    data: query
  })
}

// 供应商档案-审批
export function approveSupplierExamine(params) {
  return request({
    url: `/api/suppliers/examine/approve`,
    method: 'get',
    params
  })
}

// 供应商类型新增
export function postInsertSupplierType(data) {
  return request({
    url: '/api/suppliers/insert/supplier/type',
    method: 'post',
    data
  })
}

// 修改供应商类型
export function putUpdateSupplierType(data) {
  return request({
    url: '/api/suppliers/update/supplier/type',
    method: 'put',
    data
  })
}

// 修改供应商类型
export function deleteDeleteSupplierType(id) {
  return request({
    url: `/api/suppliers/delete/supplier/type/${id}`,
    method: 'delete'
  })
}

// 获取供应商类型分页
export function getGetSupplierType(params) {
  return request({
    url: `/api/suppliers/get/supplier/type`,
    method: 'get',
    params
  })
}

// 获取供应商类型全部
export function getGetSupplierTypeList() {
  return request({
    url: `/api/suppliers/get/supplier/type/list`,
    method: 'get'
  })
}

// 供应商档案模板下载
export function getSuppliersExportTemplate() {
  return download('/api/suppliers/export/template')
}

// 供应商档案信息导出
export function getSuppliersExportSupplier(params) {
  return download('/api/suppliers/export/supplier', params)
}

// 供应商档案信息导入
export function postSuppliersUploadSupplier(file) {
  return upload('/api/suppliers/upload/supplier', file)
}

// 供应商档案信息导入进度
export function getSuppliersImportProgress() {
  return request({
    url: '/api/suppliers/import/progress',
    method: 'get'
  })
}

// 查询物料清单列表/查询父物料列表  {type:1003} 原料：1003
// 原路径 /api/boms/list
export function getAllMaterialList(query) {
  return request({
    url: `/api/materials/list`,
    method: 'post',
    data: query
  })
}

// 添加原料 materialList
export function insertMaterial(query) {
  return request({
    url: `/api/suppliers/insert/material?fid=${query.id}`,
    method: 'post',
    data: query.materialList
  })
}

// 删除物料
export function deleteMaterial(query) {
  return request({
    url: `/api/suppliers/delete/material?fid=${query.fid}&id=${query.id}`,
    method: 'delete'
  })
}

/**
 *
 * 采购需求页面
 *
 */

// 获取采购需求单状态
export function getSupplierDemandState() {
  return request({
    url: `/ams/requests/state`,
    method: 'get'
  })
}

// 查询需求单列表
export function getSupplierDemandList(query) {
  return request({
    url: `/ams/requests/list`,
    method: 'post',
    data: query
  })
}

// 查询采购需求单详细信息
export function getSupplierDemandDetail(id) {
  return request({
    url: `/ams/requests/detail/${id}`,
    method: 'get'
  })
}

// 修改订单需求单
export function updateSupplierDemand(query) {
  return request({
    url: '/ams/requests/update',
    method: 'put',
    data: query
  })
}

// 添加订单需求单
export function insertSupplierDemand(query) {
  return request({
    url: '/ams/requests/insert',
    method: 'post',
    data: query
  })
}
// 订单需求单新增且生效
export function supplierDemandSavaAndEffect(query) {
  return request({
    url: '/ams/requests/insert/released',
    method: 'post',
    data: query
  })
}
// 删除需求单
export function deleteSupplierDemand(id) {
  return request({
    url: `/ams/requests/delete/${id}`,
    method: 'delete'
  })
}

// 获取发放状态的订单
export function getReleaseOrder(query) {
  return request({
    url: `/api/orders/select/release`,
    method: 'get',
    params: query
  })
}

// 根据订单号查询产品列表
export function getProductsByOrder(query) {
  return request({
    url: `/api/orders/select/bom?orderIds=${query}`,
    method: 'get'
  })
}

// // 根据产品列表获取所需物料
// export function getMaterialListByProducts(query) {
//   return request({
//     url: '/api/requests/bom/latest',
//     method: 'post',
//     data: query
//   })
// }

// 采购需求-审批
export function approveRequestsExamine(params) {
  return request({
    url: `/ams/requests/examine/approve`,
    method: 'get',
    params
  })
}

/**
 *
 * 采购订单页面
 *
 */

// 获取采购订单状态
export function getPurchasesState() {
  return request({
    url: `/ams/purchases/state`,
    method: 'get'
  })
}

// 根据需求单ID获取物料列表
export function getMaterialListByRequests(query) {
  return request({
    url: `/ams/purchases/bom?requestNums=${query.requestNum}`,
    method: 'post',
    data: query.supplierEntity
  })
}

// 添加新物料
export function addNewMater(query) {
  return request({
    url: '/api/boms/insert',
    method: 'post',
    data: query
  })
}

// 新增采购订单
export function insertPurchases(query) {
  return request({
    url: '/ams/purchases/insert',
    method: 'post',
    data: query
  })
}
// 采购订单保存并生效
export function insertPurchasesSaveAndEffect(query) {
  return request({
    url: '/ams/purchases/insert/released',
    method: 'post',
    data: query
  })
}
// 更新采购订单
export function updatePurchases(query) {
  return request({
    url: '/ams/purchases/update',
    method: 'put',
    data: query
  })
}

// 删除采购订单
export function deletePurchases(id) {
  return request({
    url: `/ams/purchases/delete/${id}`,
    method: 'delete'
  })
}

// 查询需求单列表
export function getPurchasesList(query) {
  return request({
    url: `/ams/purchases/list`,
    // method: 'get',
    // params: query
    method: 'post',
    data: query
  })
}

// 查询需求单列表(叶家润叫替换的)(新增来料检验下拉列表使用)
export function getPurchasesOptions() {
  return request({
    url: `/ams/purchases/get/list`,
    method: 'get'
  })
}
// 获取采购详细信息
export function getPurchasesDetail(code) {
  return request({
    url: `/ams/purchases/detail/${code}`,
    method: 'get'
  })
}
//
// 获取多个采购详细信息
export function purchasesDetail(codes) {
  return request({
    url: `/ams/purchases/get/details/${codes}`,
    method: 'get'
  })
}
// 采购详细导出
export function exportPurchasesDetail(params) {
  return download('/ams/purchases/excel/export', params)
}

// 条款列表
export function getTermsList(query) {
  return request({
    url: `/api/dicts/terms/list`,
    method: 'post',
    data: query || {}
  })
}

// 采购订单-审批
export function approvePurchasesExamine(params) {
  return request({
    url: `/ams/purchases/examine/approve`,
    method: 'get',
    params
  })
}

// 采购订单-下载默认打印模板
export function getPurchasesDownExportDefaultTemplate() {
  return download('/ams/purchases/down/export/default/template')
}

// 采购订单-上传自定义单据模板
export function postUploadExportTemplate(file) {
  return upload('/ams/purchases/upload/export/template', file)
}

// 采购订单-查询自定义单据模板
export function getTemplateList() {
  return request({
    url: '/ams/purchases/template/list',
    method: 'get'
  })
}

// 采购订单-下载自定义单据模板
export function getTemplateExport(params) {
  return download('/ams/purchases/template/export', params)
}

// 采购订单-删除自定义单据模板
export function deleteTemplateDelete(params) {
  return request({
    url: `/ams/purchases/template/delete`,
    method: 'delete',
    params
  })
}

// 采购订单-导出单据为pdf
export function postPrintPdf(params) {
  return download('/ams/purchases/print/pdf', params, 'post')
}

// 采购订单-导出单据为excel
export function postExportExcel(params) {
  return download('/ams/purchases/export/excel', params, 'post')
}

// 采购订单-导出单据为excel
export function postExcelExport(params) {
  return download('/ams/purchases/excel/export', params, 'post')
}

/**
 *
 * 来料检验页面
 *
 */

// 获取来料检验状态
export function getSupplierbomsState() {
  return request({
    url: `/ams/supplierboms/state`,
    method: 'get'
  })
}

// 分页模糊查询来料检验
export function getSupplierbomsList(query) {
  return request({
    url: `/ams/supplierboms/list`,
    method: 'get',
    params: query
  })
}

// 新增供应商采购物料清单
export function insertSupplierboms(query) {
  return request({
    url: '/ams/supplierboms/insert',
    method: 'post',
    data: query
  })
}

// 更新采购订单
export function updateSupplierboms(query) {
  return request({
    url: '/ams/supplierboms/update',
    method: 'put',
    data: query
  })
}

// 删除采购订单
export function deleteSupplierboms(id) {
  return request({
    url: `/ams/supplierboms/delete/${id}`,
    method: 'delete'
  })
}

// 查询供应商采购物料清单详情
export function getSupplierbomsDetail(id) {
  return request({
    url: `/ams/supplierboms/detail/${id}`,
    method: 'get'
  })
}

// 添加新物料
export function addNewMaterList(query) {
  return request({
    url: '/api/materials/insert',
    method: 'post',
    data: query
  })
}

// 查询物料清单列表/查询父物料列表  {type:1003} 原料：1003
export function getAllMaterialQueryList(query) {
  return request({
    url: `/api/materials/list`,
    method: 'post',
    data: query
  })
}

// 获取选择采购订单关联的入库单号
export function getInputOrderList(query) {
  return request({
    url: `/ams/supplierboms/stock/code`,
    method: 'get',
    params: query
  })
}

/**
 *
 * 收货单页面
 *
 */

// 获取收货单所有状态
export function getReceiptState() {
  return request({
    url: `/ams/receipt/state`,
    method: 'get'
  })
}

// 获取收货单列表
export function getReceiptList(data) {
  return request({
    url: `/ams/receipt/list`,
    method: 'post',
    data
  })
}

// 新增收货单
export function addReceipt(query) {
  return request({
    url: '/ams/receipt/add',
    method: 'post',
    data: query
  })
}
// 收货单保存且生效
export function receiptSaveAndEffect(query) {
  return request({
    url: '/ams/receipt/add/released',
    method: 'post',
    data: query
  })
}

// 获取收货单详情
export function getReceiptDetail(receiptId) {
  return request({
    url: `/ams/receipt/detail/${receiptId}`,
    method: 'get'
  })
}

// 修改收货单
export function updateReceipt(query) {
  return request({
    url: '/ams/receipt/update',
    method: 'put',
    data: query
  })
}

// 删除收货单
export function deleteReceipt(receiptId) {
  return request({
    url: `/ams/receipt/remove/${receiptId}`,
    method: 'delete'
  })
}

// 采购收货-物料批次导入模板下载
export function getReceiptDownDefaultUploadTemplate(params) {
  return download(`/ams/receipt/down/default/upload/template`, params)
}

// 采购收货-物料批次数据导入
export function postReceiptImportData(file) {
  return upload('/ams/receipt/import/data', file)
}

// 采购收货-获取所有收货类型
export function getReceiptTypes() {
  return request({
    url: `/ams/receipt/types`,
    method: 'get'
  })
}
// 采购收货-物料批次更新
export function materialBatchUpdate(data) {
  return request({
    url: `/api/bar/code/update`,
    method: 'put',
    data
  })
}
// 获取发放、完成状态的采购订单
export function getReceiptPurchaseList() {
  return request({
    url: `/ams/receipt/purchase`,
    method: 'get'
  })
}
// 获取通用审批状态列表
export function getApprovalStatusList() {
  return request({
    url: `/api/approve/approval/status`,
    method: 'get'
  })
}
// 获取采购订单单据状态列表
export function getDocumentStatusList() {
  return request({
    url: `/ams/purchases/state`,
    method: 'get'
  })
}
// 销售导出
export function exportTag(params) {
  return download(`/api/orders/excel/export`, params)
}
// 收货单导出
export function InexportTag(params) {
  return download(`/ams/receipt/excel/export`, params, 'post')
}

// 送货单-审批（不知道有没有重命名为收货单）
export function approveReceiptExamine(params) {
  return request({
    url: `/ams/receipt/examine/approve`,
    method: 'get',
    params
  })
}
// -------------------------------------------------------------------------------
// 采购需求页面  获取生产订单号销售订单号
export function getOrderList(params) {
  return request({
    url: `/api/orders/select/type/release`,
    method: 'get',
    params
  })
}
// 单据类型
export function receiptType(params) {
  return request({
    url: `/ams/requests/order/type`,
    method: 'get',
    params
  })
}

// 保质期单位
export function getUnitSchemeList(params) {
  return request({
    url: '/api/forward/qms/unit/list',
    method: 'get',
    params
  })
}

// 获取检验方案
export function getWordsSuppliesList(params) {
  return request({
    url: '/api/forward/qms/released/and/create/list',
    method: 'get',
    params
  })
}

// 上传物料
export function uploadSuppliesList(data) {
  return request({
    url: '/api/appendix/upload',
    method: 'post',
    data
  })
}

// 获取附件
export function getSuppliesPdfFile(params) {
  return request({
    url: '/api/appendix/file/preview',
    method: 'get',
    params
  })
}

// 删除某条记录
export function deleteSuppliesPdfFile(params) {
  return request({
    url: `/api/appendix/file/${params}`,
    method: 'delete'
  })
}

// 获取列表
export function getFileList(params) {
  return request({
    url: '/api/appendix/files',
    method: 'get',
    params
  })
}

// 新增上传
export function insertUpload(data) {
  return request({
    url: '/api/resource/add',
    method: 'post',
    data
  })
}
// 生效并保存
export function effectAndSave(data) {
  return request({
    url: '/api/materials/insert/released',
    method: 'post',
    data
  })
}

// 销售订单报表按照条件导出
export function postApiOrdersExcelSaleExport(params) {
  return download(`/ams/sale/orders/excel/export`, params, 'post')
}

// 生产订单报表按照条件导出
export function postApiProcurementManagement(params) {
  return download(`/api/orders/excel/production/export`, params, 'post')
}

// 获取不同采购模式的物料列表
export function getMaterialsByPurchaseModel(data) {
  return request({
    url: `/ams/purchases/get/materials/by/purchase/model`,
    method: 'post',
    data
  })
}

// 获取关联类型的
export function getRelateTypeResult(params) {
  return request({
    url: '/ams/purchases/related/types',
    method: 'get',
    params
  })
}

// 下载默认打印模板
export function getDefaultTemplate(params) {
  return download(
    '/ams/requests/down/export/default/template',
    params
  )
}

// 上传单据模板到fastdfs
export function getUploadExportTemplate(file) {
  return upload('/ams/requests/upload/export/template', file)
}

// 获取上传的单据列表
export function getExportTemplateList() {
  return request({
    url: '/ams/requests/template/list',
    method: 'get'
  })
}

// 从下载指定模板
export function getExportTemplateExport(params) {
  return download('/ams/requests/template/export', params)
}

// 导出单据为pdf
export function getExportPrintPDF(params) {
  return download('/ams/requests/print/pdf', params, 'post')
}

// 从fast-dfs删除指定模板
export function getExportTemplateExportDelete(params) {
  return request({
    url: '/ams/requests/template/delete',
    method: 'delete',
    params
  })
}

// 导出单据为excel
export function postExportExportExcel(params) {
  return download('/ams/requests/export/excel', params, 'post')
}

// -------------------

// 从fastdfs下载默认模板
export function getDeliveryOrderExportTemplateExportDefault(params) {
  return download(
    '/ams/receipt/default/export/template/download',
    params
  )
}

// 获取上传的单据列表
export function getDeliveryOrderExportTemplateList() {
  return request({
    url: '/ams/receipt/export/template/list',
    method: 'get'
  })
}

// 上传单据模板到fastdfs
export function postDeliveryOrderExportTemplateUpload(file) {
  return upload('/ams/receipt/export/template/upload', file)
}

// 从fast-dfs下载指定模板
export function getDeliveryOrderExportTemplateExport(params) {
  return download('/ams/receipt/export/template/download', params)
}

// 从fast-dfs删除指定模板
export function deleteDeliveryOrderExportTemplateExportDelete(params) {
  return request({
    url: '/ams/receipt/export/template/delete',
    method: 'delete',
    params
  })
}

// 导出单据为pdf
export function postDeliveryOrderExportPrintPDF(params) {
  return download('/ams/receipt/export/pdf', params, 'post')
}

// 导出单据为excel
export function postDeliveryOrderExportExportExcel(params) {
  return download('/ams/receipt/export/excel', params, 'post')
}

// 获取物料拓展数据
export function getMaterialFiledConfigList() {
  return request({
    url: `/api/material/filed/config/list`,
    method: 'get'
  })
}
