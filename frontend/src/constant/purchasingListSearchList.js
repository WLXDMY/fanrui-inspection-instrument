const SEARCH_LIST = [
  { name: 'purchaseCode', type: 'input' },
  { name: 'requestCode', type: 'input' },
  { name: 'code', type: 'input' },
  { name: 'name', type: 'input' },
  { name: 'standard', type: 'input' },
  { name: 'supplierCode', type: 'input' },
  { name: 'supplierName', type: 'input' },
  { name: 'projectName', type: 'input' },
  { name: 'buyerNickname', type: 'input', queryName: 'buyerName' },
  { name: 'stateName', type: 'filter', queryName: 'state' },
  { name: 'createTime', type: 'timeline', queryTip: ['startTime', 'endTime'] },
  { name: 'approverName', type: 'filter', queryName: 'approver' },
  { name: 'auxiliaryAttr', type: 'dialog', queryName: 'materialSkus' } // 特征参数
]

export { SEARCH_LIST }
