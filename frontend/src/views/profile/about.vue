<template>
  <div class="container">
    <div class="mainContent">
      <div v-if="showFlag" class="headerTitle">
        <img :src="backstageLogoUrl" class="img">
        <h1>{{ backstageName }}</h1>
      </div>
      <!-- 中间显示版本信息 -->
      <div class="versionWarp">
        <div class="version">
          <div class="card">
            <div class="itemWarp DFSWarp">
              <img src="@/assets/images/about/DFSImg.png" alt="">
            </div>
            <div class="cardnfo">
              <div class="cardTitle">DFS版本</div>
              <div class="cardContent">{{ version }}</div>
            </div>
          </div>
          <div class="card">
            <div class="itemWarp AMSWarp">
              <img src="@/assets/images/about/AMSImg.png" alt="">
            </div>
            <div class="cardnfo">
              <div class="cardTitle">AMS版本</div>
              <div class="cardContent">{{ version }}</div>
            </div>
          </div>
          <div id="clickAnimation" class="card cardAnimation">
            <div id="frontCard" class="frontCard">
              <div class="itemWarp qrCodeWrap">
                <div
                  id="clickAnimationFront"
                  ref="clickAnimationFront"
                  class="downloadIcon"
                >
                  <span>精制下载</span>
                </div>
                <div class="qrCode">
                  <vue-qr
                    :text="companyInfo.qrCodeText"
                    :size="200"
                    :margin="15"
                  />
                </div>
              </div>
              <div class="cardnfo">
                <div class="cardTitle">{{ companyInfo.displayName }}</div>
                <div class="cardContent">{{ companyInfo.invitationCode }}</div>
              </div>
            </div>
            <div id="backCard" class="backCard">
              <div class="itemWarp qrCodeWrap">
                <div
                  id="clickAnimationBack"
                  ref="clickAnimationBack"
                  class="downloadIcon back"
                >
                  <span>返回</span>
                </div>
                <div class="androidDownload">
                  <span class="title"> 安卓：</span><span class="scan">扫码下载</span>
                </div>
                <div class="qrCode">
                  <img src="@/assets/images/about/android-apk.png" alt="">
                </div>
              </div>
              <div class="cardnfo">
                <div class="cardTitle">精制下载</div>
                <div class="cardContent">
                  <span style="color: #303030"> windows： </span>
                  <span class="windowDownload" @click="windowDownload">
                    点击下载
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="itemWarp EMCWarp">
              <img src="@/assets/images/about/EMCImg.png" alt="">
            </div>
            <div class="cardnfo">
              <el-button
                type="primary"
                class="btn"
                @click="toEMC"
              ><img
                src="@/assets/images/about/to.png"
                class="to"
                alt=""
              >EMC市场</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部版权 -->
      <div class="copyRight">
        <div>Copyright © 2018-2022 yelink 版权所有</div>

        <div>
          <el-button
            v-permission="{ action: 'about:recovery' }"
            class="btnRecover"
            type="primary"
            size="small"
            @click="recoverInit"
          >恢复原厂设置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVersionInfo, recoverInit, getCompanyCode } from '@/api/base'
import vueQr from 'vue-qr'
export default {
  components: { vueQr },
  data() {
    return {
      flag: true,
      showDownload: false,
      showFlag: true,
      version: '', // 获取版本信息
      backstageName: '',
      backstageLogoUrl: require('../../assets/images/logo/logoabout.png'),
      companyInfo: {
        displayName: '',
        invitationCode: '',
        qrCodeText: ''
      }
    }
  },
  mounted() {
    this.getWhiteCardDetail()
    this.getCompanyCode()
    const container = document.getElementById('clickAnimation') // 获取整个卡片元素节点
    // 精制下载按钮事件
    this.$refs.clickAnimationFront.addEventListener('click', () => {
      container.style.animation =
        ' rotate 1.5s cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards'
      document.getElementById('frontCard').style.zIndex = 2000
      document.getElementById('backCard').style.zIndex = 2001
    })

    // 返回按钮事件
    this.$refs.clickAnimationBack.addEventListener('click', () => {
      container.style.animation =
        'rotate-reserve 1.5s cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards'
      document.getElementById('frontCard').style.zIndex = 2001
      document.getElementById('backCard').style.zIndex = 2000
    })
  },
  created() {
    this.getVersionInfo()
  },
  methods: {
    // 切换下载页或者返回精制介绍页
    changeDownload() {
      this.showDownload = !this.showDownload
      this.$refs.clickAnimation.classList.add('clickAnimation')
    },
    // 获取标题和logo
    getWhiteCardDetail() {
      const data = JSON.parse(localStorage.getItem('whiteCard'))
      if (data?.configure) {
        this.showFlag = true
      } else {
        this.showFlag = false
      }
      this.backstageName = data?.backstageName
      this.backstageLogoUrl =
        data?.backstageLogoUrl ||
        require('../../assets/images/logo/logoabout.png')
    },
    // 获取版本信息
    getVersionInfo() {
      getVersionInfo().then((res) => {
        if (res.data.code === '200') {
          this.version = res.data.data
        }
      })
    },
    // 恢复出厂设置
    recoverInit() {
      this.$confirm('此操作将恢复输出厂设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: '警告',
          message: '等待时间会很久，请耐心等待',
          type: 'warning'
        })
        recoverInit().then((res) => {
          if (res.data.code === '200') {
            this.$notify({
              title: '成功',
              message: res.data.message || '恢复出厂设置成功',
              type: 'success'
            })
          }
        })
      })
    },
    // 获取企业信息
    getCompanyCode() {
      getCompanyCode().then((res) => {
        const { code, data = {}, message } = res.data
        if (code == '200') {
          this.companyInfo.displayName = data.data.displayName
          this.companyInfo.invitationCode = data.data.invitationCode
          const text = {
            type: 'addenterprise',
            value: {
              organizationName: data.data.displayName,
              invitationCode: data.data.invitationCode
            }
          }
          this.companyInfo.qrCodeText = JSON.stringify(text)
        } else {
          this.$message.error(message)
        }
      })
    },
    // windown下载按钮
    windowDownload() {
      window.open(
        'https://android-yelink.obs.cn-south-1.myhuaweicloud.com/%E7%B2%BE%E5%88%B6.exe'
      )
    },
    toEMC() {
      window.open('http://mec.yelinksaas.com/')
    }
  }
}
</script>
<style>
@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}
@keyframes rotate-reserve {
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>
<style lang="scss" scoped>
.container {
  background-color: #eaeff5;
  padding: 24px 24px;
  height: calc(100vh - 48px);
  display: flex;
  .mainContent {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 60px;
    padding-top: 100px;
    background-color: #fff;
    .headerTitle {
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        width: 30px;
        height: 30px;
        margin-right: 20px;
        vertical-align: middle;
      }
      h1 {
        font-size: 30px;
      }
    }
    .versionWarp {
      width: 100%;
      overflow: auto;
      .version {
        width: 1500px;
        height: calc(100% - 75px);
        display: flex;
        justify-content: space-around;
        .card.cardAnimation {
          position: relative;
          /* 给卡片添加一个3D盒子属性 */
          transform-style: preserve-3d;
          /* 给卡片添加默认动画 */
          // animation: rotate-reserve 1.5s cubic-bezier(0.66, -0.47, 0.33, 1.5)
          //   forwards;
        }
        // .cardAnimation:hover {
        //   /* 鼠标移入时动画
        //     动画（动画名称 时间 贝塞尔曲线，可以自定义动画轨迹 动画完成时的状态）*/
        //   animation: rotate 1.5s cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards;
        // }
        .clickAnimation {
          animation: rotate 1.5s cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards;
        }
        .frontCard,
        .backCard {
          position: absolute;
          top: 0;
          left: 0;
          backface-visibility: hidden; // 旋转元素背面不可见
        }

        .backCard {
          /* 卡片沿Y轴翻转180°，此动画为3D动画，必须给父元素加上3D属性 */
          transform: rotateY(180deg);
        }

        .card {
          flex: 0 0 315px;
          height: 365px;
          background: #ffffff;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          border-radius: 10px;
          margin: 29px;
          .itemWarp {
            width: 100%;
            height: 223px;
            background: #f1f6ff;
            border-radius: 10px 10px 0px 0px;
          }
          .DFSWarp {
            padding: 23px 41px 40px 64px;
          }
          .AMSWarp {
            padding: 23px 50px 40px 55px;
          }
          .EMCWarp {
            padding: 19px 65px 18px 85px;
          }
          .qrCodeWrap {
            position: relative;
            padding: 51px 79px 32px 94px;
            .downloadIcon {
              cursor: pointer;
              position: absolute;
              top: 0;
              right: 0;
              width: 78px;
              height: 31px;
              background: #c4d7fc;
              border-radius: 0px 10px 0px 10px;
              font-weight: 400;
              text-align: center;
              span {
                background: #a4c4fe;
                background: #c4d7fc;
                line-height: 31px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                color: #2d56a1;
                opacity: 1;
              }
            }
            .androidDownload {
              position: absolute;
              bottom: 10px;
              right: 105px;
              font-size: 14px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #3d84e1;
              .title {
                color: #303030;
              }
              .scan {
                cursor: pointer;
              }
            }
            .back {
              width: 58px;
            }
            .qrCode {
              width: 100%;
              height: 100%;
              padding: 10px;
              background: url("../../assets/images/logo/qr-code-border.png")
                no-repeat;
              background-size: 100% 100%;
              box-sizing: border-box;
              img {
                width: 100%;
                height: 100%;
                border: 1px solid #dce3f6;
                box-sizing: border-box;
              }
            }
          }

          img {
            width: 100%;
            height: 100%;
          }
          .cardnfo {
            height: 142px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 29px 0 36px 0;
            text-align: center;
            align-items: center;
            .cardTitle {
              font-size: 22px;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: #303030;
            }
            .cardContent {
              font-size: 20px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #388fea;
              .windowDownload {
                display: inline-block;
                padding: 6px 3px;
                border-bottom: 1px solid #3d84e1;
                cursor: pointer;
              }
            }
            .btn {
              width: 176px;
              height: 49px;
              margin-top: 20px;
              background: rgba(161, 211, 255, 0.36);
              border-radius: 27px;

              font-size: 20px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #3d84e1;
              border: none;
            }
            .to {
              width: 21.65px;
              height: 21.15px;
              margin-right: 15px;
            }
          }
        }
      }
    }

    // 底部版权
    .copyRight {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      height: 40px;
    }
  }
}
</style>
