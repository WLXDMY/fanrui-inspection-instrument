<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-16 16:54:06
 * @LastEditors: huyoujuan
 * @LastEditTime: 2023-11-24 12:23:58
 * @Description:
-->
<template>
  <div class="project-add">
    <!-- 内层 -->
    <section class="quality-edit-inner">
      <!-- 头部 -->
      <header class="edit-header">
        <el-button size="mini" type="primary" @click="back">返回</el-button>
        <el-button size="mini" type="primary" @click="saveCurrent">保存</el-button>
        <el-button size="mini" type="primary" @click="shrinkageAll">{{ word }}</el-button>
        <el-button
          v-if="initState === 2 || initState === 4"
          v-permission="{
            action: 'product.inspection.project:updateBtn'
          }"
          size="mini"
          type="primary"
          @click="handleUpdate"
          >更新</el-button
        >

        <el-button
          v-show="isExistApproveBtn"
          v-permission="{
            action: 'product.inspection.project:approval'
          }"
          :disabled="formInline.state !== 1 || !formInline.approver"
          type="primary"
          size="mini"
          @click="hdBtnClick({ type: 'approve' })"
        >
          审批
        </el-button>
      </header>
      <!-- 主要内容 -->
      <!-- 基本信息 -->
      <section class="base-info">
        <div class="base-info-title">
          <p>基本信息</p>
          <img src="@/assets/images/home/xiala@2x.png" alt="下拉" @click="retract" />
        </div>
        <el-collapse-transition>
          <div v-show="infoRetract" class="base-info-content">
            <el-form
              ref="projectForm"
              :inline="true"
              :model="formInline"
              :rules="projectRules"
              class="demo-form-inline"
              label-position="right"
              label-width="146px"
            >
              <el-form-item label="检验项目组:" prop="inspectionItemGroupId">
                <el-select
                  v-model="formInline.inspectionItemGroupId"
                  :disabled="initState !== 1"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="(item, index) in groupList"
                    :key="index"
                    :label="item.inspectionItemGroupName"
                    :value="item.inspectionItemGroupId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="检验项目:" prop="inspectionItemName">
                <el-input
                  v-model="formInline.inspectionItemName"
                  :disabled="initState !== 1"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="检验方法判定:" prop="determinationOfDetectionMethod">
                <el-select
                  v-model="formInline.determinationOfDetectionMethod"
                  :disabled="initState !== 1 && !isCanUpdate"
                  placeholder="请选择"
                  size="mini"
                  @change="changeMethod"
                >
                  <el-option v-for="(item, index) in methodsList" :key="index" :label="item.name" :value="item.code" />
                </el-select>
              </el-form-item>
              <el-form-item label="检验仪器:">
                <el-input
                  v-model="formInline.verificationInstrument"
                  :disabled="initState !== 1 && !isCanUpdate"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="检验标准:" >
                <el-input
                  v-model="formInline.verificationBasis"
                  :disabled="initState !== 1"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="检验方法:">
                <el-input
                  v-model="formInline.verificationMethod"
                  :disabled="initState !== 1 && !isCanUpdate"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="单位:">
                <el-select
                  v-model="formInline.unit"
                  placeholder="请选择"
                  clearable
                  :disabled="initState !== 1 && !isCanUpdate"
                  size="mini"
                >
                  <el-option v-for="item in unitList" :key="item.id" :label="item.name" :value="item.name" />
                </el-select>
              </el-form-item>
              <el-form-item label="上限值:" prop="upperLimitValue">
                <el-input
                  v-model="formInline.upperLimitValue"
                  :disabled="disabledFlag2 && !isCanUpdate"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="比较符:" prop="comparator">
                <el-select
                  v-model="formInline.comparator"
                  :disabled="disabledFlag && !isCanUpdate"
                  placeholder="请选择"
                  size="mini"
                  @change="changeCompare"
                >
                  <el-option
                    v-for="(item, index) in comparatorList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="标准值/边界值:" prop="referenceValue">
                <el-input
                  v-model="formInline.referenceValue"
                  onkeyup="value=value.replace(/[^\d.]/g,'')"
                  :disabled="initState !== 1 && !isCanUpdate"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="下限值:" prop="downLimitValue">
                <el-input
                  v-model="formInline.downLimitValue"
                  :disabled="disabledFlag2 && !isCanUpdate"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>

              <el-form-item label="状态:">
                <el-select
                  v-model="formInline.state"
                  :disabled="initState !== 1 && !isCanUpdate && !stopDisabled"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in stateList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-if="isExistApproveBtn" label="审批人:" prop="approver">
                <el-select
                  v-model="formInline.approver"
                  :disabled="initState !== 1 && !isCanUpdate"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="(item, index) in approvealList"
                    :key="index"
                    :label="item.nickname"
                    :value="item.username"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-if="isExistApproveBtn" label="实际审批人:">
                <el-input v-model="formInline.actualApproverName" disabled placeholder="请输入" size="mini" />
              </el-form-item>
              <el-form-item v-if="isShowApproveSignature" label="审批人签名：">
                <el-image
                  style="width: 100px"
                  :src="`${window.origin}/${formInline.actualApproverSignatureUrl}`"
                  :preview-src-list="[`${window.origin}/${formInline.actualApproverSignatureUrl}`]"
                />
              </el-form-item>
              <el-form-item label="是否生成检验报告:" prop="isExport">
                <el-select
                  v-model="formInline.isExport"
                  :disabled="initState !== 1 && !isCanUpdate"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option v-for="(item, index) in exportName" :key="index" :label="item.name" :value="item.code" />
                </el-select>
              </el-form-item>
              <el-form-item label="备注:" prop="remark">
                <el-input
                  v-model="formInline.remark"
                  type="textarea"
                  size="mini"
                  :disabled="initState !== 1 && !isCanUpdate"
                />
              </el-form-item>
              <el-form-item label="输入方式:" prop="inputMode">
                <el-select
                  v-model="formInline.inputMode"
                  placeholder="请选择"
                  size="mini"
                  clearable
                  :disabled="initState !== 1 && !isCanUpdate"
                >
                  <el-option
                    v-for="(item, index) in inputModeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="可选值:"
                prop="optionalValue"
                :rules="[
                  {
                    required: !!formInline.inputMode,
                    message: '该参数是必填项',
                    trigger: ['blur']
                  }
                ]"
              >
                <template slot="label" slot-scope="{}">
                  <span>可选值</span>
                  <el-tooltip class="item" effect="dark" placement="top">
                    <!--  问号的图标   -->
                    <i class="el-icon-question" style="font-size: 14px" />
                    <!--  提示的内容 -->
                    <div slot="content">*多选值用英文字符逗号分割“,”</div>
                  </el-tooltip>
                </template>
                <el-input
                  v-model="formInline.optionalValue"
                  placeholder="请输入"
                  size="mini"
                  :disabled="initState !== 1 && !isCanUpdate"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-transition>
      </section>
    </section>
    <!-- 审批弹窗 -->
    <EditApproveDialog
      ref="approvalDialog"
      :approve-config="{
        api: {
          url: '/qms/item/examine/approve',
          method: 'get'
        },
        extraRequestParams: {
          id: $route.query.id
        }
      }"
      @closeApprovalDialog="closeApprovalDialog"
    />
  </div>
</template>

<script>
import {
  getProjectGroupList,
  getMethodsList,
  getProjectDetail,
  updateProjectItem,
  getComparisonOperatorsList,
  getProjectItemStateList,
  getIsExportNameList
} from '@/api/quality-manage.js'
import { getStateApprover } from '@/api/base'
import { isExistApprove } from '@/api/examineApprove.js'
import { getUnitList } from '@/api/basisInfo.js'
import { getApproveSignatureConfigByCode } from '@/api/common'
export default {
  components: {
    EditApproveDialog: () => import('@/components/EditApproveDialog')
  },
  data() {
    return {
      window,
      formInline: {
        inspectionItemId: '',
        inspectionItemGroupId: '', // 检验项目组ID
        inspectionItemGroupName: '', // 检验项目组名称
        determinationOfDetectionMethod: '',
        inspectionItemName: '', // 检验项目名称
        verificationInstrument: '', // 检验仪器
        verificationBasis: '', // 校验依据
        verificationMethod: '', // 校验方法
        upperLimitValue: '', // 上限值
        unit: '', // 单位
        comparator: '', // 比较符
        referenceValue: '', // 参考值
        downLimitValue: '', // 下限值
        actualApproverName: '',
        approver: '',
        state: '',
        isExport: '',
        remark: '', // 备注
        inputMode: '', // 输入方式
        optionalValue: '' // 可选值
      },
      id: '',
      disabledFlag: true, // 上限下限
      disabledFlag2: true, // 上限下限
      isExistApproveBtn: false,
      approvealList: [], // 审批人
      code: 'productInspectionProject',
      infoRetract: true,
      activeName: '',
      groupList: [], // 检验项目组
      methodsList: [], // 检验方法判定
      baseInfoList: {}, // 详情数据列表
      comparatorList: [],
      stateList: [],
      exportName: [],
      word: '全部收起',
      projectRules: {
        inspectionItemGroupId: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        inspectionItemName: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ],
        determinationOfDetectionMethod: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        referenceValue: [
          {
            required: false,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ],
        approver: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ],
        downLimitValue: [
          {
            required: false,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ],
        upperLimitValue: [
          {
            required: false,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ],
        comparator: [
          {
            required: false,
            message: '该参数是必填项',
            trigger: ['change']
          }
        ]
      },
      unitList: [],
      inputModeOptions: [
        { value: 'single-select', label: '下拉单选' },
        { value: 'multiple-select', label: '下拉多选' }
      ],
      isCanUpdate: false,
      initState: '',
      stopDisabled: false, // 状态是停用的情况下，除状态外，不能修改
      isShowApproveSignature: false // 是否显示审批人签名
    }
  },
  created() {
    this.init()
    this.getStateApprover()
    this.getIsExportNameList()
    this.getApproveSignatureConfigByCode()
  },
  methods: {
    changeCompare(item) {
      // 选between时非必填
      if (item === '777') {
        this.projectRules.downLimitValue[0].required = true
        this.projectRules.upperLimitValue[0].required = true
        this.projectRules.referenceValue[0].required = false
        this.disabledFlag2 = false
      } else {
        this.projectRules.downLimitValue[0].required = false
        this.projectRules.upperLimitValue[0].required = false
        this.projectRules.referenceValue[0].required = true
        this.disabledFlag2 = true
      }
    },
    changeMethod(item) {
      console.log('change method', typeof item, item)
      // 2222定量分析,定量且为between上下限必填
      if (item === 2222) {
        this.disabledFlag = false
        this.disabledFlag2 = false
        this.projectRules.comparator[0].required = true
      } else {
        this.disabledFlag = true
        this.disabledFlag2 = true
        this.projectRules.comparator[0].required = false
        this.projectRules.downLimitValue[0].required = false
        this.projectRules.upperLimitValue[0].required = false
        this.projectRules.referenceValue[0].required = false
        this.formInline.upperLimitValue = ''
        this.formInline.comparator = ''
        this.formInline.downLimitValue = ''
      }
    },
    getIsExportNameList() {
      getIsExportNameList().then(res => {
        if (res.data.code === '200') {
          this.exportName = res.data.data || []
        }
      })
    },
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
    // 创建人审批人
    getStateApprover() {
      getStateApprover(this.code).then(res => {
        if (res.data.code === '200') {
          this.approvealList = res.data.data || []
        }
      })
    },
    // 初始化
    init() {
      const { name, id } = this.$route.query || {}
      this.activeName = name
      this.id = id
      this.formInline.inspectionItemId = id

      Promise.all([
        this.isExistApprove(),
        this.getListOfState(),
        this.getList(),
        this.getMethodsList(),
        this.getUnitList(),
        this.getCurrentDetail(),
        this.getComparison()
      ])
    },
    // 获取数据列表
    async getList() {
      const result = await getProjectGroupList()
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        this.groupList = data.records || {}
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 获取状态列表
    async getListOfState() {
      const result = await getProjectItemStateList()
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        this.stateList = data.map(item => {
          const disabled = false
          return {
            code: item.code,
            name: item.name,
            disabled
          }
        })
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 获取方法数据列表
    async getMethodsList() {
      const result = await getMethodsList()
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        this.methodsList = data || []
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 获取当前数据的详情
    async getCurrentDetail() {
      const result = await getProjectDetail(this.id)
      const { code, message, data } = result.data || {}
      if (+code === 200) {
        const { state } = data || {}
        this.formInline = data || {}
        if (data.determinationOfDetectionMethod === 2222) {
          this.disabledFlag = false
          this.disabledFlag2 = false
          this.projectRules.comparator[0].required = true
        } else {
          this.disabledFlag = true
          this.disabledFlag2 = true
          this.projectRules.comparator[0].required = false
          this.projectRules.referenceValue[0].required = false
        }
        if (data.comparator && data.comparator === '777') {
          this.projectRules.downLimitValue[0].required = true
          this.projectRules.upperLimitValue[0].required = true
          this.projectRules.referenceValue[0].required = false
          this.disabledFlag2 = false
        } else {
          this.projectRules.downLimitValue[0].required = false
          this.projectRules.upperLimitValue[0].required = false
          this.disabledFlag2 = true
        }
        /* if (data.comparator && data.comparator !== '777' && data.determinationOfDetectionMethod === 2222) {
          this.projectRules.downLimitValue[0].required = true
        }*/
        this.initState = state
        if (state === 2) {
          // 生效
          this.disabledFlag2 = true
          this.disabledFlag = true
          this.stateList.forEach(el => {
            if (+el.code < state) {
              el.disabled = true
            }
          })
        }
        if (state === 3) {
          this.disabledFlag2 = true
          this.disabledFlag = true
        }
        if (state === 4) {
          this.disabledFlag2 = true
          this.disabledFlag = true
          // 停用状态下：只允许生效和停用状态互相切换
          this.stateList.forEach(el => {
            if (+el.code !== state && +el.code !== 2) {
              el.disabled = true
            }
          })
        }
        if (this.isExistApproveBtn) {
          if (state === 1) {
            this.stateList[1].disabled = true
          }
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
    // 保存数据
    saveCurrent() {
      // 获取name
      const { inspectionItemGroupId, inspectionItemId } = this.formInline || {}
      const template = this.groupList.find(item => item.inspectionItemGroupId === inspectionItemGroupId)
      const { inspectionItemGroupName } = template || {}
      this.formInline.inspectionItemGroupName = inspectionItemGroupName
      this.formInline.inspectionItemGroupEntityList = this.groupList
      const {
        determinationOfDetectionMethod,
        inspectionItemName, // 检验项目名称
        verificationInstrument, // 检验仪器
        verificationBasis, // 校验依据
        verificationMethod, // 校验方法
        upperLimitValue, // 上限值
        comparator, // 比较符
        referenceValue, // 参考值
        downLimitValue, // 下限值
        state,
        approver,
        isExport,
        remark,
        inputMode,
        optionalValue,
        unit
      } = this.formInline
      const params = {
        inspectionItemId,
        inspectionItemGroupId, // 检验项目组ID
        inspectionItemGroupName, // 检验项目组名称
        determinationOfDetectionMethod,
        inspectionItemName, // 检验项目名称
        verificationInstrument, // 检验仪器
        verificationBasis, // 校验依据
        verificationMethod, // 校验方法
        upperLimitValue, // 上限值
        comparator, // 比较符
        referenceValue, // 参考值
        downLimitValue, // 下限值
        state,
        approver,
        isExport,
        remark,
        inputMode,
        optionalValue,
        unit
      }
      this.$refs['projectForm'].validate(async valid => {
        if (valid) {
          const result = await updateProjectItem(params)
          const { code, message } = result.data || {}
          if (+code === 200) {
            this.$notify({
              title: '提示',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            // this.$nextTick(() => {
            //   this.$refs['projectForm'].clearValidate()
            // })
            this.back()
          } else {
            this.$notify({
              title: '提示',
              message: message || 'error',
              type: 'error',
              duration: 2000
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 返回
    back() {
      this.$router.push({
        path: '/inspection-manage/productInspection/project',
        query: {
          name: this.activeName
        }
      })
    },
    // 全部收起
    shrinkageAll() {
      this.infoRetract = !this.infoRetract
      if (!this.infoRetract) {
        this.word = '全部展开'
      } else {
        this.word = '全部收起'
      }
    },
    // 收起
    retract() {
      this.infoRetract = !this.infoRetract
    },
    // 获取比较符
    async getComparison() {
      const result = await getComparisonOperatorsList()
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        this.comparatorList = data || []
      } else {
        this.$notify({
          title: '提示',
          message: message || 'error',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 查询单位
    getUnitList() {
      getUnitList().then(res => {
        this.loading = false
        if (res.data.code === '200') {
          this.unitList = res.data.data.records
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || '获取单位列表失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 增加更新按钮，可对生效后，除检验项目，以外内容进行更新
    handleUpdate() {
      // 生效状态下才可显示 【更新】 按钮
      this.$confirm('是否确认更新?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 允许编辑
        if (this.initState == 2) {
          this.isCanUpdate = true
        } else if (this.initState == 4) {
          this.stopDisabled = true
        }
      })
    },
    async hdBtnClick({ type, row }) {
      switch (type) {
        // 返回
        case 'approve':
          this.$refs.approvalDialog.showDetailDialog = true
          break
        default:
          break
      }
    },
    closeApprovalDialog() {
      this.getCurrentDetail()
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
.project-add {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #e9eef4;
  position: relative;
  .quality-edit-inner {
    width: 98%;
    height: 98%;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // 头部内容
    .edit-header {
      padding: 17px 0 9px 18px;
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.16);
    }
    // 基本信息
    .base-info {
      padding: 12px 0px 9px 18px;
      .base-info-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: bolder;
          color: #333333;
        }
        img {
          width: 14px;
          height: 16px;
          margin-right: 37px;
        }
      }
      .base-info-content {
        width: 80%;
      }
    }
  }
  ::v-deep .el-input--mini {
    width: 200px;
  }
}
</style>
