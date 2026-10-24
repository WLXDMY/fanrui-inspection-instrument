<template>
  <div class="samplingProgram">
    <!-- 头部按钮 -->
    <header class="btns">
      <el-button
        v-permission="{ action: 'qms-product-inspection.inspection-manage.samplePlane:add' }"
        size="small"
        type="primary"
        @click="handleAdd"
      >
        新增抽样方案
      </el-button>
      <!--  <ImportBtn style="margin-left: 8px" :import-params="importParams" @updateList="getStandardList" /> -->
      <el-button
        v-if="isExistApproveBtn"
        v-permission="{ action: 'qms-product-inspection.inspection-manage.samplePlane:batchApproval' }"
        size="small"
        type="primary"
        style="margin-left: 8px"
        @click="hdBtnBacthAudit"
      >
        批量审批
      </el-button>
      <el-button
        v-permission="{ action: 'qms-product-inspection.inspection-manage.samplePlane:batchUpdate' }"
        size="small"
        type="primary"
        style="margin-left: 8px"
        @click="hdBtnBacthEdit"
      >
        批量编辑
      </el-button>
      <div class="reset-btn">
        <el-button size="small" @click="reset"> 重置 </el-button>
      </div>
    </header>
    <main class="main">
      <section v-loading="loading" class="table-container">
        <ElTableContent
          class="etable"
          :search="tableSearch"
          :list-query="listQuery"
          :table-data="tableData"
          :table-column="tableColumn"
          :action-width="280"
          :select-option="selectList"
          :request-config="requestConfig"
          height="100%"
          modular-type="samplePlane"
          :is-get-current-path="false"
          @selectionChange="handleSelectionChange"
          @filterSearch="filterSearch"
          @approveStatus="handleApprovalStatus"
          @makeNewRequest="makeNewRequest"
        >
          <template #checkStateName="{ special: { row } }">
            <div>
              {{ row.checkStateName }}
            </div>
          </template>
          <template v-slot:tableAction="{ row }">
            <div class="level buttons" style="padding: 0 5px">
              <div
                v-permission="{ action: 'qms-product-inspection.inspection-manage.samplePlane:update' }"
                class="edit-text"
                @click="gotoEditPage(row)"
              >
                编辑
              </div>
              <div
                v-permission="{ action: 'qms-product-inspection.inspection-manage.samplePlane:select' }"
                class="detail-text"
                @click="gotoDetailPage(row)"
              >
                详情
              </div>
              <div v-if="isExistApproveBtn" class="detail-text">
                <span v-if="row.status === 0" @click="handleApprove(row)">审批</span>
                <span v-else style="color: rgb(166, 174, 190); cursor: not-allowed">审批</span>
              </div>
              <!--   <div class="forbidden-text">
                <el-button :disabled="row.status === 3" type="text" style="padding: 0" @click="handleForbidden(row)">
                  {{ row.status === 0 || row.status === 2 ? '启用' : '禁用' }}
                </el-button>
              </div> -->
              <div
                v-permission="{ action: 'qms-product-inspection.inspection-manage.samplePlane:delete' }"
                style="margin-left: 8px"
                class="delete-text"
                @click="handleDelete(row)"
              >
                删除
              </div>
            </div>
          </template>
        </ElTableContent>
        <pagination3
          class="pagination"
          :total="total"
          :page.sync="listQuery.current"
          :limit.sync="listQuery.size"
          @pagination="getStandardList"
        />
      </section>
    </main>
    <!--批量审批弹窗-->
    <ApprovaDialog ref="approvaDialog" @updateList="getStandardList" />
    <!--批量修改状态弹窗-->
    <!-- 批量编辑弹窗 -->
    <StatusDialog
      v-if="isShowBatchDialog"
      :visible.sync="isShowBatchDialog"
      :multip-edit-form="multipEditForm"
      :is-exist-approve-btn="isExistApproveBtn"
      :query-params="listQuery"
      @updateList="batchStatesUpdateCb"
    />
  </div>
</template>
<script>
import ImportBtn from '@/views/common/importExcel/importbtn.vue'
import ApprovaDialog from './components/dialog/approvaDialog.vue'
import StatusDialog from './components/dialog/statusDialog.vue'
import ElTableContent from '@/components/ElTableColumn/index.vue'
import Pagination3 from '@/components/Pagination3/index.vue'
import {
  standardList,
  standardDelete,
  standardDeletePrompt,
  standardDisable,
  standardDefaultTemplate,
  standardImportTemplate,
  standardImportTemplateProgress,
  standardStateList,
  standardTypeList
} from '@/api/quality-manage'
import { CHECK_STANDARDS_TABLE, SEARCH_LIST } from './constant.js'

export default {
  name: 'SamplingProgram',
  components: {
    ImportBtn,
    ElTableContent,
    Pagination3,
    ApprovaDialog,
    StatusDialog
  },
  data() {
    return {
      loading: false, // loading
      selectList: [],
      // 请求数据的基本参数
      listQuery: {
        current: 1,
        size: 20
      },
      total: 0, // 总数
      tableData: [], // 表格数据
      tableSearch: SEARCH_LIST, // 表格可搜索字段
      tableColumn: CHECK_STANDARDS_TABLE, // 表格头列数据
      multipleSelection: [], // 选中的表格行
      isExistApproveBtn: false, // 是否有审批权限
      isShowBatchDialog: false, // 批量编辑
      multipEditForm: {},
      requestConfig: {
        approval: 'productInspectionSample', // 是否有审批的api接口传参字段code
        isMaterial: false
      },
      // 导入配置对象
      importParams: {
        otherParams: {
          ptitle: '导入管理'
        },
        btnList: [
          {
            code: 'teamsDefaultTemplateExport',
            type: 'exportDefaultTpl',
            title: '下载导入模板',
            exportDefualtApi: standardDefaultTemplate
          },
          {
            code: 'teamsBatchImport',
            type: 'import',
            title: '导入数据',
            uploadApi: standardImportTemplate,
            progressApi: standardImportTemplateProgress,
            dialogParams: {
              code: '班组导入',
              importType: 'qmsProductInspectionSamplePlane',
              isExcel: true
            }
          },
          {
            code: 'procedureLogExport',
            type: 'exportLog',
            title: '查看日志',
            resultRoute: 'historyResult',
            routeQuery: {
              importType: 'qmsProductInspectionSamplePlane',
              code: '产品抽样方案'
            }
          }
        ]
      }
    }
  },
  computed: {
    // 是否展示审批按钮
    isAllowApproval(row) {
      return this.isExistApproveBtn
    }
  },
  created() {
    // 获取列表
    this.getStandardList(this.listQuery)
  },
  methods: {
    // 搜索回调处理
    filterSearch(name) {
      switch (name) {
        case 'statusName':
          new Promise(resolve => {
            const result = standardStateList()
            resolve(result)
          }).then(res => {
            this.selectList = res.data.data
          })
          break
        case 'typeName':
          new Promise(resolve => {
            const result = standardTypeList()
            resolve(result)
          }).then(res => {
            this.selectList = res.data.data
          })
          break
      }
    },
    /**
     *
     * @param 批量编辑弹窗回调函数
     */
    batchStatesUpdateCb(queryParams) {
      this.getStandardList(queryParams)
      this.isShowBatchDialog = false
    },
    // 行数据选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /**
     *
     * @param 批量审批
     */
    hdBtnBacthAudit() {
      this.$refs.approvaDialog.open({
        multipleSelection: this.multipleSelection
      })
    },
    // 单个审批
    handleApprove(row) {
      this.$refs.approvaDialog.open({
        multipleSelection: [row]
      })
    },
    /** *
     * @description 批量编辑
     */
    hdBtnBacthEdit() {
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
    // 是否存在审批权限
    handleApprovalStatus(val) {
      this.isExistApproveBtn = val
      if (!this.isExistApproveBtn) {
        this.deleteColumn()
      }
    },
    deleteColumn() {
      const hasIndex = this.tableColumn.findIndex(item => {
        return item.code === 'approvalStatusName'
      })
      if (hasIndex !== -1) {
        this.tableColumn.splice(hasIndex, 1)
      }

      const hasIndex1 = this.tableColumn.findIndex(item => {
        return item.code === 'approverName'
      })
      if (hasIndex1 !== -1) {
        this.tableColumn.splice(hasIndex1, 1)
      }
    },
    getStandardList(params) {
      this.loading = true
      this.listQuery = {
        ...this.listQuery,
        size: params?.limit || this.listQuery.size,
        current: params?.page || this.listQuery.current
      }
      standardList(this.listQuery).then(res => {
        this.tableData = res.data.data.records
        this.total = res.data.data.total
        this.loading = false
      })
    },
    handleAdd() {
      this.$router.push({ name: 'samplingProgramAdd' })
    },
    // 新请求
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        if (el === 'statues') {
          this.listQuery[el] = val[el]?.split(',').map(i => Number(i))
        } else {
          this.listQuery[el] = val[el]
        }
      })
      this.getStandardList()
    },
    // 重置
    reset() {
      this.listQuery = {
        current: 1,
        size: 20
      }
      this.getStandardList(this.listQuery)
    },
    // 禁用
    handleForbidden(row) {
      const params = {
        status: row.status === 1 ? 2 : 1,
        ids: [row.id]
      }
      standardDisable(params).then(res => {
        this.getStandardList(this.listQuery)
      })
    },
    // 删除
    handleDelete(row) {
      // 启用不能删除
      // if (row.status !== 0) {
      //   return
      // }
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        standardDeletePrompt(row.id).then(res => {
          const { promptList, allowDelete } = res.data.data

          if (!allowDelete) {
            const message = promptList.join(';')
            this.$notify({
              title: '提示',
              message: message,
              type: 'warning',
              duration: 3000
            })
            return
          } else {
            standardDelete([row.id]).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getStandardList(this.listQuery)
            })
          }
        })
      })
    },
    // 跳转到编辑页面
    gotoEditPage(row) {
      this.$router.push({
        name: 'samplingProgramEdit',
        query: {
          id: row.id
        }
      })
    },
    // 跳转到详情页面
    gotoDetailPage(row) {
      this.$router.push({
        name: 'samplingProgramDetail',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.samplingProgram {
  height: 100%;
  // width: 100% !important;
  padding-top: 4px;
  background-color: #eaeff5 !important;
  display: flex;
  flex-direction: column;
  .btns {
    background-color: #fff;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    .btn {
      margin-right: 8px;
      border-radius: 4px !important;
    }
    .reset-btn {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      :deep .el-button {
        border-radius: 4px !important;
      }
    }
  }
  .main {
    // 这里设置 height 为 1px 是为了兼顾之前的子组件的布局, 大部分子组件都是 100% 高度
    // 但如果这里也设置 100%, 子组件会出现滚动条, 所以这里设置为 1px, 再依靠 flex = 1
    // 来重新设置子组件的高度, 这样可以再不影响之前代码的情况下,保证不出现高度的问题
    height: 1px;
    flex-shrink: 0;
    background-color: #fff;
    padding: 10px;
    // main 需要把高度占完
    flex: 1;
    display: flex;
    flex-direction: column;
    .table-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      .pagination {
        position: relative;
        width: 100%;
      }
    }
  }
  .edit-text {
    color: #1890ff;
    cursor: pointer;
  }
  .detail-text {
    color: #1890ff;
    cursor: pointer;
    margin-left: 10px;
  }
  .forbidden-text {
    // color: #0078e9;
    // cursor: pointer;
    margin: 0 10px;
  }
  .delete-text {
    color: #ff4d4f;
    cursor: pointer;
  }
  .delete-grey {
    color: rgb(166, 174, 190);
  }
}
.etable {
  max-height: 79vh;
  // height: auto !important;
  // flex: 1;
}
</style>
