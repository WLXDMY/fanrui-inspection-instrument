/*
 * @Author: limengjuan
 * @Date: 2022-06-07 12:02:58
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-06-15 21:40:00
 * @Description:视频监控
 */
import { v4 as uuidv4 } from 'uuid'

const EPUIPMENT_OEE = [
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

// 设备OEE
const WorkshopEquipmentOEE = () =>
  import('@/views/equipment-OEE/workshop-equipment-OEE/index.vue')
const EquipmentQualificationRate = () =>
  import('@/views/equipment-OEE/equipment-qualification-rate/index.vue')
const EquipmentPower = () =>
  import('@/views/equipment-OEE/equipment-power/index.vue')
const performEffeciency = () =>
  import('@/views/equipment-OEE/performanceEffeciency/index.vue')
const timeEffeciency = () =>
  import('@/views/equipment-OEE/timeEffeciency/index.vue')

const equipmentComponents = {
  WorkshopEquipmentOEE,
  EquipmentQualificationRate,
  EquipmentPower,
  performEffeciency,
  timeEffeciency
}
export { EPUIPMENT_OEE, equipmentComponents }
