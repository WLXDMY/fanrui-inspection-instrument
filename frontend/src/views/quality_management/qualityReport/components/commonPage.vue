<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-07-30 11:22:32
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-16 09:14:27
 * @Description: 缺陷分析页面
-->
<template>
  <div class="table-content">
    <slot name="name" />
    <section class="btns">
      <section class="search-date setting-date">
        <div class="search-txt" :style="{ width: '83px' }">日期：</div>
        <el-date-picker
          v-model="date"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 350px"
          @change="timeChanged"
        />
        <el-checkbox-group v-model="checkList" :style="{ marginLeft: '20px' }" @change="hdspecificDate">
          <el-checkbox label="today">今日</el-checkbox>
          <el-checkbox label="yesterday">昨日</el-checkbox>
          <el-checkbox label="last_seven_days">近七天</el-checkbox>
          <el-checkbox label="last_thirty_days">一个月</el-checkbox>
        </el-checkbox-group>
      </section>
      <!-- 导出报表 -->
      <!-- <ImportBtn class="button-font" style="height: 32px; overflow: hidden" :import-params="exportParams">
        <template #productOrderUploadBillTemplate="{ props }">
          <el-button size="small" class="import-temp" @click.native="productOrderUploadBillTemplate(props)">
            {{ props.title }}
          </el-button>
        </template>
        <template #exportAttendance="{ props }">
          <el-button size="small" class="import-temp" @click.native="exportAttendance(props)">
            {{ props.title }}
          </el-button>
        </template>
        <template #productOrderDownloadDefaultBillTemplate="{ props }">
          <el-button size="small" class="import-temp" @click.native="productOrderDownloadDefaultBillTemplate(props)">
            {{ props.title }}
          </el-button>
        </template>
      </ImportBtn> -->
      <el-button type="primary" size="small" style="margin-left: 8px" @click="getExport">导出</el-button>
      <el-button type="primary" size="small" style="margin-left: 8px" @click="reset">重置</el-button>
      <el-button type="primary" size="small" style="margin-left: 8px" class="import-temp" @click="getList"
        >查询</el-button
      >
      <el-button type="primary" size="small" @click="handleAllOpen">
        {{ titleWord }}
      </el-button>
    </section>
    <el-collapse-transition>
      <!-- 检验类型 为供应商时隐藏 -->
      <!-- 供应商 为供应商时显示 -->
      <main v-show="isOpenBaseInfo" class="search">
        <section v-if="name !== '按供应商'" class="search-ipt">
          <div class="search-txt">检验类型：</div>
          <el-select v-model="queryParams.inspectType" placeholder="请选择" size="mini">
            <el-option v-for="(item, index) in inspectTypeEnums" :key="index" :label="item.name" :value="item.code" />
          </el-select>
          <!-- <el-input v-model="queryParams.inspectType" class="editInput" size="small" /> -->
        </section>
        <section v-if="name === '按供应商'" class="search-ipt">
          <div class="search-txt">供应商：</div>
          <el-input v-model="queryParams.supplierCode" class="editInput" size="small" />
        </section>
        <section class="search-ipt">
          <div class="search-txt">物料编码：</div>
          <el-input v-model="queryParams.materialCode" class="editInput" size="small" />
        </section>
        <section class="search-ipt">
          <div class="search-txt">物料名称：</div>
          <el-input v-model="queryParams.materialName" class="editInput" size="small" />
        </section>
        <section v-if="name === '按缺陷原因' || name === '按缺陷'" class="search-ipt">
          <div class="search-txt">缺陷：</div>
          <el-input v-model="queryParams.defectCode" class="editInput" size="small" />
        </section>
        <section v-if="name === '按缺陷原因'" class="search-ipt">
          <div class="search-txt">缺陷原因：</div>
          <el-input v-model="queryParams.defectReasonCode" class="editInput" size="small" />
        </section>
      </main>
    </el-collapse-transition>
    <!-- style="height: calc(100% - 226px)" -->
    <CommonTableNew
      ref="common-table"
      v-loading="loading"
      class="common-table"
      :data="tableData"
      :modular-type="columnsSaveName"
      border
      :all-comumns="allComumns"
      :left-selection="false"
      is-scheme
      :column-permission-action="columnPermissionAction"
      :scheme-permission="schemePermission"
      :columns-save-name="columnsSaveName"
      @reNewAllComumns="reNewAllComumns"
    >
      <!-- 对于需要特殊处理的字段 通过prop columnType: 'slot'-->
      <!-- <template #defectType="{ row }"> {{ row.defectTypeName }} </template> -->
      <template #defectQuantity="{ row }">
        <span :style="{ color: row['defectQuantityStateColor'] }">
          {{ row.defectQuantity }}
        </span>
      </template>
    </CommonTableNew>
    <Pagination
      v-show="pagination.total > 0"
      :total="pagination.total"
      :page.sync="pagination.current"
      :limit.sync="pagination.size"
      class="pagination"
      @pagination="getList"
    />

    // 上传单据模板
    <BillAttachment ref="billAttachment" :model-type="modelType" @exportOrderBytemplate="qualityExcelExport" />
  </div>
</template>

<script>
import { badSummaryExcelExport, defectExport, defectPageList } from '@/api/qualityReport.js'
import { getInspectTypeEnumsByConfig } from '@/api/quality-manage.js'
// import ImportBtn from '@/views/common/importExcel/importbtn.vue'
import BillAttachment from '@/views/common/importExcel/billAttachment.vue'
import { saveAs } from 'file-saver'
import CommonTableNew from '@/components/CommonTableNew'
import Pagination from '@/components/Pagination3'

export default {
  components: {
    CommonTableNew,
    // ImportBtn,
    BillAttachment,
    Pagination
  },
  props: {
    modelType: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default: () => []
    },
    showType: {
      type: String,
      default: 'material'
    },
    columnsSaveName: {
      type: String,
      default: 'colums'
    },
    // 表格里面的配置权限
    columnPermissionAction: {
      type: String,
      default: ''
    },
    // 方案配置权限
    schemePermission: {
      type: String,
      default: ''
    },
    // 页面名称
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      checkList: [],
      pagination: {
        current: 1,
        size: 20,
        total: 0
      },
      allComumns: '',
      tableData: [],
      inspectTypeEnums: [],
      date: [],
      isOpenBaseInfo: true,
      titleWord: '查询条件收起',
      queryParams: {
        showType: '',
        recordDateStart: '',
        recordDateEnd: '',
        inspectType: '',
        materialName: '',
        materialCode: '',
        supplierCode: '',
        defectCode: '',
        defectReasonCode: '',
        dateRange: ''
      },
      // 导出报表参数
      exportParams: {
        otherParams: {
          ptitle: '导出报表'
        },
        btnList: [
          // {
          //   code: 'productOrderDownloadDefaultBillTemplate',
          //   type: 'slot',
          //   title: '下载默认导出模板',
          //   exportDefualtApi: exportBadSummaryTemplate,
          //   // 权限相关
          //   permissions: {
          //     action: 'defectSummary:downDefaultTemplate',
          //     currentPath: this.$route.path
          //   }
          // },
          // {
          //   code: 'productOrderUploadBillTemplate',
          //   type: 'slot',
          //   title: '上传/下载自定义导出模板',
          //   billType: 'uploadAndDownload',
          //   downLoadType: 'apiDownLoad',
          //   permissions: {
          //     action: 'defectSummary:downUploadTemplate',
          //     currentPath: this.$route.path
          //   },
          //   billApi: {
          //     queryFiles: queryBadSummaryUploadFileList,
          //     uploadFile: uploadBadSummaryFileUpload,
          //     deleteFile: uploadFileDelete,
          //     downloadFile: downLoadExportTemplate
          //   }
          // },

          {
            code: 'exportAttendance',
            type: 'slot',
            title: '导出Excel',
            billType: 'downloadExcelByQueryParams',
            // permissions: {
            //   action: 'defectSummary:exportExcel',
            //   currentPath: this.$route.path
            // },
            billApi: {
              queryFiles: defectExport
            }
          }
        ]
      }
    }
  },
  watch: {
    columns: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.allComumns = newVal
      }
    }
  },
  created() {
    this.getInspectTypeEnums()
  },
  methods: {
    handleAllOpen() {
      if (this.titleWord === '查询条件收起') {
        this.isOpenBaseInfo = false
        this.titleWord = '查询条件展开'
      } else {
        this.isOpenBaseInfo = true
        this.titleWord = '查询条件收起'
      }
    },
    // 处理特定时间选择
    hdspecificDate(val) {
      this.checkList = [val[val.length - 1]]
      const { recordDateStart, recordDateEnd } = this.queryParams
      if (recordDateStart || recordDateEnd) {
        this.queryParams.recordDateStart = ''
        this.queryParams.recordDateEnd = ''
        this.date = []
      }
      this.queryParams.dateRange = val[val.length - 1]
    },
    // 下载默认导出模板
    productOrderDownloadDefaultBillTemplate(item) {
      const fn = item.exportDefualtApi
      fn({ showType: this.showType })
        .then(res => {
          const fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
          const fileNameCN = decodeURIComponent(decodeURIComponent(fileName)) // 中文解码
          saveAs(res, fileNameCN)
        })
        .catch(err => {
          this.$notify({
            title: '提示',
            message: err.message || '下载默认导入模板失败',
            type: 'warning',
            duration: 1000
          })
        })
    },
    // 时间变动后执行
    timeChanged(val) {
      Object.assign(this.queryParams, {
        recordDateStart: val?.[0] ?? '',
        recordDateEnd: val?.[1] ?? ''
      })
      if (this.checkList.length) {
        this.checkList = []
        this.queryParams.dateRange = ''
      }
    },
    // 更新 allComumns
    reNewAllComumns(val) {
      this.allComumns = val
      this.getList()
    },
    updateQueryParams(v) {
      this.queryParams = v
      this.getList()
    },
    // 上传单据模板-下载模块
    async qualityExcelExport(val) {
      const { id = '' } = val
      const params = { ...this.queryParams, showType: this.showType }
      badSummaryExcelExport(params, id).then(res => {
        let fileName
        fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
        fileName = decodeURI(fileName) // 中文解码
        saveAs(res, fileName)
        this.$notify({
          title: '成功',
          message: '导出成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 上传单据模板
    productOrderUploadBillTemplate(item) {
      this.$refs.billAttachment.show({
        dialogTitle: '上传单据模板',
        otherParams: item
      })
    },
    // 导出
    exportAttendance(item) {
      const dialogTitle = '导出excel'

      this.$refs.billAttachment.show({
        dialogTitle,
        otherParams: {
          ...item
        }
      })
    },
    // 获取表格数据
    async getList(type = 'getList') {
      const params = {}

      if (type === 'reset') {
        this.pagination.current = 1
        this.pagination.size = 20
        this.date = []
        this.checkList = []
        this.queryParams = {
          showType: '',
          recordDateStart: '',
          recordDateEnd: '',
          inspectType: '',
          materialName: '',
          materialCode: '',
          supplierCode: '',
          defectCode: '',
          defectReasonCode: '',
          dateRange: ''
        }
      }
      const { size, current } = this.pagination
      if (type === 'reset') {
        Object.assign(params, {
          recordDateStart: '',
          recordDateEnd: '',
          inspectType: '',
          materialName: '',
          materialCode: '',
          supplierCode: '',
          defectCode: '',
          defectReasonCode: '',
          dateRange: '',
          showType: this.showType,
          size,
          current
        })
      } else {
        Object.assign(params, {
          ...this.queryParams,
          showType: this.showType,
          current,
          size
        })
      }
      this.loading = true
      try {
        const {
          data: { status, data }
        } = await defectPageList(params)
        if (status === 1) {
          this.tableData = await this.hdTableDataThresholdValue(data.records)
          this.pagination.total = data.total
          this.loading = false
        }
        this.$nextTick(() => {
          this.$refs['common-table']?.$refs?.table?.doLayout()
        })
      } catch (error) {
        this.loading = false
      }
    },

    async hdTableDataThresholdValue(tableData) {
      const remoteColumns = JSON.parse(JSON.stringify(this.allComumns))
      const thresholdKeys = ['unqualifiedQuantity', 'defectQuantity']
      tableData.forEach(i => {
        thresholdKeys.forEach(tk => {
          const columnConfig = remoteColumns.find(colunm => colunm.prop === tk)
          const thresholdNum = Number(i[tk] ?? 0)
          const configNum = Number(columnConfig?.thresholdValue ?? 0)
          if (tk === 'unqualifiedQuantity') {
            // 阈值大于配置值
            if (thresholdNum > configNum) {
              i[`${tk}StateColor`] = 'red'
            }
            // 阈值等于配置值
            if (thresholdNum === configNum) {
              i[`${tk}StateColor`] = '#000'
            }
            // 阈值小于配置值
            if (thresholdNum < configNum) {
              i[`${tk}StateColor`] = 'green'
            }
          } else if (tk === 'defectQuantity') {
            // 阈值大于配置值
            if (thresholdNum > configNum) {
              i[`${tk}StateColor`] = 'red'
            }
            // 阈值等于配置值
            if (thresholdNum === configNum) {
              i[`${tk}StateColor`] = '#000'
            }
            // 阈值小于配置值
            if (thresholdNum < configNum) {
              i[`${tk}StateColor`] = 'green'
            }
          }
        })
      })
      return tableData
    },
    reset() {
      this.getList('reset')
    },
    // 获取检验类型枚举
    async getInspectTypeEnums() {
      const result = await getInspectTypeEnumsByConfig()
      const { data } = result.data || []
      this.inspectTypeEnums = data.inspectTypes || []
    },
    // 导出
    async getExport() {
      const params = { ...this.queryParams, showType: this.showType, ...this.pagination }
      defectExport(params).then(res => {
        let fileName
        fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
        fileName = decodeURI(fileName) // 中文解码
        saveAs(res, fileName)
        this.$notify({
          title: '成功',
          message: '导出成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-content {
  height: 100%;
  padding-top: 10px;
  .btns {
    padding: 8px 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.common-table {
  padding: 0 16px;
  // height: 600px;
  height: 61vh;
  ::v-deep .el-table__fixed-right {
    height: 100% !important;
    thead {
      tr {
        th:last-child {
          .cell {
            span {
              display: none;
            }

            .el-icon-setting {
              margin-left: 4px !important;
            }
          }
        }
      }
    }
  }
}

.pagination-container {
  position: relative;
}

::v-deep .el-table td {
  height: 38px;
  padding: 0;
}

/deep/ .el-dialog__wrapper .el-dialog {
  width: 565px !important;
}

::v-deep .el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  margin: auto 16px;
}
.search-ipt {
  display: flex;
  width: 250px;
  align-items: center;
  margin: 10px 10px;
}
.search-txt {
  width: 124px;
}
.search-date {
  display: flex;
  width: 330px;
  align-items: center;
  margin: auto 10px;
}
.setting-date {
  width: 70% !important;
  flex: 1;
  padding: 10px 0px;
}
.beRed {
  color: red;
}
.record {
  height: 86vh;
}
.pagination {
  position: absolute;
}
</style>
