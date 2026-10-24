<template>
  <!-- 编码规则 -->
  <el-dialog
    v-if="dialogVisible"
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :modal="modal"
    :before-close="handleClose"
    append-to-body
  >
    <el-form
      ref="codingRulesTypeRef"
      :model="codingRulesTypeForm"
      :rules="typeRules"
      class="numberdialog"
      label-width="140px"
      size="small"
    >
      <el-form-item label="编码规则类型：" prop="type">
        <el-select
          v-model="codingRulesTypeForm.type"
          filterable
          placeholder="请选择编码规则类型:"
          style="width: 60%"
          @change="changeRulesType"
        >
          <el-option
            v-for="item in numRuleTypesOptions"
            :key="item.id"
            :label="setRuleLabel(item.prefixDetail, item.name)"
            :value="item.id"
          />
          <el-option v-if="addRuleShow" label="新增编码规则" value="jumpLink" :disabled="true">
            <i class="el-icon-circle-plus-outline" style="color: #46a6ff" />
            <el-button type="text" @click="jumpLink"> 新增编码规则 </el-button>
          </el-option>
        </el-select>
      </el-form-item>

      <!--  <el-form-item
        v-for="(item, index) in ruleFormItems"
        :key="index"
        :label="item.name + '：'"
        :prop="`prefix${index}`"
      >
        <el-input
          v-model="codingRulesTypeForm[`prefix${index}`]"
          placeholder="请输入内容"
          clearable
          style="width: 60%"
          :disabled="item.type !== 1"
        />
      </el-form-item> -->
      <template v-if="showExample">
        <span style="color: red; margin-left: 70px">样例：{{ example }} </span>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        :loading="disabledBtn"
        type="primary"
        @click="handleConfirmCodeRule"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getNumRuleDetailByType as numRuleTypes,
  getNumRuleSeqByType as numRuleDetail
  // getNumRuleType
} from '@/api/basisInfo'
import lodash from 'lodash'
const typeRulesClone = {
  type: [
    {
      required: true,
      message: '请先选择规则类型',
      trigger: ['blur', 'change']
    }
  ]
}
export default {
  name: 'CodeRuleDialog',
  props: {
    isShowDialogInit: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true,
      default: () => {
        return '编码规则'
      }
    },
    // 编码规则类型
    typeCode: {
      type: [String, Number],
      required: true
    },
    // 新增页面需要自动获取编码规则 其他部分页面不需要则在需要时通过ref调用打开
    isAutoOpen: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    // 用来判断只有一条编码规则且都是人工输入时是否需要弹框
    isAllowManualInput: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    //  生产工单-生产批次号、委外订单收货单-单据编号、采购收货-采购批次号
    // 特殊处理  添加请求参数
    rulesTypeExtraRequestParam: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 人工输入内容限制
    isOpenReg: {
      type: Boolean,
      default: () => false
    },
    // 人工输入内容限制:禁止输入空格
    isOpenReg_disabledSpace: {
      type: Boolean,
      default: () => false
    },
    isInitAction: {
      type: Boolean,
      default: () => false
    },
    modal: {
      type: Boolean,
      default: true
    },
    // 是否显示样例
    showExample: {
      type: Boolean,
      default: true
    },
    ruleId: {
      type: [Number, String],
      default: ''
    },
    ruleFormItemList: {
      type: Array
    },
    ruleTypesOptions: {
      type: Array,
      default: () => {
        return []
      }
    },
    ruleTypesOptionsChecked: {
      type: Array,
      default: () => {
        return []
      }
    },
    barCodeId: {
      type: Number,
      default: 0
    },
    // 是否显示新增编码规则选项
    addRuleShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      disabledBtn: false,
      codingRulesTypeForm: {
        type: ''
      },
      typeRules: lodash.cloneDeep(typeRulesClone),
      numRuleTypesOptions: [],
      rulePrefixDetail: [],
      dialogVisible: false,
      ruleFormItems: []
    }
  },

  computed: {
    example() {
      const keys = Object.keys(this.codingRulesTypeForm)
      let str = ''
      keys.forEach(i => {
        if (i !== 'type') {
          str += this.codingRulesTypeForm[i]
        }
      })
      return str
    }
  },
  watch: {
    isAutoOpen: {
      handler(newVal, oldVal) {},
      immediate: true,
      deep: true
    },

    dialogVisible: {
      handler(newVal) {
        if (newVal) {
          // this.getNumRuleType()
        }
      }
    }
  },
  mounted() {
    if (this.isInitAction) {
      if (!this.barCodeId) {
        this.getNumRuleTypes(this.typeCode)
      }
    }
  },
  methods: {
    /**
     * 重新设置编码规则的值
     * @param ruleId 编码规则ID
     * @param isOpenDialog 有人工输入时是否需要打开弹框输入
     * @param ruleFormItemList 上次选择的编码规则详情列表（包含人工输入的数据）
     */
    async resetRule(ruleId, isOpenDialog, ruleFormItemList) {
      const prefixValueList = await this.changeRulesType(ruleId)
      this.$set(this.codingRulesTypeForm, `type`, ruleId)

      this.handleManualInput(prefixValueList, isOpenDialog, ruleFormItemList)
    },

    // 打开弹框
    async open() {
      this.codingRulesTypeForm = { type: '' }
      this.dialogVisible = true
      this.$nextTick(() => {
        if (this.ruleId) {
          // 已选择过规则ID的情况
          this.$set(this.codingRulesTypeForm, 'type', this.ruleId)
          this.changeRulesType(this.ruleId)
          return
        }
        // 非初始化情况，选中默认项
        if (
          this.numRuleTypesOptions?.length &&
          this.numRuleTypesOptions?.length > 1
        ) {
          const defaultRule = this.numRuleTypesOptions.find(
            item => item.isDefault
          )
          if (defaultRule) {
            // 需等待dialog初始化完
            setTimeout(() => {
              this.$set(this.codingRulesTypeForm, 'type', defaultRule.id)
              this.changeRulesType(defaultRule.id)
            }, 500)
          }
        }
      })
    },
    async changeRulesType(val) {
      this.disabledBtn = true
      const {
        data: {
          code,
          data: { prefixValueList = [] },
          message
        }
      } = await numRuleDetail({ ...this.rulesTypeExtraRequestParam, id: val })
      this.disabledBtn = false
      if (code === '200') {
        this.ruleFormItems = prefixValueList
        // 清除上次选择数据 避免数据混乱
        const { type } = this.codingRulesTypeForm
        this.codingRulesTypeForm = { type }
        this.typeRules = lodash.cloneDeep(typeRulesClone)

        prefixValueList.forEach((i, index) => {
          this.$set(this.codingRulesTypeForm, `prefix${index}`, i.value)
          const rulesMap = {
            isOpenReg: {
              pattern: /^[A-Za-z0-9-_.#]+$/,
              message: '只能填写数字、字母、小数点、#号、中划线和下划线。'
            },
            isOpenReg_disabledSpace: {
              pattern: /^\S*$/,
              message: '禁止输入空格'
            }
          }
          if (i.type === 1) {
            const rules = [
              {
                required: true,
                message: '该参数是必填项',
                trigger: ['blur', 'change']
              }
            ]
            this.isOpenReg && rules.push(rulesMap.isOpenReg)
            this.isOpenReg_disabledSpace &&
              rules.push(rulesMap.isOpenReg_disabledSpace)

            this.$set(this.typeRules, `prefix${index}`, rules)
          }
        })

        return prefixValueList
      } else {
        this.$notify({
          title: '提示',
          message: message || '服务异常',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 编码规则弹框确认
    handleConfirmCodeRule() {
      this.$refs['codingRulesTypeRef'].validate(valid => {
        if (valid) {
          this.hdRuleFormItems()
          this.$emit(
            'confirm',
            this.example,
            this.codingRulesTypeForm.type,
            this.ruleFormItems,
            true
          )
          this.dialogVisible = false
          this.$emit('openRuleDialog', false)
        } else {
          return false
        }
      })
    },
    hdRuleFormItems() {
      this.ruleFormItems.forEach((i, index) => {
        // 如果是人工输入的话
        if (i.type === 1) {
          for (const key in this.codingRulesTypeForm) {
            if (key.endsWith(`${index}`)) {
              i.value = this.codingRulesTypeForm[key]
            }
          }
        }
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.$emit('close')
      this.$emit('openRuleDialog', false)
    },
    /**
     * 通过类型获取规则详情
     * @param typeCode 编码规则typeCode
     */
    async getNumRuleTypes(typeCode) {
      if (
        this.ruleId &&
        this.ruleTypesOptions.length &&
        this.ruleTypesOptionsChecked.length
      ) {
        // 已选择过规则ID的情况
        this.numRuleTypesOptions = this.ruleTypesOptions || []
        this.$set(this.codingRulesTypeForm, 'type', this.ruleId)
        this.ruleFormItems = this.ruleTypesOptionsChecked
        this.$emit('confirm', '', this.ruleId, this.ruleFormItems)
        return
      }
      if (this.ruleId && this.ruleTypesOptions.length) {
        // 已选择过规则ID的情况
        this.numRuleTypesOptions = this.ruleTypesOptions || []
        this.$set(this.codingRulesTypeForm, 'type', this.ruleId)
        await this.changeRulesType(this.ruleId)
        this.$emit('confirm', '', this.ruleId, this.ruleFormItems)
        return
      }
      let data = []
      if (this.ruleTypesOptions.length == 0) {
        const {
          data: { code, data: resultData, message }
        } = await numRuleTypes({ typeCode })
        if (code != '200') {
          this.$notify({
            title: '提示',
            message: message || '服务异常',
            type: 'error',
            duration: 2000
          })
          return
        }
        data = resultData || []
      } else {
        data = this.ruleTypesOptions
      }

      this.numRuleTypesOptions = data || []
      switch (this.numRuleTypesOptions.length) {
        case 0: // length 为 0 时执行
          this.$notify({
            title: '提示',
            message: `${this.title}，编码规则未配置，请先配置单据编码规则`,
            type: 'warning',
            duration: 4500
          })
          break
        case 1: // length 为 1 时执行
          {
            const prefixValueList = await this.changeRulesType(
              this.numRuleTypesOptions[0].id
            )
            this.$set(
              this.codingRulesTypeForm,
              `type`,
              this.numRuleTypesOptions[0].id
            )
            this.$emit(
              'confirm',
              '',
              this.numRuleTypesOptions[0].id,
              prefixValueList
            )
            this.handleManualInput(prefixValueList)
          }
          break
        default:
          {
            const defaultRule = data.find(item => item.isDefault)
            // 存在默认值则不用弹窗，
            if (defaultRule) {
              // 人工输入也要能设置为默认值--- 燕生
              if (defaultRule.prefixDetailList.find(item => item.code === 1)) {
                this.isShowDialogInit && this.open()
                // 需等待dialog初始化完
                this.$nextTick(() => {
                  setTimeout(async() => {
                    this.$set(this.codingRulesTypeForm, 'type', defaultRule.id)
                    const prefixValueList = await this.changeRulesType(
                      defaultRule.id
                    )
                    this.$emit('confirm', '', defaultRule.id, prefixValueList)
                  }, 500)
                })
              } else {
                const prefixValueList = await this.changeRulesType(
                  defaultRule.id
                )

                this.$emit(
                  'confirm',
                  // 参数1  编号
                  prefixValueList.reduce((sum, item) => {
                    return sum + (item.value ? item.value : '')
                  }, ''),
                  // 参数2  ruleId
                  defaultRule.id,
                  // 参数3  编码规则详情
                  this.ruleFormItems
                )
              }
            } else {
              this.open()
            }
          }
          break
      }
    },
    // 格式化下拉展示内容
    setRuleLabel(prefixDetail, name = '') {
      const nPrefixDetail = JSON.parse(prefixDetail || '[]')
      const str = nPrefixDetail.reduce((str, i) => {
        str = str + i.name + '-'
        return str
      }, name + '：')
      return str.slice(0, -1)
    },
    // 处理人工输入的不同情况
    /**
     *
     * @param prefixValueList 当前获取的最新的编码规则详情列表
     * @param isOpenDialog 有人工输入时是否需要打开弹框输入
     * @param ruleFormItemList 上次选择的编码规则详情列表（包含人工输入的数据）
     */
    handleManualInput(prefixValueList, isOpenDialog = true, ruleFormItemList) {
      const manualInput = prefixValueList.filter(i => i.type === 1)
      if (manualInput.length === 0) {
        // 无人工输入时直接生成编码规则
        this.$emit(
          'confirm',
          // 参数1  编号
          prefixValueList.reduce((sum, item) => {
            return sum + (item.value ? item.value : '')
          }, ''),
          // 参数2  ruleId
          this.codingRulesTypeForm.type,
          // 参数3  编码规则详情
          this.ruleFormItems
        )

        // 全是人工输入的情况
      } else if (manualInput.length === prefixValueList.length) {
        if (this.isAllowManualInput) {
          // 弹框输入
          if (isOpenDialog) {
            this.open()
          } else {
            if (
              this.codingRulesTypeForm.type === this.ruleId &&
              this.ruleFormItems.length === ruleFormItemList.length
            ) {
              this.matchRuleFormItems(this.ruleFormItems, ruleFormItemList)
            }
          }
        } else {
          //  直接不弹框允许手动输入
          this.$emit(
            'confirm',
            // 参数1  编号
            '',
            // 参数2  ruleId
            this.codingRulesTypeForm.type,
            // 参数3  编码规则详情
            this.ruleFormItems
          )
        }
      } else {
        // 存在人工输入和其他信息时
        if (isOpenDialog) {
          this.open()
        } else {
          if (
            this.codingRulesTypeForm.type === this.ruleId &&
            this.ruleFormItems.length === ruleFormItemList.length
          ) {
            this.matchRuleFormItems(this.ruleFormItems, ruleFormItemList)
          }
        }
      }
    },
    // 匹配编码规则列表数据，一样则将对应人工输入赋值，否则提示不一致且打开弹框
    matchRuleFormItems(newList, oldList) {
      const findUnlikeitem = newList.find(
        (item, index) => item.type !== oldList[index].type
      )
      if (findUnlikeitem) {
        this.$notify({
          title: '提示',
          message: '编码规则内容与上次不一致，请重新输入',
          type: 'warning',
          duration: 2000
        })
        this.open()
        return
      }
      newList.forEach((item, index) => {
        if (item.type === 1) {
          item.value = oldList[index].value
        }
      })

      this.$emit(
        'confirm',
        // 参数1  编号
        newList.reduce((sum, item) => {
          return sum + (item.value ? item.value : '')
        }, ''),
        // 参数2  ruleId
        this.codingRulesTypeForm.type,
        // 参数3  编码规则详情
        newList
      )
    },
    jumpLink() {
      if (window.flutter_inappwebview) {
        try {
          window.flutter_inappwebview
            .callHandler(
              'startProgramWitApplicationId_v2',
              'new.yk.genieos.dfs.documents-config.num-rule',
              `/genieos/dfs/documents-config/num-rule?typeCode=${this.typeCode}`,
              '',
              true
            )
            .then(res => {
              this.handleClose()
              this.$parentProps?.setGlobalState({
                isRefreshTopMenu: true // 刷新主应用顶部
              })
              console.log(res, '跳转成功')
            })
        } catch (error) {
          console.log(error, 'error')
        }
      } else {
        this.handleClose()
        this.$router.push({
          name: `numRule`,
          query: {
            typeCode: this.typeCode
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
