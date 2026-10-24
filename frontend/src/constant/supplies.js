import { v4 as uuidv4 } from 'uuid'

const SUPPLIES = [
  {
    id: uuidv4,
    label: '物料编码',
    code: 'code',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
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
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields'
  },
  {
    id: uuidv4,
    label: '物料名称',
    code: 'name',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
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
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
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
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields'
  },
  {
    id: uuidv4,
    label: '物料创建人',
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
    label: '编制人',
    code: 'editorName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '物料创建时间',
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
    parentFields: 'materialFields'
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
    parentFields: 'materialFields'
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
  },
  {
    id: uuidv4,
    label: '版本',
    code: 'version',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields'
  },
  {
    id: uuidv4,
    label: '物料等级',
    code: 'level',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields'
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
    parentFields: 'materialFields'
  },
  {
    id: uuidv4,
    label: '是否辅料',
    code: 'isAuxiliaryMaterial',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    columnBoolean: true,
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '特征参数',
    code: 'haveAuxiliaryAttr',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    columnBoolean: true,
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '按批次管理',
    code: 'isBatchMag',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    columnBoolean: true,
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '按单品管理',
    code: 'isSupportCodeManage',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    columnBoolean: true,
    parentFields: ''
  }
]

export { SUPPLIES }
