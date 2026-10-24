<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-09-03 16:04:40
 * @LastEditors: laidz laidz@yelinked.com
 * @Description: 物料信息
-->
<template>
  <div v-if="!noSelectRow" class="projectIndicator scroll">
    <el-form
      ref="projectForm"
      :inline="true"
      :model="currentRow"
      class="demo-form-inline"
      label-position="right"
      label-width="150px"
    >
      <section class="centerArea">
        <div class="centerArea-title">物料及关联信息</div>
        <!-- 物料信息 start -->
        <el-form-item
          v-if="
            $FC('materialName', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('materialName', '物料名称')"
          prop="materialName"
        >
          {{ currentRow.materialName }}
        </el-form-item>
        <el-form-item
          v-if="
            $FC('materialCode', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('materialCode', '物料编码')"
          prop="materialCode"
        >
          {{ currentRow.materialCode }}
        </el-form-item>
        <el-form-item
          v-for="item in extendMaterialList"
          :key="item.id"
          :label="item.fieldName + '：'"
          :prop="item.fieldCode"
        >
          {{ currentRow && currentRow.materialFields && currentRow.materialFields[item.fieldCode] }}
        </el-form-item>

        <el-divider />

        <el-form-item
          v-if="
            $FC('relateDocumentCode', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('relateDocumentCode', '关联单据编码')"
          prop="relateDocumentCode"
          :rules="$FR(fieldPath, 'relateDocumentCode')"
        >
          <el-input
            v-model="currentRow.relateDocumentCode"
            size="mini"
            :disabled="Boolean(baseForm.relateDocumentType) || initStatus !== 1 ||$FC('relateDocumentCode', fullRouteCode, pageFullPathCode)?.isEdit === false"
          />
        </el-form-item>
        <!-- 因为下方有，所以先隐藏 ??? -->
        <!-- <el-form-item
          v-if="showBatchColumn || $FC('relateBarCode', fullRouteCode, pageFullPathCode)?.isShow === true"
          :label="getLabelName('relateBarCode', '关联批次')"
          prop="relateBarCode"
          :rules="$FR(fieldPath, 'relateBarCode')"
        >
          <el-autocomplete
            v-model="currentRow.relateBarCode"
            :fetch-suggestions="querySearchAsync(currentRow)"
            :disabled="!Boolean(currentRow.materialCode) || initStatus !== 1"
            popper-class="relateBarCodeClass"
            placeholder="请输入内容"
          />
        </el-form-item> -->
        <el-form-item
          v-if="$FC('supplierName', fullRouteCode, pageFullPathCode)?.isShow === true"
          :label="getLabelName('supplierName', '供应商名称')"
          prop="supplierName"
          :rules="$FR(fieldPath, 'supplierName')"
        >
          <el-input class="no-border-radius" :value="currentRow.supplierName" size="mini" disabled>
            <el-button
              v-if="!Boolean(baseForm.relateDocumentType)"
              slot="append"
              :disabled="initStatus !== 1"
              icon="el-icon-search"
              @click="showSupplierDialog = true"
            />
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="$FC('supplierCode', fullRouteCode, pageFullPathCode)?.isShow === true"
          :label="getLabelName('supplierCode', '供应商编码')"
          prop="supplierCode"
          :rules="$FR(fieldPath, 'supplierCode')"
        >
          <el-input :value="currentRow.supplierCode" size="mini" disabled />
        </el-form-item>
        <el-form-item
          v-if="$FC('customerName', fullRouteCode, pageFullPathCode)?.isShow === true"
          :label="getLabelName('customerName', '客户名称')"
          prop="customerName"
          :rules="$FR(fieldPath, 'customerName')"
        >
          <el-input class="no-border-radius" :value="currentRow.customerName" size="mini" disabled>
            <el-button
              v-if="!Boolean(baseForm.relateDocumentType)"
              slot="append"
              :disabled="initStatus !== 1"
              icon="el-icon-search"
              @click="showCustomerDialog = true"
            />
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="$FC('customerCode', fullRouteCode, pageFullPathCode)?.isShow === true"
          :label="getLabelName('customerCode', '客户编码')"
          prop="customerCode"
          :rules="$FR(fieldPath, 'customerCode')"
        >
          <el-input :value="currentRow.customerCode" size="mini" disabled />
        </el-form-item>
        <el-form-item
          v-if="showProcedureList && $FC('processProcedureId', fullRouteCode, pageFullPathCode)?.isShow === true"
          :label="getLabelName('processProcedureId', '工序名称')"
          prop="processProcedureId"
          :rules="$FR(fieldPath, 'processProcedureId')"
        >
          <el-select
            :key="currentRow.id + '_' + currentRow.processProcedureId"
            v-model="currentRow.processProcedureId"
            style="width: 248px"
            size="mini"
            filterable
            clearable
            :disabled="initStatus !== 1 || $FC('processProcedureId', fullRouteCode, pageFullPathCode)?.isEdit === false"
            :loading="procedureLoading"
            @change="changeProcessProcedureId"
            @focus="handleProcedureFocus"
          >
            <el-option
              v-for="item in procedureList"
              :key="item.procedureId"
              :label="item.procedureName"
              :value="item.procedureId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="showProcedureList && $FC('productionBasicUnitName', fullRouteCode, pageFullPathCode)?.isShow === true"
          :label="getLabelName('productionBasicUnitName', '生产基本单元')"
          prop="productionBasicUnitName"
          :rules="$FR(fieldPath, 'productionBasicUnitName')"
        >
          <el-input :value="currentRow.productionBasicUnitName" size="mini" disabled />
        </el-form-item>

        <!-- “关联资源”“操作员” start -->
        <!-- 操作员-多选 -->
        <el-form-item
          v-if="$FC('workOrderOperatorName', fullRouteCode, pageFullPathCode)?.isShow === true"
          :label="getLabelName('workOrderOperatorName', '操作员')"
          prop="workOrderOperator.code"
          :rules="$FR(fieldPath, 'workOrderOperatorName')"
        >
          <el-select
            v-model="currentRow.workOrderOperator.code"
            style="width: 248px"
            size="mini"
            filterable
            clearable
            multiple
            :disabled="initStatus !== 1 || $FC('workOrderOperatorName', fullRouteCode, pageFullPathCode)?.isEdit === false"
            @change="changeWorkOrderOperator"
          >
            <el-option
              v-for="item in workOrderOperatorOption"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <!-- 关联资源-多选 -->
        <el-form-item
          v-if="$FC('resourceRelevanceName', fullRouteCode, pageFullPathCode)?.isShow === true"
          :label="getLabelName('resourceRelevanceName', '关联资源')"
          prop="resourceRelevance.code"
          :rules="$FR(fieldPath, 'resourceRelevanceName')"
        >
          <el-select
            v-model="currentRow.resourceRelevance.code"
            style="width: 248px"
            size="mini"
            filterable
            clearable
            multiple
            :disabled="initStatus !== 1 || $FC('resourceRelevanceName', fullRouteCode, pageFullPathCode)?.isEdit === false"
            @change="changeResourceRelevance"
          >
            <el-option
              v-for="item in resourceRelevanceOption"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <!-- “关联资源”“操作员” end -->

        <!-- 扩展物料字段 start -->
        <template v-for="item in inspectMaterialList">
          <!-- 你的模板内容 -->
          <ExtendMaterialFormItem
            :key="item"
            :prop="item"
            :full-route-code="fullRouteCode"
            :page-full-path-code="pageFullPathCode"
            :row="currentRow"
            :td-index="$index"
          />
        </template>
        <!-- 扩展物料字段 end -->

        <!-- 批次物料字段 start -->
        <template v-for="item in batchList">
          <!-- 你的模板内容 -->
          <ExtendMaterialFormItem
            :key="item.id"
            :prop="item.fieldCode"
            :full-route-code="fullRouteCode"
            :page-full-path-code="pageFullPathCode"
            :row="currentRow"
            :td-index="$index"
          />
        </template>
        <!-- 批次物料字段 end -->
      </section>

      <section class="centerArea">
        <div class="centerArea-title">整体检验方案</div>

        <el-form-item
          v-if="
            $FC('schemeName', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('schemeName', '检验方案')"
          prop="schemeName"
          :rules="$FR(fieldPath, 'schemeName')"
        >
          <el-input v-model="currentRow.schemeName" class="no-border-radius" disabled>
            <el-button
              slot="append"
              icon="el-icon-search"
              :disabled="initStatus !== 1"
              @click="clickShowSchemeDialog(currentRow, $index)"
            />
          </el-input>
        </el-form-item>
        <el-form-item
          v-if="
            $FC('inspectQuantity', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('inspectQuantity', '送检数量')"
          prop="inspectQuantity"
          :rules="$FR(fieldPath, 'inspectQuantity')"
        >
          <el-input
            v-model="currentRow.inspectQuantity"
            class="hide-spinners"
            type="number"
            :min="0"
            :disabled="$FC('inspectQuantity', fullRouteCode, pageFullPathCode)?.isEdit === false"
            @change="changeInspectQuantity($event, currentRow)"
          />
        </el-form-item>
        <el-form-item
          v-if="
            $FC('samplePlanName', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('samplePlanName', '抽样方案')"
          prop="samplePlanName"
          :rules="$FR(fieldPath, 'samplePlanName')"
        >
          <y-complexSelect
            v-model="currentRow.samplePlanName"
            style="width: 248px"
            :disabled="initStatus !== 1 || $FC('samplePlanName', fullRouteCode, pageFullPathCode)?.isEdit === false"
            @btnClickCallback="showDialog = true"
            @selectChange="(e, options) => changeMaterialCode(e, options)"
          />

          <!-- <el-input v-model="currentRow.samplePlanName" class="no-border-radius" disabled>
            <el-button slot="append" icon="el-icon-search" :disabled="initStatus !== 1" @click="showDialog = true" />
          </el-input> -->
        </el-form-item>
        <el-form-item
          v-if="
            $FC('samplingQuantity', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('samplingQuantity', '抽样数量')"
          prop="samplingQuantity"
          :rules="$FR(fieldPath, 'samplingQuantity')"
        >
          <el-input
            v-model="currentRow.samplingQuantity"
            :disabled="$FC('samplingQuantity', fullRouteCode, pageFullPathCode)?.isEdit === false"
            class="hide-spinners"
            type="number"
            :min="0"
          />
        </el-form-item>

        <el-form-item
          v-if="
            $FC('sampleType', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('sampleType', '抽样类型')"
          prop="sampleType"
          :rules="$FR(fieldPath, 'sampleType')"
        >
          <el-select v-model="currentRow.sampleType" style="width: 248px" disabled size="mini">
            <el-option v-for="item in typeList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="
            $FC('inspectLevel', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('inspectLevel', '检验水平')"
          prop="inspectLevel"
          :rules="$FR(fieldPath, 'inspectLevel')"
        >
          <el-select v-model="currentRow.inspectLevel" style="width: 248px" disabled size="mini">
            <el-option v-for="item in levelTypeList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="
            $FC('stringency', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('stringency', '严格度')"
          prop="stringency"
          :rules="$FR(fieldPath, 'stringency')"
        >
          <el-select v-model="currentRow.stringency" style="width: 248px" disabled size="mini">
            <el-option v-for="item in sternWidthLevelList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="
            $FC('aqlValue', fullRouteCode, pageFullPathCode)?.isShow === true
          "
          :label="getLabelName('aqlValue', 'AQL')"
          prop="aqlValue"
          :rules="$FR(fieldPath, 'aqlValue')"
        >
          <el-select v-model="currentRow.aqlValue" style="width: 248px" disabled size="mini">
            <el-option v-for="item in aqlTypeList" :key="item.code" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item :label="getLabelAcceptAndRefuseName()">
          <!-- <el-form-item label="允收数/拒收数："> -->
          {{ (currentRow.acceptValue || 0) + '/' + (currentRow.refuseValue || 0) }}
        </el-form-item>
        <div class="attachments-all">
          <div v-for="(item, index) in currentRow.schemeGuideFiles" :key="index" class="attachments">
            <div class="attachments-type">
              <img :src="getAttachmentType(item)" alt="" width="16" height="auto">
            </div>
            <div class="attachments-text">{{ item.fileName }}</div>
            <div class="attachments-icon">
              <span
                v-if="enableView(item)"
                class="attachments-icon-gutter"
                @click="view(item)"
              ><img
                src="@/assets/images/common/eye.png"
                alt=""
                width="16"
                height="12"
              ></span>
              <span
                class="attachments-icon-gutter"
                @click="download(item)"
              ><img
                src="@/assets/images/common/download.png"
                alt=""
                width="12"
                height="12"
              ></span>
              <!-- <span @click="deleteAttach(item, index)"
                ><img src="@/assets/images/common/attachments-delete.png" alt=" " width="12" height="12"
              /></span> -->
            </div>
          </div>
        </div>
      </section>
    </el-form>

    <!-- 抽样方案 -->
    <CommonSelectDialogPlus
      v-if="showDialog"
      title="抽样方案"
      :request-config="{
        url: 'qms/product/v1/sample/planes/list',
        method: 'post'
      }"
      :extra-params="{ statues: [1], filter: true }"
      :column-config="tableColumn"
      :visible="showDialog"
      :append-to-body="true"
      @confirm="handleConfirm"
      @cancel="showDialog = false"
    />

    <!-- 检验方案 -->
    <CommonSelectDialogPlus
      v-if="showSchemeDialog"
      :title="dialogTitle"
      :request-config="requestConfig"
      :extra-params="extraParams"
      :column-config="tableColumnScheme"
      :visible="showSchemeDialog"
      :append-to-body="true"
      @confirm="handleSchemeConfirm"
      @cancel="showSchemeDialog = false"
    />

    <!-- 供应商 -->
    <CommonSelectDialogPlus
      v-if="showSupplierDialog"
      title="选择供应商"
      :request-config="{
        url: '/api/suppliers/list',
        method: 'get'
      }"
      :extra-params="{ current: 1, size: 99999, states: 2 }"
      :column-config="tableColumnSupplier"
      :visible="showSupplierDialog"
      :append-to-body="true"
      @confirm="handleSupplierConfirm"
      @cancel="showSupplierDialog = false"
    />

    <!-- 客户 -->
    <CommonSelectDialogPlus
      v-if="showCustomerDialog"
      title="选择客户"
      :request-config="{
        url: '/api/customers/list',
        method: 'post'
      }"
      :extra-params="{ current: 1, size: 99999, states: 2 }"
      :column-config="tableColumnCustomer"
      :visible="showCustomerDialog"
      :append-to-body="true"
      @confirm="handleCustomerConfirm"
      @cancel="showCustomerDialog = false"
    />

    <ViewImagesDialog v-if="visible" :visible="visible" :image-list="imageList" @closeDailog="closeDailog" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMaterialTypeKeyList } from '@/api/common'
import { getRecordHistory } from '@/api/trace'

import {
  deleteDecision,
  aqlList,
  getSternWidthLevelList,
  levelList,
  getSampleNumByScheme,
  getBarCodeList,
  deleteInspectFile,
  getAcceptValueByScheme,
  standardTypeList,
  selectProcedureList,
  getSchemeByMaterial
} from '@/api/quality-manage.js'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import { CHECK_STANDARDS_TABLE } from '../../../../inspectionProgram/components/tabPages/constant.js'
import { SchemeColumn, SupplierColumn, CustomerColumn } from '../../detailedLIst/constant.js'
import ExtendMaterialFormItem from '../../components/ExtendMaterialFormItem.vue'

export default {
  name: 'InspectionProgram',
  components: { CommonSelectDialogPlus, ViewImagesDialog: () => import('@/components/ViewImagesDialog'), ExtendMaterialFormItem },
  inject: ['sheetInitStatus'],
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
    showDecisions: {
      type: Boolean,
      default: false
    },
    initStatus: {
      type: Number,
      default: 0
    },
    // 页面参数
    fullRouteCode: {
      type: String,
      default: ''
    },
    // 页面参数下的类型
    pageFullPathCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      procedureList: [], // 工序名称列表
      workOrderOperatorOption: [], // 操作员选项列表
      resourceRelevanceOption: [], // 关联资源选项列表
      decisionEnums: [],
      showDialog: false,
      tableColumn: CHECK_STANDARDS_TABLE,
      tableColumnScheme: SchemeColumn,
      tableColumnSupplier: SupplierColumn,
      tableColumnCustomer: CustomerColumn,
      // 检验结果,复核,核准是否置灰
      checkResultDisabled: false,
      reviewResultDisabled: false,
      authorizeResultDisabled: false,
      aqlTypeList: [], // aql枚举列表
      sternWidthLevelList: [], // 严格度枚举列表
      levelTypeList: [], // 检验水平枚举列表
      timeEnums: [
        {
          label: '秒',
          value: 'seconds'
        },
        {
          label: '分钟',
          value: 'minutes'
        },
        {
          label: '小时',
          value: 'hours'
        },
        {
          label: '天',
          value: 'days'
        }
      ],
      showSchemeDialog: false,
      showSupplierDialog: false,
      showCustomerDialog: false,
      loadingUpload: false,
      visible: false,
      imageList: [],
      dialogTitle: '',
      extraParams: {},
      // 抽样类型枚举
      typeList: [],
      extendMaterialList: [],
      attachmentType: {
        image: require('../../../../../../assets/images/common/image.png'),
        pdf: require('../../../../../../assets/images/common/pdf.png'),
        doc: require('../../../../../../assets/images/common/doc.png'),
        xls: require('../../../../../../assets/images/common/xls.png'),
        ppt: require('../../../../../../assets/images/common/ppt.png')
      },
      // 扩展物料字段数组
      inspectMaterialList: [
        'inspectMaterialExtendFieldOne',
        'inspectMaterialExtendFieldTwo',
        'inspectMaterialExtendFieldThree',
        'inspectMaterialExtendFieldFour',
        'inspectMaterialExtendFieldFive',
        'inspectMaterialExtendFieldSix',
        'inspectMaterialExtendFieldSeven',
        'inspectMaterialExtendFieldEight',
        'inspectMaterialExtendFieldNine',
        'inspectMaterialExtendFieldTen'
      ],
      // 批次列表
      batchList: [],
      procedureLoading: false
    }
  },
  computed: {
    ...mapGetters(['fieldRuleDetail']),
    // 页面字段配置关键字
    fieldPath() {
      return {
        fullRouteCode: this.fullRouteCode,
        pageFullPathCode: this.pageFullPathCode
      }
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    },
    noSelectRow() {
      return this.clickIndex === -1
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    },
    showDecision() {
      return !this.isAddType && this.currentRow.showDecisions && this.showDecisions
    },
    // 是否显示关联批次
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
    // 是否带出工序名称列表
    showProcedureList() {
      // 成品入库检验
      // 生产退料检验
      // 制程检验
      const showBatchTypes = [
        'productInInspectBusiness',
        'productionReturnBusiness',
        'manufacturingInspectBusiness'
      ]
      return showBatchTypes.includes(this.baseForm.businessTypeCode)

      // 生产巡检、工序检验
      // 首件检验、过程检验、末检检验、生产退料检验、成品入库检验
      // const showBatchTypes = [
      //   'productionProcess',
      //   'processProceure',
      //   'firstItemInspect',
      //   'processInspect',
      //   'lastItemInspect',
      //   'productionReturn',
      //   'productInInspect'
      // ]
      // return showBatchTypes.includes(this.baseForm.type)
    },
    // 检验类型是否其他检验
    isOtherInspect() {
      return this.baseForm.type === 'otherInspect'
    }
  },
  watch: {
    // 根据物料类型判断展示物料显示字段
    currentRow: {
      handler(val, oldVal) {
        // 根据物料类型判断展示物料显示字段
        if (val.materialFields && val.materialFields.type) {
          this.getMaterialTypeKeyList(val.materialFields.type)
        }

        if (this.showProcedureList && val.relateDocumentId) {
          // 清空工序列表，避免旧数据残留
          this.procedureList = []
          this.getProcedureList(val.relateDocumentId)
        }
      }
      // deep: true,
      // immediate: true
    },
    fieldRuleDetail: {
      handler(newVal) {
      // 获取批次数组
        this.initBatchFields()
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    Promise.allSettled([aqlList(), getSternWidthLevelList(), levelList(), standardTypeList()]).then(res => {
      const [res1, res2, res3, res4] = res
      this.aqlTypeList = res1.value.data.data
      this.sternWidthLevelList = res2.value.data.data
      this.levelTypeList = res3.value.data.data
      this.typeList = res4.value.data.data
    })
  },
  mounted() {},
  methods: {
    getLabelAcceptAndRefuseName() {
      const acceptLabel = this.$FN(this.fieldPath, 'acceptValue', '允收数').replace(/:/g, '')
      const refuseLabel = this.$FN(this.fieldPath, 'refuseValue', '拒收数').replace(/:/g, '')
      return acceptLabel + '/' + refuseLabel + ':'
    },
    getLabelName(prop, name, noColon = 1) {
      let label = this.$FN(this.fieldPath, prop, name).replace(/:/g, '')
      // 是否要加上冒号
      label += noColon ? ':' : ''
      return label
    },
    // 获取批次数组
    initBatchFields() {
      this.batchList = this.fieldRuleDetail?.[this.fullRouteCode]?.[
        this.pageFullPathCode
      ]?.filter(item => item.moduleCode === 'batchField' && item.isShow)
      this.$emit('update:batchList', this.batchList)
    },
    // 获取物料信息展示哪些列
    async getMaterialTypeKeyList(id) {
      const {
        data: { code, data }
      } = await getMaterialTypeKeyList(id)
      if (+code === 200) {
        this.extendMaterialList = data.filter(item => item.isUsing)
      }
    },
    // 抽样方案下拉选择回调
    changeMaterialCode(val, options) {
      if (val) {
        const hasItem = options.find(el => el.name === val)
        this.handleConfirm(hasItem)
      } else {
        const hasNoItem = {
          samplePlanId: '',
          samplePlanName: '',
          inspectLevel: '',
          inspectLevelName: '',
          stringency: '',
          stringencyName: '',
          aqlValue: '',
          sampleType: ''
        }
        this.handleConfirm(hasNoItem)
      }
    },
    // 工序名称列表
    async getProcedureList(workOrderId) {
      const res = await selectProcedureList(workOrderId)
      const { data } = res.data
      // 关联资源 start
      let resourceRelevanceOption = []
      if (data.workCenterRelevanceType === 'team' && data.relevanceTeamIds) {
        resourceRelevanceOption = data?.relevanceTeamIds?.map((id, index) => ({
          code: id + '',
          name: data.relevanceTeamNames[index]
        }))
      } else if (data.workCenterRelevanceType === 'line' && data.relevanceLineIds) {
        resourceRelevanceOption = data?.relevanceLineIds?.map((id, index) => ({
          code: id + '',
          name: data.relevanceLineNames[index]
        }))
      } else if (data.workCenterRelevanceType === 'device' && data.relevanceDeviceIds) {
        resourceRelevanceOption = data?.relevanceDeviceIds?.map((id, index) => ({
          code: id + '',
          name: data.relevanceDeviceNames[index]
        }))
      }

      this.resourceRelevanceOption = resourceRelevanceOption
      // 关联资源 end

      // 确保当前仍是同一个物料
      if (workOrderId !== this.currentRow.relateDocumentId) return

      if (this.showProcedureList) {
        this.procedureList = data?.craftProcedureEntities
        // 只有一个时，默认赋值
        setTimeout(() => {
          if ((this.procedureList?.length === 1 && this.isAddType) || (this.procedureList?.length === 1 && this.isEditType && !this.currentRow.processProcedureId)) {
            this.$set(this.currentRow, 'processProcedureId', this.procedureList[0].procedureId)
            this.$set(this.currentRow, 'processProcedureCode', this.procedureList[0].procedureCode)
            this.$set(this.currentRow, 'processProcedureName', this.procedureList[0].procedureName)
            // 并且要自动带出检验方案
            this.getSchemeDialog()
          }
        }, 500)

        // 默认赋值工作中心，生产基本单元
        this.currentRow.workCenterId = data?.workCenterId
        this.currentRow.workCenterCode = data?.workCenterCode
        this.currentRow.workCenterName = data?.workCenterName
        this.currentRow.productionBasicUnitId = data?.productionBasicUnitId
        this.currentRow.productionBasicUnitCode = data?.productionBasicUnitCode
        this.currentRow.productionBasicUnitName = data?.productionBasicUnitName
      }
    },
    // 修改关联资源选项后
    changeResourceRelevance(val) {
      const resourceRelevanceName = this.resourceRelevanceOption
        .filter((item) => val.includes(item.code))
        .map((item) => item.name)
      this.currentRow.resourceRelevance.name = resourceRelevanceName
    },
    // 修改操作员选项后
    changeWorkOrderOperator(val) {
      const workOrderOperatorName = this.workOrderOperatorOption
        .filter((item) => val.includes(item.code))
        .map((item) => item.name)
      this.currentRow.workOrderOperator.name = workOrderOperatorName
    },
    // 获取操作员的接口
    async getWorkOrderOperator(val) {
      if (!val) {
        return
      }
      const params = {
        current: 1,
        size: 20,
        workOrder: val
      }
      const res = await getRecordHistory(params)
      const { data: { records }} = res.data
      const workOrderOperatorOption = records?.filter(item => item.type === 'report')

      // 需要对操作员去重处理
      const newArray = []
      const uniqueCodes = new Set() // 用于去重的 Set

      workOrderOperatorOption.forEach(item => {
        // 分割 operator 和 operatorName
        const operatorSplit = item.operator.split(',')
        const operatorNameSplit = item.operatorName.split(',')

        // 遍历分割后的数组
        operatorSplit.forEach((code, index) => {
          const name = operatorNameSplit[index]

          // 检查 code 是否已存在
          if (!uniqueCodes.has(code)) {
            newArray.push({ code: code, name: name })
            uniqueCodes.add(code) // 将 code 添加到 Set
          }
        })
      })
      this.workOrderOperatorOption = newArray
    },
    async getSchemeDialog() {
      const materialCode = this.currentRow['materialCode']
      const materialId = this.currentRow['materialId']
      const params = {
        type: this.baseForm.type,
        materialId,
        materialCode,
        processProcedureId: this.currentRow.processProcedureId
      }
      const res = await getSchemeByMaterial(params)
      const { data } = res.data
      if (data && data.length > 0) {
        this.handleSchemeConfirm(data[0])
      } else if (data.length === 0) {
        // 检验方案为空
        this.handleSchemeConfirm({})
      }
    },
    // 判断附件类型
    getAttachmentType(row) {
      const { fileUrl } = row
      // 图片
      if (/\.(jpg|jpeg|png)$/i.test(fileUrl)) {
        return this.attachmentType.image
      } else if (/\.(pdf)$/i.test(fileUrl)) {
        return this.attachmentType.pdf
      } else if (/\.(doc|docx)$/i.test(fileUrl)) {
        return this.attachmentType.doc
      } else if (/\.(xls|xlsx)$/i.test(fileUrl)) {
        return this.attachmentType.xls
      } else if (/\.(ppt|pptx|pps)$/i.test(fileUrl)) {
        return this.attachmentType.ppt
      }
    },
    enableView(row) {
      return /\.(jpg|jpeg|png|gif|bmp|svg|mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(row.fileUrl)
    },
    // 查看
    view(row) {
      const { fileUrl } = row
      // 如果是图片
      if (/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(fileUrl)) {
        this.imageList = [location.origin + '/' + fileUrl]
        this.visible = true
        // 视频 或者pdf
      } else if (/\.(mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(fileUrl)) {
        window.open(location.origin + '/' + fileUrl, '_blank')
      }
    },
    closeDailog() {
      this.visible = false
      this.imageList = []
    },
    // 下载文件
    download(row) {
      this.downloadFile(row.fileUrl, row.fileName)
    },
    downloadFile(fileUrl, fileName) {
      if (!fileUrl) return
      const suffix = fileUrl.replace(/.+\.(.+)/, (m, v1) => v1)
      const link = document.createElement('a') // 创建a标签
      link.style.display = 'none' // 使其隐藏
      link.href = '/' + fileUrl // 赋予文件下载地址
      link.setAttribute('download', `${fileName}.${suffix}`) // 设置下载属性 以及文件名
      document.body.appendChild(link) // a标签插至页面中
      link.click() // 强制触发a标签事件
      document.body.removeChild(link)
    },
    // 删除附件
    deleteAttach(row, index) {
      this.$confirm('删除附件? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 存在Id
        if (!isNaN(row.id)) {
          deleteInspectFile([row.id]).then(_ => {
            this.$message.success('删除成功')
            this.currentRow.inspectFiles.splice(index, 1)
          })
        } else {
          this.currentRow.inspectFiles.splice(index, 1)
        }
      })
    },
    // 检验方案弹窗
    clickShowSchemeDialog(row, $index) {
      // this.$emit('update:clickIndex', $index)
      const materialCode = row['materialCode']
      const materialId = row['materialId']
      if (!materialCode) {
        return this.$message.warning('请先选择物料')
      }
      this.dialogTitle = '检验方案'
      this.tableColumnScheme = SchemeColumn
      this.requestConfig = {
        url: '/qms/product/v1/schemes/get/scheme/by/condition',
        method: 'get'
      }
      this.extraParams = {
        type: this.baseForm.type,
        materialId,
        materialCode,
        processProcedureId: row.processProcedureId
      }
      this.showSchemeDialog = true
    },
    // 检验方案弹窗确认
    handleSchemeConfirm(row) {
      this.$set(this.currentRow, 'schemeId', row.schemeId)
      this.$set(this.currentRow, 'schemeCode', row.schemeCode)
      this.$set(this.currentRow, 'schemeName', row.schemeName)
      this.$set(this.currentRow, 'schemeGuideFiles', row.schemeFileEntities)
      // 检验方案带出抽样方案
      const samplePlanEntity = row.samplePlanEntity || {}
      this.$set(this.currentRow, 'samplePlanId', samplePlanEntity.id)
      this.$set(this.currentRow, 'samplePlanName', samplePlanEntity.name)
      this.$set(this.currentRow, 'inspectLevel', samplePlanEntity.inspectLevel)
      this.$set(this.currentRow, 'stringency', samplePlanEntity.stringency)
      this.$set(this.currentRow, 'aqlValue', samplePlanEntity.aqlValue)
      this.$set(this.currentRow, 'sampleType', samplePlanEntity.type)
      // 更新样次
      // this.$emit('updateProject')
      // 修改方案时重currentRow
      this.changeInspectQuantity(this.currentRow.inspectQuantity, this.currentRow, 'update')
      this.showSchemeDialog = false
    },
    // 修改送检数量,抽样数量重新计算
    async changeInspectQuantity(inspectQuantity, row, isUpdate) {
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
      if (isUpdate === 'update') {
        // 更新样次
        this.$emit('updateProject')
      }
    },
    // 抽样方案确认
    async handleConfirm(row) {
      this.currentRow.samplePlanId = row.id
      this.currentRow.samplePlanName = row.name
      this.currentRow.inspectLevel = row.inspectLevel
      this.currentRow.stringency = row.stringency
      this.currentRow.aqlValue = row.aqlValue
      this.currentRow.sampleType = row.type
      this.showDialog = false
      // 存在抽样方案 根据抽样方案和送检数量算出抽样数量
      if (this.currentRow.inspectQuantity) {
        const params = {
          num: this.currentRow.inspectQuantity,
          sampleId: row.id
        }
        const result = await getSampleNumByScheme(params)
        this.currentRow.samplingQuantity = result.data?.data?.sampleNum || 0
      }
      // 根据抽样方案和送检数量查出允收数/拒收数
      // if (this.currentRow.inspectQuantity) {
      const params = {
        num: this.currentRow.inspectQuantity,
        samplePlanId: this.currentRow.samplePlanId
      }
      if (params.num && params.samplePlanId) {
        const result = await getAcceptValueByScheme(params)
        if (result.data.status === 1) {
          const data = result.data.data
          this.$set(this.currentRow, 'acceptValue', data.acceptValue)
          this.$set(this.currentRow, 'refuseValue', data.refuseValue)
        }
      }
      this.$emit('updateSample')

      // }
    },
    // 供应商确认
    async handleSupplierConfirm(row) {
      this.currentRow.supplierCode = row.code
      this.currentRow.supplierName = row.name
      this.showSupplierDialog = false
    },
    // 客户确认
    async handleCustomerConfirm(row) {
      this.currentRow.customerCode = row.customerCode
      this.currentRow.customerName = row.customerName
      this.showCustomerDialog = false
    },
    // 切换行
    changeRow(flag) {
      this.$emit('changeRow', flag)
    },
    // 修改决策
    changeDecision(val, row) {
      const decisionItem = this.decisionEnums.find(item => item.decisionCode === val)
      row.statusName = decisionItem.qualifiedName
      row.status = decisionItem.qualifiedCode
    },
    // 增加决策
    addDecision() {
      if (this.isDetailType) return
      this.currentRow.materialDecisions.push({})
    },
    // 删除决策
    deleteDecision(row, $index) {
      // 存在Id
      if (!isNaN(row.id)) {
        this.$confirm('删除决策? ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDecision([row.id]).then(_ => {
            this.$message.success('删除成功')
            this.currentRow.materialDecisions.splice($index, 1)
          })
        })
      } else {
        this.currentRow.materialDecisions.splice($index, 1)
      }
    },
    handleBeforeUpload(file) {
      const maxSize = 50 * 1024 * 1024 // 50MB 设置最大文件大小
      if (file.size > maxSize) {
        this.$message.warning(`文件大小超过了${maxSize / (1024 * 1024)}MB的限制`)
        return false
      }
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
    async handleProcedureFocus() {
      if (!this.procedureList.length && this.currentRow.relateDocumentId) {
        this.procedureLoading = true
        try {
          await this.getProcedureList(this.currentRow.relateDocumentId)
        } finally {
          this.procedureLoading = false
        }
      }
    },
    // 修改工序名称后，需要重新调用检验方案接口
    changeProcessProcedureId(procedureId) {
      if (procedureId) {
        const procedureItem = this.procedureList.find(procedure => procedure.procedureId === procedureId)
        if (procedureItem) {
          // this.$set(this.currentRow, 'processProcedureId', procedureItem.procedureId)
          this.$set(this.currentRow, 'processProcedureCode', procedureItem.procedureCode)
          this.$set(this.currentRow, 'processProcedureName', procedureItem.procedureName)
        }
      } else {
        this.$set(this.currentRow, 'processProcedureId', '')
        this.$set(this.currentRow, 'processProcedureCode', '')
        this.$set(this.currentRow, 'processProcedureName', '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 添加滚动条
.scroll {
  overflow: auto;
}
.scroll::-webkit-scrollbar {
  height: 8px; /* 设置滚动条的高度 */
  width: 8px; /* 设置滚动条的宽度 */
}
.projectIndicator {
  .centerArea {
    // box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    // border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 18px 9px 18px;
    // margin-bottom: 10px;
    .title {
      display: flex;
      justify-content: space-between;
    }
    .title-start {
      display: flex;
      align-items: center;
    }
    .centerArea-title {
      position: relative;
      line-height: 24px;
    }
    .centerArea-title::before {
      content: '';
      display: inline;
      position: absolute;
      height: 20px;
      width: 4px;
      left: -8px;
      top: 4px;
      width: 4px;
      height: 16px;
      background: #1890ff;
      border-radius: 2px 2px 2px 2px;
    }
    .centerArea-title2 {
      position: relative;
    }
    .centerArea-title2::before {
      content: '';
      display: inline;
      position: absolute;
      height: 20px;
      width: 4px;
      left: -8px;
      top: 4px;
      width: 4px;
      height: 16px;
      background: #1890ff;
      border-radius: 2px 2px 2px 2px;
    }
  }
  .check {
    .el-form-item {
      margin-left: 90px;
    }
    ::v-deep .el-form-item__label {
      display: block;
      width: auto !important;
      text-align: left;
    }
  }
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
// 附件
.attachments-all {
  display: flex;
  flex-wrap: wrap; /* 允许项目换行 */
  align-items: flex-start; /* 项目在交叉轴上的起点对齐 */
  margin-top: 8px;
  .attachments {
    width: 390px;
    height: 32px;
    background: #f5f7fa;
    border-radius: 2px 2px 2px 2px;
    padding: 6px 10px 6px 8px;
    display: flex;
    align-items: center;
    margin-right: 80px;
    margin-bottom: 10px;
    .attachments-type {
      width: 16px;
      height: 18px;
      margin-right: 8px;
    }
    .attachments-text {
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      font-size: 14px;
      color: #333333;
      flex: 1;
    }
    .attachments-icon-gutter {
      margin-right: 12px;
    }
  }
}
::v-deep .el-form-item--medium .el-form-item__content {
  width: 248px;
}
::v-deep .el-autocomplete {
  width: 248px;
}
::v-deep .no-border-radius .el-input__inner {
  border-radius: 0px !important;
}
::v-deep .el-divider--horizontal {
  margin: 0 0 12px 0;
}
</style>
