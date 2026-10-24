<!--
 * @Author: limengjuan
 * @Date: 2022-03-16 14:30:01
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-06-27 14:45:53
 * @Description: 导出excel数量超出100w行提示框
-->
<template>
  <el-dialog
    title="导出文件提示"
    :visible.sync="exportExcelExceedMaxTipDialogVisible"
    width="475px"
    :before-close="handleClose"
    class="exportExcelExceedMaxTipDialog"
  >
    <section class="content-box">
      <img
        src="@/assets/images/export/exportExcelExceedMaxTipIcon.png"
        alt=""
        srcset=""
      >
      <p>当前导出数据超出100w行，超出部分不予导出。</p>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose"> 取 消 </el-button>
      <el-button type="primary" @click="handleConfirm"> 确 定 </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      exportExcelExceedMaxTipDialogVisible: false
    }
  },
  mounted() {},
  methods: {
    // 打开弹窗
    open() {
      this.exportExcelExceedMaxTipDialogVisible = true
    },
    // 关闭
    handleClose() {
      this.exportExcelExceedMaxTipDialogVisible = false
    },
    // 确认
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.exportExcelExceedMaxTipDialog {
  ::v-deep .el-dialog__body {
    padding: 0 20px;
    .content-box {
      border-top: 1px solid #e9e9e9;
      padding: 37px 15px;
      display: flex;
      align-items: center;
      img {
        width: 34px;
        margin-right: 15px;
      }
      p {
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
</style>
