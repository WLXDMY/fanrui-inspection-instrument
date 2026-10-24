/*
 * @Author: zhaozhuo
 * @Date: 2021-12-31 18:29:39
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-10-16 13:57:00
 * @Description:
 */
// 基础信息接口文件
import request from '@/utils/request'
import { download, upload } from '@/api/fileTransfer'
// 例
export function rolelist(query) {
  return request({
    url: '/api/roles/list',
    method: 'get',
    params: query
  })
}
// 添加角色
export function addrole(query) {
  return request({
    url: '/api/roles/insert',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: query
  })
}
// 修改角色信息
export function editrole(query) {
  return request({
    url: '/api/roles/update',
    method: 'put',
    data: query
  })
}
// 删除按钮（组件）
export function deletebtn(url, query) {
  return request({
    url: url,
    method: 'delete',
    params: query
  })
}
export function roledetails(id) {
  return request({
    url: `/api/roles/select/${id}`,
    method: 'get'
  })
}
// 查询按钮（组件）
export function query(url, query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}
// 查询用户列表
export function userlist(query) {
  return request({
    // url: '/api/users/list/company',
    url: '/api/users/list/company/enabled',
    method: 'get',
    params: query
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

// 查询未禁用用户列表
export function getSalers() {
  return request({
    url: '/ams/sale/orders/list/salesman',
    method: 'get'
  })
}
// 添加用户
export function adduser(params) {
  return request({
    url: `/api/users/insert/${params.roleId}`,
    method: 'post',
    data: params.query
  })
}
// 编辑用户
export function edituser(query) {
  return request({
    url: '/api/users/update',
    method: 'put',
    data: query
  })
}
// 禁用或启用用户
export function changestate(data, query) {
  return request({
    url: `/api/users/disable/${data.disOrEnable}/${data.userId}`,
    method: 'put',
    params: query
  })
}
// 获取登录用的用户信息
export function getuserdata() {
  return request({
    url: '/api/users/info',
    method: 'get'
  })
}
// 修改密码
export function changepassword(query) {
  return request({
    url: '/api/users/update/password',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'post',
    params: query
  })
}
// 根据用户id查询用户详细信息
export function userdetails(id, query) {
  return request({
    url: `/api/users/select/${id}`,
    method: 'get',
    params: query
  })
}
// 照片上传接口
export function getimgurl(query) {
  return request({
    url: '/api/resource/add',
    method: 'post',
    data: query
  })
}
// 客户档案接口
// 列表
export function getCustomer(query) {
  return request({
    url: '/api/customers/list',
    method: 'post',
    data: query || {}
  })
}
// 新增客户档案
export function addCustomer(query) {
  return request({
    url: '/api/customers/insert',
    method: 'post',
    data: query
  })
}
// 修改客户档案
export function modifyCustomer(query) {
  return request({
    url: '/api/customers/update',
    method: 'put',
    data: query
  })
}
// 查询客户档案状态列表
export function queryCustomerStateList() {
  return request({
    url: 'api/customers/all/state',
    method: 'get'
  })
}

// 获取客户档案详情信息
export function getCustomersDetailById(id) {
  return request({
    url: `/api/customers/detail/${id}`,
    method: 'get'
  })
}

// 获取客户档案详情信息
export function approveCustomersExamine(params) {
  return request({
    url: `/api/customers/examine/approve`,
    method: 'get',
    params
  })
}

// 获取客户档案审批状态
export function getSuppliersAllState() {
  return request({
    url: `/api/suppliers/all/state`,
    method: 'get'
  })
}

// 客户档案模板下载
export function getCustomersExportTemplate() {
  return download('/api/customers/export/template')
}

// 客户档案信息导出
export function getCustomersExportCustomer(params) {
  return download('/api/customers/export/customer', params, 'post')
}

// 客户档案信息导入
export function postCustomersUploadCustomer(file) {
  return upload('/api/customers/upload/customer', file)
}

// 客户档案信息导入进度
export function getCustomersImportProgress() {
  return request({
    url: '/api/customers/import/progress',
    method: 'get'
  })
}

// 查询订单  //获取生产订单中销售订单编码下拉列表
export function orderQuery(query) {
  return request({
    // url: '/api/orders/list',
    url: '/ams/product/orders/list',
    method: 'post',
    data: query
  })
}

// 获取生产订单编号list
export function productOrdeNumList(data) {
  return request({
    url: '/ams/product/orders/list',
    method: 'post',
    data
  })
}
// 更新订单
export function updateOrder(query) {
  return request({
    url: '/api/orders/update',
    method: 'put',
    data: query
  })
}
// 通过订单查询物料
export function queryMaterial(orderId) {
  return request({
    url: `/api/orders/select/bom/${orderId}`,
    method: 'get'
  })
}
// 通过订单查询工单
export function queryWorkorder(orderId) {
  return request({
    url: `/api/orders/select/work/order/${orderId}`,
    method: 'get'
  })
}
// 添加订单
export function addOrder(query) {
  return request({
    url: `/api/orders/insert`,
    method: 'post',
    data: query
  })
}
// 新增保存确认接口(生产订单)
export function saveProductOrderValid(query) {
  return request({
    url: '/api/orders/insert/judge',
    method: 'post',
    data: query
  })
}
// 订单详情   //订单编码带出销售订单信息
export function orderDetail(orderId) {
  return request({
    url: `/ams/sale/orders/select/${orderId}`,
    method: 'get'
  })
}

// 根据物料编号获取BOM信息
export function getBomProductMaterial(params) {
  return request({
    url: `/api/orders/get/bom/product/material`,
    method: 'get',
    params
  })
}

// 销售订单按BOM下推到生产订单
export function orderPushDownProductOrder(data) {
  return request({
    // url: `/api/orders/push/down/product/order`,
    url: '/ams/sale/orders/push/down/product/order',
    method: 'post',
    params: data.query,
    data: data.body
  })
}

// 销售订单支持按工艺路线下推到生产工单
export function saleOrderPushDownWorkOrder(data) {
  return request({
    // url: `/api/orders/sale/push/down/work/order`,
    url: '/ams/sale/orders/sale/push/down/work/order',
    method: 'post',
    params: data.query,
    data: data.body
  })
}

// 销售订单按生产订单合单下推
export function saleOrderMergePushDownByProductOrder(query) {
  return request({
    // url: `/api/orders/merge/push/down/product/order`,
    url: '/ams/sale/orders/merge/push/down/product/order',
    method: 'post',
    data: query
  })
}

// 生产订单下推到生产工单
export function orderPushDownWorkOrder(data) {
  return request({
    url: `/ams/product/orders/push/down/work/order`,
    method: 'post',
    params: data.query,
    data: data.body
  })
}

// 销售订单下推(判断订单总数超出关联订单的总数)
export function saleOrderPushDownJudge(query) {
  return request({
    url: `/ams/sale/orders/push/down/judge`,
    method: 'post',
    params: query.params,
    data: query.body
  })
}

// 生产、销售订单-审批
export function approveOrdersExamine(params) {
  return request({
    url: `/api/orders/examine/approve`,
    method: 'get',
    params
  })
}
// // 修改工单
// export function modifyOrder(orderId) {
//   return request({
//     url: `/api/orders/select/work/order/${orderId}`,
//     method: 'get',
//   })
// }
// 查询客户列表
export function customerList(query) {
  return request({
    url: '/api/customers/list',
    method: 'post',
    data: query || {}
  })
}
// 删除订单
export function deleteOrder(orderId) {
  return request({
    url: `/api/orders/delete/${orderId}`,
    method: 'delete'
  })
}

// 查询销售订单状态列表
export function getOrderState() {
  return request({
    // url: '/api/orders/all/state',
    url: '/ams/product/orders/all/state',
    method: 'get'
  })
}

// 销售订单新增编辑页面获取工单列表
export function getWorkOrdersList() {
  return request({
    url: '/api/workorders/state/list',
    method: 'get'
  })
}

// 删除订单
export function deleteOrderById(id) {
  return request({
    url: `/api/orders/delete/${id}`,
    method: 'delete'
  })
}

/**
 * 日历配置
 */

// 获取实例树
export function getWorkCalendarDeployTree() {
  return request({
    url: `/api/work/calendar/deploy/tree`,
    method: 'get'
  })
}

// 通过实例id,实例类型查看日历配置，并附带分页的日历
export function getWorkCalendarDeployList(params) {
  return request({
    url: `/api/work/calendar/deploy/list`,
    method: 'get',
    params
  })
}

// 获取日历配置详情
export function getWorkCalendarDeployDetail(deployId) {
  return request({
    url: `/api/work/calendar/deploy/detail/${deployId}`,
    method: 'get'
  })
}

// 添加日历配置
export function addWorkCalendarDeploy(query) {
  return request({
    url: `/api/work/calendar/deploy/add`,
    method: 'post',
    data: query
  })
}

// 修改日历配置
export function updateWorkCalendarDeploy(query) {
  return request({
    url: `/api/work/calendar/deploy/update`,
    method: 'post',
    data: query
  })
}

// 删除日历配置
export function deleteWorkCalendarDeploy(deployId) {
  return request({
    url: `/api/work/calendar/deploy/remove/${deployId}`,
    method: 'delete'
  })
}

// 工作日历列表 下拉框
export function getWorkCalendarList() {
  return request({
    url: `/api/work/calendar/list`,
    method: 'get'
  })
}

// 关于  页面接口  获取版本信息
export function getVersionInfo() {
  return request({
    url: `/api/sys/dfs/version`,
    method: 'get'
  })
}
// 获取联系人
export function getContactsList(query) {
  return request({
    url: '/api/users/list/by/roleCode',
    method: 'get',
    params: query
  })
}
// 关于页面  恢复原厂设置
export function recoverInit(query) {
  return request({
    url: '/api/sys/revert',
    method: 'get',
    params: query
  })
}
// 获取辅助计划客户列表
export function getAuxiliaryCustomer(query) {
  return request({
    url: '/ams/auxiliary_plans/cus',
    method: 'post',
    data: query
  })
}
// 根据状态判断审批人
export function getStateApprover(code) {
  return request({
    url: `/api/approve/users/${code}`,
    method: 'get'
  })
}
// 批量审批销售订单/生产订单
export function ordersApproveBatch(query) {
  return request({
    url: `/api/orders/approve/batch`,
    method: 'post',
    data: query
  })
}
// 客户档案批量审批
export function clientApproveBatch(query) {
  return request({
    url: `/api/customers/approve/batch`,
    method: 'post',
    data: query
  })
}
// 生产领料申请批量审批
export function productRequisitionApproveBatch(query) {
  return request({
    url: `/api/take/out/application/approve/batch`,
    method: 'post',
    data: query
  })
}
// 生产工单批量审批
export function WorkOrderApproveBatch(query) {
  return request({
    url: `/api/workorders/approve/batch`,
    method: 'post',
    data: query
  })
}
// 物料批量审批
export function materialApproveBatch(query) {
  return request({
    url: `/api/materials/approve/batch`,
    method: 'post',
    data: query
  })
}
// 收货单批量审批
export function deliverOrderApproveBatch(query) {
  return request({
    url: `/ams/receipt/approve/batch`,
    method: 'post',
    data: query
  })
}
// 采购需求批量审批
export function demandApproveBatch(query) {
  return request({
    url: `/ams/requests/approve/batch`,
    method: 'post',
    data: query
  })
}
// 采购单批量审批
export function purchaseApproveBatch(query) {
  return request({
    url: `/ams/purchases/approve/batch`,
    method: 'post',
    data: query
  })
}
// 出货申请批量审批
export function shipmentApproveBatch(query) {
  return request({
    url: `/api/delivery/application/approve/batch`,
    method: 'post',
    data: query
  })
}
// 发货管理批量审批
export function deliveryApproveBatch(query) {
  return request({
    url: `/api/stocks/delivery/approve/batch`,
    method: 'post',
    data: query
  })
}

// 出库入库管理批量审批前查询该审批物料，是否在库房中初始化了
export function postExistStockMaterials(query) {
  return request({
    url: `/wms/stocks/exist/stock/materials`,
    method: 'post',
    data: query
  })
}

// 出库入库管理批量审批
export function outRecordApproveBatch(query) {
  return request({
    url: `/wms/stocks/approve/batch`,
    method: 'post',
    data: query
  })
}
// 调拨申请管理批量审批
export function materialAllocationApproveBatch(query) {
  return request({
    url: `/wms/stocks/transfer/approve/batch`,
    method: 'post',
    data: query
  })
}
// bom批量审批
export function bomApproveBatch(query) {
  return request({
    url: `/api/boms/approve/batch`,
    method: 'post',
    data: query
  })
}
// 工艺批量审批
export function technologyApproveBatch(query) {
  return request({
    url: `/api/crafts/approve/batch`,
    method: 'post',
    data: query
  })
}
// 工序批量审批
export function procedureApproveBatch(query) {
  return request({
    url: `/api/procedures/approve/batch`,
    method: 'post',
    data: query
  })
}
// 库房管理批量审批
export function warehouseApproveBatch(query) {
  return request({
    url: `/wms/stocks/warehouse/approve/batch`,
    method: 'post',
    data: query
  })
}
// 供应商档案批量审批
export function supplierApproveBatch(query) {
  return request({
    url: `/api/suppliers/approve/batch`,
    method: 'post',
    data: query
  })
}
// 19个页面首页审批人
export function selectUserList() {
  return request({
    url: `/api/users/list`,
    method: 'get'
  })
}

// 小程序业务配置
export function setAppletConfig(data) {
  return request({
    url: '/api/config/applets/licenses/save',
    method: 'post',
    data
  })
}

// 获取业务配置
export function getAppleConfig(params) {
  return request({
    url: '/api/config/applets/licenses/list',
    method: 'get',
    params
  })
}

// 物料生产订单生产工单bom导入历史接口获取列表
export function getHistoryDataList(params) {
  return request({
    url: `/qms/product/v1/import/records/list`,
    method: 'get',
    params
  })
}

// 物料生产订单生产工单bom导出历史数据下载附件
export function downLoadFile(params) {
  return download(`/qms/product/v1/import/records/download/log`, params)
}
// 物料生产订单生产工单bom进度条弹窗内下载附件
export function progressDownLoad(params) {
  return download(`/api/import/data/records/download/the/latest/log`, params)
}
// 获取白牌设置详情
export function getWhiteCardDetail(params) {
  return request({
    url: `/api/whitecard/get`,
    method: 'get',
    params
  })
}
// 获取系统公司二维码信息
export function getCompanyCode() {
  return request({
    url: `/api/sys/company/code`,
    method: 'get'
  })
}

export function orderNewQuery(query) {
  return request({
    url: '/ams/sale/orders/order/list',
    // method: 'get',
    // params: query
    method: 'post',
    data: query
  })
}
// 销售订单保存并生效
export function saleOrderSaveAndEffective(data) {
  return request({
    url: '/ams/sale/orders/insert/released',
    method: 'post',
    data
  })
}
// 生产订单保存并生效
export function productOrderSaveAndEffective(data) {
  return request({
    url: '/api/orders/insert/released',
    method: 'post',
    data
  })
}

// 客户档案保存并生效
export function customersSaveAndEffective(data) {
  return request({
    url: '/api/customers/insert/released',
    method: 'post',
    data
  })
}

// 客户档案对接人新增
export function postCustomersInsertCounterpart(data) {
  return request({
    url: '/api/customers/insert/counterpart',
    method: 'post',
    data
  })
}

// 配置的客户档案对接人查询
export function getCustomersGetCounterpart(params) {
  return request({
    url: '/api/customers/get/counterpart',
    method: 'get',
    params
  })
}

// 表格的客户档案对接人查询
export function getCustomersGetExistCounterpart() {
  return request({
    url: '/api/customers/get/exist/counterpart',
    method: 'get'
  })
}

// 供应商档案对接人新增
export function postSuppliersInsertCounterpart(data) {
  return request({
    url: '/api/suppliers/insert/counterpart',
    method: 'post',
    data
  })
}

// 配置的供应商档案对接人查询
export function getSuppliersGetCounterpart(params) {
  return request({
    url: '/api/suppliers/get/counterpart',
    method: 'get',
    params
  })
}

// 表格的供应商档案对接人查询
export function getSuppliersGetExistCounterpart() {
  return request({
    url: '/api/suppliers/get/exist/counterpart',
    method: 'get'
  })
}

// 生产订单审批
export function productOrderApprove(params) {
  return request({
    url: `/ams/product/orders/examine/approve`,
    method: 'get',
    params
  })
}

// 查询关联单据的物料信息
export function queryRelatedOrderMaterial(params) {
  return request({
    url: '/wms/stocks/relate/material/list/by/relate/type',
    method: 'get',
    params
  })
}

// 销售出库审核
export function stockSaleOutAudit(data) {
  return request({
    url: '/wms/stock/sale/out/audit',
    method: 'post',
    data
  })
}
// 销售退货入库审核
export function stockSaleReturnAudit(data) {
  return request({
    url: '/wms/stock/sale/return/audit',
    method: 'post',
    data
  })
}

// 【下推配置】获取下推配置信息
export function getPushConfig(data) {
  return request({
    url: '/api/config/push/down/get',
    method: 'post',
    data
  })
}

// 重置密码
export function resetPassword(data) {
  return request({
    url: `/api/users/admin/reset/password`,
    method: 'put',
    data
  })
}

// 触发配置的api
export function apiTransformTrigger(data) {
  return request({
    url: '/api/api_transform/trigger',
    method: 'post',
    data
  })
}
