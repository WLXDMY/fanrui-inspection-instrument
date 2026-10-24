<!--
 * @Author: limengjuan
 * @Date: 2021-12-15 13:06:54
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-03-18 09:23:33
 * @Description:
-->
<template>
  <div class="wrapper-list">
    <div class="container">
      <div style="margin-bottom: 42px" class="btns">
        <div class="btn-left">
          <el-button
            v-permission="{ action: 'qms-product-inspection.inspection-manage.project:add' }"
            type="primary"
            class="add-btn centre2"
            @click="handleAdd"
          >
            新增项目
          </el-button>
          <el-button
            v-permission="{ action: 'qms-product-inspection.inspection-manage.projectgroup:add' }"
            type="primary"
            class="add-btn centre2"
            @click="addNewItemGroup"
          >
            新增项目组
          </el-button>
          <el-button type="primary" class="add-btn centre2" @click="jumpLinkToItemGroup"> 管理项目组 </el-button>
          <ImportBtn
            v-permission="{ action: 'qms-product-inspection.inspection-manage.project:importManage' }"
            style="margin-left: 8px"
            :import-params="importParams"
            @updateList="getAllListData()"
          />
          <el-button
            v-permission="{ action: 'qms-product-inspection.inspection-manage.project:batchUpdate' }"
            type="primary"
            style="margin-left: 8px"
            @click="hdBtnBacthEdit"
          >批量编辑</el-button>
        </div>
        <div class="btn-right">
          <!-- 右边盒子 -->

          <div class="reset">
            <el-button size="mini" @click="reset()"> 重置 </el-button>
          </div>
        </div>
      </div>
      <div class="container1-3 inspection-plan-list">
        <ItemGroupTree ref="itemGroupTreeRef" @changeCheck="handleChangeGroupCheck" />
        <div class="bg-box">
          <div class="tablebox">
            <ElTableContent
              :search="tableSearch"
              :list-query="listQuery"
              :table-data="tableData"
              :table-column="tableColumn"
              :action-width="260"
              :select-option="selectList"
              :request-config="requestConfig"
              modular-type="qmsProductInspectionProject"
              column-permission-action="qms-product-inspection.inspection-manage.project:columnConfigList"
              @selectionChange="handleSelectionChange"
              @filterSearch="filterSearch"
              @approveStatus="handleApprovalStatus"
              @makeNewRequest="makeNewRequest"
            >
              <template #importantInspection="{ special: { row } }">
                {{ row.importantInspection ? '是' : '否' }}
              </template>
              <template #export="{ special: { row } }">
                {{ row.export ? '是' : '否' }}
              </template>
              <template #groupName="{ special: { row } }">
                {{
                  row.itemGroupEntity && row.itemGroupEntity.groupName
                    ? row.itemGroupEntity.groupName
                    : row.groupName
                      ? row.groupName
                      : ''
                }}
              </template>

              <template v-slot:tableAction="{ row }">
                <div class="level buttons" style="padding: 0 5px">
                  <div
                    v-permission="{ action: 'qms-product-inspection.inspection-manage.project:update' }"
                    class="edit-text"
                    @click="handleUpdate(row)"
                  >
                    编辑
                  </div>
                  <div
                    v-permission="{ action: 'qms-product-inspection.inspection-manage.project:select' }"
                    class="details-btn"
                    @click="handleMore(row)"
                  >
                    详情
                  </div>

                  <el-dropdown class="more-btn" @command="handleCommand">
                    <span class="el-dropdown-link"> 更多 <i class="el-icon-arrow-down el-icon--right" /> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-permission="{ action: 'qms-product-inspection.inspection-manage.project:delete' }"
                        :command="{ method: handleDelete, row: row }"
                        :class="{
                          'edit-text': true,
                          'delete-text': true
                        }"
                      >
                        删除
                      </el-dropdown-item>
                      <!-- <el-dropdown-item
                        v-else
                        v-permission="{ action: 'qms-product-inspection.inspection-manage.project:delete' }"
                        style="color: #a6aebe; cursor: not-allowed"
                      >
                        删除
                      </el-dropdown-item> -->
                      <el-dropdown-item
                        v-permission="{ action: 'qms-product-inspection.inspection-manage.project:copy' }"
                        :command="{ method: copyCheckPlan, row: row }"
                        class="edit-text"
                      >
                        复制
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="row.status === 0 && isExistApproveBtn"
                        v-permission="{
                          action: 'qms-product-inspection.inspection-manage.project:approval'
                        }"
                        :command="{ method: handleApproval, row: row }"
                        class="edit-text"
                      >
                        审批
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-else-if="isExistApproveBtn"
                        v-permission="{
                          action: 'qms-product-inspection.inspection-manage.project:approval'
                        }"
                        style="color: #a6aebe; cursor: not-allowed"
                      >
                        审批
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </ElTableContent>
          </div>
          <pagination3
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.current"
            :limit.sync="listQuery.size"
            @pagination="getAllListData"
          />
        </div>
      </div>
    </div>
    <SaveItemGroup
      ref="itemGroupDialog"
      :save-item-group-dialog-visible="saveItemGroupDialogVisible"
      :title="saveItemGroupDialogTitle"
      :operate-type="groupOperateType"
      @cancel="saveItemGroupDialogVisible = false"
      @confirm="saveItemGroupConfirm"
    />
    <!-- 批量编辑弹窗 -->
    <StatusDialog
      v-if="isShowBatchDialog"
      :visible.sync="isShowBatchDialog"
      :multip-edit-form="multipEditForm"
      :exist-approve="isExistApproveBtn"
      @updateList="updateList"
    />
    <!--审批弹窗-->
    <ApprovaDialog ref="approvaDialog" @updateList="updateList" />
  </div>
</template>

<script>
import ApprovaDialog from './components/approvalDialog'
import ImportBtn from '@/views/common/importExcel/importbtn.vue'
import StatusDialog from './components/statusDialog.vue'
import {
  projectTemplateExport,
  projectExcelImport,
  projectImportProgress,
  getCheckProjectList,
  getProjectGroupList,
  deleteProjectItem,
  deleteProjectItemPrompt,
  downloadDataList,
  getProjectItemStateList,
  addProjectTeamDefine
} from '@/api/quality-manage.js'
import { isExistApprove } from '@/api/examineApprove.js'
import Pagination3 from '@/components/Pagination3'
import { PRODUCT_INSPECTION_PROJECT, PRODUCT_INSPECTION_PROJECT_LIST } from '@/constant/productInspectionProject.js'
import ElTableContent from '@/components/ElTableColumn/index.vue'
import ItemGroupTree from '../components/ItemGroupTree.vue'
import { saveAs } from 'file-saver'
import store from '@/store'
import { mapGetters } from 'vuex'

const FULLROUTECODE = '/inspection-manage/qms-product-inspection/project' // 当前模块配置关键字
const PAGEFULLPATHCODE = 'qms.qmsItem.qmsItemList' // 当前页配置关键字

export default {
  components: {
    ApprovaDialog,
    ImportBtn,
    StatusDialog,
    Pagination3,
    ElTableContent,
    ItemGroupTree,
    SaveItemGroup: () => import('../inspectionItemGroup/components/saveItemGroup.vue')
  },
  filters: {},
  data() {
    return {
      importParams: {
        otherParams: {
          ptitle: '导入管理'
        },
        btnList: [
          {
            code: 'teamsDefaultTemplateExport',
            type: 'exportDefaultTpl',
            title: '下载导入模板',
            permission: {
              action: 'qms-product-inspection.inspection-manage.project:downDefaultImportTemplate'
            },
            exportDefualtApi: projectTemplateExport
          },
          {
            code: 'teamsBatchImport',
            type: 'import',
            title: '导入数据',
            uploadApi: projectExcelImport,
            progressApi: projectImportProgress,
            permission: {
              action: 'qms-product-inspection.inspection-manage.project:importData'
            },
            dialogParams: {
              fileName: '检验项目.xlsx',
              code: '班组导入',
              importType: 'itemImport',
              isExcel: true
            }
          },
          {
            code: 'procedureLogExport',
            type: 'exportLog',
            title: '查看日志',
            resultRoute: 'historyResult',
            permission: {
              action: 'qms-product-inspection.inspection-manage.project:importLog'
            },
            routeQuery: {
              importType: 'itemImport',
              code: '产品检验项目'
            }
          }
        ]
      },
      window,
      tableColumn: PRODUCT_INSPECTION_PROJECT,
      tableSearch: PRODUCT_INSPECTION_PROJECT_LIST,
      selectList: [],
      tableData: [],
      loading: false,
      total: 20,
      listQuery: {
        current: 1,
        size: 20,
        treeInspectionItemGroupIds: ''
      },
      approvealList: [], // 审批人
      isExistApproveBtn: false,
      multipleSelection: [],
      code: 'productInspectionProject',
      requestConfig: {
        approval: 'productInspectionProject',
        approvalFields: ['approvalStatusName']
      },
      saveItemGroupDialogVisible: false,
      saveItemGroupDialogTitle: '新增检验项目组',
      groupOperateType: 'add',
      multipEditForm: {},
      isShowBatchDialog: false
    }
  },
  computed: {
    ...mapGetters(['fieldRuleDetail']),
    computedNotBtnAuthList() {
      return val => {
        const authList = store.getters.authList?.map(auth => auth.path)
        return authList.indexOf(val) === -1
      }
    }
  },
  beforeRouteLeave(to, form, next) {
    const whiteList = [
      'productInspectionImportView',
      'inspectionitemsAdd',
      'definitionResultQuality',
      'inspectionitemsDetail',
      'qualitiesCheckProjectDuplication',
      'inspectionitemsEdit',
      'qualitiesCheckProjectApproval',
      'productInspectionProjectTeamDefine',
      'copyCheckPlan'
    ]
    // 离开路由时删除 sessionStorage 中的筛选条件
    this.$beforeRouteLeaveSessionCommon(whiteList, to)
    next()
  },
  watch: {
    fieldRuleDetail: {
      handler(newVal) {
        // 动态字段配置有值则更新字段
        Object.keys(newVal?.[FULLROUTECODE] || {}).length && this.initFields()
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getApproveConfig()
    // this.getAllListData()
    this.getProjectGroupList()
  },
  mounted() {
    // 从 sessionStorage 获取筛选条件
    this.listQuery = this.$getForwardSessionTab(
      {
        current: 'current',
        size: 'size'
      },
      'inspectionItems'
    )
    const treeInspectionItemGroupIds = this.listQuery.treeInspectionItemGroupIds
    const selectGroupIds = treeInspectionItemGroupIds?.split(',') || []
    this.handleTreeSelected(selectGroupIds)
    // 获取列表数据
    this.getAllListData()
    this.initFields()
  },
  methods: {
    // 表格操作更多选项
    handleCommand(val) {
      const { method, row, required, str } = val || {}
      if (!method) {
        return
      }
      if (str && required) {
        method(row, required, str)
      } else {
        method(row)
      }
    },
    // 勾选树节点数据
    handleTreeSelected(selectGroupIds) {
      if (selectGroupIds) {
        this?.$refs['itemGroupTreeRef']?.$refs?.itemGroupTree?.setCheckedKeys(selectGroupIds)
      }
    },
    // 动态字段配置处理且特征参数配置处理
    initFields() {
      this.tableColumn = PRODUCT_INSPECTION_PROJECT.flatMap(item => {
        const currentConfig =
          this.fieldRuleDetail?.[FULLROUTECODE]?.[PAGEFULLPATHCODE]?.find(i => i.fieldCode === item.code) || {}
        return currentConfig?.isShow ||
          currentConfig?.isShow === undefined ||
          // (item.prop === 'auxiliaryAttr' && this.showSpecificParams && currentConfig?.isShow) ||
          item.code === 'operate'
          ? [
            {
              ...item,
              label: currentConfig.fieldCustomName || currentConfig.fieldDefaultName || item.label
            }
          ]
          : []
      })
    },
    saveItemGroupConfirm() {
      this.saveItemGroupDialogVisible = false
      if (this.groupOperateType === 'add') {
        this.addItemGroup()
      }
    },
    async addItemGroup() {
      const params = this.$refs['itemGroupDialog'].itemGroup
      await addProjectTeamDefine(params)
      this.getProjectGroupList()
      this.$notify({
        title: '提示',
        message: '新增成功',
        type: 'success',
        duration: 2000
      })
      // 刷新检验项目组
      this.$refs.itemGroupTreeRef.getAllTreeItemGroup()
      this.$refs.itemGroupDialog.getAllTreeItemGroup()
    },
    // 跳转项目组
    jumpLinkToItemGroup() {
      this.$router.push({ name: 'inspectionItemGroup' })
    },
    // 增加项目组
    addNewItemGroup() {
      this.saveItemGroupDialogVisible = true
      this.saveItemGroupDialogTitle = '新增检验项目组'
      this.groupOperateType = 'add'
    },
    // 批量审批
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取审批
    async getApproveConfig(val) {
      const res = await isExistApprove('productInspectionProject')
      this.isExistApproveBtn = res.data.data
    },
    // 复制
    async copyCheckPlan(row) {
      // 判断是否已经添加了定义
      if (this.groupList.length === 0) {
        this.$confirm('你尚未添加项目组定义，是否前往添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$router.push({
              name: 'inspectionItemGroup'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        return
      }

      const { id } = row || {}
      this.$router.push({
        name: 'inspectionitemsAdd',
        query: {
          id
        }
      })
      // 存储到 sessionStorage
      this.$setForwardSessionTab(this.listQuery, 'inspectionItems')
    },
    // 添加新物料
    handleAdd() {
      // 判断是否已经添加了定义
      if (this.groupList.length === 0) {
        this.$confirm('你尚未添加项目组定义，是否前往添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$router.push({
              name: 'inspectionItemGroup'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        return
      }
      // 跳转
      this.$router.push({
        name: 'inspectionitemsAdd',
        query: {}
      })
      // 存储到 sessionStorage
      this.$setForwardSessionTab(this.listQuery, 'inspectionItems')
    },
    // 编辑
    handleUpdate(row) {
      this.$router.push({
        name: `inspectionitemsEdit`,
        query: {
          id: row.id
        }
      })
      // 存储到 sessionStorage
      this.$setForwardSessionTab(this.listQuery, 'inspectionItems')
    },
    // 详情
    handleMore(row) {
      this.$router.push({
        name: `inspectionitemsDetail`,
        query: {
          id: row.id
        }
      })
      // 存储到 sessionStorage
      this.$setForwardSessionTab(this.listQuery, 'inspectionItems')
    },
    // 审批
    handleApproval(row) {
      this.$refs.approvaDialog.open({
        multipleSelection: [row]
      })
    },
    // 复制
    handleDuplication(row) {
      this.$router.push({
        name: `qualitiesCheckProjectDuplication`,
        query: {
          id: row.id
        }
      })
      // 存储到 sessionStorage
      this.$setForwardSessionTab(this.listQuery, 'inspectionItems')
    },
    // 点击删除
    handleDelete(row) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteProjectItemPrompt(row.id).then(res => {
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
              const temp = this.total % this.listQuery.size
              const totalPage = Math.ceil(this.total / this.listQuery.size)
              if (temp === 1 && totalPage === this.listQuery.current) {
                this.listQuery.current--
              }
              deleteProjectItem([row.id]).then(res => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 3000
                })
                this.getAllListData()
              })
            }
          })
        })
        .catch(() => {})
    },
    reset() {
      Object.keys(this.listQuery).forEach(el => {
        this.listQuery[el] = null
      })
      this.listQuery = {
        ...this.listQuery,
        sortList: undefined,
        current: 1,
        size: 20
      }
      this.getAllListData()
      this.$refs.itemGroupTreeRef.resetAllSelect()
    },
    handleChangeGroupCheck(groupIds) {
      if (groupIds) {
        this.listQuery.treeInspectionItemGroupIds = groupIds.join(',')
      } else {
        this.listQuery.treeInspectionItemGroupIds = ''
      }
      this.getAllListData()
    },
    async getAllListData() {
      this.loading = true
      const result = await getCheckProjectList({
        ...this.listQuery
      })
      const { data } = result.data || {}
      this.loading = false
      this.tableData = data?.records || []
      this.tableData = this.tableData.map(item => {
        return {
          ...item,
          samplePlanName: item.samplePlanEntity?.name
        }
      })
      this.total = data.total
    },
    // 处理下拉选择
    filterSearch(name) {
      switch (name) {
        case 'statusName':
          new Promise(resolve => {
            const result = this.getProjectItemStateList()
            resolve(result)
          }).then(res => {
            this.selectList = res
          })
          break
        case 'groupName':
          this.selectList = this.groupList.map(item => {
            return {
              code: item.id,
              name: item.groupName
            }
          })
          break
      }
    },
    // 获取状态列表
    async getProjectItemStateList() {
      const res = await getProjectItemStateList()
      const { data } = res.data || {}
      return data
    },
    // 获取检验项目组数据列表
    async getProjectGroupList() {
      const result = await getProjectGroupList({ ...this.listQuery })
      const { data } = result.data || {}
      this.groupList = data.records || {}
    },
    // 接收表格筛选的数据，并请求
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        if (el === 'statues') {
          this.listQuery[el] = val[el]?.split(',').map(i => Number(i))
        } else {
          this.listQuery[el] = val[el]
        }

        // 处理树节点数据，当列表勾选时，左边树回填
        if (el === 'treeInspectionItemGroupIds') {
          const selectGroupIds = this.listQuery[el]?.split(',') || []
          this.handleTreeSelected(selectGroupIds)
        }
      })
      this.getAllListData()
    },
    // 是否存在审批权限
    handleApprovalStatus(val) {
      this.isExistApproveBtn = val
    },
    // 下载
    async downloadTemplate() {
      const result = await downloadDataList()
      const fileName = '检验项目报表.xlsx'
      saveAs(result, fileName)
      this.$notify({
        title: '成功',
        message: '导出成功',
        type: 'success',
        duration: 2000
      })
    },
    // 导入
    importFile() {
      this.$router.push({
        path: '/inspection-manage/productInspection/import/preview',
        query: {
          name: this.activeName
        }
      })
      // 存储到 sessionStorage
      this.$setForwardSessionTab(this.listQuery, 'inspectionItems')
    },
    // 检验结果定义
    definitionResultQuality() {
      this.$router.push({
        name: 'definitionResultQuality'
      })
      // 存储到 sessionStorage
      this.$setForwardSessionTab(this.listQuery, 'inspectionItems')
    },
    // 产品检验项目组定义
    productInspectionProjectTeamDefine() {
      this.$router.push({
        name: 'productInspectionProjectTeamDefine'
      })
      // 存储到 sessionStorage
      this.$setForwardSessionTab(this.listQuery, 'inspectionItems')
    },
    // 批量编辑状态
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
    updateList() {
      this.isShowBatchDialog = false
      this.getAllListData()
    }
  }
}
</script>

<style lang="scss" scoped>
.addbox {
  width: 130px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 24px;
}
.title-table {
  .el-button {
    display: flex;
    align-items: center;
  }
}
.inspection-plan-list,
.inspection-task-list {
  height: 91%;
  display: flex;
  padding: 0;
  border: 1px solid #f1f1f1;
  .content-left-box {
    width: 319px;
    height: 100%;
    background: #ffffff;
    margin-right: 12px;
    padding: 10px 12px 20px 0;
  }
  .bg-box {
    flex: 1 0 auto;
    width: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    .table-top {
      .addbox {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 0px;
      }
    }

    .tablebox {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      //padding: 16px;
      flex: 1 0 auto;
      height: 0;
    }
    .pagination-box {
      position: relative;
      height: 68px;
    }
  }
}
.delete-text {
  color: #ff4d4f;
}
</style>
