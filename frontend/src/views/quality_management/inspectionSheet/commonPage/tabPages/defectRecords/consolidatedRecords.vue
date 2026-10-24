<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-18 10:17:35
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-08-01 10:41:04
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\defectRecords\consolidatedRecords.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="consolidatedRecords">
    <section class="centerArea">
      <div class="title">综合记录</div>
      <DefectTable :table-data="defectRecord" :columns="columns" :multiple-defect.sync="multipleDefect">
        <!-- 缺陷分析 -->
        <template #researchReviewFlag="{ row }">
          <el-checkbox v-model="row.researchReviewFlag" disabled :true-label="1" :false-label="0" />
        </template>
        <template #defectLevel="{ row }">
          <el-select v-model="row.defectLevel" placeholder="请选择" disabled>
            <el-option v-for="(item, index) in defectLevelEnums" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </template>
        <!-- 缺陷原因 -->
        <template #defectReasonCode="{ row }">
          <el-select v-model="row.defectReasonCode" placeholder="请选择" disabled>
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
          <el-select v-model="row.defectResultCode" placeholder="请选择" disabled>
            <el-option
              v-for="(item, index) in defectResultEnums"
              :key="index"
              :label="item.resultName"
              :value="item.resultCode"
            />
          </el-select>
        </template>
      </DefectTable>
    </section>
  </div>
</template>
<script>
import DefectTable from '../inspectionItems/inspectionSample/defectTable.vue'
import { getDefectEnums } from '@/api/quality-manage.js'
import { DefectRecordColums } from '../inspectionItems/inspectionSample/constant'
import { getInspectAllDefct } from '@/api/quality-manage.js'
import { USE_DEFECTS_REASON_API } from '@/api/defectReason.js' // 缺陷原因
import { USE_DEFECTS_RESULT_API } from '@/api/defectResult.js' // 缺陷后果
const DEFECTS_REASON_API = USE_DEFECTS_REASON_API()
const DEFECTS_RESULT_API = USE_DEFECTS_RESULT_API()

export default {
  name: 'ConsolidatedRecords',
  components: {
    DefectTable
  },
  props: {
    rowId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      defectRecord: [],
      columns: DefectRecordColums,
      multipleDefect: [],
      defectLevelEnums: [],
      defectReasonEnums: [],
      defectResultEnums: []
    }
  },
  computed: {},
  watch: {
    rowId: {
      handler(val) {
        if (typeof val !== 'number') {
          this.defectRecord = []
          return
        }
        // 获取物料缺陷综合记录
        getInspectAllDefct(val).then(res => {
          this.defectRecord = res.data.data.map(item => {
            const productCodes = item.productCodes?.join()
            return {
              ...item,
              productCodes
            }
          })
        })
      },
      immediate: true
    }
  },
  created() {
    this.getDefectEnums()
    this.getDefectsReasonEnums()
    this.getDefectsResultEnums()
  },
  methods: {
    // 权限等级
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
    }
  }
}
</script>

<style lang="scss" scoped>
.consolidatedRecords {
  .centerArea {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    margin-bottom: 10px;
  }
  .title {
    margin-bottom: 10px;
  }
}
</style>
