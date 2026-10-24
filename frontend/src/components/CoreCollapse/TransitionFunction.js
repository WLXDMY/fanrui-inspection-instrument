/*
 * @Author: xqm 13697256625@163.com
 * @Date: 2022-09-16 09:05:57
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-10-12 20:30:10
 * @FilePath: \systemmanagement\src\components\CoreCollapse\TransitionFunction.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function Transition() {
  if (new.target !== Transition) {
    throw new TypeError('Cannot call a class as a function')
  }
}

Transition.CLASS_NAME = 'collapse-transition'
Transition.prototype.beforeEnter = function(el) {
  el.classList.add(Transition.CLASS_NAME)
  el.style.height = 0
}

Transition.prototype.enter = function(el) {
  if (el.scrollHeight !== 0) {
    el.style.height = el.scrollHeight + 'px'
  } else {
    el.style.height = 0
  }
}

Transition.prototype.afterEnter = function(el) {
  el.classList.remove(Transition.CLASS_NAME)

  el.style.height = ''
}

Transition.prototype.beforeLeave = function(el) {
  el.classList.add(Transition.CLASS_NAME)

  el.style.height = el.scrollHeight + 'px'
}

Transition.prototype.leave = function(el) {
  if (el.scrollHeight !== 0) {
    el.style.height = 0
  }
}

Transition.prototype.afterLeave = function(el) {
  el.classList.remove(Transition.CLASS_NAME)

  el.style.height = ''
}

export default Transition

