<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-10 11:03:27
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-16 10:52:49
-->
<template>
  <div>
    <div>
      <DefectTable
        :table-data="currentItemRow.itemDefects"
        :columns="columns"
        :multiple-defect.sync="multipleDefect"
        :defect-current-row.sync="defectCurrentRow"
      >
        <!-- 缺陷分析 -->
        <template #researchReviewFlag="{ row }">
          <el-checkbox v-model="row.researchReviewFlag" :disabled="isDetailType" :true-label="1" :false-label="0" />
        </template>

        <template #productCodes="{ row }"> <el-input v-model="row.productCodes" size="small" /> </template>
        <template #defectNum="{ row }">
          <el-input v-model="row.defectNum" type="number" size="small" />
        </template>
        <template #defectLevel="{ row }">
          <el-select v-model="row.defectLevel" placeholder="请选择" clearable>
            <el-option v-for="(item, index) in defectLevelEnums" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </template>
        <!-- 缺陷原因 -->
        <template #defectReasonCode="{ row }">
          <el-select v-model="row.defectReasonCode" placeholder="请选择" clearable>
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
          <el-select v-model="row.defectResultCode" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in defectResultEnums"
              :key="index"
              :label="item.resultName"
              :value="item.resultCode"
            />
          </el-select>
        </template>
        <template #correctiveMeasure="{ row }">
          <el-input v-model="row.correctiveMeasure" size="small" />
        </template>
        <template #remark="{ row }">
          <el-input v-model="row.remark" size="small" />
        </template>
      </DefectTable>

      <!-- 按钮 -->
      <div class="button-head">
        <!-- 缺陷记录 -->
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          :disabled="isDetailType"
          @click="showDefectDialog = true"
          >新增缺陷</el-button
        >
        <el-button type="primary" plain icon="el-icon-plus" size="mini" :disabled="isDetailType" @click="openBatch"
          >批量标记样本码</el-button
        >
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
          :disabled="isDetailType || itemExecuteFileListLength"
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
            :disabled="isDetailType || itemExecuteFileListLength"
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

      <!-- 项目缺陷-附件 -->
      <div class="attachment-defect-title">缺陷附件</div>
      <el-table
        :data="defectCurrentRow.fileList"
        style="width: 100%"
        border
        highlight-current-row
        :max-height="250"
        :header-cell-style="headerCellStyle"
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
              :disabled="isDetailType"
              type="text"
              class="delete-button"
              @click="deleteAttach(row, $index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

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

    <el-dialog title="批量标记样本码" :visible.sync="dialogVisible" width="30%" append-to-body>
      <div class="defectDialog">
        单品码：
        <el-input v-model="batchCode" placeholder="请输入内容" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBatch">确 定</el-button>
      </span>
    </el-dialog>

    <ViewImagesDialog v-if="imageVisible" :visible="imageVisible" :image-list="imageList" @closeDailog="closeDailog" />
  </div>
</template>
<script>
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import DefectTable from '@/views/quality_management/inspectionSheet/newInspectionSheetPage/tabPages/inspectionItems/inspectionSample/defectTable.vue'
import {
  LIST,
  DefectColumn
} from '@/views/quality_management/inspectionSheet/newInspectionSheetPage/tabPages/inspectionItems/inspectionSample/constant.js'
import {
  getDefectEnums,
  deleteItemDefete,
  getComparisonOperatorsList,
  deleteInspectFile,
  uploadFile
} from '@/api/quality-manage.js'
import ViewImagesDialog from '@/components/ViewImagesDialog'
//  抽样表格列数据
import { CHECK_STANDARDS_TABLE } from '@/views/quality_management/inspectionProgram/components/tabPages/constant.js'
import { USE_DEFECTS_REASON_API } from '@/api/defectReason.js' // 缺陷原因
import { USE_DEFECTS_RESULT_API } from '@/api/defectResult.js' // 缺陷后果
const DEFECTS_REASON_API = USE_DEFECTS_REASON_API()
const DEFECTS_RESULT_API = USE_DEFECTS_RESULT_API()

export default {
  name: 'InspectDetailDrawer',
  components: { CommonSelectDialogPlus, DefectTable, ViewImagesDialog },
  inject: ['sheetInitStatus'],
  props: {
    currentItemRow: {
      type: Object,
      default: () => {}
    },
    clickIndex: {
      type: Number,
      default: -1
    },

    // 分录明细行
    currentRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tabValue: 'info',
      columns: LIST,
      multipleDefect: [],
      tableDefectColumn: DefectColumn,
      showDefectDialog: false,
      defectLevelEnums: [],
      defectReasonEnums: [],
      defectResultEnums: [],
      dialogVisible: false,
      batchCode: '',
      checked: false,
      showDialog: false,
      tableColumn: CHECK_STANDARDS_TABLE,
      comparatorList: [], // 比较符list
      imageVisible: false,
      imageList: [],
      loadingUpload: false,
      attachmentType: {
        image: require('../../../../../../../../assets/images/common/image.png'),
        pdf: require('../../../../../../../../assets/images/common/pdf.png'),
        doc: require('../../../../../../../../assets/images/common/doc.png'),
        xls: require('../../../../../../../../assets/images/common/xls.png'),
        ppt: require('../../../../../../../../assets/images/common/ppt.png')
      },
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
    itemExecuteFileListLength() {
      const result =
        this.currentItemRow && this.defectCurrentRow.fileList && this.defectCurrentRow.fileList.length >= 10
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
    this.getComparison()
  },
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 1500)
    }
  },
  methods: {
    // 获取比较符
    async getComparison() {
      const result = await getComparisonOperatorsList()
      const { data } = result.data || {}
      this.comparatorList = data || []
    },
    handleClose(done) {
      this.$emit('cancel')
      done()
    },
    cancelForm() {
      this.$emit('cancel')
    },
    confirmForm() {
      this.$emit('confirm')
      this.$emit('cancel')
    },
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
      this.currentItemRow.itemDefects.push(...arr)
      this.showDefectDialog = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 删除缺陷
    deleteDefect() {
      const deleteIds = this.multipleDefect.map(item => item.id).filter(item => !isNaN(item))
      this.$confirm('删除项目缺陷? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (deleteIds.length > 0) {
          deleteItemDefete(deleteIds).then(_ => {
            this.$message.success('删除成功')
            this.currentItemRow.itemDefects = this.currentItemRow.itemDefects.filter(item => {
              return this.multipleDefect.indexOf(item) === -1
            })
          })
        } else {
          this.currentItemRow.itemDefects = this.currentItemRow.itemDefects.filter(item => {
            return this.multipleDefect.indexOf(item) === -1
          })
          this.$message.success('删除成功')
        }
      })
    },
    // 打开批量标记弹窗
    openBatch() {
      if (this.multipleDefect.length === 0) {
        this.$message.warning('请选择缺陷')
        return
      }
      this.dialogVisible = true
    },
    // 批量标记样本码确定
    confirmBatch() {
      console.log('🚀 ~ confirmBatch ~  this.batchCode:', this.batchCode)
      this.multipleDefect.forEach(item => {
        if (!item.productCodes) {
          this.$set(item, 'productCodes', this.batchCode)
        } else {
          this.$set(item, 'productCodes', item.productCodes + ',' + this.batchCode)
        }
      })
      this.dialogVisible = false
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
          // fileType: 'defectItemFile'
        })
        this.loadingUpload = false
        console.log('上传图片后 :', this.currentItemRow.itemDefectFileList)
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
.drawer-title {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
}
::v-deep .el-drawer__header {
  margin-bottom: 12px;
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  padding: 20px 20px 0 20px;
}
.demo-drawer {
  .demo-drawer__content {
    padding: 0 15px 15px 15px;
  }
  .demo-drawer__footer {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
}
::v-deep .noShowHeader > .el-tabs__header {
  display: none;
}
// 检验信息
.form-box {
  .centerArea {
    ::v-deep .el-form-item {
      display: inline-block;
      margin-bottom: 0px;
    }
    .el-form--inline .el-form-item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: top;
    }
    .gutter {
      margin-bottom: 14px;
    }

    // .centerArea-title {
    //   position: relative;
    //   padding-left: 6px;
    //   margin-bottom: 12px;
    // }
    // .centerArea-title::before {
    //   content: '';
    //   display: inline;
    //   position: absolute;
    //   height: 18px;
    //   width: 3px;
    //   top: 0px;
    //   left: 0px;
    //   background: #548af1;
    // }
    .configuration {
      margin-bottom: 12px;
      .hint {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        font-size: 12px;
        color: #999999;
        margin-left: 23px;
        margin-top: 4px;
      }
    }
  }
}
.check {
  .el-form-item {
    margin-left: 90px;
  }
  ::v-deep .el-form-item__label {
    display: block;
    width: auto !important;
    text-align: left;
  }
}
//去掉number输入框的上下箭头
::v-deep {
  .hide-spinners input::-webkit-outer-spin-button,
  .hide-spinners input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .hide-spinners input[type='number'] {
    -moz-appearance: textfield;
  }
  // 解决input number框输入中文后光标上移的问题
  .hide-spinners .el-input__inner {
    line-height: 1px !important;
  }
}
.button-head {
  margin: 12px 0;
  display: flex;
  align-items: center;
}
::v-deep .el-form-item--medium .el-form-item__content {
  width: 248px;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 248px;
}
::v-deep .el-divider--horizontal {
  margin: 0;
}
.centerArea-title {
  position: relative;
  padding-left: 6px;
  margin-bottom: 12px;
}
.centerArea-title::before {
  content: '';
  display: inline;
  position: absolute;
  height: 20px;
  width: 4px;
  left: -8px;
  top: 4px;
  width: 4px;
  height: 16px;
  background: #1890ff;
  border-radius: 2px 2px 2px 2px;
}
.centerArea-title2 {
  position: relative;
  padding-left: 6px;
  margin-bottom: 12px;
}
.centerArea-title2::before {
  content: '';
  display: inline;
  position: absolute;
  height: 20px;
  width: 4px;
  left: -8px;
  top: 4px;
  width: 4px;
  height: 16px;
  background: #1890ff;
  border-radius: 2px 2px 2px 2px;
}
.title-start {
  display: flex;
  align-items: center;
}
// 附件
.attachments-all {
  display: flex;
  flex-wrap: wrap; /* 允许项目换行 */
  align-items: flex-start; /* 项目在交叉轴上的起点对齐 */
  margin-top: 8px;
  .attachments {
    width: 390px;
    height: 32px;
    background: #f5f7fa;
    border-radius: 2px 2px 2px 2px;
    padding: 6px 10px 6px 8px;
    display: flex;
    align-items: center;
    margin-right: 80px;
    margin-bottom: 10px;
    .attachments-type {
      width: 16px;
      height: 18px;
      margin-right: 8px;
    }
    .attachments-text {
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      font-size: 12px;
      color: #333333;
      flex: 1;
    }
    .attachments-icon-gutter {
      margin-right: 12px;
    }
  }
}
.attachment-defect-title {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  margin: 12px 0;
}
.delete-button {
  color: red;
}
.attachment-tip {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
}
</style>
