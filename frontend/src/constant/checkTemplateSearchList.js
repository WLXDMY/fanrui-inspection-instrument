/*
 * @Author: zhaozhuo
 * @Date: 2022-09-19 17:53:53
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-06 18:11:49
 * @Description: ...
 */
const LIST = [
  { name: 'qualityInspectionSchemeName', type: 'input', queryName: 'schemeName' },
  { name: 'stateName', type: 'filter', queryName: 'states' },
  { name: 'typeName', type: 'filter', queryName: 'types' },
  { name: 'materialCode', type: 'input' },
  { name: 'materialName', type: 'input' },
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' },
  { name: 'remark', type: 'input' },
  { name: 'createByName', type: 'filter', queryName: 'createBy' },
  { name: 'createTime', type: 'timeline', queryTip: ['createStart', 'createEnd'] },
  { name: 'updateByName', type: 'filter', queryName: 'updateBy' },
  { name: 'updateTime', type: 'timeline', queryTip: ['updateStart', 'updateEnd'] }
]

export { LIST }
