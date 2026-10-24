/*
 * @Author: limengjuan
 * @Date: 2022-06-07 11:53:01
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-07 11:57:42
 * @Description:订单大屏
 */
import { v4 as uuidv4 } from 'uuid'

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
const orderScreen = () =>
  import('@/views/production-order/index.vue')
const orderComponents = {
  orderScreen
}
export { ORDER_SCREEN_LIST, orderComponents }
