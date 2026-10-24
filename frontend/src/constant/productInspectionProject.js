import { v4 as uuidv4 } from 'uuid'

const PRODUCT_INSPECTION_PROJECT = [
  {
    id: uuidv4,
    label: '检验项目组',
    code: 'groupName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'itemGroupEntity',
    special: true
  },
  {
    id: uuidv4,
    label: '检验项目',
    code: 'name',
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
    label: '检验项目编码',
    code: 'code',
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
  /*   {
    id: uuidv4,
    label: '审批状态',
    code: 'approvalStatusName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  }, */
  {
    id: uuidv4,
    label: '分析方法',
    code: 'analyzeMethodCodeName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '重点检查',
    code: 'importantInspection',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: '',
    special: true
  },
  // {
  //   id: uuidv4,
  //   label: '缺陷等级',
  //   code: 'defectLevelCodeName',
  //   width: '120',
  //   minWidth: null,
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
  //   parentFields: ''
  // },
  {
    id: uuidv4,
    label: '标准值/参考值',
    code: 'referenceValue',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '抽样方案',
    code: 'samplePlanName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  // {
  //   id: uuidv4,
  //   label: '是否生成检验报告',
  //   code: 'export',
  //   width: '160',
  //   minWidth: null,
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
  //   parentFields: '',
  //   special: true
  // },
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
    label: '修改人',
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
    label: '修改时间',
    code: 'updateTime',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
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
    queryName: 'statues'
  }, // 状态
  { name: 'name', type: 'input', queryName: 'name' }, // 检验项目
  { name: 'code', type: 'input', queryName: 'code' } // 检验项目编码
  /*  { name: 'approvalStatusName', type: 'filter', queryName: 'approveStatus' }  */ // 审批状态
]

export { PRODUCT_INSPECTION_PROJECT, PRODUCT_INSPECTION_PROJECT_LIST }
