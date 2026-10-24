/*
 * @Author: shunhua.liang
 * @Date: 2022-06-21 16:07:15
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-02-20 20:36:34
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid'

const TABLE_LIST = [
  {
    id: uuidv4(),
    label: '采购订单号',
    code: 'purchaseCode',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'stateName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '采购类型',
    code: 'purchaseType',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '',
    special: true
  },
  {
    id: uuidv4(),
    label: '关联单据类型',
    code: 'relatedTypeName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4(),
    label: '关联单据编号',
    code: 'requestCode',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '供应商编码',
    code: 'supplierCode',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '供应商名称',
    code: 'supplierName',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '项目名称',
    code: 'projectName',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '计划采购日期',
    code: 'planTime',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '采购员',
    code: 'buyerNickname',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '采购员联系方式',
    code: 'buyerPhone',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '审批人',
    code: 'approverName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '供应商联系方式',
    code: 'supplierPhone',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '供应商地址',
    code: 'supplierAddr',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '备注',
    code: 'baseInfoRemark',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '物料编码',
    code: 'code',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: '',
    parentFields: 'materialFields'
  },
  {
    id: uuidv4(),
    label: '物料名称',
    code: 'name',
    width: '200',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: '',
    parentFields: 'materialFields'
  },
  {
    id: uuidv4(),
    label: '物料规格',
    code: 'standard',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: '',
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: 'materialFields',
    special: true
  },
  {
    id: uuidv4(),
    label: '单位',
    code: 'comp',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: '',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '需求数量',
    code: 'planNum',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: '',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '采购数量',
    code: 'num',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: '',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '单价（元）',
    code: 'price',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: '',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '总价（元）',
    code: 'sumprice',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: '',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '要货日期',
    code: 'purchaseDate',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: '',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '当前库存数量',
    code: 'stockQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: '',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '行备注',
    code: 'materialRemark',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: '',
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '收料数量',
    code: 'receiptQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '入库数量',
    code: 'inventoryQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '来料合格数量',
    code: 'qualifiedQuantity',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '来料不合格数量',
    code: 'unqualifiedQuantity',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '特征参数',
    code: 'auxiliaryAttr',
    width: '130',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '审批状态',
    code: 'approvalStatusName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '审批时间',
    code: 'approvalTime',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '实际审批人',
    code: 'actualApproverName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByNickname',
    width: '100',
    minWidth: null,
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
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '更新人',
    code: 'updateByName',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '更新时间',
    code: 'updateTime',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '收料进度',
    code: 'receiptProgress',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '入库进度',
    code: 'inventoryProgress',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '来料合格率',
    code: 'qualifiedRate',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '赠品数量',
    code: 'giftQuantity',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '退料数量',
    code: 'returnQuantity',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  }
]

const TABLE_MATERIAL_LIST = [
  {
    id: uuidv4(),
    label: '序号',
    code: 'SN',
    width: '50',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: '',
    special: true
  },
  {
    id: uuidv4(),
    label: '需求数量',
    code: 'num',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '采购数量',
    code: 'planNum',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '单价（元）',
    code: 'price',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '总价（元）',
    code: 'planTotalPrice',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '要货日期',
    code: 'purchaseDate',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '当前库存数量',
    code: 'stockQuantity',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '行备注',
    code: 'materialRemark',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '收料数量',
    code: 'receiptQuantity',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '入库数量',
    code: 'inventoryQuantity',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '来料合格数量',
    code: 'qualifiedQuantity',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '来料不合格数量',
    code: 'unqualifiedQuantity',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '特征参数',
    code: 'auxiliaryAttr',
    width: '',
    minWidth: '100',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '收料进度',
    code: 'receiptProgress',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '入库进度',
    code: 'inventoryProgress',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '来料合格率',
    code: 'qualifiedRate',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '赠品数量',
    code: 'giftQuantity',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '退料数量',
    code: 'returnQuantity',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  }
]

export { TABLE_LIST, TABLE_MATERIAL_LIST }
