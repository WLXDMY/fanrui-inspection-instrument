<template>
  <div class="detailedList">
    <section class="centerArea">
      <div>
        分录明细
        <el-button type="text" :disabled="isDetailType || initStatus !== 1" @click="addRow">新增一行</el-button>
        <el-button
          class="deleteBtn"
          type="text"
          :disabled="disabledDelete || isDetailType || initStatus !== 1"
          @click="deleteRow"
        >
          删除一行
        </el-button>
      </div>
      <el-form ref="detailedListRef" :model="formInline">
        <el-table
          ref="commonTable"
          v-loading="loading"
          :header-cell-style="headerCellStyle"
          :data="formInline.detailTableData"
          highlight-current-row
          :max-height="300"
          style="width: 100%"
          @row-click="handleRowClick"
        >
          <!-- <el-table-column type="selection" width="45" /> -->
          <el-table-column type="index" width="50" label="序号" />
          <el-table-column
            property="relateDocumentCode"
            label="关联单据编号"
            :min-width="isOtherInspect ? '100px' : '180px'"
          >
            <template v-if="!isOtherInspect" slot-scope="{ row, $index }">
              <el-form-item :prop="'detailTableData.' + $index + '.relateDocumentCode'">
                <el-input v-model="row.relateDocumentCode" disabled>
                  <el-button
                    slot="append"
                    :disabled="initStatus !== 1 || Boolean(row.relateDocumentCode)"
                    icon="el-icon-search"
                    @click="clickShowDocumentDialog(row, $index)"
                  />
                </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column property="materialCode" label="物料编码" :min-width="isOtherInspect ? '180px' : '120px'">
            <template slot-scope="{ row, $index }">
              <el-form-item
                v-if="isOtherInspect"
                :prop="'detailTableData.' + $index + '.materialCode'"
                :rules="[
                  {
                    required: true,
                    message: '该参数是必填项',
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input v-model="row.materialCode" disabled>
                  <el-button slot="append" icon="el-icon-search" @click="clickShowMaterialDialog(row, $index)" />
                </el-input>
              </el-form-item>
              <span v-else>{{ row.materialCode }}</span>
            </template>
          </el-table-column>
          <el-table-column property="materialName" label="物料名称" min-width="120px" />
          <el-table-column property="materialStandard" label="物料规格" min-width="120px" />
          <el-table-column property="schemeName" label="检验方案" min-width="180px">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="'detailTableData.' + $index + '.schemeName'">
                <el-input v-model="row.schemeName" disabled>
                  <el-button
                    slot="append"
                    :disabled="initStatus !== 1"
                    icon="el-icon-search"
                    @click="clickShowSchemeDialog(row, $index)"
                  />
                </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column property="inspectQuantity" label="送检数量" min-width="90px">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.inspectQuantity"
                class="hide-spinners"
                type="number"
                :min="0"
                @change="changeInspectQuantity($event, row)"
              />
            </template>
          </el-table-column>
          <el-table-column property="samplingQuantity" label="抽样数量" min-width="90px">
            <template slot-scope="{ row }">
              <el-input v-model="row.samplingQuantity" class="hide-spinners" type="number" :min="0" />
            </template>
          </el-table-column>
          <el-table-column property="checkResult" label="检查结果">
            <template slot-scope="{ row }">
              {{ row.checkResult === 1 ? '合格' : row.checkResult === 0 ? '不合格' : '' }}
            </template>
          </el-table-column>
          <!-- <el-table-column v-if="showBatchColumn" property="relateBatchType" label="关联批次类型" min-width="180px">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="'detailTableData.' + $index + '.relateBatchType'">
                <el-select v-model="row.relateBatchType" filterable placeholder="请选择" disabled>
                  <el-option
                    v-for="(item, index) in relateBatchTypeEnums"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column> -->
          <el-table-column v-if="showBatchColumn" property="relateBarCode" label="关联批次" min-width="150px">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="'detailTableData.' + $index + '.relateBarCode'">
                <el-autocomplete
                  v-model="row.relateBarCode"
                  :fetch-suggestions="querySearchAsync(row)"
                  :disabled="!Boolean(row.materialCode) || !row.isBatchMag"
                  popper-class="relateBarCodeClass"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column property="supplierCode" label="供应商编码" min-width="120px" />
          <el-table-column property="supplierName" label="供应商名称" min-width="120px" />
          <el-table-column property="customerCode" label="客户编码" min-width="120px" />
          <el-table-column property="customerName" label="客户名称" min-width="120px" />
        </el-table>
      </el-form>
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
import ReceipOrderDialog from './receipOrderDialog/index.vue'
import { getBatchEnums, getBarCodeList } from '@/api/quality-manage.js'
import {
  getInspectCheckResult,
  getInspectNumsItem,
  getInspectDefect,
  getInspectFileList,
  deleteMaterial,
  getSampleNumByScheme,
  getSchemeByMaterial
} from '@/api/quality-manage.js'
import { MaterialColumn, SchemeColumn } from './constant.js'
import { relateDocumentMixins } from './relateDocumentMixins.js'
export default {
  name: 'DetailedList',
  components: {
    CommonSelectDialogPlus: () => import('@/components/CommonSelectDialogPlus/index.vue'),
    ReceipOrderDialog
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
      loading: false
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
    barCodes() {
      return this.formInline.detailTableData.map(item => item.relateBarCode)
    },
    isOtherInspect() {
      return this.baseForm.type === 'otherInspect'
    }
  },
  watch: {
    clickIndex(val) {
      const row = this.formInline.detailTableData[val]
      if (!row) return
      this.$emit('update:currentRow', row)
      this.$refs.commonTable.setCurrentRow(row)
      if (row.id) {
        if (this.interfaceRecord[row.id]) return
        this.interfaceRecord[row.id] = {}
        this.getRowDetailInfo(row.id, row)
      }
    },
    'baseForm.relateDocumentType'(val) {
      this.isAddType && (this.formInline.detailTableData = [])
    }
  },
  created() {
    this.getBatchEnums()
  },
  methods: {
    // 切换行获取分录明细信息
    getRowDetailInfo(id, row) {
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
      // 获取检验样次
      getInspectNumsItem(id).then(res => {
        const data =
          res.data.data?.map((item, index) => {
            const name = `检验样次${index + 1}`
            const numItems = item.numItems.map(numItem => {
              let checkResult = numItem.checkResult
              const optionalValue = numItem.optionalValue?.split?.(',') || []
              if (numItem.inputMode === 'multipleChoice') {
                checkResult = numItem.checkResult?.split(',') || []
              }
              const itemDefects =
                numItem.itemDefects?.map(defect => {
                  const productCodes = defect.productCodes.join()
                  return {
                    ...defect,
                    productCodes
                  }
                }) || []
              const itemValues = numItem.itemValues || []
              return {
                ...numItem,
                itemDefects,
                itemValues,
                checkResult,
                optionalValue
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
        const data = res.data.data
        this.$set(row, 'materialDefects', data)
      })
      // 获取附件列表
      getInspectFileList(id).then(res => {
        const data = res.data.data
        this.$set(row, 'inspectFiles', data)
      })
    },
    // 回读详情信息
    handleEcho(materials) {
      if (!materials.length) return
      this.formInline.detailTableData = materials.map(row => {
        const materialFields = row.materialFields
        return {
          id: row.id,
          // 单据
          relateDocumentCode: row.relateDocumentCode,
          supplierCode: row.supplierCode,
          supplierName: row.supplierName,
          customerCode: row.customerCode,
          customerName: row.customerName,
          // 物料
          materialCode: materialFields.code,
          materialId: materialFields.id,
          materialName: materialFields.name,
          materialStandard: materialFields.standard,
          isBatchMag: materialFields.isBatchMag,
          //  检验方案
          schemeId: row.schemeId,
          schemeCode: row.schemeCode,
          schemeName: row.schemeName,
          inspectQuantity: row.inspectQuantity,
          samplingQuantity: row.samplingQuantity,
          // 关联批次
          relateBatchType: row.relateBatchType,
          relateBarCode: row.relateBarCode,
          // 抽样方案
          samplePlanId: row.samplePlanId,
          samplePlanName: row.samplePlanName,
          inspectLevel: row.inspectLevel,
          stringency: row.stringency,
          aqlValue: row.aqlValue,
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
          authorizeTimeUnit: row.authorizeTimeUnit
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
    // 点击行
    handleRowClick(row) {
      const index = this.formInline.detailTableData.findIndex(item => item === row)
      this.$emit('update:clickIndex', index)
    },
    // 切换行
    changeRow(flag) {
      const length = this.formInline.detailTableData.length
      if (!length) return
      switch (flag) {
        case 'first':
          this.$emit('update:clickIndex', 0)
          break
        case 'previous':
          if (this.clickIndex > 0) {
            this.$emit('update:clickIndex', this.clickIndex - 1)
          }
          break
        case 'next':
          if (this.clickIndex < length - 1) {
            this.$emit('update:clickIndex', this.clickIndex + 1)
          }
          break
        case 'last':
          this.$emit('update:clickIndex', length - 1)
          break
        default:
          break
      }
      this.scrollTable()
    },
    // 切换行时滚动表格
    scrollTable() {
      this.$nextTick(() => {
        const tableWrapper = this.$refs.commonTable.$el.querySelector('.el-table__body-wrapper')
        const currentRow = tableWrapper.querySelector('.current-row')
        const scrollTo = currentRow.offsetTop - tableWrapper.offsetTop
        tableWrapper.scrollTo({
          top: scrollTo,
          behavior: 'smooth' // 可选，smooth 表示平滑滚动
        })
      })
    },
    addRow() {
      if (!this.baseForm.type) {
        this.$message.warning(`请先选择检验类型`)
        return
      }
      if (!this.baseForm.relateDocumentType && this.baseForm.type !== 'otherInspect') {
        this.$message.warning(`请先选择关联单据类型`)
        return
      }
      const addObj = {
        // 检验决策
        materialDecisions: [],
        // 检验样次
        materialNums: [],
        // 物料缺陷
        materialDefects: []
        // 关联附件
      }
      // 根据关联单据类型，赋值批次类型
      if (
        this.baseForm.relateDocumentType === 'purchaseReceive' ||
        this.baseForm.relateDocumentType === 'purchaseOrder'
      ) {
        // 采购收料单 和 采购订单
        addObj.relateBatchType = 'purchase'
      }
      this.formInline.detailTableData.push(addObj)
    },
    deleteRow() {
      const rowId = this.formInline.detailTableData[this.clickIndex]?.id
      // 存在Id
      if (!isNaN(rowId)) {
        this.$confirm('删除改分录明细? ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMaterial([rowId]).then(_ => {
            this.$message.success('删除成功')
            this.formInline.detailTableData.splice(this.clickIndex, 1)
            this.$emit('update:clickIndex', -1)
          })
        })
      } else {
        this.formInline.detailTableData.splice(this.clickIndex, 1)
        this.$emit('update:clickIndex', -1)
      }
    },
    // 物料弹窗
    clickShowMaterialDialog(row, $index) {
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
      // 关联单据有值,分情况处理
      // switch (this.baseForm.relateDocumentType) {
      //   case 'purchaseOrder':
      //     this.requestConfig = {
      //       url: '/ams/purchases/list',
      //       method: 'post'
      //     }
      //     this.extraParams = {
      //       states: '2,3',
      //       showType: 'material',
      //       fullPurchaseCode: relateCode
      //     }
      //     break
      //   case 'purchaseReceive':
      //     this.requestConfig = {
      //       url: '/ams/receipt/list',
      //       method: 'post'
      //     }
      //     this.extraParams = {
      //       states: '2,3',
      //       showType: 'material',
      //       fullReceiptCode: relateCode
      //     }
      //     break
      //   case 'projectOrder':
      //     this.requestConfig = {
      //       url: '/pms/v1/open/project/product/page/list',
      //       method: 'post'
      //     }
      //     this.extraParams = {
      //       states: '2,3',
      //       showType: 'material',
      //       fullProjectDefineCode: relateCode
      //     }
      //     break

      //   default:
      //     break
      // }
      this.showMaterialDialog = true
    },
    // 检验方案弹窗
    clickShowSchemeDialog(row, $index) {
      this.$emit('update:clickIndex', $index)
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
    },

    // 物料弹窗确认
    async handleMaterialConfirm(rows) {
      this.loading = true
      this.showMaterialDialog = false

      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
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
        try {
          const params1 = {
            num: row.barCount || row.planAmount,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ handleMaterialConfirm ~ error:', error)
        }
        const obj = {
          ...row,
          // relateRowId: row.materialRowId,
          // relateRowLineNum: row.lineNumber,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity: row.barCount || row.planAmount || 0,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.formInline.detailTableData = this.formInline.detailTableData.filter(item => item.materialCode)
      this.formInline.detailTableData.push(...rowData)
      this.loading = false

      // 这里需要重新选中一下 因为原本的占位行被删除了
      const row = this.formInline.detailTableData[this.clickIndex]
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
    }
  }
}
</script>

<style lang="scss" scoped>
.detailedList {
  .centerArea {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    margin-top: 10px;
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
</style>
<style>
.relateBarCodeClass.el-autocomplete-suggestion.el-popper {
  width: auto !important;
  max-width: 180px;
}
</style>
