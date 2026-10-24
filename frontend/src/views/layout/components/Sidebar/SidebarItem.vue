
<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item)">
      <app-link :to="resolvePath(item.path)">
        <el-menu-item
          :index="resolvePath(item.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="item.meta.icon || (item.meta && item.meta.icon)"
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
    >
      <template slot="title">
        <div class="leftBorder" />
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
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

::v-deep i.el-submenu__icon-arrow.el-icon-arrow-down {
  color: #fff;
}
::v-deep li.el-submenu.is-active.is-opened .el-submenu__title {
  position: relative;
  background: #1d2029 !important;
  .leftBorder {
    position: absolute;
    background: #0077ff;
    left: 0;
    height: 46px;
    width: 6px;
  }
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
    color: #0077ff;
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
    color: #fff;
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
    color: #0077ff;
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
</style>
