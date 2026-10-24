<template>
  <div class="container1-3">
    <div v-loading="fullscreenLoading" class="bg-box">
      <div class="table-top">
        <div class="title-table level">
          <div class="uploadTotal">
            <el-upload
              ref="bulkUpload"
              class="upload-demo"
              action="#"
              :limit="1"
              :before-upload="handleBulkImportChange"
              :on-remove="handleBulkRemove"
              :file-list="bulkImportList"
              :http-request="bulkAttachmentRequest"
              :show-file-list="false"
            >
              <el-button size="small" type="primary">导入预览</el-button>
            </el-upload>
            <el-button
              :disabled="flag"
              type="primary"
              style="color: #ffffff"
              class="top-btn uploadBtn"
              @click="importModel()"
            >
              确定导入
            </el-button>
            <el-button size="small" type="primary" @click="back">返回</el-button>
          </div>
        </div>
      </div>
      <p class="Ptitle">可导入的数据</p>
      <div class="tablebox">
        <el-table
          :data="importResult"
          style="width: 100%"
          :header-cell-style="{
            background: '#FAFAFA',
            color: '#000000',
            'font-family': 'Source Han Sans CN',
            'font-size': '14px'
          }"
          height="100%"
          highlight-current-row
        >
          <el-table-column label="检验项目记录ID" prop="ID" />
          <el-table-column label="检验项目组" prop="inspectionItemGroupName" />
          <el-table-column label="检验方法判定" prop="determinationOfDetectionMethodName" />
          <el-table-column label="检验项目名称" prop="inspectionItemName" />
          <el-table-column label="检验标准" prop="verificationBasis" />
          <el-table-column label="检验方法" prop="verificationMethod" />
          <el-table-column label="校验仪器" prop="verificationInstrument" />
          <el-table-column label="单位" prop="unit" />
          <el-table-column label="比较符" prop="comparatorName" />
          <el-table-column label="标准值/边界值" prop="referenceValue" />
          <el-table-column label="下限值" prop="downLimitValue" />
          <el-table-column label="上限值" prop="upperLimitValue" />
          <el-table-column label="是否生成检验报告" prop="isExportName" width="200" />
          <el-table-column label="输入方式" prop="inputMode" />
          <el-table-column label="可选值" prop="optionalValue" />
        </el-table>
      </div>
      <p class="Ptitle">不可导入的数据</p>
      <div class="tablebox">
        <el-table
          highlight-current-row
          :data="wrongList"
          style="width: 100%"
          :header-cell-style="{
            background: '#FAFAFA',
            color: '#000000',
            'font-family': 'Source Han Sans CN',
            'font-size': '14px'
          }"
          height="100%"
        >
          <el-table-column label="检验项目记录ID" prop="ID" />
          <el-table-column label="检验项目组" prop="inspectionItemGroupName" />
          <el-table-column label="检验方法判定" prop="determinationOfDetectionMethodName" />
          <el-table-column label="检验项目名称" prop="inspectionItemName" />
          <el-table-column label="检验标准" prop="verificationBasis" />
          <el-table-column label="检验方法" prop="verificationMethod" />
          <el-table-column label="校验仪器" prop="verificationInstrument" />
          <el-table-column label="单位" prop="unit" />
          <el-table-column label="比较符" prop="comparatorName" />
          <el-table-column label="标准值/边界值" prop="referenceValue" />
          <el-table-column label="下限值" prop="downLimitValue" />
          <el-table-column label="上限值" prop="upperLimitValue" />
          <el-table-column label="是否生成检验报告" prop="isExportName" width="200" />
          <el-table-column label="输入方式" prop="inputMode" />
          <el-table-column label="可选值" prop="optionalValue" />
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  previewFileParams, // 预览导入
  fileSureImportList // 确定导入
} from '@/api/quality-manage'
export default {
  data() {
    return {
      importFile: '', // 导入文件
      wrongList: [],
      importList: [],
      flag: true,
      activeName: 'qualityDefinition',
      fullscreenLoading: false,
      bulkImportList: [],
      importResult: [], // 可导入
      wrongResult: [] // 不可导入
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 页面初始化
    init() {
      const { name } = this.$route.query || {}
      this.activeName = name
    },
    // 导入文件
    async bulkAttachmentRequest(params) {
      this.fullscreenLoading = true
      const fd = new FormData()
      fd.append('file', params.file)
      const result = await previewFileParams(fd)
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        this.fullscreenLoading = false
        const { importResult, wrongResult } = data || {}
        this.importResult = importResult
        this.flag = importResult.length === 0
        this.wrongList = wrongResult
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 导入前
    handleBulkImportChange() {},
    // 移除
    handleBulkRemove() {},
    // 确认导入
    async importModel() {
      this.flag = true
      const result = await fileSureImportList(this.importResult)
      this.flag = false
      const { code, message } = result.data || {}
      if (+code === 200) {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'success',
          duration: 2000
        })
        this.back()
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 回退
    back() {
      this.$router.push({
        path: `/inspection-manage/productInspection/project`,
        query: {
          activeName: this.activeName
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.uploadTotal {
  margin-left: 10px;
  display: flex;
  .uploadBtn {
    margin-left: 10px;
    padding: 5px;
    text-align: center;
  }
  .fileName2 {
    color: #1890ff;
  }
}
.Ptitle {
  font-size: 18px;
  font-weight: 500;
  margin-left: 20px;
}
</style>
