<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-21 16:46:36
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-23 17:53:42
 * @Description: 检验方案
-->
<template>
  <div class="wrapper-list">
    <section class="container">
      <!-- 顶部按钮区域 -->
      <header style="margin-bottom: 10px" class="btns">
        <section class="btn-left">
          <TopHeader
            :list-query="listQuery"
            :is-exist-approve-btn="isExistApproveBtn"
            :multiple-selection="multipleSelection"
            :order-btn-type="orderBtnType"
            @updateList="handleShow"
          />
        </section>

        <div class="btn-right">
          <!-- 右边盒子 -->

          <div class="reset">
            <section class="table-action">
              <button :class="orderBtnType === 'material' && 'active-btn'" @click="handleChangeType('material')">
                按物料
              </button>
              <button :class="orderBtnType === 'item' && 'active-btn'" @click="handleChangeType('item')">
                按检验项目
              </button>
              <button :class="orderBtnType === 'plan' && 'active-btn'" @click="handleChangeType('plan')">
                按检验方案
              </button>
            </section>
            <el-button size="mini" @click="resetTemp"> 重置 </el-button>
          </div>
        </div>
      </header>
      <!-- 表格区域 checkPlan -->
      <main v-loading="loading" class="tablebox">
        <ElTableContent
          :search="tableSearch"
          :table-loading="loading"
          :list-query="listQuery"
          :table-data="tableData"
          :table-column="tableColumn"
          :action-width="260"
          :select-option="selectList"
          :request-config="requestConfig"
          :modular-type="modularType"
          column-permission-action="qms-product-inspection.inspection-manage.scheme:columnConfigList"
          @selectionChange="handleSelectionChange"
          @filterSearch="filterSearch"
          @approveStatus="handleApprovalStatus"
          @makeNewRequest="makeNewRequest"
        >
          <!--严格度-->
          <!-- <template v-slot:stringencyName="{ special: { row } }">
            <span>{{
              row.schemeItemEntity && row.schemeItemEntity.samplePlanEntity
                ? row.schemeItemEntity.samplePlanEntity.stringencyName
                : ''
            }}</span>
          </template> -->
          <!--检验水平-->
          <!-- <template v-slot:inspectLevelName="{ special: { row } }">
            <span>{{
              row.schemeItemEntity && row.schemeItemEntity.samplePlanEntity
                ? row.schemeItemEntity.samplePlanEntity.inspectLevelName
                : ''
            }}</span>
          </template> -->
          <template v-slot:inspectionTypes="{ special: { row } }">
            <span v-if="row.schemeRelateTypeEntities && row.schemeRelateTypeEntities.length != 0">{{
              row.schemeRelateTypeEntities[0].inspectTypeName ? row.schemeRelateTypeEntities[0].inspectTypeName : ''
            }}</span></template>
          <template v-slot:importantInspection="{ special: { row } }">
            <span>{{ row.schemeItemEntity && row.schemeItemEntity['importantInspection'] ? '是' : '否' }}</span>
          </template>
          <template v-slot:recordInspectionValue="{ special: { row } }">
            <span>{{ row.schemeItemEntity && row.schemeItemEntity['recordInspectionValue'] ? '是' : '否' }}</span>
          </template>
          <template v-slot:tableAction="{ row }">
            <div class="level buttons" style="padding: 0 5px">
              <div v-permission="{ action: permissionObj.edit }" class="edit-text" @click="handleUpdate(row)">编辑</div>
              <div v-permission="{ action: permissionObj.detail }" class="details-btn" @click="handleMore(row)">
                详情
              </div>
              <el-dropdown class="more-btn" @command="handleCommand">
                <span class="el-dropdown-link"> 更多 <i class="el-icon-arrow-down el-icon--right" /> </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="{ method: handleForbidden, row: row }"
                    :class="{
                      'edit-text': true,
                      'edit-text-grey': row.status == 3 || (isExistApproveBtn && row.status == 0) ? true : false
                    }"
                  >
                    {{ row.status === 0 || row.status === 2 ? '启用' : '禁用' }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-permission="{ action: permissionObj.delete }"
                    :command="{ method: handleDelete, row: row }"
                    :class="{
                      'edit-text': true,
                      'delete-text': true
                    }"
                  >
                    删除
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-permission="{ action: permissionObj.copy }"
                    :command="{ method: copyCheckPlan, row: row }"
                    class="edit-text"
                  >
                    复制
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="isAllowApproval(row)"
                    v-permission="{
                      action: permissionObj.approval
                    }"
                    :command="{ method: approval, row: row }"
                    :disabled="row.status != 0"
                  >
                    审批
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </ElTableContent>
        <pagination3
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.current"
          :limit.sync="listQuery.size"
          @pagination="handleShow"
        />
      </main>
    </section>
    <!--审批-->
    <ApprovaDialog ref="approvaDialog" @updateList="handleShow" />
  </div>
</template>

<script>
import ApprovaDialog from './components/dialog/approvaDialog.vue'
import { getMaterialType } from '@/api/product-management'
import {
  getDetectionSchemeByProjectList,
  getDetectionSchemeByMaterialList,
  getDetectionSchemeList,
  deleteDetectionSchemeList,
  deleteDetectionSchemeListPrompt,
  schemeTypeList,
  useStateListApi,
  standardStateList,
  putSchemeBatchUpdate,
  getInspectTypeEnumsByConfig
} from '@/api/quality-manage'
import { enableduser } from '@/api/base'
import { getApprovalStatusList } from '@/api/procurement-management'
import { CHECK_MATERIAL_TABLE, CHECK_PLAN_TABLE, CHECK_ITEM_TABLE } from '@/constant/checkPlanList.js'
import { LIST } from '@/constant/checkPlanSearchList.js'
import { v4 as uuidv4 } from 'uuid'
import Importbtn from '@/views/common/importExcel/importbtn.vue'
import TopHeader from './components/home/headActionBtn.vue'
import ElTableContent from '@/components/ElTableColumn'
import Pagination3 from '@/components/Pagination3'
import store from '@/store'
import { mapGetters } from 'vuex'

const FULLROUTECODE = '/inspection-manage/qms-product-inspection/scheme' // 当前模块配置关键字
const PAGEFULLPATHCODE = 'qmsScheme.qmsSchemeBySchemeList' // 当前页配置关键字

export default {
  components: {
    TopHeader,
    ElTableContent,
    Pagination3,
    Importbtn,
    ApprovaDialog
  },
  data() {
    return {
      orderBtnType: 'plan',
      loading: false,
      listQuery: {
        current: 1,
        size: 20
      },
      isExistApproveBtn: false,
      modularType: 'productInspectionScheme',
      tableSearch: LIST,
      tableColumn: CHECK_PLAN_TABLE, // 表格列数据
      tableData: [], // 表格数据
      total: 0,
      selectList: [],
      requestConfig: {
        approvalFields: [],
        approval: 'productInspectionScheme',
        isMaterial: false
      },
      multipleSelection: [], // 选中的表格行
      materialFields: {},
      permissionObj: {
        edit: 'qms-product-inspection.inspection-manage.scheme:update', // 编辑
        copy: 'qms-product-inspection.inspection-manage.scheme:copy', // 复制
        approval: 'qms-product-inspection.inspection-manage.scheme:approval', // 审批
        detail: 'qms-product-inspection.inspection-manage.scheme:select', // 详情
        delete: 'qms-product-inspection.inspection-manage.scheme:delete' // 删除
      }
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
    // 从 sessionStorage 获取筛选条件
    this.listQuery = this.$getForwardSessionCommon()
    // 读取缓存中的按单/按物料
    this.orderBtnType = this.listQuery.orderBtnType
      ? this.listQuery.orderBtnType
      : this.orderBtnType
        ? this.orderBtnType
        : 'plan'
    delete this.listQuery.orderBtnType

    this.initFields()
    this.handleShow(this.orderBtnType)

    console.log('**** begin')

    // this.getDetectionList()
  },
  beforeRouteLeave(to, form, next) {
    const whiteList = [
      'inspectionProgramAdd',
      'inspectionProgramEdit',
      'inspectionProgramDetail',
      'copyCheckPlan',
      'approvalCheckPlan'
    ]
    // 离开路由时删除 sessionStorage 中的筛选条件
    this.$beforeRouteLeaveSessionCommon(whiteList, to)
    next()
  },
  methods: {
    // 动态字段配置处理且特征参数配置处理
    initFields() {
      // 判断是按物料还是单
      let tableColumn = CHECK_PLAN_TABLE
      let keyWord = PAGEFULLPATHCODE
      if (this.orderBtnType === 'plan') {
        tableColumn = CHECK_PLAN_TABLE
        keyWord = 'qmsScheme.qmsSchemeBySchemeList'
      } else if (this.orderBtnType === 'material') {
        tableColumn = CHECK_MATERIAL_TABLE
        keyWord = 'qmsScheme.qmsSchemeByMaterialList'
      } else {
        tableColumn = CHECK_ITEM_TABLE
        keyWord = 'qmsScheme.qmsSchemeByItemList'
      }

      this.tableColumn = tableColumn.flatMap(item => {
        const currentConfig =
          this.fieldRuleDetail?.[FULLROUTECODE]?.[keyWord]?.find(i => i.fieldCode === item.code) || {}
        return currentConfig?.isShow || currentConfig?.isShow === undefined || item.code === 'operate'
          ? [
            {
              ...item,
              label: currentConfig.fieldCustomName || currentConfig.fieldDefaultName || item.label
            }
          ]
          : []
      })
      // console.log('this.tableColumn', this.tableColumn);
    },
    // 禁用
    handleForbidden(row) {
      if (row.status === 3) {
        return
      }
      if (this.isExistApproveBtn && row.status === 0) {
        return
      }
      const params = {
        status: row.status === 1 ? 2 : 1,
        ids: [row.schemeId]
      }
      putSchemeBatchUpdate(params).then(res => {
        this.handleShow()
      })
    },
    handleShow() {
      switch (this.orderBtnType) {
        case 'plan':
          this.getDetectionList()
          break
        case 'item':
          this.getDetectionProjectList()
          break
        case 'material':
          this.getDetectionMaterialList()
          break
      }
    },
    // 切换显示方式 按检验项目还是检验方案
    async handleChangeType(type) {
      if (this.orderBtnType === type) {
        return
      }
      if (type === 'plan') {
        this.modularType = 'productInspectionScheme'
        this.tableColumn = CHECK_PLAN_TABLE
      } else if (type === 'material') {
        this.modularType = 'productInspectionSchemeByMaterial'
        this.tableColumn = CHECK_MATERIAL_TABLE
      } else {
        this.modularType = 'productInspectionSchemeByItem'
        this.tableColumn = CHECK_ITEM_TABLE
      }
      if (!this.isExistApproveBtn) {
        this.deleteColumn()
      }
      this.orderBtnType = type
      this.listQuery = {
        current: 1,
        size: 20
      }
      this.handleShow()
      this.initFields()
    },
    // 检验方案接口
    async getDetectionList() {
      this.loading = true
      const result = await getDetectionSchemeList(this.listQuery)
      const { data } = result.data || {}
      this.loading = false
      this.tableData = (data.records || []).map(item => {
        return {
          ...item,
          samplePlanName: item?.samplePlanEntity?.name,
          singleId: uuidv4()
        }
      })
      this.total = data.total
    },
    // 检验项目接口
    async getDetectionProjectList() {
      this.loading = true
      const result = await getDetectionSchemeByProjectList(this.listQuery)
      const { data } = result.data || {}
      this.loading = false
      this.tableData = (data.records || []).map(item => {
        return {
          ...item,
          samplePlanName: item?.samplePlanEntity?.name,
          singleId: uuidv4()
        }
      })
      this.total = data.total
    },
    // 分页查询检验方案 --按物料
    async getDetectionMaterialList() {
      this.loading = true
      const result = await getDetectionSchemeByMaterialList(this.listQuery)
      const { data } = result.data || {}
      this.loading = false
      this.tableData = (data.records || []).map(item => {
        return {
          ...item,
          samplePlanName: item?.samplePlanEntity?.name,
          singleId: uuidv4()
        }
      })
      this.total = data.total
    },
    // 是否展示审批按钮
    isAllowApproval(row) {
      return this.isExistApproveBtn
    },
    // 源代码判断逻辑，
    isShowApproval(row) {
      const { approvalStatus, status } = row || {}
      return approvalStatus === 2 || approvalStatus === 3 || status === 3
    },
    // 表格选中
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 处理详情按钮的样式
    handleDeleteBtnStyle(row) {
      const { status } = row || {}
      if (status === 0) {
        return 'delete-text'
      }
      return 'delete-text disable-delete'
    },
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
    // 重置
    resetTemp() {
      Object.keys(this.listQuery).forEach(el => {
        this.listQuery[el] = null
      })
      this.listQuery = {
        ...this.listQuery,
        current: 1,
        size: 20
      }
      this.handleShow()
      this.loading = false
    },
    // 处理下拉选择
    filterSearch(name) {
      switch (name) {
        case 'statusName':
          new Promise(resolve => {
            const result = this.getSchemeStateList()
            resolve(result)
          }).then(res => {
            this.selectList = res
          })
          break
        // 物料类型
        case 'materialTypeName':
          new Promise(resolve => {
            const result = this.getMaterialType()
            resolve(result)
          }).then(res => {
            this.selectList = res
          })
          break
        // 检验类型
        case 'inspectionTypes':
          new Promise(resolve => {
            const result = this.getInspectTypeEnumsByConfig()
            resolve(result)
          }).then(res => {
            this.selectList = res
          })
          break
        // 是否通过方案
        case 'generalMaterialName':
          this.selectList = [
            { name: '是', code: 'true' },
            { name: '否', code: 'false' }
          ]
          break
        case 'approvalStatusName':
          new Promise(resolve => {
            const list = this.getOrderApproval()
            resolve(list)
          }).then(res => {
            this.selectList = res
          })
          break
        case 'typeName':
          new Promise(resolve => {
            const list = this.getSchemeTypeList()
            resolve(list)
          }).then(res => {
            this.selectList = res
          })
          break
        case 'isRequiredName':
          useStateListApi()
            .then(res => {
              this.selectList = res.data.data
            })
            .catch(e => {
              this.selectList = []
              console.log('🚀 ~ filterSearch ~ e :', e)
            })
          break
        case 'createByName':
        case 'updateByName':
          new Promise(resolve => {
            const list = this.getUserList()
            resolve(list)
          }).then(res => {
            this.selectList = res
          })
          break
      }
    },

    async getSchemeTypeList() {
      const res = await schemeTypeList()
      return res.data.data
    },
    // 获取状态列表
    async getSchemeStateList() {
      const res = await standardStateList()
      return res.data.data
    },
    // 获取物料类型
    async getInspectTypeEnumsByConfig() {
      const res = await getInspectTypeEnumsByConfig()
      return res.data.data.map(item => {
        return {
          ...item,
          name: item.orderTypeName,
          code: item.orderType
        }
      })
    },
    // 获取物料类型
    async getMaterialType() {
      const res = await getMaterialType()
      return res.data.data
    },
    // 获取审批状态列表
    async getOrderApproval() {
      const res = await getApprovalStatusList()
      return res.data.data
    },
    // 获取创建人/修改人
    async getUserList() {
      const res = await enableduser()
      const { data } = res.data || {}
      const { records = [] } = data || {}
      return records.map(item => {
        return {
          code: item.username,
          name: item.nickname
        }
      })
    },
    // 接收表格筛选的数据，并请求
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        if (el === 'statues') {
          this.listQuery[el] = val[el]?.split(',').map(i => Number(i))
        } else if (el === 'inspectTypeList') {
          this.listQuery[el] = val[el]?.split(',')
        } else if (el === 'materialTypes') {
          this.listQuery[el] = val[el]?.split(',')
        } else if (el === 'approvalStatus') {
          this.listQuery[el] = val[el]?.split(',').map(i => Number(i))
        } else if (el === 'generalMaterial') {
          if (val[el].includes(',')) {
            this.listQuery[el] = ''
          } else {
            this.listQuery[el] = val[el]
          }
        } else {
          this.listQuery[el] = val[el]
        }
      })
      this.handleShow()
    },
    // 是否存在审批权限
    handleApprovalStatus(val) {
      this.isExistApproveBtn = val
      if (!this.isExistApproveBtn) {
        this.deleteColumn()
      }
    },
    //
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
    // 点击编辑
    handleUpdate(row) {
      // 存储到 sessionStorage
      this.listQuery.orderBtnType = this.orderBtnType
      this.$setForwardSessionCommon(this.listQuery)
      const { schemeId } = row || {}
      this.$router.push({
        name: 'inspectionProgramEdit',
        query: {
          id: schemeId,
          status: row.status
        }
      })
    },
    // 点击详细信息
    handleMore(row) {
      // 存储到 sessionStorage
      this.listQuery.orderBtnType = this.orderBtnType
      this.$setForwardSessionCommon(this.listQuery)
      const { schemeId } = row || {}
      this.$router.push({
        name: 'inspectionProgramDetail',
        query: {
          id: schemeId
        }
      })
    },
    // 删除
    async handleDelete(row) {
      const { status, schemeId } = row || {}
      // if (status !== 0) {
      //   return
      // }
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        deleteDetectionSchemeListPrompt(schemeId).then(res => {
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
            deleteDetectionSchemeList([schemeId]).then(res => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 3000
              })
              this.getDetectionList()
            })
          }
        })
      })
    },
    // 复制
    async copyCheckPlan(row) {
      // 存储到 sessionStorage
      this.listQuery.orderBtnType = this.orderBtnType
      this.$setForwardSessionCommon(this.listQuery)
      const { schemeId } = row || {}
      this.$router.push({
        name: 'inspectionProgramAdd',
        query: {
          id: schemeId
        }
      })
    },
    // 单个审批功能
    approval(row) {
      // 存储到 sessionStorage
      this.$setForwardSessionCommon(this.listQuery)
      this.$refs.approvaDialog.open({
        multipleSelection: [row]
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
  height: calc(100% - 110px) !important;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .disable-delete {
    color: #a6aebe !important;
    cursor: not-allowed !important;
  }
}

.table-action {
  display: flex;
  align-items: center;
  padding-right: 21px;

  button {
    height: 32px;
    box-sizing: border-box;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid #dcdfe6;
    margin-left: 0 !important;
  }
  .active-btn {
    color: #1890ff;
    border: 1px solid#1890ff;
  }
}

.delete-text {
  color: #ff4d4f;
}

.edit-text-grey {
  color: #909399 !important;
}
</style>
