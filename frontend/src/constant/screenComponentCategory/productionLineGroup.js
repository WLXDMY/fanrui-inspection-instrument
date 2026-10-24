/*
 * @Author:xuqiuming
 * @Date: 2022-06-10 10:30
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-02-27 20:16:13
 * @Description: 车间大屏
 */

import { v4 as uuidv4 } from 'uuid'
const ProductionLineGroupList = [
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/equipmentOEE/workshop.png'),
    name: '设备OEE',
    components: 'WorkshopEquipmentOEE',
    width: 1858 * 0.7,
    height: 915 * 0.7,
    currentWidth: '1858',
    currentHeight: '915',
    type: 'equipmentOEE',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/equipmentOEE/qualificationRate.png'),
    name: '设备合格率',
    components: 'EquipmentQualificationRate',
    width: 1858 * 0.7,
    height: 915 * 0.7,
    currentWidth: '1858',
    currentHeight: '915',
    type: 'equipmentOEE',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/equipmentOEE/timeEffeciency.png'),
    name: '设备时间效率',
    components: 'timeEffeciency',
    width: 1858 * 0.7,
    height: 915 * 0.7,
    currentWidth: '1858',
    currentHeight: '915',
    type: 'timeEffeciency',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/equipmentOEE/performEffeciency.png'),
    name: '设备性能效率',
    components: 'performEffeciency',
    width: 1858 * 0.7,
    height: 915 * 0.7,
    currentWidth: '1858',
    currentHeight: '915',
    type: 'performEffeciency',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/equipmentOEE/power.png'),
    name: '设备用电',
    components: 'EquipmentPower',
    width: 1858 * 0.7,
    height: 915 * 0.7,
    currentWidth: '1858',
    currentHeight: '915',
    type: 'equipmentOEE',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/analysis/compare.png'),
    name: '产线产出对比统计分析大屏',
    components: 'CompareAnalysis',
    width: 1920 * 0.7,
    height: 977 * 0.7,
    currentWidth: '1920',
    currentHeight: '977',
    type: 'compareAnalysis',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/workShop/todayDate.gif'),
    name: '今日数据',
    components: 'TodayDate',
    width: 1883 * 0.7,
    height: 420 * 0.7,
    currentWidth: '1883',
    currentHeight: '420',
    type: 'workshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/workShop/right.gif'),
    name: '数据列表',
    components: 'RightDateList',
    width: 569 * 0.7,
    height: 513 * 0.7,
    currentWidth: '569',
    currentHeight: '513',
    type: 'workshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/workShop/left.gif'),
    name: '产线计划达成率',
    components: 'LeftproductLinePlan',
    width: 643 * 0.7,
    height: 513 * 0.7,
    currentWidth: '643',
    currentHeight: '513',
    type: 'workshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/workShop/center.gif'),
    name: '产线OEE/良率对比',
    components: 'CenterCompare',
    width: 643 * 0.7,
    height: 513 * 0.7,
    currentWidth: '643',
    currentHeight: '513',
    type: 'workshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/machineProcess/maDeviceStatusOverview.png'),
    name: '机加设备状态总览',
    components: 'maDeviceStatusOverview',
    width: 1875 * 0.7,
    height: 209 * 0.7,
    currentWidth: '1875',
    currentHeight: '209',
    type: 'workshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/machineProcess/maDeviceWorkOrderList.png'),
    name: '机加设备工单列表',
    components: 'maDeviceWorkOrderList',
    width: 1875 * 0.7,
    height: 676 * 0.7,
    currentWidth: '1875',
    currentHeight: '676',
    type: 'workshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/powerComsuption/powerConsumptionTrendChart.png'),
    name: '车间时段用电',
    components: 'PowerConsumptionTrendChart',
    width: 1858 * 0.7,
    height: 915 * 0.7,
    currentWidth: '1858',
    currentHeight: '915',
    type: 'PowerComsuption',
    zIndex: 1
  },

  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/equipmentOEE/workshop.png'),
    name: '车间产线产量统计看板',
    components: 'DcLWorkShopOutput',
    width: 1858 * 0.7,
    height: 915 * 0.7,
    currentWidth: '1858',
    currentHeight: '915',
    type: 'DcLWorkShopOutput',
    zIndex: 1
  },
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
    address: require('@/assets/images/screenList/central/central-one.gif'),
    name: '周期产量统计',
    components: 'PeriodOrderOutput',
    width: 465 * 0.7,
    height: 381 * 0.7,
    currentWidth: '465',
    currentHeight: '381',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/lcfWorkshop/curMonthFinshedTopFive.png'),
    name: '本月产成品产出top5',
    components: 'FinshedGoodsOutputTopFive',
    width: 465 * 0.7,
    height: 286 * 0.7,
    currentWidth: '465',
    currentHeight: '286',
    zIndex: 1
  },

  {
    id: uuidv4(),
    address: require('@/assets/images/lcfWorkshop/CurMonthWorkshopProductionLineOutput.png'),
    name: '当月车间产线产出',
    components: 'CurMonthWorkshopProductionLineOutput',
    width: 465 * 0.7,
    height: 286 * 0.7,
    currentWidth: '465',
    currentHeight: '286',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-seven.gif'),
    name: '当日不良品项分布图top5',
    components: 'ToDayDefectiveProductsTopfive',
    width: 465 * 0.7,
    height: 381 * 0.7,
    currentWidth: '465',
    currentHeight: '381',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/lcfWorkshop/workshopSevenDaysYield.png'),
    name: '车间七天良率',
    components: 'WorkshopSevenDaysYield',
    width: 465 * 0.7,
    height: 381 * 0.7,
    currentWidth: '465',
    currentHeight: '381',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-four.gif'),
    name: '车间统计概览',
    components: 'WorkshopStatisticalOverview',
    width: 924 * 0.7,
    height: 277 * 0.7,
    currentWidth: '924',
    currentHeight: '277',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-four.gif'),
    name: '车间统计概览2',
    components: 'WorkshopStatisticalOverview2',
    width: 924 * 0.7,
    height: 277 * 0.7,
    currentWidth: '924',
    currentHeight: '277',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/lcfWorkshop/workshopLinesData.png'),
    name: '车间产线数据',
    components: 'WorkshopLinesData',
    width: 924 * 0.7,
    height: 673 * 0.7,
    currentWidth: '924',
    currentHeight: '673',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/workshopLinesData.png'),
    name: '车间每日产出',
    components: 'WorkshopDailyOutput',
    width: 460 * 0.7,
    height: 350 * 0.7,
    currentWidth: '460',
    currentHeight: '350',
    zIndex: 1
  }
]
const WorkshopEquipmentOEE = () =>
  import('@/views/equipment-OEE/workshop-equipment-OEE/index.vue')
const EquipmentQualificationRate = () =>
  import('@/views/equipment-OEE/equipment-qualification-rate/index.vue')
const timeEffeciency = () =>
  import('@/views/equipment-OEE/timeEffeciency/index.vue')
const performEffeciency = () =>
  import('@/views/equipment-OEE/performanceEffeciency/index.vue')
const EquipmentPower = () =>
  import('@/views/equipment-OEE/equipment-power/index.vue')
// 产线产出对比统计分析大屏
const CompareAnalysis = () =>
  import('@/views/production-line-comparison/index.vue')

const TodayDate = () =>
  import('@/views/workshop-board/todayDate.vue')// 今日数据
const RightDateList = () =>
  import('@/views/workshop-board/rightDateList.vue')
const LeftproductLinePlan = () =>
  import('@/views/workshop-board/leftproductLinePlan.vue')// 左侧产线计划
const CenterCompare = () =>
  import('@/views/workshop-board/centerCompare.vue')// 中间良率对比

const maDeviceStatusOverview = () =>
  import('@/views/machineProcess/components/maDeviceStatusOverview.vue')// 机加设备状态总览

const maDeviceWorkOrderList = () => import('@/views/machineProcess/components/maDeviceWorkOrderList.vue')// 机加设备工单列表

const PowerConsumptionTrendChart = () => import('@/views/power-comsuption/powerConsumptionTrendChart.vue') // 车间时段用电
const DcLWorkShopOutput = () => import('@/views/workshopYield/components/dcLWorkShopOutput.vue') // 车间产线产量统计看板 (数控车床产间产量)
const OverviewState = () =>
  import('@/views/production-time/newComponents/overviewState.vue') // 状态总览
const RightTopCount = () => import('@/views/production-time/newComponents/rightTopHistoryCount.vue')// 历史工单挂起数
const LineCharts = () => import('@/views/screen-list/output-statistics.vue') // 产量统计
const ProductionOee = () => import('@/views/screen-list/oee-yield.vue') // OEE&良率
const Beat = () => import('@/views/screen-list/real-time-beat.vue') // 实时节拍信息
const MainContentAll = () =>
  import('@/views/production-time/newComponents/newProductionContent.vue') // 生产计划与进度

const PeriodOrderOutput = () => import('@/views/production-central/central-order-output.vue') // 周期产量统计组件

const FinshedGoodsOutputTopFive = () => import('@/views/lcfWorkshop/finshedGoodsOutputTopFive.vue')// 当月产成品产出top5组件

const CurMonthWorkshopProductionLineOutput = () => import('@/views/lcfWorkshop/curMonthWorkshopProductionLineOutput.vue')// 当月车间产线产出
const ToDayDefectiveProductsTopfive = () => import('@/views/production-central/central-bad-production.vue')// 当日不良项分布top5数据

const WorkshopSevenDaysYield = () => import('@/views/lcfWorkshop/workshopSevenDaysYield')//
const WorkshopStatisticalOverview = () => import('@/views/production-central/central-total-show-all5.vue')// 车间统计概览
const WorkshopStatisticalOverview2 = () => import('@/views/production-central/central-total-show-all52.vue')// 车间统计概览2
const WorkshopLinesData = () => import('@/views/lcfWorkshop/workshopLinesData')//
const WorkshopDailyOutput = () => import('@/views/production-central/workshopDailyOutput') // 车间每日产出

const productionLineGroupComs = {
  WorkshopEquipmentOEE,
  EquipmentQualificationRate,
  timeEffeciency,
  performEffeciency,
  EquipmentPower,
  CompareAnalysis,
  TodayDate,
  RightDateList,
  LeftproductLinePlan,
  CenterCompare,
  maDeviceStatusOverview,
  maDeviceWorkOrderList,
  PowerConsumptionTrendChart,
  DcLWorkShopOutput,
  OverviewState,
  RightTopCount,
  LineCharts,
  ProductionOee,
  Beat,
  MainContentAll,
  PeriodOrderOutput,
  FinshedGoodsOutputTopFive,
  CurMonthWorkshopProductionLineOutput,
  ToDayDefectiveProductsTopfive,
  WorkshopSevenDaysYield,
  WorkshopStatisticalOverview,
  WorkshopStatisticalOverview2,
  WorkshopLinesData,
  WorkshopDailyOutput
}

export { ProductionLineGroupList, productionLineGroupComs }
