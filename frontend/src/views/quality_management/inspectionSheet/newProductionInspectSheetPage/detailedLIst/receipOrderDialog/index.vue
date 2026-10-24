<!--
    *@Author:xuqiuming
    * @Date: 2022-08-17 12:02:01
 * @LastEditTime: 2024-10-14 14:15:22
 * @LastEditors: laidz laidz@yelinked.com
    * @Description: 全部继承element ui弹窗
-->
<template>
  <el-dialog
    v-bind="$attrs"
    width="70%"
    :visible.sync="diaVisible"
    append-to-body
    class="common-select-dialog"
    title="选择关联单据编号"
    v-on="$listeners"
  >
    <SelectTable
      ref="SelectTable"
      v-loading="loading"
      handle-selection-change
      :disable-row="disabledRow"
      height="500"
      :column="columnConfig"
      :table-data="tableData"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @row-click="handleClickTableRow"
    />
    <Pagination
      v-show="pagination.total > 0"
      :total="pagination.total"
      :page.sync="pagination.current"
      :limit.sync="pagination.size"
      @pagination="getList"
    />
    <template #footer>
      <div class="bnts">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="confirm"> 确认 </el-button>
      </div>
    </template>

    <div class="reset" @click="reset">
      <i class="el-icon-refresh-right" />
    </div>
  </el-dialog>
</template>

<script>
import SelectTable from './selectTable.vue'
import Pagination from '@/components/Pagination3'
import request from '@/utils/request'
import { eventBus } from '@/main.js'
import { COLUMNS_CONFIG } from './columnsConfig'
export default {
  components: {
    SelectTable,
    Pagination
  },
  props: {
    requestConfig: {
      require: true,
      type: Object,
      default: () => ({
        url: `/ams/receipt/list/material/batch`,
        method: 'post'
      }),
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
    isRequired: {
      // 是否要必须选择一项
      type: Boolean,
      default: true
    },
    disabledRow: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableData: [],
      pagination: {
        current: 1,
        size: 20,
        total: 0
      },

      queryParams: {},
      loading: false,
      currnetRow: {}, // 当前点击选中的行,
      hasSelectedRows: [],
      columnConfig: COLUMNS_CONFIG
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

  watch: {},
  async created() {
    this.getList()
  },
  mounted() {
    eventBus.$on('getQueryParams', this.updateQueryParamsAndGetList)
  },
  beforeDestroy() {
    eventBus.$off('getQueryParams', this.updateQueryParamsAndGetList)
  },
  methods: {
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
        this.$emit('confirm', JSON.parse(JSON.stringify(this.hasSelectedRows)))
      }
    },
    updateQueryParamsAndGetList(v) {
      this.queryParams = JSON.parse(JSON.stringify(v))
      this.pagination.current = 1
      this.getList()
    },

    async getList() {
      const { size, current } = this.pagination
      const params = { size, current, ...this.queryParams, ...this.extraParams }
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
          data: {
            code,
            message,
            data: { total = 0, records = [] }
          }
        } = await request(config)
        if (code === '200') {
          this.tableData = records
            .map(i => ({ ...this.hdItem(i) }))
            .map(i => ({ ...i, recepitNum: i.barCode ? i.barCount : i.amount }))
          this.$nextTick(() => {
            this.tableData.forEach(i => {
              this.toggleSelections.forEach(si => {
                if (i.id === si.id) {
                  this.$refs['SelectTable'].$refs['table'].toggleRowSelection(i, true)
                }
              })
            })
          })
          this.pagination.total = total
        } else {
          this.$notify({
            title: '提示',
            message: message || '服务异常',
            type: 'error',
            duration: 2000
          })
        }
        this.loading = false
      } catch (error) {
        console.log(error, 'error')
        this.$notify({
          title: '提示',
          message: error,
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
          v = cur?.[key]
        } else {
          return cur?.[key]
        }
      }, obj)
      return v
    },
    hdItem(row) {
      this.columnConfig.forEach(i => {
        if (i.multiLevelKey) {
          row[i.prop] = this.getValueByMultiLevelKey(row, i.multiLevelKey)
        }
      })
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
  height: 700px;
}
/deep/ .el-dialog__body {
  height: calc(100% - 54px);
  padding-bottom: 60px;
}

/deep/ .el-dialog__header .el-dialog__headerbtn {
  display: none;
}
/deep/ .el-dialog__footer {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
}
.reset {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  cursor: pointer;
}
.pagination-container {
  bottom: 60px;
}
// .bnts
</style>
