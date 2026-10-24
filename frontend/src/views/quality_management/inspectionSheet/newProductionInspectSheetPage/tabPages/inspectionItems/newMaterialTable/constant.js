/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-11 14:16:54
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-07 15:00:06
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\inspectionItems\newMaterialTable\constant.js
 * @Description: 检验样次表格列
 */
const LIST = [
  {
    prop: 'itemGroupName',
    code: 'itemGroupName',
    label: '检验项目组',
    name: '检验项目组',
    minWidth: '100',
    width: '100',
    checked: true
  },
  {
    prop: 'itemName',
    code: 'itemName',
    name: '检验项目',
    label: '检验项目',
    type: 'input',
    minWidth: '110',
    width: '100',
    columnType: 'slot', // 检验方案带出
    checked: true
  },
  {
    prop: 'verificationBasis',
    code: 'verificationBasis',
    name: '检验标准',
    label: '检验标准',
    minWidth: '150',
    width: '150',
    checked: true
  },
  {
    prop: 'analyzeMethodName',
    code: 'analyzeMethodName',
    name: '分析方法',
    label: '分析方法',
    // minWidth: '200',
    width: '120',
    checked: true
  },
  {
    prop: 'actualQuality',
    code: 'actualQuality',
    name: '实际样本数',
    label: '实际样本数',
    type: 'input',
    minWidth: '120',
    width: '120',
    columnType: 'slot', // 检验方案带出
    checked: true
  },
  {
    prop: 'checkResult',
    code: 'checkResult',
    name: '检测值',
    label: '检测值',
    minWidth: '150',
    width: '150',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'checkResult2',
    code: 'checkResult2',
    name: '样本检测值',
    label: '样本检测值',
    minWidth: '150',
    width: '150',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'singleConclusion',
    code: 'singleConclusion',
    name: '检验项目判定',
    label: '检验项目判定',
    minWidth: '120',
    width: '120',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'verificationInstrument',
    code: 'verificationInstrument',
    label: '检验仪器',
    name: '检验仪器',
    minWidth: '100',
    width: '100',
    checked: true
  },
  {
    prop: 'verificationMethod',
    code: 'verificationMethod',
    label: '检验方法',
    name: '检验方法',
    minWidth: '100',
    width: '100',
    checked: true
  },
  {
    prop: 'inspectionCondition',
    code: 'inspectionCondition',
    label: '检验条件',
    name: '检验条件',
    minWidth: '100',
    width: '100',
    checked: true
  },
  {
    prop: 'unit',
    code: 'unit',
    label: '单位',
    name: '单位',
    minWidth: '100',
    width: '100',
    checked: true
  },
  {
    prop: 'referenceValue',
    code: 'referenceValue',
    label: '参考值',
    name: '参考值',
    minWidth: '120',
    width: '120',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'comparator',
    code: 'comparator',
    label: '比较符',
    name: '比较符',
    minWidth: '130',
    width: '130',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'upperLimitValue',
    code: 'upperLimitValue',
    label: '上限值',
    name: '上限值',
    minWidth: '100',
    width: '100',
    checked: true
  },
  {
    prop: 'downLimitValue',
    code: 'downLimitValue',
    label: '下限值',
    name: '下限值',
    width: '100',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'upperTolerance',
    code: 'upperTolerance',
    label: '上公差',
    name: '上公差',
    width: '100',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'lowerTolerance',
    code: 'lowerTolerance',
    label: '下公差',
    name: '下公差',
    width: '100',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'samplePlanName',
    code: 'samplePlanName',
    label: '抽样方案',
    name: '抽样方案',
    width: '100',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'sampleType',
    code: 'sampleType',
    label: '抽样类型',
    name: '抽样类型',
    width: '130',
    minWidth: '130',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'inspectLevel',
    code: 'inspectLevel',
    label: '检验水平',
    name: '检验水平',
    width: '130',
    minWidth: '130',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'stringency',
    code: 'stringency',
    label: '严格度',
    name: '严格度',
    width: '130',
    minWidth: '130',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'aqlValue',
    code: 'aqlValue',
    label: 'AQL',
    name: 'AQL',
    width: '130',
    minWidth: '130',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'acceptValue',
    code: 'acceptValue',
    label: '允收数',
    name: '允收数',
    width: '100',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'refuseValue',
    code: 'refuseValue',
    label: '拒收数',
    name: '拒收数',
    width: '100',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'samplingQuantity',
    code: 'samplingQuantity',
    label: '抽样数量',
    name: '抽样数量',
    width: '100',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'unqualifiedQuantity',
    code: 'unqualifiedQuantity',
    name: '样本不合格数',
    label: '样本不合格数',
    type: 'input',
    width: '120',
    minWidth: '120',
    columnType: 'slot', // 检验方案带出
    checked: true
  }
]

export { LIST }
