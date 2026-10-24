/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-05-31 19:19:59
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-26 10:09:05
 * @FilePath: \yelink-qms\src\views\quality_management\samplingProgram\constant.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { v4 as uuidv4 } from 'uuid'
const TABLE = [
  {
    id: uuidv4(),
    label: '缺陷类型编码',
    code: 'code',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    id: uuidv4(),
    label: '缺陷类型名称',
    code: 'name',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true,
  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
    // isSort: true
  },
  {
    id: uuidv4(),
    label: '更新人',
    code: 'updateByName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '更新时间',
    code: 'updateTime',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]
const SEARCH_LIST = [
  { name: 'code', type: 'input', queryName: 'code' },
  { name: 'name', type: 'input', queryName: 'name' }
]

export { TABLE, SEARCH_LIST }
