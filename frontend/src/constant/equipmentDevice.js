/*
 * @Author: shunhua.liang
 * @Date: 2022-05-10 14:16:24
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-03-22 16:40:48
 * @Description: 生产设备
 */
import { v4 as uuidv4 } from 'uuid'

const DEVICE = [
  {
    id: uuidv4,
    label: '设备编码',
    code: 'deviceCode',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备名称',
    code: 'deviceName',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备分类',
    code: 'typeName',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备类型',
    code: 'modelName',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '区域位置',
    code: 'place',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备负责人',
    code: 'magNickname',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '关联采集设备',
    code: 'euiNames',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '关联车间/工位',
    code: 'relateTypeName',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '选择车间/工位',
    code: 'fgName',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '备注',
    code: 'remark',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建人',
    code: 'createByName',
    width: null,
    minWidth: '',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '创建时间',
    code: 'createTime',
    width: null,
    minWidth: '160',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '更新人',
    code: 'updateByName',
    width: null,
    minWidth: '',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '更新时间',
    code: 'updateTime',
    width: null,
    minWidth: '160',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  }

]

export { DEVICE }
