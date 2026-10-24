<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-05-31 11:52:48
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-09 12:07:38
 * @FilePath: \ams\src\views\procurement-management\materials-list\materialCheckAddComponents\attachmentList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <section v-for="item in attachments" :key="item.type" class="attachment-item">
      <header>
        <span>
          {{ item.name }}
        </span>
        <el-upload
          v-permission="{ action: 'production.workorder.appendix:import' }"
          action=""
          :http-request="(params)=>handleUpload(params,item)"
          :show-file-list="false"
        >
          <el-button v-show="pageType !== 'detail'" size="small" type="primary">
            点击上传
          </el-button>
        </el-upload>
      </header>
      <el-table
        v-loading="item.loading"
        :data="item.tableData"
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
            <el-button v-show="pageType!=='detail'" type="text" class="delete-button" @click="deleteAttach(item,$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <ViewImagesDialog v-if="visible" :visible="visible" :image-list="imageList" @closeDailog="closeDailog" />

  </div>
</template>

<script>
import { uploadFile, enableduser } from '@/api/common'
export default {
  components: {
    ViewImagesDialog: () => import('@/components/ViewImagesDialog')
  },
  props: {
    pageType: {
      type: String,
      default: ''
    },
    attachmentData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      attachments: [{
        type: '检验标准附件',
        typeCode: 6,
        name: '检验标准附件',
        tableData: [],
        loading: false
      }, {
        type: '检验结果附件',
        typeCode: 5,
        name: '检验结果附件',
        tableData: [],
        loading: false
      }, {
        type: '检验不良附件',
        typeCode: 4,
        name: '检验不良附件',
        tableData: [],
        loading: false
      }],
      fileUrl: [],
      userOptions: [],
      visible: false,
      imageList: []
    }
  },
  watch: {
    attachmentData: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (this.pageType !== 'add') {
          // this.attachments = JSON.parse(JSON.stringify(newValue))
          // console.log('Picture -> ', newValue)
          this.attachments.forEach(item => { item.tableData = [] })
          newValue?.forEach(el => {
            const orginData = this.attachments.find(i => i.typeCode === el.typeCode)
            // 重复不要添加
            // if (!orginData?.tableData.find(i => i.id === el.id)) return
            orginData?.tableData.push(JSON.parse(JSON.stringify(el)))
          })
        }
      }
    }
  },
  created() {
    this.getBuilderInfo()
  },
  methods: {
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
      return /\.(jpg|jpeg|png|gif|bmp|svg|mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(row.url)
    },
    view(row) {
      // console.log(row, 'row')
      const { url } = row
      // 如果是图片
      if (/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(url)) {
        this.imageList = [location.origin + '/' + url]
        this.visible = true
        // 视频 或者pdf
      } else if (/\.(mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(url)) {
        window.open(location.origin + '/' + url, '_blank')
      }
    },
    closeDailog() {
      this.visible = false
      this.imageList = []
    },
    download(row) {
      this.downloadFile(row.url, row.name)
    },
    downloadFile(url, name) {
      // console.log(name, 'name')
      if (!url) return
      const link = document.createElement('a') // 创建a标签
      link.style.display = 'none' // 使其隐藏
      link.href = '/' + url // 赋予文件下载地址
      link.setAttribute('download', name) // 设置下载属性 以及文件名
      document.body.appendChild(link) // a标签插至页面中
      link.click() // 强制触发a标签事件
      document.body.removeChild(link)
    },
    deleteAttach(item, index) {
      item.tableData.splice(index, 1)
    },
    // 上传文件
    async handleUpload(params, item) {
      item.loading = true
      const formData = new FormData()
      formData.append('file', params.file)
      const { data: { code, data, message }} = await uploadFile(formData)
      if (code === '200') {
        const { fileName, url, createUserName, createBy, createTime } = data

        item.tableData.push({
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
