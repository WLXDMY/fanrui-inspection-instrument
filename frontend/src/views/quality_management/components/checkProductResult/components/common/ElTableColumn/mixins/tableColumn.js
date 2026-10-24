/*
 * @Author: shunhua.liang
 * @Date: 2022-08-15 11:21:08
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-09-12 18:08:40
 * @Description: 表格列处理(表格列动态展示)
 */

import { getColumnList } from '@/api/column'
import { deepClone } from '@/utils/index.js'
import { v4 as uuidv4 } from 'uuid'
const tableColumn = {
  props: {
    modelType: {
      type: String,
      require: false,
      default: ''
    }
  },
  data() {
    return {
      // 按单，按物料的数据都要保存到后台
      columnAllSetting: {
        material: '',
        order: ''
      },
      extendMaterialList: [] // 物料相关字段
    }
  },
  watch: {
    // 动态展示的列数据
    tableColumn: {
      async handler(newVal = []) {
        if (!newVal.length) return
        this.customColumnList = newVal
        this.columnList = newVal
        this.getColumn()
      }
    },
    deep: true,
    immediate: true
  },
  created() {
  },
  mounted() {},
  methods: {
    // 获取用户配置的表格列
    async getColumn(type = null) {
      const params = {
        modelType: this.modelType
      }
      const result = await getColumnList(params)
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        // data 可能不存在值，既用户没有进行配置
        if (!data) {
          this.defaultColumn(this.columnList)
          return
        }
        // data 存在值
        const { columnInformation = '' } = data || {}
        // 如果配置列为空串的情况下，走默认配置
        if (!columnInformation) {
          this.defaultColumn(this.columnList)
          return
        }
        // 值符合预期的情况下
        const list = this.concatOriginMaterial() // 拼接表格列和物料的数组
        // 处理字符串还是字符串对象的数组
        const columnInformationList = this.compatibilityColumn(
          columnInformation,
          type
        )
        const backColum = columnInformationList?.map(item => item.code)
        // 解析后台数组为空时
        if (!columnInformationList.length) {
          this.defaultColumn(this.columnList)
          return
        }
        this.isShowTable = true
        this.loading = false
        this.columSum = 0 // 计算表格的宽度总和
        // 获取最后设置的表格
        const finallyColumn = this.countTableWidth({
          list,
          column: backColum,
          config: columnInformationList
        })
        //  需要将数组排序成后台返回的数组顺序
        const orderSort = this.handArrayOrder(finallyColumn, backColum)
        // 赋值
        this.columnList = orderSort
        this.columnKeyList = backColum
        // “操作模块” 需要展示所有的列数据
        this.customColumnList = this.concatActionList({ orderSort, backColum, list })
        this.$nextTick(() => {
          this.$refs?.listTable?.doLayout()
        })
      } else {
        this.$notify({
          title: '提示',
          message: message,
          type: 'error',
          duration: 2000
        })
      }
    },
    // 将表格的列与后台请求的列进行拼接，并将深拷贝之后的数组返回
    concatOriginMaterial() {
      // tableColumn 为当前页，表格的列的数据
      const list = this.tableColumn
      // .concat(this.extendMaterialList)
      return deepClone(list)
    },
    /**
     * @description: 将后台返回的值处理成相应的数组
     * @param {*} config：'words,title...'（之前老版本）/"[{code: 'title'}]"(现在版本)
     * @return {Array}
     */
    compatibilityColumn(config = '') {
      // 无论是老版本还是新版本，返回的都是字符串
      let list = []
      // 如果为字符串对象，则可以正常被JSON.parse,如果为字符串会进入catch
      try {
        list = JSON.parse(config)
      } catch (e) {
        list = config?.split(',')
        list = list.map(item => {
          return { code: item }
        })
      }
      // 返回的不是数组的情况
      if (!Array.isArray(list)) {
        const { setting } = list
        const local = this.switchTableBtn || setting
        if (!this.switchTableBtn) {
          this.$emit('settingBtn', setting)
        }
        try {
          const columnKey = ['material', 'order']
          columnKey.forEach(item => {
            this.columnAllSetting[item] = list[item]
          })
          return JSON.parse(list[local])
        } catch (err) {
          return []
        }
      }
      return list || []
    },
    // 当从后台获取到该用户没有配置列数据，走默认的配置数据，避免页面留白
    defaultColumn(result) {
      this.columnList = deepClone(result)
      // 配置列只需要code 值(点击设置图表展开的弹窗)
      this.columnKeyList = this.tableColumn.map(item => item.code)
    },
    /**
     * @description:计算列表的宽度（避免大量留白，用户没有自行配置列宽度的情况下）
     * @param {Object} value: {list:拼接表格列和物料列的数组, column:后台返回的列配置(只包含code),config:后台返回的用户列配置数据}
     * @return {Array}
     */
    countTableWidth(value = {}) {
      const { list = [], column = [], config = [] } = value
      const tem = list.filter(item => item)
      //  求后台数据与本地总数据的交集
      const result = tem.filter(item => {
        return column.includes(item.code)
      })
      // 获取列的总宽度
      result.forEach(el => {
        el.width
          ? (this.columSum += el.width * 1)
          : (this.columSum += el.minWidth ? el.minWidth * 1 : 0)
      })
      // 列拖拽宽度(新开发功能)
      const dragDropWidth = result.map(item => {
        const width = config.find(el => el.code === item.code)?.width
        return {
          ...item,
          singId: uuidv4(),
          width: width || item.width
        }
      })
      return dragDropWidth || []
    },
    /**
     * @description: 处理数组的顺序
     * @param {Array} original： 数据源
     * @param {Array} back： 后台返回的数据
     * @return {Array} result ： 处理好的数组
     */
    handArrayOrder(original = [], back = []) {
      const result = original
      result.sort((a, b) => {
        return back.indexOf(a.code) - back.indexOf(b.code)
      })
      return result.map(item => {
        return {
          ...item,
          id: uuidv4()
        }
      })
    },
    // 拼接数组，展示正确的顺序
    concatActionList({ orderSort = [], backColum = [], list = [] }) {
      const excludeWord = list.filter(item => {
        return !backColum.includes(item.code)
      })
      const result = orderSort.concat(excludeWord)
      return result
    }
  }
}

export default tableColumn
