/*
 * @Author: shunhua.liang
 * @Date: 2022-06-21 16:45:27
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-08-24 10:36:15
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid'

const PROCEDURE = [
  {
    id: uuidv4,
    label: '收货单号',
    code: 'receiptCode',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '采购订单号',
    code: 'purchaseCode',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '供应商编码',
    code: 'supplierCode',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '供应商',
    code: 'supplierName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '供应商联系方式',
    code: 'supplierPhone',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '收货时间',
    code: 'receiptTime',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '状态',
    code: 'stateName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '审批状态',
    code: 'approvalStatusName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '审批人',
    code: 'approverName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '物料编码',
    code: 'materialCode',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '物料名称',
    code: 'materialName',
    width: '200',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '物料数量',
    code: 'materialQuantity',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '物料规格',
    code: 'materialStandard',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '创建人',
    code: 'createByNickName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '收货类型',
    code: 'receiptTypeName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  }
]

export { PROCEDURE }
