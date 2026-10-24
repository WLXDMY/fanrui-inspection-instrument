<!--
 * @Author: limengjuan
 * @Date: 2022-03-16 14:30:01
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-06-27 14:45:53
 * @Description: 导出excel进度提示框
-->
<template>
  <el-dialog
    title="导出文件"
    :visible.sync="exportExcelProgressDialogVisible"
    width="600px"
    :before-close="handleClose"
    class="exportExcelProgressDialog"
    :append-to-body="true"
  >
    <ul class="content-box">
      <li v-show="exportExcelDetail.state === 2" class="fail-box">
        <img
          src="@/assets/images/export/exportExcelFailIcon.png"
          alt=""
          srcset=""
        >
        <span>{{ exportExcelDetail.failedMessage }}</span>
      </li>
      <li class="excel-name-box">
        <p class="file-name">{{ fileName }}</p>
        <p class="progress-value">{{ progressRate }}%</p>
      </li>
      <li class="progress-box">
        <el-progress
          :stroke-width="18"
          :percentage="progressRate"
          :show-text="false"
        />
      </li>
      <li class="export-result">
        <p class="result-value">
          实际总数 :
          <span>{{ exportExcelDetail.estimateCount }}</span>
          条；成功数 :
          <span>{{ exportExcelDetail.successCount }}</span>
          条；失败数 :
          <span class="fail-num">{{ exportExcelDetail.failedCount }}</span>
          条
        </p>
        <!-- <a
          class="download"
          v-show="!exportExcelDetail.ailedFileUrl && exportExcelDetail.fileUrl"
          :href="window.origin + '/' + exportExcelDetail.fileUrl"
          :download="exportExcelDetail.fileName + '.xlsx'"
        >
          点击下载
        </a> -->
        <p
          v-show="!exportExcelDetail.ailedFileUrl && exportExcelDetail.fileUrl"
          class="download"
          @click="downLoadExcel"
        >
          点击下载
        </p>
      </li>
    </ul>
  </el-dialog>
</template>

<script>
// import { saveAs } from 'file-saver'
export default {
  data() {
    return {
      window,
      exportExcelProgressDialogVisible: false,
      taskId: '',
      progressTimer: null,
      exportExcelDetail: {}
    }
  },
  computed: {
    progressRate() {
      return Number(
        (
          ((this.exportExcelDetail.successCount ||
            0 + this.exportExcelDetail.failedCount ||
            0) / this.exportExcelDetail.estimateCount || 0) * 100
        ).toFixed(0)
      )
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
  mounted() {},
  destroyed() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
      this.progressTimer = null
    }
  },
  methods: {
    // 打开弹窗
    open(val, requestFun) {
      this.taskId = val
      this.exportExcelProgressDialogVisible = true
      try {
        this.progressTimer = setInterval(() => {
          if (this.progressRate === 100) {
            clearInterval(this.progressTimer)
            this.progressTimer = null
          }
          this.exportExcelProgressRequest(requestFun)
        }, 2000)
      } catch (error) {
        clearInterval(this.progressTimer)
        this.progressTimer = null
      }
    },
    // 关闭
    handleClose() {
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
        this.progressTimer = null
      }
      this.exportExcelProgressDialogVisible = false
      // this.$emit('closeDialog')
    },
    exportExcelProgressRequest(exportExcelProgress) {
      exportExcelProgress(this.taskId).then(res => {
        const { code, data, message } = res.data
        if (code === '200') {
          const progress = ''
          this.exportExcelDetail = { ...data, progress } || {}
        } else {
          this.$notify({
            title: '提示',
            message: message,
            type: 'error',
            duration: 2000
          })
        }
      }).catch(err => {
        clearInterval(this.progressTimer)
        this.$notify({
          title: '提示',
          message: err,
          type: 'error',
          duration: 2000
        })
      })
    },
    downLoadExcel() {
      const { fileUrl, fileName } = this.exportExcelDetail
      const suffix = fileUrl.replace(/.+\.(.+)/, (m, v1) => v1)
      if (!fileUrl) return
      const link = document.createElement('a') // 创建a标签
      link.style.display = 'none' // 使其隐藏
      link.href = '/' + fileUrl // 赋予文件下载地址
      link.setAttribute('download', `${fileName}.${suffix}`) // 设置下载属性 以及文件名
      document.body.appendChild(link) // a标签插至页面中
      link.click() // 强制触发a标签事件
      document.body.removeChild(link)
    }
  }
}
</script>

<style lang="scss" scoped>
.exportExcelProgressDialog {
  ::v-deep .el-dialog__body {
    padding: 0 !important;
    ul,
    li,
    p {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .content-box {
      border-top: 1px solid #e9e9e9;
      padding: 25px 35px 40px 20px;
      .fail-box {
        display: flex;
        align-items: center;
        background: #fde2e2;
        border-radius: 4px 4px 4px 4px;
        padding: 9px 11px 8px 11px;
        margin-bottom: 17px;
        img {
          width: 15px;
          margin-right: 15px;
        }
        p {
          font-size: 13px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #333333;
        }
      }
      .excel-name-box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
          font-size: 18px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
        }
        .file-name {
          color: #999999;
        }
        .progress-value {
          color: #696b6f;
        }
      }
      .progress-box {
        margin-top: 11px;
      }
      .export-result {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        p {
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        }
        .result-value {
          font-size: 16px;
          font-weight: 400;
          color: #696b6f;
          span {
            color: #409eff;
          }
          .fail-num {
            color: #ff1e10;
          }
        }
        .download {
          font-size: 18px;
          font-weight: 500;
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
