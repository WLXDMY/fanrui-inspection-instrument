// 下推需要清空缓存的页面路由 pushDownListSession
const PUSH_DOWN_MENU_ROUTER = [
  { name: '生产订单', path: '/order-model/product-order/add' },
  { name: '生产工单', path: '/workorder-model/production-workorder/add' },
  { name: '采购需求', path: '/supply-chain-collaboration/procurement-management/purchasing-demand/add' },
  { name: '出货申请', path: '/supply-chain-collaboration/order-model/shipment_application/add' },
  //   销售退库   采购入库
  { name: '入库记录', path: '/warehousingDistribution/record-query/access-record/add' },
  { name: '采购订单', path: '/supply-chain-collaboration/procurement-management/purchasing-list/add' },
  { name: '领料申请', path: '/production-requisition/add' },
  { name: '出库记录', path: '/warehousingDistribution/record-query/factory-record/add' },
  { name: '来料检验', path: '/supply-chain-collaboration/procurement-management/materials-list/add' }
]

export { PUSH_DOWN_MENU_ROUTER }
