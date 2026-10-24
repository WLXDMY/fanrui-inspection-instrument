/*
 * @Author: zhaozhuo
 * @Date: 2022-09-19 17:53:53
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-11-02 18:17:31
 * @Description: ...
 */
const LIST = [
  { name: 'inspectionSheetCode', type: 'input' },
  { name: 'inspectionSheetTypeName', type: 'filter', queryName: 'inspectionSheetType' },
  { name: 'materialName', type: 'input' },
  { name: 'materialCode', type: 'input' },
  { name: 'inspectionItemName', type: 'input' },
  { name: 'inspectionItemGroupName', type: 'input' },
  { name: 'standardResult', type: 'filter', queryName: 'result' },
  { name: 'documentTypeName', type: 'filter', queryName: 'documentType' },
  { name: 'workOrderNumber', type: 'input' },
  { name: 'barCode', type: 'input' },
  { name: 'defectNames', type: 'input', queryName: 'defectName' },
  { name: 'testTime', type: 'timeline', queryTip: ['finishedStartTime', 'finishedEndTime'] },
  { name: 'supplierCode', type: 'input' },
  { name: 'supplierName', type: 'input' },
  { name: 'customerCode', type: 'input' },
  { name: 'customerName', type: 'input' }
]

export { LIST }
