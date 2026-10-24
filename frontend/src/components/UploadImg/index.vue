<!--
 * @Author: limengjuan
 * @Date: 2022-03-17 14:48:58
 * @LastEditors: youjuan.hu
 * @LastEditTime: 2023-01-05 16:29:03
 * @Description:
-->
<template>
  <div class="factory">
    <el-upload
      class="avatar-uploader"
      list-type="picture-card"
      action="#"
      :on-preview="handleAvatarSuccess"
      :auto-upload="false"
      :file-list="fileList"
      :limit="1"
      :show-file-list="false"
      :on-change="handleChangeImg"
      :disabled="disable"
    >
      <img v-if="imageUrl" :src="`${baseUrl}/${imageUrl}`" class="avatar" style="width: 148px; height: 148px">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { uploadPic, getManufacturingPicture } from '@/api/factory'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      fileList: [],
      imageUrl: null,
      baseUrl: ''
    }
  },
  watch: {
    url: {
      handler(newVal) {
        this.imageUrl = newVal
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // this.getPictureOfScreen()
    this.baseUrl = process.env.VUE_APP_NGINX_PATH || '' // 获取本机ip地址
  },
  methods: {
    //  获取图片大图
    // async getPictureOfScreen () {
    //   const data = await getManufacturingPicture()
    //   const { code, message } = data.data || {}
    //   if (+code === 200) {
    //     this.imageUrl = message
    //     // process.env.NODE_ENV === 'development'
    //     //   ? process.env.VUE_APP_BASE_API +'/' + message
    //     //   : message
    //   }
    // },
    // 图片上传拿到url
    async handleChangeImg(file, fileList) {
      this.imageUrl = file.url
      this.fileList = fileList
      const fd = new FormData()
      fd.append('layoutUrl', this.imageUrl)
      fd.append('file', this.fileList[0].raw)
      const list = await uploadPic(fd)
      const { code, data } = list.data || {}
      if (+code === 200) {
        this.$notify({
          title: '成功',
          message: '图片上传成功',
          type: 'success',
          duration: 1000
        })
        const { url } = data || {}
        this.$emit('getModelPicture', url)
      }
    },
    handleAvatarSuccess() {}
  }
}
</script>

<style lang="scss" scope></style>
