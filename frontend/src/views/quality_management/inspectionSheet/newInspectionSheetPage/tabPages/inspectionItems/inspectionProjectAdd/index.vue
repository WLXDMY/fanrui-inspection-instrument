<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-09-02 16:14:19
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-30 15:37:42
 * @Description:
-->
<template>
  <div class="inspectionSample">
    <div>
      <div class="inspection-text-name" />
      <div class="inspection-button">
        检验项行数：
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
          <el-table-column prop="code" label="检验项目编码">
            <template #header> <span style="color: #f56c6c;">*</span>检验项目编码 </template>
            <template slot-scope="{ row, $index }">
              <el-form-item
                :rules="{
                  required: true,
                  message: '请选择',
                  trigger: ['change', 'blur']
                }"
                :prop="'itemValues.' + $index + '.code'"
              >
                <el-input
                  v-model="row.code"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="检验项目名称">
            <template #header> <span style="color: #f56c6c;">*</span>检验项目名称 </template>
            <template slot-scope="{ row, $index }">
              <el-form-item
                :rules="{
                  required: true,
                  message: '请选择',
                  trigger: ['change', 'blur']
                }"
                :prop="'itemValues.' + $index + '.name'"
              >
                <el-input
                  v-model="row.name"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="groupId" label="检验项目组">
            <template #header> <span style="color: #f56c6c;">*</span>检验项目组 </template>
            <template slot-scope="{ row, $index }">
              <el-form-item
                :rules="{
                  required: true,
                  message: '请选择',
                  trigger: ['change', 'blur']
                }"
                :prop="'itemValues.' + $index + '.groupId'"
              >
                <el-select
                  v-model="row.groupId"
                  placeholder="请选择"
                  size="mini"
                  filterable
                  clearable
                >
                  <el-option v-for="(item, index) in groupList" :key="index" :label="item.groupName" :value="item.id" />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="verificationBasis" label="检验标准">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.verificationBasis"
              />
            </template>
          </el-table-column>

          <el-table-column prop="verificationInstrument" label="检验仪器" width="200">
            <template slot-scope="{ row, $index }">
              <y-complexSelect3
                v-model="row.verificationInstrument"
                style="width: 180px"
                :value-key="'instrumentCode'"
                :label-key="'instrumentName'"
                :keyword-key="'instrumentName'"
                @btnClickCallback="getShowDialogInstrument($index)"
                @selectChange="(e, options) => changeInstrument(e, options,$index)"
              />
            </template>
          </el-table-column>

          <el-table-column prop="analyzeMethodCode" label="分析方法">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'itemValues.' + $index + '.analyzeMethodCode'"
                :rules="{ required: false, message: '请选择', trigger: ['change', 'blur'] }"
              >
                <el-select
                  v-model="row.analyzeMethodCode"
                  placeholder="请选择"
                  clearable
                  @change="(val) => changeMethod(val, row)"
                >
                  <el-option
                    v-for="(item, index) in methodsList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="comparatorCode" label="比较符">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'itemValues.' + $index + '.comparatorCode'"
                :rules="{ required: false, message: '请选择', trigger: ['change', 'blur'] }"
              >
                <el-select
                  v-model="row.comparatorCode"
                  placeholder="请选择"
                  clearable
                  :disabled="row.analyzeMethodCode === 'qualitative' || row.analyzeMethodCode === 'manual'"
                  @change="changeCompare"
                >
                  <el-option
                    v-for="(item, index) in comparatorList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="referenceValue" label="标准/参考值">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.referenceValue"
                :disabled="row.analyzeMethodCode === 'qualitative' || row.analyzeMethodCode === 'manual'"
              />
            </template>
          </el-table-column>

          <el-table-column prop="upperLimitValue" label="上限值">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.upperLimitValue"
                :disabled="row.analyzeMethodCode === 'qualitative' || row.analyzeMethodCode === 'manual'"
              />
            </template>
          </el-table-column>

          <el-table-column prop="downLimitValue" label="下限值">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.downLimitValue"
                :disabled="row.analyzeMethodCode === 'qualitative' || row.analyzeMethodCode === 'manual'"
              />
            </template>
          </el-table-column>

          <el-table-column prop="inputMode" label="输入方式">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'itemValues.' + $index + '.inputMode'"
                :rules="{ required: false, message: '请选择', trigger: ['change', 'blur'] }"
              >
                <el-select
                  v-model="row.inputMode"
                  placeholder="请选择"
                  clearable
                  :disabled="row.analyzeMethodCode === 'quantitative'"
                >
                  <el-option
                    v-for="(item, index) in inputModeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="itemOptions" label="枚举值">
            <template #header>
              枚举值
              <el-tooltip placement="right" effect="dark" hide-after="0">
                <div slot="content" class="attachment-tip">
                  <div>提示：</div>
                  <div>当输入方式为多选输入时，多个值之间用英文逗号隔开。</div>
                </div>
                <i class="el-icon-warning-outline" clsss="sampleIdentification-icon" />
              </el-tooltip>
            </template>
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.itemOptions"
                :disabled="row.analyzeMethodCode === 'quantitative'"
              />
            </template>
          </el-table-column>

        </el-table>
      </el-form>
    </div>

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
  deleteNumItemValue,
  getProjectGroupList,
  getMethodsList,
  getComparisonOperatorsList,
  getInputModeListApi
} from '@/api/quality-manage.js'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'

export default {
  name: 'InspectionProjectAdd',
  components: {
    NumberInput: () => import('@/components/NumberInput'),
    CommonSelectDialogPlus
  },
  inject: ['sheetInitStatus'],
  props: {
  },
  data() {
    return {
      multipleSelection: [],
      headerCellStyleDefault: {
        background: '#F1F5FC',
        color: '#333333',
        'font-family': 'Source Han Sans CN',
        'font-weight': '400'
      },
      // 样本总行数
      sampleTotalNum: '',
      currentItemRow: {
        itemValues: []
      },
      groupList: [], // 检验项目组
      methodsList: [], // 检验方法判定
      comparatorList: [], // 比较符list
      inputModeOptions: [], // 输入方式枚举-根据分析方法过滤
      // 检验仪器
      extraParamsInstrument: { statuses: [1] },
      showDialogInstrument: false,
      currentInstrumentIndex: null, // 当前选中仪器行索引
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
      //  || this.sheetInitStatus()
    }
  },
  watch: {
    // 'currentItemRow.itemValues': {
    //   handler(val) {
    //     // 处理样本不合格数的值
    //     if (this.currentItemRow.analyzeMethod === 'manual') return
    //     // 使用reduce方法计算checkConclusion值为0的项的个数
    //     const count = val?.reduce((acc, item) => {
    //       if (item.checkConclusion === 0) {
    //         acc++
    //       }
    //       return acc
    //     }, 0)

    //     this.$set(this.currentItemRow, 'unqualifiedQuantity', count)
    //   },
    //   deep: true, // 深度监听
    //   immediate: true
    // }
  },
  created() {
    this.getList()
    this.getMethodsList()
    this.getComparison()
    this.getInputModeList()
  },
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 200)
    }
  },
  methods: {
    getShowDialogInstrument(index) {
      this.showDialogInstrument = true
      this.currentInstrumentIndex = index
    },
    // 仪器名称选择
    changeInstrument(val, options, index) {
      if (val) {
        const hasItem = options.find(el => el.instrumentCode === val)
        this.$set(this.currentItemRow.itemValues[index], 'verificationInstrument', hasItem?.instrumentName)
      } else {
        this.$set(this.currentItemRow.itemValues[index], 'verificationInstrument', '')
      }
    },
    // 仪器名称确定
    handleConfirmInstrument(row) {
      this.$set(this.currentItemRow.itemValues[this.currentInstrumentIndex], 'verificationInstrument', row.instrumentName)
      this.showDialogInstrument = false
    },
    // 分析方法
    changeMethod(val, row) {
      // 定量-->输入方式、枚举值清空
      if (val === 'quantitative') {
        this.$set(row, 'inputMode', '')
        this.$set(row, 'itemOptions', '')
      } else if (val === 'manual' || val === 'qualitative') {
        // 人工分析,定性分析-->比较符等4个清空
        this.$set(row, 'comparatorCode', '')
        this.$set(row, 'referenceValue', '')
        this.$set(row, 'upperLimitValue', '')
        this.$set(row, 'downLimitValue', '')
      }
    },
    // 比较符
    changeCompare() {},
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
    // 表格样式
    headerCellStyle({ row, colunm, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        // 这里为了是将第二列的表头隐藏，就形成了合并表头的效果
        return { display: 'none' }
      }
      return { ...this.headerCellStyleDefault }
    },

    // 新增单品码
    addCode() {
      this.currentItemRow.itemValues.push({})
    },
    // 批量添加
    addBatchLine() {
      const itemValuesLength = this.currentItemRow.itemValues.length
      if (this.sampleTotalNum <= itemValuesLength) {
        this.$notify({
          title: '提示',
          message: '当前已有行数大于等于总行数',
          type: 'warning',
          duration: 3000
        })
        return
      }

      const addNum = this.sampleTotalNum - itemValuesLength
      for (let i = 0; i < addNum; i++) {
        this.currentItemRow.itemValues.push({})
      }

      this.$notify({
        title: '提示',
        message: '添加成功',
        type: 'success',
        duration: 3000
      })
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
          })
        } else {
          this.currentItemRow.itemValues = this.currentItemRow.itemValues.filter(item => {
            return this.multipleSelection.indexOf(item) === -1
          })
          this.$message.success('删除成功')
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
.attachment-tip {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
}
</style>
