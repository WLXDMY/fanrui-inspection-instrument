<!--
 * @Author: shunhua.liang
 * @Date: 2022-03-28 11:21:16
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-07-30 16:02:36
 * @Description: 附件列表
-->

<template>
  <div>
    <el-dialog
      :title="fileParams.dialogTitle"
      :visible.sync="dialogTableVisible"
      append-to-body
      :close-on-click-modal="false"
      width="800px"
      class="attachment-dialog"
    >
      <div class="base-info">
        <section v-if="billType === 'uploadAndDownload'" class="upload-file">
          <section class="tips">
            操作步骤
            <p>1、点击下载默认模板</p>
            <p>2、根据业务需求、通过数据源创建报表sheet</p>
            <p>3、上传创建好的自定义模板</p>
            <p>
              具体自定义模板功能可查看<span>《自定义报表模板操作说明书》</span>
              注意：若导出的数据源自定义字段有修改、需要重新下载数据源并配置上传模板
            </p>
          </section>
          <section class="action">
            <el-upload
              action=""
              :http-request="handleUpload"
              :limit="1"
              :before-upload="beforeUpload"
              :file-list="fileUrl"
              :show-file-list="false"
            >
              <el-button size="small" type="primary"> 点击上传 </el-button>
            </el-upload>
            <label>（文件大小不能超过5M，格式为xlsx）</label>
          </section>
        </section>
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{
            background: '#F2F5FC',
            color: '#181d1f',
            height: '46px',
            'font-family': 'Source Han Sans CN',
            'font-size': '13px',
            'font-weight': '550'
          }"
          highlight-current-row
        >
          <el-table-column prop="date" label="序号" width="80">
            <template slot-scope="scope">
              <span v-text="serialNumber(scope.$index)" />
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="模板名称" />
          <el-table-column v-if="billType === 'uploadAndDownload'" label="操作" width="120">
            <template slot-scope="scope">
              <section class="action">
                <div class="edit-text" @click="downloadTmp(scope.row)">下载模板</div>
                <div class="delete-text" @click="deleteTmp(scope.row)">删除</div>
              </section>
            </template>
          </el-table-column>
          <el-table-column v-if="billType === 'downloadPDF'" width="120" label="操作">
            <template slot-scope="scope">
              <section class="action">
                <div class="edit-text" @click="PDFExport(scope.row)">pdf导出</div>
              </section>
            </template>
          </el-table-column>
          <el-table-column
            v-if="
              billType === 'downloadExcel' ||
              billType === 'downloadExcelByQueryParams' ||
              billType === 'exportExcelByQueryParams'
            "
            width="120"
            label="操作"
          >
            <template slot-scope="scope">
              <section class="action">
                <div class="edit-text" @click="handleSelectExportRange(scope.row)">excel导出</div>
              </section>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="close">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 导出excel进度提示框 -->
    <!-- <ExportExcelProgressDialog ref="exportExcelProgressDialog" /> -->

    <!-- 导出excel进度条弹框 -->
    <ExportProgressDialog
      v-if="exportProgressVisible"
      title="导出文件"
      :export-excel-detail="exportExcelDetail"
      :export-progress-visible="exportProgressVisible"
      @closeDialog="closeDialog"
    />
    <!-- 选择导出范围 -->
    <SelectExportRange
      v-if="selectExportRangeDialogVisible"
      :select-export-range-dialog-visible="selectExportRangeDialogVisible"
      :file-params="fileParams"
      @confirm="handleConfirmSelectExportRange"
      @cancel="handleCancelSelectExportRange"
    />
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
// import ExportExcelProgressDialog from './exportExcelProgressDialog.vue'
// import ExportExcelProgressDialog from '@/components/ExportProgressDialog'

export default {
  components: {
    ExportProgressDialog: () => import('@/components/ExportProgressDialog'),
    SelectExportRange: () => import('./SelectExportRange')
  },
  props: {
    modelType: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0 // 当前查询的数据总数
    },
    queryParams: {
      type: Object,
      default: () => ({})
    },
    exportExcelMultipleSelectionParam: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      fileParams: {},
      tableData: [],
      fileUrl: [],
      timer: null,
      exportExcelDetail: {},
      exportProgressVisible: false,
      selectExportRangeDialogVisible: false,
      EXCELExportRow: null,
      exportExcelRangeRadio: 'all'
    }
  },

  computed: {
    billType() {
      return this.fileParams?.otherParams?.billType || ''
    },
    billApi() {
      return this.fileParams?.otherParams?.billApi || {}
    },
    billParams() {
      return this.fileParams?.otherParams?.billParams || {}
    }
  },
  watch: {
    exportExcelDetail: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (newValue.status === 2 || newValue.status === 3) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
    }
  },
  methods: {
    // 关闭导出进度弹窗
    closeDialog() {
      clearInterval(this.timer)
      this.timer = null
      this.exportProgressVisible = false
    },
    // 打开弹窗
    show(fileParams) {
      this.fileParams = fileParams
      this.getAllFile()
    },
    // 关闭
    close() {
      this.dialogTableVisible = false
    },
    // 获取列表
    getAllFile() {
      this.billApi['queryFiles'](this.modelType).then(res => {
        this.tableData = res.data?.data || []
        if (this.tableData.length === 0 && this.billType === 'downloadPDF') {
          this.PDFDefaultExport()
        } else if (this.tableData.length === 0 && this.billType === 'downloadExcel') {
          this.EXCELDefaultExport()
        } else if (this.tableData.length === 0 && this.billType === 'downloadExcelByQueryParams') {
          this.EXCELExportRow = null
          if (this.fileParams.otherParams?.isShowSelectExportRangeDialog) {
            this.selectExportRangeDialogVisible = true
          } else {
            this.EXCELExport()
          }
        } else {
          this.dialogTableVisible = true
        }
      })
    },
    // 序号
    serialNumber(row) {
      return +row + 1
    },
    // 上传之前
    beforeUpload(file) {
      console.log(file, 'file')
      if (!/^.+\.(xlsx)$/i.test(file.name)) {
        this.$message({
          message: '请上传xlsx格式文件',
          type: 'warning'
        })
        return false
      }

      if (file.size / 1024 / 1024 > 5) {
        this.$message({
          message: '文件大小不能超过5M',
          type: 'warning'
        })
        return false
      }
    },
    // 点击上传
    handleUpload(params) {
      this.billApi['uploadFile'](params.file, this.modelType)
        .then(() => {
          this.getAllFile()
          this.$notify({
            title: '提示',
            message: '上传成功',
            type: 'success',
            duration: 2000
          })
        })
        .finally(() => {
          this.fileUrl = []
        })
    },
    // 下载模板
    downloadTmp(row) {
      if (this.fileParams?.otherParams?.downLoadType === 'directDownLoad') {
        console.log(window.origin + '/' + row.fileAddress, 'window.origin + ' / ' + row.fileAddress')
        return window.open(window.origin + '/' + row.fileAddress + `?attname=${row.fileName}`)
      }
      const apiParams = {
        id: row.id
      }
      this.downloadExcelFile(this.billApi['downloadFile'], apiParams)
    },
    // 删除模板
    deleteTmp(row) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.id
          }
          this.billApi['deleteFile'](params).then(res => {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.getAllFile()
          })
        })
        .catch(err => {
          this.$notify({
            title: '失败',
            message: err.message || '删除失败',
            type: 'error',
            duration: 2000
          })
        })
    },
    // 修改文件名
    setFileName(row) {
      let { fileName = 'null' } = row
      if (fileName) {
        fileName = fileName.slice(0, fileName.lastIndexOf('.xlsm'))
      }
      return fileName
    },
    openNewWindow(url, title) {
      window.open(url)
      /*   const win = window.open('about:blank')
      win.document.title = title
      const iframe = document.createElement('iframe')
      iframe.src = url
      iframe.style.width = '100%'
      iframe.style.height = '100vh'
      iframe.style.margin = '0'
      iframe.style.padding = '0'
      iframe.style.overflow = 'hidden'
      iframe.style.border = 'none'
      win.document.body.style.margin = '0'
      win.document.body.appendChild(iframe) */
    },
    // pdf导出
    PDFExport(row) {
      const fileName = this.setFileName(row)
      const apiParams = {
        fileName: fileName + '.pdf',
        fileAddress: row.fileAddress,
        ...this.billParams
      }
      const otherParams = {
        fileName
      }
      this.downloadPDFFile(apiParams, otherParams)
    },
    // pdf默认导出
    PDFDefaultExport() {
      const fileName = '默认pdf导出'
      const apiParams = {
        fileName: fileName + '.pdf',
        fileAddress: '',
        ...this.billParams
      }
      const otherParams = {
        fileName
      }
      this.downloadPDFFile(apiParams, otherParams)
    },
    // download pdf 文件
    downloadPDFFile(apiParams, otherParams) {
      this.billApi['exportPDF'](apiParams)
        .then(res => {
          const href = URL.createObjectURL(res)
          this.openNewWindow(href, otherParams.fileName)
          this.$notify({
            title: '成功',
            message: '导出成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(err => {
          this.$notify({
            title: '失败',
            message: err.message || '导出失败',
            type: 'error',
            duration: 2000
          })
        })
    },
    // download excel 文件
    downloadExcelFile(api, apiParams) {
      api(apiParams)
        .then(res => {
          let fileName
          if (apiParams.fileName) {
            fileName = apiParams.fileName
          } else {
            fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
            fileName = decodeURI(fileName) // 中文解码
          }
          saveAs(res, fileName)
          this.$notify({
            title: '成功',
            message: '导出成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(err => {
          this.$notify({
            title: '失败',
            message: err.message || '导出失败',
            type: 'error',
            duration: 2000
          })
        })
    },
    // excel导出
    async EXCELExport(row = {}) {
      console.log(row, 'row')
      if (this.billType === 'downloadExcelByQueryParams') {
        if (this.billApi.exportTaskId && this.billApi.exportProgress) {
          if (this.total > 1000000) {
            const [result, err] = await this.$to(
              this.$confirm('当前导出数据超出100w行，超出部分不予导出！', '导出文件提示', { type: 'warning' })
            )
            if (result) {
              this.getExportProgress(row)
            }
          } else {
            console.log(1)
            this.getExportProgress(row)
          }
        } else {
          this.$emit('exportOrderBytemplate', {
            id: row?.id,
            fileName: row?.fileName,
            exportExcelRangeRadio: this.exportExcelRangeRadio
          })
        }
        return
      }
      if (this.billType === 'exportExcelByQueryParams') {
        // this.EXCELExportByQueryParams(row)
        this.$emit('exportOrderBytemplate', {
          id: row?.id,
          fileName: row?.fileName,
          exportExcelRangeRadio: this.exportExcelRangeRadio,
          requestFun: this.billApi['exportProgress']
        })
        return
      }
      // const fileName = this.setFileName(row)
      const fileName = row.fileName
      const apiParams = {
        fileName: fileName,
        fileAddress: row.fileAddress,
        ...this.billParams
      }
      this.downloadExcelFile(this.billApi['exportExcel'], apiParams)
    },

    async getExportProgress(row) {
      try {
        let param = {
          ...this.queryParams,
          templateId: row.id
        }
        if (this.exportExcelRangeRadio === 'checkedItem') {
          param = { ...param, ...this.exportExcelMultipleSelectionParam }
        }
        const {
          data: { code, data: taskId }
        } = await this.billApi.exportTaskId(param)
        if (code === '200') {
          this.timer = setInterval(async () => {
            const {
              data: { code, data }
            } = await this.billApi.exportProgress(taskId)
            if (code === '200') {
              this.exportExcelDetail = data
              this.exportProgressVisible = true
            }
          }, 1000)
        }
      } catch (error) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    // excel默认导出
    EXCELDefaultExport() {
      const apiParams = {
        fileName: '默认Excel导出.xlsm',
        fileAddress: '',
        ...this.billParams
      }
      this.downloadExcelFile(this.billApi['exportExcel'], apiParams)
    },
    handleSelectExportRange(row) {
      this.EXCELExportRow = row
      if (this.fileParams.otherParams?.isShowSelectExportRangeDialog) {
        this.selectExportRangeDialogVisible = true
      } else {
        this.EXCELExport(row)
      }
    },
    // 确认选择导出范围
    handleConfirmSelectExportRange(val) {
      this.exportExcelRangeRadio = val
      if (val === 'all') {
        // 全部
        this.EXCELExport(this.EXCELExportRow)
      } else if (val === 'checkedItem') {
        // 选中项
        // 判断是否勾选数据
        if (
          !this.fileParams.otherParams.multipleSelection ||
          this.fileParams.otherParams.multipleSelection.length <= 0
        ) {
          this.$notify({
            title: '提示',
            message: '未勾选数据，无法导出',
            type: 'warning',
            duration: 2000
          })
        } else {
          this.EXCELExport(this.EXCELExportRow)
        }
      }
      this.handleCancelSelectExportRange()
    },
    handleCancelSelectExportRange() {
      this.selectExportRangeDialogVisible = false
    }
  }
}
</script>

<style lang="scss">
.attachment-dialog {
  .base-info {
    padding: 0 !important;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    padding-bottom: 20px;
    ::v-deep .el-table--border {
      border-bottom: 1px solid #dfe6ec;
    }
    .action {
      display: flex;
    }
    .edit-text {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #1890ff;
      opacity: 1;
      padding: 0 3px;
      border-radius: 4px;
      cursor: pointer;
    }
    .delete-text {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #ff4949;
      border-radius: 4px;
      opacity: 1;
      padding: 0 3px;
      cursor: pointer;
    }
    .edit-text:hover,
    .delete-text:hover {
      background-color: rgba(24, 144, 255, 0.2);
    }
    .upload-file {
      margin-bottom: 10px;

      .tips {
        p {
          span {
            color: #1890ff;
          }
        }
        //   display: inline-block;
        //   font-size: 12px;
        //   padding: 10px;
        //   letter-spacing: 1px;
        //   font-family: Source Han Sans CN;
      }

      .action {
        display: flex;
        font-family: Source Han Sans CN;
        letter-spacing: 1px;
        align-items: center;
        font-size: 12px;
      }
    }
  }
}
</style>
