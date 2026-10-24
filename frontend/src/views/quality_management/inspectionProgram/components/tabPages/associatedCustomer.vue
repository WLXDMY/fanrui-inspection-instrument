<template>
  <div>
    <el-button
      v-if="type !== 'detail'"
      :disabled="initStatus === 1"
      class="add-btn"
      type="primary"
      size="small"
      @click="hdcustomer"
    >选择关联客户</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{
        background: '#F3F3F3',
        color: 'rgba(0, 0, 0, 0.85)',
        height: '48px'
      }"
      max-height="400"
      highlight-current-row
    >
      <el-table-column type="index" label="序号" />
      <el-table-column prop="customerCode" label="客户编码" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column
        v-if="type !== 'detail' && initStatus != 1"
        label="操作"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <div class="delete-text" @click="handleDelete(row, $index)">删除</div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="showDialog"
      title="新增关联客户"
      class="dialog"
      :append-to-body="true"
      :visible.sync="showDialog"
      width="70%"
      :show-close="false"
    >
      <ElTableContent
        ref="elTableontentRef"
        max-height="400"
        :action-width="0"
        :search="tableSearch"
        :table-data="customerListOptions"
        :table-column="tableColumn"
        :list-query="listQuery"
        :request-config="requestConfig"
        row-key="customerId"
        :select-option="tableData"
        modular-type="associatedCustomer"
        @selectionChange="handleSelectionChange"
        @filterSearch="filterSearch"
        @makeNewRequest="makeNewRequest"
      />
      <pagination3
        v-show="total > 0"
        style="position: static"
        :total="total"
        :page.sync="listQuery.current"
        :limit.sync="listQuery.size"
        @pagination="getCustomerList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel"> 取消 </el-button>
        <el-button type="primary" size="small" @click="hdConfirm"> 确认 </el-button>
      </div>
      <!-- 刷新 -->
      <div class="refresh" @click="reset">
        <i class="el-icon-refresh-right" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination3 from '@/components/Pagination3'
import { getCustomerList, deleteSchemeCustomer } from '@/api/quality-manage'
import { v4 as uuidv4 } from 'uuid'
import ElTableContent from '@/components/ElTableColumn'
const table = [
  {
    id: uuidv4(),
    label: '客户编码',
    code: 'customerCode',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '客户名称',
    code: 'customerName',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]
const LIST = [
  { name: 'customerCode', type: 'input' },
  { name: 'customerName', type: 'input' }
]
export default {
  components: {
    ElTableContent,
    Pagination3
  },
  props: {
    initStatus: {
      type: Number,
      default: 0
    },
    customerData: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    formInline: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      customerListOptions: [], // 客户列表
      showDialog: false, // 弹窗
      mutipleSelection: [], // 多选
      tableData: [], // 客户数据

      tableColumn: table, // 弹窗表格列
      tableSearch: LIST, // 弹窗表格搜索
      listQuery: {
        size: 20,
        current: 1
      },
      total: 0,
      requestConfig: {
        isMaterial: false
      }
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
    customerData: {
      handler(val) {
        this.tableData = val
      },
      deep: true
    }
  },
  mounted() {
    this.getCustomerList()
  },
  methods: {
    // 回显
    async reShowRow() {
      // 回显选中
      let timer = setTimeout(() => {
        if (!this.$refs['elTableontentRef'] || !this.$refs['elTableontentRef'].$refs['listTable']) {
          clearTimeout(timer)
          timer = null
          return
        }
        this.customerListOptions.forEach(row => {
          const hasIndex = this.tableData.findIndex(i => {
            return i.customerId === row.customerId
          })
          if (hasIndex !== -1) {
            this.$refs['elTableontentRef'].$refs['listTable'].toggleRowSelection(row, true)
          }
        })
        clearTimeout(timer)
        timer = null
      }, 500)
    },
    resetListQuery() {
      this.listQuery = {
        size: 20,
        current: 1
      }
    },
    reset() {
      this.resetListQuery()
      this.getCustomerList()
    },
    cancel() {
      this.showDialog = false
      this.resetListQuery()
    },
    makeNewRequest(params) {
      console.log('makeNewRequest -> ', params)
      this.getCustomerList(params)
    },
    filterSearch(val) {
      console.log('filterSearch -> ', val)
    },
    // 弹窗多选
    handleSelectionChange(val) {
      console.log('handleSelectionChange -> ', val)
      this.mutipleSelection = val
    },
    // 弹窗确认
    hdConfirm() {
      this.showDialog = false
      console.log('hdConfirm -> ', this.mutipleSelection)
      // 过滤数据
      const data = this.mutipleSelection.filter(item => {
        const hasIndex = this.tableData.findIndex(i => {
          return (i.customerId === item.customerId && i.isOriginal) || i.customerId === item.customerId
        })
        if (hasIndex !== -1) {
          return false
        }
        return true
      })
      this.tableData.push(...data)
      this.resetListQuery()
    },
    // 删除关联客户
    handleDelete(row, index) {
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          if (row.id && row.isOriginal) {
            await deleteSchemeCustomer(this.formInline.schemeId, [row.id])
          }
          this.tableData.splice(index, 1)
        })
        .catch(() => {
          return
        })
    },
    // 新增关联客户
    hdcustomer() {
      this.showDialog = true
      this.reShowRow()
    },
    // 获取客户列表
    getCustomerList(params) {
      const data = {
        ...this.listQuery,
        cusState: '2',
        ...params
      }
      getCustomerList(data).then(res => {
        if (res.data.code === '200') {
          this.customerListOptions = res.data.data.records
          this.total = res.data.data.total
          this.reShowRow() // 回显
        }
      })
    },
    // 数据回显
    handleEcho(data) {
      this.tableData = data.map(item => {
        return {
          ...item,
          isOriginal: true
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add-btn {
  margin-bottom: 15px;
}
.delete-text {
  color: #ff4618;
  cursor: pointer;
}
.refresh {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  > i {
    font-size: 20px;
  }
}

.dialog {
  &:deep(.el-dialog__body) {
    padding-bottom: 0 !important;
  }
}
</style>
