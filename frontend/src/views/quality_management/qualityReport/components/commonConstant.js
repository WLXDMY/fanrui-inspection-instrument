// 按类型
const COLUMNS_CONFIG_TYPE = [
  {
    prop: 'inspectTypeName',
    label: '检验类型',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'materialCode',
    label: '物料编码',
    minWidth: '100',
    thresholdValue: '',
    // filterBoxType: 'input', 存在filterBoxType 证明可以过滤
    checked: true
  },
  {
    prop: 'materialName',
    label: '物料名称',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'checklistQuantity',
    label: '送检单数量',
    minWidth: '100',
    thresholdValue: '',
    // 可以在表格-自定义显示数据
    // columnType: 'slot',
    // filterBoxType: 'input', 存在filterBoxType 证明可以过滤
    checked: true
  },
  {
    prop: 'inspectQuantity',
    label: '物料送检数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'samplingQuantity',
    label: '物料抽样数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'defectQuantity',
    label: '检验缺陷数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'defectRateName',
    label: '缺陷发生率',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'operate',
    label: '操作',
    minWidth: '45',
    columnType: 'slot',
    fixed: 'right',
    checked: true
  }
]

// 按缺陷
const COLUMNS_CONFIG_DEFECT = [
  {
    prop: 'inspectTypeName',
    label: '检验类型',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'materialCode',
    label: '物料编码',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'materialName',
    label: '物料名称',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'defectCode',
    label: '缺陷编号',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'defectName',
    label: '缺陷名称',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'checklistQuantity',
    label: '送检单数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'inspectQuantity',
    label: '物料送检数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'samplingQuantity',
    label: '物料抽样数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'defectQuantity',
    label: '检验缺陷数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'defectRateName',
    label: '缺陷发生率',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'operate',
    label: '操作',
    minWidth: '45',
    columnType: 'slot',
    fixed: 'right',
    checked: true
  }
]

// 按缺陷原因
const COLUMNS_CONFIG_DEFECT_REASON = [
  {
    prop: 'inspectTypeName',
    label: '检验类型',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'materialCode',
    label: '物料编码',
    minWidth: '100',
    thresholdValue: '',
    // filterBoxType: 'input', 存在filterBoxType 证明可以过滤
    checked: true
  },
  {
    prop: 'materialName',
    label: '物料名称',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'defectCode',
    label: '缺陷编号',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'defectName',
    label: '缺陷名称',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'defectReasonCode',
    label: '缺陷原因编号',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'defectReasonName',
    label: '缺陷原因名称',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'checklistQuantity',
    label: '送检单数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'inspectQuantity',
    label: '物料送检数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'samplingQuantity',
    label: '物料抽样数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'defectQuantity',
    label: '检验缺陷数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'defectRateName',
    label: '缺陷发生率',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'operate',
    label: '操作',
    minWidth: '45',
    columnType: 'slot',
    fixed: 'right',
    checked: true
  }
]

// 按供应商
const COLUMNS_CONFIG_SUPPLIER = [
  {
    prop: 'supplierCode',
    label: '供应商',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'materialCode',
    label: '物料编码',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'materialName',
    label: '物料名称',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  {
    prop: 'checklistQuantity',
    label: '检验单数',
    minWidth: '200',
    thresholdValue: '',
    checked: true // 默认为勾选状态
  },
  // {
  //   prop: 'qualifiedChecklistQuantity',
  //   label: '合格单数',
  //   minWidth: '200',
  //   thresholdValue: '',
  //   checked: true // 默认为勾选状态
  // },
  // {
  //   prop: 'checklistQualifiedRateName',
  //   label: '检验单合格率',
  //   minWidth: '100',
  //   thresholdValue: '',
  //   checked: true
  // },
  {
    prop: 'batchQuantity',
    label: '检验批次数',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'qualifiedBatchQuantity',
    label: '合格批次数',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'batchQualifiedRateName',
    label: '批次合格率',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'inspectQuantity',
    label: '检验数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'qualifiedQuantity',
    label: '合格数量',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'materialQualifiedRateName',
    label: '物料合格率',
    minWidth: '100',
    thresholdValue: '',
    checked: true
  },
  {
    prop: 'operate',
    label: '操作',
    minWidth: '45',
    columnType: 'slot',
    fixed: 'right',
    checked: true
  }
]

export {
  COLUMNS_CONFIG_TYPE,
  COLUMNS_CONFIG_DEFECT,
  COLUMNS_CONFIG_DEFECT_REASON,
  COLUMNS_CONFIG_SUPPLIER
}
