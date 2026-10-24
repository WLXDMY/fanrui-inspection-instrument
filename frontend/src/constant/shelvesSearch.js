/*
 * @Author: shunhua.liang
 * @Date: 2022-11-10 09:38:43
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-11 09:20:09
 * @Description:
 */

const LIST = [
  { name: 'code', type: 'input' }, // 货架编号
  { name: 'name', type: 'input' }, // 货架名称
  { name: 'warehouseCode', type: 'filter' }, // 库房编号
  { name: 'warehouseName', type: 'filter' }, // 库房名称
  { name: 'remark', type: 'input' }, // 备注
  { name: 'state', type: 'filter', queryName: 'states' }, // 状态
  { name: 'deviceCode', type: 'filter' } // 备注
]

export {
  LIST
}
