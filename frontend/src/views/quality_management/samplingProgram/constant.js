/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-05-31 19:19:59
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-06-19 17:18:11
 * @FilePath: \yelink-qms\src\views\quality_management\samplingProgram\constant.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { v4 as uuidv4 } from 'uuid'
const CHECK_STANDARDS_TABLE = [
  {
    id: uuidv4(),
    label: '抽样方案编码',
    // qualityInspectionSchemeTemplateName
    code: 'code',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    id: uuidv4(),
    label: '抽样方案名称',
    // qualityInspectionSchemeTemplateName
    code: 'name',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    id: uuidv4(),
    label: '状态',
    // qualityInspectionSchemeTemplateName
    code: 'statusName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true,
    special: true
  },
  {
    id: uuidv4(),
    label: '抽样类型',
    // qualityInspectionSchemeTemplateName
    code: 'typeName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    id: uuidv4(),
    label: '检验水平',
    code: 'inspectLevelName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '严格度',
    code: 'stringencyName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: 'AQL',
    code: 'aqlValue',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '生效日期',
    code: 'effectiveTime',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '失效日期',
    code: 'failureTime',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '审批状态',
    // qualityInspectionSchemeTemplateName
    code: 'approvalStatusName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '审批人',
    // qualityInspectionSchemeTemplateName
    code: 'approverName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]
const SEARCH_LIST = [
  { name: 'name', type: 'input', queryName: 'name' },
  { name: 'statusName', type: 'filter', queryName: 'statues' }
]

export { CHECK_STANDARDS_TABLE, SEARCH_LIST }
