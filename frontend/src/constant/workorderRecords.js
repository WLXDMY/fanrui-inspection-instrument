/*
 * @Author: zhaozhuo
 * @Date: 2022-08-23 11:46:22
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-09-09 14:27:03
 * @Description: ...
 */
import { v4 as uuidv4 } from 'uuid'

const WORKORDERRECORDS = [
  {
    id: uuidv4,
    label: '作业工单号',
    code: 'operationNumber',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '生产工单号',
    code: 'workOrderNumber',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '状态',
    code: 'state',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '产品编码',
    code: 'materialCode',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    columnType: 'material',
    class: ''
  },
  {
    id: uuidv4,
    label: '产品名称',
    code: 'materialName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    columnType: 'material',
    class: ''
  },
  {
    id: uuidv4,
    label: '计划数量',
    code: 'planQuantity',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '工序名称',
    code: 'craftName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '制造单元类型',
    code: 'lineModelName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '制造单元名称',
    code: 'lineName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '计划开始时间',
    code: 'startDate',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '计划完成时间',
    code: 'endDate',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '实际开始时间',
    code: 'actualStartDate',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '实际完成时间',
    code: 'actualEndDate',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '投入数量',
    code: 'inputTotal',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '完成数量',
    code: 'finishCount',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '不良数量',
    code: 'unqualified',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '计划工时',
    code: 'plannedWorkingHours',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '生产时长',
    code: 'actualWorkingHours',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '流转时长',
    code: 'circulationDuration',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '生产订单号',
    code: 'orderNumber',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '销售订单号',
    code: 'saleOrderNumber',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '上报方式',
    code: 'type',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '批次',
    code: 'batch',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '载具号',
    code: 'vehicleCode',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '班次',
    code: 'shiftType',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '上报完成数',
    code: 'finishCountTwo',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '上报不良数',
    code: 'unqualifiedTwo',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '不良描述',
    code: 'defectDesc',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '上报工时',
    code: 'effectiveHours',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '生产日期',
    code: 'reportDate',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '操作员',
    code: 'operator',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '上报人',
    code: 'userNickname',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  },
  {
    id: uuidv4,
    label: '上报时间',
    code: 'createTime',
    width: '160',
    minWidth: null,
    showOverflowTooltip: false,
    type: null,
    class: ''
  }
]

const EXTENDMATERIALLIST = [
]

export { WORKORDERRECORDS, EXTENDMATERIALLIST }
