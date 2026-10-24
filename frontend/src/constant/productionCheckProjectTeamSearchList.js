const SEARCH_LIST = [
  { name: 'productionInspectionProjectTeamName', type: 'input', queryName: 'teamName' },
  { name: 'createByName', type: 'input' },
  { name: 'updateByName', type: 'input' },
  { name: 'createTime', type: 'timeline', queryTip: ['createStartTime', 'createEndTime'] },
  { name: 'updateTime', type: 'timeline', queryTip: ['updateStartTime', 'updateEndTime'] }
]

export { SEARCH_LIST }
