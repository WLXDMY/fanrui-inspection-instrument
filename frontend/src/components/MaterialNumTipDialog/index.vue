<template>
  <div>
    <el-dialog
      title="提示"
      width="30%"
      :visible.sync="materialNumTipDialogVisible"
    >
      <ul class="tips-word">
        <li v-for="(item, index) in tipsWords" :key="index">{{ item }}</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NewWebIndex',
  props: {
    materialNumTipDialogVisible: {
      type: Boolean,
      required: true
    },
    tipsWords: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShowDialog: false
    }
  },
  watch: {
    materialNumTipDialogVisible: {
      handler(newVal) {
        this.isShowDialog = newVal
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},

  methods: {
    handleConfirm() {
      this.$emit('confirm')
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.tips-word {
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow: auto;
  li {
    list-style: none;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
  }
}
</style>
