<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-10 11:03:27
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-11 14:18:44
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\defectRecords\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-if="!noSelectRow" class="defectRecords scroll">
    <section class="centerArea">
      <div class="button-head">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          :disabled="isDetailType"
          @click="showDefectDialog = true"
        >新增缺陷</el-button>
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multipleDefect.length === 0 || isDetailType"
          @click="deleteDefect"
        >
          删除缺陷
        </el-button>

        <!-- 用于判断是否选中缺陷行 -->
        <el-button
          v-if="!isDefectCurrentRowShow"
          plain
          size="mini"
          type="primary"
          :disabled="isDetailType || attachmentLength"
          @click="beforeUploadHandle"
        >上传附件
        </el-button>
        <el-upload
          action=""
          :before-upload="handleBeforeUpload"
          :http-request="params => handleUpload(params)"
          :show-file-list="false"
          style="margin: 0 10px"
          :limit="10"
          :on-exceed="handleExceed"
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pps"
        >
          <el-button
            v-if="isDefectCurrentRowShow"
            plain
            size="mini"
            type="primary"
            :disabled="isDetailType || attachmentLength"
            :loading="loadingUpload"
          >上传附件
          </el-button>
        </el-upload>
        <el-tooltip placement="right" effect="dark" hide-after="0">
          <div slot="content" class="attachment-tip">
            <div>提示：</div>
            <div>最多支持上传10个文件，单个文件最大50MB，支持文件</div>
            <div>类型：jpg、jpeg、png、pdf、doc、docx、xls、xlsx、</div>
            <div>ppt、pptx、pps。</div>
          </div>
          <i class="el-icon-warning-outline" clsss="sampleIdentification-icon" />
        </el-tooltip>
      </div>
      <DefectTable
        :table-data="currentRow.materialDefects"
        :columns="columns"
        :multiple-defect.sync="multipleDefect"
        :defect-current-row.sync="defectCurrentRow"
      >
        <!-- 缺陷分析 -->
        <template #researchReviewFlag="{ row }">
          <el-checkbox v-model="row.researchReviewFlag" :disabled="isDetailType" :true-label="1" :false-label="0" />
        </template>
        <!-- 样本码 -->
        <template #productCodes="{ row }">
          <el-input v-model="row.productCodes" size="small" :disabled="isDetailType" />
        </template>
        <template #defectNum="{ row }">
          <el-input v-model="row.defectNum" type="number" size="small" :disabled="isDetailType" />
        </template>
        <template #defectLevel="{ row }">
          <el-select v-model="row.defectLevel" placeholder="请选择" :disabled="isDetailType" clearable>
            <el-option v-for="(item, index) in defectLevelEnums" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </template>
        <!-- 缺陷原因 -->
        <template #defectReasonCode="{ row }">
          <el-select v-model="row.defectReasonCode" placeholder="请选择" :disabled="isDetailType" clearable>
            <el-option
              v-for="(item, index) in defectReasonEnums"
              :key="index"
              :label="item.reasonName"
              :value="item.reasonCode"
            />
          </el-select>
        </template>
        <!-- 缺陷后果 -->
        <template #defectResultCode="{ row }">
          <el-select v-model="row.defectResultCode" placeholder="请选择" :disabled="isDetailType" clearable>
            <el-option
              v-for="(item, index) in defectResultEnums"
              :key="index"
              :label="item.resultName"
              :value="item.resultCode"
            />
          </el-select>
        </template>
        <template #correctiveMeasure="{ row }">
          <el-input v-model="row.correctiveMeasure" size="small" :disabled="isDetailType" />
        </template>
        <template #remark="{ row }">
          <el-input v-model="row.remark" size="small" :disabled="isDetailType" />
        </template>
      </DefectTable>
    </section>
    <section class="centerArea">
      <!-- 项目缺陷-附件 -->
      <div class="attachment-defect-title">缺陷附件</div>
      <el-table
        :header-cell-style="headerCellStyle"
        :data="defectCurrentRow.fileList"
        style="width: 100%"
        border
        highlight-current-row
        :max-height="250"
      >
        <el-table-column prop="date" label="序号" width="120">
          <template slot-scope="scope">
            <span v-text="serialNumber(scope.$index)" />
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="附件名称" />
        <el-table-column prop="createByName" label="上传人" />
        <el-table-column prop="createTime" label="上传时间" />
        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-button :disabled="!enableView(row)" type="text" @click="view(row)">查看</el-button>
            <el-button type="text" @click="download(row)">下载</el-button>
            <el-button
              v-if="!isDetailType"
              type="text"
              class="delete-button"
              @click="deleteAttach(row, $index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <ConsolidatedRecords v-if="!isAddType" :row-id="currentRow.id" />
    <CommonSelectDialogPlus
      v-if="showDefectDialog"
      title="选择缺陷"
      :request-config="{
        url: 'qms/product/v1/defects/list',
        method: 'post'
      }"
      :extra-params="{ statues: [1] }"
      :column-config="tableDefectColumn"
      :visible="showDefectDialog"
      :append-to-body="true"
      @confirm="handleDefectConfirm"
      @cancel="showDefectDialog = false"
    />

    <ViewImagesDialog v-if="imageVisible" :visible="imageVisible" :image-list="imageList" @closeDailog="closeDailog" />
  </div>
</template>
<script>
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import DefectTable from '../inspectionItems/inspectionSample/newDefectTable.vue'
import ConsolidatedRecords from './consolidatedRecords.vue'
import { LIST, DefectColumn } from '../inspectionItems/inspectionSample/constant'
import { getDefectEnums, deleteMaterialDefete, uploadFile, deleteInspectFile } from '@/api/quality-manage.js'
import ViewImagesDialog from '@/components/ViewImagesDialog'
import { USE_DEFECTS_REASON_API } from '@/api/defectReason.js' // 缺陷原因
import { USE_DEFECTS_RESULT_API } from '@/api/defectResult.js' // 缺陷后果
const DEFECTS_REASON_API = USE_DEFECTS_REASON_API()
const DEFECTS_RESULT_API = USE_DEFECTS_RESULT_API()

export default {
  name: 'DefectRecords',
  components: { DefectTable, CommonSelectDialogPlus, ConsolidatedRecords, ViewImagesDialog },
  inject: ['sheetInitStatus'],
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    },
    clickIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      columns: LIST,
      multipleDefect: [],
      tableDefectColumn: DefectColumn,
      showDefectDialog: false,
      loadingUpload: false,
      defectLevelEnums: [],
      defectReasonEnums: [],
      defectResultEnums: [],
      imageVisible: false,
      imageList: [],
      headerCellStyleDefault: {
        background: '#F1F5FC',
        color: '#333333',
        'font-family': 'Source Han Sans CN',
        'font-weight': '400'
      },
      // 项目缺陷选中的行
      defectCurrentRow: {}
    }
  },
  computed: {
    noSelectRow() {
      return this.clickIndex === -1
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    },
    attachmentLength() {
      const result = this.currentRow && this.defectCurrentRow.fileList && this.defectCurrentRow.fileList.length >= 10
      return result
    },
    isDefectCurrentRowShow() {
      if (Object.keys(this.defectCurrentRow).length === 0) {
        return false
      }
      return true
    }
  },
  watch: {},
  created() {
    this.getDefectEnums()
    this.getDefectsReasonEnums()
    this.getDefectsResultEnums()
    // this.columns = [...LIST]
    // this.columns.shift()
  },
  mounted() {},
  methods: {
    // 权限等级
    async getDefectEnums() {
      const result = await getDefectEnums()
      const { data } = result.data || {}
      this.defectLevelEnums = data || []
    },
    // 缺陷原因
    async getDefectsReasonEnums() {
      const params = {
        current: 1,
        size: 999,
        statues: [1]
      }
      const result = await DEFECTS_REASON_API.getDefectsListApi(params)
      this.defectReasonEnums = result.data && result.data.data ? result.data.data.records : []
    },
    // 缺陷后果
    async getDefectsResultEnums() {
      const params = {
        current: 1,
        size: 999,
        statues: [1]
      }
      const result = await DEFECTS_RESULT_API.getDefectsListApi(params)
      this.defectResultEnums = result.data && result.data.data ? result.data.data.records : []
    },
    // 切换行
    changeRow(flag) {
      this.$emit('changeRow', flag)
    },
    // 缺陷弹窗确认
    handleDefectConfirm(rows) {
      const arr = rows.map(row => {
        return {
          defectName: row.name,
          defectCode: row.code,
          defectTypeCode: row.defectTypeCode,
          defectTypeName: row.defectTypeName
        }
      })
      this.currentRow.materialDefects.push(...arr)
      this.showDefectDialog = false
    },
    // 删除缺陷
    deleteDefect() {
      const deleteIds = this.multipleDefect.map(item => item.id).filter(item => !isNaN(item))
      this.$confirm('删除缺陷? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (deleteIds.length > 0) {
          deleteMaterialDefete(deleteIds).then(_ => {
            this.$message.success('删除成功')
            this.currentRow.materialDefects = this.currentRow.materialDefects.filter(item => {
              return this.multipleDefect.indexOf(item) === -1
            })
          })
        } else {
          this.currentRow.materialDefects = this.currentRow.materialDefects.filter(item => {
            return this.multipleDefect.indexOf(item) === -1
          })
          this.$message.success('删除成功')
        }
      })
    },
    // 判断附件类型
    getAttachmentType(row) {
      const { fileUrl } = row
      // 图片
      if (/\.(jpg|jpeg|png)$/i.test(fileUrl)) {
        return this.attachmentType.image
      } else if (/\.(pdf)$/i.test(fileUrl)) {
        return this.attachmentType.pdf
      } else if (/\.(doc|docx)$/i.test(fileUrl)) {
        return this.attachmentType.doc
      } else if (/\.(xls|xlsx)$/i.test(fileUrl)) {
        return this.attachmentType.xls
      } else if (/\.(ppt|pptx|pps)$/i.test(fileUrl)) {
        return this.attachmentType.ppt
      }
    },
    enableView(row) {
      return /\.(jpg|jpeg|png|gif|bmp|svg|mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(row.fileUrl)
    },
    // 查看
    view(row) {
      const { fileUrl } = row
      // 如果是图片
      if (/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(fileUrl)) {
        this.imageList = [location.origin + '/' + fileUrl]
        this.imageVisible = true
        // 视频 或者pdf
      } else if (/\.(mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(fileUrl)) {
        window.open(location.origin + '/' + fileUrl, '_blank')
      }
    },
    closeDailog() {
      this.imageVisible = false
      this.imageList = []
    },
    // 下载文件
    download(row) {
      this.downloadFile(row.fileUrl, row.fileName)
    },
    downloadFile(fileUrl, fileName) {
      if (!fileUrl) return
      const suffix = fileUrl.replace(/.+\.(.+)/, (m, v1) => v1)
      const link = document.createElement('a') // 创建a标签
      link.style.display = 'none' // 使其隐藏
      link.href = '/' + fileUrl // 赋予文件下载地址
      link.setAttribute('download', `${fileName}.${suffix}`) // 设置下载属性 以及文件名
      document.body.appendChild(link) // a标签插至页面中
      link.click() // 强制触发a标签事件
      document.body.removeChild(link)
    },
    // 删除附件
    deleteAttach(row, index) {
      this.$confirm('删除附件? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 存在Id
        if (!isNaN(row.id)) {
          deleteInspectFile([row.id]).then(_ => {
            this.$message.success('删除成功')
            this.defectCurrentRow.fileList.splice(index, 1)
          })
        } else {
          this.defectCurrentRow.fileList.splice(index, 1)
        }
      })
    },
    // 上传文件前，做逻辑判断
    beforeUploadHandle() {
      if (Object.keys(this.defectCurrentRow).length === 0) {
        this.$message.warning('请先选择附件所属的缺陷行')
        return false
      }
    },
    handleBeforeUpload(file) {
      const maxSize = 50 * 1024 * 1024 // 50MB 设置最大文件大小
      if (file.size > maxSize) {
        this.$message.warning(`文件大小超过了${maxSize / (1024 * 1024)}MB的限制`)
        return false
      }
    },
    // 上传文件
    async handleUpload(params) {
      this.loadingUpload = true
      const formData = new FormData()
      formData.append('file', params.file)
      const {
        data: { data }
      } = await uploadFile(formData)
      this.addFile(data)
    },
    addFile(data) {
      if (this.defectCurrentRow.fileList === null || !this.defectCurrentRow.fileList) {
        this.defectCurrentRow.fileList = []
      }
      const {
        name,
        fullPath,
        metaDataEntity: { lastModified }
      } = data
      // const { name, fullPath, createUserName, createBy, createTime } = data
      console.log('🚀 ~ handleUpload ~ data:', data)
      try {
        this.defectCurrentRow.fileList.push({
          fileName: name,
          fileUrl: fullPath,
          compactor: JSON.parse(sessionStorage.getItem('userInfo'))?.nickname || '',
          createTime: lastModified,
          fileType: 'defectFile'
        })
        this.loadingUpload = false
      } catch (error) {
        console.log('🚀 ~ handleUpload ~ error:', error)
      }
    },
    handleExceed() {
      this.$message.warning('最多上传 10 个文件')
    },
    // 项目缺陷-附件
    // 序号
    serialNumber(row) {
      return +row + 1
    },
    // 表格样式
    headerCellStyle({ row, colunm, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        // 这里为了是将第二列的表头隐藏，就形成了合并表头的效果
        return { display: 'none' }
      }
      return { ...this.headerCellStyleDefault }
    }
  }
}
</script>

<style lang="scss" scoped>
// 添加滚动条
.scroll {
  overflow: auto;
}
.scroll::-webkit-scrollbar {
  height: 8px; /* 设置滚动条的高度 */
  width: 8px; /* 设置滚动条的宽度 */
}
.defectRecords {
  .centerArea {
    // box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    // border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 0px;
    // margin-bottom: 10px;
    .button-head {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
  }
}
.attachment-defect-title {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  margin: 0px 0 12px 0;
}
.delete-button {
  color: red;
}
::v-deep .el-input__inner {
  height: 32px;
}
.attachment-tip {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
}
</style>
