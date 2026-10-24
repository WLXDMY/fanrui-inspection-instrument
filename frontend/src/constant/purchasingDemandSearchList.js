/*
 * @Author: shunhua.liang
 * @Date: 2022-07-19 17:07:14
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-03-13 11:22:31
 * @Description:
 */

const LIST = [
  { name: 'requestNum', type: 'input' }, // 采购需求单
  { name: 'orderNum', type: 'input' }, // 单据编号
  { name: 'code', type: 'input' }, // 物料编码
  { name: 'name', type: 'input' }, // 物料名称
  { name: 'materialStandard', type: 'input' }, // 物料规格
  { name: 'createByNickname', type: 'filter' }, // 创建人
  { name: 'stateName', type: 'filter', queryName: 'state' }, // 状态
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' }, // 审批状态
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'auxiliaryAttr', type: 'dialog', queryName: 'materialSkus' }, // 特征参数
  { name: 'projectName', type: 'input' },
  // { name: 'applicantName', type: 'input', queryName: 'applicant' },
  // { name: 'applicationDate', type: 'timeline', queryTip: ['createStartTime', 'createEndTime'] },
  // { name: 'purchaseDate', type: 'timeline', queryTip: ['createStartTime', 'createEndTime'] },
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
