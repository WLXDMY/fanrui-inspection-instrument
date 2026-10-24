/*
 * @Author: shunhua.liang
 * @Date: 2022-06-21 14:27:01
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-02-20 19:58:23
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid'

const PROCEDURE = [
  {
    id: uuidv4,
    label: '采购需求单号',
    code: 'requestNum',
    width: '150',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4,
    label: '单据类型',
    code: 'orderNumTypeName',
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
    label: '单据编号',
    code: 'orderNum',
    width: '150',
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
    code: 'state',
    width: null,
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
    code: 'materialNum',
    width: '100',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  // {
  //   id: uuidv4,
  //   label: '物料规格',
  //   code: 'materialStandard',
  //   width: '100',
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   class: ''
  // },

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
    id: uuidv4,
    label: '采购数量',
    code: 'purchaseQuantity',
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
    label: '创建时间',
    code: 'createTime',
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
    label: '修改时间',
    code: 'updateTime',
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
    label: '创建人',
    code: 'createByNickname',
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
    label: '审批人',
    code: 'approverName',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  // {
  //   id: uuidv4,
  //   label: '备注信息',
  //   code: 'remark',
  //   width: '140',
  //   minWidth: null,
  //   showOverflowTooltip: false,
  //   type: null,
  //   fixed: null,
  //   columnType: 'material', // 字段类型（判断是否是需要特殊取值的字段）
  //   class: ''
  // },
  // ---------------新增----------------
  {
    id: uuidv4,
    label: '收货数量',
    code: 'receiptQuantity',
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
    label: '入库数量',
    code: 'inventoryQuantity',
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
    label: '检验合格数量',
    code: 'qualifiedQuantity',
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
    label: '检验不合格数量',
    code: 'unqualifiedQuantity',
    width: '140',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  }
]

export { PROCEDURE }
