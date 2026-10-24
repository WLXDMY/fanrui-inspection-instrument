<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-18 15:00:19
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-18 17:04:10
 * @Description:
-->
<template>
  <div class="edit-page">
    <div class="bg-content">
      <div class="operate">
        <slot name="editLayoutOperate" />
      </div>
      <div class="container">
        <slot name="editLayoutContainer" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.edit-page {
  padding: 10px 10px;
  background-color: #eaeff5;
  width: 100%;
  height: calc(100vh - 50px);
  box-sizing: border-box;
  .bg-content {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    .operate {
      height: 72px;
      border-bottom: 1px solid rgba(217, 217, 217, 0.7019607843137254);
      line-height: 72px;
      padding: 0 24px;
      .el-button {
        font-size: 14px;
        margin: 0 14px 0 0;
        padding: 8px 17px;
        cursor: pointer;
      }
    }
    .container {
      background-color: #ffffff;
      overflow-y: scroll;
      padding: 0;
      height: calc(100vh - 170px);
    }
    .container::-webkit-scrollbar {
      background: #fff;
      width: 4px;
    }
    .container::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      width: 4px;
    }
    .container::-webkit-scrollbar-track {
      background: #fff;
      width: 4px;
    }
  }
}
</style>
