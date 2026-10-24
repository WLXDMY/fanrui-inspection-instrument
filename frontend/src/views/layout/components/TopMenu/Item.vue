
<template>
  <div v-if="!item.hidden" class="top-menu-item">
    <template v-if="hasOneShowingChild(item.children, item)">
      <app-link :to="resolvePath(item.path)">
        <el-menu-item
          :index="resolvePath(item.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          class="horizontal-item"
        >
          <SubItem
            :title="item.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
      class="horizontal-submenu"
    >
      <template slot="title">
        <SubItem
          v-if="item.meta"
          :title="item.meta.title"
        />
      </template>
      <Item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="horizontal-nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import SubItem from './SubItem'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'Item',
  components: { SubItem, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      if (!children || !children.length) {
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang='scss' scoped>
/* li.el-submenu.is-active.is-opened .el-submenu__title {
  border-left: 6px solid #0077ff;
} */
/* 当鼠标悬浮时候，有边框，会覆盖该边框 ,所以使用下面处理*/
.horizontal-item {
  display: inline-block;
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  &.is-active {
    background: #1e2026 !important;
    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #458ef7;
    }
  }
}
::v-deep .horizontal-submenu {
  display: inline-block;
  &.el-submenu {
    &.is-active {
      position: relative;
      .el-submenu__title {
        background: #1e2026 !important;
        &::before {
          display: block;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #458ef7;
        }
      }
    }
  }
}
.horizontal-nest-menu {
  .horizontal-item {
    &.is-active {
      background: #0077ff !important;
      &::before {
        display: none;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #458ef7;
      }
    }
  }
}

.horizontal-nest-menu .horizontal-item{
  display: block;
}
::v-deep i.el-submenu__icon-arrow.el-icon-arrow-down {
  right: 5px !important;
  color: #fff;
  margin-top: -5px;
}
::v-deep li.el-submenu.is-active.is-opened .el-submenu__title {
  position: relative;
  // background: #1d2029 !important;
  // .leftBorder {
  //   position: absolute;
  //   background: #0077ff;
  //   left: 0;
  //   height: 46px;
  //   width: 6px;
  // }
}
::v-deep li.el-submenu.is-active.is-opened .nest-menu .el-submenu__title {
  .leftBorder {
    opacity: 0;
  }
}

// 第二级激活时icon
::v-deep
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu.is-active.is-opened
  .el-submenu__title {
  i.el-submenu__icon-arrow.el-icon-arrow-down {
    right: 5px !important;
    color: #fff;
    margin-top: -5px;
  }
}

// 第三级icon颜色消除
::v-deep
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu
  .el-submenu__title {
  i.el-submenu__icon-arrow.el-icon-arrow-down {
    right: 5px !important;
    color: #fff;
    margin-top: -5px;
  }
}

::v-deep
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu.is-active.is-opened
  .el-submenu__title {
  i.el-submenu__icon-arrow.el-icon-arrow-down {
    right: 5px !important;
    color: #fff;
    margin-top: -5px;
  }
}

// 第二级文字颜色
::v-deep .nest-menu li.el-submenu.is-active.is-opened .el-submenu__title {
  span {
    color: #0077ff;
  }
}
// 第二级文字颜色
::v-deep .nest-menu li.el-submenu.is-opened .el-submenu__title {
  span {
    color: #fff;
  }
}

// 第三层标题
::v-deep
  .nest-menu
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu.is-active.is-opened
  .el-submenu__title {
  span {
    color: #0077ff;
  }
}

// 第三层标题
::v-deep
  .nest-menu
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu
  .el-submenu__title {
  span {
    color: #fff;
  }
}
// 第四层 暂时最多到第四层
::v-deep
  .nest-menu
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu.is-active.is-opened
  .el-submenu__title {
  span {
    color: #0077ff;
  }
}

::v-deep
  .nest-menu
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu.is-active.is-opened
  .nest-menu
  li.el-submenu.is-active.is-opened
  .el-submenu__title {
  span {
    color: #fff;
  }
}

::v-deep .horizontal-submenu  .el-submenu__title {
  height: 50px;
  line-height: 50px;
}
.top-menu-item {
  float: left;
  &.horizontal-nest-menu {
    display: block;
    float: none;
  }
}
.el-menu--horizontal {
  .el-menu--popup-bottom-start {
    margin-top: 0;
    &.el-menu--popup {
      padding: 0;
    }
  }
}
</style>
