<!--
 * @Author: limengjuan
 * @Date: 2021-12-16 11:43:36
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-10-24 14:58:40
 * @Description:
-->
<template>
  <div class="detail-page-1-3">
    <div class="bg-content">
      <div class="operate">
        <el-button type="primary" size="small" @click="back"> 返回 </el-button>
        <el-button type="primary" size="small" :disabled="handleDisable()" @click="checkBtn"> 复核 </el-button>
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
                <div class="infoname">送检单编号:</div>
                <div class="infotext">
                  {{ detailList.inspectionSheetCode || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">送检类型:</div>
                <div class="infotext">
                  {{ detailList.inspectionSheetTypeName || '--' }}
                </div>
              </div>
              <div v-if="detailList.inspectionSheetType === 1" class="info-item">
                <div class="infoname">抽检类型:</div>
                <div class="infotext">
                  {{ detailList.samplingClassification === 1 ? '小批量抽检' : '正常抽检' || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">状态:</div>
                <div class="infotext">
                  {{ detailList.statusName || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">关联单据编码:</div>
                <div class="infotext">
                  {{ detailList.workOrderNumber || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">生产订单编码:</div>
                <div class="infotext">
                  {{ detailList.productOrderNumber || '--' }}
                </div>
              </div>
              <!-- <div class="info-item">
                <div class="infoname">检验方案:</div>
                <div class="infotext">
                  {{ detailList.inspectionSchemeName || '--' }}
                </div>
              </div> -->
              <div class="info-item">
                <div class="infoname">检验范围:</div>
                <div class="infotext">
                  {{ detailList.inspectScope || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">关联单据类型:</div>
                <div class="infotext">
                  {{ detailList.documentTypeName || '--' }}
                </div>
              </div>
              <!-- <div class="info-item">
                <div class="infoname">物料编码:</div>
                <div class="infotext">
                  {{ detailList.materialCode || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">物料规格:</div>
                <div class="infotext">
                  {{ detailList.materialStandard || '--' }}
                </div>
              </div> -->
              <!-- <div class="info-item">
                <div class="infoname">物料名称:</div>
                <div class="infotext">
                  {{ detailList.materialName || '--' }}
                </div>
              </div> -->
              <div class="info-item">
                <div class="infoname">送检人:</div>
                <div class="infotext">
                  {{ detailList.inspectionPersonName || '--' }}
                </div>
              </div>
              <!-- <div class="info-item">
                <div class="infoname">批号:</div>
                <div class="infotext">
                  {{ detailList.barCode || '--' }}
                </div>
              </div> -->
              <div class="info-item">
                <div class="infoname">生产日期:</div>
                <div class="infotext">
                  {{ detailList.productTime || '--' }}
                </div>
              </div>
              <!-- <div class="info-item">
                <div class="infoname">送检日期:</div>
                <div class="infotext">
                  {{ detailList.inspectionTime || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">取样点:</div>
                <div class="infotext">
                  {{ detailList.samplePoint || '--' }}
                </div>
              </div>
              <div
                v-if="!detailListExtend.isProductionQuantity"
                class="info-item"
              >
                <div class="infoname">生产数量:</div>
                <div class="infotext">
                  {{ detailListExtend.productionQuantity || '--' }}
                </div>
              </div> -->
              <!-- <div class="info-item">
                <div class="infoname">抽样数量:</div>
                <div class="infotext">
                  {{ detailListExtend.samplingQuantity || "--" }}
                </div>
              </div> -->
              <!-- <div class="info-item">
                <div class="infoname">取样人:</div>
                <div class="infotext">
                  {{ detailListExtend.samplingPerson || '--' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">取样数量:</div>
                <div class="infotext">
                  {{ detailListExtend.sampQuantity || '--' }}
                </div>
              </div> -->
              <div v-if="detailList.decisionState" class="info-item">
                <div class="infoname">决策状态:</div>
                <div class="infotext">
                  {{ detailList.decisionState === 'alreadyDecision' ? '已决策' : '未决策' }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">二次检验类型:</div>
                <div class="infotext">
                  {{ showSecondInpectionType(detailList.secondaryInspectionType) }}
                </div>
              </div>
              <div class="info-item">
                <div class="infoname">备注:</div>
                <div class="infotext">
                  {{ detailList.remark || '--' }}
                </div>
              </div>
              <div v-if="detailList.supplierCode" class="info-item">
                <div class="infoname">供应商编码:</div>
                <div class="infotext">
                  {{ detailList.supplierCode || '--' }}
                </div>
              </div>
              <div v-if="detailList.supplierName" class="info-item">
                <div class="infoname">供应商名称:</div>
                <div class="infotext">
                  {{ detailList.supplierName || '--' }}
                </div>
              </div>
              <div v-if="detailList.customerCode" class="info-item">
                <div class="infoname">客户编码:</div>
                <div class="infotext">
                  {{ detailList.customerCode || '--' }}
                </div>
              </div>
              <div v-if="detailList.customerName" class="info-item">
                <div class="infoname">客户名称:</div>
                <div class="infotext">
                  {{ detailList.customerName || '--' }}
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <!-- 定制配置信息 -->
        <CustomInfo
          ref="customInfo"
          type="inspectSheet"
          :custom-info="customInfo"
          :is-edit="false"
          :is-open-custom-info.sync="isOpenCustomInfo"
        />

        <!-- tab 页面 -->
        <section class="tab-page">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="物料信息" name="material">
              <!-- <CommonTablePlus
                ref="common-table"
                v-loading="materialLoading"
                class="common-table"
                :data="materialData"
                border
                :all-comumns="materialComumns"
              /> -->
              <MaterialForm
                ref="material-form"
                :material-data="materialData"
                page-type="detail"
                @qualityInspectionSchemeId="getQualityInspectionSchemeId"
              />
            </el-tab-pane>

            <el-tab-pane label="送检标准" name="standard">
              <Standard :table-data="detailInfo.inspectionSheetSampleEntities" />
            </el-tab-pane>

            <!-- 检验决策 -->
            <el-tab-pane label="检验决策" name="decision">
              <Decision
                :table-data="detailList.inspectionSheetDecisionEntities"
                :code="detailList.inspectionSheetType?.toString()"
                type="detail"
              />
            </el-tab-pane>

            <el-tab-pane v-if="detailList.inspectionSheetType === 3" label="送检单品" name="inspectionItems">
              <div class="material-style">
                <InspectItem type="detail" :serial-code-list="detailList.serialCodeList" />
              </div>
            </el-tab-pane>

            <el-tab-pane v-if="state !== 1" label="检验信息" name="checkingInformation">
              <!-- 检验信息 -->
              <DetectionInformation
                :data="detectionInfo"
                :is-open.sync="isOpenDetectionInfo"
                :check-info="checkInfoData"
                :detail="true"
              />
            </el-tab-pane>

            <el-tab-pane v-if="state !== 1" label="送检信息" name="InspectionInformation">
              <section class="result-page">
                <main>
                  <el-form label-width="75px">
                    <el-form-item label="送检结论" style="width: 60%">
                      <el-input v-model="detailInfo.inspectionResult" disabled />
                    </el-form-item>

                    <el-form-item label="结论类型" style="width: 60%">
                      <el-input v-model="detailInfo.conclusion" disabled />
                    </el-form-item>

                    <el-form-item label="检验次数" style="width: 60%">
                      <el-input v-model="detailInfo.examineCount" disabled />
                    </el-form-item>
                    <el-form-item label="检验人" style="width: 60%">
                      <el-input v-model="detailInfo.inspectorName" disabled />
                    </el-form-item>
                  </el-form>
                </main>
              </section>
            </el-tab-pane>

            <el-tab-pane
              v-if="state !== 1 && +inspectConfig.qmsMustInspectionSheetApprove === 1"
              label="复核信息"
              name="ReviewInformation"
            >
              <!-- 复审信息 -->
              <section v-if="state !== 1" class="result-page">
                <main>
                  <el-form ref="form" label-width="70px">
                    <el-form-item label="复核结论" style="width: 60%">
                      <el-input v-model="detailInfo.reviewResultName" disabled />
                    </el-form-item>
                    <el-form-item label="复核人" style="width: 60%">
                      <el-input v-model="detailInfo.reviewByName" disabled />
                    </el-form-item>

                    <el-form-item label="复核时间" style="width: 60%">
                      <el-input v-model="detailInfo.reviewTime" disabled />
                    </el-form-item>

                    <el-form-item label="备注" style="width: 60%">
                      <el-input v-model="detailInfo.reviewRemark" type="textarea" disabled />
                    </el-form-item>

                    <el-table
                      :data="detailInfo.reviews || []"
                      style="width: 100%"
                      border
                      :header-cell-style="headerCellStyle"
                    >
                      <el-table-column label="序号">
                        <template slot-scope="{ $index }"> {{ $index + 1 }}</template>
                      </el-table-column>
                      <el-table-column prop="name" label="附件名称" />
                      <el-table-column prop="createTime" label="上传时间" />
                      <el-table-column label="操作">
                        <template slot-scope="{ row }">
                          <div class="view" @click="viewFile(row)">查看</div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form>
                  <el-dialog :visible.sync="materialDialogVisible" width="50%" title="图片查看">
                    <section class="show-image">
                      <img :src="viewImgUrl" alt="" width="100%" />
                    </section>
                  </el-dialog>
                </main>
              </section>
            </el-tab-pane>

            <el-tab-pane
              v-if="state !== 1 && +inspectConfig.qmsMustInspectionSheetAuthorize === 1"
              label="核准信息"
              name="authorizeInformation"
            >
              <!-- 结论信息 -->
              <section class="result-page">
                <main>
                  <el-form label-width="75px">
                    <el-form-item label="核准结论" style="width: 60%">
                      <el-input v-model="detailInfo.authorizeResultName" disabled />
                    </el-form-item>
                    <el-form-item label="核准人" style="width: 60%">
                      <el-input v-model="detailInfo.authorizeByName" disabled />
                    </el-form-item>
                    <el-form-item label="核准时间" style="width: 60%">
                      <el-input v-model="detailInfo.authorizeTime" disabled />
                    </el-form-item>
                    <el-form-item label="备注" style="width: 60%">
                      <el-input v-model="detailInfo.authorizeRemark" type="textarea" disabled />
                    </el-form-item>
                  </el-form>
                </main>
              </section>
            </el-tab-pane>
            <el-tab-pane v-if="state !== 1" label="不良信息" name="badInformation">
              <!-- <CommonTablePlus
              ref="common-table"
              v-loading="badInfoLoading"
              class="common-table"
              :data="badInfoData"
              border
              :all-comumns="BadInfoColumns"
            /> -->
              <BadInformation ref="bad-information" :state="state || 0" page-type="detail" :bad-data="badInfoData" />
            </el-tab-pane>
            <el-tab-pane label="附件列表" name="attachment">
              <!-- <CommonTablePlus
              ref="common-table"
              v-loading="attListLoading"
              class="common-table"
              :data="attListData"
              border
              :all-comumns="attListColumns"
            /> -->
              <AttachmentList ref="attachment-list" page-type="detail" :attachmentData="attachmentData" />
            </el-tab-pane>
          </el-tabs>
        </section>
        <!-- 检验项目1 -->
        <div class="mainBox">
          <div v-for="(item, index) in tableData" :key="index" class="table-info">
            <div :key="index" class="title">
              <div class="text">
                检验次数<label>{{ item.key > 9 ? item.key : 0 + item.key }}</label>
              </div>
              <div class="open-img" @click="isOpenMaterial = !isOpenMaterial">
                <img src="@/assets/images/home/xiala@2x.png" alt="" width="11" height="12" />
              </div>
            </div>
            <div v-show="isOpenMaterial" class="table-box">
              <el-table
                :data="item.value"
                :header-cell-style="{
                  background: '#F3F3F3',
                  color: 'rgba(0, 0, 0, 0.85)',
                  height: '48px'
                }"
                :max-height="300"
                :row-style="{ height: '48px' }"
                highlight-current-row
              >
                <el-table-column label="检验项目组" prop="inspectionGroupName" />
                <el-table-column label="检验项目" prop="inspectionItemName" />
                <el-table-column label="实际检验结果" prop="examineValue" width="130" />
                <el-table-column label="检验方法判定" prop="determinationOfDetectionMethodName" width="130" />
                <el-table-column label="检验标准" prop="verificationBasis" />
                <el-table-column label="检验方法" prop="verificationMethod" />
                <el-table-column label="检验仪器" prop="verificationInstrument" />
                <el-table-column label="检验人" prop="inspectionPerson" />
                <el-table-column label="检验时间" prop="inspectionTime" />
                <el-table-column label="状态" prop="stateName" />
                <el-table-column label="比较符" prop="comparatorName" />
                <el-table-column label="标准值/边界值" prop="referenceValue" width="120" />
                <el-table-column label="上限值" prop="upperLimitValue" />
                <el-table-column label="下限值" prop="downLimitValue" />
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <CheckInfo ref="checkInfo" :list="detailList" />
    </div>
  </div>
</template>
<script>
import { checkSheetDetail, inspectConfigDetail } from '@/api/quality-manage'
import CustomInfo from '@/views/common/customInfo/index.vue'
import DetectionInformation from './detectionInformation.vue'
import CheckInfo from './CheckInfo.vue'
import { checkSheetMaterialColumns, checkSheetBadInfoColumns, checkSheetAttListColumns } from './constant.js'
// import { checkSerialCodeList } from './methods'
export default {
  components: {
    CustomInfo,
    CheckInfo,
    DetectionInformation,
    // CommonTablePlus: () => import('@/components/CommonTablePlus'),
    MaterialForm: () => import('./materialForm'),
    BadInformation: () => import('./badInformation'),
    AttachmentList: () => import('./attachmentList'),
    InspectItem: () => import('./InspectItem.vue'),
    Standard: () => import('./standard'),
    Decision: () => import('./decision')
  },
  data() {
    return {
      id: '',
      state: 0,
      // activeName: '',
      isOpenBaseInfo: true, // 全部收起/放下
      isOpenMaterial: true,
      titleWord: '全部收起',
      detailList: {},
      detailListExtend: {},
      tableData: [], // 表格数据
      inspectionNumId: 1,
      inspectNumId: 1, // 获取送检结果选中的次数选择导出
      showExport: true,
      customInfo: {},
      isOpenCustomInfo: true,
      detectionInfo: {},
      isOpenDetectionInfo: true,
      checkInfoData: [],
      activeName: 'material',
      headerCellStyle: {
        background: '#F2F5FC',
        color: '#181d1f',
        height: '46px',
        'font-family': 'Source Han Sans CN',
        'font-size': '13px',
        'font-weight': '550'
      },

      viewImgUrl: '',
      materialDialogVisible: false,
      fileList: [],

      detailInfo: {
        inspectionResult: '',
        conclusion: '',
        examineCount: '',
        inspectorName: '',
        reviewResultName: '',
        reviewByName: '',
        reviewTime: '',
        reviewRemark: '',
        reviews: '',
        qualityInspectionSchemeId: ''
      },

      // 物料信息表
      materialLoading: false,
      materialData: [],
      materialComumns: checkSheetMaterialColumns,

      // 不良信息
      badInfoLoading: false,
      badInfoData: [],
      BadInfoColumns: checkSheetBadInfoColumns,

      // 附件列表
      attListLoading: false,
      // attListData: [],
      attachmentData: [],
      attListColumns: checkSheetAttListColumns,
      inspectConfig: {} // 配置信息
    }
  },
  created() {
    if (this.$route.query) {
      this.id = this.$route.query.id
      // this.activeName = this.$route.query.name
    }
    this.checkSheetDetail()
    // 配置信息
    this.getInspectConifg()
  },
  methods: {
    showSecondInpectionType(code) {
      switch (code) {
        case 1:
          return '全检'
        case 2:
          return '剩余部分检验'
        default:
          return '重点检验'
      }
    },
    getQualityInspectionSchemeId(val) {
      console.log('送检单id -> ', val)
      this.detailInfo.qualityInspectionSchemeId = val
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
        this.viewImgUrl = `${window.origin}/${row.url}`
        console.log(`${window.origin}/${row.url}`)
      }
      if (pdfTem.length) {
        const newWin = window.open(`/factory/v1/${row.url}`, '_blank')
        newWin.opener = null
      }
    },
    // 1.返回
    back() {
      this.$router.push({
        path: '/inspection-manage/productInspection'
        // query: {
        //   name: this.activeName
        // }
      })
    },
    // 2.全部收起
    handleAllOpen() {
      if (this.titleWord === '全部收起') {
        this.isOpenBaseInfo = false
        this.isOpenMaterial = false
        this.isOpenCustomInfo = false
        this.isOpenDetectionInfo = false
        this.titleWord = '全部展开'
      } else {
        this.isOpenBaseInfo = true
        this.isOpenMaterial = true
        this.isOpenCustomInfo = true
        this.isOpenDetectionInfo = true
        this.titleWord = '全部收起'
      }
    },
    // 配置信息
    getInspectConifg() {
      inspectConfigDetail().then(res => {
        const { data, code } = res.data
        if (+code === 200) {
          this.inspectConfig = data
          console.log('getInspectConifg', this.inspectConfig)
        }
      })
    },
    // 3.获取详情
    checkSheetDetail() {
      checkSheetDetail(this.id).then(res => {
        if (res.data.code === '200') {
          this.detectionInfo = res.data.data

          const {
            // inspectionSheetCode,
            // inspectScope,
            // inspectionSheetType,
            // // inspectionSchemeId,
            // inspectionPerson,
            // status,
            // reviewResult,
            // correctiveMeasures,
            authorizeResult,
            authorizeByName,
            authorizeTime,
            authorizeResultName,
            authorizeRemark,
            researchReviewFlag,
            reviewByName,
            reviewTime,
            reviewResultName,
            reviewRemark,
            reviews,
            conclusion,
            inspectionResult,
            examineCount,
            inspectorName,
            inspectionSheetMaterialEntities,
            inspectionSchemeId,
            inspectionSheetType,
            inspectionSheetCode
          } = this.detectionInfo
          console.log('检验单详情 -> ', inspectionSheetMaterialEntities)
          Object.assign(this.detailInfo, {
            inspectionResult,
            conclusion: conclusion === 'qualified' ? '合格' : '不合格',
            examineCount,
            inspectorName,
            authorizeResult,
            authorizeByName,
            authorizeTime,
            authorizeResultName,
            authorizeRemark,
            researchReviewFlag,
            reviewResultName,
            reviewByName,
            reviewTime,
            reviewRemark,
            reviews,
            inspectionSheetSampleEntities: inspectionSheetMaterialEntities[0]?.inspectionSheetSampleEntities || []
          })

          console.log('详情 -> ', this.detectionInfo)

          const { name, standard, comp } = this.detectionInfo.inspectionSheetMaterialEntities?.[0]?.materialFields ?? {}

          // 物料信息表数据
          this.materialData = [
            {
              ...this.detectionInfo.inspectionSheetMaterialEntities[0],
              comp,
              name,
              standard,
              // inspectionSheetType: this.detectionInfo.inspectionSheetType,
              inspectionSchemeId,
              inspectionSheetType,
              inspectionSheetCode
            }
          ]

          // 状态
          this.state = res.data.data.status
          console.log('state -> ', this.state)

          // 不良信息表数据
          this.badInfoData = this.detectionInfo.inspectionSheetDefectEntities

          // 附件列表信息数据
          // this.attListData = this.detectionInfo.inspectionPictures
          this.attachmentData = this.detectionInfo.inspectionPictures

          this.checkInfoData = res.data.data.qualityInspectionSchemeEntities?.page.records
          this.detailList = res.data.data
          const extend = JSON.parse(res.data.data.extend)
          if (extend) {
            this.detailListExtend = extend
            this.customInfo = {
              batchNumber: extend.batchNumber
            }
          }

          this.inspectNumId = res.data.data.inspectNumId // 选中可以导出的那个
          // 表格数据
          const template = res.data.data.map
          const list = []
          // eslint-disable-next-line no-unused-vars
          for (const i in template) {
            const countList = template[i].map(item => {
              return {
                ...item,
                ...item.inspectionItemEntity,
                examineValue: item.examineValue
              }
            })
            list.push({ key: i, value: countList })
          }
          this.tableData = list
          // 产品检验汇总页面的状态为生效且为成品检验时才有导出
          if (this.detailList.typeName === '成品检验' && this.detailList.inspectionResultStatus === 2) {
            this.showExport = true
          } else {
            this.showExport = false
          }
          this.inspectionNumId = list.map(item => item.value[0].inspectionNumId) // 导出传inspectionNumId
        }
      })
    },
    checkBtn() {
      this.$refs?.checkInfo?.show()
    },
    handleDisable() {
      const { status, reviewResult } = this.detailList
      if (status !== 3) return true
      if (reviewResult) return true
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-page-1-3 {
  padding: 10px 10px;
  background-color: #eaeff5;
  width: 100%;
  height: 94.8vh;
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
    .mainBox {
      background-color: #ffffff;
      padding: 0;
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
            width: 112px;
            margin-right: 8px;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
    .table-info {
      padding: 30px 24px 16px 24px;
      height: auto;
      .title {
        font-size: 20px;
        display: flex;
        justify-content: space-between;
      }
      .table-box {
        margin: 24px 0 0 0;
      }
    }
  }
  .container {
    height: calc(100% - 72px);
    overflow-y: auto;
  }
}
.tab-page {
  box-sizing: border-box;
  padding: 20px;
}
.result-page {
  box-sizing: border-box;
  padding: 25px 0;
}
.common-table {
  height: 400px;
}

::v-deep .el-form-item--medium .el-form-item__content {
  width: 58%;
}
</style>
