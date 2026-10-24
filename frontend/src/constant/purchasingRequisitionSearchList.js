/*
 * @Author: shunhua.liang
 * @Date: 2022-07-19 17:07:14
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-08-12 20:38:51
 * @Description:
 */

const LIST = [
  { name: 'requestNum', type: 'input' }, // 采购需求单
  { name: 'orderNum', type: 'input' }, // 单据编号
  { name: 'materialCode', type: 'input' }, // 物料编码
  { name: 'materialName', type: 'input' }, // 物料名称
  { name: 'materialStandard', type: 'input' }, // 物料规格
  { name: 'createByNickname', type: 'input' }, // 创建人
  { name: 'stateName', type: 'filter', queryName: 'state' }, // 状态
  {
    name: 'createTime',
    type: 'timeline',
    queryTip: ['createStartTime', 'createEndTime']
  }, // 创建时间
  {
    name: 'updateTime',
    type: 'timeline',
    queryTip: ['updateStartTime', 'updateEndTime']
  } // 修改时间
]

export { LIST }
