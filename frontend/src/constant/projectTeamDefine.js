/*
 * @Author: youjuan.hu
 * @Date: 2023-05-06 15:15:07
 * @LastEditors: youjuan.hu
 * @LastEditTime: 2023-05-06 15:34:17
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid'

const PROJECT_TEAM_DEFINE = [
  {
    id: uuidv4,
    label: '检验项目组名称',
    code: 'inspectionItemGroupName',
    width: '270',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '创建人',
    code: 'createByName',
    width: '270',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
    width: '270',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '修改人',
    code: 'updateByName',
    width: '270',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '修改时间',
    code: 'updateTime',
    width: '270',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

const PROJECT_TEAM_DEFINE_LIST = [
//   {
//     name: 'inspectionItemGroupName',
//     type: 'filter',
//     queryName: 'inspectionItemGroupName'
//   }, // 检验项目组
//   { name: 'inspectionItemName', type: 'input' }, // 检验项目
//   { name: 'approveStatusName', type: 'filter', queryName: 'approveStatus' } // 审批状态
]

export { PROJECT_TEAM_DEFINE, PROJECT_TEAM_DEFINE_LIST }
