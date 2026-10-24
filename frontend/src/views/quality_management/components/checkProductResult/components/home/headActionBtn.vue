<!--
 * @Author: shunhua.liang
 * @Date: 2022-08-29 11:59:30
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-11-01 09:35:58
 * @Description: 销售订单页面头部按钮区域
-->

<template>
  <div class="level">
    <el-button
      v-permission="{
        action: 'inspection.product.result:exportList'
      }"
      type="primary"
      size="mini"
      @click="handleExport"
    >
      导出列表
    </el-button>
  </div>
</template>

<script>
import { getInspectsheetsDetailExport } from '@/api/quality-manage'
import { saveAs } from 'file-saver'

export default {
  props: {
    // 请求参数
    listQuery: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    },
    // 是否展示按钮（跟审批权限相关的）
    isExistApproveBtn: {
      type: Boolean,
      require: true,
      default: false
    },
    // 选中的表格行数据
    multipleSelection: {
      type: Array,
      require: false,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      currentPath: '' // 当前路由地址（截取‘#’后面）
    }
  },
  methods: {
    // 导出
    handleExport() {
      getInspectsheetsDetailExport(this.listQuery).then(res => {
        const fileName = '产品检验结果.xlsx'
        saveAs(res, fileName)
        this.$notify({
          title: '成功',
          message: '导出成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 重新获取数据
    refreshList() {
      this.$emit('updateList')
    }
  }
}
</script>

<style lang="scss" scoped>
.level {
  height: 32px;
}
</style>
