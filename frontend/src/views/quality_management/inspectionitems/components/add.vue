<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-16 16:54:06
 * @LastEditors: huyoujuan
 * @LastEditTime: 2023-11-24 12:25:09
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
        <el-button
          v-if="!isExistApproveBtn"
          v-permission="{ action: 'product.inspection.project:saveAndEffect' }"
          type="primary"
          size="mini"
          @click="savaAndEffective"
        >
          保存并生效
        </el-button>
        <el-button size="mini" type="primary" @click="shrinkageAll">全部收起</el-button>
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
              label-width="200px"
            >
              <el-form-item label="检验项目组:" prop="inspectionItemGroupId">
                <el-select v-model="formInline.inspectionItemGroupId" placeholder="请选择" size="mini" clearable>
                  <el-option
                    v-for="(item, index) in groupList"
                    :key="index"
                    :label="item.inspectionItemGroupName"
                    :value="item.inspectionItemGroupId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="检验项目:" prop="inspectionItemName">
                <el-input v-model="formInline.inspectionItemName" clearable placeholder="请输入" size="mini" />
              </el-form-item>
              <el-form-item label="检验方法判定:" prop="determinationOfDetectionMethod">
                <el-select
                  v-model="formInline.determinationOfDetectionMethod"
                  placeholder="请选择"
                  size="mini"
                  clearable
                  @change="changeMethod"
                >
                  <el-option v-for="(item, index) in methodsList" :key="index" :label="item.name" :value="item.code" />
                </el-select>
              </el-form-item>
              <el-form-item label="检验仪器:">
                <el-input v-model="formInline.verificationInstrument" clearable placeholder="请输入" size="mini" />
              </el-form-item>
              <el-form-item label="检验标准:">
                <el-input v-model="formInline.verificationBasis" clearable placeholder="请输入" size="mini" />
              </el-form-item>
              <el-form-item label="检验方法:">
                <el-input v-model="formInline.verificationMethod" placeholder="请输入" size="mini" />
              </el-form-item>
              <el-form-item label="单位:">
                <el-select v-model="formInline.unit" placeholder="请选择" clearable size="mini">
                  <el-option v-for="item in unitList" :key="item.id" :label="item.name" :value="item.name" />
                </el-select>
              </el-form-item>
              <el-form-item label="上限值:" prop="upperLimitValue">
                <el-input
                  v-model="formInline.upperLimitValue"
                  clearable
                  :disabled="disabledFlag2"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="比较符:" prop="comparator">
                <el-select
                  v-model="formInline.comparator"
                  :disabled="disabledFlag"
                  placeholder="请选择"
                  size="mini"
                  clearable
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
                  clearable
                  onkeyup="value=value.replace(/[^\d.]/g,'')"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>
              <el-form-item label="下限值:" prop="downLimitValue">
                <el-input
                  v-model="formInline.downLimitValue"
                  clearable
                  :disabled="disabledFlag2"
                  placeholder="请输入"
                  size="mini"
                />
              </el-form-item>
              <el-form-item v-if="isExistApproveBtn" label="审批人:" prop="approver">
                <el-select v-model="formInline.approver" placeholder="请选择" size="mini" clearable>
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
                <el-select v-model="formInline.isExport" placeholder="请选择" size="mini" clearable>
                  <el-option v-for="(item, index) in exportName" :key="index" :label="item.name" :value="item.code" />
                </el-select>
              </el-form-item>
              <el-form-item label="备注:" prop="remark">
                <el-input v-model="formInline.remark" type="textarea" clearable size="mini" />
              </el-form-item>
              <el-form-item label="输入方式:" prop="inputMode">
                <el-select v-model="formInline.inputMode" placeholder="请选择" size="mini" clearable>
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
                <el-input v-model="formInline.optionalValue" placeholder="请输入" size="mini" />
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-transition>
      </section>
    </section>
  </div>
</template>

<script>
import {
  getProjectGroupList,
  addProjectItem,
  getMethodsList,
  getComparisonOperatorsList,
  getIsExportNameList,
  projectItemSaveAndEffect
} from '@/api/quality-manage.js'
import { getStateApprover } from '@/api/base'
import { getUnitList } from '@/api/basisInfo.js'
import { isExistApprove } from '@/api/examineApprove.js'
import { getApproveSignatureConfigByCode } from '@/api/common'
export default {
  data() {
    return {
      window,
      formInline: {
        inspectionItemGroupId: '', // 检验项目组ID
        inspectionItemGroupName: '', // 检验项目组名称
        determinationOfDetectionMethod: '',
        inspectionItemName: '', // 检验项目名称
        verificationInstrument: '', // 检验仪器
        verificationBasis: '', // 校验依据
        verificationMethod: '', // 校验方法
        unit: '', // 单位
        upperLimitValue: '', // 上限值
        comparator: '', // 比较符
        referenceValue: '', // 参考值
        downLimitValue: '', // 下限值
        actualApproverName: '', // 实际审批人
        approver: '', // 审批人
        isExport: '',
        remark: '', // 备注
        inputMode: '', // 输入方式
        optionalValue: '' // 可选值
      },
      isExistApproveBtn: false,
      disabledFlag: true, // 上限下限
      disabledFlag2: true, // 上限下限
      code: 'productInspectionProject',
      infoRetract: true,
      activeName: '',
      groupList: [], // 检验项目组
      methodsList: [], // 检验方法判定
      unitList: [], // 单位
      comparatorList: [], // 比较符list
      approvealList: [], // 审批人
      exportName: [],
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
        ],
        referenceValue: [
          {
            required: false,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ]
      },
      inputModeOptions: [
        { value: 'single-select', label: '下拉单选' },
        { value: 'multiple-select', label: '下拉多选' }
      ],
      isShowApproveSignature: false // 是否显示审批人签名
    }
  },
  created() {
    this.init()
    this.getStateApprover()
    this.isExistApprove()
    this.getIsExportNameList()
    this.getUnitList()
    this.getApproveSignatureConfigByCode()
  },
  methods: {
    changeCompare(item) {
      // 选between时非必填，只要不是between参考值都为必填
      if (item == '777') {
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
      // 2222定量分析,定量且为between上下限必填
      if (item == '2222') {
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
          this.formInline.isExport = 2
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
      const { name } = this.$route.query || {}
      this.activeName = name
      this.getList()
      this.getMethodsList()
      this.getComparison()
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
    savaAndEffective() {
      // 获取name
      const { inspectionItemGroupId } = this.formInline || {}
      const template = this.groupList.find(item => item.inspectionItemGroupId === inspectionItemGroupId)
      const { inspectionItemGroupName } = template || {}
      this.formInline.inspectionItemGroupName = inspectionItemGroupName

      this.$refs['projectForm'].validate(async valid => {
        if (valid) {
          const result = await projectItemSaveAndEffect(this.formInline)
          const { code, message } = result.data || {}
          if (+code === 200) {
            this.$notify({
              title: '提示',
              message: '新增成功',
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 保存数据
    saveCurrent() {
      // 获取name
      const { inspectionItemGroupId } = this.formInline || {}
      const template = this.groupList.find(item => item.inspectionItemGroupId === inspectionItemGroupId)
      const { inspectionItemGroupName } = template || {}
      this.formInline.inspectionItemGroupName = inspectionItemGroupName

      this.$refs['projectForm'].validate(async valid => {
        if (valid) {
          const result = await addProjectItem(this.formInline)
          const { code, message } = result.data || {}
          if (+code === 200) {
            this.$notify({
              title: '提示',
              message: '新增成功',
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
      this.infoRetract = false
    },
    // 收起
    retract() {
      this.infoRetract = !this.infoRetract
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
