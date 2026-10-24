<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-06-02 14:50:02
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-01-14 15:51:20
 * @FilePath: \ams\src\components\NumberInput\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-input v-bind="$attrs" size="small" type="number" v-on="$listeners">
    <template v-if="prependShow" slot="prepend">
      {{ prependName }}
    </template>
    <template v-slot:append>
      <slot name="append" />
    </template>
  </el-input>
</template>

<script>
export default {
  props: {
    prependShow: {
      type: Boolean,
      default: false
    },
    prependName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep input[type='number'] {
  -moz-appearance: textfield !important;
}
</style>
