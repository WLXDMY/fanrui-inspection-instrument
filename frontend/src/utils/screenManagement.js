/*
 * @Author: your name
 * @Date: 2021-10-19 14:04:25
 * @LastEditTime: 2023-05-15 17:24:23
 * @LastEditors: youjuan.hu
 * @Description: In User Settings Edit
 * @FilePath: \master\src\utils\screenManagement.js
 */
import { v4 as uuidv4 } from 'uuid'

// 制造单元
const PROCESS = [
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/count.png'),
    name: '产量统计',
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
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/process/process.png'),
    name: '工艺路线',
    components: 'ProcessMain',
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
  }
]

// 生产大屏
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
    type: 'production',
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
    type: 'production',
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
    type: 'production',
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
    type: 'production',
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    // 工单挂起数
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
// 设备大屏
const DEVICE_SCREEN = [
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
  }
]
// 奥维斯 产线大屏
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
    type: 'ao',
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
    type: 'ao',
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
    type: 'ao',
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
    type: 'ao',
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
    type: 'ao',
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
    type: 'ao',
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
    type: 'ao',
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
    type: 'ao',
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
    type: 'ao',
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
    address: require('@/assets/images/screenList/ao/bad-rate.png'),
    name: '工位不良数据',
    components: 'AoRightBadStationData',
    width: 400 * 0.7,
    height: 275 * 0.7,
    currentWidth: '400',
    currentHeight: '275',
    imgWidth: '220px',
    imgHeight: '121px',
    type: 'ao',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  },
  {
    // 工单挂起数
    id: uuidv4(),
    address: require('@/assets/images/screenList/production/rightCount.png'),
    name: '历史工单挂起数',
    components: 'RightLineTopCount',
    width: 400 * 0.7,
    height: 65 * 0.7,
    currentWidth: '400',
    currentHeight: '65',
    type: 'AoProductionYield',
    left: 0,
    top: 0,
    flag: true,
    scale: false,
    zIndex: 1
  }
]
// 管理驾驶舱
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

const ASSEMBLY_LIST = [
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
  }
]

// 中央大屏
const CENTRAL_List = [
  {
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
    address: require('@/assets/images/screenList/process/oee.png'),
    name: '工厂OEE&良率',
    components: 'CenterProcessFactoryRate',
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
    address: require('@/assets/images/screenList/central/central-one.gif'),
    name: '产量统计',
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
    name: '统计数',
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
    height: 439 * 0.7,
    currentWidth: '924',
    currentHeight: '439',
    type: 'central',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-six.gif'),
    name: '统计数',
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
  },
  {
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
    type: 'center',
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
    type: 'center',
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
    type: 'center',
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
    type: 'center',
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
    type: 'center',
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
    type: 'center',
    zIndex: 1
  }
]

// 车间看板
const WORKSHOP_LIST = [
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
  }
]

// 订单大屏
const ORDER_SCREEN_LIST = [
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
  }
]

// 视频监控
const VIDEO_MONITOR = [
  {
    id: uuidv4(),
    address: require('@/assets/images/video/smallVideo.png'),
    name: '视频监控',
    components: 'VideoMonitor',
    width: 1920 * 0.7,
    height: 977 * 0.7,
    currentWidth: '1920',
    currentHeight: '977',
    type: 'videoMonitor',
    zIndex: 1
  }
]

// 产线产出对比统计分析大屏
const PRODUCTlINE_COMPARE_ANALYSIS = [
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
  }
]

// 设备OEE
const EQUIPMENT_OEE = [
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
  }
]

// 产线故障统计分析大屏
const PRODUCTlINE_FAILURE_ANALYSIS = [
  {
    id: uuidv4(),
    address: require('@/assets/images/analysis/default.png'),
    name: '产线故障统计分析大屏',
    components: 'failureAnalysis',
    width: 1920 * 0.7,
    height: 977 * 0.7,
    currentWidth: '1920',
    currentHeight: '977',
    type: 'failureAnalysis',
    zIndex: 1
  }
]
const ALL_LIST = [
  { name: `中央大屏(${CENTRAL_List.length})`, list: CENTRAL_List },
  { name: `工艺大屏(${PROCESS.length})`, list: PROCESS },
  { name: `生产大屏(${PRODUCTION.length})`, list: PRODUCTION },
  { name: `设备大屏(${DEVICE_SCREEN.length})`, list: DEVICE_SCREEN },
  { name: `产线大屏(${NEW_LIST.length})`, list: NEW_LIST },
  { name: `管理驾驶舱(${CAR_SCREEN_LIST.length})`, list: CAR_SCREEN_LIST },
  { name: `静置库存看板（${OVERVIEW_LIST.length})`, list: OVERVIEW_LIST },
  { name: `人工组装-产线大屏(${ASSEMBLY_LIST.length})`, list: ASSEMBLY_LIST },
  { name: `车间看板${WORKSHOP_LIST.length})`, list: WORKSHOP_LIST },
  { name: `人工组装-产线大屏${ASSEMBLY_LIST.length})`, list: ASSEMBLY_LIST },
  { name: `车间看板${WORKSHOP_LIST.length})`, list: WORKSHOP_LIST },
  { name: `订单大屏${ORDER_SCREEN_LIST.length})`, list: ORDER_SCREEN_LIST },
  { name: `车间看板${WORKSHOP_LIST.length})`, list: WORKSHOP_LIST },
  { name: `视频监控${VIDEO_MONITOR.length})`, list: VIDEO_MONITOR },
  {
    name: `产线产出对比统计分析大屏${PRODUCTlINE_COMPARE_ANALYSIS.length})`,
    list: PRODUCTlINE_COMPARE_ANALYSIS
  },
  {
    name: `产线故障统计分析大屏${PRODUCTlINE_FAILURE_ANALYSIS.length})`,
    list: PRODUCTlINE_FAILURE_ANALYSIS
  },
  { name: `设备OEE${EQUIPMENT_OEE.length})`, list: EQUIPMENT_OEE }
]

const SCREEN_LIST = [
  { id: 1, name: '工艺大屏', type: 'process' },
  { id: 2, name: '生产大屏', type: 'production' },
  { id: 3, name: '设备大屏', type: 'device' },
  { id: 4, name: '管理驾驶舱', type: 'carScreen' },
  { id: 5, name: '静置库存看板', type: 'inventory' },
  { id: 6, name: '康居人大屏', type: 'assembly' },
  { id: 8, name: '车间看板', type: 'workshop' },
  { id: 9, name: '视频监控', type: 'videoMonitor' },
  { id: 10, name: '产线产出对比统计分析大屏', type: 'compareAnalysis' },
  { id: 11, name: '产线故障统计分析大屏', type: 'failureAnalysis' },
  { id: 12, name: '设备OEE', type: 'equipmentOEE' }
]
// 不参与层级的组件
const OTHER_COMPONENTS = [
  'ProcessMain',
  'orchidProcessMain',
  'beautyProcessMain',
  'oilProcessMain'
]
// 按需加载的组件列表(制造单元)
const StateList = () =>
  import('@/views/procurement-oad/components/stateList.vue') // 设备当前状态
const RightChart = () =>
  import('@/views/screen-list/process/output-statistics.vue') // 产量统计(原生产大屏)
const ProcessFactoryRate = () =>
  import('@/views/screen-list/process/factory-rate.vue')
const RightAlarmChart = () =>
  import('@/views/screen-list/process/project-completion-rate.vue')
const ProcessAlarmSummary = () =>
  import('@/views/screen-list/process/alarm-summary.vue')
const MainFooter = () =>
  import('@/views/procurement-oad/pagesComponent/mainFooter') // 环境信息
const ProcessMain = () => import('@/views/screen-list/process/process-main.vue')

const CurrentCapacity = () =>
  import('@/views/procurement-oad/components/currentCapacity.vue') // 当天产能信息
const orchidProcessMain = () =>
  import('@/views/screen-list/process/orchidMain.vue')
const oilProcessMain = () => import('@/views/screen-list/process/oilMain.vue')
const beautyProcessMain = () =>
  import('@/views/screen-list/process/pulcherMain.vue') // 至美工艺图
const Beat = () => import('@/views/screen-list/real-time-beat.vue')
const LineCharts = () => import('@/views/screen-list/output-statistics.vue')
const OverviewState = () =>
  import('@/views/production-time/newComponents/overviewState.vue') // 状态总览
const MainContentAll = () =>
  import('@/views/production-time/newComponents/newProductionContent.vue') // 生产计划与进度
const ProductionOee = () => import('@/views/screen-list/oee-yield.vue')
const RightTopCount = () =>
  import('@/views/production-time/newComponents/rightTopHistoryCount.vue') // 历史工单挂起数
// 奥维斯大屏
const AoWorkOrderNote = () =>
  import('@/views/production-line/newComponents/workOrderNote.vue')
const AoProductionYield = () =>
  import('@/views/production-line/newComponents/productionYield.vue')
const AoProductionInputYield = () =>
  import('@/views/production-line/newComponents/productionInputYield.vue') // 投产 产量 良率
const AoTodayInputOutputInfo = () =>
  import('@/views/production-line/newComponents/todayInputOutputInfo.vue')
const AoRightFinishedProductMaintenance = () =>
  import(
    '@/views/production-line/newComponents/rightFinishedProductMaintenance.vue'
  )
const AoRightSemiFinishedProductMaintenance = () =>
  import(
    '@/views/production-line/newComponents/rightSemiFinishedProductMaintenance.vue'
  )
const AoRightSemiFinishedProductTop = () =>
  import(
    '@/views/production-line/newComponents/rightSemiFinishedProductTop.vue'
  )
const AoNewProductionContent = () =>
  import('@/views/production-line/newComponents/newProductionContent.vue')
const AoRightAlarmList = () =>
  import('@/views/production-line/newComponents/rightAlarm.vue')
const AoOverviewState = () =>
  import('@/views/production-line/newComponents/overviewState.vue')

// 设备大屏
const DeviceContent = () =>
  import('@/views/device-module-screen/components/deviceContent.vue')
const AoRightBadStationData = () =>
  import('@/views/production-line/newComponents/rightBadStationData.vue')
// 管理驾驶舱产线大屏
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
const RightLineTopCount = () =>
  // 历史工单挂起数
  import('@/views/production-line/newComponents/rightTopHistoryCount.vue')
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

// 康居人
const assemblyCurrentOrder = () =>
  import('@/views/production-assembly/currentOrder.vue')
const assemblyTodayData = () =>
  import('@/views/production-assembly/todayData.vue')
const assemblyProcessList = () =>
  import('@/views/production-assembly/procedureList.vue')
const assemblyOrderList = () =>
  import('@/views/production-assembly/orderList.vue')
const assemblyOutputEcharts = () =>
  import('@/views/production-assembly/outputEcharts.vue')
const complianceRate = () =>
  import('@/views/production-assembly/complianceRate.vue')
// 中央大屏
const CenterProduceOpreate = () =>
  import('@/views/screen-list/process/process-main.vue')
const CenterProcessFactoryRate = () =>
  import('@/views/screen-list/process/factory-rate.vue')
const ProcessCompletionRate = () =>
  import('@/views/screen-list/process/workshop-rate.vue') // 车间OEE&完成率

const CentralOrderOutput = () =>
  import('@/views/production-central/central-order-output.vue')
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
const CentralTotalShowAll5 = () =>
  import('@/views/production-central/central-total-show-all5.vue')
// 康居人大屏
const GiantWorkStatistics = () =>
  import('@/views/production-giant/work-statistics') // 统计数

const DailyUnqualifiedFluctuationChart = () =>
  import(
    '@/views/quality-kanban-report/components/dailyUnqualifiedFluctuationChart.vue'
  ) // 每日不合格波动图
const PlatonicDistributionOfBadData = () =>
  import(
    '@/views/quality-kanban-report/components/platonicDistributionOfBadData.vue'
  ) // 不良数据柏拉图分布

const DowntimeDistribution = () =>
  import('@/views/device-alarm-shutdown-statistics/components/downtimeDistribution.vue')// 停机时长分布
const AlarmDowntimeOfFrequencyStatistics = () =>
  import('@/views/device-alarm-shutdown-statistics/components/alarmDowntimeOfFrequencyStatistics.vue')// 本月告警停机时长/次数统计
const AlarmDowntimeOfOutputStatistics = () =>
  import('@/views/device-alarm-shutdown-statistics/components/alarmDowntimeOfOutputStatistics.vue')// 本月告警停机时长/产量统计

// 车间看板
const TodayDate = () => import('@/views/workshop-board/todayDate.vue') // 今日数据
const RightDateList = () => import('@/views/workshop-board/rightDateList.vue')
const LeftproductLinePlan = () =>
  import('@/views/workshop-board/leftproductLinePlan.vue') // 左侧产线计划
const CenterCompare = () => import('@/views/workshop-board/centerCompare.vue') // 中间良率对比

// 视频监控
const VideoMonitor = () => import('@/views/video-monitoring/index.vue')
// 产线产出对比统计分析大屏
const CompareAnalysis = () =>
  import('@/views/production-line-comparison/index.vue')
// 产线故障统计分析大屏
const FailureAnalysis = () =>
  import('@/views/production-failure-analysis/index.vue')

// 订单大屏
const OrderScreen = () => import('@/views/production-order/index.vue')

// 设备OEE
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
// 组件列表的list
const COMPONENT_LIST = {
  Beat,
  StateList,
  // LineCharts,
  MainFooter,
  ProcessMain,
  CurrentCapacity,
  orchidProcessMain,
  oilProcessMain,
  beautyProcessMain,
  RightChart,
  OverviewState,
  MainContentAll,
  RightAlarmChart,
  RightTopCount,
  AoWorkOrderNote,
  AoProductionYield,
  AoProductionInputYield,
  AoTodayInputOutputInfo,
  AoRightFinishedProductMaintenance,
  AoRightSemiFinishedProductMaintenance,
  AoNewProductionContent,
  DeviceContent,
  AoRightAlarmList,
  AoOverviewState,
  AoRightBadStationData,
  LineCharts,
  ProductionOee,
  ProcessFactoryRate,
  ProcessAlarmSummary,
  OrderStatistics,
  OrderList,
  InventoryStatistics,
  OrderTrend,
  CapacityAnalysis,
  QualityStabilityAnalysis,
  OrderAnalysis,
  QualityAnalysis,
  AnalysisOfAdverseCauses,
  AoRightSemiFinishedProductTop,
  RightLineTopCount,
  // moProcessMain
  Overview,
  Storage,
  TopDuration,
  TopLibrary,
  TopMinProduct,
  TimeLibrary,
  DailyTrend,
  assemblyCurrentOrder,
  assemblyTodayData,
  assemblyProcessList,
  assemblyOrderList,
  assemblyOutputEcharts,
  complianceRate,
  TodayDate,
  RightDateList,
  LeftproductLinePlan,
  CenterCompare,
  VideoMonitor,
  CompareAnalysis,
  FailureAnalysis,
  // 中央大屏
  CenterProcessFactoryRate,
  ProcessCompletionRate,
  CentralOrderOutput,
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
  GiantWorkStatistics,
  CentralTotalShowAll5,
  CenterProduceOpreate,

  // 订单大屏
  OrderScreen,
  // 设备OEE
  WorkshopEquipmentOEE,
  EquipmentQualificationRate,
  timeEffeciency,
  performEffeciency,
  EquipmentPower,
  DailyUnqualifiedFluctuationChart,
  PlatonicDistributionOfBadData,
  DowntimeDistribution,
  AlarmDowntimeOfFrequencyStatistics,
  AlarmDowntimeOfOutputStatistics
}
export {
  PROCESS,
  PRODUCTION,
  SCREEN_LIST,
  DEVICE_SCREEN,
  NEW_LIST,
  ALL_LIST,
  // 组件列表
  COMPONENT_LIST,
  OTHER_COMPONENTS
}
