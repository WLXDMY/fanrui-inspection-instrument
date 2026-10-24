<template>
  <el-dialog
    custom-class="product-order-batch-edit-dialog"
    title="批量编辑"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    v-bind="$attrs"
    width="30vw"
    v-on="$listeners"
  >
    <el-form ref="multipEdit" size="small" label-width="120px" :model="multipEditDialog">
      <el-form-item :rules="[{ required: true, message: '该项为必填', trigger: 'change' }]" label="状态:" prop="status">
        <el-select v-model="multipEditDialog.status" style="width: 100%;max-width: 240px" placeholder="请选择" size="small">
          <el-option
            v-for="(item, index) in stateOptions"
            :key="index"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btnok">
      <el-button type="primary" @click="confirmEdit"> 确认 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { USE_DEFECTS_API } from '@/api/facilityQualityManagement'
const DEFECTS_API = USE_DEFECTS_API() // 接入不良api
export default {
  props: {
    multipEditForm: {
      type: Object,
      default: () => ({})
    },
    queryParams: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      multipEditDialog: {
        ...this.multipEditForm
      },
      stateOptions: []
    }
  },
  async created() {
    this.getReceiptState()
  },
  methods: {
    async confirmEdit() {
      const [err, result] = await this.$to(this.$refs['multipEdit'].validate())
      if (err) return
      if (result) {
        const result = await DEFECTS_API.defectsPutStateBatchApi(this.multipEditDialog)
        if (result.data) {
          this.$notify({
            title: '提示',
            message: '更新成功！',
            type: 'success',
            duration: 2000
          })
          this.$emit('updateList', this.queryParams)
        } else {
          this.$notify({
            title: '提示',
            message: result.message || '获取状态列表失败',
            type: 'error',
            duration: 2000
          })
        }
      }
    },
    // 获取状态列表
    async getReceiptState() {
      try {
        const result = await DEFECTS_API.getDefectsStatusApi()
        console.log('状态', result)
        this.stateOptions = result && result.data && result.data.data ? result.data.data : []
        this.stateOptions = this.stateOptions.map(item => {
          return {
            ...item,
            disabled: true
          }
        })
        this.statusDIsable()
      } catch (err) {
        console.log(err)
        if (err.result) {
          this.$notify({
            title: '提示',
            message: err.response.data.message || '获取状态列表失败',
            type: 'error',
            duration: 2000
          })
        }
      }
    },
    // 当前状态下其他状态是否可以选择
    statusDIsable() {
      switch (this.multipEditDialog.status) {
        case 0:
          this.stateOptions[1].disabled = false
          break
        case 1:
          this.stateOptions[2].disabled = false
          this.stateOptions[3].disabled = false
          break
        case 2:
          this.stateOptions[1].disabled = false
          this.stateOptions[3].disabled = false
          break
        case 3:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btnok {
  display: flex;
  justify-content: center;
}
::v-deep .el-dialog {
  min-width: 300px;
}
</style>
