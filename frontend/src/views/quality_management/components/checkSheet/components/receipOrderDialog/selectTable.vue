<!-- 公共表格组件 column - 表头 noEmpty - 空数据容器  -->
<!-- 公共配置属性，全继承element属性，额外的：
 * @Author: xuqiuming
 * @Date: 2022-6-18 19:10:19
 * @LastEditTime: 2022-6-18 19:10:19
 * @LastEditors: xuqiuming
 * @Description: In User Settings Edit
-->
<template>
  <div>
    <el-table
      ref="table"
      class="flex-fill responsive-table"
      :data="tableDataLocal"
      v-bind="$attrs"
      :header-cell-style="{
        background: '#FAFAFA',
        color: '#000000',
        'font-family': 'Source Han Sans CN',
        'font-size': '14px'
      }"
      highlight-current-row
      @cell-mouse-enter="mouseEnterTable"
      @cell-mouse-leave="mouseLeaveTable"
      v-on="$listeners"
    >
      <template v-for="(item, index) in columnLocal">
        <el-table-column
          v-if="!item.type && (!item.columnType || typeLists.includes(item.columnType))"
          :key="item.prop + index"
          v-bind="{ ...item }"
          :render-header="(h, { column }) => hdRrenderHeader(h, column, item)"
        >
          <!-- slotHeader - 自定义表头 -->
          <template slot="header" slot-scope="scope">
            <slot v-if="item.columnType === 'slotHeader'" :name="item.prop + 'Header'" :row="scope.row" />
            <template v-else>
              {{ item.label }}
            </template>
          </template>
          <template slot-scope="scope">
            <template v-if="!item.columnType">
              <div v-if="isRadiusFields(item.prop)" class="radius-cell">
                <div
                  class="left-radius"
                  :style="{
                    background: window.stateColor.getStateColor(scope.row[item.prop])
                  }"
                />
                <span> {{ scope.row[item.prop] }}</span>
              </div>
              <div v-else>
                {{ scope.row[item.prop] || (scope.row[item.prop] === 0 ? 0 : '') }}
              </div>
            </template>
            <!-- 自定义插槽 -->
            <slot
              v-else-if="item.columnType === 'slot' || item.columnType === 'slotHeader'"
              :name="item.prop"
              :row="scope.row"
              :$index="scope.$index"
            />
            <!-- map转换 -->
            <template v-else-if="item.columnType === 'dataMap'">
              {{ item.dataMap[scope.row[item.prop]] || '' }}
            </template>
          </template>
        </el-table-column>
        <el-table-column v-if="item.type" :key="item.prop + index" v-bind="{ ...item }" />
      </template>
      <!-- 空数据插槽 -->
      <div v-if="!noEmpty" slot="empty" class="">
        <div class="emptyBox">
          {{ '暂无数据' }}
          <slot name="empty" />
        </div>
      </div>
    </el-table>
    <SearchBox
      ref="searchBox"
      :filter-box-info="filterBoxInfo"
      @hightCurrentIcon="hightCurrentIcon"
      @clearSingleHightIcon="clearSingleHightIcon"
      @resetIconHight="resetIconHight"
    />
  </div>
</template>

<script>
import SearchBox from './selectTableComs/searchBox.vue'
export default {
  components: { SearchBox },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    column: {
      type: Array,
      default: () => []
    },
    noEmpty: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      window,
      tableDataLocal: [],
      columnLocal: [],
      typeLists: [
        // 注册type类型
        'slotHeader',
        'slot',
        'dataMap'
      ],
      // 筛选框
      filterBoxInfo: {
        type: '',
        clientX: 0,
        clientY: 0,
        prop: ''
      }
    }
  },
  computed: {},
  watch: {
    tableData: {
      deep: true,
      handler(val) {
        this.tableDataLocal = val
      },
      immediate: true
    },
    column: {
      deep: true,
      handler(val) {
        this.columnLocal = JSON.parse(JSON.stringify(val))
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 状态，审批状态、优先级字段的处理
    isRadiusFields(name = '') {
      const list = [
        'state',
        'stateName',
        'statusName',
        'approvalStatusName',
        'priority',
        'assignmentState',
        'assignmentStateName'
        // 'approvalStatus'
      ]
      return list.includes(name)
    },
    clearSingleHightIcon(prop) {
      const index = this.columnLocal.findIndex(i => prop === i.prop)
      if (index > -1) {
        this.columnLocal[index].active = false
      }
    },
    hightCurrentIcon(prop) {
      const index = this.columnLocal.findIndex(i => prop === i.prop)
      if (index > -1) {
        this.columnLocal[index].active = true
      }
    },
    resetIconHight() {
      this.columnLocal.forEach(i => {
        i.active = false
      })
    },
    hdRrenderHeader(h, column, item) {
      const { filterBoxType, label, prop, key = '', options = [], outSideKey = '' } = item
      if (!filterBoxType) {
        return h('span', {}, [h('span', {}, label)])
      } else {
        return h('span', {}, [
          h('span', {}, label),
          h(
            'span',
            {
              on: {
                click: e => {
                  this.$refs.searchBox.showSearchBox()
                  const { clientX = 0, clientY = 0 } = e || {}
                  this.filterBoxInfo = {
                    filterBoxType,
                    clientX,
                    clientY,
                    prop,
                    options,
                    key,
                    outSideKey
                  }
                }
              },
              style: 'cursor:pointer'
            },
            [
              h('svg-icon', {
                props: {
                  iconClass: 'filter',

                  className: `${item.active ? 'icon-active' : ''}` + '  init-svg-icon'
                }
              })
            ]
          )
        ])
      }
    },
    // 进入table，找到定位
    mouseEnterTable(row, column, element) {
      // const editName =
      //   element.children?.[0]?.children?.[0]?.getAttribute?.('name')
      // // 角色控制显示
      // if (
      //   editName === 'unRoleControl' ||
      //   editName?.split(',').includes(this.userRole)
      // ) {
      //   row.dis = true
      // }
    },
    mouseLeaveTable(row) {
      // 隐藏修改
      // row.dis = false
      // let editName =
      //   element.children?.[0]?.children?.[0]?.getAttribute?.('name');
      // if (
      //   editName === 'unRoleControl' ||
      //   editName?.split(',').includes(this.userRole)
      // ) {
      //   row.dis = false;
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import '~./index.scss'; 引入scss类 */
// .emptyBox {
//   margin-top: 120px;
// }
// /deep/.el-table__empty-text {
//   height: 100%;
//   // display: flex;
//   // flex-shrink: 1;
//   // align-items: center;
//   // justify-items: center;
// }
// /deep/ .whiteSpace .cell {
//   white-space: normal !important;
// }

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

/deep/ .el-table {
  .icon-active {
    color: #1890ff;
  }
}
/deep/ .init-svg-icon {
  width: 3em;
  height: 1.2em;
}
</style>
