<template>
  <!-- 编码规则 -->
  <el-dialog
    v-if="dialogVisible"
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
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
        </el-select>
      </el-form-item>

      <el-form-item
        v-for="(item, index) in ruleFormItems"
        :key="index"
        :label="item.name + '：'"
        :prop="`prefix${index}`"
      >
        <!-- type 为 1 是人工输入-->
        <el-input
          v-model="codingRulesTypeForm[`prefix${index}`]"
          placeholder="请输入内容"
          clearable
          style="width: 60%"
          :disabled="item.type !== 1"
        />
      </el-form-item>
      <template v-if="showExample">
        <span style="color: red; margin-left: 70px">样例：{{ example }} </span>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirmCodeRule">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getNumRuleDetailByType as numRuleTypes, getNumRuleSeqByType as numRuleDetail } from '@/api/basisInfo'
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
  name: 'CommonCodeRuleDialog',
  props: {
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
    // 是否显示样例
    showExample: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
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
      console.log(keys, 'keys')
      console.log(this.codingRulesTypeForm, 'this.codingRulesTypeForm')
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
      handler(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.getNumRuleTypes(this.typeCode)
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    // 打开弹框
    open() {
      this.codingRulesTypeForm = { type: '' }
      this.dialogVisible = true
      this.$emit('openRuleDialog', true)
      // 非初始化情况，选中默认项
      if (this.numRuleTypesOptions?.length && this.numRuleTypesOptions?.length >= 1) {
        const defaultRule = this.numRuleTypesOptions.find(item => item.isDefault)
        if (defaultRule) {
          // 需等待dialog初始化完
          this.$nextTick(() => {
            setTimeout(() => {
              this.$set(this.codingRulesTypeForm, 'type', defaultRule.id)
              this.changeRulesType(defaultRule.id)
            }, 500)
          })
        }
        if (!defaultRule) {
          // 需等待dialog初始化完
          this.$nextTick(() => {
            setTimeout(() => {
              this.$set(this.codingRulesTypeForm, 'type', this.numRuleTypesOptions[0].id)
              this.changeRulesType(this.numRuleTypesOptions[0].id)
            }, 500)
          })
        }
      } else {
        // 打开弹框后，若是没有默认项的赋值，需要调用通过类型获取规则详情
        this.getNumRuleTypes()
      }
    },
    async changeRulesType(val) {
      const {
        data: {
          code,
          data: { prefixValueList = [] },
          message
        }
      } = await numRuleDetail({ ...this.rulesTypeExtraRequestParam, id: val })
      if (code === '200') {
        this.ruleFormItems = prefixValueList
        // 清除上次选择数据 避免数据混乱
        const { type } = this.codingRulesTypeForm
        this.codingRulesTypeForm = { type }
        this.typeRules = lodash.cloneDeep(typeRulesClone)

        prefixValueList.forEach((i, index) => {
          this.$set(this.codingRulesTypeForm, `prefix${index}`, i.value ? i.value : '')
          const tempRules = [
            {
              required: true,
              message: '该参数是必填项',
              trigger: ['blur', 'change']
            },
            {
              pattern: /^[A-Za-z0-9-_]+$/,
              message: '只能填写数字、字母、中划线和下划线。'
            }
          ]
          if (i.type === 1) {
            this.$set(this.typeRules, `prefix${index}`, tempRules.slice(0, this.isOpenReg ? 2 : 1))
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
          this.$emit('confirm', this.example, this.codingRulesTypeForm.type, this.ruleFormItems)
          this.dialogVisible = false
          this.$emit('openRuleDialog', false)
        } else {
          return false
        }
      })
    },
    hdRuleFormItems() {
      console.log(this.ruleFormItems, this.codingRulesTypeForm, 'codingRulesTypeForm')

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
      this.$emit('openRuleDialog', false)
    },
    // 通过类型获取规则详情
    async getNumRuleTypes(typeCodeValue) {
      const typeCode = typeCodeValue || this.typeCode
      const {
        data: { code, data, message }
      } = await numRuleTypes({ typeCode })
      if (code === '200') {
        this.numRuleTypesOptions = data || []
        switch (this.numRuleTypesOptions.length) {
          case 0: // length 为 0 时执行
            this.$emit('manualInput', true)
            this.$notify({
              title: '提示',
              message: `${this.title}，编码规则未配置，请先配置单据编码规则`,
              type: 'warning',
              duration: 2000
            })
            break
          case 1: // length 为 1 时执行
            {
              const prefixValueList = await this.changeRulesType(this.numRuleTypesOptions[0].id)
              this.$set(this.codingRulesTypeForm, `type`, this.numRuleTypesOptions[0].id)
              this.handleManualInput(prefixValueList)
            }
            break
          default:
            {
              // 存在默认值则不用弹窗
              const defaultRule = data.find(item => item.isDefault)
              if (defaultRule) {
                if (defaultRule.prefixDetailList.find(item => item.code === 1)) {
                  // 需等待dialog初始化完
                  this.$nextTick(() => {
                    setTimeout(() => {
                      this.$set(this.codingRulesTypeForm, 'type', defaultRule.id)
                      this.changeRulesType(defaultRule.id)
                    }, 500)
                  })
                } else {
                  const prefixValueList = await this.changeRulesType(defaultRule.id)
                  this.$set(this.codingRulesTypeForm, 'type', defaultRule.id)
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
      } else {
        this.$notify({
          title: '提示',
          message: message || '服务异常',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 格式化下拉展示内容
    setRuleLabel(prefixDetail, name) {
      const nPrefixDetail = JSON.parse(prefixDetail || '[]')
      const str = nPrefixDetail.reduce((str, i) => {
        str = str + i.name + '-'
        return str
      }, name + '：')
      return str.slice(0, -1)
    },
    // 处理人工输入的不同情况
    handleManualInput(prefixValueList) {
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
          this.open()
        } else {
          //  直接不弹框允许手动输入
          this.$emit('manualInput', true)
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
        this.open()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
