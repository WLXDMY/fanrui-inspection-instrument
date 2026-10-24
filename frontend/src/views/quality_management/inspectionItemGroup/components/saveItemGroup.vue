<template>
  <div>
    <el-dialog
      :title="title"
      class="material-dialog"
      :visible.sync="saveItemGroupDialogVisible"
      width="30%"
      :before-close="onCancel"
      :show-close="false"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div class="material-dialog-content">
        <el-form ref="itemGroup" :model="itemGroup" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="项目组名称" prop="groupName">
                <el-input v-model="itemGroup.groupName" :disabled="operateType === 'detail'" />
              </el-form-item>
              <!--
              <el-form-item label="项目组编码" prop="groupCode">
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
              </el-form-item>
               -->
              <el-form-item
                label="项目组编码"
                prop="groupCode"
                :rules="[
                  {
                    required: codeRequired,
                    message: '请输入',
                    trigger: 'blur'
                  }
                ]"
              >
                <CustomCodeRule
                  v-if="operateType === 'add'"
                  ref="commonCodeRuleInput"
                  v-model="itemGroup.groupCode"
                  :placeholder="receiptCodePlaceholder"
                  size="small"
                  :disabled="false"
                  title="单据编号"
                  :type-code="typeCode"
                  :rule-id="itemGroup.numberRuleId"
                  :is-show-dialog-init="false"
                  :rules-type-extra-request-param="rulesTypeExtraRequestParam"
                  @confirm="handleConfirmCodeRuleDialog"
                  @defaultCodeRule="defaultCodeRule"
                  @change="changeMethod"
                />
                <el-input
                  v-else
                  v-model="itemGroup.groupCode"
                  placeholder="请输入内容"
                  :disabled="true"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 3.9.2 产品要求项目组不再有上下级关联 <el-row>
            <el-col :span="20">
              <el-form-item label="上级分组">
                <el-cascader
                  v-model="itemGroup.parentGroupId"
                  :options="groupTreeOptions"
                  :props="cascadeProps"
                  clearable
                  :disabled="operateType === 'detail'"
                  @change="changeCheckedParentNodes"
                />
              </el-form-item>
            </el-col>
          </el-row>-->
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
    <!--
    <common-code-rule-dialog
      v-if="showCommonCodeDialog"
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="89"
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    />
    -->
  </div>
</template>
<script>
import { getProjectGroupTreeList } from '@/api/quality-manage.js'
import CustomCodeRule from '@/components/CodeRuleDialog/index'

export default {
  name: 'SaveItemGroupDialog',
  components: {
    CustomCodeRule
  },
  props: {
    title: {
      type: String,
      default: '检验项目组详情'
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
        groupName: '',
        parentGroupId: null,
        groupCode: '' // 编码code
      },
      rules: {
        groupName: [{ required: true, message: '请输入项目组名称', trigger: 'blur' }],
        groupCode: [{ required: true, message: '请输入项目组编码', trigger: ['blur', 'change'] }]
      },
      cascadeProps: {
        checkStrictly: true,
        label: 'groupName',
        value: 'id',
        children: 'sonItemGroupList'
      },
      groupTreeOptions: [],
      // 单据编码 start
      receiptCodePlaceholder: '请输入',
      typeCode: 89,
      codeRequired: true,
      rulesTypeExtraRequestParam: {}
      // 单据编码 end
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
            groupName: '',
            parentGroupId: null
          }
        }
      }
    }
  },
  created() {
    this.getAllTreeItemGroup()
  },
  mounted() {
    if (this.operateType === 'add') {
      setTimeout(() => {
        this.$refs?.commonCodeRuleInput?.init(this.typeCode)
      }, 500)
    }
  },
  methods: {
    // 默认的编码规则
    defaultCodeRule(defaultCodeRule) {
      this.itemGroup.numberRuleId = defaultCodeRule?.id || null
      this.itemGroup.ruleFormItems = defaultCodeRule?.prefixDetailList || []
    },
    // 编码规则确认  初始化有此回调说明没有人工输入哦
    handleConfirmCodeRuleDialog(val, id, ruleFormItems) {
      this.itemGroup.groupCode = ''
      // 设置输入框提示文字
      if (
        ruleFormItems &&
        ruleFormItems.length == 1 &&
        ruleFormItems?.find(item => item.type === 1)
      ) {
        console.log('只有人工输入')
        this.receiptCodePlaceholder = '请输入'
        this.codeRequired = true // 必填
      }
      if (ruleFormItems && !ruleFormItems?.find(item => item.type === 1)) {
        console.log('没有人工输入')
        this.receiptCodePlaceholder = '保存后自动生成'
        this.codeRequired = false // 非必填
      }
      if (
        ruleFormItems &&
        ruleFormItems.length != 1 &&
        ruleFormItems?.find(item => item.type === 1)
      ) {
        console.log('包含人工输入')
        this.receiptCodePlaceholder = '保存后自动生成+请输入'
        this.codeRequired = true // 必填
      }
      this.itemGroup.numberRuleId = id
      this.itemGroup.ruleFormItems = ruleFormItems
    },
    // 构造收料单号
    createReceiptNumber() {
      let str = ''
      const hasManualInput = this.itemGroup.ruleFormItems?.find(
        item => item.type == 1
      )
      // 有人工输入的情况下，要拼接编码规则
      if (hasManualInput) {
        this.itemGroup.ruleFormItems.forEach(item => {
          if (item.type === 1) {
            str += this.itemGroup.groupCode
          } else {
            str += item.value
          }
        })
      }
      // 没有人工输入，自行输入了单号 则覆盖编码规则
      if (!hasManualInput && this.itemGroup.groupCode) {
        str = this.itemGroup.groupCode
      }
      // 没有人工输入，没有输入了单号 编码规则
      if (!hasManualInput && !this.itemGroup.groupCode) {
        this.itemGroup.ruleFormItems.forEach(item => {
          str += item.value
        })
      }
      console.log('构造收料单号', this.itemGroup.ruleFormItems)
      return str
    },
    changeMethod() {},
    // 切换编码规则
    async handleResetCode() {
      /*  this.isAutoOpen = false
      await this.$nextTick()
      this.isAutoOpen = true */
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    // async handleConfirmCodeRuleDialog(code) {
    //   console.log('codecodecodecode', code)
    //   /*   this.itemGroup.groupCode = code */
    //   this.$set(this.itemGroup, 'groupCode', code)
    // },
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
      // if (this.operateType === 'add' && !this.itemGroup.groupCode) {
      //   this.isAutoOpen = true
      // }

      // // 等待编码赋值完成
      // await new Promise((resolve) => {
      //   const interval = setInterval(() => {
      //     if (this.itemGroup.groupCode) {
      //       clearInterval(interval)
      //       resolve()
      //     }
      //   }, 100)
      // })

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
      const groupCode = this.createReceiptNumber() // 生成单据编号
      this.itemGroup.groupCode = groupCode
      this.$emit('confirm')
      this.itemGroup = {
        groupName: '',
        parentGroupId: null,
        groupCode: '' // 编码code
      }
      this.showCommonCodeDialog = false
      //   }
      // })
    },
    async getAllTreeItemGroup() {
      const res = await getProjectGroupTreeList({})
      this.groupTreeOptions = res.data?.data
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

