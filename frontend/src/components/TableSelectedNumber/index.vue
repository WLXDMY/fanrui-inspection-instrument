<template>
  <div v-show="computedSelectedNumber" class="table-selected-number">
    {{ `已选 ${computedSelectedNumber} 项` }}
  </div>
</template>
<script>
export default {
  props: {
    // 当前页面选中的行
    selectedNumber: {
      type: Number,
      default: 0,
      required: true
    },
    // 选中的所有表格行
    allTableNumber: {
      type: Number,
      default: 0,
      required: false
    },
    // 取消选中的行
    cancelNumber: {
      type: Number,
      default: 0,
      required: false
    },
    // 全选判断
    checkAll: {
      type: Boolean,
      default: false,
      required: false
    }
    // 其他页面取消选中的行
    // otherPageCancelNumber: {
    //     type: Number,
    //     default: 0,
    //     required: false
    // }
  },
  data() {
    return {}
  },
  computed: {
    computedSelectedNumber() {
      if (!this.checkAll || !this.allTableNumber) {
        return this.selectedNumber
      }
      if (this.cancelNumber) {
        // console.log('cancel -> ', this.cancelNumber)
        return this.allTableNumber - this.cancelNumber
      }
      return this.allTableNumber
    }
  }
}
</script>
<style lang="scss" scoped>
.table-selected-number {
    color: rgb(236, 80, 80);
    margin: 0 10px;
    display: inline-block;
    vertical-align: middle;
}
</style>
