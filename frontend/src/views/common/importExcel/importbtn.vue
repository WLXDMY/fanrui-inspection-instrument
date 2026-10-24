<!--
 * @Author: limengjuan
 * @Date: 2022-03-16 14:30:01
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-01-10 14:05:16
 * @Description:
-->
<template>
  <div v-if="existItem()" v-loading.fullscreen.lock="isImportLoading" style="border-radius: 2px">
    <el-dropdown style="border-radius: 2px">
      <el-button style="border-radius: 2px !important" class="button-font" type="primary" size="small">
        <span>
          {{ importParams.otherParams.ptitle }}
        </span>
        <i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <template slot="dropdown">
        <el-dropdown-menu class="drop">
          <template>
            <el-dropdown-item
              v-for="(item, index) in importParams.btnList"
              :key="index"
              v-permission="item.permissions"
              class="importbtn-item"
            >
              <!--下载默认导入模板 -->
              <template v-if="item.type === 'exportDefaultTpl'">
                <el-button size="small" class="import-temp" @click.native="exportDefualtTemplate(item)">
                  {{ item.title }}
                </el-button>
              </template>
              <!--下载导入模板 -->
              <template v-if="item.type === 'exportTpl'">
                <el-button size="small" class="import-temp" @click.native="exportTemplate(item)">
                  {{ item.title }}
                </el-button>
              </template>
              <!--上传导入模板 -->
              <template v-if="item.type === 'importTpl'">
                <el-upload
                  :ref="`uploadTemplate_${index}`"
                  class="importbtn-upload"
                  action="#"
                  :http-request="params => importTemplate(params, item, index)"
                  :limit="1"
                  :show-file-list="false"
                  :file-list="fileTemplateList"
                >
                  <el-button size="small" class="import-temp" @click="onFileChange">
                    {{ item.title }}
                  </el-button>
                </el-upload>
              </template>
              <!-- 数据导入 -->
              <template v-if="item.type === 'import'">
                <el-upload
                  :ref="`uploadData_${index}`"
                  class="importbtn-upload"
                  action="#"
                  :http-request="params => importData(params, item, index)"
                  :limit="1"
                  :show-file-list="false"
                  :file-list="fileDataList"
                >
                  <el-button size="small" class="import-temp" @click="onFileChange">
                    {{ item.title }}
                  </el-button>
                </el-upload>
              </template>
              <!-- 日志导出 -->
              <template v-if="item.type === 'exportLog' || item.type === 'viewLog'">
                <el-button size="small" class="import-temp" @click.native="enterHistoryResult(item)">
                  {{ item.title }}
                </el-button>
              </template>
              <!-- slot -->
              <template v-if="item.type === 'slot'">
                <slot :name="item.code" :props="item" />
              </template>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 弹出层 -->
    <el-dialog
      width="30%"
      class="import-dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :visible.sync="showPopover"
    >
      <div class="import-box">
        <p>导入进度：</p>
        <el-progress :percentage="DataImportPercentage" color="#409eff" :stroke-width="15" />
      </div>
      <div class="down-loadfiles">
        <span>{{ executionDescription }}</span>
        <el-button type="primary" size="small" :disabled="!url" @click="progressDownLoad">点击下载</el-button>
      </div>
      <div class="btn-cancel">
        <el-button type="primary" size="small" @click="closeThisDialog">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { saveAs } from 'file-saver'
import { progressDownLoad } from '@/api/base'

export default {
  props: {
    importParams: {
      type: Object,
      default() {
        return {} // 接口 路由 标题
      }
    }
  },
  data() {
    return {
      showPopover: false,
      isLoop: false,
      fileTemplateList: [],
      fileDataList: [],
      failInfo: false,
      DataImportPercentage: 0,
      executionDescription: '',
      url: '',
      curImportItem: {},
      isImportLoading: false,
      executionStatus: false
    }
  },
  methods: {
    // 是否存在下拉列表子项，不存在则外层也隐藏
    existItem() {
      const authList = this.$store.getters && this.$store.getters.authList?.map(auth => auth.path)
      const index = this.importParams.btnList.findIndex(item => {
        const { permissions } = item
        const { action, currentPath } = permissions || {}
        if (!action && !currentPath) return true
        if (authList.indexOf(action) !== -1) {
          if (currentPath) {
            const repeatArr = this.$store.getters.authList.filter(i => i.path === action)
            const current = repeatArr.find(
              i => currentPath?.includes(i.parentPath) // 兼容动态路由
            )
            return current
          } else {
            return true
          }
        }
      })
      return index !== -1
    },
    // 下载默认导入模板
    exportDefualtTemplate(item) {
      const fn = item.exportDefualtApi
      let params
      if (item.exportDefualtParams) {
        params = {
          relatedCategoryCode: item.exportDefualtParams
        }
      }
      
      fn(params)
        .then(res => {
          const fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
          const fileNameCN = decodeURIComponent(decodeURIComponent(fileName)) // 中文解码
          saveAs(res, fileNameCN)
        })
        .catch(err => {
          this.$notify({
            title: '提示',
            message: err.message || '下载默认导入模板失败',
            type: 'warning',
            duration: 1000
          })
        })
    },
    // 下载导入模板
    exportTemplate(item) {
      const fn = item.exportApi
      fn()
        .then(res => {
          const fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
          const fileNameCN = decodeURIComponent(decodeURIComponent(fileName))
          saveAs(res, fileNameCN) // 中文解码
        })
        .catch(err => {
          console.log(err, 'err')
          this.$notify({
            title: '提示',
            message: err.message || '下载文件失败',
            type: 'warning',
            duration: 1000
          })
        })
    },
    clearFiles(key, index) {
      this.$nextTick(() => {
        const allKey = `${key}_${index}`
        this.$refs[allKey][0].clearFiles()
      })
    },
    // 导入模板
    importTemplate(params, item, index) {
      const fn = item.uploadApi
      const apiParams = item?.apiParams || {}
      fn(params.file, apiParams)
        .then(() => {
          this.setNotify('导入模板成功', 'success')
        })
        .catch(() => {
          this.setNotify('导入模板失败', 'error')
        })
        .finally(() => {
          this.clearFiles('uploadTemplate', index)
        })
    },
    // 导入数据
    importData(params, item, index) {
      const exportFn = item.uploadApi
      const progressFn = item.progressApi
      const uploadExtraParam = item?.uploadExtraParam || null // 文件上传额外参数
      this.isImportLoading = true
      this.url = ''
      exportFn(params.file, uploadExtraParam)
        .then(() => {
          this.isImportLoading = false
          this.DataImportPercentage = 0
          this.isLoop = false
          this.showPopover = !!progressFn
          this.curImportItem = item

          !progressFn &&
            this.$notify({
              title: '提示',
              message: '导入成功',
              type: 'success',
              duration: 2000
            })
          progressFn && this.getImportProgress(progressFn)
        })
        .catch(error => {
          console.log(error, 'error')
        })
        .finally(() => {
          this.isImportLoading = false
          this.clearFiles('uploadData', index)
        })
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
            const { status, message, data } = res.data
            if (status === 1) {
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
                this.clearLoop()
                this.$emit('updateList')
              } else {
                this.loopFn(fn)
              }
            } else {
              this.loopFn(fn)
              this.$notify({
                title: '提示',
                message: message || '数据检查进度失败',
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
    // 当数据为对象的情况下
    handleProgress(data) {
      const { progress, executionDescription, importUrl, executionStatus } = data || {}
      this.DataImportPercentage = +(progress * 100).toFixed(2)
      this.executionDescription = executionDescription
      this.url = importUrl
      this.executionStatus = executionStatus
    },
    // 判断类型
    judgeType(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    },
    // 进度条内下载附件
    progressDownLoad() {
      console.log('进度条内下载附件', this.curImportItem.dialogParams)

      const { importType = '', isExcel = '', fileName = '' } = this.curImportItem.dialogParams || {}
      console.log('进度条内下载附件 importType', importType)
      console.log('进度条内下载附件 isExcel', isExcel)
      console.log('进度条内下载附件 fileName', fileName)

      console.log('进度条内下载附件 this.url', this.url)

      if (isExcel) {
        console.log('进度条内下载附件 window.origin', window.origin)

        saveAs(window.origin + '/' + this.url, fileName)
        return
      } else {
        const params = {
          importType: importType,
          url: this.url
        }
        console.log('进度条内下载附件 params', params)

        progressDownLoad(params).then(res => {
          const fileName = res?.filename?.match(/filename?="((.+)\.(.+))";/)[1]
          const fileNameCN = decodeURI(fileName) // 中文解码
          console.log('进度条内下载附件 res', res)

          saveAs(res, fileNameCN)
        })
      }
    },
    // 进度条内下载附件
    progressDownLoad222() {
      const { importType = '', isExcel = '', fileName = '' } = this.curImportItem.dialogParams || {}
      if (isExcel) {
        saveAs(window.origin + '/' + this.url, fileName)
        return
      } else {
        const params = {
          importType: importType,
          url: this.url
        }
        progressDownLoad(params).then(res => {
          const fileName = res?.filename?.match(/filename?="((.+)\.(.+))";/)[1]
          const fileNameCN = decodeURI(fileName) // 中文解码
          saveAs(res, fileNameCN)
        })
      }
    },
    // 进入历史结果页面
    enterHistoryResult(item) {
      this.$router.push({
        name: item.resultRoute,
        query: item.routeQuery
      })
    },
    // 取消关闭弹窗
    closeThisDialog() {
      this.showPopover = false
      this.clearLoop()
      this.$emit('updateList')
    },
    // 文件发生变化
    onFileChange() {
      this.DataImportPercentage = 0
    },
    // 提示
    setNotify(msg, type) {
      this.$notify({
        title: '提示',
        message: msg,
        type: type,
        duration: 1000
      })
    }
  }
}
</script>

<style lang="scss">
.el-dropdown {
  & > .el-button {
    border-radius: 2px;
  }
}
.drop {
  .importbtn-item {
    padding: 0;
    .importbtn-upload {
      width: 100%;
      .el-upload {
        width: 100%;
      }
    }
    .import-temp {
      text-align: left;
      border: none;
    }
    .el-button {
      color: inherit;
    }
    button {
      width: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
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
.button-font {
  height: 32px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  span {
    display: inline-block;
    line-height: 14px;
    font-size: 14px;
    font-weight: 400;
    font-family: sans-serif;
  }
}
</style>
