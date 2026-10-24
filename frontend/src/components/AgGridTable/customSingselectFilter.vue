<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-23 18:56:05
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-23 19:12:41
 * @Description:
-->
<template>
  <div class="custom-textfilterbox">
    <ul v-loading="isLoading" class="el-scrollbar__view el-cascader-menu__list">
      <li v-for="item in displayColFilterList" id="cascader-menu-5117-0-0" :key="item.value" class="el-cascader-node" @click="changeSingleSelect(item)">
        <i v-show="item.value === curSingleSelectVal" class="el-icon-check el-cascader-node__prefix" />
        <span class="el-cascader-node__label">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomSingselectFilter',
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
      isLoading: false,
      curSingleSelectVal: '',
      displayColFilterList: []
    }
  },
  watch: {
    isActive(status) {
      if (!status) return
      this.getSingleInitFilter()
    }
  },
  mounted() {
    this.agTable.customFilterComs.push(this)
  },
  methods: {
    // 重置数据
    resetData() {
      this.$emit('update-filteractive', { key: 'filterActive', status: false })
      this.curSingleSelectVal = ''
    },
    // 单选值变化
    changeSingleSelect(item) {
      const { value } = item
      this.curSingleSelectVal = value

      this.$emit('update-filtervisible', { key: 'isFilterVisible', status: false })
      this.$emit('update-filteractive', { key: 'filterActive', status: true })

      this.agTable.getList({
        [this.field]: this.curSingleSelectVal
      })
    },
    // 获取单选数据
    getSingleInitFilter() {
      if (this.displayColFilterList.length) return

      const filterCols = this.agTable.filterCols
      const curCol = filterCols.find(col => col.field === this.field && col.filterDataRequest)

      this.isLoading = true
      curCol.filterDataRequest(curCol.filterParams).then((filerData) => {
        let nFilterData = filerData
        if (curCol.labelKey && curCol.valueKey) {
          nFilterData = filerData.map((item) => {
            item.value = item[curCol.valueKey]
            item.label = item[curCol.labelKey]
            return item
          })
        }
        this.displayColFilterList = JSON.parse(JSON.stringify(nFilterData))
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-textfilterbox {
  padding: 0 5px;
}
</style>
