/*
 * @Author: shunhua.liang
 * @Date: 2022-08-15 11:21:08
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-08-15 14:48:06
 * @Description: 表格列处理(表格列动态展示)
 */

import { getColumnList } from '@/api/column'
import { deepClone } from '@/utils/index.js'
import { v4 as uuidv4 } from 'uuid'

const tableColumn = {
  methods: {
    // 获取用户配置的表格列
    async getColumn() {
      const params = {
        modelType: this.modelType
      }
      const result = await getColumnList(params)
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        // data 可能不存在值，既用户没有进行配置
        if (!data) {
          this.defaultColumn(this.tableColumn)
          return
        }
        // data 存在值
        const { columnInformation = '' } = data || {}
        // 如果配置列为空串的情况下，走默认配置
        if (!columnInformation) {
          this.defaultColumn(this.tableColumn)
          return
        }
        // 值符合预期的情况下
        const list = this.concatOriginMaterial() // 拼接表格列和物料的数组
        // 处理字符串还是字符串对象的数组
        const columnInformationList = this.compatibilityColumn(
          columnInformation
        )
        const backColum = columnInformationList?.map(item => item.code)
        // 解析后台数组为空时
        if (!columnInformationList.length) {
          this.defaultColumn(this.tableColumn)
          return
        }
        this.isShowTable = true
        this.loading = false
        this.columSum = 0 // 计算表格的宽度总和
        // 获取最好设置的表格
        const finallyColumn = this.countTableWidth({
          list,
          column: backColum,
          config: columnInformationList
        })
        // 赋值
        this.tableHeaderList = deepClone(finallyColumn)
        this.tableColList = deepClone(finallyColumn)
        this.columnKeyList = deepClone(backColum)
        this.customColumnList = this.handleArraySort(backColum)
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
      const list = this.tableColumn.concat(this.extendMaterialList)
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
      return list || []
    },
    // 当从后台获取到该用户没有配置列数据，走默认的配置数据，避免页面留白
    defaultColumn(result) {
      this.tableHeaderList = deepClone(result)
      this.tableColList = deepClone(result)
      // 配置列只需要code 值(点击设置图表展开的弹窗)
      this.columnKeyList = this.tableHeaderList.map(item => item.code)
    },
    /**
     * @description:计算列表的宽度（避免大量留白，用户没有自行配置列宽度的情况下）
     * @param {Object} value: {list:拼接表格列和物料列的数组, column:后台返回的列配置(只包含code),config:后台返回的用户列配置数据}
     * @return {Array}
     */
    countTableWidth(value = {}) {
      const { list = [], column = [], config = [] } = value
      //  求后台数据与本地总数据的交集
      const result = list.filter(item => {
        return column.includes(item.code)
      })
      // 获取列的总宽度
      result.forEach(el => {
        el.width
          ? (this.columSum += el.width * 1)
          : (this.columSum += el.minWidth ? el.minWidth * 1 : 0)
      })
      this.$nextTick(() => {
        // 避免列的空白(老功能)
        if (this.columSum < this.$refs?.tableList?.clientWidth - 230) {
          // width 和 minWidth 都置为null el-table 自己计算高度
          result.forEach(el => {
            el.width = null
            el.minWidth = null
          })
        }
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
      })
    }
  }
}

export default tableColumn
