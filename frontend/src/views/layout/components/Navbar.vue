<template>
  <div>
    <div class="navbar" :style="{ backgroundColor: isNotAppletENV ? '#FFFFFF' : '#2b2c31' }">
      <hamburger
        v-show="isNotAppletENV"
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb v-show="isNotAppletENV" id="breadcrumb-container" class="breadcrumb-container" />
      <top-main-menu v-if="!isNotAppletENV" @change="mainMenuChange" />
      <top-menu v-if="!isNotAppletENV" ref="topMenu" />
      <div class="right-menu centre2">
        <!-- <button
          v-show="isNotAppletENV"
          class="link-management"
          @click="homeScreen"
        >
          数字运营中心
        </button> -->
        <template v-if="isNotAppletENV">
          <!-- <button class="link-management" @click="goTo">
            <i class="el-icon-s-home" />{{
              currentSystem === 'system' ? '配置中心' : '控制台'
            }}
          </button> -->
          <el-tooltip v-if="haveMSG" class="item" effect="dark" content="告警通知" placement="bottom">
            <div class="iconfontbox" @click.stop="openalarmlist()">
              <el-badge is-dot class="item">
                <i class="el-icon-warning-outline icontop" :style="{ color: black }" />
              </el-badge>
            </div>
          </el-tooltip>
          <el-tooltip v-else class="item" effect="dark" content="告警通知" placement="bottom">
            <div class="iconfontbox" @click.stop="openalarmlist()">
              <i class="el-icon-warning-outline icontop" :style="{ color: black }" />
            </div>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="关闭此次声音" placement="bottom">
            <div class="iconfontbox" @click="clearonece()">
              <i class="el-icon-switch-button icontop" :style="{ color: black }" />
            </div>
          </el-tooltip>
          <el-tooltip v-if="opensound" class="item" effect="dark" content="告警声音-开" placement="bottom">
            <div class="iconfontbox" @click="switchsound()">
              <i class="el-icon-microphone icontop" :style="{ color: black }" />
            </div>
          </el-tooltip>
          <el-tooltip v-else class="item" effect="dark" content="告警声音-关" placement="bottom">
            <div class="iconfontbox" @click="switchsound()">
              <i class="el-icon-turn-off-microphone icontop" :style="{ color: black }" />
            </div>
          </el-tooltip>
        </template>
        <el-dropdown class="hover-effect" trigger="click">
          <el-tooltip class="item" effect="dark" content="个人设置" placement="bottom">
            <div class="iconfontbox" style="margin: 0 20px 0 0">
              <el-image v-if="userimg" class="userimg" :src="`${BASE_URL}/${userimg}`" fit="cover" />
              <i v-else class="el-icon-user-solid icontop" :style="{ color: black }" />
            </div>
          </el-tooltip>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile/index">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <router-link to="/profile/about">
              <el-dropdown-item>关于</el-dropdown-item>
            </router-link>
            <el-dropdown-item v-show="isNotAppletENV" divided @click.native="logout">
              <span style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 折叠面板展开动画 -->
      <el-collapse-transition>
        <div v-show="showalarmlist" ref="showPanel" class="alarmlist">
          <div class="title">
            <div class="title_left">消息列表</div>
          </div>
          <div class="box">
            <div
              v-for="(item, index) in alarmList"
              :key="index"
              :class="{ list: true, plus: item.selected }"
              @click="toCommand(item, index)"
            >
              <div class="list_top">
                <div class="left">[{{ item.alarmTypeName }}]{{ item.gName }}</div>
                <div class="right">{{ item.alarmTime }}</div>
              </div>
              <div class="des">{{ item.alarmDes }}</div>
            </div>
          </div>
          <div class="more">
            <!-- <span @click="$router.push('/alarm/list')">查看全部</span> -->
            <span @click="alertTable">查看全部</span>
          </div>
        </div>
      </el-collapse-transition>
      <audio v-if="soundShow" id="music" class="audioBox" autoplay="autoplay" :src="soundUrl" controls loop />
    </div>
    <breadcrumb v-show="!isNotAppletENV" id="breadcrumb-container" class="breadcrumb-container top-breadcrumb" />
  </div>
</template>

<script>
import Topswitch from '@/utils/evenbus.js'
import { mapGetters, mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import TopMenu from './TopMenu'
import TopMainMenu from './TopMainMenu'
import { listenerFullScreenKeyDown } from '@/utils/fullScreen'
import { getToken } from '@/utils/auth'
import { BASE_URL } from '@/utils/common-variable.js'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    TopMenu,
    TopMainMenu
  },
  data() {
    return {
      BASE_URL,
      black: '',
      showdark: '',
      show: true,
      websock: null,
      // moduleName: '', // 模块内容名字
      haveMSG: false,
      nums: 0,
      websockTimer: null, // 定时心跳
      opensound: true,
      soundShow: true,
      soundUrl: '',
      alarmList: [],
      showalarmlist: false,
      userimg: this.$store.getters.avatar,
      msgShow: false,
      isShowConfigurationCenter: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'currentSystem', 'front_routes']),
    ...mapState('settings', ['isNotAppletENV'])
  },
  created() {
    document.addEventListener('click', e => {
      if (this.$refs.showPanel) {
        const isSelf = this.$refs.showPanel.contains(e.target)
        if (!isSelf) {
          this.showalarmlist = false
        }
      }
    })
  },
  mounted() {
    var that = this
    that.changetop()
    Topswitch.$on('demo', function(msg) {
      sessionStorage.setItem('topcolor', msg)
      that.changetop()
    })
    window.addEventListener('keydown', listenerFullScreenKeyDown)
    // that.initWebSocket()
  },
  destroyed: function() {
    // 页面销毁时关闭
    if (this.websock) this.websock.close()
    if (this.websockTimer) {
      clearInterval(this.websockTimer)
      this.websockTimer = null
    }
  },
  methods: {
    alertTable() {
      this.$router.push('/alarm/list')
      this.showalarmlist = false
    },
    changetop() {
      const color = sessionStorage.getItem('topcolor')
      this.show = false
      if (color === 'white') {
        this.showdark = '#FFFFFF'
        this.black = '#868C93'
      } else {
        this.showdark = '#1D2029'
        this.black = '#BCC5C9'
      }
    },
    toCommand(item, index) {
      this.$router.push('/alarm/alarm-list')
      this.showalarmlist = false
      var count = 0
      for (var i = 0; i < this.alarmList.length; i++) {
        if (this.alarmList[i].selected === false) {
          this.haveMSG = true
        }
        if (this.alarmList[i].selected === true) {
          count++
        }
      }
      if (count === this.alarmList.length) {
        this.haveMSG = false
      }
    },
    openalarmlist() {
      this.showalarmlist = !this.showalarmlist
    },

    // 测试
    play() {
      // this.soundUrl = mp3;
      this.soundUrl = 'http://139.9.53.108/group1/M00/00/03/wKgMy18D1CiAE0f8AABCrDLxdFY090.WAV'
    },
    pause() {
      var audio = document.getElementById('music')
      if (audio !== null) {
        // 检验播放是否已暂停.audio.paused 在播放器播放时返回false.
        // alert(audio.paused);
      }
      if (audio.paused) {
        audio.play() // audio.play();// 这个就是播放
      } else {
        audio.pause() // 这个就是暂停
      }
    },
    // 初始化websocket
    initWebSocket() {
      const token = getToken()
      // const wsuri = process.env.VUE_APP_WEBSOCKET_ROOT + "/" + token; // const wsuri = `${process.env.VUE_APP_WEBSOCKET_ROOT}`
      const wsuri = 'ws://' + location.host + '/api/socket/' + token // const wsuri = `${process.env.VUE_APP_WEBSOCKET_ROOT}`
      // 客户端与服务器进行连接。
      this.websock = new WebSocket(wsuri)
      // 接收消息 实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
      this.websock.onmessage = this.websocketonmessage
      // 监听链接是否成功 实例对象的onopen属性，用于指定连接成功后的回调函数
      this.websock.onopen = this.websocketonopen
      // 监听链接错误
      // this.websock.onerror = this.websocketonerror
      // 监听链接关闭
      this.websock.onclose = this.websocketclose
    },

    // 接收消息
    websocketonmessage(e) {
      this.showalarmlist = true
      const resData = JSON.parse(e.data)
      // console.log('websocket数据接收', resData)
      function formatDate(time) {
        var date = new Date(time)
        var YY = date.getFullYear() + '-'
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return YY + MM + DD + ' ' + hh + mm + ss
      }
      // resData.createTime = formatDate(resData.createTime);
      resData.alarmTime = formatDate(resData.alarmTime)
      resData.selected = false
      this.alarmList.unshift(resData)
      if (this.alarmList.length > 0) {
        Topswitch.$emit('demo', 'msg')
        this.haveMSG = true
        this.soundUrl = 'http://139.9.53.108/group1/M00/00/03/wKgMy18D1CiAE0f8AABCrDLxdFY090.WAV'
      }
      this.msgShow = true
    },
    // 监听链接是否成功
    websocketonopen() {
      // console.log('websocket连接成功')
      const actions = {
        label: 'websocket心跳',
        user: this.$store.getters.userInfo.username
      }
      this.websocketsend(JSON.stringify(actions))
    },
    websocketsend(Data) {
      // console.log('数据发送')
      // 数据发送
      // 心跳定时发送数据
      this.websockTimer = setInterval(() => {
        this.websock.send(Data)
      }, 60000)
    },
    // 监听链接错误
    websocketonerror() {
      this.$notify({
        title: '提示',
        message: '实时告警连接中断,重连中...',
        type: 'warning'
      })
    },
    // 监听链接关闭
    websocketclose() {
      // console.log('websocket连接关闭')
      /* const _this = this
      _this.initWebSocket()*/
    },

    // 清除本次告警声音
    clearonece() {
      // console.log('清除本次声音')
      this.soundUrl = ''
      this.soundShow = false
      setTimeout(() => {
        this.soundShow = true
      }, 1000)
    },
    // 切换开关
    switchsound() {
      // console.log('切换开关')
      if (this.opensound === true) {
        this.opensound = false
        this.soundShow = false
      } else {
        this.opensound = true
        this.soundShow = true
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      sessionStorage.clear()
      if (window.__POWERED_BY_QIANKUN__) {
        await this.$store.dispatch('user/logout')
        this.$store.commit('permission/FRONT_ROUTES', [])
        // this.$microApp.pushState('systemmanagement', '/login')
        this.$parentProps.setGlobalState({ name: 'login' })
      } else {
        await this.$store.dispatch('user/logout')
        this.$store.commit('permission/FRONT_ROUTES', [])
        this.$router.push('/')
      }
    },
    async goTo() {
      const authList = this.$store.getters.authList
      const myBackRoute =
        this.currentSystem === 'back' ? authList.filter(el => el.isBackStage) : authList.filter(el => !el.isBackStage)

      if (myBackRoute.length) {
        const words = this.currentSystem === 'back' ? 'system' : 'back'
        await this.$store.dispatch('permission/switchRoute', { type: words })
        await this.$store.dispatch('settings/changeSetting', {
          key: 'currentSystem',
          value: words
        })
        const path = this.handleRoute()
        path && this.$router.push(path)
        sessionStorage.setItem('currentSystem', words)
      } else {
        this.$notify({
          title: '提示',
          message: '该用户没有配置中心菜单权限',
          type: 'error',
          duration: 1000 * 2
        })
      }
    },
    homeScreen() {
      // this.$microApp.pushState('systemmanagement', '/largescreen', '')
      this.$parentProps.setGlobalState({ name: 'screen' })
    },
    handleRoute() {
      const list = this.front_routes.filter(item => !item.hidden)
      if (list && list.length) {
        return list[0].path
      }
      return ''
    },
    mainMenuChange(item) {
      this.$nextTick(() => {
        this.$refs.topMenu.filterSubMenu(item.path)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .audioBox {
    position: absolute;
    top: 64px;
    right: 20px;
    z-index: -1;
    opacity: 0;
  }
  .alarmlist {
    width: 376px;
    height: 486px;
    box-sizing: border-box;
    position: fixed;
    top: 58px;
    right: 164px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 4px 4px 2px rgba(40, 120, 255, 0.08);
    opacity: 1;
    border-radius: 8px;
    z-index: 9999;
    .title {
      width: 100%;
      height: 55px;
      border-bottom: 1px solid rgba(234, 237, 241, 1);
      font-size: 14px;
      font-family: Microsoft YaHei UI;
      font-weight: bold;
      color: #757679;
      opacity: 1;
      padding: 0 24px;
      box-sizing: border-box;
      .title_left {
        float: left;
        line-height: 55px;
      }
      .title_right {
        float: right;
        margin-top: 19px;
        cursor: pointer;
        &:hover {
          color: #0e87ff;
        }
      }
    }
    .box {
      width: 100%;
      height: 381px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(212, 212, 212, 1);
      overflow: auto;
      .list {
        width: 100%;
        box-sizing: border-box;
        padding: 19px;
        border-bottom: 1px solid rgba(234, 237, 241, 1);
        cursor: pointer;
        .list_top {
          width: 100%;
          height: 18px;
          overflow: hidden;
          .left {
            font-size: 14px;
            font-family: Microsoft YaHei UI;
            font-weight: bold;
            line-height: 18px;
            color: rgba(62, 63, 65, 1);
            opacity: 1;
            float: left;
          }
          .right {
            font-size: 12px;
            font-family: Microsoft YaHei UI;
            font-weight: 400;
            line-height: 18px;
            color: rgba(123, 125, 130, 1);
            opacity: 1;
            float: left;
            margin-left: 16px;
            margin-top: 1px;
          }
        }
        .des {
          margin-top: 5px;
          width: 100%;
          font-size: 14px;
          font-family: Microsoft YaHei UI;
          font-weight: 400;
          line-height: 24px;
          color: rgba(81, 81, 83, 1);
          opacity: 1;
        }
      }
      .plus {
        opacity: 0.4;
      }
    }
    .more {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: Microsoft YaHei UI;
      font-weight: 400;
      line-height: 50px;
      color: rgba(62, 63, 65, 0.753);
      opacity: 1;
      text-align: center;
      span {
        cursor: pointer;
        &:hover {
          color: #46b5ff;
        }
      }
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .iconfontbox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      cursor: pointer;
    }
    .icontop {
      color: #bcc5c9;
      font-size: 22px;
    }
    .userimg {
      height: 25px;
      width: 25px;
      border-radius: 50%;
    }
    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
  .right-menu ::v-deep .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-top: 1px solid #868c93;
    border-left: 1px solid #868c93;
    border-bottom: 1px solid #868c93;
    border-right: none;
  }
  .right-menu ::v-deep .el-input-group__append,
  .el-input-group__prepend {
    background-color: #f5f7fa;
    color: #868c93;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border-radius: 0;
    border-top: 1px solid #868c93;
    border-right: 1px solid #868c93;
    border-bottom: 1px solid #868c93;
    border-left: none;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }
  .link-management {
    border: none;
    outline: none;
    color: #a6aebe;
    min-width: 64px;
    padding: 0 6px;
    height: 32px;
    font-size: 16px;
    font-family: 'Source Han Sans CN';
    background: none;
  }
  .link-management:hover {
    color: #0e87ff;
  }
  .el-icon-s-home {
    margin-right: 12px;
  }
}
</style>
