<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-16 16:54:06
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-05-09 10:44:35
 * @Description:
-->
<template>
  <div class="commonPage">
    <!-- 内层 -->
    <section class="quality-edit-inner">
      <!-- 头部 -->
      <header class="edit-header">
        <el-button size="mini" type="primary" @click="back">返回</el-button>
        <el-button v-if="!isDetailType" size="mini" type="primary" @click="handleSaveBtn">保存</el-button>
        <el-button
          v-if="isAddType && !isExistApproveBtn"
          v-permission="{ action: 'qms-product-inspection.inspection-manage.scheme:saveAndEffect' }"
          type="primary"
          size="mini"
          @click="savaAndEffectivePreview"
        >
          保存并启用
        </el-button>
      </header>
      <div class="scroll">
        <el-form
          ref="projectForm"
          :inline="true"
          :model="formInline"
          :rules="rules"
          class="demo-form-inline"
          label-position="right"
          label-width="150px"
        >
          <!-- 基本信息 -->
          <section class="base-info">
            <div class="base-info-title">
              <p>基本信息</p>
            </div>
            <!--
            <el-form-item :label="getLabelName('schemeCode', '检验方案编码')" prop="schemeCode">
              <el-input v-model="formInline.schemeCode" size="mini" placeholder="编码保存后自动生成">
                <template v-if="isAddType" slot="suffix">
                  <i class="el-icon-s-operation" style="cursor: pointer" @click.stop="handleResetCode" />
                </template>
              </el-input>
            </el-form-item>
            -->
            <el-form-item
              :label="getLabelName('schemeCode', '检验方案编码')"
              prop="schemeCode"
              :rules="[
                {
                  required: codeRequired,
                  message: '请输入',
                  trigger: 'blur'
                }
              ]"
            >
              <CustomCodeRule
                v-if="isAddType || isCopyType"
                ref="commonCodeRuleInput"
                v-model="formInline.schemeCode"
                style="width: 200px"
                :placeholder="receiptCodePlaceholder"
                size="small"
                :disabled="false"
                title="单据编号"
                :type-code="typeCode"
                :rule-id="formInline.numberRuleId"
                :is-show-dialog-init="false"
                :rules-type-extra-request-param="rulesTypeExtraRequestParam"
                @confirm="handleConfirmCodeRuleDialog"
                @defaultCodeRule="defaultCodeRule"
                @change="changeMethod"
              />
              <el-input
                v-else
                v-model="formInline.schemeCode"
                placeholder="请输入内容"
                :disabled="true"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item
              :label="getLabelName('schemeName', '检验方案名称')"
              prop="schemeName"
              :rules="$FR(fieldPath, 'schemeName')"
            >
              <el-input
                v-model="formInline.schemeName"
                size="mini"
                :disabled="
                  $FC('schemeName', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
            </el-form-item>
            <el-form-item :label="getLabelName('remark', '备注')" prop="remark" :rules="$FR(fieldPath, 'remark')">
              <el-input
                v-model="formInline.remark"
                size="mini"
                :disabled="
                  $FC('remark', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
            </el-form-item>
            <el-form-item
              v-if="!isAddType"
              :label="getLabelName('status', '状态')"
              prop="status"
              :rules="$FR(fieldPath, 'status')"
            >
              <el-select
                v-model="formInline.status"
                placeholder="请选择"
                size="mini"
                :disabled="$FC('status', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="$FC('extend_field_one', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true"
              :label="getLabelName('extend_field_one', '拓展字段1')"
              prop="extendFieldOne"
              :rules="$FR(fieldPath, 'extend_field_one')"
            >
              <el-input
                v-if="inspectExtendFieldOneList.inputType === 'input'"
                v-model="formInline.extendFieldOne"
                size="mini"
                :disabled="
                  $FC('extend_field_one', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldOneList.inputType === 'select'"
                v-model="formInline.extendFieldOne"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_one', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              >
                <el-option
                  v-for="i in inspectExtendFieldOneList.options"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                  :disabled="i.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="$FC('extend_field_two', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true"
              :label="getLabelName('extend_field_two', '拓展字段2')"
              prop="extendFieldTwo"
              :rules="$FR(fieldPath, 'extend_field_two')"
            >
              <el-input
                v-if="inspectExtendFieldTwoList.inputType === 'input'"
                v-model="formInline.extendFieldTwo"
                size="mini"
                :disabled="
                  $FC('extend_field_two', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldTwoList.inputType === 'select'"
                v-model="formInline.extendFieldTwo"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="
                  $FC('extend_field_two', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              >
                <el-option
                  v-for="i in inspectExtendFieldTwoList.options"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                  :disabled="i.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="$FC('extend_field_three', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true"
              :label="getLabelName('extend_field_three', '拓展字段3')"
              prop="extendFieldThree"
              :rules="$FR(fieldPath, 'extend_field_three')"
            >
              <el-input
                v-if="inspectExtendFieldThreeList.inputType === 'input'"
                v-model="formInline.extendFieldThree"
                size="mini"
                :disabled="
                  $FC('extend_field_three', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldThreeList.inputType === 'select'"
                v-model="formInline.extendFieldThree"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="
                  $FC('extend_field_three', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              >
                <el-option
                  v-for="i in inspectExtendFieldThreeList.options"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                  :disabled="i.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="$FC('extend_field_four', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true"
              :label="getLabelName('extend_field_four', '拓展字段4')"
              prop="extendFieldFour"
              :rules="$FR(fieldPath, 'extend_field_four')"
            >
              <el-input
                v-if="inspectExtendFieldFourList.inputType === 'input'"
                v-model="formInline.extendFieldFour"
                size="mini"
                :disabled="
                  $FC('extend_field_four', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldFourList.inputType === 'select'"
                v-model="formInline.extendFieldFour"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="
                  $FC('extend_field_four', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              >
                <el-option
                  v-for="i in inspectExtendFieldFourList.options"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                  :disabled="i.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="$FC('extend_field_five', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true"
              :label="getLabelName('extend_field_five', '拓展字段5')"
              prop="extendFieldFive"
              :rules="$FR(fieldPath, 'extend_field_five')"
            >
              <el-input
                v-if="inspectExtendFieldFiveList.inputType === 'input'"
                v-model="formInline.extendFieldFive"
                size="mini"
                :disabled="
                  $FC('extend_field_five', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldFiveList.inputType === 'select'"
                v-model="formInline.extendFieldFive"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_five', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              >
                <el-option
                  v-for="i in inspectExtendFieldFiveList.options"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                  :disabled="i.disabled"
                />
              </el-select>
            </el-form-item>
          </section>

          <CommonRadioGroup :tab-value.sync="tabValue" :radio-list="radioList" />
          <el-tabs v-model="tabValue">
            <!-- 方案配置 -->
            <el-tab-pane :label="radioList[0].label" :name="radioList[0].value">
              <!-- :init-status="initStatus" -->
              <ProgramConfig
                ref="ProgramConfig"
                :init-page-code="initPageCode"
                :form-inline="formInline"
              />
            </el-tab-pane>
            <!-- 检验项目 -->
            <el-tab-pane :label="radioList[1].label" :name="radioList[1].value">
              <InspectionItems ref="InspectionItems" :form-inline="formInline" />
            </el-tab-pane>
            <!-- 关联物料 -->
            <el-tab-pane :label="radioList[2].label" :name="radioList[2].value">
              <RelateMaterial
                ref="relateMaterial"
                :form-inline="formInline"
                :general-material.sync="generalMaterial"
              />
            </el-tab-pane>
            <!-- 检验附件 -->
            <el-tab-pane :label="radioList[3].label" :name="radioList[3].value">
              <Attachment
                ref="attachment"
                :form-inline="formInline"
                :disabled-upload-btn="isDetailType"
                :supplies-file-query="suppliesFileQuery"
              />
            </el-tab-pane>
            <!-- 缺陷定义 -->
            <el-tab-pane :label="radioList[4].label" :name="radioList[4].value">
              <BadItems
                ref="badItems"
                :form-inline="formInline"
                :selected-list="selectedBadItemsList"
                :type="isDetailType ? 'detail' : ''"
              />
            </el-tab-pane>
            <!-- 关联客户 -->
            <el-tab-pane :label="radioList[5].label" :name="radioList[5].value">
              <AssociatedCustomer
                ref="AssociatedCustomer"
                :form-inline="formInline"
                :type="isDetailType ? 'detail' : ''"
                @updateData="updateCustomerData"
              />
            </el-tab-pane>
            <!-- 关联工序 -->
            <el-tab-pane :label="radioList[6].label" :name="radioList[6].value">
              <AssociatedProcess
                ref="AssociatedProcess"
                :form-inline="formInline"
                :type="isDetailType ? 'detail' : ''"
              />
            </el-tab-pane>
            <!-- 操作记录 -->
            <el-tab-pane v-if="!isAddType" :label="radioList[7].label" :name="radioList[7].value">
              <OperationRecord :record-info="formInline" />
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </section>
    <!-- 编码规则 -->
    <!--
    <common-code-rule-dialog
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="94"
      is-open-reg-disabled-space
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    />
    -->
  </div>
</template>

<script>
import { getMaterialsDetail } from '@/api/common.js'
import { isExistApprove } from '@/api/examineApprove.js'
import { mapGetters } from 'vuex'
import { apiTransformTrigger } from '@/api/base' // 触发配置的api
import CustomCodeRule from '@/components/CodeRuleDialog/index'

const FULLROUTECODE = '/inspection-manage/qms-product-inspection/scheme' // 当前模块配置关键字

const PAGEFULLPATHCODE = new Map([
  // 都通过详情接口获取
  // ['Add', 'qmsScheme.qmsSchemeAdd'],
  ['Add', 'qmsScheme.qmsSchemeEdit.qmsSchemeEditByCreate'],
  ['0', 'qmsScheme.qmsSchemeEdit.qmsSchemeEditByCreate'],
  ['1', 'qmsScheme.qmsSchemeEdit.qmsSchemeEditByRelease'],
  ['2', 'qmsScheme.qmsSchemeEdit.qmsSchemeEditByDisabled'],
  ['3', 'qmsScheme.qmsSchemeEdit.qmsSchemeEditByDisuse'],
  ['Detail', 'qmsScheme.qmsSchemeDetail']
]) // 当前页配置关键字 (状态不同则不同)

import {
  standardStateList,
  deleteSchemeAttemFile,
  getSchemeAttemFile,
  detectionSchemeSaveExpir,
  detectionSchemeUpdate,
  addDetectionSchemeList,
  getDetailProgramConfig,
  getDetailInspectionItems,
  getDetailRelatedMaterials,
  getDetailRelatedMaterialsType,
  getDetailUndesirableItems,
  getDetailRelatedCustomers,
  getDetailRelatedProcedure,
  uploadFile,
  levelList
} from '@/api/quality-manage.js'
import CommonRadioGroup from '@/components/CommonRadioGroup/index.vue'
import OperationRecord from '@/components/OperationRecord/index.vue'
import ProgramConfig from './tabPages/programConfig.vue' // 方案配置
import InspectionItems from './tabPages/inspectionItems.vue'
import RelateMaterial from './tabPages/relateMaterial.vue'
import Attachment from './tabPages/attachment.vue'
import BadItems from './tabPages/badItems.vue'
import AssociatedCustomer from './tabPages/associatedCustomer.vue'
import AssociatedProcess from './tabPages/AssociatedProcess.vue'

export default {
  components: {
    CommonRadioGroup,
    OperationRecord,
    ProgramConfig,
    InspectionItems,
    RelateMaterial,
    Attachment,
    BadItems,
    AssociatedCustomer,
    AssociatedProcess,
    CustomCodeRule
  },
  data() {
    return {
      initStatus: 0,
      isAutoOpen: false,
      statusList: [], // 状态列表
      tabValue: 'programConfig',
      formInline: {
        schemeName: '',
        schemeCode: '',
        remark: '',
        standardType: '',
        inspectionLevel: '',
        lenientLevel: '',
        aqlValue: '',
        extendFieldOne: '',
        extendFieldTwo: '',
        extendFieldThree: '',
        extendFieldFour: '',
        extendFieldFive: ''
      },
      rules: {
        schemeCode: [{ required: true, message: '该参数是必填项', trigger: ['blur', 'change'] }],
        schemeName: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }],
        standardType: [{ required: true, message: '该参数是必填项', trigger: ['change'] }]
      },
      suppliesFileQuery: {
        handleUploadFn: this.handleUpload,
        handleUploadResFn: this.handleUploadRes,
        handleDelFileFn: this.handleDelFileFn,
        appendixEntities: []
      },
      selectedBadItemsList: [],
      interfaceRecord: {},
      isExistApproveBtn: false, // 是否开启审批
      generalMaterial: false, // 通用方案
      FULLROUTECODE,
      PAGEFULLPATHCODE,
      initPageCode: undefined,
      // 扩展字段选项列表
      inspectExtendFieldOneList: {
        inputType: '',
        options: []
      },
      inspectExtendFieldTwoList: {
        inputType: '',
        options: []
      },
      inspectExtendFieldThreeList: {
        inputType: '',
        options: []
      },
      inspectExtendFieldFourList: {
        inputType: '',
        options: []
      },
      inspectExtendFieldFiveList: {
        inputType: '',
        options: []
      },
      numItems: [],
      levelTypeList: [], // 检验水平枚举列表
      // 单据编码 start
      receiptCodePlaceholder: '请输入',
      typeCode: 94,
      codeRequired: true,
      rulesTypeExtraRequestParam: {}
      // 单据编码 end
    }
  },
  computed: {
    ...mapGetters(['fieldRuleDetail']),
    // 页面字段配置关键字
    fieldPath() {
      return {
        fullRouteCode: FULLROUTECODE,
        pageFullPathCode: PAGEFULLPATHCODE.get(this.initPageCode)
        // pageFullPathCode: PAGEFULLPATHCODE
      }
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    },
    isDetailType() {
      return this.$route.name.includes('Detail')
    },
    // 复制跳进来的
    isCopyType() {
      return this.isAddType && this.$route.query.id
    },
    // 检验单跳转生成检验方案
    isGenerateSchemeType() {
      return this.isAddType && this.$route.query.inspectionTypes && this.$route.query.materialCode
    },
    radioList() {
      const list = [
        { label: '方案配置', value: 'programConfig' },
        { label: '检验项目', value: 'inspectionItems' },
        { label: '关联物料', value: 'relatedMaterials' },
        { label: '检验附件', value: 'inspectionAccessories' },
        { label: '缺陷定义', value: 'undesirableItems' },
        { label: '关联客户', value: 'relatedCustomers' },
        { label: '关联工序', value: 'relatedProcess' },
        { label: '操作记录', value: 'operationRecord' }
      ]
      if (this.isAddType) return list.filter(item => item.value !== 'operationRecord')
      return list
    }
  },
  watch: {
    fieldRuleDetail: {
      handler(newVal) {
        // 动态字段配置有值则更新字段
        if (this.initPageCode) {
          this.initInspectExtendField()
        }
      },
      deep: true,
      immediate: true
    }
    // tabValue: {
    //   async handler(val) {
    //     const { id } = this.$route.query
    //     if (this.interfaceRecord[val] || (this.isAddType && !id)) return
    //     this.interfaceRecord[val] = true
    //     switch (val) {
    //       case 'programConfig':
    //         // 方案配置
    //         this.getProgramConfig(id)
    //         break
    //       case 'inspectionItems':
    //         // 检验项目
    //         this.getInspectionItems(id)
    //         break
    //       case 'relatedMaterials':
    //         // 关联物料
    //         this.getRelatedMaterials(id)
    //         break
    //       case 'inspectionAccessories':
    //         // 检验附件
    //         this.getInspectionAccessories(id)
    //         break
    //       case 'undesirableItems':
    //         // 不良缺陷
    //         this.getUndesirableItems(id)
    //         break
    //       case 'relatedCustomers':
    //         // 关联客户
    //         this.getRelatedCustomers(id)
    //         break
    //       default:
    //         break
    //     }
    //   },
    //   immediate: true
    // }
  },
  async created() {
    Promise.allSettled([levelList()]).then(res => {
      const [res1] = res
      this.levelTypeList = res1.value.data.data
    })

    this.isAllowApprove()
    this.getStatusList()

    // 扩展字段状态判断
    if (this.isAddType || this.isCopyType) {
      this.initPageCode = 'Add'
    }

    if (this.isEditType) {
      // 编辑时获取状态
      const { status } = this.$route.query
      this.initPageCode = status + ''
    }

    if (this.isDetailType) {
      this.initPageCode = 'Detail'
    }

    if (this.isGenerateSchemeType) {
      const { inspectionTypes, materialCode } = this.$route.query
      const numItems = JSON.parse(localStorage.getItem('numItems')) || []

      // 赋值
      this.getGenerateScheme(inspectionTypes, materialCode, numItems)
    }
  },
  mounted() {
    if (this.isAddType || this.isCopyType) {
      setTimeout(() => {
        this.$refs?.commonCodeRuleInput?.init(this.typeCode)
      }, 500)
    }
    // 禁止修改
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 500)
    }
    // 创建的时候查看是否开启审批
    // if (this.isAddType) {
    //   this.isAutoOpen = true
    //   // this.$refs['codeRuleDialog'].open()
    // }

    // 复制时获取数据
    if (this.isCopyType) {
      const { id } = this.$route.query
      this.getProgramConfig(id)
      this.getInspectionItems(id)
      this.getRelatedMaterials(id)
      this.getUndesirableItems(id)
      this.getInspectionAccessories(id)
      this.getRelatedCustomers(id)
      this.getRelatedProcedure(id)
    }

    // 编辑或详情获取数据
    if (this.isEditType || this.isDetailType) {
      const { id } = this.$route.query
      this.getProgramConfig(id)
      this.getInspectionItems(id)
      this.getRelatedMaterials(id)
      this.getUndesirableItems(id)
      this.getInspectionAccessories(id)
      this.getRelatedCustomers(id)
      this.getRelatedProcedure(id)
    }

    this.initInspectExtendField()
  },
  methods: {
    // 默认的编码规则
    defaultCodeRule(defaultCodeRule) {
      this.formInline.numberRuleId = defaultCodeRule?.id || null
      this.formInline.ruleFormItems = defaultCodeRule?.prefixDetailList || []
    },
    // 编码规则确认  初始化有此回调说明没有人工输入哦
    handleConfirmCodeRuleDialog(val, id, ruleFormItems) {
      this.formInline.schemeCode = ''
      // 设置输入框提示文字
      if (
        ruleFormItems &&
        ruleFormItems.length == 1 &&
        ruleFormItems.find(item => item.type === 1)
      ) {
        console.log('只有人工输入')
        this.receiptCodePlaceholder = '请输入'
        this.codeRequired = true // 必填
      }
      if (ruleFormItems && !ruleFormItems.find(item => item.type === 1)) {
        console.log('没有人工输入')
        this.receiptCodePlaceholder = '保存后自动生成'
        this.codeRequired = false // 非必填
      }
      if (
        ruleFormItems &&
        ruleFormItems.length != 1 &&
        ruleFormItems.find(item => item.type === 1)
      ) {
        console.log('包含人工输入')
        this.receiptCodePlaceholder = '保存后自动生成+请输入'
        this.codeRequired = true // 必填
      }
      this.formInline.numberRuleId = id
      this.formInline.ruleFormItems = ruleFormItems
    },
    // 构造收料单号
    createReceiptNumber() {
      let str = ''
      const hasManualInput = this.formInline.ruleFormItems.find(
        item => item.type == 1
      )
      // 有人工输入的情况下，要拼接编码规则
      if (hasManualInput) {
        this.formInline.ruleFormItems.forEach(item => {
          if (item.type === 1) {
            str += this.formInline.schemeCode
          } else {
            str += item.value
          }
        })
      }
      // 没有人工输入，自行输入了单号 则覆盖编码规则
      if (!hasManualInput && this.formInline.schemeCode) {
        str = this.formInline.schemeCode
      }
      // 没有人工输入，没有输入了单号 编码规则
      if (!hasManualInput && !this.formInline.schemeCode) {
        this.formInline.ruleFormItems.forEach(item => {
          str += item.value
        })
      }
      console.log('构造收料单号', this.formInline.ruleFormItems)
      return str
    },
    changeMethod() {},
    // 检验单跳转生成检验方案，给对应tab中赋值
    async getGenerateScheme(inspectionTypes, materialCode, numItems) {
      // 赋值适用检验类型
      setTimeout(() => {
        this.$refs['ProgramConfig'].change([inspectionTypes])
      }, 1000)

      // 赋值关联物料信息
      const { data: { code, data }} = await getMaterialsDetail(materialCode)
      if (code === '200') {
        setTimeout(() => {
          this.$refs['relateMaterial'].materaltableData.push(data)
        }, 1000)
      }

      // 赋值检验项目
      const currentDataList = numItems.map((item, index) => {
        let itemOptionList = []
        if (item && item.itemOptionList) {
          itemOptionList = item.itemOptionList.map((itemOptionListItem) => {
            return {
              defaultOptionFlag: itemOptionListItem?.defaultOptionFlag,
              enableFlag: itemOptionListItem?.enableFlag,
              // itemId: item.itemOptionList.itemId,
              judgeFlag: itemOptionListItem?.judgeFlag,
              optionName: itemOptionListItem?.optionName
            }
          })
        }
        // 获取检验水平
        const levelType = this.levelTypeList?.find(option => option.code === item.inspectLevel)?.name

        return {
          analyzeMethodCode: item.analyzeMethod,
          analyzeMethodCodeName: item.analyzeMethodName,
          analyzeMethodName: item.analyzeMethodName,
          aqlValue: item.aqlValue,
          comparatorCode: item.comparator,
          // 比较符的名称
          // comparatorCodeName: item.analyzeMethod,
          defaultQualified: item.defaultQualified || false, // 默认不合格
          defaultValue: item.defaultValue,
          defectLevel: item.defectLevel,
          defectLevelCode: item.defectLevel,
          defectLevelCodeName: item.defectLevelName,
          downLimitValue: item.downLimitValue,
          // 是否生产检验报告
          export: item.export || false,
          // groupCode: item.analyzeMethod,
          // groupId: item.analyzeMethod,
          groupName: item.itemGroupName,
          importantInspection: !!item.importantInspection,
          inputMode: item.inputMode,
          inspectLevel: item.inspectLevel,
          // 检验水平
          inspectLevelName: levelType,
          inspectionCondition: item.inspectionCondition,
          itemId: item.itemId,
          itemInspectionCondition: item.inspectionCondition,
          itemLowerTolerance: item.lowerTolerance,
          itemOptionList: itemOptionList,
          itemUpperTolerance: item.upperTolerance,
          lowerTolerance: item.lowerTolerance,
          name: item.itemName,
          optionalValue: item.optionalValue,
          recordInspectionValue: !!item.recordInspectionValue,
          referenceValue: item.referenceValue,
          remark: item.remark,
          required: !!item.required,
          // 抽样方案，没有添加内容
          // samplePlanEntity: Object
          samplePlanId: item.samplePlanId,
          samplePlanName: item.samplePlanName,
          samplePlanEntity: { name: item.samplePlanName },
          stringency: item.stringency,
          stringencyName: item.stringencyName,
          unit: item.unit,
          upperLimitValue: item.upperLimitValue,
          upperTolerance: item.upperTolerance,
          verificationBasis: item.verificationBasis,
          verificationInstrument: item.verificationInstrument,
          verificationMethod: item.verificationMethod,
          isOriginal: true // 已经选择的数据
        }
      })

      setTimeout(() => {
        this.$refs['InspectionItems'].currentDataList.push(...currentDataList)
        // 项目指标默认选中第一行
        this.$refs['InspectionItems'].currentRow = currentDataList[0]
      }, 1000)
    },
    // 获取扩展字段的类型和选项
    initInspectExtendField() {
      // 获取扩展字段的类型和选项
      this.getOptions('extend_field_one', 'inspectExtendFieldOneList')

      this.getOptions('extend_field_two', 'inspectExtendFieldTwoList')

      this.getOptions('extend_field_three', 'inspectExtendFieldThreeList')

      this.getOptions('extend_field_four', 'inspectExtendFieldFourList')

      this.getOptions('extend_field_five', 'inspectExtendFieldFiveList')
    },
    async getOptions(prop, list) {
      // 当前字段的配置
      const currentConfig = this.$FC(prop, FULLROUTECODE, PAGEFULLPATHCODE.get(this.initPageCode))
      // 输入类型
      const inputType = currentConfig?.inputType || 'input'
      // 数据选项
      let options

      // start
      // 选项数据
      // 接口响应参数取值定义，可选值唯一辨识,名称，如：code,name
      const respParamFieldValue =
        (currentConfig?.respParamField && currentConfig.respParamField.split(',')[0]) || 'value'
      const respParamFieldLabel =
        (currentConfig?.respParamField && currentConfig.respParamField.split(',')[1]) || 'label'

      if (currentConfig?.optionValuesType === 'api' || currentConfig?.optionValuesType === 'pageapi') {
        const {
          data: { code, data }
        } = await apiTransformTrigger({
          id: currentConfig?.relatedApiEntity?.id
        })

        if (code === '200') {
          options = data.map(item => ({
            ...item,
            label: item[respParamFieldLabel],
            value: '' + item[respParamFieldValue]
          }))
        }
      } else if (currentConfig?.optionValuesType === 'table') {
        const val =
          (JSON.parse(currentConfig.optionValues || '[]') &&
            JSON.parse(currentConfig.optionValues || '[]')?.length &&
            JSON.parse(currentConfig.allOption || '[]').filter(i =>
              JSON.parse(currentConfig.optionValues || '[]').includes(i[respParamFieldValue])
            )) ||
          JSON.parse(currentConfig.allOption || '[]')
        options = val.map(j => ({
          ...j,
          label: j[respParamFieldLabel],
          value: '' + j[respParamFieldValue]
        }))
      }
      // 公式形式
      // else if (currentConfig?.optionValuesType === 'formula') {
      //   // formula 公式形式
      //   // item.formula = currentConfig.formula

      //   const extractVariables = str => {
      //     const reg = /\${([^}]+)}/g
      //     // 正则表达式匹配 ${} 中的内容
      //     let matches
      //     const dependenciesStr = []

      //     // 使用正则表达式的 exec 方法来捕获所有匹配项
      //     while ((matches = reg.exec(str)) !== null) {
      //       dependenciesStr.push(matches[1])
      //     }

      //     return dependenciesStr
      //   }
      //   // 观察者（该值依赖其他字段的值动态变化）
      //   // item.dependenciesStr = extractVariables(item.formula || '')
      // }
      // end
      this.$set(this[list], 'inputType', inputType)
      this.$set(this[list], 'options', options || [])
    },
    getLabelName(prop, name, noColon = 1) {
      let label = this.$FN(this.fieldPath, prop, name).replace(/:/g, '')
      // 是否要加上冒号
      label += noColon ? ':' : ''
      return label
    },
    // 获取方案配置
    getProgramConfig(id) {
      getDetailProgramConfig(id).then(result => {
        this.formInline = result && result.data && result.data.data ? result.data.data : {}
        this.generalMaterial = !!this.formInline.generalMaterial
        this.formInline.timeliness = this.formInline.timeliness ? 1 : 0
        if (this.isCopyType) {
          this.initStatus = 0
          this.formInline.schemeCode = ''
        } else {
          this.initStatus = this.formInline.status
        }
        this.$refs['ProgramConfig'].handleEcho(this.formInline)
        // 根据当前状态来判断其他状态是否可以选择
        setTimeout(() => {
          this.statusDIsable()
        }, 500)
      })
    },
    // 获取检验项目
    getInspectionItems(id) {
      getDetailInspectionItems(id).then(result => {
        let data = result && result.data && result.data.data ? result.data.data : []
        data = data.sort((a, b) => a.inspectItemSort - b.inspectItemSort) // 排序
        this.$refs['InspectionItems'].handleEcho(data)
      })
    },
    // 关联物料
    getRelatedMaterials(id) {
      // 是否通用方案
      // if (this.$refs['relateMaterial']) {
      //   this.$refs['relateMaterial'].generalMaterial = !!this.formInline.generalMaterial
      // }
      // 物料
      getDetailRelatedMaterials(id).then(result => {
        const data = result && result.data && result.data.data ? result.data.data : []
        this.$refs['relateMaterial'].handleEchoMaterials(data)
      })
      // 物料类型
      getDetailRelatedMaterialsType(id).then(result => {
        const data = result && result.data && result.data.data ? result.data.data : []
        this.$refs['relateMaterial'].handleEchoMaterialsType(data)
      })
    },
    // 检验附件
    getInspectionAccessories(id) {
      getSchemeAttemFile(id).then(result => {
        const data = result && result.data && result.data.data ? result.data.data : []
        this.$refs['attachment'].handleEcho(data)
      })
    },
    // 缺陷定义
    getUndesirableItems(id) {
      getDetailUndesirableItems(id).then(result => {
        const data = result && result.data && result.data.data ? result.data.data : []
        this.$refs['badItems'].handleEcho(data)
        /* this.selectedBadItemsList = data */
      })
    },
    // 关联客户
    getRelatedCustomers(id) {
      getDetailRelatedCustomers(id).then(result => {
        const data = result && result.data && result.data.data ? result.data.data : []
        this.$refs['AssociatedCustomer'].handleEcho(data)
      })
    },
    // 关联工序
    getRelatedProcedure(id) {
      getDetailRelatedProcedure(id).then(result => {
        const data = result && result.data && result.data.data ? result.data.data : []
        this.$refs['AssociatedProcess'].handleEcho(data)
      })
    },
    // 切换编码规则
    async handleResetCode() {
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    // handleConfirmCodeRuleDialog(code) {
    //   this.formInline.schemeCode = code
    // },
    // 获取状态列表
    getStatusList() {
      standardStateList().then(res => {
        this.statusList = res.data.data.map(item => {
          return {
            ...item,
            disabled: true
          }
        })
      })
    },
    // 构建新增的传参数据结构
    generateSaveParams() {
      const code = this.createReceiptNumber() // 生成单据编号

      let params = {}
      // 方案配置 检验类型
      const configForm = this.$refs.ProgramConfig.formInline
      const schemeRelateTypeEntities = configForm.inspectionTypes.map(item => ({ inspectType: item }))

      // 检验项目
      const schemeItemEntities = this.$refs.InspectionItems.currentDataList.map((item, index) => {
        return {
          ...item,
          inspectItemSort: index,
          itemCode: item.code,
          itemName: item.name,
          itemGroupCode: item.groupCode,
          itemGroupId: item.groupId,
          itemGroupName: item.groupName,
          itemReferenceValue: item.referenceValue,
          itemComparator: item.comparatorCode,
          itemUpperLimitValue: item.upperLimitValue,
          itemDownLimitValue: item.downLimitValue
        }
      })

      // 关联物料
      // const generalMaterial = this.$refs.relateMaterial.generalMaterial ? 1 : 0
      const generalMaterial = this.generalMaterial ? 1 : 0
      const schemeMaterialEntities = this.$refs.relateMaterial.materaltableData.map(item => ({
        materialId: item.id,
        materialCode: item.code,
        skuId: item.skuId
      }))
      // 关联物料类型
      const schemeMaterialTypeEntities = this.$refs.relateMaterial.materalTypetableData.map(item => ({
        materialType: item.id,
        materialTypeName: item.name
      }))
      // 检验附件
      const schemeFileEntities = this.$refs.attachment.tableData
      // 不良项目
      const schemeDefectEntities = this.$refs.badItems.badItemsSelectedList.map(item => ({
        defectId: item.defectId,
        defectCode: item.defectCode
      }))
      // 关联客户
      const schemeCustomerEntities = this.$refs.AssociatedCustomer.tableData
      // 关联工序
      const schemeProcessProcedureEntities = this.$refs.AssociatedProcess.tableData
      params = {
        ...this.formInline,
        ...configForm,
        schemeRelateTypeEntities,
        schemeItemEntities,
        generalMaterial,
        schemeMaterialEntities,
        schemeMaterialTypeEntities,
        schemeFileEntities,
        schemeDefectEntities,
        schemeCustomerEntities,
        schemeProcessProcedureEntities,
        schemeCode: code
      }
      return params
    },
    // 构建编辑的传参数据结构
    generateEditParams() {
      let params = {}
      // 方案配置 检验类型
      const configForm = this.$refs.ProgramConfig.formInline
      const schemeRelateTypeEntities = configForm.inspectionTypes.map(item => ({ inspectType: item }))

      // 检验项目
      const schemeItemEntities = this.$refs.InspectionItems.currentDataList.map((item, index) => {
        return {
          ...item,
          inspectItemSort: index,
          itemCode: item.code,
          itemName: item.name,
          itemGroupCode: item.groupCode,
          itemGroupId: item.groupId,
          itemGroupName: item.groupName,
          itemReferenceValue: item.referenceValue,
          itemComparator: item.comparatorCode,
          itemUpperLimitValue: item.upperLimitValue,
          itemDownLimitValue: item.downLimitValue
        }
      })

      // 关联物料
      const generalMaterial = this.generalMaterial ? 1 : 0 // 通用方案
      // const generalMaterial = this.$refs.relateMaterial.generalMaterial ? 1 : 0 // 通用方案
      const schemeMaterialEntities = this.$refs.relateMaterial.materaltableData.map(item => {
        if (item.isOriginal) {
          return {
            ...item
          }
        } else {
          return {
            materialId: item.id,
            materialCode: item.code,
            skuId: item.skuId
          }
        }
      })
      // 关联物料类型
      const schemeMaterialTypeEntities = this.$refs.relateMaterial.materalTypetableData.map(item => {
        if (item.isOriginal) {
          return {
            ...item
          }
        } else {
          return {
            materialType: item.id,
            materialTypeName: item.name
          }
        }
      })
      // 检验附件
      const schemeFileEntities = this.$refs.attachment.tableData
      // 不良项目
      const schemeDefectEntities = this.$refs.badItems.badItemsSelectedList
      // 关联客户
      const schemeCustomerEntities = this.$refs.AssociatedCustomer.tableData
      // 关联工序
      const schemeProcessProcedureEntities = this.$refs.AssociatedProcess.tableData
      params = {
        ...this.formInline,
        ...configForm,
        schemeRelateTypeEntities,
        schemeItemEntities,
        generalMaterial,
        schemeMaterialEntities,
        schemeMaterialTypeEntities,
        schemeFileEntities,
        schemeDefectEntities,
        schemeCustomerEntities,
        schemeProcessProcedureEntities
      }
      return params
    },
    // 构建复制数据新增时的传参结构
    generateCopyParams() {
      const code = this.createReceiptNumber() // 生成单据编号

      let params = {}
      // 方案配置 检验类型
      const configForm = this.$refs.ProgramConfig.formInline
      const schemeRelateTypeEntities = configForm.inspectionTypes.map(item => ({ inspectType: item }))

      // 检验项目
      const schemeItemEntities = this.$refs.InspectionItems.currentDataList.map((item, index) => {
        // 删除附件id和输入方式id
        delete item.id
        item?.itemFileList &&
          item?.itemFileList.forEach(attachment => {
            delete attachment.id
          })
        item?.itemOptionList &&
          item?.itemOptionList.forEach(option => {
            delete option.id
          })
        return {
          ...item,
          inspectItemSort: index,
          itemId: item.itemId,
          itemCode: item.code,
          itemName: item.name,
          itemGroupCode: item.groupCode,
          itemGroupId: item.groupId,
          itemGroupName: item.groupName,
          itemReferenceValue: item.referenceValue,
          itemComparator: item.comparatorCode,
          itemUpperLimitValue: item.upperLimitValue,
          itemFileList: item.itemFileList,
          itemOptionList: item.itemOptionList,
          itemDownLimitValue: item.downLimitValue
        }
      })

      // 关联物料
      const generalMaterial = this.generalMaterial ? 1 : 0
      // const generalMaterial = this.$refs.relateMaterial.generalMaterial ? 1 : 0
      const schemeMaterialEntities = this.$refs.relateMaterial.materaltableData.map(item => ({
        materialId: item.id,
        materialCode: item.code,
        skuId: item.skuId
      }))
      // 关联物料类型
      const schemeMaterialTypeEntities = this.$refs.relateMaterial.materalTypetableData.map(item => ({
        materialType: item.id,
        materialTypeName: item.name
      }))
      // 检验附件
      const schemeFileEntities = this.$refs.attachment.tableData
      // 不良项目
      const schemeDefectEntities = this.$refs.badItems.badItemsSelectedList.map(item => ({
        defectId: item.defectId,
        defectCode: item.defectCode
      }))
      // 关联客户
      const schemeCustomerEntities = this.$refs.AssociatedCustomer.tableData.map(item => {
        return {
          customerId: item.customerId,
          customerCode: item.customerCode,
          customerName: item.customerName
        }
      })
      // 关联工序
      const schemeProcessProcedureEntities = this.$refs.AssociatedProcess.tableData
      params = {
        schemeCode: code,
        schemeName: this.formInline.schemeName,
        remark: this.formInline.remark,
        timeliness: this.formInline.timeliness,
        effectiveTime: this.formInline.effectiveTime,
        failureTime: this.formInline.failureTime,
        samplePlanId: this.formInline.samplePlanId,
        samplePlanName: this.formInline.samplePlanName,
        inspectLevel: this.formInline.inspectLevel,
        stringency: this.formInline.stringency,
        aqlValue: this.formInline.aqlValue,
        schemeRelateTypeEntities,
        schemeItemEntities,
        generalMaterial,
        schemeMaterialEntities,
        schemeMaterialTypeEntities,
        schemeFileEntities,
        schemeDefectEntities,
        schemeCustomerEntities,
        schemeProcessProcedureEntities
      }
      delete params.status
      return params
    },
    // 校验数据必填
    async handleValidata() {
      const ProgramConfigValidate = await this.$refs['ProgramConfig'].$refs['programConfigForm'].validate()
      return ProgramConfigValidate
    },
    async handleSaveBtn() {
      // 新增并且没有编码时，赋值编码
      // if ((this.isAddType || this.isCopyType) && !this.formInline.schemeCode) {
      //   this.isAutoOpen = true
      // }

      // // 等待编码赋值完成
      // await new Promise((resolve) => {
      //   const interval = setInterval(() => {
      //     if (this.formInline.schemeCode) {
      //       clearInterval(interval)
      //       resolve()
      //     }
      //   }, 100)
      // })

      // 需要等待编码赋值后在执行以下函数
      // 编码赋值完成后执行保存逻辑
      if (this.isCopyType) {
        this.handleCopySave()
        return
      }
      if (this.isAddType) {
        this.handleSave()
        return
      }
      this.handleEditSave()
    },
    // 保存数据
    async handleSave() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          },
          {
            positionInfo: '方案配置__programConfig',
            formEntity: this?.$refs?.ProgramConfig?.$refs?.programConfigForm
          },
          {
            positionInfo: '检验项目__inspectionItems',
            formEntity: this?.$refs?.InspectionItems?.$refs?.projectIndicatorRef.$refs?.projectForm
          }
        ],
        // 用于展开基本信息或tabs的方法对象（非必传）
        otherFunc: {
          changeTabs: name => {
            this.tabValue = name
          }
          // expandInfo: () => {
          //   this.$refs.baseForm.isFold = true
          // }
        }
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      // 校验数据
      // const result = await this.handleValidata()
      // if (!result) {
      //   return
      // }
      const params = this.generateSaveParams()
      // this.$refs['projectForm'].validate(async valid => {
      //   if (valid) {
      await addDetectionSchemeList(params)
      this.$notify({
        title: '提示',
        message: '新增成功',
        type: 'success',
        duration: 2000
      })
      this.back()
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    // 编辑数据
    async handleEditSave() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          },
          {
            positionInfo: '方案配置__programConfig',
            formEntity: this?.$refs?.ProgramConfig?.$refs?.programConfigForm
          },
          {
            positionInfo: '检验项目__inspectionItems',
            formEntity: this?.$refs?.InspectionItems?.$refs?.projectIndicatorRef.$refs?.projectForm
          }
        ],
        // 用于展开基本信息或tabs的方法对象（非必传）
        otherFunc: {
          changeTabs: name => {
            this.tabValue = name
          }
          // expandInfo: () => {
          //   this.$refs.baseForm.isFold = true
          // }
        }
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return
      // 校验数据
      // const result = await this.handleValidata()
      // if (!result) {
      //   return
      // }

      const params = this.generateEditParams()
      // this.$refs['projectForm'].validate(async valid => {
      //   if (valid) {
      await detectionSchemeUpdate(params)
      this.$notify({
        title: '提示',
        message: '修改成功',
        type: 'success',
        duration: 2000
      })
      this.back()
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    async handleCopySave() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          },
          {
            positionInfo: '方案配置__programConfig',
            formEntity: this?.$refs?.ProgramConfig?.$refs?.programConfigForm
          },
          {
            positionInfo: '检验项目__inspectionItems',
            formEntity: this?.$refs?.InspectionItems?.$refs?.projectIndicatorRef.$refs?.projectForm
          }
        ],
        // 用于展开基本信息或tabs的方法对象（非必传）
        otherFunc: {
          changeTabs: name => {
            this.tabValue = name
          }
          // expandInfo: () => {
          //   this.$refs.baseForm.isFold = true
          // }
        }
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      // 校验数据
      // const result = await this.handleValidata()
      // if (!result) {
      //   return
      // }
      const params = this.generateCopyParams()
      // this.$refs['projectForm'].validate(async valid => {
      //   if (valid) {
      await addDetectionSchemeList(params)
      this.$notify({
        title: '提示',
        message: '新增成功',
        type: 'success',
        duration: 2000
      })
      this.back()
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    // 保存前，如果编码没有值，需要先给编码赋值
    async savaAndEffectivePreview() {
      // 新增并且没有编码时，赋值编码
      // if (this.isAddType && !this.formInline.schemeCode) {
      //   this.isAutoOpen = true
      // }

      // // 等待编码赋值完成
      // await new Promise((resolve) => {
      //   const interval = setInterval(() => {
      //     if (this.formInline.schemeCode) {
      //       clearInterval(interval)
      //       resolve()
      //     }
      //   }, 100)
      // })

      // 需要等待编码赋值后在执行以下函数
      this.savaAndEffective()
    },
    // 保存并且生效
    async savaAndEffective() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          },
          {
            positionInfo: '方案配置__programConfig',
            formEntity: this?.$refs?.ProgramConfig?.$refs?.programConfigForm
          },
          {
            positionInfo: '检验项目__inspectionItems',
            formEntity: this?.$refs?.InspectionItems?.$refs?.projectIndicatorRef.$refs?.projectForm
          }
        ],
        // 用于展开基本信息或tabs的方法对象（非必传）
        otherFunc: {
          changeTabs: name => {
            this.tabValue = name
          }
          // expandInfo: () => {
          //   this.$refs.baseForm.isFold = true
          // }
        }
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      let params
      if (this.isCopyType) {
        params = this.generateCopyParams()
      } else {
        params = this.generateSaveParams()
      }
      // 校验数据
      // const result = await this.handleValidata()
      // if (!result) {
      //   return
      // }
      // this.$refs['projectForm'].validate(async valid => {
      //   if (valid) {
      await detectionSchemeSaveExpir(params)
      this.$notify({
        title: '提示',
        message: '新增成功',
        type: 'success',
        duration: 2000
      })
      this.back()
      // return
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    // 返回
    back() {
      this.$router.push({
        name: 'inspectionProgram'
      })
    },
    // 上传文件
    handleUpload(params) {
      const formData = new FormData()
      formData.append('file', params.file)
      return uploadFile(formData)
    },
    // 上传文件结果处理
    handleUploadRes(data) {
      const {
        name,
        fullPath,
        metaDataEntity: { lastModified }
      } = data
      const template = {
        fileName: name,
        fileUrl: fullPath,
        createByName: JSON.parse(sessionStorage.getItem('userInfo'))?.nickname || '',
        createTime: lastModified,
        isUsed: false,
        type: 'checkPlan',
        isFlag: true // 标记是查询列表还是push 新增
      }
      return template
    },
    handleDelFileFn(params) {
      return deleteSchemeAttemFile(this.formInline.schemeId, [params.id])
    },
    // 更新关联客户数据
    updateCustomerData(val) {
      console.log('🚀 ~ updateCustomerData ~ val:', val)
    },
    // 获取审批权限
    async isAllowApprove() {
      const res = await isExistApprove('productInspectionScheme')
      const { code, data, message } = res.data || {}
      if (+code === 200) {
        this.isExistApproveBtn = data
      } else {
        this.$notify({
          title: '提示',
          message,
          type: 'error',
          duration: 2000
        })
      }
    },
    // 当前状态下其他状态是否可以选择
    statusDIsable() {
      switch (this.formInline.status) {
        case 0:
          if (!this.isExistApproveBtn) {
            this.statusList[1].disabled = false
          }
          break
        case 1:
          this.statusList[2].disabled = false
          this.statusList[3].disabled = false
          break
        case 2:
          this.statusList[1].disabled = false
          this.statusList[3].disabled = false
          break
        case 3:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.commonPage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f6f6f6;
  position: relative;
  .quality-edit-inner {
    width: 100%;
    height: 100%;
    padding: 1px;
    margin: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // 头部内容
    .edit-header {
      padding: 7px 0 7px 11px;
      margin-bottom: 4px;
      border-radius: 0px 0px 0px 0px;
      background: white;
    }
    .scroll {
      height: calc(100% - 64px);
      overflow: auto;
    }
    .scroll::-webkit-scrollbar {
      height: 8px; /* 设置滚动条的高度 */
      width: 8px; /* 设置滚动条的宽度 */
    }
    // 基本信息
    .base-info {
      background: #ffffff;
      border-radius: 0px 0px 0px 0px;
      padding: 12px 0px 9px 12px;
      .base-info-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: bolder;
          color: #333333;
        }
        img {
          width: 14px;
          height: 16px;
          margin-right: 37px;
        }
      }
      .base-info-content {
        width: 80%;
      }
    }
    .base-info,
    .centerArea,
    .bottomArea {
      // box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
      // border-radius: 4px 4px 4px 4px;
      background: white;
      padding: 12px 0px 9px 18px;
    }
    .bottomArea {
      margin-top: 4px;
    }
  }
  ::v-deep .el-input--mini {
    width: 200px;
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
  ::v-deep .el-tabs__header {
    display: none;
  }
}
</style>
