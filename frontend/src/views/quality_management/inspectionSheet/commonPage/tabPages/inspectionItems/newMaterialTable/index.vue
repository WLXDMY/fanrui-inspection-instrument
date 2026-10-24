<template>
  <div>
    <el-table
      id="dragTable"
      ref="commonTable"
      highlight-current-row
      :data="tableData"
      border
      row-key="id"
      style="width: 100%"
      :max-height="400"
      :header-cell-style="headerCellStyle"
      @row-click="handleRowClick"
    >
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column v-for="(item, index) in columns" :key="index" v-bind="item" :render-header="renderHeader">
        <template slot-scope="scope">
          <!-- 自定义插槽 -->
          <template v-if="item.columnType === 'bodySlot' || item.columnType === 'slot'">
            <slot :name="item.prop" :row="scope.row" :$index="scope.$index" />
          </template>

          <!-- map转换 -->
          <template v-else-if="item.columnType === 'dataMap'">
            {{ item.dataMap[scope.row[item.prop]] || '' }}
          </template>
          <!-- 格式化 -->
          <template v-else-if="item.columnType === 'format'">
            {{ item.formatFuc([scope.row[item.prop]]) }}
          </template>
          <template v-else>
            {{ scope.row[item.prop] || (scope.row[item.prop] === 0 ? 0 : '') }}
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { LIST } from './constant'
import Sortable from 'sortablejs'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    isDrag: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'edit'
    },
    currentRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: LIST,
      headerCellStyleDefault: {
        background: '#F1F5FC',
        color: '#333333',
        'font-family': 'Source Han Sans CN',
        'font-weight': '400'
      },
      sortable: null,
      tableKey: 0,
      isAllSelected: false
    }
  },
  computed: {
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    },
    isDetailType() {
      return this.$route.name.includes('Detail')
    }
  },
  watch: {
    currentRow(val) {
      if (val && Object.keys(val).length > 0) {
        this.$refs.commonTable.setCurrentRow(val)
      }
    }
  },
  mounted() {
    this.initSortable()
  },
  methods: {
    changeItem(flag) {
      const index = this.tableData.findIndex(item => item === this.currentRow)
      const length = this.tableData.length
      if (!length) return
      switch (flag) {
        case 'first':
          if (index === 0) return
          this.$emit('update:currentRow', this.tableData[0])
          break
        case 'previous':
          if (index > 0) {
            this.$emit('update:currentRow', this.tableData[index - 1])
          }
          break
        case 'next':
          if (index < length - 1) {
            this.$emit('update:currentRow', this.tableData[index + 1])
          }
          break
        case 'last':
          if (index === length - 1) return
          this.$emit('update:currentRow', this.tableData[length - 1])
          break
        default:
          break
      }
    },
    initSortable() {
      const that = this
      const tbody = document.querySelector(`#dragTable .el-table__body-wrapper tbody`)
      this.sortable = new Sortable(tbody, {
        sort: false,
        animation: 150,
        //  指定父元素下可被拖拽的子元素
        draggable: '.el-table__row',
        // handle: '.handle', // handle's class
        handle: '.el-table__cell', // handle's class
        onEnd: ({ newIndex, oldIndex }) => {
          that.tableData.splice(newIndex, 0, that.tableData.splice(oldIndex, 1)[0])
        }
      })
    },
    handleRowClick(row) {
      this.$emit('update:currentRow', row)
    },
    // 表格样式
    headerCellStyle({ row, colunm, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        // 这里为了是将第二列的表头隐藏，就形成了合并表头的效果
        return { display: 'none' }
      }
      return { ...this.headerCellStyleDefault }
    },
    renderHeader(h, { column }) {
      if (column.type === 'select') {
        return (
          <el-checkbox
            v-model={column.isAllSelected}
            indeterminate={column.isAllSelected && !column.isAllSelected}
            onChange={bol => this.toggleAllSelection(bol, column.property)}
            disabled={this.isDetailType}
          >
            {column.label}
          </el-checkbox>
        )
      }
      return column.label
    },
    toggleAllSelection(bol, property) {
      this.tableData.forEach((item, index) => {
        item[property] = bol
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-table__header .is-group tr:nth-last-child(1) {
  display: none;
}

::v-deep .cell.el-tooltip {
  width: initial !important;
}
::v-deep .el-table__body-wrapper {
  overflow: auto !important;
}
</style>
