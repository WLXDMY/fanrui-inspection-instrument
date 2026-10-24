<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-05-31 11:52:48
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-07-24 20:07:41
 * @FilePath: \ams\src\views\procurement-management\materials-list\materialCheckAddComponents\attachmentList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <section v-if="!noSelectRow" class="attachment-item">
      <section class="centerArea">
        <div>
          附件列表
          <el-button type="text" @click="changeRow('first')">首行</el-button>
          <el-button type="text" @click="changeRow('previous')">上一行</el-button>
          <el-button type="text" @click="changeRow('next')">下一行</el-button>
          <el-button type="text" @click="changeRow('last')">末行</el-button>
        </div>
        <header>
          <el-upload action="" :http-request="params => handleUpload(params)" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType"> 点击上传 </el-button>
          </el-upload>
        </header>
        <el-table
          v-loading="loading"
          :data="currentRow.inspectFiles"
          style="width: 100%; margin-top: 15px"
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
          <el-table-column prop="fileName" label="附件名称" />
          <el-table-column prop="fileType" label="附件类型">
            <template slot-scope="{ row }">
              <el-select v-model="row.fileType" filterable disabled>
                <el-option
                  v-for="(item, index) in attachments"
                  :key="index"
                  :label="item.type"
                  :value="item.fileType"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
            <template slot-scope="{ row }">
              <el-input v-model="row.remark" />
            </template>
          </el-table-column>
          <el-table-column prop="compactor" label="编制人">
            <template slot-scope="{ row }">
              <el-select v-model="row.compactor" clearable filterable>
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
            <template slot-scope="{ row, $index }">
              <el-button :disabled="!enableView(row)" type="text" @click="view(row)">查看</el-button>
              <el-button type="text" @click="download(row)">下载</el-button>
              <el-button class="deleteBtn" type="text" :disabled="isDetailType" @click="deleteAttach(row, $index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <ViewImagesDialog v-if="visible" :visible="visible" :image-list="imageList" @closeDailog="closeDailog" />
  </div>
</template>

<script>
import { enableduser } from '@/api/common'
import { uploadFile, deleteInspectFile } from '@/api/quality-manage.js'
export default {
  components: {
    ViewImagesDialog: () => import('@/components/ViewImagesDialog')
  },
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
      attachments: [
        {
          type: '物料附件',
          fileType: 'materialFile'
        },
        {
          type: '检验附件',
          fileType: 'checkFile'
        },
        {
          type: '复核附件',
          fileType: 'reviewFile'
        },
        {
          type: '核准附件',
          fileType: 'authorizeFile'
        }
      ],
      loading: false,
      fileUrl: [],
      userOptions: [],
      visible: false,
      imageList: []
    }
  },
  computed: {
    noSelectRow() {
      return this.clickIndex === -1
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    }
  },
  watch: {},
  created() {
    this.getBuilderInfo()
  },
  mounted() {
    this.$eventBus.$on('addFile', ({ data, fileType }) => {
      this.addFile(data, fileType)
    })
  },
  beforeDestroy() {
    this.$eventBus.$off('addFile')
  },
  methods: {
    // 切换行
    changeRow(flag) {
      this.$emit('changeRow', flag)
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
    enableView(row) {
      return /\.(jpg|jpeg|png|gif|bmp|svg|mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(row.fileUrl)
    },
    view(row) {
      // console.log(row, 'row')
      const { fileUrl } = row
      // 如果是图片
      if (/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(fileUrl)) {
        this.imageList = [location.origin + '/' + fileUrl]
        this.visible = true
        // 视频 或者pdf
      } else if (/\.(mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(fileUrl)) {
        window.open(location.origin + '/' + fileUrl, '_blank')
      }
    },
    closeDailog() {
      this.visible = false
      this.imageList = []
    },
    download(row) {
      this.downloadFile(row.fileUrl, row.fileName)
    },
    downloadFile(fileUrl, fileName) {
      if (!fileUrl) return
      const suffix = fileUrl.replace(/.+\.(.+)/, (m, v1) => v1)
      const link = document.createElement('a') // 创建a标签
      link.style.display = 'none' // 使其隐藏
      link.href = '/' + fileUrl // 赋予文件下载地址
      link.setAttribute('download', `${fileName}.${suffix}`) // 设置下载属性 以及文件名
      document.body.appendChild(link) // a标签插至页面中
      link.click() // 强制触发a标签事件
      document.body.removeChild(link)
    },
    deleteAttach(row, index) {
      // 存在Id
      if (!isNaN(row.id)) {
        this.$confirm('删除附件? ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteInspectFile([row.id]).then(_ => {
            this.$message.success('删除成功')
            this.currentRow.inspectFiles.splice(index, 1)
          })
        })
      } else {
        this.currentRow.inspectFiles.splice(index, 1)
      }
    },
    // 上传文件
    async handleUpload(params) {
      this.loading = true
      const formData = new FormData()
      formData.append('file', params.file)
      const {
        data: { data }
      } = await uploadFile(formData)
      this.addFile(data)
    },
    addFile(data, fileType = 'materialFile') {
      const { name, fullPath, createUserName, createBy, createTime } = data
      console.log('🚀 ~ handleUpload ~ data:', data)
      try {
        this.currentRow.inspectFiles.push({
          fileName: name,
          fileUrl: fullPath,
          compactor: JSON.parse(sessionStorage.getItem('userInfo'))?.username || '',
          remark: '',
          createByName: createUserName,
          createBy,
          createTime,
          fileType
        })
        this.loading = false
      } catch (error) {
        console.log('🚀 ~ handleUpload ~ error:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.attachment-item {
  .centerArea {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    margin-bottom: 10px;
  }
  header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
