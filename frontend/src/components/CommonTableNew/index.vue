<!-- 该表返回的回调函数叫 reNewAllComumns，参数是更新后的列配置数据 -->
<!-- 过滤条件触发回调函数叫 updateQueryParams 参数是过滤的条件 -->
<template>
  <div class="table common-table">
    <Schemes
      v-if="isScheme"
      ref="schemes"
      :default-config="allTableConfigColumns"
      :parmas="tmpPramas"
      :orgin-columns="originColumns"
      :modular-type="columnsSaveName"
      :permission="schemePermission"
      @schemes="hdSchemes"
      @remoteConfig="hdRemoteConfig"
    />
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
      :summary-method="$attrs['summary-method'] || getSummariesFilter(allComumns)"
      v-on="$listeners"
      @header-dragend="hdHeaderDragend"
    >
      <template v-for="(item, index) in tableColumns">
        <el-table-column
          v-if="!item.type && (!item.columnType || typeLists.indexOf(item.columnType) > -1)"
          :key="item._uniqueId"
          v-bind="{ ...item }"
          show-overflow-tooltip
          :render-header="(h, { column }) => hdRrenderHeader(h, column, item)"
        >
          <!-- slotHeader - 自定义表头 -->
          <template slot="header" slot-scope="scope">
            <slot
              v-if="item.columnType === 'headerSlot' || item.columnType === 'slot'"
              :name="item.prop + 'Header'"
              :row="scope.row"
            />
            <template v-else>
              {{ item.label }}
            </template>
          </template>
          <template slot-scope="scope">
            <!-- 自定义插槽 -->
            <template v-if="item.columnType === 'bodySlot' || item.columnType === 'slot'">
              <slot :name="item.prop" :row="scope.row" :$index="scope.$index" :columnIndex="index" />
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
              {{ scope.row[item.prop] || (scope.row[item.prop] === 0 ? 0 : '') }}
            </template>
          </template>
        </el-table-column>

        <el-table-column v-if="item.type" :key="item.prop + index" v-bind="{ ...item }" />
      </template>
    </el-table>
    <SearchBox
      ref="searchBox"
      :filter-box-info="filterBoxInfo"
      @hightCurrentIcon="hightCurrentIcon"
      @clearSingleHightIcon="clearSingleHightIcon"
      @resetIconHight="resetIconHight"
      @updateQueryParams="updateQueryParams"
    />

    <ColumnsConfigDialog
      v-if="columnsConfigVisible"
      :right-columns="rightColumns"
      :columns-config-visible="columnsConfigVisible"
      @cancelColumnConfig="columnsConfigVisible = false"
      @saveTableColumnsConfig="saveColumnsConfig"
      @updateColumns="updateColumns"
    />
  </div>
</template>

<script>
import request from '@/utils/request'
import SearchBox from './searchBox.vue'
// import { eventBus } from '@/main.js'
import { v4 as uuidv4 } from 'uuid'
import { saveAndUptColumnsConfig, getColumnList } from '@/api/column'
import { getSummariesFilter } from '@/utils/table-methods'
import Schemes from '@/components/CommonTablePlus/schemes.vue'
import { updateSpecialSchemeConfig } from '@/api/column.js'
export default {
  components: {
    SearchBox,
    Schemes,
    ColumnsConfigDialog: () => import('./columnsConfigDialog')
  },
  props: {
    // 必传
    tableData: {
      type: Array,
      default: () => []
    },
    // 必传
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
    },
    // 方案配置权限
    schemePermission: {
      type: String,
      default: ''
    },
    // 列配置保存名称，强烈建议传入
    columnsSaveName: {
      type: String,
      require: true,
      default: 'columns'
    },
    // 我的方案
    isScheme: {
      type: Boolean,
      default: false
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
      allTableConfigColumns: [],
      tableColumns: [],
      rightColumns: [],
      columnsConfigVisible: false,
      tmpColumns: [],
      originColumns: [],
      // 该参数用于保存 方案 模式的表产生的参数
      tmpPramas: {},
      schemeParams: {}
    }
  },

  watch: {
    allComumns: {
      deep: true,
      immediate: true,
      handler(newVal, oldValue) {
        if (this.isScheme) return
        // this.hdColumns()
        this.allTableConfigColumns = JSON.parse(JSON.stringify(this.allComumns))
        this.getRightColumns()
      }
    },
    allTableConfigColumns: {
      deep: true,
      immediate: true,
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

  created() {
    this.hdColumns()
  },
  mounted() {
    const tableWrapper = document.getElementsByClassName('el-table__body-wrapper')[0]
    tableWrapper.addEventListener('scroll', this.hdScrollbar)
  },
  methods: {
    hdSchemes(val) {
      this.schemeParams = val
    },
    hdRemoteConfig({ sendData, scheme }) {
      const { config, params } = sendData
      if (scheme.id !== 'default') {
        // console.log('hdRemoteConfig ->', sendData, scheme)
        this.allTableConfigColumns = JSON.parse(JSON.stringify(config))
        this.getRightColumns()
      } else {
        this.allTableConfigColumns = JSON.parse(JSON.stringify(this.allComumns))
        this.getRightColumns()
      }
      this.tmpPramas = params || {}
    },
    getRightColumns() {
      this.leftSelection &&
        (this.rightColumns = this.allTableConfigColumns.slice(1, this.allTableConfigColumns.length - 1))
      !this.leftSelection &&
        (this.rightColumns = this.allTableConfigColumns.slice(0, this.allTableConfigColumns.length - 1))
    },
    getSummariesFilter,
    // columns 保存到后台只需要保存前端的操作状态，但后端并不需要记录配置字段的增减
    // 字段的增减永远只需要和本地保持一致，知道这个很重要，记住两点：
    // 1. 后台只需要保存操作状态 2. 前端记录字段的增减
    // 现在只需要将两者的特性结合起来，就可以简化代码。
    async hdColumns() {
      // console.log('---1---')
      // 保存初始值，重置用
      this.originColumns = JSON.parse(JSON.stringify(this.allComumns))
      if (!this.isScheme) {
        // console.log('---2---')
        const remoteColumns = (await this.getColumnsConfigList()) || JSON.parse(JSON.stringify(this.allComumns))
        // 将后端保存的状态原封不动赋给前端数据
        this.allComumns.forEach((l, li) => {
          const ri = remoteColumns.findIndex(r => r.prop === l.prop)
          // 不存在就跳过
          if (ri === -1) return

          Object.assign(this.allComumns[li], remoteColumns[ri])
          // 位置不变，不需要调整
          if (ri === li) return

          // 开始调整
          const item_ri = this.allComumns[ri]
          const item_li = this.allComumns[li]

          // 如果其中一个不存在，就跳过调整，防止报错
          if (!item_ri || !item_li) return

          this.allComumns.splice(ri, 1, item_li)
          this.allComumns.splice(li, 1, item_ri)
        })
      }
      // 列配置去重
      const lonelyAry = []
      this.allComumns.forEach(item => {
        const isExistIdx = lonelyAry.findIndex(i => i.prop === item.prop)
        if (isExistIdx !== -1) return
        lonelyAry.push(item)
      })

      this.$emit('reNewAllComumns', JSON.parse(JSON.stringify(lonelyAry)))
    },
    // 重置列表
    resetQuery() {
      this.$refs.searchBox.resetQuery()
      // 重置也会把列配置重置成前端本地保存的模样，所有配置信息都会重置丢失。
      this.saveColumnsConfig(this.originColumns)
    },
    // 列表查询数据更新
    updateQueryParams(val) {
      this.tmpPramas = JSON.parse(JSON.stringify(val))
      this.$emit('updateQueryParams', val)
    },
    async saveScheme(column) {
      if (!this.schemeParams.id || this.schemeParams.id === 'default') {
        this.$notify({
          message: '默认方案不允许更新配置',
          type: 'error',
          duration: 2000
        })
        return
      }
      this.schemeParams.isUser = Number(this.schemeParams.isUser)
      this.schemeParams.columnInformation = JSON.stringify(column || this.tmpColumns)
      this.schemeParams.columnSearchInformation = JSON.stringify(this.tmpPramas)
      const [err, res] = await this.$to(updateSpecialSchemeConfig(this.schemeParams))
      if (err) {
        console.log('save err ---', err)
        return
      }
      const {
        data: { code }
      } = res
      if (code === '200') {
        this.$notify({
          message: '列配置更新成功！',
          type: 'success',
          duration: 2000
        })

        // 配置成功后,需要更新当前表
        this.allTableConfigColumns = JSON.parse(JSON.stringify(column || this.tmpColumns))
        this.getRightColumns()
      }
    },
    // 保存列配置
    async saveColumnsConfig(column) {
      if (this.isScheme) {
        await this.saveScheme(column)
        return
      }
      // console.log('----2---')
      const {
        data: { code, message }
      } = await saveAndUptColumnsConfig({
        columnInformation: JSON.stringify(column || this.tmpColumns),
        modularType: this.columnsSaveName
      })
      if (code === '200') {
        // data && this.notify('success', '保存成功')
        this.$emit('reNewAllComumns', column || this.tmpColumns)
        // this.$nextTick(() => {
        //   this.$emit('getList')
        // })
        // this.$emit('getList')
        // 返回中断程序
        return
      }
      this.notify('error', message || '服务异常')
      // 保存列配置后刷新列表
    },
    // 提示
    notify(type, message, title = '提示') {
      this.$notify({ title, message: message, type, duration: 2000 })
    },
    // 获取远程配置文件
    async getColumnsConfigList() {
      // console.log('----3---')
      const {
        data: { code, data, message }
      } = await getColumnList({ modelType: this.columnsSaveName })
      if (code === '200' && data?.columnInformation) {
        // this.$emit('reNewAllComumns', JSON.parse(data?.columnInformation))
        // 返回中断程序
        return JSON.parse(data.columnInformation)
      }
      // 这种情况是请求成功，但是 data 内没值
      if (code === '200') {
        return
      }
      this.notify('error', message || '获取列配置失败！')
      return
    },
    hdHeaderDragend(newWidth, oldWidth, column, event) {
      const { property } = column
      const index = this.allTableConfigColumns.findIndex(i => i.prop === property)
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

    // 操作弹窗列表时，更新的数据操作在这里进行
    updateColumns(newColumns) {
      if (this.leftSelection) {
        this.tmpColumns = [
          this.allTableConfigColumns[0],
          ...newColumns,
          this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
        ]
      }
      if (!this.leftSelection) {
        this.tmpColumns = [...newColumns, this.allTableConfigColumns[this.allTableConfigColumns.length - 1]]
      }
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

    async requestOptions(optionsRequestConfig = {}) {
      let arr = []
      const {
        url,
        method,
        labelKey,
        valueKey,
        showItems,
        specialHandle,
        multilevelkey,
        isMap,
        data = {},
        params = {},
        isTree
      } = optionsRequestConfig

      try {
        const {
          data: { code, data: rData, message }
        } = await request({ url, method, data, params })
        if (code === '200') {
          if (isTree) {
            return (rData || [])?.map((item, index) => ({
              id: index,
              code: item.type,
              name: item.name,
              list: (item?.list || []).map((i, inx) => ({
                ...i,
                isLeaf: true,
                id: index + '-' + inx
              }))
            }))
          }
          let options
          specialHandle
            ? (options = this.hdSpecialOptions(rData, multilevelkey, labelKey, valueKey, isMap))
            : (options = (rData || []).map(i => ({
                ...i,
                value: i[valueKey] + '',
                label: i[labelKey]
              })))
          showItems
            ? showItems.forEach(j => {
                const index = options.findIndex(item => item.value === j)
                if (index > -1) {
                  arr.push(options[index])
                }
              })
            : (arr = options)
          return arr
        } else {
          this.$message({
            type: 'error',
            message
          })
        }
      } catch (error) {
        console.error(error, 'error')
      }
    },
    hdRrenderHeader(h, column, item) {
      const { filterBoxType, label, prop, key = '', options, outSideKey = '' } = item
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
              style: 'font-size: 18px; cursor: pointer;',
              directives: [
                {
                  name: 'permission',
                  value: {
                    action: this.columnPermissionAction
                    // currentPath: this.$route.path
                  }
                }
              ],
              on: {
                click: () => {
                  this.columnsConfigVisible = true
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
                click: async e => {
                  this.$refs.searchBox.showSearchBox()
                  const { clientX = 0, clientY = 0 } = e || {}
                  this.filterBoxInfo = {
                    filterBoxType,
                    clientX,
                    clientY,
                    prop,
                    key,
                    options: optionsRequestConfig ? await this.requestOptions(optionsRequestConfig) : options,
                    outSideKey
                  }
                }
              }
            },
            [
              h('svg-icon', {
                props: {
                  iconClass: 'filter',
                  className: `${this.showIconHight(prop) ? 'icon-active' : ''}` + '  init-svg-icon'
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
::v-deep .el-table {
  .icon-active {
    color: #1890ff;
  }
}

.common-table {
  // overflow: auto;

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
