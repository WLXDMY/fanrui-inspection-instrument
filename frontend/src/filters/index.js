/*
 * @Descripttion:
 * @version:
 * @Author: zhangzheng
 * @Date: 2020-12-04 11:31:54
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-01-11 18:51:26
 */
// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
// 告警状态
export function stateFormat(val) {
  if (val === 0) {
    return '待处理'
  }
  if (val === 1) {
    return '处理中'
  }
  if (val === 2) {
    return '已处理'
  }
}

// 时间戳转换为时间
export function dateFilter(data, format = '') {
  if (!data) {
    return '--'
  }
  var dt = new Date(data)
  var y = dt.getFullYear()
  var m = (dt.getMonth() + 1).toString().padStart(2, '0')
  var d = dt.getDate().toString().padStart(2, '0')
  var h = dt.getHours().toString().padStart(2, '0')
  var mm = dt.getMinutes().toString().padStart(2, '0')
  var s = dt.getSeconds().toString().padStart(2, '0')
  if (
    format.toLocaleLowerCase() === 'yyyy-mm-dd' ||
    format.toLocaleLowerCase() === ''
  ) {
    return `${y}-${m}-${d}`
  } else if (format.toLocaleLowerCase() === 'yyyy/mm/dd') {
    return `${y}/${m}/${d}`
  } else if (format.toLocaleLowerCase() === 'yyyy-mm-dd hh:mm:ss') {
    return `${y}-${m}-${d} ${h}:${mm}:${s}`
  } else if (format.toLocaleLowerCase() === 'yyyy/mm/dd hh:mm:ss') {
    return `${y}/${m}/${d} ${h}:${mm}:${s}`
  } else if (format.toLocaleLowerCase() === 'hh:mm:ss') {
    return ` ${h}:${mm}`
  } else {
    return `输入的时间格式有误`
  }
}

