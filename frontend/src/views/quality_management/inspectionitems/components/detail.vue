<!--
 * @Author: limengjuan
 * @Date: 2021-12-16 11:43:36
 * @LastEditors: huyoujuan
 * @LastEditTime: 2023-11-24 12:27:10
 * @Description:
-->
<template>
  <div class="detail-page-1-3">
    <div class="bg-content">
      <div class="operate">
        <el-button type="primary" size="small" @click="back"> 返回 </el-button>
        <el-button type="primary" size="small" @click="handleAllOpen">
          {{ titleWord }}
        </el-button>
      </div>
      <div class="container">
        <div class="base-info">
          <div class="title">
            <div class="text">基本信息</div>
            <div class="open-img" @click="isOpenBaseInfo = !isOpenBaseInfo">
              <img src="@/assets/images/home/xiala@2x.png" alt="" width="11" height="12" />
            </div>
          </div>
          <!-- 基本信息内容 -->
          <el-collapse-transition>
            <div v-show="isOpenBaseInfo" class="info-box">
              <div class="info-item">
                <div class="infoname">检验项目组:</div>
                <div class="infotext">
                  {{ baseInfoList.inspectionItemGroupName || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">检验项目:</div>
                <div class="infotext">
                  {{ baseInfoList.inspectionItemName || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">检验方法判定:</div>
                <div class="infotext">
                  {{ baseInfoList.determinationOfDetectionMethodName || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">检验仪器:</div>
                <div class="infotext">
                  {{ baseInfoList.verificationInstrument || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">检验标准:</div>
                <div class="infotext">
                  {{ baseInfoList.verificationBasis || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">检验方法:</div>
                <div class="infotext">
                  {{ baseInfoList.verificationMethod || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">单位:</div>
                <div class="infotext">
                  {{ baseInfoList.unit || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">上限值:</div>
                <div class="infotext">
                  {{ baseInfoList.upperLimitValue || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">比较符:</div>
                <div class="infotext">
                  {{ baseInfoList.comparatorName || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">标准值/边界值:</div>
                <div class="infotext">
                  {{ baseInfoList.referenceValue || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">下限值:</div>
                <div class="infotext">
                  {{ baseInfoList.downLimitValue || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">状态:</div>
                <div class="infotext">
                  {{ baseInfoList.stateName || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">是否生成检验报告:</div>
                <div class="infotext">
                  {{ baseInfoList.isExportName || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">备注:</div>
                <div class="infotext">
                  {{ baseInfoList.remark || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">输入方式:</div>
                <div class="infotext">
                  {{
                    baseInfoList.inputMode === 'single-select'
                      ? '下拉单选'
                      : baseInfoList.inputMode === 'multiple-select'
                      ? '下拉多选'
                      : '普通输入' || '--'
                  }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">可选值:</div>
                <div class="infotext">
                  <el-tooltip effect="dark" :content="baseInfoList.optionalValue || '--'" placement="top-start">
                    <span>{{ baseInfoList.optionalValue || '--' }}</span>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <!-- 审批人详情 -->
        <div v-show="isExistApproveBtn" class="base-info">
          <div class="title">
            <div class="text">审批详情</div>
            <div class="open-img" @click="isOpenApprovalInfo = !isOpenApprovalInfo">
              <img src="@/assets/images/home/xiala@2x.png" alt="" width="11" height="12" />
            </div>
          </div>
          <el-collapse-transition>
            <div v-show="isOpenApprovalInfo">
              <div class="info-box">
                <div class="info-item">
                  <div class="infoname">审批状态:</div>
                  <div class="infotext">
                    {{ baseInfoList.approvalStatusName || '--' }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="infoname">审批意见:</div>
                  <div class="infotext">
                    {{ baseInfoList.approvalSuggestion || '--' }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="infoname">审批人:</div>
                  <div class="infotext">
                    {{ baseInfoList.approverName || '--' }}
                  </div>
                </div>
                <div class="info-item">
                  <div class="infoname">实际审批人:</div>
                  <div class="infotext">
                    {{ baseInfoList.actualApproverName || '--' }}
                  </div>
                </div>
                <div v-if="isShowApproveSignature" class="info-item">
                  <div class="infoname">审批人签名:</div>
                  <div class="infotext">
                    <el-image
                      style="width: 100px"
                      :src="`${window.origin}/${formInline.actualApproverSignatureUrl}`"
                      :preview-src-list="[`${window.origin}/${formInline.actualApproverSignatureUrl}`]"
                    />
                  </div>
                </div>
                <div class="info-item">
                  <div class="infoname">实际审批时间:</div>
                  <div class="infotext">
                    {{ baseInfoList.approvalTime || '--' }}
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProjectDetail } from '@/api/quality-manage.js'
import { isExistApprove } from '@/api/examineApprove.js'
import { getApproveSignatureConfigByCode } from '@/api/common'
export default {
  data() {
    return {
      window,
      isExistApproveBtn: false,
      isOpenBaseInfo: true, // 全部收起/放下
      titleWord: '全部收起',
      isOpenApprovalInfo: true,
      id: '',
      activeName: '',
      baseInfoList: {}, // 基本信息
      code: 'productInspectionProject',
      isShowApproveSignature: false // 是否显示审批人签名
    }
  },
  created() {
    if (this.$route.query) {
      this.id = this.$route.query.id
      this.activeName = this.$route.query.name
      this.getList()
    }
    this.isExistApprove()
    this.getApproveSignatureConfigByCode()
  },
  methods: {
    isExistApprove() {
      isExistApprove(this.code).then(res => {
        if (res.data.code === '200') {
          this.isExistApproveBtn = res.data.data
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 1.返回
    back() {
      this.$router.push({
        path: '/inspection-manage/productInspection/project',
        query: {
          name: this.activeName
        }
      })
    },
    // 2.全部收起
    handleAllOpen() {
      if (this.titleWord == '全部收起') {
        this.isOpenBaseInfo = false
        this.isOpenApprovalInfo = true
        this.titleWord = '全部展开'
      } else {
        this.isOpenBaseInfo = true
        this.titleWord = '全部收起'
        this.isOpenApprovalInfo = false
      }
    },
    // 获取数据
    async getList() {
      const result = await getProjectDetail(this.id)
      const { code, message, data } = result.data || {}
      if (+code === 200) {
        this.baseInfoList = data || {}
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 通过类型编号获取签名配置
    async getApproveSignatureConfigByCode() {
      const res = await getApproveSignatureConfigByCode('productInspectionProject')
      const { code, data, message } = res.data || {}
      if (+code === 200) {
        this.isShowApproveSignature = data || false
      } else {
        this.$notify({
          title: '提示',
          message,
          type: 'error',
          duration: 2000
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-page-1-3 {
  padding: 10px 10px;
  background-color: #eaeff5;
  width: 100%;
  height: calc(100%);
  box-sizing: border-box;
  .bg-content {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    .operate {
      height: 72px;
      border-bottom: 1px solid rgba(217, 217, 217, 0.7019607843137254);
      line-height: 72px;
      padding: 0 24px;
      .el-button {
        margin: 0 14px 0 0;
        padding: 9px 18px;
        cursor: pointer;
      }
    }
    .container {
      background-color: #ffffff;
      overflow-y: scroll;
      padding: 0;
      height: calc(100vh - 170px);
    }
    .base-info {
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
      padding: 24px 24px 16px 24px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      .title {
        font-size: 20px;
        display: flex;
        justify-content: space-between;
      }
      .info-box {
        display: flex;
        height: 100%;
        width: 100%;
        padding: 24px 0 0 0;
        flex-wrap: wrap;
        .info-item {
          width: 25%;
          display: flex;
          line-height: 24px;
          font-size: 14px;
          padding-bottom: 14px;
          font-weight: 400;

          .infoname {
            width: 180px;
            margin-right: 8px;
            display: flex;
            justify-content: flex-end;
          }
          .infotext {
            width: calc(100% - 188px);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
