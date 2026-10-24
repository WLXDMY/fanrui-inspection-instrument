import { v4 as uuidv4 } from 'uuid'

const LIST = [
  {
    id: uuidv4(),
    label: '库房名称',
    code: 'warehouseName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '库房类型',
    code: 'warehouseTypeName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '库位编号',
    code: 'stockLocationNum',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '物料编码',
    code: 'code',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  // {
  //   id: uuidv4(),
  //   label: '物料类型',
  //   code: 'productType',
  //   width: null,
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
  //   class: '' // 这个属性决定是否允许拖动
  // },
  {
    id: uuidv4,
    label: '物料名称',
    code: 'name',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '物料类型',
    code: 'typeName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  // {
  //   id: uuidv4,
  //   label: '物料规格',
  //   code: 'standard',
  //   width: null,
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
  //   class: '' // 这个属性决定是否允许拖动
  // },
  {
    id: uuidv4,
    label: '库存数量',
    code: 'stockLocationQuantity',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '单位',
    code: 'comp',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '备注',
    code: 'remarks',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  }
]

export { LIST }
