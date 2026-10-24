<template>
  <div ref="search" class="module-search">
    <el-input
      ref="ipt"
      v-model="moduleName"
      class="search-input"
      size="small"
      suffix-icon="el-icon-search"
      placeholder="请输入模块的全称"
      @input="searchName"
      @focus="iptFocus"
      @keydown.down.native="navigateOptions('next')"
      @keydown.up.native="navigateOptions('prev')"
      @keyup.enter.native="searchValue"
    />
    <div v-show="isShowSelect" ref="select" class="select">
      <div
        v-for="(item, index) in searchnameArr"
        :key="index"
        ref="selectItem"
        :class="[
          'selecttext',
          'level',
          'centre3',
          hoverIndex === index ? 'hover' : ''
        ]"
        @click="select(item)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarSearch',
  props: {},
  data() {
    return {
      searchnameArr: [],
      moduleName: '',
      isShowSelect: false,
      hoverIndex: -1
    }
  },
  mounted() {
    window.addEventListener('keydown', this.focusIpt)
    window.addEventListener('click', this.hideSelect)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.focusIpt)
    window.removeEventListener('click', this.hideSelect)
  },
  methods: {
    hideSelect(event) {
      const target = event.target
      const search = this.$refs.search
      if (!search.contains(target)) {
        this.isShowSelect = false
      }
    },
    iptFocus() {
      this.isShowSelect = true
    },
    searchName(keyword) {
      this.hoverIndex = -1
      if (!keyword) {
        this.searchnameArr = []
        return
      }
      this.isShowSelect = true
      const moduleList = this.$store.getters.permission_routes
      const isExistNameArr = (list, parentTitle) => {
        return list.reduce((nameArr, item) => {
          if (item.children && item.children.length) {
            const childNameArr = isExistNameArr(item.children, item?.meta?.title)
            if (childNameArr && childNameArr.length) {
              nameArr = nameArr.concat(childNameArr)
            }
          } else {
            const title = item?.meta?.title || ''
            if (title.indexOf(keyword) !== -1 && !item.hidden) {
              nameArr.push({
                title: `${parentTitle}-${title}`,
                path: item.path
              })
            }
          }
          return nameArr
        }, [])
      }
      this.searchnameArr = isExistNameArr(moduleList)
      this.hoverIndex = 0
    },
    searchValue() {
      if (this.searchnameArr && this.searchnameArr.length) {
        const item = this.searchnameArr[this.hoverIndex]
        this.select(item)
      } else {
        this.$message.warning('未找到该模块，请重新输入')
      }
    },
    navigateOptions(direction) {
      if (!this.isShowSelect || this.searchnameArr.length === 0) {
        return
      }
      if (direction === 'next') {
        this.hoverIndex++
        if (this.hoverIndex === this.searchnameArr.length) {
          this.hoverIndex = 0
        }
      } else if (direction === 'prev') {
        this.hoverIndex--
        if (this.hoverIndex < 0) {
          this.hoverIndex = this.searchnameArr.length - 1
        }
      }
      this.$nextTick(() => {
        this.scrollIntoView(this.$refs.select, this.$refs.selectItem[this.hoverIndex])
      })
    },
    select(item) {
      const currentRoutePath = this.$router.currentRoute?.path
      if (currentRoutePath === item.path) {
        return
      }
      this.moduleName = item.title
      this.searchnameArr = [item]
      this.hoverIndex = 0
      this.$router.push(item.path).then(() => {
        this.isShowSelect = false
      })
    },
    focusIpt(e) {
      const ctrlKey = e.ctrlKey
      const keyCode = e.keyCode
      if (keyCode === 66 && ctrlKey && !this.isShowSelect) {
        this.$refs.ipt.focus()
      }
    },
    scrollIntoView(container, selected) {
      if (!selected) {
        container.scrollTop = 0
        return
      }

      const offsetParents = []
      let pointer = selected.offsetParent
      while (pointer && container !== pointer && container.contains(pointer)) {
        offsetParents.push(pointer)
        pointer = pointer.offsetParent
      }
      const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0)
      const bottom = top + selected.offsetHeight
      const viewRectTop = container.scrollTop
      const viewRectBottom = viewRectTop + container.clientHeight

      if (top < viewRectTop) {
        container.scrollTop = top
      } else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.module-search {
  position: relative;
  $search-color: rgba(146, 152, 176, 0.5);
  padding: 10px;
  text-align: center;
  .select {
    position: absolute;
    top: 52px;
    width: 190px;
    background-color: #ffffff;
    border-radius: 4px;
    z-index: 9999;
    max-height: 50vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
    .selecttext {
      line-height: 36px;
      padding: 0 20px;
      margin: 0;
      border-radius: 4px;
      font-size: 14px;
      color: #525457;
      cursor: pointer;
      outline: none;
      &.hover, &:hover {
        background-color: #ecf5ff;
        color: #66b1ff;
      }
    }
  }
  ::v-deep .search-input {
    .el-input__inner {
      border-radius: 4px;
      padding-right: 20px;
      border: 1px solid $search-color;
      background: #292c33;
      color: #fff;
      &::-webkit-input-placeholder {
        color: $search-color;
      }
    }
    .el-input__suffix i {
      color: $search-color;
    }
  }
}
</style>
