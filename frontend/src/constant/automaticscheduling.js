import { v4 as uuidv4 } from 'uuid'

export const TABLE_COL = [
  {
    id: uuidv4(),
    label: '锁定',
    code: 'workLockStatus',
    width: '70',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: 'left',
    special: true,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '生产单据号',
    code: 'workOrderNumber',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: 'left',
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '工单编号',
    code: 'workOrderNumber',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '工单名称',
    code: 'workOrderName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '生产订单号',
    code: 'productOrderNumber',
    width: '150',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '优先级',
    code: 'priority',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
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
    id: uuidv4(),
    label: '物料名称',
    code: 'name',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle', // 这个属性决定是否允许拖动
    parentFields: 'materialFields'
  },
  {
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
    label: '车间',
    code: 'gridName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
    label: '排程状态',
    code: 'scheduleStatusName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle'
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'stateName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
    label: '创建时间',
    code: 'createDate',
    width: '160',
    minWidth: '160',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '更新时间',
    code: 'updateDate',
    width: '160',
    minWidth: '160',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },

  {
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
  {
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
    label: '合格率',
    code: 'passRate',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
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
]
