/*
 * @Author:xuqiuming
 * @Date: 2022-06-10 10:30
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-22 09:08:00
 * @Description: 产线大屏
 */

import { v4 as uuidv4 } from 'uuid'
const ProductionLineList = [
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/assembly/1.png'),
    name: '当前工单',
    components: 'assemblyCurrentOrder',
    width: 465 * 0.7,
    height: 418 * 0.7,
    currentWidth: '465',
    currentHeight: '418',
    type: 'carScreen',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/assembly/4.png'),
    name: '今日数据',
    components: 'assemblyTodayData',
    width: 1018 * 0.7,
    height: 418 * 0.7,
    currentWidth: '1018',
    currentHeight: '418',
    type: 'carScreen',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/assembly/3.png'),
    name: '设备故障列表',
    components: 'EquipmentFailureList',
    width: 363 * 0.7,
    height: 766 * 0.7,
    currentWidth: '363',
    currentHeight: '766',
    type: 'EquipmentFailureList',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/assembly/7.png'),
    name: '工序列表',
    components: 'assemblyProcessList',
    width: 363 * 0.7,
    height: 766 * 0.7,
    currentWidth: '363',
    currentHeight: '766',
    type: 'carScreen',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/assembly/2.png'),
    name: '工单列表',
    components: 'assemblyOrderList',
    width: 724 * 0.7,
    height: 512 * 0.7,
    currentWidth: '724',
    currentHeight: '512',
    type: 'carScreen',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/assembly/5.png'),
    name: '今日小时产出数',
    components: 'assemblyOutputEcharts',
    width: 724 * 0.7,
    height: 512 * 0.7,
    currentWidth: '724',
    currentHeight: '512',
    type: 'carScreen',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/assembly/6.png'),
    name: '达标率',
    components: 'complianceRate',
    width: 363 * 0.7,
    height: 180 * 0.7,
    currentWidth: '363',
    currentHeight: '180',
    type: 'carScreen',
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
    type: 'carScreen',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
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
    height: 235 * 0.7,
    currentWidth: '1410',
    currentHeight: '235',
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
    imgWidth: '220',
    imgHeight: '144',
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
    name: '产量良率1',
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
    // 产量 良率 不良数
    id: uuidv4(),
    address: require('@/assets/images/screenList/ao/rate.png'),
    name: '产量良率2',
    components: 'AoProductionYieldDefectsNum',
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
  {
    id: uuidv4(),
    address: require('@/assets/images/analysis/default.png'),
    name: '产线故障统计分析大屏',
    components: 'FailureAnalysis',
    width: 1920 * 0.7,
    height: 977 * 0.7,
    currentWidth: '1920',
    currentHeight: '977',
    type: 'FailureAnalysis',
    zIndex: 1
  },
  // 工位不良数据
  {
    id: uuidv4(),
    address: require('@/assets/images/home/station-bad.png'),
    name: '工位不良数据',
    components: 'LineBadRateScreen',
    width: 400 * 0.7,
    height: 267 * 0.7,
    currentWidth: '400',
    currentHeight: '267',
    imgWidth: '220px',
    imgHeight: '121px',
    zIndex: 1
  },
  // 产量列表 优良率&合格率 当前投入和产出 属于江铜定制，按照 factoryName 展示
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/jt-production/outputList.png'),
    name: '产量列表',
    components: 'OutputList',
    width: 1350 * 0.7,
    height: 514 * 0.7,
    currentWidth: '1350',
    currentHeight: '514',
    imgWidth: '220px',
    imgHeight: '121px',
    zIndex: 1,
    factoryName: ['jiangtong']
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/jt-production/excellentRateANDQualifiedRate.png'),
    name: '优良率&合格率',
    components: 'ExcellentRateANDQualifiedRate',
    width: 460 * 0.7,
    height: 300 * 0.7,
    currentWidth: '460',
    currentHeight: '300',
    imgWidth: '220px',
    imgHeight: '121px',
    zIndex: 1,
    factoryName: ['jiangtong']
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/jt-production/currentInputsANDOutputs.png'),
    name: '当前投入和产出',
    components: 'CurrentInputsANDOutputs',
    width: 460 * 0.7,
    height: 296 * 0.7,
    currentWidth: '460',
    currentHeight: '296',
    imgWidth: '220px',
    imgHeight: '121px',
    zIndex: 1,
    factoryName: ['jiangtong']
  },
  //   生产大屏
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
    address: require('@/assets/images/screenList/production/count.png'),
    name: '产量统计',
    components: 'LineCharts',
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
  { // 历史工单挂起数
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
const assemblyCurrentOrder = () =>
  import('@/views/production-assembly/currentOrder.vue') // 当前工单
const assemblyTodayData = () =>
  import('@/views/production-assembly/todayData.vue') // 今日数据
const EquipmentFailureList = () =>
  import('@/views/production-assembly/procedureList.vue') // 设备故障列表

const assemblyProcessList = () =>
  import('@/views/production-assembly/processList.vue') // 工序列表
const assemblyOrderList = () =>
  import('@/views/production-assembly/orderList.vue') // 工单列表
const assemblyOutputEcharts = () =>
  import('@/views/production-assembly/outputEcharts.vue') // 今日小时产出数
const complianceRate = () =>
  import('@/views/production-assembly/complianceRate.vue') // 达标率
const AoOverviewState = () =>
  import('@/views/production-line/newComponents/overviewState.vue') // 状态总览
const AoNewProductionContent = () =>
  import('@/views/production-line/newComponents/newProductionContent.vue') // 生产计划与进度
const OutputList = () =>
  import('@/views/production-line/newComponents/outputList.vue') // 产量列表
const ExcellentRateANDQualifiedRate = () =>
  import('@/views/production-line/newComponents/excellentRateANDQualifiedRate.vue') // 优良率&合格率
const CurrentInputsANDOutputs = () =>
  import('@/views/production-line/newComponents/currentInputsANDOutputs.vue') // 当前投入和产出
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
const RightLineTopCount = () =>// 历史工单挂起数
  import('@/views/production-line/newComponents/rightTopHistoryCount.vue')
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
const AoProductionYieldDefectsNum = () =>
  import('@/views/production-line/newComponents/productionYieldDefectsNum.vue') // 产量良率不良数
const AoProductionInputYield = () =>
  import('@/views/production-line/newComponents/productionInputYield.vue') // 投产 产量 良率
const AoRightBadStationData = () =>
  import('@/views/production-line/newComponents/rightBadStationData.vue') // 工位不良数据
const FailureAnalysis = () =>
  import('@/views/production-failure-analysis/index.vue')
const LineBadRateScreen = () => import('@/views/production-line/newComponents/station-bad-rate.vue')

// 生产大屏
const OverviewState = () =>
  import('@/views/production-time/newComponents/overviewState.vue') // 状态总览
const MainContentAll = () =>
  import('@/views/production-time/newComponents/newProductionContent.vue') // 生产计划与进度
const LineCharts = () => import('@/views/screen-list/output-statistics.vue') // 产量统计
const ProductionOee = () => import('@/views/screen-list/oee-yield.vue') // OEE&良率
const Beat = () => import('@/views/screen-list/real-time-beat.vue') // 实时节拍信息
const RightTopCount = () => import('@/views/production-time/newComponents/rightTopHistoryCount.vue')// 历史工单挂起数

const productionLineComs = {
  assemblyCurrentOrder,
  assemblyTodayData,
  EquipmentFailureList,
  assemblyOrderList,
  assemblyOutputEcharts,
  complianceRate,
  AoOverviewState,
  AoNewProductionContent,
  OutputList,
  ExcellentRateANDQualifiedRate,
  CurrentInputsANDOutputs,
  AoRightAlarmList,
  AoRightFinishedProductMaintenance,
  AoRightSemiFinishedProductMaintenance,
  AoRightSemiFinishedProductTop,
  AoWorkOrderNote,
  AoTodayInputOutputInfo,
  AoProductionYield,
  AoProductionYieldDefectsNum,
  AoProductionInputYield,
  AoRightBadStationData,
  FailureAnalysis,
  assemblyProcessList,
  RightLineTopCount,
  LineBadRateScreen,
  OverviewState,
  MainContentAll,
  LineCharts,
  ProductionOee,
  Beat,
  RightTopCount
}

export { ProductionLineList, productionLineComs }
