<template>
  <div style="height:40vh">
    <el-form
      ref="form"
      :model="materialForm"
    >
      <MaterailTable
        ref="common-table"
        :data="materialForm.tableData"
        border
        :all-comumns="allComumns"
        column-permission-action="outsourcingManagement.outsourcingReceiptOrder:columnConfigList"
        height="365px"
        class="materail-table"
        model-type="materialCheckAdd"
        :is-has-material-extension-keys="true"
        :show-operate-label="false"
      >
        <template #inspectionSchemeId="{ row, $index }">
          <el-form-item :rules=" { required: true, message: '请选择', trigger: 'change' }" :prop="'tableData.' + $index + '.inspectionSchemeId'">
            <el-select
              v-model="row.inspectionSchemeId"
              :disabled="pageType==='detail' || state!==1"
              filterable
              clearable
              @change="(value) => {changeInspectionScheme(value,row)}"
            >
              <el-option
                v-for="(item, index) in row.qualitySchemeOptions"
                :key="index"
                :label="item.qualityInspectionSchemeName"
                :value="item.qualityInspectionSchemeId"
              />
            </el-select>
          </el-form-item>

        </template>
        <template #inspectionLevel="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.inspectionLevel'"
          >
            <el-select v-model="row.inspectionLevel" :disabled="pageType==='detail'|| state!==1" filterable clearable>
              <el-option
                v-for="(item, index) in inspectionLevelOptions"
                :key="index"
                :label="item.name"
                :value="item.code"
              />
              <!-- <li class="el-select-dropdown__item">新增</li> -->
            </el-select>

          </el-form-item>
        </template>
        <template #acceptanceQualityLimit="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.acceptanceQualityLimit'"
          >

            <el-select
              v-model="row.acceptanceQualityLimit"
              :disabled="pageType==='detail' || state !== 1"
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in acceptanceQualityLimitOptions"
                :key="index"
                :label="item.name"
                :value="item.code"
              />
            </el-select>

          </el-form-item>
        </template>
        <template #acValue="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.ac'"
          >
            <el-input
              v-model.number="row.acValue"
              :disabled="pageType==='detail'"
              size="small"
            />
          </el-form-item>
        </template>
        <template #reValue="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.re'"
          >
            <el-input
              v-model.number="row.reValue"
              :disabled="pageType==='detail'"
              size="small"
            />
          </el-form-item>
        </template>
        <template #strictLevel="{ row }">
          <el-form-item>
            <el-select v-model="row.strictLevel" :disabled="pageType==='detail'" filterable clearable>
              <el-option
                v-for="(item, index) in strictLevelOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

        </template>

        <template #originalQuantity="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.originalQuantity'"
            :rules=" { required: pageType!=='detail' && state === 2, message: '请输入', trigger: 'blur' }"
          >
            <NumberInput
              v-model="row.originalQuantity"
              :disabled="pageType==='detail'"
            />
          </el-form-item>
        </template>

        <template #samplingQuantity="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.samplingQuantity'"
            :rules=" { required: true, message: '请输入', trigger: 'blur' }"
          >
            <NumberInput
              v-model="row.samplingQuantity"
              :disabled="pageType==='detail'"
            />
          </el-form-item>
        </template>

        <template #qualifiedQuantity="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.qualifiedQuantity'"
          >
            <NumberInput
              v-model="row.qualifiedQuantity"
              :disabled="pageType==='detail'"
              size="small"
            />
          </el-form-item>
        </template>
        <template #unqualifiedQuantity="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.unqualifiedQuantity'"
          >
            <NumberInput
              v-model="row.unqualifiedQuantity"
              :disabled="pageType==='detail'"
              size="small"
            />
          </el-form-item>
        </template>

        <template #checkResult="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.checkResult'"
          >
            <el-input
              v-model="row.checkResult"
              :disabled="pageType==='detail'"
              size="small"
            />
          </el-form-item>
        </template>

        <template #lineRemark="{ row, $index }">
          <el-form-item
            :prop="'tableData.' + $index + '.lineRemark'"
          >
            <el-input
              v-model="row.lineRemark"
              :disabled="pageType==='detail'"
              size="small"
            />
          </el-form-item>
        </template>
        <!-- 物料批次号 -->
        <template #materialBatch="{ row }">
          <!-- materialBatch -->
          <el-form-item>
            <el-select
              v-model="row.materialBatch"
              :disabled="pageType==='detail' || state !== 1"
              clearable
              @visible-change="hdBatchFocus"
            >
              <el-option
                v-for="(item, index) in materialBatchOptions"
                :key="index"
                :label="item.barCode"
                :value="item.barCode"
              />
              <li v-if="pageType === 'edit'" class="el-select-dropdown__item">
                <el-button type="primary" size="small" @click="addBatch(row)">新增</el-button>
              </li>
            </el-select>
          </el-form-item>
        </template>
      </MaterailTable>

      <!-- <div
        v-show="pageType!=='detail'"
        class="btn-add"
        @click="$emit('showMaterialDialog')"
      >
        <img
          class="add-img"
          src="@/assets/images/home/xinjian-edit.png"
          alt=""
          width="16"
          height="16"
        >

        <span class="add-text">增加物料</span>
      </div> -->
    </el-form>
    <BatchDialog ref="batchDialog" @generateCode="generateCode" />
  </div>
</template>

<script>
import { aqlList, levelList, qualitySchemes, getBatchNumber, getBusinessConfig } from '@/api/quality-manage'
const columns = [
  {
    prop: 'materialCode',
    label: '物料编码',
    minWidth: '350',
    checked: true
  },
  {
    prop: 'name',
    label: '物料名称',
    minWidth: '350',
    checked: true
  },
  {
    prop: 'standard',
    label: '物料规格',
    minWidth: '350',
    checked: true
  },
  {
    prop: 'comp',
    label: '单位',
    minWidth: '350',
    checked: true

  },
  {
    prop: 'inspectionSchemeId',
    label: '检验方案',
    minWidth: '350',
    columnType: 'slot',
    checked: true
  },
  // {
  //   prop: 'inspectionLevel',
  //   label: '检验水平',
  //   minWidth: '350',
  //   columnType: 'slot', // 检验方案带出
  //   checked: true

  // },
  // {
  //   prop: 'acceptanceQualityLimit',
  //   label: 'AQL值',
  //   minWidth: '350',
  //   columnType: 'slot', // 检验方案带出
  //   checked: true

  // },
  // {
  //   prop: 'strictLevel',
  //   label: '严宽水平',
  //   minWidth: '350',
  //   columnType: 'slot',
  //   checked: true

  // },
  // {
  //   prop: 'acValue',
  //   label: 'Ac',
  //   minWidth: '350',
  //   columnType: 'slot', // 检验方案带出
  //   checked: true

  // },
  // {
  //   prop: 'reValue',
  //   label: 'Re',
  //   minWidth: '350',
  //   columnType: 'slot', // 检验方案带出
  //   checked: true

  // },
  {
    prop: 'materialBatch',
    label: '物料批次号',
    minWidth: '350',
    columnType: 'slot', // 检验方案带出
    checked: true

  },
  {
    prop: 'originalQuantity',
    label: '送检数量',
    minWidth: '350',
    columnType: 'slot',
    checked: true

  },
  {
    prop: 'samplingQuantity',
    label: '抽样数量',
    minWidth: '350',
    columnType: 'slot',
    checked: true

  },
  {
    prop: 'qualifiedQuantity',
    label: '合格数量',
    minWidth: '350',
    columnType: 'slot',
    checked: true

  },
  {
    prop: 'unqualifiedQuantity',
    label: '不合格数量',
    minWidth: '350',
    columnType: 'slot',
    checked: true

  },
  {
    prop: 'checkResult',
    label: '检验结论',
    minWidth: '350',
    checked: true,
    columnType: 'slot'

  },
  {
    prop: 'lineRemark',
    label: '行备注',
    minWidth: '350',
    checked: true,
    columnType: 'slot'

  },
  {
    prop: 'operate',
    label: '操作',
    minWidth: '50',
    columnType: 'slot',
    fixed: 'right',
    checked: true
  }
]
export default {

  components: {
    MaterailTable: () => import('@/components/MaterailTable'),
    NumberInput: () => import('@/components/NumberInput'),
    BatchDialog: () => import('./batchDialog')
  },
  props: {
    materialData: {
      type: Array,
      default: () => []
    },
    pageType: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 1
    },
    documentType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      materialForm: { qualityInspectionSchemeName: '', tableData: [] },

      allComumns: columns,
      strictLevelOptions: [{
        label: '正常',
        value: '正常'
      },
      {
        label: '加严',
        value: '加严'
      },
      {
        label: '放宽',
        value: '放宽'
      }
      ],
      inspectionLevelOptions: [],
      acceptanceQualityLimitOptions: [],
      materialBatchOptions: [],
      // 该属性只用于计数
      getBatchTime: 0
    }
  },
  watch: {
    materialData: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        console.log('新数据 -> ', newValue)
        const tableData = JSON.parse(JSON.stringify(newValue))
        tableData.forEach(async(el, idx) => {
          const rk = el.remark
          el.lineRemark = rk
          // delete el['remark']
          el.remark = el.materialRemark
          if (!el.qualitySchemeOptions || el.qualitySchemeOptions.length === 0) {
            const qualitySchemeOptions = await this.getQualitySchemeOptions(
              el.materialId,
              el.inspectionSheetType,
              el.inspectionSheetCode
            )
            this.$nextTick(() => {
              this.$set(el, 'qualitySchemeOptions', qualitySchemeOptions)
            })
            console.log('qualitySchemeOptions -> ', qualitySchemeOptions)
          }
        })
        this.materialForm.tableData = tableData
        // this.materialForm.tableData[0].qualityInspectionSchemeName = newValue[0]?.inspectionSchemeName
        // this.materialForm.tableData[0].qualityInspectionSchemeId = newValue[0]?.inspectionSchemeId
        // if (this.materialForm.qualityInspectionSchemeId) {
        //   this.$emit('qualityInspectionSchemeId', this.materialForm.qualityInspectionSchemeId)
        // }
      }
    },
    'materialForm.tableData': {
      immediate: true,
      deep: true,
      async handler(newValue, oldValue) {
        if (this.materialForm.tableData[0]) {
          this.getMaterialBatch()
        }
        const tableData = JSON.parse(JSON.stringify(newValue))
        tableData.forEach(el => {
          el.materialRemark = el.remark
          const rk = el.lineRemark
          delete el['lineRemark']
          el.remark = rk
        })
        this.$emit('materialUpdate', tableData)

        if (newValue.length && newValue[0].originalQuantity) {
          this.getBusinessConfigFn()
        }
        if (newValue.length && newValue[0].samplingQuantity) {
          this.getBusinessConfigFn()
        }
      }
    },
    documentType: {
      // immediate: true,
      handler(newValue, oldValue) {
        this.getMaterialBatch()
        // console.log('xxxxx -> ', newValue)
      }
    }
  },
  created() {
    this.getAqlList()
    this.getLevelList()
  },
  methods: {
    // 获取物料信息默认值
    getBusinessConfigFn() {
      if (!this.materialForm.tableData[0].originalQuantity || !this.materialForm.tableData[0].samplingQuantity) {
        return
      }
      getBusinessConfig().then(res => {
        if (res.data.code === '200') {
          const businessConfig = res.data.data
          console.log('物料信息默认值 -> ', res.data.data)
          if (businessConfig) {
            const { value, optionValues } = businessConfig
            // this.materialForm.tableData[0].originalQuantity = originalQuantity
            // this.materialForm.tableData[0].samplingQuantity = samplingQuantity
            // eslint-disable-next-line no-unused-vars
            for (const b of JSON.parse(optionValues)) {
              if (b.value === Number(value)) {
                switch (b.label) {
                  case '空':
                    break
                  case '抽样数量':
                    this.materialForm.tableData[0].qualifiedQuantity = this.materialForm.tableData[0].samplingQuantity
                    break
                  case '送检数量':
                    this.materialForm.tableData[0].qualifiedQuantity = this.materialForm.tableData[0].originalQuantity
                    break
                }
              }
            }
          }
        }
      })
    },
    async getQualitySchemeOptions(id, inspectionSheetType, inspectionSheetCode) {
      console.log('params -> ', id, inspectionSheetType, inspectionSheetCode)
      // const { workOrderNumber } = this.materialForm.tableData[0]
      const {
        data: { code, data }
      } = await qualitySchemes({
        id,
        inspectionSheetType,
        // inspectionSheetType === 10 表明送检类型是二次检验单,二次检验单需要传入 inspectionSheetCode
        inspectionSheetCode: inspectionSheetType === 10 ? inspectionSheetCode : undefined
      })
      if (code === '200') {
        return data
      } else {
        return []
      }
    },
    generateCode(val) {
      console.log('barCode -> ', val)
      this.materialForm.tableData[0].materialBatch = val.barCode
      // debugger
    },
    hdBatchFocus() {
      if (!this.pageType !== 'edit') return

      console.log('-> *_* <-')
      if (!this.materialBatchOptions.length) {
        this.$refs.batchDialog.show({
          params: this.materialForm.tableData[0],
          batchBtnDisabled: false
        })
      }
    },
    addBatch() {
      this.$refs.batchDialog.show({
        params: this.materialForm.tableData[0],
        batchBtnDisabled: false
      })
    },
    // 获取批次
    async getMaterialBatch() {
      // getMaterialBatch
      const { workOrderNumber, materialCode, skuId, inspectionSheetCode, orderNumber } = this.materialForm.tableData[0]
      if ([1, 2, 3].includes(this.documentType)) {
        const params = {
          relateNumber: workOrderNumber,
          materialCode,
          ruleType: this.documentType === 1 ? 'finished' : 'purchase',
          current: 1,
          size: 20,
          skuId: skuId ?? 0
        }
        // materialBatchOptions
        const { data: { code, data: { records }}} = await getBatchNumber(params)
        if (code === '200') {
          console.log('批次数据是 -> ', records)
          this.materialBatchOptions = records
        }
      } else if (this.documentType === 4) {
        console.log('workOrderNumber -> ', this.materialForm.tableData[0])
        const params = {
          workOrderTakeOutOrderNumber: orderNumber,
          current: 1,
          size: 20
        }
        getBatchNumber(params).then(res => {
          if (res.data.code === '200') {
            console.log('批次数据是 -> 4', res.data.data.records)
            this.materialBatchOptions = res.data.data.records
          }
        })
      } else if (this.documentType === 5) {
        const params = {
          workOrderSupplementOrderNumber: orderNumber,
          current: 1,
          size: 20
        }
        getBatchNumber(params).then(res => {
          if (res.data.code === '200') {
            console.log('批次数据是 ->  5', res.data.data.records)
            this.materialBatchOptions = res.data.data.records
          }
        })
      } else if (this.documentType === 6) {
        const params = {
          inspectionSheetCode: inspectionSheetCode,
          current: 1,
          size: 20
        }
        getBatchNumber(params).then(res => {
          if (res.data.code === '200') {
            console.log('批次数据是 -> 6', res.data.data.records)
            this.materialBatchOptions = res.data.data.records
          }
        })
      }
      // console.log('tableData workOrderNumber -> ', workOrderNumber, this.materialForm.tableData[0])
    },
    receiveMaterial(tableData) {
      this.materialForm.tableData = tableData
      // console.log('receiveMaterial -> ', this.materialForm.tableData)
    },
    changeInspectionScheme(qualityInspectionSchemeId, row) {
      // console.log('xxxxx -> ', qualityInspectionSchemeId, row)
      // row.inspectionSchemeId = qualityInspectionSchemeId
      const qualityInspectionScheme = row.qualitySchemeOptions.find(i => qualityInspectionSchemeId === i.qualityInspectionSchemeId)

      const { inspectionLevel, acceptanceQualityLimit } = qualityInspectionScheme

      row.inspectionLevel = inspectionLevel
      row.acceptanceQualityLimit = acceptanceQualityLimit
      // this.$emit('qualityInspectionSchemeId', qualityInspectionSchemeId)
    },
    async getAqlList() {
      const { data: { code, data }} = await aqlList()
      if (code === '200') {
        this.acceptanceQualityLimitOptions = data
      }
    },
    async  getLevelList() {
      const { data: { code, data }} = await levelList()
      if (code === '200') {
        this.inspectionLevelOptions = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
    height: calc(100% - 80px);
    .materail-table {
        ::v-deep .el-form-item {
        margin: 0;
        .el-form-item__error {
          z-index: 88;
        }
      }
        ::v-deep .el-form-item__content {
            overflow: visible;
            padding-right: 8px;
            .el-input {
            width: 100%;
            }
          }
    }
    .btn-add {
        width: 116px;
        height: 32px;
        background: rgba($color: #1890ff, $alpha: 0.2);
        line-height: 24px;
        color: #1890ff;
        margin-top: 16px;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            margin-right: 8px;
        }
    }

}

::v-deep .el-table .cell {
  overflow: visible;
  padding: 0 5px !important;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
