<template>
  <div class="wrapper-list">
    <section class="container">
      <!-- 顶部按钮区域 -->
      <header style="margin-bottom: 10px" class="btns">
        <section class="btn-left">
          <TopHeader
            :list-query="listQuery"
            :multiple-selection="multipleSelection"
            @handleBatchEdit="handleBatchEdit"
            @updateList="updateList"
          />
        </section>

        <div class="btn-right">
          <!-- 右边盒子 -->
          <div class="reset">
            <el-button size="mini" @click="resetTemp"> 重置 </el-button>
          </div>
        </div>
      </header>
      <!-- 表格区域 defectDefinition -->
      <main class="tablebox">
        <ElTableContent
          :table-loading="loading"
          :search="tableSearch"
          :list-query="listQuery"
          :table-data="tableData"
          :table-column="tableColumn"
          :action-width="200"
          highlight-current-row
          :request-config="requestConfig"
          modular-type="defectReasonDefinition"
          column-permission-action="qms-product-inspection.inspection-manage.defectReason:columnConfigList"
          :select-option="selectList"
          @filterSearch="filterSearch"
          @selectionChange="handleSelectionChange"
          @makeNewRequest="makeNewRequest"
        >
          <template v-slot:status="{ special: { row } }">
            <div style="display: flex; align-items: center">
              <div
                class="left-radius"
                :style="{
                  background: window.stateColor.getStateColor(getStatusText(row.status))
                }"
              />
              <span> {{ getStatusText(row.status) }}</span>
            </div>
          </template>
          <template v-slot:tableAction="{ row }">
            <div class="level buttons" style="padding: 0 5px">
              <div
                v-permission="{ action: 'qms-product-inspection.inspection-manage.defectReason:update' }"
                class="edit-text"
                @click="handleUpdate(row)"
              >
                编辑
              </div>
              <div
                v-permission="{ action: 'qms-product-inspection.inspection-manage.defectReason:select' }"
                class="details-btn"
                @click="handleMore(row)"
              >
                详情
              </div>
              <div
                v-permission="{ action: 'qms-product-inspection.inspection-manage.defectReason:delete' }"
                class="details-btn"
                :class="{ 'delete-grey': row.status != 0 ? true : false }"
                style="color: #f56c6c"
                @click="handleDelete(row)"
              >
                删除
              </div>
            </div>
          </template>
        </ElTableContent>
        <pagination3
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.current"
          :limit.sync="listQuery.size"
          @pagination="getList"
        />
      </main>
    </section>

    <!-- 批量编辑弹窗 -->
    <BatchsEditDialog
      v-if="isShowBatchDialog"
      :visible.sync="isShowBatchDialog"
      :multip-edit-form="multipEditForm"
      @updateList="updateList"
    />
  </div>
</template>

<script>
import { COLUMNS_CONFIG, TABLE_SEARCH } from './constant'
import { USE_DEFECTS_REASON_API } from '@/api/defectReason.js'
import TopHeader from './components/home/headActionBtn.vue'
import BatchsEditDialog from './components/home/batchsEditDialog.vue' // 批量编辑弹窗
import ElTableContent from '@/components/ElTableColumn'
import Pagination3 from '@/components/Pagination3'
const DEFECTS_REASON_API = USE_DEFECTS_REASON_API()
export default {
  components: {
    TopHeader,
    ElTableContent,
    Pagination3,
    BatchsEditDialog
  },
  data() {
    return {
      window,
      statusList: [], // 状态列表
      loading: false, // 表格loading
      listQuery: {
        // 分页查询参数
        current: 1,
        size: 20
      },
      importParams: {},
      multipleSelection: [], // 批量选择的数据
      selectList: [],
      total: 0, // 总数
      tableSearch: TABLE_SEARCH, // 表格支持查询的参数配置对象
      tableData: [], // 表格数据
      tableColumn: COLUMNS_CONFIG,
      requestConfig: {
        approvalFields: [],
        approval: '',
        isMaterial: false
      },
      isShowBatchDialog: false, // 批量编辑弹窗
      multipEditForm: null // 批量编辑需要的数据对象
    }
  },
  computed: {
    // 行状态label
    getStatusText() {
      return RowStatus => {
        const hasIndex = this.statusList.findIndex(item => {
          return RowStatus === item.code
        })
        if (hasIndex !== -1) {
          return this.statusList[hasIndex].name
        }
        return ''
      }
    }
  },
  created() {
    // 从 sessionStorage 获取筛选条件
    this.listQuery = this.$getForwardSessionCommon() ? this.$getForwardSessionCommon() : this.listQuery
    Promise.allSettled([this.getList(), this.getStatusList()])
  },
  methods: {
    // 表格搜索处理
    filterSearch(name) {
      switch (name) {
        case 'status':
          this.selectList = this.statusList.map(item => {
            return {
              code: item.code,
              name: item.name
            }
          })
          break
      }
    },
    resetTemp() {
      this.listQuery = {
        current: 1,
        size: 20
      }
      this.getList()
    },

    // 接收表格筛选的数据，并请求
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        if (el === 'statues') {
          this.listQuery[el] = val[el]?.split(',').map(i => Number(i))
        } else {
          this.listQuery[el] = val[el]
        }
      })
      this.getList()
    },

    // 批量编辑按钮回调
    handleBatchEdit() {
      if (this.multipleSelection.length === 0) {
        return this.$notify({
          title: '提示',
          message: '请选择数据',
          type: 'warning',
          duration: 1000
        })
      }
      const uniStates = Array.from(new Set(this.multipleSelection.map(i => i.status)))
      if (uniStates.length > 1) {
        return this.$notify({
          title: '提示',
          message: '所选状态不一致，请重新选择',
          type: 'warning',
          duration: 1000
        })
      }
      this.multipEditForm = {
        status: uniStates[0],
        ids: this.multipleSelection.map(i => i.id)
      }
      this.isShowBatchDialog = true
    },

    /**
     *
     * @param 批量编辑弹窗回调函数
     */
    updateList() {
      this.getList()
      this.isShowBatchDialog = false
    },

    // 勾选行数据回调
    handleSelectionChange(e) {
      console.log(e)
      this.multipleSelection = e
    },

    // 获取状态枚举列表
    async getStatusList() {
      try {
        const result = await DEFECTS_REASON_API.getDefectsStatusApi()
        this.statusList = result && result.data && result.data.data ? result.data.data : []
      } catch (err) {
        console.log(err)
      }
    },

    /**
     * @description: 获取列表
     * @param {type}: {description}
     */
    async getList() {
      const params = {
        ...this.listQuery
      }
      this.loading = true
      const result = await DEFECTS_REASON_API.getDefectsListApi(params)
      this.loading = false
      console.log('result', result)
      this.tableData = result.data && result.data.data ? result.data.data.records : []
      this.total = result.data && result.data.data ? result.data.data.total : 0
    },
    /**
     * @description 编辑
     * @param {type}: {description}
     */
    handleUpdate(row) {
      // 存储到 sessionStorage
      this.$setForwardSessionCommon(this.listQuery)
      const { id } = row || {}
      this.$router.push({
        name: 'defectReasonEdit',
        query: {
          id
        }
      })
    },
    /**
     * @description 详情
     * @param {type}: {description}
     */
    handleMore(row) {
      // 存储到 sessionStorage
      this.$setForwardSessionCommon(this.listQuery)
      const { id } = row || {}
      this.$router.push({
        name: 'defectReasonDetail',
        query: {
          id
        }
      })
    },
    // 删除行
    async handleDelete(row) {
      const { id, status } = row || {}
      // 只能删创建状态下的
      if (status !== 0) {
        this.$notify({
          title: '提示',
          message: '只能删除创建状态下的数据',
          type: 'warning',
          duration: 2000
        })
        return
      }
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await DEFECTS_REASON_API.defectsDelApi([id])
        const { message } = result.data || {}
        this.$notify({
          title: '提示',
          message: message || '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-top {
  display: flex;
  justify-content: space-between;
  padding: 16px;

  .left {
    display: flex;
    align-items: center;
    .Importbtn {
      height: 32px;
      overflow: hidden;
      margin-top: 0;
    }
    .level {
      margin-right: 10px;
    }
    ::v-deep .el-dropdown {
      // margin-top: -5px;
    }
  }
  .action {
    display: flex;
    align-items: center;
    ::v-deep .el-dropdown {
      margin-top: -3px !important;
      .el-button--small {
        padding: 8px 15px;
      }
    }
  }
}
.tablebox {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .disable-delete {
    color: #a6aebe !important;
    cursor: not-allowed !important;
  }
}

.delete-grey {
  color: rgb(166, 174, 190) !important;
}
</style>
