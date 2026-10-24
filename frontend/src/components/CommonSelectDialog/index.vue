
<!--
    *@Author:xuqiuming
    * @Date: 2022-08-17 12:02:01
 * @LastEditTime: 2023-06-27 18:17:31
 * @LastEditors: chenzejie
    * @Description: 全部继承element ui弹窗
-->
<template>
  <el-dialog
    v-bind="$attrs"
    width="70%"
    :visible.sync="diaVisible"
    class="common-select-dialog"
    v-on="$listeners"
  >
    <SelectTable
      ref="SelectTable"
      v-loading="loading"
      handle-selection-change
      height="500"
      :column="columnConfig"
      :table-data="tableData"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
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
        <el-button type="primary" size="small" @click="confirm">
          确认
        </el-button>
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
export default {
  components: {
    SelectTable,
    Pagination
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
      validator: value =>
        Object.keys(value).includes('url') &&
        Object.keys(value).includes('method')
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
      default: false
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
      hasSelectedRows: []
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
    // toggleSelections: {
    //   immediate: true,
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     console.log(newValue, 'newValue')
    //     this.$nextTick(() => {
    //       console.log(this.$refs['SelectTable'], 'SelectTable')
    //       newValue.forEach(i => {
    //         (this.$refs['SelectTable']).$refs['table'].toggleRowSelection(i, true)
    //       })
    //     })
    //   }
    // }
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
    handleSelectionChange(rows) {
      this.hasSelectedRows = rows
    },
    handleCurrentChange(row) {
      this.currnetRow = row
    },
    cancel() {
      console.log(22)
      this.$emit('cancel')
    },
    reset() {
      eventBus.$emit('resetQuery')
    },
    confirm() {
      // console.log(11)
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
      } else if (
        this.isRequired &&
        isSelects &&
        this.hasSelectedRows.length === 0
      ) {
        return this.$notify({
          title: '提示',
          message: '请至少选择一项',
          type: 'warning',
          duration: 1000
        })
      } else if (!this.isRequired && isSelects) {
        console.log(this.hasSelectedRows, 'hasSelectedRows')
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
          this.tableData = records.map(i => ({ ...this.hdItem(i) }))
          this.$nextTick(() => {
            this.tableData.forEach(i => {
              this.toggleSelections.forEach(si => {
                if (
                  i[this.toggleItemComparisonKey] ===
                  si[this.toggleItemComparisonKey]
                ) {
                  this.$refs['SelectTable'].$refs['table'].toggleRowSelection(
                    i,
                    true
                  )
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
      })
      return row
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
