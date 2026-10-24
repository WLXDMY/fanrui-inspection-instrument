/*
 * @Author: shunhua.liang
 * @Date: 2022-11-28 10:45:30
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-12-02 09:26:32
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid'

const COLUMN_LIST = [
  {
    id: uuidv4,
    label: '结果名称',
    code: 'type',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '状态',
    code: 'stateName',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '结果描述',
    code: 'description',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建人',
    code: 'createByName',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '修改人',
    code: 'updateByName',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '修改时间',
    code: 'updateTime',
    width: null,
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  }
]

const SEARCH = [
  { name: 'type', type: 'input' } // 结果名称
  // { name: 'state', type: 'filter' }, // 状态
  // { name: 'createBy', type: 'input' }, // 创建人
  // { name: 'createTime', type: 'timeline', queryTip: ['createStartTime', 'createEndTime'] }, // 创建时间
  // { name: 'update', type: 'input' } // 修改人
  // { name: 'updateTime', type: 'timeline', queryTip: ['updateStartTime', 'updateEndTime'] } // 修改时间
]

export { COLUMN_LIST, SEARCH }
