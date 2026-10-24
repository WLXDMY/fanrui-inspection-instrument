<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-21 16:46:36
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-06-22 20:23:01
 * @Description:
-->
<template>
  <div class="container">
    <!-- 顶部按钮区域 -->
    <header style="margin-bottom: 42px" class="btns">
      <TopHeader
        class="btn-left"
        :list-query="listQuery"
        :is-exist-approve-btn="isExistApproveBtn"
        @updateList="getDetectionList"
      />

      <section class="btn-right">
        <section class="reset">
          <el-button size="mini" @click="resetTemp">重置 </el-button>
        </section>
      </section>
    </header>
    <!-- 表格区域 -->
    <main v-loading="loading" class="tablebox">
      <ElTableContent
        ref="tableArea"
        :table-column="tableColumn"
        :table-data.sync="tableData"
        :sum-col-data="sumColData"
        :is-exist-approve-btn="isExistApproveBtn"
        :list-query="listQuery"
        :material-fields="materialFields"
        :column-search-list.sync="searchList"
        model-type="checkProductResult"
        style="height: 100%; width: 100%"
        @tableSelectRow="tableSelectRow"
        @tableHeaderClear="tableHeaderClear"
        @tableHeaderSearch="tableHeaderSearch"
        @updateList="getDetectionList"
      >
        <template #recordPictures="{ row, item }">
          <div>
            <ImagePreview :src="transFormSrc(row[item.code])" :width="50" :height="50" :multiple="true" />
          </div>
        </template>
      </ElTableContent>
      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.current"
        :limit.sync="listQuery.size"
        @pagination="getDetectionList"
      />
    </main>
  </div>
</template>

<script>
import { getInspectsheetsDetailPage } from '@/api/quality-manage'
import { isExistApprove } from '@/api/examineApprove.js'
import { CHECK_PRODUCT_RESULT_TABLE } from '@/constant/checkProductResultList.js'
import { LIST } from '@/constant/checkProductResultSearchList.js'
import { v4 as uuidv4 } from 'uuid'
import TopHeader from './components/home/headActionBtn.vue'
import ElTableContent from './components/common/ElTableColumn/index.vue'
import Pagination from '@/components/Pagination3'

export default {
  components: {
    TopHeader,
    ElTableContent,
    Pagination,
    ImagePreview: () => import('@/components/ImagePreview')
  },
  data() {
    return {
      loading: false,
      listQuery: {
        current: 1,
        size: 20
      },
      isExistApproveBtn: false,
      tableColumn: [], // 表格列数据
      tableData: [], // 表格数据
      sumColData: {},
      total: 0,
      multipleSelection: [], // 选中的表格行
      searchList: LIST,
      materialFields: {}
    }
  },
  created() {
    // this.getForwardSession()
    Promise.allSettled([this.isExistApprove(), this.getDetectionList()]).then(() => {
      this.aginRenderColumn()
    })
  },
  methods: {
    // 获取存储到本地的请求数据
    // getForwardSession() {
    //   try {
    //     const conditions = JSON.parse(
    //       sessionStorage.getItem('conditions') || '{}'
    //     )
    //     const { current = 1, size = 20, type } = conditions || {}
    //     const list = ['edit', 'detail']
    //     if (!list.includes(type)) {
    //       sessionStorage.removeItem(conditions)
    //       return
    //     }
    //     this.listQuery = {
    //       ...conditions,
    //       current,
    //       size
    //     }
    //   } catch (err) {
    //     console.error(err)
    //     this.listQuery = {
    //       ...this.listQuery,
    //       current: 1,
    //       size: 20
    //     }
    //   }
    // },
    // 处理跳转数据
    // handleBackList(path) {
    //   const conditions = Object.assign(this.listQuery, { routeName: path })
    //   sessionStorage.setItem('conditions', JSON.stringify(conditions))
    // },
    // 判断是否显示审批
    async isExistApprove() {
      const result = await isExistApprove('productInspectionPlan')
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        this.isExistApproveBtn = data
      } else {
        this.$notify({
          title: '提示',
          message: message,
          type: 'error',
          duration: 2000
        })
      }
    },
    // 查询产品检验结果
    async getDetectionList() {
      this.loading = true
      const result = await getInspectsheetsDetailPage(this.listQuery)
      const { code, data, message } = result.data || {}
      this.loading = false
      if (+code === 200) {
        this.tableData = (data.records || []).map(item => {
          return {
            ...item,
            singleId: uuidv4()
          }
        })
        this.total = data.total
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 重新计算需要展示的列数据
    aginRenderColumn() {
      const list = CHECK_PRODUCT_RESULT_TABLE
      const result = []
      if (!this.isExistApproveBtn) {
        const extendWords = ['approverName', 'approvalStatusName']
        this.tableColumn = list.filter(item => {
          return !extendWords.includes(item.code)
        })

        this.tableColumn = this.tableColumn.concat(result)
      } else {
        this.tableColumn = list.concat(result)
      }
    },
    // 选中的表格行数据
    tableSelectRow(val = []) {
      this.multipleSelection = val
    },
    // 表格清空
    tableHeaderClear(value = {}) {
      this.listQuery = {
        ...this.listQuery,
        ...value,
        current: 1,
        size: 20
      }
    },
    // 表格搜索功能
    tableHeaderSearch(value = {}) {
      Object.keys(value).forEach(el => {
        this.listQuery[el] = value[el]
      })
      this.listQuery = {
        ...this.listQuery
      }
      this.getDetectionList()
    },
    // 重置
    resetTemp() {
      Object.keys(this.listQuery).forEach(el => {
        this.listQuery[el] = ''
      })
      this.listQuery = {
        ...this.listQuery,
        current: 1,
        size: 20
      }
      this.getDetectionList()
      this.loading = false
    },
    transFormSrc(val) {
      const arr = val || []
      return arr.map(item => item.url).join(',')
    }
  }
}
</script>
<style lang="scss" scoped></style>
