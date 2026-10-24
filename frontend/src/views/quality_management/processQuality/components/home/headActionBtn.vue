<template>
  <div class="level">
    <el-button
      v-permission="{ action: 'qms-product-inspection.inspection-manage.defect:add' }"
      type="primary"
      size="mini"
      @click="handleAdd"
      >新增缺陷</el-button
    >
    <el-button
      v-permission="{ action: 'qms-product-inspection.inspection-manage.defect:exportList' }"
      type="primary"
      size="mini"
      @click="handleExport"
    >
      导出列表
    </el-button>
    <el-button
      v-permission="{ action: 'qms-product-inspection.inspection-manage.defect:add' }"
      type="primary"
      size="mini"
      @click="defectTypeDefect"
      >缺陷类型管理</el-button
    >
    <el-button
      v-permission="{ action: 'qms-product-inspection.inspection-manage.defect:update' }"
      type="primary"
      size="mini"
      @click="handleBatchEdit"
      >批量编辑</el-button
    >
    <ImportBtn
      v-permission="{
        action: 'qms-product-inspection.inspection-manage.defect:importManage'
      }"
      style="margin-left: 8px"
      :import-params="importParams"
      @updateList="updateList"
    />
  </div>
</template>

<script>
import ImportBtn from '@/views/common/importExcel/importbtn.vue'
import { QualityDefineExport } from '@/api/quality-manage.js'
import { USE_DEFECTS_API } from '@/api/facilityQualityManagement.js'
const DEFECTS_API = USE_DEFECTS_API() // 不良api
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
              action: 'qms-product-inspection.inspection-manage.defect:downDefaultImportTemplate'
            },
            exportDefualtApi: DEFECTS_API.teamsDefaultTemplateExport
          },
          {
            code: 'teamsBatchImport',
            type: 'import',
            title: '导入数据',
            uploadApi: DEFECTS_API.defectDefineExcelImport,
            progressApi: DEFECTS_API.defectDefineImportProgress,
            permissions: {
              action: 'qms-product-inspection.inspection-manage.defect:importData'
            },
            dialogParams: {
              code: '班组导入',
              importType: 'defectImport',
              isExcel: true
            }
          },
          {
            code: 'procedureLogExport',
            type: 'exportLog',
            title: '查看日志',
            resultRoute: 'historyResult',
            permissions: {
              action: 'qms-product-inspection.inspection-manage.defect:importLog'
            },
            routeQuery: {
              importType: 'defectImport',
              code: '不良缺陷'
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
      DEFECTS_API.defectDefineExport(params).then(res => {
        console.log('11111111111111', res)
        const fileName = '不良定义.xlsx'
        /*  saveAs(res.data, fileName) */
        const url = URL.createObjectURL(res)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
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
      this.$router.push({ name: 'processQualityAdd' })
    },
    // 批量编辑
    handleBatchEdit() {
      this.$emit('handleBatchEdit')
    },
    // 不良类型缺陷
    defectTypeDefect() {
      // 存储到 sessionStorage
      this.$setForwardSessionCommon(this.listQuery)
      this.$router.push({ name: 'badTypeDefine' })
    }
  }
}
</script>

<style lang="scss" scoped>
.level {
  height: 32px;
}
</style>
