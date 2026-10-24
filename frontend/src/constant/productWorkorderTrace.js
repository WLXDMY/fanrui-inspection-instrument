/*
 * @Author: shunhua.liang
 * @Date: 2022-05-10 11:18:31
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-03-03 14:19:17
 * @Description: 生产工单
 */

import { v4 as uuidv4 } from 'uuid'

const WORK_ORDER = [
  {
    id: uuidv4,
    label: '工单成品码',
    code: 'barcode',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: 'expand',
    special: true,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '投入工位',
    code: 'inputFname',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '投入时间',
    code: 'inputTime',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },

  {
    id: uuidv4,
    label: '产出工位',
    code: 'produceFname',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },

  {
    id: uuidv4,
    label: '产出时间',
    code: 'produceTime',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  }

]

const LIST = [
  { name: 'barcode', type: 'input' } //

]
export { WORK_ORDER, LIST }
