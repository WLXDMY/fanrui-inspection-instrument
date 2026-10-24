/*
 * @Author: shunhua.liang
 * @Date: 2022-07-19 17:07:14
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-12-21 17:23:05
 * @Description:
 */

const LIST = [
  { name: 'workOrderNumber', type: 'input' }, // 工单编号
  { name: 'workOrderName', type: 'input' }, // 工单名称
  { name: 'state', type: 'filter' }, // 状态
  { name: 'createDate', type: 'timeline', queryTip: ['startTime', 'endTime'] }, // 创建时间
  {
    name: 'updateDate',
    type: 'timeline',
    queryTip: ['updateStartTime', 'updateEndTime']
  }, // 更新时间
  {
    name: 'startDate',
    type: 'timeline',
    queryTip: ['planStartTime', 'planEndTime']
  }, // 计划开始时间
  {
    name: 'actualStartDate',
    type: 'timeline',
    queryTip: ['actualStartTime', 'actualEndTime']
  }, // 实际开始时间
  {
    name: 'endDate',
    type: 'timeline',
    queryTip: ['planCompleteStartTime', 'planCompleteEndTime']
  }, // 计划完成时间
  {
    name: 'actualEndDate',
    type: 'timeline',
    queryTip: ['actualCompleteStartTime', 'actualCompleteEndTime']
  }, // 实际完成时间
  { name: 'lineName', type: 'filter', queryName: 'lineId' }, // 产线
  { name: 'materialCode', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'materialName', type: 'input', queryName: 'name' }, // 物料名称
  { name: 'materialStandard', type: 'input' }, // 物料规格
  { name: 'materialDrawingNumber', type: 'input', queryName: 'drawingNumber' }, // 图号
  { name: 'saleOrderNumber', type: 'input' }, // 销售订单号
  { name: 'productOrderNumber', type: 'input' }, // 生产订单号
  { name: 'executionStatusName', type: 'filter', queryName: 'executionStatus' }, // 工单执行
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }, // 审批状态
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'progress', type: 'filter', queryName: 'completionRate' }, // 完成率
  { name: 'procedureName', type: 'input' }, // 工序名称
  { name: 'workCenterName', type: 'filter', queryName: 'workCenterId' } // 工作中心
]

export { LIST }
