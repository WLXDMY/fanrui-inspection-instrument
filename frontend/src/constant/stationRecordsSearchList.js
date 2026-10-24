/*
 * @Author: youjuan.hu
 * @Date: 2023-01-13 10:07:24
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @LastEditTime: 2023-01-16 17:25:00
 * @Description:单品追溯-过站记录表格查询条件
 */
const LIST = [
  { name: 'productFlowCode', type: 'input' }, // 流水码
  { name: 'relationNumber', type: 'input' }, // 生产工单号
  { name: 'typeName', type: 'filter', queryName: 'type' }, // 类型
  { name: 'materialName', type: 'input' }, // 物料名称
  { name: 'materialCode', type: 'input' }, // 物料编码
  { name: 'lineName', type: 'filter', queryName: 'lineId' }, // 制造单元名称
  { name: 'facName', type: 'filter', queryName: 'facId' }, // 工位名称
  { name: 'produreName', type: 'input' }, // 工序名称
  { name: 'productOrderNumber', type: 'input' }, // 工序名称
  { name: 'reportTime', type: 'timeline', queryTip: ['startTime', 'endTime'] } // 上报时间
]

export { LIST }
