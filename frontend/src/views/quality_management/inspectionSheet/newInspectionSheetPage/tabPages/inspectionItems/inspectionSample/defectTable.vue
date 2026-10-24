<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-12 09:46:20
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-10 11:34:32
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\inspectionItems\inspectionSample\defectTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column v-for="(item, index) in columns" :key="index" v-bind="item">
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
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    defectCurrentRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
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
    // 'defectCurrentRow.id'(value) {
    //   this.$refs.commonTable.setCurrentRow(this.defectCurrentRow)
    // }
  },
  mounted() {},
  methods: {
    handleRowClick(row) {
      this.$emit('update:defectCurrentRow', row)
    },
    // 表格样式
    headerCellStyle({ row, colunm, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        // 这里为了是将第二列的表头隐藏，就形成了合并表头的效果
        return { display: 'none' }
      }
      return { ...this.headerCellStyleDefault }
    },
    handleSelectionChange(val) {
      this.$emit('update:multipleDefect', val)
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
