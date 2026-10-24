<!--
 * @Author: shunhua.liang
 * @Date: 2022-08-29 15:44:11
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-07-03 15:58:37
 * @Description: 审批弹窗
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
      <el-button type="primary" @click="confirmApproval">
        确认审批
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import request from '@/utils/request'
export default {
  props: {
    approveConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showDetailDialog: false,
      dialogList: {
        approvalStatus: '2',
        approvalSuggestion: ''
      }
    }
  },
  methods: {
    // 批量审批确认
    async confirmApproval() {
      const { approvalStatus, approvalSuggestion } = this.dialogList
      const { api } = this.approveConfig
      const queryParams = {
        ...this.approveConfig.extraRequestParams,
        approvalStatus: +approvalStatus,
        approvalSuggestion
      }

      // const res = await batchApprovalSales(params)

      const res = await request({
        ...this.approveConfig.api,
        data: api.method === 'post' || api.method === 'put' ? queryParams : '',

        params: api.method === 'get' ? queryParams : ''
      })

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
          duration: 1000
        })
      }
      this.showDetailDialog = false
      this.$emit('closeApprovalDialog')
    }

  }
}
</script>

  <style lang="scss" scoped>
  ::v-deep .add-dialog .el-dialog__body {
    padding-bottom: 50px !important;
  }
  .approval-sure {
    position: absolute !important;
    right: 20px !important;
    bottom: 10px !important;
  }
  </style>

