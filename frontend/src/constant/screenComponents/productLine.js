/*
 * @Author: shunhua.liang
 * @Date: 2022-05-17 15:28:34
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-06-17 12:01:43
 * @Description: 产线大屏
 */
import { v4 as uuidv4 } from 'uuid'
const NEW_LIST = [
  // 状态总览
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/overviewState.png'),
    name: '状态总览',
    components: 'AoOverviewState',
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
  // 甘特图
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/mainContentAll.png'),
    name: '生产计划与进度',
    components: 'AoNewProductionContent',
    width: 1410 * 0.7,
    height: 200 * 0.7,
    currentWidth: '1410',
    currentHeight: '200',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/rightAlarmList.png'),
    name: '告警详情',
    components: 'AoRightAlarmList',
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
    // 成品维修top
    id: uuidv4(),
    address: require('@/assets/images/screenList/ao/finished.png'),
    name: '成品维修',
    components: 'AoRightFinishedProductMaintenance',
    width: 400 * 0.7,
    height: 195 * 0.7,
    currentWidth: '400',
    currentHeight: '195',
    imgWidth: '220px',
    imgHeight: '144px',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    // 半成品维修top
    id: uuidv4(),
    address: require('@/assets/images/screenList/ao/partiallyProduct.png'),
    name: '半成品维修',
    components: 'AoRightSemiFinishedProductMaintenance',
    width: 400 * 0.7,
    height: 195 * 0.7,
    currentWidth: '400',
    currentHeight: '195',
    imgWidth: '220px',
    imgHeight: '144px',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    // 半成品维修top
    id: uuidv4(),
    address: require('@/assets/images/screenList/ao/count.png'),
    name: '质量检验',
    components: 'AoRightSemiFinishedProductTop',
    width: 400 * 0.7,
    height: 195 * 0.7,
    currentWidth: '400',
    currentHeight: '195',
    imgWidth: '220px',
    imgHeight: '144px',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    // 工单备注信息
    id: uuidv4(),
    address: require('@/assets/images/screenList/ao/mask.png'),
    name: '工单备注信息',
    components: 'AoWorkOrderNote',
    width: 1410 * 0.7,
    height: 195 * 0.7,
    currentWidth: '1410',
    currentHeight: '195',
    imgWidth: '220px',
    imgHeight: '121px',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    // 当天投入产出信息
    id: uuidv4(),
    address: require('@/assets/images/screenList/ao/investment.png'),
    name: '投入产出信息',
    components: 'AoTodayInputOutputInfo',
    width: 820 * 0.7,
    height: 275 * 0.7,
    currentWidth: '820',
    currentHeight: '275',
    imgWidth: '220px',
    imgHeight: '121px',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    // 产量 良率
    id: uuidv4(),
    address: require('@/assets/images/screenList/ao/rate.png'),
    name: '产量良率',
    components: 'AoProductionYield',
    width: 560 * 0.7,
    height: 275 * 0.7,
    currentWidth: '560',
    currentHeight: '275',
    imgWidth: '220px',
    imgHeight: '121px',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    // 投产 产量 良率
    id: uuidv4(),
    address: require('@/assets/images/screenList/ao/inputYield.png'),
    name: '投产产量良率',
    components: 'AoProductionInputYield',
    width: 560 * 0.7,
    height: 275 * 0.7,
    currentWidth: '560',
    currentHeight: '275',
    imgWidth: '220px',
    imgHeight: '121px',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    // 工位不良数据
    id: uuidv4(),
    address: require('@/assets/images/screenList/ao/badRateNew.png'),
    name: '工位不良数据',
    components: 'AoRightBadStationData',
    width: 400 * 0.7,
    height: 197 * 0.7,
    currentWidth: '400',
    currentHeight: '197',
    imgWidth: '220px',
    imgHeight: '121px',
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
    components: 'RightLineTopCount',
    width: 400 * 0.7,
    height: 65 * 0.7,
    currentWidth: '400',
    currentHeight: '65',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  }
]

const AoOverviewState = () =>
  import('@/views/production-line/newComponents/overviewState.vue') // 状态总览
const AoNewProductionContent = () =>
  import('@/views/production-line/newComponents/newProductionContent.vue') // 生产计划与进度
const AoRightAlarmList = () =>
  import('@/views/production-line/newComponents/rightAlarm.vue') // 告警详情
const AoRightFinishedProductMaintenance = () =>
  import(
    '@/views/production-line/newComponents/rightFinishedProductMaintenance.vue'
  ) // 成品维修
const AoRightSemiFinishedProductMaintenance = () =>
  import(
    '@/views/production-line/newComponents/rightSemiFinishedProductMaintenance.vue'
  ) // 半成品维修
const AoRightSemiFinishedProductTop = () =>
  import(
    '@/views/production-line/newComponents/rightSemiFinishedProductTop.vue'
  ) // 质量检验
const AoWorkOrderNote = () =>
  import('@/views/production-line/newComponents/workOrderNote.vue') // 工单备注信息
const AoTodayInputOutputInfo = () =>
  import('@/views/production-line/newComponents/todayInputOutputInfo.vue') // 投入产出信息
const AoProductionYield = () =>
  import('@/views/production-line/newComponents/productionYield.vue') // 产量良率
const AoProductionInputYield = () =>
  import('@/views/production-line/newComponents/productionInputYield.vue') // 投产 产量 良率
const AoRightBadStationData = () =>
  import('@/views/production-line/newComponents/rightBadStationData.vue') // 工位不良数据
const RightLineTopCount = () =>// 历史工单挂起数
  import('@/views/production-line/newComponents/rightTopHistoryCount.vue')
const lineComponents = {
  AoOverviewState,
  AoNewProductionContent,
  AoRightAlarmList,
  AoRightFinishedProductMaintenance,
  AoRightSemiFinishedProductMaintenance,
  AoRightSemiFinishedProductTop,
  AoWorkOrderNote,
  AoTodayInputOutputInfo,
  AoProductionYield,
  AoProductionInputYield,
  AoRightBadStationData,
  RightLineTopCount
}

export { NEW_LIST, lineComponents }
