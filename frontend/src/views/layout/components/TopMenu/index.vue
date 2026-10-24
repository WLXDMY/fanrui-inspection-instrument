<template>
  <el-menu
    class="topMenu"
    :default-active="activeMenu"
    :background-color="'#2b2c31'"
    :text-color="'#fff'"
    :unique-opened="true"
    :active-text-color="'#fff'"
    mode="horizontal"
  >
    <item v-for="route in subMenu" :key="route.path" :item="route" :base-path="route.path" />
  </el-menu>
</template>

<script>
import Topswitch from '@/utils/evenbus.js'
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import Item from './Item.vue'
export default {
  components: { Item },
  data() {
    return {
      subMenu: []
    }
  },
  computed: {
    ...mapGetters(['permission_routes']),
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
    variables() {
      return variables
    }
  },
  mounted() {
    const redirectedFrom = this.$route.redirectedFrom && this.$route.redirectedFrom.substring(this.$route.redirectedFrom.length - 1, this.$route.redirectedFrom) === '/' ? this.$route.redirectedFrom.substring(0, this.$route.redirectedFrom.length - 1) : this.$route.redirectedFrom
    const path = redirectedFrom || this.$route.path
    this.filterSubMenu(path)
  },
  methods: {
    filterSubMenu(path) {
      const allMenu = this.permission_routes
      console.log(path, '----')
      allMenu.map(item => {
        if (path === item.path) {
          this.subMenu = item.children
        } else {
          item.children.map(el => {
            if (path === el.path) {
              if (el.children && el.children.length > 0) {
                this.subMenu = el.children
              } else {
                this.subMenu = item.children
              }
            } else {
              if (el.children) {
                el.children.map(tem => {
                  if (path === tem.path) {
                    this.subMenu = el.children
                  }
                })
              }
            }
          })
        }
      })
    }
  }
}

</script>

<style lang="scss">
.topMenu {
  float: left;
  &.el-menu.el-menu--horizontal {
    border-bottom: none ;
  }
}
</style>
