<template>
  <el-dropdown class="top-main-dropdown">
    <div class="top-main-menu"><img src="@/assets/images/icon/top-main-menu.png">{{ currentMenu && currentMenu.meta && currentMenu.meta.title }}</div>
    <el-dropdown-menu>
      <el-dropdown-item v-for="(item, i) in mainMenu" :key="i" @click.native="changeMainMenu(item)">{{ item && item.meta && item.meta.title }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import pathToRegexp from 'path-to-regexp'
export default {
  data() {
    return {
      currentMenu: {},
      mainMenu: []
    }
  },
  computed: {
    ...mapGetters(['permission_routes'])
  },
  mounted() {
    this.filterCurrentMenu()
    this.filterMainMenu()
  },
  methods: {
    filterCurrentMenu() {
      const allMenu = this.permission_routes
      const redirectedFrom = this.$route.redirectedFrom && this.$route.redirectedFrom.substring(this.$route.redirectedFrom.length - 1, this.$route.redirectedFrom) === '/' ? this.$route.redirectedFrom.substring(0, this.$route.redirectedFrom.length - 1) : this.$route.redirectedFrom
      const path = redirectedFrom || this.$route.path
      allMenu.map(item => {
        if (path === item.path) {
          this.currentMenu = item
        } else {
          item.children.map(el => {
            if (path === el.path) {
              if (el.children && el.children.length > 0) {
                this.currentMenu = el
              } else {
                this.currentMenu = item
              }
            } else {
              if (el.children) {
                el.children.map(ele => {
                  if (path === ele.path) {
                    if (ele.children && ele.children.length > 0) {
                      this.currentMenu = ele
                    } else {
                      this.currentMenu = el
                    }
                  }
                })
              }
            }
          })
        }
      })
    },
    filterMainMenu() {
      const allMenu = this.permission_routes
      const redirectedFrom = this.$route.redirectedFrom && this.$route.redirectedFrom.substring(this.$route.redirectedFrom.length - 1, this.$route.redirectedFrom) === '/' ? this.$route.redirectedFrom.substring(0, this.$route.redirectedFrom.length - 1) : this.$route.redirectedFrom
      const path = redirectedFrom || this.$route.path
      allMenu.map(item => {
        if (path === item.path) {
          this.mainMenu = allMenu
        } else {
          if (item.children) {
            item.children.map(el => {
              if (path === el.path) {
                this.mainMenu = item.children
              } else {
                if (el.children) {
                  el.children.map(tem => {
                    if (path === tem.path) {
                      this.mainMenu = el.children
                    }
                  })
                }
              }
            })
          }
        }
      })
      this.mainMenu = this.mainMenu.filter(item => !item.hidden)
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    // 判断是否为第一个菜单重定向
    isFirstRedirectRoute(clickPath) {
      const levelList = this.permission_routes.map(item => ({
        path: item.path,
        redirect: item.redirect
      }))
      let isFirstRedirectRoute = true
      for (let index = levelList.length - 2; index >= 0; index--) {
        const curItem = levelList[index]
        const preItem = levelList[index + 1]
        if (preItem?.path !== curItem?.redirect) {
          isFirstRedirectRoute = false
          break
        }
      }
      return isFirstRedirectRoute
    },
    changeMainMenu(item) {
      const isFirstRedirectRoute = this.isFirstRedirectRoute(item.path)
      if (isFirstRedirectRoute) {
        return
      }
      const { redirect, path } = item
      this.currentMenu = item
      console.log(item)
      this.$emit('change', item)
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss">
.top-main-dropdown {
  float: left;
  margin-right: 30px;
  background: #1e2026;
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #458ef7;
  }
  img {
    width: 24px;
    height: 24px;
    position: relative;
    top: 7px;
    margin-right: 4px;
  }
}
.top-main-menu {
  float: left;
  color: #fff;
  line-height: 50px;
  font-size: 14px;
  padding: 0 15px;
}
</style>
