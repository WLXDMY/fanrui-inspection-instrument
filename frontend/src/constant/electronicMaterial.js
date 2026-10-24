/*
 * @Author: shunhua.liang
 * @Date: 2022-05-09 14:01:26
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-07 17:23:58
 * @Description: 销售订单常量
 */

// 物料规格(standard) 、备注(remark)、 图号(drawingNumber) 、 物料单价(materialPrice) 、损耗率(loseRate) 、材质(rawMaterial)

import { v4 as uuidv4 } from 'uuid'

const ELECTRONIC = [
  {
    id: uuidv4(),
    label: '电子料架编号',
    code: 'saleOrderNumber',
    width: '165',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '电子料架名称',
    code: 'state',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '货架编号',
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
    label: '货架名称',
    code: 'salesmanName',
    width: '90',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '库位灯编号',
    code: 'customerName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '库位灯名称',
    code: 'code',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '库位编号',
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
    label: '库位名称',
    code: 'salesQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '备注',
    code: 'totalPrice',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  }
]

export {
  ELECTRONIC

}
