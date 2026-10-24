/*
 * @Author: zhaozhuo
 * @Date: 2022-11-01 14:17:26
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-11-04 09:43:52
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
    prop: 'customerCode',
    label: '客户编码',
    minWidth: '120',
    filterBoxType: 'input',
    checked: true
  },
  {
    prop: 'customerName',
    label: '客户名称',
    minWidth: '120',
    filterBoxType: 'input',
    checked: true
  },
  {
    prop: 'stateName',
    label: '状态',
    minWidth: '120',
    filterBoxType: 'select',
    options: [],
    key: 'cusState',
    columnType: 'bodySlot',
    checked: true
  },
  {
    prop: 'approvalStatusName',
    label: '审批状态',
    minWidth: '150',
    filterBoxType: 'select',
    options: [],
    key: 'approvalStatus',
    columnType: 'bodySlot',
    checked: true
  },
  {
    prop: 'cusNickName',
    label: '本厂对接人',
    minWidth: '140',
    filterBoxType: 'single-select',
    options: [],
    key: 'cusSuccessor',
    checked: true
  },
  {
    prop: 'customerContacts',
    label: '客户联系人',
    minWidth: '140',
    filterBoxType: 'input',
    checked: true
  },
  {
    prop: 'customerMobile',
    label: '客户联系方式',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'customerAddr',
    label: '客户地址',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'email',
    label: '传真',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'companyAddress',
    label: '公司地址',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'companyNumber',
    label: '公司联系方式',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'bankAccount',
    label: '银行账户',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'bankNumber',
    label: '银行账号',
    minWidth: '120',
    checked: true
  },
  {
    prop: 'dutyParagraph',
    label: '税号',
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
    prop: 'remark',
    label: '备注',
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
