<!--
 * @Author: limengjuan
 * @Date: 2022-03-16 14:30:01
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-11-08 18:48:41
 * @Description:
-->
<template>
  <div v-show="existAuthImportParams.btnList.length > 0" v-loading.fullscreen.lock="isImportLoading">
    <el-menu
      mode="horizontal"
      text-color="#606266"
      active-text-color="#606266"
    >
      <el-submenu index="1" popper-class="importbtnCascader">
        <template slot="title">
          <span>{{ existAuthImportParams.otherParams.ptitle }}</span>
        </template>
        <el-submenu v-for="(item, index) in existAuthImportParams.btnList" :key="index" :index="`2-${index}`">
          <template slot="title">{{ item.title }}</template>
          <el-menu-item
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            v-permission="childItem.permissions"
            :index="`2-${index}-${childIndex}`"
          >
            <!--下载默认导入模板 -->
            <template v-if="childItem.type === 'exportDefaultTpl'">
              <span class="span-btn" @click="exportDefualtTemplate(childItem)">{{ childItem.title }}</span>
            </template>
            <!--下载导入模板 -->
            <template v-if="childItem.type === 'exportTpl'">
              <span class="span-btn" @click="exportTemplate(childItem)">{{ childItem.title }}</span>
            </template>
            <!--上传导入模板 -->
            <template v-if="childItem.type === 'importTpl'">
              <el-upload
                :ref="`uploadTemplate_${index}`"
                action="#"
                :http-request="params => importTemplate(params, childItem, index)"
                :limit="1"
                :show-file-list="false"
                :file-list="fileTemplateList"
              >
                <span class="span-btn" @click="onFileChange">{{ childItem.title }}</span>
              </el-upload>
            </template>
            <!-- 数据导入 -->
            <template v-if="childItem.type === 'import'">
              <el-upload
                :ref="`uploadData_${index}`"
                action="#"
                :http-request="params => importData(params, childItem, index)"
                :limit="1"
                :show-file-list="false"
                :file-list="fileDataList"
              >
                <span class="span-btn" @click="onFileChange">{{ childItem.title }}</span>
              </el-upload>
            </template>
            <!-- 日志导出 -->
            <template v-if="childItem.type === 'exportLog'">
              <span class="span-btn" @click="enterHistoryResult(childItem)">{{ childItem.title }}</span>
            </template>
            <!-- slot -->
            <template v-if="childItem.type === 'slot'">
              <slot :name="childItem.code" :props="childItem" />
            </template>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

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
        <el-progress
          :percentage="DataImportPercentage"
          color="#409eff"
          :stroke-width="15"
        />
      </div>
      <div class="down-loadfiles">
        <span>{{ executionDescription }}</span>
        <el-button
          :disabled="!isLoop"
          size="small"
          @click="progressDownLoad"
        >点击下载</el-button>
      </div>
      <div class="btn-cancel">
        <el-button size="small" @click="closeThisDialog">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { saveAs } from 'file-saver'
import { progressDownLoad } from '@/api/base'
import lodash from 'lodash'

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
      existAuthImportParams: {},
      showPopover: false,
      isLoop: false,
      fileTemplateList: [],
      fileDataList: [],
      failInfo: false,
      DataImportPercentage: 0,
      executionDescription: '',
      url: '',
      curImportItem: {},
      isImportLoading: false
    }
  },
  watch: {
    importParams: {
      handler(nVal) {
        if (nVal && nVal?.btnList) {
          const existAuthImportParams = lodash.cloneDeep(nVal)
          existAuthImportParams.btnList = existAuthImportParams.btnList.filter(item => {
            if (item.children && item.children.length > 0) {
              const existAuthBtn = this.getExistAuthBtn(item.children)
              if (existAuthBtn.length > 0) {
                item.children = existAuthBtn
                return true
              }
              return false
            }
            return false
          })
          this.existAuthImportParams = existAuthImportParams
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 查看是否存在权限
    getExistAuthBtn(list) {
      const pathList = (this.$store.getters.authList || []).map(auth => auth.path)
      const permissionsList = list.map(item => item?.permissions?.action)

      const test = permissionsList.reduce((arr, path, index) => {
        if (pathList.includes(path)) {
          arr.push(list[index])
        }
        return arr
      }, [])

      return test
    },
    // 下载默认导入模板
    exportDefualtTemplate(item) {
      const fn = item.exportDefualtApi
      fn().then(res => {
        const fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
        const fileNameCN = decodeURI(fileName)// 中文解码
        saveAs(res, fileNameCN)
      }).catch((err) => {
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
      fn().then(res => {
        const fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
        const fileNameCN = decodeURI(fileName)
        saveAs(res, fileNameCN) // 中文解码
      }).catch((err) => {
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
      this.isImportLoading = true
      exportFn(params.file)
        .then(() => {
          this.isImportLoading = false
          this.DataImportPercentage = 0
          this.isLoop = false
          this.showPopover = true
          this.curImportItem = item
          this.getImportProgress(progressFn)
        })
        .catch((error) => {
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
            const { code, message, data } = res.data
            if (code === '200') {
              this.DataImportPercentage = +(
                JSON.parse(data).progress * 100
              ).toFixed(2)
              this.executionDescription = JSON.parse(data).executionDescription
              this.url = JSON.parse(data).importUrl || ''
              const executionStatus = JSON.parse(data).executionStatus
              if (executionStatus) {
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
          const fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
          const fileNameCN = decodeURI(fileName)// 中文解码
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
.importbtnCascader {
  .el-submenu__title,
  .el-menu-item {
    &:hover {
      color: #409eff !important;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
    .el-upload, .span-btn {
      display: inline-block;
      width: 100%;
      height: 100%;
      text-align: left;
    }
  }
}
</style>
<style lang="scss" scoped>
::v-deep .el-menu > .el-submenu .el-submenu__title {
  height: auto;
  padding: 9px 15px !important;
  font-size: 12px;
  color: #FFF !important;
  background-color: #1890ff;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #1890ff;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 400;
  user-select: none;
  & .el-submenu__icon-arrow {
    display: initial;
    color: #fff;
  }
  &:hover {
    background: #46a6ff;
    border-color: #46a6ff;
  }
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
    content: "";
  }
}

</style>
