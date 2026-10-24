import { v4 as uuidv4 } from 'uuid'

const TABLE_LIST = [
  {
    id: uuidv4(),
    label: '生产领料申请单号',
    code: 'applicationNum',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '工单号',
    code: 'workOrderNumber',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'stateName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '审批状态',
    code: 'approvalStatusName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '工单名称',
    code: 'workOrderName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '特征参数',
    code: 'auxiliaryAttr',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '计划领料时间',
    code: 'planPickingTime',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '实际领料时间',
    code: 'actualPickingTime',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '审批人',
    code: 'approverName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  }
]

export { TABLE_LIST }
