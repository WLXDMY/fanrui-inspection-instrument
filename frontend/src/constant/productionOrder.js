import { v4 as uuidv4 } from 'uuid'

const WORK_ORDER = [
  {
    id: uuidv4,
    label: '生产订单号',
    code: 'productOrderNumber',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: 'expand',
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
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
    class: ''
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
    class: ''
  },
  {
    id: uuidv4,
    label: '根生产订单',
    code: 'relatedRootOrderNum',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '上级生产订单',
    code: 'relatedOrderNum',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '物料编码',
    code: 'code',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '物料名称',
    code: 'name',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '物料类型',
    code: 'typeName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '工序进度详情',
    code: 'procedureProcessDetail',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  // {
  //   id: uuidv4,
  //   label: '物料规格',
  //   code: 'materialStandard',
  //   width: '120',
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   class: ''
  // },
  {
    id: uuidv4,
    label: '工序进度',
    code: 'orderProcedureFinishEntities',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '排产数量',
    code: 'scheduledProductionQuantity',
    width: '80',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '计划数量',
    code: 'planQuantity',
    width: '80',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '完成数量',
    code: 'finishCount',
    width: '80',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '完成率',
    code: 'progress',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnBoolean: true,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
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
    label: '计划生产开始时间',
    code: 'planProductStartTime',
    width: '170',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '计划生产完成时间',
    code: 'planProductEndTime',
    width: '170',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '销售订单号',
    code: 'saleOrderCode',
    width: '150',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '客户名称',
    code: 'customerName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '订单数量',
    code: 'productReserveNum',
    width: '80',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
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
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '交货期',
    // code: 'deliveryDeadline',
    code: 'requireGoodsDate',
    width: '150',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '审批人',
    code: 'actualApprover',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
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
  //   class: ''
  // }
]

export { WORK_ORDER }
