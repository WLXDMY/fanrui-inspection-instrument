/*
 * @Author: shunhua.liang
 * @Date: 2022-05-10 14:16:24
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-03-13 19:02:08
 * @Description: 生产设备
 */
import { v4 as uuidv4 } from 'uuid'

const DEVICE = [
  {
    id: uuidv4,
    label: '设备类型编码',
    code: 'code',
    width: null,
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  },
  {
    id: uuidv4,
    label: '设备类型名称',
    code: 'name',
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
    minWidth: '180',
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
    minWidth: '180',
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
    minWidth: '180',
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
    minWidth: '180',
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    class: 'handle' // 这个属性决定是否允许拖动
  }
]

export { DEVICE }
