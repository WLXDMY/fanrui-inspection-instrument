/*
 * @Author: shunhua.liang
 * @Date: 2022-05-09 14:01:26
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-12-09 09:32:47
 * @Description: 销售订单常量
 */

// 物料规格(standard) 、备注(remark)、 图号(drawingNumber) 、 物料单价(materialPrice) 、损耗率(loseRate) 、材质(rawMaterial)

import { v4 as uuidv4 } from 'uuid'

const SALES_TABLE = [
  {
    id: uuidv4(),
    label: '订单编号',
    code: 'saleOrderNumber',
    width: '165',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'stateName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '审批状态',
    code: 'approvalStatusName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '销售员',
    code: 'salesmanName',
    width: '90',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '客户名称',
    code: 'customerName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '物料编码',
    code: 'code',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'saleOrderMaterial.materialFields'
  },
  {
    id: uuidv4(),
    label: '物料名称',
    code: 'name',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'saleOrderMaterial.materialFields'
  },
  {
    id: uuidv4(),
    label: '物料数量',
    code: 'salesQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '总价',
    code: 'totalPrice',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: 'ERP同步单号',
    code: 'erpDocumentCode',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '计划生产数量',
    code: 'plannedProductionQuantity',
    width: '140',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '排产数量',
    code: 'scheduledProductionQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '生产数量',
    code: 'productionQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '不合格数',
    code: 'unqualifiedQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '出货申请数量',
    code: 'appliedShipmentQuantity',
    width: '140',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '出货数量',
    code: 'appliedQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '优先级',
    code: 'priority',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: null,
    minWidth: '150',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '下单日期',
    code: 'orderDate',
    width: null,
    minWidth: '150',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '要货日期',
    code: 'requireGoodsDate',
    width: null,
    minWidth: '150',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '审批人',
    code: 'approverName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  // {
  //   id: uuidv4(),
  //   label: '交货期',
  //   code: 'materialPlannedDeliveryDate',
  //   width: null,
  //   minWidth: '150',
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  // },
  {
    id: uuidv4(),
    label: '出库数量',
    code: 'outStockQuantity',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: 'BOM',
    code: 'haveBom',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnBoolean: true,
    special: true,
    columnType: 'material' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '工艺信息',
    code: 'haveCraft',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnBoolean: true,
    slot: 'special',
    special: true,
    columnType: 'material' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '订单类型',
    code: 'saleOrderType',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnBoolean: true,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '发货状态',
    code: 'shipmentStatusName',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createName',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '更新人',
    code: 'updateName',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '更新时间',
    code: 'updateTime',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '导入时间',
    code: 'importTime',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '审批时间',
    code: 'approvalTime',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '客户订单编号',
    code: 'customerOrderNumber',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '客户物料名称',
    code: 'customerMaterialName',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '客户物料规格',
    code: 'customerSpecification',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '订单物料是否变更',
    code: 'materialIsChange',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnBoolean: true,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '订单物料变更时间',
    code: 'materialChangeTime',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: 'ERP同步时间',
    code: 'synchronizationTime',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '发货日期',
    code: 'deliveryDate',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material'
  },
  {
    id: uuidv4(),
    label: '物料类型',
    code: 'typeName',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material'
  },
  {
    id: uuidv4(),
    label: '客户编码',
    code: 'customerCode',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '销售员简称',
    code: 'salesmanCode',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '实际审批人',
    code: 'actualApproverName',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '订单来源',
    code: 'saleOrderSource',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '客户合同号',
    code: 'customerContractNo',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '未发货数量',
    code: 'notDeliveredQuantity',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '退货数量',
    code: 'returnQuantity',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '合格率',
    code: 'passRate',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '完成率',
    code: 'completionRate',
    width: '110',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  }

]

const ORDER_SALES_TABLE = [
  {
    id: uuidv4(),
    label: '订单编号',
    code: 'saleOrderNumber',
    width: '165',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'state',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  // {
  //   id: uuidv4(),
  //   label: '交货期',
  //   code: 'materialPlannedDeliveryDate',
  //   width: null,
  //   minWidth: '150',
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  // },
  {
    id: uuidv4(),
    label: '审批状态',
    code: 'approvalStatusName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '销售员',
    code: 'salesmanName',
    width: '90',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '客户名称',
    code: 'customerName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  // {
  //   id: uuidv4(),
  //   label: '优先级',
  //   code: 'priority',
  //   width: '120',
  //   minWidth: null,
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  // },
  // {
  //   id: uuidv4(),
  //   label: '下单日期',
  //   code: 'orderDate',
  //   width: null,
  //   minWidth: '150',
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  // },

  {
    id: uuidv4(),
    label: '审批人',
    code: 'approverName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

const DIALOG_SALES_TABLE = [
  {
    id: uuidv4(),
    label: '订单编号',
    code: 'saleOrderNumber',
    width: '165',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'state',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '审批状态',
    code: 'approvalStatusName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '销售员',
    code: 'salesmanName',
    width: '90',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '客户名称',
    code: 'customerName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '优先级',
    code: 'priority',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },

  {
    id: uuidv4(),
    label: '审批人',
    code: 'approverName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '物料编码',
    code: 'code',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '物料名称',
    code: 'name',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

const LIST = [
  { name: 'saleOrderNumber', type: 'input', queryName: 'orderNumber' }, // 订单编号
  { name: 'customerCode', type: 'filter' }, // 客户名称
  { name: 'customerName', type: 'filter', queryName: 'customerName' },
  { name: 'name', type: 'input', queryName: 'name' }, // 物料名称
  { name: 'deliveryDate', type: 'timeline', queryTip: ['actualDeliveryStartTime', 'actualDeliveryEndTime'] }, // 实际交货时间
  { name: 'createTime', type: 'timeline', queryTip: ['createStartTime', 'createEndTime'] }, // 实际交货时间
  { name: 'orderDate', type: 'timeline', queryTip: ['orderStartTime', 'orderEndTime'] }, // 下单日期
  { name: 'state', type: 'filter', queryName: 'states' }, // 状态
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'actualApproverName', type: 'filter', queryName: 'actualApprover' },
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }, // 审批状态
  { name: 'code', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'standard', type: 'input' }, // 物料规格
  { name: 'materialDrawingNumber', type: 'input', queryName: 'drawingNumber' }, // 图号
  { name: 'priority', type: 'filter', queryName: 'priorities' }, // 优先级
  { name: 'haveCraft', type: 'filter' }, // 订单备注
  { name: 'haveBom', type: 'filter' }, // 订单备注
  { name: 'materialPlannedDeliveryDate', type: 'timeline', queryTip: ['planDeliveryStartTime', 'planDeliveryEndTime'] },
  { name: 'salesmanName', type: 'filter', queryName: 'salesmanCode' },
  { name: 'salesmanCode', type: 'filter', queryName: 'salesmanCode' },
  { name: 'saleOrderType', type: 'filter' },
  { name: 'shipmentStatusName', type: 'filter', queryName: 'shipmentStatus' },
  { name: 'approvalTime', type: 'timeline', queryTip: ['approvalStartTime', 'approvalEndTime'] },
  { name: 'updateTime', type: 'timeline', queryTip: ['updateStartTime', 'updateEndTime'] },
  { name: 'importTime', type: 'timeline', queryTip: ['importStartTime', 'importEndTime'] },
  { name: 'customerOrderNumber', type: 'input' },
  { name: 'customerMaterialName', type: 'input' },
  { name: 'customerSpecification', type: 'input' },
  { name: 'createName', type: 'input' },
  { name: 'updateName', type: 'input' },
  { name: 'customerContractNo', type: 'input' },
  { name: 'materialChangeTime', type: 'timeline', queryTip: ['materialChangeStartTime', 'materialChangeEndTime'] },
  { name: 'synchronizationTime', type: 'timeline', queryTip: ['erpSynchronizationStartTime', 'erpSynchronizationEndTime'] },
  { name: 'materialIsChange', type: 'filter' },
  { name: 'typeName', type: 'filter', queryName: 'types' },
  { name: 'saleOrderSource', type: 'filter', queryName: 'saleOrderSource' },
  { name: 'customerContractNo', type: 'input' },

  { name: 'requireGoodsDate', type: 'timeline', queryTip: ['planDeliveryStartTime', 'planDeliveryEndTime'] }
]

export {
  LIST,
  SALES_TABLE,
  ORDER_SALES_TABLE,
  DIALOG_SALES_TABLE
}
