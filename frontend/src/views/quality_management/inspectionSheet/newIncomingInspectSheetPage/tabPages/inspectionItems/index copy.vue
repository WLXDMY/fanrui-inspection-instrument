<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-12-27 11:56:20
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-01-07 10:10:01
 * @Description:  -检验项目和综合判断分开版本-备份下
-->
<template>
  <div v-if="!noSelectRow" id="scrollContainer" ref="scrollContainer" class="inspectionItems scroll">
    <section id="scrollFirstContainer">
      <!-- 检验样次 -->
      <!-- <div class="sample-add">
        <i
          class="el-icon-circle-plus-outline"
          :style="isDetailType ? {} : { color: '#1890ff', cursor: 'pointer' }"
          @click="addInspectionSample"
        />
        <span @click="addInspectionSample">样次</span>
      </div> -->
      <el-tabs
        v-if="materialNumsLength"
        v-model="currentSample"
        class="noShowContent"
        type="card"
        :closable="!isDetailType"
        @tab-remove="removeTab"
        @tab-click="handleClick"
      >
        <el-tab-pane v-for="item in currentRow.materialNums" :key="item.name" :label="item.name" :name="item.name">
          {{ item.name }}
        </el-tab-pane>
      </el-tabs>
      <template v-if="hasSample">
        <div class="button-and-search">
          <div class="button-group">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              :disabled="isDetailType"
              @click="showDialog = true"
            >新增检验项目</el-button>
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              :disabled="!hasCurrentItemRow || isDetailType"
              @click="deleteInspection"
            >
              删除检验项目
            </el-button>
          </div>
          <div class="search">
            <el-input
              v-model="inputSearch"
              placeholder="检验项目名称搜索"
              prefix-icon="el-icon-search"
              clearable
              class="project-handle"
              @input="handleInputSearch"
              @clear="clearInputSearch"
            />
          </div>
        </div>

        <el-form ref="newMaterialTableForm" :model="currentDataList">
          <newMaterialTable
            ref="newMaterialTableRef"
            v-loading="loading"
            :table-data="currentDataList.numItems"
            :current-row.sync="currentItemRow"
            :checkout-project="currentRow"
            @handleRowClick="handleRowClick"
          >
            <!--检验项目-->
            <template #itemName="{ row }">
              <div class="itemName-class" @click="clickSidebar($event, row)">
                {{ row.itemName }}
              </div>
            </template>
            <!--重点检查-->
            <template #importantInspection="{ row }">
              <el-checkbox
                v-model="row.importantInspection"
                :disabled="isDetailType"
                :true-label="1"
                :false-label="0"
              />
            </template>
            <!--是否必填-->
            <template #required="{ row }">
              <el-checkbox v-model="row.required" :disabled="isDetailType" :true-label="1" :false-label="0" />
            </template>
            <!-- 缺陷等级 -->
            <template #defectLevel="{ row }">
              <el-select v-model="row.defectLevel" placeholder="请选择" clearable>
                <el-option
                  v-for="(item, index) in defectLevelEnums"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                />
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
            <!--实际样本数-->
            <template #actualQuality="{ row }">
              <el-input
                v-model="row.actualQuality"
                placeholder="请输入"
                size="small"
                :disabled="isDetailType"
                @change="getItemValues(row)"
              />
            </template>
            <!-- 检测值 -->
            <template #checkResult="{ row, $index }">
              <el-form-item
                :rules="{
                  required: row.required === 1 && row.recordInspectionValue == 0,
                  message: '请选择',
                  trigger: ['change', 'blur']
                }"
                :prop="'numItems.' + $index + '.checkResult'"
              >
                <template v-if="row.recordInspectionValue == 1">
                  <div class="check-result" @click="handleScrollToBottom">
                    <span class="check-result-text">请填写检测值</span>
                    <img class="check-result-img" src="@/assets/images/common/edit.png" alt="" width="13" height="13">
                  </div>
                </template>
                <template
                  v-else-if="
                    (row.inputMode === 'singleChoice' || row.inputMode === 'multipleChoice') &&
                      row.recordInspectionValue == 0
                  "
                >
                  <el-select
                    v-model="row.checkResult"
                    :multiple="row.inputMode === 'multipleChoice'"
                    placeholder="请选择"
                    :disabled="isDetailType"
                    clearable
                    @change="changeDetectionValue($event, 'singleConclusion', row)"
                  >
                    <el-option
                      v-for="(item, index) in row.itemOptionList"
                      :key="index"
                      :label="item.optionName"
                      :value="item.optionName"
                    />
                  </el-select>
                </template>
                <template v-else>
                  <el-input
                    v-model="row.checkResult"
                    size="small"
                    :disabled="isDetailType"
                    @change="changeNum($event, 'singleConclusion', row)"
                  />
                  <div v-if="row.analyzeMethod === 'quantitative'" class="reference-value">
                    参考值:
                    <span class="blue">{{ $showReferenceValue(row) }}</span>
                  </div>
                </template>
              </el-form-item>
            </template>
            <!-- 复核检测值 -->
            <template #reviewResult="{ row }">
              <template v-if="row.recordInspectionValue == 1">
                <div class="check-result" @click="handleScrollToBottom">
                  <span class="check-result-text">请填写检测值</span>
                  <img class="check-result-img" src="@/assets/images/common/edit.png" alt="" width="13" height="13">
                </div>
              </template>

              <template
                v-else-if="
                  (row.inputMode === 'singleChoice' || row.inputMode === 'multipleChoice') &&
                    row.recordInspectionValue == 0
                "
              >
                <el-select
                  v-model="row.reviewResult"
                  :multiple="row.inputMode === 'multipleChoice'"
                  placeholder="请选择"
                  :disabled="isDetailType"
                  clearable
                  @change="changeDetectionValue($event, 'reviewConclusion', row)"
                >
                  <el-option
                    v-for="(item, index) in row.itemOptionList"
                    :key="index"
                    :label="item.optionName"
                    :value="item.optionName"
                  />
                </el-select>
              </template>
              <template v-else>
                <el-input
                  v-model="row.reviewResult"
                  size="small"
                  :disabled="isDetailType"
                  @change="changeNum($event, 'reviewConclusion', row)"
                />
                <div v-if="row.analyzeMethod === 'quantitative'" class="reference-value">
                  参考值:
                  <span class="blue">{{ $showReferenceValue(row) }}</span>
                </div>
              </template>
            </template>
            <!-- 核准检测值 -->
            <template #authorizeResult="{ row }">
              <template v-if="row.recordInspectionValue == 1">
                <div class="check-result" @click="handleScrollToBottom">
                  <span class="check-result-text">请填写检测值</span>
                  <img class="check-result-img" src="@/assets/images/common/edit.png" alt="" width="13" height="13">
                </div>
              </template>

              <template
                v-else-if="
                  (row.inputMode === 'singleChoice' || row.inputMode === 'multipleChoice') &&
                    row.recordInspectionValue == 0
                "
              >
                <el-select
                  v-model="row.authorizeResult"
                  :multiple="row.inputMode === 'multipleChoice'"
                  placeholder="请选择"
                  :disabled="isDetailType"
                  clearable
                  @change="changeDetectionValue($event, 'authorizeConclusion', row)"
                >
                  <el-option
                    v-for="(item, index) in row.itemOptionList"
                    :key="index"
                    :label="item.optionName"
                    :value="item.optionName"
                  />
                </el-select>
              </template>
              <template v-else>
                <el-input
                  v-model="row.authorizeResult"
                  size="small"
                  :disabled="isDetailType"
                  @change="changeNum($event, 'authorizeConclusion', row)"
                />
                <div v-if="row.analyzeMethod === 'quantitative'" class="reference-value">
                  参考值:
                  <span class="blue">{{ $showReferenceValue(row) }}</span>
                </div>
              </template>
            </template>
            // 检验项目判定
            <template #singleConclusion="{ row, $index }">
              <el-form-item
                :rules="{ required: row.required === 1, message: '请选择', trigger: 'change' }"
                :prop="'numItems.' + $index + '.singleConclusion'"
              >
                <el-select v-model="row.singleConclusion" placeholder="请选择" :disabled="isDetailType" clearable>
                  <el-option
                    v-for="(item, index) in conclusionOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
            <template #reviewConclusion="{ row }">
              <el-select v-model="row.reviewConclusion" placeholder="请选择" :disabled="isDetailType" clearable>
                <el-option
                  v-for="(item, index) in conclusionOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.code"
                />
              </el-select>
            </template>

            <template #authorizeConclusion="{ row }">
              <el-select v-model="row.authorizeConclusion" placeholder="请选择" :disabled="isDetailType" clearable>
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
        </el-form>
      </template>
    </section>

    <!-- 下方的抽样检验tabs等 -->
    <InspectionSample
      v-if="hasSample && hasCurrentItemRow && hasCurrentRecordValue && showSample"
      id="scrollSecondContainer"
      ref="InspectionSample"
      :current-item-row="currentItemRow"
      :current-row="currentRow"
      :num-items="currentDataList.numItems"
      @changeItem="changeItem"
    />

    <!-- 综合判定 -->

    <!-- 新增检验项目 -->
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

    <!-- 检验详情抽屉 -->
    <inspectDetailDrawer
      v-if="showInspectDetailDrawer"
      :visible="showInspectDetailDrawer"
      :current-item-row="inspectDetailDrawerData"
      :is-detail-type="isDetailType"
      :current-row="currentRow"
      :init-status="initStatus"
      @confirm="handleConfirmDrawer"
      @cancel="showInspectDetailDrawer = false"
    />
  </div>
</template>
<script>
import {
  getDefectEnums,
  deleteNum,
  getDetailInspectionItemsWithSampleNum,
  deleteNumItem,
  getSampleNumByScheme,
  getAcceptValueByScheme
} from '@/api/quality-manage'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import inspectDetailDrawer from './inspectDetailDrawer/index.vue'
import InspectionSample from './inspectionSample/index.vue'
import { PRODUCT_INSPECTION_PROJECT, ConclusionOptions } from './contants'

export default {
  name: 'InspectionItems',
  components: {
    newMaterialTable: () => import('./newMaterialTable/index.vue'),
    CommonSelectDialogPlus,
    InspectionSample,
    inspectDetailDrawer
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
    },
    initStatus: {
      type: Number,
      default: 0
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
      loading: false,
      showInspectDetailDrawer: false,
      // 检验详情抽屉数据
      inspectDetailDrawerData: {},
      // 检验样次中搜索数据
      inputSearch: '',
      hasChangeActualQuality: false,
      showSample: true,
      // 搜索前备份下样次数组
      backupArray: [],
      newMaterialTableForm: null,
      currentDataList: {},
      //  搜索后，样次中，没有匹配上的数据
      unMatchedItems: []
    }
  },
  computed: {
    isAddType() {
      return this.$route.name.includes('Add')
    },
    // 存在样次
    hasSample() {
      return this.currentRow.materialNums?.length > 0
    },
    // 存在选中的当前项目
    hasCurrentItemRow() {
      return Object.keys(this.currentItemRow).length > 0
    },
    // 该行检验项是否启用样本检验值
    hasCurrentRecordValue() {
      return this.currentItemRow.recordInspectionValue
    },

    // 没有选中分录明细
    noSelectRow() {
      return this.clickIndex === -1
    },
    // 检验样次数量，只有一个时隐藏
    materialNumsLength() {
      return this.currentRow?.materialNums?.length > 1 || 0
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    }
  },
  watch: {
    currentRow: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log('watch函数', this.currentRow)
        this.handleCurrentDataList()
      }
    },
    // 根据样本不合格数-判断-检验项目判定是否合格
    'currentItemRow.unqualifiedQuantity': {
      handler(val) {
        // console.log('根据样本不合格数-判断-检验项目判定是否合格', val)
        // console.log('根据样本不合格数 记录样本检验值', this.currentItemRow.recordInspectionValue)

        // 记录样本检验值 勾选时才进行以下判断
        if (this.currentItemRow.recordInspectionValue === 1) {
          // 处理样本不合格数的值
          if (this.currentItemRow.analyzeMethod === 'manual') return
          if (Number(val) >= Number(this.currentItemRow.refuseValue)) {
            this.$set(this.currentItemRow, 'singleConclusion', 0)
          } else if (Number(val) < Number(this.currentItemRow.refuseValue)) {
            // 当不合格数小于等于拒收数时，默认合格
            this.$set(this.currentItemRow, 'singleConclusion', 1)
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getDefectEnums()
  },
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 1500)
    }
    setTimeout(() => {
      this.handleCurrentDataList()
    }, 1500)
  },
  methods: {
    // 检测值修改后，判定结论
    changeNum(val, name, row) {
      if (row.analyzeMethod !== 'quantitative') return
      const result = this.$changeCheckResult(row, val)
      this.$set(row, name, result)
    },
    // 处理定性分析-值修改后，判定结论
    changeDetectionValue(val, name, row) {
      if (row.analyzeMethod !== 'qualitative') return
      const itemOptionList = row.itemOptionList
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
        if (row.inputMode === 'singleChoice') {
          this.$set(row, name, judgeFlagArray[0])
        } else if (row.inputMode === 'multipleChoice') {
          if (judgeFlagArray.length === 1) {
            this.$set(row, name, judgeFlagArray[0])
          } else if (judgeFlagArray.length > 1) {
            this.$set(row, name, 0)
          }
        }
      } else {
        this.$set(row, name, '')
      }
    },
    // 样次中的项目列表
    handleCurrentDataList() {
      let sampleItem = {}

      if (
        this.currentSample &&
        this.currentRow &&
        this.currentRow.materialNums &&
        this.currentRow.materialNums.length > 0
      ) {
        sampleItem = this.currentRow.materialNums.find(item => item.name === this.currentSample)
      }

      // 实际样本数需要默认赋值为抽样数
      if (sampleItem && sampleItem.numItems && sampleItem.numItems?.length > 0) {
        sampleItem.numItems.forEach(item => {
          // 检查actualQuality是否为null
          if (item.actualQuality == null && item.samplingQuantity > 0) {
            const num = Number(item.samplingQuantity)
            // item.actualQuality = num
            this.$set(item, 'actualQuality', num)
          }
        })
      }

      this.currentDataList = sampleItem
    },
    // 搜索输入框
    handleInputSearch() {
      this.currentDataList.numItems = [...this.currentDataList.numItems, ...this.unMatchedItems]
      const result = this.fuzzyMatch(this.inputSearch, this.currentDataList.numItems)

      // 搜索后匹配的数据和不匹配的
      this.currentDataList.numItems = result.matchedItems
      this.unMatchedItems = result.unMatchedItems
      // 下方的样本检测值置灰
      this.showSample = false
    },
    fuzzyMatch(inputValue, data) {
      // 转换为小写，实现不区分大小写的匹配
      const lowerCaseInput = inputValue.toLowerCase()
      const matchedItems = []
      const unMatchedItems = []

      data.forEach(item => {
        if (item.itemName.toLowerCase().indexOf(lowerCaseInput) > -1) {
          matchedItems.push(item)
        } else {
          unMatchedItems.push(item)
        }
      })
      return { matchedItems, unMatchedItems }
    },
    // 清除输入框
    clearInputSearch() {},
    // 点击行时触发
    handleRowClick() {
      this.getItemValues()
    },
    // 根据实际样本数的长度，获取样本检测值填写数组的长度
    getItemValues() {
      this.showSample = true

      // 若没有启用样本检测值，则返回
      if (this.currentItemRow.recordInspectionValue === 0) {
        return
      }

      // 获取选项
      const itemOptionList =
        this.currentItemRow.itemOptionList && this.currentItemRow.itemOptionList.filter(item => item.enableFlag)
      // 数组 多选
      let checkResult =
        itemOptionList &&
        itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

      if (this.currentItemRow.inputMode === 'singleChoice') {
        checkResult = checkResult?.join?.()
      }
      // 定性分析 默认选中检验项目判定
      let singleConclusion = ''
      if (this.currentItemRow.analyzeMethodCode === 'qualitative') {
        const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
        const judgeFlagArray = [
          ...new Set(
            valArray
              .filter(result => itemOptionList?.some(option => option.optionName === result))
              .map(result => itemOptionList?.find(option => option.optionName === result).judgeFlag)
          )
        ]
        if (judgeFlagArray?.length > 0) {
          if (this.currentItemRow.inputMode === 'singleChoice') {
            singleConclusion = judgeFlagArray[0]
          } else if (this.currentItemRow.inputMode === 'multipleChoice') {
            if (judgeFlagArray.length === 1) {
              singleConclusion = judgeFlagArray[0]
            } else if (judgeFlagArray.length > 1) {
              singleConclusion = 0
            }
          }
        }
      }

      const itemValue = {
        // 输入方式
        inspectValue: checkResult,
        checkConclusion: singleConclusion,
        productCode: ''
      }

      // 判断itemValues是否为数组且actualQuality是否为数组
      if (Array.isArray(this.currentItemRow.itemValues) && this.currentItemRow.actualQuality > 0) {
        // 如果itemValues数组长度为0，则生成与actualQuality长度相同的数组
        if (this.currentItemRow.itemValues.length === 0) {
          for (let i = 0; i < this.currentItemRow.actualQuality; i++) {
            this.$set(
              this.currentItemRow.itemValues,
              this.currentItemRow.itemValues.length,
              JSON.parse(JSON.stringify(itemValue))
            )
          }
        } else if (this.currentItemRow.itemValues.length < this.currentItemRow.actualQuality) {
          // 如果itemValues数组长度小于actualQuality长度，则添加元素直到长度相等
          while (this.currentItemRow.itemValues.length < this.currentItemRow.actualQuality) {
            this.$set(
              this.currentItemRow.itemValues,
              this.currentItemRow.itemValues.length,
              JSON.parse(JSON.stringify(itemValue))
            )
          }
        }
        // 如果itemValues数组长度大于actualQuality长度，则不操作
      }
    },

    // 滚动条滑动到底部
    handleScrollToBottom() {
      // 当前页面一定要设置固定高度才能实现
      this.$emit('handleScrollToBottom')
    },
    // 弹出侧边栏
    clickSidebar(event, row) {
      // 阻止事件冒泡
      event.stopPropagation()
      this.inspectDetailDrawerData = row
      this.showInspectDetailDrawer = true
    },
    // 抽屉侧边栏确认
    handleConfirmDrawer() {
      this.getItemValues()
    },
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
      // 输入框置空，样次还原
      if (this.inputSearch) {
        this.inputSearch = ''
        this.handleInputSearch()
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
      this.showSample = false
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
        // 获取选项
        const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
        // 数组 多选
        let checkResult =
          itemOptionList &&
          itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

        if (row.inputMode === 'singleChoice') {
          checkResult = checkResult.join?.()
        }
        // 定性分析 默认选中检验项目判定
        let singleConclusion = row.defaultQualified ? 1 : ''
        if (row.analyzeMethodCode === 'qualitative') {
          const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
          const judgeFlagArray = [
            ...new Set(
              valArray
                .filter(result => itemOptionList.some(option => option.optionName === result))
                .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
            )
          ]
          if (judgeFlagArray.length > 0) {
            if (row.inputMode === 'singleChoice') {
              singleConclusion = judgeFlagArray[0]
            } else if (row.inputMode === 'multipleChoice') {
              if (judgeFlagArray.length === 1) {
                singleConclusion = judgeFlagArray[0]
              } else if (judgeFlagArray.length > 1) {
                singleConclusion = 0
              }
            }
          }
        }

        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: row?.samplingQuantity,
            samplePlanId: row?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }
        delete row.id

        // 获取样本检测值填写数组 start
        // 实际样本数
        const itemValues = []
        const actualQuality = row.actualQuality || row?.samplingQuantity || this.currentRow.inspectQuantity || null
        // if (actualQuality > 0) {
        //   const itemValue = {
        //     // 输入方式
        //     inspectValue: checkResult,
        //     checkConclusion: singleConclusion,
        //     productCode: ''
        //   }
        //   for (let i = 0; i < actualQuality; i++) {
        //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
        //   }
        // }
        console.log('获取样本检测值填写数组 itemValues', itemValues)
        // 获取样本检测值填写数组 end

        const obj = {
          ...row,
          itemValues: itemValues,
          itemDefects: [],
          // 获取样次-检验项目里面的抽样方案
          samplePlanId: row.samplePlanEntity?.id,
          samplePlanName: row.samplePlanEntity?.name,
          sampleType: row.samplePlanEntity?.type,
          inspectLevel: row.samplePlanEntity?.inspectLevel,
          stringency: row.samplePlanEntity?.stringency,
          aqlValue: row.samplePlanEntity?.aqlValue,
          samplingQuantity: row?.samplingQuantity,
          itemId: row.itemId,
          itemName: row.itemName,
          analyzeMethod: row.analyzeMethodCode,
          defectLevel: row.defectLevel,
          itemGroupName: row.itemGroupName,
          comparator: row.itemComparator,
          upperLimitValue: row.itemUpperLimitValue,
          downLimitValue: row.itemDownLimitValue,
          // 上下公差
          upperTolerance: row.itemUpperTolerance,
          lowerTolerance: row.itemLowerTolerance,
          inspectionCondition: row.itemInspectionCondition,
          referenceValue: row.itemReferenceValue,
          importantInspection: row.importantInspection ? 1 : 0,
          required: row.required ? 1 : 0,
          recordInspectionValue: row.recordInspectionValue ? 1 : 0,
          checkResult,
          // optionalValue,
          // samplingQuantity,
          itemOptionList,
          singleConclusion,
          itemGuidanceFileList: row.itemFileList,
          defaultQualified: row.defaultQualified ? 1 : '',
          // singleConclusion: row.defaultQualified ? 1 : '',
          // 实际样本数
          actualQuality: actualQuality,
          // actualQuality: row.actualQuality || row?.samplingQuantity || null,
          acceptValue,
          refuseValue
        }
        arr.push(obj)
      }
      sampleItem?.numItems?.push(...arr)
      this.loading = false
    },
    handleClick() {
      this.showSample = false
      // 输入框置空，样次还原
      if (this.inputSearch) {
        this.inputSearch = ''
        this.handleInputSearch()
      }
      this.handleCurrentDataList()
    },
    // 删除样次
    removeTab(targetName) {
      // 样次Id
      const materialNumId = this.currentRow.materialNums.find(item => item.name === targetName)?.id
      this.$confirm('删除样次? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!isNaN(materialNumId)) {
          deleteNum([materialNumId]).then(_ => {
            this.$message.success('删除成功')
            this.removeTabSuccess(targetName)
          })
        } else {
          this.removeTabSuccess(targetName)
          this.$message.success('删除成功')
        }
      })
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
      this.$confirm('删除检验项目? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //   编辑时拿this.currentItemRow的标识调用接口
        if (!isNaN(this.currentItemRow.id)) {
          deleteNumItem([this.currentItemRow.id]).then(_ => {
            this.$message.success('删除成功')
            this.removeItemSuccess()
          })
        } else {
          this.removeItemSuccess()
          this.$message.success('删除成功')
        }
      })
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
        // 获取选项
        const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
        // 数组 多选
        let checkResult =
          itemOptionList &&
          itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

        if (row.inputMode === 'singleChoice') {
          checkResult = checkResult?.join?.()
        }
        // 定性分析 默认选中检验项目判定
        let singleConclusion = ''
        if (row.analyzeMethodCode === 'qualitative') {
          const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
          const judgeFlagArray = [
            ...new Set(
              valArray
                .filter(result => itemOptionList?.some(option => option.optionName === result))
                .map(result => itemOptionList?.find(option => option.optionName === result).judgeFlag)
            )
          ]
          if (judgeFlagArray?.length > 0) {
            if (row.inputMode === 'singleChoice') {
              singleConclusion = judgeFlagArray[0]
            } else if (row.inputMode === 'multipleChoice') {
              if (judgeFlagArray.length === 1) {
                singleConclusion = judgeFlagArray[0]
              } else if (judgeFlagArray.length > 1) {
                singleConclusion = 0
              }
            }
          }
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
          itemGroupName: row.itemGroupEntity?.groupName || '',
          checkResult,
          // 这边修改
          itemOptionList,
          singleConclusion,
          samplingQuantity,
          itemGuidanceFileList: row.itemFileList,
          importantInspection: row.importantInspection ? 1 : 0,
          recordInspectionValue: row.recordInspectionValue ? 1 : 0,
          required: 1
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
// 添加滚动条
.scroll {
  height: 100%;
  overflow: auto;
}
.scroll::-webkit-scrollbar {
  height: 8px; /* 设置滚动条的高度 */
  width: 8px; /* 设置滚动条的宽度 */
}
.inspectionItems {
  height: 100%;
  .centerArea {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    margin-bottom: 10px;
    .sample-add {
      margin-right: 10px;
      color: #1890ff;
    }
  }
  .button-and-search {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px 8px 0;

    .button-group {
    }
  }
  .gutter {
    margin-top: 12px;
  }
  ::v-deep .noShowContent > .el-tabs__content {
    display: none;
  }
  ::v-deep .noShowContent > .el-tabs__header {
    margin-bottom: 0;
  }
}
.itemName-class {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #1890ff;
  cursor: pointer;
  text-decoration: underline solid #1890ff; /* 设置下划线 */
  text-decoration-thickness: 1px; /* 设置下划线宽度 */
  text-underline-offset: 5px; /* 设置文字与下划线之间的间距 */
}
.reference-value {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 12px;
  color: #606266;
  margin-top: 4px;
  .blue {
    color: #1890ff;
  }
}
.check-result {
  display: flex;
  align-items: center;
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #1890ff;
  .check-result-text {
    margin-right: 6px;
  }
  .check-result-img {
    margin-bottom: -2px;
  }
}
::v-deep .el-form-item {
  margin-bottom: 0;
}
::v-deep .el-input__inner {
  height: 32px;
}
</style>
