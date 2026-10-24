/*
 * @Author: shunhua.liang
 * @Date: 2022-07-19 17:07:14
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-21 15:43:58
 * @Description:
 */

const LIST = [
  { name: 'orderNumber', type: 'input' }, // 出库单号
  { name: 'relateOrders', type: 'input' }, // 关联单号
  { name: 'relateTypeName', type: 'filter', queryName: 'relateType' }, // 关联单据类型
  { name: 'warehouseName', type: 'filter', queryName: 'warehouseCode' }, // 库房名称
  { name: 'inOrOutTypeName', type: 'filter', queryName: 'inOrOutType' }, // 出库类型
  { name: 'state', type: 'filter' }, // 出库状态
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }, // 审批状态
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'productCode', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'productName', type: 'input', queryName: 'name' } // 物料名称
  // { name: 'materialStandard', type: 'input' } // 物料规格
]

// 生产出库单
const PRODUCT_LIST = [
  { name: 'orderNumber', type: 'input' }, // 出库单号
  { name: 'relateOrders', type: 'input' }, // 关联单号
  { name: 'relateTypeName', type: 'filter', queryName: 'relateType' }, // 关联单据类型
  { name: 'warehouseName', type: 'filter', queryName: 'warehouseCode' }, // 库房名称
  { name: 'state', type: 'filter' }, // 出库状态
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }, // 审批状态
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'code', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'name', type: 'input', queryName: 'name' } // 物料名称
]
export { LIST, PRODUCT_LIST }
