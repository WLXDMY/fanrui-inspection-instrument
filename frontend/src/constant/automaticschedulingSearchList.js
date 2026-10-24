const SEARCH_LIST = [
  { name: 'workOrderNumber', type: 'input' }, // 生产单据号
  { name: 'lineName', type: 'input' }, // 生产单据号
  { name: 'startDate', type: 'timeline', queryTip: ['planStartTime', 'planEndTime'] }, // 计划开始时间
  { name: 'endDate', type: 'timeline', queryTip: ['planCompleteStartTime', 'planCompleteEndTime'] }, // 计划结束时间
  { name: 'materialIsComplete', type: 'filter' }, // 物料是否齐套
  { name: 'workLockStatus', type: 'filter' } // 锁定状态
]

export { SEARCH_LIST }
