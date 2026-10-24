<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-16 16:54:06
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-11-29 10:32:02
 * @Description: 新增检验单-v3.11版本-检验项目和综合判断分开版本-备份下
-->
<template>
  <div class="commonPage">
    <!-- 内层 -->
    <section class="quality-edit-inner">
      <!-- 头部 -->
      <div id="header" class="header">
        <header class="edit-header">
          <el-button size="mini" type="primary" @click="back">返回</el-button>
          <el-button
            v-if="!isDetailType"
            :disabled="initStatus === 3"
            size="mini"
            type="primary"
            @click="handleSaveBtn"
          >保存</el-button>
          <el-button
            v-if="isAddType && !isExistApproveBtn"
            v-permission="{ action: 'inspection-manage.inspect:saveAndEffect' }"
            type="primary"
            size="mini"
            @click="savaAndEffective"
          >
            保存并生效
          </el-button>
        </header>
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
              <p>检验单信息</p>
              <div v-if="!isAddType" class="base-info-record">
                <div>创建人/时间: {{ formInline.createByName }} {{ formInline.createTime }}</div>
              </div>
              <div v-if="!isAddType" class="base-info-record">
                <div>更新人/时间: {{ formInline.updateByName }} {{ formInline.updateTime }}</div>
              </div>
            </div>
            <el-form-item :label="getLabelName('code', '单据编号')" prop="code">
              <el-input v-model="formInline.code" size="mini" :disabled="!isAddType">
                <template v-if="isAddType" slot="suffix">
                  <i class="el-icon-s-operation" style="cursor: pointer" @click.stop="handleResetCode" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item :label="getLabelName('type', '检验类型')" prop="type" :rules="$FR(fieldPath, 'type')">
              <el-select
                v-model="formInline.type"
                placeholder="请选择"
                size="mini"
                :disabled="
                  !isAddType || $FC('type', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              >
                <el-option
                  v-for="(item, index) in inspectTypeEnums"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="getLabelName('relateDocumentType', '关联单据类型')"
              prop="relateDocumentType"
              :rules="$FR(fieldPath, 'relateDocumentType')"
            >
              <el-select
                v-model="formInline.relateDocumentType"
                placeholder="请选择"
                size="mini"
                :disabled="
                  !isAddType ||
                  $FC('relateDocumentType', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
                @change="changeRelateDocumentType"
              >
                <el-option v-for="(item, index) in documentEnums" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="!isAddType"
              :label="getLabelName('status', '单据状态')"
              prop="status"
              :rules="$FR(fieldPath, 'status')"
            >
              <el-select v-model="formInline.status" placeholder="请选择" size="mini">
                <!-- :disabled="$FC('status', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false" -->
                <el-option
                  v-for="(item, index) in statusEnums"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="送检部门:" prop="departmentId" clear-validate>
              <el-cascader
                v-model="formInline.departmentId"
                :props="{ checkStrictly: true }"
                :options="treeData"
                clearable
                filterable
                :disabled="$FC('remark', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false"
              />
            </el-form-item>
            <el-form-item label="检验人:" prop="inspectPerson">
              <el-select v-model="formInline.inspectPerson" filterable placeholder="请选择" clearable size="small">
                <el-option
                  v-for="(item, index) in checkPeopleList"
                  :key="index"
                  :label="item.nickname"
                  :value="item.username"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="getLabelName('remark', '备注')" prop="remark" :rules="$FR(fieldPath, 'remark')">
              <el-input
                v-model="formInline.remark"
                size="mini"
                clearable
                :disabled="$FC('remark', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false"
              />
            </el-form-item>

            <el-form-item
              v-if="$FC('inspect_extend_field_one', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true"
              :label="getLabelName('inspect_extend_field_one', '拓展字段1')"
              prop="inspectExtendFieldOne"
              :rules="$FR(fieldPath, 'inspect_extend_field_one')"
            >
              <el-input
                v-if="inspectExtendFieldOneList.inputType === 'input'"
                v-model="formInline.inspectExtendFieldOne"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_one', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldOneList.inputType === 'select'"
                v-model="formInline.inspectExtendFieldOne"
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
              v-if="$FC('inspect_extend_field_two', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true"
              :label="getLabelName('inspect_extend_field_two', '拓展字段2')"
              prop="inspectExtendFieldTwo"
              :rules="$FR(fieldPath, 'inspect_extend_field_two')"
            >
              <el-input
                v-if="inspectExtendFieldTwoList.inputType === 'input'"
                v-model="formInline.inspectExtendFieldTwo"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_two', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldTwoList.inputType === 'select'"
                v-model="formInline.inspectExtendFieldTwo"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_two', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
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
              v-if="
                $FC('inspect_extend_field_three', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true
              "
              :label="getLabelName('inspect_extend_field_three', '拓展字段3')"
              prop="inspectExtendFieldThree"
              :rules="$FR(fieldPath, 'inspect_extend_field_three')"
            >
              <el-input
                v-if="inspectExtendFieldThreeList.inputType === 'input'"
                v-model="formInline.inspectExtendFieldThree"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_three', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldThreeList.inputType === 'select'"
                v-model="formInline.inspectExtendFieldThree"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_three', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
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
              v-if="
                $FC('inspect_extend_field_four', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true
              "
              :label="getLabelName('inspect_extend_field_four', '拓展字段4')"
              prop="inspectExtendFieldFour"
              :rules="$FR(fieldPath, 'inspect_extend_field_four')"
            >
              <el-input
                v-if="inspectExtendFieldFourList.inputType === 'input'"
                v-model="formInline.inspectExtendFieldFour"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_four', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldFourList.inputType === 'select'"
                v-model="formInline.inspectExtendFieldFour"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_four', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
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
              v-if="
                $FC('inspect_extend_field_five', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isShow === true
              "
              :label="getLabelName('inspect_extend_field_five', '拓展字段5')"
              prop="inspectExtendFieldFive"
              :rules="$FR(fieldPath, 'inspect_extend_field_five')"
            >
              <el-input
                v-if="inspectExtendFieldFiveList.inputType === 'input'"
                v-model="formInline.inspectExtendFieldFive"
                size="mini"
                :disabled="
                  $FC('inspect_extend_field_five', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
                "
              />
              <!-- 下拉选择类型 -->
              <el-select
                v-else-if="inspectExtendFieldFiveList.inputType === 'select'"
                v-model="formInline.inspectExtendFieldFive"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
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
        </el-form>
      </div>

      <div class="scroll" :style="{ height: height }">
        <!-- 下半部分：检验物料和物料信息tabs -->
        <div class="bottom-container">
          <!-- 物料列表 -->
          <DetailedLIst
            v-show="isOpenBaseInfoLeft"
            ref="DetailedLIstRef"
            class="bottom-container-left"
            :style="{ width: isOpenBaseInfoLeft, display: isOpenBaseInfoLeft === '0%' ? 'none' : 'block' }"
            :base-form="formInline"
            :current-row.sync="currentRow"
            :click-index.sync="clickIndex"
            :interface-record="interfaceRecord"
            :init-status="initStatus"
          />

          <div v-if="!noSelectRow" class="bottom-container-right" :style="{ width: isOpenBaseInfoRight }">
            <!-- 左移/右移箭头 -->
            <img
              v-if="showArrow"
              class="left-arrow"
              src="@/assets/images/common/left-arrow.png"
              alt=""
              width="22"
              height="34"
              @click="handleArrow('left')"
            >
            <img
              v-if="!showArrow"
              class="left-arrow"
              src="@/assets/images/common/right-arrow.png"
              alt=""
              width="22"
              height="34"
              @click="handleArrow('right')"
            >

            <!-- tabs -->
            <div class="tabs-container">
              <!-- 当检验物料左边隐藏时，展示当前的物料行 -->
              <div class="single-material-line">
                <div class="single-material-line-container">
                  <span class="blue-text line">{{ currentRow.materialName }}</span>
                  <span class="line gutter">{{ currentRow.materialCode }}</span>
                  <span class="line gutter">规格:{{ currentRow.materialStandard }}</span>
                  <span
                    class="gutter"
                  >关联:{{ formInline.relateDocumentTypeName }}{{ currentRow.relateDocumentCode }}</span>
                </div>
                <!-- 切换上一个物料 -->
                <div v-if="!showArrow" class="img-up">
                  <div class="material-button" @click="changeRow('previous')">上一个</div>
                </div>
                <!-- 切换下一个物料 -->
                <div v-if="!showArrow" class="img-down">
                  <div class="material-button" @click="changeRow('next')">下一个</div>
                </div>
              </div>

              <div class="option-and-add">
                <div class="radio">
                  <CommonRadioGroup class="CommonRadioGroup" :tab-value.sync="tabValue" :radio-list="radioList" />
                </div>
                <div v-if="tabValue === 'inspectionItems'" class="sample-add">
                  <i
                    class="el-icon-circle-plus-outline"
                    :style="isDetailType ? {} : { color: '#1890ff', cursor: 'pointer' }"
                    @click="addInspectionSample"
                  />
                  <span @click="addInspectionSample">样次</span>
                </div>
              </div>

              <el-tabs v-model="tabValue" class="noShowHeader" style="height: 100%">
                <el-tab-pane :label="radioList[0].label" :name="radioList[0].value">
                  <materialInfo
                    ref="MaterialInfoRef"
                    :base-form="formInline"
                    :current-row="currentRow"
                    :click-index="clickIndex"
                    :init-status="initStatus"
                    @changeRow="changeRow"
                    @updateProject="updateProject"
                    @updateSample="updateSample"
                  />
                </el-tab-pane>
                <el-tab-pane :label="radioList[1].label" :name="radioList[1].value">
                  <InspectionItems
                    ref="InspectionItems"
                    :current-row="currentRow"
                    :click-index="clickIndex"
                    :init-status="initStatus"
                    style="height: calc(100vh - 300px)"
                    @changeRow="changeRow"
                    @handleScrollToBottom="handleScrollToBottom"
                  />
                </el-tab-pane>
                <el-tab-pane :label="radioList[2].label" :name="radioList[2].value">
                  <DefectRecords :current-row="currentRow" :click-index="clickIndex" @changeRow="changeRow" />
                </el-tab-pane>
                <el-tab-pane :label="radioList[3].label" :name="radioList[3].value">
                  <InspectionProgram
                    ref="InspectionProgramRef"
                    :base-form="formInline"
                    :current-row="currentRow"
                    :click-index="clickIndex"
                    :init-status="initStatus"
                    @changeRow="changeRow"
                  />
                </el-tab-pane>
                <el-tab-pane v-if="showDecisions" :label="radioList[4].label" :name="radioList[4].value">
                  <checkoutDecision
                    ref="checkoutDecisionRef"
                    :current-row="currentRow"
                    :click-index="clickIndex"
                    :show-decisions="showDecisions"
                    :form-inline="formInline"
                    @changeRow="changeRow"
                  />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 编码规则 -->
    <common-code-rule-dialog
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="91"
      is-open-reg-disabled-space
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    />
  </div>
</template>

<script>
import { getDepartmentsTree, getCheckPerson } from '@/api/quality-manage'
import { isExistApprove } from '@/api/examineApprove.js'
// 枚举常量
import { getStatusEnums, getInspectTypeEnumsByConfig, getDocumentEnums } from '@/api/quality-manage.js'
import { addInspection, releasedInspection, inspectUpdate, deleteNum } from '@/api/quality-manage.js'
import { getInspectDetail } from '@/api/quality-manage.js'
import CommonRadioGroup from '@/components/CommonRadioGroup/index.vue'
import DetailedLIst from './detailedLIst/detailedLIst.vue'
import materialInfo from './tabPages/materialInfo/index.vue'
import InspectionProgram from './tabPages/inspectionProgram/index.vue'
import InspectionItems from './tabPages/inspectionItems/index.vue'
import DefectRecords from './tabPages/defectRecords/index.vue'
import checkoutDecision from './tabPages/checkoutDecision/index.vue'
import { apiTransformTrigger } from '@/api/base' // 触发配置的api
import { mapGetters } from 'vuex'
const FULLROUTECODE = '/inspection-manage/qms-product-inspection/productInspection' // 当前模块配置关键字
// let PAGEFULLPATHCODE = 'qms.qmsInsepct.qmsInsepctDetail' // 当前页配置关键字

const PAGEFULLPATHCODE = new Map([
  // 都通过详情接口获取
  ['Add', 'qms.qmsInsepct.qmsInsepctAdd'],
  // ['Edit', 'qms.qmsInsepct.qmsInsepctEdit.qmsInsepctEditByCreate'],
  ['1', 'qms.qmsInsepct.qmsInsepctEdit.qmsInsepctEditByCreate'],
  ['2', 'qms.qmsInsepct.qmsInsepctEdit.qmsInsepctEditByRelease'],
  ['3', 'qms.qmsInsepct.qmsInsepctEdit.qmsInsepctEditByFinished'],
  ['4', 'qms.qmsInsepct.qmsInsepctEdit.qmsInsepctEditByDisuse'],
  ['Detail', 'qms.qmsInsepct.qmsInsepctDetail']
]) // 当前页配置关键字 (状态不同则不同)

export default {
  components: {
    CommonRadioGroup,
    DetailedLIst,
    InspectionProgram,
    InspectionItems,
    DefectRecords,
    materialInfo,
    checkoutDecision
  },
  provide() {
    return {
      sheetInitStatus: () => this.sheetInitStatus
    }
  },
  data() {
    return {
      tabValue: 'materialInfo',
      formInline: {
        code: '',
        type: '',
        relateDocumentType: '',
        status: '',
        remark: '',
        createByName: '',
        createTime: '',
        updateByName: '',
        updateTime: '',
        inspectExtendFieldOne: '',
        inspectExtendFieldTwo: '',
        inspectExtendFieldThree: '',
        inspectExtendFieldFour: '',
        inspectExtendFieldFive: ''
      },
      rules: {
        code: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }],
        type: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }]
        // relateDocumentType: [{ required: true, message: '该参数是必填项', trigger: ['change'] }]
      },
      interfaceRecord: {},
      isExistApproveBtn: false, // 是否开启审批
      statusEnums: [],
      inspectTypeEnums: [],
      documentEnums: [],
      currentRow: {},
      clickIndex: -1,
      isAutoOpen: false,
      initStatus: 1,
      openDecisionInspectTypes: [],
      isOpenBaseInfoLeft: '100%',
      isOpenBaseInfoRight: '0%',
      showArrow: true,
      height: undefined,
      initPageCode: undefined,
      FULLROUTECODE,
      PAGEFULLPATHCODE,
      checkPeopleList: [], // 送检人
      treeData: [], // 送检部门

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
      }
    }
  },
  computed: {
    ...mapGetters(['fieldRuleDetail']),
    // 页面字段配置关键字
    fieldPath() {
      return {
        fullRouteCode: FULLROUTECODE,
        pageFullPathCode: PAGEFULLPATHCODE.get(this.initPageCode)
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
    sheetInitStatus() {
      return this.initStatus === 3 || this.initStatus === 4
    },
    radioList() {
      const list = [
        { label: '物料信息', value: 'materialInfo' },
        { label: '检验项目', value: 'inspectionItems' },
        { label: '缺陷记录', value: 'defectRecords' },
        { label: '综合判定', value: 'inspectionProgram' },
        { label: '检验决策', value: 'checkoutDecision' }
      ]
      if (!this.showDecisions) return list.filter(item => item.value !== 'checkoutDecision')
      return list
    },
    showDecisions() {
      let existDecision = 0
      const inspectMaterialProcess = this.currentRow?.inspectMaterialProcess
      if (inspectMaterialProcess) {
        existDecision = inspectMaterialProcess.existDecision
      }
      return !!existDecision
      // return this.openDecisionInspectTypes.includes(this.formInline.type)
    },
    noSelectRow() {
      return this.clickIndex === -1
    }
  },
  watch: {
    fieldRuleDetail: {
      handler(newVal) {
        // 动态字段配置有值则更新字段
        if (this.initPageCode) {
          this.initInspectExtendField()
          // Object.keys(newVal?.[FULLROUTECODE] || {}).length
          //  && this.initFields()
        }
      },
      deep: true,
      immediate: true
    },
    // tabs选择后
    tabValue: {
      async handler(val) {
        const { id } = this.$route.query
        if (this.interfaceRecord[val] || (this.isAddType && !id)) return
        this.interfaceRecord[val] = true
      },
      immediate: true
    },
    // 选择物料后，tabs要出来
    noSelectRow: {
      async handler(val) {
        if (!val) {
          this.isOpenBaseInfoLeft = '30%'
          this.isOpenBaseInfoRight = '70%'
        } else {
          this.isOpenBaseInfoLeft = '100%'
          this.isOpenBaseInfoRight = '0%'
        }
      },
      immediate: true
    },
    // 根据检验类型获得关联单据类型枚举
    'formInline.type'(val) {
      this.getDocumentEnums(val)
      if (this.isAddType && !this.isCopyType) {
        this.formInline.relateDocumentType = ''
      }
    }
  },
  created() {
    this.init()

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
  },
  mounted() {
    // 禁止修改
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 1500)
    }
    if (this.isAddType) {
      // 打开编码规则弹窗
      this.isAutoOpen = true
    }

    if (this.isEditType || this.isDetailType) {
      this.getInspectDetail()
    }

    // 复制
    if (this.isCopyType) {
      this.getCopyInspectDetail()
    }

    this.getDepartmentsTree()
    this.getCheckPerson()

    // 获取下方的高度
    this.adjustContainerHeight()

    this.initInspectExtendField()
  },
  methods: {
    // 送检部门列表
    getDepartmentsTree() {
      getDepartmentsTree().then(res => {
        if (res.data.code === '200') {
          this.treeData = res.data.data
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || '获取用户列表失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 获取送检人
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
    // 获取扩展字段的类型和选项
    initInspectExtendField() {
      // 获取扩展字段的类型和选项
      this.getOptions('inspect_extend_field_one', 'inspectExtendFieldOneList')
      // console.log('获取数据 1111111111111', this.inspectExtendFieldOneList)

      this.getOptions('inspect_extend_field_two', 'inspectExtendFieldTwoList')
      // console.log('获取数据 2222222222', this.inspectExtendFieldTwoList)

      this.getOptions('inspect_extend_field_three', 'inspectExtendFieldThreeList')
      // console.log('获取数据 3333333', this.inspectExtendFieldThreeList)

      this.getOptions('inspect_extend_field_four', 'inspectExtendFieldFourList')
      // console.log('获取数据 4444444444444', this.inspectExtendFieldFourList)

      this.getOptions('inspect_extend_field_five', 'inspectExtendFieldFiveList')
      // console.log('获取数据55555555555555', this.inspectExtendFieldFiveList)
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
        console.log('获取数据的选项 val 2', val)
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
      console.log('返回得知 list', list)
      console.log('返回得知 this[list]', this[list])
    },
    getLabelName(prop, name, noColon = 1) {
      let label = this.$FN(this.fieldPath, prop, name).replace(/:/g, '')
      // 是否要加上冒号
      label += noColon ? ':' : ''
      return label
    },
    adjustContainerHeight() {
      const header = document.getElementById('header')
      const headerHeight = header.offsetHeight
      // 设置下方区域的高度
      this.height = `calc(100vh - ${headerHeight}px)`
    },
    // 初始化
    init() {
      this.getStatusEnums()
      this.getInspectTypeEnums()
      this.isAllowApprove()
    },
    // 获取状态枚举
    async getStatusEnums() {
      const result = await getStatusEnums()
      const { data } = result.data || []
      this.statusEnums = data || []
    },
    // 获取检验类型枚举
    async getInspectTypeEnums() {
      const result = await getInspectTypeEnumsByConfig()
      const { data } = result.data || []
      this.inspectTypeEnums = data.inspectTypes || []
      this.openDecisionInspectTypes = data.openDecisionInspectTypes
      if (this.isAddType) {
        this.formInline.type = data.defaultInspectType
      }
    },
    // 获取关联单据枚举
    async getDocumentEnums(type) {
      const result = await getDocumentEnums(type)
      const { data } = result.data || []
      this.documentEnums = data
    },
    // 获取审批权限
    async isAllowApprove() {
      const res = await isExistApprove('inspectOrder')
      const { data } = res.data || {}
      this.isExistApproveBtn = data
    },
    // 切换编码规则
    async handleResetCode() {
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    handleConfirmCodeRuleDialog(code) {
      if (this.isAddType) {
        this.formInline.code = code
      }
    },
    // 切换行
    changeRow(flag) {
      this.$refs.DetailedLIstRef.changeRow(flag)
    },
    // 获取检验单详情
    getInspectDetail() {
      const { id } = this.$route.query
      getInspectDetail(id)
        .then(res => {
          const data = res.data.data
          this.formInline.id = data.id
          this.formInline.code = data.code
          this.formInline.type = data.type
          this.formInline.relateDocumentType = data.relateDocumentType
          this.formInline.relateDocumentTypeName = data.relateDocumentTypeName
          this.formInline.remark = data.remark
          this.formInline.status = data.status
          console.log('获取获取检验单详情 22', this.formInline.status)

          this.formInline.inspectExtendFieldOne = data.inspectExtendFieldOne
          this.formInline.inspectExtendFieldTwo = data.inspectExtendFieldTwo
          this.formInline.inspectExtendFieldThree = data.inspectExtendFieldThree
          this.formInline.inspectExtendFieldFour = data.inspectExtendFieldFour
          this.formInline.inspectExtendFieldFive = data.inspectExtendFieldFive
          this.initStatus = data.status
          // this.initPageCode = this.initStatus
          this.$refs.DetailedLIstRef.handleEcho(data.materials)
          // 获取操作记录
          this.formInline.createByName = data.createByName
          this.formInline.createTime = data.createTime
          this.formInline.updateByName = data.updateByName
          this.formInline.updateTime = data.updateTime

          // 禁用状态选项
          this.disabledStatusEnums()
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 复制-获取检验单详情
    getCopyInspectDetail() {
      const { id } = this.$route.query
      getInspectDetail(id)
        .then(res => {
          const data = res.data.data
          // this.formInline.id = data.id
          // this.formInline.code = data.code
          this.formInline.type = data.type
          this.formInline.relateDocumentType = data.relateDocumentType
          this.formInline.relateDocumentTypeName = data.relateDocumentTypeName
          this.formInline.remark = data.remark
          // this.formInline.status = data.status
          // this.formInline.inspectExtendFieldOne = data.inspectExtendFieldOne
          // this.formInline.inspectExtendFieldTwo = data.inspectExtendFieldTwo
          // this.formInline.inspectExtendFieldThree = data.inspectExtendFieldThree
          // this.formInline.inspectExtendFieldFour = data.inspectExtendFieldFour
          // this.formInline.inspectExtendFieldFive = data.inspectExtendFieldFive
          // this.initStatus = data.status
          this.$refs.DetailedLIstRef.handleCopyEcho(data.materials)
          // 获取操作记录
          // this.formInline.createByName = data.createByName
          // this.formInline.createTime = data.createTime
          // this.formInline.updateByName = data.updateByName
          // this.formInline.updateTime = data.updateTime

          // 禁用状态选项
          // this.disabledStatusEnums()
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 禁用状态选项
    disabledStatusEnums() {
      if (this.initStatus === 1) {
        this.statusEnums.forEach(item => {
          if (item.code === 3 || (this.isExistApproveBtn && item.code === 2)) {
            item.disabled = true
          }
        })
      }
      if (this.initStatus === 2) {
        this.statusEnums.forEach(item => {
          if (item.code === 1) {
            item.disabled = true
          }
        })
      }
      if (this.initStatus === 3) {
        this.statusEnums.forEach(item => {
          if (item.code === 1 || item.code === 2) {
            item.disabled = true
          }
        })
      }
      if (this.initStatus === 4) {
        this.statusEnums.forEach(item => {
          item.disabled = true
        })
      }
      if (this.sheetInitStatus) {
        setTimeout(() => {
          this.$disableInputDetail()
        }, 1000)
      }
    },
    // 构建复制的传参数据结构
    generateCopySaveParams() {
      let params = {}
      const detailTableData = this.$refs.DetailedLIstRef.formInline.detailTableData
      const materials = detailTableData.map((row, index) => {
        delete row.id
        // 检验附件
        // const inspectFiles = row?.inspectFiles?.map(item => {
        //   return {
        //     compactor: item.compactor,
        //     fileName: item.fileName,
        //     fileType: item.fileType,
        //     fileUrl: item.fileUrl,
        //     remark: item.remark
        //   }
        // })
        // console.log('检验附件', inspectFiles)

        // 检验决策 materialDecisions
        // const materialDecisions = row?.materialDecisions?.map(item => {
        //   return {
        //     quantity: item.quantity,
        //     decisionCode: item.decisionCode,
        //     statusName: item.statusName,
        //     remark: item.remark
        //   }
        // })

        // 缺陷记录
        // const materialDefects = row?.materialDefects?.map(item => {
        //   return {
        //     defectCode: item.defectCode,
        //     defectName: item.defectName,
        //     defectNum: item.defectNum,
        //     defectLevel: item.defectLevel,
        //     defectReasonCode: item.defectReasonCode,
        //     defectResultCode: item.defectResultCode,
        //     researchReviewFlag: item.researchReviewFlag,
        //     correctiveMeasure: item.correctiveMeasure,
        //     remark: item.remark
        //   }
        // })

        // 样次
        const materialNums =
          row.materialNums?.map(materialNum => {
            delete materialNum.id

            // 样次关联的检验项目
            const numItems = materialNum.numItems.map(item => {
              delete item.id
              // 检验结果可能是数组和字符串
              const checkResult = Array.isArray(item.checkResult) ? item.checkResult.join?.() : item.checkResult
              const reviewResult = Array.isArray(item.reviewResult) ? item.reviewResult.join?.() : item.reviewResult
              const authorizeResult = Array.isArray(item.authorizeResult)
                ? item.authorizeResult.join?.()
                : item.authorizeResult
              // 检验项目中的项目缺陷
              // const itemDefects = item.itemDefects.map(defect => {
              //   const productCodes = defect?.productCodes?.split(',')
              //   return {
              //     ...defect,
              //     productCodes
              //   }
              // })
              // 样本检验值 可能是数组和字符串
              const itemValues = item.itemValues.map(itemValue => {
                delete itemValue.id
                const inspectValue = Array.isArray(itemValue?.inspectValue)
                  ? itemValue.inspectValue.join?.()
                  : itemValue.inspectValue
                const reviewValue = Array.isArray(itemValue?.reviewValue)
                  ? itemValue.reviewValue.join?.()
                  : itemValue.reviewValue
                const authorizeValue = Array.isArray(itemValue?.authorizeValue)
                  ? itemValue.authorizeValue.join?.()
                  : itemValue.authorizeValue

                return {
                  ...itemValue,
                  inspectValue,
                  reviewValue,
                  authorizeValue
                }
              })
              return {
                ...item,
                checkResult,
                reviewResult,
                authorizeResult,
                // optionalValue,
                itemValues
              }
            })
            return {
              ...materialNum,
              numItems
            }
          }) || []
        return {
          ...row,
          materialNums,
          // inspectFiles,
          // materialDecisions,
          // materialDefects,
          lineNumber: index + 1
        }
      })

      params = {
        ...this.formInline,
        materials
      }
      return params
    },
    // 构建新增的传参数据结构
    generateSaveParams() {
      let params = {}
      const detailTableData = this.$refs.DetailedLIstRef.formInline.detailTableData
      const materials = detailTableData.map((row, index) => {
        // 样次
        const materialNums =
          row.materialNums?.map(materialNum => {
            // 样次关联的检验项目
            const numItems = materialNum.numItems.map(item => {
              // 检验结果可能是数组和字符串
              const checkResult = Array.isArray(item.checkResult) ? item.checkResult.join?.() : item.checkResult
              const reviewResult = Array.isArray(item.reviewResult) ? item.reviewResult.join?.() : item.reviewResult
              const authorizeResult = Array.isArray(item.authorizeResult)
                ? item.authorizeResult.join?.()
                : item.authorizeResult
              // 检验项目中的项目缺陷
              const itemDefects = item.itemDefects.map(defect => {
                const productCodes = defect?.productCodes?.split(',')
                return {
                  ...defect,
                  productCodes
                }
              })
              // 样本检验值 可能是数组和字符串
              const itemValues = item.itemValues.map(itemValue => {
                const inspectValue = Array.isArray(itemValue.inspectValue)
                  ? itemValue.inspectValue.join?.()
                  : itemValue.inspectValue
                const reviewValue = Array.isArray(itemValue.reviewValue)
                  ? itemValue.reviewValue.join?.()
                  : itemValue.reviewValue
                const authorizeValue = Array.isArray(itemValue.authorizeValue)
                  ? itemValue.authorizeValue.join?.()
                  : itemValue.authorizeValue

                return {
                  ...itemValue,
                  inspectValue,
                  reviewValue,
                  authorizeValue
                }
              })
              return {
                ...item,
                itemDefects,
                checkResult,
                reviewResult,
                authorizeResult,
                itemValues
              }
            })
            return {
              ...materialNum,
              numItems
            }
          }) || []
        return {
          ...row,
          materialNums,
          lineNumber: index + 1
        }
      })

      params = {
        ...this.formInline,
        materials
      }
      return params
    },
    // 构建新增/编辑的传参数据结构
    async handleSaveBtn() {
      if (this.isAddType) {
        this.handleSave()
        return
      }
      // 生效-->完成 校验决策
      let passValidate = true
      if (this.showDecisions && this.initStatus !== 3 && this.formInline.status === 3) {
        passValidate = await this.validateData()
      }
      passValidate && this.handleEditSave()
    },
    // 检验决策-校验数量和检验结果等
    validateData() {
      return new Promise((resolve, reject) => {
        const detailTableData = this.$refs.DetailedLIstRef.formInline.detailTableData
        const questionRow = []
        detailTableData.forEach((item, index) => {
          // item.materialDecisions 每一行的检验决策
          // 检验决策的合格/不合格数/总数
          let qualifiedNum = 0 // status为1的总和
          let disqualificationNum = 0 // status为0的总和
          let sumNum = 0
          // 哪个不相等标志
          let qualifiedFlag = 0
          let disqualificationFlag = 0
          let sumFlag = 0
          // 提示信息
          let messageTip = ''

          item.materialDecisions &&
            item.materialDecisions.forEach(decision => {
              if (decision.status === 1) {
                qualifiedNum += Number(decision.quantity)
              } else if (decision.status === 0) {
                disqualificationNum += Number(decision.quantity)
              }
            })
          sumNum = Number(qualifiedNum) + Number(disqualificationNum)

          if (qualifiedNum !== item.qualifiedQuantity) {
            qualifiedFlag = 1
            messageTip +=
              '<span style="color: #E6A23C;">检验决策合格总数</span>与物料<span style="color: #409EFF;">合格数量</span>不相等，'
          }
          if (disqualificationNum !== item.unqualifiedQuantity) {
            disqualificationFlag = 1
            messageTip +=
              '<span style="color: #E6A23C;">检验决策不合格总数</span>与物料<span style="color: #409EFF;">不合格数量</span>不相等，'
          }

          if (sumNum !== Number(item.inspectQuantity)) {
            sumFlag = 1
            messageTip +=
              '<span style="color: #E6A23C;">检验决策总数</span>与物料<span style="color: #409EFF;">总数</span>不相等，'
          }

          if (qualifiedFlag || disqualificationFlag || sumFlag) {
            messageTip = item.materialName + '的' + messageTip
            questionRow.push(messageTip)
          }
        })
        console.log('questionRow', questionRow)

        if (questionRow.length > 0) {
          this.$confirm(`${questionRow[0]}是否确认提交？`, '提示', {
            dangerouslyUseHTMLString: true, // 允许使用 HTML
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              resolve(true)
            })
            .catch(() => {
              resolve(false)
            })
        } else {
          resolve(true)
        }
      })
    },
    // 新增-保存数据
    async handleSave() {
      try {
        // 校验tabs信息
        const formOther = []
        // if (this.$refs?.['InspectionItems'] && this.$refs?.['InspectionItems'].$refs?.['newMaterialTableForm']) {
        //   formOther.push({
        //     positionInfo: '检验项目__inspectionItems',
        //     formEntity: this?.$refs?.['InspectionItems'].$refs?.['newMaterialTableForm']
        //   })
        // }
        if (this?.$refs?.['InspectionProgramRef'] && this?.$refs?.['InspectionProgramRef'].$refs?.['projectForm']) {
          formOther.push({
            positionInfo: '综合判定__inspectionProgram',
            formEntity: this?.$refs?.['InspectionProgramRef'].$refs?.['projectForm']
          })
        }
        const validateOptions = {
          // 校验的数组
          forms: [
            {
              positionInfo: '检验单信息',
              formEntity: this?.$refs?.projectForm
            },
            ...formOther
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

        // if (this.$refs.DetailedLIstRef.formInline.detailTableData?.length === 0) {
        //   this.$message.warning('请添加分录明细')
        //   return
        // }
        // await this.$refs['projectForm'].validate()

        // 保存时，需要把样次的输入框清空，并把数组还原
        if (this.$refs['InspectionItems'] && this.$refs['InspectionItems'].inputSearch) {
          this.$refs['InspectionItems'].inputSearch = ''
          await this.$refs['InspectionItems'].handleInputSearch()
        }

        // 综合判定
        // await this.$refs.InspectionProgramRef.$refs.projectForm.validate()

        let params = null
        // 复制
        if (this.isCopyType) {
          params = this.generateCopySaveParams()
        } else {
          params = this.generateSaveParams()
        }
        if (params === false) return
        await addInspection(params)
        this.$notify({
          title: '提示',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.back()
      } catch (error) {
        console.log('error submit!!', error)
      }
    },
    // 保存并且生效
    async savaAndEffective() {
      try {
        // 校验tabs信息
        const formOther = []
        if (this?.$refs?.['InspectionProgramRef'] && this?.$refs?.['InspectionProgramRef'].$refs?.['projectForm']) {
          formOther.push({
            positionInfo: '综合判定__inspectionProgram',
            formEntity: this?.$refs?.['InspectionProgramRef'].$refs?.['projectForm']
          })
        }
        const validateOptions = {
          // 校验的数组
          forms: [
            {
              positionInfo: '检验单信息',
              formEntity: this?.$refs?.projectForm
            },
            ...formOther
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
        // await this.$refs['projectForm'].validate()
        // 保存时，需要把样次的输入框清空，并把数组还原
        if (this.$refs['InspectionItems'] && this.$refs['InspectionItems'].inputSearch) {
          this.$refs['InspectionItems'].inputSearch = ''
          await this.$refs['InspectionItems'].handleInputSearch()
        }

        // 综合判定
        // await this.$refs.InspectionProgramRef.$refs.projectForm.validate()
        let params = null
        // 复制
        if (this.isCopyType) {
          params = this.generateCopySaveParams()
        } else {
          params = this.generateSaveParams()
        }
        await releasedInspection(params)
        this.$notify({
          title: '提示',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.back()
      } catch (error) {
        console.log('error submit!!', error)
      }
    },
    // 编辑数据
    async handleEditSave() {
      try {
        // 校验tabs信息
        const formOther = []
        // 状态从生效到完成时，需要校验样次以及后面的表格
        // if (
        //   this.initStatus !== 3 &&
        //   this.formInline.status === 3 &&
        //   this.$refs?.['InspectionItems'] &&
        //   this.$refs?.['InspectionItems'].$refs?.['newMaterialTableForm']
        // ) {
        //   formOther.push({
        //     positionInfo: '检验项目__inspectionItems',
        //     formEntity: this?.$refs?.['InspectionItems'].$refs?.['newMaterialTableForm']
        //   })
        // }
        // if (
        //   this.initStatus !== 3 &&
        //   this.formInline.status === 3 &&
        //   this.$refs['InspectionItems'].hasSample &&
        //   this.$refs['InspectionItems'].hasCurrentItemRow &&
        //   this.$refs['InspectionItems'].hasCurrentRecordValue &&
        //   this.$refs['InspectionItems'].showSample
        // ) {
        //   formOther.push({
        //     positionInfo: '样本检测值填写__inspectionItems',
        //     formEntity: this.$refs['InspectionItems'].$refs['InspectionSample'].$refs['form']
        //   })
        // }
        if (this?.$refs?.['InspectionProgramRef'] && this?.$refs?.['InspectionProgramRef'].$refs?.['projectForm']) {
          formOther.push({
            positionInfo: '综合判定__inspectionProgram',
            formEntity: this?.$refs?.['InspectionProgramRef'].$refs?.['projectForm']
          })
        }
        const validateOptions = {
          // 校验的数组
          forms: [
            {
              positionInfo: '检验单信息',
              formEntity: this?.$refs?.projectForm
            },
            ...formOther
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

        // await this.$refs['projectForm'].validate()

        // 保存时，需要把样次的输入框清空，并把数组还原
        if (this.$refs['InspectionItems'] && this.$refs['InspectionItems'].inputSearch) {
          this.$refs['InspectionItems'].inputSearch = ''
          await this.$refs['InspectionItems'].handleInputSearch()
        }

        // 状态从生效到完成时，需要校验样次
        // if (this.initStatus !== 3 && this.formInline.status === 3) {
        //   // 样次的表格数据
        //   if (this?.$refs['InspectionItems']?.hasSample) {
        //     let inspectionItems
        //     await this?.$refs['InspectionItems']?.$refs['newMaterialTableForm']?.validate(value => {
        //       inspectionItems = value
        //     })

        //     // 必填项判断
        //     if (!inspectionItems) {
        //       this.$validateConfirm(this.$refs['InspectionItems'].$refs['newMaterialTableForm'])
        //       return
        //     }
        //   }

        //   // 只对当前展示的进行校验，样次下面的表格数据
        //   if (
        //     this.$refs['InspectionItems'].hasSample &&
        //     this.$refs['InspectionItems'].hasCurrentItemRow &&
        //     this.$refs['InspectionItems'].hasCurrentRecordValue &&
        //     this.$refs['InspectionItems'].showSample
        //   ) {
        //     let inspectionSample
        //     this.$refs['InspectionItems'].$refs['InspectionSample'].$refs['form'].validate(value => {
        //       inspectionSample = value
        //     })
        //     // 必填项判断
        //     if (!inspectionSample) {
        //       this.$validateConfirm(this.$refs['InspectionItems'].$refs['InspectionSample'].$refs['form'])
        //       return
        //     }
        //   }
        // }

        // 综合判定
        // await this.$refs.InspectionProgramRef.$refs.projectForm.validate()
        const params = this.generateSaveParams()
        if (params === false) return
        await inspectUpdate(params)
        this.$notify({
          title: '提示',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
        this.back()
      } catch (error) {
        console.log('error submit!!', error)
      }
    },

    // 返回
    back() {
      this.$router.push({
        name: 'productInspection'
      })
    },
    // 左移/右移箭头
    handleArrow(type) {
      if (type === 'left') {
        this.isOpenBaseInfoLeft = '0%'
        this.isOpenBaseInfoRight = '100%'
        this.showArrow = false
      } else if (type === 'right') {
        this.isOpenBaseInfoLeft = '30%'
        this.isOpenBaseInfoRight = '70%'
        this.showArrow = true
      }
    },
    // 滚动条滑动到底部
    // handleScrollToBottom() {
    //   const scrollContainer = document.getElementById('scrollContainer')

    //   const scrollContainer1 = document.getElementById('scrollFirstContainer')
    //   console.log('滚动条滑动到底部', scrollContainer1)
    //   console.log('滚动条滑动到底部 scrollContainer.scrollHeight', scrollContainer1.scrollHeight)

    //   const scrollContainer2 = document.getElementById('scrollSecondContainer')
    //   console.log('滚动条滑动到底部', scrollContainer2)
    //   console.log('滚动条滑动到底部 scrollContainer2.scrollHeight', scrollContainer2.scrollHeight)

    //   const height = scrollContainer1.scrollHeight + scrollContainer2.scrollHeight + 100
    //   console.log('滚动条滑动到底部 height', height)

    //   scrollContainer.scrollTop = height
    // },
    // 滚动条滑动到底部
    handleScrollToBottom() {
      const scrollContainer = document.getElementById('scrollContainer')
      console.log('滚动条滑动到底部 123', scrollContainer)
      console.log('滚动条滑动到底部 123 .scrollHeight', scrollContainer.scrollHeight)

      scrollContainer.scrollTop = scrollContainer.scrollHeight
    },
    // 修改关联单据类型
    changeRelateDocumentType(val) {
      const documentEnumsItem = this.documentEnums.find(item => item.code === val)
      if (documentEnumsItem) {
        this.formInline.relateDocumentTypeName = documentEnumsItem.name
      }
    },
    // 增加样次
    addInspectionSample() {
      this.$refs['InspectionItems'].addInspectionSample()
    },
    // 抽样方案修改后
    // 删除之前的检验项目，注意要调用接口
    // 调用新增接口
    updateProject() {
      const materialNumId = this.currentRow.materialNums.filter(item => item.id).map(item => item.id)
      // console.log('根据送检数量和schemeId生成新的 materialNumId', materialNumId)

      if (materialNumId?.length > 0) {
        deleteNum(materialNumId).then(_ => {})
      }

      this.currentRow.materialNums = []
      // 增加样次
      this.addInspectionSample()
    },
    // 要同步要检验样次中的抽样方案中
    updateSample() {
      // const samplePlanEntity = {
      //   samplePlanId: this.currentRow.samplePlanId,
      //   samplePlanName: this.currentRow.samplePlanName,
      //   inspectLevel: this.currentRow.inspectLevel,
      //   stringency: this.currentRow.stringency,
      //   aqlValue: this.currentRow.aqlValue,
      //   sampleType: this.currentRow.sampleType,
      //   acceptValue: this.currentRow.acceptValue,
      //   refuseValue: this.currentRow.refuseValue,
      //   // 抽样数量
      //   samplingQuantity: this.currentRow.samplingQuantity
      // }
      // this.currentRow.materialNums.forEach(materialNum => {
      //   materialNum.numItems.forEach(numItem => {
      //     this.$set(numItem, 'samplePlanId', samplePlanEntity.samplePlanId)
      //     this.$set(numItem, 'samplePlanName', samplePlanEntity.samplePlanName)
      //     this.$set(numItem, 'inspectLevel', samplePlanEntity.inspectLevel)
      //     this.$set(numItem, 'stringency', samplePlanEntity.stringency)
      //     this.$set(numItem, 'aqlValue', samplePlanEntity.aqlValue)
      //     this.$set(numItem, 'sampleType', samplePlanEntity.sampleType)
      //     this.$set(numItem, 'acceptValue', samplePlanEntity.acceptValue)
      //     this.$set(numItem, 'refuseValue', samplePlanEntity.refuseValue)
      //     this.$set(numItem, 'samplingQuantity', samplePlanEntity.samplingQuantity)
      //     // 更新: 实际样本数=抽样数量
      //     this.$set(numItem, 'actualQuality', samplePlanEntity.samplingQuantity)
      //   })
      // })
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
      // overflow: auto;
      overflow-y: scroll;
      overflow-x: scroll;
    }
    .scroll::-webkit-scrollbar {
      height: 4px; /* 设置滚动条的高度 */
      width: 4px; /* 设置滚动条的宽度 */
      // height: 8px; /* 设置滚动条的高度 */
      // width: 8px; /* 设置滚动条的宽度 */
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
        border-bottom: 1px solid #dfe4ed;
        // border-bottom: 1px solid #d6d6d6;
        margin-bottom: 10px;
        p {
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: 500;
          font-size: 16px;
          color: #333333;
          // font-size: 18px;
          // font-family: Source Han Sans CN;
          // font-weight: bolder;
          // color: #333333;
          flex: 1;
          // line-height: 1;
        }
        .base-info-record {
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: 400;
          font-size: 14px;
          color: #666666;
          margin-right: 64px;
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
    // 单行物料信息
    .single-material-line {
      width: 100%;
      display: flex;
      align-items: center;
      background: #fff;
      line-height: 24px;
      .material-button {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px 2px 2px 2px;
        border: 1px solid #1790ff;
        width: 49px;
        height: 24px;
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        font-size: 12px;
        color: #1790ff;
        text-align: center;
        cursor: pointer;
      }
      .single-material-line-container {
        margin-right: 10px;
      }
      .line {
        border-right: 1px solid #d6d6d6;
        padding-right: 8px;
      }
      .gutter {
        padding: 0 8px;
      }
      .blue-text {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: bold;
        font-size: 16px;
        color: #1890ff;
      }
      .text {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 500;
        font-size: 14px;
        color: #333333;
      }
      .img-up,
      .img-down {
        margin-right: 20px;
      }
      .arrow-up,
      .arrow-down {
        transform: rotate(90deg);
      }
    }

    // 检验物料和物料信息tabs
    .bottom-container {
      width: 100%;
      height: 100%;
      margin-top: 4px;
      display: flex;
      .bottom-container-left {
        // overflow-y: auto;
      }
      .bottom-container-right {
        margin-left: 4px;
        background: white;
        padding: 10px;
        // margin-top: 10px;
        position: relative;
        .left-arrow {
          position: absolute;
          top: 200px;
          left: 0px;
          z-index: 100;
        }
        .tabs-container {
          height: 100%;
        }
      }
    }
    .bottomArea {
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
      border-radius: 4px 4px 4px 4px;
      background: white;
      padding: 12px 0px 9px 18px;
    }
    .bottomArea {
      margin-top: 10px;
    }
  }
  ::v-deep .el-input--mini {
    width: 248px;
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
  ::v-deep .noShowHeader > .el-tabs__header {
    display: none;
  }
  ::v-deep .deleteBtn:not(.is-disabled) {
    color: #f52c27;
  }
}
.option-and-add {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sample-add {
    margin-right: 18px;
    color: #1890ff;
  }
}
</style>
<style>
/* 去掉number输入框的上下箭头 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
/* 解决input number框输入中文后光标上移的问题 */
.el-input__inner {
  line-height: 1px !important;
}
.el-tabs__content {
  /* height: 88%;
  overflow-y: scroll; */
}
.el-tabs__content::-webkit-scrollbar {
  height: 8px; /* 设置滚动条的高度 */
  width: 8px; /* 设置滚动条的宽度 */
}
.el-cascader .el-input .el-input__inner,
.el-input--small .el-input__inner {
  width: 248px;
}
</style>
