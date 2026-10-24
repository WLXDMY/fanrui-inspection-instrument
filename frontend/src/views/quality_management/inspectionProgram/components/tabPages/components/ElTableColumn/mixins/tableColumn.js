/*
 * @Author: shunhua.liang
 * @Date: 2022-08-15 11:21:08
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-11-14 16:03:04
 * @Description: 表格列处理(表格列动态展示)
 */

import { getColumnList } from '@/api/column'
import { getMaterialWordList } from '@/api/common'
import { isExistApprove } from '@/api/examineApprove'
import { v4 as uuidv4 } from 'uuid'
import { modularTypeList } from '@/dictionary/column'

const tableColumnSetting = {
  props: {
    // 表格的配置项
    config: {
      type: Object,
      require: true,
      default: () => {
        return {
          columnName: null,
          columnList: null
        }
      }
    }
  },
  data() {
    return {
      dragList: [], // 右侧搜索框的 值
      renderTableList: [],
      tableTree: [],
      multiColumn: {
        columnName: '', // 多列配置的name
        columnSetting: null, // 原始的列配置数据(多列配置的时候才使用)
        columnCurrent: [] // 操作之后的数据列
      },
      dragendColumnList: [],
      materialFieldList: [], // 物料字段
      loading: false,
      historyName: '',
      tableLoading: false,
      isApproval: false,
      columnMeta: '' // 请求列配置的字段
    }
  },
  watch: {
    // 列请求的字段
    modularType: {
      handler(newVal = '') {
        console.log(newVal)
        if (newVal) {
          this.$nextTick(() => {
            this.judgeKey()
          })
        }
      },
      deep: true,
      immediate: true
    },
    // 列请求的字段
    // modularType: {
    //   handler(newVal = '') {
    //     console.log(newVal)
    //     if (newVal) {
    //       this.$nextTick(() => {
    //         this.handleTableColumnFields()
    //       })
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
    config: {
      handler(newVal) {
        const { columnName } = newVal
        if (columnName !== this.historyName) {
          const { columnSetting } = this.multiColumn || {}
          if (columnSetting) {
            const params = {
              ...columnSetting,
              setting: columnName
            }
            this.$set(this.multiColumn, 'columnSetting', params)
          }
          this.updateColumn()
        }
      },
      deep: true
    },
    // table 可能没有更新，强制table 更新
    tableData: {
      handler(newVal) {
        this.$nextTick(() => {
          this.tableKey = uuidv4()
          this.$forceUpdate()
        })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.judgeKey()
  },
  methods: {
    // 判断是否有个某个键值
    judgeKey() {
      const { name } = this.$route || {}
      // 存在相应的键 取值
      if (Reflect.has(modularTypeList, name)) {
        this.columnMeta = modularTypeList[name]
      } else if (this.modularType) {
        // 字典文件中没有找到相应的数据，则取传入下来的值
        this.columnMeta = this.modularType
      } else {
        // 开发环境需要提示开发者
        if (process.env.NODE_ENV === 'development') {
          this.$notify({
            title: '警告',
            message:
              '在dictionary文件下的column.js中未读取到相关配置, 也未读取到父组件的moduleType字段,请配置后使用!!!!(此消息只会出现在开发环境,生产环境不出现)',
            type: 'warning',
            duration: 10000
          })
        }
      }
      this.handleTableColumnFields()
    },
    // 处理表格的列字段
    handleTableColumnFields() {
      this.tableLoading = true
      Promise.allSettled([
        this.getColumn(),
        this.isAllowApprove(),
        this.getMaterialFields()
      ])
        .then((res) => {
          const [res1, res2, res3] = res
          this.materialFieldList = res3.value
          this.isApproval = res2.value
          // 1. 解析后台返回的字段
          const result = this.analysisBackFields(res1.value)
          // 2. 取默认拼接的表格字段
          this.tableFieldsConcat(res3.value)
          // 3. 表格字段按照表格列配置排序
          this.sortTableColumn(result)
          // 4. 审批的相关字段是否展示
          this.isShowApprovalFields()
          // 5. 重新计算表格的宽度
          this.handleInsufficientWidth()
          this.$nextTick(() => {
            this.$refs?.listTable?.doLayout()
            this.tableScrollEvent()
          })
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    // 获取用户配置的表格列
    async getColumn() {
      if (!this.columnMeta) return []
      const params = { modelType: this.columnMeta }
      const result = await getColumnList(params)
      const { code, data, message } = result.data || {}
      if (+code === 200) {
        // data 可能不存在值，既用户没有进行配置
        if (!data) {
          return this.handleSwitchTable()
        }
        // data 存在值
        const { columnInformation = '' } = data || {}
        // 如果配置列为空串的情况下,默认拼接所有的数据
        if (!columnInformation) {
          return this.handleSwitchTable()
        } else {
          return JSON.parse(columnInformation)
        }
      } else {
        this.$notify({
          title: '提示',
          message: message,
          type: 'error',
          duration: 2000
        })
      }
    },
    // 处理表格是可切换还是不可切换
    handleSwitchTable() {
      const { columnName = '', columnList = [] } = this.config
      if (!columnName && !columnList.length) {
        return []
      }
      const res = { setting: columnName }
      columnList.forEach((el) => {
        res[el] = this.tableColumn[el]
      })
      this.multiColumn['columnName'] = columnName
      return res
    },
    // 获取审批权限
    async isAllowApprove() {
      try {
        const { approval } = this.requestConfig || {}
        if (!approval) return false
        const res = await isExistApprove(approval)
        const { code, data, message } = res.data || {}
        if (+code === 200) {
          this.$emit('approveStatus', data)
          return data
        } else {
          this.$notify({
            title: '提示',
            message,
            type: 'error',
            duration: 2000
          })
        }
      } catch (err) {
        console.log(err)
        return false
      }
    },
    // 获取物料相关字段
    async getMaterialFields() {
      try {
        const { isMaterial } = this.requestConfig || {}
        if (!isMaterial) return []
        const res = await getMaterialWordList()
        const { code, data = [], message } = res.data || {}
        const result = this.handleMaterialFieldsParent()
        const { origin } = result || {}
        if (+code === 200) {
          return data?.map((item) => {
            return {
              id: uuidv4(),
              label: item.fieldName,
              code: item.fieldCode,
              type: null,
              width: null,
              fixed: null,
              minWidth: '160',
              columnType: 'material',
              showOverflowTooltip: true,
              parentFields: origin
            }
          })
        } else {
          this.$notify({
            title: '提示',
            message,
            type: 'warning',
            duration: 2000
          })
        }
      } catch (error) {
        console.log(error)
        return []
      }
    },
    // 表格字段拼接
    tableFieldsConcat(val = []) {
      // 表格去重，避免出现奇怪的问题
      const list = val.map((item) => item.code)
      const type = this.judgeType(this.tableColumn)
      if (type === 'array') {
        const res = this.tableColumn.filter((item) => {
          return !list.includes(item.code)
        })
        this.tableTree = res.concat(val)?.map((item) => {
          return {
            ...item,
            isSelected: false
          }
        })
      } else if (type === 'object') {
        const { columnName = '' } = this.config
        // 首先取配置数据，如果配置数据没有，就默认取material
        const name = columnName || this.multiColumn.columnName || 'material'
        const columList = this.tableColumn[name]
        const res = columList?.filter((item) => {
          return !list.includes(item.code)
        })
        // 按单的列表是不需要 物料数据
        if (columnName === 'order') {
          this.tableTree = res?.map((item) => {
            return {
              ...item,
              isSelected: false
            }
          })
        } else {
          this.tableTree = res.concat(val)?.map((item) => {
            return {
              ...item,
              isSelected: false
            }
          })
        }
      }
    },
    // 解析后台返回来的字段
    analysisBackFields(val) {
      const type = this.judgeType(val)
      switch (type) {
        case 'object':
          return this.doubleTable(val)
        case 'array':
          return this.ordinaryTable(val)
      }
    },
    // 判断类型
    judgeType(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    },
    // 可能有多种配置的表格
    doubleTable(val = {}) {
      try {
        const { setting } = val
        // 读取config 的配置, 默认走config 配置， 如果配置没有则读取后台返回的配置
        // 如果后台配置返回也为空，则默认为 material
        const { columnName } = this.config || {}
        const name = columnName || setting || 'material'
        const list = val[name] || []
        // 设置保存列的数据
        this.$set(this.multiColumn, 'columnSetting', { ...val, setting: name })
        this.$set(this.multiColumn, 'columnName', name)
        this.historyName = name
        this.$emit('updateTable', name)
        return this.judgeType(list) === 'array' ? list : JSON.parse(list)
      } catch (err) {
        console.log(err)
        return []
      }
    },
    // 表格不需要按单 按物料进行切换
    ordinaryTable(val = []) {
      return val
    },
    // 表格进行排序
    sortTableColumn(val = []) {
      // 如果 val 有值 代表用户配置了列的数据，如果没有值，默认取所有的值
      if (val.length) {
        const list = []
        val.forEach((el) => {
          this.tableTree.forEach((item) => {
            const { name } = el
            if (name) {
              if (el.code === item.code && name === item.label) {
                item['isSelected'] = true
                item['width'] = el?.width
                item['id'] = uuidv4()
                list.push(item)
              }
            } else {
              if (el.code === item.code) {
                item['isSelected'] = true
                item['width'] = el?.width
                item['id'] = uuidv4()
                list.push(item)
              }
            }
          })
        })
        this.renderTableList = list
      } else {
        this.renderTableList = this.tableTree.map((item) => {
          return {
            ...item,
            isSelected: true,
            id: uuidv4()
          }
        })
        this.tableTree.forEach((el) => {
          el['isSelected'] = true
        })
      }
      // 右侧设置列的数据的顺序需要跟后台返回的顺序保持一致
      const code = val?.map((item) => item.code)
      const tem = this.tableTree.filter((item) => code.includes(item.code))
      const lost = this.tableTree.filter((item) => !code.includes(item.code))
      tem.sort((a, b) => {
        return code.indexOf(a.code) - code.indexOf(b.code)
      })
      this.tableTree = tem.concat(lost)
      this.$set(this.multiColumn, 'columnCurrent', this.tableTree)
    },
    // 处理物料字段应该怎么样进行展示
    handleMaterialFieldsParent() {
      let result = []
      if (this.judgeType(this.tableColumn) === 'array') {
        result = this.tableColumn
      } else {
        const { columnName } = this.config || {}
        const name = columnName || 'material'
        result = this.tableColumn[name]
      }
      // 先遍历列配置的数据，查看是否有parentFields
      // parentFields 是针对后台返回的嵌套数据中字段的展示问题
      // 如后台返回的物料名称字段放在 ， data -> saleOrderMaterial -> materialFields
      const list = result.find((item) => item?.parentFields)
      if (!list) {
        // 1. 先读取 列配置的数据，判断里面 parentFields 是否有数据
        // 2. parentFields 里面没有数据，则读取组件内部是否有列字段的配置
        // 3. 如果都没有，默认返回 {parent: null, origin: 'materialFields'}
        if (!this.columnFields) {
          return {
            parent: null,
            origin: 'materialFields'
          }
        } else {
          return {
            parent: this.columnFields,
            origin: `${this.columnFields}.materialFields`
          }
        }
      } else {
        const { parentFields } = list || {}
        const fieldsList = parentFields.split('.')
        const res = {
          parent: fieldsList[0],
          origin: parentFields
        }
        return res
      }
    },
    // 列拖拽
    headerDragend(newWidth, oldWidth, column, event) {
      const currentColumn = column.property
      // 能同时保存多个列的配置
      if (!this.dragendColumnList.length) {
        this.dragendColumnList = JSON.parse(
          JSON.stringify(this.renderTableList)
        )
      }
      const result = this.dragendColumnList.map((item) => {
        if (item.code === currentColumn) {
          return { ...item, width: newWidth }
        }
        return { ...item }
      })
      this.dragendColumnList = JSON.parse(JSON.stringify(result))
      this.$set(this.multiColumn, 'columnCurrent', this.dragendColumnList)
    },
    // 更新列
    updateColumn() {
      this.tableLoading = true
      Promise.allSettled([this.getColumn()])
        .then((res) => {
          const [res1] = res
          const result = this.analysisBackFields(res1.value)
          this.tableFieldsConcat(this.materialFieldList)
          this.sortTableColumn(result)
          this.isShowApprovalFields()
          this.handleInsufficientWidth()
          this.isShowCustomColumn = false
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    closeDialog() {
      this.isShowCustomColumn = false
    },
    // 是否展示审批的相关字段
    isShowApprovalFields() {
      const { approvalFields = [] } = this.requestConfig || {}
      // 表格列
      const list = this.renderTableList.filter((item) =>
        approvalFields.includes(item.code)
      )
      // 默认表格字段
      const temp = this.handleColumnTypeFields()
      const result = temp.filter((item) => approvalFields.includes(item.code))
      // 右侧配置表格字段
      const len = this.tableTree.filter((item) =>
        approvalFields.includes(item.code)
      )
      // 如果开启了审批，标签渲染的列表中并没有相关的字段，则需要将字段数据拼接上去
      if (this.isApproval && list.length === 0) {
        this.renderTableList.concat(result)
        if (len.length === 0) {
          this.tableTree.concat(result)
        }
      }
      // 如果没有开启审批，并且字段中有该数据
      if (!this.isApproval) {
        if (list.length !== 0) {
          this.renderTableList = this.renderTableList.filter((item) => {
            return !approvalFields.includes(item.code)
          })
        }
        if (len.length !== 0) {
          this.tableTree = this.tableTree.filter((item) => {
            return !approvalFields.includes(item.code)
          })
        }
      }
    },
    // 当宽度不足时的处理
    handleInsufficientWidth() {
      const fatherWidth = this.$refs.tableOutBox?.clientWidth
      const total = this.renderTableList.reduce((cur, next) => {
        const nextVal = next.width || 0
        return cur + nextVal
      }, 0)
      if (fatherWidth > total) {
        if (this.renderTableList.every((item) => item.width)) {
          this.renderTableList = this.renderTableList.map((el) => {
            return {
              ...el,
              width: null
            }
          })
        }
      }
    },
    // 处理表格表头展示字段
    handleColumnTypeFields() {
      if (this.judgeType(this.tableColumn) === 'array') {
        return this.tableColumn
      } else {
        const { columnName } = this.config || {}
        const name = columnName || 'material'
        return this.tableColumn[name]
      }
    }
  }
}

export default tableColumnSetting
