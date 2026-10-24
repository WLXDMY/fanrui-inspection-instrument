import { v4 as uuidv4 } from 'uuid'

const PRODUCT_INSPECTION_PROJECT = [
  {
    id: uuidv4,
    label: '仪器编码',
    code: 'instrumentCode',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '仪器名称',
    code: 'instrumentName',
    width: '210',
    isSortBox: true,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '仪器分类',
    code: 'instrumentCategoryName',
    width: '210',
    isSortBox: true,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '状态',
    code: 'statusName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '备注',
    code: 'remark',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '创建人',
    code: 'createByName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '更新人',
    code: 'updateByName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '更新时间',
    code: 'updateTime',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }

]

const PRODUCT_INSPECTION_PROJECT_LIST = [
  {
    name: 'groupName',
    type: 'filter',
    queryName: 'treeInspectionItemGroupIds'
  }, // 检验项目组
  {
    name: 'statusName',
    type: 'filter',
    queryName: 'statuses'
  }, // 状态
  { name: 'instrumentCategoryName', type: 'filter', queryName: 'instrumentCategoryName' }, // 检验项目
  { name: 'instrumentName', type: 'input', queryName: 'instrumentName' }, // 检验项目
  { name: 'instrumentCode', type: 'input', queryName: 'instrumentCode' } // 检验项目编码
]

export { PRODUCT_INSPECTION_PROJECT, PRODUCT_INSPECTION_PROJECT_LIST }
