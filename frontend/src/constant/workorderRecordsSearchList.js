/*
 * @Author: zhaozhuo
 * @Date: 2022-08-23 11:46:22
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-08-30 14:07:40
 * @Description: ...
 */
const SEARCHLIST = [
  { name: 'operationNumber', type: 'input' },
  { name: 'workOrderNumber', type: 'input' },
  { name: 'state', type: 'filter' },
  { name: 'materialCode', type: 'input' },
  { name: 'materialName', type: 'input' },
  { name: 'craftName', type: 'input' },
  { name: 'lineModelName', type: 'input' },
  { name: 'lineName', type: 'input' },
  { name: 'startDate', type: 'timeline', queryTip: ['startDateStart', 'startDateEnd'] },
  { name: 'endDate', type: 'timeline', queryTip: ['endDateStart', 'endDateEnd'] },
  { name: 'actualStartDate', type: 'timeline', queryTip: ['actualStartDateStart', 'actualStartDateEnd'] },
  { name: 'actualEndDate', type: 'timeline', queryTip: ['actualEndDateStart', 'actualEndDateEnd'] },
  { name: 'orderNumber', type: 'input' },
  { name: 'type', type: 'filter' },
  { name: 'batch', type: 'input' },
  { name: 'vehicleCode', type: 'input' },
  { name: 'shiftType', type: 'input' },
  { name: 'defectDesc', type: 'input' },
  { name: 'reportDate', type: 'timeline', queryTip: ['reportDateStartDate', 'reportDateEndDate'] },
  { name: 'operator', type: 'input' },
  { name: 'userNickname', type: 'input' },
  { name: 'createTime', type: 'timeline', queryTip: ['createTimeStartDate', 'createTimeEndDate'] }
]

export { SEARCHLIST }
