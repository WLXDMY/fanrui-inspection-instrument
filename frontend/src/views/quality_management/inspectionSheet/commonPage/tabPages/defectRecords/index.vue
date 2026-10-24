<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-10 11:03:27
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-08-01 10:32:35
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\tabPages\defectRecords\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-if="!noSelectRow" class="defectRecords">
    <section class="centerArea">
      <div>
        物料缺陷
        <el-button type="text" @click="changeRow('first')">首行</el-button>
        <el-button type="text" @click="changeRow('previous')">上一行</el-button>
        <el-button type="text" @click="changeRow('next')">下一行</el-button>
        <el-button type="text" @click="changeRow('last')">末行</el-button>
      </div>
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
      <div>
        <el-button type="text" :disabled="isDetailType" @click="showDefectDialog = true">新增缺陷</el-button>
        <el-button
          class="deleteBtn"
          type="text"
          :disabled="multipleDefect.length === 0 || isDetailType"
          @click="deleteDefect"
        >
          删除缺陷
        </el-button>
      </div>
      <DefectTable :table-data="currentRow.materialDefects" :columns="columns" :multiple-defect.sync="multipleDefect">
        <!-- 缺陷分析 -->
        <template #researchReviewFlag="{ row }">
          <el-checkbox v-model="row.researchReviewFlag" :disabled="isDetailType" :true-label="1" :false-label="0" />
        </template>
        <!-- <template #productCodes="{ row }"> <el-input v-model="row.productCodes" size="small" /> </template> -->
        <template #defectNum="{ row }">
          <el-input v-model="row.defectNum" type="number" size="small" />
        </template>
        <template #defectLevel="{ row }">
          <el-select v-model="row.defectLevel" placeholder="请选择">
            <el-option v-for="(item, index) in defectLevelEnums" :key="index" :label="item.name" :value="item.code" />
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
    </section>
    <ConsolidatedRecords v-if="!isAddType" :row-id="currentRow.id" />
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
  </div>
</template>
<script>
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import DefectTable from '../inspectionItems/inspectionSample/defectTable.vue'
import ConsolidatedRecords from './consolidatedRecords.vue'
import { LIST, DefectColumn } from '../inspectionItems/inspectionSample/constant'
import { getDefectEnums, deleteMaterialDefete } from '@/api/quality-manage.js'
import { USE_DEFECTS_REASON_API } from '@/api/defectReason.js' // 缺陷原因
import { USE_DEFECTS_RESULT_API } from '@/api/defectResult.js' // 缺陷后果
const DEFECTS_REASON_API = USE_DEFECTS_REASON_API()
const DEFECTS_RESULT_API = USE_DEFECTS_RESULT_API()

export default {
  name: 'DefectRecords',
  components: { DefectTable, CommonSelectDialogPlus, ConsolidatedRecords },
  inject: ['sheetInitStatus'],
  props: {
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
      columns: [],
      multipleDefect: [],
      tableDefectColumn: DefectColumn,
      showDefectDialog: false,
      defectLevelEnums: [],
      defectReasonEnums: [],
      defectResultEnums: []
    }
  },
  computed: {
    noSelectRow() {
      return this.clickIndex === -1
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    }
  },
  watch: {},
  created() {
    this.getDefectEnums()
    this.getDefectsReasonEnums()
    this.getDefectsResultEnums()
    this.columns = [...LIST]
    this.columns.shift()
  },
  mounted() {},
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
    },
    // 切换行
    changeRow(flag) {
      this.$emit('changeRow', flag)
    },
    // 缺陷弹窗确认
    handleDefectConfirm(rows) {
      const arr = rows.map(row => {
        return {
          defectName: row.name,
          defectCode: row.code
        }
      })
      // const Obj = {
      //   defectName: row.name,
      //   defectCode: row.code
      // }
      this.currentRow.materialDefects.push(...arr)
      this.showDefectDialog = false
    },
    // 删除缺陷
    deleteDefect() {
      const deleteIds = this.multipleDefect.map(item => item.id).filter(item => !isNaN(item))
      if (deleteIds.length > 0) {
        this.$confirm('删除缺陷? ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMaterialDefete(deleteIds).then(_ => {
            this.$message.success('删除成功')
            this.currentRow.materialDefects = this.currentRow.materialDefects.filter(item => {
              return this.multipleDefect.indexOf(item) === -1
            })
          })
        })
      } else {
        this.currentRow.materialDefects = this.currentRow.materialDefects.filter(item => {
          return this.multipleDefect.indexOf(item) === -1
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.defectRecords {
  .centerArea {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    margin-bottom: 10px;
  }
}
</style>
