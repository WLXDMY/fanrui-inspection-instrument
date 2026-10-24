/*
 * @Author: shunhua.liang
 * @Date: 2022-05-09 14:01:26
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-03-07 14:38:07
 * @Description: 销售订单常量
 */

// 物料规格(standard) 、备注(remark)、 图号(drawingNumber) 、 物料单价(materialPrice) 、损耗率(loseRate) 、材质(rawMaterial)

import { v4 as uuidv4 } from 'uuid'

const PRODUCT_MATERIAL = [
  {
    id: uuidv4(),
    label: '生产订单用料清单号',
    code: 'materialListCode',
    width: '165',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '生产订单编号',
    code: 'relateNumber',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '计划数量',
    code: 'planQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '实际数量',
    code: 'actualQuantity',
    width: '90',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '审批状态',
    code: 'approvalStatusName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '用料清单状态',
    code: 'state',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '物料名称',
    code: 'name',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '物料编码',
    code: 'code',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '物料单位',
    code: 'comp',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '子类类型',
    code: 'subType',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '特征参数',
    code: 'auxiliaryAttr',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByName',
    width: '',
    minWidth: '140',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

const PRODUCT_ORDER = [
  {
    id: uuidv4(),
    label: '生产订单用料清单号',
    code: 'materialListCode',
    width: '165',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '生产订单编号',
    code: 'relateNumber',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  // {
  //   id: uuidv4(),
  //   label: '计划数量',
  //   code: 'planQuantity',
  //   width: '100',
  //   minWidth: null,
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  // },
  // {
  //   id: uuidv4(),
  //   label: '实际数量',
  //   code: 'actualQuantity',
  //   width: '90',
  //   minWidth: null,
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  // },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByName',
    width: '',
    minWidth: '140',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: '',
    minWidth: '140',
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '用料清单状态',
    code: 'state',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

export { PRODUCT_MATERIAL, PRODUCT_ORDER }
