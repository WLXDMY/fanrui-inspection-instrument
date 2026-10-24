<template>
  <div class="container">
    <section class="btns">
      <section>
        <!-- <el-button
          v-permission="{ action: 'incoming.inspection:add' }"
          size="small"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="hdBtnClick({ type: 'add' })"
        >新建</el-button>
        <el-button
          v-permission="{ action: 'incoming.inspection:export' }"
          size="small"
          type="primary"
          @click="hdBtnClick({ type: 'reportDividedIntoGroups' })"
        >报表分组</el-button> -->
        <el-button size="small" type="primary" @click="$router.go(-1)"> 返回 </el-button>
      </section>
      <section class="btn-right">
        <el-button style="margin-left: 20px" size="small" type="primary" @click="hdBtnClick({ type: 'reset' })">
          重置
        </el-button>
      </section>
    </section>
    <CommonTablePlus
      ref="common-table"
      v-loading="loading"
      class="common-table"
      :data="tableData"
      border
      :all-comumns="allComumns"
      model-type="singleProductViewLog"
      @getList="getList"
    >
      <template #status="{ row }">
        <span :style="{ color: row.status === 3 ? 'red' : 'fff' }">
          {{ row.status === 2 ? '完成' : row.status === 3 ? '失败' : '' }}
        </span>
      </template>
      <template #progressRate="{ row }">
        <el-progress :stroke-width="10" :percentage="row.progressRate" color="#409eff" />
      </template>
      <template #failedCount="{ row }">
        <span :style="{ color: row.status === 3 ? 'red' : 'fff' }">
          {{ row.failedCount }}
        </span>
      </template>
      <template #operate="{ row }">
        <div class="operate">
          <el-button
            type="text"
            :disabled="row.status === 3 || row.status === 0 || row.estimateCount === 0"
            size="small"
            @click="hdBtnClick({ type: 'download', row })"
            >下载</el-button
          >
        </div>
      </template>
    </CommonTablePlus>
    <Pagination
      v-show="pagination.total > 0"
      :total="pagination.total"
      :page.sync="pagination.currentPage"
      :limit.sync="pagination.pageSize"
      @pagination="
        () => {
          getList(queryParams, 'page')
        }
      "
    />
  </div>
  <!-- 下推弹窗 -->
</template>

<script>
import {
  getBomsSimpleExportHistoryDataTaskPageList,
  getBomsDetailExportHistoryDataTaskPageList,
  getCraftSimpleExportHistoryDataTaskPageList
} from '@/api/product-management'
import { inspectsheetsExportTaskPage, schemesExportTaskPage } from '@/api/quality-manage'
export default {
  components: {
    CommonTablePlus: () => import('@/components/CommonTablePlus'),
    Pagination: () => import('@/components/Pagination')
  },
  data() {
    return {
      loading: false,
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      allComumns: [
        {
          type: 'selection',
          prop: 'index',
          width: '42',
          checked: true
        },
        {
          prop: 'index',
          label: '序号',
          type: 'index',
          minWidth: '100',
          checked: true
        },
        {
          prop: 'status',
          label: '状态',
          minWidth: '250',
          columnType: 'slot',
          checked: true
        },
        {
          prop: 'progressRate',
          label: '进度',
          minWidth: '250',
          columnType: 'slot',
          checked: true
        },
        {
          prop: 'estimateCount',
          label: '总记录数',
          minWidth: '250',
          checked: true
        },
        {
          prop: 'failedCount',
          label: '失败数',
          minWidth: '250',
          columnType: 'slot',
          checked: true
        },
        {
          prop: 'startTime',
          label: '开始日期',
          minWidth: '250',
          checked: true
        },
        {
          prop: 'endTime',
          label: '结束日期',
          minWidth: '250',
          checked: true
        },
        {
          prop: 'createUserCode',
          label: '操作人',
          minWidth: '250',
          checked: true
        },
        {
          prop: 'failedMessage',
          label: '异常说明',
          minWidth: '250',
          checked: true
        },

        {
          prop: 'operate',
          label: '操作',
          minWidth: '100',
          columnType: 'slot',
          fixed: 'right',
          checked: true
        }
      ],
      queryParams: {},
      historyApi: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { importType } = this.importType || this.$route.query
      console.log('importType', importType)
      switch (importType) {
        case 'bomsSimple': {
          this.historyApi = getBomsSimpleExportHistoryDataTaskPageList
          this.getList()
          break
        }
        case 'bomsDetail': {
          this.historyApi = getBomsDetailExportHistoryDataTaskPageList
          this.getList()
          break
        }
        case 'craftSimple': {
          this.historyApi = getCraftSimpleExportHistoryDataTaskPageList
          this.getList()
          break
        }
        // 产品检验-送检单导出任务列表
        case 'inspectOrder': {
          this.historyApi = inspectsheetsExportTaskPage
          this.getList({ businessCode: 'INSPECT_EXPORT' })
          break
        }
        // 产品检验-送检单导出任务列表
        case 'scheme': {
          this.historyApi = schemesExportTaskPage
          this.getList()
          break
        }
        // 产品检验-缺陷导出任务列表
        case 'inspectDefectOrder': {
          this.historyApi = inspectsheetsExportTaskPage
          this.getList({ businessCode: 'INSPECT_DEFECT_EXPORT' })
          break
        }
      }

      // this.getList()
    },
    async getList(queryParams = {}, type) {
      if (!this.historyApi) {
        return
      }
      if (type !== 'page') {
        this.pagination.currentPage = 1
      }
      this.queryParams = queryParams
      this.loading = true

      const { pageSize, currentPage } = this.pagination
      try {
        const {
          data: {
            data: { records = [], total }
          }
        } = await this.historyApi({
          pageSize,
          currentPage,
          ...queryParams
        })
        this.tableData = records.map(i => ({
          ...i,
          progressRate: i.totalCount
            ? Number((((i.successCount || 0 + i.failedCount || 0) / i.totalCount || 0) * 100).toFixed(0))
            : 100
        }))
        this.pagination.total = total
        this.loading = false
      } catch (error) {
        console.log(error, 'error')
        this.loading = false
      }
    },

    async hdBtnClick({ type, row }) {
      switch (type) {
        // 编辑
        case 'edit':
          console.log('edit')
          break
        // 报表分组
        case 'reportDividedIntoGroups':
          console.log('reportDividedIntoGroups')
          break
        // 下载
        case 'download':
          {
            const { fileUrl } = row
            if (!fileUrl) return
            const link = document.createElement('a') // 创建a标签
            link.style.display = 'none' // 使其隐藏
            link.href = '/' + fileUrl // 赋予文件下载地址
            link.setAttribute('download', name) // 设置下载属性 以及文件名
            document.body.appendChild(link) // a标签插至页面中
            link.click() // 强制触发a标签事件
            document.body.removeChild(link)
          }

          break

        // 删除
        case 'delete':
          console.log('delete')
          break

        // 重置
        case 'reset':
          this.pagination.current = 1
          this.pagination.size = 20
          this.$refs['common-table']?.$refs['searchBox']?.resetQuery()
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 20px 24px 68px 24px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .btns {
    display: flex;
    justify-content: space-between;
    .import-btn {
      display: inline-block;
      margin-left: 10px;
    }
    .btn-right {
      display: flex;
      .focus {
        color: #1890ff !important;
        border-color: #1890ff !important;
      }
      .btn {
        width: 56px;
        color: #fff;
        height: 35px;
        border: 1px solid #dcdfe6;
        background: none;
        font-size: 14px;
        font-weight: 400px;
        cursor: pointer;
        color: #000;
        text-align: center;
        line-height: 32px;
      }
    }
  }
  .common-table {
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 50px);
  }
}
.state {
  display: flex;
  align-items: center;
  .radio {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.el-button {
  border-radius: 4px !important;
}
</style>
