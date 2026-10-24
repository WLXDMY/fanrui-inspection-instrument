/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-09 12:02:14
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-08-06 14:44:32
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\detailedLIst\constant.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { v4 as uuidv4 } from 'uuid'

// 采购订单
export const PurchaseColumn = [
  {
    type: 'selection',
    prop: 'selection'
  },
  {
    id: uuidv4,
    label: '采购订单号',
    prop: 'purchaseCode',
    filterBoxType: 'input',
    minWidth: '110'
  },
  {
    id: uuidv4,
    label: '采购类型',
    prop: 'purchaseTypeName'
  },
  {
    id: uuidv4,
    label: '状态',
    prop: 'stateName',
    minWidth: '50'
  },
  {
    id: uuidv4,
    label: '物料编码',
    prop: 'code',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.code',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料名称',
    prop: 'name',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.name',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '供应商编码',
    prop: 'supplierCode'
  },
  {
    id: uuidv4,
    label: '供应商名称',
    prop: 'supplierName'
  },
  {
    id: uuidv4,
    label: '采购订单创建时间',
    prop: 'createTime'
  }
]
// 采购收料单
export const PurchaseReceiveColumn = [
  {
    id: uuidv4,
    label: '采购收料单号',
    prop: 'receiptCode'
  },
  {
    id: uuidv4,
    label: '状态',
    prop: 'stateName'
  },
  {
    id: uuidv4,
    label: '供应商编码',
    prop: 'supplierCode'
  },
  {
    id: uuidv4,
    label: '供应商名称',
    prop: 'supplierName'
  },
  {
    id: uuidv4,
    label: '采购订单创建时间',
    prop: 'createTime'
  }
]
// 项目合同
export const ProjectOrderColumn = [
  {
    id: uuidv4,
    label: '项目编码',
    prop: 'projectDefineCode'
  },
  {
    id: uuidv4,
    label: '项目名称',
    prop: 'projectDefineName'
  },
  {
    id: uuidv4,
    label: '项目类型',
    prop: 'projectTypeName'
  },
  {
    id: uuidv4,
    label: '状态',
    prop: 'stateName'
  },
  {
    id: uuidv4,
    label: '客户编码',
    prop: 'customerCode'
  },
  {
    id: uuidv4,
    label: '客户名称',
    prop: 'customerName'
  }
]
// 生产工单
export const WorkOrderColumn = [
  {
    type: 'selection',
    prop: 'selection'
  },
  {
    id: uuidv4,
    label: '生产工单号',
    prop: 'workOrderNumber',
    filterBoxType: 'input',
    minWidth: '110'
  },
  {
    id: uuidv4,
    label: '生产工单名称',
    prop: 'workOrderName',
    filterBoxType: 'input',
    minWidth: '110'
  },
  {
    id: uuidv4,
    label: '状态',
    prop: 'stateName'
    // filterBoxType: 'select',
    // optionsRequestConfig: {
    //   url: '/api/workorders/all/state',
    //   method: 'get',
    //   labelKey: 'name',
    //   valueKey: 'code'
    // },
    // key: 'states'
  },
  {
    id: uuidv4,
    label: '物料编码',
    prop: 'code',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.code',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料名称',
    prop: 'name',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.name',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '供应商编码',
    prop: 'supplierCode'
  },
  {
    id: uuidv4,
    label: '供应商名称',
    prop: 'supplierName'
  },
  {
    id: uuidv4,
    label: '客户编码',
    prop: 'customerCode'
  },
  {
    id: uuidv4,
    label: '客户名称',
    prop: 'customerName'
  }
]
// 生产领料出库
export const ProductTakeOutColumn = [
  {
    type: 'selection',
    prop: 'selection'
  },
  {
    id: uuidv4,
    label: '订单编号',
    prop: 'orderNumber',
    filterBoxType: 'input',
    minWidth: '110'
  },
  {
    id: uuidv4,
    label: '物料编码',
    prop: 'code',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.code',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料名称',
    prop: 'name',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.name',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料规格',
    prop: 'standard',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.standard',
    filterBoxType: 'input'
  }
]
// 销售订单
export const SaleOrderColumn = [
  {
    type: 'selection',
    prop: 'selection'
  },
  {
    id: uuidv4,
    label: '订单编号',
    prop: 'saleOrderNumber',
    key: 'orderNumber',
    filterBoxType: 'input',
    minWidth: '110'
  },
  {
    id: uuidv4,
    label: '状态',
    prop: 'stateName',
    minWidth: '50'
  },
  {
    id: uuidv4,
    label: '物料编码',
    prop: 'code',
    outSideKey: 'materialFields',
    multilevelkey: 'saleOrderMaterial.materialFields.code',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料名称',
    prop: 'name',
    outSideKey: 'materialFields',
    multilevelkey: 'saleOrderMaterial.materialFields.name',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料规格',
    prop: 'standard',
    outSideKey: 'materialFields',
    multilevelkey: 'saleOrderMaterial.materialFields.standard',
    filterBoxType: 'input'
  }
]
// 销售出库单
export const SaleOutOrderColumn = [
  {
    type: 'selection',
    prop: 'selection'
  },
  {
    id: uuidv4,
    label: '订单编号',
    prop: 'orderNo',
    filterBoxType: 'input',
    minWidth: '110'
  },
  {
    id: uuidv4,
    label: '物料编码',
    prop: 'code',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.code',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料名称',
    prop: 'name',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.name',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料规格',
    prop: 'standard',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.standard',
    filterBoxType: 'input'
  }
]

export const MaterialColumn = [
  {
    type: 'selection',
    prop: 'selection'
  },
  { id: uuidv4, label: '物料编码', prop: 'code', multilevelkey: 'materialFields.code', filterBoxType: 'input' },
  { id: uuidv4, label: '物料名称', prop: 'name', multilevelkey: 'materialFields.name', filterBoxType: 'input' },
  { id: uuidv4, label: '物料规格', prop: 'standard', multilevelkey: 'materialFields.standard', filterBoxType: 'input' }
]

// 生产订单
export const ProductOrderColumn = [
  {
    type: 'selection',
    prop: 'selection'
  },
  {
    id: uuidv4,
    label: '订单编号',
    prop: 'productOrderNumber',
    key: 'orderNumber',
    filterBoxType: 'input',
    minWidth: '110'
  },
  {
    id: uuidv4,
    label: '状态',
    prop: 'stateName',
    minWidth: '50'
  },
  {
    id: uuidv4,
    label: '物料编码',
    prop: 'code',
    outSideKey: 'materialFields',
    multilevelkey: 'productOrderMaterial.materialFields.code',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料名称',
    prop: 'name',
    outSideKey: 'materialFields',
    multilevelkey: 'productOrderMaterial.materialFields.name',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料规格',
    prop: 'standard',
    outSideKey: 'materialFields',
    multilevelkey: 'productOrderMaterial.materialFields.standard',
    filterBoxType: 'input'
  }
]

// 采购退料
export const PurchaseReturnColumn = [
  {
    type: 'selection',
    prop: 'selection'
  },
  {
    id: uuidv4,
    label: '订单编号',
    prop: 'returnCode',
    filterBoxType: 'input',
    minWidth: '110'
  },
  {
    id: uuidv4,
    label: '状态',
    prop: 'stateName',
    minWidth: '50'
  },
  {
    id: uuidv4,
    label: '物料编码',
    prop: 'code',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.code',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料名称',
    prop: 'name',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.name',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料规格',
    prop: 'standard',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.standard',
    filterBoxType: 'input'
  }
]

// 采购退料
export const DeliveryOrderColumn = [
  {
    type: 'selection',
    prop: 'selection'
  },
  {
    id: uuidv4,
    label: '订单编号',
    prop: 'sendNumber',
    filterBoxType: 'input',
    minWidth: '110'
  },
  {
    id: uuidv4,
    label: '状态',
    prop: 'stateName',
    minWidth: '50'
  },
  {
    id: uuidv4,
    label: '物料编码',
    prop: 'code',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.code',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料名称',
    prop: 'name',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.name',
    filterBoxType: 'input'
  },
  {
    id: uuidv4,
    label: '物料规格',
    prop: 'standard',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.standard',
    filterBoxType: 'input'
  }
]

export const SchemeColumn = [
  { id: uuidv4, label: '方案编码', prop: 'schemeCode' },
  { id: uuidv4, label: '方案名称', prop: 'schemeName' }
]

// {
//   prop: 'name',
//   label: '物料名称',
//   minWidth: '150',
//   filterBoxType: 'input',
//   outSideKey: 'materialFields',
//   multiLevelKey: 'detailEntity.materialFields.name'
// },
