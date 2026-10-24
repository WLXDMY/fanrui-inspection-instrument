/*
 * @Author: shunhua.liang
 * @Date: 2022-07-19 17:07:14
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-09-02 18:17:22
 * @Description:
 */

const LIST = [
  { name: 'code', type: 'input' }, // 物料编码
  { name: 'name', type: 'input' }, // 物料名称
  { name: 'drawingNumber', type: 'input' }, // 图号
  { name: 'standard', type: 'input' }, // 物料规格
  { name: 'typeName', type: 'filter', queryName: 'types' }, // 物料类型
  { name: 'sortName', type: 'filter', queryName: 'sorts' }, // 物料分类
  { name: 'comp', type: 'input' }, // 单位
  { name: 'version', type: 'input' }, // 版本
  { name: 'remark', type: 'input' }, // 备注
  { name: 'materialPrice', type: 'input' }, // 物料单价
  { name: 'loseRate', type: 'input' }, // 损耗率
  { name: 'rawMaterial', type: 'input' } // 材质
]
export { LIST }
