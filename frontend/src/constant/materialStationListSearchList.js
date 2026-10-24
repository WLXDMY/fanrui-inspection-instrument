/*
 * @Author: shunhua.liang
 * @Date: 2022-07-19 17:07:14
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-09-02 18:17:22
 * @Description:
 */

const SEARCH_LIST = [
  { name: 'programName', type: 'input' },
  { name: 'materialName', type: 'input' },
  { name: 'materialCode', type: 'input' },
  { name: 'workOrderNumber', type: 'input' },
  { name: 'deviceModelName', type: 'filter', queryName: 'deviceModelId' }
]
export { SEARCH_LIST }
