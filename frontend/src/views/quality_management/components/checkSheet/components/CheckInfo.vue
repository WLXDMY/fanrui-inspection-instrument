<!--
 * @Author: shunhua.liang
 * @Date: 2022-11-24 11:57:10
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-28 14:16:42
 * @Description: 复核弹窗
-->

<template>
  <div>
    <el-dialog
      title="复核"
      width="30%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formDome"
        :model="formData"
        label-width="95px"
        :rules="rules"
      >
        <el-form-item label="复核状态：" prop="reviewResult">
          <el-select v-model="formData.reviewResult" size="small">
            <el-option
              v-for="item in checkStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="复核附件：">
          <div>
            <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :http-request="handleFileUpload"
              :show-file-list="false"
              multiple
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <ul class="preview">
            <li v-for="(item, index) in fileList" :key="index">
              <span class="title" @click="viewFiles(item)">{{
                item.fileName
              }}</span>
              <i class="el-icon-close" @click="deleteFile(index)" />
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="复核人：" prop="reviewBy">
          <el-select v-model="formData.reviewBy" size="small">
            <el-option
              v-for="item in personList"
              :key="item.id"
              :label="item.nickname"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="复核备注：">
          <el-input v-model="formData.reviewRemark" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
import {
  getCheckStatus,
  sureCheckBtn,
  getCheckPerson
} from '@/api/quality-manage'
// import { userlist } from '@/api/base'
import { getimgurl } from '@/api/base'
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
        reviewResult: '',
        reviewBy: '',
        reviewRemark: ''
      },
      rules: {
        reviewResult: [{ required: true, message: '请选择', trigger: 'blur' }],
        reviewBy: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      fileList: [], // 上传的文件
      showDeleteImg: false, // 图片预览弹窗
      currentFileListIndex: null,
      previewList: [], // 图片预览的地址
      checkStatus: [], // 复核状态列表
      personList: [] // 人员列表
    }
  },
  created() {
    this.getCheckStatusList()
    this.getAllPerson()
    this.settingCheckPerson()
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    // 设置默认的复核人
    async settingCheckPerson() {
      const res = await getInfo()
      const { code, data, message } = res.data || {}
      if (+code === 200) {
        this.formData = {
          ...this.formData,
          reviewBy: data?.username
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
    // 获取复核状态
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
    // 获取所有的人员
    async getAllPerson() {
      const res = await getCheckPerson()
      const { code, data, message } = res.data || {}
      if (+code === 200) {
        this.personList = data
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
    handleFileUpload(val) {
      const fd = new FormData()
      fd.append('file', val.file)
      getimgurl(fd).then(res => {
        const { code, data, message } = res.data || {}
        if (+code === 200) {
          this.fileList.push(data)
        } else {
          this.$notify({
            title: '错误',
            message: message || 'error',
            type: 'error',
            offset: 40
          })
        }
      })
    },
    // 文件删除
    deleteFile(index) {
      this.fileList.splice(index, 1)
    },
    // 选择文件或拍照之后上传服务器
    uploadRequest(path) {

    },
    handlePreview() {},
    handleRemove() {},
    // 查看文件
    viewFiles(val = {}) {
      const { url } = val
      //  图片格式
      const format = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'apng']
      const list = url.split('.')
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
    // 提交数据
    async submit() {
      this.$refs.formDome.validate(async(valid) => {
        if (valid) {
          const { id } = this.$route.query || {}
          const params = {
            ...this.formData,
            inspectionSheetId: id,
            status: this.list?.status,
            pictures: this.fileList.map(item => {
              return {
                url: item.url,
                name: item.fileName
              }
            })
          }
          const res = await sureCheckBtn(params)
          const { code, message } = res.data || {}
          if (+code === 200) {
            this.dialogVisible = false
            this.$emit('refreshList')
          }
          this.$notify({
            title: '错误',
            message: message || 'error',
            type: +code === 200 ? 'success' : 'error',
            offset: 40
          })
        } else {
          this.$validateConfirm(this.$refs.formDome)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  width: 100% !important;
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
