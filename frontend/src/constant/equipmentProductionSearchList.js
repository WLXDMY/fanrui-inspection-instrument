const DAILYCOL = [
  { name: 'time', type: 'timeline', queryTip: ['startDate', 'endDate'] },
  { name: 'deviceCode', type: 'input' },
  { name: 'deviceName', type: 'input' }
]

const MONTHLYCOL = [
  { name: 'time', type: 'timeline', queryTip: ['startDate', 'endDate'], timeType: 'monthrange' },
  { name: 'deviceCode', type: 'input' },
  { name: 'deviceName', type: 'input' }
]

const SEARCH_LIST = {
  DAILYCOL,
  MONTHLYCOL
}

export default SEARCH_LIST
