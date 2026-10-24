import { v4 as uuidv4 } from 'uuid'

const PACKAGE = [
  {
    id: uuidv4,
    label: '方案编码',
    code: 'schemeCode',
    width: '170',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '方案名称',
    code: 'schemeName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
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
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '包装层级',
    code: 'packageLevel',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建人',
    code: 'createByName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '修改人',
    code: 'updateByName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '修改时间',
    code: 'updateTime',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  }

]

const SEARCHLIST = [
  { name: 'schemeCode', type: 'input' }, // 包装方案编码
  { name: 'schemeName', type: 'input' }, // 包装方案名称
  { name: 'createByName', type: 'input' }, // 创建人
  { name: 'updateByName', type: 'input' }, // 更新人
  { name: 'stateName', type: 'filter', queryName: 'states' }, // 状态
  { name: 'createTime', type: 'timeline', queryTip: ['createTimeStart', 'createTimeEnd'] },
  { name: 'updateTime', type: 'timeline', queryTip: ['updateTimeStart', 'updateTimeEnd'] }
]

export { PACKAGE, SEARCHLIST }
