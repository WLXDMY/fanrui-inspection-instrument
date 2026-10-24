const SEARCH_LIST = [
  { name: 'receiptCode', type: 'input' },
  { name: 'code', type: 'input' },
  { name: 'name', type: 'input' },
  { name: 'standard', type: 'input' },
  { name: 'stateName', type: 'filter', queryName: 'states' },
  { name: 'receiptTime', type: 'timeline', queryTip: ['receiptStartTime', 'receiptEndTime'] },
  { name: 'approverName', type: 'filter', queryName: 'approver' },
  { name: 'auxiliaryAttr', type: 'dialog', queryName: 'materialSkus' } // 特征参数

]

export { SEARCH_LIST }
