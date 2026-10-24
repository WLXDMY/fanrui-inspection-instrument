import { v4 as uuidv4 } from 'uuid'

const TABLE_LIST = [
  {
    id: uuidv4(),
    label: '方案名称',
    code: 'prenatalExaminationPlanName',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '适配产线',
    code: 'productLine',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '备注',
    code: 'remark',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '检验人',
    code: 'inspectorName',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '检验时间',
    code: 'inspectionTime',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '检验结果',
    code: 'inspectionResult',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '',
    special: true
  },
  {
    id: uuidv4(),
    label: '复检时间',
    code: 'reviewTime',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '复检人',
    code: 'reviewByName',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '复检结果',
    code: 'reviewResult',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '',
    special: true
  }
]

export { TABLE_LIST }
