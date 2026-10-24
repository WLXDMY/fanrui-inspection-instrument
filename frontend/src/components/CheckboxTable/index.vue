<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-15 14:41:28
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-12-06 18:29:44
 * @Description:
-->
<template>
  <div v-loading="isLoading" class="checkbox-table" element-loading-text="加载中...">
    <div v-if="$slots.tableTop">
      <slot name="tableTop" />
    </div>
    <el-table
      ref="checkboxTable"
      :data="computedData"
      :row-key="rowKey"
      :max-height="maxHeight"
      :height="height"
      :class="className"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :highlight-current-row="highlightCurrentRow"
      :header-cell-style="headerCellStyle"
      :border="border"
      :selectable="selectable"
      @selection-change="selectionChange"
      @row-click="rowClick"
    >
      <el-table-column
        v-if="isShowCheckbox"
        type="selection"
        width="62"
        class-name="check-td"
      />
      <!-- 内容插槽 -->
      <slot name="tableContent" />
    </el-table>
    <slot v-show="pageInfo.total" name="tableOther">
      <!-- 默认为分页 -->
      <Pagination3
        v-show="pageInfo.total > 0"
        :total="pageInfo.total"
        :page="pageInfo.current"
        :limit="pageInfo.size"
        :page-sizes="pageSizes"
        @pagination="getTableList"
      />
    </slot>
  </div>
</template>

<script>
import Pagination3 from '@/components/Pagination3'

export default {
  name: 'CheckboxTable',
  components: {
    Pagination3
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    rowKey: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: String,
      default: undefined
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    className: {
      type: String,
      default: ''
    },
    headerCellStyle: {
      type: Object,
      default: () => ({
        background: '#FAFAFA',
        color: '#000000',
        'font-family': 'Source Han Sans CN',
        'font-size': '14px',
        'font-weight': 400
      })
    },
    rowStyle: {
      type: Object,
      default: () => ({})
    },
    border: {
      type: Boolean,
      default: false
    },
    isShowCheckbox: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Function,
      default() {
        return () => false
      }
    },
    rowClassName: {
      type: Function,
      default() {
        return () => ''
      }
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    isShowPagination: {
      type: Boolean,
      default: true
    },
    pageInfo: {
      type: Object,
      default: () => ({
        total: 0,
        current: 1,
        size: 10
      })
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100, 200]
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selection: new Map() // 记录选中的项
    }
  },
  computed: {
    computedData() {
      return this.data.map((row, index) => {
        row.$$checkboxTableIndex = index
        return row
      })
    }
  },
  methods: {
    // 选中项改变
    selectionChange(selection) {
      if (!this.isShowCheckbox) return
      this.selection.clear()
      selection.forEach((row) => {
        this.selection.set(row, row.$$checkboxTableIndex)
      })
      this.$emit('selection-change', this.selection)
    },
    // 请求表格数据
    getTableList(params) {
      this.$refs.checkboxTable.clearSelection()
      this.$emit('get-list', {
        current: params.page,
        size: params.limit
      })
    },
    rowClick(row, column, event) {
      this.$emit('row-click', { row, column, event })
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-table {
  height: 100%;
  ::v-deep .el-table .el-table__body-wrapper {
    border: 1px solid #e6ebf5;
    border-right: none;
  }
}
</style>
