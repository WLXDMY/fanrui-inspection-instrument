<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-07-05 14:14:26
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-10-23 10:48:21
 * @FilePath: \dfs\src\components\ExportProgressDialog\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-dialog
    v-bind="$attrs"
    width="30%"
    :visible.sync="diaVisible"
    class="add-dialog"
    :append-to-body="true"
    :close-on-click-modal="false"
    @close="close"
    v-on="$listeners"
  >
    <section
      v-show="exportExcelDetail.state === 2"
      style="background-color: #fde2e2; margin-bottom: 10px"
      class="fail-tip"
    >
      <i style="color: red" class="el-icon-error" />
      <span>{{ exportExcelDetail.failedMessage }}</span>
    </section>
    <header>
      <span :style="{ color: '#979797' }">{{ fileName }}</span>
      <el-button v-show="!exportExcelDetail.ailedFileUrl && exportExcelDetail.fileUrl" type="text" @click="preview"
        >预览</el-button
      >
    </header>
    <main>
      <el-progress :stroke-width="20" :percentage="progressRate" color="#409eff" />
    </main>
    <footer>
      <section class="left-info">
        <section>
          <span
            >预估数: <span style="color: #409eff; margin-right: 4px">{{ exportExcelDetail.estimateCount }}</span
            >条</span
          >
        </section>
        <section>
          <span
            >成功数:<span style="color: #409eff; margin-right: 4px">{{ exportExcelDetail.successCount }}</span
            >条</span
          >
        </section>
        <section>
          <span
            >失败数:<span style="color: red; margin-right: 4px">{{ exportExcelDetail.failedCount }}</span
            >条</span
          >
        </section>
      </section>
      <section>
        <el-button v-show="exportExcelDetail.fileUrl" type="text" @click="downLoadExcel">点击下载</el-button>
      </section>
    </footer>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    exportProgressVisible: {
      type: Boolean,
      default: false
    },
    exportExcelDetail: {
      type: Object,
      default: () => {}
    },
    specifiedFileName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      diaVisible: false
    }
  },
  computed: {
    //
    progressRate() {
      const { estimateCount, failedCount, successCount, status } = this.exportExcelDetail
      if (status === 2) {
        return 100
      } else {
        const progressRate = ((failedCount || 0) + (successCount || 0) / estimateCount) * 100

        if (progressRate > 100) {
          return 100
        } else {
          return Number((progressRate || 0).toFixed(0))
        }
      }
    },
    fileName() {
      const { status } = this.exportExcelDetail
      switch (status) {
        case 0:
        case undefined:
          return '正在生成文件'

        default:
          return this.exportExcelDetail.fileName + '.xlsx'
      }
    }
  },
  watch: {
    exportProgressVisible: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.diaVisible = newValue
      }
    },
    exportExcelDetail: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        const { failedMessage } = newValue || {}
        failedMessage &&
          this.$notify({
            type: 'error',
            message: failedMessage
          })
      }
    }
  },

  methods: {
    close() {
      console.log('close')
      this.$emit('closeDialog')
    },
    downLoadExcel() {
      const { fileUrl, fileName } = this.exportExcelDetail
      console.log('this.exportExcelDetail', this.exportExcelDetail)
      const suffix = fileUrl.replace(/.+\.(.+)/, (m, v1) => v1)
      if (!fileUrl) return
      const link = document.createElement('a') // 创建a标签
      link.style.display = 'none' // 使其隐藏
      link.href = '/' + fileUrl // 赋予文件下载地址
      link.setAttribute('download', `${fileName}.${suffix}`) // 设置下载属性 以及文件名
      document.body.appendChild(link) // a标签插至页面中
      link.click() // 强制触发a标签事件
      document.body.removeChild(link)
    },
    preview() {
      const { fileUrl } = this.exportExcelDetail
      const { origin } = location
      window.open(`${origin}/preview/onlinePreview?url=${btoa('/' + fileUrl)}&local=server`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  margin: 40px auto;
  height: 200px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  main {
    margin: 10px 0;
  }
  footer {
    display: flex;
    justify-content: space-between;
    .left-info {
      section {
        margin-right: 15px;
      }
    }
    section {
      display: flex;
      align-items: center;
    }
  }
}
/deep/ .el-dialog__body {
  height: calc(100% - 54px);
  padding-bottom: 60px;
}

//   /deep/ .el-dialog__header .el-dialog__headerbtn {
//     display: none;

//   }
/deep/ .el-dialog__footer {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
}
::v-deep .el-progress {
  .el-progress-bar {
    //  padding-right: 50px;
    width: calc(100% - 15px);
  }
}
</style>
