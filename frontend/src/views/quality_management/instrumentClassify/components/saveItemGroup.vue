<template>
  <div>
    <el-dialog
      :title="title"
      class="material-dialog"
      :visible.sync="saveItemGroupDialogVisible"
      width="40%"
      :before-close="onCancel"
      :show-close="false"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div class="material-dialog-content">
        <el-form ref="itemGroup" :model="itemGroup" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="仪器分类编码" prop="instrumentCategoryCode">
                <el-input v-model="itemGroup.instrumentCategoryCode" :disabled="operateType === 'detail'" />
              </el-form-item>
              <el-form-item label="仪器分类名称" prop="instrumentCategoryName">
                <el-input v-model="itemGroup.instrumentCategoryName" :disabled="operateType === 'detail'" />
              </el-form-item>
              <!-- <el-form-item label="项目组编码" prop="groupCode">
                <el-input v-model="itemGroup.groupCode" :disabled="operateType !== 'add'" placeholder="编码保存后自动生成">
                  <template
                    v-if="operateType != 'detail'"
                    slot="suffix"
                  ><i
                    class="el-icon-s-operation"
                    style="cursor: pointer"
                    @click.stop="handleResetCode"
                  /></template>
                </el-input>
              </el-form-item> -->
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <slot name="footer">
          <el-button size="small" @click="onCancel"> 取消 </el-button>
          <el-button type="primary" size="small" @click="onConfirm"> 确认 </el-button>
        </slot>
      </div>
    </el-dialog>
    <!-- 编码规则 -->
    <common-code-rule-dialog
      v-if="showCommonCodeDialog"
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="89"
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    />
  </div>
</template>
<script>

export default {
  name: 'SaveItemGroupDialog',
  props: {
    title: {
      type: String,
      default: '仪器分类详情'
    },
    operateType: {
      type: String,
      default: 'detail'
    },
    mainItemGroup: {
      type: Object,
      default: null
    },
    saveItemGroupDialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      isAutoOpen: false,
      showCommonCodeDialog: false,
      window,
      selectList: [],
      loading: false,
      itemGroup: {
        instrumentCategoryName: '',
        instrumentCategoryCode: '' // 编码code
      },
      rules: {
        instrumentCategoryName: [{ required: true, message: '请输入仪器分类名称', trigger: 'blur' }],
        instrumentCategoryCode: [{ required: true, message: '请输入仪器分类编码', trigger: 'blur' }]
      },

      groupTreeOptions: []
    }
  },
  watch: {
    saveItemGroupDialogVisible: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.showCommonCodeDialog = true
        }
      }
    },
    mainItemGroup: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.itemGroup = {
            ...newValue
          }
        } else {
          this.itemGroup = {
            instrumentCategoryName: '',
            instrumentCategoryCode: ''
          }
        }
      }
    }
  },
  created() {
    // this.getAllTreeItemGroup()
  },
  methods: {
    // 切换编码规则
    async handleResetCode() {
      /*  this.isAutoOpen = false
      await this.$nextTick()
      this.isAutoOpen = true */
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    async handleConfirmCodeRuleDialog(code) {
      console.log('codecodecodecode', code)
      /*   this.itemGroup.groupCode = code */
      this.$set(this.itemGroup, 'groupCode', code)
      console.log('this.itemGroup.groupCode', this.itemGroup.groupCode)
    },
    changeCheckedParentNodes(val) {
      if (val) {
        this.itemGroup.parentGroupId = val[val.length - 1]
      } else {
        this.itemGroup.parentGroupId = null
      }
    },
    onCancel() {
      this.$emit('cancel')
    },
    async onConfirm() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.itemGroup
          }
        ],
        // 用于展开基本信息或tabs的方法对象（非必传）
        otherFunc: {
          // changeTabs: name => {
          //   this.tabValue = name
          // }
          // expandInfo: () => {
          //   this.$refs.baseForm.isFold = true
          // }
        }
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      // this.$refs['itemGroup'].validate(valid => {
      //   if (valid) {
      this.$emit('confirm')
      this.itemGroup = {
        groupName: '',
        parentGroupId: null,
        groupCode: '' // 编码code
      }
      this.showCommonCodeDialog = false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.material-dialog {
  ::v-deep .el-dialog {
    position: relative;
    .search-col-active {
      color: #1890ff;
    }
  }
  .material-dialog-content {
    border-top: 1px solid #f1f1f1;
    padding-top: 5%;
    //height: 200px;
    width: 100%;
    // display: flex;
    // flex-direction: column;
    ::v-deep thead.has-gutter label.el-checkbox {
      display: inline-block !important;
    }
    .pagination-section {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }
    ::v-deep .el-cascader--medium {
      width: 100%;
    }
    // .dialog-footer {
    //   display: flex;
    //   justify-content: center;
    // }
  }
}

.materialPrice {
  padding-bottom: 29px;
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
</style>
