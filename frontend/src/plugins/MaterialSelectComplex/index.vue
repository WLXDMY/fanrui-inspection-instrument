<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2025-02-25 11:36:58
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-29 13:54:26
 * @Description: 抽样方案下拉框
-->
<template>
  <div class="complete-select">
    <el-select
      ref="selectRef"
      v-loadMore="handleLoadMore"
      :clearable="clearable"
      popper-class="page-select-list"
      :filterable="filterable"
      :remote="filterable"
      :remote-method="remoteMethod"
      :loading="loading"
      :disabled="disabled"
      size="medium"
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
    <el-button :disabled="disabled" icon="el-icon-search" @click="btnClick" />
  </div>
</template>

<script>
import loadMore from './directive/load.js'
import { requestFun, materialsList } from '@/api/common.js'
import { standardList } from '@/api/quality-manage.js'
export default {
  name: 'YComplexSelect', // 复合下拉组件，左侧支持下拉选择 触底加载更多，远程搜索；右侧按钮点击
  directives: {
    loadMore: loadMore // 滚动触底指令
  },
  props: {
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 列表 label 键名
    labelKey: {
      type: String,
      default: 'name'
      // default: 'code'
    },
    // 搜索关键词名
    keywordKey: {
      type: String,
      default: 'name'
      // default: 'code'
    },
    // 列表 value 键名
    valueKey: {
      type: String,
      default: 'name'
      // default: 'code'
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
    // 请求配置
    requestConf: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      materialCodeLoading: false,
      isFinished: false,
      isLoading: false,
      internalValue: null,
      options: [],
      pageNo: 1,
      pageSize: 20,
      loading: false,
      keyword: '',
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
  methods: {
    // 获取数据源下拉列表
    async getRequestConf({ pageNo, pageSize, query }) {
      const { url, method, params, optionValuesType } = this.requestConf
      params['current'] = pageNo
      params['size'] = pageSize
      const snedParams = {
        ...params,
        [`${this.keywordKey}`]: query
      }
      this.materialCodeLoading = true
      this.isLoading = true
      const res = await requestFun(url, method, snedParams) // 自定义接口
      const { code: apiCode, data: apiData, status } = res.data
      const pageData = optionValuesType === 'pageapi' ? apiData.records : apiData // 是否是分页接口
      if (apiCode === '200' || +status === 1) {
        if (pageData.length == 0) {
          this.isFinished = true
          return
        }
        // 合并一下下拉框数据
        this.options = [...this.options, ...pageData]
        console.log('获取的数据', this.options.length)
      }
      this.isLoading = false
      this.materialCodeLoading = false
    },
    // 获取物料列表
    async getBomList({ pageNo, pageSize, query }) {
      try {
        const params = {
          current: pageNo,
          size: pageSize,
          filter: true,
          statues: [1]
        }
        if (query) {
          params[`${this.keywordKey}`] = query
        }
        const res = await standardList(params)
        console.log('获取物料列表', res)

        // const res = await materialsList(params)
        this.materialCodeLoading = false
        const {
          code,
          status,
          data: { records = [] },
          message
        } = res.data || {}
        if (+code === 200 || +status === 1) {
          return records.map(item => {
            return {
              ...item
              /*   [`${this.labelKey}`]: item[this.keywordKey],
              [`${this.valueKey}`]: item[this.keywordKey] */
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
      } catch (err) {
        this.materialCodeLoading = false
      }
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
    // 重置
    initData() {
      this.isFinished = false
      this.keyword = ''
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
        console.log('获取的数据 content', content)

        this.isLoading = false
        if (content.length == 0) {
          this.isFinished = true
          return
        }
        // 合并一下下拉框数据
        this.options = [...this.options, ...content]
        console.log('获取的数据', this.options.length)
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
  &:deep(.el-button) {
    height: 36px !important;
  }
}
.tips {
  display: flex;
  justify-content: center;
  color: #909399;
  font-size: 12px;
}
</style>
