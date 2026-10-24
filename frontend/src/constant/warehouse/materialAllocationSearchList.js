/*
 * @Author: shunhua.liang
 * @Date: 2022-09-07 09:29:30
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-28 12:00:53
 * @Description:
 */
/**
 * 调拨单
 */
const LIST = [
  { name: 'outWarehouseName', type: 'filter', queryName: 'outWarehouseName' }, // 调出仓库名称
  { name: 'inWarehouseName', type: 'filter', queryName: 'inWarehouseName' }, // 调入仓库名称
  { name: 'code', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'name', type: 'input', queryName: 'name' }, // 物料名称
  { name: 'materialStandard', type: 'input', queryName: 'standard' }, // 物料规格
  { name: 'approver', type: 'filter', queryName: 'approver' }, // 审批人
  {
    name: 'actualTime',
    type: 'timeline',
    queryTip: ['startTime', 'endTime']
  } // 调拨日期
]
export { LIST }
