/*
 * @Author: xqm 13697256625@163.com
 * @Date: 2022-08-18 12:20:44
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-08-25 11:39:26
 * @FilePath: \systemmanagement\src\constant\tableColumnConstant.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 筛选框的类型 input select single-select dateRage

// 物料列表
export const materialsColumns = [
  {
    prop: 'code',
    label: '物料编码',
    minWidth: '150',
    filterBoxType: 'input'
  },
  {
    prop: 'name',
    label: '物料名称',
    minWidth: '150',
    filterBoxType: 'input'
  },
  {
    prop: 'typeName', // 表格的列属性
    label: '物料类型',
    minWidth: '150',
    filterBoxType: 'select',
    options: [],
    key: 'types'// 需要特殊处理传递给后端的key
  },
  {
    prop: 'sortName',
    label: '物料分类',
    minWidth: '150',
    filterBoxType: 'select',
    options: [],
    key: 'sorts'// 需要特殊处理传递给后端的key
  },

  {
    prop: 'comp',
    label: '单位',
    minWidth: '150',
    filterBoxType: 'input'
  },
  {
    prop: 'version',
    label: '版本',
    minWidth: '150',
    filterBoxType: 'input'
  }

]
