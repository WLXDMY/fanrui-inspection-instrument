<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-05-31 15:32:36
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-18 16:45:40
 * @FilePath: \yelink-qms\src\components\InputWayTable\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="margin-left: 120px">
    <div>
      <el-form-item :label="inputModeName" prop="inputModeValue" label-width="100">
        <el-radio-group
          v-model="inputModeValue"
          placeholder="请选择"
          size="mini"
          :disabled="readonly || initStatus === 1"
          @change="changeInputMode"
        >
          <el-radio v-for="item in inputModeOptions" :key="item.code" :label="item.code">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item :label="inputModeName" prop="inputModeValue" label-width="100">
        <el-select
          v-model="inputModeValue"
          placeholder="请选择"
          size="mini"
          clearable
          :disabled="readonly"
          @change="changeInputMode"
        >
          <el-option v-for="item in inputModeOptions" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-input v-model="optionValue" :readonly="disable || readonly" size="mini" placeholder="请输入" />
        <el-button
          style="height: 32px"
          :disabled="readonly || disable"
          type="primary"
          size="mini"
          @click="addOptionValue()"
          >添加</el-button
        >
      </el-form-item>
    </div>
    <el-table ref="multipleTable" :class="{ disable }" :data="tableData" @select="handleSelectionChange">
      <el-table-column prop="optionName" label="输入值" />

      <el-table-column v-if="isQualitative" width="200" prop="judgeFlag" label="判定逻辑">
        <template slot-scope="{ row }">
          <el-radio-group v-model="row.judgeFlag">
            <el-radio :label="1" :disabled="readonly || initStatus === 1">合格</el-radio>
            <el-radio :label="0" :disabled="readonly || initStatus === 1">不合格</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>

      <el-table-column class-name="selection-type" :selectable="selectable" type="selection" width="60" label="" />

      <el-table-column width="100" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="isQualitative && scope.row.enableFlag === 0"
            type="text"
            :disabled="readonly || initStatus === 1"
            size="mini"
            @click="handleEnable(scope.$index, scope.row)"
            >启用</el-button
          >
          <el-button
            v-if="isQualitative && scope.row.enableFlag === 1"
            :class="readonly ? '' : 'red'"
            type="text"
            :disabled="readonly || initStatus === 1"
            size="mini"
            @click="handleBlockUp(scope.$index, scope.row)"
            >停用</el-button
          >
          <el-button
            :class="readonly || initStatus === 1 ? '' : 'red'"
            type="text"
            :disabled="readonly || initStatus === 1"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'InputWayTable',
  props: {
    // 输入方式-名称
    inputModeName: {
      type: String,
      default: '输入方式:'
    },
    // 输入方式
    inputMode: {
      type: String,
      default: ''
    },
    // 输入值
    itemOptionList: {
      type: Array
    },
    optionalStr: {
      type: [String, Array]
    },
    defalutStr: {
      type: String,
      default: ''
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    // 输入方式-枚举
    inputModeOptions: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 分析方法
    analyzeMethodCode: {
      type: String,
      default: ''
    },
    initStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tableData: [],
      optionValue: '',
      inputModeValue: 'handInput'
    }
  },

  computed: {
    selectable() {
      return () => {
        if (this.readonly || this.initStatus === 1) {
          return false
        }
        return true
      }
    },
    disable() {
      return !this.inputModeValue || this.inputModeValue === 'handInput'
    },
    // 分析方法是定性分析
    isQualitative() {
      return this.analyzeMethodCode === 'qualitative'
    }
  },
  watch: {
    itemOptionList: {
      handler(val) {
        this.tableData = this.itemOptionList || []
      },
      immediate: true
    },
    tableData: {
      handler(val) {
        setTimeout(() => {
          this.tableData &&
            this.tableData.forEach(item => {
              const row = item.defaultOptionFlag
              const isBol = !!row
              this.$refs.multipleTable.toggleRowSelection(item, isBol)
            })
          // 需要更新选项的值
          this.$emit('update:itemOptionList', this.tableData)
        }, 500)
      },
      deep: true
    },
    inputMode: {
      handler(val) {
        if (val) {
          this.inputModeValue = val
        }
      },
      immediate: true
    },
    inputModeValue: {
      handler(val) {
        this.$emit('update:inputMode', val)
      }
    }
  },
  mounted() {},
  methods: {
    changeInputMode() {
      this.$emit('update:defalutStr', '')
      this.$emit('update:optionalStr', '')
    },
    handleSelectionChange(selection, row) {
      if (this.inputModeValue === 'singleChoice') {
        this.multipleChoice = [row]
        this.$refs.multipleTable.clearSelection()
        this.tableData.forEach(item => {
          item.defaultOptionFlag = 0
        })
        this.$refs.multipleTable.toggleRowSelection(row, true)
        this.$set(row, 'defaultOptionFlag', 1)
      } else {
        this.multipleChoice = selection
        // 先把数组里的默认选中都清空，在赋值有勾选的
        this.tableData.forEach(item => {
          item.defaultOptionFlag = 0
        })
        selection.forEach(item => {
          item.defaultOptionFlag = 1
        })
      }
    },
    addOptionValue() {
      const isRepeated = this.tableData.some(item => item.optionName === this.optionValue.trim())

      if (this.optionValue.trim() === '') {
        this.$notify({
          title: '提示',
          message: '请先输入内容，再点击添加',
          type: 'warning',
          duration: 2000
        })
        return
      }

      if (isRepeated) {
        this.$notify({
          title: '提示',
          message: '已添加过该值',
          type: 'warning',
          duration: 2000
        })
        this.optionValue = ''
        return
      }

      // 定性分析
      if (this.isQualitative) {
        this.tableData.push({ optionName: this.optionValue, judgeFlag: 1, enableFlag: 1, defaultOptionFlag: 0 })
      } else {
        this.tableData.push({ optionName: this.optionValue, defaultOptionFlag: 0 })
      }
      this.optionValue = ''
    },
    handleDelete(index, row) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(index, 1)
        })
        .catch(() => {})
    },
    handleBlockUp(index, row) {
      this.$confirm('是否停用该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          row.enableFlag = 0
        })
        .catch(() => {})
    },
    handleEnable(index, row) {
      this.$confirm('是否启用该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          row.enableFlag = 1
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.disable.el-table {
  filter: grayscale(1);
  pointer-events: none;
}
::v-deep.el-table {
  width: 50%;
  /* 隐藏默认的复选框 */
  .el-table__header .el-checkbox {
    display: none;
  }
  .el-table__body-wrapper tr:first-of-type td {
    border-top: 1px solid #dfe6ec !important;
  }
  .el-button {
    margin-left: 10px;
  }
  tr {
    height: 36px;
  }
  th {
    border-bottom: none !important;
  }
  // 复选框表头展示
  .el-table__header .selection-type {
    position: relative;
  }
  .el-table__header .selection-type::before {
    content: '默认选中';
    position: absolute;
  }
  td {
    padding: 5px 0;
    height: 36px;
    // border-top: 1px solid #dfe6ec;
  }
}
.red {
  color: rgb(255, 73, 73);
}
::v-deep .el-radio__input.is-disabled.is-checked .el-radio__inner {
  color: #606266;
}
</style>
