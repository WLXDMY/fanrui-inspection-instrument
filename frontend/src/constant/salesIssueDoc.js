import { v4 as uuidv4 } from 'uuid'

const PURCHASE_PUT_IN_STORAGE_MATERIAL = [
  {
    id: uuidv4(),
    label: '销售出库单号',
    code: 'orderNo',
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
    label: '出库类型',
    code: 'typeName',
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
    label: '关联单据类型',
    code: 'refTypeName',
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
    label: '关联单据',
    code: 'refOrderNo',
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
    label: '计划出库时间',
    code: 'planTime',
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
    label: '申请人',
    code: 'applyUserNickName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '库房名称',
    code: 'warehouseName',
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
    label: '仓管员',
    code: 'warehouseUserNickName',
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
    label: '状态',
    code: 'status',
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
    label: '实际出库时间',
    code: 'actualTime',
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
    label: '备注',
    code: 'remarks',
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
    label: '行备注',
    code: 'materialRemark',
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
    label: '物料编码',
    code: 'materialCode',
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
    label: '物料名称',
    code: 'materialName',
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
    label: '物料规格',
    code: 'materialStandard',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  // {
  //   id: uuidv4(),
  //   label: "物料备注",
  //   code: "materialRemark",
  //   width: "120",
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: "", // 字段类型（判断是否是需要特殊取值的字段）
  //   class: "handle", // 这个属性决定是否允许拖动
  // },
  // {
  //   id: uuidv4(),
  //   label: "物料配置拓展字段",
  //   code: "materialExtend",
  //   width: "120",
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: "", // 字段类型（判断是否是需要特殊取值的字段）
  //   class: "handle", // 这个属性决定是否允许拖动
  // },

  {
    id: uuidv4(),
    label: '审批状态',
    code: 'auditStatus',
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
    label: '审批人',
    code: 'approverUserNickName',
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
    label: '创建人',
    code: 'createNickName',
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
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

const PURCHASE_PUT_IN_STORAGE_ORDER = [
  {
    id: uuidv4(),
    label: '销售出库单号',
    code: 'orderNo',
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
    label: '出库类型',
    code: 'inOrOutTypeName',
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
    label: '关联单据类型',
    code: 'refTypeName',
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
    label: '关联单据',
    code: 'refOrderNo',
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
    label: '计划出库时间',
    code: 'planTime',
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
    label: '申请人',
    code: 'nickname',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '库房名称',
    code: 'warehouseName',
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
    label: '仓管员',
    code: 'warehouseUserName',
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
    label: '状态',
    code: 'status',
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
    label: '实际出库时间',
    code: 'actualTime',
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
    label: '备注',
    code: 'remarks',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  // {
  //   id: uuidv4(),
  //   label: "物料编号",
  //   code: "materialCode",
  //   width: "120",
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: "", // 字段类型（判断是否是需要特殊取值的字段）
  //   class: "handle", // 这个属性决定是否允许拖动
  // },
  // {
  //   id: uuidv4(),
  //   label: "物料名称",
  //   code: "materialName",
  //   width: "120",
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: "", // 字段类型（判断是否是需要特殊取值的字段）
  //   class: "handle", // 这个属性决定是否允许拖动
  // },
  // {
  //   id: uuidv4(),
  //   label: "物料规格",
  //   code: "materialStandard",
  //   width: "120",
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: "", // 字段类型（判断是否是需要特殊取值的字段）
  //   class: "handle", // 这个属性决定是否允许拖动
  // },
  // {
  //   id: uuidv4(),
  //   label: "物料配置拓展字段",
  //   code: "materialExtend",
  //   width: "120",
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: "", // 字段类型（判断是否是需要特殊取值的字段）
  //   class: "handle", // 这个属性决定是否允许拖动
  // },

  {
    id: uuidv4(),
    label: '审批状态',
    code: 'auditStatus',
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
    label: '审批人',
    code: 'approverUserName',
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
    label: '创建人',
    code: 'createBy',
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
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

const LIST = [
  { name: 'orderNo', type: 'input' }, // 出库单号
  // { name: "typeName", type: "filter" }, // 出库类型
  { name: 'refTypeName', type: 'filter', queryName: 'refType' }, // 关联单据类型
  { name: 'refOrderNo', type: 'input' }, // 关联单号
  { name: 'planTime', type: 'timeline', queryTip: ['planTimeStart', 'planTimeEnd'] }, // 计划出库时间
  { name: 'applyUserNickName', type: 'input' }, // 申请人
  { name: 'warehouseName', type: 'filter', queryName: 'warehouseCode' }, // 库房名称
  { name: 'warehouseUserNickName', type: 'input' }, // 仓管员
  { name: 'status', type: 'filter', queryName: 'statusList' }, // 状态
  {
    name: 'actualTime',
    type: 'timeline',
    queryTip: ['actualTimeStart', 'actualTimeEnd']
  }, // 实际出库时间
  {
    name: 'remarks',
    type: 'input'
  }, // 单据备注
  {
    name: 'materialRemark',
    type: 'input'
  }, // 行备注
  {
    name: 'materialCode',
    type: 'input'
  }, // 物料编号
  { name: 'materialName', type: 'input' }, // 物料名称
  { name: 'materialStandard', type: 'input' }, // 物料规格
  { name: 'materialExtend', type: 'input' }, // 物料配置拓展字段
  { name: 'auditStatus', type: 'filter', queryName: 'auditStatusList' }, // 审批状态
  { name: 'approverUserName', type: 'input' }, // 审批人
  { name: 'createBy', type: 'input' }, // 创建人
  { name: 'createTime',
    type: 'timeline',
    queryTip: ['createTimeStart', 'createTimeEnd']
  } // 创建时间
]

export {
  PURCHASE_PUT_IN_STORAGE_MATERIAL,
  PURCHASE_PUT_IN_STORAGE_ORDER,
  LIST
}
