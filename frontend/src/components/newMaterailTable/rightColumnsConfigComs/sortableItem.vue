<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-09-04 14:43:53
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-09-04 15:50:30
 * @FilePath: \ams\src\components\CommonTablePlus\rightColumnsConfigComs\sortableList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-checkbox v-on="$listeners" v-bind="$attrs">
    {{ item.label }}
  </el-checkbox>
</template>

<script>
import { ElementMixin } from 'vue-slicksort'
export default {
  mixins: [ElementMixin],
  props: ['item']
}
</script>

<style lang="scss" scoped></style>
