<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-09-02 16:14:19
 * @LastEditors: laidz laidz@yelinked.com
 * @Description:新增检验单-物料列表
-->
<template>
  <div class="detailedList">
    <section v-loading="loading" class="centerArea">
      <div class="centerArea-header">
        <div class="centerArea-container">
          <div class="centerArea-title">检验物料</div>
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-plus"
            :disabled="isDetailType || initStatus !== 1"
            @click="addRow"
          >选择物料</el-button>
        </div>
      </div>
      <!-- 检验物料列表 -->
      <div v-if="formInline.detailTableData.length > 0" class="material scroll">
        <!-- :style="{ height: isAddType ? '630px' : '573px' }" -->
        <div v-for="(item, index) in formInline.detailTableData" :key="item.id || index" class="material-container">
          <div
            class="material-item"
            :class="{ 'border-blue': index == clickIndex }"
            @click="handleRowClick(item, index)"
          >
            <div class="material-item-container">
              <div class="blue">{{ item.materialName }}</div>
              <div class="">{{ item.materialCode }}</div>
            </div>
            <div class="material-item-container material-item-top">
              <div>物料规格:{{ item.materialStandard }}</div>
              <div class="material-item-icon" @mouseenter="handleMouseEnter(item)" @mouseleave="handleMouseLeave(item)">
                <div
                  v-if="!(isDetailType || initStatus !== 1)"
                  :style="{ display: item.deleteImgShow == 1 ? 'block' : 'none' }"
                  @click="deleteRow($event, index)"
                >
                  <img id="delete-icon-img" src="@/assets/images/common/delete.png" alt="" width="12" height="12">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="formInline.detailTableData.length === 0" class="no-data">
        <img src="@/assets/images/common/no-data.png" alt="" width="88" height="88">
        <div class="no-data-text">很抱歉，无相关数据。。。</div>
      </div>
    </section>

    <!-- 采购收料单 -->
    <ReceipOrderDialog
      v-if="receiptOrderVisible"
      :visible="receiptOrderVisible"
      :extra-params="{ states: '2,3' }"
      @confirm="handleReceipConfirm"
      @cancel="receiptOrderVisible = false"
    />

    <!-- 关联单据弹窗 -->
    <CommonSelectDialogPlus
      v-if="showDocumentDialog"
      :title="dialogTitle"
      :request-config="requestConfig"
      :extra-params="extraParams"
      :column-config="tableColumn"
      :visible="showDocumentDialog"
      :append-to-body="true"
      @confirm="handleDocumentConfirm"
      @cancel="showDocumentDialog = false"
    />

    <!-- 物料编码 -->
    <CommonSelectDialogPlus
      v-if="showMaterialDialog"
      :title="dialogTitle"
      :request-config="requestConfig"
      :extra-params="extraParams"
      :column-config="tableColumn"
      :visible="showMaterialDialog"
      :append-to-body="true"
      @confirm="handleMaterialConfirm"
      @cancel="showMaterialDialog = false"
    />

    <!-- 物料查询 -->
    <!-- <material-dialog
      v-if="showMaterialDialog"
      :material-dialog-visible="showMaterialDialog"
      title="物料选择"
      :product-material-code="productOrderForm.productCode"
      :sort-product="sortProduct"
      @cancel="cancelSelectMaterial"
      @confirm="confirmSelectMaterial"
    /> -->

    <!-- 检验方案 -->
    <CommonSelectDialogPlus
      v-if="showSchemeDialog"
      :title="dialogTitle"
      :request-config="requestConfig"
      :extra-params="extraParams"
      :column-config="tableColumn"
      :visible="showSchemeDialog"
      :append-to-body="true"
      @confirm="handleSchemeConfirm"
      @cancel="showSchemeDialog = false"
    />
  </div>
</template>
<script>
import lodash from 'lodash'
import MaterialDialog from '@/components/MaterialDialog/index.vue'

import ReceipOrderDialog from './receipOrderDialog/index.vue'
import { getBatchEnums, getBarCodeList, getDetailInspectionItemsWithSampleNum } from '@/api/quality-manage.js'
import {
  getInspectCheckResult,
  getInspectNumsItem,
  getInspectDefect,
  getInspectFileList,
  deleteMaterial,
  getSampleNumByScheme,
  getAcceptValueByScheme,
  getSchemeByMaterial
} from '@/api/quality-manage.js'
import { MaterialColumn, SchemeColumn } from './constant.js'
import { relateDocumentMixins } from './relateDocumentMixins.js'
export default {
  name: 'DetailedList',
  components: {
    CommonSelectDialogPlus: () => import('@/components/CommonSelectDialogPlus/index.vue'),
    ReceipOrderDialog,
    MaterialDialog
  },
  // 混入关联单据的相关逻辑
  mixins: [relateDocumentMixins],
  props: {
    baseForm: {
      type: Object,
      default: () => {}
    },
    currentRow: {
      type: Object,
      default: () => {}
    },
    clickIndex: {
      type: Number,
      default: -1
    },
    interfaceRecord: {
      type: Object,
      default: () => {}
    },
    initStatus: {
      type: Number,
      default: 0
    },
    extendMaterialList: {
      type: Array,
      default: () => []
    },
    isCopyTypeFlag: {
      tyep: Boolean,
      default: false
    },
    isCopyRelateFlag: {
      tyep: Boolean,
      default: false
    },
    qualifiedNumDefaultFlag: {
      tyep: Boolean,
      default: true
    }
  },
  data() {
    return {
      formInline: {
        detailTableData: []
      },
      relateBatchTypeEnums: [],
      requestConfig: {},
      tableColumn: [],
      receiptOrderVisible: false,
      showDocumentDialog: false,
      showMaterialDialog: false,
      showSchemeDialog: false,
      dialogTitle: '',
      extraParams: {},
      loading: false,
      deleteImgShow: null,
      // 物料
      productOrderForm: {
        productCode: ''
      },
      sortProduct: 'product'
    }
  },
  computed: {
    // 显示批次列
    showBatchColumn() {
      const showBatchTypes = [
        'saleOutOrder',
        'purchaseReceive',
        'productTakeOut',
        'productSupplementOut',
        'productOrder',
        'workOrder'
      ]
      return showBatchTypes.includes(this.baseForm.relateDocumentType) || this.isOtherInspect
    },
    disabledDelete() {
      return this.clickIndex === -1
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isDetailType() {
      return this.$route.name.includes('Detail')
    },
    // 复制跳进来的
    isCopyType() {
      return this.isAddType && this.$route.query.id
    },
    barCodes() {
      return this.formInline.detailTableData.map(item => item.relateBarCode)
    },
    isOtherInspect() {
      return this.baseForm.type === 'otherInspect'
    }
  },

  watch: {
    // 物料行切换时
    clickIndex(val) {
      const row = this.formInline.detailTableData[val]
      // 切换物料行时需要将工序名称列表清空
      this.$parent.$refs['MaterialInfoRef'].procedureList = []

      if (!row) {
        this.$emit('update:currentRow', {})
        return
      }
      // 先把当前行清空
      this.currentRow = {}
      this.$emit('update:currentRow', row)
      if (row.id) {
        // if (this.interfaceRecord[row.id]) return
        // this.interfaceRecord[row.id] = {}
        this.getRowDetailInfo(row.id, row)
      }
    },
    // 新增时，当检验类型修改后，分录明细清空
    'baseForm.type'(val) {
      if (this.isAddType && !this.isCopyType) {
        this.formInline.detailTableData = []
        this.clickIndex = -1
      } else if (this.isCopyType && this.isCopyTypeFlag) {
        this.formInline.detailTableData = []
        this.clickIndex = -1
      }
    },
    // 新增时，当关联单据类型修改后，分录明细清空
    'baseForm.relateDocumentType'(val) {
      if (this.isAddType && !this.isCopyType) {
        this.formInline.detailTableData = []
        this.clickIndex = -1
      } else if (this.isCopyType && this.isCopyRelateFlag) {
        this.formInline.detailTableData = []
        this.clickIndex = -1
      }
    }
  },
  created() {
    this.getBatchEnums()
  },
  mounted() {},
  methods: {
    // 物料 start
    // 关闭物料查询弹窗
    cancelSelectMaterial() {
      this.showMaterialDialog = false
    },
    // 搜索弹窗确认
    confirmSelectMaterial(row) {
      console.log('物料弹窗 confirmSelectMaterial', row)

      this.temp.materialCode = row.code
      this.materialOptions = [row]
      this.materialCodeOptions = lodash.cloneDeep(this.materialOptions)
      this.materialNameOptions = lodash.cloneDeep(this.materialOptions)
      this.materialStandardOptions = lodash.cloneDeep(this.materialOptions)
      this.changeCode(row.code)
      this.cancelSelectMaterial()
    },
    // 选择物料编码
    changeCode(val) {
      if (val) {
        const tempMaterial = this.materialOptions.filter(material => material.code === val)[0] || {}
        this.temp.materialName = tempMaterial?.name || ''
        this.temp.materialStandard = tempMaterial?.standard || ''
        this.temp.materialTypeName = tempMaterial?.typeName || ''
        this.temp.materialType = tempMaterial?.type || ''
        this.materialNameOptions = lodash.cloneDeep([tempMaterial])
        this.materialStandardOptions = lodash.cloneDeep([tempMaterial])
        this.materialExtendWord = lodash.cloneDeep(tempMaterial)
        this.getMaterialTypeKeyList(this.temp.materialType)
        // this.rulesTypeExtraRequestParam = {
        //   ruleType: 'craft',
        //   numberMap: {
        //     6: val
        //   },
        //   relatedMap: {
        //     materialCode: val
        //   }
        // }

        // this.$nextTick(() => {
        //   // 重新设置编码规则的值
        //   this.ruleDetailDTOs.find(item => item.code === 6) &&
        //     this.$refs.codeRuleDialog.resetRule(this.numberRulesId, { 6: val })
        // })
      } else {
        this.temp.materialName = ''
        this.temp.materialStandard = ''
        this.materialNameOptions = lodash.cloneDeep(this.materialOptions)
        this.materialStandardOptions = lodash.cloneDeep(this.materialOptions)
        Object.keys(this.materialExtendWord).forEach(key => {
          this.materialExtendWord[key] = ''
        })
        // 工艺编号 ？？？
        // this.rulesTypeExtraRequestParam = {
        //   ruleType: 'craft',
        //   numberMap: {
        //     6: ''
        //   },
        //   relatedMap: {
        //     materialCode: ''
        //   }
        // }

        // this.$nextTick(() => {
        //   // 重新设置编码规则的值
        //   this.ruleDetailDTOs.find(item => item.code === 6) &&
        //     this.$refs.codeRuleDialog.resetRule(this.numberRulesId, { 6: '' })
        // })
      }
    },
    // 物料 end
    handleMouseEnter(row) {
      this.$set(row, 'deleteImgShow', 1)
    },
    handleMouseLeave(row) {
      this.$set(row, 'deleteImgShow', 0)
    },
    // 切换行获取分录明细信息
    getRowDetailInfo(id, row) {
      if (!this.isCopyType) {
        // 获取检验决策
        getInspectCheckResult(id).then(res => {
          const data = res.data.data
          const materialDecisions = data.materialDecisions.map(item => {
            const statusName = item.status ? '合格' : '不合格'
            return {
              ...item,
              statusName
            }
          })
          this.$set(row, 'materialDecisions', materialDecisions)
        })
      }

      // 获取检验样次
      getInspectNumsItem(id).then(res => {
        const data =
          res.data.data?.map((item, index) => {
            const name = `检验样次${index + 1}`
            const numItems = item.numItems.map(numItem => {
              let checkResult = numItem.checkResult
              let reviewResult = numItem.reviewResult
              let authorizeResult = numItem.authorizeResult
              if (numItem.inputMode === 'multipleChoice') {
                checkResult = []
                // 有值时才转化为数据，避免选中空字符串
                if (numItem.checkResult !== '') {
                  checkResult = numItem.checkResult?.split(',')
                }
                reviewResult = []
                if (numItem.reviewResult !== '') {
                  reviewResult = numItem.reviewResult?.split(',')
                }
                authorizeResult = []
                if (numItem.authorizeResult !== '') {
                  authorizeResult = numItem.authorizeResult?.split(',')
                }
              }
              let itemDefects = []
              if (!this.isCopyType) {
                itemDefects =
                  numItem.itemDefects?.map(defect => {
                    const productCodes = defect.productCodes.join()
                    return {
                      ...defect,
                      productCodes
                    }
                  }) || []
              }
              let itemExecuteFileList = numItem.itemExecuteFileList
              let itemDefectFileList = numItem.itemDefectFileList
              // 复制时，检验项目-执行文件，项目缺陷文件为空
              if (this.isCopyType) {
                itemExecuteFileList = []
                itemDefectFileList = []
              }

              let itemValues = numItem.itemValues || []
              itemValues = itemValues.map(itemValue => {
                // 样本检验值 等
                let inspectValue = itemValue.inspectValue
                let reviewValue = itemValue.reviewValue
                let authorizeValue = itemValue.authorizeValue
                if (numItem.inputMode === 'multipleChoice') {
                  inspectValue = []
                  if (itemValue.inspectValue !== '') {
                    inspectValue = itemValue.inspectValue?.split(',')
                  }
                  reviewValue = []
                  if (itemValue.reviewValue !== '') {
                    reviewValue = itemValue.reviewValue?.split(',')
                  }
                  authorizeValue = []
                  if (itemValue.authorizeValue !== '') {
                    authorizeValue = itemValue.authorizeValue?.split(',')
                  }
                }
                // 样本检验结论 等
                let checkConclusion = itemValue.checkConclusion
                if (itemValue.checkConclusion === '1' || itemValue.checkConclusion === '0') {
                  checkConclusion = Number(itemValue.checkConclusion)
                }
                let reviewConclusion = itemValue.reviewConclusion
                if (itemValue.reviewConclusion === '1' || itemValue.reviewConclusion === '0') {
                  reviewConclusion = Number(itemValue.reviewConclusion)
                }
                let authorizeConclusion = itemValue.authorizeConclusion
                if (itemValue.authorizeConclusion === '1' || itemValue.authorizeConclusion === '0') {
                  authorizeConclusion = Number(itemValue.authorizeConclusion)
                }

                return {
                  ...itemValue,
                  checkConclusion,
                  reviewConclusion,
                  authorizeConclusion,
                  inspectValue,
                  reviewValue,
                  authorizeValue
                }
              })
              return {
                ...numItem,
                itemDefects,
                itemValues,
                checkResult,
                reviewResult,
                authorizeResult,
                itemExecuteFileList,
                itemDefectFileList
                // optionalValue
              }
            })
            return {
              ...item,
              name,
              numItems
            }
          }) || []
        this.$set(row, 'materialNums', data)
      })
      // 获取缺陷记录
      getInspectDefect(id).then(res => {
        const data =
          res.data.data?.map(defect => {
            const productCodes = defect?.productCodes?.join()
            return {
              ...defect,
              productCodes
            }
          }) || []
        this.$set(row, 'materialDefects', data)
      })
    },
    // 回读详情信息
    handleEcho(materials) {
      console.log('🚀 ~ handleEcho ~ materials:', materials)
      if (!materials.length) return
      this.formInline.detailTableData = materials.map(row => {
        const materialFields = row.materialFields
        // 处理批次信息
        const materialBatchListList = row.materialBatchListList.reduce((acc, item) => {
          acc[item.attributeCode] = item.value
          return acc
        }, {})

        return {
          id: row.id,
          // 合格率
          passRate: row.passRate,
          // 缺陷记录附件
          defectFiles: row.defectFiles,
          // 综合判定 检验附件
          checkFiles: row.checkFiles,
          // 单据
          relateDocumentCode: row.relateDocumentCode,
          supplierCode: row.supplierCode,
          supplierName: row.supplierName,
          customerCode: row.customerCode,
          customerName: row.customerName,
          // 物料
          materialFields: materialFields,
          materialCode: materialFields?.code || row.materialCode,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          //  检验方案
          schemeId: row.schemeId,
          schemeCode: row.schemeCode,
          schemeName: row.schemeName,
          inspectQuantity: row.inspectQuantity,
          samplingQuantity: row.samplingQuantity,
          schemeGuideFiles: row.schemeGuideFiles,
          // 关联批次
          relateBatchType: row.relateBatchType,
          relateBarCode: row.relateBarCode,
          // 抽样方案
          samplePlanId: row.samplePlanId,
          samplePlanName: row.samplePlanName,
          inspectLevel: row.inspectLevel,
          stringency: row.stringency,
          aqlValue: row.aqlValue,
          sampleType: row.sampleType,
          // 允收数/拒收数
          acceptValue: row.acceptValue,
          refuseValue: row.refuseValue,
          // 检查结果
          checkResult: row.checkResult,
          checkResultName: row.checkResultName,
          qualifiedQuantity: row.qualifiedQuantity,
          unqualifiedQuantity: row.unqualifiedQuantity,
          checkConsumerTime: row.checkConsumerTime,
          checkTimeUnit: row.checkTimeUnit,
          // 是否展示决策
          // showDecisions: row.checkResult === 0,
          //  复核结果
          reviewResult: row.reviewResult,
          reviewResultName: row.reviewResultName,
          reviewUnqualifiedQuantity: row.reviewUnqualifiedQuantity,
          reviewQualifiedQuantity: row.reviewQualifiedQuantity,
          reviewConsumerTime: row.reviewConsumerTime,
          reviewTimeUnit: row.reviewTimeUnit,
          // 核准结果
          authorizeResult: row.authorizeResult,
          authorizeResultName: row.authorizeResultName,
          authorizeUnqualifiedQuantity: row.authorizeUnqualifiedQuantity,
          authorizeQualifiedQuantity: row.authorizeQualifiedQuantity,
          authorizeConsumerTime: row.authorizeConsumerTime,
          authorizeTimeUnit: row.authorizeTimeUnit,
          // 送检时间等
          inspectTime: row.inspectTime,
          inspectBeginTime: row.inspectBeginTime,
          inspectEndTime: row.inspectEndTime,
          inspectPerson: row.inspectPerson,
          // 复核，核准，决策是否显示
          inspectMaterialProcess: row.inspectMaterialProcess,
          // 工序
          craftId: row.craftId,
          workOrderNumber: row.workOrderNumber,
          relateDocumentId: row.relateDocumentId,
          processProcedureId: row.processProcedureId,
          processProcedureCode: row.processProcedureCode,
          processProcedureName: row.processProcedureName,
          // 工作中心，生产基本单元
          workCenterId: row.workCenterId,
          workCenterCode: row.workCenterCode,
          workCenterName: row.workCenterName,
          productionBasicUnitId: row.productionBasicUnitId,
          productionBasicUnitCode: row.productionBasicUnitCode,
          productionBasicUnitName: row.productionBasicUnitName,
          // 物料扩展字段
          inspectMaterialExtendFieldOne: row.inspectMaterialExtendFieldOne,
          inspectMaterialExtendFieldTwo: row.inspectMaterialExtendFieldTwo,
          inspectMaterialExtendFieldThree: row.inspectMaterialExtendFieldThree,
          inspectMaterialExtendFieldFour: row.inspectMaterialExtendFieldFour,
          inspectMaterialExtendFieldFive: row.inspectMaterialExtendFieldFive,
          inspectMaterialExtendFieldSix: row.inspectMaterialExtendFieldSix,
          inspectMaterialExtendFieldSeven: row.inspectMaterialExtendFieldSeven,
          inspectMaterialExtendFieldEight: row.inspectMaterialExtendFieldEight,
          inspectMaterialExtendFieldNine: row.inspectMaterialExtendFieldNine,
          inspectMaterialExtendFieldTen: row.inspectMaterialExtendFieldTen,
          ...materialBatchListList

        }
      })
      this.$emit('update:clickIndex', 0)
    },
    // 复制-回读详情信息
    handleCopyEcho(materials) {
      if (!materials.length) return
      this.formInline.detailTableData = materials.map(row => {
        const materialFields = row.materialFields
        return {
          id: row.id,
          // 合格率
          passRate: row.passRate,
          // 单据
          relateDocumentCode: row.relateDocumentCode,
          relateDocumentType: row.relateDocumentType,
          supplierCode: row.supplierCode,
          supplierName: row.supplierName,
          customerCode: row.customerCode,
          customerName: row.customerName,
          // 物料
          materialCode: materialFields.code || row.materialCode,
          materialId: materialFields.id,
          materialName: materialFields.name,
          materialStandard: materialFields.standard,
          //  检验方案
          schemeId: row.schemeId,
          schemeCode: row.schemeCode,
          schemeName: row.schemeName,
          inspectQuantity: row.inspectQuantity,
          samplingQuantity: row.samplingQuantity,
          schemeGuideFiles: row.schemeGuideFiles,
          // 关联批次
          relateBatchType: row.relateBatchType,
          relateBarCode: row.relateBarCode,
          // 抽样方案
          samplePlanId: row.samplePlanId,
          samplePlanName: row.samplePlanName,
          inspectLevel: row.inspectLevel,
          stringency: row.stringency,
          aqlValue: row.aqlValue,
          sampleType: row.sampleType,
          // 允收数/拒收数
          acceptValue: row.acceptValue,
          refuseValue: row.refuseValue,
          // 时间单位和耗时时间
          checkConsumerTime: row.checkConsumerTime,
          checkTimeUnit: row.checkTimeUnit,
          // 送检人
          inspectPerson: row.inspectPerson,
          // this.$set(this.formInline, 'inspectPerson', data.inspectPerson)
          // 复核，核准，决策是否显示
          inspectMaterialProcess: row.inspectMaterialProcess,
          // 工序
          craftId: row.craftId,
          workOrderNumber: row.workOrderNumber,
          relateDocumentId: row.relateDocumentId,
          processProcedureId: row.processProcedureId,
          processProcedureCode: row.processProcedureCode,
          processProcedureName: row.processProcedureName,
          // 工作中心，生产基本单元
          workCenterId: row.workCenterId,
          workCenterCode: row.workCenterCode,
          workCenterName: row.workCenterName,
          productionBasicUnitId: row.productionBasicUnitId,
          productionBasicUnitCode: row.productionBasicUnitCode,
          productionBasicUnitName: row.productionBasicUnitName,
          workOrderOperator: { code: row?.workOrderOperator?.code || [], name: row?.workOrderOperator?.name || [] },
          resourceRelevance: { code: row?.resourceRelevance?.code || [], name: row?.resourceRelevance?.name || [] }
        }
      })
      this.$emit('update:clickIndex', 0)
    },
    headerCellStyle({ row, colunm, rowIndex, columnIndex }) {
      return {
        background: '#F1F5FC',
        color: '#333333',
        'font-family': 'Source Han Sans CN',
        'font-weight': '400'
      }
    },
    // 获取批次类型枚举
    async getBatchEnums() {
      const result = await getBatchEnums()
      const { data } = result.data || []
      this.relateBatchTypeEnums = data || []
    },
    // 切换行
    changeRow(flag) {
      console.log('🚀 ~ changeRow ~ flag:', flag)
      const length = this.formInline.detailTableData.length
      if (!length) return
      switch (flag) {
        case 'first':
          this.$emit('update:clickIndex', 0)
          break
        case 'previous':
          if (this.clickIndex === 0) {
            this.$message.warning('已经是第一行了!')
            return
          } else if (this.clickIndex > 0) {
            this.$emit('update:clickIndex', this.clickIndex - 1)
          }
          break
        case 'next':
          if (this.clickIndex === length - 1) {
            this.$message.warning('已经是最后一行了!')
            return
          } else if (this.clickIndex < length - 1) {
            this.$emit('update:clickIndex', this.clickIndex + 1)
          }
          break
        case 'last':
          this.$emit('update:clickIndex', length - 1)
          break
        default:
          break
      }
    },
    addRow() {
      if (!this.baseForm.type) {
        this.$message.warning(`请先选择检验类型`)
        return
      }
      // 调用弹窗
      // 若关联单据类型值为空，调用物料弹窗
      if (!this.baseForm.relateDocumentType) {
        this.clickShowMaterialDialog()
      } else {
        this.clickShowDocumentDialog()
      }
    },
    // 删除物料
    deleteRow(event, index) {
      // 阻止事件冒泡
      event.stopPropagation()
      const rowId = this.formInline.detailTableData[index]?.id
      // 存在Id
      this.$confirm('删除该检验物料? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!isNaN(rowId)) {
          deleteMaterial([rowId]).then(_ => {
            this.$message.success('删除成功')
            this.formInline.detailTableData.splice(index, 1)
            if (this.formInline.detailTableData.length > 0) {
              if (index > 0) {
                this.$emit('update:clickIndex', index - 1)
              } else if (index === 0) {
                this.$emit('update:clickIndex', 0)
              }
            } else {
              this.$emit('update:clickIndex', -1)
            }
          })
        } else {
          this.formInline.detailTableData.splice(index, 1)
          this.$message.success('删除成功')
          if (this.formInline.detailTableData.length > 0) {
            if (index > 0) {
              this.$emit('update:clickIndex', index - 1)
            } else if (index === 0) {
              this.$emit('update:clickIndex', 0)
            }
          } else {
            this.$emit('update:clickIndex', -1)
          }
        }
      })
    },
    // 物料弹窗
    clickShowMaterialDialog(row = {}, $index) {
      this.$emit('update:clickIndex', $index)
      this.dialogTitle = '物料选择'
      this.tableColumn = MaterialColumn
      // 关联单据没有值 直接查所有物料
      const relateCode = row['relateDocumentCode']
      if (!relateCode) {
        this.requestConfig = {
          url: '/api/materials/list',
          method: 'post'
        }
        this.extraParams = {
          state: '2'
        }
        this.showMaterialDialog = true
        return
      }
      this.showMaterialDialog = true
    },
    // // 物料弹窗
    // clickShowMaterialDialog(row = {}, $index) {
    //   this.$emit('update:clickIndex', $index)
    //   this.dialogTitle = '物料选择'
    //   this.tableColumn = MaterialColumn
    //   // 关联单据没有值 直接查所有物料
    //   const relateCode = row['relateDocumentCode']
    //   if (!relateCode) {
    //     this.requestConfig = {
    //       url: '/api/materials/list',
    //       method: 'post'
    //     }
    //     this.extraParams = {
    //       state: '2'
    //     }
    //     this.showMaterialDialog = true
    //     return
    //   }
    //   this.showMaterialDialog = true
    // },
    // 检验方案弹窗
    clickShowSchemeDialog(row, $index) {
      // this.$emit('update:clickIndex', $index)
      const materialCode = row['materialCode']
      const materialId = row['materialId']
      if (!materialCode) {
        return this.$message.warning('请先选择物料')
      }
      this.dialogTitle = '检验方案'
      this.tableColumn = SchemeColumn
      this.requestConfig = {
        url: '/qms/product/v1/schemes/get/scheme/by/condition',
        method: 'get'
      }
      this.extraParams = {
        type: this.baseForm.type,
        materialId,
        materialCode
      }
      this.showSchemeDialog = true
    },
    // 远程方法获取批次列表
    querySearchAsync(row) {
      return (queryString, cb) => {
        const params = {
          current: 1,
          size: 20,
          relateDocumentType: this.baseForm.relateDocumentType,
          relateDocumentCode: row.relateDocumentCode,
          relateRowId: row.relateRowId,
          materialCode: row.materialCode,
          barCode: queryString
        }
        getBarCodeList(params).then(res => {
          console.log('🚀 ~ getBarCodeList ~ res:', res.data.data.records)
          const list = res.data?.data?.records || []
          const barCodes = list.map(item => ({ value: item.barCode }))
          cb(barCodes)
        })
      }
    },
    // 修改送检数量
    async changeInspectQuantity(inspectQuantity, row) {
      const params = {
        num: inspectQuantity
      }
      if (typeof row.samplePlanId === 'number') {
        params.sampleId = row.samplePlanId
      } else if (typeof row.schemeId === 'number') {
        params.schemeId = row.schemeId
      } else {
        return
      }
      const result = await getSampleNumByScheme(params)
      const samplingQuantity = result.data?.data?.sampleNum || 0
      row.samplingQuantity = samplingQuantity

      // 根据抽样方案和送检数量查出允收数/拒收数
      const params2 = {
        num: inspectQuantity,
        samplePlanId: row.samplePlanId
      }
      if (params2.num && params2.samplePlanId) {
        const result2 = await getAcceptValueByScheme(params2)
        if (result2.data.status === 1) {
          const data = result2.data.data
          this.$set(row, 'acceptValue', data.acceptValue)
          this.$set(row, 'refuseValue', data.refuseValue)
        }
      }
    },

    // 物料弹窗确认
    async handleMaterialConfirm(rows) {
      console.log('物料弹窗确认 rows', rows)

      this.loading = true
      this.showMaterialDialog = false

      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row?.id
        const { materialFields } = row
        const params = {
          type: this.baseForm.type,
          materialId: materialFields?.id,
          materialCode: materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params1 = {
            num: row.barCount || row.planAmount,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
          // 根据抽样方案和送检数量查出允收数/拒收数
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result = await getAcceptValueByScheme(params2)
            if (result.data.status === 1) {
              const data = result.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleMaterialConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)
          if (!data || data.length === 0) {
            // return
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
                itemOptionList &&
                itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList?.some(option => option.optionName === result))
                      .map(result => itemOptionList?.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray?.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray?.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray?.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }
              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              const obj = {
                ...row,
                itemValues: itemValues,
                itemDefects: [],
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity,
                acceptValue: acceptValue2 || acceptValue,
                refuseValue: refuseValue2 || refuseValue,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                itemOptionList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          // relateRowId: row.materialRowId,
          // relateRowLineNum: row.lineNumber,
          // 这个值保存物料信息
          materialFields: materialFields,

          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity: row.barCount || row.planAmount || 0,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 关联资源
          resourceRelevance: row.resourceRelevance || { code: [], name: [] },
          // 操作员
          workOrderOperator: row.workOrderOperator || { code: [], name: [] },
          // 由检验方案带出来样次
          materialNums: materialNums,
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.formInline.detailTableData = this.formInline.detailTableData.filter(item => item.materialCode)
      await this.formInline.detailTableData.push(...rowData)
      this.loading = false

      // 新增后选中最后一个值,此时新增的数据已经在表格里面了，所以需要－1
      const clickIndex = Number(this.formInline.detailTableData.length) - 1
      this.$emit('update:clickIndex', clickIndex)
      const row = this.formInline.detailTableData[clickIndex]
      if (!row) return
      this.$emit('update:currentRow', row)
    },
    // 检验方案弹窗确认
    handleSchemeConfirm(row) {
      this.$set(this.formInline.detailTableData[this.clickIndex], 'schemeId', row.schemeId)
      this.$set(this.formInline.detailTableData[this.clickIndex], 'schemeCode', row.schemeCode)
      this.$set(this.formInline.detailTableData[this.clickIndex], 'schemeName', row.schemeName)
      // 检验方案带出抽样方案
      const samplePlanEntity = row.samplePlanEntity || {}
      this.$set(this.formInline.detailTableData[this.clickIndex], 'samplePlanId', samplePlanEntity.id)
      this.$set(this.formInline.detailTableData[this.clickIndex], 'samplePlanName', samplePlanEntity.name)
      this.$set(this.formInline.detailTableData[this.clickIndex], 'inspectLevel', samplePlanEntity.inspectLevel)
      this.$set(this.formInline.detailTableData[this.clickIndex], 'stringency', samplePlanEntity.stringency)
      this.$set(this.formInline.detailTableData[this.clickIndex], 'aqlValue', samplePlanEntity.aqlValue)
      // 修改方案时重新计算抽样数量
      this.changeInspectQuantity(
        this.formInline.detailTableData[this.clickIndex].inspectQuantity,
        this.formInline.detailTableData[this.clickIndex]
      )
      this.showSchemeDialog = false
    },
    // 点击行
    handleRowClick(row) {
      const index = this.formInline.detailTableData.findIndex(item => item === row)
      this.$emit('update:clickIndex', index)
      this.$emit('update:qualifiedNumDefaultFlag', false)
      // this.$emit('update:currentRow', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.detailedList {
  .centerArea {
    height: 100%;
    background: white;
    .centerArea-header {
      // display: flex;
      // justify-content: space-between;
      // border-bottom: 1px solid #d6d6d6;
      padding: 12px 14px 0px 12px;
      // align-items: center;
      .centerArea-container {
        border-bottom: 1px solid #d6d6d6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
      }
      .centerArea-title {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 500;
        font-size: 16px;
        color: #333333;
      }
    }
    // 检验物料列表
    .scroll {
      overflow: auto;
      height: 88%;
    }
    .scroll::-webkit-scrollbar {
      height: 8px; /* 设置滚动条的高度 */
      width: 8px; /* 设置滚动条的宽度 */
    }
    .material {
      margin: 10px 10px 0px 11px;
      background: #fff;
      padding-bottom: 10px;
      .material-container {
        .material-item {
          background: #ffffff;
          box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
          border-radius: 2px 2px 2px 2px;
          // margin-top: 12px;
          margin: 12px 1px 1px 1px;
          display: flex;
          padding: 8px;
          flex-direction: column;
          justify-content: center;
          .material-item-container {
            display: flex;
            justify-content: space-between;
            font-family: Source Han Sans CN, Source Han Sans CN;
            font-weight: 400;
            font-size: 14px;
            color: #333333;
            .blue {
              font-family: Source Han Sans CN, Source Han Sans CN;
              font-weight: 500;
              font-size: 15px;
              color: #1890ff;
            }
          }
          .material-item-top {
            margin-top: 12px;
            .material-item-icon {
              height: 16px;
              width: 200px;
              display: flex;
              align-items: center;
              justify-content: right;
              cursor: pointer;
            }
          }
        }
        .border-blue {
          border: 1px solid #1890ff;
        }
      }
    }

    .el-form-item {
      margin-bottom: 0px;
      ::v-deep .el-form-item__error {
        z-index: 100;
      }
    }
    ::v-deep .el-table td.el-table__cell div {
      overflow: visible;
    }
    /* 修改 el-table 中的横向滚动条 */
    ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
      height: 8px; /* 设置滚动条的高度 */
      width: 8px; /* 设置滚动条的宽度 */
    }
    //去掉number输入框的上下箭头
    ::v-deep {
      .hide-spinners input::-webkit-outer-spin-button,
      .hide-spinners input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      .hide-spinners input[type='number'] {
        -moz-appearance: textfield;
      }
      // 解决input number框输入中文后光标上移的问题
      .hide-spinners .el-input__inner {
        line-height: 1px !important;
      }
    }
  }
}
.no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 640px;
  .no-data-text {
    margin-top: 8px;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 400;
    font-size: 14px;
    color: #909399;
  }
}
::v-deep .el-button--mini {
  padding: 7px;
}
</style>
<style>
.relateBarCodeClass.el-autocomplete-suggestion.el-popper {
  width: auto !important;
  max-width: 180px;
}
</style>
