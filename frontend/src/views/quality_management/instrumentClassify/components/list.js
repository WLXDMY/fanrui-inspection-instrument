/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-05-28 11:17:10
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-24 15:50:29
 * @FilePath: \yelink-qms\src\constant\productionInspectionItemGroupList.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { v4 as uuidv4 } from 'uuid'

const TABLE_LIST = [
  {
    id: uuidv4(),
    label: '仪器分类编码',
    code: 'instrumentCategoryCode',
    width: '',
    minWidth: '150',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '仪器分类名称',
    code: 'instrumentCategoryName',
    width: '',
    minWidth: '150',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByName',
    width: '',
    minWidth: '150',
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
    width: '',
    minWidth: '150',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '修改人',
    code: 'updateByName',
    width: '',
    minWidth: '150',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '修改时间',
    code: 'updateTime',
    width: '',
    minWidth: '150',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  }
]

const SEARCH_LIST = [
  { name: 'instrumentCategoryName', type: 'input' },
  { name: 'instrumentCategoryCode', type: 'input' }
]

export { TABLE_LIST, SEARCH_LIST }
