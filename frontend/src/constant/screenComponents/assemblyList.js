/*
 * @Author: shunhua.liang
 * @Date: 2022-05-17 15:47:42
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-15 11:23:58
 * @Description: 人工组装-产线大屏
 */
import { v4 as uuidv4 } from 'uuid'
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
    width: 1883,
    height: 418 * 0.7,
    currentWidth: '1883',
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
  }
]

const assemblyCurrentOrder = () =>
  import('@/views/production-assembly/currentOrder.vue') // 当前工单
const assemblyTodayData = () =>
  import('@/views/production-assembly/todayData.vue') // 今日数据
const assemblyProcessList = () =>
  import('@/views/production-assembly/procedureList.vue') // 工序列表
const assemblyOrderList = () =>
  import('@/views/production-assembly/orderList.vue') // 工单列表
const assemblyOutputEcharts = () =>
  import('@/views/production-assembly/outputEcharts.vue') // 今日小时产出数

const assemblyComponents = {
  assemblyCurrentOrder,
  assemblyTodayData,
  assemblyProcessList,
  assemblyOrderList,
  assemblyOutputEcharts
}

export { ASSEMBLY_LIST, assemblyComponents }
