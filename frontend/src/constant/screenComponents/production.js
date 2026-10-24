/*
 * @Author: shunhua.liang
 * @Date: 2022-05-17 15:21:52
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-15 20:43:34
 * @Description: 生产大屏
 */
import { v4 as uuidv4 } from 'uuid'
const PRODUCTION = [
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/overviewState.png'),
    name: '状态总览',
    components: 'OverviewState',
    width: 1410 * 0.7,
    height: 153 * 0.7,
    currentWidth: '1410',
    currentHeight: '153',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/mainContentAll.png'),
    name: '生产计划与进度',
    components: 'MainContentAll',
    width: 1410 * 0.7,
    height: 666 * 0.7,
    currentWidth: '1410',
    currentHeight: '666',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/output.png'),
    name: '产量统计',
    components: 'LineCharts',
    width: 460 * 0.7,
    height: 252 * 0.7,
    currentWidth: '460',
    currentHeight: '252',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/oee.png'),
    name: 'OEE&良率',
    components: 'ProductionOee',
    width: 400 * 0.7,
    height: 265 * 0.7,
    currentWidth: '400',
    currentHeight: '265',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/beat.png'),
    name: '实时节拍信息',
    components: 'Beat',
    width: 400 * 0.7,
    height: 265 * 0.7,
    currentWidth: '400',
    currentHeight: '265',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  { // 工单挂起数
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/rightCount.png'),
    name: '历史工单挂起数',
    components: 'RightTopCount',
    width: 400 * 0.7,
    height: 65 * 0.7,
    currentWidth: '400',
    currentHeight: '65',
    left: 0,
    top: 0,
    type: 'production',
    flag: true,
    scale: false,
    zIndex: 1
  }
]

const OverviewState = () =>
  import('@/views/production-time/newComponents/overviewState.vue') // 状态总览
const MainContentAll = () =>
  import('@/views/production-time/newComponents/newProductionContent.vue') // 生产计划与进度
const LineCharts = () => import('@/views/screen-list/output-statistics.vue') // 产量统计
const ProductionOee = () => import('@/views/screen-list/oee-yield.vue') // OEE&良率
const Beat = () => import('@/views/screen-list/real-time-beat.vue') // 实时节拍信息
const RightTopCount = () => import('@/views/production-time/newComponents/rightTopHistoryCount.vue')// 历史工单挂起数
const productionComponents = {
  OverviewState,
  MainContentAll,
  LineCharts,
  ProductionOee,
  Beat,
  RightTopCount
}

export { PRODUCTION, productionComponents }
