/*
 * @Author: shunhua.liang
 * @Date: 2022-05-09 14:01:26
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-10 10:21:44
 * @Description: 销售订单常量
 */

// 物料规格(standard) 、备注(remark)、 图号(drawingNumber) 、 物料单价(materialPrice) 、损耗率(loseRate) 、材质(rawMaterial)

import { v4 as uuidv4 } from 'uuid'

const SHELVES = [
  {
    id: uuidv4(),
    label: '货架编号',
    code: 'code',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '货架名称',
    code: 'name',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '库房编号',
    code: 'warehouseCode',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '库房名称',
    code: 'warehouseName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '电子货架编号',
    code: 'deviceCode',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '备注',
    code: 'remark',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'state',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createNameBy',
    width: null,
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
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）

  }
]

export {
  SHELVES

}
