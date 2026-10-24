/*
 * @Author: shunhua.liang
 * @Date: 2022-05-10 14:16:24
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-08-15 10:40:15
 * @Description: 生产设备
 */
import { v4 as uuidv4 } from 'uuid'

const DEVICE = [
  {
    id: uuidv4,
    label: '设备名称',
    code: 'deviceName',
    width: null,
    minWidth: '180',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备编号',
    code: 'deviceCode',
    width: null,
    minWidth: '180',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备类型',
    code: 'typeName',
    width: null,
    minWidth: '180',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备位置',
    code: 'place',
    width: null,
    minWidth: '180',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备分类',
    code: 'modelName',
    width: null,
    minWidth: '180',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
    width: null,
    minWidth: '150',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  }
]

export { DEVICE }
