/*
 * @Author: limengjuan
 * @Date: 2022-06-07 11:42:48
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-06-08 18:44:49
 * @Description:中央大屏
 */
import { v4 as uuidv4 } from 'uuid'
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
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/central/central-four.gif'),
    name: '统计数',
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
    name: '统计数',
    components: 'CentralTotalShowComp',
    width: 924 * 0.7,
    height: 277 * 0.7,
    currentWidth: '924',
    currentHeight: '277',
    type: 'central',
    zIndex: 1
  }
]
const CenterProduceOpreate = () =>
  import('@/views/screen-list/process/process-main.vue')
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

const centerComponents = {
  CentralOrderOutput,
  CentralProductionOutput,
  CentralLineTime,
  CentralAssemblyGrid,
  CentralBadProduction,
  CentralFaultCharts,
  CentralTotalShow,
  CentralGridOutput,
  CentralOrderList,
  CentralFactoryOee,
  CenterProduceOpreate,
  CentralTotalShowAll,
  CentralTotalShowComp
}
export { CENTRAL_List, centerComponents }
