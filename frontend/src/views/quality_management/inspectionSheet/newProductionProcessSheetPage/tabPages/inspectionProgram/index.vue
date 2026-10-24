<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-06-04 19:06:53
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-01-06 18:16:30
 * @FilePath:
 * @Description: 综合判定tab
-->
<template>
  <div v-if="!noSelectRow" class="projectIndicator scroll">
    <el-form
      ref="projectForm"
      :inline="true"
      :model="currentRow"
      :rules="rules"
      class="demo-form-inline"
      label-position="right"
      label-width="150px"
    >
      <section class="centerArea check">
        <!-- 检验结果 -->
        <!-- <div>
          <el-upload action="" :http-request="params => handleUpload(params, 'checkFile')" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType">检验附件 </el-button>
          </el-upload>
        </div> -->
        <el-form-item label="判定结果：" prop="checkResult">
          <el-radio-group v-model="currentRow.checkResult" :disabled="isDetailType || checkResultDisabled">
            <el-radio :label="1">合格</el-radio>
            <el-radio :label="0">不合格</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合格率：" prop="passRate">
          {{ currentRow.passRate ? currentRow.passRate + '%' : '0' }}
        </el-form-item>
        <el-form-item label="合格数量：" prop="qualifiedQuantity">
          <el-input
            v-model="currentRow.qualifiedQuantity"
            size="mini"
            :disabled="checkResultDisabled"
            @change="changeNum($event, 'qualifiedQuantity', 'unqualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="不合格数量：" prop="unqualifiedQuantity">
          <el-input
            v-model="currentRow.unqualifiedQuantity"
            size="mini"
            type="number"
            :min="0"
            :disabled="checkResultDisabled"
            @change="changeNum($event, 'unqualifiedQuantity', 'qualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item
          v-if="
            $FC('inspectTime', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('inspectTime', '送检时间')"
          prop="inspectTime"
          :rules="$FR(fieldPath, 'inspectTime')"
        >
          <el-date-picker
            v-model="currentRow.inspectTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="small"
            :disabled="$FC('inspectTime', fullRouteCode, pageFullPathCode)?.isEdit === false"
          />
        </el-form-item>
        <el-form-item label="检验开始时间:">
          <el-date-picker
            v-model="currentRow.inspectBeginTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="small"
          />
        </el-form-item>

        <el-form-item label="检验完成时间:">
          <el-date-picker
            v-model="currentRow.inspectEndTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="small"
          />
        </el-form-item>
        <el-form-item label="耗时时间：" prop="checkConsumerTime">
          <el-input v-model="currentRow.checkConsumerTime" size="mini" :disabled="checkResultDisabled" />
        </el-form-item>
        <el-form-item label="耗时单位：" prop="checkTimeUnit">
          <el-select
            v-model="currentRow.checkTimeUnit"
            placeholder="请选择"
            size="mini"
            :disabled="checkResultDisabled"
            clearable
          >
            <el-option v-for="(item, index) in timeEnums" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="送检人:" prop="inspectPerson">
          <el-select v-model="currentRow.inspectPerson" filterable placeholder="请选择" clearable size="small">
            <el-option
              v-for="(item, index) in checkPeopleList"
              :key="index"
              :label="item.nickname"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
      </section>

      <section class="centerArea check">
        <div class="title-start title2">
          检验附件
          <el-upload
            action=""
            :before-upload="handleBeforeUpload"
            :http-request="params => handleUpload(params, 'checkFile')"
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
        <!-- 附件列表 -->
        <div class="attachments-all">
          <div v-for="(item, index) in currentRow.checkFiles" :key="index" class="attachments">
            <div class="attachments-type">
              <img :src="getAttachmentType(item)" alt="" width="16" height="18">
            </div>
            <div class="attachments-text">{{ item.fileName }}</div>
            <div class="attachments-icon">
              <span
                v-if="enableView(item)"
                class="attachments-icon-gutter"
                @click="view(item)"
              ><img
                src="@/assets/images/common/eye.png"
                alt=""
                width="16"
                height="12"
              ></span>
              <span
                class="attachments-icon-gutter"
                @click="download(item)"
              ><img
                src="@/assets/images/common/download.png"
                alt=""
                width="12"
                height="12"
              ></span>
              <span
                v-if="!isDetailType"
                @click="deleteAttach(item, index)"
              ><img
                src="@/assets/images/common/attachments-delete.png"
                alt=" "
                width="12"
                height="12"
              ></span>
            </div>
          </div>
        </div>
      </section>

      <section v-if="reCheckValue == 1" class="centerArea check">
        <div class="title">
          复核综合判定
          <!-- <el-upload action="" :http-request="params => handleUpload(params, 'reviewFile')" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType"> 复核附件 </el-button>
          </el-upload> -->
        </div>
        <el-form-item class="all-line-width" label="判定结果：" prop="reviewResult">
          <el-radio-group v-model="currentRow.reviewResult" :disabled="isDetailType">
            <el-radio :label="1">合格</el-radio>
            <el-radio :label="0">不合格</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合格数量：" prop="reviewQualifiedQuantity">
          <el-input
            v-model="currentRow.reviewQualifiedQuantity"
            size="mini"
            :disabled="isDetailType"
            @change="changeNum($event, 'reviewQualifiedQuantity', 'reviewUnqualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="不合格数量：" prop="reviewUnqualifiedQuantity">
          <el-input
            v-model="currentRow.reviewUnqualifiedQuantity"
            size="mini"
            :disabled="isDetailType"
            @change="changeNum($event, 'reviewUnqualifiedQuantity', 'reviewQualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="耗时时间：" prop="reviewConsumerTime">
          <el-input v-model="currentRow.reviewConsumerTime" size="mini" :disabled="isDetailType" />
        </el-form-item>
        <el-form-item label="时间单位：" prop="reviewTimeUnit">
          <el-select
            v-model="currentRow.reviewTimeUnit"
            placeholder="请选择"
            size="mini"
            :disabled="isDetailType"
            clearable
          >
            <el-option v-for="(item, index) in timeEnums" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </section>

      <section v-if="approveValue == 1" class="centerArea check">
        <div class="title">
          核准综合判定
          <!-- <el-upload action="" :http-request="params => handleUpload(params, 'authorizeFile')" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType"> 核准附件 </el-button>
          </el-upload> -->
        </div>
        <el-form-item class="all-line-width" label="判定结果：" prop="authorizeResult">
          <el-radio-group v-model="currentRow.authorizeResult" :disabled="isDetailType">
            <el-radio :label="1">合格</el-radio>
            <el-radio :label="0">不合格</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合格数量：" prop="authorizeQualifiedQuantity">
          <el-input
            v-model="currentRow.authorizeQualifiedQuantity"
            size="mini"
            :disabled="isDetailType"
            @change="changeNum($event, 'authorizeQualifiedQuantity', 'authorizeUnqualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="不合格数量：" prop="authorizeUnqualifiedQuantity">
          <el-input
            v-model="currentRow.authorizeUnqualifiedQuantity"
            size="mini"
            :disabled="isDetailType"
            @change="changeNum($event, 'authorizeUnqualifiedQuantity', 'authorizeQualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="耗时时间：" prop="authorizeConsumerTime">
          <el-input v-model="currentRow.authorizeConsumerTime" size="mini" :disabled="isDetailType" />
        </el-form-item>
        <el-form-item label="时间单位：" prop="authorizeTimeUnit">
          <el-select
            v-model="currentRow.authorizeTimeUnit"
            placeholder="请选择"
            size="mini"
            :disabled="isDetailType"
            clearable
          >
            <el-option v-for="(item, index) in timeEnums" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </section>
    </el-form>

    <ViewImagesDialog v-if="visible" :visible="visible" :image-list="imageList" @closeDailog="closeDailog" />
  </div>
</template>
<script>
import { uploadFile, getCheckPerson, deleteInspectFile } from '@/api/quality-manage.js'
import ViewImagesDialog from '@/components/ViewImagesDialog'
import { CHECK_STANDARDS_TABLE } from '../../../../inspectionProgram/components/tabPages/constant.js'
export default {
  name: 'InspectionProgram',
  components: {
    ViewImagesDialog
  },
  inject: ['sheetInitStatus'],
  props: {
    baseForm: {
      type: Object,
      default: () => {}
    },
    currentRow: {
      type: Object,
      default: () => {}
    },
    clickIndex: {
      type: Number,
      default: -1
    },
    initStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      decisionEnums: [],
      tableColumn: CHECK_STANDARDS_TABLE,
      reCheckValue: 0,
      approveValue: 0,
      // 检验结果,复核,核准是否置灰
      checkResultDisabled: false,
      reviewResultDisabled: false,
      authorizeResultDisabled: false,
      checkPeopleList: [], // 送检人
      visible: false,
      imageList: [],
      loadingUpload: false,
      attachmentType: {
        image: require('../../../../../../assets/images/common/image.png'),
        pdf: require('../../../../../../assets/images/common/pdf.png'),
        doc: require('../../../../../../assets/images/common/doc.png'),
        xls: require('../../../../../../assets/images/common/xls.png'),
        ppt: require('../../../../../../assets/images/common/ppt.png')
      },
      timeEnums: [
        {
          label: '秒',
          value: 'seconds'
        },
        {
          label: '分钟',
          value: 'minutes'
        },
        {
          label: '小时',
          value: 'hours'
        },
        {
          label: '天',
          value: 'days'
        }
      ]
    }
  },
  computed: {
    isAddType() {
      return this.$route.name.includes('Add')
    },
    noSelectRow() {
      return this.clickIndex === -1
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    },
    rules() {
      // const { checkResult, reviewResult, authorizeResult } = this.currentRow
      const checkRule = [{ required: true, message: '该参数是必填项' }]
      const rules = {}
      if (this.initStatus !== 3 && this.baseForm.status === 3) {
        rules.checkResult = checkRule
        rules.unqualifiedQuantity = checkRule
        rules.qualifiedQuantity = checkRule
        rules.reviewResult = checkRule
        rules.reviewUnqualifiedQuantity = checkRule
        rules.reviewQualifiedQuantity = checkRule
        rules.authorizeResult = checkRule
        rules.authorizeUnqualifiedQuantity = checkRule
        rules.authorizeQualifiedQuantity = checkRule
      } else {
        rules.checkResult = []
        rules.unqualifiedQuantity = []
        rules.qualifiedQuantity = []
        rules.reviewResult = []
        rules.reviewUnqualifiedQuantity = []
        rules.reviewQualifiedQuantity = []
        rules.authorizeResult = []
        rules.authorizeUnqualifiedQuantity = []
        rules.authorizeQualifiedQuantity = []
      }

      // if (typeof checkResult === 'number') {
      //   rules.unqualifiedQuantity = checkRule
      //   rules.qualifiedQuantity = checkRule
      // } else {
      //   rules.unqualifiedQuantity = []
      //   rules.qualifiedQuantity = []
      // }
      // if (typeof reviewResult === 'number') {
      //   rules.reviewUnqualifiedQuantity = checkRule
      //   rules.reviewQualifiedQuantity = checkRule
      // } else {
      //   rules.reviewUnqualifiedQuantity = []
      //   rules.reviewQualifiedQuantity = []
      // }

      // if (typeof authorizeResult === 'number') {
      //   rules.authorizeUnqualifiedQuantity = checkRule
      //   rules.authorizeQualifiedQuantity = checkRule
      // } else {
      //   rules.authorizeUnqualifiedQuantity = []
      //   rules.authorizeQualifiedQuantity = []
      // }
      return rules
    },
    attachmentLength() {
      const result = this.currentRow && this.currentRow.checkFiles && this.currentRow.checkFiles.length >= 10
      return result
    }
  },
  watch: {
    // 修改了送检数量/合格数量，更新合格率的值
    'currentRow.inspectQuantity'(val) {
      console.log('修改了送检数量', this.currentRow.inspectQuantity)
      console.log('修改 了 送检数量 222', val)
      if (val) {
        this.getQualifiedPercent()
      }
    },
    'currentRow.qualifiedQuantity'(val) {
      console.log('修改了合格数量：', this.currentRow.qualifiedQuantity)
      console.log('修改 了 合格数量： 111', val)
      if (val) {
        this.getQualifiedPercent()
      }
    }
  },
  created() {
    this.getCheckPerson()
  },
  mounted() {
    setTimeout(() => {
      this.getDecideConfig()
    }, 1000)
  },
  methods: {
    // 计算合格率
    getQualifiedPercent() {
      console.log('计算结果 inspectQuantity', this.currentRow.inspectQuantity)
      console.log('计算结果 qualifiedQuantity', this.currentRow.qualifiedQuantity)

      console.log('计算结果 inspectQuantity typeof', typeof this.currentRow.inspectQuantity)
      console.log('计算结果 qualifiedQuantity typeof', typeof this.currentRow.qualifiedQuantity)

      let result = 0
      // if (this.currentRow.inspectQuantity == 0) {
      //   // this.$notify({
      //   //   title: '提示',
      //   //   message: '送检数量不能为0',
      //   //   type: 'error',
      //   //   duration: 2000
      //   // })
      //   // return
      // }
      // if (this.currentRow.inspectQuantity !== 0 && this.currentRow.qualifiedQuantity !== 0) {

      // 都有值的时候
      if (
        typeof this.currentRow.inspectQuantity === 'string' &&
        typeof this.currentRow.qualifiedQuantity === 'string'
      ) {
        result = ((Number(this.currentRow.qualifiedQuantity) / Number(this.currentRow.inspectQuantity)) * 100).toFixed(
          2
        )
        console.log('计算结果 result 222', result)

        // result += '%'
      }
      console.log('计算结果 result', result)

      if (result === 'NaN') {
        result = 0
        console.log('处理NAN', result)
      }
      this.$set(this.currentRow, 'reviewResultPercent', result)
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
        this.visible = true
        // 视频 或者pdf
      } else if (/\.(mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(fileUrl)) {
        window.open(location.origin + '/' + fileUrl, '_blank')
      }
    },
    closeDailog() {
      this.visible = false
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
            this.currentRow.checkFiles.splice(index, 1)
          })
        } else {
          this.currentRow.checkFiles.splice(index, 1)
        }
      })
    },
    // 合格/不合格数量自动判定
    changeNum(val, self, other) {
      if (!this.currentRow.inspectQuantity) return
      if (val > Number(this.currentRow.inspectQuantity)) {
        this.$set(this.currentRow, self, Number(this.currentRow.inspectQuantity))
      }
      if (val < 0) {
        this.currentRow[self] = 0
      }
      this.$set(this.currentRow, other, this.currentRow.inspectQuantity - this.currentRow[self])
    },
    // 获取送检人
    getCheckPerson() {
      getCheckPerson().then(res => {
        if (res.data.code === '200') {
          this.checkPeopleList = res.data.data || []
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 判断送检单是否需要复核和核准
    async getDecideConfig() {
      const inspectMaterialProcess = this.currentRow?.inspectMaterialProcess
      if (inspectMaterialProcess) {
        this.reCheckValue = inspectMaterialProcess.existReview
        this.approveValue = inspectMaterialProcess.existAuthorize
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
    async handleUpload(params, fileType = 'materialFile') {
      this.loadingUpload = true
      const formData = new FormData()
      formData.append('file', params.file)
      const {
        data: { data }
      } = await uploadFile(formData)
      console.log('🚀 ~ handleUpload ~ data:', data, fileType)
      this.addFile(data, fileType)
    },
    addFile(data, fileType = 'materialFile') {
      if (this.currentRow.checkFiles === null || !this.currentRow.checkFiles) {
        this.currentRow.checkFiles = []
      }
      const {
        name,
        fullPath,
        metaDataEntity: { lastModified }
      } = data
      try {
        this.currentRow.checkFiles.push({
          fileName: name,
          fileUrl: fullPath,
          compactor: JSON.parse(sessionStorage.getItem('userInfo'))?.nickname || '',
          createTime: lastModified,
          fileType
        })
        this.loadingUpload = false
      } catch (error) {
        console.log('🚀 ~ handleUpload ~ error:', error)
      }
    },
    handleExceed() {
      this.$message.warning('最多上传 10 个文件')
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
.projectIndicator {
  .centerArea {
    // box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    // border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 18px 9px 18px;
    // margin-bottom: 10px;
    .title {
      // display: flex;
      // justify-content: space-between;
      position: relative;
    }
    .title::before {
      content: '';
      display: inline;
      position: absolute;
      left: -8px;
      top: 1px;
      width: 4px;
      height: 16px;
      background: #1890ff;
      border-radius: 2px 2px 2px 2px;
    }
    .title2 {
      position: relative;
    }
    .title2::before {
      content: '';
      display: inline;
      position: absolute;
      left: -8px;
      top: 5px;
      width: 4px;
      height: 16px;
      background: #1890ff;
      border-radius: 2px 2px 2px 2px;
    }
    .title-start {
      display: flex;
      align-items: center;
    }
  }
  .check {
    // .el-form-item {
    //   margin-left: 90px;
    // }
    // ::v-deep .el-form-item__label {
    //   display: block;
    //   width: auto !important;
    //   text-align: left;
    // }
  }
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
::v-deep .el-form-item--medium .el-form-item__content {
  width: 248px;
}
::v-deep .el-autocomplete {
  width: 248px;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner,
::v-deep .el-select {
  width: 248px;
}
.attachment-tip {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
}
//判定结果占一行
::v-deep .all-line-width {
  display: block;
  // width: 1600px;
}
</style>
