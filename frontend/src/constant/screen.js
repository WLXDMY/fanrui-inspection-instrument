/*
 * @Author: shunhua.liang
 * @Date: 2022-05-30 14:06:23
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-09-05 09:51:30
 * @Description:
 */
const SCREEN = [
  { appType: 'PRODUCT_LINE_SCREEN', field: 'line_ids', query: 'lineId' },
  { appType: 'PRODUCT_LINE_GROUP_SCREEN', field: 'grid_ids', query: 'lineId' },
  { appType: 'PRODUCT_LINE_FAULT_ANALYZE', field: 'line_ids', query: 'lineId' },
  { appType: 'PRODUCT_LINE_OUTPUT_COMPARED', field: 'grid_ids', query: 'lineId' },
  { appType: 'PRODUCT_LINE_OUTPUT_COMPARED', field: 'line_ids', query: 'lineId' },
  { appType: 'CENTER_SCREEN', field: null, query: null },
  { appType: 'PRODUCT_LINE_TYPE_SCREEN', field: 'line_type_ids', query: 'lineTypeId' }
]

export { SCREEN }
