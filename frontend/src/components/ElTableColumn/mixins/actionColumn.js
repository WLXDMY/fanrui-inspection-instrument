/*
 * @Author: shunhua.liang
 * @Date: 2022-08-17 19:24:51
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-07-26 12:27:56
 * @Description: 表格右侧列操作
 */

const actionColumn = {
  props: {
    search: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    selectOption: {
      type: [Array, Object],
      require: true,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    // 下拉数据列表
    selectOption: {
      handler(newVal) {
        this.$set(this.configSearch, 'options', newVal)
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      materialFields: {}
    }
  },
  methods: {
    // 获取用户设置列的值，重新请求列接口
    getColumnList() {
      this.isShowCustomColumn = false
      // 重新获取列的数据
      this.$next(() => {
        this.getColumn()
      })
    },
    // 对表格列进行了拖拽，表格需要重新排序
    dragColumn(value = []) {
      // 如果为空数组，直接返回
      if (!value.length) return
    },
    // 处理高亮的图标
    isExistFilter(result, config) {
      // 判断是否有值
      if (!result) return
      const { columnType } = config || {}

      switch (columnType) {
        case 'material':
          return this.searchFields(result, this.listQuery, 'material')
        default:
          return this.searchFields(result, this.listQuery)
      }
    },
    // 处理物料字段,物料请求字段是放入 materialFields中请求的
    searchFields(val, list, type) {
      const { name, queryTip, queryName } = val || {}
      let res
      const materialFields = list.materialFields || {}
      const tem = type === 'material' ? materialFields : list
      res = tem?.[name]
      // 是否有时间格式的数据
      if (Array.isArray(queryTip) && queryTip[0] in tem) {
        res = tem[queryTip[0]]
      }
      // 是否有别名的数据
      if (queryName && queryName in tem) {
        res = tem[queryName]
      }
      // 如果是布尔类型，无论true 、 false 都应返回，(true/false 都代表有值， 空才代表没有值)
      if (this.judgeType(res) === 'boolean') {
        return 'search-col-active'
      }
      return res ? 'search-col-active' : ''
    },
    // 搜索列数据
    actionList(val) {
      console.log('🚀 ~ actionList ~ val:', val)
      Object.keys(val).forEach(el => {
        if (el === 'materialFields') {
          // const { materialFields } = val
          // Object.keys(materialFields).forEach(item => {
          //   this.materialFields[item] = materialFields[item]
          // })
        } else {
          this.listQuery[el] = val[el]
        }
      })
      this.$emit('makeNewRequest', val)
      this.destroySearch()
    },
    destroySearch() {
      this.isShowSearchBox = false
    }
  }
}

export default actionColumn
