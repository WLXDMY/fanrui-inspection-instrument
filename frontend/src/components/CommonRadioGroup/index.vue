<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-05-31 11:18:40
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-05-31 15:49:51
 * @FilePath: \yelink-qms\src\components\commonRadioGroup\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="commonRadioGroup">
    <el-radio-group :value="tabValue" style="margin: 10px 0" @input="inputTabValue">
      <el-radio-button v-for="item in radioList" :key="item.value" :label="item.value">{{
        item.label
      }}</el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: 'CommonRadioGroup',
  props: {
    tabValue: {
      type: String,
      default: ''
    },
    radioList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    inputTabValue(value) {
      this.$emit('update:tabValue', value)
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.commonRadioGroup {
}
</style>
