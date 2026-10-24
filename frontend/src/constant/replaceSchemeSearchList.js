/*
 * @Author: youjuan.hu
 * @Date: 2022-12-09 16:59:31
 * @LastEditors: skyz-lsh 54874615+skyz-lsh@users.noreply.github.com
 * @LastEditTime: 2023-01-06 14:29:38
 * @Description:
 */
const LIST = [
  // { name: "name", type: "input" }, // 物料名称
  // { name: "code", type: "input" }, // 物料编码
  // { name: "typeName", type: "filter", queryName: "types" }, // 物料类型
  // {
  //   name: "createTime",
  //   type: "timeline",
  //   queryTip: ["createStartTime", "createEndTime"],
  // }, // 创建时间
  // { name: "sortName", type: "filter", queryName: "sorts" }, // 物料分类
  // { name: "standard", type: "input" }, // 物料规格
  // { name: "comp", type: "input", queryName: "comp" }, // 单位
  // { name: "version", type: "input" }, // 版本
  // { name: "isAuxiliaryMaterial", type: "filter" }, // 是否为辅料
  // { name: "level", type: "input" }, // 物料等级
  // { name: "drawingNumber", type: "input" }, // 图号
  // { name: "remark", type: "input" }, // 备注
  // { name: "createBy", type: "input" }, // 创建人
  // { name: "approverName", type: "filter", queryName: "approver" }, // 审批人
  // { name: "stateName", type: "filter", queryName: "states" },
  // { name: "rawMaterial", type: "input" },

  { name: 'schemeCode', type: 'input' }, // 替代方案编号
  { name: 'schemeName', type: 'input' }, // 方案名称
  { name: 'replaceStrategyName', type: 'filter', queryName: 'replaceStrategy' }, // 替代策略
  { name: 'name', type: 'input' }, // 物料名称
  { name: 'code', type: 'input' }, // 物料编码
  { name: 'typeName', type: 'filter', queryName: 'types' }, // 物料类型
  { name: 'sortName', type: 'filter', queryName: 'sorts' }, // 物料分类
  { name: 'standard', type: 'input' }, // 物料规格
  { name: 'comp', type: 'input', queryName: 'comp' }, // 单位
  { name: 'approverName', type: 'filter', queryName: 'approver' }, // 审批人
  { name: 'stateName', type: 'filter', queryName: 'state' },
  { name: 'actualApproverName', type: 'filter', queryName: 'approver' }, // 实际审批人
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatuses' }, // 审批状态
  { name: 'drawingNumber', type: 'input' }, // 图号
  { name: 'remark', type: 'input' } // 备注
]

export { LIST }
