<!--
 * @Author: zhaozhuo
 * @Date: 2021-11-23 15:03:00
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-23 19:30:47
 * @Description:
-->
<template>
  <div class="custom-header-box">
    <div class="left-box">
      <span>{{ params.displayName }}</span>
      <el-button
        v-if="field === agTable.uniqueExpandId"
        class="expand"
        size="mini"
        @click="expandRow"
      >
        {{ isExpand ? "全部折叠" : "全部展开" }}
      </el-button>
      <span
        v-if="isShowSort"
        :class="['ml-5', 'hide-box', sortStatus ? 'fixed-box' : '']"
      >
        <i
          class="asc"
          :style="sortStatus === 'asc' ? 'border-bottom: 5px solid #1890FF;' : ''"
          @click="sortRequested('asc')"
        />
        <i
          class="desc"
          :style="sortStatus === 'desc' ? 'border-top: 5px solid #1890FF;' : ''"
          @click="sortRequested('desc')"
        />
      </span>
    </div>
    <div class="right-box">
      <el-popover
        v-model="isFilterVisible"
        width="250"
        :popper-class="filterType == 'CustomSingselectFilter' ? 'single-popper' : ''"
        @show="popShow('isMenuVisible')"
      >
        <template>
          <component
            :is="filterType"
            :is-active="isFilterVisible"
            :field="field"
            @update-filtervisible="updateFilterStatus"
            @update-filteractive="updateFilterStatus"
          />
        </template>
        <span v-if="isShowFilter" slot="reference" :class="['ml-5', 'hide-box', (isFilterVisible || filterActive) ? 'fixed-box filteractive-color' : 'filterInactive-color']" @click.stop>
          <svg-icon icon-class="filter" style="font-size: 16px;" />
        </span>
      </el-popover>

      <el-popover
        ref="popMenu"
        v-model="isMenuVisible"
        popper-class="menu-popper"
        placement="bottom"
        @show="popShow('isFilterVisible')"
      >
        <CustomMenu :is-active="isMenuVisible" :field="field" @update-menuvisible="updateFilterStatus" />
        <span slot="reference" :class="['ml-5', 'el-icon-menu', 'hide-box', isMenuVisible ? 'fixed-box' : '']" style="font-size: 16px; color: #919191;" @click.stop />
      </el-popover>
    </div>
  </div>
</template>
<script>
import CustomFuzzyFilter from './customFuzzyFilter'
import CustomSingselectFilter from './customSingselectFilter'
import CustomMultiSelectFilter from './customMultiSelectFilter'
import CustomDateFilter from './customDateFilter'
import CustomNumFilter from './customNumFilter'
import CustomMenu from './customMenu'

export default {
  inject: ['agTable'],
  components: {
    CustomFuzzyFilter,
    CustomSingselectFilter,
    CustomMultiSelectFilter,
    CustomDateFilter,
    CustomNumFilter,
    CustomMenu
  },
  data: function() {
    return {
      sortStatus: '',
      isExpand: false,
      isFilterVisible: false,
      isMenuVisible: false,
      filterActive: false // 是否存在过滤
    }
  },
  computed: {
    field() {
      return this.params.column.colDef.field
    },
    isShowSort() {
      const sortCols = this.agTable.sortCols
      // eslint-disable-next-line eqeqeq
      return sortCols.some((sortCol) => sortCol.field == this.field)
    },
    isShowFilter() {
      const filterCols = this.agTable.filterCols
      // eslint-disable-next-line eqeqeq
      return filterCols.some((filterCol) => filterCol.field == this.field)
    },
    filterType() {
      const filterCols = this.agTable.filterCols
      // eslint-disable-next-line eqeqeq
      const filterCol = filterCols.find((filterCol) => filterCol.field == this.field)
      return filterCol && filterCol.filter
    },
    allGridCols() {
      return this.params.columnApi.getAllGridColumns()
    }
  },
  mounted() {
    this.agTable.customHeaders.push(this)

    this.agBodydom = document.querySelector('.ag-body-horizontal-scroll-viewport')
    this.agBodydom.addEventListener('scroll', this.hidePop)
  },
  beforeDestroy() {
    this.agBodydom.removeEventListener('scroll', this.hidePop)
  },
  methods: {
    hidePop() {
      this.isFilterVisible = false
      this.isMenuVisible = false
    },
    // 重置数据
    resetData() {
      this.sortStatus = ''
    },
    // 打开列菜单
    onMenuClicked() {
      this.params.showColumnMenu(this.$refs.menuButton)
    },
    // 展开/折叠行
    expandRow() {
      this.isExpand ? this.params.api.collapseAll() : this.params.api.expandAll()
      this.isExpand = !this.isExpand
    },
    // 设置排序参数
    setColDefs(sortChange) {
      const sortCols = this.agTable.sortCols
      const sortParams = []

      this.allGridCols.forEach((gridCol) => {
        const sortCol = sortCols.find((col) => col.field === gridCol.colDef.field)
        if (sortCol) {
          const nSortCol = JSON.parse(JSON.stringify(sortCol))
          if (this.field === sortCol.field) {
            nSortCol.sortDef = sortChange
            nSortCol.sortIndex = sortParams.length

            sortCol.sortDef = sortChange
            sortCol.sortIndex = sortParams.length
          }
          sortParams.push(nSortCol)
        }
      })
      return sortParams
    },
    // 请求排序数据
    sortRequested(sortChange) {
      const sortParams = this.setColDefs(sortChange)

      const dealSortParams = sortParams.reduce((paramsString, col) => {
        paramsString += `,${col.field}${col.sortDef ? '_' : ''}${col.sortDef}`
        return paramsString
      }, '')

      this.agTable.getList({ keys: dealSortParams.slice(1) })
      this.sortStatus = sortChange
    },
    // 更改气泡状态 过滤列状态
    updateFilterStatus({ key, status }) {
      this[key] = status
    },
    // 关闭其他窗口，仅保留当前项
    popShow(curClosePopKey) {
      this.agTable.customHeaders.forEach((customHeader) => {
        if (customHeader.field !== this.field) {
          customHeader.isFilterVisible = false
          customHeader.isMenuVisible = false
        } else {
          customHeader[curClosePopKey] = false
        }
      })
    }
  }
}
</script>

<style>
.single-popper {
  width: 196px !important;
  padding: 0 !important;
}
.menu-popper {
  padding: 0 !important;
}
</style>
<style lang="scss" scoped>
.ml-5 {
  margin-left: 5px;
}
.custom-header-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  &:hover .hide-box {
    visibility: visible;
  }
  .left-box {
    display: flex;
    align-items: center;
    .asc {
      display: block;
      width: 5px;
      height: 5px;
      border-top: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #919191;
      border-left: 5px solid transparent;
      margin-bottom: 3px;
    }
    .desc {
      display: block;
      width: 5px;
      height: 5px;
      border-top: 5px solid #919191;
      border-right: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 5px solid transparent;
    }
    .expand {
      padding: 2px 5px !important;
      margin-left: 5px !important;
    }
  }
  .right-box {
    .filteractive-color {
      color: #1890ff;
    }
    .filterInactive-color {
      color: #919191;
    }
  }
  .hide-box {
    visibility: hidden;
  }
  .fixed-box {
    visibility: visible;
  }

}

</style>
