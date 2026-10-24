<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-11 17:01:14
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-09-14 16:03:24
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\inspectionItems\inspectionSample\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="inspectionSample">
    <section class="centerArea">
      <div>
        <el-button type="text" @click="changeItem('first')">首行</el-button>
        <el-button type="text" @click="changeItem('previous')">上一行</el-button>
        <el-button type="text" @click="changeItem('next')">下一行</el-button>
        <el-button type="text" @click="changeItem('last')">末行</el-button>
      </div>

      <el-form :inline="true" :model="currentItemRow" label-position="right" label-width="150px">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="抽样检验" name="first">
            <el-form-item label="抽样方案:" prop="samplePlanName">
              <el-input
                v-model="currentItemRow.samplePlanName"
                placeholder="请输入"
                size="mini"
                @focus="showDialog = true"
              />
            </el-form-item>
            <el-form-item label="检验水平:" prop="inspectLevel">
              <el-select v-model="currentItemRow.inspectLevel" disabled size="mini">
                <el-option v-for="item in levelTypeList" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="严格度:" prop="stringency">
              <el-select v-model="currentItemRow.stringency" disabled size="mini">
                <el-option v-for="item in sternWidthLevelList" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="AQL:" prop="aqlValue">
              <el-select v-model="currentItemRow.aqlValue" disabled size="mini">
                <el-option v-for="item in aqlTypeList" :key="item.code" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="抽样数量:" prop="samplingQuantity">
              <el-input v-model="currentItemRow.samplingQuantity" type="number" size="mini" />
            </el-form-item>
            <el-form-item label="实际样本数:" prop="actualQuality">
              <el-input v-model="currentItemRow.actualQuality" type="number" size="mini" />
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="检测值" name="second">
            <el-form-item label="检测值" prop="inspectValue">
              <el-input v-model="currentItemRow.inspectValue" size="mini" />
            </el-form-item>
            <el-form-item label="标准值/边界值" prop="referenceValue">
              <el-input v-model="currentItemRow.referenceValue" size="mini" />
            </el-form-item>
            <el-form-item label="比较符:" prop="comparator">
              <el-select v-model="currentItemRow.comparator" placeholder="请选择" size="mini">
                <el-option v-for="(item, index) in comparatorList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="下限值" prop="downLimitValue">
              <el-input v-model="currentItemRow.downLimitValue" size="mini" />
            </el-form-item>
            <el-form-item label="上限值" prop="upperLimitValue">
              <el-input v-model="currentItemRow.upperLimitValue" size="mini" />
            </el-form-item>
            <el-form-item label="单位:" prop="unit">
              <el-select v-model="currentItemRow.unit" placeholder="请选择单位">
                <el-option v-for="item in unitList" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <div>
              <el-button type="text" :disabled="isDetailType" @click="addCode">新增抽样单品码</el-button>
              <el-button
                class="deleteBtn"
                type="text"
                :disabled="multipleSelection.length === 0 || isDetailType"
                @click="deleteCode"
              >
                删除抽样单品码
              </el-button>
            </div>
            <el-table
              :header-cell-style="headerCellStyle"
              :data="currentItemRow.itemValues"
              style="width: 70%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column type="index" width="50" label="序号" />
              <el-table-column prop="productCode" label="抽样物料单品码">
                <template slot-scope="{ row, $index }">
                  <el-input v-model="row.productCode" />
                </template>
              </el-table-column>
              <el-table-column prop="inspectValue" label="检测值">
                <template slot-scope="{ row, $index }">
                  <el-input v-model="row.inspectValue" />
                </template>
              </el-table-column>
              <el-table-column prop="checkConclusion" label="检查结论">
                <template slot-scope="{ row, $index }">
                  <el-input v-model="row.checkConclusion" />
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="项目缺陷" name="third">
            <div>
              缺陷记录
              <el-button type="text" :disabled="isDetailType" @click="showDefectDialog = true">新增缺陷</el-button>
              <el-button type="text" :disabled="isDetailType" @click="openBatch">批量标记单品码</el-button>
              <el-button
                class="deleteBtn"
                type="text"
                :disabled="multipleDefect.length === 0 || isDetailType"
                @click="deleteDefect"
              >
                删除缺陷
              </el-button>
            </div>
            <DefectTable
              :table-data="currentItemRow.itemDefects"
              :columns="columns"
              :multiple-defect.sync="multipleDefect"
            >
              <!-- 缺陷分析 -->
              <template #researchReviewFlag="{ row }">
                <el-checkbox
                  v-model="row.researchReviewFlag"
                  :disabled="isDetailType"
                  :true-label="1"
                  :false-label="0"
                />
              </template>

              <template #productCodes="{ row }"> <el-input v-model="row.productCodes" size="small" /> </template>
              <template #defectNum="{ row }">
                <el-input v-model="row.defectNum" type="number" size="small" />
              </template>
              <template #defectLevel="{ row }">
                <el-select v-model="row.defectLevel" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in defectLevelEnums"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </template>
              <!-- 缺陷原因 -->
              <template #defectReasonCode="{ row }">
                <el-select v-model="row.defectReasonCode" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in defectReasonEnums"
                    :key="index"
                    :label="item.reasonName"
                    :value="item.reasonCode"
                  />
                </el-select>
              </template>
              <!-- 缺陷后果 -->
              <template #defectResultCode="{ row }">
                <el-select v-model="row.defectResultCode" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in defectResultEnums"
                    :key="index"
                    :label="item.resultName"
                    :value="item.resultCode"
                  />
                </el-select>
              </template>
              <template #correctiveMeasure="{ row }">
                <el-input v-model="row.correctiveMeasure" size="small" />
              </template>
              <template #remark="{ row }">
                <el-input v-model="row.remark" size="small" />
              </template>
            </DefectTable>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </section>
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
  </div>
</template>
<script>
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import DefectTable from './defectTable.vue'
import { CHECK_STANDARDS_TABLE } from '@/views/quality_management/inspectionProgram/components/tabPages/constant.js'
import { getUnitList } from '@/api/basisInfo.js'
import {
  getComparisonOperatorsList,
  getDefectEnums,
  deleteNumItemValue,
  deleteItemDefete,
  aqlList,
  getSternWidthLevelList,
  levelList,
  getSampleNumByScheme
} from '@/api/quality-manage.js'
import { LIST, DefectColumn } from './constant.js'
import { USE_DEFECTS_REASON_API } from '@/api/defectReason.js' // 缺陷原因
import { USE_DEFECTS_RESULT_API } from '@/api/defectResult.js' // 缺陷后果
const DEFECTS_REASON_API = USE_DEFECTS_REASON_API()
const DEFECTS_RESULT_API = USE_DEFECTS_RESULT_API()

export default {
  name: 'InspectionSample',
  components: { CommonSelectDialogPlus, DefectTable },
  props: {
    // 分录明细行
    currentRow: {
      type: Object,
      default: () => {}
    },
    currentItemRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: LIST,
      tableColumn: CHECK_STANDARDS_TABLE,
      tableDefectColumn: DefectColumn,
      activeName: 'first',
      showDialog: false,
      showDefectDialog: false,
      unitList: [],
      comparatorList: [],
      multipleSelection: [],
      multipleDefect: [],
      defectLevelEnums: [],
      defectReasonEnums: [],
      defectResultEnums: [],
      batchCode: '',
      dialogVisible: false,
      aqlTypeList: [], // aql枚举列表
      sternWidthLevelList: [], // 严格度枚举列表
      levelTypeList: [] // 检验水平枚举列表
    }
  },
  computed: {
    isDetailType() {
      return this.$route.name.includes('Detail')
    }
  },
  watch: {},
  created() {
    this.getUnitList()
    this.getComparison()
    this.getDefectEnums()
    this.getDefectsReasonEnums()
    this.getDefectsResultEnums()
    Promise.allSettled([aqlList(), getSternWidthLevelList(), levelList()]).then(res => {
      const [res1, res2, res3] = res
      this.aqlTypeList = res1.value.data.data
      this.sternWidthLevelList = res2.value.data.data
      this.levelTypeList = res3.value.data.data
    })
  },
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 200)
    } else {
      this.onloadSampleQuantity()
    }
  },
  methods: {
    // 表格样式
    headerCellStyle({ row, colunm, rowIndex, columnIndex }) {
      //   if (rowIndex === 1) {
      //     // 这里为了是将第二列的表头隐藏，就形成了合并表头的效果
      //     return { display: 'none' }
      //   }
      return {
        background: '#ECF1FF',
        color: '#333333',
        'font-family': 'Source Han Sans CN',
        'font-weight': '400'
      }
    },
    // 查询单位
    getUnitList() {
      getUnitList().then(res => {
        this.unitList = res.data.data.records
      })
    },
    // 获取比较符
    async getComparison() {
      const result = await getComparisonOperatorsList()
      const { data } = result.data || {}
      this.comparatorList = data || []
    },
    // 缺陷等级
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
    changeItem(flag) {
      this.$emit('changeItem', flag)
    },
    async handleSampleConfirm(row) {
      this.currentItemRow.samplePlanId = row.id
      this.currentItemRow.samplePlanName = row.name
      this.currentItemRow.inspectLevel = row.inspectLevel
      this.currentItemRow.inspectLevelName = row.inspectLevelName
      this.currentItemRow.stringency = row.stringency
      this.currentItemRow.stringencyName = row.stringencyName
      this.currentItemRow.aqlValue = row.aqlValue
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
    },
    // 页面加载，获取抽样数量
    async onloadSampleQuantity() {
      if (this.currentRow.inspectQuantity && !this.currentItemRow.samplingQuantity) {
        const params = {
          num: this.currentRow.inspectQuantity,
          sampleId: this.currentItemRow.samplePlanId
        }
        const result = await getSampleNumByScheme(params)
        this.currentItemRow.samplingQuantity = result.data?.data?.sampleNum || 0
      }
    },
    // 新增单品码
    addCode() {
      this.currentItemRow.itemValues.push({})
    },
    // 删除单品码
    deleteCode() {
      const deleteIds = this.multipleSelection.map(item => item.id).filter(item => !isNaN(item))
      if (deleteIds.length > 0) {
        this.$confirm('删除样本检测值? ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteNumItemValue(deleteIds).then(_ => {
            this.$message.success('删除成功')
            this.currentItemRow.itemValues = this.currentItemRow.itemValues.filter(item => {
              return this.multipleSelection.indexOf(item) === -1
            })
          })
        })
      } else {
        this.currentItemRow.itemValues = this.currentItemRow.itemValues.filter(item => {
          return this.multipleSelection.indexOf(item) === -1
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    // 打开批量标记弹窗
    openBatch() {
      if (this.multipleDefect.length === 0) {
        this.$message.warning('请选择缺陷')
        return
      }
      this.dialogVisible = true
    },
    // 删除缺陷
    deleteDefect() {
      const deleteIds = this.multipleDefect.map(item => item.id).filter(item => !isNaN(item))
      if (deleteIds.length > 0) {
        this.$confirm('删除项目缺陷? ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItemDefete(deleteIds).then(_ => {
            this.$message.success('删除成功')
            this.currentItemRow.itemDefects = this.currentItemRow.itemDefects.filter(item => {
              return this.multipleDefect.indexOf(item) === -1
            })
          })
        })
      } else {
        this.currentItemRow.itemDefects = this.currentItemRow.itemDefects.filter(item => {
          return this.multipleDefect.indexOf(item) === -1
        })
      }
    },
    // 批量标记单品码确定
    confirmBatch() {
      this.multipleDefect.forEach(item => {
        if (!item.productCodes) {
          this.$set(item, 'productCodes', this.batchCode)
        } else {
          this.$set(item, 'productCodes', item.productCodes + ',' + this.batchCode)
        }
      })
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.inspectionSample {
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
</style>
