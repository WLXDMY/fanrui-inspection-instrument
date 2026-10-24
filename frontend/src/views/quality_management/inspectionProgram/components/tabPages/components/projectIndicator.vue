<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-06-04 19:06:53
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-29 16:22:55
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionProgram\components\tabPages\components\projectIndicator.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="projectIndicator">
    <section class="centerArea">
      <div>
        检验项要求
        <el-button type="text" @click="changeRow('first')">首行</el-button>
        <el-button type="text" @click="changeRow('previous')">上一行</el-button>
        <el-button type="text" @click="changeRow('next')">下一行</el-button>
        <el-button type="text" @click="changeRow('last')">末行</el-button>
      </div>
      <el-form
        ref="projectForm"
        :inline="true"
        :model="formInline"
        :rules="rules"
        class="demo-form-inline"
        label-position="right"
        label-width="146px"
      >
        <el-row>
          <el-form-item label="序号:">
            <el-input v-model="index" size="mini" disabled />
          </el-form-item>
          <el-form-item label="检验项目:" prop="name">
            <el-input v-model="formInline.name" size="mini" disabled />
          </el-form-item>
          <el-form-item label="分析方法:" prop="analyzeMethodCode">
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
          </el-form-item>
          <el-form-item label="检验仪器:" prop="verificationInstrument">
            <y-complexSelect3
              v-model="formInline.verificationInstrument"
              style="width: 200px"
              :disabled="initStatus === 1"
              :value-key="'instrumentCode'"
              :label-key="'instrumentName'"
              :keyword-key="'instrumentName'"
              @btnClickCallback="showDialogInstrument = true"
              @selectChange="(e, options) => changeInstrument(e, options)"
            />
            <!-- <el-input v-model="formInline.verificationInstrument" size="mini" /> -->
          </el-form-item>
          <el-form-item label="检验标准:" prop="verificationBasis">
            <el-input
              v-model="formInline.verificationBasis"
              type="textarea"
              maxlength="300"
              :autosize="{ minRows: 2, maxRows: 6 }"
              clearable
              placeholder="请输入"
              size="mini"
              :disabled="initStatus === 1"
            />
          </el-form-item>
          <el-form-item label="检验条件:" prop="itemInspectionCondition">
            <el-input
              v-model="formInline.itemInspectionCondition"
              type="textarea"
              maxlength="300"
              :autosize="{ minRows: 2, maxRows: 6 }"
              clearable
              placeholder="请输入"
              size="mini"
              :disabled="initStatus === 1"
            />
          </el-form-item>
          <el-form-item label="检验方法:" prop="verificationMethod">
            <el-input v-model="formInline.verificationMethod" size="mini" />
          </el-form-item>
          <el-form-item v-show="formInline.analyzeMethodCode === 'quantitative'" label="比较符:" prop="comparatorCode">
            <el-select
              v-model="formInline.comparatorCode"
              placeholder="请选择"
              size="mini"
              clearable
              @change="handleComparatorCodeChange"
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
            label="标准/参考值:"
            prop="referenceValue"
          >
            <el-input v-model="formInline.referenceValue" size="mini" />
          </el-form-item>
          <el-form-item
            v-show="formInline.analyzeMethodCode === 'quantitative'"
            label="上公差:"
            prop="itemUpperTolerance"
          >
            <NumberInput
              v-model="formInline.itemUpperTolerance"
              style="width: 200px"
              clearable
              size="mini"
              :disabled="!isCanInputLimit"
              @change="changeNum($event, 'upperLimitValue', 'referenceValue', '1')"
            />
          </el-form-item>
          <el-form-item
            v-show="formInline.analyzeMethodCode === 'quantitative'"
            label="下公差:"
            prop="itemLowerTolerance"
          >
            <NumberInput
              v-model="formInline.itemLowerTolerance"
              style="width: 200px"
              clearable
              size="mini"
              :disabled="!isCanInputLimit"
              @change="changeNum($event, 'downLimitValue', 'referenceValue', '2')"
            />
          </el-form-item>
          <el-form-item v-show="formInline.analyzeMethodCode === 'quantitative'" label="上限值:" prop="upperLimitValue">
            <el-input
              v-model="formInline.upperLimitValue"
              clearable
              size="mini"
              :disabled="!isCanInputLimit"
              @change="changeNum($event, 'itemUpperTolerance', 'referenceValue', '3')"
            />
          </el-form-item>
          <el-form-item v-show="formInline.analyzeMethodCode === 'quantitative'" label="下限值:" prop="downLimitValue">
            <el-input
              v-model="formInline.downLimitValue"
              clearable
              size="mini"
              :disabled="!isCanInputLimit"
              @change="changeNum($event, 'itemLowerTolerance', 'referenceValue', '4')"
            />
          </el-form-item>

          <el-form-item label="单位:" prop="unit">
            <el-select v-model="formInline.unit" placeholder="请选择单位" clearable>
              <el-option v-for="item in unitList" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
    </section>
    <section class="centerArea">
      <InputWayTable
        ref="InputWayTable"
        :item-option-list.sync="formInline.itemOptionList"
        :defalut-str.sync="formInline.defaultValue"
        :optional-str.sync="formInline.optionalValue"
        :input-mode.sync="formInline.inputMode"
        :readonly="isDetailType"
        :init-status="initStatus"
        :input-mode-options="inputModeOptions"
        :analyze-method-code="formInline.analyzeMethodCode"
      />
    </section>

    <!-- 附件 -->
    <section class="centerArea">
      <Attachment
        ref="attachment"
        :item-file-list.sync="formInline.itemFileList"
        :disabled-upload-btn="isDetailType"
        :init-status="initStatus"
        title="检验项附件"
      />
    </section>

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
import {
  getComparisonOperatorsList,
  // getIsExportNameList,
  getInputModeListApi,
  getMethodsList
} from '@/api/quality-manage.js'
import InputWayTable from '@/components/InputWayTable/index.vue'
import Attachment from './attachment.vue'
import NumberInput from '@/components/NumberInput'
import { getUnitList } from '@/api/basisInfo.js'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'

export default {
  name: 'ProjectIndicator',
  components: {
    CommonSelectDialogPlus,
    InputWayTable,
    Attachment,
    NumberInput
  },
  props: {
    formInline: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    },
    initStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rules: {
        analyzeMethodCode: [{ required: true, message: '该参数是必填项', trigger: ['change'] }],
        comparatorCode: [{ required: false, message: '该参数不能为空', trigger: 'blur' }],
        referenceValue: [{ required: false, message: '该参数不能为空', trigger: 'blur' }],
        downLimitValue: [{ required: false, message: '该参数不能为空', trigger: 'blur' }],
        upperLimitValue: [{ required: false, message: '该参数不能为空', trigger: 'blur' }]
      },
      comparatorList: [], // 比较符list
      initInputModeOptions: [], // 输入方式枚举
      inputModeOptions: [], // 输入方式枚举-根据分析方法过滤
      isCanInputLimit: false, // 下限/上限值是否可以输入
      unitList: [], // 单位
      methodsList: [], // 检验方法判定
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
      ]
    }
  },
  computed: {
    isDetailType() {
      return this.$route.name.includes('Detail')
    },
    index() {
      return this.tableData?.findIndex(item => item.itemId === this.formInline.itemId) + 1
    }
  },
  watch: {
    formInline: {
      handler(val) {
        if (val && val.analyzeMethodCode === 'quantitative' && val.comparatorCode) {
          // this.rules.comparatorCode[0].required = true

          if (
            val.comparatorCode === 'between' ||
            val.comparatorCode === 'greaterBetweenLessequal' ||
            val.comparatorCode === 'greaterequalBetweenLess' ||
            val.comparatorCode === 'greaterequalBetweenLessequal'
          ) {
            this.isCanInputLimit = true
            this.rules.referenceValue[0].required = false
          } else if (val.comparatorCode === '') {
            // 清空比较符
            this.rules.downLimitValue[0].required = false
            this.rules.upperLimitValue[0].required = false
            this.rules.referenceValue[0].required = false
          } else {
            this.isCanInputLimit = false
            this.rules.downLimitValue[0].required = false
            this.rules.upperLimitValue[0].required = false
            this.rules.referenceValue[0].required = true
          }
        }
        // 获取输入方式
        if (val && val.analyzeMethodCode) {
          if (val.analyzeMethodCode === 'quantitative') {
            // 定量分析
            this.inputModeOptions = this.initInputModeOptions.filter(item => item.code === 'handInput')
            if (!this.formInline.inputMode) {
              this.formInline.inputMode = 'handInput'
            }
          } else if (val.analyzeMethodCode === 'qualitative') {
            // 定性分析
            this.inputModeOptions = this.initInputModeOptions.filter(item => item.code !== 'handInput')
            if (!this.formInline.inputMode) {
              this.formInline.inputMode = 'multipleChoice'
            }
          } else if (val.analyzeMethodCode === 'manual') {
            // 人工分析
            this.inputModeOptions = this.initInputModeOptions
            if (!this.formInline.inputMode) {
              this.formInline.inputMode = ''
            }
          }
        }
      },
      deep: true,
      immediate: true
    },
    isCanInputLimit: {
      handler(val) {
        if (val) {
          this.rules['downLimitValue'][0].required = true
          this.rules['upperLimitValue'][0].required = true
        } else {
          this.rules['downLimitValue'][0].required = false
          this.rules['upperLimitValue'][0].required = false
        }
      },
      deep: true,
      immediate: true
    },
    initStatus: {
      handler(val) {
        if (val === 1) {
          this.$disableInputDetail()
        }
      },
      immediate: true
    }
  },
  created() {
    this.getComparison()
    this.getInputModeList()

    this.getUnitList()
    this.getMethodsList()
  },
  methods: {
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
    changeMethod(item, type) {
      // 获取分析方案对应的name
      const hasItem = this.methodsList.find(el => el.code === item)
      if (hasItem) {
        this.$set(this.formInline, 'analyzeMethodName', hasItem.name)
      }

      // 2222定量分析,定量且为between上下限必填
      if (item === 'quantitative') {
        // this.disabledFlag2 = false
        // this.disabledFlag = false
        // 比较符必填
        // this.projectRules.comparatorCode[0].required = true
        // 输入方式选项调整
        this.inputModeOptions = this.initInputModeOptions.filter(item => item.code === 'handInput')
        this.formInline.inputMode = 'handInput'

        // 默认为介于（包含上下限）
        if (type !== '1') {
          this.$set(this.formInline, 'comparatorCode', 'greaterequalBetweenLessequal')
          this.handleComparatorCodeChange('greaterequalBetweenLessequal')
        }
      } else if (item === 'qualitative') {
        // 定性分析
        // this.disabledFlag2 = true
        // this.disabledFlag = true
        this.rules.comparatorCode[0].required = false
        this.rules.downLimitValue[0].required = false
        this.rules.upperLimitValue[0].required = false
        this.rules.referenceValue[0].required = false
        this.formInline.upperLimitValue = ''
        this.formInline.comparatorCode = ''
        this.formInline.downLimitValue = ''

        // 输入方式选项调整
        this.inputModeOptions = this.initInputModeOptions.filter(item => item.code !== 'handInput')
        this.formInline.inputMode = 'multipleChoice'
      } else if (item === 'manual') {
        // 人工分析
        // this.disabledFlag2 = true
        // this.disabledFlag = true
        this.rules.comparatorCode[0].required = false
        this.rules.downLimitValue[0].required = false
        this.rules.upperLimitValue[0].required = false
        this.rules.referenceValue[0].required = false
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

      // 需要在判断下比较符
      this.handleComparatorCodeChange(this.formInline.comparatorCode)
    },
    // 获取(检验)方法数据列表
    async getMethodsList() {
      const result = await getMethodsList()
      const { data } = result.data || {}
      this.methodsList = data || []
    },
    // 查询单位
    getUnitList() {
      getUnitList().then(res => {
        this.loading = false
        this.unitList = res.data.data.records
      })
    },
    // 比较符选择
    handleComparatorCodeChange(e) {
      if (this.formInline.analyzeMethodCode !== 'quantitative') {
        return
      }
      console.log('比较符选择 ', e)
      if (
        e &&
        (e === 'between' ||
          e === 'greaterBetweenLessequal' ||
          e === 'greaterequalBetweenLess' ||
          e === 'greaterequalBetweenLessequal')
      ) {
        this.isCanInputLimit = true
        this.rules.referenceValue[0].required = false
        this.rules.downLimitValue[0].required = true
        this.rules.upperLimitValue[0].required = true
      } else if (e === '') {
        // 清空比较符
        this.rules.downLimitValue[0].required = false
        this.rules.upperLimitValue[0].required = false
        this.rules.referenceValue[0].required = false
      } else {
        this.isCanInputLimit = false
        this.rules.downLimitValue[0].required = false
        this.rules.upperLimitValue[0].required = false
        this.rules.referenceValue[0].required = true
      }
    },
    changeInputMode() {
      this.formInline.defaultValue = ''
      this.formInline.optionalValue = ''
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
    async changeRow(flag) {
      const index = this.tableData.findIndex(item => item.itemId === this.formInline.itemId)
      switch (flag) {
        case 'first':
          this.$emit('update:formInline', this.tableData[0])
          // 滚动条滚到最顶部
          if (
            this.$parent.$refs['newMaterialTableRef'] &&
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'] &&
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'].bodyWrapper
          ) {
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'].bodyWrapper.scrollTop = 0
          }
          break
        case 'previous':
          if (index > 0) {
            this.$emit('update:formInline', this.tableData[index - 1])
          }
          // 滚动
          if (
            this.$parent.$refs['newMaterialTableRef'] &&
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'] &&
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'].bodyWrapper
          ) {
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'].bodyWrapper.scrollTop -= 57
          }
          break
        case 'next':
          if (index < this.tableData.length - 1) {
            this.$emit('update:formInline', this.tableData[index + 1])
          }
          // 滚动
          if (
            this.$parent.$refs['newMaterialTableRef'] &&
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'] &&
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'].bodyWrapper
          ) {
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'].bodyWrapper.scrollTop += 57
          }
          break
        case 'last':
          this.$emit('update:formInline', this.tableData[this.tableData.length - 1])
          // 滚动条滚到最底部
          if (
            this.$parent.$refs['newMaterialTableRef'] &&
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'] &&
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'].bodyWrapper
          ) {
            this.$parent.$refs['newMaterialTableRef'].$refs['commonTable'].bodyWrapper.scrollTop = 10000
          }
          break

        default:
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
.projectIndicator {
  .centerArea {
    // box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    // border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    margin: 10px 0;
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
