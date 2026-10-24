<!--
 * @Author: zhaozhuo
 * @Date: 2021-11-26 10:43:43
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-10 11:03:41
 * @Description:
-->
<template>
  <div class="custom-textfilterbox">
    <template v-if="!isSingleSelect">
      <template>
        <el-input v-if="!isIptSearch" v-model="colKeyWord" size="mini" placeholder="查询..." />
        <el-input v-else v-model="colKeyWord" size="mini" placeholder="查询..." @keyup.enter.native="confirmFilter" />
      </template>

      <template v-if="!isIptSearch" v-loading="isLoading">
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
            <el-checkbox v-for="(item, index) in displayColFilterList" :key="index" :label="item.value">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div v-show="!isShowCheckall" class="el-tree__empty-block"><span class="el-tree__empty-text">暂无数据</span></div>
      </template>
      <div :class="['footer-box', isIptSearch ? 'mt-10' : '' ]">
        <el-button
          class="btn-cancel"
          size="mini"
          @click="confirmFilter"
        >
          确定
        </el-button>
      </div>
    </template>

    <template v-else>
      <ul class="el-scrollbar__view el-cascader-menu__list">
        <li v-for="item in displayColFilterList" id="cascader-menu-5117-0-0" :key="item.value" class="el-cascader-node" @click="changeSingleSelect(item)">
          <i v-show="item.value === curSingleSelectVal" class="el-icon-check el-cascader-node__prefix" />
          <span class="el-cascader-node__label">{{ item.label }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { debounce } from '@/utils/index.js'

export default {
  name: 'CustomTextFilter',
  inject: ['agTable'],
  props: {
    filterType: {
      type: String,
      default: ''
    },
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
      checkedAll: true,
      iniFilterList: [], // 初始数据
      displayColFilterList: [], // 选择框中的数据
      checkedList: [],
      curSingleSelectVal: '', // 单选选中值
      isLoading: false,
      cloneColKeyWord: '',
      cloneCheckedList: []
    }
  },
  computed: {
    isIptSearch() {
      return this.filterType === 'customIptFilter'
    },
    isSingleSelect() {
      return this.filterType === 'custSingleTextFilter'
    },
    isShowCheckall() {
      if (this.isIptSearch) return false

      if ((!this.colKeyWord) || (this.colKeyWord && this.displayColFilterList.length)) {
        return true
      }
      return false
    }
  },
  watch: {
    colKeyWord(keyword) {
      if (this.isIptSearch) return
      if (!keyword) {
        this.displayColFilterList = JSON.parse(JSON.stringify(this.iniFilterList))
        return
      }
      this.debounceSearch()
    },
    isActive(status) {
      // 恢复数据
      if (!status) return

      if (this.isSingleSelect) {
        this.getSingleInitFilter()
        return
      }

      if (this.isIptSearch) {
        this.colKeyWord = this.cloneColKeyWord
        return
      }

      if (!this.iniFilterList.length) {
        this.getInitFilter()
        return
      }

      this.colKeyWord = ''
      this.checkedList = JSON.parse(JSON.stringify(this.cloneCheckedList))
      if (this.cloneCheckedList.length === this.iniFilterList.length) {
        this.checkedAll = true
      } else {
        this.checkedAll = false
      }
    }
  },
  mounted() {
    this.agTable.customFilterComs.push(this)
    this.debounceSearch = debounce(this.localSearch, 100, false)
  },
  methods: {
    // 重置数据
    resetData() {
      this.$emit('update-filteractive', { key: 'filterActive', status: false })

      // 单选
      this.curSingleSelectVal = ''
      if (this.isSingleSelect) return

      // 远程模糊搜索
      this.colKeyWord = ''
      this.cloneColKeyWord = ''
      if (this.isIptSearch) return

      // 多选
      this.checkedAll = true
      this.displayColFilterList = JSON.parse(JSON.stringify(this.iniFilterList))
      this.checkedList = this.displayColFilterList.map(val => val.value)
    },
    // 获取过滤列的数据
    getInitFilter() {
      if (this.iniFilterList.length) return
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
        this.checkedList = this.displayColFilterList.map(val => val.value)
        this.cloneCheckedList = JSON.parse(JSON.stringify(this.checkedList))
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
      if (this.checkedList.length === this.displayColFilterList.length) {
        this.checkedAll = true
        return
      }
      this.checkedAll = false
    },
    // 过滤 传参
    confirmFilter() {
      this.cloneColKeyWord = this.colKeyWord
      if (this.isIptSearch) {
        this.agTable.getList({
          [this.field]: this.colKeyWord
        })
        this.$emit('update-filtervisible', { key: 'isFilterVisible', status: false })
        this.$emit('update-filteractive', { key: 'filterActive', status: true })
        return
      }

      // 如果存在过滤，则需要排已经过滤的id
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
.mt-10 {
  margin-top: 10px;
}
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
