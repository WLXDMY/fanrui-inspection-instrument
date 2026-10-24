import { v4 as uuidv4 } from 'uuid'

const TECHNOLOGY = [
  // {
  //     id: uuidv4,
  //     label: null,
  //     code: null,
  //     width: '55',
  //     minWidth: null,
  //     showOverflowTooltip: true,
  //     type:'selection',
  //     fixed:null,
  //     class: '' // 这个属性决定是否允许拖动
  // },
  {
    id: uuidv4,
    label: '工艺编号',
    code: 'craftCode',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '工艺名称',
    code: 'name',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '工艺描述',
    code: 'craftDesc',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '物料编码',
    code: 'materialCode',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '物料名称',
    code: 'materialName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  // {
  //   id: uuidv4,
  //   label: '物料规格',
  //   code: 'materialStandard',
  //   width: null,
  //   minWidth: null,
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   class: '' // 这个属性决定是否允许拖动
  // },
  {
    id: uuidv4,
    label: '状态',
    code: 'stateName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
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
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '编制人',
    code: 'editorName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建人',
    code: 'createByNickname',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
    width: '140',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '修改时间',
    code: 'updateTime',
    width: '140',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '审批人',
    code: 'approverName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '版本',
    code: 'craftVersion',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  }
]

export { TECHNOLOGY }
