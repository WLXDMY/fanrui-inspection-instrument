<!--
 * @Author: zhaozhuo
 * @Date: 2022-09-23 09:41:00
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-10-24 15:15:27
 * @Description: ...
-->
<template>
  <div>
    <div class="base-info">
      <NewTemplate
        v-if="detectionInfo.status !== 1 || detail"
        ref="newTemplate"
        :sample-template="sampleTemplate"
        :detail="detail"
        :state="detectionInfo.status || 0"
        :quality-inspection-data="qualityInspectionData"
        :review-result="detectionInfo.reviewResultName"
        @updatePage="getSampleOrder"
      />
      <!-- 复核结果 -->
      <!-- <section v-if="detail">
        <p class="check-title">复核结果</p>
        <div class="info-box">
          <div class="info-form">
            <div class="info-item">
              <div class="infoname">复核状态：</div>
              <div class="infotext">
                {{ detectionInfo.reviewResultName || '--' }}
              </div>
            </div>
            <div class="info-item">
              <div class="infoname">复核人：</div>
              <div class="infotext">
                {{ detectionInfo.reviewByName || '--' }}
              </div>
            </div>
            <div class="info-item">
              <div class="infoname">复核备注：</div>
              <div class="infotext">
                {{ detectionInfo.reviewRemark || '--' }}
              </div>
            </div>
            <div class="info-item">
              <div class="infoname">复核时间：</div>
              <div class="infotext">
                {{ detectionInfo.reviewTime || '--' }}
              </div>
            </div>
          </div>

          <el-table
            :data="detectionInfo.reviews"
            border
            :header-cell-style="headerCellStyle"
          >
            <el-table-column label="序号">
              <template slot-scope="{ $index }"> {{ $index + 1 }}</template>
            </el-table-column>
            <el-table-column label="附件名称" prop="name" />

            <el-table-column label="上传时间" prop="createTime" />
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <div class="view" @click="viewFile(row)">查看</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section> -->
      <Attachment ref="attachment" />
    </div>
  </div>
</template>

<script>
import {
  getSchemeGetFiles,
  getInspectsheetsGetPictures,
  getSampleOrder
} from '@/api/quality-manage'

import Attachment from './attachment.vue'
import NewTemplate from './newTemplate.vue'
import { TABLE_CONFIG } from './addConstant.js'

export default {
  components: {
    Attachment,
    NewTemplate
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    },
    checkInfo: {
      type: Array,
      default: () => []
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      materialDialogVisible: false,
      detectionInfo: {},
      tableConfig: TABLE_CONFIG,
      headerCellStyle: {
        background: '#F2F5FC',
        color: '#181d1f',
        height: '46px',
        'font-family': 'Source Han Sans CN',
        'font-size': '13px',
        'font-weight': '550'
      },
      viewImgUrl: '',
      isShow: true,
      addTableData: [],
      id: '',
      sampleTemplate: []
    }
  },
  watch: {
    data: {
      handler(nVal) {
        this.detectionInfo = nVal
        // console.log('查询状态 ------> ', nVal)
        this.qualityInspectionData = nVal.qualityInspectionSchemeFilesEntities
      },
      deep: true,
      immediate: true
    },
    checkInfo: {
      handler(nVal) {
        // console.log('数据是多少 -------》', nVal)
        this.addTableData = nVal.map(item => ({
          ...item.inspectionItemEntity
        }))
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getSampleOrder()
  },
  methods: {
    async getSampleOrder() {
      try {
        const {
          data: { code, data }
        } = await getSampleOrder(this.id)
        if (code === '200') {
          this.sampleTemplate = data ?? []
        }
      } catch (err) {
        console.log('详情接口请求失败，原因是 ----> ', err)
      }
    },
    notify(type = 'error', message = 'error', title = '提示', duration = 2000) {
      this.$notify({ title, message, type, duration })
    },

    previewImg() {
      this.$refs.attachment.show({
        dialogTitle: '检验标准附件',
        getFileApi: () => {
          return getInspectsheetsGetPictures(
            this.detectionInfo.inspectionSheetId
          )
        },
        handleRes: data => {
          return data.map(item => ({
            ...item,
            fileName: item.name,
            createUserName: item.createBy,
            createTime: item.createTime
          }))
        }
      })
    },
    previewPDF() {
      this.$refs.attachment.show({
        dialogTitle: '检验结果附件',
        getFileApi: () => {
          return getSchemeGetFiles({
            schemeId: this.detectionInfo.qualityInspectionSchemeId
          })
        },
        handleRes: data => {
          return data.map(item => ({
            ...item,
            fileName: item.fileName,
            createUserName: item.createBy,
            createTime: item.createTime
          }))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.base-info {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  // padding: 24px 24px 16px 24px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    font-size: 20px;
  }
  .info-box {
    .info-form {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .info-item {
        width: 25%;
        display: flex;
        line-height: 24px;
        font-size: 14px;
        padding-bottom: 14px;
        font-weight: 400;

        .infoname {
          display: flex;
          justify-content: flex-end;
          width: 126px;
          padding-right: 10px;
        }
      }
    }
    .info-view {
      padding-bottom: 14px;
      margin-left: 47px;
    }
  }
  .view {
    color: aqua;
    cursor: pointer;
  }
}
// 新版样式
.new-content {
  .detection-plan {
    border: 1px solid #e6ebf0;
    margin-bottom: 12px;
    .content-title {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      padding: 12px;
      margin-bottom: 20px;
      background: #fafafa;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #303030;
      border-bottom: 1px solid #e6ebf0;
      img {
        margin-right: 18px;
      }
    }
  }
  .detection-files {
    border: 1px solid #e6ebf0;
    margin-bottom: 12px;
    .item {
      border-bottom: 1px solid #e6ebf0;
      .title {
        padding: 0;
        margin: 0;
        padding: 8px;
        font-size: 16px;

        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #303030;
      }
    }
  }
  .check-title {
    margin-left: 12px;
  }
  .view {
    color: #1890ff;
    cursor: pointer;
  }
}
::v-deep .el-form-item__label {
  text-align: left;
}
</style>
