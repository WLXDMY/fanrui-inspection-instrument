<!--
 * @Author: shunhua.liang
 * @Date: 2022-03-28 11:21:16
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-10-12 18:02:52
 * @Description: 检验项目-附件列表
-->

<template>
  <div class="base-info">
    <section v-if="type !== 'detail'" class="upload-file">
      <div class="base-info-title">{{ title }}</div>
      <el-upload
        action=""
        :before-upload="handleBeforeUpload"
        :http-request="handleUpload"
        :limit="10"
        :on-exceed="handleExceed"
        :file-list="fileUrl"
        :show-file-list="false"
        :disabled="disabledUploadBtn || tableData.length >= 10"
        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pps"
      >
        <el-button
          style="margin-right: 12px"
          size="small"
          type="primary"
          :disabled="disabledUploadBtn || initStatus === 1 || tableData.length >= 10"
        >
          点击上传
        </el-button></el-upload
      >
      <el-tooltip placement="right" effect="dark" hide-after="0">
        <div slot="content" class="attachment-tip">
          <div>提示：</div>
          <div>最多支持上传10个文件，单个文件最大50MB，支持文件</div>
          <div>类型：jpg、jpeg、png、pdf、doc、docx、xls、xlsx、</div>
          <div>ppt、pptx、pps。</div>
        </div>
        <i class="el-icon-warning-outline" clsss="sampleIdentification-icon" />
      </el-tooltip>
    </section>
    <el-table :data="tableData" style="width: 100%" border highlight-current-row>
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
          <el-button :disabled="!enableView(row) || isDetailType" type="text" @click="view(row)">查看</el-button>
          <el-button :disabled="isDetailType" type="text" @click="download(row)">下载</el-button>
          <el-button
            v-if="!isDetailType"
            :disabled="initStatus === 1"
            type="text"
            class="delete-button"
            @click="deleteAttach(row, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <ViewImagesDialog v-if="visible" :visible="visible" :image-list="imageList" @closeDailog="closeDailog" />
  </div>
</template>

<script>
import { uploadFile } from '@/api/quality-manage.js'
export default {
  components: {
    ViewImagesDialog: () => import('@/components/ViewImagesDialog')
  },
  props: {
    // 附件数组
    itemFileList: {
      type: Array
    },
    disabledUploadBtn: {
      type: Boolean,
      default: true
    },
    initStatus: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: [],
      fileUrl: [],
      type: '',
      loadingData: false,
      visible: false,
      imageList: []
    }
  },
  computed: {
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    },
    isDetailType() {
      return this.$route.name.includes('Detail')
    }
  },
  watch: {
    itemFileList: {
      handler(val) {
        this.tableData = val || []
      },
      deep: true,
      immediate: true
    },
    tableData: {
      handler(val) {
        this.$emit('update:itemFileList', this.tableData)
      },
      deep: true,
      immediate: true
    }
  },
  beforeDestroy() {},
  created() {},
  methods: {
    // 数据回显
    handleEcho(data) {
      this.tableData = data
    },
    closeDailog() {
      this.visible = false
      this.imageList = []
    },
    enableView(row) {
      return /\.(jpg|jpeg|png|gif|bmp|svg|mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(row.fileUrl)
    },
    download(row) {
      this.downloadFile(row.fileUrl, row.fileName)
    },
    downloadFile(url, name) {
      if (!url) return
      const link = document.createElement('a') // 创建a标签
      link.style.display = 'none' // 使其隐藏
      link.href = '/' + url // 赋予文件下载地址
      link.setAttribute('download', name) // 设置下载属性 以及文件名
      document.body.appendChild(link) // a标签插至页面中
      link.click() // 强制触发a标签事件
      document.body.removeChild(link)
    },
    // 查看
    view(row) {
      const { fileUrl } = row
      // 如果是图片
      if (/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(fileUrl)) {
        this.imageList = [location.origin + '/' + fileUrl]
        this.visible = true
        // 视频 或者pdf
      } else if (/\.(mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(fileUrl)) {
        window.open(location.origin + '/' + fileUrl, '_blank')
      }
    },
    // 序号
    serialNumber(row) {
      return +row + 1
    },
    // 上传文件
    async handleUpload(params) {
      const formData = new FormData()
      formData.append('file', params.file)
      const {
        data: { data }
      } = await uploadFile(formData)
      this.addFile(data)
    },
    addFile(data) {
      const {
        name,
        fullPath,
        metaDataEntity: { lastModified }
      } = data
      try {
        this.tableData.push({
          fileName: name,
          fileUrl: fullPath,
          createByName: JSON.parse(sessionStorage.getItem('userInfo'))?.nickname || '',
          createTime: lastModified
        })
      } catch (error) {
        console.log('🚀 ~ handleUpload ~ error:', error)
      }
    },

    // 删除
    deleteAttach(value, index) {
      this.$confirm('删除附件? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.tableData.splice(index, 1)
      })
    },
    handleExceed() {
      this.$message.warning('最多上传 10 个文件')
    },
    handleBeforeUpload(file) {
      const maxSize = 50 * 1024 * 1024 // 50MB 设置最大文件大小
      if (file.size > maxSize) {
        this.$message.warning(`文件大小超过了${maxSize / (1024 * 1024)}MB的限制`)
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-info {
  padding: 0 !important;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  padding-bottom: 20px;
  padding-top: 10px !important;
  .base-info-title {
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 500;
    font-size: 16px;
    color: #333333;
    margin-right: 10px;
  }
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
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ff4949;
    opacity: 1;
    padding: 0 3px;
    border-radius: 4px;
    cursor: pointer;
  }
  .upload-file {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-left: 10px;
    .tips {
      display: inline-block;
      font-size: 12px;
      padding: 10px;
      letter-spacing: 1px;
      font-family: Source Han Sans CN;
      margin-left: 12px;
    }
  }
}
.delete-button {
  ::v-deep span {
    color: red !important;
    // font-size: 16px;
  }
}
.attachment-tip {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
}
</style>
