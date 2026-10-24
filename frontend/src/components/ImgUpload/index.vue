<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    :limit="1"
    action=""
    list-type="picture-card"
    accept="image/*"
    :file-list="fileList"
    :http-request="httpUpload"
    :on-exceed="handleExceed"
  >
    <i class="el-icon-plus" />
    <template slot="file" slot-scope="{file}">
      <el-image
        v-loading="loading"
        class="el-upload-list__item-thumbnail"
        fit="cover"
        :src="file.url"
      />
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-delete detail-hidden" @click="onRemoveFile(file)">
          <i class="el-icon-delete" />
        </span>
      </span>
    </template>
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

    handleExceed() {
      this.$message.warning(`当前限制上传一个`)
    },

    // 覆盖默认上传行为
    httpUpload({ file }) {
      console.log(file, 'file-httpUpload')
      this.loading = true
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
        } else {
          this.$notify({
            type: 'error',
            message,
            duration: 2000
          })
        }
      }).catch((err) => {
        this.$emit('error', err)
      }).finally(() => {
        this.loading = false
      })
    },
    onRemoveFile(file, fileList) {
      this.$refs.upload.handleRemove(file)
      this.$emit('deleteImg')
    }

  }
}
</script>

<style>

</style>
