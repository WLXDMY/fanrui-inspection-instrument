/*
 * @Author: your name
 * @Date: 2021-09-17 15:16:54
 * @LastEditTime: 2021-09-25 10:49:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \master\src\utils\drag.js
 */
// 大屏拖拽js文件
function dragAlarm(box) {
  box.onmousedown = function(e) {
    e.preventDefault()
    var distanceX = e.clientX - box.offsetLeft
    var distanceY = e.clientY - box.offsetTop
    // 记录左上角坐标
    document.onmousemove = function(e) {
      box.style.left = e.clientX - distanceX + 'px'
      box.style.top = e.clientY - distanceY + 'px'
      var x = box.style.left // x坐标
      var y = box.style.top // y坐标
      const positions = {
        left: x,
        top: y
      }
      localStorage.setItem('positions', JSON.stringify(positions))
    }
    document.onmouseup = function() {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}

export { dragAlarm }
