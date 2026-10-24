<template>
  <div class="container">
    <!-- <header style="margin-bottom: 10px; justify-content: flex-end" class="btns">
      <section class="btn-right">
        <section class="reset">
          <el-button size="mini" @click="reset">重置 </el-button>
        </section>
      </section>
    </header> -->
    <!-- 表格部分 -->
    <div class="tablebox">
      <ElTableContent
        :search="tableSearch"
        :list-query="listQuery"
        :table-data="tableData"
        :table-column="tableColumn"
        :select-option="selectList"
        :request-config="requestConfig"
        :action-width="0"
        @filterSearch="filterSearch"
        @makeNewRequest="makeNewRequest"
      />
    </div>
    <!-- 页码 -->
    <pagination3
      v-show="total > 0"
      style="align-items: center"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { getCheckRecordsList, getDocumentEnums } from '@/api/quality-manage'
import ElTableContent from '@/components/ElTableColumn'
import Pagination3 from '@/components/Pagination3'
import { CHECK_RECORDS, CHECK_RECORDS_SEARCH } from './constant/records'
export default {
  name: 'CheckRecord',
  components: { ElTableContent, Pagination3 },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 20
      },
      total: 0,
      tableColumn: CHECK_RECORDS,
      requestConfig: {
        isMaterial: false
      },
      tableData: [],
      selectList: [],
      tableSearch: CHECK_RECORDS_SEARCH
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 处理下拉选择
    filterSearch(name) {
      switch (name) {
        case 'documentTypeName':
          getDocumentEnums().then(res => {
            this.selectList = res.data.data
          })
          break
      }
    },
    // 筛选完成回调
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        if (el === 'relateDocumentTypes') {
          this.listQuery[el] = val[el]?.split(',')
          return
        }
        this.listQuery[el] = val[el]
      })
      this.getList()
    },
    async getList() {
      this.loading = true
      const res = await getCheckRecordsList(this.listQuery)
      this.loading = false
      const { data } = res.data
      this.tableData =
        data.records.map(item => {
          const { materialFields } = item
          return {
            ...item,
            code: materialFields?.code,
            name: materialFields?.name,
            standard: materialFields?.standard
          }
        }) || []
      this.total = data.total
    },
    reset() {
      this.listQuery = {
        current: 1,
        size: 20
      }
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.tablebox {
  height: calc(100vh - 75px) !important;
}
</style>
