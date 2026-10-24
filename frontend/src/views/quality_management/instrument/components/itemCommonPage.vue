<!--
 * @Author: shunhua.liang
 * @Date: 2021-12-16 16:54:06
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-25 10:23:21
 * @Description: 仪器新增/编辑/详情
-->
<template>
  <div class="commonPage">
    <!-- 内层 -->
    <section class="quality-edit-inner">
      <!-- 头部 -->
      <header class="edit-header">
        <div class="edit-actions">
          <el-button size="mini" @click="back">返回</el-button>
          <el-button v-if="!isDetailType" size="mini" type="primary" @click="handleSaveBtn">保存</el-button>
          <el-button
            v-if="isAddType"
            v-permission="{ action: 'qms-product-inspection.inspection-manage.instrument:saveAndEffect' }"
            type="primary"
            size="mini"
            @click="savaAndEffective"
          >
            保存并生效
          </el-button>
        </div>
      </header>
      <div class="scroll">
        <el-form
          ref="projectForm"
          :inline="true"
          :model="formInline"
          :rules="projectRules"
          class="demo-form-inline instrument-form"
          label-position="right"
          label-width="128px"
        >
          <!-- 基本信息 -->
          <section class="base-info">
            <div class="base-info-title">
              <p>基本信息</p>
            </div>
            <!-- <el-form-item :label="getLabelName('code', '仪器编码')" prop="code">
              <el-input v-model="formInline.code" clearable placeholder="编码保存后自动生成" size="mini" :disabled="!isAddType">
                <template
                  v-if="isAddType"
                  slot="suffix"
                ><i
                  class="el-icon-s-operation"
                  style="cursor: pointer"
                  @click.stop="handleResetCode"
                /></template>
              </el-input>
            </el-form-item> -->
            <el-form-item class="instrument-form-item" :label="getLabelName('instrumentCode', '仪器编码')" prop="instrumentCode">
              <el-input
                v-model="formInline.instrumentCode"
                clearable
                placeholder="请输入"
                size="mini"
                :disabled="isNameDisabled"
              />
            </el-form-item>
            <el-form-item class="instrument-form-item" :label="getLabelName('instrumentName', '仪器名称')" prop="instrumentName">
              <el-input
                v-model="formInline.instrumentName"
                clearable
                placeholder="请输入"
                size="mini"
                :disabled="isNameDisabled"
              />
            </el-form-item>

            <el-form-item v-if="!isAddType" class="instrument-form-item" :label="getLabelName('status', '状态')" prop="status">
              <el-select v-model="formInline.status" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in statusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>

            <div class="instrument-category-field">
              <el-form-item class="instrument-form-item" :label="getLabelName('instrumentCategoryCode', '仪器分类')" prop="instrumentCategoryCode">
                <el-select
                  v-model="formInline.instrumentCategoryCode"
                  placeholder="请选择"
                  size="mini"
                  :disabled="isNameDisabled"
                  filterable
                  clearable
                >
                  <el-option v-for="(item, index) in groupList" :key="index" :label="item.instrumentCategoryName" :value="item.instrumentCategoryCode" />
                </el-select>
              </el-form-item>
              <!-- 新增仪器分类 -->
              <i v-if="!isNameDisabled" class="el-icon-circle-plus-outline category-add-button" title="新增仪器分类" @click="handleAdd" />
            </div>

            <el-form-item class="instrument-form-item" :label="getLabelName('remark', '备注')" prop="remark">
              <el-input v-model="formInline.remark" :disabled="isNameDisabled" type="textarea" show-word-limit maxlength="300" placeholder="请输入" size="mini" />
            </el-form-item>

          </section>

        </el-form>
        <instrument-extension-section
          ref="extensionInfo"
          :instrument-id="isAddType ? '' : (formInline.id || $route.query.id)"
          :readonly="isDetailType"
        />
      </div>
    </section>

    <!-- 编码规则 -->
    <!-- <common-code-rule-dialog
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="90"
      is-open-reg-disabled-space
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    /> -->

    <!-- 仪器分类新增 -->
    <SaveItemGroup
      ref="itemGroupDialog"
      :save-item-group-dialog-visible="saveItemGroupDialogVisible"
      :title="saveItemGroupDialogTitle"
      :operate-type="groupOperateType"
      :main-item-group="mainItemGroup"
      @cancel="saveItemGroupCancel"
      @confirm="saveItemGroupConfirm"
    />
  </div>
</template>

<script>
import {
  addInstrument,
  releaseInstrument,
  updateInstrument,
  getInstrumentDetail,
  addInstrumentCategory,
  getInstrumentCategoryList
} from '@/api/quality-manage.js'
import {
  standardStateList
} from '@/api/quality-manage.js'
import { CHECK_STANDARDS_TABLE } from '../../inspectionProgram/components/tabPages/constant.js'
import { mapGetters } from 'vuex'
const FULLROUTECODE = '/inspection-manage/qms-product-inspection/project' // 当前模块配置关键字
const PAGEFULLPATHCODE = new Map([
  [0, 'qms.qmsItem.qmsItemEdit.qmsItemEditByCreate'],
  [1, 'qms.qmsItem.qmsItemEdit.qmsItemEditByRelease'],
  [2, 'qms.qmsItem.qmsItemEdit.qmsItemEditByDisabled'],
  [3, 'qms.qmsItem.qmsItemEdit.qmsItemEditByDisuse']
]) // 当前页配置关键字 (状态不同则不同)
import SaveItemGroup from '@/views/quality_management/instrumentClassify/components/saveItemGroup.vue'
import InstrumentExtensionSection from './InstrumentExtensionSection.vue'

export default {
  name: 'ItemCommonPage',
  components: {
    SaveItemGroup,
    InstrumentExtensionSection
  },
  data() {
    return {
      initStatus: 0,
      defectLevelList: [], // 缺陷等级
      statusList: [], // 状态
      isAutoOpen: false,
      extraParams: { statues: [1], filter: true },
      window,
      tabValue: 'projectIndicators',
      formInline: {
        instrumentCode: '',
        instrumentName: '',
        status: '',
        remark: ''
      },
      checkList: [],
      disabledFlag: false, // 上限下限
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
        // groupId: [
        //   {
        //     required: true,
        //     message: '该参数是必填项',
        //     trigger: ['change']
        //   }
        // ],
        instrumentName: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ],
        instrumentCode: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur']
          }
        ]
        // analyzeMethodCode: [
        //   {
        //     required: true,
        //     message: '该参数是必填项',
        //     trigger: ['change']
        //   }
        // ],
        // export: [
        //   {
        //     required: true,
        //     message: '该参数是必填项',
        //     trigger: ['change']
        //   }
        // ],
      },
      initInputModeOptions: [], // 输入方式枚举
      inputModeOptions: [], // 输入方式枚举-根据分析方法过滤
      recordInfo: {},
      recordInfoLabel: {},
      showDialog: false,
      tableColumn: CHECK_STANDARDS_TABLE,
      FULLROUTECODE,
      PAGEFULLPATHCODE,
      // 输入方式-名称
      inputModeName: '输入方式:',
      saveItemGroupDialogVisible: false,
      saveItemGroupDialogTitle: '',
      groupOperateType: '',
      mainItemGroup: {}

    }
  },
  computed: {
    ...mapGetters(['fieldRuleDetail']),
    // 页面字段配置关键字
    fieldPath() {
      return {
        fullRouteCode: FULLROUTECODE,
        pageFullPathCode: PAGEFULLPATHCODE.get(this.initStatus)
      }
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    },
    isDetailType() {
      return this.$route.name.includes('Detail')
    },
    // 复制跳进来的
    isCopyType() {
      return this.isAddType && this.$route.query.id
    },
    isNameDisabled() {
      if (this.isDetailType) {
        return true
      }
      //  else if (this.isAddType || this.initStatus === 2 || this.initStatus === 0) {
      //   return false
      // }
      return false
    }
  },
  watch: {
    fieldRuleDetail: {
      handler(newVal) {
        // 动态字段配置有值则更新字段
        Object.keys(newVal?.[FULLROUTECODE] || {}).length
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // 打开编码规则弹窗
    // setTimeout(() => {
    //   if (this.isAddType) {
    //     this.isAutoOpen = true
    //     // this.$refs['codeRuleDialog'].open()
    //   }
    // }, 200)
    if (this.isDetailType) {
      this.getCurrentDetail()
      this.$nextTick(() => {
        this.$disableInputDetail()
      })
    }
    if (this.isEditType || this.isCopyType) {
      this.getCurrentDetail()
    }
  },
  methods: {
    handleAdd() {
      this.saveItemGroupDialogVisible = true
      this.saveItemGroupDialogTitle = '新增仪器分类'
      this.groupOperateType = 'add'
    },
    saveItemGroupConfirm() {
      this.saveItemGroupDialogVisible = false
      switch (this.groupOperateType) {
        case 'add':
          this.addItemGroup()
          break
        default:
          break
      }
      this.mainItemGroup = {}
    },
    saveItemGroupCancel() {
      this.saveItemGroupDialogVisible = false
      this.mainItemGroup = {}
    },
    async addItemGroup() {
      const params = this.$refs['itemGroupDialog'].itemGroup
      await addInstrumentCategory(params)
      // 更新仪器分类列表
      this.getList()
      this.$notify({
        title: '提示',
        message: '新增仪器分类成功',
        type: 'success',
        duration: 2000
      })
    },
    getLabelName(prop, name, noColon = 1) {
      let label = this.$FN(this.fieldPath, prop, name).replace(/:/g, '')
      // 是否要加上冒号
      label += noColon ? ':' : ''
      return label
    },
    // 切换编码规则
    // async handleResetCode() {
    //   /* this.isAutoOpen = false
    //   await this.$nextTick()
    //   this.isAutoOpen = true */
    //   this.$refs['codeRuleDialog'].open()
    // },
    // // 编码规则
    // handleConfirmCodeRuleDialog(code) {
    //   if (this.isAddType) {
    //     this.formInline.code = code
    //   }
    // },
    // 获取当前数据的详情
    async getCurrentDetail() {
      const result = await getInstrumentDetail(this.$route.query.id)
      this.formInline = result.data.data || {}
      this.initStatus = this.formInline.status
      // 根据当前状态来判断其他状态是否可以选择
      setTimeout(() => {
        this.statusDIsable()
      }, 200)
    },
    // 初始化
    init() {
      this.getList()
      this.getStatusList()
    },
    // 获取状态
    async getStatusList() {
      const result = await standardStateList()
      this.statusList = result.data.data.map(item => {
        return {
          ...item,
          disabled: true
        }
      })
    },
    // 获取左侧树数据列表
    async getList() {
      const params = {
        current: 1,
        size: 1000
      }
      const result = await getInstrumentCategoryList(params)
      const { data } = result.data || {}
      this.groupList = data.records || {}
    },
    // 保存并且生效
    async savaAndEffective() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          }
          // {
          //   positionInfo: '项目指标__projectIndicators',
          //   formEntity: this?.$refs?.projectForm
          // }
        ],
        // 用于展开基本信息或tabs的方法对象（非必传）
        otherFunc: {
          changeTabs: name => {
            this.tabValue = name
          }
          // expandInfo: () => {
          //   this.$refs.baseForm.isFold = true
          // }
        }
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      // const params = this.generateSaveParams()
      const params = this.formInline
      const res = await releaseInstrument(params)
      if (+res.data.status === 1) {
        try {
          await this.saveExtensionAfterInstrument(res.data.data)
        } catch (error) {
          this.notifyExtensionSaveFailure(error)
          this.goEdit(res.data.data)
          return
        }
        this.$notify({
          title: '提示',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        // 去编辑页面
        this.goEdit(res.data.data)
        // this.back()
      }
    },
    async handleSaveBtn() {
      // 新增并且没有编码时，赋值编码
      // if ((this.isAddType || this.isCopyType) && !this.formInline.code) {
      //   this.isAutoOpen = true
      // }

      // // 等待编码赋值完成
      // await new Promise((resolve) => {
      //   const interval = setInterval(() => {
      //     if (this.formInline.code) {
      //       clearInterval(interval)
      //       resolve()
      //     }
      //   }, 100)
      // })

      // 需要等待编码赋值后在执行以下函数
      // if (this.isCopyType) {
      //   this.handleCopySave()
      //   return
      // }
      this.clickSave()
    },
    // 保存数据
    async clickSave() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          }
          // {
          //   positionInfo: '项目指标__projectIndicators',
          //   formEntity: this?.$refs?.projectForm
          // }
        ],
        // 用于展开基本信息或tabs的方法对象（非必传）
        otherFunc: {
          changeTabs: name => {
            this.tabValue = name
          }
          // expandInfo: () => {
          //   this.$refs.baseForm.isFold = true
          // }
        }
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      // const params = this.generateSaveParams()
      const params = this.formInline
      let res
      if (this.isAddType) {
        res = await addInstrument(params)
      } else {
        res = await updateInstrument(params)
      }
      if (+res.data.status === 1) {
        try {
          await this.saveExtensionAfterInstrument(res.data.data)
        } catch (error) {
          this.notifyExtensionSaveFailure(error)
          if (this.isAddType) {
            this.goEdit(res.data.data)
          } else {
            this.init()
            this.getCurrentDetail()
          }
          return
        }
        this.$notify({
          title: '提示',
          message: this.isAddType ? '新增成功' : '保存成功',
          type: 'success',
          duration: 2000
        })
        // 去编辑页面
        if (this.isAddType) {
          this.goEdit(res.data.data)
        } else {
          this.init()
          this.getCurrentDetail()
        }
        // this.back()
      }
    },

    async saveExtensionAfterInstrument(savedInstrument) {
      if (!this.$refs.extensionInfo) return
      const sourceInstrumentId = (savedInstrument && savedInstrument.id) || this.formInline.id || this.$route.query.id
      await this.$refs.extensionInfo.saveAfterInstrument(sourceInstrumentId)
    },

    notifyExtensionSaveFailure(error) {
      const responseMessage = error && error.response && error.response.data && error.response.data.message
      this.$notify({
        title: '扩展信息同步失败',
        message: `仪器基本信息已保存，但扩展信息未同步成功：${responseMessage || error.message || '请稍后重试'}`,
        type: 'warning',
        duration: 6000
      })
    },

    // 去编辑页面
    goEdit(data) {
      this.$router.push({
        name: 'instrumentEdit',
        query: {
          id: data.id
        }
      })
    },

    // 返回
    back() {
      this.$router.push({
        name: 'instrument'
      })
    },
    // 当前状态下其他状态是否可以选择
    statusDIsable() {
      switch (this.formInline.status) {
        case 0:
          this.statusList[1].disabled = false
          break
        case 1:
          this.statusList[2].disabled = false
          this.statusList[3].disabled = false
          break
        case 2:
          this.statusList[1].disabled = false
          this.statusList[3].disabled = false
          break
        case 3:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.commonPage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f5f7fa;
  position: relative;
  .quality-edit-inner {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // 头部内容
    .edit-header {
      position: relative;
      z-index: 10;
      box-sizing: border-box;
      min-height: 50px;
      padding: 9px 16px;
      border-bottom: 1px solid #e4e7ed;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(31, 35, 41, 0.05);

      .edit-actions {
        width: 100%;
      }
    }
    .scroll {
      height: calc(100% - 50px);
      box-sizing: border-box;
      padding: 16px 16px 32px;
      overflow: auto;
    }
    .scroll::-webkit-scrollbar {
      height: 8px; /* 设置滚动条的高度 */
      width: 8px; /* 设置滚动条的宽度 */
    }
    // 基本信息
    .base-info {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0 20px;
      width: 100%;
      box-sizing: border-box;
      margin: 0 0 16px;
      background: #ffffff;
      border: 1px solid #e4e7ed;
      border-radius: 6px;
      padding: 0 24px 8px;
      box-shadow: 0 2px 8px rgba(31, 35, 41, 0.04);
      .base-info-title {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 52px;
        margin-bottom: 18px;
        border-bottom: 1px solid #ebeef5;
        p {
          position: relative;
          margin: 0;
          padding-left: 12px;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 600;
          color: #1f2329;

          &::before {
            position: absolute;
            top: 50%;
            left: 0;
            width: 3px;
            height: 16px;
            border-radius: 2px;
            background: #409eff;
            content: '';
            transform: translateY(-50%);
          }
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

      .instrument-form-item {
        width: 100%;
        margin: 0 0 18px;
      }

      .instrument-category-field {
        display: flex;
        align-items: flex-start;
        min-width: 0;

        .instrument-form-item {
          flex: 1 1 auto;
          min-width: 0;
        }
      }

      .category-add-button {
        display: inline-flex;
        flex: 0 0 32px;
        align-items: center;
        justify-content: center;
        height: 32px;
        margin: 0 0 0 8px;
        color: #409eff;
        font-size: 22px;
        cursor: pointer;
      }
    }
    .base-info,
    .centerArea,
    .bottomArea {
      background: white;
    }
    .bottomArea {
      margin-top: 4px;
      padding-top: 18px;
    }
    .centerArea {
      padding-top: 18px;
    }
  }
  ::v-deep .instrument-form .el-input--mini,
  ::v-deep .instrument-form .el-select,
  ::v-deep .instrument-form .el-textarea {
    width: 100%;
  }

  ::v-deep .instrument-form .el-input--mini {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }

  ::v-deep .instrument-form .el-form-item__label {
    color: #515a6e;
    font-weight: 500;
  }

  ::v-deep .extension-info {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }
}

@media (max-width: 1199px) {
  .commonPage .quality-edit-inner .base-info {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 899px) {
  .commonPage .quality-edit-inner {
    .edit-header {
      padding: 9px 16px;
    }

    .scroll {
      padding: 12px 16px 24px;
    }

    .base-info {
      grid-template-columns: minmax(0, 1fr);
      padding: 0 16px 8px;
    }
  }
}
// 单选，多选框详情时颜色修改
::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
::v-deep .el-textarea.is-disabled .el-textarea__inner {
  color: rgb(0, 0, 0);
}
</style>
