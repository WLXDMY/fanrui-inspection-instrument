/**
 *
 * @param {* Array} tHeader  //表格头部名称
 * @param {* Array} filterVal  //表格字段
 * @param {* Array} selectionList  //复选框选择的数据
 * @param {* String} fileName  //导出的文件名
 */
export const exportExcel = (tHeader, filterVal, selectionList, fileName) => {
  let message = ''
  if (!(tHeader instanceof Array)) {
    message = '表格头部名称格式不正确，应是一个字符串数组'
    return {
      isSuccess: false,
      message
    }
  }
  if (!(filterVal instanceof Array)) {
    message = '表格字段格式不正确，应是一个字符串数组'
    return {
      isSuccess: false,
      message
    }
  }
  if (!(selectionList instanceof Array)) {
    message = '表格内容数据格式不正确，应是一个对象数组'
    return {
      isSuccess: false,
      message
    }
  }
  if (typeof fileName !== 'string') {
    message = '导出的文件名格式不正确，应是一个字符串'
    return {
      isSuccess: false,
      message
    }
  }
  require.ensure([], () => {
    const { export_json_to_excel } = require('@/utils/excel/Export2Excel')
    const data = selectionList.map(v => filterVal.map(j => v[j]))
    export_json_to_excel(tHeader, data, fileName)
  })

  return {
    isSuccess: true,
    message
  }
}
