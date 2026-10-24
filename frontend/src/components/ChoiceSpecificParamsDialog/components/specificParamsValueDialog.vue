<!--
 * @Author: chenzejie
 * @Date: 2023-01-13 14:29:26
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-02-22 11:25:20
 * @Description:
-->
<template>
  <div>
    <!-- 物料特征参数选择弹窗 -->
    <el-dialog
      title="物料特征参数"
      :close-on-click-modal="false"
      :visible.sync="specificParamsValueVisible"
      custom-class="item-choice-dialog"
      width="721px"
      :show-close="false"
    >
      <el-table
        ref="listTable"
        v-loading="loading"
        class="list-table"
        header-cell-class-name="table-header-cell"
        :data="tableData"
        style="width: 100%"
        max-height="565px"
        highlight-current-row
        :row-style="rowStyle"
        @row-click="handleRowClick"
      >
        <el-table-column
          v-for="item in renderTableList"
          :key="item.id"
          :prop="item.code"
          :label="item.label"
          :render-header="renderTableColumn"
        >
          <template slot-scope="{ row }">
            <template>
              <span v-if="!item.special">
                {{ handleBackTableFields({ row, val: item }) }}
              </span>
              <slot v-else :special="{ row, column: item }" :name="item.code" />
            </template>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:specificParamsValueVisible', false)">
          取 消
        </el-button>
        <el-button type="primary" @click="$emit('confirm', currentRow)">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 搜索弹窗 -->
    <SearchDialog
      v-if="isShowSearchBox"
      :config="configSearch"
      @actionList="actionList"
      @closeDialogSearch="destroySearch"
    />
  </div>
</template>

<script>
import { auxiliaryAttrValueList } from '@/api/product-management'
import SearchDialog from './searchDialog'

export default {
  components: {
    SearchDialog
  },
  props: {
    specificParamsValueVisible: {
      type: Boolean,
      default: () => false
    },
    specificParamsCode: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      renderTableList: [
        {
          id: 1,
          label: '特征值编码',
          code: 'valueCode'
        },
        {
          id: 2,
          label: '特征值',
          code: 'valueName'
        },
        {
          id: 3,
          label: '备注',
          code: 'remark'
        }
      ],
      search: [
        { name: 'valueCode', type: 'input' }, // 特征参数编码
        { name: 'valueName', type: 'input' } // 特征参数
      ],
      configSearch: {},
      isShowSearchBox: false,
      historyColumn: '',
      listQuery: { current: 1, size: 9999 },
      rowStyle: {
        height: '38px'
      },
      currentRow: {}
    }
  },
  watch: {
    specificParamsCode(newVal) {
      if (newVal) {
        this.auxiliaryAttrValueList()
      }
    }
  },
  created() {
    this.auxiliaryAttrValueList()
  },
  methods: {
    // 获取列表数据
    async auxiliaryAttrValueList() {
      this.loading = true
      const result = await auxiliaryAttrValueList({
        ...this.listQuery,
        state: 1,
        auxiliaryAttrCode: this.specificParamsCode
      })
      const { code, data, message } = result.data
      if (+code === 200) {
        this.loading = false
        this.tableData = data || []
      } else {
        this.$notify({
          title: '提示',
          message,
          type: 'error',
          duration: 2000
        })
      }
    },
    handleRowClick(row, column, event) {
      this.currentRow = row
    },
    // 选择了的选项回显
    dataBack(newval) {
      this.$refs?.listTable?.clearSelection()
      try {
        newval.forEach(item => {
          this.$refs.listTable.toggleRowSelection(
            this.tableData.find(
              i => i.auxiliaryAttrCode === item.auxiliaryAttrCode
            ),
            true
          )
        })
      } catch (error) {
        try {
          newval.forEach(item => {
            this.$refs.listTable.toggleRowSelection(item, true)
          })
        } catch (error) {
          console.log(error, '未正确回显选择项')
        }
      }
    },
    // 处理展示到表格中的数据
    handleBackTableFields({ row = {}, val = {}}) {
      const { parentFields = '', code = '' } = val || {}
      if (!parentFields) return row[code]
      const fields = `${parentFields}.${code}`
      return this.getItem(row, fields)
    },
    // 层层递进，取出列数据的值
    getItem(obj = {}, path = '') {
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
    // 列表头展示的形式
    renderTableColumn(h, { column }) {
      const that = this
      // 根据列名过滤出搜索列
      const result = this.search.find(item => item.name === column.property)
      // 根据列名过滤出表格列
      const config = this.renderTableList.find(
        item => item.code === column.property
      )
      // 是否有过滤值(是否需要高亮图标)
      const active = this.isExistFilter(result, config)
      // 最外层样式
      const outStyle =
        'display: block;width: 100%; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
      // 内层样式
      const innerStyle =
        'margin-left: 5px; font-size: 16px; cursor: pointer; position:relative'
      // 渲染表格列
      return h('span', { style: outStyle }, [
        h('span', {}, column.label), // 列名
        h(
          'span',
          {
            style: innerStyle,
            class: 'sale-order-table-column-setting',
            on: {
              click: function(e) {
                that.$nextTick(() => {
                  // 设置搜索值传入子组件处理
                  that.configSearch = {
                    isShow: true,
                    params: e, // 单击列时的参数
                    column, // 表格列数据
                    queryList: that.listQuery, // 请求参数（回显需要）
                    columnConfig: config,
                    searchCode: result
                  }
                  // 弹窗是否展开
                  if (that.historyColumn === column.property) {
                    that.isShowSearchBox = !that.isShowSearchBox
                  } else {
                    that.isShowSearchBox = true
                  }
                  that.historyColumn = column.property
                })
              }
            }
          },
          result
            ? [
              h('svg-icon', {
                props: {
                  className: active,
                  iconClass: 'filter'
                }
              })
            ]
            : null
        )
      ])
    },
    // 处理高亮的图标
    isExistFilter(result) {
      const { name } = result || {}
      return this.listQuery[name] ? 'search-col-active' : ''
    },
    // 搜索列数据
    actionList(val) {
      this.makeNewRequest(val)
      this.destroySearch()
    },
    destroySearch() {
      this.isShowSearchBox = false
    },
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        this.$set(this.listQuery, [el], val[el])
      })
      this.auxiliaryAttrValueList()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .item-choice-dialog {
  .el-dialog__header {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #333333;
  }
  .table-header-cell {
    background: #f5f5f5;
    font-size: 15px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
  }
}
</style>
