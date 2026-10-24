/*
 * @Author: shunhua.liang
 * @Date: 2022-11-15 19:39:37
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-21 16:15:12
 * @Description:
 */
/**
 * 库存盘点
 */
import { v4 as uuidv4 } from 'uuid'

const INVENTORY_TABLE = [
  {
    id: uuidv4(),
    label: '所属库房',
    code: 'warehouseName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '物料名称',
    code: 'name',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
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
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '操作人',
    code: 'checkBy',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '库存盘点时间',
    code: 'checkTime',
    width: '180',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  }
]

export { INVENTORY_TABLE }
