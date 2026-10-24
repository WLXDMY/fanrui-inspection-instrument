/*
 * @Author: youjuan.hu
 * @Date: 2023-01-13 10:07:24
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @LastEditTime: 2023-01-16 17:23:17
 * @Description:单品追溯-过站记录表格列数据
 */
import { v4 as uuidv4 } from 'uuid'

const STATION_RECORDS = [
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
    label: '生产工单号',
    code: 'relationNumber',
    width: '200',
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
    width: '200',
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
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '物料编码',
    code: 'materialCode',
    width: '160',
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
    label: '物料名称',
    code: 'materialName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '制造单元名称',
    code: 'lineName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '工位名称',
    code: 'facName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '工序名称',
    code: 'produreName',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '上报时间',
    code: 'reportTime',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]

export { STATION_RECORDS }
