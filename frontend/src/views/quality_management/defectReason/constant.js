/*
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-07-29 10:23:12
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-07-29 16:09:46
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid'
// 首页 表格
export const COLUMNS_CONFIG = [
  {
    id: uuidv4(),
    label: '缺陷原因编码',
    code: 'reasonCode',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '缺陷原因名称',
    code: 'reasonName',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'status',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    special: true
  },
  {
    id: uuidv4(),
    label: '更新人',
    code: 'updateByName',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '更新时间',
    code: 'updateTime',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByName',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: '',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    isSort: true
  }
]

export const TABLE_SEARCH = [
  { name: 'reasonCode', type: 'input' },
  { name: 'reasonName', type: 'input' },
  { name: 'status', type: 'filter', queryName: 'statues' }
]
