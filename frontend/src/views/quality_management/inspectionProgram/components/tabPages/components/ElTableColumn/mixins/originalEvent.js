/*
 * @Author: shunhua.liang
 * @Date: 2022-11-28 15:21:45
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-29 14:43:52
 * @Description:
 */

const originalEvent = {
  props: {
    size: {
      type: String,
      return: false,
      default: ''
    },
    rowKey: { // 行数据的 Key
      type: [Function, String],
      require: false,
      default: null
    },
    defaultExpandAll: { // 是否默认展开所有行
      type: Boolean,
      require: false,
      default: false
    },
    expandRowKeys: { // 可以通过该属性设置 Table 目前的展开行
      type: Array,
      require: false,
      default: null
    },
    tooltipEffect: { // tooltip effect 属性
      type: String,
      require: false,
      default: 'dark'
    },
    treeProps: { // 渲染嵌套数据的配置选项
      type: Object,
      require: false,
      default: () => { return {} }
    },
    selectOnIndeterminate: { // 见 element 表格
      type: Boolean,
      require: false,
      default: () => { return true }
    }
  },
  methods: {
    select(selection, row) {
      this.$emit('select', selection, row)
    },
    selectAll(selection) {
      this.$emit('selectAll', selection)
    },
    selectionChange(selection) {
      this.$emit('selectionChange', selection)
    },
    cellClick(row, column, cell, event) {
      this.$emit('selection', row, column, cell, event)
    },
    cellDblclick(row, column, cell, event) {
      this.$emit('cellDblclick', row, column, cell, event)
    },
    rowClick(row, column, event) {
      this.$emit('rowClick', row, column, event)
    },
    rowContextmenu(row, column, event) {
      this.$emit('rowContextmenu', row, column, event)
    },
    rowDblclick(row, column, event) {
      this.$emit('rowDblclick', row, column, event)
    },
    expandChange(row, expandedRows) {
      this.$emit('expandChange', row, expandedRows)
    },
    toggleAllSelection() {
      this.$refs.listTable.toggleAllSelection()
    },
    clearSelection() {
      this.$refs.listTable.clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs.listTable.toggleRowSelection(row, selected)
    }

  }
}

export default originalEvent
