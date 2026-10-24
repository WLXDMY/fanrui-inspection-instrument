<!--
 * @Author: zhaozhuo
 * @Date: 2022-08-03 09:57:36
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-08 20:30:05
 * @Description: ...
-->
<template>
  <el-dialog
    title="新增批次编号"
    :visible.sync="dialogVisible"
    width="400px"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="codingRulesTypeRef"
      :model="codingRulesTypeForm"
      :rules="typeRules"
      class="numberdialog"
      label-width="140px"
    >
      <el-form-item label="编号规则类型" prop="type">
        <el-select
          v-model="codingRulesTypeForm.type"
          filterable
          size="small"
          placeholder="请选择编码规则类型:"
          style="width: 200px"
          @change="changeRulesType"
        >
          <el-option
            v-for="item in codingRulesTypeList"
            :key="item.id"
            :label="setRuleLabel(item.prefixDetail)"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in rulePrefixDetail"
        :key="index"
        :label="item.name"
        :prop="`prefixValue${index}`"
      >
        <!-- type 为 1 是人工输入-->
        <el-input
          v-model="codingRulesTypeForm[`prefixValue${index}`]"
          placeholder="请输入内容"
          clearable
          style="width: 200px"
          :disabled="item.type != 1"
        />
      </el-form-item>
      <template>
        <div style="color: #518CFF;">
          <i class="el-icon-warning" style="font-size: 16px;margin-left: 50px;margin-right: 8px;vertical-align: middle;" />
          <span>样例：{{ codingRulesTypeFormExample }}</span>
        </div>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="cofirmModal">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getNumRuleDetailByType,
  getNumRuleSeqByType,
  getWorkordersByNumber,
  getInspectsheetsAddBarcode
  // getWorkOrderCodeRuleList
} from '@/api/quality-manage'

export default {
  name: 'EditConfigDialog',
  props: {},
  data() {
    return {
      params: {},
      barRule: [],
      inspectionSheetCodeDisabled: true,
      dialogVisible: false,
      ruleDetailByTypeFlag: false,
      rulePrefixDetail: [],
      workOrderNumberInfo: {},
      codingRulesTypeList: [],
      codingRulesTypeForm: {
        type: '',
        example: ''
      },
      typeRules: {
        type: [
          {
            required: true,
            message: '请先选择规则类型',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  computed: {
    codingRulesTypeFormExample() {
      const codingRulesTypeFormKeys = Object.keys(this.codingRulesTypeForm)
      if (codingRulesTypeFormKeys.length) {
        let vals = ''
        codingRulesTypeFormKeys.forEach(key => {
          if (key.startsWith('prefixValue')) {
            vals += this.codingRulesTypeForm[key]
          }
        })
        return vals
      }
      return '--'
    }
  },
  created() {
    this.getNumRuleDetailByType()
  },
  methods: {
    show(options) {
      this.params = options.params
      console.log('params 值 -> ', this.params)
      // const batchBtnDisabled = options.batchBtnDisabled
      if (this.ruleDetailByTypeFlag) {
        this.codingRulesTypeForm = {}
        this.codingRulesTypeForm.type = ''
        this.getWorkordersByNumber()
        // if (!batchBtnDisabled) {
        //   this.getWorkOrderCodeRuleList()
        // }
        this.dialogVisible = true
      }
    },
    // 获取生产工单规则类型
    // getWorkOrderCodeRuleList () {
    //   getWorkOrderCodeRuleList().then(res => {
    //     if (res.data.code === '200') {
    //       this.barRule = res.data.data || []
    //     }
    //   })
    // },
    // 通过工单编码查询规则类型字段
    getNumRuleDetailByType() {
      const param = { typeCode: 5 }
      getNumRuleDetailByType(param).then(res => {
        if (res.data.code === '200') {
          this.codingRulesTypeList = res.data.data
          if (this.codingRulesTypeList.length === 0) {
            this.inspectionSheetCodeDisabled = false
          } else {
            this.ruleDetailByTypeFlag = true
          }
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || '获取规则详情失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 通过类型获取规则详情
    getWorkordersByNumber() {
      const params = {
        workOrderNumber: this.params.workOrderNumber
      }
      getWorkordersByNumber(params).then(res => {
        if (res.data.code === '200') {
          this.workOrderNumberInfo = res?.data?.data || {}
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || '获取工单相信息失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    setRuleLabel(prefixDetail) {
      const nPrefixDetail = JSON.parse(prefixDetail)
      if (nPrefixDetail && nPrefixDetail.length) {
        const str = nPrefixDetail.reduce((str, i) => {
          str = str + i.name + '-'
          return str
        }, '')
        return str.slice(0, -1)
      }
    },
    filterNotShowType(data) {
      // 2 是物料和工单生成的时候数据，不显示
      return data.filter((item) => item.type != 2)
    },
    // 编号规则类型
    changeRulesType(val) {
      const workOrderNumber = this.params.workOrderNumber ?? ''
      const materialCode = this.workOrderNumberInfo?.materialCode ?? ''
      const lineModelId = this.workOrderNumberInfo?.lineModelId ?? ''
      const lineCode = this.workOrderNumberInfo?.lineCode ?? ''
      const wNumberMap = { 3: workOrderNumber, 6: materialCode, 9: lineModelId, 10: lineCode }
      const wRelatedMap = { lineModel: lineModelId, line: lineCode, workOrder: workOrderNumber }
      const param = {
        id: val,
        workOrderNumber,
        materialCode,
        type: 'finished',
        ruleType: 'finished',
        numberMap: wNumberMap,
        relatedMap: wRelatedMap,
        isCheckTimesNeedAddOne: true
      }
      getNumRuleSeqByType(param).then(res => {
        if (res.data.code === '200') {
          this.rulePrefixDetail = this.filterNotShowType(
            res.data.data.prefixValueList
          )
          this.rulePrefixDetail.forEach((item, index) => {
            if (item.type === 1) {
              this.typeRules = {
                type: [
                  {
                    required: true,
                    message: '请先选择规则类型',
                    trigger: ['blur', 'change']
                  }
                ]
              }
              this.$set(this.typeRules, `prefixValue${index}`, {
                required: true,
                message: '该参数是必填项',
                trigger: ['blur']
              })
            }
            // 生产工单且关联单据类型为 工单
            if (item.code === 3) {
              item.value = this.params.workOrderNumber
            }
            // 物料编码
            if (item.code === 6) {
              item.value = this.params?.materialCode
            }
            this.$set(
              this.codingRulesTypeForm,
              `prefixValue${index}`,
              item.value
            )
          })
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || '选择类型失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    isExistManualInput (prefixDetail) {
      return prefixDetail.some(item => item.code === 1)
    },
    setManualInput () {
      // 只存在一条规则时，查询不存在手输，可以直接去返回的 value
      // 当存在手输时，需要更新 value 值，所以需要获取新值
      const isExistManualInput = this.isExistManualInput(this.rulePrefixDetail)
      if (this.codingRulesTypeList.length === 1 && !isExistManualInput) {
        return this.rulePrefixDetail
      } else {
        return this.rulePrefixDetail.map((item, index) => {
          return {
            ...item,
            value: this.codingRulesTypeForm[`prefixValue${index}`]
          }
        })
      }
    },
    // 确定关闭
    cofirmModal() {
      this.$refs.codingRulesTypeRef.validate(valid => {
        if (valid) {
          this.dialogVisible = false
          this.generateCode()
        } else {
          this.$validateConfirm(this.$refs.codingRulesTypeRef)
        }
      })
    },
    // 生成批次号
    generateCode() {
      const workOrderNumber = this.params.workOrderNumber ?? ''
      const materialCode = this.workOrderNumberInfo?.materialCode ?? ''
      const lineModelId = this.workOrderNumberInfo?.lineModelId ?? ''
      const lineCode = this.workOrderNumberInfo?.lineCode ?? ''
      // barRule
      const params = {
        sheetId: this.params.inspectionSheetId
      }
      const paramsData = {
        count: 1,
        num: 1,
        barCode: this.codingRulesTypeFormExample,
        relateNumber: workOrderNumber,
        materialCode,
        ruleCode: this.barRule.length !== 0 ? this.barRule[0].ruleCode : '',
        ruleType: 'finished',
        numberRuleId: this.codingRulesTypeForm.type,
        ruleDetail: JSON.stringify(this.setManualInput()),
        wNumberMap: {
          3: workOrderNumber,
          6: materialCode,
          9: lineModelId,
          10: lineCode
        },
        relatedMap: {
          lineModel: lineModelId,
          line: lineCode,
          workOrder: workOrderNumber
        }
      }
      getInspectsheetsAddBarcode(params, paramsData).then(res => {
        if (res.data.code === '200') {
          this.$notify({
            title: '提示',
            message: '批次生成成功',
            type: 'success',
            offset: 40
          })
          console.log('generateCode', this.codingRulesTypeFormExample)
          this.$emit('generateCode', {
            barCode: this.codingRulesTypeFormExample
          })
        }
      })
    }
  }
}

</script>
<style lang="scss">
.inspection-dialog-class {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 50%;
    }
  }
  .el-dialog__footer {
    display: flex;
    padding: 0;
    button {
      width: 50%;
      padding: 20px 15px;
      border-radius: 0;
      &.el-button {
        margin-left: 0;
      }
      &:nth-of-type(2) {
        border-left: none;
        color: #3A7DFF;
      }
    }
  }
}
</style>
