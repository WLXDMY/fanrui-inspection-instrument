/*
 * @Author: shunhua.liang
 * @Date: 2023-02-11 14:36:10
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @LastEditTime: 2023-02-22 18:14:12
 * @FilePath: \micro-app\main\src\subApp.js
 */
const {
  VUE_APP_SUB_WAREHOUSE_ENTRY
} = process.env

const config = [
  {
    name: 'warehouse',
    entry: VUE_APP_SUB_WAREHOUSE_ENTRY,
    container: '#warehouse',
    activeRule: '/system',
    props: {
      routeInfo: {}
    }
  }
]
export { config }
