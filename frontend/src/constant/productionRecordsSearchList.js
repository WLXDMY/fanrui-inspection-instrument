/*
 * @Author: zhaozhuo
 * @Date: 2022-08-23 11:46:22
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-06-28 09:32:54
 * @Description: ...
 */
const SEARCHLIST = [
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
  { name: 'resourceTeamName', type: 'input' },
  { name: 'resourceDeviceName', type: 'input' },
  { name: 'workCenterTypeName', type: 'input' },
  { name: 'resourceTypeName', type: 'input' },
  // { name: 'productStandard', type: 'input' },
  { name: 'workCenterName', type: 'filter', queryName: 'workCenterId' },
  { name: 'createTime', type: 'timeline', queryTip: ['createTimeStartDate', 'createTimeEndDate'] }
]

export { SEARCHLIST }
