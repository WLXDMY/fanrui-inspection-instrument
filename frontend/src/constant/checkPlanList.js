/*
 * @Author: zhaozhuo
 * @Date: 2022-09-19 17:48:16
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-20 14:26:49
 * @Description: ...
 */
import { v4 as uuidv4 } from 'uuid'

// 按物料
const CHECK_MATERIAL_TABLE = [
  {
    id: uuidv4(),
    label: '检验方案编码',
    code: 'schemeCode',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '检验方案名称',
    code: 'schemeName',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'statusName',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    special: true
  },
  {
    id: uuidv4(),
    label: '检验类型',
    code: 'inspectionTypes',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'slot', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true,
    parentFields: 'schemeRelateTypeEntities', // 显示字段的外层属性
    special: true
  },
  {
    id: uuidv4(),
    label: '物料名称',
    code: 'materialName',
    // code: 'name',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '物料编码',
    code: 'materialCode',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '物料规格',
    code: 'materialStandard',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '物料图号',
    code: 'materialDrawingNumber',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '物料类型',
    code: 'materialTypeName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '抽样方案',
    code: 'samplePlanName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '检验水平',
    code: 'inspectLevelName',
    width: '100',
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
    width: '100',
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
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '关联客户',
    code: 'relateCustomerName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '关联工序',
    code: 'relateProcedureName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '更新人',
    code: 'updateByName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '更新时间',
    code: 'updateTime',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

// 按检验方案
const CHECK_PLAN_TABLE = [
  {
    id: uuidv4(),
    label: '检验方案编码',
    code: 'schemeCode',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '检验方案名称',
    code: 'schemeName',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '抽样方案',
    code: 'samplePlanName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
    // parentFields: 'samplePlanEntity' // 显示字段的外层属性
  },
  {
    id: uuidv4(),
    label: '检验水平',
    code: 'inspectLevelName',
    width: '100',
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
    width: '100',
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
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'statusName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    special: true
  },
  {
    id: uuidv4(),
    label: '是否通用方案',
    code: 'generalMaterialName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '关联客户',
    code: 'relateCustomerName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '关联工序',
    code: 'relateProcedureName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '关联物料类型',
    code: 'relateMaterialTypeName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '审批状态',
    code: 'approvalStatusName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '审批人',
    code: 'approverName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '更新人',
    code: 'updateByName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '更新时间',
    code: 'updateTime',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

// 按检验项目
const CHECK_ITEM_TABLE = [
  {
    id: uuidv4(),
    label: '检验方案编码',
    code: 'schemeCode',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '检验方案名称',
    code: 'schemeName',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '抽样方案',
    code: 'samplePlanName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
    // parentFields: 'samplePlanEntity' // 显示字段的外层属性
  },
  {
    id: uuidv4(),
    label: '检验类型',
    code: 'inspectionTypes',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'slot', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true,
    parentFields: 'schemeRelateTypeEntities', // 显示字段的外层属性
    special: true
  },
  {
    id: uuidv4(),
    label: '检验水平',
    code: 'inspectLevelName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // parentFields: 'schemeItemEntity',
    // special: true
  },
  {
    id: uuidv4(),
    label: '严格度',
    code: 'stringencyName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // parentFields: 'schemeItemEntity',
    // special: true
  },
  {
    id: uuidv4(),
    label: 'AQL',
    code: 'aqlValue',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // parentFields: 'schemeItemEntity'
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'statusName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    special: true
  },
  {
    id: uuidv4(),
    label: '审批状态',
    code: 'approvalStatusName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '检验项目',
    code: 'itemName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'schemeItemEntity'
  },
  {
    id: uuidv4(),
    label: '分析方法',
    code: 'analyzeMethodName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'schemeItemEntity'
  },
  {
    id: uuidv4(),
    label: '重点检查',
    code: 'importantInspection',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'schemeItemEntity',
    special: true
  },
  {
    id: uuidv4(),
    label: '标准值/参考值',
    code: 'itemReferenceValue',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // recordInspectionValue 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'schemeItemEntity'
  }
]

export { CHECK_MATERIAL_TABLE, CHECK_PLAN_TABLE, CHECK_ITEM_TABLE }
