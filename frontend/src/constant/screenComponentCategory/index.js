/*
 * @Author: zhaozhuo
 * @Date: 2022-08-29 09:22:14
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-09-02 14:32:00
 * @Description: ...
 */
import { CenterScreenList, centerScreenComs } from './center'
import { ProductionLineList, productionLineComs } from './productionLine'
import { ProductionLineGroupList, productionLineGroupComs } from './productionLineGroup'
import { VideoMonitorList, videoMonitorComs } from './videoMonitor'
import { WarehouseList, warehouseComs } from './warehouse'
import { ProductionLineTypeList, productionLineTypeComs } from './productionLineType'

export const ALL_LIST = [
  { name: `中央大屏(${CenterScreenList.length})`, miniProgramType: 'CENTER_SCREEN', list: CenterScreenList },
  { name: `产线大屏(${ProductionLineList.length})`, miniProgramType: 'PRODUCT_LINE_SCREEN', list: ProductionLineList },
  { name: `车间大屏(${ProductionLineGroupList.length})`, miniProgramType: 'PRODUCT_LINE_GROUP_SCREEN', list: ProductionLineGroupList },
  { name: `视频监控(${VideoMonitorList.length})`, miniProgramType: 'VIDEO_SURVEILLANCE', list: VideoMonitorList },
  { name: `仓储大屏(${WarehouseList.length})`, miniProgramType: 'WAREHOUSE_SCREEN', list: WarehouseList },
  { name: `制造单元类型大屏(${ProductionLineTypeList.length})`, miniProgramType: 'PRODUCT_LINE_TYPE_SCREEN', list: ProductionLineTypeList }
]

export const COMPONENT_LIST = {
  ...centerScreenComs,
  ...productionLineComs,
  ...productionLineGroupComs,
  ...videoMonitorComs,
  ...warehouseComs,
  ...productionLineTypeComs
}
