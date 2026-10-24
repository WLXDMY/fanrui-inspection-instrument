/*
 * @Author: shunhua.liang
 * @Date: 2022-06-21 16:07:15
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-02-20 20:36:34
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid'

const TABLE_LIST = [
  {
    id: uuidv4(),
    label: '序号',
    code: 'orderNumber',
    width: '50',
    special: true
  },
  {
    id: uuidv4(),
    label: '程序名',
    code: 'programName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '设备名',
    code: 'deviceName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '设备编号',
    code: 'deviceCode',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '模组',
    code: 'module',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '上料区',
    code: 'loadingArea',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '通道号',
    code: 'channelNumber',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: 'Top/Bottom面',
    code: 'panel',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '站位',
    code: 'stationPosition',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '物料编码',
    code: 'materialCode',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '物料规格',
    code: 'materialStandard',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '用量',
    code: 'materialNumber',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: 'Feeder尺寸',
    code: 'feederDevice',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '贴片位号',
    code: 'patchPosition',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '间距',
    code: 'spacing',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'stateName',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  },
  {
    id: uuidv4(),
    label: '备注',
    code: 'remark',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    class: ''
  }
]

export { TABLE_LIST }
