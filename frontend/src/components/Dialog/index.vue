<template>
  <el-dialog
    :title="title"
    class="dialog"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
    <div slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button v-if="showCancel" size="small" @click="onCancel">取消</el-button>
        <el-button v-if="showConfirm" type="primary" size="small" :loading="loadingStatus" @click="onConfirm">确认</el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    // 可以自定义高度
    // top: {
    //   type: String,
    //   default: '50vh'
    // },
    // 控制确认按钮与取消按钮的隐藏
    showCancel: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    // 确认上传是等待样式的隐藏
    loadingStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog >>> .el-dialog__header {
  //  padding-top: 30px;
  }

</style>
