<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-12-30 14:37:08
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-01-06 14:33:54
 * @Description: 检验单-物料扩展字段-单个选项
-->

<template>
  <el-form-item
    v-if="fieldConfig?.isShow === true"
    :prop="snakeToCamel(prop)"
    :rules="comConfigFieldRules"
    :label="getLabelName"
  >
    <el-select
      v-if="fieldConfig?.inputType === 'select'"
      v-model="row[snakeToCamel(prop)]"
      style="width: 248px"
      clearable
      filterable
      :disabled="disabled || !fieldConfig?.isEdit"
      @change="changeHandle"
    >
      <el-option
        v-for="(i, index) in option"
        :key="index"
        :label="i.label"
        :value="i.value"
        :disabled="i.disabled"
      />
    </el-select>
    <!-- 时间选择器 -->
    <template v-else-if="fieldConfig?.inputType === 'dateTimePicker'">
      <el-time-picker
        v-if="fieldConfig?.formula === 'timePicker'"
        v-model="row[snakeToCamel(prop)]"
        style="width: 248px"
        :disabled="disabled || !fieldConfig?.isEdit"
        placeholder="选择时间点"
      />
      <el-date-picker
        v-else
        v-model="row[snakeToCamel(prop)]"
        style="width: 248px"
        :disabled="disabled || !fieldConfig?.isEdit"
        :type="fieldConfig?.formula || 'date'"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        size="small"
      />
    </template>
    <!-- v-else-if="fieldConfig?.inputType === 'input'" -->
    <el-input
      v-else
      v-model="row[snakeToCamel(prop)]"
      style="width: 248px"
      :disabled="disabled || !fieldConfig?.isEdit"
      clearable
    />
  </el-form-item>
</template>

<script>
import { apiTransformTrigger } from '@/api/base' // 获取审批人列表

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    fullRouteCode: {
      type: String,
      default: ''
    },
    pageFullPathCode: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => ({})
    },
    tdIndex: {
      type: [Number, String],
      default: ''
    },
    // 是否需要将字段名转换为驼峰
    isSnakeToCamel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      oldRow: {},
      fieldConfig: {}, // 当前项配置
      option: [] // 表单配置可选值，配置为空则显示全部
    }
  },
  computed: {
    comConfigFieldRules() {
      return this.fieldConfig?.rules
        ? [
          {
            required: this.fieldConfig?.isNeed,
            message: '请输入'
          },
          {
            pattern: this.fieldConfig?.rules || '',
            message: '数据格式错误'
          }
        ]
        : [
          {
            required: this.fieldConfig?.isNeed,
            message: '请输入'
          }
        ]
    },
    getLabelName() {
      let label = this.fieldConfig.fieldCustomName || this.fieldConfig.fieldDefaultName
      label += label ? ':' : ''
      // console.log('组件里面 名称 fieldConfig', this.fieldConfig)
      console.log('组件里面 名称', label)

      // :label="fieldConfig.fieldCustomName || fieldConfig.fieldDefaultName"
      return label
    }
  },
  watch: {
    row: {
      handler(val) {
        // 正则表达式匹配 ${} 中的内容
        const regex = /\${([^}]+)}/g
        ;(this.fieldConfig.dependenciesStr || []).forEach(item => {
          if (val[item] !== this.oldRow[item]) {
            const formula = this.fieldConfig.formula.replace(
              regex,
              (match, p1) => {
                return `(+this.row.${p1})`
              }
            )

            this.$set(this.row, this.snakeToCamel(this.prop), '' + (eval(formula) || 0))
          }
        })
        this.oldRow = { ...val } // 保存旧值，父组件只更新属性不更新对象引用，监听不正确
      },
      deep: true,
      immediate: true
    },
    pageFullPathCode: {
      handler(val) {
        // 获取当前项配置
        this.fieldConfig =
          this.$FC(this.prop, this.fullRouteCode, this.pageFullPathCode) || {}
        this.fieldConfig.dep = []

        // 获取可选值
        this.getOption()
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    // 处理下拉框的选择
    changeHandle(val) {
      // this.$set(this.row, 'optionList', this.option)
      // // 业务类型 默认赋值
      // const typeEnumsItem = this.inspectTypeEnums.find(item => item.orderType === val)
      // console.log('业务类型 默认赋值', typeEnumsItem)
      // this.$set(this.formInline, 'businessTypeCode', typeEnumsItem?.businessTypeCode)
      // this.$set(this.formInline, 'businessTypeName', typeEnumsItem?.businessTypeName)
    },

    snakeToCamel(snakeStr) {
      if (!this.isSnakeToCamel) {
        return snakeStr
      }
      const parts = snakeStr.split('_')
      let camelStr = parts.shift() // 获取第一个单词，并使它保持不变（不转为大写）

      parts.forEach((part) => {
        camelStr += part.charAt(0).toUpperCase() + part.substring(1).toLowerCase()
      })

      return camelStr
    },
    async getOption() {
      this.fieldConfig.dependenciesStr = []
      // 接口响应参数取值定义，可选值唯一辨识,名称，如：code,name
      const respParamFieldValue =
        (this.fieldConfig?.respParamField &&
          this.fieldConfig.respParamField.split(',')[0]) ||
        'value'
      const respParamFieldLabel =
        (this.fieldConfig?.respParamField &&
          this.fieldConfig.respParamField.split(',')[1]) ||
        'label'

      if (
        this.fieldConfig?.optionValuesType === 'api' ||
        this.fieldConfig?.optionValuesType === 'pageapi'
      ) {
        const {
          data: { code, data }
        } = await apiTransformTrigger({
          id: this.fieldConfig?.relatedApiEntity?.id
        })

        if (code === '200') {
          const pageData =
            this.fieldConfig.optionValuesType === 'pageapi'
              ? data.records
              : data // 是否是分页接口
          //  this.fieldConfig.optionValues有值才过滤选项
          const val =
            (JSON.parse(this.fieldConfig.optionValues || '[]') &&
              JSON.parse(this.fieldConfig.optionValues || '[]')?.length &&
              pageData.filter(i =>
                JSON.parse(this.fieldConfig.optionValues || '[]').includes(
                  i[respParamFieldValue]
                )
              )) ||
            pageData
          this.option = val.map(j => ({
            ...j,
            label: j[respParamFieldLabel],
            value: '' + j[respParamFieldValue]
          }))
          return
        }

        // const res = await requestFun(
        //   this.fieldConfig.url,
        //   this.fieldConfig.method,
        //   this.fieldConfig.params
        // ) // 自定义接口
        // const { code: apiCode, data: apiData } = res.data
        // const pageData =
        //   this.fieldConfig.optionValuesType === 'pageapi'
        //     ? apiData.records
        //     : apiData // 是否是分页接口
        // if (apiCode === '200') {
        //   //  this.fieldConfig.optionValues有值才过滤选项
        //   const val =
        //     (JSON.parse(this.fieldConfig.optionValues || '[]') &&
        //       JSON.parse(this.fieldConfig.optionValues || '[]')?.length &&
        //       pageData.filter(i =>
        //         JSON.parse(this.fieldConfig.optionValues || '[]').includes(
        //           i[respParamFieldValue]
        //         )
        //       )) ||
        //     pageData
        //   this.option = val.map(j => ({
        //     ...j,
        //     label: j[respParamFieldLabel],
        //     value: '' + j[respParamFieldValue]
        //   }))
        //   return
        // }
      } else if (this.fieldConfig?.optionValuesType === 'table') {
        const val =
          (JSON.parse(this.fieldConfig.optionValues || '[]') &&
            JSON.parse(this.fieldConfig.optionValues || '[]')?.length &&
            JSON.parse(this.fieldConfig.allOption || '[]').filter(i =>
              JSON.parse(this.fieldConfig.optionValues || '[]').includes(
                i[respParamFieldValue]
              )
            )) ||
          JSON.parse(this.fieldConfig.allOption || '[]')

        this.option = val.map(j => ({
          ...j,
          label: j[respParamFieldLabel],
          value: '' + j[respParamFieldValue]
        }))
        console.log('获取数据的选项 自定义模式 this.option', this.option)
      } else if (this.fieldConfig?.optionValuesType === 'formula') {
        const extractVariables = str => {
          const reg = /\${([^}]+)}/g
          // 正则表达式匹配 ${} 中的内容
          let matches
          const dependenciesStr = []

          // 使用正则表达式的 exec 方法来捕获所有匹配项
          while ((matches = reg.exec(str)) !== null) {
            dependenciesStr.push(matches[1])
          }

          return dependenciesStr
        }
        // 观察者（该值依赖其他字段的值动态变化）
        this.fieldConfig.dependenciesStr = extractVariables(
          this.fieldConfig.formula || ''
        )
      }
    }
  }
}
</script>

<style></style>
