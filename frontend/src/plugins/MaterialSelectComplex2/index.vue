<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2025-04-29 10:02:27
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-29 14:02:27
 * @Description:  物料列表下拉框
-->
<template>
  <div class="complete-select" :class="[{ 'multiple-select': multiple }]">
    <el-select
      ref="selectRef"
      v-loadMore="handleLoadMore"
      placeholder="请选择物料编码"
      :clearable="clearable"
      popper-class="page-select-list"
      :filterable="filterable"
      :remote="filterable"
      :remote-method="remoteMethod"
      :loading="loading"
      :disabled="disabled"
      :multiple="multiple"
      :size="size"
      v-bind="$attrs"
      @visible-change="handleVisibleChange"
      @change="handleChange"
      v-on="$listeners"
    >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item[`${labelKey}`]"
        :value="item[`${valueKey}`]"
      />
      <template>
        <div class="tips">
          <div v-if="isLoading && !isFinished">
            <i class="el-icon-loading" />
          </div>
          <div v-if="isFinished">
            <span>暂无更多~</span>
          </div>
        </div>
      </template>
    </el-select>
    <el-button
      v-if="disabledBtn"
      class="btn"
      :class="{ sizeSmall: size === 'small' }"
      :size="size"
      :disabled="disabled"
      icon="el-icon-search"
      @click="btnClick"
    />
  </div>
</template>

<script>
import loadMore from './directive/load.js'
import { requestFun, materialsList } from '@/api/common.js'
export default {
  name: 'YComplexSelect2', // 复合下拉组件，左侧支持下拉选择 触底加载更多，远程搜索；右侧按钮点击
  directives: {
    loadMore: loadMore // 滚动触底指令
  },
  props: {
    // 禁用 整体禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示右侧按钮
    disabledBtn: {
      type: Boolean,
      default: true
    },
    // 列表 value 键名
    valueKey: {
      type: String,
      default: 'code'
    },
    // 列表 label 键名 不传则默认为valueKey
    labelKey: {
      type: String,
      default: function() {
        return this.valueKey
      }
    },
    // 搜索关键词名 不传则默认为valueKey
    keywordKey: {
      type: String,
      default: function() {
        return this.valueKey
      }
    },
    // 是否支持搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 是否支持清空
    clearable: {
      type: Boolean,
      default: true
    },
    // 请求配置 不传默认为物料下拉选择组件
    requestConf: {
      type: Object,
      default: () => {
        return {}
      }
    },
    size: {
      type: String,
      default: 'medium'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFinished: false,
      isLoading: false,
      internalValue: null,
      options: [],
      pageNo: 1,
      pageSize: 20,
      loading: false,
      keyword: null,
      selectVisible: false
    }
  },
  computed: {
    // 可见数据源（兼容处理分页加载选项框，非首页数据回显问题）
    // visibleOptions() {
    //   // 下拉框可见 直接加载分页数据
    //   if (this.selectVisible || !this.internalValue) return this.options
    //   if (!this.data.length) return []
    //   // 下拉框不可见 仅加载当前选中数据即可
    //   return this.data.filter(
    //     item => item[`${this.valueKey}`] === this.internalValue
    //   )
    // }
  },
  watch: {
    /*  value(newVal) {
        this.internalValue = newVal
      },
      internalValue(newVal) {
        this.$emit('input', newVal)
      } */
  },
  mounted() {
    // 处理下拉带远程搜索 不出现下拉箭头
    if (!this.disabledBtn) {
      const rulesDom = this.$refs['selectRef'].$el.querySelector(
        '.el-input .el-input__suffix .el-input__suffix-inner .el-input__icon'
      )
      rulesDom.classList.add('el-icon-arrow-up') // 对dom新增箭头图标
    }
  },
  methods: {
    // 获取数据源下拉列表
    async getRequestConf({ pageNo, pageSize, query }) {
      const {
        url,
        method = 'post',
        params = {},
        optionValuesType = 'pageApi'
      } = this.requestConf
      params['current'] = pageNo
      params['currentPage'] = pageNo // 兼容某些列表查询 页码参数为currentPage
      params['size'] = pageSize
      const sendParams = {
        ...params,
        [`${this.keywordKey}`]: query || null
      }
      this.isLoading = true
      const res = await requestFun(url, method, sendParams) // 自定义接口
      const { code: apiCode, data: apiData } = res.data
      const pageData =
        optionValuesType === 'pageApi' ? apiData.records : apiData // 是否是分页接口
      if (apiCode === '200') {
        if (pageData.length == 0) {
          this.isFinished = true
          return
        }
        console.log('pageData', pageData)
        // 合并一下下拉框数据
        this.options = [...this.options, ...pageData]
      }
      this.isLoading = false
    },
    // 获取物料列表
    async getBomList({ pageNo, pageSize, query }) {
      try {
        const params = {
          current: pageNo,
          currentPage: pageNo, // 兼容某些列表查询 页码参数为currentPage
          size: pageSize,
          states: '2'
        }
        if (query) {
          params[`${this.keywordKey}`] = query
        }
        const res = await materialsList(params)
        const {
          code,
          data: { records = [] },
          message
        } = res.data || {}
        if (+code === 200) {
          return records.map(item => {
            return {
              ...item
            }
          })
        } else {
          this.$notify({
            title: '提示',
            message,
            type: 'error',
            duration: 1000
          })
        }
      } catch (err) {}
    },
    // 展开物料弹窗
    btnClick() {
      this.$emit('btnClickCallback')
    },
    // 选择下拉数据
    handleChange(e) {
      this.$emit('selectChange', e, this.options)
    },
    handleVisibleChange(visible) {
      this.selectVisible = visible
      // 处理下拉带远程搜索 下拉箭头反转
      if (!this.disabledBtn) {
        this.reverseArrow(visible)
      }
      if (visible && !this.options.length) {
        this.getOptions()
      }
      if (!visible && this.keyword) {
        this.initData()
      }
      if (!visible) {
        this.initData()
      }
    },
    reverseArrow(flag) {
      // 找到dom
      const rulesDom = this.$refs['selectRef'].$el.querySelector(
        '.el-input .el-input__suffix .el-input__suffix-inner .el-input__icon'
      )
      if (flag) {
        rulesDom.classList.add('is-reverse') // 对dom新增class
      } else {
        rulesDom.classList.remove('is-reverse') // 对dom移除class
      }
    },
    // 重置
    initData() {
      this.isFinished = false
      this.keyword = null
      this.pageNo = 1
      this.pageSize = 20
      this.options = []
    },
    // 获取下拉数据
    async getOptions() {
      try {
        // 默认是物料选择组件 有配置requestConf则是自定义数据源
        if (Object.keys(this.requestConf).length != 0) {
          this.getRequestConf({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            query: this.keyword
          })
          return
        }
        if (!this.getBomList) return
        this.isLoading = true
        const content = await this.getBomList({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          query: this.keyword
        })
        this.isLoading = false
        if (content.length == 0) {
          this.isFinished = true
          return
        }
        // 合并一下下拉框数据
        this.options = [...this.options, ...content]
      } catch (error) {
        console.log(error, 'err')
      }
    },
    // 触底了，继续发请求
    handleLoadMore() {
      if (!this.selectVisible) return
      this.pageNo++
      this.getOptions()
    },
    // 远程搜索
    async remoteMethod(keyword) {
      try {
        this.loading = true
        this.keyword = keyword
        this.pageNo = 1
        this.isFinished = false
        this.options = []
        await this.getOptions()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.complete-select {
  width: 100%;
  display: flex;
  align-items: center;
  &:deep(.el-button) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }
  &:deep(.el-select) {
    flex: 1;
  }
  &:deep(.el-input__inner) {
    width: 100%;
    flex: 1;
  }
  &:deep(.el-input--small) {
    font-size: 14px !important;
  }
  &:deep(.el-button) {
    /* height: 36px !important; */
    /*  height: calc(100% - 1px); */
  }
  .btn {
    height: 36px !important;
  }
  .sizeSmall {
    height: 32px !important;
  }
}
.multiple-select {
  display: flex;
  align-items: normal;
}
.tips {
  display: flex;
  justify-content: center;
  color: #909399;
  font-size: 12px;
}
</style>
