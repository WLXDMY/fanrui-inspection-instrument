
import { v4 as uuidv4 } from 'uuid'

const PROCESS = [
  {
    id: uuidv4(),
    label: '检验代号',
    code: 'inspectionCode',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '检验项目',
    code: 'inspectionName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '状态',
    code: 'stateName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '检验标准',
    code: 'inspectionStandard',
    width: '165',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '检验仪器',
    code: 'inspectionInstrument',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '数据类型',
    code: 'dataTypeName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '创建人',
    code: 'createByName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '创建时间',
    code: 'createTime',
    width: '165',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '修改人',
    code: 'updateByName',
    width: null,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  },
  {
    id: uuidv4(),
    label: '修改时间',
    code: 'updateTime',
    width: '165',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: ''
  }
]

const LIST = [
  { name: 'inspectionCode', type: 'input' },
  { name: 'inspectionName', type: 'input' },
  { name: 'stateName', type: 'filter', queryName: 'status' },
  { name: 'inspectionStandard', type: 'input' },
  { name: 'inspectionInstrument', type: 'input' },
  { name: 'dataTypeName', type: 'filter', queryName: 'dateType' }
]

export {
  PROCESS,
  LIST
}
