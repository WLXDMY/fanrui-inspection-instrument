export const PRODUCT_INSPECTION_PROJECT = [
  {
    type: 'selection',
    prop: 'index',
    minWidth: '55',
    checked: true
  },
  {
    label: '检验项目组',
    prop: 'groupName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    filterBoxType: 'select',
    optionsRequestConfig: {
      url: '/qms/product/v1/item/groups/list',
      method: 'post',
      labelKey: 'groupName',
      valueKey: 'id'
    },
    key: 'treeInspectionItemGroupIds',
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    multilevelkey: 'itemGroupEntity.groupName'
  },
  {
    label: '检验项目',
    prop: 'name',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    filterBoxType: 'input',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    label: '状态',
    prop: 'statusName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    label: '分析方法',
    prop: 'analyzeMethodCodeName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    label: '检验方法',
    prop: 'verificationMethod',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    label: '检验依据',
    prop: 'verificationBasis',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    label: '检验仪器',
    prop: 'verificationInstrument',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    label: '单位',
    prop: 'unit',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    label: '比较符',
    prop: 'comparatorCodeName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    label: '标准/参考值',
    prop: 'referenceValue',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    label: '上限值',
    prop: 'upperLimitValue',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },

  {
    label: '下限值',
    prop: 'downLimitValue',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    label: '是否生成检验报告',
    prop: 'export',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'slot', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  }
]

export const ConclusionOptions = [
  {
    label: '合格',
    code: 1
  },
  {
    label: '不合格',
    code: 0
  }
]
