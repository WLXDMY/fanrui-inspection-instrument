/*
 * @Author: shunhua.liang
 * @Date: 2022-05-17 15:28:34
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-07 10:57:24
 * @Description: 管理驾驶舱大屏
 */
import { v4 as uuidv4 } from 'uuid'
const CAR_SCREEN_LIST = [
  // 订单统计
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/car/orderStatistics.png'),
    name: '订单统计',
    components: 'OrderStatistics',
    width: 518 * 0.7,
    height: 293 * 0.7,
    currentWidth: '518',
    currentHeight: '293',
    type: 'carScreen',
    zIndex: 1
  },
  // 订单列表
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/car/orderList.png'),
    name: '订单列表',
    components: 'OrderList',
    width: 518 * 0.7,
    height: 370 * 0.7,
    currentWidth: '518',
    currentHeight: '370',
    type: 'carScreen',
    zIndex: 1
  },
  // 库存统计
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/car/inventoryStatistics.png'),
    name: '库存统计',
    components: 'InventoryStatistics',
    width: 518 * 0.7,
    height: 281 * 0.7,
    currentWidth: '518',
    currentHeight: '281',
    type: 'carScreen',
    zIndex: 1
  },
  // 年度订单走势
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/car/orderTrend.png'),
    name: '年度订单走势',
    components: 'OrderTrend',
    width: 797 * 0.7,
    height: 332 * 0.7,
    currentWidth: '797',
    currentHeight: '332',
    type: 'carScreen',
    zIndex: 1
  },
  // 产能分析
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/car/capacityAnalysis.png'),
    name: '产能分析',
    components: 'CapacityAnalysis',
    width: 797 * 0.7,
    height: 332 * 0.7,
    currentWidth: '797',
    currentHeight: '332',
    type: 'carScreen',
    zIndex: 1
  },
  // 质量稳定性分析
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/car/qualityStabilityAnalysis.png'),
    name: '质量稳定性分析',
    components: 'QualityStabilityAnalysis',
    width: 797 * 0.7,
    height: 279 * 0.7,
    currentWidth: '797',
    currentHeight: '279',
    type: 'carScreen',
    zIndex: 1
  },
  // 客户订单分析
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/car/orderAnalysis.png'),
    name: '客户订单分析',
    components: 'OrderAnalysis',
    width: 518 * 0.7,
    height: 421 * 0.7,
    currentWidth: '518',
    currentHeight: '421',
    type: 'carScreen',
    zIndex: 1
  },
  // 质量分析
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/car/qualityAnalysis.png'),
    name: '质量分析',
    components: 'QualityAnalysis',
    width: 518 * 0.7,
    height: 245 * 0.7,
    currentWidth: '518',
    currentHeight: '245',
    type: 'carScreen',
    zIndex: 1
  },
  // 不良原因分析
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/car/analysisOfAdverseCauses.png'),
    name: '不良原因分析',
    components: 'AnalysisOfAdverseCauses',
    width: 518 * 0.7,
    height: 280 * 0.7,
    currentWidth: '518',
    currentHeight: '280',
    type: 'carScreen',
    zIndex: 1
  }
]

const OrderStatistics = () =>
  import('@/views/production-car/orderStatistics.vue')
const OrderList = () => import('@/views/production-car/orderList.vue')
const InventoryStatistics = () =>
  import('@/views/production-car/inventoryStatistics.vue')
const OrderTrend = () => import('@/views/production-car/orderTrend.vue')
const CapacityAnalysis = () =>
  import('@/views/production-car/capacityAnalysis.vue')
const QualityStabilityAnalysis = () =>
  import('@/views/production-car/qualityStabilityAnalysis.vue')
const OrderAnalysis = () => import('@/views/production-car/orderAnalysis.vue')
const QualityAnalysis = () =>
  import('@/views/production-car/qualityAnalysis.vue')
const AnalysisOfAdverseCauses = () =>
  import('@/views/production-car/analysisOfAdverseCauses.vue')

const carComponents = {
  OrderStatistics,
  OrderList,
  InventoryStatistics,
  OrderTrend,
  CapacityAnalysis,
  QualityStabilityAnalysis,
  OrderAnalysis,
  QualityAnalysis,
  AnalysisOfAdverseCauses
}

export { CAR_SCREEN_LIST, carComponents }
