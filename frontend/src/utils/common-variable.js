/*
 * @Author: your name
 * @Date: 2021-08-26 09:44:30
 * @LastEditTime: 2022-01-26 19:03:43
 * @LastEditors: zhaozhuo
 * @Description: In User Settings Edit
 * @FilePath: \dfs\src\utils\common-variable.js
 */
// 工单排程（顶部）：所有表头
const TABLE_HEADER_LIST = [
  { name: '生产订单号', props: 'orderNumber', sortable: false },
  { name: '状态', props: 'stateName', sortable: true },
  { name: '排程状态', props: 'scheduleStatusName', sortable: false },
  { name: '物料编码', props: 'materialCode', sortable: false },
  { name: '物料名称', props: 'materialName', sortable: true },
  { name: '物料类型', props: 'materialTypeName', sortable: true },
  { name: '计划数量', props: 'planQuantity', sortable: true },
  { name: '上层参考数', props: 'reqNum', sortable: false },
  { name: '库存分配数', props: 'inventoryAllocation', sortable: false },
  { name: '生产参考数', props: 'needProduceRefQuantity', sortable: false },
  { name: '下发数量', props: 'needProduceQuantity', sortable: true },
  { name: '计划交付时间', props: 'plannedDeliveryDate', sortable: true },
  { name: '交货期', props: 'deliveryDeadline', sortable: true },
  { name: '修改时间', props: 'updateTime', sortable: true },
  { name: '车间名称', props: 'gname', sortable: true },
  { name: '物料是否齐套', props: ' materialIsComplete', sortable: true },
  { name: '客户名称', props: 'customerName', sortable: true },
  { name: '型号类型', props: 'modelType', sortable: true },
  { name: '齐套数量', props: 'materialCompleteNum', sortable: true },
  { name: '欠套数量', props: 'materialOweNum', sortable: true },
  // { name: '发货状态', props: 'shipmentStatus', sortable: true },
  { name: '当前库存', props: 'currentInventory', sortable: true },
  { name: '辅助计划是否变更', props: 'auxiliaryPlanIsChange', sortable: false }
  // { name: '计划结束时间', props: 'plannedDeliveryDate', sortable: false },
  // {
  //   name: '是否能排程',
  //   props: 'isSchedule',
  //   sortable: false
  // }
]
// 工单排程（顶部）：仅在页面上展示的表头
const TABLE_HEADER_LIST_SHOW = [
  { name: '生产订单号', props: 'orderNumber', sortable: false },
  { name: '状态', props: 'stateName', sortable: true },
  { name: '排程状态', props: 'scheduleStatusName', sortable: false },
  { name: '物料编码', props: 'materialCode', sortable: false },
  { name: '物料名称', props: 'materialName', sortable: true },
  { name: '物料类型', props: 'materialTypeName', sortable: true },
  { name: '计划数量', props: 'planQuantity', sortable: true },
  { name: '上层参考数', props: 'reqNum', sortable: false },
  { name: '库存分配数', props: 'inventoryAllocation', sortable: false },
  { name: '生产参考数', props: 'needProduceRefQuantity', sortable: false },
  { name: '下发数量', props: 'needProduceQuantity', sortable: true },
  { name: '计划交付时间', props: 'plannedDeliveryDate', sortable: true },
  { name: '交货期', props: 'deliveryDeadline', sortable: true },
  { name: '修改时间', props: 'updateTime', sortable: true },
  { name: '车间名称', props: 'gname', sortable: true },
  { name: '物料是否齐套', props: ' materialIsComplete', sortable: true },
  { name: '客户名称', props: 'customerName', sortable: true },
  { name: '型号类型', props: 'modelType', sortable: true },
  // { name: '发货状态', props: 'shipmentStatus', sortable: true },
  { name: '齐套数量', props: 'materialCompleteNum', sortable: true },
  { name: '欠套数量', props: 'materialOweNum', sortable: true },
  { name: '当前库存', props: 'currentInventory', sortable: true }
  // {
  //   name: '是否能排程',
  //   props: 'isSchedule',
  //   sortable: false
  // }
]

const INIT_HEADER = [
  '生产订单号',
  '物料名称',
  '物料编码',
  '物料类型',
  '车间名称',
  '型号类型',
  '需生产数量',
  '计划交付时间',
  // '计划交货期',
  '交货期',
  '修改时间',
  // '发货状态',
  '状态',
  '当前库存',
  '物料是否齐套',
  '齐套数量',
  '欠套数量',
  '排程状态',
  '辅助计划是否变更',
  '计划结束时间',
  // '是否能排程',
  '客户名称'
]

const INIT_HEADER_SHOW = [
  '生产订单号',
  '物料名称',
  '物料编码',
  '物料类型',
  '车间名称',
  '型号类型',
  '计划数量',
  '需生产数量',
  '计划交付时间',
  // '计划交货期',
  '交货期',
  '修改时间',
  // '发货状态',
  '状态',
  '当前库存',
  '物料是否齐套',
  '齐套数量',
  '欠套数量',
  '排程状态',
  '辅助计划是否变更',
  // '计划结束时间',
  // '是否能排程',
  '客户名称'
]
// 工单排程（底部）：所有表头
const ALL_LIST_HEADER = [
  { all_name: '生产订单号', all_props: 'orderNumber', width: '140' },
  {
    all_name: '物料名称',
    all_props: 'materialName',
    sortable: false,
    width: '170'
  },
  { all_name: '物料编码', all_props: 'materialCode', width: '130' },
  { all_name: '工单编号', all_props: 'workOrderNumber', width: '150' },
  { all_name: '状态', all_props: 'stateName' },
  { all_name: '计划交付日期', all_props: 'handOverDate', width: '140' },
  { all_name: '产线', all_props: 'lineName', width: '140' },
  { all_name: '计划开始时间', all_props: 'startDate', width: '135' },
  { all_name: '计划结束时间', all_props: 'endDate', width: '140' },
  { all_name: '计划数量', all_props: 'planQuantity', width: '100' },
  { all_name: '当前库存', all_props: 'currentInventory', width: '80' },
  { all_name: '物料是否齐套', all_props: 'materialIsComplete' },
  { all_name: '齐套数量', all_props: 'materialCompleteNum', width: '75' },
  { all_name: '欠套数量', all_props: 'materialOweNum', width: '75' },
  {
    all_name: '理论工作时长',
    all_props: 'theoreticalWorkingHours',
    width: '160'
  }
]
// 工单排程（底部）：仅在页面上展示的表头
const ALL_INIT_LIST_HEADER = [
  { all_name: '生产订单号', all_props: 'orderNumber', width: '140' },
  {
    all_name: '物料名称',
    all_props: 'materialName',
    sortable: false,
    width: '170'
  },
  { all_name: '物料编码', all_props: 'materialCode', width: '130' },
  { all_name: '工单编号', all_props: 'workOrderNumber', width: '150' },
  { all_name: '状态', all_props: 'stateName' },
  { all_name: '计划交付日期', all_props: 'handOverDate', width: '140' },
  { all_name: '产线', all_props: 'lineName', width: '140' },
  { all_name: '计划开始时间', all_props: 'startDate', width: '135' },
  { all_name: '计划结束时间', all_props: 'endDate', width: '140' },
  { all_name: '计划数量', all_props: 'planQuantity', width: '100' },
  { all_name: '当前库存', all_props: 'currentInventory', width: '80' }
]

const ALL_INIT_HEADER = [
  '生产订单号',
  '工单编号',
  '物料名称',
  '物料编码',
  '状态',
  '计划交付日期',
  '产线',
  '计划开始时间',
  '计划数量',
  '计划结束时间',
  '当前库存',
  '物料是否齐套',
  '齐套数量',
  '欠套数量',
  '理论工作时长'
]

const ALL_COME_INIT_HEADER = [
  '生产订单号',
  '物料名称',
  '工单编号',
  '物料编码',
  '状态',
  '计划交付日期',
  '产线',
  '计划开始时间',
  '计划数量',
  '计划结束时间',
  '当前库存'
]

const AUXILIARY_PLAN_TABLE_HEADER_LIST = [
  {
    text: '生产订单号',
    column: 'orderNumber',
    sortable: false,
    width: 180,
    disabled: true
  },
  {
    text: '状态',
    column: 'stateName',
    sortable: false,
    width: 50
  },
  {
    text: '排单日期',
    column: 'arrangementDate',
    sortable: false,
    width: 150
  },
  { text: '交货期', column: 'deliveryDeadline', sortable: true, width: 100 },
  {
    text: '计划交付时间',
    column: 'plannedDeliveryDate',
    sortable: true,
    width: 120
  },
  {
    text: '计划发货日期',
    column: 'plannedShipDate',
    sortable: true,
    width: 120
  },
  {
    text: '发货状态',
    column: 'shipmentStatus',
    width: 120
  },
  {
    text: '发货数量',
    column: 'shipmentQuantity',
    width: 120
  },
  { text: '类型', column: 'modelType', sortable: false, width: 60 },
  { text: '客户名称', column: 'customerName', sortable: false, width: 200 },
  { text: '物料类型', column: 'typeName', sortable: false, width: 80 },
  {
    text: '物料名称',
    column: 'materialName',
    sortable: false,
    width: 190
  },
  {
    text: '物料编码',
    column: 'materialCode',
    sortable: false,
    width: 120
  },
  {
    text: '计划数量',
    column: 'quantity',
    sortable: false,
    width: 80
  },
  {
    text: '上层参考数',
    column: 'reqNum',
    sortable: false,
    width: 80
  },
  {
    text: '库存分配数',
    column: 'inventoryAllocation',
    sortable: false,
    width: 90
  },
  {
    text: '生产参考数',
    column: 'needProduceRefQuantity',
    sortable: false,
    width: 110
  },
  {
    text: '下发数量',
    column: 'needProduceQuantity',
    sortable: false,
    width: 90
  },
  {
    text: '完成数量',
    column: 'finishCount',
    sortable: false,
    width: 80
  },
  {
    text: '物料是否齐套',
    column: 'materialIsComplete',
    sortable: false,
    width: 110
  },
  // {
  //   text: '排程方式',
  //   column: 'scheduleMode',
  //   sortable: false,
  //   width: 80
  // },
  {
    text: '车间名称',
    column: 'gridName',
    sortable: false,
    width: 100
  },
  {
    text: '排程状态',
    column: 'scheduleStatusName',
    sortable: false,
    width: 100
  },
  // {
  //   text: '是否需排程',
  //   column: 'isSchedule',
  //   sortable: false,
  //   width: 100
  // },
  // { text: '发货状态', column: 'shipmentStatus', sortable: false, width: 80 },
  { text: '可用库存', column: 'currentInventory', sortable: false, width: 80 },
  {
    text: '物料齐套数量',
    column: 'materialCompleteNum',
    sortable: false,
    width: 120
  },

  {
    text: '物料欠套数量',
    column: 'materialOweNum',
    sortable: false,
    width: 120
  },
  {
    text: '销售订单编码',
    column: 'saleOrderCode',
    sortable: false,
    width: 160
  },
  {
    text: '接单日期',
    column: 'orderDate',
    sortable: false,
    width: 100
  },
  {
    text: '同步时间',
    column: 'synchronizationTime',
    sortable: false,
    width: 160
  },
  {
    text: '订单产品型号',
    column: 'productName',
    sortable: false,
    width: 200
  },
  {
    text: '订单数量',
    column: 'productReserveNum',
    sortable: false,
    width: 100
  },
  { text: '包装方式', column: 'packingMethod', sortable: false, width: 90 },
  {
    text: '辅材型号',
    column: 'auxiliaryMaterialModel',
    sortable: false,
    width: 100
  },
  // { text: '发货数量', column: 'shipmentQuantity', sortable: false, width: 80 },
  { text: '备注', column: 'remark', sortable: false, width: 120 },
  {
    text: '销售订单变更',
    column: 'saleOrderIsChange',
    sortable: false,
    width: 120
  },
  {
    text: '销售订单变更时间',
    column: 'saleOrderChangeTime',
    sortable: false,
    width: 160
  }
]

// 制造单元模型list 数据
const MODEL_LIST = [
  { type: 'device', name: '设备' },
  { type: 'grid', name: '车间' },
  { type: 'line', name: '产线' },
  { type: 'subline', name: '产线' },
  { type: 'area', name: '工厂' },
  { type: 'facility', name: '工位' }
]

// 公司
const COMPANY_LIST = [
  { name: '深圳精益油脂技术有限公司宝安分公司', code: 'oil' },
  { name: '浙江中有科技有限公司', code: 'lcm' }
]

// 项目IP和端口
const BASE_URL = process.env.VUE_APP_BASE_API || ''
export {
  TABLE_HEADER_LIST,
  INIT_HEADER,
  AUXILIARY_PLAN_TABLE_HEADER_LIST,
  ALL_LIST_HEADER,
  ALL_INIT_HEADER,
  INIT_HEADER_SHOW,
  TABLE_HEADER_LIST_SHOW,
  ALL_INIT_LIST_HEADER,
  ALL_COME_INIT_HEADER,
  MODEL_LIST,
  BASE_URL,
  COMPANY_LIST
}
