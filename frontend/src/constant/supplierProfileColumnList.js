/*
 * @Author: zhaozhuo
 * @Date: 2022-11-02 10:42:26
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @LastEditTime: 2023-02-10 17:28:55
 * @Description: ...
 */
export const COLUMNS_CONFIG = [
  {
    type: 'selection',
    prop: 'index',
    minWidth: '55',
    checked: true
  },
  {
    prop: 'code',
    label: '供应商编码',
    minWidth: '140',
    filterBoxType: 'input',
    checked: true
  },
  {
    prop: 'name',
    label: '供应商名称',
    minWidth: '140',
    filterBoxType: 'input',
    checked: true
  },
  {
    prop: 'stateName',
    label: '状态',
    minWidth: '120',
    filterBoxType: 'select',
    options: [],
    key: 'state',
    columnType: 'bodySlot',
    checked: true
  },
  {
    prop: 'approvalStatusName',
    label: '审批状态',
    minWidth: '120',
    filterBoxType: 'select',
    options: [],
    key: 'approvalStatus',
    columnType: 'bodySlot',
    checked: true
  },
  {
    prop: 'counterpartName',
    label: '本厂对接人',
    minWidth: '140',
    filterBoxType: 'single-select',
    options: [],
    checked: true
  },
  {
    prop: 'contactsName',
    label: '供应商联系人',
    minWidth: '140',
    filterBoxType: 'input',
    key: 'contacts',
    checked: true
  },
  {
    prop: 'phone',
    label: '供应商联系方式',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'addr',
    label: '供应商地址',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'type',
    label: '供应商类型',
    minWidth: '140',
    filterBoxType: 'select',
    options: [],
    key: 'type',
    checked: true
  },
  {
    prop: 'comprehensiveEvaluation',
    label: '综合评价',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'remark',
    label: '备注',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'approverName',
    label: '审批人',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'actualApproverName',
    label: '实际审批人',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'createByName',
    label: '创建人',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'operate',
    label: '操作',
    minWidth: '250',
    columnType: 'slot',
    fixed: 'right',
    checked: true
  }
]
