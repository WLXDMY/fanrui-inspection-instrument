<template>
  <div>
    <el-table
      id="dragTable"
      ref="commonTable"
      highlight-current-row
      :data="tableData"
      border
      row-key="itemId"
      style="width: 100%"
      :height="400"
      :header-cell-style="headerCellStyle"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      @select-all="selectAll"
    >
      <el-table-column type="selection" width="55" />
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
    },
    initStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      columns: LIST,
      importantInspection: false, // 重点检查全选
      required: false, // 是否必填全选
      recordInspectionValue: false, // 记录样本检验值全选
      defaultQualified: false, // 默认合格全选
      headerCellStyleDefault: {
        background: '#ECF1FF',
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
    isDrag(newVal) {
      this.sortable.option('sort', newVal)
      if (newVal) {
        // this.$nextTick(() => {
        //   this.rowDrop()
        // })
      } else {
        // this.sortable?.destroy()
        // this.$nextTick(() => {
        //   this.tableKey += 1
        //   this.$nextTick(() => {
        //     this.$refs.commonTable.setCurrentRow(this.currentRow)
        //   })
        // })
      }
    },
    'currentRow.itemId'(value) {
      this.$refs.commonTable.setCurrentRow(this.currentRow)
    }
  },
  mounted() {
    this.initSortable()
  },
  methods: {
    initSortable() {
      const that = this
      const tbody = document.querySelector(`#dragTable .el-table__body-wrapper tbody`)
      console.log(tbody)
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
      console.log('🚀 ~ renderHeader ~ column:', column, column.property)
      if (column.type === 'select') {
        return (
          <el-checkbox
            v-model={this[column.property]}
            indeterminate={this[column.property] && !this[column.property]}
            onChange={bol => this.toggleAllSelection(bol, column.property)}
            disabled={this.isDetailType || this.initStatus === 1}
          >
            {column.label}
          </el-checkbox>
        )
      }
      return column.label
    },
    toggleAllSelection(bol, property) {
      console.log('🚀 ~ toggleAllSelection ~ bol, property:', bol, property)
      this.tableData.forEach((item, index) => {
        item[property] = bol
      })
    },
    handleSelectionChange(val) {
      console.log('勾选单个', val)

      this.$emit('update:multipleDefect', val)
    }
    // selectAll(selection) {
    //   console.log('勾选全部', selection)

    //   this.$emit('update:multipleDefect', selection)
    // }
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
