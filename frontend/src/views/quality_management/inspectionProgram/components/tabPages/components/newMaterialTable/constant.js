const LIST = [
  {
    prop: 'name',
    label: '检验项目',
    checked: true
  },
  {
    prop: 'groupName',
    label: '检验项目组',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'analyzeMethodName',
    label: '分析方法',
    // minWidth: '200',
    checked: true
  },
  {
    prop: 'samplePlanId',
    label: '抽样方案',
    minWidth: '150',
    columnType: 'slot',
    // fixed: 'right',
    checked: true
  },
  {
    prop: 'inspectLevelName',
    label: '检验水平',
    // minWidth: '200',
    checked: true
  },
  {
    prop: 'stringencyName',
    label: '严格度',
    // minWidth: '200',
    checked: true
  },
  {
    prop: 'aqlValue',
    label: 'AQL',
    // minWidth: '200',
    checked: true
  },
  {
    prop: 'defaultQualified',
    label: '默认合格',
    type: 'select',
    // minWidth: '80',
    columnType: 'slot', // 检验方案带出
    checked: true
  },
  {
    prop: 'recordInspectionValue',
    label: '记录样本检验值',
    type: 'select',
    minWidth: '110',
    columnType: 'slot', // 检验方案带出
    checked: true
  },
  {
    prop: 'importantInspection',
    label: '重点检查',
    type: 'select',
    // minWidth: '80',
    columnType: 'slot', // 检验方案带出
    checked: true
  },
  // {
  //   prop: 'required',
  //   label: '是否必检',
  //   type: 'select',
  //   // minWidth: '80',
  //   columnType: 'slot', // 检验方案带出
  //   checked: true
  // },
  // {
  //   prop: 'defectLevel',
  //   label: '缺陷等级',
  //   // minWidth: '80',
  //   columnType: 'slot', // 检验方案带出
  //   checked: true
  // },
  {
    prop: 'minQuality',
    label: '最少样本数',
    type: 'input',
    minWidth: '110',
    columnType: 'slot', // 检验方案带出
    checked: true
  }

  // {
  //   prop: 'operate',
  //   label: '操作',
  //   // minWidth: '60',
  //   columnType: 'slot',
  //   // fixed: 'right',
  //   checked: true
  // }
]

export { LIST }
