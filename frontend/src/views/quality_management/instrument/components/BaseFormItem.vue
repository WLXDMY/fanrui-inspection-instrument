<!--
 * @Author: chenzejie
 * @Date: 2023-12-07 14:54:48
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-10-10 11:50:41
 * @Description: 基础信息表单字段
-->
<template>
  <!-- 输入框带搜索按钮 -->
  <el-input
    v-if="inputType === 'inputWithButton'"
    v-model="baseForm[prop]"
    placeholder="请选择"
    disabled
    :clearable="clearable"
  >
    <el-button slot="append" icon="el-icon-search" :disabled="searchButtonDisabled" @click="clickMethod" />
  </el-input>
  <!-- 输入框类型 -->
  <el-input
    v-else-if="inputType === 'input' || inputType === 'textarea'"
    v-model="baseForm[prop]"
    :readonly="readonly"
    :clearable="clearable"
    placeholder="请输入内容"
    :disabled="disabled"
    :row="rowNum || null"
    @focus="focusMethod"
    @change="changeMethod"
  >
    <template v-if="isShowInputIcon" slot="suffix"
      ><i class="el-icon-s-operation" style="cursor: pointer" @click.stop="changeIconMethod"
    /></template>
  </el-input>

  <!-- 下拉选择类型 -->
  <el-select
    v-else-if="inputType === 'select'"
    v-model="baseForm[prop]"
    :clearable="clearable"
    filterable
    :disabled="disabled"
    placeholder="请选择"
    @change="changeMethod"
  >
    <el-option v-for="i in option" :key="i.value" :label="i.label" :value="i.value" :disabled="i.disabled" />
  </el-select>

  <!-- 多选框 -->
  <el-checkbox-group v-else-if="inputType === 'checkbox'" v-model="baseForm[prop]" :disabled="disabled">
    <el-checkbox v-for="i in option" :key="i.value" :label="i.label" :disabled="i.disabled">{{ i.name }}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  props: {
    prop: {
      type: String,
      default: ''
    },
    baseForm: {
      type: Object,
      default: () => ({})
    },
    inputType: {
      type: String,
      default: ''
    },
    searchButtonDisabled: {
      type: Boolean,
      default: false
    },
    clickMethod: {
      type: Function,
      default: () => {}
    },
    focusMethod: {
      type: Function,
      default: () => {}
    },
    changeMethod: {
      type: Function,
      default: () => {}
    },
    changeIconMethod: {
      type: Function,
      default: () => {}
    },
    // el-row的row属性
    rowNum: {
      type: Number,
      default: 1
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    option: {
      type: Array,
      default: () => []
    },
    formula: {
      type: String,
      default: ''
    },
    isShowInputIcon: {
      type: Boolean,
      default: false
      // default: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},

  created() {},
  methods: {}
}
</script>

<style></style>
