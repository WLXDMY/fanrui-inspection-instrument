<!--
 * @Author: shunhua.liang
 * @Date: 2022-03-28 11:21:16
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-20 10:36:11
 * @Description: 附件列表
-->

<template>
  <div class="base-info">
    <div v-if="isShowTitle" class="title">
      <div class="text">附件列表</div>
      <div class="open-img" @click="isOpenBaseInfo = !isOpenBaseInfo">
        <img
          src="@/assets/images/home/xiala@2x.png"
          alt=""
          width="11"
          height="12"
        >
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="isOpenBaseInfo">
        <section v-if="type !== 'detail'" class="upload-file">
          <el-upload
            v-permission="{ action: 'production.workorder.appendix:import' }"
            action=""
            :http-request="handleUpload"
            :limit="1"
            :before-upload="handleBulkImportChange"
            :file-list="fileUrl"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">
              点击上传
            </el-button> </el-upload><label class="tips">请上传pdf,MP4格式文件</label>
        </section>
        <el-table :data="tableData" style="width: 100%" border highlight-current-row>
          <el-table-column prop="date" label="序号" width="120">
            <template slot-scope="scope">
              <span v-text="serialNumber(scope.$index)" />
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="附件名称" />
          <el-table-column prop="createUserName" label="上传人" />
          <el-table-column prop="createTime" label="上传时间" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <section class="action">
                <div class="edit-text" @click="view(scope.row)">查看</div>
                <div
                  v-if="type !== 'detail'"
                  v-permission="{
                    action: 'production.workorder.appendix:delete',
                  }"
                  class="delete-text"
                  @click="delFile(scope.row, scope.$index)"
                >
                  删除
                </div>
              </section>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  props: {
    suppliesFileQuery: {
      type: Object,
      require: true,
      default: () => {}
    },
    isShowTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpenBaseInfo: true,
      tableData: [],
      fileUrl: [],
      type: ''
    }
  },
  watch: {
    suppliesFileQuery: {
      handler(newVal) {
        const { action } = newVal || {}
        this.type = action
        if (action === 'insert') {
          this.insertGetList()
        } else {
          this.getAllFile()
        }
      },
      deep: true,
      immediate: true
    }
  },
  beforeDestroy() {
    localStorage.removeItem('attachmentSuppliesList')
  },
  created() {
    this.insertGetList()
  },
  methods: {
    // 新增获取
    insertGetList() {
      if (this.type === 'insert') {
        this.tableData =
          JSON.parse(localStorage.getItem('attachmentSuppliesList')) || []
      }
    },
    // 查看
    view(value) {
      // 新打开浏览器查看
      const newWin = window.open(`/factory/v1/${value.filePath}`, '_blank')
      newWin.opener = null
    },
    // 序号
    serialNumber(row) {
      return +row + 1
    },
    // 新增的时候添加
    handleUpload(params) {
      const handleUploadFn = this.suppliesFileQuery.handleUploadFn
      handleUploadFn(params).then((res) => {
        const { code, message, data } = res.data || {}
        if (+code === 200) {
          const handleUploadResFn = this.suppliesFileQuery.handleUploadResFn
          const template = handleUploadResFn(data)
          this.tableData.push(template)
          localStorage.setItem(
            'attachmentSuppliesList',
            JSON.stringify(this.tableData)
          )
        } else {
          this.$notify({
            title: '提示',
            message: message,
            type: 'error',
            duration: 2000
          })
        }
        this.fileUrl = []
      })
    },
    // 获取列表
    getAllFile() {
      if (this.type === 'insert') {
        return
      }
      // 从外部获取 PDF列表
      if (this.suppliesFileQuery.appendixEntities) {
        this.tableData = this.suppliesFileQuery.appendixEntities
        return
      }
    },
    // 删除
    delFile(value, index) {
      if (this.type === 'insert' || value.isFlag) {
        this.tableData.splice(index, 1)
        return
      }
      const handleDelFileFn = this.suppliesFileQuery.handleDelFileFn
      handleDelFileFn(value).then((res) => {
        const { code, message, data } = res.data || {}
        if (+code === 200) {
          this.$notify({
            title: '提示',
            message: message || '删除成功',
            type: 'success',
            duration: 2000
          })
          this.tableData.splice(index, 1)
        } else {
          this.$notify({
            title: '提示',
            message: message || '删除失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 文件前端格式校验
    handleBulkImportChange(file) {
      // pdf,MP4,MOV,AVI,WMV,3GP,RMVB  大小限制在300GB
      const isSizeAllow = file.size / 1024 / 1024 < 50
      // 大小校验
      if (!isSizeAllow) {
        this.$message({
          message: '文件大小不能超过50MB',
          type: 'warning'
        })
        return false
      }
      //  校验格式
      if (!/^.+\.(pdf|mp4)$/i.test(file.name)) {
        this.$message({
          message: '请上传pdf,MP4格式文件',
          type: 'warning'
        })
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-info {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  padding: 24px 24px 16px 24px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  padding-bottom: 20px;
  ::v-deep .el-table--border {
    border-bottom: 1px solid #dfe6ec;
  }
  .title {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
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
  .delete-text {
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ff4949;
    opacity: 1;
    padding: 0 3px;
    border-radius: 4px;
    cursor: pointer;
  }
  .upload-file {
    margin: 20px 0;
    display: flex;
    .tips {
      display: inline-block;
      font-size: 12px;
      padding: 10px;
      letter-spacing: 1px;
      font-family: Source Han Sans CN;
    }
  }
}
</style>
