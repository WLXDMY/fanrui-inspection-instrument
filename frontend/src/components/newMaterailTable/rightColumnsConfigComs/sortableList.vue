<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-09-04 14:43:53
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-09-04 15:08:16
 * @FilePath: \ams\src\components\CommonTablePlus\rightColumnsConfigComs\sortableList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="sortable-list">
    <slot />
  </div>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort'
export default {
  mixins: [ContainerMixin]
}
</script>

<style lang="scss" scoped>
.sortable-list {
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
  background-color: #fff;
}
</style>
