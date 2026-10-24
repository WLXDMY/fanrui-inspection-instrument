<template>
  <div class="level">
    <el-button
      v-permission="{ action: 'qms-product-inspection.inspection-manage.defectReason:add' }"
      type="primary"
      size="mini"
      @click="handleAdd"
      >新增</el-button
    >
    <el-button
      v-permission="{ action: 'qms-product-inspection.inspection-manage.defectReason:exportList' }"
      type="primary"
      size="mini"
      @click="handleExport"
    >
      导出列表
    </el-button>
    <el-button
      v-permission="{ action: 'qms-product-inspection.inspection-manage.defectReason:batchUpdate' }"
      type="primary"
      size="mini"
      @click="handleBatchEdit"
      >批量编辑</el-button
    >
    <ImportBtn
      v-permission="{
        action: 'qms-product-inspection.inspection-manage.defectReason:importManage'
      }"
      style="margin-left: 8px"
      :import-params="importParams"
      @updateList="updateList"
    />
  </div>
</template>

<script>
import ImportBtn from '@/views/common/importExcel/importbtn.vue'
import { USE_DEFECTS_REASON_API } from '@/api/defectReason.js'
const DEFECTS_REASON_API = USE_DEFECTS_REASON_API()
import { saveAs } from 'file-saver'
export default {
  components: {
    ImportBtn
  },
  props: {
    // 请求参数
    listQuery: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
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
      importParams: {
        otherParams: {
          ptitle: '导入管理'
        },
        btnList: [
          {
            code: 'teamsDefaultTemplateExport',
            type: 'exportDefaultTpl',
            title: '下载导入模板',
            permissions: {
              action: 'qms-product-inspection.inspection-manage.defectReason:downDefaultImportTemplate'
            },
            exportDefualtApi: DEFECTS_REASON_API.teamsDefaultTemplateExport
          },
          {
            code: 'teamsBatchImport',
            type: 'import',
            title: '导入数据',
            uploadApi: DEFECTS_REASON_API.defectDefineExcelImport,
            progressApi: DEFECTS_REASON_API.defectDefineImportProgress,
            permissions: {
              action: 'qms-product-inspection.inspection-manage.defectReason:importData'
            },
            dialogParams: {
              fileName: '缺陷原因.xlsx',
              importType: 'defectReasonImport',
              isExcel: true
            }
          },
          {
            code: 'procedureLogExport',
            type: 'exportLog',
            title: '查看日志',
            resultRoute: 'historyResult',
            permissions: {
              action: 'qms-product-inspection.inspection-manage.defectReason:importLog'
            },
            routeQuery: {
              importType: 'defectReasonImport'
              // code: '不良缺陷'
            }
          }
        ]
      }
    }
  },
  methods: {
    updateList() {
      this.$emit('updateList')
    },
    /**
     * @description 导出列表
     */
    handleExport() {
      const params = {
        ...this.listQuery
      }
      DEFECTS_REASON_API.defectDefineExport(params).then(res => {
        const fileName = '缺陷原因.xlsx'
        saveAs(res.data, fileName)
        this.$notify({
          title: '成功',
          message: '导出成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    /**
     * @description 新增缺陷
     */
    handleAdd() {
      // 存储到 sessionStorage
      this.$setForwardSessionCommon(this.listQuery)
      this.$router.push({ name: 'defectReasonAdd' })
    },
    // 批量编辑
    handleBatchEdit() {
      this.$emit('handleBatchEdit')
    }
  }
}
</script>

<style lang="scss" scoped>
.level {
  height: 32px;
}
</style>
