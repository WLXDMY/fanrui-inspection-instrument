<!--
 * @Author: limengjuan
 * @Date: 2021-12-14 09:45:58
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-08-17 16:45:17
 * @Description:
-->
<template>
  <div class="detail-page-1-3">
    <div class="bg-content">
      <div class="operate">
        <el-button type="primary" size="small" @click="back"> 返回 </el-button>
        <el-button type="primary" size="small" @click="beforeSave"> 保存 </el-button>
        <el-button type="primary" size="small" @click="handleAllOpen">
          {{ titleWord }}
        </el-button>
      </div>
      <!-- 基本信息 -->
      <div class="container">
        <div class="base-info">
          <div class="title">
            <div class="text">基本信息</div>
            <div class="open-img" @click="isOpenBaseInfo = !isOpenBaseInfo">
              <img src="@/assets/images/home/xiala@2x.png" alt="" width="11" height="12" />
            </div>
          </div>
          <el-collapse-transition>
            <div v-show="isOpenBaseInfo">
              <el-form ref="dataForm" :rules="formRules" :model="baseInfo" :inline="true">
                <el-form-item label="送检单编号:" prop="inspectionSheetCode">
                  <el-input
                    v-model="baseInfo.inspectionSheetCode"
                    :readonly="!isManualInput"
                    placeholder="请输入内容"
                    size="small"
                    @focus="getFocus"
                  />
                </el-form-item>
                <el-form-item label="送检类型:" prop="inspectionSheetType">
                  <el-select
                    v-model="baseInfo.inspectionSheetType"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                    @change="changeType"
                  >
                    <el-option
                      v-for="(item, index) in unitTypeList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="关联单据类型:" prop="documentType">
                  <el-select
                    v-model="baseInfo.documentType"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                    @change="changeDocumentType"
                  >
                    <el-option
                      v-for="(item, index) in checkTypeList"
                      v-show="item.show"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <!-- 关联单据编码 -->
                <el-form-item label="关联单据编码:" prop="workOrderNumber">
                  <el-input v-model="baseInfo.workOrderNumber" placeholder="请选择" disabled>
                    <el-button slot="append" icon="el-icon-search" @click="handleWorkOrderClick" />
                  </el-input>
                </el-form-item>
                <el-form-item v-show="baseInfo.documentType === 1" label="生产订单编码:" prop="productOrderNumber">
                  <el-input v-model="baseInfo.productOrderNumber" placeholder="请选择" disabled>
                    <el-button slot="append" icon="el-icon-search" @click="handleProductOrderClick" />
                  </el-input>
                </el-form-item>
                <el-form-item label="检验范围" prop="inspectScope">
                  <el-select v-model="baseInfo.inspectScope" filterable placeholder="请选择" clearable size="small">
                    <el-option
                      v-for="(item, index) in checkAreaList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item v-if="baseInfo.inspectionSheetType === 1" label="抽检分类" prop="samplingClassification">
                  <el-select
                    v-model="baseInfo.samplingClassification"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in classificationList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="送检人:" prop="inspectionPerson">
                  <el-select v-model="baseInfo.inspectionPerson" filterable placeholder="请选择" clearable size="small">
                    <el-option
                      v-for="(item, index) in checkPeopleList"
                      :key="index"
                      :label="item.nickname"
                      :value="item.username"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="送检日期:">
                  <el-date-picker
                    v-model="baseInfo.inspectionTime"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    size="small"
                  />
                </el-form-item>
                <!-- 二次检验类型选择 -->
                <el-form-item
                  v-if="baseInfo.inspectionSheetType === 10"
                  :rules="[{ required: true, message: '该项为必填项！', trigger: 'blur' }]"
                  label="二次检验类型："
                  prop="secondaryInspectionType"
                >
                  <div>
                    <el-select
                      v-model="baseInfo.secondaryInspectionType"
                      filterable
                      placeholder="请选择"
                      clearable
                      popper-class="inspection-sheet-select"
                    >
                      <el-option
                        v-for="(item, index) in secondCheckTypeList"
                        :key="index"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="生产数量以报工为准:">
                  <el-switch
                    v-model="baseInfo.isProductionQuantity"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="备注:">
                  <el-input v-model="baseInfo.remark" type="textarea" placeholder="请输入" />
                </el-form-item>
                <el-form-item
                  v-show="baseInfo.documentType === 1 && baseInfo.customerName"
                  label="客户名称:"
                  prop="customerName"
                >
                  <el-input v-model="baseInfo.customerName" disabled placeholder="请输入内容" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="baseInfo.documentType === 1 && baseInfo.customerName"
                  label="客户编码:"
                  prop="customerCode"
                >
                  <el-input v-model="baseInfo.customerCode" disabled placeholder="请输入内容" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="baseInfo.documentType !== 1 && baseInfo.supplierCode"
                  label="供应商编码:"
                  prop="supplierCode"
                >
                  <el-input v-model="baseInfo.supplierCode" disabled placeholder="请输入内容" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="baseInfo.documentType !== 1 && baseInfo.supplierName"
                  label="供应商名称:"
                  prop="supplierName"
                >
                  <el-input v-model="baseInfo.supplierName" disabled placeholder="请输入内容" size="small" />
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-transition>
        </div>
        <!-- 定制配置信息 -->
        <CustomInfo
          ref="customInfo"
          type="inspectSheet"
          :custom-info="customInfo"
          :is-open-custom-info.sync="isOpenCustomInfo"
        />
        <!-- tab 页面 -->
        <section class="tab-page">
          <div v-if="activeName === 'material'" class="aql-btn">
            <el-button
              type="primary"
              plain
              :disabled="materialDataBak.length === 0 || materialDataBak.originalQuantity"
              @click="aqlCalculation"
              >AQL计算</el-button
            >
          </div>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="物料信息" name="material">
              <div class="material-style">
                <MaterialForm
                  ref="material-form"
                  :material-data="materialData"
                  page-type="add"
                  :document-type="baseInfo.documentType"
                  @materialUpdate="materialUpdate"
                  @qualityInspectionSchemeId="getQualityInspectionSchemeId"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="送检标准" name="standard">
              <Standard :table-data="standardTableData" />
            </el-tab-pane>
            <el-tab-pane v-if="baseInfo.inspectionSheetType === 3" label="送检单品" name="inspectionItems">
              <div class="material-style">
                <InspectItem type="add" @serialCodeListUpdate="hdserialCodeList" />
              </div>
            </el-tab-pane>

            <el-tab-pane label="附件列表" name="attachment">
              <AttachmentList ref="attachment-list" page-type="add" :attachment-data="attachmentData" />
            </el-tab-pane>
          </el-tabs>
        </section>

        <!-- 查询图片 -->
        <el-dialog :visible.sync="materialDialogVisible" width="50%" title="图片查看">
          <section class="show-image">
            <img :src="viewImgUrl" alt="" width="100%" />
          </section>
        </el-dialog>
      </div>
    </div>
    <!-- 编码规则 -->
    <common-code-rule-dialog
      ref="codeRuleDialog"
      title="产品检验-送检单号"
      :type-code="15"
      :is-auto-open="true"
      @confirm="handleConfirmCodeRuleDialog"
      @manualInput="handleSetManualInput"
    />

    <!-- 工单选择 -->
    <CommonSelectDialogPlus
      v-if="workOrderDialogVisible"
      title="工单选择"
      :request-config="{
        url: '/api/workorders/list/simple',
        method: 'post'
      }"
      :extra-params="{ state: '2,3,4,5' }"
      :column-config="workOrderColumns"
      :visible="workOrderDialogVisible"
      is-has-material-extension-keys
      @confirm="handleConfirmWorkOrder"
      @cancel="workOrderDialogVisible = false"
    />

    <CommonSelectDialogPlus
      v-if="productOrderDialogVisible"
      title="生产订单选择"
      :request-config="{
        url: '/api/workorders/list/simple',
        method: 'post'
      }"
      :extra-params="{ state: '2,3,4,5' }"
      :column-config="productOrderColumns"
      :visible="productOrderDialogVisible"
      @confirm="handleConfirmProductOrder"
      @cancel="productOrderDialogVisible = false"
    />

    <!-- 采购收料单 -->
    <ReceipOrderDialog
      v-if="receiptOrderVisible"
      :visible="receiptOrderVisible"
      :extra-params="{ states: '2,3,4' }"
      @confirm="
        value => {
          handleConfirmMaterial(value, 'purchaseReceipt')
        }
      "
      @cancel="receiptOrderVisible = false"
    />
    <!-- 采购订单 -->
    <RelateOrderDialog
      v-if="purchaseOrderVisible"
      :sale-order-dialog="purchaseOrderVisible"
      order-num-type="purchasingOrder"
      :is-multiple="false"
      @confirm="
        value => {
          handleConfirmMaterial(value, 'purchase')
        }
      "
      @cancel="purchaseOrderVisible = false"
    />
    <!-- 关联单据编码 -->
    <CommonSelectDialogPlusSpecial
      v-if="relatedOrderVisible"
      :title="selectDialogConfig.title"
      :request-config="selectDialogConfig.requestConfig"
      :extra-params="selectDialogConfig.extraParams"
      :column-config="selectDialogConfig.columns"
      :visible="relatedOrderVisible"
      :array-key="selectDialogConfig.arrayKey"
      @confirm="hdSelectDialogConfirm"
      @cancel="relatedOrderVisible = false"
    />
  </div>
</template>
<script>
import {
  addCheckUnit,
  getCheckUnitType,
  getCheckType,
  getCheckCode,
  getCheckPlanList,
  getCheckPerson,
  getBarCode,
  getProcessMaterialInfo,
  getCheckSheetBarCode,
  getInspectsheetsGetQualitySchemes,
  checkIsSingle,
  checkArea,
  qualitySchemes,
  // aqlCalculate,
  getSaveAndBackConfig,
  getClassification,
  getSecondCheckType,
  getStandardData,
  getBusinessConfig
  // checkSerialCode
} from '@/api/quality-manage'
import { checkSerialCodeList } from './methods'
import { mapGetters } from 'vuex'
import CustomInfo from '@/views/common/customInfo/index.vue'
// import { queryString } from '@/utils/validate.js'
import {
  workOrderColumns,
  // checkSheetMaterialColumns,
  checkSheetAttListColumns,
  productOrderColumns
} from './constant.js'
import { getimgurl } from '@/api/base'
import { download } from '@/api/fileTransfer'
import validateInspectNumber from '@/utils/validateInspectNumber'
// import InspectItem from './InspectItem.vue'
import { COLUMNS } from './constant/index.js'
export default {
  components: {
    CustomInfo,
    CommonSelectDialogPlus: () => import('@/components/CommonSelectDialogPlus'),
    CommonSelectDialogPlusSpecial: () => import('@/components/CommonSelectDialogPlusSpecial'),
    // CommonTablePlus: () => import('@/components/CommonTablePlus'),
    MaterialForm: () => import('./materialForm'),
    AttachmentList: () => import('./attachmentList'),
    ReceipOrderDialog: () => import('./materialComponets/receipOrderDialog'),
    RelateOrderDialog: () => import('./materialComponets/relateOrderDialog'),
    InspectItem: () => import('./InspectItem.vue'),
    Standard: () => import('./standard')
  },
  data() {
    return {
      id: '',
      isOpenBaseInfo: true, // 全部收起/放下
      isOpenMaterial: true,
      titleWord: '全部收起',
      flag: true,
      checkPlanDataList: [], // 检验项目表格数据
      checkTypeList: [], // 关联单据类型
      unitTypeList: [], // 送检单类型
      checkCodeList: [], // 关联单据编码
      checkPeopleList: [], // 送检人
      barCodeList: [], // 批号
      productMaterialList: [], // 过程检验物料信息
      current: '',
      size: '',
      baseInfo: {
        inspectionSheetCode: '',
        inspectionSheetType: 2,
        inspectionPerson: '',
        status: 1,
        workOrderNumber: '',
        productOrderNumber: '',
        qualityInspectionSchemeName: '',
        documentType: 1,
        materialCode: '',
        materialStandard: '',
        materialName: '',
        barCode: '',
        productTime: '',
        inspectionTime: '',
        samplePoint: '',
        materialId: '',
        qualityInspectionSchemeId: '',
        isProductionQuantity: false,
        productionQuantity: '',
        samplingQuantity: '',
        samplingPerson: '',
        sampQuantity: '',
        remark: '',
        inspectScope: '',
        customerCode: '',
        customerName: '',
        supplierCode: '',
        supplierName: '',
        samplingClassification: '',
        secondaryInspectionType: ''
      },
      saveFlag: true,
      activeName: 'material',
      formRules: {
        inspectionSheetCode: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        inspectionSheetType: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        workOrderNumber: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        qualityInspectionSchemeName: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        documentType: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        inspectionPerson: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        samplingClassification: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ]
      },
      customInfo: {},
      isOpenCustomInfo: true,
      qualityInspectionSchemeNameList: [],
      // 编码规则
      isManualInput: false,
      workOrderParams: {
        materialFields: {
          id: ''
        }
      },
      workOrderDialogVisible: false,
      productOrderDialogVisible: false,
      workOrderColumns,
      productOrderColumns,
      // 物料信息表
      materialDataBak: [],
      materialData: [],
      // 附件列表
      attListLoading: false,
      attListData: [],
      attListColumns: checkSheetAttListColumns,
      // 检验范围
      checkAreaList: [],
      fileList: [],
      resultHeaderCellStyle: {
        background: '#F2F5FC',
        color: '#181d1f',
        height: '46px',
        'font-family': 'Source Han Sans CN',
        'font-size': '13px',
        'font-weight': '550'
      },
      picturesOb: {
        pictures: [],
        poorPictures: []
      },
      viewImgUrl: '',
      materialDialogVisible: false,
      attachmentData: [],
      saveAndBackConfig: false,
      receiptOrderVisible: false, // 采购收料单
      purchaseOrderVisible: false, // 采购订单
      inspectNumberCheckData: {},
      serialCodeList: [],
      classificationList: [],
      relatedOrderVisible: false,
      selectDialogConfig: {},
      secondCheckTypeList: [],
      standardTableData: [] // 检验标准数据
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   const { microRouteName } = to.query
  //   // console.log(name, 'name', from, to  purchasingList)
  //   sessionStorage.setItem('routelog_to', JSON.stringify(to))
  //   sessionStorage.setItem('routelog_from', JSON.stringify(from))
  //   next(vm => {
  //     if (microRouteName === 'purchasingList' || microRouteName === 'deliveryOrder') {
  //       vm.$nextTick(() => {
  //         console.log('name_log', microRouteName)
  //         sessionStorage.setItem('name_log', microRouteName)
  //         vm.handleConfirmMaterial(
  //           JSON.parse(sessionStorage.getItem('pushDownListSession')),
  //           microRouteName === 'purchasingList' ? 'purchase' : 'purchaseReceipt'
  //         )
  //       })
  //     } else {
  //       sessionStorage.setItem('name_log_not_catch', microRouteName)
  //     }
  //   })
  // },
  computed: {
    ...mapGetters(['componentNameList']),
    isHasCode() {
      return typeof this.workOrderParams.materialFields.id !== 'number'
    }
  },
  watch: {
    'baseInfo.materialId'(nVal) {
      const { type } = this.$route.query || {}
      if (type !== 'copy') {
        this.baseInfo.qualityInspectionSchemeName = ''
      }
      this.qualityInspectionSchemeNameList = []
      this.checkPlanDataList = []
    },
    qualityInspectionSchemeNameList: {
      handler(val) {
        if (!this.materialDataBak?.[0]) return
        // console.log('this.materialDataBak[0]', this.materialDataBak[0])
        this.materialData = [
          {
            ...(!this.materialData || !this.materialData[0] ? this.materialDataBak[0] : this.materialData[0]),
            qualitySchemeOptions: val
          }
        ]
      }
    }
  },
  mounted() {},
  created() {
    if (this.$route.query) {
      // this.activeName = this.$route.query.name
      this.id = this.$route.query.id
      this.current = this.$route.query.current
      this.size = this.$route.query.size
    }
    this.getCheckUnitType()
    this.getCheckType()
    this.getCheckCode()
    this.getCheckPerson()
    this.checkArea()
    this.getSaveAndBackConfig()
    this.getClassification()
    this.getSecondCheckTypeFn()
    this.getBusinessConfigFn()
  },
  methods: {
    // 获取物料信息默认值
    getBusinessConfigFn() {
      getBusinessConfig().then(res => {
        if (res.data.code === '200') {
          this.businessConfig = res.data.data
          console.log('物料信息默认值 -> ', res.data.data)
        } else {
          // this.$notify({
          //   title: '错误',
          //   message: res.data.message || '获取物料信息默认值失败',
          //   type: 'error'
          // })
        }
      })
    },
    // 二次检验类型获取
    getSecondCheckTypeFn() {
      getSecondCheckType().then(res => {
        if (res.data.code === '200') {
          this.secondCheckTypeList = res.data.data
          console.log('二次检验类型 -> ', this.secondCheckTypeList)
        } else {
          this.$notify({
            title: '错误',
            message: res.data.message || '获取二次检验类型失败',
            type: 'error'
          })
        }
      })
    },
    getWorkOrderNumber(row) {
      console.log(row, 'row')
      const keyMap = new Map()

      const keyArr = [
        {
          key: 1,
          requestKey: 'workOrderNumber'
        },
        {
          key: 2,
          requestKey: 'purchaseCode'
        },

        {
          key: 3,
          requestKey: 'receiptCode'
        },
        {
          key: 4,
          requestKey: 'orderNumber'
        },

        {
          key: 5,
          requestKey: 'orderNumber'
        },
        {
          key: 6,
          requestKey: 'inspectionSheetCode'
        }
      ]

      keyArr.forEach(i => {
        keyMap.set(i.key, i.requestKey)
      })
      const { documentType } = this.baseInfo
      return row[keyMap.get(documentType)]
    },
    // 二次检验单,退料单领料单点击后处理
    hdSelectDialogConfirm(row) {
      console.log('点击后的数据 -> ', row)
      // this.workOrderParams = order
      this.hdMaterialFormData(row)
      // const workOrderNumber = order.workOrderNumber
      // this.baseInfo.materialId = order.materialId || order.materialFields.id
      // this.baseInfo.workOrderNumber = workOrderNumber
      // this.baseInfo.productOrderNumber = order.productOrderNumber
      // const materialCode = order.materialFields.code
      // const materialStandard = order.materialFields.standard
      // const materialName = order.materialFields.name

      const {
        // workOrderNumber,
        materialId,
        materialFields,
        // productOrderNumber,
        customerCode,
        customerName,
        supplierCode,
        supplierName
      } = row

      // const materialCode = materialFields.code
      // const materialStandard = materialFields.standard
      // const materialName = materialFields.name
      this.baseInfo.workOrderNumber = this.getWorkOrderNumber(row)
      this.baseInfo = {
        ...this.baseInfo,
        materialId: materialId || materialFields.id,
        // workOrderNumber,
        // productOrderNumber,
        customerCode,
        customerName,
        supplierCode,
        supplierName
      }
      this.relatedOrderVisible = false
    },
    getQualityInspectionSchemeId(val) {
      // console.log('送检单id -> ', val)
      this.baseInfo.qualityInspectionSchemeId = val
    },
    getClassification() {
      getClassification().then(res => {
        console.log('抽检分类 -> ', res)
        if (res.data.code === '200') {
          this.classificationList = res.data.data
        }
      })
    },
    // 处理流水码
    hdserialCodeList(codeList) {
      console.log('code list -> ', codeList)
      this.serialCodeList = codeList
    },
    async handleConfirmMaterial(value, type) {
      if (type === 'purchaseReceipt') {
        // console.error(value, 'value')
        // console.info(value, 'value')
        const {
          receiptCode,
          materialFields: { code, name, standard, comp, id: materialId },
          materialRowId,
          barCode,
          recepitNum,
          supplierName,
          supplierCode,
          purchaseBatchNumber
        } = value
        // this.baseForm.purchaseReceiptNumber = receiptCode
        // this.baseForm.purchaseOrderNumber = ''
        // this.baseForm.supplierName = supplierName
        // this.baseForm.supplierCode = supplierCode
        this.baseInfo.workOrderNumber = receiptCode
        this.baseInfo.supplierName = supplierName
        this.baseInfo.supplierCode = supplierCode
        const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
        this.$refs['material-form'].receiveMaterial([
          {
            relateOrderMaterialRowId: materialRowId,
            workOrderNumber: receiptCode,
            materialCode: code,
            name,
            standard,
            comp,
            materialId,
            inspectionSchemeId: '',
            acceptanceQualityLimit: '',
            inspectionLevel: '',
            strictLevel: '正常',
            qualitySchemeOptions,
            materialBatch: barCode,
            purchaseBatchNumber,
            originalQuantity: recepitNum,
            samplingQuantity: '',
            qualifiedQuantity: '',
            unqualifiedQuantity: '',
            checkResult: '',
            remark: '',
            supplierName,
            supplierCode
          }
        ])

        this.receiptOrderVisible = false
      } else if (type === 'purchase') {
        const {
          purchaseCode,
          materialFields: { code, name, standard, comp, id: materialId },
          requestMaterialEntities,
          supplierName,
          supplierCode
        } = value
        // this.baseForm.purchaseReceiptNumber = ''
        // this.baseForm.purchaseOrderNumber = purchaseCode
        // this.baseForm.supplierName = supplierName
        // this.baseForm.supplierCode = supplierCode
        this.baseInfo.workOrderNumber = purchaseCode
        this.baseInfo.supplierName = supplierName
        this.baseInfo.supplierCode = supplierCode
        const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
        this.$refs['material-form'].receiveMaterial([
          {
            relateOrderMaterialRowId: requestMaterialEntities[0].id,
            workOrderNumber: purchaseCode,
            materialCode: code,
            name,
            standard,
            comp,
            materialId,
            inspectionSchemeId: '',
            acceptanceQualityLimit: '',
            inspectionLevel: '',
            strictLevel: '正常',
            qualitySchemeOptions,
            materialBatch: '',
            originalQuantity: requestMaterialEntities[0]?.planNum,
            samplingQuantity: '',
            qualifiedQuantity: '',
            unqualifiedQuantity: '',
            checkResult: '',
            remark: '',
            supplierName,
            supplierCode
          }
        ])

        this.purchaseOrderVisible = false
      } else {
        const {
          materialFields: { code, name, standard, comp, id: materialId }
        } = value
        const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
        this.$refs['material-form'].receiveMaterial([
          {
            relateOrderMaterialRowId: '',
            materialCode: code,
            name,
            standard,
            comp,
            materialId,
            inspectionSchemeId: '',
            acceptanceQualityLimit: '',
            inspectionLevel: '',
            strictLevel: '正常',
            qualitySchemeOptions,
            materialBatch: '',
            originalQuantity: '',
            samplingQuantity: '',
            qualifiedQuantity: '',
            unqualifiedQuantity: '',
            checkResult: '',
            remark: ''
          }
        ])
        this.showMaterialDialog = false
      }
    },
    async getSaveAndBackConfig() {
      const {
        data: {
          code,
          data: { valueList },
          message
        }
      } = await getSaveAndBackConfig({
        fullPathCode: 'general.saveAndBackConfig'
      })
      if (code === '200') {
        this.saveAndBackConfig =
          JSON.parse(valueList[0].value) && (JSON.parse(valueList[1].value) || []).includes('qualityInspection')

        console.log('valueList', valueList, this.saveAndBackConfig)
      } else {
        this.$notify({
          title: '告警',
          message: message || '获取配置失败',
          type: 'error',
          duration: 2000
        })
      }
    },
    hdMaterialData() {
      const deleteKeys = ['name', 'standard', 'comp', 'qualitySchemeOptions']
      const material = JSON.parse(JSON.stringify(this.$refs['material-form'].materialForm.tableData))[0]
      deleteKeys.forEach(key => {
        delete material[key]
      })

      return [material]
    },
    handleWorkOrderClick() {
      // this.workOrderDialogVisible = true
      console.log('this.baseInfo.documentType -> ', this.baseInfo.documentType)
      // if (this.baseInfo.documentType === 1) {
      //   this.workOrderDialogVisible = true
      // } else if (this.baseInfo.documentType === 2) {
      //   this.purchaseOrderVisible = true
      // } else {
      //   this.receiptOrderVisible = true
      // }
      switch (this.baseInfo.documentType) {
        case 1:
          this.workOrderDialogVisible = true
          break
        case 2:
          this.purchaseOrderVisible = true
          break
        case 3:
          this.receiptOrderVisible = true
          break
        case 4:
          this.relatedOrderVisible = true
          this.selectDialogConfig = {
            title: '生产领料单',
            extraParams: {
              state: '1,2',
              showType: 'material',
              inOrOutType: 'workOrderTakeOut'
            },
            columns: COLUMNS.productPickMaterial,
            requestConfig: {
              url: '/wms/stocks/output/list',
              method: 'post'
            }
          }
          break
        // 生产补料单
        case 5:
          this.relatedOrderVisible = true
          this.selectDialogConfig = {
            title: '生产补料单',
            extraParams: {
              state: '1,2',
              showType: 'material',
              inOrOutType: 'workOrderSupplement,workConsumeOut'
            },
            columns: COLUMNS.productPatchMaterial,
            requestConfig: {
              url: '/wms/stocks/output/list',
              method: 'post'
            }
          }
          break
        // 送检单
        case 6:
          this.relatedOrderVisible = true
          this.selectDialogConfig = {
            title: '送检单',
            extraParams: {
              state: '2,3'
            },
            columns: COLUMNS.checkOrder,
            requestConfig: {
              url: '/qms/inspectsheets/page',
              method: 'post'
            },
            arrayKey: 'inspectionSheetMaterialEntities'
          }
          break
        default:
          this.selectDialogConfig = {}
          break
      }
    },
    handleProductOrderClick() {
      this.productOrderDialogVisible = true
    },
    hdAttachment() {
      const arr = []
      const attachments = JSON.parse(JSON.stringify(this.$refs['attachment-list'].attachments))
      attachments.forEach(i => {
        i.tableData.forEach(si => {
          delete si.createUserName
          delete si.createTime
          arr.push({
            type: i.type,
            typeCode: i.typeCode,
            ...si
          })
        })
      })

      return arr
    },
    typeis(strictLevel) {
      // console.log('this.materialDataBak[0]', this.materialDataBak[0])
      if (strictLevel === '正常') {
        return 0
      }
      if (strictLevel === '加严') {
        return 1
      }
      if (strictLevel === '放宽') {
        return 2
      }
    },
    // async aqlBtnClick() {
    //   if (this.aqlCalculation) {
    //     this.aqlCalculation()
    //     return
    //   }
    //   const {
    //     originalQuantity,
    //     inspectionLevel,
    //     acceptanceQualityLimit,
    //     strictLevel,
    //     unqualifiedQuantity
    //   } = this.materialDataBak[0]
    //   const {
    //     data: {
    //       data: { ac, re, sampleNum }
    //     }
    //   } = await aqlCalculate({
    //     scopeNum: originalQuantity,
    //     unqualified: unqualifiedQuantity,
    //     inspectionLevel: inspectionLevel,
    //     aqlValue: acceptanceQualityLimit,
    //     type: this.typeis(strictLevel)
    //   })
    //   this.materialData = [
    //     {
    //       ...this.materialDataBak[0],
    //       acValue: ac,
    //       reValue: re,
    //       samplingQuantity: sampleNum
    //       // qualitySchemeOptions: this.qualityInspectionSchemeNameList// aql计算方案不清除
    //     }
    //   ]
    //   this.$forceUpdate()
    //   console.log('this.materialData', this.materialData)
    // },

    // 新 AQL计算
    aqlCalculation() {
      const { originalQuantity, inspectionSchemeId } = this.materialDataBak[0]
      console.log('新 AQL 参数 -> ', originalQuantity, inspectionSchemeId)
      // if (originalQuantity) {
      //   return
      // }
      if (!originalQuantity || !inspectionSchemeId) {
        return
      }
      const params = {
        num: originalQuantity,
        schemeId: inspectionSchemeId
      }
      getStandardData(params).then(res => {
        if (res.data.code === '200') {
          // this.standardList = res.data.data
          console.log('检验标准数据 -> ', res)
          const data = res.data.data
          // 找出最大的抽样数量
          let checkNum = 0
          data?.forEach(item => {
            checkNum = Math.max(checkNum, item.checkNum)
            delete item.id
          })
          this.materialData = [{ ...this.materialDataBak[0], samplingQuantity: checkNum }]
          this.standardTableData = data
          // this.checkForm.samplingQuantity = checkNum
          // data?.forEach(item => {
          //   if (item.type === 'fatal') {
          //     this.standardList[0].fields.forEach(field => {
          //       field.value = item[field.prop]
          //     })
          //   } else if (item.type === 'main') {
          //     this.standardList[1].fields.forEach(field => {
          //       field.value = item[field.prop]
          //     })
          //   } else {
          //     this.standardList[2].fields.forEach(field => {
          //       field.value = item[field.prop]
          //     })
          //   }
          // })
          console.log('标准数据 -> ', this.standardList)
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    materialUpdate(materailData) {
      console.log('materailData物料信息 -> ', materailData)
      // 物料信息内列表的数据更新后，保存一份到父组件，以备点击AQL计算按钮时
      // 更新 materialData 数据，保证更新 ac re 的同时，不会更改到已经填写的数据
      this.materialDataBak = materailData
    },
    checkArea() {
      checkArea().then(res => {
        const {
          data: { code, data }
        } = res
        if (code === '200') {
          this.checkAreaList = data
        }
      })
    },
    handlePreview() {},
    handleRemove() {},
    // 选择文件
    handleFileUpload(key, object) {
      // console.log('list 是 ------》', object[key])
      return async val => {
        const fd = new FormData()
        fd.append('file', val.file)
        const res = await getimgurl(fd)
        const {
          data: { code, data, message }
        } = res
        if (+code !== 200) {
          this.notify('error', message || 'error', '错误')
          return
        }
        // 接口正常的情况下
        this.fileList.push(data)
        data.name = data.fileName
        if (Array.isArray(object[key])) {
          object[key].push(data)
          this.notify('success', '上传成功')
          return
        }
        object[key] = [data]
        this.notify('success', '上传成功')
      }
    },
    notify(type = 'error', message = 'error', title = '提示', duration = 2000) {
      this.$notify({ title, message, type, duration })
    },
    deleteFile(item, index) {
      item.splice(index, 1)
    },
    downloadFile(row) {
      // console.log('下载数据 -----> ', row)
      const url = `${window.origin}/factory/v1/${row.url}`
      download(url).then(res => {
        const url = window.URL.createObjectURL(res)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', row.fileName)
        document.body.appendChild(link)
        link.click()
      })
    },
    viewFile(row) {
      const format = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'apng']
      const pdf = ['pdf']
      const { url } = row || {}
      const list = url.toLowerCase().split('.')
      const tem = list.filter(item => format.includes(item))
      const pdfTem = list.filter(item => pdf.includes(item))
      if (tem.length) {
        this.materialDialogVisible = true
        // this.viewImgUrl = window.location.origin + '/' + row.url
        // console.log('url -----> ', this.viewImgUrl)
        this.viewImgUrl = `${window.origin}/${row.url}`
        console.log(`${window.origin}/${row.url}`)
      }
      if (pdfTem.length) {
        const newWin = window.open(`/factory/v1/${row.url}`, '_blank')
        newWin.opener = null
      }
    },
    // 1.返回
    back() {
      this.$router.push({
        path: '/inspection-manage/productInspection'
        // query: {
        //   name: this.activeName
        // }
      })
    },
    // 2.全部收起
    handleAllOpen() {
      if (this.titleWord === '全部收起') {
        this.isOpenBaseInfo = false
        this.isOpenMaterial = false
        this.isOpenCustomInfo = false
        this.titleWord = '全部展开'
      } else {
        this.isOpenBaseInfo = true
        this.isOpenMaterial = true
        this.isOpenCustomInfo = true
        this.titleWord = '全部收起'
      }
    },
    getFocus() {
      if (!this.isManualInput) {
        this.$refs['codeRuleDialog'].open()
      }
    },
    // 编码规则确认
    handleConfirmCodeRuleDialog(val) {
      this.$set(this.baseInfo, 'inspectionSheetCode', val)
    },
    // 设置是否只能手动输入
    handleSetManualInput(val) {
      this.isManualInput = val
    },

    filterCheckTypeList() {
      this.checkTypeList.forEach(item => {
        // inspectionSheetType = 5 表示 送检类型 是 来料检验
        if (this.baseInfo.inspectionSheetType === 5) {
          // 关联单据只能选择采购订单(code = 2)和采购收料单(code = 3)
          if (item.code === 2 || item.code === 3) {
            item.show = true
          } else {
            item.show = false
          }
          if (this.baseInfo.documentType !== 2) {
            this.baseInfo.documentType = 2
          }
          // inspectionSheetType = 9 表示 送检类型 是 生产退料检验
        } else if (this.baseInfo.inspectionSheetType === 9) {
          // 关联单据只能选择生产领料单(code = 4)和生产补料单(code = 5)
          if (item.code === 4 || item.code === 5) {
            item.show = true
          } else {
            item.show = false
          }
          if (this.baseInfo.documentType !== 4) {
            this.baseInfo.documentType = 4
          }
          // inspectionSheetType = 10 表示 送检类型 是 二次检验
        } else if (this.baseInfo.inspectionSheetType === 10) {
          // 关联单据只能选择检验单(code = 6)
          if (item.code === 6) {
            item.show = true
          } else {
            item.show = false
          }
          this.baseInfo.documentType = 6
        } else {
          // 其他情况, 默认关联单据都是工单
          if (item.code === 1) {
            item.show = true
          } else {
            item.show = false
          }
          this.baseInfo.documentType = 1
        }
      })
    },

    // 4.获取关联单据类型
    getCheckUnitType() {
      getCheckUnitType().then(res => {
        if (res.data.code === '200') {
          this.checkTypeList = res.data.data
          this.filterCheckTypeList()
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 获取检验方案
    getInspectsheetsGetQualitySchemes(materialId) {
      console.log('检验方案 -> ', materialId)
      // console.log('Start -> ', this.baseInfo.inspectionSheetType)
      const params = {
        id: materialId,
        inspectionSheetType: this.baseInfo.inspectionSheetType,
        workOrderNumber: this.baseInfo.workOrderNumber
        // id: 11060
      }
      getInspectsheetsGetQualitySchemes(params).then(res => {
        if (res.data.code === '200') {
          this.qualityInspectionSchemeNameList = res.data.data
          console.log(this.qualityInspectionSchemeNameList, 'this.qualityInspectionSchemeNameList')
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 5.获取送检单类型
    getCheckType() {
      getCheckType().then(res => {
        if (res.data.code === '200') {
          this.unitTypeList = res.data.data
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    changeDocumentType() {
      this.materialData = []
      this.materialDataBak = []
      this.baseInfo.workOrderNumber = ''
      this.qualityInspectionSchemeNameList = []
    },
    // 切换送检单类型
    changeType(val) {
      console.log('切换数据 -> ', val)
      this.materialData = []
      this.materialDataBak = []
      this.baseInfo.workOrderNumber = ''
      this.baseInfo.inspectionSheetType = val
      this.getInspectsheetsGetQualitySchemes(this.baseInfo.materialId)
      this.filterCheckTypeList()
      // 过程检验1，成品检验2,首件检验3，末件检验4  只有成品检验时批号必填，其他非必填
      // 如果 过程检验 则获取检验方案，物料数据， 填写物料内容
      // 如果 成品检验 则获取物料单号，填写物料内容
      if (val === 2) {
        this.flag = true
        this.$set(this.baseInfo, 'materialCode', this.workOrderParams?.materialFields?.code)
        this.$set(this.baseInfo, 'materialStandard', this.workOrderParams?.materialFields?.standard)
        this.$set(this.baseInfo, 'materialName', this.workOrderParams?.materialFields?.name)
      } else {
        this.flag = false
        if (this.workOrderParams) {
          this.getProcessMaterialInfo({
            materialCode: this.workOrderParams?.materialFields?.code
          })
        }
      }
    },
    // 切换批次号
    changeBarCode(val) {
      const params = {
        code: val
      }
      getCheckSheetBarCode(params).then(res => {
        if (res.data.code === '200') {
          // this.$notify({
          //   title: '成功',
          //   message: res.data.message,
          //   type: 'success',
          //   duration: 1000
          // })
        } else {
          this.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success',
            duration: 1000
          })
        }
      })
    },
    // 6.获取关联单据编码
    getCheckCode() {
      getCheckCode().then(res => {
        if (res.data.code === '200') {
          this.checkCodeList = res.data.data
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },

    async getQualitySchemeOptions(id) {
      const {
        data: { code, data }
      } = await qualitySchemes({
        id,
        inspectionSheetType: this.baseInfo.inspectionSheetType
      })
      if (code === '200') {
        return data
      } else {
        return []
      }
    },

    async hdMaterialFormData(data, pictures, type = 'add') {
      console.log(' -> ', data, pictures)
      if (pictures) {
        this.attachmentData = pictures
      }
      const {
        // receiptCode,
        materialFields: { code, name, standard, comp, id: materialId, remark },
        materialRowId,
        barCode,
        planQuantity,
        workOrderNumber,
        inspectionSheetCode,
        inspectionSchemeId,
        relateOrders,
        orderNumber,
        // recepitNum
        // supplierName,
        // supplierCode
        skuId
      } = data
      // console.log('materialFields -> ', order)
      console.log('materialid -> ', materialId)
      // const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
      // 物料信息表数据
      if (type === 'copy') {
        const { comp, name, standard } = data.materialFields

        this.materialData = [
          {
            ...data,
            comp,
            name,
            standard,
            materialBatch: data.barCode,
            workOrderNumber: data.workOrderNumber,
            inspectionSheetId: data.inspectionSheetId,
            qualitySchemeOptions: this.qualityInspectionSchemeNameList,
            materialId: data.materialId,
            relateOrders,
            orderNumber
          }
        ]
        console.log('cp 的 this.materialData -> ', this.materialData)
        return
      }

      this.materialData = [
        {
          relateOrderMaterialRowId: materialRowId,
          materialCode: code,
          name,
          standard,
          comp,
          materialId,
          inspectionSchemeId,
          acceptanceQualityLimit: '',
          inspectionLevel: '',
          strictLevel: '正常',
          qualitySchemeOptions: this.qualityInspectionSchemeNameList,
          materialBatch: barCode,
          originalQuantity: planQuantity,
          samplingQuantity: '',
          qualifiedQuantity: '',
          unqualifiedQuantity: '',
          checkResult: '',
          remark: '',
          materialRemark: remark,
          workOrderNumber,
          skuId,
          inspectionSheetType: this.baseInfo.inspectionSheetType,
          inspectionSheetCode,
          relateOrders,
          orderNumber
          // documentType: this.baseInfo.documentType // 将生产关联单据类型也传入, 用于请求批次号时使用
        }
      ]
      // this.$refs['material-form'].receiveMaterial([
      //     {
      //       relateOrderMaterialRowId: materialRowId,
      //       materialCode: code,
      //       name,
      //       standard,
      //       comp,
      //       materialId,
      //       inspectionSchemeId: '',
      //       acceptanceQualityLimit: '',
      //       inspectionLevel: '',
      //       strictLevel: '正常',
      //       qualitySchemeOptions,
      //       materialBatch: barCode,
      //       originalQuantity: planQuantity,
      //       samplingQuantity: '',
      //       qualifiedQuantity: '',
      //       unqualifiedQuantity: '',
      //       checkResult: '',
      //       remark: '',
      //       workOrderNumber,
      //       skuId
      //     }
      //   ])
    },
    // 选择生产订单
    async handleConfirmProductOrder(order) {
      console.log('生产订单信息 -> ', order)
      this.workOrderParams = order
      this.hdMaterialFormData(order)
      const workOrderNumber = order.workOrderNumber
      this.baseInfo.materialId = order.materialId || order.materialFields.id
      this.baseInfo.workOrderNumber = workOrderNumber
      this.baseInfo.productOrderNumber = order.productOrderNumber
      const materialCode = order.materialFields.code
      const materialStandard = order.materialFields.standard
      const materialName = order.materialFields.name
      if (!this.baseInfo.inspectionSheetType) {
        this.$notify({
          title: '警告',
          message: '请先选择送检类型',
          type: 'warning',
          duration: 1000
        })
      } else if (
        this.baseInfo.inspectionSheetType === 1 ||
        this.baseInfo.inspectionSheetType === 3 ||
        this.baseInfo.inspectionSheetType === 4 ||
        this.baseInfo.inspectionSheetType === 8
      ) {
        // 过程检验
        // 过程检验获取半成品物料信息
        const query = {
          materialCode: materialCode
        }
        this.getProcessMaterialInfo(query)
      } else if (this.baseInfo.inspectionSheetType === 2) {
        // 成品检验
        this.$set(this.baseInfo, 'materialCode', materialCode)
        this.$set(this.baseInfo, 'materialStandard', materialStandard)
        this.$set(this.baseInfo, 'materialName', materialName)
      }
      // 根据工单号查询批次号
      console.log(1111)
      // this.getBarCode(workOrderNumber)
      // 请求 AQL
      this.getInspectsheetsGetQualitySchemes(this.baseInfo.materialId)
      this.productOrderDialogVisible = false
    },
    async handleConfirmWorkOrder(order) {
      console.log('工单信息 -> ', order)
      this.workOrderParams = order
      this.hdMaterialFormData(order)
      // const workOrderNumber = order.workOrderNumber
      // this.baseInfo.materialId = order.materialId || order.materialFields.id
      // this.baseInfo.workOrderNumber = workOrderNumber
      // this.baseInfo.productOrderNumber = order.productOrderNumber
      // const materialCode = order.materialFields.code
      // const materialStandard = order.materialFields.standard
      // const materialName = order.materialFields.name

      const {
        workOrderNumber,
        materialId,
        materialFields,
        productOrderNumber,
        customerCode,
        customerName,
        supplierCode,
        supplierName
      } = order

      const materialCode = materialFields.code
      const materialStandard = materialFields.standard
      const materialName = materialFields.name

      this.baseInfo = {
        ...this.baseInfo,
        materialId: materialId || materialFields.id,
        workOrderNumber,
        productOrderNumber,
        customerCode,
        customerName,
        supplierCode,
        supplierName
      }
      if (!this.baseInfo.inspectionSheetType) {
        this.$notify({
          title: '警告',
          message: '请先选择送检类型',
          type: 'warning',
          duration: 1000
        })
      } else if (
        this.baseInfo.inspectionSheetType === 1 ||
        this.baseInfo.inspectionSheetType === 3 ||
        this.baseInfo.inspectionSheetType === 4 ||
        this.baseInfo.inspectionSheetType === 8
      ) {
        // 过程检验
        // 过程检验获取半成品物料信息
        const query = {
          materialCode: materialCode
        }
        this.getProcessMaterialInfo(query)
      } else if (this.baseInfo.inspectionSheetType === 2) {
        // 成品检验
        this.$set(this.baseInfo, 'materialCode', materialCode)
        this.$set(this.baseInfo, 'materialStandard', materialStandard)
        this.$set(this.baseInfo, 'materialName', materialName)
      }
      // 根据工单号查询批次号
      console.log('22222')
      // this.getBarCode(workOrderNumber)
      // 请求 AQL
      this.getInspectsheetsGetQualitySchemes(this.baseInfo.materialId)

      this.workOrderDialogVisible = false
    },
    // 切换关联单据编码 调检验方案列表接口
    // changeWorkOrderNumber(val) {
    //   if (val) {
    //     const params = this.checkCodeList.filter(
    //       item => item.workOrderNumber === val
    //     )[0]
    //     this.workOrderParams = params

    //     const workOrderNumber = params.workOrderNumber
    //     this.baseInfo.materialId = params.materialId || params.materialFields.id
    //     const materialCode = params.materialFields.code
    //     const materialStandard = params.materialFields.standard
    //     const materialName = params.materialFields.name
    //     if (!this.baseInfo.inspectionSheetType) {
    //       this.$notify({
    //         title: '警告',
    //         message: '请先选择送检类型',
    //         type: 'warning',
    //         duration: 1000
    //       })
    //     } else if (
    //       this.baseInfo.inspectionSheetType === 1 ||
    //       this.baseInfo.inspectionSheetType === 3 ||
    //       this.baseInfo.inspectionSheetType === 4
    //     ) {
    //       // 过程检验
    //       // 过程检验获取半成品物料信息
    //       const query = {
    //         materialCode: materialCode
    //       }
    //       this.getProcessMaterialInfo(query)
    //     } else if (this.baseInfo.inspectionSheetType === 2) {
    //       // 成品检验
    //       this.$set(this.baseInfo, 'materialCode', materialCode)
    //       this.$set(this.baseInfo, 'materialStandard', materialStandard)
    //       this.$set(this.baseInfo, 'materialName', materialName)
    //     }
    //     // 根据工单号查询批次号
    //     this.getBarCode(workOrderNumber)
    //   } else {
    //     // 清理 关联项
    //     this.$set(this.baseInfo, 'qualityInspectionSchemeName', '')
    //     this.$set(this.baseInfo, 'materialCode', '')
    //     this.$set(this.baseInfo, 'materialStandard', '')
    //     this.$set(this.baseInfo, 'materialName', '')
    //     this.qualityInspectionSchemeNameList = []
    //     this.productMaterialList = []
    //   }
    // },
    changeQualityInspectionSchemeName(val) {
      const qualityInspectionSchemeItem = this.qualityInspectionSchemeNameList.find(
        item => item.qualityInspectionSchemeName === val
      )
      if (qualityInspectionSchemeItem) {
        this.getCheckPlanList(qualityInspectionSchemeItem.qualityInspectionSchemeId)
      }
    },
    // 7.根据物料id查询列表检验方案
    getCheckPlanList(id) {
      const params = {
        current: this.current,
        size: this.size,
        id: id
      }
      getCheckPlanList(params).then(res => {
        if (res.data.code === '200') {
          console.log('res.data.data ->', res.data.data)
          this.baseInfo.qualityInspectionSchemeId = res.data.data.qualityInspectionSchemeId
          const planList = res.data.data.page.records || []
          this.checkPlanDataList = planList.map(item => {
            return {
              ...item.inspectionItemEntity
              // inspectPerson: item.inspectPerson,
              // inspectTime: item.inspectTime
            }
          })
          if (this.checkPlanDataList == null) {
            this.saveFlag = true
          } else {
            this.saveFlag = false
          }
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 9.获取送检人
    getCheckPerson() {
      getCheckPerson().then(res => {
        if (res.data.code === '200') {
          this.checkPeopleList = res.data.data || []
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 10.根据工单号获取批次号
    getBarCode(val) {
      // console.log('xxxxxxx',val)
      const params = {
        materialCode: this.baseInfo.materialCode,
        current: this.current,
        size: this.size
      }
      getBarCode(params, val).then(res => {
        if (res.data.code === '200') {
          this.barCodeList = res.data.data.records || []
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 11. 过程检验获取半成品物料信息
    getProcessMaterialInfo(params) {
      getProcessMaterialInfo(params).then(res => {
        if (res.data.code === '200') {
          this.productMaterialList = res.data.data || []
          this.baseInfo.materialId = this.productMaterialList[0]?.id ?? this.baseInfo.materialId
          this.baseInfo.materialCode = this.productMaterialList[0]?.code
          this.baseInfo.materialStandard = this.productMaterialList[0]?.standard
          this.baseInfo.materialName = this.productMaterialList[0]?.name
        }
      })
    },
    // 切换物料编号
    changeMaterialCode(val) {
      const code = this.productMaterialList.filter(item => item.code === val)
      this.baseInfo.materialId = code[0].id
      this.baseInfo.materialStandard = code[0].standard
      this.baseInfo.materialName = code[0].name
    },
    async beforeSave() {
      // 只有工单的情况下启用校验
      if (this.baseInfo.documentType === 1) {
        const { workOrderNumber } = this.workOrderParams
        const { materialBatch, originalQuantity } = this.materialDataBak[0]
        const { inspectionSheetType } = this.baseInfo
        const status = await validateInspectNumber({
          workOrderNumber,
          inspectionSheetType,
          materialBatchList: [materialBatch].filter(e => e),
          inspectNum: Number(originalQuantity) || 0
        })
        console.log('检查状态是 -> ', status)
        if (status === 2) return
      }

      // 流水码校验
      if (this.baseInfo.inspectionSheetType === 3) {
        const { originalQuantity } = this.materialDataBak?.[0] || {}
        console.log('送检数量 -> ', originalQuantity, this.serialCodeList)
        const serialStatus = await checkSerialCodeList(this.serialCodeList, originalQuantity)
        if (!serialStatus) return
        // 查看是否开启检验
        // return
      }
      // if (workOrderId) return
      // validateInspectNumber().then(res => { console.log('成功 -> ', res) })
      let materialFormValue
      this.$refs['material-form'].$refs['form'].validate(value => {
        materialFormValue = value
      })

      // 必填项判断
      if (!materialFormValue) {
        this.$validateConfirm(this.$refs['material-form'].$refs['form'])
        return
      }

      const typeCode = this.baseInfo.inspectionSheetType
      const type = this.unitTypeList.find(item => item.code === typeCode).code
      const {
        data: { code, data }
      } = await checkIsSingle({
        workOrderNumber: this.baseInfo.workOrderNumber,
        inspectionSheetType: type
      })

      if (code === '200' && data?.length) {
        this.$confirm('已有同类型数据，是否要保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveInfo('dataForm')
        })
      } else {
        this.saveInfo('dataForm')
      }
    },
    // 点击保存按钮
    saveInfo(dataForm) {
      const workOrderNumberItem = this.checkCodeList.find(
        item => item.workOrderNumber === this.baseInfo.workOrderNumber
      )
      const params = {
        ...this.baseInfo,
        lineId: workOrderNumberItem ? workOrderNumberItem.lineId : null,
        // ...this.picturesOb,
        inspectionSheetMaterialEntities:
          this.materialDataBak?.map(ob => {
            return {
              ...this.$objectFilter(ob, 'id'),
              inspectionSheetSampleEntities: this.standardTableData
            }
          }) ?? [],
        inspectionPictures: this.hdAttachment(),
        serialCodeList: this.serialCodeList,
        originalInspectionSheetCode: this.baseInfo.workOrderNumber
        // inspectionSheetSampleEntities: this.standardTableData
      }
      this.$refs[dataForm].validate(async valid => {
        if (valid) {
          let extend = {
            productionQuantity: this.baseInfo.productionQuantity,
            samplingQuantity: this.baseInfo.samplingQuantity,
            samplingPerson: this.baseInfo.samplingPerson,
            sampQuantity: this.baseInfo.sampQuantity,
            isProductionQuantity: this.baseInfo.isProductionQuantity
          }
          const componentNameList = this.componentNameList.filter(item => item.supplementaryData === 'inspectSheet')
          if (this.$refs.customInfo && componentNameList && componentNameList.length) {
            const customData = await this.$refs.customInfo.getCustomData()
            if (!customData) return
            extend = Object.assign(extend, customData)
          }
          params.extend = JSON.stringify(extend)
          addCheckUnit(params).then(res => {
            if (res.data.code === '200') {
              // console.log('res.data.data ->', res.data.data.inspectionSheetId)
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 1000
              })
              if (this.saveAndBackConfig) {
                this.back()
              } else {
                this.$router.push({
                  name: 'checkSheetEdit',
                  query: {
                    name: 'checkSheet',
                    id: res.data.data.inspectionSheetId,
                    current: 1,
                    size: 20
                  }
                })
              }
              // this.back()
            } else {
              this.$notify({
                title: '提示',
                message: res.data.message || 'error',
                type: 'error',
                duration: 2000
              })
            }
          })
        } else {
          console.log('error submit!!')
          this.$validateConfirm(this.$refs[dataForm])
          return false
        }
      })
    },
    // 处理复制的数据
    handleCopyPage(list = {}) {
      console.log('handleCopyPage -> ', list)
      this.baseInfo = {
        ...list,
        inspectionSheetType: list?.inspectionSheetType,
        documentType: list?.documentType,
        workOrderNumber: list?.workOrderNumber,
        materialCode: list?.materialCode,
        materialId:
          list?.inspectionSheetMaterialEntities?.[0].materialId ??
          list?.inspectionSheetMaterialEntities?.[0].materialFields.id,
        materialName: list?.materialName,
        materialStandard: list?.materialStandard,
        inspectionPerson: list?.inspectionPerson,
        productTime: list?.productTime,
        inspectionTime: list?.inspectionTime,
        samplePoint: list?.samplePoint,
        samplingPerson: list?.samplingPerson,
        sampQuantity: list?.sampQuantity,
        status: 1,
        remark: list?.sampQuantity,
        qualityInspectionSchemeName: list?.inspectionSchemeName,
        qualityInspectionSchemeId: list?.qualityInspectionSchemeId,
        inspectScope: list?.inspectScope,
        productOrderNumber: list?.productOrderNumber
      }
      const { qualityInspectionSchemeId, inspectionSheetMaterialEntities } = list
      this.standardTableData = inspectionSheetMaterialEntities?.[0]?.inspectionSheetSampleEntities || []
      console.log('检验方案id -> ', qualityInspectionSchemeId)
      // 物料信息 附件列表 的数据处理
      this.hdMaterialFormData(list.inspectionSheetMaterialEntities[0], list.inspectionPictures, 'copy')
      qualityInspectionSchemeId && this.getCheckPlanList(qualityInspectionSchemeId)
    }
  },
  beforeRouteEnter(to, form, next) {
    const {
      query: { pageType, name, microRouteName }
    } = to
    // const { microRouteName } = queryString(query)
    // const routeName = name
    try {
      if (pageType === 'copy' && name === 'checkSheetAdd') {
        const list = JSON.parse(sessionStorage.getItem('checkSheetRow') || '{}')
        next(vm => {
          console.log('复制', list)
          vm.handleCopyPage(list)
        })
      } else if (microRouteName === 'purchasingList' || microRouteName === 'deliveryOrder') {
        next(vm => {
          // 下推必须要设置送检
          vm.baseInfo.inspectionSheetType = 5
          if (microRouteName === 'purchasingList') {
            vm.baseInfo.documentType = 2
          } else {
            vm.baseInfo.documentType = 3
          }
          vm.$nextTick(() => {
            vm.handleConfirmMaterial(
              JSON.parse(sessionStorage.getItem('pushDownListSession')),
              microRouteName === 'purchasingList' ? 'purchase' : 'purchaseReceipt'
            )
          })
        })
      } else {
        next()
      }
    } catch (err) {
      console.error(err)
      next()
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-page-1-3 {
  padding: 10px 10px;
  background-color: #eaeff5;
  width: 100%;
  height: calc(100vh - 50px);
  box-sizing: border-box;
  .bg-content {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    .operate {
      height: 72px;
      border-bottom: 1px solid rgba(217, 217, 217, 0.7019607843137254);
      line-height: 72px;
      padding: 0 24px;
      .el-button {
        margin: 0 14px 0 0;
        padding: 9px 18px;
        cursor: pointer;
      }
    }
    .container {
      background-color: #ffffff;
      // overflow-y: scroll;
      padding: 0;
      height: calc(100vh - 170px);
      overflow: auto;
    }
    .container::-webkit-scrollbar {
      background: #fff;
      width: 4px;
    }
    .container::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      width: 4px;
    }
    .container::-webkit-scrollbar-track {
      background: #fff;
      width: 4px;
    }
    .base-info {
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
      padding: 24px 24px 16px 24px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      .title {
        font-size: 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
      }
      .info-box {
        height: 100%;
        width: 100%;
        padding: 24px 0 0 0;
        box-sizing: border-box;

        .flex-content {
          width: 100%;
          .info-item {
            width: 25%;
            display: flex;
            line-height: 24px;
            font-size: 14px;
            padding-bottom: 14px;
            font-weight: 400;

            .infoname {
              display: flex;
              justify-content: flex-end;
              width: 126px;
              padding-right: 10px;
            }

            .infounit {
              margin-left: 10px;
            }
          }
        }
      }
    }
    .table-info {
      padding: 30px 24px 16px 24px;
      // height: auto;
      height: calc(100vh - 360px);
      .title {
        font-size: 20px;
        display: flex;
        justify-content: space-between;
      }
      .table-box {
        margin: 24px 0 0 0;
      }
    }
  }
}
.container {
  ::v-deep .el-form-item {
    width: 24%;
    .el-form-item__label {
      padding: 0 8px 0 0;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  ::v-deep .el-form--inline .el-form-item__label {
    width: 40%;
  }
  ::v-deep .el-form-item--medium .el-form-item__content {
    width: 58%;
  }
  ::v-deep .el-select {
    width: 100%;
  }
  ::v-deep .el-form-item {
    margin-bottom: 16px;
  }
  ::v-deep .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  ::v-deep .el-form-item--small .el-form-item__content {
    width: 58%;
  }
  ::v-deep .el-form-item--small .el-form-item__error {
    width: 150px;
  }
  ::v-deep .el-select-dropdown__item.selected {
    color: #606266;
    font-weight: normal;
  }
  ::v-deep .el-dialog__body {
    padding-bottom: 70px;
  }
}
.operate-box {
  float: right;
  margin-top: 20px;
}
.tab-page {
  box-sizing: border-box;
  padding: 20px;
  position: relative;
}
.result-page {
  box-sizing: border-box;
  padding: 25px 0;
}
.common-table {
  height: 400px;
}

.attachment {
  display: flex;
  align-items: center;
  width: 16%;
  justify-content: space-between;
}
.view {
  color: #1890ff;
  cursor: pointer;
}
.operator-img {
  display: flex;
  justify-content: space-evenly;
}
.material-style {
  // height: 42vh;
  ::v-deep .el-form-item {
    width: 100%;
  }
  ::v-deep .el-form-item--small .el-form-item__content {
    width: 100%;
  }
  ::v-deep .el-form-item--medium .el-form-item__content {
    width: 100%;
  }
}
.aql-btn {
  display: block;
  position: absolute;
  right: 24px;
  z-index: 999;
}
</style>
