/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-11 14:16:54
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-11 11:34:26
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\inspectionItems\newMaterialTable\constant.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const LIST = [

  {
    prop: 'defectName',
    code: 'defectName',
    name: '缺陷名称',
    label: '缺陷名称',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectTypeName',
    code: 'defectTypeName',
    name: '缺陷类型',
    label: '缺陷类型',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectNum',
    code: 'defectNum',
    name: '缺陷样本数',
    label: '缺陷样本数',
    columnType: 'slot',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'productCodes',
    code: 'productCodes',
    name: '样本码',
    label: '样本码',
    columnType: 'slot',
    minWidth: '150',
    checked: true
  },
  {
    prop: 'defectLevel',
    code: 'defectLevel',
    name: '缺陷等级',
    label: '缺陷等级',
    columnType: 'slot',
    minWidth: '150',
    checked: true
  },
  {
    prop: 'defectReasonCode',
    code: 'defectReasonCode',
    name: '缺陷原因',
    label: '缺陷原因',
    columnType: 'slot',
    minWidth: '150',
    checked: true
  },
  {
    prop: 'defectResultCode',
    code: 'defectResultCode',
    name: '缺陷后果',
    label: '缺陷后果',
    columnType: 'slot',
    minWidth: '150',
    checked: true
  },
  {
    prop: 'researchReviewFlag',
    code: 'researchReviewFlag',
    name: '缺陷分析',
    label: '缺陷分析',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'correctiveMeasure',
    code: 'correctiveMeasure',
    name: '纠错措施',
    label: '纠错措施',
    columnType: 'slot',
    minWidth: '150',
    checked: true
  },
  {
    prop: 'remark',
    code: 'remark',
    name: '缺陷备注',
    label: '缺陷备注',
    minWidth: '150',
    // label: '缺陷记录备注',
    columnType: 'slot',
    checked: true
  }
]

export const DefectColumn = [
  {
    type: 'selection',
    prop: 'index',
    minWidth: '55',
    checked: true
  },
  {
    label: '缺陷名称',
    prop: 'name',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    filterBoxType: 'input'
  },
  {
    label: '缺陷类型',
    prop: 'defectTypeName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    filterBoxType: 'input',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    label: '缺陷编码',
    prop: 'code',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    label: '备注',
    prop: 'remark',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

export const DefectRecordColums = [
  {
    prop: 'itemName',
    label: '检验项目',
    checked: true
  },
  {
    prop: 'defectName',
    label: '缺陷名称',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectTypeName',
    label: '缺陷类型',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectNum',
    label: '缺陷样本数',
    checked: true
  },
  {
    prop: 'productCodes',
    label: '样本码',
    checked: true
  },
  {
    prop: 'defectLevel',
    label: '缺陷等级',
    columnType: 'slot',
    minWidth: '125',
    checked: true
  },
  {
    prop: 'defectReasonCode',
    label: '缺陷原因',
    columnType: 'slot',
    minWidth: '125',
    checked: true
  },
  {
    prop: 'defectResultCode',
    label: '缺陷后果',
    columnType: 'slot',
    minWidth: '125',
    checked: true
  },
  {
    prop: 'researchReviewFlag',
    label: '缺陷分析',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'correctiveMeasure',
    label: '纠错措施',
    checked: true
  },
  {
    prop: 'remark',
    label: '缺陷备注',
    // label: '缺陷记录备注',
    checked: true
  }
]
