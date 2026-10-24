<template>
  <el-dialog
    v-bind="$attrs"
    width="900px"
    :visible.sync="diaVisible"
    class="common-select-dialog"
    title="列表筛选"
    append-to-body
    v-on="$listeners"
    @close="$emit('cancelColumnConfig')"
  >
    <DragTable :colums="colums" :table-data="rightColumns" @updateCommonTableColumns="hdUpdateColumns">
      <!-- 字段名称 -->
      <template #label="{ row }">
        <!-- <el-checkbox v-model="row.checked" /> -->
        <!-- <el-image :src="require('./assets/default-drag.png')" fit="fill" /> -->
        <div class="image-div">
          <img :src="require('./assets/default-drag.png')" class="image" />
          {{ row.label }}
        </div>
      </template>
      <!-- 显示 -->
      <template #checked="{ row }">
        <el-checkbox v-model="row.checked" />
      </template>
      <!-- 阈值 -->
      <template #thresholdValue="{ row }">
        <el-input v-if="'thresholdValue' in row" v-model="row.thresholdValue" size="small" style="width: 50%" />
      </template>
      <!-- 汇总 -->
      <template #total="{ row }">
        <el-checkbox v-if="row.summaryType" v-model="row.total">求和</el-checkbox>
      </template>
    </DragTable>
    <div class="btns">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="saveConfig">确认</el-button>
    </div>
    <!-- </div> -->
  </el-dialog>
</template>

<script>
// import { eventBus } from '@/main.js'
export default {
  components: {
    DragTable: () => import('./dragTable')
  },
  props: {
    rightColumns: {
      type: Array,
      default: () => []
    },

    columnsConfigVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkedColumns: [],
      isIndeterminate: true,
      columnsConfigDeep: [],
      diaVisible: false,
      colums: [
        {
          label: '字段名称',
          prop: 'label',
          width: '130px',
          type: 'slot'
        },
        {
          label: '显示',
          prop: 'checked',
          width: '120px',
          type: 'slot'
        }
        // {
        //   label: '阈值设置',
        //   prop: 'thresholdValue',
        //   width: '400px',
        //   type: 'slot'
        // },
        // {
        //   label: '汇总筛选',
        //   prop: 'total',
        //   width: '120px',
        //   type: 'slot'
        // }
      ]
    }
  },
  computed: {
    checkAll: {
      get() {
        if (this.checkedColumns.length === this.columnsConfigDeep.length) {
          this.isIndeterminate = false
          return true
        } else {
          this.isIndeterminate = true
          return false
        }
      },
      set(val) {
        if (val) {
          this.isIndeterminate = false
          this.checkedColumns = this.columnsConfigDeep.map(i => i.prop)
        } else {
          this.checkedColumns = []
        }
      }
    }
  },
  watch: {
    checkedColumns: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.columnsConfigDeep.forEach(i => {
          const index = this.checkedColumns.findIndex(si => si === i.prop)
          if (index > -1) {
            i.checked = true
          } else {
            i.checked = false
          }
        })
        this.$emit('updateColumns', this.columnsConfigDeep)
      }
    },
    rightColumns: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.columnsConfigDeep = JSON.parse(JSON.stringify(newVal))
        const propArr = []
        this.columnsConfigDeep.forEach(i => {
          if (i.checked) {
            propArr.push(i.prop)
          }
        })
        this.checkedColumns = propArr
      }
    },
    columnsConfigVisible: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.diaVisible = newVal
      }
    }
  },

  created() {},
  mounted() {
    this.hdtype()
  },
  methods: {
    hdUpdateColumns(val) {
      // console.log('columns 1 ---> ', val)
      this.$emit('updateColumns', val)
    },
    hdtype() {
      // const type = ['planQuantity', 'finishCount', 'todayPlanQuantity', 'todayFinishCount', 'outputHours', 'inputHours']
    },
    cancel() {
      this.$emit('cancelColumnConfig')
    },
    saveConfig() {
      this.$emit('cancelColumnConfig')
      this.$emit('saveTableColumnsConfig')
      // eventBus.$emit('saveColumnsConfig')
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-table {
  header {
    width: 100%;
    display: flex;
    height: 42px;
    background-color: #f2f5fc;
  }
}
.btns {
  display: flex;
  justify-content: center;
}
::v-deep .el-input__inner {
  text-align: center;
}
.image-div {
  width: 100%;
  text-align: start;
  padding-left: 25px;
  .image {
    width: 5px;
    height: 10px;
  }
}

// .el-dialog {
//   .el-dialog__body {
//     z-index: 999999;
//   }
// }
</style>
