<!--
 * @Author: shunhua.liang
 * @Date: 2022-11-24 11:57:10
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-10-20 11:27:09
 * @Description: 核准弹窗
-->

<template>
  <div>
    <el-dialog
      title="核准"
      width="400px"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formDome"
        :model="formData"
        label-width="95px"
        :rules="rules"
      >
        <el-form-item label="核准状态：" prop="authorizeResult">
          <el-select v-model="formData.authorizeResult" size="mini">
            <el-option
              v-for="item in checkStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="核准人：" prop="authorizeBy">
          <el-select
            v-model="formData.authorizeBy"
            v-loading-more="ajaxMet"
            size="mini"
            filterable
          >
            <el-option
              v-for="item in personList"
              :key="item.id"
              :label="item.nickname"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="核准备注：">
          <el-input v-model="formData.authorizeRemark" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <van-image-preview
      v-model="showDeleteImg"
      :start-position="currentFileListIndex"
      :images="previewList"
      @change="previewChange"
    >
      <template v-slot:cover>
        <div class="delete-btn" @click="handleDeleteImg">删除</div>
      </template>
    </van-image-preview> -->
  </div>
</template>

<script>
import { getBaseUrl, getToken, getTokenType } from '@/utils/auth'
import { getInfo } from '@/api/user'

import {
  getCheckStatus,
  authorizeBtn,
  getAllInspectionPerson
} from '@/api/quality-manage'
export default {
  props: {
    list: {
      type: Object,
      require: false,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false, // 弹窗
      formData: {
        authorizeResult: '',
        authorizeBy: '',
        authorizeRemark: ''
      },
      rules: {
        authorizeResult: [{ required: true, message: '请选择', trigger: 'blur' }],
        authorizeBy: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      fileList: [], // 上传的文件
      showDeleteImg: false, // 图片预览弹窗
      currentFileListIndex: null,
      previewList: [], // 图片预览的地址
      checkStatus: [], // 核准状态列表
      personList: [], // 人员列表
      pagenation: {
        current: 1,
        size: 20,
        total: 0
      }
    }
  },
  created() {
    this.getCheckStatusList()
    this.settingCheckPerson()
  },
  methods: {
    show() {
      this.pagenation.current = 1
      this.personList = []

      this.ajaxMet('init')
      this.dialogVisible = true
    },

    async ajaxMet(type) {
      if (type !== 'init') {
        // 如果数据全部加载完毕 则不请求接口
        if (this.pagenation.total === this.personList.length) return

        this.pagenation.current += 1
      }

      const { current, size } = this.pagenation
      const {
        data: {
          code,
          data: { records, total },
          message
        }
      } = await getAllInspectionPerson({ current, size })

      if (code === '200') {
        this.personList.push(...records)
        this.pagenation.total = total
      }
    },
    // 设置默认的核准人
    async settingCheckPerson() {
      const res = await getInfo()
      const { code, data, message } = res.data || {}
      if (+code === 200) {
        this.formData = {
          ...this.formData,
          authorizeBy: data?.username
        }
      } else {
        this.$notify({
          title: '错误',
          message: message || 'error',
          type: 'error',
          offset: 40
        })
      }
    },
    // 获取核准状态
    async getCheckStatusList() {
      const res = await getCheckStatus()
      const { code, data, message } = res.data || {}
      if (+code === 200) {
        this.checkStatus = data
      } else {
        this.$notify({
          title: '错误',
          message: message || 'error',
          type: 'error',
          offset: 40
        })
      }
    },

    // 选择文件
    handleFileUpload() {
      const that = this
      window.flutter_inappwebview
        .callHandler('openGallery')
        .then(function(path) {
          that.uploadRequest(path)
        })
    },
    // 文件删除
    deleteFile(index) {
      this.fileList.splice(index, 1)
    },
    // 选择文件或拍照之后上传服务器
    uploadRequest(path) {
      const that = this
      const files = [{ file: path }]
      const requestUrl = `${getBaseUrl()}/factory/v1`
      const Authorization = {
        Authorization: getTokenType() + ' ' + getToken()
      }
      window.flutter_inappwebview
        .callHandler(
          'upFile',
          `${requestUrl}/api/resource/add`,
          files,
          Authorization
        )
        .then(function(res) {
          if (res) {
            const data = JSON.parse(res).data
            const url = data.url
            const file = url.split('/')
            const fileName = file[file.length - 1]
            that.fileList.push({
              name: fileName,
              url,
              localPath: path
            })
          }
        })
    },
    // 查看文件
    viewFiles(val = {}) {
      const { url } = val
      //  图片格式
      const format = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'apng']
      const list = url.toLowerCase().split('.')
      const tem = list.filter(item => format.includes(item))
      const previewImg = this.collectImageList()
      //   如果文件地址是图片的话可以进行预览
      if (tem.length) {
        this.showDeleteImg = true
        this.previewList = previewImg.map(item => item.localPath)
        this.currentFileListIndex = this.previewList.findIndex(
          item => item === url
        )
      }
    },
    // 收集所有的图片
    collectImageList() {
      return this.fileList.filter(item => {
        return this.isImage(item.url)
      })
    },
    // 是否为图片
    isImage(str = '') {
      const format = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'apng']
      const list = str.split('.')
      const tem = list.filter(item => format.includes(item))
      return tem.length !== 0
    },
    // 图片删除
    handleDeleteImg() {
      if (this.currentFileListIndex !== null) {
        // 删除预览图片和文件列表中的图片
        const url = this.previewList[this.currentFileListIndex]
        const index = this.fileList.findIndex(item => item.localPath === url)
        index !== -1 && this.fileList.splice(index, 1)
        this.previewList.splice(this.currentFileListIndex, 1)
        this.previewList.length === 0 ? (this.showDeleteImg = false) : null
        this.showDeleteImg = false
      }
    },
    // 下标改变
    previewChange(index) {
      this.currentFileListIndex = index
    },
    // 提交数据
    async submit() {
      this.$refs.formDome.validate(async valid => {
        if (valid) {
          const { id } = this.$route.query || {}
          const params = {
            ...this.formData,
            inspectionSheetId: id,
            status: this.list?.status,
            pictures: this.fileList
          }
          const res = await authorizeBtn(params)
          const { code, message } = res.data || {}
          if (+code === 200) {
            this.dialogVisible = false
            this.$emit('refreshList', this.formData.authorizeResult)
          }
          this.$notify({
            title: '错误',
            message: message || 'error',
            type: +code === 200 ? 'success' : 'error',
            offset: 40
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 10px;
}
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-dialog__body {
  padding-top: 10px;
}
.preview {
  margin: 0;
  padding: 0;
  width: 100%;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .title {
      display: block;
      width: 80%;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
::v-deep .van-image-preview__cover {
  top: initial;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%, 0);
  .delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 23px;
    color: #fff;
    background-color: #606266;
    border-color: #fff;
    border-radius: 22px;
    opacity: 0.8;
  }
}
</style>
