<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-15 14:28:47
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-18 17:07:57
 * @Description:
-->
<template>
  <div class="container1-3">
    <div class="bg-box">
      <slot name="layoutBack" />
      <div class="searchbox">
        <div class="left-box level">
          <slot name="layoutLeft" />
        </div>
        <div class="right-box level">
          <slot name="layoutRight" />
        </div>
      </div>
      <div v-if="$slots.layoutTop" class="table-top">
        <div class="title-table level">
          <slot name="layoutTop" />
        </div>
      </div>
      <div class="tablebox">
        <slot name="layoutContent" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container1-3 .tablebox {
  width: calc(100% - -8px);
}
</style>
