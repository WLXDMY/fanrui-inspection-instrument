<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-31 18:13:19
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-05-09 09:59:03
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\newComponents\pushDownDialog\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="pushDownDialog">
    <el-dialog title="下推配置" :close-on-click-modal="false" :visible.sync="dialogTableVisible">
      <el-form ref="projectForm" :rules="rules" :inline="true" :model="formInline" class="demo-form-inline" label-position="right">
        <el-form-item
          label="单据编号:"
          prop="inspectCode"
          :rules="[
            {
              required: codeRequired,
              message: '该参数是必填项',
              trigger: ['blur', 'change']
            }
          ]"
        >
          <CustomCodeRule
            ref="commonCodeRuleInput"
            v-model="formInline.inspectCode"
            style="width: 180px"
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
        </el-form-item>

        <el-form-item
          label="检验类型:"
          prop="type"
          :rules="[
            {
              required: true,
              message: '该参数是必填项',
              trigger: ['blur', 'change']
            }
          ]"
        >
          <el-select
            v-model="formInline.type"
            placeholder="请选择"
            size="mini"
            style="width: 180px"
            @change="changeTypeHandle"
          >
            <el-option
              v-for="(item, index) in inspectTypeEnums"
              :key="index"
              :label="item.orderTypeName"
              :value="item.orderType"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="业务类型:"
          prop="businessTypeCode"
        >
          <el-input
            v-model="formInline.businessTypeCodeName"
            style="width: 180px"
            size="mini"
            clearable
            disabled
          />
        </el-form-item>

        <!--
        <el-form-item
          label="关联单据类型"
          prop="relateDocumentType"
        >
          <el-select
            v-model="formInline.relateDocumentType"
            style="width: 180px"
            placeholder="请选择"
            size="mini"
          >
            <el-option v-for="(item, index) in documentEnums" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
      -->

      </el-form>
      <el-table
        :header-cell-style="headerCellStyle"
        :data="gridData"
        highlight-current-row
        :max-height="300"
        style="width: 100%"
      >
        <el-table-column property="relateOrderNumber" label="关联单据编号" />
        <el-table-column property="materialCode" label="物料编码" />
        <el-table-column property="materialName" label="物料名称" />
        <el-table-column property="barCode" label="关联批次" />
        <el-table-column property="schemeId" label="检验方案" min-width="120px">
          <template slot-scope="{ row, $index }">
            <el-select v-model="row.schemeId" placeholder="请选择" @change="changeInspectQuantity(row)">
              <el-option
                v-for="item in row.schemes"
                :key="item.schemeId"
                :label="item.schemeName"
                :value="item.schemeId"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column property="inspectionQuantity" label="送检数量">
          <template slot-scope="{ row }">
            <el-input
              v-model="row.inspectionQuantity"
              class="hide-spinners"
              type="number"
              :min="0"
              @change="changeInspectQuantity(row)"
            />
          </template>
        </el-table-column>
        <el-table-column property="samplingQuantity" label="抽样数量">
          <template slot-scope="{ row }">
            <el-input v-model="row.samplingQuantity" class="hide-spinners" type="number" :min="0" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePushDownData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getPushDownList, getSampleNumByScheme, savePushDown, getInspectTypeEnumsByConfig, getPushDataList } from '@/api/quality-manage.js'
import CustomCodeRule from '@/components/CodeRuleDialog/index'

export default {
  name: 'PushDownDialog',
  components: {
    CustomCodeRule
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    typeCode: {
      type: Number,
      default: 91
    }
  },
  data() {
    return {
      gridData: [],
      pushDownConfig: {},
      isAutoOpen: false,
      formInline: {
        inspectCode: ''
      },
      // 下推传的数据
      pushDownData: null,
      // 检验类型枚举
      inspectTypeEnums: [],
      rules: {
        inspectCode: [{ required: true, message: '该参数是必填项', trigger: ['blur', 'change'] }],
        type: [{ required: true, message: '该参数是必填项', trigger: ['blur', 'change'] }]
      },
      // 单据编码 start
      receiptCodePlaceholder: '请输入',
      codeRequired: true,
      rulesTypeExtraRequestParam: {}
      // 单据编码 end

    }
  },
  computed: {
    dialogTableVisible: {
      get() {
        console.log('🚀 ~ get ~ this.showDialog:', this.showDialog)
        return this.showDialog
      },
      set(val) {
        this.$emit('update:showDialog', val)
      }
    }
  },
  watch: {},
  created() {},

  mounted() {
    setTimeout(() => {
        this.$refs?.commonCodeRuleInput?.init(this.typeCode)
    }, 500)

    console.log('🚀 ~ dialogTableVisible:', this.dialogTableVisible)
    this.pushDownData = JSON.parse(sessionStorage.getItem('PUSH_DOWN_DATA'))
    this.pushDownData?.pushDownConf?.valueList.map(item => {
      // 获取单据类型
      if (
        item.valueCode === 'targetOrderType'
      ) {
        const cleanedValue = item.value.trim().replace(/^['"]|['"]$/g, '')
        this.getInspectTypeEnums(cleanedValue)
      }
      // 获取目标单据状态的值
      if (
        item.valueCode === 'targetOrderState'
      ) {
        this.inspectState = item.value
      }
    })

    // 移除sessionStorage中的数据
    // process.env.NODE_ENV === 'production' && sessionStorage.removeItem('PUSH_DOWN_DATA')
  },
  methods: {
    // 默认的编码规则
    defaultCodeRule(defaultCodeRule) {
      this.formInline.numberRuleId = defaultCodeRule?.id || null
      this.formInline.ruleFormItems = defaultCodeRule?.prefixDetailList || []
    },
    // 编码规则确认  初始化有此回调说明没有人工输入哦
    handleConfirmCodeRuleDialog(val, id, ruleFormItems) {
      this.formInline.inspectCode = ''
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
            str += this.formInline.inspectCode
          } else {
            str += item.value
          }
        })
      }
      // 没有人工输入，自行输入了单号 则覆盖编码规则
      if (!hasManualInput && this.formInline.inspectCode) {
        str = this.formInline.inspectCode
      }
      // 没有人工输入，没有输入了单号 编码规则
      if (!hasManualInput && !this.formInline.inspectCode) {
        this.formInline.ruleFormItems.forEach(item => {
          str += item.value
        })
      }
      console.log('构造收料单号', this.formInline.ruleFormItems)
      return str
    },
    changeMethod() {},
    // 获取检验类型枚举
    async getInspectTypeEnums(param) {
      const params = {
        categoryCode: param
      }
      const result = await getInspectTypeEnumsByConfig(params)
      const { data } = result.data || []
      this.inspectTypeEnums = data || []
      let type = ''

      for (let i = 0; i < this.inspectTypeEnums?.length; i++) {
        if (this.inspectTypeEnums[i].isDefault) {
          type = this.inspectTypeEnums[i].orderType
          break
        }
      }
      this.formInline.type = type
      this.changeTypeHandle(this.formInline.type)
    },
    changeTypeHandle(val) {
      // 赋值给下推数据
      this.$set(this.pushDownData, 'inspectType', val)

      // 业务类型 默认赋值
      const typeEnumsItem = this.inspectTypeEnums.find(item => item.orderType === val)
      this.$set(this.formInline, 'businessTypeCode', typeEnumsItem?.businessTypeCode)
      this.$set(this.formInline, 'businessTypeCodeName', typeEnumsItem?.businessTypeName)

      this.getPushDownDataList()
    },
    // 获取下方表格数据
    getPushDownDataList() {
      getPushDataList(this.pushDownData).then(res => {
        const { pushDownConfig = {}, receiptPushInspects = [] } = res.data.data || {}
        const promises = receiptPushInspects.map(item => {
          if (item.schemes?.length > 0) {
            // 赋值第一个检验方案
            item.schemeId = item.schemes[0].schemeId

            // 获取抽样数量
            const params = {
              num: item.inspectionQuantity,
              schemeId: item.schemeId
            }

            // 返回一个 Promise
            return getSampleNumByScheme(params).then(result => {
              const samplingQuantity = result.data?.data?.sampleNum || 0
              this.$set(item, 'samplingQuantity', samplingQuantity) // 更新属性

              // 返回更新后的对象
              return {
                ...item,
                materialName: item.materialFields.name,
                samplingQuantity: samplingQuantity // 确保 samplingQuantity 被包含
              }
            })
          } else {
            // 如果没有 schemes，直接返回原始对象
            return Promise.resolve({
              ...item,
              materialName: item.materialFields.name,
              samplingQuantity: null // 默认值
            })
          }
        })

        // 使用 Promise.all 等待所有 Promise 完成
        Promise.all(promises).then(updatedItems => {
          this.gridData = updatedItems // 更新 this.gridData
        })

        this.pushDownConfig = pushDownConfig
      })
    },
    headerCellStyle({ row, colunm, rowIndex, columnIndex }) {
      return {
        background: '#F1F5FC',
        color: '#333333',
        'font-family': 'Source Han Sans CN',
        'font-weight': '400'
      }
    },
    async changeInspectQuantity(row) {
      const params = {
        num: row.inspectionQuantity,
        schemeId: row.schemeId
      }
      if (typeof row.schemeId !== 'number') return
      const result = await getSampleNumByScheme(params)
      const samplingQuantity = result.data?.data?.sampleNum || 0
      row.samplingQuantity = samplingQuantity
    },
    handleResetCode() {
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    // handleConfirmCodeRuleDialog(code) {
    //   this.formInline.inspectCode = code
    // },
    // 保存下推数据
    async savePushDownData() {
      // // 新增并且没有编码时，赋值编码
      // if (!this.formInline.inspectCode) {
      //   this.isAutoOpen = true
      // }

      // // 等待编码赋值完成
      // await new Promise((resolve) => {
      //   const interval = setInterval(() => {
      //     if (this.formInline.inspectCode) {
      //       clearInterval(interval)
      //       resolve()
      //     }
      //   }, 100)
      // })

      try {
        const validateOptions = {
          // 校验的数组
          forms: [
            {
              positionInfo: '下推配置',
              formEntity: this?.$refs?.projectForm
            }
          ],
          // 用于展开基本信息或tabs的方法对象（非必传）
          otherFunc: {
            // changeTabs: name => {
            //   this.tabValue = name
            // }
            // expandInfo: () => {
            //   this.$refs.baseForm.isFold = true
            // }
          }
        }
        const result = await this.$validateDialog(validateOptions)
        if (!result) return

        // await this.$refs['projectForm'].validate()

        // 获取目标单据状态的值
        this.pushDownConfig.inspectState = this.inspectState
        const inspectCode = this.createReceiptNumber() // 生成单据编号

        const params = {
          pushDownConfig: this.pushDownConfig,
          pushList: [
            {
              inspectCode: inspectCode,
              inspectType: this.formInline.type,
              inspectMaterials: [...this.gridData]
            }
          ]
        }
        console.log('保存时的参数', params)
        savePushDown(params).then(res => {
          this.$notify({
            title: '提示',
            message: '新增成功',
            type: 'success',
            duration: 2000
          })
          this.dialogTableVisible = false
          this.$eventBus.$emit('refreshList')
        })
      } catch (error) {
        console.log('🚀 ~ savePushDownData ~ error:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pushDownDialog {
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
</style>
