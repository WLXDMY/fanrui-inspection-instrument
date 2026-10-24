<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-23 18:56:56
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-23 19:31:56
 * @Description:
-->
<template>
  <div class="custom-textfilterbox">
    <el-input v-model="colKeyWord" size="mini" placeholder="查询..." @keyup.enter.native="confirmFilter" />
    <div class="footer-box mt-10">
      <el-button
        class="btn-cancel"
        size="mini"
        @click="confirmFilter"
      >
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomFuzzyFilter',
  inject: ['agTable'],
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    field: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      colKeyWord: '',
      cloneColKeyWord: ''
    }
  },
  watch: {
    isActive(status) {
      if (!status) return
      this.colKeyWord = this.cloneColKeyWord
    }
  },
  mounted() {
    this.agTable.customFilterComs.push(this)
  },
  methods: {
    // 重置数据
    resetData() {
      this.$emit('update-filteractive', { key: 'filterActive', status: false })
      this.colKeyWord = ''
      this.cloneColKeyWord = ''
    },
    // 确定
    confirmFilter() {
      this.cloneColKeyWord = this.colKeyWord
      this.agTable.getList({
        [this.field]: this.colKeyWord
      })
      this.$emit('update-filtervisible', { key: 'isFilterVisible', status: false })
      this.$emit('update-filteractive', { key: 'filterActive', status: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.mt-10 {
  margin-top: 10px;
}
.custom-textfilterbox {
  padding: 0 5px;
  .footer-box {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
