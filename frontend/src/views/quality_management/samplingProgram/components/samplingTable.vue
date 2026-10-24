<template>
  <div>
    <section class="table">
      <el-form ref="detailForm" :model="detailFrom" :rules="detailRules">
        <el-table
          ref="tableRef"
          :data="detailFrom.listData"
          max-height="380"
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
          <!-- 序号 标签 -->
          <el-table-column type="index" label="序号" width="80" />
          <!-- 送检量 标签 -->
          <el-table-column prop="sampleNum" label="批量">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'listData.' + $index + '.sampleNum'"
                :rules="detailRules.sampleNum"
                class="detail-form-item"
              >
                <div v-if="standardType === 'gb2828' || isDetailType">
                  <span>{{ row.sampleNum }}</span>
                </div>
                <div v-else>
                  <el-input v-model="row.sampleNum" @input="handleSampleNum($event, row)" />
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <!-- 抽样比例只有在 标准类型为百分比时生效 -->
          <el-table-column v-if="standardType === 'percent'" prop="checkProportion" label="抽样比例(%)">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'listData.' + $index + '.checkProportion'"
                :rules="detailRules.checkProportion"
                class="detail-form-item"
              >
                <span v-if="isDetailType"> {{ row.checkProportion }} </span>
                <el-input v-else v-model="row.checkProportion" />
              </el-form-item>
            </template>
          </el-table-column>
          <!-- 抽样量 标签 -->
          <el-table-column v-else prop="checkNum" label="样本量">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'listData.' + $index + '.checkNum'"
                :rules="detailRules.checkNum"
                class="detail-form-item"
              >
                <div v-if="standardType === 'gb2828' || isDetailType">
                  <span>{{ row.checkNum }}</span>
                </div>
                <div v-else>
                  <el-input v-model="row.checkNum" @input="handleCheckNum($event, row)" />
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <!-- Ac 接收数 标签 -->
          <el-table-column prop="acValue" label="允收数量">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'listData.' + $index + '.acValue'"
                :rules="detailRules.acValue"
                class="detail-form-item"
              >
                <div v-if="standardType === 'gb2828' || isDetailType">
                  <span>{{ row.acValue }}</span>
                </div>
                <div v-else>
                  <el-input v-model="row.acValue" @input="handleAc($event, row)" />
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <!-- Re 拒收数 标签 -->
          <el-table-column prop="reValue" label="拒收数量">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'listData.' + $index + '.reValue'"
                :rules="detailRules.reValue"
                class="detail-form-item"
              >
                <div v-if="standardType === 'gb2828' || isDetailType">
                  <span>{{ row.reValue }}</span>
                </div>
                <div v-else>
                  <el-input v-model="row.reValue" @input="handleRe($event, row)" />
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="{ $index }">
              <el-button
                v-if="canDelete"
                :disabled="initStatus === 1"
                type="text"
                class="detail-delete"
                size="small"
                @click="deleteRow($index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </section>
    <section>
      <el-button
        v-if="hasAddBtn"
        :disabled="initStatus === 1 || standardType === 'full'"
        class="btn add-one-row"
        size="small"
        type="primary"
        plain
        @click="addOneRow"
      >
        新增一行
      </el-button>
    </section>
  </div>
</template>
<script>
// import { getStandardList } from '@/api/quality-manage'
export default {
  props: {
    standardType: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => {}
    },
    initStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      detailFrom: {
        listData: []
      },
      detailRules: {
        sampleNum: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur', 'change']
          }
        ],
        checkProportion: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur', 'change']
          }
        ],
        checkNum: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur', 'change']
          }
        ],
        acValue: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur', 'change']
          }
        ],
        reValue: [
          {
            required: true,
            message: '该参数是必填项',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  computed: {
    // 是否是编辑
    isDetailType() {
      return this.$route.name.includes('Detail')
    },
    // 是否有新增一行  详情 ，固定数量，国标，类型没有新增行按钮
    hasAddBtn() {
      return this.standardType && !this.isDetailType && this.standardType !== 'fixed' && this.standardType !== 'gb2828'
    },
    // 是否有删除按钮
    canDelete() {
      return !this.isDetailType && this.standardType !== 'gb2828' && this.standardType !== 'fixed'
    },
    // 是否是新增
    isAddType() {
      return this.$route.name.includes('Add')
    }
  },
  watch: {
    standardType: {
      handler(val, oldVal) {
        if (val === 'gb2828' && this.isAddType) {
          this.detailFrom.listData = []
        }
        if (val !== 'gb2828' && oldVal) {
          this.formData.aqlValue = null
          this.formData.inspectLevel = null
          this.formData.stringency = null
          this.detailFrom.listData = []
        }
      },
      immediate: true
    },
    initStatus: {
      handler(val) {
        if (val === 1) {
          this.$nextTick(() => {
            this.$disableInputDetail()
          })
        }
      },
      immediate: true
    }
  },

  created() {},
  methods: {
    // 删除一行
    deleteRow(index) {
      this.detailFrom.listData.splice(index, 1)
    },
    // 新增一行
    addOneRow() {
      let data = null
      if (this.standardType === 'percent') {
        data = {
          checkNum: '',
          checkProportion: '',
          acValue: '',
          reValue: '',
          ...this.formData
        }
      } else {
        data = {
          checkNum: '',
          sampleNum: '',
          acValue: '',
          reValue: '',
          ...this.formData
        }
      }
      this.detailFrom.listData.push(data)
      // 滚动到底部
      this.$nextTick(() => {
        this.$refs['tableRef'].bodyWrapper.scrollTop =
          this.$refs['tableRef'].$el.scrollHeight + this.detailFrom.listData.length * 100
      })
    },
    // reValue 值联动函数
    handleRe(value, row) {
      row.reValue = row.reValue.toString().replace(/[^\d]/g, '')
      /*  row.acValue = (Number(value) - 1 > 0 ? Number(value) - 1 : 0)?.toString() */
    },
    // acValue 值联动函数
    handleAc(value, row) {
      row.acValue = row.acValue.toString().replace(/[^\d]/g, '')
      /*   row.reValue = (Number(value) + 1 > 0 ? Number(value) + 1 : 0)?.toString() */
    },
    // 送检量联动函数
    handleCheckNum(value, row) {
      /*   row.sampleNum = row.sampleNum.toString().replace(/[^\d]/g, '') */
      // regular 表示 标准类型为 固定, 类型为 固定 时不允许联动数据
      /*  if (this.standardType === 'regular') return
      row.sampleNum = value.toString() */
    },
    handleSampleNum(value, row) {
      /*   console.log('xxxxx -> ', row.checkNum)
      row.checkNum = row.checkNum.toString().replace(/[^\d]/g, '') */
      // regular 表示 标准类型为 固定, 类型为 固定 时不允许联动数据
      /*    if (this.standardType === 'regular') return
      row.checkNum = value.toString() */
    },
    handleCheckProportion(value, row) {
      row.checkProportion = row.checkProportion.toString().replace(/[^\d]/g, '')
    }
  }
}
</script>
<style lang="scss" scoped>
.cr-select {
  padding: 20px 0;
}
::v-deep .el-form {
  display: flex;
  .el-form-item--small {
    width: 270px;
  }
}
.add-one-row {
  border-radius: 4px !important;
  margin-top: 10px;
}
.detail-form-item {
  margin-top: 0px;
  margin-bottom: 16px;
}
.detail-delete {
  // margin-top: 10px;
  color: #f56c6c;
}
</style>
