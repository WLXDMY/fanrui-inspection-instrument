<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-09-02 16:14:19
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-09 16:56:00
 * @Description:
-->
<template>
  <div class="inspectionSample">
    <div>
      <!-- <div class="inspection-text">样本检测值填写</div> -->
      <div class="inspection-text-name">
        {{ currentItemRow.itemName }}
        <span v-if="currentItemRow.analyzeMethod === 'quantitative'" class="inspection-text-name-right">
          参考值:
          <span class="blue">
            {{ $showReferenceValue(currentItemRow) }}
          </span>
        </span>
      </div>
      <div class="inspection-button">
        样本总行数：
        <NumberInput
          v-model="sampleTotalNum"
          style="width: 300px;margin-right:10px"
          :disabled="isDetailType"
          size="small"
        >
          <template v-slot:append>
            <el-button
              type="primary"
              plain
              class="batch-add"
              size="small"
              @click="addBatchLine"
            >批量添加</el-button>
          </template>
        </NumberInput>
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          :disabled="isDetailType"
          @click="addCode"
        >增行</el-button>
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multipleSelection.length === 0 || isDetailType"
          @click="deleteCode"
        >
          删行
        </el-button>
        <el-button
          size="mini"
          @click="identifyingSample"
        >同步标识</el-button>
      </div>
      <el-form ref="form" :model="currentItemRow">
        <el-table
          :header-cell-style="headerCellStyle"
          :data="currentItemRow.itemValues"
          style="width: 100%"
          :max-height="400"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" width="50" label="序号" />
          <el-table-column prop="inspectValue" label="样本检验值">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :rules="{
                  required: currentItemRow.required,
                  message: '请选择',
                  trigger: ['change', 'blur']
                }"
                :prop="'itemValues.' + $index + '.inspectValue'"
              >
                <div
                  v-if="currentItemRow.inputMode === 'singleChoice' || currentItemRow.inputMode === 'multipleChoice'"
                >
                  <el-select
                    v-model="row.inspectValue"
                    :multiple="currentItemRow.inputMode === 'multipleChoice'"
                    placeholder="请选择"
                    clearable
                    @change="changeDetectionValue($event, 'checkConclusion', row)"
                  >
                    <el-option
                      v-for="(item, index) in currentItemRow.itemOptionList"
                      :key="index"
                      :label="item.optionName"
                      :value="item.optionName"
                    />
                  </el-select>
                </div>
                <div v-else>
                  <el-input
                    v-model="row.inspectValue"
                    size="small"
                    placeholder="请输入"
                    :data-index="$index"
                    data-property="inspectValue"
                    @change="changeNum($event, 'checkConclusion', row)"
                    @keyup.enter.native="focusNextInput($index, 'inspectValue')"
                  />
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="checkConclusion" label="样本检验结论">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'itemValues.' + $index + '.checkConclusion'"
                :rules="{ required: currentItemRow.required, message: '请选择', trigger: ['change', 'blur'] }"
              >
                <el-select v-model="row.checkConclusion" placeholder="请选择" clearable @change="changeCheckConclusion">
                  <el-option
                    v-for="(item, index) in conclusionOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="productCode" label="样本码">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.productCode"
                :data-index="$index"
                data-property="productCode"
                @keyup.enter.native="focusNextInput($index, 'productCode')"
              />
            </template>
          </el-table-column>
          <!-- 样本标识 -->
          <el-table-column prop="sampleIdentification" label="样本标识">
            <template #header>
              样本标识
              <!--
              <el-tooltip class="item" effect="dark" content="样本标识会自动同步到其他检验项" placement="top">
                <i class="el-icon-warning-outline" clsss="sampleIdentification-icon" />
              </el-tooltip>
              -->
            </template>

            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.sampleIdentification"
                maxlength="50"
                :data-index="$index"
                data-property="sampleIdentification"
                @keyup.enter.native="focusNextInput($index, 'sampleIdentification')"
              />
            </template>
          </el-table-column>
          <!-- 复核 -->
          <el-table-column v-if="reCheckValue == 1" prop="reviewValue" label="复核样本检验值">
            <template slot-scope="{ row, $index }">
              <template
                v-if="currentItemRow.inputMode === 'singleChoice' || currentItemRow.inputMode === 'multipleChoice'"
              >
                <el-select
                  v-model="row.reviewValue"
                  :multiple="currentItemRow.inputMode === 'multipleChoice'"
                  placeholder="请选择"
                  clearable
                  @change="changeDetectionValue($event, 'reviewConclusion', row)"
                >
                  <el-option
                    v-for="(item, index) in currentItemRow.itemOptionList"
                    :key="index"
                    :label="item.optionName"
                    :value="item.optionName"
                  />
                </el-select>
              </template>
              <template v-else>
                <el-input
                  v-model="row.reviewValue"
                  size="small"
                  :data-index="$index"
                  data-property="reviewValue"
                  @change="changeNum($event, 'reviewConclusion', row)"
                  @keyup.enter.native="focusNextInput($index, 'reviewValue')"
                />
              </template>
            </template>
          </el-table-column>
          <el-table-column v-if="reCheckValue == 1" prop="reviewConclusion" label="复核样本检验结论">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.reviewConclusion" placeholder="请选择" clearable>
                <el-option
                  v-for="(item, index) in conclusionOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.code"
                />
              </el-select>
            </template>
          </el-table-column>
          <!-- 核准 -->
          <el-table-column v-if="approveValue == 1" prop="authorizeValue" label="核准样本检验值">
            <template slot-scope="{ row, $index }">
              <template
                v-if="currentItemRow.inputMode === 'singleChoice' || currentItemRow.inputMode === 'multipleChoice'"
              >
                <el-select
                  v-model="row.authorizeValue"
                  :multiple="currentItemRow.inputMode === 'multipleChoice'"
                  placeholder="请选择"
                  clearable
                  @change="changeDetectionValue($event, 'authorizeConclusion', row)"
                >
                  <el-option
                    v-for="(item, index) in currentItemRow.itemOptionList"
                    :key="index"
                    :label="item.optionName"
                    :value="item.optionName"
                  />
                </el-select>
              </template>
              <template v-else>
                <el-input
                  v-model="row.authorizeValue"
                  size="small"
                  :data-index="$index"
                  data-property="authorizeValue"
                  @change="changeNum($event, 'authorizeConclusion', row)"
                  @keyup.enter.native="focusNextInput($index, 'authorizeValue')"
                />
              </template>
            </template>
          </el-table-column>
          <el-table-column v-if="approveValue == 1" prop="authorizeConclusion" label="核准样本检验结论">
            <template slot-scope="{ row, $index }">
              <el-select
                v-model="row.authorizeConclusion"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="(item, index) in conclusionOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.code"
                />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </div>
</template>
<script>
import { decideConfig, deleteNumItemValue } from '@/api/quality-manage.js'

export default {
  name: 'InspectionSample',
  components: {
    NumberInput: () => import('@/components/NumberInput')
  },
  inject: ['sheetInitStatus'],

  props: {
    // 分录明细行
    currentRow: {
      type: Object,
      default: () => {}
    },
    currentItemRow: {
      type: Object,
      default: () => {}
    },
    // 所在样次的所有检验项目
    numItems: {
      type: Array
    },
    initStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      multipleSelection: [],
      reCheckValue: 0,
      approveValue: 0,
      conclusionOptions: [
        {
          label: '合格',
          code: 1
        },
        {
          label: '不合格',
          code: 0
        }
      ],
      headerCellStyleDefault: {
        background: '#F1F5FC',
        color: '#333333',
        'font-family': 'Source Han Sans CN',
        'font-weight': '400'
      },
      // 样本总行数
      sampleTotalNum: '',
      itemValuesFlag: false // 检验值是否更新不合格数的值，默认false，不更新。true更新
    }
  },
  computed: {
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    }
  },
  watch: {
    'currentItemRow.itemValues': {
      handler(val, oldVal) {
        if (!this.itemValuesFlag) {
          return
        }

        // 处理样本不合格数的值
        if (this.currentItemRow.analyzeMethod === 'manual') return
        // 使用reduce方法计算checkConclusion值为0的项的个数
        const count = val?.reduce((acc, item) => {
          if (item.checkConclusion === 0) {
            acc++
          }
          return acc
        }, 0)
        console.log('处理样本不合格数的值 count', count)

        this.$set(this.currentItemRow, 'unqualifiedQuantity', count)
      },
      deep: true, // 深度监听
      immediate: true
    }
  },
  created() {
    // this.getDecideConfig()
  },
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 200)
    }
  },
  methods: {
    focusNextInput(index, prop) {
      const nextIndex = index + 1
      const table = this.$refs.form.$el.querySelector('.el-table__body-wrapper table')
      const nextInput = table.querySelector(`tbody tr.el-table__row:nth-child(${nextIndex + 1}) td.el-table__cell:nth-child(${this.getColumnIndex(prop)})  .el-input__inner`)

      if (nextInput) {
        console.log('点击下一行聚焦', nextInput)
        nextInput.focus()
      } else {
        console.log('未找到下一行的输入框')
      }
    },
    getColumnIndex(prop) {
      const columns = {
        'inspectValue': 3,
        'checkConclusion': 4,
        'productCode': 5,
        'sampleIdentification': 6,
        'reviewValue': 7,
        'reviewConclusion': 8,
        'authorizeValue': 9,
        'authorizeConclusion': 10
      }
      return columns[prop] || 0
    },
    // 表格样式
    headerCellStyle({ row, colunm, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        // 这里为了是将第二列的表头隐藏，就形成了合并表头的效果
        return { display: 'none' }
      }
      return { ...this.headerCellStyleDefault }
    },
    // 判断送检单是否需要复核和核准
    async getDecideConfig() {
      const inspectMaterialProcess = this.currentRow?.inspectMaterialProcess
      if (inspectMaterialProcess) {
        this.reCheckValue = inspectMaterialProcess.existReview
        this.approveValue = inspectMaterialProcess.existAuthorize
      }
    },

    // 新增单品码
    addCode() {
      this.currentItemRow.itemValues.push({})
      this.itemValuesFlag = true
    },
    // 批量添加
    addBatchLine() {
      const itemValuesLength = this.currentItemRow.itemValues.length
      if (this.sampleTotalNum <= itemValuesLength) {
        this.$notify({
          title: '提示',
          message: '当前已有行数大于等于样本总行数',
          type: 'warning',
          duration: 3000
        })
        return
      }

      const addNum = this.sampleTotalNum - itemValuesLength
      for (let i = 0; i < addNum; i++) {
        this.currentItemRow.itemValues.push({})
        this.itemValuesFlag = true
      }
      this.$notify({
        title: '提示',
        message: '添加成功',
        type: 'success',
        duration: 3000
      })
      console.log('批量添加 后', this.currentItemRow.itemValues)
    },
    // 删除单品码
    deleteCode() {
      const deleteIds = this.multipleSelection.map(item => item.id).filter(item => !isNaN(item))
      this.$confirm('删除样本检测值? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (deleteIds.length > 0) {
          deleteNumItemValue(deleteIds).then(_ => {
            this.$message.success('删除成功')
            this.currentItemRow.itemValues = this.currentItemRow.itemValues.filter(item => {
              return this.multipleSelection.indexOf(item) === -1
            })
            this.itemValuesFlag = true
          })
        } else {
          this.currentItemRow.itemValues = this.currentItemRow.itemValues.filter(item => {
            return this.multipleSelection.indexOf(item) === -1
          })
          this.$message.success('删除成功')
          this.itemValuesFlag = true
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    changeCheckConclusion() {
      this.itemValuesFlag = true
    },
    // 样本检验值修改后，判定结论
    changeNum(val, name, row) {
      if (this.currentItemRow.analyzeMethod !== 'quantitative') return
      const result = this.$changeCheckResult(this.currentItemRow, val)
      // row[name] = result
      this.$set(row, name, result)
      this.itemValuesFlag = true
    },
    // 处理定性分析-值修改后，判定结论
    changeDetectionValue(val, name, row) {
      if (this.currentItemRow.analyzeMethod !== 'qualitative') return
      const itemOptionList = this.currentItemRow.itemOptionList
      const valArray = Array.isArray(val) ? val : [val]

      // 使用filter和map方法筛选出匹配的judgeFlag值，并去重
      const judgeFlagArray = [
        ...new Set(
          valArray
            .filter(result => itemOptionList.some(option => option.optionName === result))
            .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
        )
      ]

      if (judgeFlagArray.length > 0) {
        if (this.currentItemRow.inputMode === 'singleChoice') {
          this.$set(row, name, judgeFlagArray[0])
        } else if (this.currentItemRow.inputMode === 'multipleChoice') {
          if (judgeFlagArray.length === 1) {
            this.$set(row, name, judgeFlagArray[0])
          } else if (judgeFlagArray.length > 1) {
            this.$set(row, name, 0)
          }
        }
      } else {
        this.$set(row, name, '')
      }
      this.itemValuesFlag = true
    },
    // 同步标识
    identifyingSample() {
      this.numItems.forEach((numItem, index) => {
        // 只有当 recordInspectionValue 为 1 时，才进行赋值
        if (numItem.recordInspectionValue === 1) {
          // 确保 itemValues 是数组
          if (!Array.isArray(numItem.itemValues)) {
            // numItem.itemValues = []
            return
          }

          // 遍历 currentItemRow.itemValues 数组，根据索引赋值
          this.currentItemRow.itemValues.forEach((itemValue, valueIndex) => {
            // 确保 numItem.itemValues 中存在该索引对应的元素
            if (numItem.itemValues.length > valueIndex) {
              // 使用 this.$set 设置响应式属性
              this.$set(numItem.itemValues[valueIndex], 'sampleIdentification', itemValue.sampleIdentification)
            }
          })
        }
      })
      this.$notify({
        title: '提示',
        message: '同步成功',
        type: 'success',
        duration: 3000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inspectionSample {
  .inspection-text {
    margin: 19px 0 12px 0;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 500;
    font-size: 16px;
    color: #333333;
  }
  .inspection-text-name {
    margin: 12px 0;
    font-size: 14px;
  }
  .inspection-text-name-right {
    margin-left: 10px;
    .blue {
      color: #1890ff;
    }
  }
  .inspection-button {
    margin-bottom: 12px;
  }
  .centerArea {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    margin-bottom: 10px;
  }
}
.defectDialog {
  display: flex;
  align-items: center;
  margin-left: 10%;
  width: 70%;
  & > div {
    flex: 1;
  }
}
::v-deep .el-form-item {
  margin-bottom: 0;
}
.sampleIdentification-icon {
  margin-left: 4px;
}
::v-deep  .batch-add {
  background: #1890ff !important;
  border-color: #1890ff !important;
  color: #FFFFFF !important;
}
</style>
