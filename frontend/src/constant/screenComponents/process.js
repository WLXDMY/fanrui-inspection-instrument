/*
 * @Author: shunhua.liang
 * @Date: 2022-05-17 14:07:06
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-05-17 15:21:07
 * @Description:  工艺大屏文件
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

const RightChart = () =>
  import('@/views/screen-list/process/output-statistics.vue') // 产量统计(原生产大屏)
const ProcessFactoryRate = () =>
  import('@/views/screen-list/process/factory-rate.vue') // 工厂OEE&良率
const RightAlarmChart = () =>
  import('@/views/screen-list/process/project-completion-rate.vue') // 计划完成率
const ProcessAlarmSummary = () =>
  import('@/views/screen-list/process/alarm-summary.vue') // 告警汇总
const StateList = () =>
  import('@/views/procurement-oad/components/stateList.vue') // 设备当前状态
const ProcessMain = () => import('@/views/screen-list/process/process-main.vue') // 工艺路线图
const MainFooter = () =>
  import('@/views/procurement-oad/pagesComponent/mainFooter') // 环境信息

const processComponents = {
  RightChart,
  ProcessFactoryRate,
  RightAlarmChart,
  ProcessAlarmSummary,
  StateList,
  ProcessMain,
  MainFooter
}

export { PROCESS, processComponents }
