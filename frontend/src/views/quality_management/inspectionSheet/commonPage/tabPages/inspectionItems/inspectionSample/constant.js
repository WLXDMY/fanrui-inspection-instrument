/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-11 14:16:54
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-08-01 10:40:32
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\inspectionItems\newMaterialTable\constant.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const LIST = [
  {
    prop: 'productCodes',
    label: '抽样物料单品码',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'defectName',
    label: '缺陷名称',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectNum',
    label: '缺陷数量',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'defectLevel',
    label: '缺陷等级',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'defectReasonCode',
    label: '缺陷原因',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'defectResultCode',
    label: '缺陷后果',
    columnType: 'slot',
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
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'remark',
    label: '缺陷记录备注',
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
    prop: 'productCodes',
    label: '缺陷单品码',
    checked: true
  },
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
    prop: 'defectNum',
    label: '缺陷数量',
    checked: true
  },
  {
    prop: 'defectLevel',
    label: '缺陷等级',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'defectReasonCode',
    label: '缺陷原因',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'defectResultCode',
    label: '缺陷后果',
    columnType: 'slot',
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
    label: '缺陷记录备注',
    checked: true
  }
]
