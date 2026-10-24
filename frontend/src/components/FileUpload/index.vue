<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    :limit="1"
    action=""
    :accept="accept"
    :file-list="fileList"
    :http-request="httpUpload"
    :on-exceed="handleExceed"
    :before-upload="beforeUpload"
    :on-remove="handleRemove"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
import request from '@/utils/request'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: '.zip'
    },
    reFileList: {
      type: Array,
      default: () => ([])
    }

  },
  data() {
    return {
      loading: false,
      fileList: []
    }
  },
  watch: {
    reFileList: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.fileList = [...newValue]
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const isZip = file.name.endsWith('.zip')

      return new Promise((resolve, reject) => {
        if (this.accept === '.zip' && !isZip) {
          this.$message.warning(`只能上传zip压缩文件!`)
          reject()
        }
        resolve()
      }).then(() => {
        this.loading = this.$loading({
          lock: true,
          text: '上传中',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        return Promise.resolve()
      }).catch(() => {
        return Promise.reject()
      })
    },
    handleExceed() {
      this.$message.warning(`当前限制上传一个`)
    },

    // 覆盖默认上传行为
    httpUpload({ file }) {
      const param = new FormData() // 创建form对象
      param.append('file', file) // 通过append向form对象添加数据
      request({
        url: this.url,
        method: 'post',
        data: param

      }).then(({ data: { code, message = '', data: { url = '' }}}) => {
        if (+code === 200) {
          file.url = url

          this.fileList = [file]
          this.$emit('success', file, 'file')
          return
        } else {
          this.$notify({
            type: 'error',
            message,
            duration: 2000
          })

          this.fileList = []
        }
      }).catch((err) => {
        this.$emit('error', err)
      }).finally(() => {
        this.loading.close()
      })
    },
    handleRemove() {
      this.$emit('deleteFile')
    }

  }
}
</script>

<style>

</style>
