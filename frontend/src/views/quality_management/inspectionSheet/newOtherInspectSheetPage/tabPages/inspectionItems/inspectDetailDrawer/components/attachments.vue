<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-10 11:03:27
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-10-14 11:09:00
-->
<template>
  <div>
    <section class="centerArea" style="margin-top: 10px">
      <div class="centerArea-title">检验项指导文件</div>
      <!-- 附件列表 -->
      <div class="attachments-all">
        <div v-for="(item, index) in currentItemRow.itemGuidanceFileList" :key="index" class="attachments">
          <div class="attachments-type">
            <img :src="getAttachmentType(item)" alt="" width="16" height="18" />
          </div>
          <div class="attachments-text">{{ item.fileName }}</div>
          <div class="attachments-icon">
            <span v-if="enableView(item)" class="attachments-icon-gutter" @click="view(item)"
              ><img src="@/assets/images/common/eye.png" alt="" width="16" height="12"
            /></span>
            <span class="attachments-icon-gutter" @click="download(item)"
              ><img src="@/assets/images/common/download.png" alt="" width="12" height="12"
            /></span>
          </div>
        </div>
      </div>
      <el-divider />
    </section>

    <section class="centerArea" style="margin-top: 10px">
      <div class="title-start centerArea-title2">
        检验附件
        <el-upload
          action=""
          :before-upload="handleBeforeUpload"
          :http-request="params => handleUpload(params, '')"
          :show-file-list="false"
          style="margin: 0 10px"
          :limit="10"
          :on-exceed="handleExceed"
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pps"
        >
          <el-button
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
      <!-- 附件列表 -->
      <div class="attachments-all">
        <div v-for="(item, index) in currentItemRow.itemExecuteFileList" :key="index" class="attachments">
          <div class="attachments-type">
            <img :src="getAttachmentType(item)" alt="" width="16" height="18" />
          </div>
          <div class="attachments-text">{{ item.fileName }}</div>
          <div class="attachments-icon">
            <span v-if="enableView(item)" class="attachments-icon-gutter" @click="view(item)"
              ><img src="@/assets/images/common/eye.png" alt="" width="16" height="12"
            /></span>
            <span class="attachments-icon-gutter" @click="download(item)"
              ><img src="@/assets/images/common/download.png" alt="" width="12" height="12"
            /></span>
            <span v-if="!isDetailType" @click="deleteAttach(item, index)"
              ><img src="@/assets/images/common/attachments-delete.png" alt=" " width="12" height="12"
            /></span>
          </div>
        </div>
      </div>
    </section>

    <ViewImagesDialog v-if="imageVisible" :visible="imageVisible" :image-list="imageList" @closeDailog="closeDailog" />
  </div>
</template>
<script>
import { deleteInspectFile, uploadFile } from '@/api/quality-manage.js'
import ViewImagesDialog from '@/components/ViewImagesDialog'

export default {
  name: 'InspectDetailDrawer',
  components: { ViewImagesDialog },
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
      imageVisible: false,
      imageList: [],
      loadingUpload: false,
      attachmentType: {
        image: require('../../../../../../../../assets/images/common/image.png'),
        pdf: require('../../../../../../../../assets/images/common/pdf.png'),
        doc: require('../../../../../../../../assets/images/common/doc.png'),
        xls: require('../../../../../../../../assets/images/common/xls.png'),
        ppt: require('../../../../../../../../assets/images/common/ppt.png')
      }
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
        this.currentItemRow &&
        this.currentItemRow.itemExecuteFileList &&
        this.currentItemRow.itemExecuteFileList.length >= 10
      return result
    }
  },
  watch: {},
  created() {},
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 1500)
    }
  },
  methods: {
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
            this.currentItemRow.itemExecuteFileList.splice(index, 1)
            this.$forceUpdate()
          })
        } else {
          this.currentItemRow.itemExecuteFileList.splice(index, 1)
          this.$forceUpdate()
        }
      })
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
      if (this.currentItemRow.itemExecuteFileList === null || !this.currentItemRow.itemExecuteFileList) {
        this.currentItemRow.itemExecuteFileList = []
      }
      const { name, fullPath, createUserName, createBy, createTime } = data
      try {
        this.currentItemRow.itemExecuteFileList.push({
          fileName: name,
          fileUrl: fullPath,
          compactor: JSON.parse(sessionStorage.getItem('userInfo'))?.username || '',
          remark: '',
          createByName: createUserName,
          createBy,
          createTime,
          fileType: 'checkItemFile'
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
  margin-bottom: 12px;
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
  left: 0px;
  top: 2px;
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
  left: 0px;
  top: 6px;
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
.attachment-tip {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
}
</style>
