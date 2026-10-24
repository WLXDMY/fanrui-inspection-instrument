// 告警接口文件
import request from '@/utils/request'
import { upload, download } from '@/api/fileTransfer'
import axios from 'axios'
import { getToken, getTokenType } from '@/utils/auth'
import qs from 'qs'
/**
 *
 * 工艺页面
 *
 */
// 获取工艺路线详情
export function getCraftsDetail(id) {
  return request({
    url: `/api/crafts/detail/${id}`,
    method: 'get'
  })
}

// 获取所有工艺
export function gettechnologylist(query) {
  return request({
    url: '/api/crafts/list',
    // method: 'get',
    // params: query
    method: 'post',
    data: query
  })
}

// 删除工艺
export function deleteCraftById(id) {
  return request({
    url: `/api/crafts/delete/${id}`,
    method: 'delete'
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
// 获取工艺状态列表
export function getTechnologyState() {
  return request({
    url: `/api/crafts/state`,
    method: 'get'
  })
}

// 工艺增加批量编辑按钮，支持批量改状态
export function craftsBatchUpdateState(query) {
  return request({
    url: '/api/crafts/batch/update/state',
    method: 'post',
    data: query
  })
}

// 新增工艺
export function addtechnology(query) {
  return request({
    url: '/api/crafts/insert',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: query
  })
}

// 工艺新增且生效
export function technologySaveAndEffect(query) {
  return request({
    url: '/api/crafts/insert/released',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: query
  })
}
// 编辑工艺
export function edittechnology(query) {
  return request({
    url: '/api/crafts/update',
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: query
  })
}
// 工艺模板导出
export function getcraftsexport(query) {
  return request({
    url: '/api/crafts/excel/export',
    method: 'get',
    params: query
  })
}

// 获取工艺路线的工序列表
export function getCraftsProcedureListByCraftId(craftId) {
  return request({
    url: `/api/crafts/procedure/list/${craftId}`,
    method: 'get'
  })
}

// 添加工艺路线的工序
export function addCraftsProcedure(params) {
  return request({
    url: `/api/crafts/procedure/add`,
    method: 'post',
    data: params
  })
}

// 修改工艺路线的工序
export function updateCraftsProcedure(params) {
  return request({
    url: `/api/crafts/procedure/update`,
    method: 'put',
    data: params
  })
}

// 删除工艺路线的工序前检验接口
export function deleteCraftsProcedureBeforeCheck(params) {
  return request({
    url: `/api/crafts/procedures/delete/check`,
    method: 'get',
    params
  })
}

// 删除工艺路线的工序
export function deleteCraftsProcedureById(id) {
  return request({
    url: `/api/crafts/procedure/delete/${id}`,
    method: 'delete'
  })
}

// 获取工序配置详细信息
export function getCraftsProcedureconfigDetail(query) {
  return request({
    url: `/api/crafts/procedure/config`,
    method: 'get',
    params: query
  })
}

// 获取工序配置详细信息
export function getCraftsRouteByCraftId(craftId) {
  return request({
    url: `/api/crafts/route/${craftId}`,
    method: 'get'
  })
}

// 添加工艺路线-工序绑定的物料
export function addCraftsProcedureMaterial(query) {
  return request({
    url: '/api/crafts/procedure/material/add',
    method: 'post',
    data: query
  })
}
// 修改工艺路线-工序绑定的物料
export function editCraftsProcedureMaterial(query) {
  return request({
    url: '/api/crafts/procedure/material/update',
    method: 'put',
    data: query
  })
}

// 删除工艺路线-工序绑定的物料
export function deleteCraftsProcedureMaterialById(id) {
  return request({
    url: `/api/crafts/procedure/material/${id}`,
    method: 'delete'
  })
}

// 工序内使用 获取工位类型列表
export function getModelsFacList() {
  return request({
    url: `/api/models/fac/list`,
    method: 'get'
  })
}

// 工艺-审批
export function approveCraftsExamine(params) {
  return request({
    url: `/api/crafts/examine/approve`,
    method: 'get',
    params
  })
}

// 工艺内使用 获取工位类型列表
export function getModelsFacListByProcedureId(params) {
  return request({
    url: `/api/procedures/model/type`,
    method: 'get',
    params
  })
}

// 新增工艺路线-设备类型及对应的工序工时
export function addCraftsProcedureDevice(query) {
  return request({
    url: '/api/crafts/procedure/device/type/add',
    method: 'post',
    data: query
  })
}

// 更新工艺路线-设备类型及对应的工序工时
export function editCraftsProcedureDevice(query) {
  return request({
    url: '/api/crafts/procedure/device/type/update',
    method: 'put',
    data: query
  })
}

// 更新工艺路线-无设备对应的工序工时
export function putProcedureWorkHoursUpdate(data) {
  return request({
    url: '/api/crafts/procedure/work/hours/update',
    method: 'put',
    data
  })
}

// 删除工艺路线-设备类型及对应的工序工时
export function deleteCraftsProcedureDeviceById(id) {
  return request({
    url: `/api/crafts/procedure/device/type/delete/${id}`,
    method: 'delete'
  })
}

// 导入工艺路线
export function importCraftsRoute(query) {
  return request({
    url: `/api/crafts/import/${query.craftId}`,
    method: 'post',
    data: query.file
  })
}

// 导入工艺路线
export function importDeviceParameter(data) {
  return request({
    url: `/api/crafts/excel/import/device/parameter`,
    method: 'post',
    data
  })
}

// 工序设备-查出指标参考值列表
export function getCraftsProcedureDeviceTargetList(query) {
  return request({
    url: '/api/crafts/procedure/device/target/list',
    method: 'post',
    data: query
  })
}

// // 工序设备-修改指标参考值
// export function editCraftsProcedureDeviceTargetConfig(query) {
//   return request({
//     url: '/api/crafts/procedure/device/target/edit',
//     method: 'post',
//     data: query
//   })
// }
// 工序设备-修改指标参考值
export function editCraftsProcedureDeviceTargetConfig(query) {
  return request({
    url: '/api/crafts/procedure/device/target/save',
    method: 'post',
    data: query
  })
}

// 导出工艺模板
export function exportCraftsExcelTemplate() {
  return download('/api/crafts/export')
}

// 导出配方参数模板
export function exportDeviceParameterTemplate() {
  return download('/api/crafts/export/device/parameter/template')
}

// 下载工艺工序物料导入的模板
export function procedureMaterialDefaultTemplateExport(params) {
  return download(
    '/api/crafts/export/procedure/material/default/template',
    params
  )
}

// 工艺工序物料导入
export function postCraftsExcelImportMaterial(params) {
  return upload('/api/crafts/excel/import/material', params)
}

// 获取工艺工序物料导入进度
export function getCraftImportMaterialProgress() {
  return request({
    url: '/api/crafts/import/material/progress',
    method: 'get'
  })
}
// 工艺工序导入
export function crafsTechnologyProcessImport(params) {
  return upload('/api/crafts/import/craft/procedure', params)
}

// 工艺工序模板导入
export function crafsTechnologyProcessTemplateImport(params) {
  return upload(`/api/crafts/import/craft/procedure?isTemplate=true`, params)
}

// 获取工艺工序导入进度
export function getCrafsTechnologyProcessImportProgress() {
  return request({
    url: '/api/crafts/import/craft/procedure/progress',
    method: 'get'
  })
}

// 获取工艺工序模板导入进度
export function getCrafsTechnologyProcessTemplateImportProgress() {
  return request({
    url: '/api/crafts/import/craft/procedure/progress?isTemplate=true',
    method: 'get'
  })
}

// 下载工艺工序检验导入的模板
export function procedureInspectDefaultTemplateExport(params) {
  return download(
    '/api/crafts/export/procedure/inspect/default/template',
    params
  )
}

// 工艺工序检验导入
export function postCraftsExcelImportInspect(params) {
  return upload('/api/crafts/excel/import/inspect', params)
}

// 获取工艺工序检验导入进度
export function getCraftImportInspectProgress() {
  return request({
    url: '/api/crafts/import/inspect/progress',
    method: 'get'
  })
}

// 下载工艺工序控制导入的模板
export function procedureControlDefaultTemplateExport(params) {
  return download(
    '/api/crafts/export/procedure/control/default/template',
    params
  )
}

// 工艺工序控制导入
export function postCraftsExcelImportControl(params) {
  return upload('/api/crafts/excel/import/control', params)
}

// 获取工艺工序控制导入进度
export function getCraftImportControlProgress() {
  return request({
    url: '/api/crafts/import/control/progress',
    method: 'get'
  })
}

// 下载工艺工序附件导入的模板
export function procedureFileDefaultTemplateExport(params) {
  return download('/api/crafts/export/procedure/file/default/template', params)
}

// 工艺工序附件导入
export function postCraftsExcelImportFile(params) {
  return upload('/api/crafts/excel/import/file', params)
}

// 获取工艺工序文件导入进度
export function getCraftImportFileProgress() {
  return request({
    url: '/api/crafts/import/file/progress',
    method: 'get'
  })
}

// 下载工序工时导入的模板
export function procedureWorkHourDefaultTemplateExport(params) {
  return download(
    '/api/crafts/export/procedure/work_hour/default/template',
    params
  )
}

// 工序工时导入
export function postCraftsExcelImportWorkHour(params) {
  return upload('/api/crafts/excel/import/work_hour', params)
}

// 获取工序工时导入进度
export function getCraftImportWorkHourProgress() {
  return request({
    url: '/api/crafts/import/work_hour/progress',
    method: 'get'
  })
}

/**
 *
 *  产品页面
 *
 */
// 产品列表
export function productList(query) {
  return request({
    url: '/api/products/list',
    method: 'get',
    params: query
  })
}

// 新增产品
export function createProduct(query) {
  return request({
    url: '/api/products/insert',
    method: 'post',
    data: query
  })
}

// 删除产品
export function deleteProduct(id) {
  return request({
    url: `/api/products/delete/${id}`,
    method: 'delete'
  })
}

// 修改产品
export function updateProduct(query) {
  return request({
    url: '/api/products/update',
    method: 'put',
    data: query
  })
}

// 通过Id查询产品信息
export function getProductById(id) {
  return request({
    url: `/api/products/select/${id}`,
    method: 'get'
  })
}

// 获取所属产品的工艺列表
export function getOwnCraft(query) {
  return request({
    url: `/api/crafts/list`,
    method: 'get',
    params: query
  })
}

// 获取所有工艺列表
export function getAllCraft() {
  return request({
    url: `/api/crafts/getAll`,
    method: 'get'
  })
}

// 工序列表
export function getProcedureList(query) {
  return request({
    url: `/api/procedures/list`,
    method: 'get',
    params: query
  })
}

// 通过Id查询工序信息
export function getProcedureById(id) {
  return request({
    url: `/api/procedures/select/${id}`,
    method: 'get'
  })
}

// 获取工序状态列表
export function getProcedureState() {
  return request({
    url: `/api/procedures/state`,
    method: 'get'
  })
}

// 新增工序定义
export function createProcedure(query) {
  return request({
    url: '/api/procedures/insert',
    method: 'post',
    data: query
  })
}

// 工序定义新增且生效
export function procedureSaveAndEffect(query) {
  return request({
    url: '/api/procedures/insert/released',
    method: 'post',
    data: query
  })
}
// 删除工序
export function deleteProcedure(id) {
  return request({
    url: `/api/procedures/delete/${id}`,
    method: 'delete'
  })
}

// 修改工序
export function updateProcedure(query) {
  return request({
    url: '/api/procedures/update',
    method: 'put',
    data: query
  })
}

// 工序-审批
export function approveProceduresExamine(params) {
  return request({
    url: `/api/procedures/examine/approve`,
    method: 'get',
    params
  })
}

// 上传附件文件
export function uploadProcedureFile(file) {
  return upload('/api/resource/add', file)
}

// 通过工位类型ID，组成子父级对象
export function getListByFacilityId(id) {
  return request({
    url: `/api/models/list/${id}`,
    method: 'get'
  })
}

// 工艺批量导入
export function TechBatchImport(file) {
  return upload('/api/crafts/batch/import', file)
}

// 工艺模板导出
export function TechBatchExport() {
  return download('/api/crafts/excel/export')
}

// bom列表
export function bomList(query) {
  return request({
    url: '/api/boms/list',
    // method: 'get',
    // params: query
    method: 'post',
    data: query
  })
}
// 物料列表
export function materialsList(query) {
  return request({
    url: '/api/materials/list',
    method: 'post',
    data: query
  })
}

// 物料列表
export function matList(query) {
  return request({
    url: '/api/materials/list',
    method: 'post',
    data: query
  })
}

// 根据库房获取没有的物料信息
export function warehouseNotExitMaterialList(warehouseId, params) {
  // return request({
  //   url: `/warehouse/not/exist/${warehouseId}`,
  //   method: 'get'
  // })
  return request({
    url: `/api/materials/list`,
    method: 'post',
    data: params
  })
}

// 根据库房获取所有的物料信息
export function warehouseAllMaterialList(warehouseId, params) {
  // return request({
  //   url: `/warehouse/not/exist/${warehouseId}`,
  //   method: 'get'
  // })
  return request({
    url: `/wms/stocks/inventory/warehouse/all/${warehouseId}`,
    method: 'post',
    data: params
  })
}
// 通过Idbom详细信息
export function bomDetail(id) {
  return request({
    url: `/api/boms/detail/${id}`,
    method: 'get'
  })
}

// 物料-审批
export function approveMaterialExamine(params) {
  return request({
    url: `/api/materials/examine/approve`,
    method: 'get',
    params
  })
}

// bom编辑信息
export function bomEdit(query) {
  return request({
    url: '/api/boms/update',
    method: 'put',
    data: query
  })
}

// bom添加
export function bomAdd(query) {
  return request({
    url: '/api/boms/insert',
    method: 'post',
    data: query
  })
}

// bom复制
export function bomCopy(query) {
  return request({
    url: `/api/boms/copyBom`,
    method: 'post',
    data: query
  })
}

// bom子项类型列表
export function bomTypeList() {
  return request({
    url: `/api/boms/type`,
    method: 'get'
  })
}

// bom添加且生效
export function bomSaveAndEffect(query) {
  return request({
    url: '/api/boms/insert/released',
    method: 'post',
    data: query
  })
}
// BOM-审批
export function approveBomExamine(params) {
  return request({
    url: `/api/boms/examine/approve`,
    method: 'get',
    params
  })
}

// 根据物料查询bom列表
export function getBomsListByCode(materialCode) {
  return request({
    url: `/api/boms/list/by/code/${materialCode}`,
    method: 'get'
  })
}

// 根据物料查询工艺列表
export function getCraftsListByCode(materialCode) {
  return request({
    url: `/api/crafts/list/by/code/${materialCode}`,
    method: 'get'
  })
}

// 删除物料
export function deleteMaterialById(id) {
  return request({
    url: `/api/materials/delete/${id}`,
    method: 'delete'
  })
}

// 批量更改物料状态
export function updateBatchMaterialState(query) {
  return request({
    url: '/api/materials/batch/update/state',
    method: 'post',
    data: query
  })
}

// 删除BOM
export function deleteBomById(id) {
  return request({
    url: `/api/boms/delete/${id}`,
    method: 'delete'
  })
}

// 导入bom原始数据并处理
export function uploadBomsImport(file) {
  return upload('/api/boms/import', file)
}
// 导入物料原始数据并处理
export function uploadMaterialImport(file) {
  return upload('/api/materials/import', file)
}
// 导入bom数据进度
export function getBomsImportProgress(file) {
  return request({
    url: '/api/boms/import/progress',
    method: 'get'
  })
}
// 导入物料数据进度
export function getMaterialImportProgress(file) {
  return request({
    url: '/api/materials/import/progress',
    method: 'get'
  })
}
// 导入BOM模板
export function uploadBomsImportTemplate(file) {
  return upload('/api/boms/import/template', file)
}
// 导入物料模板
export function uploadMaterialImportTemplate(file) {
  return upload('/api/materials/import/template', file)
}
// 通过Idbom详细信息
export function matDetail(id) {
  return request({
    url: `/api/materials/detail/${id}`,
    method: 'get'
  })
}

// 删除某条BOM上传文件记录
export function deleteAppendixDeleteFile(id) {
  return request({
    url: `/api/appendix/delete/file/${id}`,
    method: 'delete'
  })
}

// 获取BOM上传文件列表
export function getAppendixFiles(params) {
  return request({
    url: '/api/appendix/files',
    method: 'get',
    params
  })
}

// 新增BOM文件上传
export function postResourceAddFile(data) {
  return request({
    url: '/api/resource/add/file',
    method: 'post',
    data
  })
}

// 物料编辑信息
export function matEdit(query) {
  return request({
    url: '/api/materials/update',
    method: 'put',
    data: query
  })
}

// 获取bom状态
export function getBomsState() {
  return request({
    url: `/api/boms/state`,
    method: 'get'
  })
}

// 数据影响分析（物料）
export function materialAnalysis(code) {
  return request({
    url: `/api/materials/analysis/${code}`,
    method: 'get'
  })
}

// 数据影响分析（BOM）
export function bomsAnalysis(params) {
  return request({
    url: `/api/boms/analysis`,
    method: 'get',
    params
  })
}

// 获取数据字典--物料类型
export function getMaterialType() {
  return request({
    url: `/api/materials/material/type/list`,
    method: 'get'
  })
}

// 获取物料分类
export function getMaterialSort() {
  return request({
    url: `/api/materials/sort`,
    method: 'get'
  })
}

// bom导入查询
export function importMaterial(params) {
  return upload(`/api/materials/import`, params)
}

// bom确认导入
export function saveImportMaterial(query) {
  return request({
    url: '/api/materials/import/save',
    method: 'post',
    data: query
  })
}

// bom物料导出
export function exportMaterial(params) {
  // return request({
  //   url: `/api/materials/export`,
  //   method: 'get'
  // })
  return download('/api/materials/export', params, 'post')
}
// 采购订单报表导出
export function exportTag(params) {
  return download('/ams/purchases/excel/exports', params)
}

// 批量导入附件功能
export function BulkImportAttachment(data) {
  return request({
    url: '/api/resource/upload/zip',
    method: 'post',
    data
  })
}

// 获取路径
export function getLocalPath() {
  return request({
    url: '/api/materials/select/path',
    method: 'get'
  })
}

// 导入预览
export function importPreview(data) {
  return request({
    url: '/api/materials/import/preview',
    method: 'post',
    data
  })
}

// 上传zip 文件
export function uploadZipFile(data) {
  return upload('/api/resource/add', data)
}

// 导入按钮
export function importButtonFile(data) {
  return request({
    url: '/api/materials/save/import/file',
    method: 'post',
    data
  })
}

// 获取展示组件内容名称
export function getCustomizationComponentName(params) {
  return request({
    url: '/api/customization/component/name/list',
    method: 'get',
    params
  })
}
// 获取制造单元类型
export function getProductUnitType(params) {
  return request({
    url: '/api/procedures/select/manufacturing/unit',
    method: 'get',
    params
  })
}
// 获取委外供应商类型
export function getSupplyType(params) {
  return request({
    url: '/api/procedures/supplier/name',
    method: 'get',
    params
  })
}
// 获取阈值配置枚举列表
export function getUnitTypeList() {
  return request({
    url: '/api/crafts/get/type',
    method: 'get'
  })
}

// BOM模板导出
export function bomTemplateExport(params) {
  return download('/api/boms/export/template', params)
}

// BOM模板默认导出
export function bomDefualtTemplateExport() {
  return download('/api/boms/export/default/template')
}

// BOM自定义模板导出
export function bomCustomTemplateExport() {
  return download('/api/boms/export/custom/template')
}

// 物料模板导出
export function materialTemplateExport(params) {
  return download('/api/materials/export/template', params)
}

// 物料默认模板导出
export function materialDefaultTemplateExport() {
  return download('/api/materials/export/default/template')
}

// 物料自定义模板导出
export function suppliesCustomTemplateExport() {
  return download('/api/materials/export/custom/template')
}

// 新增工序获取类型列表
export function getModelsLineFacType() {
  return request({
    url: '/api/models/line/fac/model/tree',
    method: 'get'
  })
}

// 获取表格动态字段
export function dynamicTableKeyList() {
  return request({
    url: '/api/material/filed/config/list/using',
    method: 'get'
  })
}
// 根据工序ID获取绑定的产线-工位模型树
export function getModelsLineFacTypeByProcedureId(procedureId) {
  return request({
    url: `/api/models/line/fac/model/tree/${procedureId}`,
    method: 'get'
  })
}

// 根据工序ID获取工作中心  获取工序定义可选工作中心
export function getWorkCenterListByProcedureId(procedureId) {
  return request({
    url: `/api/procedures/list/work/center/${procedureId}`,
    method: 'get'
  })
}

// 下载工序导入的模板
export function procedureTemplateExport(params) {
  return download('/api/procedures/export/template', params)
}

// 下载工序导入的默认模板
export function procedureDefaultTemplateExport() {
  return download('/api/procedures/export/default/template')
}

// 工序导入数据
export function uploadProcedureImport(file) {
  return upload('/api/procedures/import', file)
}

// 导入工序数据进度
export function getProcedureImportProgress(file) {
  return request({
    url: '/api/procedures/import/progress',
    method: 'get'
  })
}
// 上传工序导入模板
export function uploadImportTemplate(params) {
  return upload('/api/procedures/import/template', params)
}
// ---------------------------------------------------
// 下载工艺导入的模板
export function CraftTemplateExport(params) {
  return download('/api/crafts/export/template', params)
}
// 下载工艺工序导入的模板
export function CraftTechnologicalTemplateExport(params) {
  return download('/api/crafts/export/craft/procedure/template', params)
}
// 下载工艺导入的默认模板
export function CraftDefaultTemplateExport() {
  return download('/api/crafts/export/default/template')
}

const fileTransferServiceDownload = axios.create({
  baseURL: process.env.VUE_APP_NGINX_PATH,
  withCredentials: false, // 是否存cookie
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    'Content-Type': 'application/json',
    Authorization: getTokenType() + ' ' + getToken()
  },
  responseType: 'blob' // 下载的响应成二进制数据流
})
// 工艺工序导出
export function craftsProcedureExport({ params, data }) {
  return new Promise((resolve, reject) => {
    fileTransferServiceDownload({
      url: '/api/crafts/procedure/export',
      method: 'post',
      data,
      params
    }).then(({ data }) => {
      resolve(data)
    })
  })
}

// 导出工序
export function proceduresExport(params) {
  return new Promise((resolve, reject) => {
    fileTransferServiceDownload({
      url: '/api/procedures/export',
      method: 'get',
      params
    }).then(({ data }) => {
      resolve(data)
    })
  })
}
// 工艺导入数据
export function uploadCraftImport(file) {
  return upload('/api/crafts/excel/import', file)
}
// 导入工艺数据进度
export function getCraftImportProgress() {
  return request({
    url: '/api/crafts/import/progress',
    method: 'get'
  })
}
// 上传工艺模板
export function uploadCraftImportTemplate(params) {
  return upload('/api/crafts/import/template', params)
}

/**
 * 工序检验项定义
 */

// 获取工序检验项定义列表
export function getProcedureInspectList(params) {
  return request({
    url: '/api/procedure/inspect/list',
    method: 'get',
    params
  })
}

// 新增工序检验项定义
export function addProcedureInspect(query) {
  return request({
    url: '/api/procedure/inspect/add',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: query
  })
}

// 编辑工序检验项定义
export function editProcedureInspect(query) {
  return request({
    url: '/api/procedure/inspect/update',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: query
  })
}

// 获取工序检验项定义详情
export function getProcedureInspectDetail(id) {
  return request({
    url: `/api/procedure/inspect/detail/${id}`,
    method: 'get'
  })
}

// 删除工序检验项定义
export function deleteProcedureInspect(id) {
  return request({
    url: `/api/procedure/inspect/remove/${id}`,
    method: 'delete'
  })
}

// 获取工序检验项定义状态列表
export function getProcedureInspectStateList() {
  return request({
    url: '/api/procedure/inspect/state',
    method: 'get'
  })
}

// 工序检验项定义-下载导入模板
export function procedureInspectDefaultExportTemplateExport() {
  return download('/api/procedure/inspect/export/default/template')
}

// 工序检验项定义-导入数据
export function uploadProcedureInspectExcelImport(file) {
  return upload('/api/procedure/inspect/excel/import', file)
}

// 工序检验项定义-导入数据进度
export function getProcedureInspectExcelImportProgress(file) {
  return request({
    url: '/api/procedure/inspect/excel/import/progress',
    method: 'get'
  })
}

// 获取工序检验项定义数据类型列表
export function getProcedureInspectDataTypeList() {
  return request({
    url: '/api/procedure/inspect/data/type',
    method: 'get'
  })
}

// 获取检验项目和检验代号的下拉接口
export function getProcedureInspectConfigList(params) {
  return request({
    url: '/api/procedure/inspect/config/list',
    method: 'get',
    params
  })
}

// 根据数据类型获取比较符列表
export function getProcedureInspectConfigDataType(dataType) {
  return request({
    url: `/api/procedure/inspect/config/type/${dataType}`,
    method: 'get'
  })
}

// 获取boolean类型标准值下拉列表
export function getStandardValueListByBoolean() {
  return request({
    url: `/api/procedure/inspect/config/boolean/data `,
    method: 'get'
  })
}

// 新增工序检验项(工艺编辑tab页使用)
export function addProcedureInspectInCraft(query) {
  return request({
    url: '/api/procedure/inspect/config/add',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: query
  })
}

// 编辑工序检验项(工艺编辑tab页使用)
export function editProcedureInspectInCraft(query) {
  return request({
    url: '/api/procedure/inspect/config/update',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: query
  })
}

// 获取工序检验配置的详情(工艺编辑tab页使用)
export function getProcedureInspectConfigDetailById(id) {
  return request({
    url: `/api/procedure/inspect/config/detail/${id}`,
    method: 'get'
  })
}

// 获取工序检验类型(工艺编辑tab页使用)
export function getProcedureInspectTypeList() {
  return request({
    url: `/api/procedures/inspect/type/enum`,
    method: 'get'
  })
}

// 获取工序检验默认项(工艺编辑tab页使用)
export function getProcedureInspectConfigAddDefaultConfig(query) {
  return request({
    url: `/api/procedure/inspect/config/add/default/config`,
    method: 'post',
    data: query
  })
}

// 删除工序检验项定义(工艺编辑tab页使用)
export function deleteProcedureInspectConfigDetailById(id) {
  return request({
    url: `/api/procedure/inspect/config/remove/${id}`,
    method: 'delete'
  })
}

// 获取工艺工序控制配置表(工艺编辑tab页使用)
export function getProcedureControllerConfig(craftProcedureId) {
  return request({
    url: `/api/crafts/procedure/controller/config/get/${craftProcedureId}`,
    method: 'get'
  })
}

// 修改工艺工序控制配置(工艺编辑tab页使用)
export function editProcedureControllerConfig(query) {
  return request({
    url: `/api/crafts/procedure/controller/config/edit`,
    method: 'put',
    data: query
  })
}

// 获取工艺-工序工装(工艺编辑tab页使用)
export function getProcedureConfigTooling(craftProcedureId) {
  return request({
    url: `/api/procedure/process/assembly/getListById/${craftProcedureId}`,
    method: 'get'
  })
}

// 获取工艺-工序工装 弹框工装下拉列表(工艺编辑tab页使用)
export function getProcedureToolingList() {
  return request({
    url: `/api/device/process/list`,
    method: 'get'
  })
}

// 新增工序工装 (工艺编辑tab页使用)
export function addProcedureTooling(query) {
  return request({
    url: '/api/procedure/process/assembly/insert',
    method: 'post',
    data: query
  })
}

// 编辑工序工装 (工艺编辑tab页使用)
export function editProcedureTooling(query) {
  return request({
    url: '/api/procedure/process/assembly/update',
    method: 'put',
    data: query
  })
}

// 删除工序工装 (工艺编辑tab页使用)
export function deleteProcedureToolingById(id) {
  return request({
    url: `/api/procedure/process/assembly/delete/${id}`,
    method: 'delete'
  })
}

// 工艺配置-工序检验获取检验方案列表
export function getProcedureDefectSchemeList() {
  return request({
    url: `/api/defect/scheme/released/list`,
    method: 'get'
  })
}

// 工艺配置-工序检验保存
export function saveProcedureDefectScheme(query) {
  return request({
    url: `/api/procedure/defect/scheme/insertOrDelete`,
    method: 'post',
    data: query
  })
}

// 工艺配置-工序维修获取检验方案列表
export function getProcedureMaintainSchemeList() {
  return request({
    url: `/api/maintain/scheme/released/list`,
    method: 'get'
  })
}

// 工艺配置-工序维修保存
export function saveProcedureMaintainScheme(query) {
  return request({
    url: `/api/procedure/maintain/scheme/insertOrDelete`,
    method: 'post',
    data: query
  })
}

// 工艺配置-工序人力岗位下拉列表(工艺编辑tab页使用)
export function getProcedurePostList() {
  return request({
    url: `/api/posts/getList`,
    method: 'get'
  })
}

// 工艺配置-新增工序人力 (工艺编辑tab页使用)
export function addProcedurePost(query) {
  return request({
    url: '/api/procedure/post/insert',
    method: 'post',
    data: query
  })
}

// 工艺配置-编辑工序人力 (工艺编辑tab页使用)
export function editProcedurePost(query) {
  return request({
    url: '/api/procedure/post/update',
    method: 'put',
    data: query
  })
}

// 工艺配置-删除工序人力 (工艺编辑tab页使用)
export function deleteProcedurePostById(id) {
  return request({
    url: `/api/procedure/post/delete/${id}`,
    method: 'delete'
  })
}

// 工艺复制
export function copyCraftById(query) {
  return request({
    url: `/api/crafts/copyCraft`,
    method: 'post',
    data: query
  })
}

// 工艺编辑-数据分析列表
export function getCraftImpactAnalysisList(query) {
  return request({
    url: `/api/crafts/impact/analysis`,
    method: 'post',
    data: query
  })
}

// 工艺编辑-数据分析导出
export function exportCraftImpactAnalysis(query) {
  return download(`/api/crafts/impact/analysis/export`, query, 'post')
}

// BOM编辑-数据分析列表
export function getBomsImpactAnalysis(data) {
  return request({
    url: `/api/boms/impact/analysis`,
    method: 'post',
    data
  })
}

// BOM编辑-数据分析导出
export function exportBomsImpactAnalysis(query) {
  return download(`/api/boms/impact/analysis/export`, query, 'post')
}

// BOM详情页面获取多级bom
export function bomsMultiLevel(query) {
  return request({
    url: `/api/boms/multi/level`,
    method: 'get',
    params: query
  })
}
// 生产工单详情页面获取多级bom
export function workordersMultiLevelBom(query) {
  return request({
    url: `/api/workorders/multi/level/bom`,
    method: 'get',
    params: query
  })
}

// 物料台账获取物料明细
export function getMaterialDetails(query) {
  return request({
    url: '/wms/stocks/inventory/detail/getMaterialDetails',
    method: 'post',
    data: query
  })
}

// 物料批次获取物料明细
export function getBatchDetails(query) {
  return request({
    url: '/wms/stocks/inventory/detail/getBatchDetails',
    method: 'post',
    data: query
  })
}

// 获取仓库查看权限
export function getJurisdictionConfig(type) {
  return request({
    url: '/api/config/list/config/getJurisdictionConfig?orderType=' + type,
    method: 'get'
  })
}

// 获取台账左侧树形结构
export function getWarehouseQueryTree(value) {
  return request({
    url:
      '/wms/stocks/inventory/get/warehouseQueryTree?isWarehouseJurisdiction=' +
      value,
    method: 'get'
  })
}

// 根据物料查询物料特征参数列表
export function materialSkuAttrList(data) {
  return request({
    url: '/api/material/sku/attr/list',
    method: 'post',
    data
  })
}

// 查询特征值列表
export function auxiliaryAttrValueList(data) {
  return request({
    url: '/api/auxiliary/attr/value/list',
    method: 'post',
    data
  })
}

// 新增物料sku
export function addMaterialSku(data) {
  return request({
    url: '/api/material/sku/add',
    method: 'post',
    data
  })
}

export function getProductBaseUnit() {
  return request({
    url: '/api/procedures/get/work/center/type',
    method: 'get'
  })
}

// 获取数据类型
export function getDataType() {
  return request({
    url: '/api/procedure/inspect/data/type',
    method: 'get'
  })
}

// 获取工序的工艺参数列表（新增/默认项）
export function getTechnologyParamsForProcess(params) {
  return request({
    url: '/api/process/parameter/config/default/list',
    method: 'get',
    params
  })
}

// 获取工艺的工艺参数列表
export function getTechnologyParamsForTechnology(params) {
  return request({
    url: '/api/process/parameter/config/list',
    method: 'get',
    params
  })
}

// 新增工艺参数配置
export function addTechnologyParams(data) {
  return request({
    url: '/api/process/parameter/config/add/batch',
    method: 'post',
    data
  })
}

// 修改工艺参数配置
export function updateTechnologyParams(data) {
  return request({
    url: '/api/process/parameter/config/update/batch',
    method: 'put',
    data
  })
}

// 删除工艺参数配置
export function deleteTechnologyParams(id) {
  return request({
    url: `/api/process/parameter/config/remove/${id}`,
    method: 'delete'
  })
}
