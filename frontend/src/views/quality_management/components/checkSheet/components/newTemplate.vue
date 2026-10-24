<template>
  <div class="container">
    <div class="add-style">
      <!-- <el-button v-if="!detail" type="primary" plain icon="el-icon-circle-plus-outline" size="small" @click="addSampleSimple">
        新增样次
      </el-button> -->
      <el-button
        v-if="!detail && state !== 3"
        size="small"
        type="primary"
        class="add-btn"
        @click="addSampleSimple"
      >
        新增样次
      </el-button>
    </div>
    <el-tabs v-model="activeTab" type="card">
      <!-- tab 标签页 -->
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index + item.tabName"
        :label="'样次' + (index + 1)"
        :name="item.tabName"
      >
        <!-- 表格 -->
        <el-table
          :data="item.dtos"
          :header-cell-style="headerCellStyle"
          :row-style="rowStyle"
          highlight-current-row
        >
          <template v-for="(citem, cindex) in tableConfig">
            <el-table-column :key="cindex" :width="citem.width">
              <!-- 表头 -->
              <template slot="header">
                {{ citem.label }}
              </template>
              <!-- 表内容 -->
              <template slot-scope="scope">
                <template v-if="citem.input">
                  <el-input
                    v-model="scope.row[citem.prop]"
                    :disabled="detail || isReview || state === 3"
                  />
                </template>
                <template v-else-if="citem.select">
                  <!-- <el-input v-model="scope.row[citem.prop]" /> -->
                  <div v-if="citem.prop === 'recheckResult'">
                    <el-select
                      v-model="scope.row[citem.prop]"
                      :disabled="detail || state !== 3"
                    >
                      <el-option
                        v-for="(titem, tindex) in typeList"
                        :key="tindex"
                        :label="titem.name"
                        :value="titem.name"
                      />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="scope.row[citem.prop]"
                      :disabled="detail || isReview || state === 3"
                    >
                      <el-option
                        v-for="(titem, tindex) in typeList"
                        :key="tindex"
                        :label="titem.name"
                        :value="titem.code"
                      />
                    </el-select>
                  </div>
                </template>
                <template v-else-if="citem.modelType === 'select'">
                  <!-- <el-input v-model="scope.row[citem.prop]" /> -->
                  <el-select
                    v-if="
                      scope.row.inputMode === 'multiple-select' ||
                        scope.row.inputMode === 'single-select'
                    "
                    v-model="scope.row[citem.prop]"
                    :disabled="detail || isReview || state === 3"
                    :multiple="scope.row.inputMode === 'multiple-select'"
                  >
                    <el-option
                      v-for="(sitem, sindex) in hdSelectValue(
                        scope.row.itemOptionalValue
                      )"
                      :key="sindex"
                      :label="sitem.label"
                      :value="sitem.value"
                    />
                  </el-select>

                  <el-input
                    v-else
                    v-model="scope.row[citem.prop]"
                    :disabled="detail || isReview || state === 3"
                  />
                </template>
                <template v-else-if="citem.imgs">
                  <div>
                    <ImagePreview :src="transFormSrc(scope.row[citem.prop])" :width="50" :height="50" :multiple="true" />
                  </div>
                </template>
                <template v-else>
                  {{ scope.row[citem.prop] }}
                </template>
              </template>
            </el-table-column>
          </template>
          <el-table-column v-if="!(detail || isReview || state === 3)" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleImageEdit(scope.row,index,scope.$index)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 检验标准部分 -->
        <section class="detection-files">
          <!-- <section class="item">
            <p class="title">检验标准附件</p>
            <el-table
              :data="qualityInspectionData"
              border
              :header-cell-style="resultHeaderCellStyle"
            >
              <el-table-column label="序号">
                <template slot-scope="{ $index }"> {{ $index + 1 }}</template>
              </el-table-column>
              <el-table-column label="附件名称">
                <template slot-scope="{ row }">
                  {{ row.fileName || row.name }}
                </template>
              </el-table-column>

              <el-table-column label="上传时间" prop="createTime" />
              <el-table-column label="操作">
                <template slot-scope="{ row, $index }">
                  <section class="operator-img">
                    <div class="view" @click="viewFile(row)">查看</div>
                    <div class="view" @click="downloadFile(row)">下载</div>
                    <div class="view" style="color: red" @click="deleteFile(qualityInspectionData, $index)">删除</div>
                  </section>
                </template>
              </el-table-column>
            </el-table>
          </section> -->
          <section class="item">
            <section class="attachment">
              <p class="title">检验结果附件</p>
              <el-upload
                v-if="!detail && state !== 3"
                class="upload-demo view"
                action=""
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :http-request="handleFileUpload('pictures', item)"
                :data="item"
                :show-file-list="false"
                multiple
                :file-list="fileList"
              >
                <el-button type="primary" size="small">上传附件</el-button>
              </el-upload>
            </section>
            <el-table
              :data="item.pictures"
              border
              :header-cell-style="resultHeaderCellStyle"
            >
              <el-table-column label="序号">
                <template slot-scope="{ $index }"> {{ $index + 1 }}</template>
              </el-table-column>
              <el-table-column label="附件名称">
                <template slot-scope="{ row }">
                  {{ row.name || row.fileName }}</template>
              </el-table-column>

              <el-table-column label="上传时间" prop="createTime" />
              <el-table-column label="操作">
                <template slot-scope="{ row, $index }">
                  <section class="operator-img">
                    <div class="view" @click="viewFile(row)">查看</div>
                    <div class="view" @click="downloadFile(row)">下载</div>
                    <div
                      v-if="!detail && state !== 3"
                      class="view"
                      style="color: red"
                      @click="deleteFile(item.pictures, $index)"
                    >
                      删除
                    </div>
                  </section>
                </template>
              </el-table-column>
            </el-table>
          </section>
          <section class="item">
            <!-- <p class="title">检验不良附件</p> -->
            <section class="attachment">
              <p class="title">检验不良附件</p>
              <el-upload
                v-if="!detail && state !== 3"
                class="upload-demo view"
                action=""
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :http-request="handleFileUpload('poorPictures', item)"
                :show-file-list="false"
                multiple
                :file-list="fileList"
              >
                <el-button type="primary" size="small">上传附件</el-button>
              </el-upload>
            </section>
            <el-table
              :data="item.poorPictures"
              border
              :header-cell-style="resultHeaderCellStyle"
            >
              <el-table-column label="序号">
                <template slot-scope="{ $index }"> {{ $index + 1 }}</template>
              </el-table-column>
              <el-table-column label="附件名称" prop="name" />

              <el-table-column label="上传时间" prop="createTime" />
              <el-table-column label="操作">
                <template slot-scope="{ row, $index }">
                  <section class="operator-img">
                    <div class="view" @click="viewFile(row)">查看</div>
                    <div class="view" @click="downloadFile(row)">下载</div>
                    <div
                      v-if="!detail && state !== 3"
                      class="view"
                      style="color: red"
                      @click="deleteFile(item.poorPictures, $index)"
                    >
                      删除
                    </div>
                  </section>
                </template>
              </el-table-column>
            </el-table>
          </section>
        </section>
        <section class="bad-description">
          <el-form ref="form" label-position="right" label-width="80px">
            <el-form-item
              style="width: 60%"
              class="finishedCode"
              label="成品码:"
            >
              <el-input
                v-model="item.finishedCode"
                :disabled="detail"
                placeholder="请输入"
              />
            </el-form-item>

            <!-- <div>{{ item.defectRecords  }}</div> -->
            <el-form-item style="width: 60%" label="不良项">
              <div style="display:flex">
                <el-select
                  v-model="item.defectRecords"
                  style="width:100%"
                  :disabled="true"
                  value-key="defectCode"
                  multiple
                  @change="hdBadScript($event, item)"
                >

                  <el-option
                    v-for="bad in badScriptList"
                    :key="bad.defectId"
                    :label="bad.defectName"
                    :value="bad"
                  />
                </el-select>
                <el-button
                  slot="prefix"
                  icon="el-icon-search"
                  :disabled="detail || isReview || state === 3"
                  @click="defectRecordsDialogOpen(index)"
                />
              </div>

            </el-form-item>

            <el-form-item style="width: 60%" label="不良原因:">
              <el-input
                v-model="item.adverseCase"
                disabled
                placeholder="请输入"
              />
            </el-form-item>

            <el-form-item style="width: 60%" label="纠正措施">
              <el-input
                v-model="item.correctiveMeasures"
                disabled
              />
            </el-form-item>

            <el-form-item style="width: 60%" label="严重等级:">
              <el-select
                v-model="item.severityLevel"
                style="width: 100%"
                :disabled="detail"
                placeholder="请选择"
              >
                <el-option
                  v-for="severItem in severityLevelOptions"
                  :key="severItem.code"
                  :label="severItem.name"
                  :value="severItem.name"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="备注" style="width: 60%">
              <el-input
                v-model="item.remark"
                type="textarea"
                :disabled="detail || isReview || state === 3"
              />
            </el-form-item>
          </el-form>
        </section>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :visible.sync="materialDialogVisible"
      width="50%"
      title="图片查看"
    >
      <section class="show-image">
        <img :src="viewImgUrl" alt="" width="100%">
      </section>
    </el-dialog>
    <!-- 检验附件图片编辑对话框 -->
    <ImageEditDialog
      ref="ImageEditDialog"
      page-type="edit"
      title="检验附件"
      @confirm="onConfirmImageEdit"
    />
    <!-- 不良项弹窗 -->
    <DefectRecordsDialog
      ref="DefectRecordsDialog"
      title="不良项选择"
      :show-selection="true"
      :visible="defectRecordsDialogVisible"
      :origin-all-data="badScriptList"
      @cancel="defectRecordsDialogVisible = false"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
// import DetectionInformation from './detectionInformation.vue'
import { TABLE_CONFIG } from './constant'
import { getimgurl } from '@/api/base'
import {
  addSampleOrder,
  sampleSave,
  getCheckStatus,
  getBadScriptList,
  severityLevel,
  getSampleOrder
} from '@/api/quality-manage'
import { download } from '@/api/fileTransfer'
const testImages = [
  {
    'id': 25,
    'inspectionSheetId': 48,
    'inspectionNumId': null,
    'name': 'v2-7a2c6ccaac9c1dc7177ef2379dff278f_r.jpg',
    'url': 'group1/M00/00/07/wKhnWmUTmm6AD4IOACYNYtftT7U077.jpg',
    'createBy': 'admin',
    'createByName': '管理员',
    'createTime': '2023-11-23 08:52:25',
    'type': '送检单标准附件',
    'remark': null,
    'compactor': 'admin',
    'compactorName': '管理员',
    'typeCode': 6,
    'inspectionNum': null
  },
  {
    'id': 27,
    'inspectionSheetId': 48,
    'inspectionNumId': null,
    'name': '微信图片_20231122135110.png',
    'url': 'group1/M00/00/1C/wKhnWmVdq4SAXU5sAAATD-P5q04062.png',
    'createBy': 'admin',
    'createByName': '管理员',
    'createTime': '2023-11-23 08:52:25',
    'type': '送检单标准附件',
    'remark': '',
    'compactor': 'admin',
    'compactorName': '管理员',
    'typeCode': 6,
    'inspectionNum': null
  }
]

export default {
  components: {
    ImagePreview: () => import('@/components/ImagePreview'),
    ImageEditDialog: () => import('./ImageEditDialog'),
    DefectRecordsDialog: () => import('./DefectRecordsDialog')
  },
  props: {
    sampleTemplate: {
      type: Array,
      default: () => []
    },
    detail: {
      type: Boolean,
      default: false
    },
    qualityInspectionData: {
      type: Array,
      default: () => []
    },
    reviewResult: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      activeTab: 'tab1',
      tabList: [],
      tableData: [],
      tableConfig: TABLE_CONFIG,
      headerCellStyle: {
        background: '#F3F3F3',
        color: 'rgba(0, 0, 0, 0.85)',
        height: '48px'
      },
      resultHeaderCellStyle: {
        background: '#F2F5FC',
        color: '#181d1f',
        height: '46px',
        'font-family': 'Source Han Sans CN',
        'font-size': '13px',
        'font-weight': '550'
      },
      rowStyle: { height: '48px' },
      form: {
        badDescription: '',
        correctiveAction: '',
        remark: ''
      },
      viewImgUrl: '',
      materialDialogVisible: false,
      fileList: [],
      id: '',
      typeList: [],
      badScriptList: [],
      severityLevelOptions: [], // 严重等级下拉项
      // 待编辑的tab和行索引
      toEditTabIndex: 0,
      toEditRowIndex: 0,
      // 不良项弹窗
      defectRecordsDialogVisible: false
    }
  },
  computed: {
    isReview() {
      return !!(this.reviewResult && typeof this.reviewResult === 'string')
    }
  },
  watch: {
    sampleTemplate: {
      handler(nVal) {
        console.log('样次模板 ----> ', nVal)
        nVal.forEach(item => {
          this.addStyle(JSON.parse(JSON.stringify(item)))
        })
      },
      deep: true,
      immediate: true
    },
    state: {
      handler(nVal) {
        // console.log('newTemplate state -> ', nVal)
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getCheckStatus()
    this.getBadScriptList(this.$route.query.id)
    this.getSeverityLevel()
  },
  methods: {
    async getSeverityLevel() {
      const {
        data: { code, data }
      } = await severityLevel()
      // console.log(code, data, '231232')

      if (code === '200') {
        this.severityLevelOptions = data
      }
    },
    hdSelectModel(val, isSingle) {
      if (isSingle === 'multiple-select') {
        return [val]
      }
      return val
    },
    hdSelectValue(str) {
      return str?.split(',').map(s => ({
        label: s,
        value: s
      }))
    },
    hdBadScript(val, item) {
      // console.log('val ', val, item)
      // item.defectRecords = val.map(id => ({ defectDefineId: id }))
      console.log(' item.defectRecords -> ', item.defectRecords)
    },
    getBadScriptList(id) {
      getBadScriptList(id).then(res => {
        this.badScriptList = res?.data?.data ?? []
      })
    },
    getCheckStatus() {
      getCheckStatus().then(res => {
        const {
          data: { code, data }
        } = res
        if (code === '200') {
          this.typeList = data
        }
      })
    },
    async addSampleSimple() {
      try {
        const {
          data: { code, data }
        } = await addSampleOrder(this.id)
        console.log('data 是 -> ', data)
        if (code === '200') {
          const result = {
            dtos: data,
            pictures: [],
            poorPictures: [],
            defectRecords: [],
            correctiveMeasures: '',
            remark: ''
          }
          this.addStyle(result)
        }
      } catch (err) {
        console.log('报错了 ->', err)
      }
    },
    handlePreview() {},
    handleRemove() {},
    // 选择文件
    handleFileUpload(key, object) {
      // console.log('list 是 ------》', object[key])
      return async val => {
        const fd = new FormData()
        fd.append('file', val.file)
        const res = await getimgurl(fd)
        const {
          data: { code, data, message }
        } = res
        if (+code !== 200) {
          this.notify('error', message || 'error', '错误')
          return
        }
        // 接口正常的情况下
        this.fileList.push(data)
        data.name = data.fileName
        if (Array.isArray(object[key])) {
          object[key].push(data)
          this.notify('success', '上传成功')
          return
        }
        object[key] = [data]
        this.notify('success', '上传成功')
      }
    },
    async getSampleOrder(id) {
      console.log('id 是 -> ', id)
      try {
        const {
          data: { code, data }
        } = await getSampleOrder(id)
        if (code === '200') {
          const val = data ?? []
          this.tabList = []
          val.forEach(item => {
            this.addStyle(item)
          })
        }
      } catch (err) {
        console.log('详情接口请求失败，原因是 ----> ', err)
      }
    },
    notify(type = 'error', message = 'error', title = '提示', duration = 2000) {
      this.$notify({ title, message, type, duration })
    },
    addStyle(data) {
      const tabName = 'tab' + (this.tabList.length + 1)
      data.tabName = tabName
      data.dtos?.forEach(d => {
        // const { inputMode, initValue,examineValue } = d
        // switch (inputMode) {
        //   case 'multiple-select':
        //     if (initValue) {
        //       d.examineValue = examineValue.split(',')
        //     } else {
        //       d.examineValue = []
        //     }

        //   case 'single-select':
        //     d.examineValue = examineValue ?? ''

        //   default:
        //     d.examineValue = examineValue ?? ''
        // }
        // if (!d.initValue) {
        //   d.setInput = true
        //   return
        // }
        if (!d.examineValue && d.initValue) {
          d.examineValue = d.initValue
          if (d?.inputMode === 'multiple-select') {
            d.examineValue = d?.examineValue?.split(',') ?? []
          }
          return
        }
        // console.log('d.examineValue -> ', d.examineValue, d)
        if (d?.inputMode === 'multiple-select') {
          d.examineValue = d.examineValue?.split(',') ?? []
        }
        // 测试检验附件图片
        // this.$set(d, 'recordPictures', testImages)
      })
      // console.log('第一个组装数据 -> ', data)
      this.tabList.push(data)
      this.activeTab = tabName
    },
    async save() {
      const data = JSON.parse(JSON.stringify(this.tabList))
      // 填不良描述
      data.forEach((item, idx) => {
        if (idx !== 0) {
          item.inspectionNumId || (item.inspectionNumId = null)
          item.inspectionSheetId = data[0].inspectionSheetId
        }
        item.pictures || (item.pictures = [])
        item.poorPictures || (item.poorPictures = [])

        // 将数组转换成字符串 e.g. ['a', 'b'] ---> 'a,b'
        item.dtos?.forEach(d => {
          if (Array.isArray(d.examineValue) && d.examineValue.length) {
            d.examineValue = d.examineValue.reduce((pre, cur) => pre + ',' + cur)
          }
          if (Array.isArray(d.examineValue) && !d.examineValue.length) {
            d.examineValue = null
          }
        })
      })

      await sampleSave(data)
      await this.getSampleOrder(this.$route.query.id)
    },
    deleteFile(item, index) {
      item.splice(index, 1)
    },
    downloadFile(row) {
      // console.log('下载数据 -----> ', row)
      const url = `${window.origin}/factory/v1/${row.url}`
      download(url).then(res => {
        const url = window.URL.createObjectURL(res)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', row.fileName)
        document.body.appendChild(link)
        link.click()
      })
    },
    viewFile(row) {
      const format = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'apng']
      const pdf = ['pdf']
      const { url } = row || {}
      const list = url.toLowerCase().split('.')
      const tem = list.filter(item => format.includes(item))
      const pdfTem = list.filter(item => pdf.includes(item))
      if (tem.length) {
        this.materialDialogVisible = true
        // this.viewImgUrl = window.location.origin + '/' + row.url
        // console.log('url -----> ', this.viewImgUrl)
        this.viewImgUrl = `${window.origin}/${row.url}`
        console.log(`${window.origin}/${row.url}`)
      }
      if (pdfTem.length) {
        const newWin = window.open(`/factory/v1/${row.url}`, '_blank')
        newWin.opener = null
      }
    },
    handleImageEdit(row, tabIndex, rowIndex) {
      // console.log(tabIndex, rowIndex)
      this.toEditTabIndex = tabIndex
      this.toEditRowIndex = rowIndex
      this.$refs['ImageEditDialog'].open(row)
    },
    transFormSrc(val) {
      const arr = val || []
      return arr.map(item => item.url).join(',')
    },
    onConfirmImageEdit(val) {
      // console.log(val)
      const editObj = this.$_.get(this.tabList[this.toEditTabIndex], `dtos.${this.toEditRowIndex}`)
      // console.log(editObj)
      if (editObj) {
        this.$set(editObj, 'recordPictures', val)
      }
      // this.
    },
    // 不良项弹窗
    defectRecordsDialogOpen(tabIndex) {
      this.defectRecordsDialogVisible = true
      const item = this.tabList[tabIndex]
      this.toEditTabIndex = tabIndex
      this.$nextTick(() => {
        this.$refs.DefectRecordsDialog.open(item.defectRecords)
      })
    },
    handleConfirm(multipleSelection) {
      this.$set(this.tabList[this.toEditTabIndex], 'defectRecords', multipleSelection || [])
      this.defectRecordsDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow-y: auto;
  position: relative;
  min-height: 100px;
  // margin-top: 42px;
  .add-style {
    // position: absolute;
    // top: 4px;
    // right: 0px;
    margin-bottom: 18px;
  }
  .check-title {
    margin-left: 12px;
  }
  .view {
    color: #1890ff;
    cursor: pointer;
  }
  .operator-img {
    display: flex;
    justify-content: space-evenly;
  }
  .bad-description {
    margin-top: 32px;
    .el-form {
      .bad-info {
        .el-col {
          .el-form-item {
            width: 100%;
            color: #1890ff;
            ::v-deep .el-form-item__content {
              width: 60%;
            }
          }
        }
      }
    }
  }
  .attachment {
    display: flex;
    align-items: center;
    width: 12%;
    justify-content: space-between;
  }
}
</style>
