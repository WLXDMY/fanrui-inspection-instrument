<!--
 * @Author: limengjuan
 * @Date: 2021-12-15 13:06:54
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-25 10:30:07
 * @Description: 仪器分类
-->
<template>
  <div class="wrapper-list">
    <div class="container">
      <div style="margin-bottom: 10px" class="btns">
        <div class="btn-left">
          <el-button
            type="primary"
            class="add-btn centre2"
            @click="handleAdd"
          >
            新增分类
          </el-button>
          <el-button size="mini" type="primary" @click="back">返回</el-button>
        </div>
      </div>
      <div class="container1-3 inspection-plan-list">
        <div class="bg-box">
          <div class="tablebox">
            <ElTableContent
              :search="tableSearch"
              :list-query="listQuery"
              :table-data="tableData"
              :table-column="tableColumn"
              :action-width="250"
              :select-option="selectList"
              :request-config="requestConfig"
              modular-type="projectItemGroup"
              column-permission-action="product.inspection.group.define:columnConfigList"
              @filterSearch="filterSearch"
              @makeNewRequest="makeNewRequest"
            >
              <template v-slot:tableAction="{ row }">
                <div class="level buttons" style="padding: 0 5px">
                  <div
                    class="edit-text"
                    @click="handleUpdate(row)"
                  >
                    编辑
                  </div>
                  <div
                    class="details-btn"
                    @click="handleMore(row)"
                  >
                    详情
                  </div>
                  <div
                    class="delete-text"
                    @click="handleDelete(row)"
                  >
                    删除
                  </div>
                </div>
              </template>
            </ElTableContent>
          </div>
          <pagination3
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.current"
            :limit.sync="listQuery.size"
            @pagination="getProjectGroupList"
          />
        </div>
      </div>
    </div>
    <SaveItemGroup
      ref="itemGroupDialog"
      :save-item-group-dialog-visible="saveItemGroupDialogVisible"
      :title="saveItemGroupDialogTitle"
      :operate-type="groupOperateType"
      :main-item-group="mainItemGroup"
      @cancel="saveItemGroupCancel"
      @confirm="saveItemGroupConfirm"
    />
  </div>
</template>

<script>
import {
  deleteInstrumentCategoryPrompt,
  deleteInstrumentCategory,
  addInstrumentCategory,
  updateInstrumentCategory,
  getInstrumentCategoryDetail,
  getInstrumentCategoryList
} from '@/api/quality-manage.js'
import Pagination3 from '@/components/Pagination3'
import { TABLE_LIST, SEARCH_LIST } from './components/list.js'
import ElTableContent from '@/components/ElTableColumn'
import SaveItemGroup from './components/saveItemGroup.vue'

export default {
  components: {
    Pagination3,
    ElTableContent,
    SaveItemGroup
  },
  filters: {},
  data() {
    return {
      window,
      tableSearch: SEARCH_LIST,
      tableColumn: TABLE_LIST,
      selectList: [],
      tableData: [],
      loading: false,
      total: 20,
      listQuery: {
        current: 1,
        size: 20,
        parentItemGroupIds: []
      },
      mainItemGroup: {},
      isExistApproveBtn: false,
      multipleSelection: [],
      code: 'productInspectionProject',
      requestConfig: {
        approval: 'projectTeamDefine'
      },
      saveItemGroupDialogVisible: false,
      saveItemGroupDialogTitle: '新增检验项目组',
      groupOperateType: 'add'
    }
  },
  created() {
    this.getProjectGroupList()
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
    // 接收表格筛选的数据，并请求
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        if (el === 'statues') {
          this.listQuery[el] = val[el].split(',').map(i => Number(i))
        } else {
          this.listQuery[el] = val[el]
        }
      })
      this.getProjectGroupList()
    },
    handleAdd() {
      this.saveItemGroupDialogVisible = true
      this.saveItemGroupDialogTitle = '新增仪器分类'
      this.groupOperateType = 'add'
    },
    // 编辑
    handleUpdate(row) {
      this.saveItemGroupDialogVisible = true
      this.saveItemGroupDialogTitle = '编辑仪器分类'
      this.groupOperateType = 'update'
      this.mainItemGroup = { ...row }
    },
    // 详情
    handleMore(row) {
      this.saveItemGroupDialogVisible = true
      this.saveItemGroupDialogTitle = '仪器分类详情'
      this.groupOperateType = 'detail'
      this.mainItemGroup = { ...row }
    },
    // 点击删除
    handleDelete(row) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteInstrumentCategoryPrompt(row.id).then(res => {
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
              deleteInstrumentCategory([row.id]).then(res => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 3000
                })
                this.getProjectGroupList()
              })
            }
          })
        })
        .catch(() => {})
    },
    // handleDelete(row) {
    //   this.$confirm('是否删除该数据?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       deleteProjectTeamDefine([row.id]).then(res => {
    //         this.$notify({
    //           title: '成功',
    //           message: '删除成功',
    //           type: 'success',
    //           duration: 1000
    //         })
    //         this.getProjectGroupList()
    //         // 刷新检验项目组
    //         // this.$refs.itemGroupTreeRef.getAllTreeItemGroup()
    //         // this.$refs.itemGroupDialog.getAllTreeItemGroup()
    //       })
    //     })
    //     .catch(() => {})
    // },
    // handleChangeGroupCheck(groupIds) {
    //   if (groupIds) {
    //     this.listQuery.parentItemGroupIds = groupIds
    //   } else {
    //     this.listQuery.parentItemGroupIds = []
    //   }
    //   console.log('groupIds', this.listQuery.groupIds)
    //   this.getProjectGroupList()
    // },
    // 获取检验项目组数据列表
    async getProjectGroupList() {
      const params = { ...this.listQuery }
      const result = await getInstrumentCategoryList(params)
      // const result = await postProjectGroupList(params)
      const { data } = result.data || {}
      this.tableData = data.records || {}
      this.total = data.total
    },
    saveItemGroupConfirm() {
      this.saveItemGroupDialogVisible = false
      switch (this.groupOperateType) {
        case 'add':
          this.addItemGroup()
          break
        case 'update':
          this.editItemGroup()
          break
        default:
          break
      }
      this.mainItemGroup = {}
    },
    saveItemGroupCancel() {
      this.saveItemGroupDialogVisible = false
      this.mainItemGroup = {}
    },
    async addItemGroup() {
      const params = this.$refs['itemGroupDialog'].itemGroup
      await addInstrumentCategory(params)
      this.getProjectGroupList()
      this.$notify({
        title: '提示',
        message: '新增成功',
        type: 'success',
        duration: 2000
      })
      // 刷新检验项目组
      // this.$refs.itemGroupTreeRef.getAllTreeItemGroup()
      // this.$refs.itemGroupDialog.getAllTreeItemGroup()
    },
    async editItemGroup() {
      const params = { ...this.$refs['itemGroupDialog'].itemGroup }
      await updateInstrumentCategory(params)
      this.getProjectGroupList()
      this.$notify({
        title: '提示',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
      // 刷新检验项目组
      // this.$refs.itemGroupTreeRef.getAllTreeItemGroup()
      // this.$refs.itemGroupDialog.getAllTreeItemGroup()
    },
    // 返回
    back() {
      this.$router.push({
        path: '/inspection-manage/qms-product-inspection/instrument'
      })
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
  height: 95%;
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
</style>
