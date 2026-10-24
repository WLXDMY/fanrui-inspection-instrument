<!--
 * @Author: zhaozhuo
 * @Date: 2022-08-03 09:57:36
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-08-08 20:44:52
 * @Description: ...
-->
<template>
  <el-dialog
    title="选择模板"
    width="400px"
    :visible.sync="visible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
  >
    <div style="min-height: 100px">
      <el-form
        ref="formData"
        :model="formData"
        :rules="formRules"
        label-position="right"
        label-width="100px"
        size="small"
      >
        <el-form-item label="模板" prop="template">
          <el-select v-model="formData.template" placeholder="请选择模板">
            <el-option
              v-for="(item, index) in templateList"
              :key="item.id"
              :label="item.name"
              :value="index"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template slot="footer">
      <el-button size="small" @click="hideModal">关闭</el-button>
      <el-button size="small" type="primary" @click="cofirmModal">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import {
  getPrintTemplateGetByType
} from '@/api/print.js'

export default {
  name: 'EditConfigDialog',
  props: {},
  data() {
    return {
      visible: false,
      templateList: [],
      formData: {
        template: ''
      },
      formRules: {
        template: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    getPrintTemplateGetByType(templateType) {
      const params = {
        templateType
      }
      getPrintTemplateGetByType(params).then(res => {
        const { code, data } = res.data
        if (code === '200') {
          this.templateList = data || []
          if (this.templateList.length) {
            this.visible = true
          } else {
            this.$notify({
              title: '提示',
              message: '暂无打印模板，请在打印配置中添加模板',
              type: 'warning',
              duration: 1000
            })
          }
        }
      })
    },
    show(templateType) {
      this.getPrintTemplateGetByType(templateType)
    },
    hideModal() {
      this.visible = false
    },
    cofirmModal() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.visible = false
          this.$emit('setTemplateData', this.templateList[this.formData.template])
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
