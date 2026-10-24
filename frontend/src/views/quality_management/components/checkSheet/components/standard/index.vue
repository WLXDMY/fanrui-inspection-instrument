<template lang="">
  <div>
    <!--  -->
    <section class="table">
      <el-table
        :data="tableData"
        max-height="400"
        highlight-current-row
        border
        style="width: 100%"
        :header-cell-style="{
          background: '#ECF1FF',
          color: '#333333',
          'font-family': 'Source Han Sans CN',
          'font-weight': '400'
        }"
      >
        <el-table-column
          prop="type"
          label="缺陷类型"
        >
          <template slot-scope="{ row }">
            <span>{{ translateType(row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="aqlValue"
          label="AQL值"
        />
        <el-table-column
          prop="inspectionLevelName"
          label="检验水平"
        />

        <el-table-column
          prop="lenientLevelName"
          label="严宽水平"
        />
        <el-table-column
          prop="acValue"
          label="ac接收数"
        />
        <el-table-column
          prop="reValue"
          label="re拒收数量"
        />
      </el-table>
    </section>
  </div>
</template>
<script>
import { getDetectionNotmaterialDetail } from '@/api/quality-manage'
export default {
  props: {
    qualityInspectionSchemeId: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  watch: {
    qualityInspectionSchemeId: {
      handler(val) {
        if (val) {
          this.getStandard(val)
        }
      },
      immediate: true
    }
  },
  methods: {
    translateType(type) {
      switch (type) {
        case 'fatal':
          return 'Cr 致命缺陷'
        case 'main':
          return 'Ma 主要缺陷'
        case 'secondary':
          return 'Mi 次要缺陷'
      }
    },
    getStandard(id) {
      // 获取对应的检验方案
      getDetectionNotmaterialDetail(this.qualityInspectionSchemeId)
        .then(res => {
          if (res.data.code === '200') {
            console.log('检验方案数据 -> ', res.data)
            // this.tableData = res.data.data?.qualityInspectionSchemeSampleEntities || []
            const data = res.data.data?.qualityInspectionSchemeSampleEntities || []
            this.tableData.push(...data)
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
