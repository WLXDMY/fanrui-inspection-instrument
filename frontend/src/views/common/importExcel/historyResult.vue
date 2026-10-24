<!--
 * @Author: limengjuan
 * @Date: 2022-03-16 15:09:37
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-11-14 12:27:16
 * @Description:
-->
<template>
  <div class="container1-3">
    <div class="bg-box">
      <div class="backbox">
        <el-button size="mini" type="primary" style="color: #ffffff" class="top-btn" @click="back"> 返回 </el-button>
      </div>
      <div class="searchbox">
        <div class="left-box level">
          <div class="level input-box flex-align-center">
            <div class="input-name">文件名:</div>
            <el-input v-model="listQuery.fileName" placeholder="请输入内容" class="input-top" size="small" clearable />
          </div>
          <div class="level input-box flex-align-center">
            <div class="input-name">导入时间:</div>
            <el-date-picker
              v-model="time"
              size="small"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="changeTime"
            />
          </div>
        </div>
        <div class="right-box level">
          <el-button plain size="mini" class="top-btn" @click="reset"> 重置 </el-button>
          <el-button size="mini" type="primary" style="color: #ffffff" class="top-btn" @click="getList">
            查询
          </el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="tablebox">
        <el-table
          ref="table"
          style="width: 100%"
          :data="tableData"
          :header-cell-style="{
            background: '#FAFAFA',
            color: '#000000',
            'font-family': 'Source Han Sans CN',
            'font-size': '14px'
          }"
          height="100%"
          highlight-current-row
        >
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column prop="importFileName" label="文件名" />
          <el-table-column prop="importTypeName" label="类型" />
          <el-table-column prop="successNumber" label="成功数量" />
          <el-table-column prop="failNumber" label="失败数量" />
          <el-table-column prop="importTime" label="导入时间" />
          <el-table-column label="操 作" width="230" fixed="right" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <div class="level buttons" style="padding: 0 5px">
                <el-button size="small" class="top-btn downLoadBtn" :disabled="!row.logUrl" @click="downloadFile(row)">
                  下载附件
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination3
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.current"
        :limit.sync="listQuery.size"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import { saveAs } from 'file-saver'
import Pagination3 from '@/components/Pagination3'
import { getHistoryDataList, downLoadFile } from '@/api/base'
export default {
  components: { Pagination3 },
  props: {
    btnList: {
      type: Object,
      default() {
        // 接口 路由 标题
        return {}
      }
    }
  },
  data() {
    return {
      listQuery: {
        fileName: '',
        startTime: '',
        endTime: '',
        current: 1,
        size: 20,
        importType: ''
      },
      time: '',
      total: 3,
      currentpageSizeNum: 10,
      tableData: [],
      currentTime: '',
      code: ''
    }
  },
  created() {
    if (this.$route.query) {
      this.listQuery.importType = this.$route.query.importType
      this.code = this.$route.query.code
    }
    const val = this.$route.params.currentPage || 20
    const currentNow = this.$route.params.nowPage || 1
    console.log(val, currentNow, 'val--currentNow')
    this.currentpageSizeNum = val
    if (!val) {
      this.getList()
    } else {
      this.listQuery.size = val * 1
      this.listQuery.current = currentNow
      this.getList()
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    reset() {
      this.listQuery = {
        fileName: '',
        startTime: '',
        endTime: '',
        current: 1,
        size: 20,
        importType: this.$route.query.importType
      }
      this.time = ''
      this.getList()
    },
    // 获取当前的时间
    getCurrentTime() {
      const now = new Date()
      const Y = now.getFullYear()
      const M = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
      const D = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
      this.currentTime = Y + M + D
    },
    changeTime(val) {
      this.listQuery.startTime = val[0]
      this.listQuery.endTime = val[1]
    },
    // 获取历史数据列表
    getList() {
      const { historyApi } = this.$route.query
      let fn
      if (historyApi) {
        fn = historyApi
      } else {
        fn = getHistoryDataList
      }
      fn(this.listQuery).then(res => {
        this.tableData = res.data.data.records
        this.total = res.data.data.total
      })
    },
    // 下载附件
    downloadFile(row) {
      this.getCurrentTime()
      const params = {
        id: row.id
      }
      const { isLocal = false, code } = this.$route.query
      if (isLocal) {
        const { logUrl } = row
        if (!logUrl) return
        saveAs(window.origin + '/' + logUrl, code + '下载.xlsx')
        return
      }
      downLoadFile(params).then(res => {
        // const name = this.code + '日志导入' + this.currentTime
        // const fileName = name + '.' + res.filename.split('.')[1]
        const fileName = res.filename.match(/filename?="((.+)\.(.+))";/)[1]
        const fileNameCN = decodeURI(fileName) // 中文解码
        saveAs(res, fileNameCN)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bg-box {
  .backbox {
    height: 72px;
    border-bottom: 1px solid rgba(217, 217, 217, 0.7019607843137254);
    padding: 24px;
    .el-button {
      font-size: 14px;
      margin: 0 14px 0 0;
      padding: 8px 17px;
      cursor: pointer;
    }
  }
  .downLoadBtn {
    border: none;
    color: #1890ff;
  }
}
</style>
