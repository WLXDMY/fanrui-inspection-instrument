<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-12 09:46:20
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-20 16:18:09
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\inspectionItems\inspectionSample\defectTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-table
      id="dragTable"
      ref="commonTable"
      v-loading="loading"
      highlight-current-row
      :data="tableData"
      border
      row-key="id"
      style="width: 100%"
      :max-height="400"
      :header-cell-style="headerCellStyle"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      @header-dragend="headerDragend"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column v-for="(item, index) in tableColumn" :key="index" v-bind="item">
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
      <!-- 操作列 -->
      <el-table-column
        fixed="right"
        class="last-column"
        :render-header="renderActionColumn"
      />
    </el-table>

    <MaterialColumn
      v-if="isShowCustomColumn"
      :column="materialColumn"
      :check-column.sync="materialDialogCheck"
      :style-modify="{ width: '280px' }"
      @closeDialog="closeDialog"
      @aginRenderColumn="aginRenderColumn"
    />
  </div>
</template>
<script>
import MaterialColumn from '@/views/quality_management/inspectionSheet/newComponents/material/materialColumn.vue'
import { getColumnList, saveCurrentColumnList } from '@/api/column'
import { v4 as uuidv4 } from 'uuid'

export default {
  components: { MaterialColumn },
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
    },
    // 该表格列操作权限路径
    // 先默认展示
    columnPermissionAction: {
      type: String,
      require: false,
      default: () => 'sales.order:columnConfigAddMaterial'
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
      isAllSelected: false,
      isShowCustomColumn: false, // 是否展示选择 列字段 弹窗
      materialColumn: [],
      // 产品检验单-缺陷记录-列配置
      modelType: 'productDefectItemColumn',
      tableColumn: [],
      loading: false,
      materialDialogCheck: [] // 弹窗默认被勾选的元素
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
  mounted() {
    this.$nextTick(() => {
      this.getMaterialColumn()
    })
  },
  methods: {
    headerDragend(newWidth, oldWidth, column, event) {
      const currentColumn = column.property
      console.log(currentColumn)
      this.materialColumn.forEach(el => {
        if (el.code === currentColumn) {
          el['width'] = newWidth
        }
      })
    },
    // 设置表格列元素
    aginRenderColumn(val, type) {
      this.tableColumn = val
      this.materialDialogCheck = val
      this.saveColumnSetting(val, type)
      this.closeDialog()
    },
    // 获取表格列数据
    async getMaterialColumn() {
      try {
        this.loading = true
        const param = { modelType: this.modelType }
        const res = await getColumnList(param)
        const { code, data } = res.data || {}
        if (+code === 200) {
          const tableFields = JSON.parse(JSON.stringify(this.columns))
          if (!data) {
            this.handleDefaultColumn()
          } else {
            const { columnInformation } = data || {}
            this.tableColumn = []
            // 字符串和JSON 字符串
            try {
              // JSON 字符串
              const arr = JSON.parse(columnInformation)
              arr.forEach(el => {
                tableFields.forEach(item => {
                  if (el.code === item.code) {
                    const child = {
                      ...item,
                      width: el.width || item.width
                    }
                    this.tableColumn.push(child)
                  }
                })
              })
              const list = arr.map(item => item.code)
              const rest = tableFields.filter(item => {
                return !list.includes(item.code)
              })
              this.handleTableColumnWidth()
              this.materialColumn = this.tableColumn.concat(rest)
            } catch (err) {
              // ','字符串
              const list = columnInformation.split(',')
              list.forEach(el => {
                tableFields.forEach(item => {
                  if (el === item.code) {
                    this.tableColumn.push(item)
                  }
                })
              })
              // 处理勾选字段
              const rest = tableFields.filter(item => {
                return !list.includes(item.code)
              })
              this.handleTableColumnWidth()
              this.materialColumn = this.tableColumn.concat(rest)
            }
            this.materialDialogCheck = this.tableColumn
          }
          this.loading = false
          this.$nextTick(() => {
            this.$refs.tableTree?.doLayout()
          })
        }
      } catch (err) {
        const tableFields = JSON.parse(JSON.stringify(this.columns))
        this.tableColumn = tableFields
        this.materialColumn = this.tableColumn
        this.materialDialogCheck = this.tableColumn
        console.log(err)
      }
    },
    // 没有个人的列配置，再找默认的列配置，还是没有则用前端代码默认的
    async handleDefaultColumn() {
      const tableFields = JSON.parse(JSON.stringify(this.columns))
      const {
        data: { code, data }
      } = await getColumnList({ modelType: this.modelType, username: 'all' })

      if (code === '200') {
        if (data?.columnInformation?.length) {
          const { columnInformation } = data || {}
          this.tableColumn = []
          // 字符串和JSON 字符串
          try {
            // JSON 字符串
            const arr = JSON.parse(columnInformation)
            arr.forEach(el => {
              tableFields.forEach(item => {
                if (el.code === item.code) {
                  const child = {
                    ...item,
                    width: el.width || item.width
                  }
                  this.tableColumn.push(child)
                }
              })
            })
            const list = arr.map(item => item.code)
            const rest = tableFields.filter(item => {
              return !list.includes(item.code)
            })
            this.handleTableColumnWidth()
            this.materialColumn = this.tableColumn.concat(rest)
          } catch (err) {
            // ','字符串
            const list = columnInformation.split(',')
            list.forEach(el => {
              tableFields.forEach(item => {
                if (el === item.code) {
                  this.tableColumn.push(item)
                }
              })
            })
            // 处理勾选字段
            const rest = tableFields.filter(item => {
              return !list.includes(item.code)
            })
            this.handleTableColumnWidth()
            this.materialColumn = this.tableColumn.concat(rest)
          }
          this.materialDialogCheck = this.tableColumn
        } else {
          this.tableColumn = tableFields
          this.materialColumn = this.tableColumn
          this.materialDialogCheck = this.tableColumn
        }
      } else {
        this.tableColumn = tableFields
        this.materialColumn = this.tableColumn
        this.materialDialogCheck = this.tableColumn
      }
    },
    // 保存列配置
    async saveColumnSetting(list = [], type) {
      try {
        const result = list.map(item => {
          return {
            code: item.code,
            width: item.width
          }
        })
        const param = {
          columnInformation: JSON.stringify(result),
          modularType: this.modelType,
          userName: type || this.$store.getters.userInfo.username
        }
        const res = await saveCurrentColumnList(param)
        const { code } = res.data || {}
        if (+code === 200) {
          this.getMaterialColumn()
        }
        // 还要在调用一次个人的
        if (type === 'all') {
          const param = {
            columnInformation: JSON.stringify(result),
            modularType: this.modelType,
            userName: this.$store.getters.userInfo.username
          }
          const res = await saveCurrentColumnList(param)
          const { code } = res.data || {}
          if (+code === 200) {
            this.getMaterialColumn()
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 处理表格列宽的问题
    handleTableColumnWidth() {
      const elementWidth = document.querySelector('.el-form').clientWidth || 0
      const totalWidth = this.tableColumn.reduce((prev, next) => {
        return prev + Number(next.width)
      }, 0)
      if (totalWidth < elementWidth) {
        this.tableColumn = this.tableColumn.map(item => {
          return {
            ...item,
            width: null,
            id: uuidv4()
          }
        })
      }
    },
    // 自定义操作列
    renderActionColumn(h, { column }) {
      const that = this
      return h(
        'div',
        {
          style: 'display:flex;align-item:center'
        },
        [
          h('span', column.label),
          h('i', {
            class: 'el-icon-setting',
            style:
              'margin-left:0px;font-size: 18px; cursor: pointer;border-left:0',
            // directives: [
            //   {
            //     name: 'permission',
            //     value: { action: this.columnPermissionAction }
            //   }
            // ],
            on: {
              click: function() {
                that.isShowCustomColumn = !that.isShowCustomColumn
              }
            }
          })
        ]
      )
    },
    // 取消按钮关闭弹窗
    closeDialog() {
      this.isShowCustomColumn = false
    },
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
