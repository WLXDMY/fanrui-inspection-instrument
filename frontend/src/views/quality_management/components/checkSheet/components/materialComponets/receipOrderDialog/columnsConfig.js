/*
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-05-31 14:54:21
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-08 20:11:27
 * @FilePath: \ams\src\views\procurement-management\materials-list\materialCheckAddComponents\receipOrderDialog\columnsConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const COLUMNS_CONFIG = [

  {
    prop: 'receiptCode',
    label: '采购收料单号',
    minWidth: '150',
    filterBoxType: 'input'
  },
  {
    prop: 'code',
    label: '物料编码',
    minWidth: '150',
    filterBoxType: 'input',
    outSideKey: 'materialFields',
    multiLevelKey: 'materialFields.code'
  },
  {
    prop: 'name',
    label: '物料名称',
    minWidth: '150',
    filterBoxType: 'input',
    outSideKey: 'materialFields',
    multiLevelKey: 'materialFields.name'
  },
  {
    prop: 'standard',
    label: '物料规格',
    minWidth: '150',
    filterBoxType: 'input',
    outSideKey: 'materialFields',
    multiLevelKey: 'materialFields.standard'
  },
  {
    prop: 'barCode',
    label: '批次号',
    minWidth: '150',
    filterBoxType: 'input'

  },
  {
    prop: 'recepitNum',
    label: '收料数量',
    minWidth: '150'

  }
]

