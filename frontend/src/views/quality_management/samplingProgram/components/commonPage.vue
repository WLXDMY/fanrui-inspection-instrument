<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-16 16:54:06
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-05-09 10:23:05
 * @Description:
-->
<template>
  <div class="commonPage">
    <!-- 内层 -->
    <section class="quality-edit-inner">
      <!-- 头部 -->
      <header class="edit-header">
        <el-button size="mini" type="primary" @click="back">返回</el-button>
        <el-button v-if="!isDetailType" size="mini" type="primary" @click="clickSavePreview">保存</el-button>
        <el-button
          v-if="!isExistApproveBtn && isAddType"
          v-primission="{ action: 'qms-product-inspection.inspection-manage.samplePlane:saveAndEffect' }"
          size="mini"
          type="primary"
          @click="clickSaveAndEffectPreview"
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
          label-width="200px"
        >
          <!-- 基本信息 -->
          <section class="base-info">
            <div class="base-info-title">
              <p>基本信息</p>
            </div>
            <!--
            <el-form-item label="抽样方案编码" prop="code">
              <el-input v-model="formInline.code" size="mini" placeholder="编码保存后自动生成">
                <template v-if="isAddType" slot="suffix">
                  <i class="el-icon-s-operation" style="cursor: pointer" @click.stop="handleResetCode" />
                </template>
              </el-input>
            </el-form-item>
            -->
            <el-form-item
              label="抽样方案编码"
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
                v-if="isAddType "
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
            <el-form-item label="抽样方案名称" prop="name">
              <!-- :disabled="initStatus === 1" -->
              <el-input v-model="formInline.name" size="mini" />
            </el-form-item>
            <el-form-item v-if="!isAddType" label="状态" prop="status">
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
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formInline.remark" size="mini" />
            </el-form-item>
          </section>

          <CommonRadioGroup :tab-value.sync="tabValue" :radio-list="radioList" />
          <section v-show="isOperationRecord" class="centerArea">
            <OperationRecord :record-info="recordInfo" />
          </section>
          <section v-show="!isOperationRecord" class="centerArea">
            <el-form-item label="抽样类型" prop="type">
              <el-select
                v-model="formInline.type"
                placeholder="请选择"
                filterable
                clearable
                size="mini"
                @change="changeStandardType"
              >
                <el-option v-for="item in typeList" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="检验水平" prop="inspectLevel">
              <el-select
                v-model="formInline.inspectLevel"
                placeholder="请选择"
                :disabled="!isAql || isDetailType"
                filterable
                clearable
                size="mini"
                @change="getCheckStandard"
              >
                <el-option v-for="item in inspectLevelList" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="严格度" prop="stringency" label-width="120px">
              <el-select
                v-model="formInline.stringency"
                placeholder="请选择"
                :disabled="!isAql || isDetailType"
                filterable
                clearable
                size="mini"
                @change="getCheckStandard"
              >
                <el-option v-for="item in SternWidthLevelList" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="AQL值" prop="aqlValue" label-width="120px">
              <el-select
                v-model="formInline.aqlValue"
                placeholder="请选择"
                :disabled="!isAql || isDetailType"
                filterable
                clearable
                size="mini"
                @change="getCheckStandard"
              >
                <el-option v-for="item in alqList" :key="item.code" :label="item.code" :value="item.code" />
              </el-select>
            </el-form-item>
            <!--时效性-->
            <el-form-item label="时效性" prop="timeliness" :style="{ 'margin-bottom': '15px' }">
              <el-radio-group v-model="formInline.timeliness" :disabled="isDetailType">
                <el-radio :label="0">无期限</el-radio>
                <el-radio :label="1">有期限</el-radio>
              </el-radio-group>
            </el-form-item>
            <div>
              <el-form-item v-if="isTimeliness" label="生效日期:" prop="effectiveTime">
                <el-date-picker
                  v-model="formInline.effectiveTime"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  value-format="yyyy-MM-dd 00:00:00"
                />
              </el-form-item>
              <el-form-item v-if="isTimeliness" label="失效日期:" prop="failureTime">
                <el-date-picker
                  v-model="formInline.failureTime"
                  type="date"
                  placeholder="选择日期"
                  size="mini"
                  value-format="yyyy-MM-dd 23:59:59"
                />
              </el-form-item>
            </div>
            <SamplingTable
              v-if="formInline.type !== 'full'"
              ref="SamplingTable"
              :standard-type="formInline.type"
              :form-data="formInline"
            />
          </section>
        </el-form>
      </div>
    </section>
    <!-- 编码规则 -->
    <!--
    <common-code-rule-dialog
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="93"
      is-open-reg-disabled-space
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    />
    -->
  </div>
</template>

<script>
import { isExistApprove } from '@/api/examineApprove.js'
import {
  standardStateList,
  standardTypeList,
  standardAdd,
  levelList,
  aqlList,
  getSternWidthLevelList,
  standardDetail,
  standardUpdate,
  getCheckStandard,
  standardAddEffect
} from '@/api/quality-manage.js'
import CommonRadioGroup from '@/components/CommonRadioGroup/index.vue'
import OperationRecord from '@/components/OperationRecord/index.vue'
import SamplingTable from './samplingTable.vue'
import CustomCodeRule from '@/components/CodeRuleDialog/index'

export default {
  components: {
    CommonRadioGroup,
    OperationRecord,
    SamplingTable,
    CustomCodeRule
  },
  data() {
    return {
      initStatus: 0,
      isAutoOpen: false,
      tabValue: 'projectIndicators',
      formInline: {
        name: '',
        code: '',
        status: '',
        remark: '',
        type: '',
        inspectLevel: '',
        stringency: '',
        aqlValue: '',
        effectiveTime: '',
        failureTime: '',
        timeliness: 0
      },
      typeList: [],
      typeStateList: [],
      statusList: [],
      activeName: '',
      standardDefectTypeList: [],
      standardDefectTypeClassifyData: {},
      inspectLevelList: [],
      SternWidthLevelList: [],
      alqList: [],
      rules: {
        code: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }],
        name: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }],
        type: [{ required: true, message: '该参数是必填项', trigger: ['change'] }],
        aqlValue: [{ required: false, message: '该参数是必填项', trigger: ['change'] }],
        stringency: [{ required: false, message: '该参数是必填项', trigger: ['change'] }],
        inspectLevel: [{ required: false, message: '该参数是必填项', trigger: ['change'] }],
        effectiveTime: [{ required: true, message: '该参数是必填项', trigger: ['change'] }],
        failureTime: [{ required: true, message: '该参数是必填项', trigger: ['change'] }]
      },
      recordInfo: {},
      isExistApproveBtn: false, // 是否开启审批
      // 单据编码 start
      receiptCodePlaceholder: '请输入',
      typeCode: 93,
      codeRequired: true,
      rulesTypeExtraRequestParam: {}
      // 单据编码 end
    }
  },
  computed: {
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
        { label: '标准依据', value: 'projectIndicators' },
        { label: '操作记录', value: 'operationRecord' }
      ]
      if (this.isAddType) return list.filter(item => item.value === 'projectIndicators')
      return list
    },
    isOperationRecord() {
      return this.tabValue === 'operationRecord'
    },
    isAql() {
      return this.formInline.type === 'gb2828' || this.formInline.type === 'custom'
    },
    isTimeliness() {
      return this.formInline.timeliness === 1
    }
  },
  watch: {
    isTimeliness(val) {
      this.rules.effectiveTime[0].required = val
      this.rules.failureTime[0].required = val
    }
  },
  created() {
    Promise.allSettled([
      levelList(),
      aqlList(),
      getSternWidthLevelList(),
      standardTypeList(),
      standardStateList(),
      this.isAllowApprove()
    ]).then(res => {
      const [r1, r2, r3, r4, r5] = res
      this.inspectLevelList = r1.value.data.data
      this.alqList = r2.value.data.data
      this.SternWidthLevelList = r3.value.data.data
      this.typeList = r4.value.data.data
      this.statusList = r5.value.data.data
      this.statusList = this.statusList.map(item => {
        return {
          ...item,
          disabled: true
        }
      })
    })
  },
  mounted() {
    if (this.isDetailType) {
      this.getStandardDetail()
      this.$disableInputDetail()
    }
    if (this.isEditType) {
      this.getStandardDetail()
    }

    // if (this.isAddType) {
    //   this.isAutoOpen = true
    //   // this.$refs['codeRuleDialog'].open()
    // }
    if (this.isAddType) {
      setTimeout(() => {
        this.$refs?.commonCodeRuleInput?.init(this.typeCode)
      }, 500)
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
    // 切换编码规则
    async handleResetCode() {
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    // handleConfirmCodeRuleDialog(code) {
    //   this.formInline.code = code
    // },
    // 获取详情
    async getStandardDetail() {
      await standardDetail(this.$route.query.id).then(res => {
        const { samplePlanDetailEntities, createBy, createByName, createTime, updateBy, updateByName, updateTime } =
          res.data.data
        this.formInline = res.data.data
        this.initStatus = this.formInline.status
        if (this.formInline.aqlValue) {
          this.formInline.aqlValue = Number(this.formInline.aqlValue)
        }
        // 不好追溯
        this.$refs.SamplingTable.detailFrom.listData = samplePlanDetailEntities.map(item => {
          return {
            ...item,
            checkProportion: item.percentage,
            reValue: item.refuseValue,
            acValue: item.acceptValue,
            sampleNum: item.scopeNum,
            checkNum: item.sampleNum
          }
        })
        console.log('🚀 ~ standardDetail ~ this.$refs.SamplingTable:', this.$refs.SamplingTable.detailFrom.listData)
        this.recordInfo = { createBy, createByName, createTime, updateBy, updateByName, updateTime }
        // 根据当前状态来判断其他状态是否可以选择
        setTimeout(() => {
          this.statusDIsable()
        }, 200)
      })
    },
    // 切换类型
    changeStandardType(type) {
      if (type === 'gb2828') {
        this.rules.aqlValue[0].required = true
        this.rules.stringency[0].required = true
        this.rules.inspectLevel[0].required = true
      } else {
        this.rules.aqlValue[0].required = false
        this.rules.stringency[0].required = false
        this.rules.inspectLevel[0].required = false
      }
      // 清空选择
      if (!type) {
        return
      }
      this.getCheckStandard()
    },

    // 获取抽样标准
    getCheckStandard() {
      const { type, inspectLevel, aqlValue, stringency } = this.formInline
      if (type === 'gb2828' && (!inspectLevel || !aqlValue || !(stringency >= 0))) return
      let param = {}
      if (type !== 'gb2828') {
        param = {
          sampleType: type
        }
      }
      param = {
        sampleType: type,
        inspectLevel,
        aqlValue,
        stringency
      }
      if (type !== 'full') {
        getCheckStandard(param).then(res => {
          this.$refs.SamplingTable.detailFrom.listData = res.data.data.map(item => ({
            checkProportion: item.percentage,
            acValue: item.acceptQuantity,
            reValue: item.refuseQuantity,
            sampleNum: item.scopeNum,
            checkNum: item.sampleNum
          }))
        })
      }
    },
    generateSaveParams() {
      let params = {}
      const samplePlanDetailEntities = this?.$refs?.SamplingTable?.detailFrom?.listData.map(item => {
        return {
          sampleCode: '',
          percentage: item.checkProportion || 0,
          refuseValue: item.reValue || 0,
          acceptValue: item.acValue || 0,
          sampleNum: item.checkNum || 0,
          scopeNum: item.sampleNum || 0
        }
      })
      params = { ...this.formInline, samplePlanDetailEntities }
      return params
    },
    // 保存前，如果编码没有值，需要先给编码赋值
    async clickSavePreview() {
      // // 新增并且没有编码时，赋值编码
      // if (this.isAddType && !this.formInline.code) {
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
      this.clickSave()
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
        ]
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      const params = this.generateSaveParams()
      if (this.isAddType) {
        const code = this.createReceiptNumber() // 生成单据编号
        this.$set(params, 'code', code)
      }
      // this.$refs['projectForm'].validate(async valid => {
      // if (valid) {
      this.isAddType ? await standardAdd(params) : await standardUpdate(params)
      this.$notify({
        title: '提示',
        message: '保存成功',
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
    // 获取审批权限
    async isAllowApprove() {
      const res = await isExistApprove('productInspectionSample')
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
    // 保存前，如果编码没有值，需要先给编码赋值
    async clickSaveAndEffectPreview() {
      // 新增并且没有编码时，赋值编码
      // if (!this.formInline.code) {
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
      this.clickSaveAndEffect()
    },
    // 保存并且生效
    async clickSaveAndEffect() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          }
        ]
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      const params = this.generateSaveParams()
      const code = this.createReceiptNumber() // 生成单据编号
      this.$set(params, 'code', code)
      // this.$refs['projectForm'].validate(async valid => {
      // if (valid) {
      await standardAddEffect(params)
      this.$notify({
        title: '提示',
        message: '保存成功',
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
    },

    // 返回
    back() {
      this.$router.push({
        name: 'samplingProgram'
      })
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
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
      border-radius: 4px 4px 4px 4px;
      background: white;
      padding: 12px 0px 9px 18px;
    }
    .bottomArea {
      padding-top: 18px;
      margin-top: 4px;
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
</style>
