<!--
 * @Author: zhaozhuo
 * @Date: 2021-11-29 09:01:18
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-01-31 17:39:10
 * @Description:
-->
<template>
  <div class="agtable-box">
    <!-- ag-grid 表格 -->
    <ag-grid-vue
      :style="agStyle"
      class="ag-theme-alpine"
      :grid-options="gridOptions"
      :get-row-class="getRowClass"
      :column-defs="watchColumnDefs"
      :row-data="watchedRowData"
      :side-bar="watchSideBar"
      :default-col-def="defaultColDef"
      :pagination="false"
      :pagination-auto-page-size="false"
      :enable-range-selection="true"
      :suppress-context-menu="false"
      :get-context-menu-items="getContextMenuItems"
      :get-row-style="getRowStyle"
      :row-style="rowStyle"
      :row-height="28"
      :locale-text="localeText"
      :suppress-row-click-selection="suppressRowClickSelection"
      :row-selection="rowSelection"
      :row-multi-select-with-click="rowMultiSelectWithClick"
      :tree-data="treeData"
      :auto-group-column-def="autoGroupColumnDef"
      :get-data-path="getDataPath"
      :group-default-expanded="groupDefaultExpanded"
      :is-row-selectable="isRowSelectable"
      :default-csv-export-params="defaultCsvExportParams"
      :default-excel-export-params="defaultExcelExportParams"
      :status-bar="statusBar"
      :get-row-node-id="getRowNodeId"
      @grid-ready="onReady"
      @range-selection-changed="onRangeSelectionChanged"
      @selection-changed="onSelectionChanged"
      @column-visible="onColumnVisible"
    />

    <div v-if="isShowCalc || total > 0" class="agtable-footer">
      <!-- v-show="isShowCalc" -->
      <div v-show="isShowCalc" class="footer-calc">
        <span
          class="mr-20"
        >总数：<strong>{{ calcCol.sum }}</strong></span>
        <span
          class="mr-20"
        >最大值：<strong>{{ calcCol.max }}</strong></span>
        <span
          class="mr-20"
        >最小值：<strong>{{ calcCol.min }}</strong></span>
        <span
          class="mr-20"
        >计数：<strong>{{ calcCol.num }}</strong></span>
      </div>
      <!-- 分页组件 -->
      <pagination3
        :total="total"
        :page.sync="pageInfo.current"
        :limit.sync="pageInfo.size"
        :page-sizes="pageSize"
        @pagination="getTableList"
      />
    </div>
  </div>
</template>

<script>
import { AgGridVue } from '@ag-grid-community/vue'
import { ModuleRegistry } from '@ag-grid-community/core'
import { CsvExportModule } from '@ag-grid-community/csv-export'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection'
import { ClipboardModule } from '@ag-grid-enterprise/clipboard'
import { SideBarModule } from '@ag-grid-enterprise/side-bar'
import { StatusBarModule } from '@ag-grid-enterprise/status-bar'
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel'
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export'
import { MenuModule } from '@ag-grid-enterprise/menu'
import store from '@/store'

ModuleRegistry.registerModules([
  CsvExportModule,
  ClientSideRowModelModule,
  RangeSelectionModule,
  ClipboardModule,
  SideBarModule,
  StatusBarModule,
  ColumnsToolPanelModule,
  ExcelExportModule,
  MenuModule
])

import CustomHeader from './customHeader.vue'
import Pagination3 from '@/components/Pagination3'
import CustomActionToolPanel from './customActionToolPanel.js'

export default {
  name: 'AgTable',
  provide() {
    return {
      agTable: this
    }
  },
  components: {
    AgGridVue,
    Pagination3,
    // eslint-disable-next-line
    agColumnHeader: CustomHeader
  },
  props: {
    columnDefs: {
      // 默认列配置
      type: Array,
      default() {
        return []
      }
    },
    rowData: {
      // 行数据
      type: Array,
      default() {
        return []
      }
    },
    rowSelection: {
      // 设置单多选
      type: String,
      default: 'multiple'
    },
    rowMultiSelectWithClick: {
      // 单击选中某一行时，可以保留之前已选中的行
      type: Boolean,
      default: true
    },
    autoGroupColumnDef: {
      // 自动组合成分组
      type: Object,
      default() {
        return {}
      }
    },
    groupDefaultExpanded: {
      // 默认展开行
      type: Number,
      default: 0
    },
    treeData: {
      // 是否为tree数据，即是否为展开行
      type: Boolean,
      default: false
    },
    uniqueExpandId: {
      // 分层情况需要传每一行的唯一值
      type: String,
      default: ''
    },
    sortCols: {
      // 排序列
      type: Array,
      default: () => []
    },
    filterCols: {
      // 过滤列
      type: Array,
      default: () => []
    },
    pageInfo: {
      // 分页信息
      type: Object,
      default() {
        return {}
      }
    },
    total: {
      type: Number,
      default: 0
    },
    getList: {
      // 获取表格数据
      type: Function,
      default() {
        return () => {}
      }
    },
    agStyle: {
      // 表格样式
      type: Object,
      default() {
        return {
          width: '100%',
          height: '100%'
        }
      }
    },
    getRowStyle: {
      // 行样式计算
      type: Function,
      default() {
        return () => {}
      }
    },
    rowStyle: {
      // 表格行样式
      type: Object,
      default() {
        return {
          // height: '28px'
        }
      }
    },
    sideBar: {
      // 侧边栏的显示
      type: Object,
      default() {
        return {}
      }
    },
    isRowSelectable: {
      // 行是否可选
      type: Function,
      default() {
        return () => true
      }
    },
    fitColWidth: {
      // contentFit 根据内容适配  tableWidthFit 根据表格宽度适配
      type: String,
      default: ''
    },
    defaultCsvExportParams: {
      // 导出Csv参数
      type: Object,
      default() {
        return {}
      }
    },
    defaultExcelExportParams: {
      // 导出Excel参数
      type: Object,
      default() {
        return {}
      }
    },
    colState: {
      // 列状态
      type: Array,
      default() {
        return () => []
      }
    },
    saveColStateReq: {
      // 保存列状态
      type: Function,
      default() {
        return () => {}
      }
    },
    colSum: {
      // 列求和
      type: Object,
      default() {
        return {}
      }
    },
    expandRowParams: {
      // 当前需要展开行参数
      type: Object,
      default() {
        return {}
      }
    },
    pageSize: {
      // 分页列数据
      type: Array,
      default() {
        return [100, 200, 300, 500, 1000, 1500]
      }
    },
    getRowNodeId: {
      // 返回唯一值作为当前行id
      type: Function,
      default() {
        return () => {}
      }
    },
    suppressRowClickSelection: {
      type: Boolean,
      default() {
        return false
      }
    },
    otherAction: {
      // 右侧按钮的其他操作
      type: Function,
      default() {
        return () => {}
      }
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
      gridOptions: {
        components: {
          customActionToolPanel: CustomActionToolPanel
        },
        onDragStarted: this.dragStarted,
        onDragStopped: this.dragStopped
      },
      watchedRowData: [],
      watchColumnDefs: [],
      defaultColDef: {
        // flex: 1,
        editable: false,
        resizable: true,
        // lockPinned: true,
        cellClass: ['cellClass']
      },
      localeText: {
        page: '页',
        more: '更多',
        to: '到',
        of: 'of',
        next: '下一页',
        last: '上一页',
        first: '首页',
        previous: '上一页',
        loadingOoo: '加载中...',
        selectAll: '查询全部',
        searchOoo: '查询...',
        blanks: '空白',
        filterOoo: '过滤...',
        applyFilter: 'daApplyFilter...',
        equals: '相等',
        notEqual: '不相等',
        lessThan: '小于',
        greaterThan: '大于',
        lessThanOrEqual: '小于等于',
        greaterThanOrEqual: '大于等于',
        inRange: '范围',
        contains: '包含',
        notContains: '不包含',
        startsWith: '开始于',
        endsWith: '结束于',
        group: '组',
        columns: '列',
        filters: '筛选',
        rowGroupColumns: 'laPivot Cols',
        rowGroupColumnsEmptyMessage: 'la drag cols to group',
        valueColumns: 'laValue Cols',
        pivotMode: 'laPivot-Mode',
        groups: 'laGroups',
        values: '值',
        pivots: 'laPivots',
        valueColumnsEmptyMessage: 'la drag cols to aggregate',
        pivotColumnsEmptyMessage: 'la drag here to pivot',
        toolPanelButton: 'la tool panel',
        noRowsToShow: '暂无数据',
        pinColumn: '固定列',
        valueAggregation: 'laValue Agg',
        autosizeThiscolumn: '自动调节此列大小',
        autosizeAllColumns: '自动调节所有列大小',
        groupBy: '排序',
        ungroupBy: '不排序',
        resetColumns: '重置列',
        expandAll: '展开分组',
        collapseAll: '折叠分组',
        toolPanel: '工具面板',
        export: '导出',
        csvExport: 'CSV文件',
        excelExport: 'Excel文件',
        pinLeft: '固定左侧',
        pinRight: '固定右侧',
        noPin: '取消固定',
        sum: '总数',
        min: '最小值',
        max: '最大值',
        none: '无',
        count: '计数',
        avg: '平均值',
        copy: '复制',
        copyWithHeaders: '携带表头复制',
        ctrlC: 'ctrl + C',
        paste: '粘贴',
        ctrlV: 'ctrl + V'
      },

      api: null,
      columnApi: null,
      cellRangesNodes: [],

      selectedChanged: null, // 记录选中的项
      getDataPath: data => {
        // 分层的时候需要数组
        return data.agPid
      },
      sortParamsMap: new Map(), // 排序参数
      customHeaders: [], // 所有的表头组件
      customFilterComs: [], // 自定义过滤组件
      statusBar: {
        statusPanels: [
          {
            key: 'agAggregationComponent',
            statusPanel: 'agAggregationComponent'
          }
        ]
      },
      calcCol: {
        // 范围计算
        sum: '',
        max: '',
        min: '',
        num: ''
      },
      getRowClass: params => {
        if (
          this.expandRowParams.curId &&
          params.data.orderNumber === this.expandRowParams.curId
        ) {
          return 'ag-row-hover'
        }
      },
      watchSideBar: {
        toolPanels: [
          {
            id: 'columns',
            labelDefault: '自定义列',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            minWidth: 225,
            width: 225,
            maxWidth: 225,
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
              suppressPivots: false,
              suppressPivotMode: true,
              suppressColumnFilter: false,
              suppressColumnSelectAll: false,
              suppressColumnExpandAll: true
            }
          },
          {
            id: 'customActionToolPanel',
            labelDefault: '操作',
            labelKey: 'customActionToolPanel',
            toolPanel: 'customActionToolPanel'
          }
        ]
      }
    }
  },
  computed: {
    isShowCalc() {
      const isNumExist = Object.values(this.calcCol).some(
        val => val.toString().length
      )
      return isNumExist
    }
  },
  watch: {
    rowData(rowData) {
      if (this.treeData) {
        const dealedRowData = this.dealRowData(rowData)
        this.watchedRowData = dealedRowData
        this.$nextTick(() => {
          const rowNode = this.api.getRowNode(this.expandRowParams?.parentId)
          rowNode && rowNode.setExpanded(true)
        })
      } else {
        this.watchedRowData = rowData
      }
      this.fixCheckboxCol()
    },
    colSum(colSumVal) {
      if (colSumVal.isBotttomRow) {
        this.api.setPinnedBottomRowData([colSumVal])
      }
    },
    colState(state) {
      state.length && this.restoreState()
    },
    sideBar: {
      handler(nSideBar) {
        Object.keys(nSideBar).forEach(key => {
          if (key == 'toolPanels') {
            const nToolPanelsVal = this.watchSideBar[key].concat(nSideBar[key])
            this.$set(this.watchSideBar, key, nToolPanelsVal)
          } else {
            this.$set(this.watchSideBar, key, nSideBar[key])
          }
        })
      },
      immediate: true
    },
    columnDefs: {
      handler(nColumnDefs) {
        this.watchColumnDefs = nColumnDefs
        this.fixCheckboxCol()
      },
      deep: true,
      immediate: true
    },
    columnPermissionAction: {
      handler(newVal) {
        const authList =
          store.getters && store.getters.authList?.map(auth => auth.path)

        if (authList) {
          if (authList.indexOf(newVal) === -1) {
            const nToolPanelsVal = this.watchSideBar.toolPanels.filter(item => {
              return item.id !== 'columns'
            })
            this.$set(this.watchSideBar, 'toolPanels', nToolPanelsVal)
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化一些参数
    init() {
      // 定义状态组件
      this.statusBarComponent = ''
    },
    // 选中发生改变
    onSelectionChanged(params) {
      const selectedChanged = params.api.getSelectedNodes()
      this.selectedChanged = selectedChanged
      const selection = new Map()
      selectedChanged.forEach(row => {
        selection.set(row.rowIndex, row.data)
      })
      this.$emit('selection-change', selection)
    },
    // 更新单元格数据
    uppdateCellData(params, modifyRowData) {
      const rowNode = params.node
      Object.keys(modifyRowData).forEach(key => {
        rowNode.setDataValue(key, modifyRowData[key])
      })
    },
    // 更新行数据
    updateRowData(params, modifyRowData) {
      const rowNode = params.node
      const newData = Object.assign(
        { id: rowNode.id },
        params.data,
        modifyRowData
      )
      rowNode.setData(newData)
    },
    // 新增行数据
    addRowData(params, newRowData) {
      this.api.applyTransaction({ add: [newRowData] })
    },
    // 删除行数据
    deleteRowData(params) {
      this.api.applyTransaction({ remove: [params.data] })
    },
    // 处理分层数据
    dealRowData(rowData) {
      const uniqueExpandId = this.uniqueExpandId
      return rowData.reduce((arr, e) => {
        e.agPid = [e[uniqueExpandId]]
        arr.push(e)
        const childrenItem = e.subPlanEntities
        if (childrenItem && childrenItem.length) {
          childrenItem.forEach(f => {
            f.agPid = [e[uniqueExpandId], f[uniqueExpandId]]
            arr.push(f)
          })
        }
        return arr
      }, [])
    },
    // 获取新的数据
    getTableList(params) {
      // 清理选中项 当前页排序
      this.selectedChanged = []
      this.api.deselectAll()

      // 调用更新数据接口
      this.getList(params)
    },
    // 切换action 状态
    switchActionStatus() {
      const isShowTP = this.api.isToolPanelShowing()
      const opendIds = this.api.getOpenedToolPanel()

      if (isShowTP && opendIds == 'customActionToolPanel') {
        // 打开
        this.columnApi.setColumnVisible('action', true)
        return
      }

      if ((!isShowTP && !opendIds) || opendIds == 'columns') {
        // 关闭
        this.columnApi.setColumnVisible('action', false)
        return
      }
      // 其他右侧按钮操作
      this.otherAction(this.api, isShowTP, opendIds)
    },
    // 渲染完成的回调
    onReady(params) {
      this.api = params.api
      this.columnApi = params.columnApi
      // 监听sideBar 折叠状态
      this.api.addEventListener(
        'toolPanelVisibleChanged',
        this.switchActionStatus
      )
      // 设置序号列为第一列
      this.fixCheckboxCol()
      // 适配宽度
      this.setFitWidth(params)
      // 恢复列数据
      this.colState.length && this.restoreState()
    },
    // 宽度适配
    setFitWidth(params) {
      const allColumnIds = []
      switch (this.fitColWidth) {
        case 'contentFit':
          params.columnApi.getAllColumns().forEach(column => {
            allColumnIds.push(column.colId)
          })
          params.columnApi.autoSizeColumns(allColumnIds)
          break
        case 'tableWidthFit':
          params.api.sizeColumnsToFit()
          break
        default:
          break
      }
    },
    // 恢复列数据
    restoreState() {
      const colState = this.colState
      if (!colState || colState.length <= 0) {
        // console.log('没有初始列状态')
        return
      }

      this.$nextTick(() => {
        this.columnApi.applyColumnState({
          state: colState,
          applyOrder: true
        })
      })
    },
    // 右键操作
    getContextMenuItems(params) {
      const newDefItems = ['copy', 'copyWithHeaders', 'export']
      return newDefItems
    },
    // 获取面板数据
    getStatusData() {
      if (!this.statusBarComponent) {
        this.statusBarComponent = this.api.getStatusPanel(
          'agAggregationComponent'
        )
      }
      // avgAggregationComp, countAggregationComp
      const {
        sumAggregationComp,
        maxAggregationComp,
        minAggregationComp,
        countAggregationComp
      } = this.statusBarComponent
      this.calcCol = {
        sum: sumAggregationComp.eValue.innerText,
        min: minAggregationComp.eValue.innerText,
        max: maxAggregationComp.eValue.innerText,
        num: countAggregationComp.eValue.innerText
      }
    },
    // 选中范围发生变化
    onRangeSelectionChanged() {
      const api = this.api
      const cellRanges = api.getCellRanges()
      if (cellRanges.length === 0) {
        this.calcCol = {
          sum: '',
          min: '',
          max: '',
          num: ''
        }
        return
      }

      const cellRange = cellRanges[0]
      const { columns, startRow, endRow } = cellRange
      const numCols = Object.keys(this.colSum)
      const startRowIndex = Math.min(startRow.rowIndex, endRow.rowIndex)
      const endRowIndex = Math.max(startRow.rowIndex, endRow.rowIndex)

      // 目前只计算单列的数据
      if (columns.length === 1 && startRowIndex !== endRowIndex) {
        const column = columns[0]
        if (!numCols.includes(column.colId)) return
        this.getStatusData()
      } else {
        this.calcCol = {
          sum: '',
          min: '',
          max: '',
          num: ''
        }
      }
    },
    // 列显示/隐藏
    onColumnVisible() {
      this.fixCheckboxCol()
    },
    // 拖拽开始
    dragStarted(event) {
      this.ariaColIndex = event.target.parentElement.ariaColIndex
    },
    // 拖拽停止
    dragStopped(event) {
      const leftCols = event.columnApi.getDisplayedRightColumns()
      if (leftCols.length > 1) {
        const otherColId = leftCols.find(col => col.colId !== 'action').colId

        const allColState = event.columnApi.getColumnState()
        const nAllColState = allColState.slice(0)
        const otherColstateIndex = nAllColState.findIndex(
          col => col.colId == otherColId
        )
        const otherColState = nAllColState[otherColstateIndex]
        otherColState.pinned = ''
        nAllColState.splice(otherColstateIndex, 1)
        nAllColState.splice(this.ariaColIndex - 2, 0, otherColState)

        setTimeout(() => {
          event.columnApi.applyColumnState({
            state: nAllColState,
            applyOrder: true
          })
        })
      }
    },
    fixCheckboxCol() {
      this.$nextTick(() => {
        this.columnApi?.moveColumn('serial', 0)
      })
    }
  }
}
</script>

<style lang="scss" scope>
.mr-20 {
  margin-right: 20px;
}
.agtable-box {
  display: flex;
  flex-direction: column;
  .agtable-footer {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer-calc {
      width: 40%;
    }
    .pagination-container {
      position: relative;
      padding: 0;
    }
  }
  .cellClass {
    display: flex;
    align-items: center;
    height: 28px;
  }
  .ag-watermark {
    z-index: -999999999 !important;
  }
  .ag-center-cols-viewport {
    overflow-x: hidden;
  }
  .ag-watermark {
    z-index: -10;
  }
  .ag-group-value {
    line-height: 28px !important;
  }
  .ag-group-expanded,
  .ag-group-contracted,
  .ag-group-child-count {
    height: 28px !important;
  }
  .ag-status-bar {
    display: none;
  }
  .ag-side-bar {
    > .ag-tool-panel-wrapper:nth-of-type(3) {
      display: none !important;
    }
  }
  // 滚动条 样式修改
  ::-webkit-scrollbar {
    height: 12px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 12px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(185, 184, 184, 0.2);
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(253, 253, 253, 0.74);
  }
}
</style>
