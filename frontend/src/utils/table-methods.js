// Table 表中常用到 getSummaries
// 该封装函数主要将表中数字相加显示，如果不是数字就显示空字符
function getSummaries(params) {
  const { columns, data } = params
  // 数据不存在时应该返回一个空数组，避免渲染错误
  if (!data[0]) return []
  // map 头数据，并返回相加后的对应数据
  return columns.map(item => {
    const key = item.property
    if (typeof data[0][key] === 'number') {
      return data.reduce((pre, cur) => pre + cur[key], data[0][key])
    }
    return ''
  })
}

// 根据列配置字段取过滤是否显示汇总数字
function getSummariesFilter(col) {
  return function(params) {
    const { columns, data } = params
    // 数据不存在时应该返回一个空数组，避免渲染错误
    if (!data[0]) return []
    // map 头数据，并返回相加后的对应数据
    return columns.map(item => {
      const key = item.property
      const colItem = col.find(c => c.prop === key)
      if (typeof data[0][key] === 'number' && colItem.summaryType === 'number' && colItem.total) {
        return data.reduce((pre, cur) => pre + cur[key], data[0][key])
      }
      return ''
    })
  }
}

export { getSummaries, getSummariesFilter }
