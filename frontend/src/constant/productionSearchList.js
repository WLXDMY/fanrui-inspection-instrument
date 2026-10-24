const DAILYCOL = [
  { name: 'timeRange', type: 'timeline', queryTip: ['startTime', 'endTime'] },
  { name: 'workOrderNumber', type: 'input' },
  { name: 'materialCode', type: 'input' },
  { name: 'materialName', type: 'input' },
  { name: 'materialStandard', type: 'input' },
  { name: 'gridName', type: 'input' },
  { name: 'workCenterName', type: 'input' },
  { name: 'productionBasicUnit', type: 'input' },
  { name: 'saleOrderNumber', type: 'input' },
  { name: 'productOrderNumber', type: 'input' },
  { name: 'customerCode', type: 'input' },
  { name: 'customerName', type: 'input' }
]
const WEEKLYCOL = [
  { name: 'timeRange', type: 'timeline', queryTip: ['startTime', 'endTime'] },
  { name: 'workOrderNumber', type: 'input' },
  { name: 'materialCode', type: 'input' },
  { name: 'materialName', type: 'input' },
  { name: 'materialStandard', type: 'input' },
  { name: 'gridName', type: 'input' },
  { name: 'workCenterName', type: 'input' },
  { name: 'productionBasicUnit', type: 'input' },
  { name: 'saleOrderNumber', type: 'input' },
  { name: 'productOrderNumber', type: 'input' },
  { name: 'customerCode', type: 'input' },
  { name: 'customerName', type: 'input' }
]
const MONTHLYCOL = [
  { name: 'timeRange', type: 'timeline', queryTip: ['startTime', 'endTime'], timeType: 'monthrange' },
  { name: 'workOrderNumber', type: 'input' },
  { name: 'materialCode', type: 'input' },
  { name: 'materialName', type: 'input' },
  { name: 'materialStandard', type: 'input' },
  { name: 'gridName', type: 'input' },
  { name: 'workCenterName', type: 'input' },
  { name: 'productionBasicUnit', type: 'input' },
  { name: 'saleOrderNumber', type: 'input' },
  { name: 'productOrderNumber', type: 'input' },
  { name: 'customerCode', type: 'input' },
  { name: 'customerName', type: 'input' }
]

const SEARCH_LIST = {
  DAILYCOL,
  WEEKLYCOL,
  MONTHLYCOL
}

export default SEARCH_LIST

