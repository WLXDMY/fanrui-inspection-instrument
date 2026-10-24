/*
 * @Author: shunhua.liang
 * @Date: 2022-05-17 15:45:12
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-07 10:57:32
 * @Description:  静置库存看板
 */
import { v4 as uuidv4 } from 'uuid'
const OVERVIEW_LIST = [
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/inventory/card-one.gif'),
    name: '在库总览',
    components: 'Overview',
    width: 432 * 0.7,
    height: 487 * 0.7,
    currentWidth: '432',
    currentHeight: '487',
    type: 'carScreen',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/inventory/card-two.gif'),
    name: '今日出入口总览',
    components: 'Storage',
    width: 876 * 0.7,
    height: 487 * 0.7,
    currentWidth: '876',
    currentHeight: '487',
    type: 'inventory',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/inventory/card-three.gif'),
    name: '在库时长TOP5产品批次',
    components: 'TopDuration',
    width: 528 * 0.7,
    height: 312 * 0.7,
    currentWidth: '528',
    currentHeight: '312',
    type: 'inventory',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/inventory/card-four.gif'),
    name: '在库量TOP5产品批次',
    components: 'TopLibrary',
    width: 518 * 0.7,
    height: 280 * 0.7,
    currentWidth: '528',
    currentHeight: '312',
    type: 'inventory',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/inventory/card-five.gif'),
    name: '在库时长分布图',
    components: 'TimeLibrary',
    width: 432 * 0.7,
    height: 461 * 0.7,
    currentWidth: '432',
    currentHeight: '461',
    type: 'inventory',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/inventory/card-six.gif'),
    name: '日库存趋势图',
    components: 'DailyTrend',
    width: 876 * 0.7,
    height: 461 * 0.7,
    currentWidth: '876',
    currentHeight: '461',
    type: 'inventory',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/inventory/card-seven.gif'),
    name: '在库量最小TOP5产品名称',
    components: 'TopMinProduct',
    width: 518 * 0.7,
    height: 280 * 0.7,
    currentWidth: '528',
    currentHeight: '312',
    type: 'inventory',
    zIndex: 1
  }
]

// 静置库存看板
const Overview = () =>
  import('@/views/production-standing-inventory/overview.vue')
const Storage = () =>
  import('@/views/production-standing-inventory/storage.vue')
const TopDuration = () =>
  import('@/views/production-standing-inventory/top-duration.vue')
const TopLibrary = () =>
  import('@/views/production-standing-inventory/top-library.vue')
const TopMinProduct = () =>
  import('@/views/production-standing-inventory/top-min-production.vue')
const TimeLibrary = () =>
  import('@/views/production-standing-inventory/time-library.vue')
const DailyTrend = () =>
  import('@/views/production-standing-inventory/daily-trend.vue')

const overviewComponents = {
  Overview,
  Storage,
  TopDuration,
  TopLibrary,
  TopMinProduct,
  TimeLibrary,
  DailyTrend
}

export { OVERVIEW_LIST, overviewComponents }
