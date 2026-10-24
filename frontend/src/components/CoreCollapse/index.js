/*
 * @Author: xqm 13697256625@163.com
 * @Date: 2022-09-16 09:06:24
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-09-16 09:11:18
 * @FilePath: \systemmanagement\src\components\CoreCollapse\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './collapse-transition.css'
import Transition from './TransitionFunction'

export default {
  name: 'CoreCollapse',
  functional: true,
  render: function(createElement, context) {
    const data = {
      on: new Transition()
    }
    return createElement('transition', data, context.children)
  }
}
