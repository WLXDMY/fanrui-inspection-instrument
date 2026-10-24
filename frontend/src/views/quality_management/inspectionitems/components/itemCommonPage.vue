<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-16 16:54:06
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-05-09 10:51:36
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
          v-if="isAddType"
          v-permission="{ action: 'qms-product-inspection.inspection-manage.project:saveAndEffect' }"
          type="primary"
          size="mini"
          @click="savaAndEffective"
        >
          保存并启用
        </el-button>
      </header>
      <div class="scroll">
        <el-form
          ref="projectForm"
          :inline="true"
          :model="formInline"
          :rules="projectRules"
          class="demo-form-inline"
          label-position="right"
          label-width="200px"
        >
          <!-- 基本信息 -->
          <section class="base-info">
            <div class="base-info-title">
              <p>基本信息</p>
            </div>
            <el-form-item :label="getLabelName('groupId', '检验项目组')" prop="groupId">
              <!-- :disabled="isNameDisabled" -->
              <el-select
                v-model="formInline.groupId"
                placeholder="请选择"
                size="mini"
                filterable
                clearable
              >
                <el-option v-for="(item, index) in groupList" :key="index" :label="item.groupName" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item :label="getLabelName('name', '检验项目')" prop="name">
              <el-input
                v-model="formInline.name"
                clearable
                placeholder="请输入"
                size="mini"
              />
            </el-form-item>
            <!--
            <el-form-item :label="getLabelName('code', '检验项目编码')" prop="code">
              <el-input v-model="formInline.code" clearable placeholder="编码保存后自动生成" size="mini">
                <template
                  v-if="isAddType"
                  slot="suffix"
                ><i
                  class="el-icon-s-operation"
                  style="cursor: pointer"
                  @click.stop="handleResetCode"
                /></template>
              </el-input>
            </el-form-item>
            -->

            <el-form-item
              :label="getLabelName('code', '单据编号')"
              prop="code"
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
                v-model="formInline.code"
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
                v-model="formInline.code"
                placeholder="请输入内容"
                :disabled="true"
                style="width: 200px"
              />
            </el-form-item>

            <!-- <el-form-item :label="getLabelName('analyzeMethodCode', '分析方法')" prop="analyzeMethodCode">
              <el-select
                v-model="formInline.analyzeMethodCode"
                placeholder="请选择"
                size="mini"
                clearable
                :disabled="initStatus === 1"
                @change="changeMethod"
              >
                <el-option v-for="(item, index) in methodsList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item :label="getLabelName('export', '是否生成检验报告')" prop="export">
              <el-select
                v-model="formInline.export"
                :disabled="initStatus === 1"
                placeholder="请选择"
                size="mini"
                clearable
              >
                <el-option v-for="(item, index) in exportName" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item :label="getLabelName('defectLevelCode', '缺陷等级')" prop="defectLevelCode">
              <el-select
                v-model="formInline.defectLevelCode"
                :disabled="initStatus === 1"
                placeholder="请选择"
                clearable
              >
                <el-option v-for="item in defectLevelList" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item> -->
            <el-form-item label="检验参数:">
              <!-- :disabled="initStatus === 1" -->
              <el-checkbox-group v-model="checkList">
                <el-checkbox :label="1" :disabled="isDetailType">{{
                  getLabelName('importantInspection', '重点检验', 0)
                }}</el-checkbox>
                <el-checkbox :label="2" :disabled="isDetailType">{{
                  getLabelName('recordInspectionValue', '记录样本检测值', 0)
                }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="getLabelName('remark', '备注')" prop="remark" label-width="138px">
              <el-input v-model="formInline.remark" placeholder="请输入" size="mini" />
            </el-form-item>
            <el-form-item v-if="!isAddType" :label="getLabelName('status', '状态')" prop="status">
              <el-select v-model="formInline.status" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in statusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </section>

          <CommonRadioGroup :tab-value.sync="tabValue" :radio-list="radioList" />

          <section v-show="isOperationRecord" class="centerArea">
            <OperationRecord :record-info="recordInfo" :record-info-label="recordInfoLabel" />
          </section>

          <section v-show="isProjectIndicator" class="centerArea">
            <el-form-item :label="getLabelName('analyzeMethodCode', '分析方法')" prop="analyzeMethodCode">
              <el-select
                v-model="formInline.analyzeMethodCode"
                placeholder="请选择"
                size="mini"
                clearable
                @change="changeMethod"
              >
                <el-option v-for="(item, index) in methodsList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item :label="getLabelName('verificationBasis', '检验标准')">
              <el-input
                v-model="formInline.verificationBasis"
                type="textarea"
                maxlength="300"
                :autosize="{ minRows: 2, maxRows: 6 }"
                clearable
                placeholder="请输入"
                size="mini"
                :disabled="isDetailType"
              />
            </el-form-item>
            <el-form-item :label="getLabelName('verificationInstrument222', '检验仪器')" prop="verificationInstrument">
              <y-complexSelect3
                v-model="formInline.verificationInstrument"
                style="width: 200px"
                :value-key="'instrumentCode'"
                :label-key="'instrumentName'"
                :keyword-key="'instrumentName'"
                @btnClickCallback="showDialogInstrument = true"
                @selectChange="(e, options) => changeInstrument(e, options)"
              />
              <!-- <el-input
                v-model="formInline.verificationInstrument"
                :disabled="initStatus === 1"
                clearable
                placeholder="请输入"
                size="mini"
              /> -->
            </el-form-item>
            <el-form-item :label="getLabelName('verificationMethod222', '检验方法')" prop="verificationMethod">
              <el-input
                v-model="formInline.verificationMethod"
                placeholder="请输入"
                size="mini"
              />
            </el-form-item>
            <el-form-item :label="getLabelName('inspectionCondition', '检验条件')">
              <el-input
                v-model="formInline.inspectionCondition"
                type="textarea"
                maxlength="300"
                :autosize="{ minRows: 2, maxRows: 6 }"
                clearable
                placeholder="请输入"
                size="mini"
                :disabled="isDetailType"
              />
            </el-form-item>
            <el-form-item :label="getLabelName('unit', '单位')" prop="unit">
              <el-select v-model="formInline.unit" style="width: 200px;" placeholder="请选择单位" clearable>
                <el-option v-for="item in unitList" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item
              v-show="formInline.analyzeMethodCode === 'quantitative'"
              :label="getLabelName('comparatorCode', '比较符')"
              prop="comparatorCode"
            >
              <el-select
                v-model="formInline.comparatorCode"
                placeholder="请选择"
                size="mini"
                clearable
                :disabled="disabledFlag"
                @change="changeCompare"
              >
                <el-option v-for="(item, index) in comparatorList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
              <el-tooltip
                style="margin-left: 4px"
                class="item"
                effect="dark"
                content="等于、不等于、大于、小于、大于等于、小于等于时，按参考值判定；介于时，按上限值和下限值区间判定。"
                placement="top"
              >
                <i class="el-icon-warning-outline" clsss="sampleIdentification-icon" />
              </el-tooltip>
            </el-form-item>
            <el-form-item
              v-show="formInline.analyzeMethodCode === 'quantitative'"
              style="margin-left: -20px"
              :label="getLabelName('referenceValue', '标准/参考值')"
              prop="referenceValue"
            >
              <el-input
                v-model="formInline.referenceValue"
                clearable
                placeholder="请输入"
                size="mini"
              />
            </el-form-item>
            <el-form-item
              v-show="formInline.analyzeMethodCode === 'quantitative'"
              :label="getLabelName('upperTolerance', '上公差')"
              prop="upperTolerance"
            >
              <NumberInput
                v-model="formInline.upperTolerance"
                style="width: 200px"
                clearable
                size="mini"
                :disabled="disabledFlag2"
                @change="changeNum($event, 'upperLimitValue', 'referenceValue', '1')"
              />
              <!-- :prepend-name="'+'"
                :prepend-show="true" -->
            </el-form-item>
            <el-form-item
              v-show="formInline.analyzeMethodCode === 'quantitative'"
              :label="getLabelName('lowerTolerance', '下公差')"
              prop="lowerTolerance"
            >
              <NumberInput
                v-model="formInline.lowerTolerance"
                style="width: 200px"
                clearable
                size="mini"
                :disabled="disabledFlag2"
                @change="changeNum($event, 'downLimitValue', 'referenceValue', '2')"
              />
            </el-form-item>

            <el-form-item
              v-show="formInline.analyzeMethodCode === 'quantitative'"
              :label="getLabelName('upperLimitValue', '上限值')"
              prop="upperLimitValue"
            >
              <el-input
                v-model="formInline.upperLimitValue"
                clearable
                placeholder="请输入"
                size="mini"
                :disabled="disabledFlag2"
                @change="changeNum($event, 'upperTolerance', 'referenceValue', '3')"
              />
            </el-form-item>
            <el-form-item
              v-show="formInline.analyzeMethodCode === 'quantitative'"
              :label="getLabelName('downLimitValue', '下限值')"
              prop="downLimitValue"
            >
              <el-input
                v-model="formInline.downLimitValue"
                clearable
                rable
                placeholder="请输入"
                size="mini"
                :disabled="disabledFlag2"
                @change="changeNum($event, 'lowerTolerance', 'referenceValue', '4')"
              />
            </el-form-item>
            <el-form-item :label="getLabelName('samplePlanId', '抽样方案')" prop="samplePlanId">
              <y-complexSelect
                v-model="formInline.samplePlanName"
                style="width: 200px"
                @btnClickCallback="showDialog = true"
                @selectChange="(e, options) => changeMaterialCode(e, options)"
              />
            </el-form-item>
            <el-form-item :label="getLabelName('type', '抽样类型')" prop="type">
              <el-input v-model="formInline.typeName" placeholder="请输入" size="mini" disabled />
            </el-form-item>
            <el-form-item :label="getLabelName('inspectLevel', '检验水平')" prop="inspectLevel">
              <el-input v-model="formInline.inspectLevelName" placeholder="请输入" size="mini" disabled />
            </el-form-item>
            <el-form-item :label="getLabelName('stringency', '严格度')" prop="stringency">
              <el-input v-model="formInline.stringencyName" placeholder="请输入" size="mini" disabled />
            </el-form-item>
            <el-form-item :label="getLabelName('aqlValue', 'AQL')" prop="aqlValue">
              <el-input v-model="formInline.aqlValue" placeholder="请输入" size="mini" disabled />
            </el-form-item>
          </section>
          <section v-show="isProjectIndicator" class="bottomArea">
            <InputWayTable
              ref="InputWayTable"
              :item-option-list.sync="formInline.itemOptionList"
              :defalut-str.sync="formInline.defaultValue"
              :optional-str.sync="formInline.optionalValue"
              :input-mode.sync="formInline.inputMode"
              :input-mode-name="inputModeName"
              :input-mode-options="inputModeOptions"
              :readonly="isDetailType"
              :analyze-method-code="formInline.analyzeMethodCode"
            />
          </section>

          <!-- 检验项附件 -->
          <section v-show="isAttachment" class="centerArea">
            <Attachment
              ref="attachment"
              :form-inline="formInline"
              :disabled-upload-btn="isDetailType"
            />
          </section>
        </el-form>
      </div>
    </section>
    <CommonSelectDialogPlus
      v-if="showDialog"
      title="抽样方案"
      :request-config="{
        url: 'qms/product/v1/sample/planes/list',
        method: 'post'
      }"
      :extra-params="extraParams"
      :column-config="tableColumn"
      :visible="showDialog"
      :append-to-body="true"
      @confirm="rows => handleConfirm(rows)"
      @cancel="showDialog = false"
    />
    <!-- 编码规则 -->
    <!--
    <common-code-rule-dialog
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="90"
      is-open-reg-disabled-space
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    />
    -->

    <CommonSelectDialogPlus
      v-if="showDialogInstrument"
      title="选择检验仪器"
      :request-config="{
        url: 'qms/product/v1/instrument/page',
        method: 'post'
      }"
      :extra-params="extraParamsInstrument"
      :column-config="tableColumnInstrument"
      :visible="showDialogInstrument"
      :append-to-body="true"
      @confirm="rows => handleConfirmInstrument(rows)"
      @cancel="showDialogInstrument = false"
    />
  </div>
</template>

<script>
import { USE_DEFECTS_API } from '@/api/facilityQualityManagement.js'
import {
  getProjectGroupList,
  addProjectItem,
  savaAndEffectiveProjectItem,
  getMethodsList,
  getComparisonOperatorsList,
  getEnumsList,
  updateProjectItem,
  getInputModeListApi,
  getProjectDetail,
  standardStateList
} from '@/api/quality-manage.js'
import { getUnitList } from '@/api/basisInfo.js'
import CommonRadioGroup from '@/components/CommonRadioGroup/index.vue'
import InputWayTable from '@/components/InputWayTable/index.vue'
import OperationRecord from '@/components/OperationRecord/index.vue'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import NumberInput from '@/components/NumberInput'
import { CHECK_STANDARDS_TABLE } from '../../inspectionProgram/components/tabPages/constant.js'
import Attachment from './attachment.vue'
const DEFECTS_API = USE_DEFECTS_API() // 缺陷api
import { mapGetters } from 'vuex'
const FULLROUTECODE = '/inspection-manage/qms-product-inspection/project' // 当前模块配置关键字
const PAGEFULLPATHCODE = new Map([
  [0, 'qms.qmsItem.qmsItemEdit.qmsItemEditByCreate'],
  [1, 'qms.qmsItem.qmsItemEdit.qmsItemEditByRelease'],
  [2, 'qms.qmsItem.qmsItemEdit.qmsItemEditByDisabled'],
  [3, 'qms.qmsItem.qmsItemEdit.qmsItemEditByDisuse']
]) // 当前页配置关键字 (状态不同则不同)
import CustomCodeRule from '@/components/CodeRuleDialog/index'

export default {
  name: 'ItemCommonPage',
  components: {
    CommonRadioGroup,
    InputWayTable,
    OperationRecord,
    CommonSelectDialogPlus,
    Attachment,
    NumberInput,
    CustomCodeRule
  },
  data() {
    return {
      initStatus: 0,
      defectLevelList: [], // 缺陷等级
      statusList: [], // 状态
      isAutoOpen: false,
      extraParams: { statues: [1], filter: true },
      window,
      tabValue: 'projectIndicators',
      formInline: {
        groupId: '', // 检验项目组ID
        inspectionItemGroupName: '', // 检验项目组名称
        analyzeMethodCode: '', // 分析方法
        name: '', // 检验项目名称
        verificationInstrument: '', // 检验仪器
        verificationBasis: '', // 校验依据
        verificationMethod: '', // 校验方法
        unit: '', // 单位
        upperLimitValue: '', // 上限值
        comparatorCode: '', // 比较符
        referenceValue: '', // 参考值
        downLimitValue: '', // 下限值
        actualApproverName: '', // 实际审批人
        approver: '', // 审批人
        export: false, // 是否生成检验报告，默认否
        remark: '', // 备注
        inputMode: 'handInput', // 输入方式
        optionalValue: '', // 可选值
        defectLevelCode: '', // 缺陷等级
        recordInspectionValue: 0, // 检验参数
        importantInspection: 0, // 重点检验
        defaultValue: '', // 默认值
        itemOptionList: [], // 输入值-数组
        itemFileList: [], // 附件
        code: '' // 编码
      },
      checkList: [],
      disabledFlag: false, // 上限下限
      disabledFlag2: true, // 上限下限
      code: 'productInspectionProject',
      infoRetract: true,
      activeName: '',
      groupList: [], // 检验项目组
      methodsList: [], // 检验方法判定
      unitList: [], // 单位
      comparatorList: [], // 比较符list
      approvealList: [], // 审批人
      exportName: [],
      projectRules: {
        groupId: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        name: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ],
        code: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur', 'change']
          }
        ],
        // analyzeMethodCode: [
        //   {
        //     required: true,
        //     message: '该参数是必填项',
        //     trigger: ['change']
        //   }
        // ],
        // export: [
        //   {
        //     required: true,
        //     message: '该参数是必填项',
        //     trigger: ['change']
        //   }
        // ],
        approver: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        downLimitValue: [
          {
            required: false,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ],
        upperLimitValue: [
          {
            required: false,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ],
        comparatorCode: [
          {
            required: false,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        referenceValue: [
          {
            required: false,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ]
      },
      initInputModeOptions: [], // 输入方式枚举
      inputModeOptions: [], // 输入方式枚举-根据分析方法过滤
      recordInfo: {},
      recordInfoLabel: {},
      showDialog: false,
      tableColumn: CHECK_STANDARDS_TABLE,
      FULLROUTECODE,
      PAGEFULLPATHCODE,
      // 输入方式-名称
      inputModeName: '输入方式:',
      // 检验仪器
      showDialogInstrument: false,
      extraParamsInstrument: { statuses: [1] },
      tableColumnInstrument: [
        {
          label: '仪器编码',
          prop: 'instrumentCode',
          multilevelkey: 'instrumentCode',
          filterBoxType: 'input'
        },
        {
          label: '仪器名称',
          prop: 'instrumentName',
          multilevelkey: 'instrumentName',
          filterBoxType: 'input'
        },
        {
          label: '仪器分类',
          prop: 'instrumentCategoryName',
          multilevelkey: 'instrumentCategoryName',
          filterBoxType: 'input'
        }
      ],
      // 单据编码 start
      receiptCodePlaceholder: '请输入',
      typeCode: 90,
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
        pageFullPathCode: PAGEFULLPATHCODE.get(this.initStatus)
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
    radioList() {
      const list = [
        { label: '项目指标', value: 'projectIndicators' },
        { label: '检验项附件', value: 'attachment' },
        { label: '操作记录', value: 'operationRecord' }
      ]
      if (this.isAddType) return list.filter(item => item.value !== 'operationRecord')
      return list
    },
    isOperationRecord() {
      return this.tabValue === 'operationRecord'
    },
    isProjectIndicator() {
      return this.tabValue === 'projectIndicators'
    },
    isAttachment() {
      return this.tabValue === 'attachment'
    },
    // 复制跳进来的
    isCopyType() {
      return this.isAddType && this.$route.query.id
    },
    isNameDisabled() {
      if (this.isAddType || this.initStatus === 2 || this.initStatus === 0) {
        return false
      }
      return true
    }
  },
  watch: {
    fieldRuleDetail: {
      handler(newVal) {
        // 动态字段配置有值则更新字段
        Object.keys(newVal?.[FULLROUTECODE] || {}).length
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.init()
  },
  mounted() {
    if (this.isAddType || this.isCopyType) {
      setTimeout(() => {
        this.$refs?.commonCodeRuleInput?.init(this.typeCode)
      }, 500)
    }

    // 打开编码规则弹窗
    // setTimeout(() => {
    //   if (this.isAddType) {
    //     this.isAutoOpen = true
    //     // this.$refs['codeRuleDialog'].open()
    //   }
    // }, 200)
    if (this.isDetailType) {
      this.getCurrentDetail()
      this.$nextTick(() => {
        this.$disableInputDetail()
      })
    }
    if (this.isEditType || this.isCopyType) {
      this.getCurrentDetail()
    }
    this.inputModeName = this.getLabelName('inputMode', '输入方式')
    this.recordInfoLabel = {
      createByNameLabel: this.getLabelName('createByName', '创建人'),
      createTimeLabel: this.getLabelName('createTime', '创建时间'),
      updateByNameLabel: this.getLabelName('updateByName', '更新人'),
      updateTimeLabel: this.getLabelName('updateTime', '更新时间')
    }
  },
  methods: {
    // 默认的编码规则
    defaultCodeRule(defaultCodeRule) {
      this.formInline.numberRuleId = defaultCodeRule?.id || null
      this.formInline.ruleFormItems = defaultCodeRule?.prefixDetailList || []
    },
    // 编码规则确认  初始化有此回调说明没有人工输入哦
    handleConfirmCodeRuleDialog(val, id, ruleFormItems) {
      this.formInline.code = ''
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
            str += this.formInline.code
          } else {
            str += item.value
          }
        })
      }
      // 没有人工输入，自行输入了单号 则覆盖编码规则
      if (!hasManualInput && this.formInline.code) {
        str = this.formInline.code
      }
      // 没有人工输入，没有输入了单号 编码规则
      if (!hasManualInput && !this.formInline.code) {
        this.formInline.ruleFormItems.forEach(item => {
          str += item.value
        })
      }
      console.log('构造收料单号', this.formInline.ruleFormItems)
      return str
    },
    changeMethod() {},
    // 仪器名称选择
    changeInstrument(val, options) {
      if (val) {
        const hasItem = options.find(el => el.instrumentCode === val)
        this.formInline.verificationInstrument = hasItem?.instrumentName
      } else {
        this.formInline.verificationInstrument = ''
      }
    },
    // 仪器名称确定
    handleConfirmInstrument(row) {
      this.formInline.verificationInstrument = row.instrumentName
      this.showDialogInstrument = false
    },
    // 抽样方案下拉选择回调
    changeMaterialCode(val, options) {
      if (val) {
        const hasItem = options.find(el => el.name === val)
        this.handleConfirm(hasItem)
      } else {
        // 删除则把相应的信息清空
        this.$set(this.formInline, 'samplePlanId', '')
        this.$set(this.formInline, 'samplePlanName', '')
        // 编辑时，需要把里面的name也删除
        if (this.isEditType && this.formInline.samplePlanEntity) {
          this.$set(this.formInline?.samplePlanEntity, 'name', '')
          this.$set(this.formInline?.samplePlanEntity, 'stringency', '')
          this.$set(this.formInline?.samplePlanEntity, 'type', '')
          this.$set(this.formInline?.samplePlanEntity, 'inspectLevel', '')
          this.$set(this.formInline?.samplePlanEntity, 'aqlValue', '')
        }
        this.$set(this.formInline, 'inspectLevel', '')
        this.$set(this.formInline, 'inspectLevelName', '')
        this.$set(this.formInline, 'stringency', '')
        this.$set(this.formInline, 'stringencyName', '')
        this.$set(this.formInline, 'type', '')
        this.$set(this.formInline, 'typeName', '')
        this.$set(this.formInline, 'aqlValue', '')
        this.$set(this.formInline, 'sampleType', '')
      }
    },
    getLabelName(prop, name, noColon = 1) {
      let label = this.$FN(this.fieldPath, prop, name).replace(/:/g, '')
      // 是否要加上冒号
      label += noColon ? ':' : ''
      return label
    },
    // 切换编码规则
    async handleResetCode() {
      /* this.isAutoOpen = false
      await this.$nextTick()
      this.isAutoOpen = true */
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    // handleConfirmCodeRuleDialog(code) {
    //   if (this.isAddType) {
    //     this.formInline.code = code
    //   }
    // },
    changeInputMode() {
      this.formInline.defaultValue = ''
      this.formInline.optionalValue = ''
      this.formInline.itemOptionList = []
    },
    changeCompare(item) {
      // 选between时非必填，只要不是between参考值都为必填
      if (
        item === 'between' ||
        item === 'greaterBetweenLessequal' ||
        item === 'greaterequalBetweenLess' ||
        item === 'greaterequalBetweenLessequal'
      ) {
        this.projectRules.downLimitValue[0].required = false
        this.projectRules.upperLimitValue[0].required = false
        this.projectRules.referenceValue[0].required = false
        this.disabledFlag2 = false
      } else if (item === '') {
        // 清空比较符
        this.projectRules.downLimitValue[0].required = false
        this.projectRules.upperLimitValue[0].required = false
        this.projectRules.referenceValue[0].required = false
        this.disabledFlag2 = false
      } else {
        this.projectRules.downLimitValue[0].required = false
        this.projectRules.upperLimitValue[0].required = false
        this.projectRules.referenceValue[0].required = false
        this.disabledFlag2 = true
      }
    },
    changeMethod(item, type) {
      // 2222定量分析,定量且为between上下限必填
      if (item === 'quantitative') {
        this.disabledFlag2 = false
        this.disabledFlag = false
        // 比较符不必填
        // this.projectRules.comparatorCode[0].required = true
        // 上下限不必填
        this.projectRules.downLimitValue[0].required = false
        this.projectRules.upperLimitValue[0].required = false
        // 输入方式选项调整
        this.inputModeOptions = this.initInputModeOptions.filter(item => item.code === 'handInput')
        this.formInline.inputMode = 'handInput'

        // 默认为介于（包含上下限）
        if (type !== '1') {
          this.$set(this.formInline, 'comparatorCode', 'greaterequalBetweenLessequal')
          this.changeCompare('greaterequalBetweenLessequal')
        }
      } else if (item === 'qualitative') {
        // 定性分析
        this.disabledFlag2 = true
        this.disabledFlag = true
        this.projectRules.comparatorCode[0].required = false
        this.projectRules.downLimitValue[0].required = false
        this.projectRules.upperLimitValue[0].required = false
        this.projectRules.referenceValue[0].required = false
        this.formInline.upperLimitValue = ''
        this.formInline.comparatorCode = ''
        this.formInline.downLimitValue = ''

        // 输入方式选项调整
        this.inputModeOptions = this.initInputModeOptions.filter(item => item.code !== 'handInput')
        this.formInline.inputMode = 'multipleChoice'
      } else if (item === 'manual') {
        // 人工分析
        this.disabledFlag2 = true
        this.disabledFlag = true
        this.projectRules.comparatorCode[0].required = false
        this.projectRules.downLimitValue[0].required = false
        this.projectRules.upperLimitValue[0].required = false
        this.projectRules.referenceValue[0].required = false
        this.formInline.upperLimitValue = ''
        this.formInline.comparatorCode = ''
        this.formInline.downLimitValue = ''

        // 输入方式选项调整
        this.inputModeOptions = this.initInputModeOptions
        this.formInline.inputMode = 'handInput'
      }
      // 输入方式数组清空
      if (type !== '1') {
        this.formInline.itemOptionList = []
      }
    },
    // 获取当前数据的详情
    async getCurrentDetail() {
      const result = await getProjectDetail(this.$route.query.id)
      const {
        data: { createBy, createByName, createTime, updateBy, updateByName, updateTime }
      } = result.data || {}
      this.formInline = result.data.data || {}
      // 获取抽样类型
      this.formInline.typeName = this.formInline?.samplePlanEntity?.typeName

      // 获取当前状态
      if (this.isCopyType) {
        this.initStatus = 0
        this.formInline.status = 0
        // 复制code需要清空
        this.formInline.code = ''
        // 根据比较符判断是否禁用
        this.changeCompare(this.formInline.comparatorCode)
      } else {
        this.initStatus = this.formInline.status
      }
      if (this.formInline.importantInspection === true) {
        this.checkList.push(1)
      }
      if (this.formInline.recordInspectionValue === true) {
        this.checkList.push(2)
      }
      // 附件回显
      this.$refs.attachment.handleEcho(this.formInline.itemFileList)

      // 抽样方案名称回显
      if (this.formInline.samplePlanEntity && this.formInline.samplePlanEntity.name) {
        this.formInline.samplePlanName = this.formInline.samplePlanEntity.name
      }
      this.recordInfo = { createBy, createByName, createTime, updateBy, updateByName, updateTime }
      // 根据当前状态来判断其他状态是否可以选择
      setTimeout(() => {
        this.statusDIsable()
      }, 200)
      // 根据分析方法获取输入方式
      this.getInputWay(this.formInline.analyzeMethodCode)
      //  获取分析方法是否必填
      this.changeMethod(this.formInline.analyzeMethodCode, '1')
    },
    // 根据分析方法获取输入方式
    getInputWay(item) {
      // 定量分析
      if (item === 'quantitative') {
        this.inputModeOptions = this.initInputModeOptions.filter(item => item.code === 'handInput')
      } else if (item === 'qualitative') {
        // 定性分析
        this.inputModeOptions = this.initInputModeOptions.filter(item => item.code !== 'handInput')
      } else if (item === 'manual') {
        // 人工分析
        this.inputModeOptions = this.initInputModeOptions
      }
    },
    // 初始化
    init() {
      this.getList()
      this.getMethodsList()
      this.getComparison()
      this.getIsExportNameList()
      this.getUnitList()
      this.getInputModeList()
      this.getStatusList()
      this.getDefectLevelList()
    },
    // 缺陷等级
    async getDefectLevelList() {
      const result = await DEFECTS_API.defectDefineLevelList()
      this.defectLevelList = result.data.data
    },
    // 获取状态
    async getStatusList() {
      const result = await standardStateList()
      this.statusList = result.data.data.map(item => {
        return {
          ...item,
          disabled: true
        }
      })
    },
    // 获取(项目组)数据列表
    async getList() {
      const result = await getProjectGroupList()
      const { data } = result.data || {}
      this.groupList = data.records || []
    },
    // 获取(检验)方法数据列表
    async getMethodsList() {
      const result = await getMethodsList()
      const { data } = result.data || {}
      this.methodsList = data || []
    },
    // 获取比较符
    async getComparison() {
      const result = await getComparisonOperatorsList()
      const { data } = result.data || {}
      this.comparatorList = data || []
    },
    // 获取输入方式
    async getInputModeList() {
      const result = await getInputModeListApi()
      const { data } = result.data || {}
      this.initInputModeOptions = data || []
      this.inputModeOptions = this.initInputModeOptions
    },
    // 查询单位
    getUnitList() {
      getUnitList().then(res => {
        this.loading = false
        this.unitList = res.data.data.records
      })
    },
    // 查询是否导出
    getIsExportNameList() {
      getEnumsList().then(res => {
        this.exportName = res.data.data || []
      })
    },
    // 复制生成参数
    generateCopyParams() {
      const code = this.createReceiptNumber() // 生成单据编号

      let params = {}
      delete this.formInline.id
      // 枚举值
      const itemOptionList = this.$refs.InputWayTable.tableData?.map((item, index) => {
        delete item.id
        delete item.itemId
        return {
          ...item
        }
      })

      // 检验参数
      if (this.checkList.includes(1)) {
        this.formInline.importantInspection = true
      } else {
        this.formInline.importantInspection = false
      }
      if (this.checkList.includes(2)) {
        this.formInline.recordInspectionValue = true
      } else {
        this.formInline.recordInspectionValue = false
      }

      // 附件
      const itemFileList = this.$refs.attachment.tableData?.map((item, index) => {
        delete item.id
        delete item.itemId
        return {
          ...item
        }
      })

      params = { ...this.formInline, itemOptionList, itemFileList, code }
      return params
    },
    // 新增/编辑生成参数
    generateSaveParams() {
      const code = this.createReceiptNumber() // 生成单据编号

      let params = {}
      // 枚举值
      const itemOptionList = this.$refs.InputWayTable.tableData

      // 检验参数
      if (this.checkList.includes(1)) {
        this.formInline.importantInspection = true
      } else {
        this.formInline.importantInspection = false
      }
      if (this.checkList.includes(2)) {
        this.formInline.recordInspectionValue = true
      } else {
        this.formInline.recordInspectionValue = false
      }

      // 附件
      const itemFileList = this.$refs.attachment.tableData
      params = { ...this.formInline, itemOptionList, itemFileList, code }
      return params
    },
    async handleSaveBtn() {
      // 新增并且没有编码时，赋值编码
      // if ((this.isAddType || this.isCopyType) && !this.formInline.code) {
      //   this.isAutoOpen = true
      // }

      // // 等待编码赋值完成
      // await new Promise((resolve) => {
      //   const interval = setInterval(() => {
      //     if (this.formInline.code) {
      //       clearInterval(interval)
      //       resolve()
      //     }
      //   }, 100)
      // })

      // 需要等待编码赋值后在执行以下函数
      if (this.isCopyType) {
        this.handleCopySave()
        return
      }
      this.clickSave()
    },
    // 复制保存数据
    async handleCopySave() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          }
          // {
          //   positionInfo: '项目指标__projectIndicators',
          //   formEntity: this?.$refs?.projectForm
          // }
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

      const params = this.generateCopyParams()
      const res = await addProjectItem(params)
      if (+res.data.status === 1) {
        this.$notify({
          title: '提示',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.back()
      }
    },
    // 保存数据
    async clickSave() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          }
          // {
          //   positionInfo: '项目指标__projectIndicators',
          //   formEntity: this?.$refs?.projectForm
          // }
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

      const params = this.generateSaveParams()
      let res
      if (this.isAddType) {
        res = await addProjectItem(params)
      } else {
        res = await updateProjectItem(params)
      }
      if (+res.data.status === 1) {
        this.$notify({
          title: '提示',
          message: this.isAddType ? '新增成功' : '保存成功',
          type: 'success',
          duration: 2000
        })
        this.back()
      }
    },
    // 保存并启用
    async savaAndEffective() {
      // 新增并且没有编码时，赋值编码
      // if ((this.isAddType || this.isCopyType) && !this.formInline.code) {
      //   this.isAutoOpen = true
      // }

      // // 等待编码赋值完成
      // await new Promise((resolve) => {
      //   const interval = setInterval(() => {
      //     if (this.formInline.code) {
      //       clearInterval(interval)
      //       resolve()
      //     }
      //   }, 100)
      // })

      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          }
          // {
          //   positionInfo: '项目指标__projectIndicators',
          //   formEntity: this?.$refs?.projectForm
          // }
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

      const params = this.generateSaveParams()
      const res = await savaAndEffectiveProjectItem(params)
      if (+res.data.status === 1) {
        this.$notify({
          title: '提示',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.back()
      }
    },
    // 返回
    back() {
      this.$router.push({
        name: 'inspectionitems'
      })
    },
    handleConfirm(row) {
      this.formInline.samplePlanId = row.id
      this.formInline.samplePlanName = row.name
      this.formInline.sampleType = row.type
      this.formInline.inspectLevel = row.inspectLevel
      this.formInline.inspectLevelName = row.inspectLevelName
      this.formInline.stringency = row.stringency
      this.formInline.stringencyName = row.stringencyName
      this.formInline.type = row.type
      this.formInline.typeName = row.typeName
      this.formInline.aqlValue = row.aqlValue
      this.showDialog = false
    },
    // 当前状态下其他状态是否可以选择
    statusDIsable() {
      switch (this.formInline.status) {
        case 0:
          this.statusList[1].disabled = false
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
    },
    // 参考值、上公差、下公差等自动判定
    // 上限值=上公差+参考值
    // 下限制=下公差+参考值
    // 上公差=上限值-参考值
    // 下公差=下限值-参考值
    changeNum(val, self, other, operation) {
      if (!val) return
      if (operation === '1') {
        const res = this.add(Number(this.formInline[other]), Number(val))
        this.$set(this.formInline, self, res)
      } else if (operation === '2') {
        const res = this.add(Number(this.formInline[other]), Number(val))
        this.$set(this.formInline, self, res)
      } else if (operation === '3') {
        const res = this.subtract(Number(val), Number(this.formInline[other]))
        this.$set(this.formInline, self, res)
      } else if (operation === '4') {
        const res = this.subtract(Number(val), Number(this.formInline[other]))
        this.$set(this.formInline, self, res)
      }
    },
    // 判断obj是否为一个整数
    isInteger(obj) {
      return Math.floor(obj) === obj
    },
    // 将一个浮点数转成整数，返回小数点后面的长度。如 3.14 >> 314，2
    getLen(num) {
      const numStr = num.toString()
      return numStr.indexOf('.') === -1 ? 0 : numStr.split('.')[1].length
    },
    // 核心方法，实现加减乘除运算，确保不丢失精度
    // 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
    operation(a, b, digits, op) {
      let result = null
      const maxLen = Math.max(this.getLen(a), this.getLen(b))
      const base = Math.pow(10, maxLen)
      const bigA = Math.round(base * a)
      const bigB = Math.round(base * b)
      switch (op) {
        case 'add':
          result = bigA + bigB
          break
        case 'subtract':
          result = bigA - bigB
          break
      }
      return result / base
    },
    add(a, b, digits) {
      return this.operation(a, b, digits, 'add')
    },
    subtract(a, b, digits) {
      return this.operation(a, b, digits, 'subtract')
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
      // padding: 12px 0px 9px 18px;
    }
    .bottomArea {
      margin-top: 4px;
      padding-top: 18px;
    }
    .centerArea {
      padding-top: 18px;
    }
  }
  ::v-deep .el-input--mini {
    width: 200px;
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
}
// 单选，多选框详情时颜色修改
::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
::v-deep .el-textarea.is-disabled .el-textarea__inner {
  color: rgb(0, 0, 0);
}
</style>
