const SEARCH_LIST = [
  { name: 'name', type: 'input' },
  { name: 'stateName', type: 'filter', queryName: 'states' },
  { name: 'productLine', type: 'filter' },
  { name: 'createByName', type: 'input', queryName: 'createBy' },
  { name: 'createTime', type: 'timeline', queryTip: ['createStartTime', 'createEndTime'] },
  { name: 'updateByName', type: 'input', queryName: 'updateBy' },
  { name: 'updateTime', type: 'timeline', queryTip: ['updateStartTime', 'updateEndTime'] },
  { name: 'approvalName', type: 'filter', queryName: 'approval' },
  { name: 'approvalTime', type: 'timeline', queryTip: ['startApprovalTime', 'endApprovalTime'] },
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }
]

export { SEARCH_LIST }
