<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2022-11-22 11:53:17
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-02 11:40:59
 * @FilePath: \systemmanagement\src\views\trace-management\orderTransparency\components\subComponents\viewImagesDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 图片预览弹窗 -->
  <el-dialog
    :visible.sync="visible"
    :destroy-on-close="true"
    :before-close="cancelDialog"
    v-bind="$attrs"
    :append-to-body="true"
    v-on="$listeners"
  >
    <el-carousel :autoplay="false" trigger="click" height="400px">
      <el-carousel-item v-for="(item, index) in imageList" :key="item">
        <el-image :key="index" fit="cover" :src="item" :preview-src-list="[item]" />
      </el-carousel-item>
    </el-carousel>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancelDialog"> 取消 </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    imageList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    cancelDialog() {
      this.$emit('closeDailog')
    }
  }
}
</script>

<style lang="scss" scoped></style>
