<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-10 11:03:27
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-29 16:22:05
-->
<template>
  <div>
    <el-drawer
      ref="drawer"
      size="70%"
      :before-close="handleClose"
      :visible.sync="diaVisible"
      modal
      wrapper-closable
      :modal-append-to-body="false"
      :append-to-body="true"
      custom-class="demo-drawer"
    >
      <template #title> <div class="drawer-title">检验详情</div> </template>

      <div class="demo-drawer__content">
        <el-divider />
        <!-- tabs -->
        <CommonRadioGroup class="CommonRadioGroup" :tab-value.sync="tabValue" :radio-list="radioList" />
        <el-tabs v-model="tabValue" class="noShowHeader">
          <el-tab-pane :label="radioList[0].label" :name="radioList[0].value">
            <div class="form-box">
              <el-form
                ref="projectForm"
                :inline="true"
                :model="currentItemRow"
                class="demo-form-inline"
                label-position="right"
                label-width="110px"
              >
                <section class="centerArea">
                  <el-form-item label="检验项目:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.itemName }}</div> -->
                    <el-input
                      v-model="currentItemRow.itemName"
                      style="width: 248px"
                      :disabled="!inspectionItemShow||isDetailType"
                    />
                  </el-form-item>
                  <el-form-item label="检验标准:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.verificationBasis }}</div> -->
                    <el-input
                      v-model="currentItemRow.verificationBasis"
                      style="width: 248px"
                      :disabled="!inspectionItemShow||isDetailType"
                    />
                  </el-form-item>
                  <el-form-item label="检验项目组:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.itemGroupName }}</div> -->
                    <el-input
                      v-model="currentItemRow.itemGroupName"
                      style="width: 248px"
                      disabled
                    />
                    <!-- <el-select
                      v-model="currentItemRow.groupId"
                      style="width: 248px"
                      placeholder="请选择"
                      filterable
                      clearable
                      :disabled="!inspectionItemShow||isDetailType"
                    >
                      <el-option v-for="(item, index) in groupList" :key="index" :label="item.groupName" :value="item.id" />
                    </el-select>-->
                  </el-form-item>
                  <el-form-item label="分析方法:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.analyzeMethodName }}</div> -->
                    <el-select
                      v-model="currentItemRow.analyzeMethod"
                      style="width: 248px"
                      placeholder="请选择"
                      clearable
                      :disabled="!inspectionItemShow||isDetailType"
                      @change="changeMethod"
                    >
                      <el-option
                        v-for="(item, index) in methodsList"
                        :key="index"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="检验仪器:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.verificationInstrument }}</div> -->
                    <!-- <el-input
                      v-model="currentItemRow.verificationInstrument"
                      style="width: 248px"
                      :disabled="!inspectionItemShow||isDetailType"
                    /> -->
                    <y-complexSelect3
                      v-model="currentItemRow.verificationInstrument"
                      style="width: 248px"
                      :disabled="!inspectionItemShow||isDetailType"
                      :value-key="'instrumentCode'"
                      :label-key="'instrumentName'"
                      :keyword-key="'instrumentName'"
                      @btnClickCallback="showDialogInstrument = true"
                      @selectChange="(e, options) => changeInstrument(e, options)"
                    />
                  </el-form-item>
                  <el-form-item label="检验方法:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.verificationMethod }}</div> -->
                    <el-input
                      v-model="currentItemRow.verificationMethod"
                      style="width: 248px"
                      :disabled="!inspectionItemShow||isDetailType"
                    />
                  </el-form-item>
                  <el-form-item label="检验条件:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.inspectionCondition }}</div> -->
                    <el-input
                      v-model="currentItemRow.inspectionCondition"
                      style="width: 248px"
                      :disabled="!inspectionItemShow||isDetailType"
                    />
                  </el-form-item>
                  <el-form-item label="单位:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.unit }}</div> -->
                    <el-select v-model="currentItemRow.unit" style="width: 248px" placeholder="请选择单位" :disabled="!inspectionItemShow||isDetailType" clearable>
                      <el-option v-for="item in unitList" :key="item.name" :label="item.name" :value="item.name" />
                    </el-select>
                  </el-form-item>

                  <!-- <el-form-item label="参考值:">
                    <div style="width: 248px">{{ $showReferenceValue(currentItemRow) }}</div>
                  </el-form-item> -->
                  <el-form-item label="检验项备注:" class="gutter">
                    <el-input
                      v-model="currentItemRow.remark"
                      style="width: 248px"
                      :rows="2"
                      show-word-limit
                      type="textarea"
                      size="mini"
                      :disabled="isDetailType"
                    />
                  </el-form-item>
                </section>
                <el-divider />

                <section class="centerArea" style="margin-top: 18px">
                  <div class="centerArea-title">抽样方案</div>
                  <el-form-item class="gutter" label="抽样方案:" prop="samplePlanName">
                    <y-complexSelect
                      v-model="currentItemRow.samplePlanName"
                      style="width: 248px"
                      :disabled="initStatus !== 1 || isDetailType"
                      @btnClickCallback="showDialog = true"
                      @selectChange="(e, options) => changeMaterialCode(e, options)"
                    />

                    <!-- <el-input v-model="currentItemRow.samplePlanName" class="no-border-radius" disabled>
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                        :disabled="initStatus !== 1 || isDetailType"
                        @click="showDialog = true"
                      />
                    </el-input> -->
                  </el-form-item>

                  <el-form-item label="抽样类型:" prop="sampleType" class="gutter">
                    <el-select v-model="currentItemRow.sampleType" style="width: 248px" disabled size="mini">
                      <el-option v-for="item in typeList" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="检验水平:" prop="inspectLevel" class="gutter">
                    <el-select v-model="currentItemRow.inspectLevel" style="width: 248px" disabled size="mini">
                      <el-option v-for="item in levelTypeList" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="严格度:" prop="stringency" class="gutter">
                    <el-select v-model="currentItemRow.stringency" style="width: 248px" disabled size="mini">
                      <el-option
                        v-for="item in sternWidthLevelList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="AQL:" prop="aqlValue" class="gutter">
                    <el-select v-model="currentItemRow.aqlValue" style="width: 248px" disabled size="mini">
                      <el-option v-for="item in aqlTypeList" :key="item.code" :label="item.name" :value="item.name" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="允收数/拒收数:" style="width: 248px">
                    <!-- {{ currentItemRow.acceptValue + '/' + currentItemRow.refuseValue }} -->
                    {{ (currentItemRow.acceptValue || 0) + '/' + (currentItemRow.refuseValue || 0) }}
                  </el-form-item>
                  <div style="margin-bottom: 18px">
                    <el-divider />
                  </div>
                  <el-form-item label="抽样数量:" class="gutter">
                    <el-input
                      v-model="currentItemRow.samplingQuantity"
                      style="width: 248px"
                      class="hide-spinners"
                      type="number"
                      :min="0"
                      :disabled="isDetailType"
                      @change="changeInspectQuantity($event, currentItemRow)"
                    />
                  </el-form-item>
                  <el-form-item label="实际样本数:" class="gutter">
                    <el-input
                      v-model="currentItemRow.actualQuality"
                      style="width: 248px"
                      class="hide-spinners"
                      type="number"
                      :min="0"
                      :disabled="isDetailType"
                    />
                  </el-form-item>
                  <el-form-item label="样本不合格数:" class="gutter">
                    <el-input
                      v-model="currentItemRow.unqualifiedQuantity"
                      style="width: 248px"
                      class="hide-spinners"
                      type="number"
                      :min="0"
                      :disabled="isDetailType || !currentItemRow.samplePlanName"
                    />
                  </el-form-item>
                </section>
                <!-- 定量分析时显示 -->
                <section
                  v-if="currentItemRow.analyzeMethod === 'quantitative'"
                  class="centerArea"
                  style="margin-top: 18px"
                >
                  <div class="centerArea-title">检测值参考</div>
                  <el-form-item label="标准/参考值:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.referenceValue || '-' }}</div> -->
                    <el-input
                      v-model="currentItemRow.referenceValue"
                      style="width: 248px"
                      :disabled="!inspectionItemShow||isDetailType"
                    />
                  </el-form-item>
                  <el-form-item label="比较符:" class="gutter">
                    <el-select
                      v-model="currentItemRow.comparator"
                      style="width: 248px"
                      size="mini"
                      clearable
                      :disabled="!inspectionItemShow||isDetailType"
                    >
                      <el-option
                        v-for="(item, index) in comparatorList"
                        :key="index"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="上限值:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.upperLimitValue || '-' }}</div> -->
                    <el-input
                      v-model="currentItemRow.upperLimitValue"
                      style="width: 248px"
                      :disabled="!inspectionItemShow||isDetailType"
                      @change="changeNum($event, 'upperTolerance', 'referenceValue', '3')"
                    />
                  </el-form-item>
                  <el-form-item label="下限值:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.downLimitValue || '-' }}</div> -->
                    <el-input
                      v-model="currentItemRow.downLimitValue"
                      style="width: 248px"
                      :disabled="!inspectionItemShow||isDetailType"
                      @change="changeNum($event, 'lowerTolerance', 'referenceValue', '4')"
                    />
                  </el-form-item>
                  <el-form-item label="上公差:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.upperTolerance || '-' }}</div> -->
                    <NumberInput
                      v-model="currentItemRow.upperTolerance"
                      style="width: 248px"
                      clearable
                      size="mini"
                      :disabled="!inspectionItemShow||isDetailType"
                      @change="changeNum($event, 'upperLimitValue', 'referenceValue', '1')"
                    />
                  </el-form-item>
                  <el-form-item label="下公差:" class="gutter">
                    <!-- <div style="width: 248px">{{ currentItemRow.lowerTolerance || '-' }}</div> -->
                    <NumberInput
                      v-model="currentItemRow.lowerTolerance"
                      style="width: 248px"
                      clearable
                      size="mini"
                      :disabled="!inspectionItemShow||isDetailType"
                      @change="changeNum($event, 'downLimitValue', 'referenceValue', '2')"
                    />
                  </el-form-item>
                  <div style="margin-bottom: 18px">
                    <el-divider />
                  </div>
                </section>

                <section class="centerArea">
                  <div class="centerArea-title">检验相关配置</div>
                  <div class="configuration">
                    <el-checkbox
                      v-model="currentItemRow.importantInspection"
                      :true-label="1"
                      :false-label="0"
                      :disabled="isDetailType"
                    >重点检验项</el-checkbox>
                    <div class="hint">
                      <i class="el-icon-warning-outline" />
                      <span>启用后，该检验项需重点关注</span>
                    </div>
                  </div>
                  <!-- <div class="configuration">
                    <el-checkbox
                      v-model="currentItemRow.required"
                      :true-label="1"
                      :false-label="0"
                      :disabled="isDetailType"
                      >设为必检项</el-checkbox
                    >
                    <div class="hint">
                      <i class="el-icon-warning-outline" />
                      <span>启用后，在小程序中该检验项不允许关闭</span>
                    </div>
                  </div> -->
                  <div class="configuration">
                    <el-checkbox
                      v-model="currentItemRow.recordInspectionValue"
                      :true-label="1"
                      :false-label="0"
                      :disabled="isDetailType"
                      @change="changeRecordInspectionValue"
                    >记录样本检验值
                    </el-checkbox>
                    <div class="hint">
                      <i class="el-icon-warning-outline" />
                      <span>启用后，该检验项需要填写各项样本检测值；取消勾选将清空已有的样本检测值数据</span>
                    </div>
                  </div>
                </section>
                <el-divider />
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="radioList[1].label" :name="radioList[1].value">
            <attachments :current-item-row="currentItemRow" />
          </el-tab-pane>

          <el-tab-pane :label="radioList[2].label" :name="radioList[2].value">
            <itemDefect :current-item-row="currentItemRow" />
          </el-tab-pane>
        </el-tabs>

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="confirmForm">确 定</el-button>
        </div>
      </div>
    </el-drawer>

    <CommonSelectDialogPlus
      v-if="showDialog"
      title="抽样方案"
      :request-config="{
        url: 'qms/product/v1/sample/planes/list',
        method: 'post'
      }"
      :column-config="tableColumn"
      :extra-params="{ statues: [1], filter: true }"
      :visible="showDialog"
      :append-to-body="true"
      @confirm="handleSampleConfirm"
      @cancel="showDialog = false"
    />

    <CommonSelectDialogPlus
      v-if="showDefectDialog"
      title="选择缺陷"
      :request-config="{
        url: 'qms/product/v1/defects/list',
        method: 'post'
      }"
      :extra-params="{ statues: [1] }"
      :column-config="tableDefectColumn"
      :visible="showDefectDialog"
      :append-to-body="true"
      @confirm="handleDefectConfirm"
      @cancel="showDefectDialog = false"
    />

    <el-dialog title="批量标记单品码" :visible.sync="dialogVisible" width="30%" append-to-body>
      <div class="defectDialog">
        单品码：
        <el-input v-model="batchCode" placeholder="请输入内容" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBatch">确 定</el-button>
      </span>
    </el-dialog>

    <ViewImagesDialog v-if="imageVisible" :visible="imageVisible" :image-list="imageList" @closeDailog="closeDailog" />

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
import CommonRadioGroup from '@/components/CommonRadioGroup/index.vue'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import DefectTable from '@/views/quality_management/inspectionSheet/newInspectionSheetPage/tabPages/inspectionItems/inspectionSample/defectTable.vue'
import {
  LIST,
  DefectColumn
} from '@/views/quality_management/inspectionSheet/newInspectionSheetPage/tabPages/inspectionItems/inspectionSample/constant.js'
import {
  aqlList,
  getSternWidthLevelList,
  levelList,
  getDefectEnums,
  getSampleNumByScheme,
  deleteItemDefete,
  getAcceptValueByScheme,
  getComparisonOperatorsList,
  standardTypeList,
  deleteInspectFile,
  uploadFile,
  getProjectGroupList,
  getMethodsList
} from '@/api/quality-manage.js'
import { getUnitList } from '@/api/basisInfo.js'
import ViewImagesDialog from '@/components/ViewImagesDialog'
import itemDefect from './components/defect'
import attachments from './components/attachments'
import NumberInput from '@/components/NumberInput'

//  抽样表格列数据
import { CHECK_STANDARDS_TABLE } from '@/views/quality_management/inspectionProgram/components/tabPages/constant.js'
import { USE_DEFECTS_REASON_API } from '@/api/defectReason.js' // 缺陷原因
import { USE_DEFECTS_RESULT_API } from '@/api/defectResult.js' // 缺陷后果
const DEFECTS_REASON_API = USE_DEFECTS_REASON_API()
const DEFECTS_RESULT_API = USE_DEFECTS_RESULT_API()

export default {
  name: 'InspectDetailDrawer',
  components: { CommonRadioGroup, CommonSelectDialogPlus, attachments, DefectTable, ViewImagesDialog, itemDefect, NumberInput },
  inject: ['sheetInitStatus'],
  props: {
    currentItemRow: {
      type: Object,
      default: () => {}
    },
    clickIndex: {
      type: Number,
      default: -1
    },
    visible: {
      type: Boolean,
      default: false
    },
    // 分录明细行
    currentRow: {
      type: Object,
      default: () => {}
    },
    initStatus: {
      type: Number,
      default: 0
    },
    inspectionItemShow: {
      type: Boolean,
      default: true
      // default: false
    }
  },
  data() {
    return {
      tabValue: 'info',
      aqlTypeList: [], // aql枚举列表
      sternWidthLevelList: [], // 严格度枚举列表
      levelTypeList: [], // 检验水平枚举列表
      columns: LIST,
      multipleDefect: [],
      tableDefectColumn: DefectColumn,
      showDefectDialog: false,
      defectLevelEnums: [],
      defectReasonEnums: [],
      defectResultEnums: [],
      dialogVisible: false,
      batchCode: '',
      checked: false,
      showDialog: false,
      tableColumn: CHECK_STANDARDS_TABLE,
      typeList: [], // 抽样类型枚举
      comparatorList: [], // 比较符list
      imageVisible: false,
      imageList: [],
      loadingUpload: false,
      attachmentType: {
        image: require('../../../../../../../assets/images/common/image.png'),
        pdf: require('../../../../../../../assets/images/common/pdf.png'),
        doc: require('../../../../../../../assets/images/common/doc.png'),
        xls: require('../../../../../../../assets/images/common/xls.png'),
        ppt: require('../../../../../../../assets/images/common/ppt.png')
      },
      groupList: [], // 检验项目组
      methodsList: [], // 检验方法判定
      unitList: [], // 单位
      // 检验仪器
      extraParamsInstrument: { statuses: [1] },
      showDialogInstrument: false,
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
      ]

    }
  },
  computed: {
    diaVisible: {
      get() {
        return this.visible
      },
      set() {}
    },
    noSelectRow() {
      return this.clickIndex === -1
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    },
    radioList() {
      const list = [
        { label: '项目信息', value: 'info' },
        { label: '检验项附件', value: 'attachments' },
        { label: '项目缺陷', value: 'defect' }
      ]
      return list
    }
  },
  watch: {},
  created() {
    // 获取枚举值
    Promise.allSettled([aqlList(), getSternWidthLevelList(), levelList(), standardTypeList()]).then(res => {
      const [res1, res2, res3, res4] = res
      this.aqlTypeList = res1.value.data.data
      this.sternWidthLevelList = res2.value.data.data
      this.levelTypeList = res3.value.data.data
      this.typeList = res4.value.data.data
    })

    this.getDefectEnums()
    this.getDefectsReasonEnums()
    this.getDefectsResultEnums()
    this.getComparison()

    // 编辑检验项目
    this.getList()
    this.getMethodsList()
    this.getComparison()
    this.getUnitList()
  },
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 1500)
    }
  },
  methods: {
    // 仪器名称选择
    changeInstrument(val, options) {
      if (val) {
        const hasItem = options.find(el => el.instrumentCode === val)
        this.currentItemRow.verificationInstrument = hasItem?.instrumentName
      } else {
        this.currentItemRow.verificationInstrument = ''
      }
    },
    // 仪器名称确定
    handleConfirmInstrument(row) {
      this.currentItemRow.verificationInstrument = row.instrumentName
      this.showDialogInstrument = false
    },
    // 分析方法
    changeMethod() {
      console.log('分析方法修改后', this.currentItemRow)
      this.$set(this.currentItemRow, 'checkResult', '')
      this.$set(this.currentItemRow, 'itemValues', [])
      this.$notify({
        title: '提示',
        message: '改变了分析方法,清空所有检验值',
        type: 'warning',
        duration: 3000
      })
    },
    // 参考值、上公差、下公差等自动判定
    // 上限值=上公差+参考值
    // 下限制=下公差+参考值
    // 上公差=上限值-参考值
    // 下公差=下限值-参考值
    changeNum(val, self, other, operation) {
      if (!val) return
      if (operation === '1') {
        const res = this.add(Number(this.currentItemRow[other]), Number(val))
        this.$set(this.currentItemRow, self, res)
      } else if (operation === '2') {
        const res = this.add(Number(this.currentItemRow[other]), Number(val))
        this.$set(this.currentItemRow, self, res)
      } else if (operation === '3') {
        const res = this.subtract(Number(val), Number(this.currentItemRow[other]))
        this.$set(this.currentItemRow, self, res)
      } else if (operation === '4') {
        const res = this.subtract(Number(val), Number(this.currentItemRow[other]))
        this.$set(this.currentItemRow, self, res)
      }
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
    // 查询单位
    getUnitList() {
      getUnitList().then(res => {
        this.unitList = res.data.data.records
      })
    },
    changeRecordInspectionValue(val) {
      if (val == 0) {
        this.$set(this.currentItemRow, 'itemValues', [])
      }
    },
    // 抽样方案下拉选择回调
    changeMaterialCode(val, options) {
      if (val) {
        const hasItem = options.find(el => el.name === val)
        this.handleSampleConfirm(hasItem)
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
        this.handleSampleConfirm(hasNoItem)
      }
    },
    handleClose(done) {
      this.$emit('cancel')
      done()
    },
    cancelForm() {
      this.$emit('cancel')
    },
    confirmForm() {
      this.$emit('confirm')
      this.$emit('cancel')
    },
    // 抽样方案确认
    async handleSampleConfirm(row) {
      this.currentItemRow.samplePlanId = row.id
      this.currentItemRow.samplePlanName = row.name
      this.currentItemRow.inspectLevel = row.inspectLevel
      this.currentItemRow.inspectLevelName = row.inspectLevelName
      this.currentItemRow.stringency = row.stringency
      this.currentItemRow.stringencyName = row.stringencyName
      this.currentItemRow.aqlValue = row.aqlValue
      this.currentItemRow.sampleType = row.type
      this.showDialog = false
      // 存在抽样方案 根据抽样方案和送检数量算出抽样数量
      if (this.currentRow.inspectQuantity) {
        const params = {
          num: this.currentRow.inspectQuantity,
          sampleId: row.id
        }
        const result = await getSampleNumByScheme(params)
        this.currentItemRow.samplingQuantity = result.data?.data?.sampleNum || 0
      }
      // 根据抽样方案和送检数量查出允收数/拒收数
      // if (this.currentRow.inspectQuantity) {
      const params = {
        num: this.currentRow.inspectQuantity,
        samplePlanId: this.currentItemRow.samplePlanId
      }
      if (params.num && params.samplePlanId) {
        const result = await getAcceptValueByScheme(params)
        if (result.data.status === 1) {
          const data = result.data.data
          this.$set(this.currentItemRow, 'acceptValue', data.acceptValue)
          this.$set(this.currentItemRow, 'refuseValue', data.refuseValue)
        }
      }
      // }
    },
    // 权限等级
    async getDefectEnums() {
      const result = await getDefectEnums()
      const { data } = result.data || {}
      this.defectLevelEnums = data || []
    },
    // 缺陷原因
    async getDefectsReasonEnums() {
      const params = {
        current: 1,
        size: 999,
        statues: [1]
      }
      const result = await DEFECTS_REASON_API.getDefectsListApi(params)
      this.defectReasonEnums = result.data && result.data.data ? result.data.data.records : []
    },
    // 缺陷后果
    async getDefectsResultEnums() {
      const params = {
        current: 1,
        size: 999,
        statues: [1]
      }
      const result = await DEFECTS_RESULT_API.getDefectsListApi(params)
      this.defectResultEnums = result.data && result.data.data ? result.data.data.records : []
    },
    // 切换行
    changeRow(flag) {
      this.$emit('changeRow', flag)
    },
    // 缺陷弹窗确认
    handleDefectConfirm(rows) {
      const arr = rows.map(row => {
        return {
          defectName: row.name,
          defectCode: row.code
        }
      })
      this.currentItemRow.itemDefects.push(...arr)
      this.showDefectDialog = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 删除缺陷
    deleteDefect() {
      const deleteIds = this.multipleDefect.map(item => item.id).filter(item => !isNaN(item))
      this.$confirm('删除项目缺陷? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (deleteIds.length > 0) {
          deleteItemDefete(deleteIds).then(_ => {
            this.$message.success('删除成功')
            this.currentItemRow.itemDefects = this.currentItemRow.itemDefects.filter(item => {
              return this.multipleDefect.indexOf(item) === -1
            })
          })
        } else {
          this.currentItemRow.itemDefects = this.currentItemRow.itemDefects.filter(item => {
            return this.multipleDefect.indexOf(item) === -1
          })
          this.$message.success('删除成功')
        }
      })
    },
    // 打开批量标记弹窗
    openBatch() {
      if (this.multipleDefect.length === 0) {
        this.$message.warning('请选择缺陷')
        return
      }
      this.dialogVisible = true
    },
    // 批量标记单品码确定
    confirmBatch() {
      console.log('🚀 ~ confirmBatch ~  this.batchCode:', this.batchCode)
      this.multipleDefect.forEach(item => {
        if (!item.productCodes) {
          this.$set(item, 'productCodes', this.batchCode)
        } else {
          this.$set(item, 'productCodes', item.productCodes + ',' + this.batchCode)
        }
      })
      this.dialogVisible = false
    },
    async changeInspectQuantity(inspectQuantity, row) {
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
        this.imageVisible = true
        // 视频 或者pdf
      } else if (/\.(mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(fileUrl)) {
        window.open(location.origin + '/' + fileUrl, '_blank')
      }
    },
    closeDailog() {
      this.imageVisible = false
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
      console.log('删除附件 row', row)
      console.log('删除附件 index', index)
      this.$confirm('删除附件? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 存在Id
        if (!isNaN(row.id)) {
          deleteInspectFile([row.id]).then(_ => {
            this.$message.success('删除成功')
            this.currentItemRow.itemExecuteFileList.splice(index, 1)
          })
        } else {
          this.currentItemRow.itemExecuteFileList.splice(index, 1)
        }
      })
      this.$forceUpdate()

      console.log('删除附件 this.currentItemRow.itemExecuteFileList', this.currentItemRow.itemExecuteFileList)
    },
    handleBeforeUpload(file) {
      const maxSize = 50 * 1024 * 1024 // 50MB 设置最大文件大小
      if (file.size > maxSize) {
        this.$message.warning(`文件大小超过了${maxSize / (1024 * 1024)}MB的限制`)
        return false
      }
    },
    // 上传文件
    async handleUpload(params) {
      this.loadingUpload = true
      const formData = new FormData()
      formData.append('file', params.file)
      const {
        data: { data }
      } = await uploadFile(formData)
      this.addFile(data)
    },
    addFile(data) {
      console.log('新增上传附件 ', this.currentItemRow)

      if (this.currentItemRow.itemExecuteFileList === null || !this.currentItemRow.itemExecuteFileList) {
        this.currentItemRow.itemExecuteFileList = []
      }
      const { name, fullPath, createUserName, createBy, createTime } = data
      console.log('🚀 ~ handleUpload ~ data:', data)
      try {
        this.currentItemRow.itemExecuteFileList.push({
          fileName: name,
          fileUrl: fullPath,
          compactor: JSON.parse(sessionStorage.getItem('userInfo'))?.username || '',
          remark: '',
          createByName: createUserName,
          createBy,
          createTime,
          fileType: 'checkItemFile'
        })
        this.loadingUpload = false
      } catch (error) {
        console.log('🚀 ~ handleUpload ~ error:', error)
      }
    },
    handleExceed() {
      this.$message.warning('最多上传 10 个文件')
    },
    // 项目缺陷-附件
    // 序号
    serialNumber(row) {
      return +row + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-title {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
}
::v-deep .el-drawer__header {
  margin-bottom: 12px;
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  padding: 20px 20px 0 20px;
}
.demo-drawer {
  .demo-drawer__content {
    padding: 0 15px 15px 15px;
  }
  .demo-drawer__footer {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
}
::v-deep .noShowHeader > .el-tabs__header {
  display: none;
}
// 检验信息
.form-box {
  .centerArea {
    ::v-deep .el-form-item {
      display: inline-block;
      margin-bottom: 0px;
    }
    .el-form--inline .el-form-item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: top;
    }
    .gutter {
      margin-bottom: 14px;
    }

    // .centerArea-title {
    //   position: relative;
    //   padding-left: 6px;
    //   margin-bottom: 12px;
    // }
    // .centerArea-title::before {
    //   content: '';
    //   display: inline;
    //   position: absolute;
    //   height: 18px;
    //   width: 3px;
    //   top: 0px;
    //   left: 0px;
    //   background: #548af1;
    // }
    .configuration {
      margin-bottom: 12px;
      .hint {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        font-size: 12px;
        color: #999999;
        margin-left: 23px;
        margin-top: 4px;
      }
    }
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
.button-head {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}
::v-deep .el-form-item--medium .el-form-item__content {
  // width: 248px;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  // width: 248px;
}
::v-deep .el-divider--horizontal {
  margin: 0;
}
.centerArea-title {
  position: relative;
  padding-left: 6px;
  margin-bottom: 12px;
}
.centerArea-title::before {
  content: '';
  display: inline;
  position: absolute;
  left: 0px;
  top: 1px;
  width: 4px;
  height: 16px;
  background: #1890ff;
  border-radius: 2px 2px 2px 2px;
}
.centerArea-title2 {
  position: relative;
  padding-left: 6px;
  margin-bottom: 12px;
}
.centerArea-title2::before {
  content: '';
  display: inline;
  position: absolute;
  left: 0px;
  top: 6px;
  width: 4px;
  height: 16px;
  background: #1890ff;
  border-radius: 2px 2px 2px 2px;
}
.title-start {
  display: flex;
  align-items: center;
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
      font-size: 12px;
      color: #333333;
      flex: 1;
    }
    .attachments-icon-gutter {
      margin-right: 12px;
    }
  }
}
.attachment-defect-title {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  margin: 12px 0;
}
::v-deep .no-border-radius .el-input__inner {
  border-radius: 0px !important;
}
::v-deep .el-tabs__content {
  height: 100%;
  // overflow: hidden;
}
</style>
