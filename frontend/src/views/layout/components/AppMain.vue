<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-03-28 09:39:33
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-01-15 15:57:06
 * @FilePath: \dfs\src\views\layout\components\AppMain.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <section :class="!isSubApp ? 'micro-app' : 'app-main'">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
    isSubApp() {
      return window.__POWERED_BY_QIANKUN__
    }
  },
  mounted() {
    this.$nextTick(() => {
      const appMainElements = document.querySelectorAll('.app-main')
      appMainElements.forEach(element => {
        element.style.minHeight = this.isNotAppletENV
          ? 'calc(100vh - 50px)'
          : '100vh'
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // height: 100%;
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .micro-app {
  padding-top: 50px;
  height: 100%;
  &.appNotAppletENV {
    padding-top: 80px;
    .container1-3 {
      height: calc(100vh - 80px);
    }
  }
}
.micro-app {
  height: calc(100vh - 50px);
}
.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
