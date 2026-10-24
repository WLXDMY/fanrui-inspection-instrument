const LIST = [
  { name: 'oddNumbers', type: 'input' }, // 盘点单号
  { name: 'roomName', type: 'filter', queryName: 'warehouseCode' }, // 库房名称
  { name: 'code', type: 'input' }, // 物料编码
  { name: 'name', type: 'input' }, // 物料名称
  { name: 'state', type: 'filter' }, // 状态
  { name: 'approvalState', type: 'filter' } // 审批状态
]

export {
  LIST
}
