/*
 * @Author: shunhua.liang
 * @Date: 2022-05-17 15:28:34
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-07 10:57:28
 * @Description: 设备大屏
 */
import { v4 as uuidv4 } from 'uuid'
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

// 设备大屏
const DeviceContent = () =>
  import('@/views/device-module-screen/components/deviceContent.vue')

const deviceComponents = {
  DeviceContent
}

export { DEVICE_SCREEN, deviceComponents }
