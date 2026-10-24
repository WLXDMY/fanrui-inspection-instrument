/*
 * @Author: youjuan.hu
 * @Date: 2023-01-13 10:59:08
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @LastEditTime: 2023-01-16 17:21:38
 * @Description: 单品追溯-追溯报告表格查询条件
 */
const LIST = [
  { name: 'productFlowCode', type: 'input' }, // 流水码
  { name: 'typeName', type: 'filter', queryName: 'type' }, // 类型
  { name: 'relationNumber', type: 'input' }, // 生产工单号
  { name: 'productName', type: 'input' }, // 产品名称
  { name: 'productCode', type: 'input' }, // 产品编码
  { name: 'materialCode', type: 'input' }, // 物料码信息
  { name: 'materialName', type: 'input' },
  { name: 'materialNames', type: 'input' },
  { name: 'productOrderNumber', type: 'input' },
  { name: 'startTime', type: 'timeline', queryTip: ['startTime', 'endTime'] } // 投入时间
]

export { LIST }
