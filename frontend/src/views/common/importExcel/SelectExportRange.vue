<template>
  <el-dialog
    title="导出范围"
    :visible.sync="exportExcelRangeDialogVisible"
    width="300px"
    :before-close="handleClose"
    class="exportExcelRangeDialog"
  >
    <div class="content-box">
      <el-radio-group v-model="exportExcelRangeRadio">
        <el-radio label="all">全部</el-radio>
        <el-radio label="checkedItem">选中项</el-radio>
      </el-radio-group>
    </div>
    <div class="operate-box">
      <el-button type="primary" size="small" @click="handleConfirm">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    selectExportRangeDialogVisible: {
      type: Boolean,
      required: true
    },
    fileParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      exportExcelRangeRadio: '',
      exportExcelRangeDialogVisible: false
    }
  },
  watch: {
    selectExportRangeDialogVisible: {
      handler(newVal, oldValue) {
        if (newVal) {
          this.exportExcelRangeDialogVisible = true
          if (
            !this.fileParams.otherParams.multipleSelection ||
            this.fileParams.otherParams.multipleSelection.length <= 0
          ) {
            this.exportExcelRangeRadio = 'all'
          } else {
            this.exportExcelRangeRadio = 'checkedItem'
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 关闭
    handleClose() {
      this.exportExcelRangeDialogVisible = false
      this.$emit('cancel')
    },
    handleConfirm() {
      if (!this.exportExcelRangeRadio) {
        this.$notify({
          title: '提示',
          message: '请选择导出范围',
          type: 'warning',
          duration: 2000
        })
        return
      }
      this.$emit('confirm', this.exportExcelRangeRadio)
      this.exportExcelRangeDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.exportExcelRangeDialog {
  ::v-deep .el-dialog__body {
    .content-box {
      .el-radio-group {
        display: flex;
        flex-direction: column;
        .el-radio {
          margin: 10px;
        }
      }
    }
    .operate-box {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
}
</style>
