/*
 * @Author: zhaozhuo
 * @Date: 2022-09-19 17:53:53
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-20 11:41:52
 * @Description: ...
 */
const LIST = [
  // 按物料
  { name: 'inspectionTypes', type: 'filter', queryName: 'inspectTypeList' }, // 检验类型
  { name: 'materialName', type: 'input' },
  { name: 'materialCode', type: 'input' },
  { name: 'materialStandard', type: 'input' },
  { name: 'materialDrawingNumber', type: 'input' },
  { name: 'materialTypeName', type: 'filter', queryName: 'materialTypes' },
  { name: 'samplePlanName', type: 'input' },
  // 按物料 end
  { name: 'schemeName', type: 'input', queryName: 'schemeName' },
  { name: 'statusName', type: 'filter', queryName: 'statues' },
  { name: 'schemeCode', type: 'input', queryName: 'schemeCode' },
  { name: 'generalMaterialName', type: 'filter', queryName: 'generalMaterial' },
  { name: 'relateCustomerName', type: 'input' },
  { name: 'relateProcedureName', type: 'input', queryName: 'relateProcessProcedureName' },
  { name: 'relateMaterialTypeName', type: 'input', queryName: 'relateMaterialTypeName' }
  /*   { name: 'materialCode', type: 'input' },
  { name: 'materialName', type: 'input' },
  { name: 'approvalStatusName', type: 'filter', queryName: 'approvalStatus' },
  { name: 'remark', type: 'input' }
    { name: 'createByName', type: 'filter', queryName: 'createBy' },
   { name: 'createTime', type: 'timeline', queryTip: ['createStart', 'createEnd'] },
  { name: 'updateByName', type: 'filter', queryName: 'updateBy' },
  { name: 'updateTime', type: 'timeline', queryTip: ['updateStart', 'updateEnd'] } */
]

export { LIST }
