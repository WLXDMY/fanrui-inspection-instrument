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

            <el-form-item label="缺陷后果编码" prop="resultCode" required>
              <el-input v-model="detailData.resultCode" :disabled="!isAddType" placeholder="请输入内容" size="mini" />

              <!-- <el-input v-model="detailData.resultCode" :disabled="!isAddType" placeholder="请输入内容" size="mini">
                <template v-if="isAddType" slot="suffix"
                  ><i class="el-icon-s-operation" style="cursor: pointer" @click.stop="handleResetCode"
                /></template>
              </el-input> -->
            </el-form-item>
            <el-form-item label="缺陷后果名称" prop="resultName" required>
              <el-input
                v-model="detailData.resultName"
                placeholder="请输入内容"
                :disabled="detailData.status == 1"
                size="mini"
              />
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
          </section>
        </el-form>
      </div>
    </section>
    <!-- 编码规则 -->
    <common-code-rule-dialog
      ref="codeRuleDialog"
      title="编码规则"
      :type-code="92"
      is-open-reg-disabled-space
      :is-auto-open="isAutoOpen"
      @confirm="handleConfirmCodeRuleDialog"
    />
  </div>
</template>

<script>
import { USE_DEFECTS_RESULT_API } from '@/api/defectResult.js'
const DEFECTS_RESULT_API = USE_DEFECTS_RESULT_API()
export default {
  components: {},
  data() {
    return {
      isAutoOpen: false,
      id: '', // 详情id
      detailData: {
        resultCode: '',
        resultName: '',
        status: '0'
      }, // 详情数据
      statusList: [], // 状态枚举
      rules: {
        resultCode: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }],
        resultName: [{ required: true, message: '该参数是必填项', trigger: ['blur'] }]
      }
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
  created() {},
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

    // if (this.isAddType) {
    //   this.isAutoOpen = true
    //   this.$refs['codeRuleDialog'].open()
    // }
  },
  methods: {
    // 切换编码规则
    async handleResetCode() {
      this.$refs['codeRuleDialog'].open()
    },
    // 编码规则
    handleConfirmCodeRuleDialog(code) {
      this.detailData.resultCode = code
      this.$set(this.detailData, 'resultCode', code)
    },
    // 保存
    handleSave() {
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
        await DEFECTS_RESULT_API.getDefectsPutApi(this.detailData)
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
        await DEFECTS_RESULT_API.addDefectsApi(this.detailData)
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
    // 获取数据详情
    async getDetail() {
      try {
        const result = await DEFECTS_RESULT_API.getDefectsDetailApi(this.id)
        this.detailData = result && result.data && result.data.data ? result.data.data : {}
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
      const result = await DEFECTS_RESULT_API.getDefectsStatusApi()
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
        name: 'defectResult'
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
