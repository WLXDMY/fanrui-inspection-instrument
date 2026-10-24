/*
 * @Author: shunhua.liang
 * @Date: 2022-11-15 14:37:27
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-15 15:27:07
 * @Description: 搜索
 */

const LIST = [
  { name: 'warehouseCode', type: 'input' }, // 库房编号
  { name: 'warehouseName', type: 'input' }, // 库房名称
  { name: 'warehouseTypeName', type: 'filter', queryName: 'warehouseType' }, // 库房类型
  { name: 'teamNames', type: 'filter', queryName: 'teamId' },
  { name: 'location', type: 'input' },
  { name: 'state', type: 'filter', queryName: 'states' }, // 状态
  { name: 'warehouseDesc', type: 'input' } // 备注
]

export {
  LIST
}
