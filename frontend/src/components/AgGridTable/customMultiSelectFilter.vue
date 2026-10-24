<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-23 18:56:56
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-24 14:47:01
 * @Description:
-->
<template>
  <div class="custom-textfilterbox">
    <el-input v-model="colKeyWord" size="mini" placeholder="查询..." @keyup.enter.native="confirmFilter" />
    <div v-loading="isLoading">
      <div class="checkgroup-box">
        <el-checkbox
          v-if="isShowCheckall"
          v-model="checkedAll"
          class="checkbox-textitem"
          @change="changeAll"
        >
          全选
        </el-checkbox>
        <el-checkbox-group v-model="checkedList" @change="changeGroupList">
          <el-checkbox
            v-for="(item, index) in displayColFilterList"
            :key="index"
            :label="item.value"
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-show="!isShowCheckall" class="el-tree__empty-block">
        <span class="el-tree__empty-text">暂无数据</span>
      </div>
    </div>
    <div class="footer-box">
      <el-button class="btn-cancel" size="mini" @click="confirmFilter">
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils/index.js'

export default {
  name: 'CustomMultiSelectFilter',
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
      // isFisrt: true,
      isLoading: false,
      checkedAll: true,
      colKeyWord: '',
      iniFilterList: [],
      displayColFilterList: [],
      checkedList: [],

      cloneCheckedList: []
    }
  },
  computed: {
    isShowCheckall() {
      if (this.displayColFilterList.length) {
        return true
      }
      return false
    }
  },
  watch: {
    colKeyWord(keyword) {
      if (!keyword) {
        this.displayColFilterList = JSON.parse(JSON.stringify(this.iniFilterList))
        return
      }
      this.debounceSearch()
    },
    isActive(status) {
      if (!status) return
      this.getInitFilter()
      this.colKeyWord = ''
    }
  },
  mounted() {
    this.agTable.customFilterComs.push(this)
    this.debounceSearch = debounce(this.localSearch, 100, false)
  },
  methods: {
    // 重置数据
    resetData() {
      // this.isFisrt = true
      this.checkedAll = true
      this.colKeyWord = ''
      this.iniFilterList = []
      this.displayColFilterList = []
      this.checkedList = []

      this.cloneCheckedList = []

      this.$emit('update-filteractive', { key: 'filterActive', status: false })
    },
    // 获取过滤列的数据
    getInitFilter() {
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
        this.iniFilterList = nFilterData
        this.displayColFilterList = JSON.parse(JSON.stringify(nFilterData))
        if (this.cloneCheckedList.length) {
          // eslint-disable-next-line eqeqeq
          this.checkedList = this.displayColFilterList.map(val => val.value).filter(val => this.cloneCheckedList.some(cloneVal => cloneVal == val))
          this.checkedAll = this.isEqualLength(this.checkedList, this.displayColFilterList)
          this.cloneCheckedList = JSON.parse(JSON.stringify(this.checkedList))
        } else {
          this.checkedList = this.displayColFilterList.map(val => val.value)
          this.checkedAll = true
          this.cloneCheckedList = JSON.parse(JSON.stringify(this.checkedList))
          // this.isFisrt = false
        }
        this.isLoading = false
      })
    },
    // 本地过滤
    localSearch() {
      this.displayColFilterList = this.iniFilterList.filter(item => item.label.indexOf(this.colKeyWord) !== -1)
    },
    // 全选发生变化
    changeAll(isCheck) {
      if (isCheck) {
        this.checkedList = this.displayColFilterList.map(item => item.value)
        return
      }
      this.checkedList = []
    },
    // 剩余的值发生变化
    changeGroupList() {
      if (this.isEqualLength(this.checkedList, this.displayColFilterList)) {
        this.checkedAll = true
        return
      }
      this.checkedAll = false
    },
    // 确定
    confirmFilter() {
      let curCheckedList = this.checkedList
      if (this.colKeyWord) {
        // eslint-disable-next-line eqeqeq
        curCheckedList = this.checkedList.filter(val => this.displayColFilterList.some(item => item.value == val))
      }
      if (!curCheckedList.length) {
        this.$notify({
          title: '提示',
          message: '请至少选择一项',
          type: 'warning',
          duration: 1000
        })
        return
      }

      this.$emit('update-filtervisible', { key: 'isFilterVisible', status: false })
      this.$emit('update-filteractive', { key: 'filterActive', status: true })

      this.cloneCheckedList = JSON.parse(JSON.stringify(curCheckedList))
      this.agTable.getList({
        [this.field]: curCheckedList.join(',')
      })
    },
    // 数组等长
    isEqualLength(arr1, arr2) {
      return arr1.length === arr2.length
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-textfilterbox {
  padding: 0 5px;
  .el-checkbox-group {
    display: flex;
    flex-direction: column;
  }
  .checkgroup-box {
    max-height: 220px;
    overflow-y: auto;
    margin: 10px 0;
    .checkbox-textitem:not(nth-of-type(1)) {
      margin-top: 10px;
    }
  }
  .footer-box {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
