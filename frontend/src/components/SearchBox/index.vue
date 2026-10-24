<!--
 * @Author: shunhua.liang
 * @Date: 2022-07-19 16:15:08
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-03-08 11:38:40
 * @Description: 查询需求
-->

<template>
  <div
    ref="menuScreen"
    class="search-box"
    :style="{ top: domTop, left: domLeft }"
  >
    <!-- 输入框的值 -->
    <section
      v-if="
        actionType === 'input' ||
          actionType === 'input-number' ||
          actionType === 'textArea'
      "
      class="order"
    >
      <div :class="!isLegal ? 'active' : ''">
        <el-input
          v-model="content"
          size="mini"
          :type="inputType"
          clearable
          @change="verify"
          @clear="clear"
        />
        <span v-if="!isLegal" class="words">请输入合法格式的数字</span>
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
    <!-- 筛选款的值 -->
    <section v-if="actionType === 'filter'" class="order">
      <div class="button-filter" style="min-height: 80px">
        <section v-if="isShowRadio" class="filter">
          <el-radio-group v-model="content">
            <el-radio-button
              v-for="(item, index) in options"
              :key="index"
              :label="item.code"
              @click.native.prevent="radioClick(item)"
            >{{ item.name }}</el-radio-button>
          </el-radio-group>
        </section>
        <section v-if="!isShowRadio" class="filter">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0" />
          <el-input
            v-if="isShowSearch()"
            v-model="fuzzySearch"
            prefix-icon="el-icon-search"
            placeholder="请输入查询条件"
            size="mini"
          />
          <el-checkbox-group v-model="checkboxList" @change="checkboxChange">
            <el-checkbox
              v-for="(item, index) in options"
              :key="index"
              :label="item.code"
            >{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </section>
      </div>
      <section class="action">
        <el-button size="mini" @click="clearFilterValue">清空</el-button>
        <el-button size="mini" type="primary" @click="search">确定</el-button>
      </section>
    </section>
    <!-- 日期进行处理 -->
    <section v-if="actionType === 'timeline'">
      <el-date-picker
        v-model="content"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeTimeRage"
        @keyup.enter="changeTimeRage"
      />
    </section>
    <!--物料特征参数选择弹窗 -->
    <ChoiceSpecificParamsDialog
      v-if="choiceSpecificParamstVisible && actionType === 'dialog'"
      :is-search="true"
      :back-value="content"
      @confirm="confirmChoiceSpecificParams"
      @cancel="cancelChoiceSpecificParams"
    />
  </div>
</template>

<script>
import ChoiceSpecificParamsDialog from '@/components/ChoiceSpecificParamsDialog/index.vue'

export default {
  components: {
    ChoiceSpecificParamsDialog
  },
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
    },
    isShowSearchBox: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {
      choiceSpecificParamstVisible: true,
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
      isShowRadio: false,
      fuzzySearch: '',
      timer: null,
      originOption: []
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
        this.originOption = this.options
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
        this.searchList = searchCode
        this.handleColumnQuery(column)
        this.handleBackValue(queryList)
        this.isLegal = true
      },
      deep: true
    },
    fuzzySearch: {
      handler(newVal) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const reg = new RegExp(newVal)
          const res = this.originOption.filter(item => {
            return item.name.match(reg)
          })
          this.options = res
        }, 500)
      }
    },
    isShowSearchBox: {
      handler(newVal) {
        if (newVal) {
          this.choiceSpecificParamstVisible = newVal
        }
      }
    }
  },
  mounted() {
    // TODO 这里为暂时处理销售订单的逻辑
    this.currentRoute = this.$route.name
    document.addEventListener('click', e => this.closeMenuDialog(e))
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeMenuDialog, false)
  },
  methods: {
    isShowSearch() {
      const list = [
        'customerName',
        'customerCode',
        'salesmanName',
        'salesmanCode'
      ]
      return (
        this.currentRoute === 'salesOrder' && list.includes(this.actionName)
      )
    },
    // 校验输入框的值
    verify(value) {
      if (this.actionType === 'input-number' && value) {
        const verifyRule = new RegExp(
          '^(([1-9][0-9]*(.)?[0-9]*)|(0(.)([0-9]*))|(0))$'
        )
        this.isLegal = verifyRule.test(value)
      } else {
        this.isLegal = true
      }
    },
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
        const { materialFields = {}} = value || {}
        // 物料类型字段
        if (this.columnType === 'material' && !this.isOutSide) {
          this.content = materialFields[this.actionName]
        } else {
          this.content = value[this.actionName]
        }
        if ('queryTip' in this.searchList) {
          const time = []
          const { queryTip = [] } = this.searchList || {}
          queryTip.forEach((el, index) => {
            time[index] = value[el]
          })
          this.content = time
        }
        // 处理多选框回显问题
        if (this.actionType === 'filter') {
          let checkValue
          if (this.columnType === 'material' && !this.isOutSide) {
            const { materialFields = {}} = value || {}
            checkValue = materialFields[this.actionName]
          } else {
            checkValue = value[this.actionName]
          }
          // 存在值的情况下
          if (checkValue && !this.isShowRadio) {
            this.checkboxList = checkValue.split(',')
            // this.checkboxList = this.checkboxList.map(item => +item)
          } else {
            this.checkboxList = []
            this.checkAll = false
          }
        }
      }
    },
    // 搜索功能
    search() {
      const params = {}
      if (this.columnType === 'material') {
        const materialFields = {}
        materialFields[this.actionName] = this.content
        this.$set(params, 'materialFields', materialFields)
      } else {
        params[this.actionName] = this.content
      }
      this.fuzzySearch = ''
      this.$emit('actionList', params)
    },
    clear() {
      const params = {}
      if (this.columnType === 'material') {
        const materialFields = {}
        materialFields[this.actionName] = ''
        this.$set(params, 'materialFields', materialFields)
      } else {
        params[this.actionName] = ''
      }
      // params[this.actionName] = ''
      this.$emit('clearList', params)
    },
    // 选择物料特征参数弹窗确认
    confirmChoiceSpecificParams(materialSkus) {
      this.$emit('actionList', { materialSkus })
      this.choiceSpecificParamstVisible = false
    },
    // 关闭选择物料特征参数弹窗
    cancelChoiceSpecificParams() {
      this.clearFilterValue()
      this.choiceSpecificParamstVisible = false
    },
    // 清空按钮
    clearFilterValue() {
      this.fuzzySearch = ''
      if (typeof this.content !== 'boolean' && !this.content) {
        this.$emit('closeDialogSearch')
        return
      }
      const params = {}
      if (this.columnType === 'material') {
        const materialFields = {}
        materialFields[this.actionName] = ''
        this.$set(params, 'materialFields', materialFields)
      } else {
        this.checkboxList = []
        this.checkAll = false
        params[this.actionName] = null
      }
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
    // 时间触发
    changeTimeRage(time) {
      const params = {}
      if (!time) {
        const { queryTip = [] } = this.searchList
        queryTip.forEach(el => {
          params[el] = ''
        })
        this.$emit('actionList', params)
        return
      }

      if (Array.isArray(time)) {
        if (time && time.length) {
          const currentDate = []
          const { queryTip = [] } = this.searchList
          time.forEach(el => {
            const tem = this.handleTime(el)
            currentDate.push(tem)
          })
          if (!queryTip) return
          params[queryTip[0]] = currentDate[0] + '00:00:00'
          params[queryTip[1]] = currentDate[1] + '23:59:59'
        }
      } else {
        params[this.actionName] = this.handleTime(time)
      }
      this.$emit('actionList', params)
    },
    radioClick(value) {
      const { code } = value
      if (this.content === code) {
        this.content = ''
      } else {
        this.content = code
      }
    },
    // 处理时间
    handleTime(value = null) {
      const that = this
      const time =
        Object.prototype.toString.call(value) === '[object Null]'
          ? new Date()
          : new Date(value)
      const Year = time.getFullYear()
      const Month = time.getMonth() + 1
      const Day = time.getDate()
      // const Hour = time.getHours()
      // const Minute = time.getMinutes()
      // const Second = time.getSeconds()
      return (
        Year +
        '-' +
        that._handleZeroPadding(Month) +
        '-' +
        that._handleZeroPadding(Day) +
        ' '
        //  +
        // that._handleZeroPadding(Hour) +
        // ':' +
        // that._handleZeroPadding(Minute) +
        // ':' +
        // that._handleZeroPadding(Second)
      )
    },
    // 处理0
    _handleZeroPadding(value) {
      return +value < 10 ? '0' + value : value
    },
    // 多选框选中的值
    checkboxChange(value) {
      const checkLength = value.length
      // this.checkAll = checkLength === this.options.length
      this.checkAll = checkLength === this.originOption.length
      this.content = value.join(',')
      // this.isIndeterminate =
      //   checkLength > 0 && checkLength < this.options.length
      this.isIndeterminate =
        checkLength > 0 && checkLength < this.originOption.length
    },
    handleCheckAllChange(val) {
      const result = this.options?.map(item => item.code) || []
      this.checkboxList = val ? result : []
      this.content = this.checkboxList.join(',')
      this.isIndeterminate = false
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
  z-index: 1000;
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
