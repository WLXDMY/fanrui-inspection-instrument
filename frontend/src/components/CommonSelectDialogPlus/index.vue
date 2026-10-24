<!--
    *@Author:xuqiuming
    * @Date: 2022-08-17 12:02:01
 * @LastEditTime: 2025-05-15 17:38:49
 * @LastEditors: laidz laidz@yelinked.com
    * @Description: 全部继承element ui弹窗
-->
<template>
  <el-dialog v-bind="$attrs" width="70%" :visible.sync="diaVisible" class="common-select-dialog" v-on="$listeners">
    <SelectTable
      ref="SelectTable"
      v-loading="loading"
      handle-selection-change
      :columns="tableColums"
      :table-data="tableData"
      :sort-list="sortList"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @sort-change="sortChange"
      @row-click="handleClickTableRow"
    >
      <template #export="{ row }"> {{ row.export ? '是' : '否' }} </template>
    </SelectTable>
    <template #footer>
      <div>
        <div class="pagination">
          <Pagination
            v-show="pagination.total > 0"
            :total="pagination.total"
            :page.sync="pagination[currentName]"
            :limit.sync="pagination.size"
            @pagination="getList"
          >
            <selectedNumber :selected-number="hasSelectedRows.length" />
          </Pagination>
        </div>

        <div class="bnts">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="confirm"> 确认 </el-button>
        </div>
      </div>
    </template>

    <div class="reset" @click="reset">
      <i class="el-icon-refresh-right" />
    </div>
  </el-dialog>
</template>

<script>
import SelectTable from './selectTable.vue'
import Pagination from '@/components/Pagination'
import request from '@/utils/request'
import { eventBus } from '@/main.js'
import selectedNumber from '@/components/TableSelectedNumber'
export default {
  components: {
    SelectTable,
    Pagination,
    selectedNumber
  },
  props: {
    columnConfig: {
      type: Array,
      default: () => []
    },

    requestConfig: {
      require: true,
      type: Object,
      default: () => ({}),
      validator: value => Object.keys(value).includes('url') && Object.keys(value).includes('method')
    },
    visible: {
      type: Boolean,
      default: false
    },
    tableSpecialKey: {
      type: String,
      default: ''
    },
    extraParams: {
      type: Object,
      default: () => ({})
    },
    toggleSelections: {
      // 回选项
      type: Array,
      default: () => []
    },
    toggleItemComparisonKey: {
      type: String,
      default: 'id'
    },
    isRequired: {
      // 是否要必须选择一项
      type: Boolean,
      default: true
    },
    // 是否有物料扩展字段
    isHasMaterialExtensionKeys: {
      type: Boolean,
      default: false
    },
    expandKey: {
      type: String,
      default: ''
    },
    materialExtensionMultilevelkey: {
      type: String,
      default: 'materialFields'
    },
    currentName: {
      type: String,
      default: 'current'
    }
  },
  data() {
    return {
      tableData: [],
      pagination: {
        current: 1,
        currentPage: 1,
        size: 20,
        total: 0
      },

      queryParams: {},
      loading: false,
      currnetRow: {}, // 当前点击选中的行,
      hasSelectedRows: [],
      tableColums: [],
      // 排序字段
      sortList: []
    }
  },
  computed: {
    diaVisible: {
      get() {
        return this.visible
      },
      set() {}
    }
  },
  watch: {
    columnConfig: {
      immediate: true,
      deep: true,
      async handler(newValue, oldValue) {
        if (this.isHasMaterialExtensionKeys) {
          const {
            data: { code, data: materialKeys = [] }
          } = await request({
            url: `/api/material/filed/config/list/using`,
            method: 'get'
          })
          if (code === '200') {
            this.tableColums = newValue.concat(
              materialKeys.map(i => ({
                prop: i.fieldCode,
                label: i.fieldName,
                minWidth: '150',
                filterBoxType: i.fieldCode === 'standard' || i.fieldCode === 'drawingNumber' ? 'input' : '',
                // checked: true,
                // outSideKey: 'materialFields',
                multilevelkey: this.materialExtensionMultilevelkey + '.' + i.fieldCode,
                sortable: true
              }))
            )
          }
        } else {
          this.tableColums = newValue
        }
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    eventBus.$on('getQueryParams', this.updateQueryParamsAndGetList)
  },
  beforeDestroy() {
    eventBus.$off('getQueryParams', this.updateQueryParamsAndGetList)
  },
  methods: {
    sortChange({ column, prop, order }) {
      const sort = this.sortList.find(item => item.column === prop)
      if (sort) {
        sort.desc = order ? order === 'descending' : null
      } else {
        this.sortList.push({
          column: prop,
          desc: order ? order === 'descending' : null
        })
      }
      this.getList()
    },
    handleSelectionChange(rows) {
      this.hasSelectedRows = rows
    },
    handleCurrentChange(row) {
      this.currnetRow = row
    },
    cancel() {
      this.$emit('cancel')
    },
    reset() {
      eventBus.$emit('resetQuery')
    },
    confirm() {
      const isSelects = this.columnConfig.find(i => i.type === 'selection')
      if (!isSelects && Object.keys(this.currnetRow).length === 0) {
        return this.$notify({
          title: '提示',
          message: '请至少选择一项',
          type: 'warning',
          duration: 1000
        })
      } else if (!isSelects && Object.keys(this.currnetRow).length > 0) {
        this.$emit('confirm', JSON.parse(JSON.stringify(this.currnetRow)))
      } else if (this.isRequired && isSelects && this.hasSelectedRows.length === 0) {
        return this.$notify({
          title: '提示',
          message: '请至少选择一项',
          type: 'warning',
          duration: 1000
        })
      } else if (this.isRequired && isSelects) {
        console.log(this.hasSelectedRows, 'hasSelectedRows')
        this.$emit('confirm', JSON.parse(JSON.stringify(this.hasSelectedRows)))
      }
    },
    updateQueryParamsAndGetList(v) {
      this.queryParams = JSON.parse(JSON.stringify(v))
      this.pagination[this.currentName] = 1
      this.getList()
    },
    async getList() {
      const { size, current, currentPage } = this.pagination
      const params = {
        size,
        current,
        currentPage,
        ...this.queryParams,
        ...this.extraParams
        // sortList: this.sortList
      }
      const { url, method } = this.requestConfig
      let config
      if (method === 'get') {
        config = Object.assign({}, { url, method, params })
      } else if (method === 'post') {
        config = Object.assign({}, { url, method, data: params })
      }

      this.loading = true
      try {
        const {
          data: { data }
        } = await request(config)
        const records = data.records || data
        this.tableData = records.map(i => ({ ...this.hdItem(i) }))
        this.$nextTick(() => {
          this.tableData.forEach(i => {
            this.toggleSelections.forEach(si => {
              if (i[this.toggleItemComparisonKey] === si[this.toggleItemComparisonKey]) {
                this.$refs['SelectTable'].$refs['table'].toggleRowSelection(i, true)
              }
            })
          })
        })
        this.pagination.total = data?.total || 0
        this.loading = false
      } catch (error) {
        this.$notify({
          title: '提示',
          message: '服务异常',
          type: 'error',
          duration: 2000
        })
        this.loading = false
      }
    },

    getValueByMultiLevelKey(obj = {}, path = '') {
      const arr = path.split('.')
      let v = ''
      arr?.reduce((cur, key, index) => {
        if (index === arr.length - 1) {
          v = cur[key]
        } else {
          return cur[key]
        }
      }, obj)
      return v
    },
    hdItem(row) {
      this.columnConfig.forEach(i => {
        if (i.multiLevelKey) {
          row[i.prop] = this.getValueByMultiLevelKey(row, i.multiLevelKey)
        }
        // 某些字段特殊处理
        if (i.multilevelkeySpecial === 'productOrderMaterials[0].planQuantity') {
          row[i.prop] = row.productOrderMaterials[0].planQuantity
        }
      })

      if (this.expandKey) {
        return { ...row, ...row[this.expandKey] }
      }
      return row
    },
    handleClickTableRow(row, column, event) {
      // 单击数据后，切换该行勾选的状态
      this.$refs['SelectTable'].$refs['table'].toggleRowSelection(row)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  margin: 40px auto;
}
/deep/ .el-dialog__body {
  padding: 0 20px;
  height: 500px;
}

/deep/ .el-dialog__header {
  padding: 20px;
  .el-dialog__close {
    display: none;
  }
}
.reset {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  cursor: pointer;
}
.pagination-container {
  bottom: 10px;
}
.bnts {
  text-align: center;
  margin-top: 10px;
}
</style>
