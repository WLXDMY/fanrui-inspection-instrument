<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-06-04 19:06:53
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-09-19 14:52:13
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionProgram\components\tabPages\components\projectIndicator.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-if="!noSelectRow" class="projectIndicator">
    <el-form
      ref="projectForm"
      :inline="true"
      :model="currentRow"
      :rules="rules"
      class="demo-form-inline"
      label-position="right"
      label-width="150px"
    >
      <section class="centerArea">
        <div>
          项目指标
          <el-button type="text" @click="changeRow('first')">首行</el-button>
          <el-button type="text" @click="changeRow('previous')">上一行</el-button>
          <el-button type="text" @click="changeRow('next')">下一行</el-button>
          <el-button type="text" @click="changeRow('last')">末行</el-button>
        </div>

        <!-- 基本信息 -->
        <el-form-item label="序号">
          <el-input :value="clickIndex + 1" size="mini" disabled />
        </el-form-item>
        <el-form-item label="物料编码" prop="materialCode">
          <el-input v-model="currentRow.materialCode" size="mini" disabled />
        </el-form-item>
        <el-form-item label="物料名称" prop="materialName">
          <el-input v-model="currentRow.materialName" size="mini" disabled />
        </el-form-item>
        <el-form-item label="物料规格" prop="materialStandard">
          <el-input v-model="currentRow.materialStandard" size="mini" disabled />
        </el-form-item>
        <el-form-item label="抽样方案:" prop="samplePlanName">
          <el-input v-model="currentRow.samplePlanName" placeholder="请输入" size="mini" @focus="showDialog = true" />
        </el-form-item>
        <el-form-item label="检验水平:" prop="inspectLevel">
          <el-select v-model="currentRow.inspectLevel" disabled size="mini">
            <el-option v-for="item in levelTypeList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="严格度:" prop="stringency">
          <el-select v-model="currentRow.stringency" disabled size="mini">
            <el-option v-for="item in sternWidthLevelList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="AQL:" prop="aqlValue">
          <el-select v-model="currentRow.aqlValue" disabled size="mini">
            <el-option v-for="item in aqlTypeList" :key="item.code" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
      </section>

      <section class="centerArea check">
        <div class="title">
          检验结果
          <el-upload action="" :http-request="params => handleUpload(params, 'checkFile')" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType">检验附件 </el-button>
          </el-upload>
        </div>
        <el-form-item label="检验结果：">
          <el-radio-group v-model="currentRow.checkResult" :disabled="isDetailType || checkResultDisabled">
            <el-radio :label="1">合格</el-radio>
            <el-radio :label="0">不合格</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="不合格数量：" prop="unqualifiedQuantity">
          <el-input
            v-model="currentRow.unqualifiedQuantity"
            size="mini"
            type="number"
            :min="0"
            :disabled="checkResultDisabled"
            @change="changeNum($event, 'unqualifiedQuantity', 'qualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="合格数量：" prop="qualifiedQuantity">
          <el-input
            v-model="currentRow.qualifiedQuantity"
            size="mini"
            :disabled="checkResultDisabled"
            @change="changeNum($event, 'qualifiedQuantity', 'unqualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="耗时时间：" prop="checkConsumerTime">
          <el-input v-model="currentRow.checkConsumerTime" size="mini" :disabled="checkResultDisabled" />
        </el-form-item>
        <el-form-item label="时间单位：" prop="checkTimeUnit">
          <el-select
            v-model="currentRow.checkTimeUnit"
            placeholder="请选择"
            size="mini"
            :disabled="checkResultDisabled"
          >
            <el-option v-for="(item, index) in timeEnums" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </section>

      <section v-if="reCheckValue == 1 && !isAddType" class="centerArea check">
        <div class="title">
          复核结果
          <el-upload action="" :http-request="params => handleUpload(params, 'reviewFile')" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType"> 复核附件 </el-button>
          </el-upload>
        </div>
        <el-form-item label="复核结果：">
          <el-radio-group v-model="currentRow.reviewResult" :disabled="reviewResultDisabled || isDetailType">
            <el-radio :label="1">合格</el-radio>
            <el-radio :label="0">不合格</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="不合格数量：" prop="reviewUnqualifiedQuantity">
          <el-input
            v-model="currentRow.reviewUnqualifiedQuantity"
            size="mini"
            :disabled="reviewResultDisabled"
            @change="changeNum($event, 'reviewUnqualifiedQuantity', 'reviewQualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="合格数量：" prop="reviewQualifiedQuantity">
          <el-input
            v-model="currentRow.reviewQualifiedQuantity"
            size="mini"
            :disabled="reviewResultDisabled"
            @change="changeNum($event, 'reviewQualifiedQuantity', 'reviewUnqualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="耗时时间：" prop="reviewConsumerTime">
          <el-input v-model="currentRow.reviewConsumerTime" size="mini" :disabled="reviewResultDisabled" />
        </el-form-item>
        <el-form-item label="时间单位：" prop="reviewTimeUnit">
          <el-select
            v-model="currentRow.reviewTimeUnit"
            placeholder="请选择"
            size="mini"
            :disabled="reviewResultDisabled"
          >
            <el-option v-for="(item, index) in timeEnums" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </section>

      <section v-if="approveValue == 1 && !isAddType" class="centerArea check">
        <div class="title">
          核准结果
          <el-upload action="" :http-request="params => handleUpload(params, 'authorizeFile')" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType"> 核准附件 </el-button>
          </el-upload>
        </div>
        <el-form-item label="核准结果：">
          <el-radio-group v-model="currentRow.authorizeResult" :disabled="authorizeResultDisabled || isDetailType">
            <el-radio :label="1">合格</el-radio>
            <el-radio :label="0">不合格</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="不合格数量：" prop="authorizeUnqualifiedQuantity">
          <el-input
            v-model="currentRow.authorizeUnqualifiedQuantity"
            size="mini"
            :disabled="authorizeResultDisabled"
            @change="changeNum($event, 'authorizeUnqualifiedQuantity', 'authorizeQualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="合格数量：" prop="authorizeQualifiedQuantity">
          <el-input
            v-model="currentRow.authorizeQualifiedQuantity"
            size="mini"
            :disabled="authorizeResultDisabled"
            @change="changeNum($event, 'authorizeQualifiedQuantity', 'authorizeUnqualifiedQuantity')"
          />
        </el-form-item>
        <el-form-item label="耗时时间：" prop="authorizeConsumerTime">
          <el-input v-model="currentRow.authorizeConsumerTime" size="mini" :disabled="authorizeResultDisabled" />
        </el-form-item>
        <el-form-item label="时间单位：" prop="authorizeTimeUnit">
          <el-select
            v-model="currentRow.authorizeTimeUnit"
            placeholder="请选择"
            size="mini"
            :disabled="authorizeResultDisabled"
          >
            <el-option v-for="(item, index) in timeEnums" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </section>
    </el-form>
    <!-- 检验决策 -->
    <section v-if="showDecision" class="centerArea">
      <div>
        检验决策
        <i
          class="el-icon-circle-plus-outline"
          :style="isDetailType ? {} : { color: '#1890ff', cursor: 'pointer' }"
          @click="addDecision"
        />
        <span v-show="showTips" style="color: #e6a23c; font-size: 12px; margin-left: 5px">
          检验决策总数与物料送检数量不相等
        </span>
      </div>
      <el-table :data="currentRow.materialDecisions" style="width: 100%">
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="quantity">
          <template #header> 数量({{ currentRow.inspectQuantity }}) </template>
          <template slot-scope="{ row }">
            <el-input v-model="row.quantity" class="hide-spinners" :disabled="isDetailType" type="number" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="decisionCode" label="决策">
          <template slot-scope="{ row }">
            <el-select
              v-model="row.decisionCode"
              placeholder="请选择"
              size="mini"
              :disabled="isDetailType"
              @change="changeDecision($event, row)"
            >
              <el-option
                v-for="(item, index) in decisionEnums"
                :key="index"
                :label="item.decision"
                :value="item.decisionCode"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="statusName" label="状态">
          <template slot-scope="{ row }">
            <el-input v-model="row.statusName" disabled />
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注">
          <template slot-scope="{ row }">
            <el-input v-model="row.remark" :disabled="isDetailType" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-button class="deleteBtn" size="mini" type="text" @click="deleteDecision(row, $index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

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
  </div>
</template>
<script>
import {
  decideConfig,
  getDecisionEnums,
  deleteDecision,
  uploadFile,
  aqlList,
  getSternWidthLevelList,
  levelList,
  getSampleNumByScheme
} from '@/api/quality-manage.js'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import { CHECK_STANDARDS_TABLE } from '../../../../inspectionProgram/components/tabPages/constant.js'
export default {
  name: 'InspectionProgram',
  components: { CommonSelectDialogPlus },
  inject: ['sheetInitStatus'],
  props: {
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
    }
  },
  data() {
    return {
      decisionEnums: [],
      // rules: {},
      showDialog: false,
      tableColumn: CHECK_STANDARDS_TABLE,
      reCheckValue: '',
      approveValue: '',
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
      ]
    }
  },
  computed: {
    isAddType() {
      return this.$route.name.includes('Add')
    },
    noSelectRow() {
      return this.clickIndex === -1
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    },
    showDecision() {
      return !this.isAddType && this.showDecisions /* && this.currentRow.showDecisions */
    },
    rules() {
      const { checkResult, reviewResult, authorizeResult } = this.currentRow
      const checkRule = [{ required: true, message: '该参数是必填项' }]
      const rules = {}
      if (typeof checkResult === 'number') {
        rules.unqualifiedQuantity = checkRule
        rules.qualifiedQuantity = checkRule
      } else {
        rules.unqualifiedQuantity = []
        rules.qualifiedQuantity = []
      }
      if (typeof reviewResult === 'number') {
        rules.reviewUnqualifiedQuantity = checkRule
        rules.reviewQualifiedQuantity = checkRule
      } else {
        rules.reviewUnqualifiedQuantity = []
        rules.reviewQualifiedQuantity = []
      }

      if (typeof authorizeResult === 'number') {
        rules.authorizeUnqualifiedQuantity = checkRule
        rules.authorizeQualifiedQuantity = checkRule
      } else {
        rules.authorizeUnqualifiedQuantity = []
        rules.authorizeQualifiedQuantity = []
      }
      return rules
    },
    showTips() {
      const quantity = this.currentRow.materialDecisions?.reduce((p, v) => {
        return p + (Number(v.quantity) || 0)
      }, 0)
      return quantity !== this.currentRow.inspectQuantity
    }
  },
  created() {
    this.getDecisionEnums()
    Promise.allSettled([aqlList(), getSternWidthLevelList(), levelList()]).then(res => {
      const [res1, res2, res3] = res
      this.aqlTypeList = res1.value.data.data
      this.sternWidthLevelList = res2.value.data.data
      this.levelTypeList = res3.value.data.data
    })
  },
  mounted() {
    setTimeout(() => {
      this.getDecideConfig()
    }, 1000)
  },
  methods: {
    changeNum(val, self, other) {
      if (!this.currentRow.inspectQuantity) return
      if (val > Number(this.currentRow.inspectQuantity)) {
        this.$set(this.currentRow, self, Number(this.currentRow.inspectQuantity))
      }
      if (val < 0) {
        this.currentRow[self] = 0
      }
      this.$set(this.currentRow, other, this.currentRow.inspectQuantity - this.currentRow[self])
    },
    // 获取决策枚举
    async getDecisionEnums() {
      const params = {
        inspectType: 'incomingInspect'
      }
      const res = await getDecisionEnums(params)
      this.decisionEnums = res.data?.data || []
    },
    // 判断送检单是否需要复核和核准
    async getDecideConfig() {
      const params = {
        fullPathCode: 'quality.inspectSheetProcessConfiguration'
      }
      const { data } = await decideConfig(params)
      data?.data?.valueList.forEach(item => {
        if (item.valueName === '送检单是否需要复核(单选)') {
          this.reCheckValue = item.value
        }
        if (item.valueName === '送检单是否需要核准(单选)') {
          this.approveValue = item.value
        }
      })

      // 有核准
      // 1、需要判断检验结果的值。
      // 检验结果的判定，没有值，则检验结果可填写。复核和核准置灰
      // 检验结果的判定，有值。
      // 2、复核的判定是否有值。
      // 复核的判定，没有值，则检验结果和核准置灰，复核填写。
      // 复核的判定，有值，则检验结果和复核置灰，核准填写。

      // 根据配置判断以哪个字段为准
      // eslint-disable-next-line
      if (this.approveValue == 1) {
        if (typeof this.currentRow.checkResult !== 'number') {
          // 检验结果的判定，没有值
          this.reviewResultDisabled = true
          this.authorizeResultDisabled = true
          // this.checkResultDisabled = false
        } else {
          if (typeof this.currentRow.reviewResult !== 'number') {
            // 复核的判定，没有值
            // this.checkResultDisabled = true
            this.authorizeResultDisabled = true
            this.reviewResultDisabled = false
          } else {
            // 复核的判定，有值
            // this.checkResultDisabled = true
            this.reviewResultDisabled = true
            this.authorizeResultDisabled = false
          }
        }
        // eslint-disable-next-line eqeqeq
      } else if (this.approveValue == 0 && this.reCheckValue == 1) {
        // 只有复核
        if (typeof this.currentRow.checkResult !== 'number') {
          // 检验结果的判定，没有值
          this.reviewResultDisabled = true
          // this.checkResultDisabled = false
        } else {
          // 检验结果的判定，有值
          // this.checkResultDisabled = true
          this.reviewResultDisabled = false
        }
      }
    },
    // 抽样方案确认
    async handleConfirm(row) {
      this.currentRow.samplePlanId = row.id
      this.currentRow.samplePlanName = row.name
      this.currentRow.inspectLevel = row.inspectLevel
      this.currentRow.stringency = row.stringency
      this.currentRow.aqlValue = row.aqlValue
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
    // 上传文件
    async handleUpload(params, fileType) {
      this.loading = true
      const formData = new FormData()
      formData.append('file', params.file)
      const {
        data: { data }
      } = await uploadFile(formData)
      this.$eventBus.$emit('addFile', { data, fileType })
    }
  }
}
</script>

<style lang="scss" scoped>
.projectIndicator {
  .centerArea {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 18px 9px 18px;
    margin-bottom: 10px;
    .title {
      display: flex;
      justify-content: space-between;
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
</style>
