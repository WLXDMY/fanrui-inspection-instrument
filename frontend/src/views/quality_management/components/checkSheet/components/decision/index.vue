<template lang="">
  <div>
    <section class="table">
      <el-form ref="decisionForm" :model="decisionForm" :rules="decisionRules">
        <el-table
          :data="decisionForm.tableData"
          max-height="400"
          highlight-current-row
          border
          style="width: 100%"
          :header-cell-style="{
            background: '#ECF1FF',
            color: '#333333',
            'font-family': 'Source Han Sans CN',
            'font-weight': '400'
          }"
        >
          <el-table-column
            type="index"
            width="80"
            label="序号"
          />
          <el-table-column
            prop="state"
            label="状态"
          />
          <el-table-column
            prop="num"
            label="数量"
          >
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'tableData.' + $index + '.num'"
                :rules="decisionRules.num"
                class="number-form-item"
              >
                <el-input
                  v-model="row.num"
                  :disabled="type === 'detail' || decisionState === 'alreadyDecision'"
                  size="small"
                  @input="handleNumChange($event, row)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="decision"
            label="使用决策"
          >
            <!-- <template slot-scope="{ row }">
              <el-select
                v-model="row.decision"
                placeholder="请选择"
                clearable
                :disabled="type === 'detail'"
                size="small"
                @change="handleDecisionChange($event, row)"
              >
                <el-option
                  v-for="(item, index) in decisionList"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </template> -->
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'tableData.' + $index + '.decision'"
                :rules="decisionRules.decision"
                class="number-form-item"
              >
                <el-select
                  v-model="row.decision"
                  placeholder="请选择"
                  clearable
                  :disabled="type === 'detail' || decisionState === 'alreadyDecision'"
                  size="small"
                  @change="handleDecisionChange($event, row)"
                >
                  <el-option
                    v-for="(item, index) in decisionList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
          >
            <template slot-scope="{ row }">
              <el-input
                v-model="row.remark"
                size="small"
                type="textarea"
                :disabled="type === 'detail' || decisionState === 'alreadyDecision'"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="删除"
            width="80"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                class="delete"
                size="small"
                type="text"
                :disabled="type === 'detail' || decisionState === 'alreadyDecision'"
                @click="deleteRow(row, $index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </section>
    <section class="add-new">
      <el-button
        v-if="type !== 'detail' && decisionState !== 'alreadyDecision'"
        type="primary"
        size="small"
        @click="addNewRow"
      >
        新增一行
      </el-button>
    </section>
  </div>
</template>
<script>
import { decisionList } from '@/api/quality-manage'
export default {
  name: 'Decision',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    code: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    decisionState: {
      type: String,
      default: ''
    },
    qualifiedQuantity: {
      type: Number,
      default: 0
    },
    workOrderNumber: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      decisionList: [],
      decisionForm: {
        tableData: []
      },
      decisionRules: {
        num: {
          required: true,
          message: '请输入数量',
          trigger: ['blur', 'change']
        },
        decision: {
          required: true,
          message: '请选择决策',
          trigger: ['blur', 'change']
        }
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.decisionForm.tableData = val || []
        if (val && val.length === 0) {
          this.addNewRow()
        }
      },
      immediate: true,
      deep: true
    },
    workOrderNumber: {
      handler(val) {
        if (val) {
          this.getDecisionList({
            code: this.code,
            relateCode: val
          })
        }
      },
      immediate: true
    }
  },
  created() {
    // this.getDecisionList(this.code)
  },
  methods: {
    // 数量改变
    handleNumChange(event, row) {
      // console.log('合格数量是 -> ', this.qualifiedQuantity)
      row.num = event.toString().replace(/[^\d]/g, '')
    },
    // 决策改变
    handleDecisionChange(event, row) {
      if (row.decision === '接收') {
        row.num = this.qualifiedQuantity
      }
      const code = this.decisionList.find(item => item.name === event)?.code
      if (code) {
        row.state = code
      } else {
        row.state = ''
      }
    },
    // 获取决策接口
    getDecisionList(code) {
      if (!code) return
      decisionList(code).then(res => {
        if (res.data.code === '200') {
          this.decisionList = res.data.data
        }
      })
    },
    addNewRow() {
      this.tableData.push({
        state: '',
        num: '',
        decision: '',
        remark: ''
      })
    },
    deleteRow(row, index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.add-new {
  // text-align: right;
  margin-top: 10px;
}
.delete {
  color: #f56c6c;
}
.number-form-item {
  margin: 0;
}
</style>
