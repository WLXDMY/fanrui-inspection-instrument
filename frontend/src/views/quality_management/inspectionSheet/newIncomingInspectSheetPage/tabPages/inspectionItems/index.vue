<template>
  <div v-if="!noSelectRow" id="scrollContainer" ref="scrollContainer" class="inspectionItems scroll">
    <section id="scrollFirstContainer" class="inspection-item">
      <!-- 检验样次 -->
      <!-- <div class="sample-add">
        <i
          class="el-icon-circle-plus-outline"
          :style="isDetailType ? {} : { color: '#1890ff', cursor: 'pointer' }"
          @click="addInspectionSample"
        />
        <span @click="addInspectionSample">样次</span>
      </div> -->
      <el-tabs
        v-if="materialNumsLength"
        v-model="currentSample"
        class="noShowContent"
        type="card"
        :closable="!isDetailType"
        @tab-remove="removeTab"
        @tab-click="handleClick"
      >
        <el-tab-pane v-for="item in currentRow.materialNums" :key="item.name" :label="item.name" :name="item.name">
          {{ item.name }}
        </el-tab-pane>
      </el-tabs>
      <template v-if="hasSample">
        <div class="button-and-search">
          <div class="button-group">
            <el-dropdown>
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                :disabled="isDetailType"
              >
                添加检验项<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    size="mini"
                    :disabled="isDetailType"
                    @click="showDialog = true"
                  >选择检验项目</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    size="mini"
                    :disabled="isDetailType"
                    @click="inspectionProjectAddShow = true"
                  >新增检验项目</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              style="margin-left: 10px;"
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              :disabled="multipleList.length === 0 || isDetailType"
              @click="deleteInspection"
            >
              删除检验项目
            </el-button>
            <el-button
              v-permission="{
                action: 'inspection-manage.incomingInspect:createScheme'
              }"
              type="primary"
              plain
              size="mini"
              :disabled="isDetailType"
              @click="generateScheme"
            >生成检验方案</el-button>
          </div>
          <div class="search">
            <el-input
              v-model="inputSearch"
              placeholder="检验项目名称搜索"
              prefix-icon="el-icon-search"
              clearable
              class="project-handle"
              @input="handleInputSearch"
              @clear="clearInputSearch"
            />
          </div>
        </div>

        <el-form ref="newMaterialTableForm" :model="currentDataList">
          <newMaterialTable
            ref="newMaterialTableRef"
            v-loading="loading"
            class="input-field-width"
            :table-data="currentDataList.numItems"
            :current-row.sync="currentItemRow"
            :checkout-project="currentRow"
            :multiple-list.sync="multipleList"
            @handleRowClick="handleRowClick"
          >
            <!-- 列配置 start -->
            <!--参考值-->
            <template #referenceValue="{ row }">
              {{ $showReferenceValue(row) }}
            </template>
            <!-- 比较符 -->
            <template #comparator="{ row }">
              <el-select v-model="row.comparator" clearable disabled>
                <el-option
                  v-for="(item, index) in comparatorList"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
            <!-- 抽样类型 -->
            <template #sampleType="{ row }">
              <el-select v-model="row.sampleType" clearable disabled>
                <el-option
                  v-for="(item ) in typeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
            <!-- 检验水平 -->
            <template #inspectLevel="{ row }">
              <el-select v-model="row.inspectLevel" clearable disabled>
                <el-option
                  v-for="(item ) in levelTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
            <!-- 严格度 -->
            <template #stringency="{ row }">
              <el-select v-model="row.stringency" clearable disabled>
                <el-option
                  v-for="(item ) in sternWidthLevelList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
            <!-- AQL -->
            <template #aqlValue="{ row }">
              <el-select v-model="row.aqlValue" clearable disabled>
                <el-option
                  v-for="(item ) in aqlTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
            <!-- 列配置 end -->
            <!--检验项目-->
            <template #itemName="{ row }">
              <div class="itemName-class" @click="clickSidebar($event, row)">
                {{ row.itemName }}
              </div>
            </template>
            <!--重点检查-->
            <template #importantInspection="{ row }">
              <el-checkbox
                v-model="row.importantInspection"
                :disabled="isDetailType"
                :true-label="1"
                :false-label="0"
              />
            </template>
            <!--是否必填-->
            <template #required="{ row }">
              <el-checkbox v-model="row.required" :disabled="isDetailType" :true-label="1" :false-label="0" />
            </template>
            <!-- 缺陷等级 -->
            <template #defectLevel="{ row }">
              <el-select v-model="row.defectLevel" placeholder="请选择" clearable>
                <el-option
                  v-for="(item, index) in defectLevelEnums"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
            <!--记录样本检验值-->
            <template #recordInspectionValue="{ row }">
              <el-checkbox
                v-model="row.recordInspectionValue"
                :disabled="isDetailType"
                :true-label="1"
                :false-label="0"
              />
            </template>
            <!--实际样本数-->
            <template #actualQuality="{ row }">
              <el-input
                v-model="row.actualQuality"
                placeholder="请输入"
                size="small"
                :disabled="isDetailType"
                @change="getItemValues(row)"
              />
            </template>
            <!--样本不合格数-->
            <template #unqualifiedQuantity="{ row }">
              <el-input
                v-model="row.unqualifiedQuantity"
                placeholder="请输入"
                size="small"
                :disabled="isDetailType"
                @input="changeNnqualifiedQuantity"
              />
            </template>
            <!--样本检测值-->
            <template #checkResult2="{ row }">
              <template v-if="row.recordInspectionValue == 1">
                <div class="check-result" @click="handleScrollToBottom(row)">
                  <el-button class="check-result-text" type="text" :loading="loadingRowId === row.id">填写</el-button>
                  <span class="check-result-text gray">({{ getCheckResultNum(row) }})</span>
                </div>
              </template>
            </template>
            <!-- 检测值 -->
            <template #checkResult="{ row, $index }">
              <el-form-item
                :rules="{
                  required: row.required === 1 && row.recordInspectionValue == 0,
                  message: '请选择',
                  trigger: ['change', 'blur']
                }"
                :prop="'numItems.' + $index + '.checkResult'"
              >
                <template
                  v-if="
                    (row.inputMode === 'singleChoice' || row.inputMode === 'multipleChoice') &&
                      row.recordInspectionValue == 0
                  "
                >
                  <el-select
                    v-model="row.checkResult"
                    :multiple="row.inputMode === 'multipleChoice'"
                    placeholder="请选择"
                    :disabled="isDetailType"
                    clearable
                    @change="changeDetectionValue($event, 'singleConclusion', row)"
                  >
                    <el-option
                      v-for="(item, index) in row.itemOptionList"
                      :key="index"
                      :label="item.optionName"
                      :value="item.optionName"
                    />
                  </el-select>
                </template>
                <template v-else>
                  <el-input
                    v-model="row.checkResult"
                    size="small"
                    :disabled="isDetailType"
                    @change="changeNum($event, 'singleConclusion', row)"
                  />
                  <div v-if="row.analyzeMethod === 'quantitative'" class="reference-value">
                    参考值:
                    <span class="blue">{{ $showReferenceValue(row) }}</span>
                  </div>
                </template>
              </el-form-item>
            </template>
            <!-- 复核检测值 -->
            <template #reviewResult="{ row }">
              <template
                v-if="
                  (row.inputMode === 'singleChoice' || row.inputMode === 'multipleChoice') &&
                    row.recordInspectionValue == 0
                "
              >
                <el-select
                  v-model="row.reviewResult"
                  :multiple="row.inputMode === 'multipleChoice'"
                  placeholder="请选择"
                  :disabled="isDetailType"
                  clearable
                  @change="changeDetectionValue($event, 'reviewConclusion', row)"
                >
                  <el-option
                    v-for="(item, index) in row.itemOptionList"
                    :key="index"
                    :label="item.optionName"
                    :value="item.optionName"
                  />
                </el-select>
              </template>
              <template v-else>
                <el-input
                  v-model="row.reviewResult"
                  size="small"
                  :disabled="isDetailType"
                  @change="changeNum($event, 'reviewConclusion', row)"
                />
                <div v-if="row.analyzeMethod === 'quantitative'" class="reference-value">
                  参考值:
                  <span class="blue">{{ $showReferenceValue(row) }}</span>
                </div>
              </template>
            </template>
            <!-- 核准检测值 -->
            <template #authorizeResult="{ row }">
              <template
                v-if="
                  (row.inputMode === 'singleChoice' || row.inputMode === 'multipleChoice') &&
                    row.recordInspectionValue == 0
                "
              >
                <el-select
                  v-model="row.authorizeResult"
                  :multiple="row.inputMode === 'multipleChoice'"
                  placeholder="请选择"
                  :disabled="isDetailType"
                  clearable
                  @change="changeDetectionValue($event, 'authorizeConclusion', row)"
                >
                  <el-option
                    v-for="(item, index) in row.itemOptionList"
                    :key="index"
                    :label="item.optionName"
                    :value="item.optionName"
                  />
                </el-select>
              </template>
              <template v-else>
                <el-input
                  v-model="row.authorizeResult"
                  size="small"
                  :disabled="isDetailType"
                  @change="changeNum($event, 'authorizeConclusion', row)"
                />
                <div v-if="row.analyzeMethod === 'quantitative'" class="reference-value">
                  参考值:
                  <span class="blue">{{ $showReferenceValue(row) }}</span>
                </div>
              </template>
            </template>
            // 检验项目判定
            <template #singleConclusion="{ row, $index }">
              <el-form-item
                :rules="{ required: row.required === 1, message: '请选择', trigger: 'change' }"
                :prop="'numItems.' + $index + '.singleConclusion'"
              >
                <el-select v-model="row.singleConclusion" placeholder="请选择" :disabled="isDetailType" clearable>
                  <el-option
                    v-for="(item, index) in conclusionOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
            <template #reviewConclusion="{ row }">
              <el-select v-model="row.reviewConclusion" placeholder="请选择" :disabled="isDetailType" clearable>
                <el-option
                  v-for="(item, index) in conclusionOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.code"
                />
              </el-select>
            </template>

            <template #authorizeConclusion="{ row }">
              <el-select v-model="row.authorizeConclusion" placeholder="请选择" :disabled="isDetailType" clearable>
                <el-option
                  v-for="(item, index) in conclusionOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.code"
                />
              </el-select>
            </template>

            <template #inspectionMethod="{ row }">
              <el-input v-model="row.inspectionMethod" size="small" />
            </template>
            <template #referenceValue="{ row }">
              <el-input v-model="row.referenceValue" size="small" />
            </template>
            <template #upperLimitValue="{ row }">
              <el-input v-model="row.upperLimitValue" :disabled="row.iptDisabled" size="small" />
            </template>
            <template #downLimitValue="{ row }">
              <el-input v-model="row.downLimitValue" :disabled="row.iptDisabled" size="small" />
            </template>
          </newMaterialTable>
        </el-form>
      </template>
    </section>

    <!-- 下方的抽样检验tabs等 -->
    <el-dialog
      title="样本检测值填写"
      :visible.sync="dialogVisible"
      width="90%"
      modal
      :modal-append-to-body="false"
      :append-to-body="true"
      @close="handleClose"
    >
      <InspectionSample
        v-if="showSampleDialog"
        id="scrollSecondContainer"
        ref="InspectionSample"
        :current-item-row="currentItemRow"
        :current-row="currentRow"
        :num-items="currentDataList.numItems"
        @changeItem="changeItem"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </span>
    </el-dialog>

    <el-divider />

    <!-- 综合判定 -->
    <div v-if="!noSelectRow" class="projectIndicator scroll">
      <el-form
        ref="projectForm"
        :inline="true"
        :model="currentRow"
        :rules="rules"
        class="demo-form-inline"
        label-position="right"
        label-width="150px"
      >
        <section class="centerArea check">
          <div class="title">综合判定</div>
          <!-- 检验结果 -->
          <!-- <div>
          <el-upload action="" :http-request="params => handleUpload(params, 'checkFile')" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType">检验附件 </el-button>
          </el-upload>
        </div> -->
          <el-form-item label="判定结果：" prop="checkResult">
            <el-radio-group
              v-model="currentRow.checkResult"
              style="width: 248px"
              :disabled="isDetailType || checkResultDisabled"
            >
              <el-radio :label="1">合格</el-radio>
              <el-radio :label="0">不合格</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="合格率：" prop="passRate">
            <div style="width: 248px">{{ currentRow.passRate ? currentRow.passRate + '%' : '0' }}</div>
          </el-form-item>
          <el-form-item label="合格数量：" prop="qualifiedQuantity">
            <el-input
              v-model="currentRow.qualifiedQuantity"
              style="width: 248px"
              size="mini"
              :disabled="checkResultDisabled"
              @change="changeNum2($event, 'qualifiedQuantity', 'unqualifiedQuantity')"
            />
          </el-form-item>
          <el-form-item label="不合格数量：" prop="unqualifiedQuantity">
            <el-input
              v-model="currentRow.unqualifiedQuantity"
              style="width: 248px"
              size="mini"
              type="number"
              :min="0"
              :disabled="checkResultDisabled"
              @change="changeNum2($event, 'unqualifiedQuantity', 'qualifiedQuantity')"
            />
          </el-form-item>
          <el-form-item
            v-if="
              $FC('inspectTime', fullRouteCode, pageFullPathCode)?.isShow === true
            "
            :label="getLabelName('inspectTime', '送检时间')"
            prop="inspectTime"
            :rules="$FR(fieldPath, 'inspectTime')"
          >
            <el-date-picker
              v-model="currentRow.inspectTime"
              style="width: 248px"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="small"
              :disabled="$FC('inspectTime', fullRouteCode, pageFullPathCode)?.isEdit === false"
            />
          </el-form-item>
          <el-form-item
            v-if="
              $FC('inspectBeginTime', fullRouteCode, pageFullPathCode)?.isShow === true
            "
            :label="getLabelName('inspectBeginTime', '检验开始时间')"
            prop="inspectBeginTime"
            :rules="$FR(fieldPath, 'inspectBeginTime')"
          >
            <el-date-picker
              v-model="currentRow.inspectBeginTime"
              style="width: 248px"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="small"
              :disabled="$FC('inspectBeginTime', fullRouteCode, pageFullPathCode)?.isEdit === false"
            />
          </el-form-item>
          <el-form-item
            v-if="
              $FC('inspectEndTime', fullRouteCode, pageFullPathCode)?.isShow === true
            "
            :label="getLabelName('inspectEndTime', '检验完成时间')"
            prop="inspectEndTime"
            :rules="$FR(fieldPath, 'inspectEndTime')"
          >
            <el-date-picker
              v-model="currentRow.inspectEndTime"
              style="width: 248px"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="small"
              :disabled="$FC('inspectEndTime', fullRouteCode, pageFullPathCode)?.isEdit === false"
            />
          </el-form-item>
          <el-form-item
            v-if="
              $FC('checkConsumerTime', fullRouteCode, pageFullPathCode)?.isShow === true
            "
            :label="getLabelName('checkConsumerTime', '耗时时间')"
            prop="checkConsumerTime"
            :rules="$FR(fieldPath, 'checkConsumerTime')"
          >
            <el-input
              v-model="currentRow.checkConsumerTime"
              style="width: 248px"
              size="mini"
              :disabled="checkResultDisabled || $FC('checkConsumerTime', fullRouteCode, pageFullPathCode)?.isEdit === false"
            />
          </el-form-item>
          <el-form-item
            v-if="
              $FC('checkTimeUnit', fullRouteCode, pageFullPathCode)?.isShow === true
            "
            :label="getLabelName('checkTimeUnit', '耗时单位')"
            prop="checkTimeUnit"
            :rules="$FR(fieldPath, 'checkTimeUnit')"
          >
            <el-select
              v-model="currentRow.checkTimeUnit"
              style="width: 248px"
              placeholder="请选择"
              size="mini"
              :disabled="checkResultDisabled || $FC('checkTimeUnit', fullRouteCode, pageFullPathCode)?.isEdit === false"
              clearable
            >
              <el-option v-for="(item, index) in timeEnums" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="
              $FC('inspectPerson', fullRouteCode, pageFullPathCode)?.isShow === true
            "
            :label="getLabelName('inspectPerson', '送检人')"
            prop="inspectPerson"
            :rules="$FR(fieldPath, 'inspectPerson')"
          >
            <el-select
              v-model="currentRow.inspectPerson"
              style="width: 248px"
              filterable
              placeholder="请选择"
              clearable
              size="small"
              :disabled="$FC('inspectPerson', fullRouteCode, pageFullPathCode)?.isEdit === false"
            >
              <el-option
                v-for="(item, index) in checkPeopleList"
                :key="index"
                :label="item.nickname"
                :value="item.username"
              />
            </el-select>
          </el-form-item>
        </section>

        <section class="centerArea check">
          <div class="title-start title2">
            检验附件
            <el-upload
              action=""
              :before-upload="handleBeforeUpload"
              :http-request="params => handleUpload(params, 'checkFile')"
              :show-file-list="false"
              style="margin: 0 10px"
              :limit="10"
              :on-exceed="handleExceed"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pps"
            >
              <el-button
                plain
                size="mini"
                type="primary"
                :disabled="isDetailType || attachmentLength"
                :loading="loadingUpload"
              >上传附件
              </el-button>
            </el-upload>
            <el-tooltip placement="right" effect="dark" hide-after="0">
              <div slot="content" class="attachment-tip">
                <div>提示：</div>
                <div>最多支持上传10个文件，单个文件最大50MB，支持文件</div>
                <div>类型：jpg、jpeg、png、pdf、doc、docx、xls、xlsx、</div>
                <div>ppt、pptx、pps。</div>
              </div>
              <i class="el-icon-warning-outline" clsss="sampleIdentification-icon" />
            </el-tooltip>
          </div>
          <!-- 附件列表 -->
          <div class="attachments-all">
            <div v-for="(item, index) in currentRow.checkFiles" :key="index" class="attachments">
              <div class="attachments-type">
                <img :src="getAttachmentType(item)" alt="" width="16" height="18">
              </div>
              <div class="attachments-text">{{ item.fileName }}</div>
              <div class="attachments-icon">
                <span
                  v-if="enableView(item)"
                  class="attachments-icon-gutter"
                  @click="view(item)"
                ><img
                  src="@/assets/images/common/eye.png"
                  alt=""
                  width="16"
                  height="12"
                ></span>
                <span
                  class="attachments-icon-gutter"
                  @click="download(item)"
                ><img
                  src="@/assets/images/common/download.png"
                  alt=""
                  width="12"
                  height="12"
                ></span>
                <span
                  v-if="!isDetailType"
                  @click="deleteAttach(item, index)"
                ><img
                  src="@/assets/images/common/attachments-delete.png"
                  alt=" "
                  width="12"
                  height="12"
                ></span>
              </div>
            </div>
          </div>
        </section>

        <section v-if="reCheckValue == 1" class="centerArea check">
          <div class="title">
            复核综合判定
            <!-- <el-upload action="" :http-request="params => handleUpload(params, 'reviewFile')" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType"> 复核附件 </el-button>
          </el-upload> -->
          </div>
          <el-form-item class="all-line-width" label="判定结果：" prop="reviewResult">
            <el-radio-group v-model="currentRow.reviewResult" style="width: 248px" :disabled="isDetailType">
              <el-radio :label="1">合格</el-radio>
              <el-radio :label="0">不合格</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="合格数量：" prop="reviewQualifiedQuantity">
            <el-input
              v-model="currentRow.reviewQualifiedQuantity"
              style="width: 248px"
              size="mini"
              :disabled="isDetailType"
              @change="changeNum2($event, 'reviewQualifiedQuantity', 'reviewUnqualifiedQuantity')"
            />
          </el-form-item>
          <el-form-item label="不合格数量：" prop="reviewUnqualifiedQuantity">
            <el-input
              v-model="currentRow.reviewUnqualifiedQuantity"
              style="width: 248px"
              size="mini"
              :disabled="isDetailType"
              @change="changeNum2($event, 'reviewUnqualifiedQuantity', 'reviewQualifiedQuantity')"
            />
          </el-form-item>
          <el-form-item label="耗时时间：" prop="reviewConsumerTime">
            <el-input
              v-model="currentRow.reviewConsumerTime"
              style="width: 248px"
              size="mini"
              :disabled="isDetailType"
            />
          </el-form-item>
          <el-form-item label="时间单位：" prop="reviewTimeUnit">
            <el-select
              v-model="currentRow.reviewTimeUnit"
              style="width: 248px"
              placeholder="请选择"
              size="mini"
              :disabled="isDetailType"
              clearable
            >
              <el-option v-for="(item, index) in timeEnums" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </section>

        <section v-if="approveValue == 1" class="centerArea check">
          <div class="title">
            核准综合判定
            <!-- <el-upload action="" :http-request="params => handleUpload(params, 'authorizeFile')" :show-file-list="false">
            <el-button size="small" type="primary" :disabled="isDetailType"> 核准附件 </el-button>
          </el-upload> -->
          </div>
          <el-form-item class="all-line-width" label="判定结果：" prop="authorizeResult">
            <el-radio-group v-model="currentRow.authorizeResult" :disabled="isDetailType" style="width: 248px">
              <el-radio :label="1">合格</el-radio>
              <el-radio :label="0">不合格</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="合格数量：" prop="authorizeQualifiedQuantity">
            <el-input
              v-model="currentRow.authorizeQualifiedQuantity"
              style="width: 248px"
              size="mini"
              :disabled="isDetailType"
              @change="changeNum2($event, 'authorizeQualifiedQuantity', 'authorizeUnqualifiedQuantity')"
            />
          </el-form-item>
          <el-form-item label="不合格数量：" prop="authorizeUnqualifiedQuantity">
            <el-input
              v-model="currentRow.authorizeUnqualifiedQuantity"
              style="width: 248px"
              size="mini"
              :disabled="isDetailType"
              @change="changeNum2($event, 'authorizeUnqualifiedQuantity', 'authorizeQualifiedQuantity')"
            />
          </el-form-item>
          <el-form-item label="耗时时间：" prop="authorizeConsumerTime">
            <el-input
              v-model="currentRow.authorizeConsumerTime"
              style="width: 248px"
              size="mini"
              :disabled="isDetailType"
            />
          </el-form-item>
          <el-form-item label="时间单位：" prop="authorizeTimeUnit">
            <el-select
              v-model="currentRow.authorizeTimeUnit"
              style="width: 248px"
              placeholder="请选择"
              size="mini"
              :disabled="isDetailType"
              clearable
            >
              <el-option v-for="(item, index) in timeEnums" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </section>
      </el-form>
    </div>

    <!-- 新增检验项目 -->
    <CommonSelectDialogPlus
      v-if="showDialog"
      title="检验项目"
      :request-config="{
        url: 'qms/product/v1/items/list',
        method: 'post'
      }"
      :column-config="tableColumn"
      :extra-params="{ statues: [1] }"
      :visible="showDialog"
      :append-to-body="true"
      @confirm="handleConfirm"
      @cancel="showDialog = false"
    />

    <el-dialog
      title="批量录入检验项"
      :visible.sync="inspectionProjectAddShow"
      width="90%"
      modal
      :modal-append-to-body="false"
      :append-to-body="true"
      @close="inspectionProjectAddShow = false"
    >
      <inspectionProjectAdd
        ref="inspectionProjectAdd"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="inspectionProjectAddShow = false">取 消</el-button>
        <el-button type="primary" @click="saveInspectionProjectAdd">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 检验详情抽屉 -->
    <inspectDetailDrawer
      v-if="showInspectDetailDrawer"
      :visible="showInspectDetailDrawer"
      :current-item-row="inspectDetailDrawerData"
      :is-detail-type="isDetailType"
      :current-row="currentRow"
      :init-status="initStatus"
      @confirm="handleConfirmDrawer"
      @cancel="showInspectDetailDrawer = false"
    />

    <ViewImagesDialog v-if="visible" :visible="visible" :image-list="imageList" @closeDailog="closeDailog" />
  </div>
</template>
<script>
import {
  getDefectEnums,
  deleteNum,
  getDetailInspectionItemsWithSampleNum,
  deleteNumItem,
  getSampleNumByScheme,
  getAcceptValueByScheme,
  batchSimpleAdd
} from '@/api/quality-manage'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
import inspectDetailDrawer from './inspectDetailDrawer/index.vue'
import InspectionSample from './inspectionSample/index.vue'
import inspectionProjectAdd from '@/views/quality_management/inspectionSheet/newInspectionSheetPage/tabPages/inspectionItems/inspectionProjectAdd/index.vue'
import { PRODUCT_INSPECTION_PROJECT, ConclusionOptions } from './contants'
// 综合判定tab
import { uploadFile, getCheckPerson, deleteInspectFile, getComparisonOperatorsList, aqlList, getSternWidthLevelList, levelList, standardTypeList } from '@/api/quality-manage.js'
import ViewImagesDialog from '@/components/ViewImagesDialog'

export default {
  name: 'InspectionItems',
  components: {
    newMaterialTable: () => import('./newMaterialTable/index.vue'),
    CommonSelectDialogPlus,
    InspectionSample,
    inspectDetailDrawer,
    // 综合判定tab
    ViewImagesDialog,
    inspectionProjectAdd
  },
  inject: ['sheetInitStatus'],
  props: {
    // 分录明细行
    currentRow: {
      type: Object,
      default: () => {}
    },
    clickIndex: {
      type: Number,
      default: -1
    },
    initStatus: {
      type: Number,
      default: 0
    },
    // 综合判定tab
    baseForm: {
      type: Object,
      default: () => {}
    },
    // 审批标识，如果为true，则综合判定要改为必填
    approveVisible: {
      type: Boolean,
      default: false
    },
    // 合格数量默认配置标识
    qualifiedNumDefault: {
      type: [Number, String]
    },
    qualifiedNumDefaultFlag: {
      type: Boolean,
      default: true
    },
    // 页面参数
    fullRouteCode: {
      type: String,
      default: ''
    },
    // 页面参数下的类型
    pageFullPathCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabsNum: 0,
      currentSample: '检验样次1',
      // 样次中的检验项目行
      currentItemRow: {},
      showDialog: false,
      inspectionProjectAddShow: false,
      tableColumn: PRODUCT_INSPECTION_PROJECT,
      conclusionOptions: ConclusionOptions,
      defectLevelEnums: [],
      comparatorList: [], // 比较符list
      typeList: [], // 抽样类型枚举
      aqlTypeList: [], // aql枚举列表
      sternWidthLevelList: [], // 严格度枚举列表
      levelTypeList: [], // 检验水平枚举列表
      loading: false,
      showInspectDetailDrawer: false,
      // 检验详情抽屉数据
      inspectDetailDrawerData: {},
      // 检验样次中搜索数据
      inputSearch: '',
      hasChangeActualQuality: false,
      showSample: true,
      // 搜索前备份下样次数组
      backupArray: [],
      newMaterialTableForm: null,
      currentDataList: {},
      //  搜索后，样次中，没有匹配上的数据
      unMatchedItems: [],
      // 综合判定tab
      decisionEnums: [],
      reCheckValue: 0,
      approveValue: 0,
      // 检验结果,复核,核准是否置灰
      checkResultDisabled: false,
      reviewResultDisabled: false,
      authorizeResultDisabled: false,
      checkPeopleList: [], // 送检人
      visible: false,
      imageList: [],
      loadingUpload: false,
      attachmentType: {
        image: require('../../../../../../assets/images/common/image.png'),
        pdf: require('../../../../../../assets/images/common/pdf.png'),
        doc: require('../../../../../../assets/images/common/doc.png'),
        xls: require('../../../../../../assets/images/common/xls.png'),
        ppt: require('../../../../../../assets/images/common/ppt.png')
      },
      timeEnums: [
        {
          label: '秒',
          value: 'seconds'
        },
        {
          label: '分钟',
          value: 'minutes'
        },
        {
          label: '小时',
          value: 'hours'
        },
        {
          label: '天',
          value: 'days'
        }
      ],
      isFirstFetch: false, // 添加默认数量配置标志位
      isFirstFetch2: false, // 添加默认数量配置标志位
      // 样本检测值填写是否显示
      dialogVisible: false,
      // 样本检测值填写按钮的id
      loadingRowId: null,
      // 检验项目的多选
      multipleList: [],
      unqualifiedQuantityFlag: true// 样本数是否可以进行判断，默认可以，点击切换行后不行
    }
  },
  computed: {
    // 页面字段配置关键字
    fieldPath() {
      return {
        fullRouteCode: this.fullRouteCode,
        pageFullPathCode: this.pageFullPathCode
      }
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    },
    // 存在样次
    hasSample() {
      return this.currentRow.materialNums?.length > 0
    },
    // 存在选中的当前项目
    hasCurrentItemRow() {
      return Object.keys(this.currentItemRow).length > 0
    },
    // 该行检验项是否启用样本检验值
    hasCurrentRecordValue() {
      return this.currentItemRow.recordInspectionValue
    },

    // 没有选中分录明细
    noSelectRow() {
      return this.clickIndex === -1
    },
    // 检验样次数量，只有一个时隐藏
    materialNumsLength() {
      return this.currentRow?.materialNums?.length > 1 || 0
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    },
    // 综合判定tab
    rules() {
      // const { checkResult, reviewResult, authorizeResult } = this.currentRow
      const checkRule = [{ required: true, message: '该参数是必填项' }]
      const rules = {}
      if (this.initStatus !== 3 && this.baseForm.status === 3) {
        rules.checkResult = checkRule
        rules.unqualifiedQuantity = checkRule
        rules.qualifiedQuantity = checkRule
        rules.reviewResult = checkRule
        rules.reviewUnqualifiedQuantity = checkRule
        rules.reviewQualifiedQuantity = checkRule
        rules.authorizeResult = checkRule
        rules.authorizeUnqualifiedQuantity = checkRule
        rules.authorizeQualifiedQuantity = checkRule
      } else if (this.approveVisible) {
        // 提交审批需要设置为必填
        rules.checkResult = checkRule
        rules.unqualifiedQuantity = checkRule
        rules.qualifiedQuantity = checkRule
        rules.reviewResult = checkRule
        rules.reviewUnqualifiedQuantity = checkRule
        rules.reviewQualifiedQuantity = checkRule
        rules.authorizeResult = checkRule
        rules.authorizeUnqualifiedQuantity = checkRule
        rules.authorizeQualifiedQuantity = checkRule
      } else {
        rules.checkResult = []
        rules.unqualifiedQuantity = []
        rules.qualifiedQuantity = []
        rules.reviewResult = []
        rules.reviewUnqualifiedQuantity = []
        rules.reviewQualifiedQuantity = []
        rules.authorizeResult = []
        rules.authorizeUnqualifiedQuantity = []
        rules.authorizeQualifiedQuantity = []
      }

      // if (typeof checkResult === 'number') {
      //   rules.unqualifiedQuantity = checkRule
      //   rules.qualifiedQuantity = checkRule
      // } else {
      //   rules.unqualifiedQuantity = []
      //   rules.qualifiedQuantity = []
      // }
      // if (typeof reviewResult === 'number') {
      //   rules.reviewUnqualifiedQuantity = checkRule
      //   rules.reviewQualifiedQuantity = checkRule
      // } else {
      //   rules.reviewUnqualifiedQuantity = []
      //   rules.reviewQualifiedQuantity = []
      // }

      // if (typeof authorizeResult === 'number') {
      //   rules.authorizeUnqualifiedQuantity = checkRule
      //   rules.authorizeQualifiedQuantity = checkRule
      // } else {
      //   rules.authorizeUnqualifiedQuantity = []
      //   rules.authorizeQualifiedQuantity = []
      // }
      return rules
    },
    attachmentLength() {
      const result = this.currentRow && this.currentRow.checkFiles && this.currentRow.checkFiles.length >= 10
      return result
    },
    showSampleDialog() {
      return this.hasSample && this.hasCurrentItemRow && this.hasCurrentRecordValue && this.showSample
    }
  },
  watch: {
    currentRow: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log('watch函数', this.currentRow)
        this.handleCurrentDataList()
      }
    },
    // 根据样本不合格数-判断-检验项目判定是否合格
    'currentItemRow.unqualifiedQuantity': {
      handler(val, oldVal) {
        if (!this.unqualifiedQuantityFlag) {
          return
        }

        // 如果新旧值相同，直接返回，不执行后续逻辑
        if (val === oldVal) {
          return
        }

        // 当检验项抽样方案为空并且整体抽样方案也为空时，不判定
        if (!this.currentItemRow.samplePlanName && !this.currentRow.samplePlanName) {
          return
        }

        // 当检验项方案，抽样类型为全检时，不判定
        if (this.currentItemRow.sampleType === 'full') {
          return
        }

        // 记录样本检验值 勾选时才进行以下判断
        // if (this.currentItemRow.recordInspectionValue === 1) {
        // 处理样本不合格数的值
        if (this.currentItemRow.analyzeMethod === 'manual') return
        // 当拒收数为0时，不判定
        if (Number(this.currentItemRow.refuseValue) === 0) {
          return
        } else if (Number(val) >= Number(this.currentItemRow.refuseValue)) {
          this.$set(this.currentItemRow, 'singleConclusion', 0)
        } else if (Number(val) < Number(this.currentItemRow.refuseValue)) {
          // 当不合格数小于拒收数时，默认合格
          this.$set(this.currentItemRow, 'singleConclusion', 1)
        }
        // }
      },
      deep: true,
      immediate: true
    },
    // 综合判定tab
    // 修改了送检数量，更新合格率的值
    'currentRow.inspectQuantity'(val) {
      if (this.isFirstFetch) {
        // 这是第一次获取数据，跳过以下操作
        this.isFirstFetch = false // 标记为非第一次获取
        return
      }

      if (val) {
        // 合格数量默认配置
        // 合格数量=送检数量
        // eslint-disable-next-line
        if (this.qualifiedNumDefault == 3 && this.qualifiedNumDefaultFlag) {
          this.$set(this.currentRow, 'qualifiedQuantity', val)
          // 不合格数量更新
          this.changeNum2(this.currentRow.qualifiedQuantity, 'qualifiedQuantity', 'unqualifiedQuantity')
        }

        // 更新合格率
        this.getQualifiedPercent()
      }
    },
    // 修改了抽样数量，抽样数量默认配置
    'currentRow.samplingQuantity'(val) {
      if (this.isFirstFetch2) {
        // 这是第一次获取数据，跳过以下操作
        this.isFirstFetch2 = false // 标记为非第一次获取
        return
      }

      if (val) {
        // 合格数量默认配置
        // 合格数量=送检数量
        // eslint-disable-next-line
        if (this.qualifiedNumDefault == 2 && this.qualifiedNumDefaultFlag) {
          this.$set(this.currentRow, 'qualifiedQuantity', val)
          // 不合格数量更新
          this.changeNum2(this.currentRow.qualifiedQuantity, 'qualifiedQuantity', 'unqualifiedQuantity')
        }

        // 更新合格率
        this.getQualifiedPercent()
      }
    },
    // 修改了合格数量，更新合格率的值
    'currentRow.qualifiedQuantity'(val) {
      if (val) {
        this.getQualifiedPercent()
      }
    },
    // 样本检测值，展示时Loading为false
    'dialogVisible'(val) {
      if (!val) {
        this.loadingRowId = null
      }
    }
  },
  created() {
    // 获取枚举值
    Promise.allSettled([aqlList(), getSternWidthLevelList(), levelList(), standardTypeList()]).then(res => {
      const [res1, res2, res3, res4] = res
      this.aqlTypeList = res1.value.data.data
      this.sternWidthLevelList = res2.value.data.data
      this.levelTypeList = res3.value.data.data
      this.typeList = res4.value.data.data
    })

    this.getDefectEnums()
    // 综合判定tab
    this.getCheckPerson()
    this.getComparison()

    if (this.isEditType) {
      this.isFirstFetch = true
      this.isFirstFetch2 = true
    }
  },
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 1500)
    }
    setTimeout(() => {
      this.handleCurrentDataList()
      // 综合判定tab
      this.getDecideConfig()
    }, 1500)
  },
  methods: {
    // 检验项目新增
    async saveInspectionProjectAdd() {
      if (this?.$refs?.inspectionProjectAdd?.currentItemRow.itemValues.length === 0) {
        this.$notify({
          title: '提示',
          message: '请添加检验项数据',
          type: 'warning',
          duration: 3000
        })
        return
      }

      // 校验
      try {
        const validateOptions = {
          // 校验的数组
          forms: [
            {
              positionInfo: '检验单信息',
              formEntity: this?.$refs?.inspectionProjectAdd?.$refs?.['form']
            }
          ],
          // 用于展开基本信息或tabs的方法对象（非必传）
          otherFunc: {
            // changeTabs: name => {
            //   this.tabValue = name
            // }
            // expandInfo: () => {
            //   this.$refs.baseForm.isFold = true
            // }
          }
        }
        const result = await this.$validateDialog(validateOptions)
        if (!result) return

        const params = this?.$refs?.inspectionProjectAdd?.currentItemRow.itemValues
        const res = await batchSimpleAdd(params)
        const { status, data } = res.data || {}
        if (status === 1) {
          this.$notify({
            title: '提示',
            message: '新增成功',
            type: 'success',
            duration: 2000
          })

          // 将新增的检验项目添加到检验单中
          this.handleConfirm(data, 'add')

          // 清空数据
          this.$set(this.$refs?.inspectionProjectAdd, 'currentItemRow', {})
          this.$set(this.$refs?.inspectionProjectAdd?.currentItemRow, 'itemValues', [])
          this.$set(this.$refs?.inspectionProjectAdd, 'sampleTotalNum', '')
          this.inspectionProjectAddShow = false
        }
      } catch (error) {
        console.log('error submit!!', error)
      }
    },
    // 生成检验方案
    generateScheme() {
      this.$emit('generateScheme', this.currentDataList.numItems)
    },
    // 获取比较符
    async getComparison() {
      const result = await getComparisonOperatorsList()
      const { data } = result.data || {}
      this.comparatorList = data || []
    },
    getLabelName(prop, name, noColon = 1) {
      let label = this.$FN(this.fieldPath, prop, name).replace(/:/g, '')
      // 是否要加上冒号
      label += noColon ? ':' : ''
      return label
    },
    // 检测值修改后，判定结论
    changeNum(val, name, row) {
      if (row.analyzeMethod !== 'quantitative') return
      // 如果记录样本检验值为1，返回
      if (row.recordInspectionValue === 1) return

      const result = this.$changeCheckResult(row, val)
      this.$set(row, name, result)
    },
    // 处理定性分析-值修改后，判定结论
    changeDetectionValue(val, name, row) {
      // 修改后，变成可以触发不合格数的watch
      this.unqualifiedQuantityFlag = true

      if (row.analyzeMethod !== 'qualitative') return
      // 如果记录样本检验值为1，返回
      if (row.recordInspectionValue === 1) return

      const itemOptionList = row.itemOptionList
      const valArray = Array.isArray(val) ? val : [val]
      // 使用filter和map方法筛选出匹配的judgeFlag值，并去重
      const judgeFlagArray = [
        ...new Set(
          valArray
            .filter(result => itemOptionList.some(option => option.optionName === result))
            .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
        )
      ]
      if (judgeFlagArray.length > 0) {
        if (row.inputMode === 'singleChoice') {
          this.$set(row, name, judgeFlagArray[0])
        } else if (row.inputMode === 'multipleChoice') {
          if (judgeFlagArray.length === 1) {
            this.$set(row, name, judgeFlagArray[0])
          } else if (judgeFlagArray.length > 1) {
            this.$set(row, name, 0)
          }
        }
      } else {
        this.$set(row, name, '')
      }
    },
    // 样次中的项目列表
    handleCurrentDataList() {
      let sampleItem = {}

      if (
        this.currentSample &&
        this.currentRow &&
        this.currentRow.materialNums &&
        this.currentRow.materialNums.length > 0
      ) {
        sampleItem = this.currentRow.materialNums.find(item => item.name === this.currentSample)
      }

      // 实际样本数需要默认赋值为抽样数
      if (sampleItem && sampleItem.numItems && sampleItem.numItems?.length > 0) {
        sampleItem.numItems.forEach(item => {
          // 检查actualQuality是否为null
          if (item.actualQuality == null && item.samplingQuantity > 0) {
            const num = Number(item.samplingQuantity)
            // item.actualQuality = num
            this.$set(item, 'actualQuality', num)
          }
        })
      }

      this.currentDataList = sampleItem
    },
    // 搜索输入框
    handleInputSearch() {
      this.currentDataList.numItems = [...this.currentDataList.numItems, ...this.unMatchedItems]
      const result = this.fuzzyMatch(this.inputSearch, this.currentDataList.numItems)

      // 搜索后匹配的数据和不匹配的
      this.currentDataList.numItems = result.matchedItems
      this.unMatchedItems = result.unMatchedItems
      // 下方的样本检测值置灰
      this.showSample = false
    },
    fuzzyMatch(inputValue, data) {
      // 转换为小写，实现不区分大小写的匹配
      const lowerCaseInput = inputValue.toLowerCase()
      const matchedItems = []
      const unMatchedItems = []

      data.forEach(item => {
        if (item.itemName.toLowerCase().indexOf(lowerCaseInput) > -1) {
          matchedItems.push(item)
        } else {
          unMatchedItems.push(item)
        }
      })
      return { matchedItems, unMatchedItems }
    },
    // 清除输入框
    clearInputSearch() {},
    // 点击行时触发
    handleRowClick() {
      this.getItemValues()
      // 点击另一行的标致
      this.unqualifiedQuantityFlag = false
    },
    // 获取样本检测值中已填写数据和总行数的值
    getCheckResultNum(row) {
      if (row.itemValues.length === 0 || !row.itemValues) {
        return '0/0'
      }

      // 获取已填写的数量和itemValues的数组长度
      const inspectValueNum = row.itemValues.reduce((count, item) => {
        const inspectValue = item?.inspectValue
        if (typeof inspectValue === 'string' && inspectValue !== '') {
          return count + 1
        } else if (Array.isArray(inspectValue) && inspectValue.length > 0) {
          return count + 1
        }
        return count
      }, 0)

      const itemValuesNum = row.itemValues?.length
      return inspectValueNum + '/' + itemValuesNum
    },
    // 根据实际样本数的长度，获取样本检测值填写数组的长度
    getItemValues() {
      this.showSample = true
    },
    getItemValues2() {
      this.showSample = true

      // 若没有启用样本检测值，则返回
      if (this.currentItemRow.recordInspectionValue === 0) {
        return
      }

      // 获取选项
      const itemOptionList =
        this.currentItemRow.itemOptionList && this.currentItemRow.itemOptionList.filter(item => item.enableFlag)
      // 数组 多选
      let checkResult =
        itemOptionList &&
        itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

      if (this.currentItemRow.inputMode === 'singleChoice') {
        checkResult = checkResult?.join?.()
      }
      // 定性分析 默认选中检验项目判定
      let singleConclusion = ''
      if (this.currentItemRow.analyzeMethodCode === 'qualitative') {
        const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
        const judgeFlagArray = [
          ...new Set(
            valArray
              .filter(result => itemOptionList?.some(option => option.optionName === result))
              .map(result => itemOptionList?.find(option => option.optionName === result).judgeFlag)
          )
        ]
        if (judgeFlagArray?.length > 0) {
          if (this.currentItemRow.inputMode === 'singleChoice') {
            singleConclusion = judgeFlagArray[0]
          } else if (this.currentItemRow.inputMode === 'multipleChoice') {
            if (judgeFlagArray.length === 1) {
              singleConclusion = judgeFlagArray[0]
            } else if (judgeFlagArray.length > 1) {
              singleConclusion = 0
            }
          }
        }
      }

      const itemValue = {
        // 输入方式
        inspectValue: checkResult,
        checkConclusion: singleConclusion,
        productCode: ''
      }

      // 判断itemValues是否为数组且actualQuality是否为数组
      if (Array.isArray(this.currentItemRow.itemValues) && this.currentItemRow.actualQuality > 0) {
        // 如果itemValues数组长度为0，则生成与actualQuality长度相同的数组
        if (this.currentItemRow.itemValues.length === 0) {
          for (let i = 0; i < this.currentItemRow.actualQuality; i++) {
            this.$set(
              this.currentItemRow.itemValues,
              this.currentItemRow.itemValues.length,
              JSON.parse(JSON.stringify(itemValue))
            )
          }
        } else if (this.currentItemRow.itemValues.length < this.currentItemRow.actualQuality) {
          // 如果itemValues数组长度小于actualQuality长度，则添加元素直到长度相等
          while (this.currentItemRow.itemValues.length < this.currentItemRow.actualQuality) {
            this.$set(
              this.currentItemRow.itemValues,
              this.currentItemRow.itemValues.length,
              JSON.parse(JSON.stringify(itemValue))
            )
          }
        }
        // 如果itemValues数组长度大于actualQuality长度，则不操作
      }
    },

    // 滚动条滑动到底部
    handleScrollToBottom(row) {
      // this.handleScrollToBottom = true
      // 当前页面一定要设置固定高度才能实现
      // this.$emit('handleScrollToBottom')

      if (!this.hasCurrentItemRow) {
        this.$notify({
          title: '提示',
          message: '请先点击选中该行',
          type: 'warning',
          duration: 3000
        })
        return
      }
      this.loadingRowId = row.id
      setTimeout(() => {
        this.dialogVisible = true
        this.unqualifiedQuantityFlag = true
      }, 0)
    },
    handleClose() {
      // 将样本总行数清空
      this.$refs['InspectionSample'].sampleTotalNum = ''
      this.$refs['InspectionSample'].itemValuesFlag = false
    },
    handleCancle() {
      this.dialogVisible = false
      this.$refs['InspectionSample'].itemValuesFlag = false
    },
    handleSave() {
      this.dialogVisible = false
      this.$refs['InspectionSample'].itemValuesFlag = false
    },
    // 弹出侧边栏
    clickSidebar(event, row) {
      // 阻止事件冒泡
      event.stopPropagation()
      this.inspectDetailDrawerData = row
      this.showInspectDetailDrawer = true
    },
    // 抽屉侧边栏确认
    handleConfirmDrawer() {
      this.getItemValues()
    },
    // 缺陷等级
    async getDefectEnums() {
      const result = await getDefectEnums()
      const { data } = result.data || {}
      this.defectLevelEnums = data || []
    },
    // 切换项目
    changeItem(flag) {
      this.$refs.newMaterialTableRef.changeItem(flag)
    },
    // 切换行
    changeRow(flag) {
      this.$emit('changeRow', flag)
    },
    // 增加样次
    addInspectionSample() {
      if (this.isDetailType) return
      if (this.clickIndex === -1) {
        this.$message.warning('请选择分录明细')
        return
      }
      // 输入框置空，样次还原
      if (this.inputSearch) {
        this.inputSearch = ''
        this.handleInputSearch()
      }

      const names = this.currentRow.materialNums.map(item => item.name)
      let name = `检验样次1`
      if (names.length > 0) {
        const nums = names.map(name => parseInt(name.match(/\d+/)[0], 10))
        const maxNum = Math.max.apply(null, nums)
        name = `检验样次${maxNum + 1}`
      }
      const obj = {
        name,
        // 样次关联的检验项目
        numItems: []
      }
      this.currentRow.materialNums.push(obj)
      this.currentSample = name
      this.bringOutItems()
      this.showSample = false
    },
    // 带出检验方案关联的检验项目
    async bringOutItems() {
      if (!this.currentRow.schemeId) return
      this.loading = true
      const params = {
        num: this.currentRow.inspectQuantity || 0,
        schemeId: this.currentRow.schemeId
      }
      const {
        data: { data }
      } = await getDetailInspectionItemsWithSampleNum(params)
      if (!data || data.length === 0) {
        this.loading = false
        return
      }
      const arr = []
      const sampleItem = this.currentRow.materialNums.find(item => item.name === this.currentSample)
      for (let index = 0; index < data.length; index++) {
        const row = data[index]
        // 获取选项
        const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
        // 数组 多选
        let checkResult =
          itemOptionList &&
          itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

        if (row.inputMode === 'singleChoice') {
          checkResult = checkResult.join?.()
        }
        // 定性分析 默认选中检验项目判定
        let singleConclusion = row.defaultQualified ? 1 : ''
        if (row.analyzeMethodCode === 'qualitative') {
          const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
          const judgeFlagArray = [
            ...new Set(
              valArray
                .filter(result => itemOptionList.some(option => option.optionName === result))
                .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
            )
          ]
          if (judgeFlagArray.length > 0) {
            if (row.inputMode === 'singleChoice') {
              singleConclusion = judgeFlagArray[0]
            } else if (row.inputMode === 'multipleChoice') {
              if (judgeFlagArray.length === 1) {
                singleConclusion = judgeFlagArray[0]
              } else if (judgeFlagArray.length > 1) {
                singleConclusion = 0
              }
            }
          }
        }

        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: row?.samplingQuantity,
            samplePlanId: row?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }
        delete row.id

        // 获取样本检测值填写数组 start
        // 实际样本数
        const itemValues = []
        const actualQuality = row.actualQuality || row?.samplingQuantity || this.currentRow.samplingQuantity || null
        // if (actualQuality > 0) {
        //   const itemValue = {
        //     // 输入方式
        //     inspectValue: checkResult,
        //     checkConclusion: singleConclusion,
        //     productCode: ''
        //   }
        //   for (let i = 0; i < actualQuality; i++) {
        //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
        //   }
        // }
        // 获取样本检测值填写数组 end

        const obj = {
          ...row,
          itemValues: itemValues,
          itemDefects: [],
          // 获取样次-检验项目里面的抽样方案
          samplePlanId: row.samplePlanEntity?.id,
          samplePlanName: row.samplePlanEntity?.name,
          sampleType: row.samplePlanEntity?.type,
          inspectLevel: row.samplePlanEntity?.inspectLevel,
          stringency: row.samplePlanEntity?.stringency,
          aqlValue: row.samplePlanEntity?.aqlValue,
          samplingQuantity: row?.samplingQuantity,
          itemId: row.itemId,
          itemName: row.itemName,
          analyzeMethod: row.analyzeMethodCode,
          defectLevel: row.defectLevel,
          itemGroupName: row.itemGroupName,
          comparator: row.itemComparator,
          upperLimitValue: row.itemUpperLimitValue,
          downLimitValue: row.itemDownLimitValue,
          // 上下公差
          upperTolerance: row.itemUpperTolerance,
          lowerTolerance: row.itemLowerTolerance,
          inspectionCondition: row.itemInspectionCondition,
          referenceValue: row.itemReferenceValue,
          importantInspection: row.importantInspection ? 1 : 0,
          required: row.required ? 1 : 0,
          recordInspectionValue: row.recordInspectionValue ? 1 : 0,
          checkResult,
          // optionalValue,
          // samplingQuantity,
          itemOptionList,
          singleConclusion,
          itemGuidanceFileList: row.itemFileList,
          defaultQualified: row.defaultQualified ? 1 : '',
          // singleConclusion: row.defaultQualified ? 1 : '',
          // 实际样本数
          actualQuality: actualQuality,
          // actualQuality: row.actualQuality || row?.samplingQuantity || null,
          acceptValue,
          refuseValue
        }
        arr.push(obj)
      }
      sampleItem?.numItems?.push(...arr)
      this.loading = false
    },
    handleClick() {
      this.showSample = false
      // 输入框置空，样次还原
      if (this.inputSearch) {
        this.inputSearch = ''
        this.handleInputSearch()
      }
      this.handleCurrentDataList()
    },
    // 删除样次
    removeTab(targetName) {
      // 样次Id
      const materialNumId = this.currentRow.materialNums.find(item => item.name === targetName)?.id
      this.$confirm('删除样次? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!isNaN(materialNumId)) {
          deleteNum([materialNumId]).then(_ => {
            this.$message.success('删除成功')
            this.removeTabSuccess(targetName)
          })
        } else {
          this.removeTabSuccess(targetName)
          this.$message.success('删除成功')
        }
      })
    },
    // 删除成功
    removeTabSuccess(targetName) {
      const tabs = this.currentRow.materialNums
      let activeName = this.currentSample
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.currentSample = activeName
      this.currentRow.materialNums = tabs.filter(tab => tab.name !== targetName)
    },
    // 删除检验项目
    deleteInspection() {
      const deleteIds = this.multipleList.map(item => item.id).filter(item => !isNaN(item))

      this.$confirm('删除检验项目? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //   编辑时拿this.currentItemRow的标识调用接口
        if (deleteIds.length > 0) {
          deleteNumItem(deleteIds).then(_ => {
            this.$message.success('删除成功')
            this.removeItemSuccess()
          })
        } else {
          this.removeItemSuccess()
          this.$message.success('删除成功')
        }
      })
    },
    // 成功删除项目
    removeItemSuccess() {
      const sampleItem = this.currentRow.materialNums.find(item => item.name === this.currentSample)
      sampleItem.numItems = sampleItem?.numItems.filter(item => {
        return this.multipleList.indexOf(item) === -1
      })
      this.currentItemRow = {}
    },
    // 弹窗确认新增检验项目
    async handleConfirm(rows, type) {
      const sampleItem = this.currentRow.materialNums.find(item => item.name === this.currentSample)

      // 选择检验项目不能重复 start
      if (type !== 'add') {
        const itemIdArr = sampleItem.numItems.map(item => item.itemId)
        // 过滤 rows，将 id 在 itemIdArr 中的项放入 projectNotAdd
        const projectNotAdd = rows.filter(row => itemIdArr.includes(row.id))
        const filteredRows = rows.filter(row => !itemIdArr.includes(row.id))

        // 提取 projectNotAdd 中的 name 并拼接成字符串
        const projectNotAddName = projectNotAdd.map(item => item.name).join(', ')

        const messageTip = `${projectNotAdd.length}个检验项已存在列表中，无需重复添加；成功添加${filteredRows.length}行检验项`

        // 更新 rows 数组
        rows.splice(0, rows.length, ...filteredRows)

        if (projectNotAddName) {
          this.$notify({
            title: '提示',
            message: messageTip,
            type: 'warning',
            duration: 3000
          })
        }
      }
      // 选择检验项目不能重复 end

      const arr = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        // 获取选项
        const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
        // 数组 多选
        let checkResult =
          itemOptionList &&
          itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

        if (row.inputMode === 'singleChoice') {
          checkResult = checkResult?.join?.()
        }
        // 定性分析 默认选中检验项目判定
        let singleConclusion = ''
        if (row.analyzeMethodCode === 'qualitative') {
          const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
          const judgeFlagArray = [
            ...new Set(
              valArray
                .filter(result => itemOptionList?.some(option => option.optionName === result))
                .map(result => itemOptionList?.find(option => option.optionName === result).judgeFlag)
            )
          ]
          if (judgeFlagArray?.length > 0) {
            if (row.inputMode === 'singleChoice') {
              singleConclusion = judgeFlagArray[0]
            } else if (row.inputMode === 'multipleChoice') {
              if (judgeFlagArray.length === 1) {
                singleConclusion = judgeFlagArray[0]
              } else if (judgeFlagArray.length > 1) {
                singleConclusion = 0
              }
            }
          }
        }

        const { id, samplePlanId } = row
        let samplingQuantity = 0
        // 存在抽样 根据抽样方案和送检数量算出抽样数量
        if (typeof samplePlanId === 'number' && this.currentRow.inspectQuantity) {
          const params1 = {
            num: this.currentRow.inspectQuantity,
            sampleId: samplePlanId
          }
          const result = await getSampleNumByScheme(params1)
          samplingQuantity = result.data?.data?.sampleNum || 0
        }
        delete row.id
        const obj = {
          ...row,
          itemValues: [],
          itemDefects: [],
          samplePlanName: row.samplePlanEntity?.name,
          itemId: id,
          itemName: row.name,
          analyzeMethod: row.analyzeMethodCode,
          analyzeMethodName: row.analyzeMethodCodeName,
          defectLevel: row.defectLevelCode,
          comparator: row.comparatorCode,
          itemGroupName: row.itemGroupEntity?.groupName || '',
          checkResult,
          // 这边修改
          itemOptionList,
          singleConclusion,
          samplingQuantity,
          itemGuidanceFileList: row.itemFileList,
          importantInspection: row.importantInspection ? 1 : 0,
          recordInspectionValue: row.recordInspectionValue ? 1 : 0,
          required: 1
        }
        arr.push(obj)
      }
      sampleItem?.numItems?.push(...arr)
      this.showDialog = false
    },
    // 综合判定tab start
    // 计算合格率
    getQualifiedPercent() {
      let result = 0
      if (
        typeof Number(this.currentRow.inspectQuantity) === 'number' &&
        typeof Number(this.currentRow.qualifiedQuantity) === 'number'
      ) {
        result = ((Number(this.currentRow.qualifiedQuantity) / Number(this.currentRow.inspectQuantity)) * 100).toFixed(
          2
        )
      }
      // 处理特殊情况
      if (result === 'NaN' || result === 'Infinity') {
        result = 0
      }
      this.$set(this.currentRow, 'passRate', result)
    },
    // 判断附件类型
    getAttachmentType(row) {
      const { fileUrl } = row
      // 图片
      if (/\.(jpg|jpeg|png)$/i.test(fileUrl)) {
        return this.attachmentType.image
      } else if (/\.(pdf)$/i.test(fileUrl)) {
        return this.attachmentType.pdf
      } else if (/\.(doc|docx)$/i.test(fileUrl)) {
        return this.attachmentType.doc
      } else if (/\.(xls|xlsx)$/i.test(fileUrl)) {
        return this.attachmentType.xls
      } else if (/\.(ppt|pptx|pps)$/i.test(fileUrl)) {
        return this.attachmentType.ppt
      }
    },
    enableView(row) {
      return /\.(jpg|jpeg|png|gif|bmp|svg|mp4|avi|wmv|mov|flv|rmvb|pdf)$/i.test(row.fileUrl)
    },
    // 查看
    view(row) {
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
    // 下载文件
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
    // 删除附件
    deleteAttach(row, index) {
      this.$confirm('删除附件? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 存在Id
        if (!isNaN(row.id)) {
          deleteInspectFile([row.id]).then(_ => {
            this.$message.success('删除成功')
            this.currentRow.checkFiles.splice(index, 1)
          })
        } else {
          this.currentRow.checkFiles.splice(index, 1)
        }
      })
    },
    changeNnqualifiedQuantity() {
      this.unqualifiedQuantityFlag = true
    },
    // 合格/不合格数量自动判定
    changeNum2(val, self, other) {
      if (!this.currentRow.inspectQuantity) return
      if (val > Number(this.currentRow.inspectQuantity)) {
        this.$set(this.currentRow, self, Number(this.currentRow.inspectQuantity))
      }
      if (val < 0) {
        this.currentRow[self] = 0
      }
      this.$set(this.currentRow, other, this.currentRow.inspectQuantity - this.currentRow[self])
    },
    // 获取送检人
    getCheckPerson() {
      getCheckPerson().then(res => {
        if (res.data.code === '200') {
          this.checkPeopleList = res.data.data || []
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
    // 判断送检单是否需要复核和核准
    async getDecideConfig() {
      const inspectMaterialProcess = this.currentRow?.inspectMaterialProcess
      if (inspectMaterialProcess) {
        this.reCheckValue = inspectMaterialProcess.existReview
        this.approveValue = inspectMaterialProcess.existAuthorize
      }
    },
    handleBeforeUpload(file) {
      const maxSize = 50 * 1024 * 1024 // 50MB 设置最大文件大小
      if (file.size > maxSize) {
        this.$message.warning(`文件大小超过了${maxSize / (1024 * 1024)}MB的限制`)
        return false
      }
    },
    // 上传文件
    async handleUpload(params, fileType = 'materialFile') {
      this.loadingUpload = true
      const formData = new FormData()
      formData.append('file', params.file)
      const {
        data: { data }
      } = await uploadFile(formData)
      console.log('🚀 ~ handleUpload ~ data:', data, fileType)
      this.addFile(data, fileType)
    },
    addFile(data, fileType = 'materialFile') {
      if (this.currentRow.checkFiles === null || !this.currentRow.checkFiles) {
        this.currentRow.checkFiles = []
      }
      const {
        name,
        fullPath,
        metaDataEntity: { lastModified }
      } = data
      try {
        this.currentRow.checkFiles.push({
          fileName: name,
          fileUrl: fullPath,
          compactor: JSON.parse(sessionStorage.getItem('userInfo'))?.nickname || '',
          createTime: lastModified,
          fileType
        })
        this.loadingUpload = false
      } catch (error) {
        console.log('🚀 ~ handleUpload ~ error:', error)
      }
    },
    handleExceed() {
      this.$message.warning('最多上传 10 个文件')
    }
    // 综合判定tab end
  }
}
</script>

<style lang="scss" scoped>
// 添加滚动条
.scroll {
  height: 100%;
  overflow: auto;
}
.scroll::-webkit-scrollbar {
  height: 8px; /* 设置滚动条的高度 */
  width: 8px; /* 设置滚动条的宽度 */
}
.inspectionItems {
  height: 100%;
  .centerArea {
    // box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    margin-bottom: 10px;
    .sample-add {
      margin-right: 10px;
      color: #1890ff;
    }
  }
  .button-and-search {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px 8px 0;

    .button-group {
    }
  }
  .gutter {
    margin-top: 12px;
  }
  ::v-deep .noShowContent > .el-tabs__content {
    display: none;
  }
  ::v-deep .noShowContent > .el-tabs__header {
    margin-bottom: 0;
  }
}
.itemName-class {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #1890ff;
  cursor: pointer;
  text-decoration: underline solid #1890ff; /* 设置下划线 */
  text-decoration-thickness: 1px; /* 设置下划线宽度 */
  text-underline-offset: 5px; /* 设置文字与下划线之间的间距 */
}
.reference-value {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 12px;
  color: #606266;
  margin-top: 4px;
  .blue {
    color: #1890ff;
  }
}
.check-result {
  display: flex;
  align-items: center;
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #1890ff;
  .check-result-text {
    margin-right: 6px;
  }
  .check-result-img {
    margin-bottom: -2px;
  }
  .gray {
    color:#7F7F7F;
  }
}

::v-deep .inspection-item .el-form-item {
  margin-bottom: 0;
}
::v-deep .el-input__inner {
  height: 32px;
}
// 综合判定tab start
.projectIndicator {
  .centerArea {
    // box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    // border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 18px 9px 18px;
    // margin-bottom: 10px;
    .title {
      // display: flex;
      // justify-content: space-between;
      position: relative;
    }
    .title::before {
      content: '';
      display: inline;
      position: absolute;
      left: -8px;
      top: 1px;
      width: 4px;
      height: 16px;
      background: #1890ff;
      border-radius: 2px 2px 2px 2px;
    }
    .title2 {
      position: relative;
    }
    .title2::before {
      content: '';
      display: inline;
      position: absolute;
      left: -8px;
      top: 5px;
      width: 4px;
      height: 16px;
      background: #1890ff;
      border-radius: 2px 2px 2px 2px;
    }
    .title-start {
      display: flex;
      align-items: center;
    }
  }
  .check {
    // .el-form-item {
    //   margin-left: 90px;
    // }
    // ::v-deep .el-form-item__label {
    //   display: block;
    //   width: auto !important;
    //   text-align: left;
    // }
  }
}
// 附件
.attachments-all {
  display: flex;
  flex-wrap: wrap; /* 允许项目换行 */
  align-items: flex-start; /* 项目在交叉轴上的起点对齐 */
  margin-top: 8px;
  .attachments {
    width: 390px;
    height: 32px;
    background: #f5f7fa;
    border-radius: 2px 2px 2px 2px;
    padding: 6px 10px 6px 8px;
    display: flex;
    align-items: center;
    margin-right: 80px;
    margin-bottom: 10px;
    .attachments-type {
      width: 16px;
      height: 18px;
      margin-right: 8px;
    }
    .attachments-text {
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      font-size: 12px;
      color: #333333;
      flex: 1;
    }
    .attachments-icon-gutter {
      margin-right: 12px;
    }
  }
}
::v-deep .el-form-item--medium .el-form-item__content {
  // width: 248px;
}
::v-deep .el-autocomplete {
  // width: 248px;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner,
::v-deep .el-select {
  // width: 248px;
}
// ::v-deep .input-field-width .el-form-item--medium .el-form-item__content,
// ::v-deep .input-field-width .el-autocomplete,
// ::v-deep .input-field-width .el-date-editor.el-input,
// ::v-deep .input-field-width .el-select ::v-deep .input-field-width .el-cascader .el-input .el-input__inner,
// .el-input--small .el-input__inner {
//   width: 100% !important;
//   // width: 100px !important;
// }
.attachment-tip {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
}
//判定结果占一行
::v-deep .all-line-width {
  display: block;
  // width: 1600px;
}
::v-deep .el-divider--horizontal {
  margin: 0 0 12px 0;
}
// 综合判定tab end
</style>
