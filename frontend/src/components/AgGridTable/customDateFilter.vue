<!--
 * @Author: zhaozhuo
 * @Date: 2021-11-26 10:43:43
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-09-05 10:55:35
 * @Description:
-->
<template>
  <div class="custom-datefilterbox">
    <el-input v-model="colKeyWord" size="mini" placeholder="查询..." @keyup.enter.native="confirmFilter" />

    <div v-loading="isLoading" class="datecheck-box">
      <el-checkbox v-if="isShowCheckall" :value="checkedAll" class="checkbox-item" @change="changeAll">
        全选
      </el-checkbox>
      <el-checkbox v-if="isShowCheckall" :value="checkedEmpty" class="checkbox-item" @change="changeEmpty">
        空值
      </el-checkbox>
      <el-tree
        ref="tree"
        class="date-tree"
        :data="displayColFilterList"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @check-change="checkChange"
      />
    </div>

    <div class="footer-box">
      <el-button class="btn-cancel" size="mini" @click="confirmFilter"> 确定 </el-button>
    </div>
  </div>
</template>

<script>
// import mockData from './mockData.json'

export default {
  name: 'CustomDateFilter',
  inject: ['agTable'],
  props: {
    field: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // isFisrt: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      colKeyWord: '',
      checkedAll: true,
      checkedEmpty: true,
      displayColFilterList: [],
      isLoading: false,

      allFilterDataId: [], // 树形所有子项的id
      filterSelectedId: [], // 树形过滤之后的所有子项的id
      cloneSelectedId: [], // 树形已选的id备份
      cloneCheckEmpty: true // 空值备份
    }
  },
  computed: {
    isShowCheckall() {
      if ((!this.colKeyWord && this.displayColFilterList.length) || (this.colKeyWord && this.filterSelectedId.length)) {
        return true
      }
      return false
    }
  },
  watch: {
    colKeyWord(keyword) {
      this.$refs.tree.filter(keyword)
      if (!keyword) {
        this.filterSelectedId = []
        return
      }
      this.filterSelectedId = this.getFilterIds(this.displayColFilterList, keyword)
    },
    isActive(status) {
      // 恢复数据
      if (!status) return
      this.getInitFilter()
      this.colKeyWord = ''
      this.checkedEmpty = this.cloneCheckEmpty
    }
  },
  mounted() {
    this.agTable.customFilterComs.push(this)
  },
  methods: {
    // 重置数据
    resetData() {
      // this.isFisrt = true
      this.colKeyWord = ''
      this.checkedAll = true
      this.checkedEmpty = true
      this.cloneCheckEmpty = true
      this.displayColFilterList = []

      this.allFilterDataId = []
      this.filterSelectedId = []
      this.cloneSelectedId = []

      this.$refs.tree?.setCheckedKeys([])
      this.$emit('update-filteractive', { key: 'filterActive', status: false })
    },
    // 处理为树形数组
    dealTreeData(data, year = '', month = '') {
      return data.map(item => {
        if (typeof item === 'string') {
          return {
            id: `${year}-${month}-${item}`,
            label: item
          }
        } else {
          const nItem = {}
          const itemVals = Object.values(item)
          itemVals.forEach(val => {
            const isArr = Array.isArray(val)
            if (!isArr) {
              nItem.id = val
              nItem.label = val
            } else {
              const y = year || item.year
              nItem.children = this.dealTreeData(val, y, itemVals[0])
            }
          })
          return nItem
        }
      })
    },
    // 初始化数据
    getInitFilter() {
      const filterCols = this.agTable.filterCols
      const curCol = filterCols.find(col => col.field === this.field && col.filterDataRequest)

      // 获取树形所有id
      const allFilterDataId = data => {
        return data.reduce((arr, node) => {
          if (node.children && node.children.length) {
            const childrenIds = allFilterDataId(node.children)
            arr = arr.concat(childrenIds)
          } else {
            arr.push(node.id)
          }
          return arr
        }, [])
      }

      this.isLoading = true
      curCol.filterDataRequest(curCol.filterParams).then(filerData => {
        const dealedFilterData = this.dealTreeData(filerData)

        this.defaultProps = {
          children: curCol.childrenKey,
          label: curCol.labelKey
        }

        this.displayColFilterList = dealedFilterData
        this.allFilterDataId = allFilterDataId(dealedFilterData)
        if (this.cloneSelectedId.length) {
          // 获取已选的id
          const allSelectedId = this.cloneSelectedId.filter(id => this.allFilterDataId.includes(id))
          if (this.cloneCheckEmpty && this.isEqualLength(allSelectedId, this.allFilterDataId)) {
            this.checkedAll = true
          } else {
            this.checkedAll = false
            this.$refs.tree.setCheckedKeys(allSelectedId)
            this.checkedEmpty = this.cloneCheckEmpty
          }
          this.cloneSelectedId = JSON.parse(JSON.stringify(allSelectedId))
        } else {
          this.$refs.tree.setCheckedKeys(this.allFilterDataId)
          this.checkedAll = true
          this.cloneSelectedId = JSON.parse(JSON.stringify(this.allFilterDataId))
          // this.isFisrt = false
        }
        this.isLoading = false
      })
    },
    // 递归过滤符合条件的已选的所有子项
    getFilterIds(data, keyword) {
      const getChildrenIds = data => {
        return data.reduce((arr, node) => {
          if (node.children && node.children.length) {
            arr = arr.concat(getChildrenIds(node.children))
          } else {
            arr.push(node.id)
          }
          return arr
        }, [])
      }
      return data.reduce((ids, node) => {
        if (node.label.indexOf(keyword) !== -1) {
          if (node.children && node.children.length) {
            const childIds = getChildrenIds(node.children)
            ids = ids.concat(childIds)
          } else {
            ids.push(node.id)
          }
          return ids
        }
        if (node.children && node.children.length) {
          const childIds = this.getFilterIds(node.children, keyword)
          if (childIds && childIds.length) {
            ids = ids.concat(childIds)
          }
        }
        return ids
      }, [])
    },
    // 本地过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 全选发生变化
    changeAll(isCheck) {
      this.checkedAll = isCheck
      if (isCheck) {
        this.checkedEmpty = true
        this.$refs.tree.setCheckedKeys(this.allFilterDataId)
        return
      }
      this.checkedEmpty = false
      this.$refs.tree.setCheckedKeys([])
    },
    // 空值发生变化
    changeEmpty(isCheck) {
      this.checkedEmpty = isCheck
      const curSelected = this.$refs.tree.getCheckedKeys(true)
      if (isCheck && this.isEqualLength(curSelected, this.allFilterDataId)) {
        this.checkedAll = true
        return
      }
      this.checkedAll = false
    },
    // 树选中发生变化
    checkChange(data, checked, indeterminate) {
      const curSelected = this.$refs.tree.getCheckedKeys(true)
      if (this.isEqualLength(curSelected, this.allFilterDataId) && this.checkedEmpty) {
        this.checkedAll = true
        return
      }
      this.checkedAll = false
    },
    // 传值查询
    confirmFilter() {
      let curSelectedIds = this.$refs.tree.getCheckedKeys(true)
      // 如果存在过滤操作，则需要排除已经过滤的id
      if (this.colKeyWord) {
        curSelectedIds = curSelectedIds.filter(id => this.filterSelectedId.includes(id))
      }
      this.cloneSelectedId = JSON.parse(JSON.stringify(curSelectedIds))
      this.cloneCheckEmpty = this.checkedEmpty

      if (this.isShowCheckall && this.checkedEmpty) {
        curSelectedIds.push('null')
      }
      if (!curSelectedIds.length) {
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

      this.agTable.getList({
        [this.field]: curSelectedIds.join(',')
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
.custom-datefilterbox {
  padding: 0 5px;
  .datecheck-box {
    max-height: 220px;
    overflow-y: auto;
    margin: 10px 0;
    .checkbox-item {
      display: block;
      padding-left: 12px;
    }
    ::v-deep .el-tree-node__content > .el-tree-node__expand-icon {
      padding: 0 !important;
    }
    ::v-deep .el-tree-node__content > .expanded.el-tree-node__expand-icon {
      padding: 0 !important;
      padding-top: 6px !important;
    }
    .date-tree {
      ::v-deep .is-checked {
        color: #409eff;
      }
    }
  }
  .footer-box {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
