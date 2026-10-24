<template>
  <el-dialog
    v-bind="$attrs"
    width="70%"
    :visible.sync="visible"
    class="common-select-dialog"
    v-on="$listeners"
  >
    <div>
      <section class="attachment-item">
        <header>
          <!-- <span>检验附件</span> -->
          <el-upload
            v-permission="{ action: 'production.workorder.appendix:import' }"
            action=""
            :http-request="(params)=>handleUpload(params,tableConfig)"
            :show-file-list="false"
          >
            <el-button v-show="pageType !== 'detail'" size="small" type="primary">
              点击上传
            </el-button>
          </el-upload>
        </header>
        <el-table
          v-loading="tableConfig.loading"
          :data="tableConfig.data"
          style="width: 100%;margin-top:15px"
          border
          highlight-current-row
          :header-cell-style="{
            background: '#F8F8F8',
            color: '#181D1F',
            height: '42px',
            'font-family': 'Source Han Sans CN',
            'font-size': '13px',
            'font-weight': '550'
          }"
          :header-row-style="{
            height: '42px'
          }"
          :row-style="{ height: '38px' }"
        >
          <el-table-column type="index" label="序号" width="120" />
          <el-table-column prop="name" label="附件名称" />
          <el-table-column prop="remark" label="备注">
            <template slot-scope="{ row }">
              <el-input v-model="row.remark" :disabled="pageType==='detail'" />
            </template>
          </el-table-column>
          <el-table-column prop="compactor" label="编制人">
            <template slot-scope="{ row }">
              <el-select
                v-model="row.compactor"
                :disabled="pageType==='detail'"
                clearable
                filterable
              >
                <el-option
                  v-for="(item, index) in userOptions"
                  :key="index"
                  :label="item.nickname"
                  :value="item.username"
                />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="createByName" label="上传人" />
          <el-table-column prop="createTime" label="上传时间" />
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-button :disabled="!enableView(row)" type="text" @click="view(row)">查看</el-button>
              <el-button type="text" @click="download(row)">下载</el-button>
              <el-button v-show="pageType!=='detail'" type="text" class="delete-button" @click="deleteAttach(tableConfig,$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <ViewImagesDialog
        v-if="ViewImagesDialog.visible"
        :visible="ViewImagesDialog.visible"
        :image-list="ViewImagesDialog.imageList"
        :append-to-body="true"
        @closeDailog="closeDailogViewImagesDialog"
      />
    </div>
    <template #footer>
      <div class="bnts">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="confirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { uploadFile, enableduser } from '@/api/common'
const BASE = process.env.VUE_APP_BASE_API || ''
export default {
  components: {
    ViewImagesDialog: () => import('@/components/ViewImagesDialog')
  },
  props: {
    pageType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      ViewImagesDialog: {
        visible: false,
        imageList: []
      },
      tableConfig: {
        loading: false,
        data: []
      },
      userOptions: []
    }
  },
  mounted() {
    this.getBuilderInfo()
  },
  methods: {
    open(row) {
      this.visible = true
      //   console.log(row)
      this.tableConfig.data = this.$_.cloneDeep(row.recordPictures)
    },
    cancel() {
      this.$emit('cancel')
      this.visible = false
    },
    confirm() {
    //   console.log(this.tableConfig.data)
      const newValue = this.tableConfig.data
      this.$emit('confirm', newValue)
      this.visible = false
    },
    async getBuilderInfo() {
      const result = await enableduser()
      const { code, data, message } = result.data
      if (code === '200') {
        this.userOptions = data?.records || []
      } else {
        this.$notify({
          title: '提示',
          message: message || '获取用户列表信息失败',
          type: 'error',
          duration: 2000
        })
      }
    },
    closeDailogViewImagesDialog() {
      this.ViewImagesDialog.visible = false
      this.ViewImagesDialog.imageList = []
    },
    view(row) {
      // console.log(row, 'row')
      const { url } = row
      // 如果是图片
      if (/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(url)) {
        this.ViewImagesDialog.imageList = [BASE + '/' + url]
        this.ViewImagesDialog.visible = true
        // 视频 或者pdf
      } else if (/\.(mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(url)) {
        window.open(BASE + '/' + url, '_blank')
      }
    },
    enableView(row) {
      return /\.(jpg|jpeg|png|gif|bmp|svg|mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(row.url)
    },
    download(row) {
      this.downloadFile(row.url, row.name)
    },
    deleteAttach(item, index) {
      item.data.splice(index, 1)
    },
    // 上传文件
    async handleUpload(params, item) {
      item.loading = true
      const formData = new FormData()
      formData.append('file', params.file)
      const { data: { code, data, message }} = await uploadFile(formData)
      if (code === '200') {
        const { fileName, url, createUserName, createBy, createTime } = data

        item.data.push({
          name: fileName,
          url,
          compactor: JSON.parse(sessionStorage.getItem('userInfo'))?.username || '',
          remark: '',
          createByName: createUserName,
          createBy,
          createTime

        })
      } else {
        this.$notify({
          title: '提示',
          message: message,
          type: 'error',
          duration: 2000
        })
      }
      item.loading = false
    },
    downloadFile(url, name) {
      // console.log(name, 'name')
      if (!url) return
      const link = document.createElement('a') // 创建a标签
      link.style.display = 'none' // 使其隐藏
      link.href = BASE + '/' + url // 赋予文件下载地址
      link.setAttribute('download', name) // 设置下载属性 以及文件名
      document.body.appendChild(link) // a标签插至页面中
      link.click() // 强制触发a标签事件
      document.body.removeChild(link)
    }
  }

}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  margin: 40px auto;
  height: 700px;
}
/deep/ .el-dialog__body {
  height: calc(100% - 54px);
  padding-bottom: 60px;
}

/deep/ .el-dialog__header .el-dialog__headerbtn {
  display: none;
}
/deep/ .el-dialog__footer {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
}
.reset {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  cursor: pointer;
}
.pagination-container {
  bottom: 60px;
}
.bnts {
  padding-bottom: 16px;
}

.attachment-item {
    header{
        display: flex;
        justify-content: space-between;
    }
}
.delete-button {
  ::v-deep span {
    color:red !important;
    // font-size: 16px;
  }
}
</style>
