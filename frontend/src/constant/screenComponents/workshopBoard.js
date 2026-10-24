/*
 * @Author: limengjuan
 * @Date: 2022-06-07 09:51:20
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-07 10:00:30
 * @Description:车间看板
 */
import { v4 as uuidv4 } from 'uuid'
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
// 车间看板
const TodayDate = () =>
  import('@/views/workshop-board/todayDate.vue')// 今日数据
const RightDateList = () =>
  import('@/views/workshop-board/rightDateList.vue')
const LeftproductLinePlan = () =>
  import('@/views/workshop-board/leftproductLinePlan.vue')// 左侧产线计划
const CenterCompare = () =>
  import('@/views/workshop-board/centerCompare.vue')// 中间良率对比
const shopBoardComponents = {
  TodayDate,
  RightDateList,
  LeftproductLinePlan,
  CenterCompare
}
export { WORKSHOP_LIST, shopBoardComponents }
