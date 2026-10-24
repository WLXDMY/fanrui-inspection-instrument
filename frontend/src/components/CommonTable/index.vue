<!-- 公共表格组件 column - 表头 noEmpty - 空数据容器  -->
<!-- 公共配置属性，全继承element属性，额外的：
 * @Author: xuqiuming
 * @Date: 2022-6-18 19:10:19
 * @LastEditTime: 2022-6-18 19:10:19
 * @LastEditors: xuqiuming
 * @Description: In User Settings Edit
-->
<template>
  <div class="table common-table">
    <el-table
      ref="table"
      class="flex-fill responsive-table"
      v-bind="$attrs"
      :header-cell-style="{
        background: '#F2F5FC',
        color: '#181d1f',
        'font-family': 'Source Han Sans CN',
        'font-size': '13px',
        'font-weight': '550'
      }"
      height="100%"
      :row-style="{ height: '42px' }"
      :header-row-style="{
        height: '42px'
      }"
      highlight-current-row
      :cell-style="columnStyle"
      v-on="$listeners"
      @header-dragend="hdHeaderDragend"
    >
      <template v-for="(item, index) in tableColumns">
        <el-table-column
          v-if="
            !item.type &&
              (!item.columnType || typeLists.indexOf(item.columnType) > -1)
          "
          :key="item._uniqueId"
          v-bind="{ ...item }"
          show-overflow-tooltip
          :render-header="(h, { column }) => hdRrenderHeader(h, column, item)"
        >
          <!-- slotHeader - 自定义表头 -->
          <template slot="header" slot-scope="scope">
            <slot
              v-if="
                item.columnType === 'headerSlot' || item.columnType === 'slot'
              "
              :name="item.prop + 'Header'"
              :row="scope.row"
            />
            <template v-else>
              {{ item.label }}
            </template>
          </template>
          <template slot-scope="scope">
            <!-- 自定义插槽 -->
            <template
              v-if="
                item.columnType === 'bodySlot' || item.columnType === 'slot'
              "
            >
              <slot :name="item.prop" :row="scope.row" :$index="scope.$index" />
            </template>

            <!-- map转换 -->
            <template v-else-if="item.columnType === 'dataMap'">
              {{ item.dataMap[scope.row[item.prop]] || '' }}
            </template>
            <!-- 格式化 -->
            <template v-else-if="item.columnType === 'format'">
              {{ item.formatFuc([scope.row[item.prop]]) }}
            </template>
            <template v-else>
              {{
                scope.row[item.prop] || (scope.row[item.prop] === 0 ? 0 : '')
              }}
            </template>
          </template>
        </el-table-column>

        <el-table-column
          v-if="item.type"
          :key="item.prop + index"
          v-bind="{ ...item }"
        />
      </template>
    </el-table>
    <SearchBox
      ref="searchBox"
      :filter-box-info="filterBoxInfo"
      @hightCurrentIcon="hightCurrentIcon"
      @clearSingleHightIcon="clearSingleHightIcon"
      @resetIconHight="resetIconHight"
    />
    <RightColumnsConfig
      v-show="showRightColumnsConfig"
      :show-right-columns-config="showRightColumnsConfig"
      :right-columns="rightColumns"
      @updateColumns="updateColumns"
    />
  </div>
</template>

<script>
import SearchBox from './searchBox.vue'
import RightColumnsConfig from './rightColumnsConfig.vue'
import { v4 as uuidv4 } from 'uuid'
export default {
  components: { SearchBox, RightColumnsConfig },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    allComumns: {
      type: Array,
      default: () => []
    },
    leftSelection: {
      type: Boolean,
      default: true
    },
    // 该表格列操作权限路径
    columnPermissionAction: {
      type: String,
      require: false,
      default: () => ''
    }
  },
  data() {
    return {
      columnLocal: [],
      typeLists: [
        // 注册type类型
        'headerSlot',
        'bodySlot',
        'slot',
        'dataMap',
        'format'
      ],
      filterBoxInfo: {},
      showRightColumnsConfig: false,
      allTableConfigColumns: [],
      tableColumns: [],
      rightColumns: []
    }
  },

  watch: {
    allComumns: {
      deep: true,
      handler(newVal, oldValue) {
        this.allTableConfigColumns = JSON.parse(JSON.stringify(newVal))
        this.leftSelection &&
          (this.rightColumns = newVal.slice(1, newVal.length - 1))
        !this.leftSelection &&
          (this.rightColumns = newVal.slice(0, newVal.length - 1))
      }
    },
    allTableConfigColumns: {
      deep: true,
      handler(newVal, oldValue) {
        const hasCheckedColumns = []
        this.allTableConfigColumns.forEach(i => {
          if (i?.checked) {
            hasCheckedColumns.push({
              ...i,
              _uniqueId: uuidv4()
            })
          }
        })
        this.tableColumns = hasCheckedColumns
      }
    }
  },
  mounted() {
    const tableWrapper = document.getElementsByClassName(
      'el-table__body-wrapper'
    )[0]
    tableWrapper.addEventListener('scroll', this.hdScrollbar)
  },

  methods: {
    hdHeaderDragend(newWidth, oldWidth, column, event) {
      const { property } = column
      const index = this.allTableConfigColumns.findIndex(
        i => i.prop === property
      )
      if (index > -1) {
        this.allTableConfigColumns[index].minWidth = newWidth + ''
      }
    },
    uuidv4,

    hdScrollbar(e) {
      this.$refs.searchBox.closeSearchBox()
    },
    hightCurrentIcon(prop) {
      const index = this.tableColumns.findIndex(i => i.prop === prop)
      if (index > -1) {
        this.$set(this.tableColumns[index], 'active', true)
      }
    },
    // 修改样式
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (this.leftSelection && columnIndex !== 0) {
        return 'padding:0px;font-size:14px;border-right:0;border-top:0;border-left:0'
      } else if (!this.leftSelection) {
        return 'padding:0px;font-size:14px;border-right:0;border-top:0;border-left:0'
      }
    },
    clearSingleHightIcon(prop) {
      const index = this.tableColumns.findIndex(i => i.prop === prop)

      if (index > -1) {
        this.tableColumns[index].active = false
      }
    },
    updateColumns(newColumns) {
      console.log(newColumns, 'newColumns')
      this.leftSelection &&
        (this.allTableConfigColumns = [
          this.allTableConfigColumns[0],
          ...newColumns,
          this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
        ])
      !this.leftSelection &&
        (this.allTableConfigColumns = [
          ...newColumns,
          this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
        ])
      this.$nextTick(() => {
        this.$refs?.table?.doLayout()
      })
    },
    resetIconHight() {
      this.tableColumns.forEach(i => {
        i.active = false
      })
    },
    showIconHight(prop) {
      const index = this.tableColumns.findIndex(i => prop === i.prop)

      if (index > -1) {
        return this.tableColumns[index]['active']
      }
    },
    hdRrenderHeader(h, column, item) {
      const {
        filterBoxType,
        label,
        prop,
        key = '',
        options,
        outSideKey = ''
      } = item
      if (!filterBoxType && prop !== 'operate') {
        return h(
          'span',
          {
            style:
              'display:flex;justify-content:space-between;padding-right:2px; text-align:left; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
          },
          [label]
        )
      }
      if (!filterBoxType && prop === 'operate') {
        return h(
          'span',
          {
            style:
              'display:flex;justify-content:space-between;padding-right:2px; text-align:left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
          },
          [
            h('span', label),
            h('i', {
              class: 'el-icon-setting',
              style: 'margin-left:100px;font-size: 18px; cursor: pointer;',
              directives: [
                {
                  name: 'permission',
                  value: { action: this.columnPermissionAction }
                }
              ],
              on: {
                click: () => {
                  this.showRightColumnsConfig = !this.showRightColumnsConfig
                  this.$nextTick(() => {
                    this.$refs?.table?.doLayout()
                  })
                }
              }
            })
          ]
        )
      }
      return h(
        'span',
        {
          style:
            'display: block;width: 100%;text-align:left; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
        },
        [
          h('span', {}, label),
          h(
            'span',
            {
              style: 'cursor: pointer;',
              on: {
                click: e => {
                  this.$refs.searchBox.showSearchBox()
                  const { clientX = 0, clientY = 0 } = e || {}
                  this.filterBoxInfo = {
                    filterBoxType,
                    clientX,
                    clientY,
                    prop,
                    key,
                    options,
                    outSideKey
                  }
                }
              }
            },
            [
              h('svg-icon', {
                props: {
                  iconClass: 'filter',
                  className:
                    `${this.showIconHight(prop) ? 'icon-active' : ''}` +
                    '  init-svg-icon'
                }
              })
            ]
          )
        ]
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.common-table {
  flex: 1;
  display: flex;
  overflow: hidden;

  ::v-deep .el-table td {
    height: 35px;
    padding: 0;
  }

  ::v-deep .el-table__body-wrapper {
    @include scrollBar;
  }
  // ::v-deep .is-scrolling-left {
  //   @include scrollBar
  // }
  ::v-deep .el-table__footer-wrapper {
    .el-table__footer {
      .has-gutter {
        .cell {
          padding-top: 0;
          padding-bottom: 0;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  ::v-deep .el-table__cell gutter {
    border-top: 1px solid #dfe6ec;
  }

  ::v-deep .el-table__fixed-right {
    // right: 18px!important;
    border-right: 1px solid #dfe6ec;
  }
  ::v-deep .table-cell-allow {
    background-color: #e6f3e9;
  }
  ::v-deep .table-cell-product {
    background: #fee8bf;
  }
  ::v-deep .el-table__footer-wrapper {
    height: 35px;
    .has-gutter .cell {
      margin-top: -10px;
    }
    .gutter {
      border-top: 1px solid #dfe6ec;
      background-color: #f1f1f1;
      position: relative;
    }
    .is-hidden {
      height: 35px;
    }
  }
  ::v-deep .el-table__fixed-footer-wrapper {
    .el-table__footer {
      tr {
        .el-table_1_column_57 {
          height: 35px;
        }
      }
    }
  }
  ::v-deep .el-table__header {
    th {
      padding: 2px 0 7px 0;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #dfe6ec;
        position: absolute;
        bottom: 5px;
        z-index: 9999999;
      }
    }
  }
  ::v-deep .el-table__header-wrapper {
    height: 42px;
    border-bottom: 1px solid #dfe6ec;
  }

  ::v-deep .el-table__footer-wrapper {
    border-bottom: 1px solid #dfe6ec;
  }
  ::v-deep .el-table__header-wrapper thead th .cell {
    padding-left: 8px;
  }
  ::v-deep .el-table__header-wrapper thead .el-table-column--selection .cell {
    padding-left: 12px;
  }
  ::v-deep tbody .el-table-column--selection .cell {
    padding-left: 12px;
    padding-right: 12px;
  }
}

/deep/ .init-svg-icon {
  width: 15px;
  height: 15px;
}
</style>
