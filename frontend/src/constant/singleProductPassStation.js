// import { v4 as uuidv4 } from 'uuid'

const STATION_RECORDS = [
  {
    label: '流水码',
    prop: 'productFlowCode',
    width: '250',
    checked: true,
    filterBoxType: 'input'
  },
  // {
  //   prop: 'relationNumber',
  //   label: '关联单号',
  //   minWidth: '200',
  //   filterBoxType: 'input',
  //   checked: true
  // },
  {
    label: '生产工单号',
    prop: 'relationNumber',
    width: '200',
    filterBoxType: 'input',
    checked: true
  },
  {
    label: '生产订单编号',
    prop: 'productOrderNumber',
    width: '200',
    filterBoxType: 'input',
    checked: true
  },
  {
    label: '销售订单号',
    prop: 'saleOrderNumber',
    width: '180',
    checked: true
  },
  {
    label: '客户名称',
    prop: 'customer',
    width: '180',
    checked: true
  },
  {
    label: '类型',
    prop: 'typeName',
    width: '150',
    filterBoxType: 'input',
    checked: true
  },
  {
    label: '物料编码',
    prop: 'materialCode',
    width: '160',
    filterBoxType: 'input',
    checked: true
  },
  {
    label: '物料名称',
    prop: 'materialName',
    width: '180',
    filterBoxType: 'input',
    checked: true
  },
  {
    label: '制造单元名称',
    prop: 'lineName',
    width: '120',
    filterBoxType: 'input',
    checked: true
  },
  {
    label: '工位名称',
    prop: 'facName',
    width: '120',
    filterBoxType: 'input',
    checked: true
  },
  {
    label: '工序名称',
    prop: 'produreName',
    width: '130',
    filterBoxType: 'input',
    checked: true
  },
  {
    label: '上报时间',
    prop: 'reportTime',
    width: '180',
    filterBoxType: 'input',
    checked: true
  },
  {
    prop: 'operate',
    // label: '操作',
    minWidth: '45',
    columnType: 'slot',
    fixed: 'right',
    checked: true
  }
]
const LIST = [
  { name: 'productFlowCode', type: 'input' }, // 流水码
  { name: 'relationNumber', type: 'input' }, // 生产工单号
  { name: 'typeName', type: 'filter', queryName: 'type' }, // 类型
  { name: 'materialName', type: 'input' }, // 物料名称
  { name: 'materialCode', type: 'input' }, // 物料编码
  { name: 'lineName', type: 'filter', queryName: 'lineId' }, // 制造单元名称
  { name: 'facName', type: 'filter', queryName: 'facId' }, // 工位名称
  { name: 'produreName', type: 'input' }, // 工序名称
  { name: 'productOrderNumber', type: 'input' }, // 工序名称
  { name: 'reportTime', type: 'timeline', queryTip: ['startTime', 'endTime'] } // 上报时间
]

export {
  STATION_RECORDS,
  LIST
}
