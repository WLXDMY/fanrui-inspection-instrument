import { v4 as uuidv4 } from 'uuid'

const REPLACE_SCHEME = [
  {
    id: uuidv4,
    label: '替代方案编号',
    code: 'schemeCode',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '方案名称',
    code: 'schemeName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '替代策略',
    code: 'replaceStrategyName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '主物料',
    code: 'name',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: 'left',
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields'
  },
  {
    id: uuidv4,
    label: '主物料编码',
    code: 'code',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: 'left',
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields'
  },
  {
    id: uuidv4,
    label: '物料类型',
    code: 'typeName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: 'left',
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields'
  },

  {
    id: uuidv4,
    label: '物料分类',
    code: 'sortName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields'
  },
  {
    id: uuidv4,
    label: '单位',
    code: 'comp',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields'
  },
  {
    id: uuidv4,
    label: '关联替代物料个数',
    code: 'replaceMaterialRelatedCount',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '方案创建人',
    code: 'createByNickname',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '方案创建时间',
    code: 'createTime',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '状态',
    code: 'stateName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '审批状态',
    code: 'approvalStatusName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },

  {
    id: uuidv4,
    label: '审批人',
    code: 'approverName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '实际审批人',
    code: 'actualApproverName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '修改时间',
    code: 'updateTime',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

export { REPLACE_SCHEME }
