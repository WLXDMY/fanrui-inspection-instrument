<template>
  <div class="common-code-rule-input">
    <el-input
      ref="commonCodeRuleInput"
      v-model="inputValue"
      :placeholder="placeholder"
      clearable
      :disabled="disabled"
      v-bind="$attrs"
      v-on="$listeners"
      @focus="focusInput"
      @blur="blurInput"
      @mouseover.native="focusInput"
      @mouseleave.native="blurInput"
    >
      <img
        slot="suffix"
        class="switch_icon"
        src="@/assets/images/common/switch.png"
        alt=""
        width="20"
        :style="disabled ? 'cursor: not-allowed;' : ''"
        @click="disabled ? '' : handleClick('click')"
      />
      <template v-for="(val, name) in $slots" :slot="name">
        <slot :name="name"></slot>
      </template>
    </el-input>
    <!-- 编码规则 -->
    <CodeRuleDialog
      ref="codeRuleDialog"
      v-bind="$attrs"
      :isShowDialogInit="isShowDialogInit"
      :ruleTypesOptions="ruleTypesOptions"
      :ruleTypesOptionsChecked="ruleTypesOptionsChecked"
      :barCodeId="barCodeId"
      @defaultCodeRule="defaultRule => $emit('defaultCodeRule', defaultRule)"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import CodeRuleDialog from './component/CodeRuleDialog.vue'
export default {
  name: 'YCommonCodeRuleInput',
  components: { CodeRuleDialog },
  props: {
    // 输入框值
    value: {
      type: [String, Number],
      default: ''
    },
    // 输入框提示语
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    codeRuleDialogParam: {
      type: Object,
      default: () => {}
    },
    isShowDialogInit: {
      type: Boolean,
      default: true
    },
    defaultInit: {
      type: Boolean,
      default: false
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
    }
  },
  data() {
    return {}
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    // codeRuleDialogParam: {
    //   handler (newVal, oldVal) {
    //     if (newVal && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
    //       this.codeRuleDialogParamData = newVal
    //     }
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  mounted() {},
  methods: {
    /**
     * @param typeCode 编码规则typeCode
     */
    init(typeCode) {
      this.$refs?.codeRuleDialog?.getNumRuleTypes(typeCode)
    },
    focusInput() {
      const element = document.querySelector(
        '.common-code-rule-input .el-input__inner'
      )
      !this.disabled && (element.style.paddingRight = '50px')
    },
    blurInput() {
      const element = document.querySelector(
        '.common-code-rule-input .el-input__inner'
      )
      !this.disabled && (element.style.paddingRight = '30px')
    },
    async handleClick() {
      this.$refs?.codeRuleDialog?.open()
    },
    /**
     * 重新设置编码规则的值
     * @param ruleId 编码规则ID
     * @param isOpenDialog 有人工输入时是否需要打开弹框输入
     * @param ruleFormItemList 上次选择的编码规则详情列表（包含人工输入的数据）
     */
    async resetRule(ruleId, isOpenDialog, ruleFormItemList) {
      this.$refs?.codeRuleDialog?.resetRule(
        ruleId,
        isOpenDialog,
        ruleFormItemList
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.common-code-rule-input {
  ::v-deep .el-input__suffix-inner {
    position: relative;
  }
  .switch_icon {
    position: relative;
    top: 5px;
  }
}
</style>
