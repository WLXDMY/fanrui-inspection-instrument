<template>
  <div v-if="!noSelectRow" class="inspectionItems">
    <section class="centerArea">
      <div>
        检验样次
        <i
          class="el-icon-circle-plus-outline"
          :style="isDetailType ? {} : { color: '#1890ff', cursor: 'pointer' }"
          @click="addInspectionSample"
        />
        <el-button style="margin-left: 10px" type="text" @click="changeRow('first')">首行</el-button>
        <el-button type="text" @click="changeRow('previous')">上一行</el-button>
        <el-button type="text" @click="changeRow('next')">下一行</el-button>
        <el-button type="text" @click="changeRow('last')">末行</el-button>
      </div>
      <el-tabs
        v-model="currentSample"
        class="noShowContent"
        type="card"
        :closable="!isDetailType"
        @tab-remove="removeTab"
      >
        <el-tab-pane v-for="item in currentRow.materialNums" :key="item.name" :label="item.name" :name="item.name">
          {{ item.name }}
        </el-tab-pane>
      </el-tabs>
      <template v-if="hasSample">
        <div>
          <el-button type="text" :disabled="isDetailType" @click="showDialog = true">新增检验项目</el-button>
          <el-button
            class="deleteBtn"
            type="text"
            :disabled="!hasCurrentItemRow || isDetailType"
            @click="deleteInspection"
          >
            删除检验项目
          </el-button>
        </div>
        <newMaterialTable
          ref="newMaterialTableRef"
          v-loading="loading"
          :table-data="currentDataList"
          :current-row.sync="currentItemRow"
        >
          <!--重点检查-->
          <template #importantInspection="{ row }">
            <el-checkbox v-model="row.importantInspection" :disabled="isDetailType" :true-label="1" :false-label="0" />
          </template>
          <!--是否必填-->
          <template #required="{ row }">
            <el-checkbox v-model="row.required" :disabled="isDetailType" :true-label="1" :false-label="0" />
          </template>
          <!--是否检验该项-小程序-->
          <!-- <template #inspectionSwicth="{ row }">
            <el-checkbox v-model="row.inspectionSwicth" :disabled="isDetailType" :true-label="1" :false-label="0" />
          </template> -->
          <!-- 缺陷等级 -->
          <template #defectLevel="{ row }">
            <el-select v-model="row.defectLevel" placeholder="请选择">
              <el-option v-for="(item, index) in defectLevelEnums" :key="index" :label="item.name" :value="item.code" />
            </el-select>
          </template>
          <!--记录样本检验值-->
          <template #recordInspectionValue="{ row }">
            <el-checkbox
              v-model="row.recordInspectionValue"
              :disabled="isDetailType"
              :true-label="1"
              :false-label="0"
            />
          </template>
          <!--最少样本数-->
          <template #minQuality="{ row }">
            <el-input v-model="row.minQuality" placeholder="请输入" size="small" :disabled="isDetailType" />
          </template>
          <!-- 检查结果 -->
          <template #checkResult="{ row }">
            <template v-if="row.inputMode === 'handInput'">
              <el-input v-model="row.checkResult" size="small" />
            </template>
            <template v-else>
              <el-select v-model="row.checkResult" :multiple="row.inputMode === 'multipleChoice'" placeholder="请选择">
                <el-option v-for="(item, index) in row.optionalValue" :key="index" :label="item" :value="item" />
              </el-select>
            </template>
          </template>
          <template #singleConclusion="{ row }">
            <el-select v-model="row.singleConclusion" placeholder="请选择">
              <el-option
                v-for="(item, index) in conclusionOptions"
                :key="index"
                :label="item.label"
                :value="item.code"
              />
            </el-select>
          </template>
          <template #reviewResult="{ row }"> <el-input v-model="row.reviewResult" size="small" /> </template>
          <template #reviewConclusion="{ row }">
            <el-select v-model="row.reviewConclusion" placeholder="请选择">
              <el-option
                v-for="(item, index) in conclusionOptions"
                :key="index"
                :label="item.label"
                :value="item.code"
              />
            </el-select>
          </template>
          <template #authorizeResult="{ row }">
            <el-input v-model="row.authorizeResult" size="small" />
          </template>
          <template #authorizeConclusion="{ row }">
            <el-select v-model="row.authorizeConclusion" placeholder="请选择">
              <el-option
                v-for="(item, index) in conclusionOptions"
                :key="index"
                :label="item.label"
                :value="item.code"
              />
            </el-select>
          </template>

          <template #inspectionMethod="{ row }">
            <el-input v-model="row.inspectionMethod" size="small" />
          </template>
          <template #referenceValue="{ row }">
            <el-input v-model="row.referenceValue" size="small" />
          </template>
          <template #upperLimitValue="{ row }">
            <el-input v-model="row.upperLimitValue" :disabled="row.iptDisabled" size="small" />
          </template>
          <template #downLimitValue="{ row }">
            <el-input v-model="row.downLimitValue" :disabled="row.iptDisabled" size="small" />
          </template>
        </newMaterialTable>
      </template>
    </section>
    <InspectionSample
      v-if="hasSample && hasCurrentItemRow"
      :current-item-row="currentItemRow"
      :current-row="currentRow"
      @changeItem="changeItem"
    />

    <CommonSelectDialogPlus
      v-if="showDialog"
      title="检验项目"
      :request-config="{
        url: 'qms/product/v1/items/list',
        method: 'post'
      }"
      :column-config="tableColumn"
      :extra-params="{ statues: [1] }"
      :visible="showDialog"
      :append-to-body="true"
      @confirm="handleConfirm"
      @cancel="showDialog = false"
    />
  </div>
</template>
<script>
import {
  getDefectEnums,
  deleteNum,
  getDetailInspectionItemsWithSampleNum,
  deleteNumItem,
  getSampleNumByScheme
} from '@/api/quality-manage'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import InspectionSample from './inspectionSample/index.vue'
import { PRODUCT_INSPECTION_PROJECT, ConclusionOptions } from './contants'
export default {
  name: 'InspectionItems',
  components: {
    newMaterialTable: () => import('./newMaterialTable/index.vue'),
    CommonSelectDialogPlus,
    InspectionSample
  },
  inject: ['sheetInitStatus'],
  props: {
    // 分录明细行
    currentRow: {
      type: Object,
      default: () => {}
    },
    clickIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      tabsNum: 0,
      currentSample: '检验样次1',
      // 样次中的检验项目行
      currentItemRow: {},
      showDialog: false,
      tableColumn: PRODUCT_INSPECTION_PROJECT,
      conclusionOptions: ConclusionOptions,
      defectLevelEnums: [],
      loading: false
    }
  },
  computed: {
    // 样次中的项目列表
    currentDataList() {
      const sampleItem = this.currentRow.materialNums.find(item => item.name === this.currentSample)
      return sampleItem?.numItems || []
    },
    // 存在样次
    hasSample() {
      return this.currentRow.materialNums?.length > 0
    },
    // 存在选中的当前项目
    hasCurrentItemRow() {
      return Object.keys(this.currentItemRow).length > 0
    },
    // 没有选中分录明细
    noSelectRow() {
      return this.clickIndex === -1
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    }
  },
  watch: {},
  created() {
    this.getDefectEnums()
  },
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 1500)
    }
  },
  methods: {
    // 缺陷等级
    async getDefectEnums() {
      const result = await getDefectEnums()
      const { data } = result.data || {}
      this.defectLevelEnums = data || []
    },
    // 切换项目
    changeItem(flag) {
      this.$refs.newMaterialTableRef.changeItem(flag)
    },
    // 切换行
    changeRow(flag) {
      this.$emit('changeRow', flag)
    },
    // 增加样次
    addInspectionSample() {
      if (this.isDetailType) return
      if (this.clickIndex === -1) {
        this.$message.warning('请选择分录明细')
        return
      }
      const names = this.currentRow.materialNums.map(item => item.name)
      let name = `检验样次1`
      if (names.length > 0) {
        const nums = names.map(name => parseInt(name.match(/\d+/)[0], 10))
        const maxNum = Math.max.apply(null, nums)
        name = `检验样次${maxNum + 1}`
      }
      const obj = {
        name,
        // 样次关联的检验项目
        numItems: []
      }
      this.currentRow.materialNums.push(obj)
      this.currentSample = name
      this.bringOutItems()
    },
    // 带出检验方案关联的检验项目
    async bringOutItems() {
      if (!this.currentRow.schemeId) return
      this.loading = true
      const params = {
        num: this.currentRow.inspectQuantity || 0,
        schemeId: this.currentRow.schemeId
      }
      const {
        data: { data }
      } = await getDetailInspectionItemsWithSampleNum(params)
      if (!data || data.length === 0) {
        this.loading = false
        return
      }
      const arr = []
      const sampleItem = this.currentRow.materialNums.find(item => item.name === this.currentSample)
      for (let index = 0; index < data.length; index++) {
        const row = data[index]
        let checkResult = row.defaultValue
        const optionalValue = row.optionalValue?.split?.(',') || []
        if (row.inputMode === 'multipleChoice') {
          checkResult = row.defaultValue?.split(',') || []
        }
        delete row.id
        const obj = {
          ...row,
          itemValues: [],
          itemDefects: [],
          samplePlanName: row.samplePlanEntity?.name,
          itemId: row.itemId,
          itemName: row.itemName,
          analyzeMethod: row.analyzeMethodCode,
          defectLevel: row.defectLevel,
          itemGroupName: row.itemGroupName,
          comparator: row.itemComparator,
          upperLimitValue: row.itemUpperLimitValue,
          downLimitValue: row.itemDownLimitValue,
          referenceValue: row.itemReferenceValue,
          importantInspection: row.importantInspection ? 1 : 0,
          required: row.required ? 1 : 0,
          recordInspectionValue: row.recordInspectionValue ? 1 : 0,
          checkResult,
          optionalValue,
          // samplingQuantity,
          singleConclusion: row.defaultQualified ? 1 : ''
        }
        arr.push(obj)
      }
      sampleItem?.numItems?.push(...arr)
      this.loading = false
    },
    // 删除样次
    removeTab(targetName) {
      // 样次Id
      const materialNumId = this.currentRow.materialNums.find(item => item.name === targetName)?.id
      if (!isNaN(materialNumId)) {
        this.$confirm('删除样次? ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteNum([materialNumId]).then(_ => {
            this.$message.success('删除成功')
            this.removeTabSuccess(targetName)
          })
        })
      } else {
        this.removeTabSuccess(targetName)
      }
    },
    // 删除成功
    removeTabSuccess(targetName) {
      const tabs = this.currentRow.materialNums
      let activeName = this.currentSample
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.currentSample = activeName
      this.currentRow.materialNums = tabs.filter(tab => tab.name !== targetName)
    },
    // 删除检验项目
    deleteInspection() {
      //   编辑时拿this.currentItemRow的标识调用接口
      if (!isNaN(this.currentItemRow.id)) {
        this.$confirm('删除检验项目? ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteNumItem([this.currentItemRow.id]).then(_ => {
            this.$message.success('删除成功')
            this.removeItemSuccess()
          })
        })
      } else {
        this.removeItemSuccess()
      }
    },
    // 成功删除项目
    removeItemSuccess() {
      const sampleItem = this.currentRow.materialNums.find(item => item.name === this.currentSample)
      sampleItem.numItems = sampleItem?.numItems.filter(item => item !== this.currentItemRow)
      this.currentItemRow = {}
    },
    // 弹窗确认新增检验项目
    async handleConfirm(rows) {
      const sampleItem = this.currentRow.materialNums.find(item => item.name === this.currentSample)
      const arr = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        let checkResult = row.defaultValue
        const optionalValue = row.optionalValue?.split?.(',') || []
        if (row.inputMode === 'multipleChoice') {
          checkResult = row.defaultValue?.split(',') || []
        }
        const { id, samplePlanId } = row
        let samplingQuantity = 0
        // 存在抽样 根据抽样方案和送检数量算出抽样数量
        if (typeof samplePlanId === 'number' && this.currentRow.inspectQuantity) {
          const params1 = {
            num: this.currentRow.inspectQuantity,
            sampleId: samplePlanId
          }
          const result = await getSampleNumByScheme(params1)
          samplingQuantity = result.data?.data?.sampleNum || 0
        }
        delete row.id
        const obj = {
          ...row,
          itemValues: [],
          itemDefects: [],
          samplePlanName: row.samplePlanEntity?.name,
          itemId: id,
          itemName: row.name,
          analyzeMethod: row.analyzeMethodCode,
          analyzeMethodName: row.analyzeMethodCodeName,
          defectLevel: row.defectLevelCode,
          comparator: row.comparatorCode,
          itemGroupName: row.itemGroupEntity?.groupName,
          checkResult,
          optionalValue,
          samplingQuantity
        }
        arr.push(obj)
      }
      sampleItem?.numItems?.push(...arr)
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.inspectionItems {
  .centerArea {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    margin-bottom: 10px;
  }
  ::v-deep .noShowContent > .el-tabs__content {
    display: none;
  }
  ::v-deep .noShowContent > .el-tabs__header {
    margin-bottom: 0;
  }
}
</style>
