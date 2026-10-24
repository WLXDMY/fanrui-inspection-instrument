<!--
 * @Author: your name
 * @Date: 2020-12-01 11:33:20
 * @LastEditTime: 2023-03-27 09:41:06
 * @LastEditors: shunhua.liang 54874615+skyz-lsh@users.noreply.github.com
 * @Description: In User Settings Edit
 * @FilePath: \34-智能工厂项目\后台\master\src\layout\components\Sidebar\Logo.vue
-->
<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse && showFlag"
        key="collapse"
        class="sidebar-logo-link"
        :to="toPath"
      >
        <img v-if="logo" :src="`${baseUrl}/${logo}`" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link
        v-show="showFlag"
        v-else
        key="expand"
        class="sidebar-logo-link"
        :to="toPath"
      >
        <img v-if="logo" :src="`${baseUrl}/${logo}`" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  // 后台管理部分
  data() {
    return {
      title: '',
      logo: require('../../../../assets/images/home/dfs_logo.png'),
      toPath: '',
      showFlag: true,
      baseUrl: process.env.VUE_APP_NGINX_PATH || '' // 获取本机ip地址
    }
  },
  computed: {
    ...mapGetters(['front_routes'])
  },
  watch: {
    front_routes(val) {
      this.updateRoute()
    }
  },
  created() {
    this.getWhiteCardDetail()
    this.updateRoute()
  },
  methods: {
    updateRoute() {
      this.toPath = this.front_routes[0]?.path
    },
    // 获取logo和标题
    getWhiteCardDetail() {
      const data = JSON.parse(localStorage.getItem('whiteCard'))
      if (data?.configure) {
        this.showFlag = true
      } else {
        this.showFlag = false
      }
      this.title = data?.backstageName || ''
      this.logo =
        data?.backstageLogoUrl ||
        require('../../../../assets/images/home/dfs_logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 22px;
  background: #292c33;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 28px;
      width: 28px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      vertical-align: middle;
      width: 96px;
      font-size: 16px;
      font-family: SourceHanSansCN-Bold;
      color: #ffffff;
      opacity: 1;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
