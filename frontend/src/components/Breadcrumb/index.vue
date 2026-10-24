<!--
 * @Author: your name
 * @Date: 2020-09-14 10:14:30
 * @LastEditTime: 2022-10-27 15:32:46
 * @LastEditors: zhaozhuo
 * @Description: In User Settings Edit
 * @FilePath: \vue-element-admin-master\src\components\Breadcrumb\index.vue
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          style="color: #1890FF"
        >
          {{ item.meta.title }}
        </span>
        <a v-else style="color: #a6aebe" @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      // const first = matched[0]

      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      // }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === '首页'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    // 判断是否为第一个菜单重定向
    isFirstRedirectRoute(clickPath) {
      const levelList = this.levelList.map(item => ({
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
    handleLink(item) {
      const isFirstRedirectRoute = this.isFirstRedirectRoute(item.path)
      if (isFirstRedirectRoute) {
        return
      }
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 16px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    // color: #97a8be;
    color: #a6aebe;
    // color:red;
    cursor: text;
  }
}
.top-breadcrumb {
  font-size: 14px !important;
  line-height: 30px !important;
}
</style>
