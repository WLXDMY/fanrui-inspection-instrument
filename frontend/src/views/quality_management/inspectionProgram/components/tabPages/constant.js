export const CHECK_STANDARDS_TABLE = [
  {
    label: '抽样方案名称',
    // qualityInspectionSchemeTemplateName
    prop: 'name',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    label: '抽样方案编码',
    // qualityInspectionSchemeTemplateName
    prop: 'code',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    label: '抽样类型',
    prop: 'typeName',
    minWidth: null
  },
  {
    label: '检验水平',
    prop: 'inspectLevelName',
    minWidth: null
  },
  {
    label: '严格度',
    prop: 'stringencyName',
    minWidth: null
  },
  {
    label: 'AQL',
    prop: 'aqlValue',
    minWidth: null
  },
  {
    label: '生效时间',
    prop: 'effectiveTime',
    minWidth: null
  },
  {
    label: '失效时间',
    prop: 'failureTime',
    minWidth: null
  }
]
export const Materialtype = [
  {
    type: 'selection',
    prop: 'index',
    minWidth: '55',
    checked: true
  },
  {
    label: '物料类型ID',
    // qualityInspectionSchemeTemplateName
    prop: 'id',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    // filterBoxType: 'input',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    label: '物料类型编码',
    prop: 'code',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    filterBoxType: 'input',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    label: '物料类型名称',
    // qualityInspectionSchemeTemplateName
    prop: 'name',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    filterBoxType: 'input',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    label: '物料类型描述',
    // qualityInspectionSchemeTemplateName
    prop: 'des',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  }
]
export const Material = [
  {
    type: 'selection',
    prop: 'index',
    minWidth: '55',
    checked: true
  },
  {
    label: '物料编码',
    // qualityInspectionSchemeTemplateName
    prop: 'code',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
    filterBoxType: 'input'
  },
  {
    label: '物料名称',
    // qualityInspectionSchemeTemplateName
    prop: 'name',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
    filterBoxType: 'input'
  },
  {
    label: '物料类型',
    // qualityInspectionSchemeTemplateName
    prop: 'typeName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    // isSort: true
    filterBoxType: 'select',
    optionsRequestConfig: {
      url: '/api/materials/material/type/list',
      method: 'get',
      labelKey: 'name',
      valueKey: 'id'
    },
    key: 'types',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // multilevelkey: 'itemGroupEntity.groupName'
  },
  {
    label: '物料规格',
    // qualityInspectionSchemeTemplateName
    prop: 'standard',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    label: '物料分类',
    // qualityInspectionSchemeTemplateName
    prop: 'sortName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    filterBoxType: 'select',
    optionsRequestConfig: {
      url: '/api/materials/sort',
      method: 'get',
      labelKey: 'name',
      valueKey: 'code'
    },
    key: 'sorts',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    label: '图号',
    // qualityInspectionSchemeTemplateName
    prop: 'drawingNumber',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    filterBoxType: 'input',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    label: '单位',
    // qualityInspectionSchemeTemplateName
    prop: 'comp',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]
