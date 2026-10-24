<!--
 * @Author: shunhua.liang
 * @Date: 2022-07-19 16:15:08
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-02-22 11:05:44
 * @Description: 查询需求
-->

<template>
  <div
    ref="menuScreen"
    class="search-box"
    :style="{ top: domTop, left: domLeft }"
  >
    <!-- 输入框的值 -->
    <section class="order">
      <div :class="!isLegal ? 'active' : ''">
        <el-input
          v-model="content"
          size="mini"
          :type="inputType"
          clearable
        />
      </div>

      <section class="action">
        <el-button size="mini" @click="clearFilterValue">清空</el-button>
        <el-button
          size="mini"
          type="primary"
          :disabled="!isLegal"
          @click="search"
        >
          确定
        </el-button>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    // 需要查询的列
    defineList: {
      type: Array,
      default: () => {
        return []
      }
    },
    config: {
      type: Object,
      require: false,
      default: () => {
        return {}
      }
    },
    isShow: {
      type: Boolean,
      require: false,
      default: false
    },
    // 部分字段的过滤并不是放到materialFields里面，而且直接在最外层如物料页面
    isOutSide: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {
      domTop: '', // 弹框位置
      domLeft: '', // 弹框位置
      actionName: '', // 请求字段名称
      actionType: '', // 数据类型
      content: '', // 请求内容
      options: [
        // 筛选框的值
      ],
      checkboxList: [],
      searchList: {},
      inputType: 'text', // 输入框的类型
      columnType: '', // 物料类型
      materialFields: {}, // 物料类型字段
      isLegal: true, // 值是否合法
      isIndeterminate: true,
      checkAll: false,
      isShowRadio: false
    }
  },
  watch: {
    config: {
      handler(newVal) {
        this.content = ''
        const {
          params,
          column,
          queryList,
          searchCode,
          options,
          columnConfig = {}
        } = newVal || {}
        this.options = options?.map(item => {
          return {
            ...item,
            code: this.handleFilterBackUp(item.code)
          }
        })
        const { clientX, clientY } = params || {}
        // 选择类型(物料列字段需要特殊出)
        const { columnType = '' } = columnConfig || {}
        if ('columnBoolean' in columnConfig) {
          this.isShowRadio = true
        } else {
          this.isShowRadio = false
        }
        this.columnType = columnType
        this.domTop = clientY + 20 + 'px'
        this.domLeft = clientX + 'px'
        this.searchList = searchCode || []
        this.handleColumnQuery(column)
        this.handleBackValue(queryList)
        this.isLegal = true
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    document.addEventListener('click', e => this.closeMenuDialog(e))
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeMenuDialog, false)
  },
  methods: {
    // 处理列的问题
    handleColumnQuery(value) {
      const { property = '' } = value
      const { queryName } = this.searchList || {}
      const { type = 'input' } = this.searchList || {}
      this.actionType = type
      this.actionName = queryName || property
      this.inputBoxType(type)
      this.$forceUpdate()
    },
    // input 输入框的类型
    inputBoxType(type) {
      switch (type) {
        case 'textArea':
          this.inputType = 'textarea '
          break
        default:
          this.inputType = 'text'
      }
    },
    // 处理数据回显的问题
    handleBackValue(value) {
      // 存在值的情况下
      if (this.actionName && value) {
        this.content = value[this.actionName]
        if ('queryTip' in this.searchList) {
          const time = []
          const { queryTip = [] } = this.searchList || {}
          queryTip?.forEach((el, index) => {
            time[index] = value[el]
          })
          this.content = time
        }
      }
    },
    // 搜索功能
    search() {
      const params = {}
      params[this.actionName] = this.content
      this.$emit('actionList', params)
    },
    // 清空按钮
    clearFilterValue() {
      if (typeof this.content !== 'boolean' && !this.content) {
        this.$emit('closeDialogSearch')
        return
      }
      const params = {}
      this.checkboxList = []
      this.checkAll = false
      params[this.actionName] = null
      this.$emit('actionList', params)
    },
    // 关闭菜单弹窗
    closeMenuDialog(e) {
      if (this.$refs?.menuScreen) {
        const flag =
          this.$refs.menuScreen.contains(e.target) ||
          e.target.parentNode.className === 'sale-order-table-column-setting' ||
          e.target.className ===
            'el-input__icon el-icon-circle-close el-input__clear'
        if (!flag) {
          this.$emit('closeDialogSearch')
        }
      }
    },
    // 处理值回显的问题
    handleFilterBackUp(value) {
      const type = this.judgeType(value)
      switch (type) {
        case 'boolean':
          return value
        default:
          return value + ''
      }
    },
    // 判断类型
    judgeType(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  position: fixed;
  z-index: 9999;
  min-width: 200px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  transform: translate(-50%, 0);
  box-sizing: border-box;
  padding: 10px;
  .order {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    ::v-deep .el-input--mini {
      margin-bottom: 15px;
    }
    .filter {
      width: 100%;
      margin-bottom: 15px;
      height: 300px;
      overflow-y: auto;
      ::v-deep .el-radio-group {
        display: flex;
        width: 100%;
        flex-direction: column;
        .el-radio-button__inner {
          display: block;
          border: none;
        }
      }
      ::v-deep .el-checkbox-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        .el-checkbox {
          margin-bottom: 10px;
        }
      }
    }
    .button-filter {
      width: 100%;
      margin-bottom: 15px;
      overflow-y: auto;
      ::v-deep .el-radio-group {
        display: flex;
        width: 100%;
        flex-direction: column;
        .el-radio-button__inner {
          display: block;
          border: none;
        }
      }
      ::v-deep .el-checkbox-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        .el-checkbox {
          margin-bottom: 10px;
        }
      }
    }
  }
  .action {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .active {
    width: 202px;
    color: red;
    ::v-deep .el-input--mini {
      margin-bottom: 0;
    }
    .words {
      font-size: 12px;
    }
  }
}
</style>
