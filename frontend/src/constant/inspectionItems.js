import { v4 as uuidv4 } from 'uuid'

const TABLE_LIST = [
  {
    id: uuidv4,
    label: '检验项目',
    code: 'name',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '状态',
    code: 'stateName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '分类',
    code: 'type',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '',
    special: true
  },
  {
    id: uuidv4,
    label: '检验方法判定',
    code: 'determinationOfDetectionMethod',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '检验方法',
    code: 'verificationMethod',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '检验仪器',
    code: 'verificationInstrument',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '比较符',
    code: 'comparator',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '标准值/边界值',
    code: 'referenceValue',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '上限值',
    code: 'upperLimitValue',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '下限值',
    code: 'downLimitValue',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '创建人',
    code: 'createByName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '审批人',
    code: 'approvalName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '审批时间',
    code: 'approvalTime',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '审批状态',
    code: 'approvalStatusName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '备注',
    code: 'remark',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  }
]

export { TABLE_LIST }
