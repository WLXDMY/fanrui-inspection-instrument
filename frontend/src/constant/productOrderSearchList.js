/*
 * @Author: shunhua.liang
 * @Date: 2022-07-19 17:07:14
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-03-09 16:51:27
 * @Description:
 */

const LIST = [
  { name: 'materialListCode', type: 'input' }, // 订单编号
  { name: 'relateNumber', type: 'input' }, // 客户名称
  {
    name: 'createTime',
    type: 'timeline',
    queryTip: ['createStartTime', 'createEndTime']
  },

  { name: 'state', type: 'filter', queryName: 'states' }, // 状态
  { name: 'code', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'name', type: 'input', queryName: 'name' }, // 物料名称
  {
    name: 'materialStandard',
    type: 'input',
    queryName: 'orderMaterialStandard'
  }, // 物料规格
  { name: 'materialDrawingNumber', type: 'input', queryName: 'drawingNumber' }, // 图号
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }, // 审批状态
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'auxiliaryAttr', type: 'dialog', queryName: 'materialSkus' } // 特征参数

]

const MATERIAL_LIST = [
  { name: 'materialListCode', type: 'input' }, // 订单编号
  { name: 'relateNumber', type: 'input' }, // 客户名称
  {
    name: 'createTime',
    type: 'timeline',
    queryTip: ['createStartTime', 'createEndTime']
  },

  { name: 'state', type: 'filter', queryName: 'states' }, // 状态
  { name: 'code', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'name', type: 'input', queryName: 'name' }, // 物料名称
  {
    name: 'materialStandard',
    type: 'input',
    queryName: 'orderMaterialStandard'
  }, // 物料规格
  { name: 'materialDrawingNumber', type: 'input', queryName: 'drawingNumber' }, // 图号
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }, // 审批状态
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'productOrderNumber', type: 'input', queryName: 'orderNumber' }
]

export { LIST, MATERIAL_LIST }
