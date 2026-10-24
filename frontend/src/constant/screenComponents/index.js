/*
 * @Author: shunhua.liang
 * @Date: 2022-05-17 15:50:30
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-06-13 15:11:18
 * @Description: 大屏入口文件
 */

import { DEVICE_SCREEN, deviceComponents } from './deviceScreen.js' // 设备大屏模块
import { NEW_LIST, lineComponents } from './productLine.js' // 产线大屏
import { OVERVIEW_LIST, overviewComponents } from './overviewList.js' // 静置库存看板
import { ASSEMBLY_LIST, assemblyComponents } from './assemblyList.js' // 人工组装-产线大屏
import { CAR_SCREEN_LIST, carComponents } from './carManage.js' // 管理驾驶舱大屏
import { PROCESS, processComponents } from './process.js' // 工艺大屏
import { PRODUCTION, productionComponents } from './production.js' // 生产大屏
import { WORKSHOP_LIST, shopBoardComponents } from './workshopBoard.js' // 车间看板
import { CENTRAL_List, centerComponents } from './centerScreenList.js' // 中央大屏
import { ORDER_SCREEN_LIST, orderComponents } from './orderScreenList.js' // 订单大屏
import { PRODUCTlINE_FAILURE_ANALYSIS, failureAnalysisComponents } from './productLineFailureAnalysis.js' // 产线故障统计分析大屏
import { PRODUCTlINE_COMPARE_ANALYSIS, compareComponents } from './productLineCompareAnalysis.js' // 产线产出对比统计分析大屏
import { VIDEO_MONITOR, videoMonitorComponents } from './videoMonitor.js' // 视频监控
import { EPUIPMENT_OEE, equipmentComponents } from './equipmentOEE.js' // 设备OEE

const ALL_LIST = [
  { name: `工艺大屏(${PROCESS.length})`, list: PROCESS },
  { name: `生产大屏(${PRODUCTION.length})`, list: PRODUCTION },
  { name: `设备大屏(${DEVICE_SCREEN.length})`, list: DEVICE_SCREEN },
  { name: `产线大屏(${NEW_LIST.length})`, list: NEW_LIST },
  { name: `管理驾驶舱(${CAR_SCREEN_LIST.length})`, list: CAR_SCREEN_LIST },
  { name: `静置库存看板(${OVERVIEW_LIST.length})`, list: OVERVIEW_LIST },
  { name: `人工组装-产线大屏(${ASSEMBLY_LIST.length})`, list: ASSEMBLY_LIST },
  { name: `车间看板(${WORKSHOP_LIST.length})`, list: WORKSHOP_LIST },
  { name: `中央大屏(${CENTRAL_List.length})`, list: CENTRAL_List },
  { name: `订单大屏(${ORDER_SCREEN_LIST.length})`, list: ORDER_SCREEN_LIST },
  { name: `产线产出对比统计分析(${PRODUCTlINE_COMPARE_ANALYSIS.length})`, list: PRODUCTlINE_COMPARE_ANALYSIS },
  { name: `产线故障统计分析(${PRODUCTlINE_FAILURE_ANALYSIS.length})`, list: PRODUCTlINE_FAILURE_ANALYSIS },
  { name: `视频监控(${VIDEO_MONITOR.length})`, list: VIDEO_MONITOR },
  { name: `设备OEE${EPUIPMENT_OEE.length})`, list: EPUIPMENT_OEE }
]
const COMPONENT_LIST = {
  ...deviceComponents,
  ...lineComponents,
  ...overviewComponents,
  ...assemblyComponents,
  ...carComponents,
  ...processComponents,
  ...productionComponents,
  ...shopBoardComponents,
  ...centerComponents,
  ...orderComponents,
  ...failureAnalysisComponents,
  ...compareComponents,
  ...videoMonitorComponents,
  ...equipmentComponents
}

export { ALL_LIST, COMPONENT_LIST }
