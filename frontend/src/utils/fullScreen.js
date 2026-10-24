export function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    // IE11
    element.msRequestFullscreen()
  }
}

export function quitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}
// 监听按键
export function listenerFullScreenKeyDown(event) {
  if (event.keyCode === 122) { // 当触发F11时
    event.preventDefault() || (event.returnValue = false)
    const el = document.documentElement
    if (document.fullscreenElement === null) {
      openFullscreen(el)
    } else {
      quitFullscreen()
    }
  } else if (event.keyCode === 27) {
    if (document.fullscreenElement !== null) {
      quitFullscreen()
    }
  }
}
