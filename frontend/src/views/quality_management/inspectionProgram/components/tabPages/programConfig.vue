<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-06-04 10:06:06
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-16 09:30:12
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionProgram\components\tabPages\programConfig.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="programConfig">
    <el-form
      ref="programConfigForm"
      :inline="true"
      :model="formInline"
      :rules="rules"
      class="demo-form-inline"
      label-position="right"
      label-width="200px"
    >
      <!-- 基本信息 -->
      <section class="base-info">
        <el-form-item
          :label="getLabelName('schemeRelateTypeEntities', '适用检验类型')"
          prop="inspectionTypes"
          :rules="$FR(fieldPath, 'schemeRelateTypeEntities')"
        >
          <el-checkbox-group
            v-model="formInline.inspectionTypes"
            :disabled="
              $FC('schemeRelateTypeEntities', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
            "
            @change="change"
          >
            <el-checkbox
              v-for="item in inspectionList"
              :key="item.orderType"
              :disabled="isDetailType || initStatus === 1"
              :label="item.orderType"
            >{{ item.orderTypeName }}</el-checkbox>
            <!-- <el-checkbox
              v-for="item in inspectionList"
              :key="item.code"
              :disabled="isDetailType || initStatus === 1"
              :label="item.code"
              >{{ item.name }}</el-checkbox
            > -->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          :label="getLabelName('timeliness', '时效性')"
          prop="timeliness"
          :style="{ 'margin-bottom': isTimeliness ? 'auto' : '30px' }"
          :rules="$FR(fieldPath, 'timeliness')"
        >
          <el-radio-group
            v-model="formInline.timeliness"
            :disabled="
              isDetailType ||
                initStatus === 1 ||
              $FC('timeliness', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
            "
          >
            <el-radio :label="0">无期限</el-radio>
            <el-radio :label="1">有期限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="isTimeliness"
          :label="getLabelName('effectiveTime', '生效日期')"
          prop="effectiveTime"
          :rules="$FR(fieldPath, 'effectiveTime')"
        >
          <el-date-picker
            v-model="formInline.effectiveTime"
            :disabled="
              initStatus === 1 ||
              $FC('effectiveTime', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
            "
            type="date"
            value-format="yyyy-MM-dd 00:00:00"
            placeholder="选择日期"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          v-if="isTimeliness"
          :label="getLabelName('failureTime', '失效日期')"
          prop="failureTime"
          :rules="$FR(fieldPath, 'failureTime')"
        >
          <el-date-picker
            v-model="formInline.failureTime"
            :disabled="
              initStatus === 1 ||
              $FC('failureTime', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
            "
            type="date"
            value-format="yyyy-MM-dd 23:59:59"
            placeholder="选择日期"
            size="mini"
          />
        </el-form-item>
        <div />
        <el-form-item :label="getLabelName('samplePlanName', '抽样方案')" prop="samplePlanName">
          <y-complexSelect
            v-model="formInline.samplePlanName"
            style="width: 200px"
            :disabled="initStatus === 1"
            @btnClickCallback="showDialog = true"
            @selectChange="(e, options) => changeMaterialCode(e, options)"
          />

          <!-- <el-input
            v-model="formInline.samplePlanName"
            size="mini"
            :disabled="initStatus === 1"
            clearable
            @focus="showDialog = true"
            @clear="handleClear"
          /> -->
        </el-form-item>
        <!-- <el-form-item :label="getLabelName('samplePlanName', '抽样方案')" prop="samplePlanName">
        <el-form-item
          :label="getLabelName('samplePlanName', '抽样方案')"
          prop="samplePlanName"
          :rules="$FR(fieldPath, 'samplePlanName')"
        >
          <el-input
            v-model="formInline.samplePlanName"
            :disabled="
              initStatus === 1 ||
              $FC('samplePlanName', FULLROUTECODE, PAGEFULLPATHCODE.get(initPageCode))?.isEdit === false
            "
            size="mini"
            clearable
            @focus="showDialog = true"
            @clear="handleClear"
          />
        </el-form-item> -->
        <el-form-item
          :label="getLabelName('inspectLevelName', '检验水平')"
          prop="inspectLevel"
          :rules="$FR(fieldPath, 'inspectLevelName')"
        >
          <el-select v-model="formInline.inspectLevel" disabled>
            <el-option v-for="item in levelTypeList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="getLabelName('stringencyName', '严格度')"
          prop="stringency"
          :rules="$FR(fieldPath, 'stringencyName')"
        >
          <el-select v-model="formInline.stringency" disabled>
            <el-option v-for="item in sternWidthLevelList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item :label="getLabelName('aqlValue', 'AQL值')" prop="aqlValue" :rules="$FR(fieldPath, 'aqlValue')">
          <el-select v-model="formInline.aqlValue" disabled>
            <el-option v-for="item in aqlTypeList" :key="item.code" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
      </section>
    </el-form>
    <!-- :extraParams="{ cusState: 2 }" -->
    <CommonSelectDialogPlus
      v-if="showDialog"
      title="抽样方案"
      :request-config="{
        url: 'qms/product/v1/sample/planes/list',
        method: 'post'
      }"
      :extra-params="extraParams"
      :column-config="tableColumn"
      :visible="showDialog"
      :append-to-body="true"
      @confirm="rows => handleConfirm(rows)"
      @cancel="showDialog = false"
    />
  </div>
</template>
<script>
import { CHECK_STANDARDS_TABLE } from './constant.js'
import { mapGetters } from 'vuex'
const FULLROUTECODE = '/inspection-manage/qms-product-inspection/scheme' // 当前模块配置关键字
const PAGEFULLPATHCODE = new Map([
  // 都通过详情接口获取
  ['Add', 'qmsScheme.qmsSchemeAdd'],
  ['0', 'qmsScheme.qmsSchemeEdit.qmsSchemeEditByCreate'],
  ['1', 'qmsScheme.qmsSchemeEdit.qmsSchemeEditByRelease'],
  ['2', 'qmsScheme.qmsSchemeEdit.qmsSchemeEditByDisabled'],
  ['3', 'qmsScheme.qmsSchemeEdit.qmsSchemeEditByDisuse'],
  ['Detail', 'qmsScheme.qmsSchemeDetail']
]) // 当前页配置关键字 (状态不同则不同)

import { aqlList, getSternWidthLevelList, levelList, getInspectTypeEnumsByConfig } from '@/api/quality-manage'
import CommonSelectDialogPlus from '@/components/CommonSelectDialogPlus/index.vue'
export default {
  name: 'ProgramConfig',
  components: {
    CommonSelectDialogPlus
  },
  props: {
    initStatus: {
      type: Number,
      default: 0
    },
    initPageCode: {
      type: [Number, String]
    }
  },
  data() {
    return {
      extraParams: { statues: [1], filter: true },
      formInline: {
        inspectionTypes: [],
        timeliness: 0,
        samplePlanName: '',
        inspectLevel: '',
        stringency: '',
        aqlValue: ''
      },
      rules: {
        inspectionTypes: [{ required: true, message: '该参数是必填项', trigger: ['change'] }],
        effectiveTime: [{ required: false, message: '该参数是必填项', trigger: ['blur'] }],
        failureTime: [{ required: false, message: '该参数是必填项', trigger: ['blur'] }],
        samplePlanName: [{ required: false, message: '该参数是必填项', trigger: ['blur'] }]
      },
      inspectionList: [],
      showDialog: false,
      tableColumn: CHECK_STANDARDS_TABLE,
      aqlTypeList: [], // aql枚举列表
      sternWidthLevelList: [], // 严格度枚举列表
      levelTypeList: [], // 检验水平枚举列表
      FULLROUTECODE,
      PAGEFULLPATHCODE
    }
  },
  computed: {
    ...mapGetters(['fieldRuleDetail']),
    // 页面字段配置关键字
    fieldPath() {
      return {
        fullRouteCode: FULLROUTECODE,
        pageFullPathCode: PAGEFULLPATHCODE.get(this.initPageCode)
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
    isTimeliness() {
      return this.formInline.timeliness === 1
    }
  },
  watch: {
    isTimeliness(val) {
      this.rules.effectiveTime[0].required = val
      this.rules.failureTime[0].required = val
    },
    fieldRuleDetail: {
      handler(newVal) {
        // 动态字段配置有值则更新字段
        Object.keys(newVal?.[FULLROUTECODE] || {}).length
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // 禁止修改
    if (this.isDetailType) {
      this.$disableInputDetail()
    }
    this.schemeTypeList()
    Promise.allSettled([aqlList(), getSternWidthLevelList(), levelList()]).then(res => {
      const [res1, res2, res3] = res
      this.aqlTypeList = res1.value.data.data
      this.sternWidthLevelList = res2.value.data.data
      this.levelTypeList = res3.value.data.data
    })
  },
  methods: {
    getLabelName(prop, name, noColon = 1) {
      let label = this.$FN(this.fieldPath, prop, name).replace(/:/g, '')
      // 是否要加上冒号
      label += noColon ? ':' : ''
      return label
    },
    // 清空抽样方案
    handleClear() {
      if (this.isDetailType) return
      this.formInline.samplePlanEntity = null
      this.formInline.samplePlanId = ''
      this.formInline.samplePlanName = ''
      this.formInline.inspectLevelName = ''
      this.formInline.inspectLevel = ''
      this.formInline.stringency = ''
      this.formInline.aqlValue = ''
    },
    change(e) {
      this.$set(this.formInline, 'inspectionTypes', e)
    },
    // 数据回显
    handleEcho(data) {
      this.formInline = data
      // 字段转为number类型是为了匹配上 下拉枚举列表的code字段
      if (this.formInline.aqlValue) {
        this.formInline.aqlValue = Number(this.formInline.aqlValue) === 0 ? '' : Number(this.formInline.aqlValue)
      }
      if (this.formInline.stringency) {
        this.formInline.stringency = Number(this.formInline.stringency) === 0 ? '' : Number(this.formInline.stringency)
      }

      if (this.formInline.samplePlanEntity !== null) {
        this.formInline.samplePlanName = this.formInline.samplePlanEntity.name
      }

      // 使用检验类型回显
      if (data.schemeRelateTypeEntities && data.schemeRelateTypeEntities.length !== 0) {
        const items = data.schemeRelateTypeEntities.map(item => {
          return item.inspectType
        })
        this.$set(this.formInline, 'inspectionTypes', items)
      } else {
        this.$set(this.formInline, 'inspectionTypes', [])
      }
    },
    // 获取检验类型
    async schemeTypeList() {
      const result = await getInspectTypeEnumsByConfig()
      const { data } = result.data || []
      this.inspectionList = data || []
      // this.inspectionList = data.inspectTypes || []
      /*  schemeTypeList().then(res => {
        this.inspectionList = res && res.data && res.data.data ? res.data.data : []
      }) */
    },
    handleConfirm(row) {
      this.formInline.samplePlanId = row.id
      this.formInline.samplePlanName = row.name
      this.formInline.inspectLevel = row.inspectLevel
      this.formInline.inspectLevelName = row.inspectLevelName
      this.formInline.stringency = row.stringency
      this.formInline.stringencyName = row.stringencyName
      this.formInline.aqlValue = Number(row.aqlValue) === 0 ? '' : Number(row.aqlValue)
      this.showDialog = false
      this.$nextTick(() => {
        this.$refs.programConfigForm.validateField('samplePlanName')
      })
    },
    // 抽样方案下拉选择回调
    changeMaterialCode(val, options) {
      console.log('抽样方案下拉选择回调', val)
      console.log('抽样方案下拉选择回调 options', options)
      if (val) {
        const hasItem = options.find(el => el.name === val)
        console.log('匹配的数据  list', hasItem)
        this.handleConfirm(hasItem)
      } else {
        console.log('删除则把相应的信息清空', this.formInline?.samplePlanEntity)
        // 删除则把相应的信息清空
        this.$set(this.formInline, 'samplePlanId', '')
        this.$set(this.formInline, 'samplePlanName', '')
        // 编辑时，需要把里面的name也删除
        // if (this.isEditType && this.formInline.samplePlanEntity) {
        //   this.$set(this.formInline?.samplePlanEntity, 'name', '')
        //   this.$set(this.formInline?.samplePlanEntity, 'stringency', '')
        //   this.$set(this.formInline?.samplePlanEntity, 'inspectLevel', '')
        //   this.$set(this.formInline?.samplePlanEntity, 'aqlValue', '')
        // }
        this.$set(this.formInline, 'inspectLevel', '')
        this.$set(this.formInline, 'inspectLevelName', '')
        this.$set(this.formInline, 'stringency', '')
        this.$set(this.formInline, 'stringencyName', '')
        this.$set(this.formInline, 'aqlValue', '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.programConfig {
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 4px 4px 4px 4px;
  background: white;
  padding: 12px 0px 9px 18px;
  ::v-deep .el-form {
    .el-form-item:nth-child(1) {
      display: block;
      //   margin-bottom: 0px;
      .el-form-item__content {
        width: calc(100% - 200px);
      }
    }
    .el-form-item:nth-child(2) {
      display: block;
      margin-bottom: 0px;
    }
    .el-form-item:nth-child(3) {
      margin-left: 66px;
    }
    .el-form-item:nth-child(4) {
      margin-bottom: 30px;
    }
  }
}
// 单选，多选框详情时颜色修改
::v-deep .el-radio__input.is-disabled + span.el-radio__label,
::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
</style>
