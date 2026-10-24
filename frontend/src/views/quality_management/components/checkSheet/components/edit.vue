<!--
 * @Author: limengjuan
 * @Date: 2021-12-14 09:45:58
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-11-02 16:29:17
 * @Description:
-->
<template>
  <div class="detail-page-1-3">
    <div class="bg-content">
      <div class="operate">
        <el-button type="primary" size="small" @click="back"> 返回 </el-button>
        <el-button :disabled="saveLock" type="primary" size="small" @click="saveInfo('dataForm')"> 保存 </el-button>
        <el-button v-if="reviewClickShow" type="primary" size="small" @click="checkBtn"> 复核 </el-button>
        <el-button v-if="authorizeClickShow" type="primary" size="small" @click="handleAuthorizeClick">
          核准
        </el-button>
        <el-button v-if="researchReviewClickShow" type="primary" size="small" @click="recheckNotify">
          研发复核
        </el-button>
        <el-button
          v-if="showPendingApprove"
          v-permission="{
            action: 'product.inspection.inspectionsheets:submitApprove'
          }"
          type="primary"
          size="small"
          @click="hdPendingApprove"
        >
          提交审批
        </el-button>
        <el-button
          v-if="showApprove"
          v-permission="{
            action: 'product.inspection.inspectionsheets:approve'
          }"
          type="primary"
          size="small"
          @click="hdApprove"
        >
          审批
        </el-button>
        <el-button type="primary" size="small" @click="handleAllOpen">
          {{ titleWord }}
        </el-button>
      </div>

      <div class="container">
        <!-- 基本信息 -->
        <div class="base-info">
          <div class="title">
            <div class="text">
              基本信息
              <span v-if="approveStatus.type">
                <el-tag :type="approveStatus.type">{{ approveStatus.text }}</el-tag>
              </span>
            </div>
            <div class="open-img" @click="isOpenBaseInfo = !isOpenBaseInfo">
              <img src="@/assets/images/home/xiala@2x.png" alt="" width="11" height="12" />
            </div>
          </div>
          <el-collapse-transition>
            <div v-show="isOpenBaseInfo">
              <el-form ref="dataForm" :rules="formRules" :model="baseInfo" :inline="true" label-position="right">
                <el-form-item label="送检单编号:" prop="inspectionSheetCode">
                  <el-input v-model="baseInfo.inspectionSheetCode" disabled placeholder="请输入内容" size="small" />
                </el-form-item>
                <el-form-item label="送检类型:" prop="inspectionSheetType">
                  <el-select
                    v-model="baseInfo.inspectionSheetType"
                    :disabled="forbidClick"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                    @change="changeType"
                  >
                    <el-option
                      v-for="(item, index) in unitTypeList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="关联单据类型:" prop="documentType">
                  <el-select
                    v-model="baseInfo.documentType"
                    :disabled="forbidClick"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in checkTypeList"
                      v-show="item.show"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="关联单据编码:" prop="workOrderNumber">
                  <el-input v-model="baseInfo.workOrderNumber" placeholder="请选择" disabled>
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      :disabled="forbidClick"
                      @click="handleWorkOrderClick"
                    />
                  </el-input>
                </el-form-item>
                <el-form-item v-show="baseInfo.documentType === 1" label="生产订单编码:" prop="productOrderNumber">
                  <el-input v-model="baseInfo.productOrderNumber" placeholder="请选择" disabled>
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      :disabled="forbidClick"
                      @click="productOrderDialogVisible = true"
                    />
                  </el-input>
                </el-form-item>
                <el-form-item label="检验范围" prop="inspectScope">
                  <el-select
                    v-model="baseInfo.inspectScope"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                    :disabled="forbidClick"
                  >
                    <el-option
                      v-for="(item, index) in checkAreaList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="baseInfo.inspectionSheetType === 1" label="抽检分类" prop="samplingClassification">
                  <el-select
                    v-model="baseInfo.samplingClassification"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in classificationList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <!-- <el-form-item
                  label="检验方案:"
                  prop="qualityInspectionSchemeName"
                >
                  <el-select
                    v-model="baseInfo.qualityInspectionSchemeName"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                    :disabled="initStatus != 1"
                    @change="changeQualityInspectionSchemeName"
                  >
                    <el-option
                      v-for="(item, index) in qualityInspectionSchemeNameList"
                      :key="index"
                      :label="item.qualityInspectionSchemeName"
                      :value="item.qualityInspectionSchemeName"
                    />
                  </el-select>
                </el-form-item> -->
                <el-form-item label="送检状态:">
                  <el-select
                    v-model="baseInfo.status"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                    :disabled="checkState || isDisableStatus"
                  >
                    <el-option
                      v-for="(item, index) in checkStatusList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                      :disabled="item.disabled"
                    />
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="物料编码:">
                  <el-select
                    v-model="baseInfo.materialCode"
                    :disabled="flag || forbidClick"
                    placeholder="请选择"
                    clearable
                    size="small"
                    @change="changeMaterialCode"
                  >
                    <el-option
                      v-for="(item, index) in productMaterialList"
                      :key="index"
                      :label="item.code"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="物料规格:">
                  <el-input
                    v-model="baseInfo.materialStandard"
                    disabled
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item> -->
                <!-- <el-form-item label="物料名称:">
                  <el-input
                    v-model="baseInfo.materialName"
                    disabled
                    placeholder="请输入"
                    clearable
                    size="small"
                  />
                </el-form-item> -->

                <el-form-item label="送检人:" prop="inspectionPerson">
                  <el-select
                    v-model="baseInfo.inspectionPerson"
                    :disabled="forbidClick"
                    filterable
                    placeholder="请选择"
                    clearable
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in checkPeopleList"
                      :key="index"
                      :label="item.nickname"
                      :value="item.username"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="生产日期:">
                  <el-date-picker
                    v-model="baseInfo.productTime"
                    :disabled="forbidClick"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </el-form-item>
                <el-form-item label="送验日期:">
                  <el-date-picker
                    v-model="baseInfo.inspectionTime"
                    :disabled="forbidClick"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </el-form-item>
                <!-- 二次检验类型选择 -->
                <el-form-item
                  v-if="baseInfo.inspectionSheetType === 10"
                  :rules="[{ required: true, message: '该项为必填项！', trigger: 'blur' }]"
                  label="二次检验类型："
                  prop="secondaryInspectionType"
                >
                  <div>
                    <el-select
                      v-model="baseInfo.secondaryInspectionType"
                      filterable
                      placeholder="请选择"
                      clearable
                      popper-class="inspection-sheet-select"
                    >
                      <el-option
                        v-for="(item, index) in secondCheckTypeList"
                        :key="index"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="决策状态:" prop="">
                  <el-select
                    v-model="baseInfo.decisionState"
                    placeholder="请选择"
                    clearable
                    size="small"
                    :disabled="disabledDecisionSate"
                  >
                    <el-option
                      v-for="(item, index) in decisionStateList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="生产数量以报工为准:">
                  <el-switch
                    v-model="baseInfo.isProductionQuantity"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    size="small"
                    :disabled="forbidClick"
                  />
                </el-form-item>
                <el-form-item v-if="+inspectConfig.qmsMustInspectionSheetResearchApprove === 1" label="研发复核">
                  <el-switch
                    v-model="baseInfo.researchReviewFlag"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    size="small"
                    disabled
                  />
                </el-form-item>
                <!-- <el-form-item
                  v-show="!baseInfo.isProductionQuantity"
                  prop="productionQuantity"
                  label="生产数量:"
                >
                  <el-input
                    v-model="baseInfo.productionQuantity"
                    placeholder="请输入"
                    :disabled="forbidClick"
                    size="small"
                  />
                </el-form-item> -->
                <!-- <el-form-item label="抽样数量:">
                  <el-input
                    v-model="baseInfo.samplingQuantity"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item> -->
                <!-- <el-form-item label="取样人:">
                  <el-input
                    v-model="baseInfo.samplingPerson"
                    placeholder="请输入"
                    :disabled="forbidClick"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="取样数量:">
                  <el-input
                    v-model="baseInfo.sampQuantity"
                    placeholder="请输入"
                    :disabled="forbidClick"
                    size="small"
                  />
                </el-form-item> -->
                <el-form-item label="备注:">
                  <el-input v-model="baseInfo.remark" :disabled="forbidClick" type="textarea" placeholder="请输入" />
                </el-form-item>
                <el-form-item
                  v-show="baseInfo.documentType === 1 && baseInfo.customerName"
                  label="客户名称:"
                  prop="customerName"
                >
                  <el-input v-model="baseInfo.customerName" disabled placeholder="请输入内容" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="baseInfo.documentType === 1 && baseInfo.customerName"
                  label="客户编码:"
                  prop="customerCode"
                >
                  <el-input v-model="baseInfo.customerCode" disabled placeholder="请输入内容" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="baseInfo.documentType !== 1 && baseInfo.supplierCode"
                  label="供应商编码:"
                  prop="supplierCode"
                >
                  <el-input v-model="baseInfo.supplierCode" disabled placeholder="请输入内容" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="baseInfo.documentType !== 1 && baseInfo.supplierName"
                  label="供应商名称:"
                  prop="supplierName"
                >
                  <el-input v-model="baseInfo.supplierName" disabled placeholder="请输入内容" size="small" />
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-transition>
        </div>
        <!-- 定制配置信息 -->
        <CustomInfo
          ref="customInfo"
          type="inspectSheet"
          :custom-form-config="customFormConfig"
          :custom-info="customInfo"
          :is-open-custom-info.sync="isOpenCustomInfo"
        />

        <!-- tab 页面 -->
        <section class="tab-page">
          <div v-if="activeName === 'material'" class="aql-btn">
            <el-button type="primary" plain :disabled="!materialDataBak[0]?.originalQuantity" @click="aqlCalculation"
              >AQL计算</el-button
            >
          </div>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="物料信息" name="material">
              <div class="material-style">
                <MaterialForm
                  ref="material-form"
                  :material-data="materialData"
                  :document-type="baseInfo.documentType"
                  page-type="edit"
                  :state="baseInfo.status || 0"
                  @materialUpdate="materialUpdate"
                  @qualityInspectionSchemeId="getQualityInspectionSchemeId"
                />
              </div>
            </el-tab-pane>

            <el-tab-pane label="送检标准" name="standard">
              <Standard :table-data="baseInfo.inspectionSheetSampleEntities" />
            </el-tab-pane>
            <!-- 检验决策 在完成状态才可以显示 -->
            <el-tab-pane v-if="statusIsComplete" label="检验决策" name="decision">
              <Decision
                ref="decision"
                :table-data="baseInfo.inspectionSheetDecisionEntities"
                :code="baseInfo.inspectionSheetType?.toString()"
                :work-order-number="baseInfo.workOrderNumber"
                :decision-state="baseInfo.decisionState"
                :qualified-quantity="materialDataBak[0]?.qualifiedQuantity || 0"
              />
            </el-tab-pane>
            <el-tab-pane v-if="baseInfo.inspectionSheetType === 3" label="送检单品" name="inspectionItems">
              <div class="material-style">
                <InspectItem
                  type="add"
                  :serial-code-list="baseInfo.serialCodeList"
                  @serialCodeListUpdate="hdserialCodeList"
                />
              </div>
            </el-tab-pane>

            <!-- <el-tab-pane
              label="审批信息"
              name="approveInfo"
            >
              审核信息
            </el-tab-pane> -->
            <el-tab-pane v-if="baseInfo.status !== 1" label="检验信息" name="checkingInformation">
              <!-- 检验信息 -->
              <DetectionInformation
                ref="detectionInformation"
                :data="detectionInfo"
                :is-open.sync="isOpenDetectionInfo"
                :check-info="checkInfoData"
                :review-result="reviewResultName"
              />
            </el-tab-pane>

            <el-tab-pane v-if="baseInfo.status !== 1" label="送检信息" name="InspectionInformation">
              <!-- 结论信息 -->
              <section class="result-page">
                <main>
                  <el-form label-width="75px">
                    <el-form-item label="送检结论" style="width: 60%">
                      <el-select
                        v-model="baseInfo.inspectionResult"
                        style="width: 100%"
                        placeholder="请选择"
                        :disabled="isString(baseInfo.reviewResultName) || baseInfo.status === 3"
                      >
                        <el-option
                          v-for="(item, index) in resultList"
                          :key="index"
                          :label="item.type"
                          :value="item.type"
                        />
                      </el-select>
                    </el-form-item>

                    <el-form-item label="结论类型" style="width: 60%">
                      <el-select
                        v-model="baseInfo.conclusion"
                        style="width: 100%"
                        placeholder="请选择"
                        :disabled="isString(baseInfo.reviewResultName) || baseInfo.status === 3"
                      >
                        <el-option
                          v-for="(citem, cindex) in typeList"
                          :key="cindex"
                          :label="citem.name"
                          :value="citem.code"
                        />
                      </el-select>
                    </el-form-item>

                    <el-form-item label="检验次数" style="width: 60%">
                      <el-input v-model="baseInfo.examineCount" disabled />
                    </el-form-item>

                    <el-form-item label="检验人" style="width: 60%">
                      <el-input v-model="baseInfo.inspectorName" disabled />
                    </el-form-item>
                  </el-form>
                </main>
              </section>
            </el-tab-pane>

            <el-tab-pane
              v-if="baseInfo.status !== 1 && +inspectConfig.qmsMustInspectionSheetApprove === 1"
              label="复核信息"
              name="ReviewInformation"
            >
              <section v-if="baseInfo.status !== 1" class="result-page">
                <main>
                  <el-form ref="form" label-width="70px">
                    <el-form-item label="复核结论" style="width: 60%">
                      <el-input v-model="baseInfo.reviewResultName" disabled />
                    </el-form-item>

                    <el-form-item label="复核人" style="width: 60%">
                      <el-input v-model="baseInfo.reviewByName" disabled />
                    </el-form-item>

                    <el-form-item label="复核时间" style="width: 60%">
                      <el-input v-model="baseInfo.reviewTime" disabled />
                    </el-form-item>
                    <!-- <el-form-item label="决策状态" style="width: 60%">
                      <el-input v-model="baseInfo.decisionState" disabled />
                    </el-form-item> -->

                    <el-form-item label="备注" style="width: 60%">
                      <el-input v-model="baseInfo.reviewRemark" type="textarea" disabled />
                    </el-form-item>

                    <el-table :data="baseInfo.reviews" style="width: 100%" border :header-cell-style="headerCellStyle">
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
              v-if="baseInfo.status !== 1 && +inspectConfig.qmsMustInspectionSheetAuthorize === 1"
              label="核准信息"
              name="authorizeInformation"
            >
              <!-- 结论信息 -->
              <section class="result-page">
                <main>
                  <el-form label-width="75px">
                    <el-form-item label="核准结论" style="width: 60%">
                      <el-select v-model="baseInfo.authorizeResult" style="width: 100%" placeholder="请选择" disabled>
                        <el-option
                          v-for="(citem, cindex) in typeList"
                          :key="cindex"
                          :label="citem.name"
                          :value="citem.code"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="核准人" style="width: 60%">
                      <el-input v-model="baseInfo.authorizeByName" disabled />
                    </el-form-item>
                    <el-form-item label="核准时间" style="width: 60%">
                      <el-input v-model="baseInfo.authorizeTime" disabled />
                    </el-form-item>
                    <el-form-item label="备注" style="width: 60%">
                      <el-input v-model="baseInfo.authorizeRemark" type="textarea" disabled />
                    </el-form-item>
                  </el-form>
                </main>
              </section>
            </el-tab-pane>
            <el-tab-pane v-if="baseInfo.status !== 1" label="不良信息" name="badInformation">
              <BadInformation
                ref="bad-information"
                :state="baseInfo.status || 0"
                page-type="edit"
                :bad-data="badData"
                :defect-entities="defectEntities"
                @getBadData="getBadData"
              />
            </el-tab-pane>
            <el-tab-pane label="附件列表" name="attachment">
              <!-- <CommonTablePlus
              ref="common-table"
              v-loading="attListLoading"
              class="common-table"
              :data="attachmentData"
              border
              :all-comumns="attListColumns"
            /> -->
              <AttachmentList ref="attachment-list" page-type="edit" :attachment-data="attachmentData" />
            </el-tab-pane>
          </el-tabs>
        </section>

        <!-- 检验项目 -->
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
                <el-table-column label="检验方法判定" prop="determinationOfDetectionMethodName" />
                <el-table-column label="检验标准" prop="verificationBasis" />
                <el-table-column label="检验方法" prop="verificationMethod" />
                <el-table-column label="检验仪器" prop="verificationInstrument" />
                <el-table-column label="检验人" prop="inspectionPerson" />
                <el-table-column label="检验时间" prop="inspectionTime" />
                <el-table-column label="状态" prop="stateName" />
                <el-table-column label="比较符" prop="comparatorName" />
                <el-table-column label="标准值/边界值" prop="referenceValue" />
                <el-table-column label="上限值" prop="upperLimitValue" />
                <el-table-column label="下限值" prop="downLimitValue" />
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <CheckInfo ref="checkInfo" :list="detectionInfo" @refreshList="refreshList" />
    </div>

    <CommonSelectDialogPlus
      v-if="workOrderDialogVisible"
      title="工单选择"
      :request-config="{
        url: '/api/workorders/list/simple',
        method: 'post'
      }"
      :extra-params="{ state: '2,3,4,5' }"
      :column-config="workOrderColumns"
      :visible="workOrderDialogVisible"
      is-has-material-extension-keys
      @confirm="handleConfirmWorkOrder"
      @cancel="workOrderDialogVisible = false"
    />

    <CommonSelectDialogPlus
      v-if="productOrderDialogVisible"
      title="生产订单选择"
      :request-config="{
        url: '/api/workorders/list/simple',
        method: 'post'
      }"
      :extra-params="{ state: '2,3,4,5' }"
      :column-config="productOrderColumns"
      :visible="productOrderDialogVisible"
      @confirm="handleConfirmProductOrder"
      @cancel="productOrderDialogVisible = false"
    />
    <!-- 审批弹窗 -->
    <ApprovalDialog
      ref="approvalDialog"
      :approval-id="baseInfo.inspectionSheetCode"
      :approval-api="approvalApi"
      @closeApprovalDialog="hdcloseApprove"
    />
    <!-- 核准弹窗 -->
    <AuthorizeInfo ref="authorizeInfo" />
    <!-- 采购收料单 -->
    <ReceipOrderDialog
      v-if="receiptOrderVisible"
      :visible="receiptOrderVisible"
      :extra-params="{ states: '2,3,4' }"
      @confirm="
        value => {
          handleConfirmMaterial(value, 'purchaseReceipt')
        }
      "
      @cancel="receiptOrderVisible = false"
    />
    <!-- 采购订单 -->
    <RelateOrderDialog
      v-if="purchaseOrderVisible"
      :sale-order-dialog="purchaseOrderVisible"
      order-num-type="purchasingOrder"
      :is-multiple="false"
      @confirm="
        value => {
          handleConfirmMaterial(value, 'purchase')
        }
      "
      @cancel="purchaseOrderVisible = false"
    />
    <!-- 关联单据编码 -->
    <CommonSelectDialogPlusSpecial
      v-if="relatedOrderVisible"
      :title="selectDialogConfig.title"
      :request-config="selectDialogConfig.requestConfig"
      :extra-params="selectDialogConfig.extraParams"
      :column-config="selectDialogConfig.columns"
      :visible="relatedOrderVisible"
      :array-key="selectDialogConfig.arrayKey"
      @confirm="hdSelectDialogConfirm"
      @cancel="relatedOrderVisible = false"
    />
  </div>
</template>
<script>
import {
  getCheckUnitStatus,
  getCheckUnitType,
  getCheckType,
  getCheckCode,
  getCheckPlanList,
  editCheckUnit,
  getCheckPerson,
  getBarCode,
  getProcessMaterialInfo,
  checkSheetDetail,
  getCheckSheetBarCode,
  getInspectsheetsGetQualitySchemes,
  getCheckStatus,
  definitionList,
  checkArea,
  // aqlCalculate,
  getBadScriptList,
  getSaveAndBackConfig,
  getApproveConfig, // 获取审批配置
  submitApprove, // 提交审批
  approve, // 审批
  inspectConfigDetail,
  btnCompleteClick,
  btnProcessStatusClick,
  researchReviewFlag,
  // checkSerialCode
  getClassification,
  baseDecisionList,
  getSecondCheckType,
  getStandardData
} from '@/api/quality-manage'
import ApprovalDialog from '@/components/ApprovalDialog'
import validateInspectNumber from '@/utils/validateInspectNumber'
import { mapGetters } from 'vuex'
import { workOrderColumns, checkSheetMaterialColumns, productOrderColumns } from './constant.js'
import { checkSerialCodeList } from './methods'
import { COLUMNS } from './constant/index.js'
export default {
  components: {
    CustomInfo: () => import('@/views/common/customInfo/index.vue'),
    CheckInfo: () => import('./CheckInfo.vue'),
    DetectionInformation: () => import('./detectionInformation.vue'),
    CommonSelectDialogPlus: () => import('@/components/CommonSelectDialogPlus'),
    CommonSelectDialogPlusSpecial: () => import('@/components/CommonSelectDialogPlusSpecial'),
    MaterialForm: () => import('./materialForm'),
    AttachmentList: () => import('./attachmentList'),
    BadInformation: () => import('./badInformation'),
    ApprovalDialog,
    ReceipOrderDialog: () => import('./materialComponets/receipOrderDialog'),
    RelateOrderDialog: () => import('./materialComponets/relateOrderDialog'),
    AuthorizeInfo: () => import('./authorizeInfo'),
    InspectItem: () => import('./InspectItem.vue'),
    Standard: () => import('./standard'),
    Decision: () => import('./decision')
  },
  data() {
    return {
      id: '',
      forbidClick: false,
      checkState: false,
      isOpenBaseInfo: true, // 全部收起/放下
      isOpenMaterial: true,
      titleWord: '全部收起',
      flag: true,
      checkPlanDataList: [], // 检验项目表格数据
      checkStatusList: [], // 送检状态
      checkTypeList: [], // 关联单据类型
      unitTypeList: [], // 送检单类型
      checkCodeList: [], // 关联单据编码
      checkPeopleList: [], // 送检人
      barCodeList: [], // 批号
      detailList: [], // 详情
      tableData: [],
      productMaterialList: [], // 过程检验物料信息
      showType: true,
      current: '',
      size: '',
      baseInfo: {
        inspectionSheetCode: '',
        inspectScope: '',
        inspectionSheetId: '',
        inspectionSheetType: 2,
        inspectionPerson: '',
        status: '',
        workOrderNumber: '',
        productOrderNumber: '',
        qualityInspectionSchemeName: '',
        documentType: 1,
        materialCode: '',
        materialStandard: '',
        materialName: '',
        barCode: '',
        productTime: '',
        inspectionTime: '',
        samplePoint: '',
        materialId: '',
        cloneMaterialId: '',
        qualityInspectionSchemeId: '',
        isProductionQuantity: false,
        productionQuantity: '',
        samplingQuantity: '',
        samplingPerson: '',
        sampQuantity: '',
        remark: '',
        reviewByName: '',
        reviewTime: '',
        reviewResult: '',
        reviewResultName: '',
        reviewRemark: '',
        reviews: [],
        conclusion: '',
        inspectionResult: '',
        examineCount: '',
        inspectorName: '',
        correctiveMeasures: '',
        customerCode: '',
        customerName: '',
        supplierCode: '',
        supplierName: '',
        serialCodeList: [],
        samplingClassification: '',
        inspectionSheetDecisionEntities: [],
        decisionState: '', // 决策状态
        secondaryInspectionType: ''
      },
      activeName: 'material',
      formRules: {
        inspectionSheetCode: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ],
        inspectionSheetType: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        workOrderNumber: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        qualityInspectionSchemeName: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        documentType: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        inspectionPerson: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        samplingClassification: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ]
      },
      customInfo: {},
      customFormConfig: {
        batchNumber: {
          disabled: false
        }
      },
      isOpenCustomInfo: true,
      qualityInspectionSchemeNameList: [],
      initStatus: '',
      detectionInfo: {},
      isOpenDetectionInfo: true,
      // reviewForm: {
      //   reviewConclusion: '',
      //   reviewer: '',
      //   compositeConclusion: ''
      // },
      checkInfoData: [],
      TstableData: [
        {
          index: 1,
          attachmentName: '附件1',
          uploadTime: '2023-06-01'
        },
        {
          index: 2,
          attachmentName: '附件2',
          uploadTime: '2023-06-02'
        }
      ],
      headerCellStyle: {
        background: '#F2F5FC',
        color: '#181d1f',
        height: '46px',
        'font-family': 'Source Han Sans CN',
        'font-size': '13px',
        'font-weight': '550'
      },
      txt: '',
      materialDialogVisible: false,
      viewImgUrl: '',
      typeList: [],
      resultList: [],
      reviewResultName: '',
      workOrderDialogVisible: false,
      productOrderDialogVisible: false,
      workOrderColumns,
      productOrderColumns,
      // 物料信息表
      materialLoading: false,
      // materialData: [],
      materialComumns: checkSheetMaterialColumns,
      materialDataBak: [],
      materialData: [],
      // 不良信息
      // badInfoLoading: false,
      // badInfoData: [],
      // BadInfoColumns: checkSheetBadInfoColumns,
      badData: [], // 不良数据回填
      defectEntities: [],
      badDataResponsse: [],

      // 附件列表
      attachmentData: [],

      // 检验范围
      checkAreaList: [],

      saveAndBackConfig: false,
      approveConfig: {}, // 审批配置
      approveStatus: { type: '', text: '' }, // 审批状态
      showPendingApprove: false, // 是否显示待审批
      showApprove: false, // 是否显示审批
      approvalApi: {
        api: approve, // 审批接口
        paramsKey: 'inspectionSheetCode' // 接口参数名
      },
      saveLock: false,
      receiptOrderVisible: false, // 采购收料单
      purchaseOrderVisible: false, // 采购订单
      completeClickShow: false, // 完成按钮显示表示
      researchReviewClickShow: false, // 研发复核按钮显示表示
      reviewClickShow: false, // 复核按钮显示表示
      authorizeClickShow: false, // 核准按钮显示表示
      inspectConfig: {},
      detailData: {}, // 用于保存详情数据
      serialCodeListUpdate: [],
      decisionStateList: [], // 决策表
      // decisionList: [],
      // decisionDialogVisible: false
      relatedOrderVisible: false,
      selectDialogConfig: {},
      disabledDecisionSate: false,
      statusIsComplete: false
    }
  },
  computed: {
    ...mapGetters(['componentNameList']),
    isDisableStatus() {
      return !!this.approveStatus.text
    }
  },
  watch: {
    'baseInfo.materialId'(nVal) {
      this.baseInfo.qualityInspectionSchemeName = ''
      this.qualityInspectionSchemeNameList = []
      this.checkPlanDataList = []
      if (nVal) {
        this.getInspectsheetsGetQualitySchemes(nVal)
      }
    },
    qualityInspectionSchemeNameList(nVal) {
      this.materialData = [
        {
          ...this.materialData[0],
          qualitySchemeOptions: nVal
        }
      ]
    }
  },

  async created() {
    if (this.$route.query) {
      // this.activeName = this.$route.query.name
      this.id = this.$route.query.id
      this.current = this.$route.query.current
      this.size = this.$route.query.size
    }
    // 先获取审批配置
    const [err, resData] = await this.$to(getApproveConfig({ code: 'inspectionSheet' }))
    // console.log('审批配置 -> ', err, resData)
    if (!err) {
      const { code, data } = resData.data
      if (code === '200') {
        this.approveConfig = data
        // console.log('审批配置 -> ', this.approveConfig)
      }
    }
    this.getCheckUnitStatus()
    this.getCheckUnitType()
    this.getCheckType()
    this.getCheckCode()
    this.getCheckPerson()
    this.getCheckStatus()
    this.definitionList()
    this.checkArea()
    this.getBadScriptList(this.$route.query.id)
    this.getSaveAndBackConfig()
    this.getBtnClick()
    // 配置信息
    this.getInspectConifg()
    this.getClassification()
    this.getBaseDecisionList()
    this.getSecondCheckTypeFn()
  },
  methods: {
    // 二次检验类型获取
    getSecondCheckTypeFn() {
      getSecondCheckType().then(res => {
        if (res.data.code === '200') {
          this.secondCheckTypeList = res.data.data
          console.log('二次检验类型 -> ', this.secondCheckTypeList)
        } else {
          this.$notify({
            title: '错误',
            message: res.data.message || '获取二次检验类型失败',
            type: 'error'
          })
        }
      })
    },
    async hdMaterialFormData(data, pictures, type = 'add') {
      console.log(' -> ', data, pictures)
      if (pictures) {
        this.attachmentData = pictures
      }
      const {
        materialFields: { code, name, standard, comp, id: materialId, remark },
        materialRowId,
        barCode,
        planQuantity,
        workOrderNumber,
        inspectionSheetCode,
        inspectionSchemeId,
        skuId
      } = data
      // console.log('materialFields -> ', order)
      console.log('materialid -> ', materialId)
      // const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
      // 物料信息表数据
      this.materialData = [
        {
          relateOrderMaterialRowId: materialRowId,
          materialCode: code,
          name,
          standard,
          comp,
          materialId,
          inspectionSchemeId,
          acceptanceQualityLimit: '',
          inspectionLevel: '',
          strictLevel: '正常',
          qualitySchemeOptions: this.qualityInspectionSchemeNameList,
          materialBatch: barCode,
          originalQuantity: planQuantity,
          samplingQuantity: '',
          qualifiedQuantity: '',
          unqualifiedQuantity: '',
          checkResult: '',
          remark: '',
          materialRemark: remark,
          workOrderNumber,
          skuId,
          inspectionSheetType: this.baseInfo.inspectionSheetType,
          inspectionSheetCode
          // documentType: this.baseInfo.documentType // 将生产关联单据类型也传入, 用于请求批次号时使用
        }
      ]
    },
    getWorkOrderNumber(row) {
      console.log(row, 'row')
      const keyMap = new Map()

      const keyArr = [
        {
          key: 1,
          requestKey: 'workOrderNumber'
        },
        {
          key: 2,
          requestKey: 'purchaseCode'
        },

        {
          key: 3,
          requestKey: 'receiptCode'
        },
        {
          key: 4,
          requestKey: 'orderNumber'
        },

        {
          key: 5,
          requestKey: 'orderNumber'
        },
        {
          key: 6,
          requestKey: 'inspectionSheetCode'
        }
      ]

      keyArr.forEach(i => {
        keyMap.set(i.key, i.requestKey)
      })
      const { documentType } = this.baseInfo
      return row[keyMap.get(documentType)]
    },
    // 二次检验单,退料单领料单点击后处理
    hdSelectDialogConfirm(row) {
      console.log('点击后的数据 -> ', row)
      // this.workOrderParams = order
      this.hdMaterialFormData(row)
      // const workOrderNumber = order.workOrderNumber
      // this.baseInfo.materialId = order.materialId || order.materialFields.id
      // this.baseInfo.workOrderNumber = workOrderNumber
      // this.baseInfo.productOrderNumber = order.productOrderNumber
      // const materialCode = order.materialFields.code
      // const materialStandard = order.materialFields.standard
      // const materialName = order.materialFields.name

      const {
        // workOrderNumber,
        materialId,
        materialFields,
        // productOrderNumber,
        customerCode,
        customerName,
        supplierCode,
        supplierName
      } = row

      // const materialCode = materialFields.code
      // const materialStandard = materialFields.standard
      // const materialName = materialFields.name
      this.baseInfo.workOrderNumber = this.getWorkOrderNumber(row)
      this.baseInfo = {
        ...this.baseInfo,
        materialId: materialId || materialFields.id,
        // workOrderNumber,
        // productOrderNumber,
        customerCode,
        customerName,
        supplierCode,
        supplierName
      }
      this.relatedOrderVisible = false
    },
    // 获取基础信息决策列表
    getBaseDecisionList() {
      baseDecisionList().then(res => {
        console.log('决策列表 -> ', res)
        if (res.data.code === '200') {
          this.decisionStateList = res.data.data
        }
      })
    },
    getQualityInspectionSchemeId(val) {
      // console.log('送检单id -> ', val)
      this.baseInfo.qualityInspectionSchemeId = val
    },
    getClassification() {
      getClassification().then(res => {
        console.log('抽检分类 -> ', res)
        if (res.data.code === '200') {
          this.classificationList = res.data.data
        }
      })
    },
    // 处理流水码
    hdserialCodeList(codeList) {
      console.log('code list -> ', codeList)
      this.serialCodeListUpdate = codeList
    },
    async handleConfirmMaterial(value, type) {
      if (type === 'purchaseReceipt') {
        const {
          receiptCode,
          materialFields: { code, name, standard, comp, id: materialId },
          materialRowId,
          barCode,
          recepitNum,
          supplierName,
          supplierCode,
          purchaseBatchNumber
        } = value
        // this.baseForm.purchaseReceiptNumber = receiptCode
        // this.baseForm.purchaseOrderNumber = ''
        // this.baseForm.supplierName = supplierName
        // this.baseForm.supplierCode = supplierCode
        this.baseInfo.workOrderNumber = receiptCode
        this.baseInfo.supplierName = supplierName
        this.baseInfo.supplierCode = supplierCode
        const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
        this.$refs['material-form'].receiveMaterial([
          {
            relateOrderMaterialRowId: materialRowId,
            workOrderNumber: receiptCode,
            materialCode: code,
            name,
            standard,
            comp,
            materialId,
            inspectionSchemeId: '',
            acceptanceQualityLimit: '',
            inspectionLevel: '',
            strictLevel: '正常',
            qualitySchemeOptions,
            materialBatch: barCode,
            purchaseBatchNumber,
            originalQuantity: recepitNum,
            samplingQuantity: '',
            qualifiedQuantity: '',
            unqualifiedQuantity: '',
            checkResult: '',
            remark: '',
            supplierName,
            supplierCode
          }
        ])

        this.receiptOrderVisible = false
      } else if (type === 'purchase') {
        const {
          purchaseCode,
          materialFields: { code, name, standard, comp, id: materialId },
          requestMaterialEntities,
          supplierName,
          supplierCode
        } = value
        // this.baseForm.purchaseReceiptNumber = ''
        // this.baseForm.purchaseOrderNumber = purchaseCode
        // this.baseForm.supplierName = supplierName
        // this.baseForm.supplierCode = supplierCode
        this.baseInfo.workOrderNumber = purchaseCode
        this.baseInfo.supplierName = supplierName
        this.baseInfo.supplierCode = supplierCode
        const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
        this.$refs['material-form'].receiveMaterial([
          {
            relateOrderMaterialRowId: requestMaterialEntities[0].id,
            workOrderNumber: purchaseCode,
            materialCode: code,
            name,
            standard,
            comp,
            materialId,
            inspectionSchemeId: '',
            acceptanceQualityLimit: '',
            inspectionLevel: '',
            strictLevel: '正常',
            qualitySchemeOptions,
            materialBatch: '',
            originalQuantity: requestMaterialEntities[0]?.planNum,
            samplingQuantity: '',
            qualifiedQuantity: '',
            unqualifiedQuantity: '',
            checkResult: '',
            remark: '',
            supplierName,
            supplierCode
          }
        ])

        this.purchaseOrderVisible = false
      } else {
        const {
          materialFields: { code, name, standard, comp, id: materialId }
        } = value
        const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
        this.$refs['material-form'].receiveMaterial([
          {
            relateOrderMaterialRowId: '',
            materialCode: code,
            name,
            standard,
            comp,
            materialId,
            inspectionSchemeId: '',
            acceptanceQualityLimit: '',
            inspectionLevel: '',
            strictLevel: '正常',
            qualitySchemeOptions,
            materialBatch: '',
            originalQuantity: '',
            samplingQuantity: '',
            qualifiedQuantity: '',
            unqualifiedQuantity: '',
            checkResult: '',
            remark: ''
          }
        ])
        this.showMaterialDialog = false
      }
    },
    handleWorkOrderClick() {
      // this.workOrderDialogVisible = true
      // if (this.baseInfo.documentType === 1) {
      //   this.workOrderDialogVisible = true
      // } else if (this.baseInfo.documentType === 2) {
      //   this.purchaseOrderVisible = true
      // } else {
      //   this.receiptOrderVisible = true
      // }
      console.log('this.baseInfo.documentType -> ', this.baseInfo.documentType)
      switch (this.baseInfo.documentType) {
        case 1:
          this.workOrderDialogVisible = true
          break
        case 2:
          this.purchaseOrderVisible = true
          break
        case 3:
          this.receiptOrderVisible = true
          break
        case 4:
          this.relatedOrderVisible = true
          this.selectDialogConfig = {
            title: '生产领料单',
            extraParams: {
              state: '1,2',
              showType: 'material',
              inOrOutType: 'workOrderTakeOut'
            },
            columns: COLUMNS.productPickMaterial,
            requestConfig: {
              url: '/wms/stocks/output/list',
              method: 'post'
            }
          }
          break
        // 生产补料单
        case 5:
          this.relatedOrderVisible = true
          this.selectDialogConfig = {
            title: '生产补料单',
            extraParams: {
              state: '1,2',
              showType: 'material',
              inOrOutType: 'workOrderSupplement,workConsumeOut'
            },
            columns: COLUMNS.productPatchMaterial,
            requestConfig: {
              url: '/wms/stocks/output/list',
              method: 'post'
            }
          }
          break
        // 送检单
        case 6:
          this.relatedOrderVisible = true
          this.selectDialogConfig = {
            title: '送检单',
            extraParams: {
              state: '2,3'
            },
            columns: COLUMNS.checkOrder,
            requestConfig: {
              url: '/qms/inspectsheets/page',
              method: 'post'
            },
            arrayKey: 'inspectionSheetMaterialEntities'
          }
          break
        default:
          this.selectDialogConfig = {}
          break
      }
    },
    // 配置信息
    getInspectConifg() {
      inspectConfigDetail().then(res => {
        const { data, code } = res.data
        if (+code === 200) {
          this.inspectConfig = data
        }
      })
    },
    // 权限
    getBtnClick() {
      this.getCompleteFlag()
      this.getResearchReviewBtnClick()
      this.getReviewBtnClick()
      this.getAuthorizeBtnClick()
    },
    // 获取完成标识
    getCompleteFlag() {
      btnCompleteClick(this.id).then(res => {
        const { code, data } = res.data
        if (+code === 200) {
          this.completeClickShow = data

          // 如果“完成”权限接口返回false不允许点击
          if (!this.completeClickShow) {
            if (this.checkStatusList.length >= 3) {
              this.checkStatusList[2].disabled = true
            }
          }
        }
      })
    },
    // 研发复核权限
    getResearchReviewBtnClick() {
      btnProcessStatusClick({ sheetId: this.id, processStatus: 'researchReview' }).then(res => {
        const { code, data } = res.data
        if (+code === 200) {
          this.researchReviewClickShow = data
        }
      })
    },
    // 复核的权限
    getReviewBtnClick() {
      btnProcessStatusClick({ sheetId: this.id, processStatus: 'review' }).then(res => {
        const { code, data } = res.data
        if (+code === 200) {
          this.reviewClickShow = data
        }
      })
    },
    // 核准的权限
    getAuthorizeBtnClick() {
      btnProcessStatusClick({ sheetId: this.id, processStatus: 'authorize' }).then(res => {
        const { code, data } = res.data
        if (+code === 200) {
          this.authorizeClickShow = data
        }
      })
    },
    // 核准
    handleAuthorizeClick() {
      this.$refs?.authorizeInfo?.show()
    },
    hdcloseApprove() {
      this.back()
    },
    hdApprove() {
      // console.log('审批点击了')
      this.$refs.approvalDialog.openApprovalDialog()
    },
    hdPendingApprove() {
      submitApprove({
        inspectionSheetCode: this.baseInfo.inspectionSheetCode
      }).then(res => {
        if (res.data.code === '200') {
          this.$notify({
            title: '提示',
            message: '提交审批成功',
            type: 'success',
            duration: 2000
          })
          this.getCheckUnitStatus()
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
    hdApproveConfig(status, approvalStatus) {
      const { finishControl, isApprove, releasedControl } = this.approveConfig
      if (!isApprove) return
      // status = 1 是创建状态
      if (status === 1) {
        // 创建状态需要查看 releasedControl 是否为 true
        if (releasedControl) {
          this.getApproveStatus(approvalStatus)
          // 如果开启了生效控制,则需要查查看审批状态
          // approvalStatus = 2 是已经审批完成状态
          // 不需要再审批
          if (approvalStatus === 2) return
          this.showPendingApprove = false
          this.showApprove = false
          // approvalStatus = 1 是待审批状态
          if (approvalStatus === 1) {
            // 需要显示审批按钮
            if (isApprove === 1) {
              this.showApprove = true
            }
          } else {
            // 其他情况下需要显示待审批按钮
            this.showPendingApprove = true
          }
        }
      }

      // status = 2 是生效状态
      if (status === 2) {
        // 生效状态需要查看 finishControl 是否为 true
        if (finishControl) {
          this.getApproveStatus(approvalStatus)
          // 如果开启了完成控制,则需要查查看审批状态
          // approvalStatus = 2 是已经审批完成状态
          // 不需要再审批
          // if (approvalStatus === 2) return
          this.showPendingApprove = false
          this.showApprove = false
          // approvalStatus = 1 是待审批状态
          if (approvalStatus === 1) {
            // 注意,只有开启系统内部审批权限才能显示审批按钮
            if (isApprove === 1) {
              this.showApprove = true
            }
          } else {
            // 其他情况下需要显示待审批按钮
            this.showPendingApprove = true
          }
        }
      }
    },
    getApproveStatus(status) {
      // console.log('status -> ', status)
      switch (status) {
        case 0:
          this.approveStatus = { type: 'danger', text: '待提交' }
          break
        case 1:
          this.approveStatus = { type: 'warning', text: '待审批' }
          break
        case 2:
          this.approveStatus = { type: 'success', text: '已审批' }
          break
        case 3:
          this.approveStatus = { type: 'info', text: '已驳回' }
          break
      }
    },
    // 获取保存是否返回配置
    async getSaveAndBackConfig() {
      const {
        data: {
          code,
          data: { valueList },
          message
        }
      } = await getSaveAndBackConfig({
        fullPathCode: 'general.saveAndBackConfig'
      })
      if (code === '200') {
        this.saveAndBackConfig =
          JSON.parse(valueList[0].value) && (JSON.parse(valueList[1].value) || []).includes('qualityInspection')

        // console.log('valueList', valueList, this.saveAndBackConfig)
      } else {
        this.$notify({
          title: '告警',
          message: message || '获取配置失败',
          type: 'error',
          duration: 2000
        })
      }
    },
    getBadData(val) {
      // console.log('不良数据 -> ', val)
      this.badDataResponsse = val
    },
    hdMaterialData() {
      const deleteKeys = ['name', 'standard', 'comp', 'qualitySchemeOptions']
      const material = JSON.parse(JSON.stringify(this.$refs['material-form'].materialForm.tableData))[0]
      deleteKeys.forEach(key => {
        delete material[key]
      })

      return [material]
    },
    hdAttachment() {
      const arr = []
      const attachments = JSON.parse(JSON.stringify(this.$refs['attachment-list'].attachments))
      attachments.forEach(i => {
        i.tableData.forEach(si => {
          delete si.createUserName
          delete si.createTime
          arr.push({
            type: i.type,
            typeCode: i.typeCode,
            ...si
          })
        })
      })

      return arr
    },
    typeis(strictLevel) {
      // console.log('this.materialDataBak[0]', this.materialDataBak[0])
      if (strictLevel === '正常') {
        return 0
      }
      if (strictLevel === '加严') {
        return 1
      }
      if (strictLevel === '放宽') {
        return 2
      }
    },
    // async aqlBtnClick() {
    //   const {
    //     originalQuantity,
    //     inspectionLevel,
    //     acceptanceQualityLimit,
    //     strictLevel,
    //     unqualifiedQuantity
    //   } = this.materialDataBak[0]
    //   const {
    //     data: {
    //       data: { ac, re, sampleNum }
    //     }
    //   } = await aqlCalculate({
    //     scopeNum: originalQuantity,
    //     unqualified: unqualifiedQuantity,
    //     inspectionLevel: inspectionLevel,
    //     aqlValue: acceptanceQualityLimit,
    //     type: this.typeis(strictLevel)
    //   })
    //   this.materialData = [
    //     {
    //       ...this.materialDataBak[0],
    //       acValue: ac,
    //       reValue: re,
    //       samplingQuantity: sampleNum,
    //       qualitySchemeOptions: this.qualityInspectionSchemeNameList
    //     }
    //   ]
    //   // console.log('this.materialData', this.materialData)
    // },
    // 新 AQL计算
    aqlCalculation() {
      if (!this.materialDataBak[0]) return
      const { originalQuantity = null, inspectionSchemeId = null } = this.materialDataBak[0]
      console.log('新 AQL 参数 -> ', originalQuantity, inspectionSchemeId)
      // if (originalQuantity) {
      //   return
      // }
      if (!originalQuantity || !inspectionSchemeId) {
        return
      }
      const params = {
        num: originalQuantity,
        schemeId: inspectionSchemeId
      }
      getStandardData(params).then(res => {
        if (res.data.code === '200') {
          console.log('检验标准数据 -> ', res)
          const data = res.data.data
          // 找出最大的抽样数量
          let checkNum = 0
          data?.forEach(item => {
            checkNum = Math.max(checkNum, item.checkNum)
          })
          this.materialData = [{ ...this.materialDataBak[0], samplingQuantity: checkNum }]
          this.standardTableData = data
          console.log('标准数据 -> ', this.standardList)
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // translateType(type) {
    //   switch (type) {
    //     case 'fatal':
    //       return 'Cr 致命缺陷'
    //     case 'main':
    //       return 'Ma 严重缺陷'
    //     case 'secondary':
    //       return 'Mi 次要缺陷'
    //   }
    // },
    materialUpdate(materailData) {
      console.log('materailData', materailData)
      // 物料信息内列表的数据更新后，保存一份到父组件，以备点击AQL计算按钮时
      // 更新 materialData 数据，保证更新 ac re 的同时，不会更改到已经填写的数据
      this.materialDataBak = materailData
      // this.aqlCalculation()
    },
    checkArea() {
      checkArea().then(res => {
        const {
          data: { code, data }
        } = res
        if (code === '200') {
          this.checkAreaList = data
        }
      })
    },
    isString(str) {
      return !!(str && typeof str === 'string')
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
    definitionList() {
      definitionList().then(res => {
        const {
          data: {
            code,
            data: { records }
          }
        } = res
        if (code === '200') {
          this.resultList = records
        }
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
    // 3.获取送检状态下拉
    getCheckUnitStatus() {
      getCheckUnitStatus().then(res => {
        if (res.data.code === '200') {
          this.checkStatusList = res.data.data
          this.checkSheetDetail()
        }
      })
    },
    // 4.获取关联单据类型
    getCheckUnitType() {
      getCheckUnitType().then(res => {
        if (res.data.code === '200') {
          this.checkTypeList = res.data.data
          this.filterCheckTypeList()
        }
      })
    },
    getBadScriptList(id) {
      getBadScriptList(id).then(res => {
        this.defectEntities = res?.data?.data ?? []
        // console.log(' defectEntities -> ', this.defectEntities)
      })
    },
    // 获取检验方案
    getInspectsheetsGetQualitySchemes(materialId) {
      // console.log('materialId 2  ->', materialId)
      const params = {
        id: materialId,
        inspectionSheetType: this.baseInfo.inspectionSheetType,
        workOrderNumber: this.baseInfo.workOrderNumber
      }
      getInspectsheetsGetQualitySchemes(params).then(res => {
        if (res.data.code === '200') {
          // console.log('res.data.data -> ', res.data.data)
          this.qualityInspectionSchemeNameList = res.data.data
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 5.获取送检单类型
    getCheckType() {
      getCheckType().then(res => {
        if (res.data.code === '200') {
          this.unitTypeList = res.data.data
        }
      })
    },
    filterCheckTypeList() {
      this.checkTypeList.forEach(item => {
        // inspectionSheetType = 5 表示 送检类型 是 来料检验
        if (this.baseInfo.inspectionSheetType === 5) {
          // 关联单据只能选择采购订单(code = 2)和采购收料单(code = 3)
          if (item.code === 2 || item.code === 3) {
            item.show = true
          } else {
            item.show = false
          }
          if (this.baseInfo.documentType !== 2) {
            this.baseInfo.documentType = 2
          }
          // inspectionSheetType = 9 表示 送检类型 是 生产退料检验
        } else if (this.baseInfo.inspectionSheetType === 9) {
          // 关联单据只能选择生产领料单(code = 4)和生产补料单(code = 5)
          if (item.code === 4 || item.code === 5) {
            item.show = true
          } else {
            item.show = false
          }
          if (this.baseInfo.documentType !== 4) {
            this.baseInfo.documentType = 4
          }
          // inspectionSheetType = 10 表示 送检类型 是 二次检验
        } else if (this.baseInfo.inspectionSheetType === 10) {
          // 关联单据只能选择检验单(code = 6)
          if (item.code === 6) {
            item.show = true
          } else {
            item.show = false
          }
          this.baseInfo.documentType = 6
        } else {
          // 其他情况, 默认关联单据都是工单
          if (item.code === 1) {
            item.show = true
          } else {
            item.show = false
          }
          this.baseInfo.documentType = 1
        }
      })
    },
    // 切换送检单类型
    changeType(val) {
      this.filterCheckTypeList()
      // 过程检验1，成品检验2
      // 如果 过程检验 则获取检验方案，物料数据， 填写物料内容
      // 如果 成品检验 则获取物料单号，填写物料内容
      if (val === 2) {
        this.flag = true
        this.$set(this.baseInfo, 'materialId', this.workOrderParams.materialId)
        this.$set(this.baseInfo, 'materialCode', this.workOrderParams.materialCode)
        this.$set(this.baseInfo, 'materialStandard', this.workOrderParams.materialStandard)
        this.$set(this.baseInfo, 'materialName', this.workOrderParams.materialName)
      } else {
        this.flag = false
        this.getProcessMaterialInfo({
          materialCode: this.workOrderParams?.materialCode ?? ''
        })
      }
    },
    changeBarCode(val) {
      const params = {
        code: val
      }
      getCheckSheetBarCode(params).then(res => {
        if (res.data.code === '200') {
          // this.$notify({
          //   title: '成功',
          //   message: res.data.message,
          //   type: 'success',
          //   duration: 1000
          // })
        } else {
          this.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success',
            duration: 1000
          })
        }
      })
    },
    getWorkOrderParams() {
      if (!this.checkCodeList.length || !this.baseInfo.workOrderNumber) return
      this.workOrderParams = this.checkCodeList.find(item => item.workOrderNumber === this.baseInfo.workOrderNumber)
    },
    // 6.获取关联单据编码
    getCheckCode() {
      getCheckCode().then(res => {
        if (res.data.code === '200') {
          this.checkCodeList = res.data.data
          this.getWorkOrderParams()
        }
      })
    },
    // async getQualitySchemeOptions(id) {
    //   // console.log('id 1 -> ', id)
    //   const {
    //     data: { code, data }
    //   } = await qualitySchemes({ id, inspectionSheetType: this.baseInfo.inspectionSheetType })
    //   if (code === '200') {
    //     return data
    //   } else {
    //     return []
    //   }
    // },
    // 选择生产订单
    async handleConfirmProductOrder(order) {
      this.workOrderParams = order

      // 物料信息表数据组装
      // const { code, comp, name, standard } = order.materialFields
      const {
        materialFields: { code, name, standard, comp, id: materialId },
        materialRowId,
        barCode,
        planQuantity,
        inspectionSchemeName,
        // workOrderNumber,
        // inspectionSheetId
        skuId
      } = order
      // console.log('order 数据 -> ', order)
      // const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
      this.$refs['material-form'].receiveMaterial([
        {
          relateOrderMaterialRowId: materialRowId,
          materialCode: code,
          name,
          standard,
          comp,
          materialId,
          inspectionSchemeId: '',
          inspectionSchemeName,
          acceptanceQualityLimit: '',
          inspectionLevel: '',
          strictLevel: '正常',
          qualitySchemeOptions: this.qualityInspectionSchemeNameList,
          materialBatch: barCode,
          originalQuantity: planQuantity,
          samplingQuantity: '',
          qualifiedQuantity: '',
          unqualifiedQuantity: '',
          checkResult: '',
          remark: '',
          workOrderNumber: this.baseInfo.workOrderNumber,
          inspectionSheetId: this.baseInfo.inspectionSheetId,
          skuId
        }
      ])

      const workOrderNumber = order.workOrderNumber
      this.baseInfo.materialId = order.materialId || ''
      this.baseInfo.workOrderNumber = workOrderNumber
      this.baseInfo.productOrderNumber = order.productOrderNumber
      const materialCode = order.materialCode
      const materialStandard = order.materialStandard
      const materialName = order.materialName
      if (!this.baseInfo.inspectionSheetType) {
        this.$notify({
          title: '警告',
          message: '请先选择送检类型',
          type: 'warning',
          duration: 1000
        })
      } else if (
        this.baseInfo.inspectionSheetType === 1 ||
        this.baseInfo.inspectionSheetType === 3 ||
        this.baseInfo.inspectionSheetType === 4 ||
        this.baseInfo.inspectionSheetType === 8
      ) {
        // 过程检验获取半成品物料信息
        const query = {
          materialCode: materialCode
        }
        this.getProcessMaterialInfo(query)
      } else if (this.baseInfo.inspectionSheetType === 2) {
        this.$set(this.baseInfo, 'materialCode', materialCode)
        this.$set(this.baseInfo, 'materialStandard', materialStandard)
        this.$set(this.baseInfo, 'materialName', materialName)
      }
      // 根据工单号查询批次号
      this.getBarCode(workOrderNumber)

      this.workOrderDialogVisible = false
    },
    changeQualityInspectionSchemeName(val) {
      const qualityInspectionSchemeItem = this.qualityInspectionSchemeNameList.find(
        item => item.qualityInspectionSchemeName === val
      )
      if (qualityInspectionSchemeItem) {
        this.getCheckPlanList(qualityInspectionSchemeItem.qualityInspectionSchemeId)
      }
    },
    async handleConfirmWorkOrder(order) {
      this.workOrderParams = order

      // 物料信息表数据组装
      // const { code, comp, name, standard } = order.materialFields
      const {
        materialFields: { code, name, standard, comp, id: materialId },
        materialRowId,
        barCode,
        planQuantity,
        inspectionSchemeName,
        // workOrderNumber,
        // inspectionSheetId
        skuId
      } = order
      // console.log('order 数据 -> ', order)
      // const qualitySchemeOptions = await this.getQualitySchemeOptions(materialId)
      this.$refs['material-form'].receiveMaterial([
        {
          relateOrderMaterialRowId: materialRowId,
          materialCode: code,
          name,
          standard,
          comp,
          materialId,
          inspectionSchemeId: '',
          inspectionSchemeName,
          acceptanceQualityLimit: '',
          inspectionLevel: '',
          strictLevel: '正常',
          qualitySchemeOptions: this.qualityInspectionSchemeNameList,
          materialBatch: barCode,
          originalQuantity: planQuantity,
          samplingQuantity: '',
          qualifiedQuantity: '',
          unqualifiedQuantity: '',
          checkResult: '',
          remark: '',
          workOrderNumber: this.baseInfo.workOrderNumber,
          inspectionSheetId: this.baseInfo.inspectionSheetId,
          skuId
        }
      ])

      const workOrderNumber = order.workOrderNumber
      this.baseInfo.materialId = order.materialId || ''
      this.baseInfo.workOrderNumber = workOrderNumber
      this.baseInfo.productOrderNumber = order.productOrderNumber
      const materialCode = order.materialCode
      const materialStandard = order.materialStandard
      const materialName = order.materialName
      if (!this.baseInfo.inspectionSheetType) {
        this.$notify({
          title: '警告',
          message: '请先选择送检类型',
          type: 'warning',
          duration: 1000
        })
      } else if (
        this.baseInfo.inspectionSheetType === 1 ||
        this.baseInfo.inspectionSheetType === 3 ||
        this.baseInfo.inspectionSheetType === 4 ||
        this.baseInfo.inspectionSheetType === 8
      ) {
        // 过程检验获取半成品物料信息
        const query = {
          materialCode: materialCode
        }
        this.getProcessMaterialInfo(query)
      } else if (this.baseInfo.inspectionSheetType === 2) {
        this.$set(this.baseInfo, 'materialCode', materialCode)
        this.$set(this.baseInfo, 'materialStandard', materialStandard)
        this.$set(this.baseInfo, 'materialName', materialName)
      }
      // 根据工单号查询批次号
      this.getBarCode(workOrderNumber)

      this.workOrderDialogVisible = false
    },
    // changeQualityInspectionSchemeName(val) {
    //   const qualityInspectionSchemeItem =
    //     this.qualityInspectionSchemeNameList.find(
    //       item => item.qualityInspectionSchemeName === val
    //     )
    //   if (qualityInspectionSchemeItem) {
    //     this.getCheckPlanList(
    //       qualityInspectionSchemeItem.qualityInspectionSchemeId
    //     )
    //   }
    // },
    // 7.根据物料id查询列表检验方案
    getCheckPlanList(id) {
      const params = {
        current: this.current,
        size: this.size,
        id: id
      }
      getCheckPlanList(params).then(res => {
        if (res.data.code === '200') {
          this.baseInfo.qualityInspectionSchemeId = res.data.data.qualityInspectionSchemeId
          const planList = res.data.data.page.records || []
          this.checkPlanDataList = planList.map(item => item.inspectionItemEntity)
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 8.编辑页获取详情
    checkSheetDetail() {
      checkSheetDetail(this.id).then(res => {
        if (res.data.code === '200') {
          const { data } = res.data
          this.detailData = res.data.data
          console.log('详情 data -> ', data)
          // 物料信息表数据
          this.materialData = data.inspectionSheetMaterialEntities.map(item => {
            const { comp, name, standard, remark } = item.materialFields
            return {
              ...item,
              comp,
              name,
              standard,
              // materialBatch: data.barCode,
              workOrderNumber: data.workOrderNumber,
              inspectionSheetId: data.inspectionSheetId,
              qualitySchemeOptions: this.qualityInspectionSchemeNameList,
              materialRemark: remark,
              inspectionSchemeId: data.inspectionSchemeId,
              inspectionSheetType: data.inspectionSheetType,
              inspectionSheetCode: data.inspectionSheetCode,
              orderNumber: data.workOrderNumber
            }
          })

          // 不良信息表数据
          this.badData = data.inspectionSheetDefectEntities || []

          // 附件列表信息数据
          this.attachmentData = data.inspectionPictures

          this.checkInfoData = data.qualityInspectionSchemeEntities?.page?.records
          this.detectionInfo = data
          // this.serialCodeList = data.serialCodeList || []
          // console.log('流水码是啥 -> ', this.serialCodeList)
          const {
            approvalStatus,
            inspectionSheetCode,
            inspectScope,
            inspectionSheetType,
            // inspectionSchemeId,
            inspectionPerson,
            status,
            reviewResult,
            reviewByName,
            reviewTime,
            reviewResultName,
            reviewRemark,
            authorizeResult,
            authorizeByName,
            authorizeTime,
            authorizeResultName,
            authorizeRemark,
            researchReviewFlag,
            reviews,
            conclusion,
            inspectionResult,
            examineCount,
            inspectorName,
            correctiveMeasures,
            customerCode,
            customerName,
            supplierCode,
            supplierName,
            serialCodeList,
            samplingClassification,
            inspectionSheetDecisionEntities,
            inspectionSheetMaterialEntities,
            decisionState,
            secondaryInspectionType
            // workOrderNumber
          } = data

          Object.assign(this.baseInfo, {
            inspectionSheetCode,
            inspectScope: inspectScope === 1 ? '全检' : '抽检',
            inspectionSheetType,
            inspectionPerson,
            status,
            reviewResult,
            reviewByName,
            reviewTime,
            reviewResultName,
            reviewRemark,
            reviews,
            authorizeResult,
            authorizeByName,
            authorizeTime,
            authorizeResultName,
            authorizeRemark,
            researchReviewFlag,
            conclusion,
            inspectionResult,
            examineCount,
            inspectorName,
            correctiveMeasures,
            customerCode,
            customerName,
            supplierCode,
            supplierName,
            serialCodeList,
            samplingClassification,
            inspectionSheetDecisionEntities,
            decisionState,
            inspectionSheetSampleEntities: inspectionSheetMaterialEntities[0]?.inspectionSheetSampleEntities || [],
            secondaryInspectionType
          })
          if (decisionState === 'alreadyDecision') {
            this.disabledDecisionSate = true
          }
          if (status === 3) {
            this.statusIsComplete = true
          }
          this.initStatus = status
          this.reviewResultName = reviewResultName
          this.baseInfo.researchReviewFlag = this.baseInfo.researchReviewFlag === 1
          console.log('this.baseInfo.researchReviewFlag', this.baseInfo.researchReviewFlag)

          // this.getApproveStatus(approvalStatus)
          console.log('送检状态 -> ', status, approvalStatus, this.approveConfig, this.baseInfo)
          this.hdApproveConfig(status, approvalStatus)

          // 设置批号是否必填
          if (data.inspectionSheetType === 2) {
            this.flag = true
          } else {
            this.flag = false
            this.getProcessMaterialInfo(
              {
                materialCode: data.materialCode
              },
              false
            )
          }

          const extend = JSON.parse(data.extend)
          if (extend) {
            this.baseInfo.samplingQuantity = extend.samplingQuantity
            this.baseInfo.samplingPerson = extend.samplingPerson
            this.baseInfo.sampQuantity = extend.sampQuantity
            this.baseInfo.productionQuantity = extend.isProductionQuantity ? '' : extend.productionQuantity
            this.baseInfo.isProductionQuantity = extend.isProductionQuantity
            this.customInfo = {
              batchNumber: extend.batchNumber
            }
          }
          if (data.status === 1) {
            // console.log('getInspectsheetsGetQualitySchemes -> ', data)
            const { inspectionSheetMaterialEntities } = data
            console.log('inspectionSheetMaterialEntities[0] -> ', inspectionSheetMaterialEntities[0])
            this.getInspectsheetsGetQualitySchemes(inspectionSheetMaterialEntities[0].materialId)
            if (approvalStatus === 1) {
              this.forbidClick = true
            }
          }
          if (data.status === 2) {
            this.forbidClick = true
            this.customFormConfig.batchNumber.disabled = true
            // debuger
          }
          if (data.status === 4 || data.status === 3) {
            this.checkState = true
            this.forbidClick = true
            this.customFormConfig.batchNumber.disabled = true
          } else {
            this.checkState = false
          }

          this.baseInfo.cloneMaterialId = data.materialId
          this.baseInfo.workOrderNumber = data.workOrderNumber
          this.baseInfo.productOrderNumber = data.productOrderNumber
          this.baseInfo.documentType = data.documentType
          this.baseInfo.materialCode = data.materialCode
          this.baseInfo.materialStandard = data.materialStandard
          this.baseInfo.materialName = data.materialName
          this.baseInfo.barCode = data.barCode
          this.baseInfo.productTime = data.productTime
          this.baseInfo.inspectionTime = data.inspectionTime
          this.baseInfo.samplePoint = data.samplePoint
          this.baseInfo.inspectionSheetId = data.inspectionSheetId
          this.baseInfo.qualityInspectionSchemeId = data.qualityInspectionSchemeId
          this.baseInfo.qualityInspectionSchemeName = data.inspectionSchemeName
          this.baseInfo.remark = data.remark

          // console.log('baseInfo -> ', this.baseInfo)
          this.detailList = data || []
          const template = data.map
          const list = []
          // eslint-disable-next-line no-unused-vars
          for (const i in template) {
            const countList = template[i].map(item => {
              return {
                ...item,
                ...item.inspectionItemEntity
              }
            })
            list.push({ key: i, value: countList })
          }
          this.tableData = list
          this.checkStatusList.forEach(el => {
            if (+el.code < res.data.data.status) {
              el['disabled'] = true
            } else if (res.data.data.status === 1) {
              this.checkStatusList[2].disabled = true
            } else if (res.data.data.status === 4) {
              this.checkStatusList[3].disabled = false
            } else if (res.data.data.status === 2) {
              this.checkStatusList[3].disabled = true
            }
            if (
              res.data.data.inspectionResultStatus === null ||
              res.data.data.inspectionResultStatus === 0 ||
              res.data.data.inspectionResultStatus === 1 ||
              res.data.data.inspectionResultStatus === 4
            ) {
              this.checkStatusList[3].disabled = false
            }
            // 如果“完成”权限接口返回false不允许点击
            if (!this.completeClickShow) {
              this.checkStatusList[2].disabled = true
            }

            console.log('this.completeClickShow', this.completeClickShow, this.checkStatusList)
          })

          this.getWorkOrderParams()
        }
      })
    },
    // 9.获取送检人
    getCheckPerson() {
      getCheckPerson().then(res => {
        if (res.data.code === '200') {
          this.checkPeopleList = res.data.data || []
        }
      })
    },
    // 10.根据工单号获取批次号
    getBarCode(val) {
      const params = {
        materialCode: this.baseInfo.materialCode,
        current: this.current,
        size: this.size
      }
      getBarCode(params, val).then(res => {
        if (res.data.code === '200') {
          this.barCodeList = res.data.data.records || []
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || 'error',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 11. 过程检验获取半成品物料信息
    getProcessMaterialInfo(params, isChangeMaterialId = true) {
      getProcessMaterialInfo(params).then(res => {
        if (res.data.code === '200') {
          this.productMaterialList = res.data.data || []
          if (isChangeMaterialId) {
            this.baseInfo.materialId = this.productMaterialList[0]?.id
          }
          this.baseInfo.materialCode = this.productMaterialList[0]?.code
          this.baseInfo.materialStandard = this.productMaterialList[0]?.standard
          this.baseInfo.materialName = this.productMaterialList[0]?.name
        }
      })
    },
    // 切换物料编号
    changeMaterialCode(val) {
      const code = this.productMaterialList.filter(item => item.code === val)
      this.baseInfo.materialStandard = code[0].standard
      this.baseInfo.materialName = code[0].name
      this.checkPlanDataList = []
    },
    // 点击保存按钮
    async saveInfo(dataForm) {
      // 决策校验
      // console.log('决策校验 -> ', this.$refs.decision)
      let isDecisionPass = true
      this.$refs.decision?.$refs?.decisionForm.validate(valid => {
        if (valid) {
          // console.log('决策校验通过 -> ', this.baseInfo.inspectionSheetDecisionEntities)
          const materialData = this.materialDataBak[0]
          const numTotal = this.baseInfo.inspectionSheetDecisionEntities.reduce((prev, item) => {
            return prev + Number(item.num)
          }, 0)
          console.log('numTotal -> ', numTotal, materialData.originalQuantity)
          if (numTotal > materialData.originalQuantity) {
            isDecisionPass = false
            this.$notify({
              title: '提示',
              message: '决策数量不能大于送检数量',
              type: 'error',
              duration: 2000
            })
            return
          }

          // eslint-disable-next-line no-unused-vars
          for (const item of this.baseInfo.inspectionSheetDecisionEntities) {
            const list = this.baseInfo.inspectionSheetDecisionEntities?.filter(i => i.decision === item.decision) || []
            // console.log('list -> ', list)
            if (list.length >= 2) {
              isDecisionPass = false
              this.$notify({
                title: '提示',
                message: '使用决策不能重复选择',
                type: 'error',
                duration: 2000
              })
              return
            }
          }
          isDecisionPass = true
        } else {
          isDecisionPass = false
          this.$validateConfirm(this.$refs.decision.$refs.decisionForm)
        }
      })
      if (!isDecisionPass) return
      // 只在工单的情况下做校验
      // console.log('this.documentType ->>>>>', this.documentType)
      if (this.baseInfo.documentType === 1) {
        const { workOrderNumber } = this.detailData
        const { inspectionSheetType, inspectionSheetId } = this.baseInfo
        const { materialBatch, originalQuantity } = this.materialDataBak[0]
        const status = await validateInspectNumber({
          workOrderNumber: workOrderNumber,
          inspectionSheetType,
          materialBatchList: [materialBatch].filter(e => e),
          inspectNum: Number(originalQuantity) || 0,
          inspectionSheetId
        })
        // console.log('检查状态是 -> ', status)
        if (status === 2) return
      }
      // 流水码校验
      if (this.baseInfo.inspectionSheetType === 3) {
        const { originalQuantity } = this.materialDataBak?.[0] || {}
        // console.log('送检数量 -> ', originalQuantity, this.serialCodeListUpdate)
        const serialStatus = await checkSerialCodeList(this.serialCodeListUpdate, originalQuantity)
        if (!serialStatus) return
      }
      // console.log(this.$refs.detectionInformation.$refs.newTemplate)
      // newTemplate.save()
      const workOrderNumberItem = this.checkCodeList.find(
        item => item.workOrderNumber === this.baseInfo.workOrderNumber
      )
      const params = {
        ...this.baseInfo,
        researchReviewFlag: this.baseInfo.researchReviewFlag ? 1 : 0,
        materialId: this.baseInfo.materialId ? this.baseInfo.materialId : this.baseInfo.cloneMaterialId,
        lineId: workOrderNumberItem?.lineId,
        inspectionSheetMaterialEntities: this.materialDataBak,
        inspectionPictures: this.hdAttachment(),
        inspectionSheetDefectEntities: this.badDataResponsse,
        serialCodeList: this.serialCodeListUpdate,
        originalInspectionSheetCode: this.baseInfo.workOrderNumber
      }
      this.$refs[dataForm].validate(async valid => {
        if (valid) {
          let extend = {
            productionQuantity: this.baseInfo.productionQuantity,
            samplingQuantity: this.baseInfo.samplingQuantity,
            samplingPerson: this.baseInfo.samplingPerson,
            sampQuantity: this.baseInfo.sampQuantity,
            isProductionQuantity: this.baseInfo.isProductionQuantity
          }
          const componentNameList = this.componentNameList.filter(item => item.supplementaryData === 'inspectSheet')
          if (this.$refs.customInfo && componentNameList && componentNameList.length) {
            const customData = await this.$refs.customInfo.getCustomData()
            if (!customData) return
            extend = Object.assign(extend, customData)
          }
          params.extend = JSON.stringify(extend)
          // 接口
          this.saveLock = true
          editCheckUnit(params)
            .then(async res => {
              if (res.data.code !== '200') {
                this.notify('error', res.data.message || 'error')
                return
              }
              this.notify('success', '编辑成功', '成功')
              this.getBtnClick()
              // 生效后送检状态创建按钮应该置灰
              try {
                // 样次数据保存
                const {
                  detectionInformation: {
                    $refs: { newTemplate }
                  }
                } = this.$refs
                await newTemplate?.save()
                this.saveLock = false
              } catch (err) {
                console.log('样式数据无法保存 -> ', err)
              }
              if (this.saveAndBackConfig) {
                this.back()
              } else {
                // this.checkSheetDetail()
                this.getCheckUnitStatus()
                this.saveLock = false
              }
            })
            .catch(err => {
              console.log('保存接口出错 -> ', err)
              this.saveLock = false
            })

          return
        } else {
          this.$validateConfirm(this.$refs[dataForm])
        }
        console.log('error submit!!')
        return false
      })
    },
    notify(type = 'error', message = 'error', title = '提示', duration = 2000) {
      this.$notify({ title, message, type, duration })
    },
    refreshList() {
      this.checkSheetDetail()
      this.getBtnClick()
    },
    checkBtn() {
      this.$refs?.checkInfo?.show()
    },
    // 研发复核
    recheckNotify() {
      this.$confirm('此操作后送检单进入“研发复核”流程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          inspectionSheetId: this.id,
          researchReviewFlag: 1
        }
        researchReviewFlag(params).then(() => {
          this.$message({
            type: 'success',
            message: '进入研发复核流程成功!'
          })
        })
      })
    },
    handleDisable() {
      const { status, reviewResult } = this.baseInfo
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
  height: calc(100vh - 50px);
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
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
      }
      .info-box {
        height: 100%;
        width: 100%;
        padding: 24px 0 0 0;
        box-sizing: border-box;

        .flex-content {
          width: 100%;
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

            .infounit {
              margin-left: 10px;
            }
          }
        }
      }
      ::v-deep .el-form-item {
        width: 24%;
        .el-form-item__label {
          padding: 0 8px 0 0;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.85);
        }
      }
      ::v-deep .el-form--inline .el-form-item__label {
        text-align: right;
        width: 40%;
      }
      ::v-deep .el-form-item--medium .el-form-item__content {
        width: 58%;
      }
      ::v-deep .el-select {
        width: 100%;
      }
      ::v-deep .el-form-item {
        margin-bottom: 16px;
      }
      ::v-deep .el-form-item--small .el-form-item__content {
        width: 58%;
      }
    }
    .table-info {
      padding: 30px 24px 16px 24px;
      height: auto;
      // overflow: auto;
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
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.save-btn {
  width: 88px;
  height: 32px;
  background: rgba(24, 144, 255, 0.2);
  color: #1890ff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    margin-right: 8px;
  }
}
.bom-actions {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  div {
    margin-right: 30px;
    font-size: 14px;
  }
}
.btn-add {
  width: 123px;
  height: 32px;
  font-size: 14px;
  background: rgba($color: #1890ff, $alpha: 0.2);
  line-height: 24px;
  color: #1890ff;
  margin-left: 8px;
  padding: 8px 18px;
  margin-top: 16px;
  cursor: pointer;
  .add-img {
    margin-right: 8px;
  }
}
::v-deep .el-form-item--small .el-form-item__error {
  width: 150px;
}
::v-deep .el-select-dropdown__item.selected {
  color: #606266;
  font-weight: normal;
}
.delete-text {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #ff4949;
  border-radius: 4px;
  opacity: 1;
  padding: 0 3px;
  cursor: pointer;
}
.numberdialog .el-form-item {
  width: 100%;
}
::v-deep .el-transfer-panel {
  width: 360px !important;
}
::v-deep .el-dialog__body {
  padding-bottom: 70px;
}
.operate-box {
  float: right;
  margin-top: 20px;
}
::v-deep .el-form-item__label {
  text-align: left;
}
.view {
  color: #1890ff;
  cursor: pointer;
}
.tab-page {
  box-sizing: border-box;
  padding: 20px;
  position: relative;
}
.result-page {
  box-sizing: border-box;
  padding: 25px 0;
}
.common-table {
  height: 400px;
}
.aql-btn {
  display: block;
  position: absolute;
  right: 24px;
  z-index: 999;
}
.material-style {
  // height: 42vh;
  ::v-deep .el-form-item {
    width: 100%;
  }
  ::v-deep .el-form-item--small .el-form-item__content {
    width: 100%;
  }
  ::v-deep .el-form-item--medium .el-form-item__content {
    width: 100%;
  }
}
.add-bad-style {
  margin-bottom: 10px;
}

::v-deep .el-form-item--medium .el-form-item__content {
  width: 58%;
}
</style>
