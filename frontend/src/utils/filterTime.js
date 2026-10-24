/*
 * @Author: limengjuan
 * @Date: 2022-04-19 12:03:51
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-04-19 14:46:06
 * @Description:
 */
// 年月日时分秒全部显示
function timeFormatAll(str) {
  const timestamp = new Date(str).getTime()
  const time = new Date(timestamp)
  const y = time.getFullYear()
  const m =
    time.getMonth() + 1 < 10
      ? '0' + (time.getMonth() + 1)
      : time.getMonth() + 1
  const d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  const h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  const mm =
    time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  const s =
    time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
}
// 年月日
function handleYearMonthDate(str) {
  const timestamp = new Date(str).getTime()
  const time = new Date(timestamp)
  const y = time.getFullYear()
  const m =
    time.getMonth() + 1 < 10
      ? '0' + (time.getMonth() + 1)
      : time.getMonth() + 1
  const d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  return y + '-' + m + '-' + d
}
// 时分秒
function handleHoursMinSec(str) {
  const timestamp = new Date(str).getTime()
  const time = new Date(timestamp)
  const h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  const mm =
    time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  const s =
    time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  return h + ':' + mm + ':' + s
}
export { timeFormatAll, handleYearMonthDate, handleHoursMinSec }
