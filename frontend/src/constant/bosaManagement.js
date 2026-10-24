/*
 * @Author: shunhua.liang
 * @Date: 2022-05-10 11:18:31
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-05-24 14:03:18
 * @Description: 生产工单
 */

import { v4 as uuidv4 } from 'uuid'

const WORK_ORDER = [
  {
    id: uuidv4,
    label: '工单编号',
    code: 'workOrderNumber',
    width: '',
    minWidth: '200',
    showOverflowTooltip: false,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  // {
  //   id: uuidv4,
  //   label: '使用状态',
  //   code: 'statusName',
  //   width: '150',
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnBoolean: true,
  //   columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
  //   class: '' // 这个属性决定是否允许拖动
  // },
  {
    id: uuidv4,
    label: '是否按单生产',
    code: 'isOrderProductionName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnBoolean: true,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },

  //   {
  //     id: uuidv4,
  //     label: '导入状态',
  //     code: '3',
  //     width: '100',
  //     minWidth: null,
  //     showOverflowTooltip: false,
  //     type: null,
  //     fixed: null,
  //     columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
  //     class: '' // 这个属性决定是否允许拖动
  //   },

  //   {
  //     id: uuidv4,
  //     label: '导入人',
  //     code: '4',
  //     width: '150',
  //     minWidth: null,
  //     showOverflowTooltip: false,
  //     type: null,
  //     fixed: null,
  //     columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
  //     class: '' // 这个属性决定是否允许拖动
  //   },

  //   {
  //     id: uuidv4,
  //     label: '导入时间',
  //     code: '5',
  //     width: '200',
  //     minWidth: null,
  //     showOverflowTooltip: false,
  //     type: null,
  //     fixed: null,
  //     columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
  //     class: '' // 这个属性决定是否允许拖动
  //   },
  {
    id: uuidv4,
    label: '物料编码',
    code: 'materialCode',
    width: '',
    minWidth: '200',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '物料名称',
    code: 'materialName',
    width: '',
    minWidth: '200',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '物料规格',
    code: 'materialStandard',
    width: '',
    minWidth: '200',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '工单计划生产数量',
    code: 'workOrderPlanNum',
    width: '',
    minWidth: '200',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  }

]

const LIST = [
  { name: 'workOrderNumber', type: 'input' }, // 工单编号
  { name: 'statusName', type: 'filter', queryName: 'status' }, // 状态
  //   { name: '3', type: 'filter', queryName: '3' }, //
  //   { name: '4', type: 'filter', queryName: '4' }, //
  //   {   name: '5',  type: 'timeline', queryTip: ['planStartTime', 'planEndTime']},

  { name: 'materialCode', type: 'input' }
  //   { name: '7', type: 'input' }

]
export { WORK_ORDER, LIST }
