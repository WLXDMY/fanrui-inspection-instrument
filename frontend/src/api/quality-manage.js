import request from '@/utils/request'
import { download, upload } from '@/api/fileTransfer'
// 3.检验报表列表页面
export function qualityList(params) {
  return request({
    // url: `/api/records/list`, // old
    url: `/api/defect/statement/list`, // new
    method: 'get',
    params
  })
}
// 返修后良品数列表更新
export function qualityListHeader(data) {
  return request({
    url: `api/records/update`,
    method: 'put',
    data
  })
}
// 产品接口
export function productList(params) {
  return request({
    url: `/api/materials/list`,
    method: 'post',
    data: params
  })
}
// 详情页面
export function detailList(params) {
  return request({
    url: `/api/records/detail/${params}`,
    method: 'get'
  })
}
// 制造单元列表
export function lineList(params) {
  return request({
    url: `/api/lines/list`,
    method: 'get',
    params
  })
}
// 工单接口
export function recordList(params) {
  return request({
    url: `/api/records/order/list`,
    method: 'get',
    params
  })
}
// ------------------------------------------1.检验方案页面接口-------------------------------------
// 1.获取检验方案列表
export function qualityPlanList(params) {
  return request({
    url: `/api/defect/scheme/list`,
    method: 'get',
    params
  })
}

// 1.检验方案——获取检验附件
export function getSchemeAttemFile(id) {
  return request({
    url: `/qms/product/v1/schemes/detail/file/${id}`,
    method: 'get'
  })
}

// 1.检验方案——删除关联项目
export function deleteSchemeItem(id, data) {
  return request({
    url: `/qms/product/v1/schemes/delete/item?id=${id}`,
    method: 'delete',
    data
  })
}

// 1.检验方案——删除关联物料类型
export function deleteMaterialTypeItem(id, data) {
  return request({
    url: `/qms/product/v1/schemes/delete/material/type?id=${id}`,
    method: 'delete',
    data
  })
}

// 1.检验方案——删除关联类型
export function deleteMaterialItem(id, data) {
  return request({
    url: `/qms/product/v1/schemes/delete/material?id=${id}`,
    method: 'delete',
    data
  })
}

// 1.检验方案——删除关联附件
export function deleteSchemeAttemFile(id, data) {
  return request({
    url: `/qms/product/v1/schemes/delete/file?id=${id}`,
    method: 'delete',
    data
  })
}

// 1.检验方案——删除不良项目
export function deleteSchemeBadItem(id, data) {
  return request({
    url: `/qms/product/v1/schemes/delete/defect?id=${id}`,
    method: 'delete',
    data
  })
}

// 获取工艺路线
export function technologyroute(query) {
  return request({
    url: '/api/procedures/list',
    method: 'get',
    params: query
  })
}

// 1.检验方案——删除关联客户
export function deleteSchemeCustomer(id, data) {
  return request({
    url: `/qms/product/v1/schemes/delete/customer?id=${id}`,
    method: 'delete',
    data
  })
}

// 2.检验方案详情
export function qualityPlanDetail(schemeId) {
  return request({
    url: `/api/defect/scheme/detail/${schemeId}`,
    method: 'get'
  })
}
// 3.检验方案状态
export function qualityPlanState() {
  return request({
    url: `/api/defect/scheme/state/list`,
    method: 'get'
  })
}
// 4.获取检验类型下拉
export function qualityType() {
  return request({
    url: `/api/defect/scheme/type/list`,
    method: 'get'
  })
}
// 5.检验方案删除
export function deleteQualityPlan(schemeId) {
  return request({
    url: `/api/defect/remove/scheme/${schemeId}`,
    method: 'delete'
  })
}
// 6.获取检验方案关联类型
export function qualityRelationType() {
  return request({
    url: `/api/defect/related/type/list`,
    method: 'get'
  })
}
// 7.添加检验方案
export function addQualityPlan(params) {
  return request({
    url: `/api/defect/add/scheme`,
    method: 'post',
    data: params
  })
}
// 8.获取生效的不良定义列表(新增table中)
export function qualityPlanDefineList(params) {
  return request({
    url: `/api/defect/released/define/list`,
    method: 'get',
    params
  })
}

// 3.涉及缺陷
export function involveEnumList() {
  return request({
    url: `/api/defect/involve/enum/list`,
    method: 'get'
  })
}
// 9 .检验方案编辑
export function editQualityPlan(params) {
  return request({
    url: `/api/defect/update/scheme`,
    method: 'post',
    data: params
  })
}

// 删除某条记录
export function deleteSuppliesPdfFile(fileId) {
  return request({
    url: `/qms/scheme/remove/scheme/file/${fileId}`,
    method: 'delete'
  })
}

// 获取检验方案的不良排序列表
export function getDefectSchemeTypeSortList(params) {
  return request({
    url: `/api/defect/scheme/type/sort/list`,
    method: 'get',
    params
  })
}
// 检验类型枚举
export function schemeTypeList() {
  return request({
    url: `/qms/product/v1/dicts/inspect/type/list`,
    method: 'get'
  })
}
// AQL：枚举
export function aqlList() {
  return request({
    url: `/qms/product/v1/dicts/sample/aql/value/list`,
    method: 'get'
  })
}
// 检验水平：枚举
export function levelList() {
  return request({
    url: `/qms/product/v1/dicts/sample/inspect/level/list`,
    method: 'get'
  })
}
// 严格度：枚举
export function getSternWidthLevelList() {
  return request({
    url: `/qms/product/v1/dicts/sample/stringency/list`,
    method: 'get'
  })
}
// ------------------------------------------2.不良定义页面接口-------------------------------------
// 1.不良定义列表
export function qualityPoorDefineList(params) {
  return request({
    url: `/api/defect/define/list`,
    method: 'get',
    params
  })
}
// 2.不良定义详情
export function qualityPoorDefineDetail(defectId) {
  return request({
    url: `/api/defect/define/detail/${defectId}`,
    method: 'get'
  })
}
// 3.不良类型下拉
export function badTypeLisy() {
  return request({
    url: `/api/defect/define/type/list`,
    method: 'get'
  })
}
// 4.不良类型状态下拉
export function badTypeStateList() {
  return request({
    url: `/api/defect/define/state/list`,
    method: 'get'
  })
}
// 5.不良定义删除列表
export function deletepoorDefinition(defectId) {
  return request({
    url: `/api/defect/remove/define/${defectId}`,
    method: 'delete'
  })
}
// 6.新增不良定义
export function addQualityDefine(params) {
  return request({
    url: `/api/defect/add/define`,
    method: 'post',
    data: params
  })
}
// 7.修改不良定义
export function editQualityDefine(params) {
  return request({
    url: `/api/defect/update/define`,
    method: 'put',
    data: params
  })
}
// 8.不良定义导出
export function QualityDefineExport(params) {
  return download('/api/defect/define/export', params)
}
// 不良定义预览导入
export function QualityDefinePreImport(file) {
  return upload('/api/defect/define/preview', file)
}
// 不良定义导入
export function QualityDefineImport(params) {
  return request({
    url: `/api/defect/define/import`,
    method: 'post',
    data: params
  })
}
// 不良类型定义按钮页列表
export function qualityDefineBtnList(params) {
  return request({
    url: `/api/defect/define/type/list`,
    method: 'get',
    params
  })
}
// 不良类型定义按钮页删除
export function deleteBadType(code) {
  return request({
    url: `/api/defect/define/type/remove/${code}`,
    method: 'delete'
  })
}
// 添加不良类型
export function addBadType(params) {
  return request({
    url: `/api/defect/define/type/add`,
    method: 'post',
    data: params
  })
}
// 修改不良类型
export function editBadType(params) {
  return request({
    url: `/api/defect/define/type/update`,
    method: 'put',
    data: params
  })
}

// 不良定义导入管理

// 导出默认模板
export function defectDefineDefaultTemplate() {
  return download(`/api/defect/define/export/default/template`)
}
// 导入数据
export function defectDefineExcelImport(file) {
  return upload(`/api/defect/define/excel/import`, file)
}
// 导入进度
export function defectDefineImportProgress() {
  return request({
    url: `/api/defect/define/import/progress`,
    method: 'get'
  })
}
// ------------------------------------------3.检验记录页面接口-----------------------------------------------------
// 下载检验检验记录默认模板
export function downloadQualityRecordDefTpl() {
  return download('/api/defect/record/default/template/export')
}
// 上传检验检验记录报表模板
export function uploadQualityRecordTpl(file) {
  return upload('/api/defect/record/upload/template', file)
}
// 检验记录导出
export function qualityRecordExport(params) {
  return download('/api/defect/record/export', params)
}
// 检验记录列表
export function qualityRecordList(params) {
  return request({
    url: `/api/defect/record/list`,
    method: 'get',
    params
  })
}
// 获取检验工位即上报位置下拉
export function qualityPositionList() {
  return request({
    url: `/api/defect/record/fac`,
    method: 'get'
  })
}

// ------------------------------------------4.检验报表页面接口-------------------------------------
// 下载检验报表默认模板
export function downloadQualityReportDefTpl() {
  return download('/api/defect/statement/default/template/export')
}
// 上传检验报表模板
export function uploadQualityReportTpl(file) {
  return upload('/api/defect/statement/upload/template', file)
}
// 检验报表导出
export function qualityReportExport(params) {
  return download('/api/defect/statement/export', params) // 家润
  // return download('/api/records/export', params) // 杨洋
}
// 获取检验报表详情
export function getQualityReportDetail(id) {
  return request({
    url: `/api/defect/statement/detail/${id}`,
    method: 'get'
  })
}
// ------------------------------------------5.维修方案页面接口-------------------------------------
// 1.获取维修方案列表
export function maintainPlanList(params) {
  return request({
    url: `/api/maintain/scheme/list`,
    method: 'get',
    params
  })
}
// 2. 获取维修方案的维修类型下拉
export function maintainPlanTypeList() {
  return request({
    url: `/api/maintain/scheme/type/list`,
    method: 'get'
  })
}
// 3.获取维修方案状态下拉
export function maintainStateList() {
  return request({
    url: `/api/maintain/scheme/state/list`,
    method: 'get'
  })
}
// 4.维修方案关联类型
export function maintainRelationType() {
  return request({
    url: `/api/maintain/related/type/list`,
    method: 'get'
  })
}
// 5.维修方案故障类型下拉
export function maintainFaultType() {
  return request({
    url: '/api/fault/define/type/list',
    method: 'get'
  })
}
// 6.获取故障工位列表(即所有工位)
export function maintainFaultStation() {
  return request({
    url: `/api/maintain/scheme/fac/list`,
    method: 'get'
  })
}
// 7.维修方案删除
export function deleteMaintainPlan(schemeId) {
  return request({
    url: `/api/maintain/remove/scheme/${schemeId}`,
    method: 'delete'
  })
}
// 8.获取生效的维修定义列表（增加不良）
export function MaintainPlanDefineList(params) {
  return request({
    url: `/api/maintain/released/define/list`,
    method: 'get',
    params
  })
}
// 9.获取维修方案详情
export function maintainPlanDetail(schemeId) {
  return request({
    url: `/api/maintain/scheme/detail/${schemeId}`,
    method: 'get'
  })
}
// 10.新增维修方案
export function addmaintainPlan(params) {
  return request({
    url: `/api/maintain/add/scheme`,
    method: 'post',
    data: params
  })
}
// 11.修改维修方案
export function editMaintainPlan(params) {
  return request({
    url: `/api/maintain/update/scheme`,
    method: 'post',
    data: params
  })
}

// 12.检验返工  - 关联故障工位
export function getMaintainRecordFaultFac() {
  return request({
    url: '/api/maintain/record/fault-fac',
    method: 'get'
  })
}
// ------------------------------------------6.维修定义页面接口-------------------------------------
// 1.维修定义删除
export function deleteMaintainDefine(maintainId) {
  return request({
    url: `/api/maintain/remove/define/${maintainId}`,
    method: 'delete'
  })
}
// 2.获取维修定义列表
export function maintainDefineList(params) {
  return request({
    url: `/api/maintain/define/list`,
    method: 'get',
    params
  })
}
// 3.获取维修定义详情
export function maintainDefineDetail(maintainId) {
  return request({
    url: `/api/maintain/define/detail/${maintainId}`,
    method: 'get'
  })
}
// 4.添加维修定义
export function addMaintainDefine(params) {
  return request({
    url: `/api/maintain/add/define`,
    method: 'post',
    data: params
  })
}
// 5.维修定义编辑
export function editMaintainDefine(params) {
  return request({
    url: `/api/maintain/update/define`,
    method: 'put',
    data: params
  })
}
// 6.获取维修定义状态
export function maintainDefineStatus() {
  return request({
    url: `/api/maintain/define/state/list`,
    method: 'get'
  })
}
// 7.维修定义导出
export function maintainDefineExport(params) {
  return download('/api/maintain/define/export', params)
}
// 8. 获取维修类型下拉
export function maintainTypeList() {
  return request({
    url: `/api/maintain/type/list`,
    method: 'get'
  })
}
// 获取所有工位实列
export function getAllModelTreeList() {
  return request({
    url: `/api/sys/model/true/list`,
    method: 'get'
  })
}
// 不良定义预览导入
export function maintainDefinePreImport(file) {
  return upload('/api/maintain/define/preview', file)
}
// 不良定义导入
export function maintainDefineImport(params) {
  return request({
    url: `/api/maintain/define/import`,
    method: 'post',
    data: params
  })
}
// 维修定义按钮页列表
export function maintainDefineBtnList(params) {
  return request({
    url: `/api/maintain/type/list`,
    method: 'get',
    params
  })
}
// 维修定义按钮页列表删除
export function maintainDefineBtnDelete(code) {
  return request({
    url: `/api/maintain/type/remove/${code}`,
    method: 'delete'
  })
}
// 维修定义按钮页列表修改
export function maintainDefineBtnEdit(params) {
  return request({
    url: `/api/maintain/type/update`,
    method: 'put',
    data: params
  })
}
// 维修定义按钮页列表新增
export function maintainDefineBtnAdd(params) {
  return request({
    url: `/api/maintain/type/add`,
    method: 'post',
    data: params
  })
}
// ------------------------------------------7.维修记录页面接口-------------------------------------
// 获取维修记录列表
export function maintainRecordList(params) {
  return request({
    url: `/api/maintain/record/list`,
    method: 'get',
    params
  })
}
// 获取维修工位即上报位置下拉
export function maintainPositionList() {
  return request({
    url: `/api/maintain/record/fac`,
    method: 'get'
  })
}

// 下载返工记录默认模板
export function downloadReworkRecordDefTpl(params) {
  return download('/api/maintain/record/template/export', params)
}
// 上传返工记录报表模板
export function uploadReworkRecordTpl(file) {
  return upload('/api/maintain/record/template/upload', file)
}
// 维修记录导出
export function maintainRecordExport(params) {
  return download('/api/maintain/record/export', params)
}
// ------------------------------------------8.维修报表页面接口-------------------------------------

// 下载维修报表默认模板
export function downloadReworkReportDefTpl(params) {
  return download('/api/maintain/statement/template/export', params)
}
// 上传维修报表报表模板
export function uploadReworkReportTpl(file) {
  return upload('/api/maintain/statement/template/upload', file)
}
// 维修报表导出
export function maintainReportExport(params) {
  return download('/api/maintain/statement/export', params)
}
// 1.获取维修列表
export function maintainReportList(params) {
  return request({
    url: `/api/maintain/statement/list`,
    method: 'get',
    params
  })
}
// 2.获取工单

export function maintainReportWorkNumber() {
  return request({
    url: `/api/maintain/work/order`,
    method: 'get'
  })
}
// --------------------------检验方案接口--------------------------------------
// 删除检验方案
export function deletecheckPlan(id) {
  return request({
    // url: `/api/defect/remove/scheme/${id}`,
    method: 'delete'
  })
}
// 获取检验方案列表
export function getCheckList(params) {
  return request({
    // url: `/qms/inspection/list`,
    method: 'get',
    params
  })
}
// -------------------------项目组定义接口-----------------------------------------------
// 1.删除项目组定义
export function deleteProjectTeamDefine(params) {
  return request({
    url: `/qms/product/v1/item/groups/delete/batch`,
    method: 'delete',
    data: params
  })
}
// 2.获取项目组定义列表
export function getProjectTeamList(params) {
  return request({
    url: `/qms/product/v1/item/groups/list`,
    method: 'get',
    params
  })
}
export function getProjectGroupTreeList(params) {
  return request({
    url: `/qms/product/v1/item/groups/tree/list`,
    method: 'post',
    data: params
  })
}
// 分页查询检验项目组列
export function postProjectGroupList(params) {
  return request({
    url: '/qms/product/v1/item/groups/list',
    method: 'post',
    data: params
  })
}
// 3.新增项目组定义
export function addProjectTeamDefine(params) {
  return request({
    url: `/qms/product/v1/item/groups/add`,
    method: 'post',
    data: params
  })
}
// 4.编辑项目组定义
export function editProjectTeamDefine(params) {
  return request({
    url: `qms/product/v1/item/groups/update`,
    method: 'put',
    data: params
  })
}
// 5.获取项目组定义详情
export function getProjectTeamDefineDetail(inspectionItemGroupId) {
  return request({
    url: `/qms/product/v1/item/groups/detail/${inspectionItemGroupId}`,
    method: 'get'
  })
}
// --------------------------送检单接口------------------------------------------------
// 1.送检单删除
export function deleteCheckSheet(data) {
  return request({
    url: `/qms/product/v1/inspects/delete`,
    method: 'post',
    data
  })
}

// 2.获取送检单列表 按物料
export function getCheckUnitListByMaterial(data) {
  return request({
    url: `/qms/product/v1/inspects/page/order/material`,
    method: 'post',
    data
  })
}

// 2.获取送检单列表 按单
export function getCheckUnitListByOrder(data) {
  return request({
    url: `/qms/product/v1/inspects/page/order`,
    method: 'post',
    data
  })
}
// 3.新增送检单
export function addCheckUnit(params) {
  return request({
    url: `/qms/inspectsheets/add`,
    method: 'post',
    data: params
  })
}
// 4.获取送检状态
export function getCheckUnitStatus(params) {
  return request({
    url: `qms/product/v1/dicts/inspect/status/list`,
    method: 'get',
    params
  })
}
// 4.获取检验状态
export function getCheckMasterialStatus(params) {
  return request({
    url: `qms/product/v1/dicts/inspect/masterial/status/list`,
    method: 'get',
    params
  })
}
// 4.获取产品汇总状态
export function getResultStatus() {
  return request({
    url: '/qms/enums/get/result/status',
    method: 'get'
  })
}
// 5.获取送检单单据类型
export function getCheckUnitType(params) {
  return request({
    url: `/qms/enums/get/doc/type`,
    method: 'get',
    params
  })
}
// 6.送检单类型
export function getCheckType(params) {
  return request({
    url: `/qms/enums/get/type`,
    method: 'get',
    params
  })
}
// 7.关联单据编码（即查询质量检验的工单列表）
export function getCheckCode(params) {
  return request({
    url: `/api/workorders/quality/list`,
    method: 'get',
    params
  })
}
// 8.根据物料id查询检验方案
export function getCheckPlanList(params) {
  return request({
    url: `/qms/inspectsheets/get/items`,
    method: 'get',
    params
  })
}

// 9.根据关联单据编码 获取半成品物料集合
// export function getMaterialInfo(id) {
//   return request({
//     url: `/api/inspectsheets/get/items/${id}`,
//     method: 'get'
//   })
// }
// 10.编辑送检单
export function editCheckUnit(params) {
  return request({
    url: `/qms/inspectsheets/update`,
    method: 'put',
    data: params
  })
}
// 11.获取送检人下拉
export function getCheckPerson() {
  return request({
    url: `/api/users/list/by/company?enabled="enabled"`,
    method: 'get'
  })
}
// 12.根据工单号获取批次号
export function getBarCode(params, orderNumber) {
  return request({
    url: `/api/bar/code/list/${orderNumber}`,
    method: 'get',
    params
  })
}
// 切换批号时获取报告
export function getCheckSheetBarCode(params) {
  return request({
    url: `/qms/report/get/report/code`,
    method: 'get',
    params
  })
}
// 查询检验方案
export function getInspectsheetsGetQualitySchemes(params) {
  return request({
    url: '/qms/inspectsheets/get/quality/schemes',
    method: 'get',
    params
  })
}
// 13. 过程检验获取半成品物料信息
export function getProcessMaterialInfo(params) {
  return request({
    url: `/api/materials/semi/products`,
    method: 'get',
    params
  })
}
// 14.获取检验单详情
export function checkSheetDetail(id) {
  return request({
    url: `/qms/inspectsheets/get/${id}`,
    method: 'get'
  })
}
// 15.送检单导出检验报告
export function exportReport(params) {
  // return download('/api/inspectsheets/export', params)
}
// 16.检验方法判定列表请求
export function getMethodsList(params) {
  return request({
    url: '/qms/product/v1/dicts/item/detection/method/list',
    method: 'get',
    params
  })
}
// 17.获取样次信息
export function getSampleOrder(id) {
  return request({
    url: `/qms/inspectsheets/get/inspection/detail/${id}`,
    method: 'get'
  })
}
// 18.新增样次
export function addSampleOrder(id) {
  return request({
    url: `/qms/inspectsheets/get/groups/${id}`,
    method: 'get'
  })
}
export function sampleSave(data) {
  return request({
    url: `qms/inspectsheets/save/inspection/detail`,
    method: 'post',
    data
  })
}
// 检验范围
export function checkArea() {
  return request({
    url: `/qms/inspectsheets/get/scope/type`,
    method: 'get'
  })
}
export function qualitySchemes(params) {
  return request({
    url: '/qms/inspectsheets/get/quality/schemes',
    method: 'get',
    params
  })
}
// AQL计算
export function aqlCalculate(params) {
  return request({
    url: '/api/aql/judge/pass',
    method: 'get',
    params
  })
}

export function getMaterialBatch(data) {
  return request({
    url: 'api/bar/code/list',
    method: 'post',
    data
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

// 通过id获取规则详情
export function getNumRuleSeqByType(params) {
  return request({
    url: '/api/numberRule/getSeqByType',
    method: 'post',
    data: params
  })
}

// 查询工单相关信息
export function getWorkordersByNumber(params) {
  return request({
    url: '/api/workorders/by/number',
    method: 'get',
    params
  })
}

// 批次号生成
export function getInspectsheetsAddBarcode(params, data) {
  return request({
    url: '/qms/inspectsheets/add/barcode',
    method: 'post',
    params,
    data
  })
}

// 送检单-批量编辑状态
export function putInspectsBatchStatesUpdate(data) {
  return request({
    url: '/qms/product/v1/inspects/batch/update/state',
    method: 'post',
    data
  })
}

// --------------------------检验项目接口--------------------------
// 检验项目 模版下载
export function projectTemplateExport(data) {
  return download(`/qms/product/v1/items/export/default/template`)
}
// 检验项目 导入
export function projectExcelImport(file) {
  return upload(`/qms/product/v1/items/excel/import`, file)
}
// 检验项目 导入进度
export function projectImportProgress(data) {
  return request({
    url: `/qms/product/v1/items/import/progress`,
    method: 'get',
    data
  })
}

// 检验项目 审批
export function putItemsApproveBatch(data) {
  return request({
    url: '/qms/product/v1/items/approve/batch',
    method: 'post',
    data
  })
}

// 检验项目下拉接口
export function checkProjectSelectList(params) {
  return request({
    url: 'qms/item/get/list',
    method: 'get',
    params
  })
}
// 分页查询检验项目列表
export function getCheckProjectList(data) {
  return request({
    url: '/qms/product/v1/items/list',
    method: 'post',
    data
  })
}
export function getAddCheckProjectList(params) {
  return request({
    url: '/qms/item/released/list',
    method: 'get',
    params
  })
}
// 产品检验项目的状态
export function getProjectItemStateList() {
  return request({
    url: '/qms/product/v1/dicts/status/list',
    method: 'get'
  })
}
// 检验项目批量编辑状态
export function projectItemStateBatchUpdate(data) {
  return request({
    url: '/qms/product/v1/items/update/state/batch',
    method: 'post',
    data
  })
}
// 分页查询检验项目组列
export function getProjectGroupList(data) {
  return request({
    url: '/qms/product/v1/item/groups/list',
    method: 'post',
    data: data || { current: 1, size: 100 }
  })
}

// 新增检验项目
export function addProjectItem(data) {
  return request({
    url: 'qms/product/v1/items/add',
    method: 'post',
    data
  })
}

// 保存并启用检验项目
export function savaAndEffectiveProjectItem(data) {
  return request({
    url: 'qms/product/v1/items/add/release',
    method: 'post',
    data
  })
}
// 检验项目项目保存且生效
export function projectItemSaveAndEffect(data) {
  return request({
    url: '/qms/item/add/released',
    method: 'post',
    data
  })
}
// 获取检验项目详情
export function getProjectDetail(params) {
  return request({
    url: `/qms/product/v1/items/detail/${params}`,
    method: 'get'
  })
}

// 修改检验项目
export function updateProjectItem(data) {
  return request({
    url: '/qms/product/v1/items/update',
    method: 'put',
    data
  })
}

// 删除提示 检验项目
export function deleteProjectItemPrompt(data) {
  return request({
    url: `/qms/product/v1/delete/prompt/item/${data}`,
    method: 'delete'
  })
}
// 删除检验项目
export function deleteProjectItem(data) {
  return request({
    url: `/qms/product/v1/items/delete/batch`,
    method: 'delete',
    data
  })
}

// 模板下载
export function downloadDataList(params) {
  return download('/qms/item/excel/export ', params)
}

// 审批状态
export function getApproveItemStatus() {
  return request({
    url: '/qms/enums/get/approve/item/status',
    method: 'get'
  })
}

// 分页查询检验方案 --按检验方案
export function getDetectionSchemeList(data) {
  return request({
    url: '/qms/product/v1/schemes/list',
    method: 'post',
    data
  })
}

// 分页查询检验方案 --按检验项目
export function getDetectionSchemeByProjectList(data) {
  return request({
    url: '/qms/product/v1/schemes/item/list',
    method: 'post',
    data
  })
}

// 分页查询检验方案 --按物料
export function getDetectionSchemeByMaterialList(data) {
  return request({
    url: '/qms/product/v1/schemes/material/list ',
    method: 'post',
    data
  })
}

// 新增检验方案
export function addDetectionSchemeList(data) {
  return request({
    url: '/qms/product/v1/schemes/add',
    method: 'post',
    data
  })
}

// 新增检验方案-保存并且生效
export function detectionSchemeSaveExpir(data) {
  return request({
    url: '/qms/product/v1/schemes/add/release',
    method: 'post',
    data
  })
}

// 检验方案-修改
export function detectionSchemeUpdate(data) {
  return request({
    url: '/qms/product/v1/schemes/update',
    method: 'put',
    data
  })
}

// 检验方案新增且生效
export function detectionSchemeSaveAndEffect(data) {
  return request({
    url: '/qms/scheme/add/released',
    method: 'post',
    data
  })
}

// 修改检验方案
export function updateDetectionSchemeList(data) {
  return request({
    url: '/qms/scheme/update/inspection',
    method: 'post',
    data
  })
}

// 删除提示 检验方案
export function deleteDetectionSchemeListPrompt(data) {
  return request({
    url: `/qms/product/v1/delete/prompt/scheme/${data}`,
    method: 'delete'
  })
}

// 删除检验方案
export function deleteDetectionSchemeList(data) {
  return request({
    url: `/qms/product/v1/schemes/delete/batch`,
    method: 'delete',
    data
  })
}

// 获取检验项目比较符列表接口
export function getComparisonOperatorsList(params) {
  return request({
    url: `/qms/product/v1/dicts/item/comparator/list`,
    method: 'get',
    params
  })
}

// 获取检验项目输入方式列表接口
export function getInputModeListApi(params) {
  return request({
    url: `/qms/product/v1/dicts/item/input/list`,
    method: 'get',
    params
  })
}

// 获取检验方案详情
export function getDetectionDetail(params) {
  return request({
    url: `/qms/scheme/inspection/detail/${params}`,
    method: 'get'
  })
}

// 获取检验方案详情(无物料)
export function getDetectionNotmaterialDetail(params) {
  return request({
    url: `/qms/scheme/inspection/notmaterial/detail/${params}`,
    method: 'get'
  })
}

// 分页获取方案的物料列表
export function getMaterialList(data) {
  return request({
    url: `/qms/scheme/inspection/materiel/list`,
    method: 'post',
    data
  })
}

// 获取检验配置详情
export function getInspectConfig() {
  return request({
    url: `/qms//inspect/config/detail`,
    method: 'get'
  })
}

// 保存检验配置
export function saveInspectConfig(data) {
  return request({
    url: '/qms//inspect/config/save',
    method: 'post',
    data
  })
}

// 导入预览文件
export function previewFileParams(data) {
  return request({
    url: '/qms/item/inspect/preview',
    method: 'post',
    data
  })
}

// 确认导入
export function fileSureImportList(data) {
  return request({
    url: '/qms/item/inspect/import',
    method: 'post',
    data
  })
}

export function fileExport(params) {
  return download('/qms/result/excel/export', params)
}
// 是否需要出现在检验报告中
export function getIsExportNameList(params) {
  return request({
    url: `/qms/item/export/list `,
    method: 'get',
    params
  })
}

// 枚举 是否
export function getEnumsList(params) {
  return request({
    url: `/qms/product/v1/dicts/item/export/list`,
    method: 'get',
    params
  })
}
// ----------------------------------产品检验模板接口-----------------------------
// 获取模板列表数据
export function getCheckTemplateList(data) {
  return request({
    url: `/qms/scheme/template/list`,
    method: 'post',
    data
  })
}
// 模板列表新增保存
export function checkTemplateAdd(data) {
  return request({
    url: `/qms/scheme/template/add`,
    method: 'post',
    data
  })
}
// 模板列表保存并生效
export function checkTemplateAddEeffect(data) {
  return request({
    url: `/qms/scheme/template/add/released`,
    method: 'post',
    data
  })
}
// 模板列表更新
export function checkTemplateUpdate(data) {
  return request({
    url: `/qms/scheme/template/update/inspection`,
    method: 'post',
    data
  })
}

// 模板列表详情数据
export function checkTemplateDetail(params) {
  return request({
    url: `/qms/scheme/template/inspection/detail/${params}`,
    method: 'get'
    // params
  })
}

// 删除模板
export function deleteCheckTemplate(params) {
  return request({
    url: `/qms/scheme/template/remove/inspection/${params}`,
    method: 'delete'
  })
}

// 模板编辑时状态表
export function getCheckTemplateStatus(params) {
  return request({
    url: `/qms/scheme/template/state/list`,
    method: 'get',
    params
  })
}

// 模板审批
export function templateApproval(params) {
  return request({
    url: '/qms/scheme/template/approve',
    method: 'get',
    params
  })
}

// 模板导入管理-下载导入模板
export function downloadTemplateFile(params) {
  return download('/qms/scheme/template/default/import/template', params)
}

// 模板导入管理-导入
export function importTemplateFile(file) {
  return upload('/qms/scheme/template/excel/import', file)
}

// 模板导入管理-导入进度
export function importTemplateFileProgress(params) {
  return request({
    url: '/qms/scheme/template/import/order/progress',
    method: 'get',
    params
  })
}
// ----------------------------------产品检验汇总接口-----------------------------
// 1.获取列表
export function getCheckResultList(params) {
  return request({
    url: `/qms/result/page`,
    method: 'get',
    params
  })
}
// 2. 导出
export function exportFileList(params) {
  return download('/qms/result/excel/export', params)
}

// 3. 详情
export function getCurrentDetailList(params) {
  return request({
    // url: `/api/result/get/${params}`,
    url: `/qms/result/get/inspect`,
    method: 'get',
    params
  })
}

// 检验导出
export function downloadExportData(params) {
  return download('/qms/report/file/export', params) // 新接口
}

// 送检单导出
export function downloadSheetExportData(params) {
  return download('/qms/inspectsheets/sheet/export', params, 'post') // 新接口
}

// 送检单导出
export function postDownloadSheetExportData(params) {
  return download('/qms/inspectsheets/sheet/export', params, 'post') // 新接口
}

// 获取状态
export function getStateList(params) {
  return request({
    url: '/qms/item/inspect/state/list',
    method: 'get',
    params
  })
}
// 产线
export function linesList() {
  return request({
    url: `/api/lines/list`,
    method: 'get'
  })
}
// 检验结果编辑
export function editProjectResult(data) {
  return request({
    url: '/qms/result/update',
    method: 'put',
    data
  })
}

// 检验方案审批
export function schemeApproval(params) {
  return request({
    url: '/qms/scheme/approve',
    method: 'get',
    params
  })
}

// 获取审批的状态
export function getApprovalState(params) {
  return request({
    url: '/qms/enums/get/approve/status',
    method: 'get',
    params
  })
}

// 检验结果的审批
export function resultApprovalCurrent(data) {
  return request({
    url: '/qms/result/aprove',
    method: 'post',
    data
  })
}
// 产品检验汇总状态
export function getCheckRersultState(params) {
  return request({
    url: '/qms/enums/get/result/status',
    method: 'get',
    params
  })
}
// 审批
export function approvalProjectList(params) {
  return request({
    url: '/qms/item/examine/approve',
    method: 'get',
    params
  })
}

// 获取审批的状态
export function getApprovalProjectStateList(params) {
  return request({
    url: '/qms/item/approval/state/list',
    method: 'get',
    params
  })
}

// 检验方案的审批
export function approvalProjectCurrentList(params) {
  return request({
    url: '/qms/scheme/approve',
    method: 'get',
    params
  })
}

// 打印
export function getPrintList(params) {
  return request({
    url: '/qms/result/excel/print',
    method: 'get',
    params
  })
}
// 删除检验结果
export function deleteCheckResult(id) {
  return request({
    url: `/qms/result/delete/${id}`,
    method: 'delete'
  })
}

// 获取次数
export function getRecordsNum(id, params) {
  return request({
    url: `/qms/nums/get/nums/${id}`,
    method: 'get',
    params
  })
}

// 获取检验人列表
export function getUsersListByCompany() {
  return request({
    url: `/api/users/list/by/company?enabled="enabled"`,
    method: 'get'
  })
}

// 获取保存是否返回配置
export function getSaveAndBackConfig(data) {
  return request({
    url: '/api/business/config/detail',
    method: 'post',
    data
  })
}
// -------------------------检验报告接口-----------------------
// 1.获取检验报告列表
export function getExamineReportList(params) {
  return request({
    url: `/qms/report/page`,
    method: 'get',
    params
  })
}
// 2.获取检验报告的状态
export function getExamineReportState(params) {
  return request({
    url: '/qms/enums/get/report/status',
    method: 'get',
    params
  })
}
// 3.获取检验报告的编辑页面的详情
export function getExamineReportEditDetail(barCode) {
  return request({
    url: `/qms/report/get/${barCode}`,
    method: 'get'
  })
}
// 3.获取检验报告的详情页面的详情
export function getExamineReportDetail(barCode) {
  return request({
    url: `/qms/report/get/code/${barCode}`,
    method: 'get'
  })
}
// 4.生成报告接口
export function generateReport(params) {
  return request({
    url: `/qms/report/generate/report`,
    method: 'post',
    data: params
  })
}
// 5.生成报告审批
export function generateReportApproval(params) {
  return request({
    url: '/qms/report/aprove',
    method: 'post',
    data: params
  })
}
// 6.编辑页保存
export function examineReportEdit(params) {
  return request({
    url: '/qms/report/update',
    method: 'put',
    data: params
  })
}

// 查询故障类型
export function getFaultDefineList(params) {
  return request({
    url: '/api/fault/define/list',
    method: 'get',
    params
  })
}
// 新增故障类型项
export function postFaultDefineInsert(data) {
  return request({
    url: '/api/fault/define/insert',
    method: 'post',
    data
  })
}
//  编辑故障类型项
export function putFaultDefineUpdate(data) {
  return request({
    url: '/api/fault/define/update',
    method: 'put',
    data
  })
}
//  删除故障类型项
export function deleteFaultDefineUpdate(id) {
  return request({
    url: `/api/fault/define/delete/${id}`,
    method: 'delete'
  })
}

//  获取品质反馈列表
export function postFeedBackList(data) {
  return request({
    url: '/api/feed/back/list',
    method: 'post',
    data
  })
}

//  新增品质反馈
export function postFeedBackAdd(data) {
  return request({
    url: '/api/feed/back/add',
    method: 'post',
    data
  })
}

//  编辑品质反馈
export function putFeedBackEdit(data) {
  return request({
    url: '/api/feed/back/edit',
    method: 'put',
    data
  })
}

//  删除品质反馈
export function deleteFeedBackById(id) {
  return request({
    url: `/api/feed/back/del/${id}`,
    method: 'delete'
  })
}

// 查询来料反馈记录
export function postFeedRecordByCode(data) {
  return request({
    url: '/api/code/record/feed/record/by/code',
    method: 'post',
    data
  })
}

// 查询来料反馈记录(根据id)
export function getMaintainMaterialRecord(params) {
  return request({
    url: '/api/maintain/material/record',
    method: 'get',
    params
  })
}

// 编辑反馈说明
export function putFeedRecordEdit(data) {
  return request({
    url: '/api/feed/record/edit ',
    method: 'put',
    data
  })
}

// 根据筛选条件，分页获取产品检验详情
export function getInspectsheetsDetailPage(params) {
  return request({
    url: '/qms/inspectsheets/detail/page',
    method: 'get',
    params
  })
}

// 根据筛选条件，导出产品检验详情
export function getInspectsheetsDetailExport(params) {
  return download('/qms/inspectsheets/detail/export', params)
}

// 获取所有的送检类型
export function getInspectsheetsDetailAllInspectType() {
  return request({
    url: '/qms/inspectsheets/detail/all/inspect/type',
    method: 'get'
  })
}

// 获取所有的单据类型
export function getInspectsheetsDetailAllDocumentType() {
  return request({
    url: '/qms/inspectsheets/detail/all/document/type',
    method: 'get'
  })
}

// 获取是否合格的类型
export function getInspectsheetsDetailAllQualifiedType() {
  return request({
    url: '/qms/inspectsheets/detail/all/qualified/type',
    method: 'get'
  })
}

// 获取检验方案状态
export function getSchemeStateList() {
  return request({
    url: '/qms/scheme/state/list',
    method: 'get'
  })
}

// 获取检验方案-通用物料开关状态
export function getGeneralMaterialSwitchList() {
  return request({
    url: '/qms/scheme/general/material/switch/list',
    method: 'get'
  })
}

// 根据检验方案id查询附件
export function getSchemeGetFiles(params) {
  return request({
    url: '/api/scheme/get/files',
    method: 'get',
    params
  })
}

// 根据送检单id检验结果附件
export function getInspectsheetsGetPictures(sheetId) {
  return request({
    url: `/api/inspectsheets/get/pictures/${sheetId}`,
    method: 'get'
  })
}

// 产品检验方案-批量审批
export function putSchemeApproveBatch(data) {
  return request({
    url: '/qms/product/v1/schemes/approve/batch',
    method: 'post',
    data
  })
}

// 产品检验方案-批量编辑状态
export function putSchemeBatchUpdate(data) {
  return request({
    url: '/qms/product/v1/schemes/update/state/batch',
    method: 'post',
    data
  })
}

// 获取复核状态
export function getCheckStatus(params) {
  return request({
    url: '/qms/inspectsheets/state/list',
    method: 'get',
    params
  })
}

// 复核确认按钮
export function sureCheckBtn(data) {
  return request({
    url: '/qms/inspectsheets/review',
    method: 'post',
    data
  })
}

// 产品检验方案-下载默认转换模板
export function downDefaultCheckPlan() {
  return download('/qms/product/v1/schemes/export/default/template')
}
// 产品检验方案-上传自定义转换模板
export function uploadcheckPlanImportTemplate(file) {
  return upload('/qms/product/v1/schemes/import/order/template', file)
}
// 产品检验方案-下载自定义转换模板
export function checkPlanCustomTemplateExport(file) {
  return download('/qms/product/v1/schemes/export/custom/template')
}
// 产品检验方案-下载导入模板
export function checkPlanImportTemplateExport(file) {
  return download('/qms/product/v1/schemes/export/order/template')
}

// 产品检验方案-导入模板
export function uploadCheckPlanImport(file, params) {
  return upload('/qms/product/v1/schemes/excel/import', file, params)
}
// 产品检验方案-获取导入进度
export function getCheckPlanImportProgress() {
  return request({
    url: '/qms/product/v1/schemes/import/progress',
    method: 'get'
  })
}

// 产品检验方案-下载默认导出模板
export function schemesDefaultExportTemplate() {
  return download('/qms/product/v1/schemes/default/export/template')
}

// 产品检验方案-查询上传模版列表
export function schemesQueryUploadFileListWork() {
  return request({
    url: `/qms/product/v1/upload/file/list?modelType=4`,
    method: 'get'
  })
}

// 产品检验方案-导出
export function getSchemesSycExports(query) {
  return request({
    url: '/qms/product/v1/schemes/excel/export',
    method: 'post',
    data: query
  })
}

// 产品检验方案-导出(查询 导入进度)
export function schemesExportTask(taskId) {
  return request({
    url: `/qms/product/v1/schemes/export/task/${taskId}`,
    method: 'get'
  })
}

// 产品检验方案： 分页查询当前导出任务列表
export function schemesExportTaskPage(params) {
  return request({
    url: '/qms/product/v1/schemes/export/task/page',
    method: 'get',
    params
  })
}

// 产品检验方案-导出通过id删除上传的单据模板
export function schemesUploadFileDelete(params) {
  return request({
    url: `/qms/product/v1/upload/file/delete`,
    method: 'delete',
    params
  })
}

// 产品检验-送检单导出 - 自定义模板下载
export function schemesDownloadListExportTemplate(params) {
  return download(`/qms/inspectsheets/download/list/export/template?id=${params.id}`, '', 'post')
}

// 产品检验方案-上传自定义导出模板
export function schemesUploadListExportTemplate(file) {
  return upload('/qms/product/v1/schemes/upload/list/export/template', file)
}

// 检验定义 新增
export function definitionAdd(data) {
  return request({
    url: '/qms/inspection/type/add',
    method: 'post',
    data
  })
}

// 检验定义 首页面
export function definitionList(params) {
  return request({
    url: '/qms/inspection/type/list',
    method: 'get',
    params
  })
}

// 检验定义 删除
export function definitionDel(params) {
  return request({
    url: `/qms/inspection/type/delete/${params}`,
    method: 'delete'
  })
}

// 检验定义 获取状态
export function definitionGetState(params) {
  return request({
    url: '/qms/inspection/type/inspect/states',
    method: 'get',
    params
  })
}

// 检验定义 获取详情
export function definitionDetail(params) {
  return request({
    url: `/qms/inspection/type/detail/${params}`,
    method: 'get'
  })
}

// 获取工序-工艺参数-输入方式的枚举
export function getInputModeEnum() {
  return request({
    url: `/api/procedures/process/parameter/input/mode/enum`,
    method: 'get'
  })
}

// 获取工序-工艺参数-类型的枚举
export function getTypeEnum() {
  return request({
    url: `/api/procedures/process/parameter/type/enum`,
    method: 'get'
  })
}

// -------------------------- 送检单打印接口 ---------------

// 下载检验检验记录默认模板
export function downloadInspectionDefTpl(params) {
  return download('/qms/product/v1/inspects/print/default/template', params)
}

// 打印 pdf
export function InspectionPDFDownload(params) {
  return download('/qms/product/v1/inspects/print/export/pdf', params, 'post')
}

// 导出 excel
export function inspectionExportExcel(params) {
  return download('/qms/product/v1/inspects/print/export/excel', params, 'post')
}

// 上传单据模板
export function getExportTemplateUpload(file) {
  return upload('/qms/product/v1/inspects/print/upload/template?modelType=3', file)
}

// 上传单据模板-来料
export function getExportTemplateUploadIncoming(file) {
  return upload('/qms/product/v1/inspects/print/upload/template?modelType=7', file)
}

// 上传单据模板-生产巡检单
export function getExportTemplateUploadProductionProcess(file) {
  return upload('/qms/product/v1/inspects/print/upload/template?modelType=8', file)
}

// 上传单据模板-生产检验单
export function getExportTemplateUploadProduction(file) {
  return upload('/qms/product/v1/inspects/print/upload/template?modelType=9', file)
}

// 上传单据模板-销售检验单
export function getExportTemplateUploadSale(file) {
  return upload('/qms/product/v1/inspects/print/upload/template?modelType=10', file)
}

// 上传单据模板-其他检验单
export function getExportTemplateUploadOther(file) {
  return upload('/qms/product/v1/inspects/print/upload/template?modelType=11', file)
}

// 默认模板导出
export function getExportTemplateExport(params) {
  return download('/qms/upload/file/download', params)
}

// 删除文件
export function getExportTemplateExportDelete(params) {
  return request({
    url: '/qms/product/v1/upload/file/delete',
    method: 'delete',
    params
  })
}

// 获取上传的单据列表
export function getExportTemplateList() {
  return request({
    url: '/qms/product/v1/upload/file/list?modelType=3',
    method: 'get'
  })
}

// 获取上传的单据列表-来料
export function getExportTemplateListIncoming() {
  return request({
    url: '/qms/product/v1/upload/file/list?modelType=7',
    method: 'get'
  })
}

// 获取上传的单据列表-生产巡检单
export function getExportTemplateListProductionProcess() {
  return request({
    url: '/qms/product/v1/upload/file/list?modelType=8',
    method: 'get'
  })
}

// 获取上传的单据列表-生产检验单
export function getExportTemplateListProduction() {
  return request({
    url: '/qms/product/v1/upload/file/list?modelType=9',
    method: 'get'
  })
}

// 获取上传的单据列表-销售检验单
export function getExportTemplateListSale() {
  return request({
    url: '/qms/product/v1/upload/file/list?modelType=10',
    method: 'get'
  })
}

// 获取上传的单据列表-其他检验单
export function getExportTemplateListOther() {
  return request({
    url: '/qms/product/v1/upload/file/list?modelType=11',
    method: 'get'
  })
}

// 送检单不良描述列表获取
export function getBadScriptList(id) {
  return request({
    url: `/qms/inspectsheets/get/scheme/defects/${id}`,
    method: 'get'
  })
}

export function checkIsSingle(params) {
  return request({
    url: '/qms/inspectsheets/check/inspection',
    method: 'get',
    params
  })
}
export function severityLevel() {
  return request({
    url: `/qms/inspectsheets/get/severity/level`,
    method: 'post'
  })
}
// 检验方案数据影响分析
export function materialImpactAnalysis(data) {
  return request({
    url: '/qms/scheme/material/impact/analysis',
    method: 'post',
    data
  })
}

// 数据影响分析--工艺工序
export function craftProcedureImpactAnalysis(data) {
  return request({
    url: '/qms/scheme/craft_procedure/impact/analysis',
    method: 'post',
    data
  })
}

// 获取审批配置
export function getApproveConfig(params) {
  return request({
    url: '/api/approve/get/config',
    method: 'get',
    params
  })
}

// 完成按钮
export function btnCompleteClick(sheetId) {
  return request({
    url: `/qms/inspectsheets/btn/complete/${sheetId}`,
    method: 'get'
  })
}

// 研发复核标识
export function researchReviewFlag(data) {
  return request({
    url: '/qms/inspectsheets/research/review/flag',
    method: 'post',
    data
  })
}

// 送检单按钮权限
export function btnProcessStatusClick(params) {
  return request({
    url: `/qms/inspectsheets/btn/process/status`,
    method: 'get',
    params
  })
}

// 查询所有的检验员
export function getAllInspectionPerson(params) {
  return request({
    url: '/api/users/list/company/enabled',
    method: 'get',
    params
  })
}

// qms配置信息
export function inspectConfigDetail() {
  return request({
    url: `/qms/inspect/config/detail`,
    method: 'get'
  })
}

// 核准确认按钮
export function authorizeBtn(data) {
  return request({
    url: '/qms/inspectsheets/authorize',
    method: 'post',
    data
  })
}

// 送检单 提交审批
export function submitApprove(params) {
  return request({
    url: '/qms/inspectsheets/submit/approve',
    method: 'get',
    params
  })
}

// 送检单 审批
export function approve(data) {
  return request({
    url: '/qms/product/v1/inspects/approve/batch',
    method: 'post',
    data
  })
}

// 获取审批状态配置
export function getApprovalStatus(data) {
  return request({
    url: '/qms/product/v1/sample/planes/approve/batch',
    method: 'post',
    data
  })
}
// 产品检验-送检单导出 - 下载默认模板
export function inspectsheetsDefaultExportTemplate() {
  return download('/qms/product/v1/inspects/default/export/template')
}
export function inspectsheetsQueryUploadFileListWork() {
  return request({
    url: `/qms/product/v1/upload/file/list?modelType=2`,
    method: 'get'
  })
}
// 产品检验-送检单导出通过id删除上传的单据模板
export function inspectsheetsUploadFileDelete(params) {
  return request({
    url: `/qms/product/v1/upload/file/delete`,
    method: 'delete',
    params
  })
}
// 产品检验-送检单导出 - 自定义模板上传
export function inspectsheetsUploadListExportTemplate(file) {
  return upload('/qms/product/v1/inspects/upload/export/template', file)
}
// 产品检验-送检单导出 - 自定义模板下载
export function inspectsheetsDownloadListExportTemplate(params) {
  return download(`/qms/inspectsheets/download/list/export/template?id=${params.id}`, '', 'post')
}
// 产品检验-送检单导出(查询 导入进度)
export function getinspectsheetsExportTask(taskId) {
  return request({
    url: `/qms/product/v1/inspects/export/task/${taskId}`,
    method: 'get'
  })
}
// 产品检验-送检单异步导出
export function getinspectsheetsSycExports(query) {
  return request({
    url: '/qms/product/v1/inspects/excel/export',
    method: 'post',
    data: query
  })
}
// 产品检验-送检单： 分页查询当前导出任务列表
export function inspectsheetsExportTaskPage(params) {
  return request({
    url: '/qms/product/v1/inspects/export/task/page',
    method: 'get',
    params
  })
}
// 客户接口
export function getCustomerList(data) {
  return request({
    url: '/api/customers/list',
    method: 'post',
    data: data
  })
}

// 获取送检数量校验配置
export function getInspectNumberCheckConfig() {
  return request({
    url: '/qms/inspect/config/inspect/num/config',
    method: 'get'
  })
}

export function checkInspectNumber(data) {
  return request({
    url: '/qms/inspectsheets/inspect/num/check',
    method: 'post',
    data
  })
}

export function GetTourInspectIntervalTime() {
  return request({
    url: '/qms/inspect/config/product/patrol/interval',
    method: 'get'
  })
}

// 流水码校验
export function checkSerialCode() {
  return request({
    url: '/qms/inspect/config/detail',
    method: 'get'
  })
}

// 送检单-获取抽检分类类型

export function getClassification() {
  return request({
    url: '/qms/inspectsheets/get/sampling/classification/type',
    method: 'get'
  })
}

// 产品抽样标准新增
export function getStandardList(params) {
  return request({
    url: '/qms/aql/get/sample',
    method: 'get',
    params
  })
}

// 产品抽样-批量审批
export function putPlanesBatchApprove(data) {
  return request({
    url: '/qms/product/v1/sample/planes/approve/batch',
    method: 'post',
    data
  })
}

// 产品抽样-批量编辑状态
export function putPlanesBatchUpdate(data) {
  return request({
    url: '/qms/product/v1/sample/planes/update/state/batch',
    method: 'post',
    data
  })
}

// 产品抽样-获取状态枚举
export function getPlanesStateList(params) {
  return request({
    url: '/qms/product/v1/dicts/status/list',
    method: 'get',
    params
  })
}

// 标准类型枚举接口
export function standardTypeList() {
  return request({
    url: '/qms/product/v1/dicts/sample/type/list',
    method: 'get'
  })
}

// 标准类型枚举接口
export function standardStateList() {
  return request({
    url: '/qms/product/v1/dicts/status/list',
    method: 'get'
  })
}

// 标准类型缺陷类型
export function standardDefectTypeList() {
  return request({
    url: '/qms/sample/contrasts/defect/level/list',
    method: 'get'
  })
}

// 标准类型新增
export function standardAdd(data) {
  return request({
    url: '/qms/product/v1/sample/planes/add',
    method: 'post',
    data
  })
}

// 标准类型新增并生效
export function standardAddEffect(data) {
  return request({
    url: '/qms/product/v1/sample/planes/add/release',
    method: 'post',
    data
  })
}

// 更新标准类型
export function standardUpdate(data) {
  return request({
    url: '/qms/product/v1/sample/planes/update',
    method: 'put',
    data
  })
}

// 更新标准类型
export function getCheckStandard(params) {
  return request({
    url: '/qms/product/v1/aqls/sample/list',
    method: 'get',
    params
  })
}

// 产品抽样检验标准列表
export function standardList(data) {
  return request({
    url: 'qms/product/v1/sample/planes/list',
    method: 'post',
    data
  })
}

// 删除提示 抽样方案
export function standardDeletePrompt(data) {
  return request({
    url: `/qms/product/v1/delete/prompt/sample/plan/${data}`,
    method: 'delete'
  })
}

// 产品抽样检验标准删除
export function standardDelete(data) {
  return request({
    url: `/qms/product/v1/sample/planes/delete/batch`,
    method: 'delete',
    data
  })
}

// 产品抽样检验标准禁用
export function standardDisable(data) {
  return request({
    url: `/qms/product/v1/sample/planes/update/state/batch`,
    method: 'post',
    data
  })
}

// 产品抽样检验标准详情
export function standardDetail(id) {
  return request({
    url: `/qms/product/v1/sample/planes/detail/${id}`,
    method: 'get'
  })
}

// 产品抽样检验标准-下载默认模版
export function standardDefaultTemplate() {
  return download('/qms/product/v1/sample/planes/export/default/template')
}
// 产品抽样检验标准-导入
export function standardImportTemplate(file) {
  return upload('/qms/product/v1/sample/planes/excel/import', file)
}
// 产品抽样检验标准-导入进度
export function standardImportTemplateProgress(data) {
  return request({
    url: `/qms/product/v1/sample/planes/import/progress`,
    method: 'get',
    data
  })
}

// 列表决策枚举接口
export function decisionList(params) {
  return request({
    url: `/qms/inspectsheets/get/decision`,
    method: 'get',
    params
  })
}

// 基本信息中, 决策枚举接口
export function baseDecisionList() {
  return request({
    url: `/qms/inspectsheets/decision/state/list`,
    method: 'get'
  })
}

// 批次号获取
export function getBatchNumber(data) {
  return request({
    url: `/qms/inspectsheets/bar/code/list`,
    method: 'post',
    data
  })
}

// 获取二次检验类型
export function getSecondCheckType() {
  return request({
    url: `/qms/inspectsheets/secondary/inspection/type/list`,
    method: 'get'
  })
}

// 获取检验标准数据 /qms/inspectsheets/get/scheme/sample
export function getStandardData(params) {
  return request({
    url: '/qms/inspectsheets/get/scheme/sample',
    method: 'get',
    params
  })
}

// 物料信息
export function getBusinessConfig(params) {
  return request({
    url: '/api/business/config/get/value?valueFullPathCode=quality.inspectSheetConfiguration.inspectSheetQualifiedQuantityConfiguration.inspectionQuantity',
    method: 'get',
    params
  })
}

// 获取检验方案详情-方案
export function getDetailProgramConfig(id) {
  return request({
    url: `/qms/product/v1/schemes/detail/${id}`,
    method: 'get'
  })
}
// 获取检验方案详情-项目
export function getDetailInspectionItems(id) {
  return request({
    url: `/qms/product/v1/schemes/detail/item/${id}`,
    method: 'get'
  })
}
// 获取检验方案详情-物料
export function getDetailRelatedMaterials(id) {
  return request({
    url: `/qms/product/v1/schemes/detail/material/${id}`,
    method: 'get'
  })
}
// 获取检验方案详情-物料类型
export function getDetailRelatedMaterialsType(id) {
  return request({
    url: `/qms/product/v1/schemes/detail/material/type/${id}`,
    method: 'get'
  })
}
// 获取检验方案详情-不良
export function getDetailUndesirableItems(id) {
  return request({
    url: `/qms/product/v1/schemes/detail/defect/${id}`,
    method: 'get'
  })
}
// 获取检验方案详情-客户
export function getDetailRelatedCustomers(id) {
  return request({
    url: `/qms/product/v1/schemes/detail/customer/${id}`,
    method: 'get'
  })
}
// 获取检验方案详情-工序
export function getDetailRelatedProcedure(id) {
  return request({
    url: `/qms/product/v1/schemes/detail/process/procedure/${id}`,
    method: 'get'
  })
}

// 获取检验记录
export function getCheckRecordsList(data) {
  return request({
    url: `/qms/product/v1/inspects/page/order/inspection/record`,
    method: 'post',
    data
  })
}

// 获取缺陷记录
export function getDefectRecords(data) {
  return request({
    url: `/qms/product/v1/inspects/page/order/defect/record`,
    method: 'post',
    data
  })
}

// 送检单-状态枚举
export function getStatusEnums() {
  return request({
    url: `/qms/product/v1/dicts/inspect/status/list`,
    method: 'get'
  })
}

// 送检单-检验类型枚举
export function getInspectTypeEnums() {
  return request({
    url: `/qms/product/v1/dicts/inspect/type/list`,
    method: 'get'
  })
}

// 送检单-检验类型枚举通过配置
export function getInspectTypeEnumsByConfig2(params) {
  return request({
    url: `/qms/product/v1/dicts/inspect/type/config`,
    method: 'get',
    params
  })
}

// 送检单-检验类型枚举通过配置-新-根据配置来
export function getInspectTypeEnumsByConfig(params) {
  return request({
    url: `/qms/product/v1/config/order_type/list/item/type/by/category`,
    method: 'get',
    params
  })
}

// 送检单-判断审批人是否显示
export function getApproveApprover(params) {
  return request({
    url: `/qms/product/v1/inspects/propose/approve/require/approver`,
    method: 'get',
    params
  })
}

// 送检单-关联单据枚举
export function getDocumentEnums(type) {
  return request({
    url: `/qms/product/v1/dicts/inspect/document/type/list`,
    method: 'get',
    params: {
      inspectType: type
    }
  })
}

// 送检单-通过检验类型获取决策枚举
export function getDecisionEnums(params) {
  return request({
    url: `/qms/product/v1/inspects/decision/list`,
    method: 'get',
    params
  })
}

// 送检单-缺陷等级枚举
export function getDefectEnums() {
  return request({
    url: `/qms/product/v1/dicts/defect/level/list`,
    method: 'get'
  })
}

// 送检单-关联批次类型枚举
export function getBatchEnums() {
  return request({
    url: `/qms/product/v1/dicts/inspect/batch/type/list`,
    method: 'get'
  })
}

// 送检单-根据物料查检验方案
export function getSchemeByMaterial(params) {
  return request({
    url: `/qms/product/v1/schemes/get/scheme/by/condition`,
    method: 'get',
    params
  })
}

// 送检单-根据方案和送检数量查抽样数量
export function getSampleNumByScheme(params) {
  return request({
    url: `/qms/product/v1/inspects/get/scheme/sample`,
    method: 'get',
    params
  })
}

// 送检单-根据抽样方案和送检数量查出允收数/拒收数
export function getAcceptValueByScheme(params) {
  return request({
    url: `qms/product/v1/sample/planes/get/sample/num`,
    method: 'get',
    params
  })
}

// 送检单-新增
export function addInspection(data) {
  return request({
    url: '/qms/product/v1/inspects/add',
    method: 'post',
    data
  })
}

// 送检单-新增并生效
export function releasedInspection(data) {
  return request({
    url: '/qms/product/v1/inspects/add/released',
    method: 'post',
    data
  })
}

// 获取批次 统一
export function getBarCodeList(data) {
  return request({
    url: `/qms/product/v1/inspects/list/relate/bar/code`,
    method: 'post',
    data
  })
}

// 获取工单批次
export function barCodeList(data) {
  return request({
    url: `/qms/inspectsheets/bar/code/list`,
    method: 'post',
    data
  })
}

// 获取工单批次-采购收料批次
export function materialList(data) {
  return request({
    url: `/ams/receipt/list/material/batch`,
    method: 'post',
    data
  })
}

// 判断送检单是否需要复核和核准
export function decideConfig(data) {
  return request({
    url: `/api/business/config/detail`,
    method: 'post',
    data
  })
}

// 文件上传
export function uploadFile(data) {
  return request({
    url: '/qms/product/v1/upload/temp/file',
    method: 'post',
    data
  })
}

// 送检单详情 送检单和分录明细
export function getInspectDetail(id) {
  return request({
    url: `/qms/product/v1/inspects/detail?inspectId=${id}`,
    method: 'get'
  })
}

// 送检单详情 检验结果和决策
export function getInspectCheckResult(id) {
  return request({
    url: `/qms/product/v1/inspect/material/check/result?id=${id}`,
    method: 'get'
  })
}

// 送检单详情 样次和项目
export function getInspectNumsItem(id) {
  return request({
    url: `/qms/product/v1/inspect/material/num/item?id=${id}`,
    method: 'get'
  })
}

// 送检单详情 物料缺陷记录
export function getInspectDefect(id) {
  return request({
    url: `/qms/product/v1/inspect/material/defect?id=${id}`,
    method: 'get'
  })
}

// 送检单详情 物料缺陷综合记录
export function getInspectAllDefct(id) {
  return request({
    url: `/qms/product/v1/inspect/material/all/defect?id=${id}`,
    method: 'get'
  })
}

// 送检单详情 附件列表
export function getInspectFileList(id) {
  return request({
    url: `/qms/product/v1/inspect/material/file/list?id=${id}`,
    method: 'get'
  })
}

// 送检单 更新
export function inspectUpdate(data) {
  return request({
    url: `/qms/product/v1/inspects/update`,
    method: 'post',
    data
  })
}

// 送检单 更新分录明细
export function inspectMaterialUpdate(data) {
  return request({
    url: `/qms/product/v1/inspect/material/update`,
    method: 'post',
    data
  })
}

// 送检单 删除分录明细
export function deleteMaterial(data) {
  return request({
    url: `/qms/product/v1/inspect/material/delete`,
    method: 'post',
    data
  })
}

// 送检单 删除检验决策
export function deleteDecision(data) {
  return request({
    url: `/qms/product/v1/inspect/decision/delete`,
    method: 'post',
    data
  })
}

// 送检单 删除物料缺陷
export function deleteMaterialDefete(data) {
  return request({
    url: `/qms/product/v1/inspect/defect/material/delete`,
    method: 'post',
    data
  })
}

// 送检单 删除样次
export function deleteNum(data) {
  return request({
    url: `/qms/product/v1/inspect/num/delete`,
    method: 'post',
    data
  })
}

// 送检单 删除样次中的项目
export function deleteNumItem(data) {
  return request({
    url: `/qms/product/v1/inspect/num/delete/num/item`,
    method: 'post',
    data
  })
}

// 送检单 删除样本检测值
export function deleteNumItemValue(data) {
  return request({
    url: `/qms/product/v1/inspect/num/delete/item/value`,
    method: 'post',
    data
  })
}
// 送检单 删除项目中的缺陷
export function deleteItemDefete(data) {
  return request({
    url: `/qms/product/v1/inspect/defect/item/delete`,
    method: 'post',
    data
  })
}

// 送检单 删除附件
export function deleteInspectFile(data) {
  return request({
    url: `/qms/product/v1/inspect/file/delete`,
    method: 'post',
    data
  })
}

// 获取检验方案详情-项目 带抽样数量
export function getDetailInspectionItemsWithSampleNum(params) {
  return request({
    url: `/qms/product/v1/schemes/get/sample/num`,
    method: 'get',
    params
  })
}

// 送检单 下推
export function getPushDownList(data) {
  return request({
    url: `/qms/product/v1/inspects/get/inspect/push/list`,
    method: 'post',
    data
  })
}

// 送检单 下推保存
export function savePushDown(data) {
  return request({
    url: `/qms/product/v1/inspects/push/down/inspect`,
    method: 'post',
    data
  })
}

// 送检单 下推
export function getPushDataList(data) {
  return request({
    url: `/qms/product/v1/inspects/get/inspect/push/data/list`,
    method: 'post',
    data
  })
}
// 产品检验-缺陷记录-导出默认文件
export function defectDefaultExportTemplate() {
  return download('/qms/product/v1/inspects/default/defect/template')
}
// 产品检验-缺陷记录-单据列表
export function defectUploadFileList() {
  return request({
    url: `/qms/product/v1/upload/file/list?modelType=5`,
    method: 'get'
  })
}
// 产品检验-缺陷记录-自定义文件上传
export function defectUploadListTemplate(file) {
  return upload('/qms/product/v1/inspects/defect/upload/template', file)
}
// 产品检验-缺陷记录-导出Excel
export function exportDefectExcel(data) {
  return request({
    url: `/qms/product/v1/inspects/defect/excel/export`,
    method: 'post',
    data
  })
}
// 产品检验-缺陷记录-导出文件下载进度
export function getDefectExportProgress(taskId, data) {
  return request({
    url: `/qms/product/v1/inspects/defect/export/task/${taskId}`,
    method: 'get',
    data
  })
}

// 检验单-工序列表
export function procedureList(params) {
  return request({
    url: `/api/workorders/craft/procedure/list`,
    method: 'get',
    params: params
  })
}

// 检验单-工序名称列表-弃
export function selectProcedureList2(params) {
  return request({
    url: `/api/workorders/select/procedure/list`,
    method: 'get',
    params: params
  })
}

// 检验单-工序名称列表
export function selectProcedureList(id) {
  return request({
    url: `/api/workorders/select/${id}`,
    method: 'get'
  })
}

// 获取部门树
export function getDepartmentsTree() {
  return request({
    url: `/api/departments/tree`,
    method: 'get'
  })
}

// 缺陷类型定义按钮页列表
export function defectsDefineBtnList(params) {
  return request({
    url: `/qms/product/v1/defects/type/list`,
    method: 'post',
    data: params
  })
}
// 缺陷类型定义按钮页删除
export function deleteDefectsType(params) {
  return request({
    url: `/qms/product/v1/defects/type/delete/batch`,
    method: 'delete',
    data: params

  })
}
// 添加缺陷类型
export function addDefectsType(params) {
  return request({
    url: `/qms/product/v1/defects/type/add`,
    method: 'post',
    data: params
  })
}
// 修改缺陷类型
export function editDefectsType(params) {
  return request({
    url: `/qms/product/v1/defects/type/update`,
    method: 'put',
    data: params
  })
}

// 获取检验单-操作记录
export function approvalRecord(params) {
  return request({
    url: `/qms/product/v1/inspect/list/approval/record`,
    method: 'get',
    params
  })
}

// 检验单-发起审批
export function inspectsApprove(params) {
  return request({
    url: `/qms/product/v1/inspects/approve`,
    // url: `/qms/product/v1/inspects/propose/approve`,
    method: 'post',
    data: params
  })
}

// 检验单-发起提交
export function inspectsSubmit(params) {
  return request({
    url: `/qms/product/v1/inspects/approve/submit`,
    method: 'post',
    data: params
  })
}

// 检验单-是否展示审批按钮
export function approveAllow(params) {
  return request({
    url: `/qms/product/v1/inspects/propose/approve/allow/${params}`,
    method: 'get'
  })
}

// 检验单中新增检验项目-批量
export function batchSimpleAdd(params) {
  return request({
    url: `/qms/product/v1/items/batch/simple/add`,
    method: 'post',
    data: params
  })
}

// 产品检验单-下载默认转换模板
export function downDefaultCheckPlanInspectionSheet() {
  return download('qms/product/v1/inspects/import/download/default/template')
}
// 产品检验单-上传自定义转换模板
export function uploadcheckPlanImportTemplateInspectionSheet(file) {
  return upload('/qms/product/v1/inspects/import/upload/custom/template', file)
}
// 产品检验单-下载自定义转换模板
export function checkPlanCustomTemplateExportInspectionSheet(file) {
  return download('/qms/product/v1/inspects/import/download/custom/template')
}
// 产品检验单-下载导入模板
export function checkPlanImportTemplateExportInspectionSheet(file) {
  return download('/qms/product/v1/inspects/import/download/import/template')
}

// 产品检验单-导入模板
export function uploadCheckPlanImportInspectionSheet(file, params) {
  return upload('/qms/product/v1/inspects/import/import', file, params)
}
// 产品检验单-获取导入进度
export function getCheckPlanImportProgressInspectionSheet() {
  return request({
    url: '/qms/product/v1/inspects/import/progress',
    method: 'get'
  })
}

// 分页查询检验仪器
export function getInstrumentList(data) {
  return request({
    url: '/qms/product/v1/instrument/page',
    method: 'post',
    data: data || { current: 1, size: 100 }
  })
}

// 新增检验仪器
export function addInstrument(data) {
  return request({
    url: '/qms/product/v1/instrument/add',
    method: 'post',
    data
  })
}

// 保存并生效 检验仪器
export function releaseInstrument(data) {
  return request({
    url: '/qms/product/v1/instrument/add/release',
    method: 'post',
    data
  })
}

// 修改检验仪器
export function updateInstrument(data) {
  return request({
    url: '/qms/product/v1/instrument/update',
    method: 'put',
    data
  })
}

// 获取检验仪器详情
export function getInstrumentDetail(params) {
  return request({
    url: `/qms/product/v1/instrument/detail/${params}`,
    method: 'get'
  })
}

// 删除提示 检验仪器
export function deleteInstrumentPrompt(data) {
  return request({
    url: `/qms/product/v1/delete/prompt/instrument/${data}`,
    method: 'delete'
  })
}

// 删除检验仪器
export function deleteInstrument(data) {
  return request({
    url: `/qms/product/v1/instrument/delete/${data}`,
    method: 'delete',
    data
  })
}

// 检验仪器批量编辑状态
export function instrumentStateBatchUpdate(data) {
  return request({
    url: '/qms/product/v1/inspects/instrument/update/status/batch',
    method: 'post',
    data
  })
}

// 分页查询仪器分类
export function getInstrumentCategoryList(data) {
  return request({
    url: '/qms/product/v1/instrument/category/page',
    method: 'post',
    data: data || { current: 1, size: 1000 }
  })
}

// 新增仪器分类
export function addInstrumentCategory(data) {
  return request({
    url: '/qms/product/v1/instrument/category/add',
    method: 'post',
    data
  })
}

// 修改仪器分类
export function updateInstrumentCategory(data) {
  return request({
    url: '/qms/product/v1/instrument/category/update',
    method: 'put',
    data
  })
}

// 获取仪器分类详情
export function getInstrumentCategoryDetail(params) {
  return request({
    url: `/qms/product/v1/instrument/category/detail/${params}`,
    method: 'get'
  })
}

// 删除提示 仪器分类
export function deleteInstrumentCategoryPrompt(data) {
  return request({
    url: `/qms/product/v1/delete/prompt/instrument/category/${data}`,
    method: 'delete'
  })
}

// 删除仪器分类
export function deleteInstrumentCategory(data) {
  return request({
    url: `/qms/product/v1/instrument/category/delete/${data}`,
    method: 'delete',
    data
  })
}

// 检验方案查询工序-按照物料
export function schemesCraftByMaterial(params) {
  return request({
    url: `/qms/product/v1/schemes/list/craft/procedure`,
    method: 'post',
    data: params
  })
}
