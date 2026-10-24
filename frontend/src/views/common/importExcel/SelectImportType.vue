<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-09-09 09:39:18
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-11-14 14:45:33
 * @Description:
-->
<template>
  <div>
    <el-dialog
      title="导入类型"
      :visible.sync="exportExcelRangeDialogVisible"
      width="500px"
      class="exportExcelRangeDialog"
      @close="handleClose"
    >
      <div class="content-box">
        <el-radio-group v-model="exportExcelRangeRadio">
          <el-radio label="1">导入新的方案，或新增、更新检验项。</el-radio>
          <el-radio label="2">更新已有方案的所有数据（包括检验项和关联的数据）。</el-radio>
        </el-radio-group>
        <!-- <div class="hint">注意：如果你的文件内检验项目减少了，那么覆盖后原来已存在的检验项目也会减少。</div> -->
      </div>
      <div class="operate-box">
        <el-upload
          class="importbtn-upload"
          action="#"
          :http-request="params => importData(params)"
          :limit="1"
          :show-file-list="false"
          :file-list="fileDataList"
          :disabled="loading"
        >
          <el-button size="small" type="primary" :loading="loading" :disabled="loading"> 下一步 </el-button>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { progressDownLoad } from '@/api/base'
import { saveAs } from 'file-saver'
export default {
  props: {
    selectImportTypeDialogVisible: {
      type: Boolean,
      required: true
    },
    selectImportParams: {
      type: Object,
      default() {
        return {} // 接口 路由 标题
      }
    }
  },
  data() {
    return {
      exportExcelRangeRadio: '1',
      exportExcelRangeDialogVisible: false,
      fileDataList: [],
      isLoop: false,
      DataImportPercentage: 0,
      executionDescription: '',
      url: '',
      executionStatus: false,
      // 按钮加载状态
      loading: false
    }
  },
  watch: {
    selectImportTypeDialogVisible: {
      handler(newVal, oldValue) {
        if (newVal) {
          this.exportExcelRangeDialogVisible = true
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {},
  methods: {
    // 关闭
    handleClose() {
      this.$emit('cancel')
    },
    // 进度条内下载附件
    progressDownLoad() {
      const { importType = '', isExcel = '' } = this.curImportItem.dialogParams
      if (isExcel) {
        saveAs(window.origin + '/' + this.url)
        return
      } else {
        const params = {
          importType: importType,
          url: this.url
        }
        progressDownLoad(params).then(res => {
          console.log(res)
          const fileName = res?.filename?.match(/filename?="((.+)\.(.+))";/)[1]
          const fileNameCN = decodeURI(fileName) // 中文解码
          saveAs(res, fileNameCN)
        })
      }
    },
    // 导入数据
    importData(params) {
      const exportFn = this.selectImportParams.btn.uploadApi
      const progressFn = this.selectImportParams.btn.progressApi
      this.isImportLoading = true
      this.loading = true
      this.url = ''
      const fileParam = {
        flag: this.exportExcelRangeRadio
      }
      exportFn(params.file, fileParam)
        .then(() => {
          this.isImportLoading = false
          this.DataImportPercentage = 0
          this.isLoop = false
          this.curImportItem = this.selectImportParams
          this.getImportProgress(progressFn)
        })
        .catch(error => {
          console.log(error, 'error')
        })
        .finally(() => {})
    },
    clearLoop() {
      clearInterval(this.timer)
      this.timer = null
    },
    loopFn(fn) {
      this.timer = setTimeout(() => {
        this.getImportProgress(fn)
      }, 1000)
    },
    // 实际数据处理进度查询
    getImportProgress(fn) {
      if (!this.isLoop) {
        this.clearLoop()
        fn()
          .then(res => {
            const { status, data } = res.data
            if (+status === 1) {
              if (this.judgeType(data) === 'object') {
                this.handleProgress(data)
              } else {
                this.DataImportPercentage = +(JSON.parse(data).progress * 100).toFixed(2)
                this.executionDescription = JSON.parse(data).executionDescription
                this.url = JSON.parse(data).importUrl || ''
                this.executionStatus = JSON.parse(data).executionStatus
              }
              if (this.executionStatus) {
                // 为true时结束请求
                this.isLoop = true
                this.loading = false
                this.clearLoop()
                this.$emit('confirm', data)
              } else {
                this.loopFn(fn)
              }
            } else {
              this.loopFn(fn)
              this.$notify({
                title: '提示',
                message: '数据检查进度失败',
                type: 'warning',
                duration: 2000
              })
            }
          })
          .catch(() => {
            this.loopFn(fn)
          })
      }
    },
    // 判断类型
    judgeType(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    },
    // 当数据为对象的情况下
    handleProgress(data) {
      const { progress, executionDescription, importUrl, executionStatus } = data || {}
      this.DataImportPercentage = +(progress * 100).toFixed(2)
      this.executionDescription = executionDescription
      this.url = importUrl
      this.executionStatus = executionStatus
    }
  }
}
</script>

<style lang="scss" scoped>
.exportExcelRangeDialog {
  ::v-deep .el-dialog__body {
    .content-box {
      .el-radio-group {
        display: flex;
        flex-direction: column;
        .el-radio {
          margin: 10px;
        }
      }
    }
    .operate-box {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
}
.hint {
  margin-left: 34px;
}
.import-dialog {
  .import-box {
    display: flex;
    align-items: center;
    p {
      width: 100px;
      margin: 10px 0;
      font-size: 20px;
      color: #333;
    }
    ::v-deep .el-progress {
      flex: 1;
      .el-progress-bar {
        padding-right: 70px;
        margin-right: -75px;
      }
    }
  }
  .down-loadfiles {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
    }
    > button {
      align-self: flex-start;
    }
  }
  .btn-cancel {
    text-align: center;
  }
  .el-icon-close:before {
    content: '';
  }
}
</style>
