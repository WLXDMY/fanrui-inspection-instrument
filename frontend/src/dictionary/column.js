/*
 * @Author: shunhua.liang
 * @Date: 2022-11-29 16:13:31
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-01-12 16:37:36
 * @Description: 请求列配置字段字典
 */

// 列配置字段由 : 路由 ： 独一无二的字段标识

const modularTypeList = {
  'salesOrder': 'salesOrder', // 销售订单
  'productOrder': 'productionColumnOrder', // 生产订单
  'productionMaterials': 'productMaterial', // 生产订单用料清单
  'orderModelWorkOrder': 'workOrder', // 生产工单
  'supplies': 'productSupplies', // 物料
  'bom': 'productBom', // bom
  'productManagement-technology': 'productTechnology', // 工艺
  'productManagement-procedure': 'productProcedure', // 工序定义
  'warehouseManage': 'warehouseManColumn', // 仓库定义
  'shelvesDefinition': 'shelvesDefinition', // 货架定义
  'purchasePutInStorage': 'purchasePutInStorage', // 采购入库单
  'purchaseReturnMaterialOutOfStorage': 'purchasePutInStorage', // 采购退料入库单
  'accessProduct': 'accessProduct', // 生产入库单
  'OutputPickingProduct': 'outPickProduct', // 生产领料出库单
  'OutputPatchProduct': 'outPatchProduct', // 生产补料出库单
  'OutputRefundProduct': 'outRefundProduct', // 生产退料入库单
  'inboundRecord': 'recordInbound', // 物料台账
  'batch': 'warehouseBatch', // 物料批次
  'inputRecord': 'accessRecordColumn', // 入库单
  'factoryRecord': 'factoryRecordColumn', // 出库单
  'inventory': 'inventoryColumn', // 库存盘点
  'materialAllocation': 'materialAllocationColumn', // 调拨单
  'clientFile': 'clientFileRecordColumns', // 客户档案
  'supplierProfile': 'supplierProfileRecordColumns', // 供应商档案
  'purchasingDemand': 'purchasingRequisition', // 采购需求
  'purchasingList': 'purchasingColumnOrder', // 采购订单
  'deliveryOrder': 'purchasingGoods', // 采购收货
  'purchaseMaterialReturnApplicationList': 'purchaseMaterialReturnApplication', // 采购退料申请单
  'outsourcingOrder': 'outsourcingOrder', // 委外订单
  'outsourcingReceiptOrder': 'outsourcingReceiptOrder', // 委外订单收货单
  'outsourcingMaterailOrder': 'outsourcingMaterailOrderByMaterial', // 委外订单用料清单
  'definitionResultQuality': 'definitionQuality', // 检验结果定义
  'electronicMaterial': 'salesOrder',
  'replaceScheme': 'replaceScheme', // 替代方案
  'auxiliaryAttr': 'auxiliaryAttr'// 物料特征参数
}

export { modularTypeList }
