<!--
 * @Author: shunhua.liang
 * @Date: 2022-03-28 11:21:16
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-09-30 10:07:19
 * @Description: 附件列表
-->

<template>
  <el-dialog
    :title="fileParams.dialogTitle"
    :visible.sync="dialogTableVisible"
    width="600px"
    class="attachment-dialog"
    :before-close="beforeClose"
  >
    <div class="base-info">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{
          background: '#F2F5FC',
          color: '#181d1f',
          height: '46px',
          'font-family': 'Source Han Sans CN',
          'font-size': '13px',
          'font-weight': '550'
        }"
        border
        highlight-current-row
      >
        <el-table-column prop="date" label="序号" width="55">
          <template slot-scope="scope">
            <span v-text="serialNumber(scope.$index)" />
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="附件名称" />
        <el-table-column prop="createUserName" label="上传人" />
        <el-table-column prop="createTime" label="上传时间" width="160" />
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <section class="action">
              <div class="edit-text" @click="view(scope.row)">查看</div>
            </section>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      fileParams: {},
      tableData: []
    }
  },
  methods: {
    // 序号
    serialNumber(row) {
      return +row + 1
    },
    // 查看
    view(value) {
      const newWin = window.open(`/factory/v1/${value.url}`, '_blank')
      newWin.opener = null
    },
    // 获取列表
    getAllFile() {
      const { getFileApi, handleRes } = this.fileParams
      getFileApi().then(res => {
        if (res.data.code === '200') {
          this.tableData = handleRes(res.data?.data || [])
        }
      })
    },
    show(fileParams) {
      this.fileParams = fileParams
      this.dialogTableVisible = true
      this.getAllFile()
    },
    // 关闭
    beforeClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" >
.attachment-dialog {
  .base-info {
    padding: 0 !important;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    padding-bottom: 20px;
    ::v-deep .el-table--border {
      border-bottom: 1px solid #dfe6ec;
    }
    .action {
      display: flex;
    }
    .edit-text {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #1890ff;
      opacity: 1;
      padding: 0 3px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
