<!--
 * @Author: shunhua.liang
 * @Date: 2022-08-17 14:05:16
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-11-15 09:43:05
 * @Description: 动态表格展示，拖拽改变列宽，改变顺序
-->

<template>
  <section v-loading="tableLoading" class="common-table-sale">
    <template v-if="renderTableList.length">
      <section ref="tableOutBox" class="table-content">
        <el-table
          ref="listTable"
          :key="tableKey"
          style="width: 100%"
          height="100%"
          :size="size"
          :border="true"
          :row-key="rowKey"
          :data="tableData"
          :row-style="rowStyle"
          :tree-props="treeProps"
          :cell-style="columnStyle"
          :show-summary="showSummary"
          :row-class-name="rowClassName"
          :tooltip-effect="tooltipEffect"
          :expand-row-keys="expandRowKeys"
          :header-cell-style="headerCellStyle"
          :default-expand-all="defaultExpandAll"
          :select-on-indeterminate="selectOnIndeterminate"
          v-bind="$attrs"
          @row-click="rowClick"
          @cell-click="cellClick"
          @select-all="selectAll"
          @row-dblclick="rowDblclick"
          @expand-change="expandChange"
          @cell-dblclick="cellDblclick"
          @header-dragend="headerDragend"
          @row-contextmenu="rowContextmenu"
          @selection-change="selectionChange"
          v-on="$listeners"
        >
          <el-table-column
            v-if="isSelection"
            v-show="isShowSelect"
            type="selection"
            width="38"
            :fixed="checkFixed"
            show-overflow-tooltip
          />
          <el-table-column
            v-for="item in renderTableList"
            :key="item.id"
            :prop="item.code"
            :label="item.label"
            :width="item.width"
            :min-width="item.width"
            :fixed="item.fixed"
            :show-overflow-tooltip="item.showOverflowTooltip"
            :render-header="renderTableColumn"
          >
            <template slot-scope="{ row, $index }">
              <!-- 特殊格式的处理 -->
              <div v-if="isRadiusFields(item.code)" class="radius-cell">
                <div
                  class="left-radius"
                  :style="{
                    background: window.stateColor.getStateColor(row[item.code])
                  }"
                />
                <span> {{ row[item.code] }}</span>
              </div>
              <!-- 无特殊处理的字段 -->
              <template v-else>
                <span v-if="!item.special">
                  {{ handleBackTableFields({ row, val: item }) }}
                </span>
                <slot v-else :special="{ row, column: item, $index }" :name="item.code" />
              </template>
            </template>
          </el-table-column>
          <el-table-column
            v-if="actionWidth !== 0"
            :key="actionKey"
            label="操作"
            fixed="right"
            :width="actionWidth"
            :render-header="isAllowSetting ? renderActionColumn : null"
          >
            <template slot-scope="{ row, $index }">
              <slot :row="row" :$index="$index" name="tableAction" />
            </template>
          </el-table-column>
        </el-table>
      </section>
    </template>
    <el-empty v-else description="暂无数据" />
    <!-- 右侧操作列展示 -->
    <CustomColumn
      v-if="isShowCustomColumn"
      :modular-type.sync="modularType"
      :config-list="tableTree"
      :multi-column.sync="multiColumn"
      @closeDialog="closeDialog"
      @updateColumn="updateColumn"
    />
    <!-- 搜索弹窗 -->
    <SearchDialog
      v-if="isShowSearchBox"
      :is-show-search-box="isShowSearchBox"
      :config="configSearch"
      @actionList="actionList"
      @closeDialogSearch="destroySearch"
    />
  </section>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import sumCols from '@/mixins/sumCols.js'
import tableColumn from './mixins/tableColumn'
import OriginalEvent from './mixins/originalEvent'
import actionColumn from './mixins/actionColumn'
import CustomColumn from './components/customColum'
import SearchDialog from './components/searchDialog'

export default {
  name: 'TableColumn',
  components: { CustomColumn, SearchDialog },
  mixins: [tableColumn, actionColumn, sumCols, OriginalEvent],
  props: {
    // 动态表格展示(展示不同页面的表格)
    tableColumn: {
      type: [Array, Object],
      require: true,
      default: () => {
        return []
      }
    },
    // 哪些列字段是可以搜索的(数组集合)
    columnSearchList: {
      type: Array,
      require: false,
      default: () => {
        return []
      }
    },
    // 表格展示的页面数据
    tableData: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    // 是否允许表格宽进行拖拽
    isAllowDrag: {
      type: Boolean,
      require: false,
      default: false
    },
    // 保存列配置的字段
    modularType: {
      type: String,
      require: true,
      default: ''
    },
    listQuery: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    },
    // 是否展示合计字段，默认是不展示
    showSummary: {
      type: Boolean,
      require: false,
      default: false
    },
    checkFixed: {
      type: String,
      require: false,
      default: ''
    },
    // 是否有审批请求接口，是否有物料请求接口
    requestConfig: {
      type: Object,
      require: false,
      default: () => {
        return {
          approvalFields: ['approval'], // 开启审批和关闭审批，哪些字段需要展示和隐藏
          approval: '', // 代表是否需要去请求审批的接口,为空表示不需要请求
          isMaterial: true // 代表是否需要去请求物料的接口
        }
      }
    },
    rowClassName: {
      type: Function,
      return: false,
      default: null
    },
    actionWidth: {
      type: [Number, String],
      require: true,
      default: 180
    },
    checkFixed: {
      type: String,
      require: false,
      default: ''
    },
    isAllowSetting: {
      type: Boolean,
      default: true
    },
    // 该表格列操作权限路径
    columnPermissionAction: {
      type: String,
      default: () => ''
    },
    isShowSelect: {
      type: Boolean,
      default: true
    },
    isShowTableInnerBorderLine: {
      type: Boolean,
      default: true
    },
    isSelection: {
      type: Boolean,
      default: true
    },
    isGetCurrentPath: {
      type: Boolean,
      default: true
    },
    tableLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sortList: [],
      window,
      historyColumn: '', // 历史操作列的值
      actionKey: uuidv4(), // 操作列有时候并不会更新，需给个唯一的id
      columnDragend: [], // 通过拖拽改变表格列宽
      isShowSearchBox: false, // 是否展示搜索框
      isShowCustomColumn: false, // 更多操作（单击“设置”图标，展开的弹窗）
      headerCellStyle: {
        background: '#F2F5FC',
        color: '#181d1f',
        'font-family': 'Source Han Sans CN',
        'font-size': '13px',
        'font-weight': '550'
      },
      rowStyle: {
        height: '38px'
      },
      configSearch: {},
      tableKey: '',
      currentPath: '' // 当前路由地址（截取‘#’后面）
    }
  },
  // watch: {
  //   listQuery: {
  //     handler(val) {
  //       this.materialFields = val?.materialFields || {}
  //     },

  //     deep: true,
  //     immediate: true
  //   }
  // },
  mounted() {
    this.currentPath = this.$route.path
  },
  methods: {
    // 设置表格的样式
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 0 && this.isShowTableInnerBorderLine) {
        return 'padding:0px;font-size:14px;border-right:0;border-top:0;border-left:0'
      }
    },
    // 列表头展示的形式
    renderTableColumn(h, { column }) {
      // 如果没有开启搜索功能(列表头后面的搜索小图标)直接返回(根据是否传入了搜索列表)
      // if (!this.columnSearchList.length) return
      const that = this
      // 根据列名过滤出搜索列
      const result = this.search.find(item => item.name === column.property)

      let columnList = []
      // 如果表格没有 按单 按物料切换，
      if (this.judgeType(this.tableColumn) === 'array') {
        columnList = this.tableColumn
      } else {
        // 按单、按物料为对象，需要从中取出相应的数据进行遍历展示
        const { columnName = '' } = this.config
        const name = columnName || this.multiColumn.columnName || 'material'
        columnList = this.tableColumn[name]
      }

      // 根据列名过滤出表格列
      const config = columnList.find(item => item.code === column.property)

      const { isSortBox, sortKey } = config || {}

      // 是否有过滤值(是否需要高亮图标)
      const active = this.isExistFilter(result, config)
      // 最外层样式
      const outStyle = 'display: block;width: 100%; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
      // 内层样式
      const innerStyle = 'margin-left: 4px; font-size: 16px; cursor: pointer; position:relative'
      // 根据类型来展示图标(目前暂时不需要,为防止以后需要)

      const currtenSortColumn = this.sortList.find(item => item.column === column.property)

      // 渲染表格列
      return h('span', { style: outStyle }, [
        h('span', {}, column.label), // 列名
        h(
          'span',
          {
            style: innerStyle,
            class: 'sale-order-table-column-setting',
            on: {
              click: function (e) {
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
                  // 只有下拉类型
                  if (result && (result.type === 'filter' || result.type === 'tree')) {
                    that.$emit('filterSearch', column.property)
                  }
                  that.historyColumn = column.property
                })
              }
            }
          },
          [
            result
              ? h('svg-icon', {
                  props: {
                    className: active,
                    iconClass: 'filter'
                  }
                })
              : null,
            // 排序图标
            isSortBox
              ? h('svg-icon', {
                  props: {
                    // {true:倒序，false：正序，null：不排序}
                    iconClass: currtenSortColumn
                      ? currtenSortColumn?.desc === false
                        ? 'sort-up-action'
                        : 'sort-up'
                      : 'sort-up',
                    className: 'sort-svg-icon'
                  },
                  style: 'margin-left:6px;position: absolute;top:1.75px;boder:1px solid red;',
                  on: {
                    click: async e => {
                      e.stopPropagation() // 阻止事件冒泡
                      const index = this.sortList.findIndex(item => item.column === column.property)
                      if (index !== -1) {
                        this.sortList[index] = {
                          column: sortKey || column.property,
                          desc: this.sortList[index]?.desc === false ? null : false
                        }
                      } else {
                        this.sortList.push({
                          column: sortKey || column.property,
                          desc: false
                        })
                      }
                      this.$emit('makeNewRequest', {
                        ...this.listQuery,
                        sortList: this.sortList
                      })
                    }
                  }
                })
              : '',
            isSortBox
              ? h('svg-icon', {
                  props: {
                    // {true:倒序，false：正序，null：不排序}
                    iconClass: currtenSortColumn
                      ? currtenSortColumn?.desc === true
                        ? 'sort-down-action'
                        : 'sort-down'
                      : 'sort-down',
                    className: 'sort-svg-icon'
                  },
                  style: 'margin-left:6px;position: absolute;top:9.5px;',
                  on: {
                    click: async e => {
                      e.stopPropagation() // 阻止事件冒泡
                      const index = this.sortList.findIndex(item => item.column === column.property)

                      if (index !== -1) {
                        this.sortList[index] = {
                          column: sortKey || column.property,
                          desc: this.sortList[index]?.desc === true ? null : true
                        }
                      } else {
                        this.sortList.push({
                          column: sortKey || column.property,
                          desc: true
                        })
                      }
                      this.$emit('makeNewRequest', {
                        ...this.listQuery,
                        sortList: this.sortList
                      })
                    }
                  }
                })
              : ''
          ]
        )
      ])
    },
    // 自定义操作列表头
    renderActionColumn(h, { column }) {
      const that = this
      const columnMargin = that.actionWidth !== 0 ? that.actionWidth - 90 : 0
      const style = `margin-left:${columnMargin}px;font-size: 18px; cursor: pointer;`
      return h(
        'span',
        {
          style: 'width:100%;display:flex;justify-content:space-between;padding-right:2px'
        },
        [
          h('span', column.label),
          h('i', {
            class: 'el-icon-setting',
            style: style,
            directives: [
              {
                name: 'permission',
                value: {
                  action: this.columnPermissionAction,
                  currentPath: this.isGetCurrentPath ? this.currentPath : ''
                }
              }
            ],
            on: {
              click: function () {
                that.isShowCustomColumn = !that.isShowCustomColumn
              }
            }
          })
        ]
      )
    },
    // 状态，审批状态、优先级字段的处理
    isRadiusFields(name = '') {
      const list = [
        'state',
        'stateName',
        'statusName',
        'currentStatusName',
        'approvalStatusName',
        'priority',
        'assignmentState',
        'assignmentStateName',
        'useStateName'
      ]
      return list.includes(name)
    },
    // 处理展示到表格中的数据
    handleBackTableFields({ row = {}, val = {} }) {
      const { parentFields = '', code = '' } = val || {}
      if (!parentFields) return row[code]
      const fields = `${parentFields}.${code}`
      return this.getItem(row, fields)
    },
    // 滚动条滚动
    tableScrollEvent() {
      this.$nextTick(() => {
        const selectWrap = document.querySelector('.el-table__body-wrapper')
        if (!selectWrap) return
        const that = this
        selectWrap.addEventListener('scroll', function (e) {
          that.$nextTick(() => {
            //  横向滚动
            if (that.$refs?.listTable.bodyWrapper.scrollLeft > 0) {
              that.isShowSearchBox = false
            }
          })
        })
      })
    },
    // 层层递进，取出列数据的值
    getItem(obj = {}, path = '') {
      const arr = path.split('.')
      let v = ''
      arr?.reduce((cur, key, index) => {
        if (index === arr.length - 1) {
          v = cur?.[key]
        } else {
          return cur?.[key]
        }
      }, obj)
      return v
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.common-table-sale {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .table-content {
    flex: 1;
    overflow: hidden;
    .radius-cell {
      display: flex;
      align-items: center;
      .left-radius {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
    ::v-deep .el-table td,
    ::v-deep .el-table th {
      height: 42px;
      padding: 0;
      .cell {
        padding: 0 8px;
      }
    }
    ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
      height: 18px;
    }
    ::v-deep .el-table .el-table-column--selection .cell {
      padding: 0 12px 0 12px;
    }
    ::v-deep .el-table__header {
      .el-table-column--selection .cell {
        text-overflow: clip;
      }
    }
  }
}
::v-deep .sort-svg-icon {
  width: 12px;
  height: 12px;
}
</style>

<style>
.search-col-active {
  color: #1890ff;
}
.warn-fields {
  color: #ff4949;
}
.el-table__fixed-body-wrapper .el-table__body {
  padding-bottom: 8px;
}
.radius-cell {
  display: flex;
  align-items: center;
}
.left-radius {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 5px;
}
.el-empty {
  width: 100%;
}
</style>
