<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-09-04 14:43:53
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-10-24 09:18:11
 * @FilePath: \ams\src\components\CommonTablePlus\rightColumnsConfigComs\sortableList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="item">
    <slot></slot>
  </div>
</template>

<script>
import { ElementMixin } from 'vue-slicksort'
export default {
  mixins: [ElementMixin],
  props: ['item']
}
</script>

<style lang="scss" scoped>
.item {
  z-index: 99999;
  display: flex;
  border: 1px solid #dfe6ec;
  border-top: none;
  list-style: none;
  cursor: pointer;
  width: 100%;
}
</style>
