<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-16 16:54:06
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-09-14 17:36:13
 * @Description:
-->
<template>
  <div class="commonPage">
    <!-- 内层 -->
    <section class="quality-edit-inner">
      <!-- 头部 -->
      <header class="edit-header">
        <el-button size="mini" type="primary" @click="back">返回</el-button>
        <el-button v-if="!isDetailType" size="mini" type="primary" @click="handleSaveBtn">保存</el-button>
        <el-button
          v-if="isAddType && !isExistApproveBtn"
          v-permission="{ action: 'inspection-manage.inspect:saveAndEffect' }"
          type="primary"
          size="mini"
          @click="savaAndEffective"
        >
          保存并生效
        </el-button>
      </header>
      <div class="scroll">
        <el-form
          ref="projectForm"
          :inline="true"
          :model="formInline"
          :rules="rules"
          class="demo-form-inline"
          label-position="right"
          label-width="150px"
        >
          <!-- 基本信息 -->
          <section class="base-info">
            <div class="base-info-title">
              <p>基本信息</p>
            </div>
            <el-form-item label="单据编号" prop="code">
              <el-input v-model="formInline.code" size="mini" :disabled="!isAddType">
                <template v-if="isAddType" slot="suffix">
                  <i class="el-icon-s-operation" style="cursor: pointer" @click.stop="handleResetCode" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="检验类型" prop="type">
              <el-select v-model="formInline.type" placeholder="请选择" size="mini" :disabled="!isAddType">
                <el-option
                  v-for="(item, index) in inspectTypeEnums"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="关联单据类型" prop="relateDocumentType">
              <el-select
                v-model="formInline.relateDocumentType"
                placeholder="请选择"
                size="mini"
                :disabled="!isAddType"
              >
                <el-option v-for="(item, index) in documentEnums" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="!isAddType" label="状态" prop="status">
              <el-select v-model="formInline.status" placeholder="请选择" size="mini">
                <el-option
                  v-for="(item, index) in statusEnums"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formInline.remark" size="mini" />
            </el-form-item>
            <el-form-item label="拓展字段1" prop="inspectExtendFieldOne">
              <el-input v-model="formInline.inspectExtendFieldOne" size="mini" />
            </el-form-item>
            <el-form-item label="拓展字段2" prop="inspectExtendFieldTwo">
              <el-input v-model="formInline.inspectExtendFieldTwo" size="mini" />
            </el-form-item>
            <el-form-item label="拓展字段3" prop="inspectExtendFieldThree">
              <el-input v-model="formInline.inspectExtendFieldThree" size="mini" />
            </el-form-item>
            <el-form-item label="拓展字段4" prop="inspectExtendFieldFour">
              <el-input v-model="formInline.inspectExtendFieldFour" size="mini" />
            </el-form-item>
            <el-form-item label="拓展字段5" prop="inspectExtendFieldFive">
              <el-input v-model="formInline.inspectExtendFieldFive" size="mini" />
            </el-form-item>
          </section>

          <DetailedLIst
            ref="DetailedLIstRef"
            :base-form="formInline"
            :current-row.sync="currentRow"
            :click-index.sync="clickIndex"
            :interface-record="interfaceRecord"
            :init-status="initStatus"
          />

          <CommonRadioGroup :tab-value.sync="tabValue" :radio-list="radioList" />

          <el-tabs v-model="tabValue" class="noShowHeader">
            <el-tab-pane :label="radioList[0].label" :name="radioList[0].value">
              <InspectionProgram
                ref="InspectionProgramRef"
                :current-row="currentRow"
                :click-index="clickIndex"
                :show-decisions="showDecisions"
                @changeRow="changeRow"
              />
            </el-tab-pane>
            <el-tab-pane :label="radioList[1].label" :name="radioList[1].value">
              <InspectionItems :current-row="currentRow" :click-index="clickIndex" @changeRow="changeRow" />
            </el-tab-pane>
            <el-tab-pane :label="radioList[2].label" :name="radioList[2].value">
              <DefectRecords :current-row="currentRow" :click-index="clickIndex" @changeRow="changeRow" />
            </el-tab-pane>
            <el-tab-pane :label="radioList[3].label" :name="radioList[3].value">
              <Attachments :current-row="currentRow" :click-index="clickIndex" @changeRow="changeRow" />
            </el-tab-pane>
            <el-tab-pane v-if="!isAddType" :label="radioList[4].label" :name="radioList[4].value">
              <OperationRecord :record-info="formInline" />
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </section>
    <!-- 编码规则 -->
    <common-code-rule-dialog
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="91"
      is-open-reg-disabled-space
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    />
  </div>
</template>

<script>
import { isExistApprove } from '@/api/examineApprove.js'
// 枚举常量
import { getStatusEnums, getInspectTypeEnumsByConfig, getDocumentEnums } from '@/api/quality-manage.js'
import { addInspection, releasedInspection, inspectUpdate } from '@/api/quality-manage.js'
import { getInspectDetail } from '@/api/quality-manage.js'
import CommonRadioGroup from '@/components/CommonRadioGroup/index.vue'
import OperationRecord from '@/components/OperationRecord/index.vue'
import DetailedLIst from './detailedLIst/detailedLIst.vue'
import InspectionProgram from './tabPages/inspectionProgram/index.vue'
import InspectionItems from './tabPages/inspectionItems/index.vue'
import DefectRecords from './tabPages/defectRecords/index.vue'
import Attachments from './tabPages/attachments/index.vue'
export default {
  components: {
    CommonRadioGroup,
    OperationRecord,
    DetailedLIst,
    InspectionProgram,
    InspectionItems,
    DefectRecords,
    Attachments
  },
  provide() {
    return {
      sheetInitStatus: () => this.sheetInitStatus
    }
  },
  data() {
    return {
      tabValue: 'inspectionProgram',
      formInline: {
        code: '',
        type: '',
        relateDocumentType: '',
        status: '',
        remark: '',
        createByName: '',
        createTime: '',
        updateByName: '',
        updateTime: '',
        inspectExtendFieldOne: '',
        inspectExtendFieldTwo: '',
        inspectExtendFieldThree: '',
        inspectExtendFieldFour: '',
        inspectExtendFieldFive: ''
      },
      rules: {
        code: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }],
        type: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }],
        relateDocumentType: [{ required: true, message: '该参数是必填项', trigger: ['change'] }]
      },
      interfaceRecord: {},
      isExistApproveBtn: false, // 是否开启审批
      statusEnums: [],
      inspectTypeEnums: [],
      documentEnums: [],
      currentRow: {},
      clickIndex: -1,
      isAutoOpen: false,
      initStatus: 1,
      openDecisionInspectTypes: []
    }
  },
  computed: {
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    },
    isDetailType() {
      return this.$route.name.includes('Detail')
    },
    sheetInitStatus() {
      return this.initStatus === 3 || this.initStatus === 4
    },
    radioList() {
      const list = [
        { label: '检验方案与结果', value: 'inspectionProgram' },
        { label: '检验项目', value: 'inspectionItems' },
        { label: '缺陷记录', value: 'defectRecords' },
        { label: '附件列表', value: 'attachments' },
        { label: '操作记录', value: 'operationRecord' }
      ]
      if (this.isAddType) return list.filter(item => item.value !== 'operationRecord')
      return list
    },
    showDecisions() {
      return this.openDecisionInspectTypes.includes(this.formInline.type)
    }
  },
  watch: {
    tabValue: {
      async handler(val) {
        const { id } = this.$route.query
        if (this.interfaceRecord[val] || (this.isAddType && !id)) return
        this.interfaceRecord[val] = true
      },
      immediate: true
    },
    // 根据检验类型获得关联单据类型枚举
    'formInline.type'(val) {
      this.getDocumentEnums(val)
      this.rules.relateDocumentType[0].required = val !== 'otherInspect'
      if (this.isAddType) {
        this.formInline.relateDocumentType = ''
      }

      // 编辑时，检验类型为退货检验，并且关联单据类型没有值，则关联单据类型可以不必填
      // 数据来源：小程序新增的数据
      if (val === 'returnGoodsInspect' && !this.formInline.relateDocumentType && this.isEditType) {
        this.rules.relateDocumentType[0].required = false
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // 禁止修改
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 1500)
    }
    if (this.isAddType) {
      // 打开编码规则弹窗
      this.isAutoOpen = true
      // this.$refs['codeRuleDialog'].open()
    }

    if (!this.isAddType) {
      this.getInspectDetail()
    }
  },
  methods: {
    // 初始化
    init() {
      this.getStatusEnums()
      this.getInspectTypeEnums()
      this.isAllowApprove()
    },
    // 获取状态枚举
    async getStatusEnums() {
      const result = await getStatusEnums()
      const { data } = result.data || []
      this.statusEnums = data || []
    },
    // 获取检验类型枚举
    async getInspectTypeEnums() {
      const result = await getInspectTypeEnumsByConfig()
      const { data } = result.data || []
      this.inspectTypeEnums = data.inspectTypes || []
      this.openDecisionInspectTypes = data.openDecisionInspectTypes
      if (this.isAddType) {
        this.formInline.type = data.defaultInspectType
      }
    },
    // 获取关联单据枚举
    async getDocumentEnums(type) {
      const result = await getDocumentEnums(type)
      const { data } = result.data || []
      this.documentEnums = data
    },
    // 获取审批权限
    async isAllowApprove() {
      const res = await isExistApprove('inspectOrder')
      const { data } = res.data || {}
      this.isExistApproveBtn = data
    },
    // 切换编码规则
    async handleResetCode() {
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    handleConfirmCodeRuleDialog(code) {
      if (this.isAddType) {
        this.formInline.code = code
      }
    },
    // 切换行
    changeRow(flag) {
      this.$refs.DetailedLIstRef.changeRow(flag)
    },
    // 获取检验单详情
    getInspectDetail() {
      const { id } = this.$route.query
      getInspectDetail(id)
        .then(res => {
          const data = res.data.data
          this.formInline.id = data.id
          this.formInline.code = data.code
          this.formInline.type = data.type
          this.formInline.relateDocumentType = data.relateDocumentType
          this.formInline.remark = data.remark
          this.formInline.status = data.status
          this.formInline.inspectExtendFieldOne = data.inspectExtendFieldOne
          this.formInline.inspectExtendFieldTwo = data.inspectExtendFieldTwo
          this.formInline.inspectExtendFieldThree = data.inspectExtendFieldThree
          this.formInline.inspectExtendFieldFour = data.inspectExtendFieldFour
          this.formInline.inspectExtendFieldFive = data.inspectExtendFieldFive
          this.initStatus = data.status
          this.$refs.DetailedLIstRef.handleEcho(data.materials)

          // 获取操作记录
          this.formInline.createByName = data.createByName
          this.formInline.createTime = data.createTime
          this.formInline.updateByName = data.updateByName
          this.formInline.updateTime = data.updateTime
          // 禁用状态选项
          this.disabledStatusEnums()
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 禁用状态选项
    disabledStatusEnums() {
      if (this.initStatus === 1) {
        this.statusEnums.forEach(item => {
          if (item.code === 3 || item.code === 4 || (this.isExistApproveBtn && item.code === 2)) {
            item.disabled = true
          }
        })
      }
      if (this.initStatus === 2) {
        this.statusEnums.forEach(item => {
          if (item.code === 1 || item.code === 4) {
            item.disabled = true
          }
        })
      }
      if (this.initStatus === 3) {
        this.statusEnums.forEach(item => {
          if (item.code === 1 || item.code === 2) {
            item.disabled = true
          }
        })
      }
      if (this.initStatus === 4) {
        this.statusEnums.forEach(item => {
          item.disabled = true
        })
      }
      if (this.sheetInitStatus) {
        setTimeout(() => {
          this.$disableInputDetail()
        }, 1000)
      }
    },
    // 构建新增的传参数据结构
    generateSaveParams() {
      let params = {}
      const detailTableData = this.$refs.DetailedLIstRef.formInline.detailTableData

      const materials = detailTableData.map((row, index) => {
        // 样次
        const materialNums =
          row.materialNums?.map(materialNum => {
            // 样次关联的检验项目
            const numItems = materialNum.numItems.map(item => {
              // 检验结果可能是数组和字符串
              const checkResult = Array.isArray(item.checkResult) ? item.checkResult.join?.() : item.checkResult
              const optionalValue = item.optionalValue.join?.() || ''
              // 检验项目中的项目缺陷
              const itemDefects = item.itemDefects.map(defect => {
                const productCodes = defect.productCodes.split(',')
                return {
                  ...defect,
                  productCodes
                }
              })
              return {
                ...item,
                itemDefects,
                checkResult,
                optionalValue
              }
            })
            return {
              ...materialNum,
              numItems
            }
          }) || []
        return {
          ...row,
          materialNums,
          lineNumber: index + 1
        }
      })

      params = {
        ...this.formInline,
        materials
      }
      return params
    },
    // 校验数量和检验结果等
    validateData() {
      return new Promise((resolve, reject) => {
        const detailTableData = this.$refs.DetailedLIstRef.formInline.detailTableData
        const questionRow = []
        detailTableData.forEach((item, index) => {
          const quantity = item.materialDecisions?.reduce((p, v) => {
            return p + Number(v.quantity)
          }, 0)
          if (quantity && quantity !== item.inspectQuantity) {
            questionRow.push(index + 1)
          }
        })
        if (questionRow.length > 0) {
          // this.$message.warning(`第${questionRow.join()}行分录明细决策数量不等于送检数量`)
          this.$confirm(
            `第${questionRow[0]}行<span style="color: #E6A23C;">检验决策总数</span>与物料<span style="color: #409EFF;">送检数量</span>不相等，是否确认提交？`,
            '提示',
            {
              dangerouslyUseHTMLString: true, // 允许使用 HTML
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              resolve(true)
            })
            .catch(() => {
              resolve(false)
            })
        } else {
          resolve(true)
        }
      })
    },
    // 点击保存按钮
    async handleSaveBtn() {
      if (this.isAddType) {
        this.handleSave()
        return
      }
      // 先不校验
      const passValidate = true
      // if (this.initStatus !== 3 && this.formInline.status === 3) {
      //   passValidate = await this.validateData()
      // }
      passValidate && this.handleEditSave()
    },
    // 保存数据
    async handleSave() {
      try {
        if (this.$refs.DetailedLIstRef.formInline.detailTableData?.length === 0) {
          this.$message.warning('请添加分录明细')
          return
        }
        await this.$refs['projectForm'].validate()
        await this.$refs.DetailedLIstRef.$refs.detailedListRef.validate()
        await this.$refs.InspectionProgramRef.$refs.projectForm.validate()
        const params = this.generateSaveParams()
        if (params === false) return
        await addInspection(params)
        this.$notify({
          title: '提示',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.back()
      } catch (error) {
        console.log('error submit!!', error)
      }
    },
    // 保存并且生效
    async savaAndEffective() {
      try {
        await this.$refs['projectForm'].validate()
        await this.$refs.DetailedLIstRef.$refs.detailedListRef.validate()
        await this.$refs.InspectionProgramRef.$refs.projectForm.validate()
        const params = this.generateSaveParams()
        await releasedInspection(params)
        this.$notify({
          title: '提示',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.back()
      } catch (error) {
        console.log('error submit!!', error)
      }
    },
    // 编辑数据
    async handleEditSave() {
      try {
        await this.$refs['projectForm'].validate()
        await this.$refs.DetailedLIstRef.$refs.detailedListRef.validate()
        await this.$refs.InspectionProgramRef.$refs.projectForm.validate()
        const params = this.generateSaveParams()
        if (params === false) return
        await inspectUpdate(params)
        this.$notify({
          title: '提示',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
        this.back()
      } catch (error) {
        console.log('error submit!!', error)
      }
    },
    // 返回
    back() {
      this.$router.push({
        name: 'productInspection'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.commonPage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f6f6f6;
  position: relative;
  .quality-edit-inner {
    width: 98%;
    height: 98%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // 头部内容
    .edit-header {
      background: white;
      margin-bottom: 10px;
      padding: 17px 0 9px 18px;
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
      border-radius: 4px 4px 4px 4px;
    }
    .scroll {
      height: calc(100% - 64px);
      overflow: auto;
    }
    .scroll::-webkit-scrollbar {
      height: 8px; /* 设置滚动条的高度 */
      width: 8px; /* 设置滚动条的宽度 */
    }
    // 基本信息
    .base-info {
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
    .base-info,
    .centerArea,
    .bottomArea {
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
      border-radius: 4px 4px 4px 4px;
      background: white;
      padding: 12px 0px 9px 18px;
    }
    .bottomArea {
      margin-top: 10px;
    }
  }
  ::v-deep .el-input--mini {
    width: 200px;
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
  ::v-deep .noShowHeader > .el-tabs__header {
    display: none;
  }
  ::v-deep .deleteBtn:not(.is-disabled) {
    color: #f52c27;
  }
}
</style>
<style>
/* 去掉number输入框的上下箭头 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
/* 解决input number框输入中文后光标上移的问题 */
.el-input__inner {
  line-height: 1px !important;
}
</style>
