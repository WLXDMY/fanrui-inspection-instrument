<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-09-23 15:28:17
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-10-28 16:16:02
 * @Description: 检验决策
-->
<template>
  <div>
    <div v-if="!noSelectRow && showDecision" class="checkoutDecision scroll">
      <div class="button-group">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" :disabled="isDetailType" @click="addDecision"
          >新增</el-button
        >
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multipleSelection.length === 0 || isDetailType"
          @click="deleteDecision"
        >
          删除
        </el-button>
      </div>
      <!-- 检验决策 -->
      <section class="centerArea">
        <!-- <div>
        检验决策
        <i
          class="el-icon-circle-plus-outline"
          :style="isDetailType ? {} : { color: '#1890ff', cursor: 'pointer' }"
          @click="addDecision"
        />
        <span v-show="showTips" style="color: #e6a23c; font-size: 12px; margin-left: 5px">
          检验决策总数与物料送检数量不相等
        </span>
      </div> -->
        <el-table
          :header-cell-style="headerCellStyle"
          :data="currentRow.materialDecisions"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" width="50" label="序号" />
          <el-table-column prop="quantity">
            <template #header> 数量 </template>
            <template slot-scope="{ row }">
              <el-input v-model="row.quantity" class="hide-spinners" :disabled="isDetailType" type="number" :min="0" />
            </template>
          </el-table-column>
          <el-table-column prop="decisionCode" label="决策">
            <template slot-scope="{ row }">
              <el-select
                v-model="row.decisionCode"
                placeholder="请选择"
                size="mini"
                :disabled="isDetailType"
                @change="changeDecision($event, row)"
              >
                <el-option
                  v-for="(item, index) in decisionEnums"
                  :key="index"
                  :label="item.decisionName"
                  :value="item.decisionCode"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="statusName" label="状态">
            <template slot-scope="{ row }">
              <el-input v-model="row.statusName" disabled />
            </template>
          </el-table-column>

          <el-table-column prop="remark" label="决策备注">
            <template slot-scope="{ row }">
              <el-input v-model="row.remark" :disabled="isDetailType" />
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-button class="deleteBtn" size="mini" type="text" @click="deleteDecision(row, $index)">删除</el-button>
          </template>
        </el-table-column> -->
        </el-table>
      </section>
    </div>
    <div v-else class="no-data">暂无决策</div>
  </div>
</template>
<script>
import { getDecisionEnums, deleteDecision, aqlList, getSternWidthLevelList, levelList } from '@/api/quality-manage.js'
export default {
  name: 'InspectionProgram',
  components: {},
  inject: ['sheetInitStatus'],
  props: {
    formInline: {
      type: Object,
      default: () => {}
    },
    currentRow: {
      type: Object,
      default: () => {}
    },
    clickIndex: {
      type: Number,
      default: -1
    },
    showDecisions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      decisionEnums: [],
      // rules: {},
      showDialog: false,
      reCheckValue: '',
      approveValue: '',
      // 检验结果,复核,核准是否置灰
      checkResultDisabled: false,
      reviewResultDisabled: false,
      authorizeResultDisabled: false,
      aqlTypeList: [], // aql枚举列表
      sternWidthLevelList: [], // 严格度枚举列表
      levelTypeList: [], // 检验水平枚举列表
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
      multipleSelection: []
    }
  },
  computed: {
    isAddType() {
      return this.$route.name.includes('Add')
    },
    noSelectRow() {
      return this.clickIndex === -1
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    },
    showDecision() {
      return this.showDecisions /* && this.currentRow.showDecisions */
      // return !this.isAddType && this.showDecisions /* && this.currentRow.showDecisions */
    },
    rules() {
      const { checkResult, reviewResult, authorizeResult } = this.currentRow
      const checkRule = [{ required: true, message: '该参数是必填项' }]
      const rules = {}
      if (typeof checkResult === 'number') {
        rules.unqualifiedQuantity = checkRule
        rules.qualifiedQuantity = checkRule
      } else {
        rules.unqualifiedQuantity = []
        rules.qualifiedQuantity = []
      }
      if (typeof reviewResult === 'number') {
        rules.reviewUnqualifiedQuantity = checkRule
        rules.reviewQualifiedQuantity = checkRule
      } else {
        rules.reviewUnqualifiedQuantity = []
        rules.reviewQualifiedQuantity = []
      }

      if (typeof authorizeResult === 'number') {
        rules.authorizeUnqualifiedQuantity = checkRule
        rules.authorizeQualifiedQuantity = checkRule
      } else {
        rules.authorizeUnqualifiedQuantity = []
        rules.authorizeQualifiedQuantity = []
      }
      return rules
    },
    showTips() {
      const quantity = this.currentRow.materialDecisions?.reduce((p, v) => {
        return p + (Number(v.quantity) || 0)
      }, 0)
      return quantity !== this.currentRow.inspectQuantity
    }
  },
  created() {
    this.getDecisionEnums()
    Promise.allSettled([aqlList(), getSternWidthLevelList(), levelList()]).then(res => {
      const [res1, res2, res3] = res
      this.aqlTypeList = res1.value.data.data
      this.sternWidthLevelList = res2.value.data.data
      this.levelTypeList = res3.value.data.data
    })
  },
  mounted() {},
  methods: {
    // 表格样式
    headerCellStyle({ row, colunm, rowIndex, columnIndex }) {
      return {
        background: '#F1F5FC',
        color: '#333333',
        'font-family': 'Source Han Sans CN',
        'font-weight': '400'
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取决策枚举
    async getDecisionEnums() {
      const params = {
        // sheetType: 'incomingInspect'
        sheetType: this.formInline.type
      }
      const res = await getDecisionEnums(params)
      this.decisionEnums = res.data?.data || []
    },
    // 切换行
    changeRow(flag) {
      this.$emit('changeRow', flag)
    },
    // 修改决策
    changeDecision(val, row) {
      const decisionItem = this.decisionEnums.find(item => item.decisionCode === val)
      row.statusName = decisionItem.qualifiedName
      row.status = decisionItem.qualifiedCode
    },
    // 增加决策
    addDecision() {
      if (this.isDetailType) return
      this.$set(this.currentRow.materialDecisions, this.currentRow.materialDecisions.length, {
        quantity: '',
        decisionCode: '',
        statusName: '',
        remark: ''
      })
    },
    // 删除决策
    deleteDecision(row, $index) {
      const deleteIds = this.multipleSelection.map(item => item.id).filter(item => !isNaN(item))

      this.$confirm('删除决策? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (deleteIds.length > 0) {
          deleteDecision(deleteIds).then(_ => {
            this.$message.success('删除成功')
            this.currentRow.materialDecisions = this.currentRow.materialDecisions.filter(item => {
              return this.multipleSelection.indexOf(item) === -1
            })
          })
        } else {
          this.currentRow.materialDecisions = this.currentRow.materialDecisions.filter(item => {
            return this.multipleSelection.indexOf(item) === -1
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 添加滚动条
.scroll {
  overflow: auto;
}
.scroll::-webkit-scrollbar {
  height: 8px; /* 设置滚动条的高度 */
  width: 8px; /* 设置滚动条的宽度 */
}
.checkoutDecision {
  .centerArea {
    //box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    //border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 18px 9px 0px;
    //margin-bottom: 10px;
    .title {
      display: flex;
      justify-content: space-between;
    }
  }
  .check {
    .el-form-item {
      margin-left: 90px;
    }
    ::v-deep .el-form-item__label {
      display: block;
      width: auto !important;
      text-align: left;
    }
  }
  .button-group {
    display: flex;
    margin: 0px 10px 8px 0;
  }
}
.no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #909399;
  .no-data-text {
    margin-top: 8px;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 400;
    font-size: 14px;
    color: #909399;
  }
}
::v-deep .el-input__inner {
  height: 32px;
}
</style>
