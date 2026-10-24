<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-08-22 17:39:43
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-02 14:44:18
 * @Description: 缺陷类型管理
-->
<template>
  <div class="container1-3 bad-type-define BadDefectsDefine">
    <!-- 头部按钮 -->
    <header class="btns">
      <el-button plain size="small" class="top-btn" @click="back"> 返回 </el-button>

      <el-button
        v-permission="{ action: 'qms-product-inspection.inspection-manage.defectTypeDefine:add' }"
        size="small"
        type="primary"
        @click="handleCreate"
      >
        新增
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
          :action-width="200"
          :select-option="selectList"
          :request-config="requestConfig"
          height="100%"
          modular-type="samplePlane"
          :is-get-current-path="false"
          @filterSearch="filterSearch"
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
                v-permission="{ action: 'qms-product-inspection.inspection-manage.defectTypeDefine:update' }"
                class="edit-text"
                @click="handleUpdate(row)"
              >
                编辑
              </div>
              <div
                v-permission="{ action: 'qms-product-inspection.inspection-manage.defectTypeDefine:select' }"
                class="detail-text"
                @click="handleDetail(row)"
              >
                详情
              </div>
              <div
                v-permission="{ action: 'qms-product-inspection.inspection-manage.defectTypeDefine:delete' }"
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
          @pagination="defectsDefineBtnList"
        />
      </section>
    </main>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      class="add-dialog bad-type-dialog"
      :title="operateTitle"
      :visible.sync="badTypeDialogVisible"
      :destroy-on-close="true"
      width="50%"
    >
      <div class="form-outside-box">
        <el-form ref="addform" :rules="formRules" :model="addform" size="small" label-width="126px">
          <el-form-item label="缺陷类型编码:" prop="code">
            <el-input
              v-model="addform.code"
              placeholder="请输入内容"
              autocomplete="off"
              :disabled="operateType === 'edit' || operateType === 'detail'"
            />
            <!-- <el-input
              v-model="addform.code"
              placeholder="请输入内容"
              autocomplete="off"
              :disabled="operateType === 'edit' || operateType === 'detail'"
            >
              <template slot="suffix"
                ><i style="cursor: pointer" class="el-icon-s-operation" @click="handleChangeRule" />
              </template>
            </el-input> -->
          </el-form-item>
          <el-form-item label="缺陷类型名称:" prop="name">
            <el-input
              v-model="addform.name"
              placeholder="请输入内容"
              autocomplete="off"
              clearable
              :disabled="operateType === 'detail'"
            />
          </el-form-item>
        </el-form>
        <div class="operate-box">
          <el-button
            type="primary"
            class="btn-save"
            size="small"
            :disabled="operateType === 'detail'"
            @click="handleConfirm('addform')"
          >
            保存
          </el-button>
          <el-button class="btn-cancel" size="small" @click="handleAddCancel"> 取消 </el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 编码规则 -->
    <common-code-rule-dialog
      v-if="isShowCommonCodeRule"
      ref="codeRuleDialog"
      title="切换编码规则"
      :type-code="88"
      is-open-reg-disabled-space
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
      @manualInput="handleSetManualInput"
    />
  </div>
</template>

<script>
import { defectsDefineBtnList, deleteDefectsType, addDefectsType, editDefectsType } from '@/api/quality-manage'
import ElTableContent from '@/components/ElTableColumn/index.vue'
import Pagination3 from '@/components/Pagination3/index.vue'
import { TABLE, SEARCH_LIST } from './constant.js'

import lodash from 'lodash'
export default {
  name: 'BadDefectsDefine',
  components: {
    ElTableContent,
    Pagination3
  },
  filters: {},
  data() {
    return {
      window,
      tableData: [],
      listQuery: {
        // code: '',
        name: '',
        current: 1,
        size: 20
      },
      //   新增或编辑弹框
      operateType: 'add',
      operateTitle: '新增缺陷类型',
      badTypeDialogVisible: false,
      addform: {
        code: '',
        name: ''
      },
      formRules: {
        code: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur', 'change']
          }
        ],
        name: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur', 'change']
          }
        ]
      },
      codeRuleList: [], // 编码规则
      defaultRule: [], // 默认编码规则
      isAutoOpen: true,
      rulesTypeExtraRequestParam: {
        ruleType: 'workOrderNumber'
      },
      isShowCommonCodeRule: false,
      // 表格 start
      loading: false, // loading
      selectList: [],
      total: 0, // 总数
      tableSearch: SEARCH_LIST, // 表格可搜索字段
      tableColumn: TABLE, // 表格头列数据
      requestConfig: {}
      // 表格 end
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  mounted() {},
  methods: {
    filterSearch(name) {},

    // 新请求
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
    // 编码规则确认
    // handleConfirmCodeRuleDialog(val, id) {
    //   this.numberRuleId = id
    //   this.addform.code = val
    // },
    // 设置是否只能手动输入
    handleSetManualInput() {},
    // 切换编码规则弹窗
    handleChangeRule() {
      this.$refs['codeRuleDialog'].open()
    },
    getList() {
      this.loading = true
      this.defectsDefineBtnList()
    },
    // 1.返回
    back() {
      this.$router.go(-1)
    },
    // 2.重置
    reset() {
      this.loading = true
      this.listQuery.name = ''
      this.listQuery.code = ''
      this.defectsDefineBtnList()
    },
    // 3.获取列表
    defectsDefineBtnList(params) {
      const param = {
        ...this.listQuery,
        size: params?.limit || this.listQuery.size,
        current: params?.page || this.listQuery.current
      }
      defectsDefineBtnList(param).then(res => {
        console.log('获取列表 res', res)

        this.loading = false
        if (res.data.status === 1) {
          this.tableData = res.data.data.records || []
          this.total = res.data.data.total
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || '获取列表失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleCreate() {
      this.operateType = 'add'
      this.operateTitle = '新增缺陷类型'
      this.badTypeDialogVisible = true
      // this.isShowCommonCodeRule = true
    },
    handleUpdate(row) {
      this.operateType = 'edit'
      this.operateTitle = '编辑缺陷类型'
      this.badTypeDialogVisible = true
      this.addform = lodash.cloneDeep(row)
    },
    handleDetail(row) {
      this.operateType = 'detail'
      this.operateTitle = '查看缺陷类型'
      this.badTypeDialogVisible = true
      this.addform = lodash.cloneDeep(row)
      console.log('产看信息', this.operateType)
    },
    handleAddCancel() {
      this.badTypeDialogVisible = false
      this.addform.code = ''
      this.addform.name = ''
      // this.isShowCommonCodeRule = false
    },

    async handleConfirm(formName) {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.addform
          }
        ]
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      // this.$refs[formName].validate(valid => {
      // if (valid) {
      const param = {
        ...this.addform
      }
      this.operateType === 'add' ? this.addDefectsType(param) : this.editDefectsType(param)
      // this.isShowCommonCodeRule = false
      // }
      // })
    },
    addDefectsType(param) {
      addDefectsType(param)
        .then(res => {
          if (res.data.status === 1) {
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success',
              duration: 1000
            })
            this.addform = {
              code: '',
              name: ''
            }
            this.badTypeDialogVisible = false
            this.getList()
          } else {
            this.$notify({
              title: '提示',
              message: res.data.message || '新增失败',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(message => {
          this.$message.error(message)
        })
    },
    editDefectsType(param) {
      editDefectsType(param)
        .then(res => {
          if (res.data.status === 1) {
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 1000
            })
            this.addform = {
              code: '',
              name: ''
            }
            this.badTypeDialogVisible = false
            this.getList()
          } else {
            this.$notify({
              title: '提示',
              message: res.data.message || '编辑失败',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(message => {
          this.$message.error(message)
        })
    },
    handleDelete(row) {
      this.$confirm('确定删除缺陷类型信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDefectsType([row.id]).then(res => {
          if (res.data.status === 1) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 1000
            })
            this.getList()
          } else {
            this.$notify({
              title: '提示',
              message: res.data.message || '删除失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .bad-type-define {
//   .bad-type-dialog {
//     .form-outside-box {
//       padding: 0;
//       .el-input__inner {
//         width: 100%;
//       }
//     }
//   }
// }
.BadDefectsDefine {
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
