<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2022-09-15 17:20:29
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-10-10 11:51:52
 * @FilePath: \systemmanagement\src\views\order-model\product-order\component\baseInfoForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <el-form ref="form" v-bind="$attrs" class="base-info-form" v-on="$listeners">
    <section class="title">{{ title }}</section>
    <el-row>
      <slot />

      <el-collapse-transition>
        <div v-show="!isFold">
          <slot name="fold" />
        </div>
      </el-collapse-transition>
    </el-row>
    <section v-if="hasFold" class="bottom-fold-board" @click="expandOrFold">
      <span>{{ isFold ? '展开' : '收起' }}</span>
      <!-- <img src="@/assets/images/production/down.png" alt=""> -->
      <!-- <img src="@/assets/images/production/down.png" alt=""> -->
    </section>
  </el-form>
</template>

<script>
// import CoreCollapse from '@/components/CoreCollapse'
export default {
  // components: {
  //   CoreCollapse
  // },
  props: {
    title: {
      type: String,
      default: '基本信息'
    },
    hasFold: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isFold: true
    }
  },
  methods: {
    expandOrFold() {
      this.isFold = !this.isFold
    }
  }
}
</script>

<style lang="scss" scoped>
.base-info-form {
  width: 100% !important;
  padding: 16px;
  ::v-deep .el-form-item__content {
    //width: 230px;
    .el-date-editor,
    .el-select {
      width: 100%;
    }
  }
  .el-row {
    padding: 16px 0 0 0;
  }
  .title {
    position: relative;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #303030;
    padding-bottom: 11px;
    border-bottom: 1px solid #d6d6d6;
  }
  width: 1679px;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 4px;

  .bottom-fold-board {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding-bottom: 10px;
    span {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(22, 139, 246, 0.78);
    }
  }
}
</style>
