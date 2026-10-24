/*
 * @Author: youjuan.hu
 * @Date: 2023-01-13 10:59:08
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @LastEditTime: 2023-01-16 17:19:29
 * @Description: 单品追溯-追溯报告表格列数据
 */
import { v4 as uuidv4 } from 'uuid'

const TRACE_STATEMENT = [
  {
    id: uuidv4,
    label: '流水码',
    code: 'productFlowCode',
    width: '250',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '类型',
    code: 'typeName',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '生产工单号',
    code: 'relationNumber',
    width: '250',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '生产订单编号',
    code: 'productOrderNumber',
    width: '250',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },

  {
    id: uuidv4,
    label: '产品编码',
    code: 'materialCode',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
    // materialFields
  },
  {
    id: uuidv4,
    label: '产品名称',
    code: 'materialName',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '物料码信息',
    code: 'materialNames',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },

  {
    id: uuidv4,
    label: '投入时间',
    code: 'startTime',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

export { TRACE_STATEMENT }
