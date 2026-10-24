import { v4 as uuidv4 } from 'uuid'
// 首页 表格
export const COLUMNS_CONFIG = [
  {
    id: uuidv4(),
    label: '缺陷编码',
    code: 'code',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '缺陷名称',
    code: 'name',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '缺陷类型',
    code: 'defectTypeName',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'status',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    special: true
  },
  {
    id: uuidv4(),
    label: '缺陷描述',
    code: 'remark',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByName',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '更新人',
    code: 'updateByName',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '更新时间',
    code: 'updateTime',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  }
]

export const TABLE_SEARCH = [
  { name: 'code', type: 'input' },
  { name: 'name', type: 'input' },
  { name: 'defectTypeCode', type: 'input' },
  { name: 'defectTypeName', type: 'input' },
  { name: 'status', type: 'filter', queryName: 'statues' }
]
