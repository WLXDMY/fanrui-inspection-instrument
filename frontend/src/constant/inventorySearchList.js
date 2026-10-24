/*
 * @Author: shunhua.liang
 * @Date: 2022-08-16 10:00:59
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-08-23 16:45:21
 * @Description:
 */
/**
 * 库存盘点
 */
const LIST = [
  { name: 'warehouseName', type: 'filter', queryName: 'warehouseId' }, // 所属库房
  { name: 'materialCode', type: 'input', queryName: 'code' }, // 物料编码
  { name: 'materialName', type: 'input', queryName: 'name' }, // 物料名称
  { name: 'materialStandard', type: 'input', queryName: 'standard' } // 物料规格
]
export { LIST }
