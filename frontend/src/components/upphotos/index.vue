<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-05-28 11:17:10
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-05-28 15:22:11
 * @FilePath: \yelink-qms\src\components\upphotos\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="vertical">
      <el-image v-if="headerUrl" class="userimg-bg" :src="headerUrl" :preview-src-list="[headerUrl]" fit="cover" />
      <div v-else class="userimg-bg centre3">
        <img class="userimg" shape="square" src="@/assets/images/home/add-bg.png">
      </div>
      <el-tooltip class="item" effect="dark" content="点击上传或更新照片" placement="right">
        <input
          id="uppic"
          ref="avatarInput"
          type="file"
          name="avatar"
          style="opacity: 0; width: 130px; height: 100%; position: absolute; top: 0; left: 0"
          accept="image/gif, image/jpeg, image/jpg, image/png"
          class="uppic"
          title=""
          @change="changeImage($event)"
        >
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { getimgurl } from '@/api/base'
export default {
  props: {
    imgurl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      InfoEditFile: '',
      headerUrl: ''
    }
  },
  mounted() {},
  methods: {
    receivedata(val) {
      this.headerUrl = val
    },
    changeImage(e) {
      var file = e.target.files[0]
      this.InfoEditFile = file
      if (!file) {
        return
      } else {
        var reader = new FileReader()
        var that = this
        const loading = this.$loading({
          lock: true,
          text: '替换中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        loading.close()
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          that.headerUrl = this.result
          loading.close()
        }
        this.uploadImg(this.InfoEditFile)
      }
    },
    uploadImg(file) {
      const params = new FormData()
      params.append('file', file)
      getimgurl(params).then(res => {
        if (res.data.code === '200') {
          const headerUrl = res.data.data.url
          this.$emit('geturl', headerUrl)
        } else {
          this.$notify({
            title: '提示',
            message: res.message || '照片上传失败',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.userimg-bg {
  width: 130px;
  height: 130px;
  box-shadow: 2px 4px 4px rgba(13, 27, 62, 0.274);
}
.userimg {
  width: 50px;
  height: 50px;
}
</style>
