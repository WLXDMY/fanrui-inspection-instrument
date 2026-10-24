<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-31 16:27:47
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-04-11 12:04:25
 * @Description:
-->
<template>
  <div id="systemmanagement" class="subApp">
    <router-view />
  </div>
</template>

<script>
import { getWhiteCardDetail } from '@/api/base'
import { initGlobalState } from 'qiankun'
const actions = initGlobalState({ name: '' })
export default {
  name: 'App',
  created() {
    if (window.sessionStorage.getItem('systemmanagementVuex')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(window.sessionStorage.getItem('systemmanagementVuex'))
        )
      )
      window.sessionStorage.removeItem('systemmanagementVuex')
    }
    this.getWhiteCardDetail()
    this.$nextTick(() => {
      document.oncontextmenu = function() {
        return true
      }
    })
  },
  mounted() {
    actions.onGlobalStateChange(async(state, prev) => {
      if (state.name === '/login') {
        await this.$store.dispatch('user/logout')
        this.$store.commit('permission/FRONT_ROUTES', [])
        this.$parentProps.setGlobalState({ name: 'login' })
      }
    })
  },
  methods: {
    // 获取logo和标题
    getWhiteCardDetail() {
      getWhiteCardDetail().then(res => {
        if (res.data.code === '200') {
          const { data } = res.data
          localStorage.setItem('whiteCard', JSON.stringify(data))
          const iconLink = document.querySelector('link[rel="icon"]')

          const baseUrl =
            process.env.NODE_ENV === 'development'
              ? process.env.VUE_APP_BASE_API + '/'
              : location?.origin + '/'

          iconLink.href = data?.backstageLogoUrl
            ? baseUrl + data?.backstageLogoUrl
            : require('./assets/images/home/dfs_logo.png')

          document.title = data?.backstageName || '' // 后台名称
        }
      })
    }
  }
}
</script>

<style lang="scss">
.el-notification__content {
  word-break: break-all;
}
.xiaoshou .is-error .el-input__inner {
  color: red !important;
  border-color: red !important;
  background-color: #ffffff !important;
}
.xiaoshou .is-error .el-input.is-disabled .el-input__inner {
  color: red !important;
  border-color: red !important;
  background-color: #ffffff !important;
}
.subApp {
  height: 100vh !important;
}
::-webkit-scrollbar {
  // width: 8px;
  background-color: #f1f1f1;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 0px;
  background-color: #f1f1f1;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 0px;
  background-color: #c1c1c1;
}
</style>
