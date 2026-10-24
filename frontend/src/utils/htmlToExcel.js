import FileSaver from 'file-saver'
import XLSX from 'xlsx'
const htmlToExcel = {
  getExcel(id, title) {
    var reportTitle = title + '.xlsx' // 导出表格名称
    var fix = document.querySelector('.el-table__fixed') // 固定列
    var wb
    var xlsxParam = { raw: true } // 转换成excel时，使用原始的格式 日期不会变成xxx
    if (fix) {
      // 判断导出的节点中是否有fixed的固定列表格，转换为excel时要先去掉该dom节点，然后再append回去
      wb = XLSX.utils.table_to_book( // （若存在固定列会重复两遍导出）
        document.querySelector(id).removeChild(fix),
        xlsxParam
      )
      document.querySelector(id).appendChild(fix)
    } else {
      wb = XLSX.utils.table_to_book(document.querySelector(id), xlsxParam)
    }
    var wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array'
    })
    try {
      FileSaver.saveAs(
        new Blob([wbout], {
          type: 'application/octet-stream'
        }),
        reportTitle
      )
    } catch (e) {
      if (typeof console !== 'undefined') console.log(e, wbout)
    }
    return wbout
  }
}
export default htmlToExcel
