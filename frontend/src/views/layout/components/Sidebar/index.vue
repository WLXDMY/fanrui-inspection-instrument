<!--
 * @Author: your name
 * @Date: 2020-12-02 15:10:36
 * @LastEditTime: 2023-02-27 21:16:08
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @Description: In User Settings Edit
 * @FilePath: \36.svn喜哥代码库-智慧工厂\master\src\layout\components\Sidebar\index.vue
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <Search v-if="!isCollapse" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Topswitch from '@/utils/evenbus.js'
import { mapGetters } from 'vuex'
import Logo from './Logo'
import Search from './Search'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo, Search },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      if (
        path === '/display-plan/index' ||
        path === '/display-line-status/index' ||
        path === '/display-production-line/index' ||
        path === '/display-monitor/index' ||
        path === '/device-line/index' ||
        path === '/device-monitor/index' ||
        path === '/line-technology/index' ||
        path === '/line-process/index'
      ) {
        // 切换为黑色顶部
        Topswitch.$emit('demo', 'dark')
      } else {
        // 切换为白色顶部
        Topswitch.$emit('demo', 'white')
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped>
::v-deep .el-scrollbar__view {
  width: 210px;
}
</style>
