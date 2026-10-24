<template>
  <div class="detail-page-1-3">
    <div class="bg-content">
      <div class="operate">
        <el-button type="primary" size="small" @click="back"> 返回 </el-button>
        <el-button v-show="showCloseBtn" type="primary" size="small" @click="handleAllOpen"> 全部展开 </el-button>
        <el-button v-show="!showCloseBtn" type="primary" size="small" @click="handleAllClose"> 全部收起 </el-button>
        <el-button type="primary" size="small" @click="saveCurrentResult('已审批')"> 同意 </el-button>
        <el-button type="primary" size="small" @click="saveCurrentResult('驳回')"> 驳回 </el-button>
      </div>
      <div class="container">
        <div class="base-info">
          <div class="title">
            <div class="text">审批</div>
            <div class="open-img" @click="isOpenApproval = !isOpenApproval">
              <img src="@/assets/images/home/xiala@2x.png" alt="" width="11" height="12" />
            </div>
          </div>
          <el-collapse-transition>
            <div v-show="isOpenApproval" class="info-box">
              <el-form ref="approvalForm" :model="approvalForm" label-width="100px" class="approvalForm" inline>
                <!-- <el-form-item label="审批状态:">
                  <el-select v-model="approvalForm.approvalStatus" placeholder="请选择" size="mini">
                    <el-option
                      v-for="(item,index) in approvalList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item> -->
                <el-form-item label="审批意见：" prop="approvalSuggestion">
                  <el-input v-model="approvalForm.approvalSuggestion" type="textarea" />
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-transition>
        </div>
        <!-- 基本信息 -->
        <div class="base-info">
          <div class="title">
            <div class="text">基本信息</div>
            <div class="open-img" @click="isOpenBaseInfo = !isOpenBaseInfo">
              <img src="@/assets/images/home/xiala@2x.png" alt="" width="11" height="12" />
            </div>
          </div>
          <el-collapse-transition>
            <div v-show="isOpenBaseInfo">
              <div class="info-box">
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
                  <div class="infoname">备注:</div>
                  <div class="infotext">
                    {{ baseInfoList.remark || '--' }}
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
import { getProjectDetail, approvalProjectList, getApprovalProjectStateList } from '@/api/quality-manage.js'
export default {
  data() {
    return {
      isOpenApproval: true,
      isOpenBaseInfo: true,
      approvalList: [], // 审批的list
      showCloseBtn: false,
      baseInfoList: {},
      approvalForm: {
        approvalStatus: '',
        approvalSuggestion: ''
      },
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getList()
    this.getApprovalList()
  },
  methods: {
    // 处理打开
    handleAllOpen() {
      this.isOpenApproval = true
      this.isOpenBaseInfo = true
      this.showCloseBtn = false
    },
    // 处理关闭
    handleAllClose() {
      this.isOpenApproval = false
      this.isOpenBaseInfo = false
      this.showCloseBtn = true
    },
    // 返回
    back() {
      this.$router.push({
        path: `/inspection-manage/productInspection/project`,
        params: {
          current: this.$route.params.current,
          size: this.$route.params.size,
          name: this.$route.query.name
        }
      })
    },
    // 获取数据
    async getList() {
      const result = await getProjectDetail(this.id)
      const { code, message, data } = result.data || {}
      if (+code === 200) {
        this.baseInfoList = data || {}
        const { approvalStatus, approvalSuggestion } = data || {}
        this.approvalForm = {
          approvalStatus,
          approvalSuggestion
        }
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 获取审批的状态
    async getApprovalList() {
      const result = await getApprovalProjectStateList()
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        this.approvalList = data || []
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 提交审批
    async saveCurrentResult(name) {
      const list = this.approvalList.find(item => item.name === name)
      this.approvalForm['approvalStatus'] = list?.code
      this.approvalForm = {
        ...this.approvalForm,
        id: this.id
      }
      const result = await approvalProjectList(this.approvalForm)
      const { code, message } = result.data || {}
      if (+code === 200) {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'success',
          duration: 2000
        })
        this.back()
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
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
    .container::-webkit-scrollbar {
      background: #fff;
      width: 4px;
    }
    .container::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      width: 4px;
    }
    .container::-webkit-scrollbar-track {
      background: #fff;
      width: 4px;
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
            width: 126px;
            margin-right: 8px;
            display: flex;
            justify-content: flex-end;
          }

          .infotext {
            flex: 1;
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>
