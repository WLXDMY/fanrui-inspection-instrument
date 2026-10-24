/*
 * @Author: shunhua.liang
 * @Date: 2022-05-10 11:18:31
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-08 17:08:36
 * @Description: 生产工单
 */

import { v4 as uuidv4 } from 'uuid'

const WORK_ORDER = [
  {
    id: uuidv4,
    label: '工单名称',
    code: 'workOrderName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: 'expand',
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '工单编号',
    code: 'workOrderNumber',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '生产订单号',
    code: 'productOrderNumber',
    width: '150',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '派工状态',
    code: 'assignmentStateName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '状态',
    code: 'stateName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '优先级',
    code: 'priority',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '审批状态',
    code: 'approvalStatusName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '物料编码',
    code: 'materialCode',
    width: '170',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '物料名称',
    code: 'materialName',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    // parentFields: 'materialFields',
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动

  },
  // {
  //   id: uuidv4,
  //   label: '物料规格',
  //   code: 'materialStandard',
  //   width: '200',
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   class: 'handle' // 这个属性决定是否允许拖动
  // },
  {
    id: uuidv4,
    label: '计划数量',
    code: 'planQuantity',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '完成数量',
    code: 'finishCount',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '完成率',
    code: 'progress',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    columnBoolean: true,
    special: true,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: 'BOM',
    code: 'haveBom',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    special: true,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '工艺信息',
    code: 'haveCraft',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    special: true,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '单位',
    code: 'comp',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    parentFields: 'materialFields',
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '工序名称',
    code: 'procedureName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '制造单元名称',
    code: 'lineName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '工作中心',
    code: 'workCenterName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '班组名称',
    code: 'teamName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备名称',
    code: 'deviceName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '销售订单',
    code: 'saleOrderNumber',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createDate',
    width: null,
    minWidth: '150',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '更新时间',
    code: 'updateDate',
    width: null,
    minWidth: '150',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '计划开始时间',
    code: 'startDate',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '计划完成时间',
    code: 'endDate',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '实际开始时间',
    code: 'actualStartDate',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '实际完成时间',
    code: 'actualEndDate',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '特征参数',
    code: 'auxiliaryAttr',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动

  },
  {
    id: uuidv4,
    label: '流转数量',
    code: 'inStockCount',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '生产时长',
    code: 'actualWorkingHours',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '流转时长',
    code: 'circulationDuration',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  // {
  //   id: uuidv4,
  //   label: '备注',
  //   code: '',
  //   width: '200',
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
  //   class: 'handle' // 这个属性决定是否允许拖动
  // },
  {
    id: uuidv4,
    label: '工单执行',
    code: 'executionStatusName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '审批人',
    width: '140',
    code: 'approverName',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '入库数量',
    code: 'inputCount',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '合格率',
    code: 'passRate',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    special: true,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '不合格数量',
    code: 'unqualified',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  }
  // {
  //   id: uuidv4,
  //   label: '图号',
  //   code: 'materialDrawingNumber',
  //   width: null,
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   class: 'handle' // 这个属性决定是否允许拖动
  // }
]

const LIST = [
  { name: 'workOrderNumber', type: 'input' }, // 工单编号
  { name: 'workOrderName', type: 'input' }, // 工单名称
  { name: 'stateName', type: 'filter', queryName: 'states' }, // 状态
  { name: 'assignmentStateName', type: 'filter', queryName: 'assignmentState' }, // 派工状态
  { name: 'createDate', type: 'timeline', queryTip: ['startTime', 'endTime'] }, // 创建时间
  {
    name: 'updateDate',
    type: 'timeline',
    queryTip: ['updateStartTime', 'updateEndTime']
  }, // 更新时间
  {
    name: 'startDate',
    type: 'timeline',
    queryTip: ['planStartTime', 'planEndTime']
  }, // 计划开始时间
  {
    name: 'actualStartDate',
    type: 'timeline',
    queryTip: ['actualStartTime', 'actualEndTime']
  }, // 实际开始时间
  {
    name: 'endDate',
    type: 'timeline',
    queryTip: ['planCompleteStartTime', 'planCompleteEndTime']
  }, // 计划完成时间
  {
    name: 'actualEndDate',
    type: 'timeline',
    queryTip: ['actualCompleteStartTime', 'actualCompleteEndTime']
  }, // 实际完成时间
  { name: 'lineName', type: 'filter', queryName: 'lineId' }, // 产线
  { name: 'materialCode', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'materialName', type: 'input', queryName: 'name' }, // 物料名称
  { name: 'materialStandard', type: 'input' }, // 物料规格
  { name: 'materialDrawingNumber', type: 'input', queryName: 'drawingNumber' }, // 图号
  { name: 'saleOrderNumber', type: 'input' }, // 销售订单号
  { name: 'productOrderNumber', type: 'input' }, // 生产订单号
  { name: 'executionStatusName', type: 'filter', queryName: 'executionStatus' }, // 工单执行
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }, // 审批状态
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'progress', type: 'filter', queryName: 'completionRate' }, // 完成率
  { name: 'procedureName', type: 'input' }, // 工序名称
  { name: 'workCenterName', type: 'filter', queryName: 'workCenterId' }, // 工作中心
  { name: 'auxiliaryAttr', type: 'dialog', queryName: 'materialSkus' } // 特征参数
]
export { WORK_ORDER, LIST }
