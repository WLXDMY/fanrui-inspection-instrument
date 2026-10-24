<!--
 * @Author: shunhua.liang
 * @Date: 2022-08-29 15:44:11
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-06-30 12:30:35
 * @Description: 单个审批弹窗
-->

<template>
  <el-dialog
    class="add-dialog"
    title="审批详情"
    :visible.sync="showDetailDialog"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <el-form size="small" label-width="100px">
      <el-form-item label="审批状态">
        <el-radio v-model="dialogList.approvalStatus" label="2">同意</el-radio>
        <el-radio v-model="dialogList.approvalStatus" label="3">驳回</el-radio>
      </el-form-item>
      <el-form-item label="审批意见">
        <el-input v-model="dialogList.approvalSuggestion" type="textarea" />
      </el-form-item>
    </el-form>
    <div class="approval-sure">
      <el-button type="primary" @click="confirmApproval"> 确认审批 </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // 需要审批的单据id
    approvalId: {
      type: [String, Number],
      require: true,
      default: ''
    },
    // 单个审批接口
    approvalApi: {
      type: Object,
      require: true,
      default: () => ({
        api: '', // 审批接口
        paramsKey: '' // 接口参数名
      })
    }
  },
  data() {
    return {
      showDetailDialog: false,
      dialogList: {
        approvalStatus: '',
        approvalSuggestion: ''
      }
    }
  },
  methods: {
    // 审批确认
    async confirmApproval() {
      const { approvalStatus, approvalSuggestion } = this.dialogList || {}
      const params = {
        [this.approvalApi.paramsKey]: this.approvalId,
        approvalStatus: +approvalStatus,
        approvalSuggestion
      }
      // 代表没有选审批状态
      if (+approvalStatus === 0) {
        this.$notify({
          title: '提示',
          message: '请选择审批状态',
          type: 'warning',
          duration: 2000
        })
        return
      }
      const res = await this.approvalApi.api(params)
      const { code, message } = res.data || {}
      if (+code === 200) {
        this.$notify({
          title: '提示',
          message: '审批成功',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '提示',
          message,
          type: 'error',
          duration: 2000
        })
      }
      this.showDetailDialog = false
      this.$emit('closeApprovalDialog')
    },
    // 打开弹窗
    openApprovalDialog() {
      this.showDetailDialog = true
      Object.keys(this.dialogList).forEach(el => {
        this.dialogList[el] = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .add-dialog .el-dialog__body {
  padding-bottom: 50px;
}
.approval-sure {
  position: absolute;
  right: 20px;
  bottom: 10px;
}
</style>
