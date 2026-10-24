<template>
  <div class="container">
    <header style="margin-bottom: 10px" class="btns">
      <div class="btn-left">
        <!--导出列表-->
        <ImportBtn
          class="button-font"
          style="height: 32px; overflow: hidden; margin-left: 8px; margin-right: 8px"
          :import-params="billExportParams"
        >
          <template #productOrderUploadBillTemplate="{ props }">
            <el-button size="small" class="import-temp" @click.native="productOrderUploadBillTemplate(props)">
              {{ props.title }}
            </el-button>
          </template>
          <template #exportProductOrder="{ props }">
            <el-button size="small" class="import-temp" @click.native="exportProductOrder(props)">
              {{ props.title }}
            </el-button>
          </template>
        </ImportBtn>

        <BillAttachment ref="billAttachment" @exportOrderBytemplate="exportOrderBytemplate" />

        <!-- 导出excel进度条弹框 -->
        <ExportProgressDialog
          v-if="exportProgressVisible"
          title="导出文件"
          :export-excel-detail="exportExcelDetail"
          :export-progress-visible="exportProgressVisible"
          @closeDialog="closeDialog"
        />
      </div>
      <!-- excel/pdf导出 -->
      <section class="btn-right">
        <section class="reset">
          <el-button size="mini" @click="reset">重置 </el-button>
        </section>
      </section>
    </header>
    <!-- 表格部分 -->
    <div class="tablebox">
      <ElTableContent
        :search="tableSearch"
        :list-query="listQuery"
        :table-data="tableData"
        :table-column="tableColumn"
        :select-option="selectList"
        :request-config="requestConfig"
        :action-width="80"
        :modular-type="modularType"
        column-permission-action="inspection-manage.inspect.defect:columnConfig"
        @filterSearch="filterSearch"
        @makeNewRequest="makeNewRequest"
        @select="hdselect"
        @selectionChange="selectionChange"
      />
    </div>
    <!-- 页码 -->
    <pagination3
      v-show="total > 0"
      style="align-items: center"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    >
      <selectedNumber style="flex: 1" :selected-number="multipleSelection.length" />
    </pagination3>
  </div>
</template>
<script>
import {
  getDefectRecords,
  getDocumentEnums,
  defectDefaultExportTemplate,
  defectUploadListTemplate,
  exportDefectExcel,
  getDefectExportProgress,
  defectUploadFileList,
  inspectsheetsDownloadListExportTemplate,
  inspectsheetsUploadFileDelete,
  getInspectTypeEnums
} from '@/api/quality-manage'
import { getMaterialType } from '@/api/product-management'
import ElTableContent from '@/components/ElTableColumn'
import Pagination3 from '@/components/Pagination3'
import { DEFECT_RECORDS, DEFECT_RECORDS_SEARCH } from './constant/records'
import ImportBtn from '@/views/common/importExcel/importbtn.vue'
import BillAttachment from '@/views/common/importExcel/billAttachment.vue'
import selectedNumber from '@/components/TableSelectedNumber'

export default {
  name: 'DefectRecord',
  components: {
    ElTableContent,
    Pagination3,
    BillAttachment,
    ImportBtn,
    selectedNumber,
    ExportProgressDialog: () => import('@/components/ExportProgressDialog')
  },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 20
      },
      total: 0,
      tableColumn: DEFECT_RECORDS,
      requestConfig: {
        isMaterial: false
      },
      tableData: [],
      selectList: [],
      tableSearch: DEFECT_RECORDS_SEARCH,
      billExportParams: {
        otherParams: {
          ptitle: '导出列表'
        },
        btnList: [
          {
            code: 'productOrderDownloadDefaultBillTemplate',
            type: 'exportDefaultTpl',
            title: '下载默认导出模板',
            exportDefualtApi: defectDefaultExportTemplate,
            permissions: {
              action: 'inspection-manage.inspect.defect:export:downDefaultTemplate'
            }
          },
          {
            code: 'productOrderUploadBillTemplate',
            type: 'slot',
            title: '上传/下载自定义导出模板',
            billType: 'uploadAndDownload',
            downLoadType: 'directDownLoad',
            permissions: {
              action: 'inspection-manage.inspect.defect:export:downUploadTemplate'
            },
            billApi: {
              queryFiles: defectUploadFileList,
              uploadFile: defectUploadListTemplate,
              deleteFile: inspectsheetsUploadFileDelete,
              downloadFile: inspectsheetsDownloadListExportTemplate
            }
          },

          {
            code: 'exportProductOrder',
            type: 'slot',
            title: '导出Excel',
            billType: 'downloadExcelByQueryParams',
            permissions: {
              action: 'inspection-manage.inspect.defect:export:excel'
            },
            billApi: {
              queryFiles: defectUploadFileList,
              exportProgress: getDefectExportProgress
            }
          },
          {
            code: 'productionWorkorderLogExport',
            type: 'viewLog',
            title: '查看日志',
            resultRoute: 'viewLog',
            permissions: {
              action: 'inspection-manage.inspect.defect:export:log',
              currentPath: this.currentPath
            },
            routeQuery: {
              importType: 'inspectDefectOrder',
              code: '产品检验-缺陷记录'
            }
          }
        ]
      },
      exportProgressVisible: false,
      modularType: 'inspectionByDefect',
      exportExcelDetail: {},
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 处理下拉选择
    filterSearch(name) {
      switch (name) {
        case 'documentTypeName':
          getDocumentEnums().then(res => {
            this.selectList = res.data.data
          })
          break
        case 'sheetTypeName':
          getInspectTypeEnums().then(res => {
            this.selectList = res.data.data
          })
          break
        case 'materialTypeName':
          getMaterialType().then(res => {
            this.selectList = res.data.data
          })
          break
      }
    },
    // 筛选完成回调
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        if (!this.listQuery.materialFields) {
          this.$set(this.listQuery, 'materialFields', {})
        }
        if (el === 'relateDocumentTypes') {
          this.listQuery[el] = val[el]?.split(',')
          return
        }
        if (el === 'sheetTypes') {
          this.listQuery[el] = val[el]?.split(',')
          return
        }
        if (el === 'materialName') {
          this.$set(this.listQuery.materialFields, 'name', val[el])
          return
        }
        if (el === 'materialCode') {
          this.$set(this.listQuery.materialFields, 'code', val[el])
          return
        }
        if (el === 'materialTypes') {
          this.$set(this.listQuery.materialFields, 'types', val[el])
          return
        }
        this.listQuery[el] = val[el]
      })
      this.getList()
    },
    async getList() {
      this.loading = true
      const res = await getDefectRecords(this.listQuery)
      this.loading = false
      const { data } = res.data
      this.tableData =
        data.records.map(item => {
          const { materialFields } = item
          return {
            ...item,
            materialCode: materialFields?.code,
            materialName: materialFields?.name,
            materialStandard: materialFields?.standard,
            materialTypeName: materialFields?.typeName
          }
        }) || []
      this.total = data.total
    },
    reset() {
      this.listQuery = {
        current: 1,
        size: 20
      }
      this.getList()
    },
    // 上传单据模板
    productOrderUploadBillTemplate(item) {
      this.$refs.billAttachment.show({
        dialogTitle: '上传单据模板',
        otherParams: item
      })
    },
    // 导出
    exportProductOrder(item) {
      const dialogTitle = item.billType === 'downloadPDF' ? '导出pdf' : '导出excel'
      this.$refs.billAttachment.show({
        dialogTitle,
        otherParams: {
          ...item,
          total: this.total || 0,
          multipleSelection: this.multipleSelection,
          isShowSelectExportRangeDialog: true
        }
      })
    },
    async exportOrderBytemplate(val) {
      const { id = '', exportExcelRangeRadio } = val
      let param = {
        ...this.listQuery,
        templateId: id
      }
      let selectedOption = []
      // 导出选中的数据
      if (exportExcelRangeRadio === 'checkedItem') {
        if (this.multipleSelection.length > 0) {
          selectedOption = this.multipleSelection.map(item => {
            return item.materialDefectId
          })
        }
        param = { ...param, relatedDefectIds: selectedOption }
      }
      if (this.total > 1000000) {
        try {
          await this.$confirm('当前导出数据超出100w行，超出部分不予导出！', '导出文件提示', { type: 'warning' })
          this.exportProgressExcelWorkOrder(param)
        } catch (error) {
          console.log(error, 'error')
        }
      } else {
        this.exportProgressExcelWorkOrder(param)
      }
    },
    async exportProgressExcelWorkOrder(params) {
      try {
        const {
          data: { status, data: taskId }
        } = await exportDefectExcel(params)
        if (+status === 1) {
          this.timer = setInterval(async () => {
            const result = await getDefectExportProgress(taskId)
            if (result.data.data.status === 2) {
              this.exportExcelDetail = result.data.data
              this.exportProgressVisible = true
            }
            // 失败
            if (result.data.data.status === 3) {
              this.$notify({
                type: 'warning',
                message: result.data.data.failedMessage || '导出失败，请稍后再试'
              })
              this.closeDialog()
            }
          }, 1000)
        }
      } catch (error) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    closeDialog() {
      clearInterval(this.timer)
      this.timer = null
      this.exportProgressVisible = false
    },
    selectionChange(val) {
      this.multipleSelection = val
    },
    hdselect(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.tablebox {
  height: calc(100vh - 75px) !important;
}
</style>
