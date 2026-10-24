/*
 * @Author:xuqiuming
 * @Date: 2022-06-10 10:30
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-05 17:12:04
 * @Description: 中央大屏
 */

import { v4 as uuidv4 } from 'uuid'
const CenterScreenList = [
  // 管理驾驶舱大屏
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
  }, {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/process.png'),
    name: '制造运营中心',
    components: 'CenterProduceOpreate',
    width: 1420 * 0.7,
    height: 762 * 0.7,
    currentWidth: '1420',
    currentHeight: '762',
    type: 'process',
    flag: true,
    scale: 0.5,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-one.gif'),
    name: '产量统计1',
    components: 'CentralOrderOutput',
    width: 465 * 0.7,
    height: 381 * 0.7,
    currentWidth: '465',
    currentHeight: '381',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-one.gif'),
    name: '产量统计3',
    components: 'CentralOrderOutput3',
    width: 465 * 0.7,
    height: 381 * 0.7,
    currentWidth: '465',
    currentHeight: '381',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-two.gif'),
    name: '本月产成品产出对比图',
    components: 'CentralProductionOutput',
    width: 465 * 0.7,
    height: 286 * 0.7,
    currentWidth: '465',
    currentHeight: '286',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-three.gif'),
    name: '本月产线故障时长对比图',
    components: 'CentralLineTime',
    width: 465 * 0.7,
    height: 286 * 0.7,
    currentWidth: '465',
    currentHeight: '286',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-eleven.gif'),
    name: '统计数1',
    components: 'CentralTotalShow',
    width: 924 * 0.7,
    height: 204 * 0.7,
    currentWidth: '924',
    currentHeight: '204',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-five.gif'),
    name: '今日总装车间产线产出对比图',
    components: 'CentralGridOutput',
    width: 924 * 0.7,
    height: 374 * 0.7,
    currentWidth: '924',
    currentHeight: '374',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-six.gif'),
    name: '统计数2',
    components: 'CentralOrderList',
    width: 924 * 0.7,
    height: 286 * 0.7,
    currentWidth: '924',
    currentHeight: '286',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-seven.gif'),
    name: '今日不良品项分布图top5',
    components: 'CentralBadProduction',
    width: 465 * 0.7,
    height: 381 * 0.7,
    currentWidth: '465',
    currentHeight: '381',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-seven.gif'),
    name: '本月车间不良类型统计',
    components: 'CentralWorkshopBadStatistics',
    width: 465 * 0.7,
    height: 381 * 0.7,
    currentWidth: '465',
    currentHeight: '381',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-eight.gif'),
    name: '本月总装车间产出对比图',
    components: 'CentralAssemblyGrid',
    width: 465 * 0.7,
    height: 286 * 0.7,
    currentWidth: '465',
    currentHeight: '286',
    type: 'central',
    zIndex: 1
  }, {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-nine.gif'),
    name: '本月产线故障次数占比图',
    components: 'CentralFaultCharts',
    width: 465 * 0.7,
    height: 286 * 0.7,
    currentWidth: '465',
    currentHeight: '286',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-twelve.gif'),
    name: 'OEE&良率',
    components: 'CentralFactoryOee',
    width: 465 * 0.7,
    height: 381 * 0.7,
    currentWidth: '465',
    currentHeight: '381',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-four.gif'),
    name: '统计数3',
    components: 'CentralTotalShowAll',
    width: 924 * 0.7,
    height: 277 * 0.7,
    currentWidth: '924',
    currentHeight: '277',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-four.gif'),
    name: '统计数4',
    components: 'CentralTotalShowComp',
    width: 924 * 0.7,
    height: 277 * 0.7,
    currentWidth: '924',
    currentHeight: '277',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-four.gif'),
    name: '统计数5',
    components: 'CentralTotalShowAll5',
    width: 924 * 0.7,
    height: 277 * 0.7,
    currentWidth: '924',
    currentHeight: '277',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/device/facilityDetail.png'),
    name: '设备详情',
    components: 'DeviceContent',
    width: 1920 * 0.7,
    height: 960 * 0.7,
    currentWidth: '1920',
    currentHeight: '960',
    type: 'device',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/device-module-screen/deviceStatus.png'),
    name: '设备状态',
    components: 'DeviceStatus',
    width: 1227 * 0.7,
    height: 240 * 0.7,
    currentWidth: '1227',
    currentHeight: '240',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/device/mainInterfaceData.png'),
    name: '主界面数据',
    components: 'MainInterfaceData',
    width: 600 * 0.7,
    height: 474 * 0.7,
    currentWidth: '600',
    currentHeight: '474',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/device/equipmentParameters.png'),
    name: '设备参数',
    components: 'EquipmentParameters',
    width: 445 * 0.7,
    height: 294 * 0.7,
    currentWidth: '445',
    currentHeight: '294',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/device/equipmentDiagram.png'),
    name: '工厂模型图',
    components: 'EquipmentDiagram',
    width: 918 * 0.7,
    height: 610 * 0.7,
    currentWidth: '918',
    currentHeight: '610',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/order/order.png'),
    name: '订单大屏',
    components: 'OrderScreen',
    width: 1920 * 0.7,
    height: 981 * 0.7,
    currentWidth: '1920',
    currentHeight: '981',
    type: 'orderScreen',
    zIndex: 1
  },
  //   工艺大屏
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/count.png'),
    name: '产量统计2',
    components: 'RightChart',
    width: 340 * 0.7,
    height: 280 * 0.7,
    currentWidth: '340',
    currentHeight: '280',
    type: 'process',
    flag: true,
    scale: false,
    zIndex: 3
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/oee.png'),
    name: '工厂OEE&良率',
    components: 'ProcessFactoryRate',
    width: 340 * 0.7,
    height: 280 * 0.7,
    currentWidth: '340',
    currentHeight: '280',
    type: 'process',
    flag: true,
    scale: false,
    zIndex: 3
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/workshopOEE.png'),
    name: '车间OEE&完成率',
    components: 'ProcessCompletionRate',
    width: 340 * 0.7,
    height: 280 * 0.7,
    currentWidth: '340',
    currentHeight: '280',
    type: 'process',
    flag: true,
    scale: false,
    zIndex: 3
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/complete.png'),
    name: '计划完成率',
    components: 'RightAlarmChart',
    width: 340 * 0.7,
    height: 280 * 0.7,
    currentWidth: '340',
    currentHeight: '280',
    type: 'process',
    flag: true,
    scale: false,
    zIndex: 3
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/complete.png'),
    name: '工单达成率',
    components: 'projectCompletionWorkOrderRate',
    width: 340 * 0.7,
    height: 280 * 0.7,
    currentWidth: '340',
    currentHeight: '280',
    type: 'process',
    flag: true,
    scale: false,
    zIndex: 3
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/warn.png'),
    name: '告警汇总',
    components: 'ProcessAlarmSummary',
    width: 340 * 0.7,
    height: 388 * 0.7,
    currentWidth: '340',
    currentHeight: '388',
    type: 'process',
    flag: true,
    scale: false,
    zIndex: 3
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/state.png'),
    name: '设备当前状态',
    components: 'StateList',
    width: 340 * 0.7,
    height: 388 * 0.7,
    currentWidth: '340',
    currentHeight: '388',
    type: 'process',
    flag: true,
    scale: false,
    zIndex: 3
  },
  // {
  //   id: uuidv4(),
  //   address: require('@/assets/images/screenList/process/process.png'),
  //   name: '工艺路线',
  //   components: 'ProcessMain',
  //   width: 1420 * 0.7,
  //   height: 762 * 0.7,
  //   currentWidth: '1420',
  //   currentHeight: '762',
  //   type: 'process',
  //   flag: true,
  //   scale: 0.5,
  //   zIndex: 1
  // },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/environment.png'),
    name: '环境信息',
    components: 'MainFooter',
    width: 1420 * 0.7,
    height: 82 * 0.7,
    currentWidth: '1420',
    currentHeight: '82',
    type: 'process',
    flag: true,
    scale: false,
    zIndex: 2
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

  },
  { // 机加状态总览
    id: uuidv4(),
    address: require('@/assets/images/machineProcess/maOverviewState.png'),
    name: '机加状态总览',
    components: 'maOverviewState',
    width: 1851 * 0.7,
    height: 181 * 0.7,
    currentWidth: '1851',
    currentHeight: '181',
    left: 0,
    top: 0,
    type: 'production',
    flag: true,
    scale: false,
    zIndex: 1
  },
  { // 机加生产计划与进度
    id: uuidv4(),
    address: require('@/assets/images/machineProcess/maProductionPlanRate.png'),
    name: '机加生产计划与进度',
    components: 'maProductionPlanRate',
    width: 1851 * 0.7,
    height: 758 * 0.7,
    currentWidth: '1851',
    currentHeight: '758',
    left: 0,
    top: 0,
    type: 'production',
    flag: true,
    scale: false,
    zIndex: 1
  },
  { // 机加设备看板总览
    id: uuidv4(),
    address: require('@/assets/images/machineProcess/maEquipmentBoardOverView.png'),
    name: '机加设备看板总览',
    components: 'maEquipmentBoardOverView',
    width: 1842 * 0.7,
    height: 121 * 0.7,
    currentWidth: '1842',
    currentHeight: '121',
    left: 0,
    top: 0,
    type: 'production',
    flag: true,
    scale: false,
    zIndex: 1
  },
  { // 机加设备指标
    id: uuidv4(),
    address: require('@/assets/images/machineProcess/maEquipmentBoardRate.png'),
    name: '机加设备指标',
    components: 'maEquipmentBoardRate',
    width: 301 * 0.7,
    height: 750 * 0.7,
    currentWidth: '301',
    currentHeight: '750',
    left: 0,
    top: 0,
    type: 'production',
    flag: true,
    scale: false,
    zIndex: 1
  },
  { // 机加设备汇总
    id: uuidv4(),
    address: require('@/assets/images/machineProcess/maEquipmentBoardSummarize.png'),
    name: '机加设备汇总',
    components: 'maEquipmentBoardSummarize',
    width: 1507 * 0.7,
    height: 750 * 0.7,
    currentWidth: '1507',
    currentHeight: '750',
    left: 0,
    top: 0,
    type: 'production',
    flag: true,
    scale: false,
    zIndex: 1
  },
  // 能耗分析
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/energy-consumption-analysis/energyConsumptionOverview.png'),
    name: '能耗总览',
    components: 'EnergyConsumptionOverview',
    width: 600 * 0.7,
    height: 300 * 0.7,
    currentWidth: '600',
    currentHeight: '300',
    left: 0,
    top: 0,
    type: 'energyConsumption',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/energy-consumption-analysis/trendOfGasConsumption.png'),
    name: '用气能耗趋势',
    components: 'TrendOfGasConsumption',
    width: 600 * 0.7,
    height: 300 * 0.7,
    currentWidth: '600',
    currentHeight: '300',
    left: 0,
    top: 0,
    type: 'energyConsumption',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/energy-consumption-analysis/trendOfElectricityConsumption.png'),
    name: '用电能耗趋势',
    components: 'TrendOfElectricityConsumption',
    width: 1840 * 0.7,
    height: 620 * 0.7,
    currentWidth: '1840',
    currentHeight: '620',
    left: 0,
    top: 0,
    type: 'energyConsumption',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/energy-consumption-analysis/timeIntervalAccount.png'),
    name: '本月用电量统计',
    components: 'TimeIntervalAccount',
    width: 600 * 0.7,
    height: 300 * 0.7,
    currentWidth: '600',
    currentHeight: '300',
    left: 0,
    top: 0,
    type: 'energyConsumption',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/energy-consumption-analysis/powerConsumptionList.png'),
    name: '用电能耗列表',
    components: 'PowerConsumptionList',
    width: 612 * 0.7,
    height: 420 * 0.7,
    currentWidth: '612',
    currentHeight: '420',
    left: 0,
    top: 0,
    type: 'energyConsumption',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/energy-consumption-analysis/gasConsumptionList.png'),
    name: '用气能耗列表',
    components: 'GasConsumptionList',
    width: 612 * 0.7,
    height: 420 * 0.7,
    currentWidth: '612',
    currentHeight: '420',
    left: 0,
    top: 0,
    type: 'energyConsumption',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/energy-consumption-analysis/powerAndGasConsumptionCompare.png'),
    name: '用电用气对比',
    components: 'PowerAndGasConsumptionCompare',
    width: 581 * 0.7,
    height: 420 * 0.7,
    currentWidth: '581',
    currentHeight: '420',
    left: 0,
    top: 0,
    type: 'energyConsumption',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/energy-consumption-analysis/powerAndGasConsumptionShiftCompare.png'),
    name: '用电用气班次对比',
    components: 'PowerAndGasConsumptionShiftCompare',
    width: 1837 * 0.7,
    height: 502 * 0.7,
    currentWidth: '1837',
    currentHeight: '502',
    left: 0,
    top: 0,
    type: 'energyConsumption',
    flag: true,
    scale: false,
    zIndex: 1,
    factoryName: ['jiangtong']
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/complete.png'),
    name: '工厂直通率',
    components: 'FactoryFirstPassRate',
    width: 340 * 0.7,
    height: 280 * 0.7,
    currentWidth: '340',
    currentHeight: '280',
    type: 'process',
    flag: true,
    scale: false,
    zIndex: 3,
    factoryName: ['zssj']
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/quality/chart.png'),
    name: '首件/末件/过程检验合格率',
    components: 'QualityRate',
    width: 446 * 0.7,
    height: 365 * 0.7,
    currentWidth: '446',
    currentHeight: '365',
    type: 'QualityRate',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/quality/day-first.png'),
    name: '当天首检检验不良top5',
    components: 'FirstDayQuality',
    width: 446 * 0.7,
    height: 274 * 0.7,
    currentWidth: '446',
    currentHeight: '274',
    type: 'FirstDayQuality',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/quality/day-last.png'),
    name: '当天末检检验不良top5',
    components: 'LastDayQuality',
    width: 446 * 0.7,
    height: 274 * 0.7,
    currentWidth: '446',
    currentHeight: '274',
    type: 'LastDayQuality',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/quality/day-process.png'),
    name: '当天过程检验不良top5',
    components: 'ProcessDayQuality',
    width: 446 * 0.7,
    height: 274 * 0.7,
    currentWidth: '446',
    currentHeight: '274',
    type: 'ProcessDayQuality',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/quality/week-first.png'),
    name: '本周首检检验不良top5',
    components: 'FirstWeekQuality',
    width: 446 * 0.7,
    height: 274 * 0.7,
    currentWidth: '446',
    currentHeight: '274',
    type: 'FirstWeekQuality',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/quality/week-last.png'),
    name: '本周末检检验不良top5',
    components: 'LastWeekQuality',
    width: 446 * 0.7,
    height: 274 * 0.7,
    currentWidth: '446',
    currentHeight: '274',
    type: 'LastWeekQuality',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/quality/week-process.png'),
    name: '本周过程检验不良top5',
    components: 'ProcessWeekQuality',
    width: 446 * 0.7,
    height: 274 * 0.7,
    currentWidth: '446',
    currentHeight: '274',
    type: 'ProcessWeekQuality',
    zIndex: 1
  },
  // 康居人
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/giant/three.png'),
    name: '工单数据统计',
    components: 'GiantWorkStatistics',
    width: 924 * 0.7,
    height: 277 * 0.7,
    currentWidth: '924',
    currentHeight: '277',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/giant/one.png'),
    name: '产品工单计划与进度',
    components: 'GiantPlanSchedule',
    width: 480 * 0.7,
    height: 580 * 0.7,
    currentWidth: '480',
    currentHeight: '580',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/giant/two.png'),
    name: '工单工序过站',
    components: 'GiantProcessCharts',
    width: 930 * 0.7,
    height: 580 * 0.7,
    currentWidth: '930',
    currentHeight: '580',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/giant/two.png'),
    name: '工单工序过站2',
    components: 'GiantProcessCharts2',
    width: 930 * 0.7,
    height: 580 * 0.7,
    currentWidth: '930',
    currentHeight: '580',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/giant/two.png'),
    name: '每日工单工序过站',
    components: 'CurrentDayGiantProcessCharts',
    width: 930 * 0.7,
    height: 580 * 0.7,
    currentWidth: '930',
    currentHeight: '580',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/inventory/rose-card.png'),
    name: '当月维修项目占比',
    components: 'RoseCharts',
    width: 460 * 0.7,
    height: 361 * 0.7,
    currentWidth: '460',
    currentHeight: '361',
    left: 0,
    top: 0,
    type: 'center',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/distributionOfDefectiveProducts.png'),
    name: '不良产品分布Top5',
    components: 'DistributionOfDefectiveProducts',
    width: 460 * 0.7,
    height: 307 * 0.7,
    currentWidth: '460',
    currentHeight: '307',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/adverseTrendChart.png'),
    name: '不良趋势图',
    components: 'AdverseTrendChart',
    width: 1389 * 0.7,
    height: 307 * 0.7,
    currentWidth: '1389',
    currentHeight: '307',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/negativeTrendProportionChart.png'),
    name: '今日不良项分布',
    components: 'NegativeTrendProportionChart',
    width: 460 * 0.7,
    height: 307 * 0.7,
    currentWidth: '460',
    currentHeight: '307',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/personnelOutputChangeTrend.png'),
    name: '人员产出变化趋势图',
    components: 'PersonnelOutputChangeTrend',
    width: 610 * 0.7,
    height: 367 * 0.7,
    currentWidth: '610',
    currentHeight: '367',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/productionEfficiency.png'),
    name: '生产效率',
    components: 'ProductionEfficiency',
    width: 1389 * 0.7,
    height: 382 * 0.7,
    currentWidth: '1389',
    currentHeight: '382',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/quality-kanban-report/dailyUnqualifiedFluctuationChart.png'),
    name: '每日不合格波动图',
    components: 'DailyUnqualifiedFluctuationChart',
    width: 1380 * 0.7,
    height: 351 * 0.7,
    currentWidth: '1380',
    currentHeight: '351',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/quality-kanban-report/platonicDistributionOfBadData.png'),
    name: '不良数据柏拉图分布',
    components: 'PlatonicDistributionOfBadData',
    width: 1380 * 0.7,
    height: 386 * 0.7,
    currentWidth: '1380',
    currentHeight: '386',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/assembly/saleTransparency.png'),
    name: '销售订单透明',
    components: 'SaleTransparency',
    width: 1856 * 0.7,
    height: 900 * 0.7,
    currentWidth: '1856',
    currentHeight: '900',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/device-alarm-shutdown-statistics/downtimeDistribution.png'),
    name: '停机时长分布',
    components: 'DowntimeDistribution',
    width: 1380 * 0.7,
    height: 386 * 0.7,
    currentWidth: '1380',
    currentHeight: '386',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/device-alarm-shutdown-statistics/alarmDowntimeOfFrequencyStatistics.png'),
    name: '本月告警停机时长/次数统计',
    components: 'AlarmDowntimeOfFrequencyStatistics',
    width: 685 * 0.7,
    height: 447 * 0.7,
    currentWidth: '685',
    currentHeight: '447',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/device-alarm-shutdown-statistics/alarmDowntimeOfOutputStatistics.png'),
    name: '本月告警停机时长/产量统计',
    components: 'AlarmDowntimeOfOutputStatistics',
    width: 685 * 0.7,
    height: 447 * 0.7,
    currentWidth: '685',
    currentHeight: '447',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/center/productOrderProcessScreen.png'),
    name: '生产订单工序进度',
    components: 'ProductOrderProcessScreen',
    width: 1850 * 0.7,
    height: 939 * 0.7,
    currentWidth: '1850',
    currentHeight: '939',
    left: 0,
    top: 0,
    type: '',
    flag: true,
    scale: false,
    zIndex: 1
  }
]
// 管理驾驶舱大屏
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
const CenterProduceOpreate = () =>
  import('@/views/screen-list/process/process-main.vue')
// 中央大屏
const CentralOrderOutput = () =>
  import('@/views/production-central/central-order-output.vue')
const CentralOrderOutput3 = () =>
  import('@/views/production-central/central-order-output3.vue')
const CentralProductionOutput = () =>
  import('@/views/production-central/central-production-output.vue')
const CentralLineTime = () =>
  import('@/views/production-central/central-line-time.vue')
const CentralAssemblyGrid = () =>
  import('@/views/production-central/central-assembly-grid.vue')
const CentralBadProduction = () =>
  import('@/views/production-central/central-bad-production.vue')
const CentralWorkshopBadStatistics = () =>
  import('@/views/production-central/central-workshop-bad-statistics.vue')
const CentralFaultCharts = () =>
  import('@/views/production-central/central-fault-charts.vue')
const CentralTotalShow = () =>
  import('@/views/production-central/central-total-show.vue')
const CentralGridOutput = () =>
  import('@/views/production-central/central-grid-output.vue')
const CentralOrderList = () =>
  import('@/views/production-central/central-order-list.vue')
const CentralFactoryOee = () =>
  import('@/views/production-central/central-factory-oee.vue')
const CentralTotalShowAll = () =>
  import('@/views/production-central/central-total-show-all.vue')
const CentralTotalShowComp = () =>
  import('@/views/production-central/central-total-show-comp.vue')
const CentralTotalShowAll5 = () =>
  import('@/views/production-central/central-total-show-all5.vue')

// 设备大屏
const DeviceContent = () =>
  import('@/views/device-module-screen/components/deviceContent.vue')
// 主界面数据
const MainInterfaceData = () => import('@/views/device-module-screen/components/mainInterfaceData.vue')
// 设备参数
const EquipmentParameters = () => import('@/views/device-module-screen/components/equipmentParameters.vue')
// 工厂设备图
const EquipmentDiagram = () => import('@/views/device-module-screen/components/equipmentDiagram.vue')
// 设备状态
const DeviceStatus = () =>
  import('@/views/device-module-screen/components/deviceStatus.vue')
// 订单大屏
const OrderScreen = () =>
  import('@/views/production-order/index.vue')
// 工艺大屏
const RightChart = () =>
  import('@/views/screen-list/process/output-statistics.vue') // 产量统计(原生产大屏)
const ProcessFactoryRate = () =>
  import('@/views/screen-list/process/factory-rate.vue') // 工厂OEE&良率
const ProcessCompletionRate = () =>
  import('@/views/screen-list/process/workshop-rate.vue') // 车间OEE&完成率
const RightAlarmChart = () =>
  import('@/views/screen-list/process/project-completion-rate.vue') // 计划完成率

const projectCompletionWorkOrderRate = () =>
  import('@/views/screen-list/process/project-completion-work-order-rate.vue') // 工单达成率
const ProcessAlarmSummary = () =>
  import('@/views/screen-list/process/alarm-summary.vue') // 告警汇总
const StateList = () =>
  import('@/views/procurement-oad/components/stateList.vue') // 设备当前状态
const ProcessMain = () => import('@/views/screen-list/process/process-main.vue') // 工艺路线图
const MainFooter = () =>
  import('@/views/procurement-oad/pagesComponent/mainFooter') // 环境信息

// 生产大屏
const OverviewState = () =>
  import('@/views/production-time/newComponents/overviewState.vue') // 状态总览
const MainContentAll = () =>
  import('@/views/production-time/newComponents/newProductionContent.vue') // 生产计划与进度
const LineCharts = () => import('@/views/screen-list/output-statistics.vue') // 产量统计
const ProductionOee = () => import('@/views/screen-list/oee-yield.vue') // OEE&良率
const Beat = () => import('@/views/screen-list/real-time-beat.vue') // 实时节拍信息
const RightTopCount = () => import('@/views/production-time/newComponents/rightTopHistoryCount.vue')// 历史工单挂起数

const maOverviewState = () => import('@/views/machineProcess/components/maOverviewState.vue')// 机加状态总览
const maProductionPlanRate = () => import('@/views/machineProcess/components/maProductionPlanRate.vue')// 机加生产计划与进度
const maEquipmentBoardOverView = () => import('@/views/machineProcess/components/maEquipmentBoardOverView.vue') // 机加设备看板总览
const maEquipmentBoardRate = () => import('@/views/machineProcess/components/maEquipmentBoardRate.vue') // 机加设备指标
const maEquipmentBoardSummarize = () => import('@/views/machineProcess/components/maEquipmentBoardSummarize.vue') // 机加设备汇总

// 能耗分析页面-能耗总览
const EnergyConsumptionOverview = () => import('@/views/energy-consumption-analysis/energyConsumptionOverview.vue')
// 能耗分析页面-用气能耗趋势
const TrendOfGasConsumption = () => import('@/views/energy-consumption-analysis/trendOfGasConsumption.vue')
// 能耗分析页面-用电能耗趋势
const TrendOfElectricityConsumption = () => import('@/views/energy-consumption-analysis/trendOfElectricityConsumption.vue')
// 能耗分析页面-本月用电量统计
const TimeIntervalAccount = () => import('@/views/energy-consumption-analysis/timeIntervalAccount.vue')
// 能耗分析页面-用电能耗列表
const PowerConsumptionList = () => import('@/views/energy-consumption-analysis/powerConsumptionList.vue')
// 能耗分析页面-用气能耗列表
const GasConsumptionList = () => import('@/views/energy-consumption-analysis/gasConsumptionList.vue')
// 能耗分析页面-用电用气对比
const PowerAndGasConsumptionCompare = () => import('@/views/energy-consumption-analysis/powerAndGasConsumptionCompare.vue')
// 能耗分析页面-用电用气班次对比
const PowerAndGasConsumptionShiftCompare = () => import('@/views/energy-consumption-analysis/powerAndGasConsumptionShiftCompare.vue')
const FactoryFirstPassRate = () => import('@/views/workshopYield/components/factoryFirstPassRate.vue') // 工厂直通率
// 康居人大屏
const GiantWorkStatistics = () =>
  import('@/views/production-giant/work-statistics') // 统计数
const GiantPlanSchedule = () => import('@/views/production-giant/plan-schedule') // 工单计划与进度
const GiantProcessCharts = () =>
  import('@/views/production-giant/process-charts') // 产线工位生产情况
const GiantProcessCharts2 = () =>
  import('@/views/production-giant/process-charts2.vue') // 产线工位生产情况2
const CurrentDayGiantProcessCharts = () =>
  import('@/views/production-giant/current-day-process-charts.vue') // 每天产线工位生产情况
const RoseCharts = () =>
  import('@/views/production-standing-inventory/rose.vue')
const QualityRate = () => import('@/views/product-quality/qualityRate.vue')
const FirstWeekQuality = () => import('@/views/product-quality/weekFirst.vue')
const FirstDayQuality = () => import('@/views/product-quality/dayFirst.vue')
const LastWeekQuality = () => import('@/views/product-quality/weekLast.vue')
const LastDayQuality = () => import('@/views/product-quality/dayLast.vue')
const ProcessWeekQuality = () =>
  import('@/views/product-quality/weekProcess.vue')
const ProcessDayQuality = () => import('@/views/product-quality/dayProcess.vue')

const DistributionOfDefectiveProducts = () =>
  import('@/views/production-time/newComponents/distributionOfDefectiveProducts.vue') // 不良产品分布 top5
const AdverseTrendChart = () =>
  import('@/views/production-time/newComponents/adverseTrendChart.vue') // 不良趋势图
const NegativeTrendProportionChart = () =>
  import('@/views/production-time/newComponents/negativeTrendProportionChart.vue') // 不良趋势占比图
const PersonnelOutputChangeTrend = () =>
  import('@/views/production-time/newComponents/personnelOutputChangeTrend.vue') // 人员产出变化趋势图
const ProductionEfficiency = () =>
  import('@/views/production-time/newComponents/productionEfficiency.vue') // 生产效率

const DailyUnqualifiedFluctuationChart = () =>
  import(
    '@/views/quality-kanban-report/components/dailyUnqualifiedFluctuationChart.vue'
  ) // 每日不合格波动图
const PlatonicDistributionOfBadData = () =>
  import(
    '@/views/quality-kanban-report/components/platonicDistributionOfBadData.vue'
  ) // 不良数据柏拉图分布
const SaleTransparency = () =>
  import(
    '@/views/machineProcess/components/saleTransparency.vue'
  ) // 不良数据柏拉图分布
const DowntimeDistribution = () =>
  import('@/views/device-alarm-shutdown-statistics/components/downtimeDistribution.vue')// 停机时长分布
const AlarmDowntimeOfFrequencyStatistics = () =>
  import('@/views/device-alarm-shutdown-statistics/components/alarmDowntimeOfFrequencyStatistics.vue')// 本月告警停机时长/次数统计
const AlarmDowntimeOfOutputStatistics = () =>
  import('@/views/device-alarm-shutdown-statistics/components/alarmDowntimeOfOutputStatistics.vue')// 本月告警停机时长/产量统计

const ProductOrderProcessScreen = () =>
  import('@/views/center/productOrderProcessScreen.vue')// 本月告警停机时长/产量统计

const centerScreenComs = {
  OrderStatistics,
  OrderList,
  InventoryStatistics,
  OrderTrend,
  CapacityAnalysis,
  QualityStabilityAnalysis,
  OrderAnalysis,
  QualityAnalysis,
  AnalysisOfAdverseCauses,
  CenterProduceOpreate,
  CentralOrderOutput,
  CentralOrderOutput3,
  CentralProductionOutput,
  CentralLineTime,
  CentralAssemblyGrid,
  CentralBadProduction,
  CentralWorkshopBadStatistics,
  CentralFaultCharts,
  CentralTotalShow,
  CentralGridOutput,
  CentralOrderList,
  CentralFactoryOee,
  CentralTotalShowAll,
  CentralTotalShowComp,
  CentralTotalShowAll5,
  DeviceContent,
  MainInterfaceData,
  EquipmentParameters,
  EquipmentDiagram,
  DeviceStatus,
  OrderScreen,
  RightChart,
  ProcessFactoryRate,
  ProcessCompletionRate,
  RightAlarmChart,
  projectCompletionWorkOrderRate,
  ProcessAlarmSummary,
  StateList,
  ProcessMain,
  MainFooter,
  OverviewState,
  MainContentAll,
  LineCharts,
  ProductionOee,
  Beat,
  RightTopCount,
  maOverviewState,
  maProductionPlanRate,
  maEquipmentBoardOverView,
  maEquipmentBoardRate,
  maEquipmentBoardSummarize,
  EnergyConsumptionOverview,
  TrendOfGasConsumption,
  TimeIntervalAccount,
  PowerConsumptionList,
  GasConsumptionList,
  PowerAndGasConsumptionCompare,
  PowerAndGasConsumptionShiftCompare,
  TrendOfElectricityConsumption,
  FactoryFirstPassRate,
  GiantWorkStatistics,
  QualityRate,
  FirstWeekQuality,
  LastWeekQuality,
  ProcessWeekQuality,
  FirstDayQuality,
  LastDayQuality,
  ProcessDayQuality,
  GiantPlanSchedule,
  GiantProcessCharts,
  GiantProcessCharts2,
  CurrentDayGiantProcessCharts,
  RoseCharts,
  DistributionOfDefectiveProducts,
  AdverseTrendChart,
  NegativeTrendProportionChart,
  PersonnelOutputChangeTrend,
  ProductionEfficiency,
  DailyUnqualifiedFluctuationChart,
  PlatonicDistributionOfBadData,
  SaleTransparency,
  DowntimeDistribution,
  AlarmDowntimeOfFrequencyStatistics,
  AlarmDowntimeOfOutputStatistics,
  ProductOrderProcessScreen
}
export { CenterScreenList, centerScreenComs }
