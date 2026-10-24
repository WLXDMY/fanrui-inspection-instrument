<!--
 * @Author: limengjuan
 * @Date: 2021-12-14 09:45:25
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-08 10:43:47
 * @Description: 通用检验单
-->
<template>
  <div class="container">
    <header style="margin-bottom: 10px" class="btns">
      <div class="btn-left">
        <el-button
          v-permission="{ action: 'inspection-manage.inspect:add' }"
          class="add-btn centre2"
          type="primary"
          @click="enterAdd"
        >
          新增
        </el-button>
        <el-button
          v-permission="{ action: 'inspection-manage.inspect:batchApproval' }"
          class="add-btn centre2"
          type="primary"
          @click="hdBtnBacthAudit"
        >
          批量审批
        </el-button>
        <el-button
          v-permission="{ action: 'inspection-manage.inspect:batchUpdate' }"
          class="add-btn centre2"
          type="primary"
          @click="hdBtnBacthStatus"
        >
          批量编辑
        </el-button>
        <!--导入管理-->
        <ImportBtn
          :import-params="importParams"
          class="Importbtn"
          style="margin-left: 8px"
          @updateList="getList"
        />

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
        <!--下载/打印单据-->
        <div
          v-permission="{
            action: 'inspection.sheet:downPrintExceipt'
          }"
          style="height: 32px; overflow: hidden; display: flex; align-items: center"
        >
          <ImportBtn :import-params="billImportParams()" @updateList="getList">
            <template #inspectionUploadBillTemplate="{ props }">
              <el-button size="small" class="import-temp" @click.native="inspectionUploadBillTemplate(props)">
                {{ props.title }}
              </el-button>
            </template>
            <template #inspectionPrintBillTemplateExport="{ props }">
              <el-button size="small" class="import-temp" @click.native="pdfDownload(props)">
                {{ props.title }}
              </el-button>
            </template>
            <template #inspectionPrintBillExcelTemplateExport="{ props }">
              <el-button size="small" class="import-temp" @click.native="pdfDownload(props)">
                {{ props.title }}
              </el-button>
            </template>
          </ImportBtn>
        </div>

        <BillAttachment
          ref="billAttachment"
          :export-excel-multiple-selection-param="exportExcelMultipleSelectionParam"
          @exportOrderBytemplate="exportOrderBytemplate"
        />
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
        <button :class="btnType === 'material' && 'active-btn'" class="button-font" @click="changeBtn('material')">
          按物料
        </button>
        <button :class="btnType === 'order' && 'active-btn'" class="button-font" @click="changeBtn('order')">
          按单
        </button>
        <section class="reset">
          <el-button size="mini" @click="reset">重置 </el-button>
        </section>
      </section>
    </header>
    <!-- 表格部分 -->
    <div class="tablebox">
      <ElTableContent
        :table-loading="loading"
        :search="tableSearch"
        :list-query="listQuery"
        :table-data="tableData"
        :table-column="tableColumn"
        :action-width="250"
        :select-option="selectList"
        :request-config="requestConfig"
        :modular-type="modularType"
        column-permission-action="inspection-manage.inspect:columnConfig"
        @filterSearch="filterSearch"
        @makeNewRequest="makeNewRequest"
        @select="hdselect"
        @selectionChange="selectionChange"
      >
        <template v-slot:tableAction="{ row }">
          <div class="level buttons" style="padding: 0 5px">
            <!-- <div
              v-permission="{
                action: 'product.inspection.inspectionsheets:copy'
              }"
              class="edit-text"
              @click="enterCopy(row)"
            >
              复制
            </div> -->
            <div
              v-permission="{
                action: 'inspection-manage.inspect:update'
              }"
              class="edit-text"
              @click="enterEdit(row)"
            >
              编辑
            </div>
            <div
              v-permission="{
                action: 'inspection-manage.inspect:select'
              }"
              class="details-btn"
              @click="enterDetail(row)"
            >
              详情
            </div>

            <el-dropdown class="more-btn" @command="handleCommand">
              <span class="el-dropdown-link"> 更多 <i class="el-icon-arrow-down el-icon--right" /> </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span v-if="row.approvalStatus == 0 || row.approvalStatus == 3" @click="handleSubmit(row)">提交审批</span>
                </el-dropdown-item>

                <el-dropdown-item>
                  <span v-if="row.approvalStatus == 1 && row.existApprove == 1 && row.approvalStatus != 2 && row.approvalStatus != 5" @click="handleAudit(row)">审批</span>
                  <span v-else style="color: rgb(166, 174, 190); cursor: not-allowed">审批</span>
                </el-dropdown-item>

                <el-dropdown-item
                  v-permission="{
                    action: 'inspection-manage.inspect:delete'
                  }"
                >
                  <span v-if="row.status === 1" class="delete-text" @click="deleteThis(row)"> 删除</span>
                  <span v-else style="color: #a6aebe; cursor: not-allowed" class="delete-text"> 删除</span>
                </el-dropdown-item>
                <el-dropdown-item :command="{ method: copyCheckPlan, row: row }" class="edit-text">
                  复制
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </ElTableContent>
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
    <!--审批弹窗-->
    <ApprovaDialog ref="approvaDialog" :btn-type="btnType" @updateList="getList" />
    <!--批量编辑弹窗-->
    <StatusDialog
      v-if="isShowBatchDialog"
      :visible.sync="isShowBatchDialog"
      :multip-edit-form="multipEditForm"
      :is-exist-approve-btn="isExistApproveBtn"
      @updateList="batchStatesUpdateCb"
    />
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
import { getMaterialWordList } from '@/api/common'
import lodash from 'lodash'

import {
  // getExportTemplateExportDefault,
  downloadInspectionDefTpl,
  getExportTemplateList, // 查看模板
  getExportTemplateUpload, // 上传模板
  getExportTemplateExport, // 下载模板
  getExportTemplateExportDelete, // 删除模板
  // getExportPrintPDF, // 导出pdf
  InspectionPDFDownload,
  inspectionExportExcel,
  inspectsSubmit
} from '@/api/quality-manage'
import {
  deleteCheckSheet,
  getCheckUnitStatus,
  getCheckMasterialStatus,
  downloadSheetExportData,
  linesList,
  getApprovalStatus,
  getCheckUnitType,
  inspectsheetsDownloadListExportTemplate,
  inspectsheetsUploadListExportTemplate,
  inspectsheetsQueryUploadFileListWork,
  inspectsheetsDefaultExportTemplate,
  inspectsheetsUploadFileDelete,
  getinspectsheetsExportTask,
  getinspectsheetsSycExports,
  getInspectTypeEnums,
  getDocumentEnums
} from '@/api/quality-manage'

import { getCheckUnitListByOrder, getCheckUnitListByMaterial } from '@/api/quality-manage'
import { uploadSeal } from '@/api/common.js'
import Pagination3 from '@/components/Pagination3'
import { CHECK_SHEET_LIST, CHECK_SHEET_ORDER, CHECK_SHEET_MATERIAL } from './const/columnList.js'
import { saveAs } from 'file-saver'
import ElTableContent from '@/components/ElTableColumn'
import BillAttachment from '@/views/common/importExcel/billAttachment.vue'
import ImportBtn from '@/views/common/importExcel/importbtn.vue'
import selectedNumber from '@/components/TableSelectedNumber'
import ApprovaDialog from './components/approvaDialog.vue' // 批量审批
import StatusDialog from './components/statusDialog.vue' // 批量编辑
import { Number } from 'core-js'
import { mapGetters } from 'vuex'
import {
  // 导入管理
  downDefaultCheckPlanInspectionSheet,
  uploadCheckPlanImportInspectionSheet,
  getCheckPlanImportProgressInspectionSheet,
  uploadcheckPlanImportTemplateInspectionSheet,
  checkPlanCustomTemplateExportInspectionSheet,
  checkPlanImportTemplateExportInspectionSheet
} from '@/api/quality-manage'

const FULLROUTECODE = '/inspection-manage/qms-product-inspection/productInspection' // 当前模块配置关键字
const PAGEFULLPATHCODE = 'qmsInsepct.qmsInsepctList.qmsInsepctByMaterialList' // 当前页配置关键字

export default {
  components: {
    Pagination3,
    ElTableContent,
    BillAttachment,
    ImportBtn,
    selectedNumber,
    ExportProgressDialog: () => import('@/components/ExportProgressDialog'),
    ApprovaDialog,
    StatusDialog
  },
  data() {
    return {
      receiptOrderVisible: false,
      window,
      btnType: '',
      // btnType: 'material',
      bulkImportList: [],
      tableData: [], // 表格数据
      checkStatusList: [], // 送检状态下拉
      listQuery: {
        current: 1,
        size: 20
      },
      total: 0,
      currentpageSizeNum: 10,
      loading: false,
      tableColumn: CHECK_SHEET_MATERIAL,
      tableSearch: CHECK_SHEET_LIST,
      // 物料扩展字段
      materialTableColumn: [],
      // 物料行扩展字段1-10
      inspectMaterialTableColumn: [
        {
          id: uuidv4(),
          label: '物料扩展字段1',
          code: 'inspectMaterialExtendFieldOne',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        },
        {
          id: uuidv4(),
          label: '物料扩展字段2',
          code: 'inspectMaterialExtendFieldTwo',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        },
        {
          id: uuidv4(),
          label: '物料扩展字段3',
          code: 'inspectMaterialExtendFieldThree',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        }, {
          id: uuidv4(),
          label: '物料扩展字段4',
          code: 'inspectMaterialExtendFieldFour',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        }, {
          id: uuidv4(),
          label: '物料扩展字段5',
          code: 'inspectMaterialExtendFieldFive',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        }, {
          id: uuidv4(),
          label: '物料扩展字段6',
          code: 'inspectMaterialExtendFieldSix',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        }, {
          id: uuidv4(),
          label: '物料扩展字段7',
          code: 'inspectMaterialExtendFieldSeven',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        }, {
          id: uuidv4(),
          label: '物料扩展字段8',
          code: 'inspectMaterialExtendFieldEight',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        }, {
          id: uuidv4(),
          label: '物料扩展字段9',
          code: 'inspectMaterialExtendFieldNine',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        }, {
          id: uuidv4(),
          label: '物料扩展字段10',
          code: 'inspectMaterialExtendFieldTen',
          type: null,
          width: null,
          fixed: null,
          minWidth: '160',
          // columnType: '',
          columnType: 'material',
          showOverflowTooltip: true
        }
      ],
      selectList: [],
      requestConfig: {
        approval: 'inspectOrder',
        approvalFields: [''],
        // approvalFields: ['approvalStatusName'],
        isMaterial: false
      },
      multipleSelection: [],
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
            exportDefualtApi: downDefaultCheckPlanInspectionSheet,
            name: '产品检验方案导入模板',
            permissions: { action: 'inspection-manage.inspect.import:downDefaultImportTemplate' }
          },
          {
            code: 'checkPlanImportTemplate',
            type: 'importTpl',
            title: '上传自定义转换模板',
            permissions: { action: 'inspection-manage.inspect.import:uploadCustomTemplate' },
            uploadApi: uploadcheckPlanImportTemplateInspectionSheet
          },
          {
            code: 'checkPlanCustomTemplateExport',
            type: 'exportDefaultTpl',
            title: '下载自定义转换模板',
            permissions: { action: 'inspection-manage.inspect.import:downCustomTemplate' },
            exportDefualtApi: checkPlanCustomTemplateExportInspectionSheet
          },
          {
            code: 'checkPlanImportTemplateExport',
            type: 'exportTpl',
            title: '下载导入模板',
            permissions: { action: 'inspection-manage.inspect.import:downCustomImportTemplate' },
            exportApi: checkPlanImportTemplateExportInspectionSheet,
            name: '产品检验方案导入模板'
          },
          {
            code: 'procedureImport',
            type: 'import',
            // type: 'slot',
            title: '导入数据',
            uploadApi: uploadCheckPlanImportInspectionSheet,
            progressApi: getCheckPlanImportProgressInspectionSheet,
            permissions: { action: 'inspection-manage.inspect.import:importData' },
            dialogParams: {
              fileName: '产品检验单.xlsx',
              code: '产品检验单',
              importType: 'inspectImport',
              isExcel: true
            }
          },
          {
            code: 'procedureLogExport',
            type: 'exportLog',
            title: '查看日志',
            resultRoute: 'historyResult',
            permissions: { action: 'inspection-manage.inspect.import:importLog' },
            routeQuery: {
              importType: 'inspectImport',
              code: '产品检验单'
            }
          }
        ]
      },
      billExportParams: {
        otherParams: {
          ptitle: '导出列表'
        },
        btnList: [
          {
            code: 'productOrderDownloadDefaultBillTemplate',
            type: 'exportDefaultTpl',
            title: '下载默认导出模板',
            exportDefualtApi: inspectsheetsDefaultExportTemplate,
            permissions: {
              action: 'inspection-manage.inspect:export:downDefaultTemplate'
            }
          },
          {
            code: 'productOrderUploadBillTemplate',
            type: 'slot',
            title: '上传/下载自定义导出模板',
            billType: 'uploadAndDownload',
            downLoadType: 'directDownLoad',
            permissions: {
              action: 'inspection-manage.inspect:export:downUploadTemplate'
            },
            billApi: {
              queryFiles: inspectsheetsQueryUploadFileListWork,
              uploadFile: inspectsheetsUploadListExportTemplate,
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
              action: 'inspection-manage.inspect:export:excel'
            },
            billApi: {
              queryFiles: inspectsheetsQueryUploadFileListWork,
              exportProgress: getinspectsheetsExportTask
            }
          },
          {
            code: 'productionWorkorderLogExport',
            type: 'viewLog',
            title: '查看日志',
            resultRoute: 'viewLog',
            permissions: {
              action: 'inspection-manage.inspect:export:log',
              currentPath: this.currentPath
            },
            routeQuery: {
              importType: 'inspectOrder',
              code: '产品检验-送检单'
            }
          }
        ]
      },
      exportProgressVisible: false,
      exportExcelDetail: {},
      modularType: 'inspectionByMaterial',
      isExistApproveBtn: false, // 审批权限
      isShowBatchDialog: false, // 批量状态编辑弹窗
      multipEditForm: {}, // 批量状态编辑传递的数据
      selectImportTypeDialogVisible: false,
      // 导入配置
      selectImportParams: {
        btn: {
          uploadApi: uploadCheckPlanImportInspectionSheet,
          progressApi: getCheckPlanImportProgressInspectionSheet
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
    ...mapGetters(['fieldRuleDetail']),
    exportExcelMultipleSelectionParam() {
      return this.multipleSelection.length > 0
        ? {
          relatedMaterialIds: this.multipleSelection.map(item => {
            return this.btnType === 'material' ? item.material.id : item.id
          }),
          showType: this.btnType // 按单还是按物料
        }
        : {
          showType: this.btnType // 按单还是按物料
        }
    }
  },
  watch: {
    fieldRuleDetail: {
      handler(newVal) {
        // 动态字段配置有值则更新字段
        Object.keys(newVal?.[FULLROUTECODE] || {}).length &&
        this.initFields()
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getMaterialFields()

    this.listQuery = this.$getForwardSessionTab(
      {
        current: 'current',
        size: 'size'
      },
      'checkSheet'
    )
    // 读取缓存中的按单/按物料
    this.btnType = this.listQuery.btnType ? this.listQuery.btnType : this.btnType ? this.btnType : 'material'
    delete this.listQuery.btnType

    console.log('created btnType', this.btnType)

    this.changeBtn(this.btnType, 0)

    this.getList()
    this.getCheckUnitStatus() // 获取状态
    this.getCheckMasterialStatus() // 获取检验状态
  },
  mounted() {
    this.$eventBus.$on('refreshList', _ => {
      this.getList()
    })
  },
  beforeDestroy() {
    this.$eventBus.$off('refreshList')
    sessionStorage.removeItem('pushDownListSession')
  },
  methods: {
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
    },
    // 导入类型
    getImportType() {
      this.selectImportTypeDialogVisible = true
    },
    // 物料拓展字段
    async getMaterialFields() {
      const {
        data: { code, data }
      } = await getMaterialWordList()

      if (code === '200') {
        this.materialTableColumn = data?.map(item => {
          return {
            id: uuidv4(),
            label: item.fieldName,
            code: item.fieldCode,
            type: null,
            width: null,
            fixed: null,
            minWidth: '160',
            // columnType: '',
            columnType: 'material',
            showOverflowTooltip: true
          }
        })

        // this.tableColumn.push(
        //   ...data?.map(item => {
        //     return {
        //       id: uuidv4(),
        //       label: item.fieldName,
        //       code: item.fieldCode,
        //       type: null,
        //       width: null,
        //       fixed: null,
        //       minWidth: '160',
        //       // columnType: '',
        //       columnType: 'material',
        //       showOverflowTooltip: true
        //     }
        //   })
        // )
        // console.log('物料拓展字段 123', this.tableColumn)
      }
    },
    // 动态字段配置处理且特征参数配置处理
    async initFields() {
      await this.getMaterialFields()
      // 每次处理前先清空
      this.tableColumn = null

      // 判断是按物料还是单
      let tableColumn = lodash.cloneDeep(CHECK_SHEET_MATERIAL)
      let keyWord = PAGEFULLPATHCODE
      if (this.btnType === 'material') {
        tableColumn = lodash.cloneDeep(CHECK_SHEET_MATERIAL)
        tableColumn.push(...this.materialTableColumn)
        // 物料行扩展字段1-10
        tableColumn.push(...this.inspectMaterialTableColumn)

        keyWord = 'qmsInsepct.qmsInsepctList.qmsInsepctByMaterialList'
      } else if (this.btnType === 'order') {
        tableColumn = CHECK_SHEET_ORDER
        keyWord = 'qmsInsepct.qmsInsepctList.qmsInsepctByInspectList'
      }

      this.tableColumn = tableColumn.flatMap(item => {
        const currentConfig =
          this.fieldRuleDetail?.[FULLROUTECODE]?.[keyWord]?.find(i => i.fieldCode === item.code) || {}
        return currentConfig?.isShow || currentConfig?.isShow === undefined || item.code === 'operate'
          ? [
            {
              ...item,
              label: currentConfig.fieldCustomName || currentConfig.fieldDefaultName || item.label
            }
          ]
          : []
      })
    },
    // 获取检验类型枚举
    async getInspectTypeEnums() {
      const result = await getInspectTypeEnums()
      const { data } = result.data || []
      return data
    },
    // 是否开启审批
    handleApprovalStatus(val) {
      // this.isExistApproveBtn = val
      // if (!this.isExistApproveBtn) {
      //   this.deleteColumn()
      // }
    },
    deleteColumn() {
      const hasIndex = this.tableColumn.findIndex(item => {
        return item.code === 'approvalStatusName'
      })
      if (hasIndex !== -1) {
        this.tableColumn.splice(hasIndex, 1)
      }

      const hasIndex1 = this.tableColumn.findIndex(item => {
        return item.code === 'approverName'
      })
      if (hasIndex1 !== -1) {
        this.tableColumn.splice(hasIndex1, 1)
      }
    },
    // 批量编辑
    hdBtnBacthStatus() {
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
        state: uniStates[0],
        ids: this.multipleSelection.map(i => i.id)
      }
      this.isShowBatchDialog = true
    },
    // 批量编辑完成回调
    batchStatesUpdateCb() {
      this.isShowBatchDialog = false
      this.getList()
    },
    // 批量审批
    hdBtnBacthAudit() {
      this.$refs.approvaDialog.open({
        multipleSelection: this.multipleSelection
      })
    },
    // 单个审批
    handleAudit(row) {
      this.$refs.approvaDialog.open({
        multipleSelection: [row]
      })
    },
    // 提交接口
    handleSubmit(row) {
      this.$confirm('是否提交审批? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: row.id
        }
        inspectsSubmit(params).then(res => {
          if (+res.data.status === 1) {
            this.$notify({
              title: '提示',
              message: '提交审批成功',
              type: 'success',
              duration: 2000
            })
            // 更新数据情况
            this.getList()
          }
        })
      })
    },
    changeBtn(type, flag = 1) {
      // 每次处理前先清空
      this.tableColumn = null

      if (type === this.btnType && flag) return
      if (type === 'material') {
        this.modularType = 'inspectionByMaterial'
        this.tableColumn = lodash.cloneDeep(CHECK_SHEET_MATERIAL)
        this.tableColumn.push(...this.materialTableColumn)
        // 物料行扩展字段1-10
        this.tableColumn.push(...this.inspectMaterialTableColumn)
      } else {
        this.modularType = 'inspectionByOrder'
        this.tableColumn = CHECK_SHEET_ORDER
      }

      this.btnType = type
      this.getList()
      this.initFields()
    },
    selectionChange(val) {
      this.multipleSelection = val
    },
    hdselect(val) {
      this.multipleSelection = val
    },
    // 上传单据模板
    inspectionUploadBillTemplate(item) {
      this.$refs.billAttachment.show({
        dialogTitle: '上传单据模板',
        otherParams: item
      })
    },
    pdfDownload(item) {
      const exportBillNumberList = this.multipleSelection.map(item => item.code)
      if (exportBillNumberList.length === 0) {
        this.$notify({
          title: '成功',
          message: '请至少选择一项数据',
          type: 'warning',
          duration: 2000
        })
        return
      }
      const dialogTitle = item.billType === 'downloadPDF' ? '导出pdf' : '导出excel'
      const billParams = {
        // 单据号
        exportBillNumberList
      }
      if (item.billApi.exportPDFParams) {
        billParams.generalOrder = true
      }
      this.$refs.billAttachment.show({
        dialogTitle,
        otherParams: {
          ...item,
          billParams
        }
      })
    },
    // 下载打印单据配置项列表
    billImportParams() {
      return {
        otherParams: {
          ptitle: '下载/打印单据'
        },
        btnList: [
          {
            code: 'InspectionDownloadDefaultBillTemplate',
            type: 'exportDefaultTpl',
            title: '下载默认打印模板',
            exportDefualtApi: downloadInspectionDefTpl,
            permissions: {
              action: 'inspection-manage.inspect:print:downDefaultTemplate'
            }
          },
          {
            code: 'inspectionUploadBillTemplate',
            type: 'slot',
            title: '上传/下载自定义打印模板',
            billType: 'uploadAndDownload',
            downLoadType: 'directDownLoad',
            billApi: {
              queryFiles: getExportTemplateList,
              uploadFile: getExportTemplateUpload,
              downloadFile: getExportTemplateExport,
              deleteFile: getExportTemplateExportDelete
            },
            permissions: {
              action: 'inspection-manage.inspect:print:downUploadPrintTemplate'
            }
          },
          {
            code: 'inspectionPrintBillTemplateExport',
            type: 'slot',
            title: '下载/打印pdf',
            billType: 'downloadPDF',
            billApi: {
              queryFiles: getExportTemplateList,
              exportPDF: InspectionPDFDownload,
              exportPDFParams: true
            },
            permissions: {
              action: 'inspection-manage.inspect:print:exportPdf'
            }
          },
          {
            code: 'inspectionPrintBillExcelTemplateExport',
            type: 'slot',
            title: '导出Excel',
            billType: 'downloadExcel',
            billApi: {
              queryFiles: getExportTemplateList,
              exportExcel: inspectionExportExcel,
              exportPDFParams: true
            },
            permissions: {
              action: 'inspection-manage.inspect:print:exportExcel'
            }
          }
        ]
      }
    },
    // 获取送检状态下拉
    async getCheckUnitStatus() {
      const res = await getCheckUnitStatus()
      return res.data.data
    },
    async getCheckMasterialStatus() {
      const res = await getCheckMasterialStatus()
      return res.data.data
    },
    // 重置
    reset() {
      Object.keys(this.listQuery).forEach(el => {
        this.listQuery[el] = null
      })
      this.listQuery = {
        ...this.listQuery,
        current: 1,
        size: 20
      }
      this.getList()
    },
    // 1.获取列表
    getList() {
      if (this.btnType === 'material') {
        this.getListByMaterial()
      } else if (this.btnType === 'order') {
        this.getListByOrder()
      }
    },
    //  获取订单
    async getListByOrder() {
      this.loading = true
      const res = await getCheckUnitListByOrder(this.listQuery)
      this.loading = false
      const { data } = res.data
      console.log('data -> ', data.records)
      this.tableData =
        data.records.map(item => {
          return {
            ...item
          }
        }) || []
      this.total = data.total
    },
    //  获取物料
    async getListByMaterial() {
      this.loading = true
      const res = await getCheckUnitListByMaterial(this.listQuery)
      this.loading = false
      const { data } = res.data
      console.log('data -> ', data.records)
      this.tableData =
        data.records.map(item => {
          const materialFields = item.material.materialFields
          const material = item.material
          return {
            ...item,
            materialCode: materialFields?.code,
            materialName: materialFields?.name,
            materialStandard: materialFields?.standard,
            documentTypeName: material?.documentTypeName,
            relateDocumentCode: material?.relateDocumentCode,
            checkResultName: material?.checkResultName,
            relateBarCode: material.relateBarCode,
            inspectQuantity: material.inspectQuantity,
            samplingQuantity: material.samplingQuantity,
            unqualifiedQuantity: material.unqualifiedQuantity,
            // 合格率
            passRate: material.passRate ? material.passRate + '%' : material.passRate,
            supplierName: material.supplierName,
            customerName: material.customerName,
            schemeName: material.schemeName,
            samplePlanName: material.samplePlanName,
            inspectTime: material.inspectTime,
            inspectBeginTime2: material.inspectBeginTime,
            inspectEndTime2: material.inspectEndTime,
            // 送检人
            inspectPersonName: material.inspectPersonName,
            currentStatusName: material.currentStatusName,
            // 工序名称
            processProcedureName: material.processProcedureName,
            // 生产基本单元 和 工单操作员
            productionBasicUnitName: material.productionBasicUnitName,
            workOrderOperatorName: material.workOrderOperatorName,
            resourceRelevanceName: material.resourceRelevanceName,
            // 物料
            standard: materialFields?.standard,
            remark: materialFields?.remark,
            drawingNumber: materialFields?.drawingNumber,
            materialPrice: materialFields?.materialPrice,
            rawMaterial: materialFields?.rawMaterial,
            nameEnglish: materialFields?.nameEnglish,
            minimumProductionLot: materialFields?.minimumProductionLot,
            factoryModel: materialFields?.factoryModel,
            customFieldOne: materialFields?.customFieldOne,
            customFieldTwo: materialFields?.customFieldTwo,
            customFieldThree: materialFields?.customFieldThree,
            customFieldFour: materialFields?.customFieldFour,
            customFieldFive: materialFields?.customFieldFive,
            customFieldSix: materialFields?.customFieldSix,
            customFieldSeven: materialFields?.customFieldSeven,
            customFieldEight: materialFields?.customFieldEight,
            customFieldNine: materialFields?.customFieldNine,
            customFieldTen: materialFields?.customFieldTen,
            customFieldEleven: materialFields?.customFieldEleven,
            inspectMaterialExtendFieldOne: material.inspectMaterialExtendFieldOne,
            inspectMaterialExtendFieldTwo: material.inspectMaterialExtendFieldTwo,
            inspectMaterialExtendFieldThree: material.inspectMaterialExtendFieldThree,
            inspectMaterialExtendFieldFour: material.inspectMaterialExtendFieldFour,
            inspectMaterialExtendFieldFive: material.inspectMaterialExtendFieldFive,
            inspectMaterialExtendFieldSix: material.inspectMaterialExtendFieldSix,
            inspectMaterialExtendFieldSeven: material.inspectMaterialExtendFieldSeven,
            inspectMaterialExtendFieldEight: material.inspectMaterialExtendFieldEight,
            inspectMaterialExtendFieldNine: material.inspectMaterialExtendFieldNine,
            inspectMaterialExtendFieldTen: material.inspectMaterialExtendFieldTen
          }
        }) || []
      this.total = data.total
      console.log('获取物料 data -> 4324 ', this.tableData)
    },
    // 进入新增页面
    enterAdd() {
      this.$router.push({
        name: 'productInspectionAdd'
      })
      this.listQuery.btnType = this.btnType
      this.$setForwardSessionTab(this.listQuery, 'checkSheet')
    },
    // 进入编辑页面
    enterEdit(row) {
      this.$router.push({
        name: 'productInspectionEdit',
        query: {
          name: 'checkSheet',
          id: row.id,
          status: row.status
        }
      })
      this.listQuery.btnType = this.btnType
      this.$setForwardSessionTab(this.listQuery, 'checkSheet')
    },
    // 进入详情页面
    enterDetail(row) {
      this.$router.push({
        name: 'productInspectionDetail',
        query: {
          name: 'checkSheet',
          id: row.id
        }
      })
      this.listQuery.btnType = this.btnType
      this.$setForwardSessionTab(this.listQuery, 'checkSheet')
    },
    // 删除
    deleteThis(row) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCheckSheet([row.id]).then(res => {
          this.$notify({
            title: '提示',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
    },
    // 导入送检单模板之前
    beforeImportInspectionsheets(file) {
      const isZip = file.name.endsWith('.xls') || file.name.endsWith('.xlsx')
      // 格式校验
      if (!isZip) {
        this.$message({
          message: '请上传xls、xlsx格式文件',
          type: 'warning'
        })
        return false
      }
    },
    // 导入送检单模板
    async importInspectionsheets(val) {
      const params = {
        imageCode: 'inspectSheet'
      }
      const fd = new FormData()
      fd.append('file', val.file)
      const result = await uploadSeal(params, fd)
      const { code, message } = result.data || {}
      if (+code === 200) {
        this.$notify({
          title: '提示',
          message: '导入送检单模板成功',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '提示',
          message: message || '导入送检单模板失败',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 复制
    async copyCheckPlan(row) {
      // 存储到 sessionStorage
      this.$setForwardSessionCommon(this.listQuery)
      this.$router.push({
        name: 'productInspectionAdd',
        query: {
          id: row.id
        }
      })
    },
    enterCopy(row) {
      sessionStorage.setItem('checkSheetRow', JSON.stringify(row))
      console.log('copy 数据 -> ', row)
      this.$router.push({
        path: '/inspection-manage/checkSheet/add',
        query: {
          name: 'checkSheetAdd',
          current: this.listQuery.current,
          size: this.listQuery.size,
          pageType: 'copy'
        }
      })
      this.listQuery.btnType = this.btnType
      this.$setForwardSessionTab(this.listQuery, 'checkSheet')
    },
    // 处理下拉选择
    filterSearch(name) {
      switch (name) {
        case 'statusName':
          new Promise(resolve => {
            const result = this.getCheckUnitStatus()
            resolve(result)
          }).then(res => {
            this.selectList = res
          })
          break
        // 检验状态
        case 'currentStatusName':
          new Promise(resolve => {
            const result = this.getCheckMasterialStatus()
            resolve(result)
          }).then(res => {
            this.selectList = res
          })
          break
        case 'typeName':
          new Promise(resolve => {
            const result = this.getInspectTypeEnums()
            resolve(result)
          }).then(res => {
            this.selectList = res
          })
          break
        case 'checkResultName':
          this.selectList = [
            {
              code: 0,
              name: '不合格'
            },
            {
              code: 1,
              name: '合格'
            }
          ]
          break
        case 'lineName':
          linesList().then(res => {
            this.selectList = res?.data?.data?.records.map(i => ({
              code: i.productionLineId,
              name: i.name
            }))
          })
          break
        case 'approvalStatusName':
          getApprovalStatus().then(res => {
            this.selectList = res.data.data
          })
          break
        case 'documentTypeName':
        case 'relateDocumentTypeName':
          getDocumentEnums().then(res => {
            this.selectList = res.data.data
          })
          break
      }
    },
    // 接收表格筛选的数据，并请求
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        if (el === 'inspectionSheetTypeName') {
          this.listQuery['sheetType'] = val[el]
          return
        }
        if (el === 'statues') {
          this.listQuery[el] = val[el]?.split(',').map(i => Number(i))
          return
        }
        if (el === 'currentStatuses') {
          this.listQuery[el] = val[el]?.split(',')
          return
        }
        if (el === 'relateDocumentType') {
          this.listQuery[el] = val[el]?.split(',')
          return
        }
        if (el === 'types') {
          this.listQuery[el] = val[el]?.split(',')
          return
        }
        if (el === 'checkResult') {
          if (val[el].includes(',')) {
            this.listQuery[el] = ''
          } else {
            this.listQuery[el] = val[el]
          }
          // this.listQuery[el] = Number(val[el])
          return
        }
        if (el === 'relateDocumentTypes') {
          this.listQuery[el] = val[el]?.split(',')
          return
        }
        if (el === 'defectNames') {
          this.listQuery['defectName'] = val[el]
          return
        }
        this.listQuery[el] = val[el]
      })
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
    async exportProgressExcelWorkOrder(params) {
      try {
        /* const {
          data: { code, data: taskId }
        } = await getinspectsheetsSycExports(params)
        if (code === '200') {
          this.timer = setInterval(async () => {
            const {
              data: { code, data }
            } = await getinspectsheetsExportTask(taskId)
            if (code === '200') {
              this.exportExcelDetail = data
              this.exportProgressVisible = true
            }
          }, 1000)
        } */
        const {
          data: { status, data: taskId }
        } = await getinspectsheetsSycExports(params)
        if (+status === 1) {
          this.timer = setInterval(async() => {
            const result = await getinspectsheetsExportTask(taskId)
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
    // 表格操作更多选项
    handleCommand(val) {
      const { method, row, required, str } = val || {}
      if (!method) {
        return
      }
      if (str && required) {
        method(row, required, str)
      } else {
        method(row)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table-top {
  display: flex;
  align-items: center;
  padding-right: 21px;
}
.state {
  display: flex;
  align-items: center;
  .radio {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.delete-text {
  color: #ff4d4f;
}
.tablebox {
  height: calc(100vh - 75px) !important;
}
</style>
