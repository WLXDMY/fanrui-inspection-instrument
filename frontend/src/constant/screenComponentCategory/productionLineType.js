/*
 * @Author:xuqiuming
 * @Date: 2022-06-10 10:30
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-09-02 14:30:38
 * @Description: 车间大屏
 */

import { v4 as uuidv4 } from 'uuid'
const ProductionLineTypeList = [
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/machiningWorkshop/overviewOfDataOfTheDay.png'),
    name: '当天数据总览',
    components: 'OverviewOfDataOfTheDay',
    width: 1526 * 0.7,
    height: 198 * 0.7,
    currentWidth: '1526',
    currentHeight: '198',
    type: 'MachiningWorkshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/machiningWorkshop/equipmentProductionInformation.png'),
    name: '设备生产信息',
    components: 'EquipmentProductionInformation',
    width: 1172 * 0.7,
    height: 713 * 0.7,
    currentWidth: '1172',
    currentHeight: '713',
    type: 'MachiningWorkshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/machiningWorkshop/personnelOutput.png'),
    name: '人员产出',
    components: 'PersonnelOutput',
    width: 342 * 0.7,
    height: 198 * 0.7,
    currentWidth: '342',
    currentHeight: '198',
    type: 'MachiningWorkshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/machiningWorkshop/lastOperationFlowTimeout.png'),
    name: '上工序流转超时',
    components: 'LastOperationFlowTimeout',
    width: 341 * 0.7,
    height: 348 * 0.7,
    currentWidth: '341',
    currentHeight: '348',
    type: 'MachiningWorkshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/machiningWorkshop/thePreviousProcessCanBeTransferred.png'),
    name: '上工序可流转',
    components: 'ThePreviousProcessCanBeTransferred',
    width: 341 * 0.7,
    height: 348 * 0.7,
    currentWidth: '341',
    currentHeight: '348',
    type: 'MachiningWorkshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/machiningWorkshop/nextOperationFlowTimeout.png'),
    name: '下工序流转超时',
    components: 'NextOperationFlowTimeout',
    width: 341 * 0.7,
    height: 348 * 0.7,
    currentWidth: '341',
    currentHeight: '348',
    type: 'MachiningWorkshop',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/screenList/machiningWorkshop/nextProcedureCanBeTransferred.png'),
    name: '下工序可流转',
    components: 'NextProcedureCanBeTransferred',
    width: 341 * 0.7,
    height: 348 * 0.7,
    currentWidth: '341',
    currentHeight: '348',
    type: 'MachiningWorkshop',
    zIndex: 1
  }
]
const OverviewOfDataOfTheDay = () => import('@/views/machiningWorkshop/overviewOfDataOfTheDay/index.vue')
const EquipmentProductionInformation = () => import('@/views/machiningWorkshop/equipmentProductionInformation/index.vue')
const PersonnelOutput = () => import('@/views/machiningWorkshop/personnelOutput/index.vue')
const LastOperationFlowTimeout = () => import('@/views/machiningWorkshop/lastOperationFlowTimeout/index.vue')
const ThePreviousProcessCanBeTransferred = () => import('@/views/machiningWorkshop/thePreviousProcessCanBeTransferred/index.vue')
const NextOperationFlowTimeout = () => import('@/views/machiningWorkshop/nextOperationFlowTimeout/index.vue')
const NextProcedureCanBeTransferred = () => import('@/views/machiningWorkshop/nextProcedureCanBeTransferred/index.vue')

const productionLineTypeComs = {
  OverviewOfDataOfTheDay,
  EquipmentProductionInformation,
  PersonnelOutput,
  LastOperationFlowTimeout,
  ThePreviousProcessCanBeTransferred,
  NextOperationFlowTimeout,
  NextProcedureCanBeTransferred
}

export { ProductionLineTypeList, productionLineTypeComs }
