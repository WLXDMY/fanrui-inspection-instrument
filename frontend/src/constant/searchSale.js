/*
 * @Author: shunhua.liang
 * @Date: 2022-07-19 17:07:14
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-03-07 11:47:57
 * @Description:
 */

const LIST = [
  { name: 'saleOrderNumber', type: 'input', queryName: 'orderNumber' }, // 订单编号
  { name: 'customerCode', type: 'filter' }, // 客户名称
  { name: 'customerName', type: 'filter', queryName: 'customerName' },
  { name: 'name', type: 'input', queryName: 'name' }, // 物料名称
  { name: 'deliveryDate', type: 'timeline', queryTip: ['actualDeliveryStartTime', 'actualDeliveryEndTime'] }, // 实际交货时间
  { name: 'createTime', type: 'timeline', queryTip: ['createStartTime', 'createEndTime'] }, // 实际交货时间
  { name: 'orderDate', type: 'timeline', queryTip: ['orderStartTime', 'orderEndTime'] }, // 下单日期
  { name: 'state', type: 'filter', queryName: 'states' }, // 状态
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'actualApproverName', type: 'filter', queryName: 'actualApprover' },
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }, // 审批状态
  { name: 'code', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'standard', type: 'input' }, // 物料规格
  { name: 'materialDrawingNumber', type: 'input', queryName: 'drawingNumber' }, // 图号
  { name: 'priority', type: 'filter', queryName: 'priorities' }, // 优先级
  { name: 'haveCraft', type: 'filter' }, // 订单备注
  { name: 'haveBom', type: 'filter' }, // 订单备注
  { name: 'materialPlannedDeliveryDate', type: 'timeline', queryTip: ['planDeliveryStartTime', 'planDeliveryEndTime'] },
  { name: 'salesmanName', type: 'filter', queryName: 'salesmanName' },
  { name: 'salesmanCode', type: 'filter', queryName: 'salesmanCode' },
  { name: 'saleOrderType', type: 'filter' },
  { name: 'shipmentStatusName', type: 'filter', queryName: 'shipmentStatus' },
  { name: 'approvalTime', type: 'timeline', queryTip: ['approvalStartTime', 'approvalEndTime'] },
  { name: 'updateTime', type: 'timeline', queryTip: ['updateStartTime', 'updateEndTime'] },
  { name: 'importTime', type: 'timeline', queryTip: ['importStartTime', 'importEndTime'] },
  { name: 'customerOrderNumber', type: 'input' },
  { name: 'customerMaterialName', type: 'input' },
  { name: 'customerSpecification', type: 'input' },
  { name: 'createName', type: 'input' },
  { name: 'updateName', type: 'input' },
  { name: 'customerContractNo', type: 'input' },
  { name: 'materialChangeTime', type: 'timeline', queryTip: ['materialChangeStartTime', 'materialChangeEndTime'] },
  { name: 'synchronizationTime', type: 'timeline', queryTip: ['erpSynchronizationStartTime', 'erpSynchronizationEndTime'] },
  { name: 'materialIsChange', type: 'filter' },
  { name: 'typeName', type: 'filter', queryName: 'types' },
  { name: 'saleOrderSource', type: 'filter', queryName: 'saleOrderSource' },
  { name: 'customerContractNo', type: 'input' },
  { name: 'auxiliaryAttr', type: 'dialog', queryName: 'materialSkus' },

  { name: 'requireGoodsDate', type: 'timeline', queryTip: ['planDeliveryStartTime', 'planDeliveryEndTime'] }
]

export { LIST }
