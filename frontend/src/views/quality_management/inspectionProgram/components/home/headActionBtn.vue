<!--
 * @Author: shunhua.liang
 * @Date: 2022-08-29 11:59:30
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-23 16:52:56
 * @Description: 销售订单页面头部按钮区域
-->

<template>
  <div class="level">
    <section
      v-permission="{ action: 'qms-product-inspection.inspection-manage.scheme:add' }"
      class="add-btn centre2"
      style="margin-right: 0"
      @click="handleAdd"
    >
      <div class="add-text">新增检验方案</div>
    </section>
    <el-button
      v-if="isExistApproveBtn"
      class="btn"
      style="margin-left: 10px"
      type="primary"
      :disabled="computedNotBtnAuthList('qms-product-inspection.inspection-manage.scheme:batchApproval')"
      @click="hdBtnBacthAudit"
    >
      批量审批
    </el-button>
    <el-button
      v-permission="{ action: 'qms-product-inspection.inspection-manage.scheme:batchUpdate' }"
      style="margin-left: 10px"
      class="btn"
      type="primary"
      @click="hdBtnBacthEdit"
    >
      批量编辑
    </el-button>
    <!--导入管理-->
    <Importbtn
      v-permission="{ action: 'qms-product-inspection.inspection-manage.scheme:importManage' }"
      :import-params="importParams"
      class="Importbtn"
      style="margin-left: 8px"
      @updateList="updateList"
    >
      <!-- 导入数据 -->
      <template #procedureImport="{ props }">
        <el-button size="small" class="import-temp" @click.native="getImportType(props)">
          {{ props.title }}
        </el-button>
      </template>
    </Importbtn>
    <!--导出列表-->
    <Importbtn
      v-permission="{ action: 'qms-product-inspection.inspection-manage.scheme:exportList' }"
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
    </Importbtn>
    <!--审批弹窗-->
    <ApprovaDialog ref="approvaDialog" @updateList="updateList" />
    <!-- 批量编辑弹窗 -->
    <StatusDialog
      v-if="isShowBatchDialog"
      :visible.sync="isShowBatchDialog"
      :multip-edit-form="multipEditForm"
      :is-exist-approve-btn="isExistApproveBtn"
      @updateList="updateList"
    />
    <!-- excel/pdf导出 -->
    <BillAttachment
      ref="billAttachment"
      :export-excel-multiple-selection-param="exportExcelMultipleSelectionParam"
      @exportOrderBytemplate="exportOrderBytemplate"
    />
    <!--导出进度-->
    <ExportProgressDialog
      v-if="exportProgressVisible"
      title="导出文件"
      :export-excel-detail="exportExcelDetail"
      :export-progress-visible="exportProgressVisible"
      @closeDialog="closeDialog"
    />
    <!-- 选择导入类型 -->
    <SelectImportType
      v-if="selectImportTypeDialogVisible"
      :select-import-type-dialog-visible="selectImportTypeDialogVisible"
      :select-import-params="selectImportParams"
      @confirm="handleConfirmSelectImport"
      @cancel="handleCancelSelectImport"
    />

    <!-- 弹出层 -->
    <el-dialog
      width="30%"
      class="import-dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :visible.sync="showPopover"
    >
      <div class="import-box">
        <p>导入进度：</p>
        <el-progress :percentage="DataImportPercentage" color="#409eff" :stroke-width="15" />
      </div>
      <div class="down-loadfiles">
        <span>{{ executionDescription }}</span>
        <el-button type="primary" size="small" :disabled="!url" @click="progressDownLoad">点击下载</el-button>
      </div>
      <div class="btn-cancel">
        <el-button type="primary" size="small" @click="closeThisDialog">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ExportProgressDialog from '@/components/ExportProgressDialog'
import BillAttachment from '@/views/common/importExcel/billAttachment.vue'
import { saveAs } from 'file-saver'
import {
  downDefaultCheckPlan,
  uploadCheckPlanImport,
  getCheckPlanImportProgress,
  uploadcheckPlanImportTemplate,
  checkPlanCustomTemplateExport,
  checkPlanImportTemplateExport,
  schemesDefaultExportTemplate,
  schemesUploadListExportTemplate,
  schemesQueryUploadFileListWork,
  schemesUploadFileDelete,
  schemesDownloadListExportTemplate,
  schemesExportTask,
  getSchemesSycExports
} from '@/api/quality-manage'
import Importbtn from '@/views/common/importExcel/importbtn.vue'
import SelectImportType from '@/views/common/importExcel/SelectImportType.vue'
import ApprovaDialog from '../dialog/approvaDialog.vue'
import StatusDialog from '../dialog/statusDialog'
import { progressDownLoad } from '@/api/base'

export default {
  components: {
    Importbtn,
    ApprovaDialog,
    StatusDialog,
    ExportProgressDialog,
    BillAttachment,
    SelectImportType
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
    },
    orderBtnType: {
      type: String
    }
  },
  data() {
    return {
      currentPath: '', // 当前路由地址（截取‘#’后面）
      isShowBatchDialog: false, // 批量编辑弹窗控制
      multipEditForm: [],
      showPopover: false,
      DataImportPercentage: 0,
      executionDescription: '',
      url: '',
      executionStatus: false,
      // 导入配置
      importParams: {
        otherParams: {
          ptitle: '导入管理'
        },
        btnList: [
          {
            code: 'downDefaultCheckPlan',
            type: 'exportDefaultTpl',
            title: '下载默认转换模板',
            exportDefualtApi: downDefaultCheckPlan,
            name: '产品检验方案导入模板',
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:downDefaultImportTemplate' }
          },
          {
            code: 'checkPlanImportTemplate',
            type: 'importTpl',
            title: '上传自定义转换模板',
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:uploadCustomTemplate' },
            uploadApi: uploadcheckPlanImportTemplate
          },
          {
            code: 'checkPlanCustomTemplateExport',
            type: 'exportDefaultTpl',
            title: '下载自定义转换模板',
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:downCustomTemplate' },
            exportDefualtApi: checkPlanCustomTemplateExport
          },
          {
            code: 'checkPlanImportTemplateExport',
            type: 'exportTpl',
            title: '下载导入模板',
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:downCustomImportTemplate' },
            exportApi: checkPlanImportTemplateExport,
            name: '产品检验方案导入模板'
          },
          {
            code: 'procedureImport',
            type: 'slot',
            title: '导入数据',
            uploadApi: uploadCheckPlanImport,
            progressApi: getCheckPlanImportProgress,
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:importData' },
            dialogParams: {
              fileName: '检验方案.xlsx',
              code: '检验方案',
              importType: 'schemeImport',
              isExcel: true
            }
          },
          {
            code: 'procedureLogExport',
            type: 'exportLog',
            title: '查看日志',
            resultRoute: 'historyResult',
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:importLog' },
            routeQuery: {
              importType: 'schemeImport',
              code: '产品检验方案'
            }
          }
        ]
      },
      // 导出配置
      billExportParams: {
        otherParams: {
          ptitle: '导出列表'
        },
        btnList: [
          {
            code: 'productOrderDownloadDefaultBillTemplate',
            type: 'exportDefaultTpl',
            title: '下载默认导出模板',
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:downDefaultExportTemplate' },
            exportDefualtApi: schemesDefaultExportTemplate
          },
          {
            code: 'productOrderUploadBillTemplate',
            type: 'slot',
            title: '上传/下载自定义导出模板',
            billType: 'uploadAndDownload',
            downLoadType: 'directDownLoad',
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:uploadCustomExportTemplate' },
            billApi: {
              queryFiles: schemesQueryUploadFileListWork,
              uploadFile: schemesUploadListExportTemplate,
              deleteFile: schemesUploadFileDelete,
              downloadFile: schemesDownloadListExportTemplate
            }
          },
          {
            code: 'exportProductOrder',
            type: 'slot',
            title: '导出Excel',
            billType: 'downloadExcelByQueryParams',
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:export' },
            billApi: {
              queryFiles: schemesQueryUploadFileListWork,
              exportProgress: schemesExportTask
            }
          },
          {
            code: 'productionWorkorderLogExport',
            type: 'viewLog',
            title: '查看日志',
            resultRoute: 'viewLog',
            permissions: { action: 'qms-product-inspection.inspection-manage.scheme:exportLog' },
            routeQuery: {
              importType: 'scheme',
              code: '产品检验方案'
            }
          }
        ]
      },
      // 下载打印配置
      billPDFImportParams: {
        otherParams: {
          ptitle: '下载/打印单据'
        },
        btnList: [
          {
            code: 'productOrderDownloadDefaultBillTemplate',
            type: 'exportDefaultTpl',
            title: '下载默认打印模板',
            exportDefualtApi: ''
          },
          {
            code: 'productOrderUploadBillTemplate',
            type: 'slot',
            title: '上传/下载自定义打印模板',
            billType: 'uploadAndDownload',
            billApi: {
              queryFiles: '',
              uploadFile: '',
              downloadFile: '',
              deleteFile: ''
            }
          },
          {
            code: 'productOrderPrintBillTemplateExport',
            type: 'slot',
            title: '下载/打印pdf',
            billType: 'downloadPDF',
            billApi: {
              queryFiles: '',
              exportPDF: ''
            }
          },
          {
            code: 'productOrderPrintBillExcelTemplateExport',
            type: 'slot',
            title: '导出Excel',
            billType: 'downloadExcel',
            billApi: {
              queryFiles: '',
              exportExcel: ''
            }
          }
        ]
      },
      exportProgressVisible: false, // 导出进度弹窗
      exportExcelDetail: {},
      selectImportTypeDialogVisible: false,
      // 导入配置
      selectImportParams: {
        btn: {
          uploadApi: uploadCheckPlanImport,
          progressApi: getCheckPlanImportProgress
        },
        dialogParams: {
          fileName: '检验方案.xlsx',
          code: '检验方案',
          importType: 'productInspectionScheme',
          isExcel: true
        }
      }
    }
  },
  computed: {
    exportExcelMultipleSelectionParam() {
      return this.multipleSelection.length > 0
        ? {
          relatedMaterialIds: this.multipleSelection.map(item => {
            return item.schemeId
          })
        }
        : {}
    },
    computedNotBtnAuthList() {
      return val => {
        const authList = this.$store.getters.authList?.map(auth => auth.path)
        return authList.indexOf(val) === -1
      }
    }
  },
  methods: {
    async exportOrderBytemplate(val) {
      const { id = '', exportExcelRangeRadio } = val
      let param = {
        ...this.listQuery,
        templateId: id
      }
      if (exportExcelRangeRadio === 'checkedItem') {
        param = { ...param, ...this.exportExcelMultipleSelectionParam }
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
    // 取消关闭弹窗
    closeThisDialog() {
      this.showPopover = false
      this.$emit('updateList')
    },
    // 进度条内下载附件
    progressDownLoad() {
      console.log('进度条内下载附件', this.selectImportParams.dialogParams)

      const { importType = '', isExcel = '', fileName = '' } = this.selectImportParams.dialogParams
      console.log('进度条内下载附件 importType', importType)
      console.log('进度条内下载附件 isExcel', isExcel)
      console.log('进度条内下载附件 fileName', fileName)

      console.log('进度条内下载附件 this.url', this.url)

      if (isExcel) {
        saveAs(window.origin + '/' + this.url, fileName)
        return
      } else {
        const params = {
          importType: importType,
          url: this.url
        }
        console.log('进度条内下载附件 params', params)

        progressDownLoad(params).then(res => {
          console.log(res)
          const fileName = res?.filename?.match(/filename?="((.+)\.(.+))";/)[1]
          const fileNameCN = decodeURI(fileName) // 中文解码

          console.log('进度条内下载附件 res', res)

          saveAs(res, fileNameCN)
        })
      }
    },
    async exportProgressExcelWorkOrder(params) {
      try {
        const {
          data: { status, data: taskId }
        } = await getSchemesSycExports(params)
        if (+status === 1) {
          this.timer = setInterval(async() => {
            const result = await schemesExportTask(taskId)
            console.log('result', result)
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
    // 创建新订单
    handleAdd() {
      // 存储到 sessionStorage
      this.listQuery.orderBtnType = this.orderBtnType
      this.$setForwardSessionCommon(this.listQuery)
      this.$router.push({
        name: 'inspectionProgramAdd'
      })
    },
    // 批量审批
    hdBtnBacthAudit() {
      this.$refs.approvaDialog.open({
        multipleSelection: this.multipleSelection
      })
    },
    // 批量编辑状态
    hdBtnBacthEdit() {
      if (this.multipleSelection.length === 0) {
        return this.$notify({
          title: '提示',
          message: '请选择数据',
          type: 'warning',
          duration: 1000
        })
      }
      const uniStates = Array.from(new Set(this.multipleSelection.map(i => i.status)))
      if (uniStates.length > 1) {
        return this.$notify({
          title: '提示',
          message: '所选状态不一致，请重新选择',
          type: 'warning',
          duration: 1000
        })
      }
      this.multipEditForm = {
        status: uniStates[0],
        ids: this.multipleSelection.map(i => i.schemeId)
      }
      this.isShowBatchDialog = true
    },
    // 更新列表
    updateList() {
      this.isShowBatchDialog = false
      this.$emit('updateList')
    },
    // 导入类型
    getImportType() {
      this.selectImportTypeDialogVisible = true
    },
    handleCancelSelectImport() {
      this.selectImportTypeDialogVisible = false
    },
    handleConfirmSelectImport(data) {
      this.selectImportTypeDialogVisible = false
      const { progress, executionDescription, importUrl, executionStatus } = data || {}
      this.showPopover = true
      this.DataImportPercentage = +(progress * 100).toFixed(2)
      this.executionDescription = executionDescription
      this.url = importUrl
      this.executionStatus = executionStatus
      //  这边做导出操作
      this.handleCancelSelectImport()
    }
  }
}
</script>

<style lang="scss" scoped>
.level {
  height: 32px;

  .add-btn {
    padding: 0 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1890ff;
    border: 1px solid #1890ff;
    opacity: 1;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 2px;
    .add-img {
      width: 16px;
      height: 16px;
      margin: 0 8px 0 0;
    }

    .add-text {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      opacity: 1;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.import-dialog {
  .import-box {
    display: flex;
    align-items: center;
    p {
      width: 100px;
      margin: 10px 0;
      font-size: 20px;
      color: #333;
    }
    ::v-deep .el-progress {
      flex: 1;
      .el-progress-bar {
        padding-right: 70px;
        margin-right: -75px;
      }
    }
  }
  .down-loadfiles {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
    }
    > button {
      align-self: flex-start;
    }
  }
  .btn-cancel {
    text-align: center;
  }
  .el-icon-close:before {
    content: '';
  }
}
</style>
