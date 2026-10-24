/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-11 14:16:54
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-08-29 16:14:36
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\inspectionItems\newMaterialTable\constant.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const LIST = [
  {
    prop: 'itemName',
    label: '检验项目',
    checked: true
  },
  {
    prop: 'itemGroupName',
    label: '检验项目组',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'checkResult',
    label: '检查结果',
    minWidth: '150',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'singleConclusion',
    label: '单项结论',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'reviewResult',
    label: '复核结果',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'reviewConclusion',
    label: '复核结论',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'authorizeResult',
    label: '核准结果',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'authorizeConclusion',
    label: '核准结论',
    columnType: 'slot',
    checked: true
  },
  {
    prop: 'analyzeMethodName',
    label: '分析方法',
    // minWidth: '200',
    checked: true
  },
  {
    prop: 'importantInspection',
    label: '重点检查',
    type: 'select',
    // minWidth: '100',
    columnType: 'slot', // 检验方案带出
    checked: true
  },
  {
    prop: 'required',
    label: '是否必填',
    type: 'select',
    // minWidth: '100',
    columnType: 'slot', // 检验方案带出
    checked: true
  },
  // {
  //   prop: 'inspectionSwicth',
  //   label: '是否检验该项',
  //   type: 'select',
  //   // minWidth: '100',
  //   columnType: 'slot',
  //   checked: true
  // },
  {
    prop: 'defectLevel',
    label: '缺陷等级',
    minWidth: '100',
    columnType: 'slot', // 检验方案带出
    checked: true
  },
  {
    prop: 'recordInspectionValue',
    label: '启用样本检验值',
    type: 'select',
    minWidth: '120',
    columnType: 'slot', // 检验方案带出
    checked: true
  },
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
