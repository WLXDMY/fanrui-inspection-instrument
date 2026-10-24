
<!--
    *@Author:xuqiuming
    * @Date: 2022-08-17 12:02:01
 * @LastEditTime: 2023-06-01 17:44:58
 * @LastEditors: xqm 13697256625@163.com
    * @Description: 全部继承element ui弹窗
-->
<template>

  <el-dialog
    v-bind="$attrs"
    width="70%"
    :visible.sync="diaVisible"
    class="common-select-dialog"
    v-on="$listeners"
  >
    <SelectTable ref="SelectTable" handle-selection-change height="500" :column="columnConfig" :table-data="loaclTableData" @selection-change="handleSelectionChange" @current-change="handleCurrentChange" />

    <template #footer>
      <div class="bnts">
        <el-button

          size="small"
          @click="cancel"
        >取消</el-button>
        <el-button

          type="primary"
          size="small"

          @click="confirm"
        >
          确认
        </el-button>

      </div>

    </template>

  </el-dialog>

</template>

<script>
import SelectTable from './selectTable.vue'
export default {
  components: {
    SelectTable
  },
  props: {
    columnConfig: {
      type: Array,
      default: () => ([])
    },
    tableData: {
      type: Array,
      default: () => ([])
    },
    visible: {
      type: Boolean,
      default: false
    },

    isRequired: { // 是否要必须选择一项
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      loaclTableData: [],

      currnetRow: {}, // 当前点击选中的行,
      hasSelectedRows: []
    }
  },
  computed: {
    diaVisible: {
      get() {
        return this.visible
      },
      set() {

      }
    }
  },
  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.loaclTableData = JSON.parse(JSON.stringify(newValue))
      }
    }
  },
  methods: {
    handleSelectionChange(rows) {
      this.hasSelectedRows = rows
    },
    handleCurrentChange(row) {
      this.currnetRow = row
    },
    cancel() {
      this.$emit('cancel')
    },

    confirm() {
      const isSelects = this.columnConfig.find(i => i.type === 'selection')
      if (!isSelects && (Object.keys(this.currnetRow).length === 0)) {
        return this.$notify({
          title: '提示',
          message: '请至少选择一项',
          type: 'warning',
          duration: 1000
        })
      } else if (!isSelects && (Object.keys(this.currnetRow).length > 0)) {
        this.$emit('confirm', JSON.parse(JSON.stringify(this.currnetRow)))
      } else if (this.isRequired && isSelects && this.hasSelectedRows.length === 0) {
        return this.$notify({
          title: '提示',
          message: '请至少选择一项',
          type: 'warning',
          duration: 1000
        })
      } else if (!this.isRequired && isSelects) {
        console.log(this.hasSelectedRows, 'hasSelectedRows')
        this.$emit('confirm', JSON.parse(JSON.stringify(this.hasSelectedRows)))
      }
    },

    getValueByMultiLevelKey(obj = {}, path = '') {
      const arr = path.split('.')
      let v = ''
      arr?.reduce((cur, key, index) => {
        if (index === arr.length - 1) {
          v = cur[key]
        } else {
          return cur[key]
        }
      }, obj)
      return v
    },
    hdItem(row) {
      this.columnConfig.forEach(i => {
        if (i.multiLevelKey) {
          row[i.prop] = this.getValueByMultiLevelKey(row, i.multiLevelKey)
        }
      })
      return row
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  margin: 40px auto;
  height: 700px;

}
/deep/ .el-dialog__body {
  height: calc(100% - 54px);
  padding-bottom: 60px;

}

/deep/ .el-dialog__header .el-dialog__headerbtn {
  display: none;

}
/deep/ .el-dialog__footer {
  position: absolute;
  left: 50%;
  bottom:0;
  transform: translate(-50%,0);
}

.pagination-container {
  bottom: 60px;
}
// .bnts
</style>
