const SEARCH_LIST = [
  { name: 'applicationNum', type: 'input' },
  { name: 'workOrderNumber', type: 'input' },
  { name: 'workOrderName', type: 'input' },
  { name: 'approverName', type: 'filter', queryName: 'approver' },
  { name: 'stateName', type: 'filter', queryName: 'states' },
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' },
  { name: 'planPickingTime', type: 'timeline', queryTip: ['planPickStartTime', 'planPickEndTime'] },
  { name: 'actualPickingTime', type: 'timeline', queryTip: ['actualPickStartTime', 'actualPickEndTime'] }
]

export { SEARCH_LIST }
