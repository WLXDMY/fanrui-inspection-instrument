<template>
  <div class="commonPage">
    <!-- 内层 -->
    <section class="quality-edit-inner">
      <!-- 头部 -->
      <header class="edit-header">
        <el-button size="mini" type="primary" @click="handleBack">返回</el-button>
        <el-button v-if="!isDetailType" size="mini" type="primary" @click="handleSave">保存</el-button>
      </header>
      <div class="scroll">
        <el-form
          ref="projectForm"
          :rules="rules"
          :model="detailData"
          :inline="true"
          class="demo-form-inline"
          label-position="right"
          label-width="164px"
        >
          <!-- 基本信息 -->
          <section class="base-info">
            <div class="base-info-title">
              <p>基本信息</p>
            </div>

            <!-- <el-form-item label="缺陷编码" prop="code" required>
              <el-input v-model="detailData.code" :disabled="!isAddType" placeholder="编码保存后自动生成" size="mini">
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
            <el-form-item
              label="缺陷编码"
              prop="code"
              :rules="[
                {
                  required: codeRequired,
                  message: '请输入',
                  trigger: 'blur'
                }
              ]"
            >
              <CustomCodeRule
                v-if="isAddType "
                ref="commonCodeRuleInput"
                v-model="detailData.code"
                style="width: 200px"
                :placeholder="receiptCodePlaceholder"
                size="small"
                :disabled="false"
                title="单据编号"
                :type-code="typeCode"
                :rule-id="detailData.numberRuleId"
                :is-show-dialog-init="false"
                :rules-type-extra-request-param="rulesTypeExtraRequestParam"
                @confirm="handleConfirmCodeRuleDialog"
                @defaultCodeRule="defaultCodeRule"
                @change="changeMethod"
              />
              <el-input
                v-else
                v-model="detailData.code"
                placeholder="请输入内容"
                :disabled="true"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="缺陷名称" prop="name" required>
              <el-input
                v-model="detailData.name"
                placeholder="请输入内容"
                :disabled="detailData.status == 1"
                size="mini"
              />
            </el-form-item>
            <el-form-item label="缺陷类型:" prop="defectTypeCode">
              <el-select
                v-model="detailData.defectTypeCode"
                placeholder="请选择"
                clearable
                size="mini"
                :disabled="detailData.status == 1"
              >
                <el-option v-for="item in typeList" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="关联缺陷原因:" prop="defectReasonCodeList">
              <el-select
                v-model="detailData.defectReasonCodeList"
                placeholder="请选择"
                clearable
                multiple
                size="mini"
                :disabled="detailData.status == 1"
                @change="changeDefectReasonCodeList"
              >
                <el-option v-for="item in reasonList" :key="item.id" :label="item.reasonName" :value="item.reasonCode" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="!isAddType" label="状态" prop="status">
              <el-select v-model="detailData.status" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in statusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="!isAddType" label="创建人" prop="createByName">
              <el-input v-model="detailData.createByName" :disabled="isEditType" placeholder="请输入内容" size="mini" />
            </el-form-item>
            <el-form-item v-if="!isAddType" label="创建时间" prop="createTime">
              <el-date-picker
                v-model="detailData.createTime"
                type="date"
                :disabled="detailData.status == 1"
                placeholder="选择日期"
                size="mini"
                value-format="yyyy-MM-dd hh:mm:ss"
              />
            </el-form-item>
            <el-form-item v-if="!isAddType" label="更新人" prop="updateByName">
              <el-input v-model="detailData.updateByName" :disabled="isEditType" placeholder="请输入内容" size="mini" />
            </el-form-item>
            <el-form-item v-if="!isAddType" label="更新时间" prop="updateTime">
              <el-date-picker
                v-model="detailData.updateTime"
                :disabled="isEditType"
                type="date"
                placeholder="选择日期"
                size="mini"
                value-format="yyyy-MM-dd hh:mm:ss"
              />
            </el-form-item>
            <el-form-item label="缺陷描述" prop="remark">
              <el-input
                v-model="detailData.remark"
                :disabled="detailData.status == 1"
                placeholder="一条描述内容"
                size="mini"
              />
            </el-form-item>
          </section>
        </el-form>
      </div>
    </section>
    <!-- 编码规则 -->
    <!--
    <common-code-rule-dialog
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="92"
      is-open-reg-disabled-space
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    />
    -->
  </div>
</template>

<script>
import { defectsDefineBtnList } from '@/api/quality-manage'
import { USE_DEFECTS_API } from '@/api/facilityQualityManagement.js'
const DEFECTS_API = USE_DEFECTS_API() // 不良缺陷接口引入
import { USE_DEFECTS_REASON_API } from '@/api/defectReason.js'
const DEFECTS_REASON_API = USE_DEFECTS_REASON_API()
import CustomCodeRule from '@/components/CodeRuleDialog/index'

export default {
  components: {
    CustomCodeRule
  },
  data() {
    return {
      isAutoOpen: false,
      id: '', // 详情id
      detailData: {
        code: ''
      }, // 详情数据
      statusList: [], // 状态枚举
      rules: {
        code: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }],
        name: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }]
      },
      typeList: [], // 类型
      reasonList: [], // 关联缺陷原因
      // 单据编码 start
      receiptCodePlaceholder: '请输入',
      typeCode: 92,
      codeRequired: true,
      rulesTypeExtraRequestParam: {}
      // 单据编码 end
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
    }
  },
  watch: {},
  created() {
    this.defectsDefineBtnList() // 缺陷类型
    this.getDefectsReasonList() // 获取关联缺陷原因列表
  },
  mounted() {
    // 详情 or 编辑
    if (this.isDetailType || this.isEditType) {
      const { id } = this.$route.query
      if (id) {
        this.id = id
        this.getDetail()
        this.getStatusList()
      }
      this.isDetailType && this.$disableInputDetail() // 详情页 不可修改
    }

    if (this.isAddType) {
      setTimeout(() => {
        this.$refs?.commonCodeRuleInput?.init(this.typeCode)
      }, 500)
    }

    // if (this.isAddType) {
    //   this.isAutoOpen = true
    //   // this.$refs['codeRuleDialog'].open()
    // }
  },
  methods: {
    // 默认的编码规则
    defaultCodeRule(defaultCodeRule) {
      this.detailData.numberRuleId = defaultCodeRule?.id || null
      this.detailData.ruleFormItems = defaultCodeRule?.prefixDetailList || []
    },
    // 编码规则确认  初始化有此回调说明没有人工输入哦
    handleConfirmCodeRuleDialog(val, id, ruleFormItems) {
      this.detailData.code = ''
      // 设置输入框提示文字
      if (
        ruleFormItems &&
        ruleFormItems.length == 1 &&
        ruleFormItems.find(item => item.type === 1)
      ) {
        console.log('只有人工输入')
        this.receiptCodePlaceholder = '请输入'
        this.codeRequired = true // 必填
      }
      if (ruleFormItems && !ruleFormItems.find(item => item.type === 1)) {
        console.log('没有人工输入')
        this.receiptCodePlaceholder = '保存后自动生成'
        this.codeRequired = false // 非必填
      }
      if (
        ruleFormItems &&
        ruleFormItems.length != 1 &&
        ruleFormItems.find(item => item.type === 1)
      ) {
        console.log('包含人工输入')
        this.receiptCodePlaceholder = '保存后自动生成+请输入'
        this.codeRequired = true // 必填
      }
      this.detailData.numberRuleId = id
      this.detailData.ruleFormItems = ruleFormItems
    },
    // 构造收料单号
    createReceiptNumber() {
      let str = ''
      const hasManualInput = this.detailData.ruleFormItems.find(
        item => item.type == 1
      )
      // 有人工输入的情况下，要拼接编码规则
      if (hasManualInput) {
        this.detailData.ruleFormItems.forEach(item => {
          if (item.type === 1) {
            str += this.detailData.code
          } else {
            str += item.value
          }
        })
      }
      // 没有人工输入，自行输入了单号 则覆盖编码规则
      if (!hasManualInput && this.detailData.code) {
        str = this.detailData.code
      }
      // 没有人工输入，没有输入了单号 编码规则
      if (!hasManualInput && !this.detailData.code) {
        this.detailData.ruleFormItems.forEach(item => {
          str += item.value
        })
      }
      console.log('构造收料单号', this.detailData.ruleFormItems)
      return str
    },
    changeMethod() {},
    // 获取关联缺陷原因列表
    async getDefectsReasonList() {
      const params = {
        size: 999,
        current: 1,
        statues: [1]
      }
      const result = await DEFECTS_REASON_API.getDefectsListApi(params)
      this.reasonList = result.data && result.data.data ? result.data.data.records : []
    },
    // 获取缺陷类型
    defectsDefineBtnList() {
      const param = {
        size: 999,
        current: 1
      }
      defectsDefineBtnList(param).then(res => {
        if (res.data.status === 1) {
          this.typeList = res.data.data.records || []
        }
      })
    },
    // 切换编码规则
    async handleResetCode() {
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    // handleConfirmCodeRuleDialog(code) {
    //   console.log('123123132', code)
    //   // this.detailData.code = code
    //   this.$set(this.detailData, 'code', code)
    // },
    // 保存
    async handleSave() {
      // 新增并且没有编码时，赋值编码
      // if (this.isAddType && !this.detailData.code) {
      //   this.isAutoOpen = true
      // }

      // // 等待编码赋值完成
      // await new Promise((resolve) => {
      //   const interval = setInterval(() => {
      //     if (this.detailData.code) {
      //       clearInterval(interval)
      //       resolve()
      //     }
      //   }, 100)
      // })

      // 编码赋值完成后执行保存逻辑
      if (this.isEditType) {
        this.handleSaveEdit()
        return
      }
      // 新增
      this.handleSaveAdd()
    },
    // 保存编辑操作
    async handleSaveEdit() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          }
        ]
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      // 表单校验
      // const valid = await this.$refs['projectForm'].validate()
      // if (!valid) return
      try {
        // 处理关联缺陷原因数据
        const defectReasonRelationList = [{ defectReasonCode: this.detailData.defectReasonCodeList?.join(',') }]
        this.$set(this.detailData, 'defectReasonRelationList', defectReasonRelationList)

        await DEFECTS_API.getDefectsPutApi(this.detailData)
        this.$notify({
          title: '提示',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.handleBack()
      } catch (err) {
        console.log(err)
      }
    },
    // 保存新增操作
    async handleSaveAdd() {
      const validateOptions = {
        // 校验的数组
        forms: [
          {
            positionInfo: '基本信息',
            formEntity: this?.$refs?.projectForm
          }
        ]
      }
      const result = await this.$validateDialog(validateOptions)
      if (!result) return

      // 表单校验
      // const valid = await this.$refs['projectForm'].validate()
      // if (!valid) return
      try {
        // 处理关联缺陷原因数据
        const defectReasonRelationList = [{ defectReasonCode: this.detailData.defectReasonCodeList?.join(',') }]
        this.$set(this.detailData, 'defectReasonRelationList', defectReasonRelationList)
        const code = this.createReceiptNumber() // 生成单据编号
        this.$set(this.detailData, 'code', code)

        await DEFECTS_API.addDefectsApi(this.detailData)
        this.$notify({
          title: '提示',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.handleBack()
      } catch (err) {
        console.log(err)
      }
    },
    changeDefectReasonCodeList(val) {

    },
    // 获取数据详情
    async getDetail() {
      try {
        const result = await DEFECTS_API.getDefectsDetailApi(this.id)
        console.log('result', result)
        this.detailData = result && result.data && result.data.data ? result.data.data : {}

        // 处理关联缺陷原因数据
        if (this.detailData && this.detailData.defectReasonRelationList) {
          let defectReasonCodeList = []
          if (this.detailData?.defectReasonRelationList[0]?.defectReasonCode !== '') {
            defectReasonCodeList = this.detailData?.defectReasonRelationList[0]?.defectReasonCode?.split(',')
          }
          this.$set(this.detailData, 'defectReasonCodeList', defectReasonCodeList)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 当前状态下其他状态是否可以选择
    statusDIsable() {
      switch (this.detailData.status) {
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
    },
    // 获取状态枚举列表
    async getStatusList() {
      const result = await DEFECTS_API.getDefectsStatusApi()
      this.statusList = result && result.data && result.data.data ? result.data.data : []
      this.statusList = this.statusList.map(item => {
        return {
          ...item,
          disabled: true
        }
      })
      let timer = setTimeout(() => {
        this.statusDIsable()
        clearTimeout(timer)
        timer = null
      }, 200)
    },
    // 返回
    handleBack() {
      this.$router.push({
        name: 'processQuality'
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
    width: 100%;
    height: 100%;
    padding: 1px;
    margin: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // 头部内容
    .edit-header {
      padding: 7px 0 7px 11px;
      margin-bottom: 4px;
      border-radius: 0px 0px 0px 0px;
      background: white;
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
      background: #ffffff;
      border-radius: 0px 0px 0px 0px;
      padding: 12px 0px 9px 12px;
      .base-info-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 16px;
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
      margin-top: 4px;
    }
  }
  ::v-deep .el-input--mini {
    width: 200px;
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
  ::v-deep .el-tabs__header {
    display: none;
  }
}
</style>
