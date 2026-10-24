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
    <div class="btnok">
      <el-button type="primary" @click="confirmApproval"> 确认审批 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { putItemsApproveBatch } from '@/api/quality-manage'

export default {
  data() {
    return {
      showDetailDialog: false,
      dialogList: {
        approvalStatus: '',
        approvalSuggestion: ''
      },
      params: {}
    }
  },
  methods: {
    open(params) {
      this.params = params
      const { multipleSelection } = this.params
      if (multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请至少选择一条数据',
          type: 'warning',
          duration: 2000
        })
        return
      }
      // 判断所选是否有不一致的审批人
      const temp = multipleSelection.find(
        (item, index) => index >= 1 && multipleSelection[index - 1].approver !== multipleSelection[index].approver
      )
      if (temp) {
        this.$notify({
          title: '提示',
          message: '所选审批人不一致，请重新选择',
          type: 'warning',
          duration: 2000
        })
        return
      }

      this.dialogList = {
        approvalStatus: '',
        approvalSuggestion: ''
      }

      this.showDetailDialog = true
    },
    // 批量审批确认
    confirmApproval() {
      const ids = []
      this.params.multipleSelection.map(item => {
        ids.push(item.id)
      })
      const params = {
        ids: ids,
        approvalStatus: +this.dialogList.approvalStatus,
        approvalSuggestion: this.dialogList.approvalSuggestion
      }
      if (+this.dialogList.approvalStatus === 0) {
        // 代表没有选审批状态
        this.$notify({
          title: '提示',
          message: '请选择审批状态',
          type: 'warning',
          duration: 2000
        })
        return
      }
      putItemsApproveBatch(params).then(res => {
        if (res.data.code === '200') {
          this.$notify({
            title: '提示',
            message: '提交审批成功',
            type: 'success',
            duration: 2000
          })
          this.multipleSelection = []
        }
        this.dialogList = {
          approvalStatus: '',
          approvalSuggestion: ''
        }
        this.$emit('updateList')
      })
      this.showDetailDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.btnok {
  position: absolute;
  right: 20px;
  bottom: 10px;
}
</style>
