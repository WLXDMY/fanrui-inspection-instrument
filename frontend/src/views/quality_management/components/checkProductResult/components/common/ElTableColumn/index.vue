<!--
 * @Author: shunhua.liang
 * @Date: 2022-08-17 14:05:16
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-05-28 10:33:42
 * @Description: 动态表格展示，拖拽改变列宽，改变顺序
-->

<template>
  <section class="common-table">
    <section v-if="columnList.length" class="table-content">
      <el-table
        ref="listTable"
        style="width: 100%"
        height="100%"
        row-key="singleId"
        border
        highlight-current-row
        :data="tableData"
        :header-cell-style="{
          background: '#F2F5FC',
          color: '#181d1f',
          height: '46px',
          'font-family': 'Source Han Sans CN',
          'font-size': '13px',
          'font-weight': '550'
        }"
        :row-style="{ height: '38px' }"
        :cell-style="columnStyle"
        :show-summary="false"
        :summary-method="getSummaries"
        @selection-change="handleSelectionChange"
        @header-dragend="headerDragend"
      >
        <el-table-column type="index" width="55" label="序号" />
        <el-table-column
          v-for="item in columnList"
          :key="item.id"
          :prop="item.code"
          :label="item.label"
          :width="item.width"
          :min-width="item.width"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :render-header="renderTableColumn"
        >
          <template slot-scope="{ row }">
            <!-- 审批状态 -->
            <div v-if="item.code === 'approvalStatusName'" class="state-column">
              <div
                class="left-radius"
                :style="{
                  background: window.stateColor.getStateColor(row.approvalStatusName)
                }"
              />
              <span>{{ row.approvalStatusName }}</span>
            </div>
            <!--状态 -->
            <div v-else-if="item.code === 'state'" class="state-column">
              <div
                class="left-radius"
                :style="{
                  background: window.stateColor.getStateColor(row.stateName)
                }"
              />
              <span>{{ row.stateName }}</span>
            </div>
            <!-- 自定义插槽 -->
            <template v-else-if="item.slot">
              <slot :name="item.code" :item="item" :row="row">自定义插槽</slot>
            </template>
            <div v-else class="table-column-content">
              <span class="table-content">
                {{
                  item.columnType !== 'material'
                    ? row[item.code]
                    : row.saleOrderMaterial
                    ? row.saleOrderMaterial.materialFields
                      ? row.saleOrderMaterial.materialFields[item.code]
                      : ''
                    : ''
                }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :key="actionKey" label="操作" width="40" fixed="right" :render-header="renderActionColumn" />
      </el-table>
    </section>
    <!-- 右侧操作列展示 -->
    <!-- <CustomColumn
      v-if="isShowCustomColumn"
      modular-type="checkProductResult"
      :config-list="customColumnList"
      :column-key-list="columnKeyList"
      :get-column-width-list="columnDragendList"
      :setting="orderBtnType"
      :setting-column="columnAllSetting"
      @closeDialog="closeDialog"
      @getColumnList="getColumnList"
      @dragColumn="dragColumn"
    /> -->
    <!-- 搜索框 -->
    <SearchBox
      v-show="isShowSearchBox"
      ref="menuScreen"
      :define-list="searchList"
      :config="searchQuery"
      @actionList="actionList"
      @clearList="clearList"
      @closeDialogSearch="closeDialogSearch"
    />
  </section>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import tableColumn from './mixins/tableColumn'
import actionColumn from './mixins/actionColumn'
import searchColumn from './mixins/searchColumn'
import sumCols from '@/mixins/sumCols.js'
// import CustomColumn from '@/views/order-model/salesOrder/component/customColumn.vue'
import SearchBox from '@/components/SearchBox/index.vue'
import store from '@/store'
import { BASE_URL } from '@/utils/common-variable.js'
import {
  getInspectsheetsDetailAllInspectType,
  getInspectsheetsDetailAllDocumentType,
  getInspectsheetsDetailAllQualifiedType
} from '@/api/quality-manage'

export default {
  name: 'TableColumn',
  components: { CustomColumn, SearchBox },
  mixins: [tableColumn, actionColumn, sumCols, searchColumn],
  props: {
    // 动态表格展示(展示不同页面的表格)
    tableColumn: {
      type: Array,
      require: true,
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
    // 按单还是按物料(按单：order，按物料： material)
    orderBtnType: {
      type: String,
      require: true,
      default: 'material'
    },
    // 是否具有审批权限
    isExistApproveBtn: {
      type: Boolean,
      require: false,
      default: false
    },
    // 物料相关字段
    materialFields: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    },
    // 查询条件
    listQuery: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    },
    // 表格合计功能
    sumColData: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    },
    columnSearchList: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      window,
      historyColumn: '', // 历史操作列的值
      actionKey: uuidv4(), // 操作列有时候并不会更新，需给个唯一的id
      columnDragend: [], // 通过拖拽改变表格列宽
      isShowSearchBox: false, // 是否展示搜索框
      isShowCustomColumn: false, // 更多操作（单击“设置”图标，展开的弹窗）
      permissionObj: {
        edit: 'product.inspection.plan:update', // 编辑
        copy: 'product.inspection.plan:copy', // 复制
        approval: 'product.inspection.plan:approval', // 审批
        detail: 'product.inspection.plan:select', // 详情
        delete: 'product.inspection.plan:delete' // 删除
      },
      columnList: [], // 表格展示的列
      customColumnList: [],
      columnKeyList: [],
      columnDragendList: [],
      searchQuery: {}
    }
  },
  computed: {
    computedNotBtnAuthList() {
      return val => {
        const authList = store.getters.authList?.map(auth => auth.path)
        return authList.indexOf(val) === -1
      }
    }
  },
  watch: {
    sumColData: {
      handler(nweVal) {
        const { totalPrice } = nweVal || {}
        this.setSumData({ ...nweVal, price: totalPrice })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    // 修改样式
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 0) {
        return 'padding:0px;font-size:14px;border-right:0;border-top:0;border-left:0'
      }
    },
    // 列表头展示的形式
    renderTableColumn(h, { column }) {
      // 如果没有开启搜索功能(列表头后面的搜索小图标)直接返回(根据是否传入了搜索列表)
      // if (!this.columnSearchList.length) return
      const that = this
      // 根据列名过滤出搜索列
      const result = this.columnSearchList.find(item => item.name === column.property)
      // 根据列名过滤出表格列
      const config = this.columnList.find(item => item.code === column.property)
      // 是否有过滤值(是否需要高亮图标)
      const active = this.isExistFilter(result, config)
      // 最外层样式
      const outStyle = 'display: block;width: 100%; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
      // 内层样式
      const innerStyle = 'margin-left: 5px; font-size: 16px; cursor: pointer; position:relative'
      // 根据类型来展示图标(目前暂时不需要,为防止以后需要)
      const { type } = result || {}
      let element = ''
      let renderContent = {}
      switch (type) {
        case 'input':
        case 'input-number':
        case 'textArea':
        case 'timeline':
        case 'filter':
        case 'datePicke':
        case 'switch':
          element = 'svg-icon'
          renderContent = {
            props: {
              className: active,
              iconClass: 'filter'
            }
          }
          break
      }
      // 渲染表格列
      return h('span', { style: outStyle }, [
        h('span', {}, column.label), // 列名
        h(
          'span',
          {
            style: innerStyle,
            // 搜索框关闭的时候用的上（做排他处理时）
            class: 'sale-order-table-column-setting',
            on: {
              click: function (e) {
                that.$nextTick(() => {
                  // 弹窗是否展开
                  if (that.historyColumn === column.property) {
                    that.isShowSearchBox = !that.isShowSearchBox
                  } else {
                    that.isShowSearchBox = true
                  }
                  that.handleFilter(column.property)
                  // 设置搜索值传入子组件处理
                  that.searchQuery = {
                    isShow: true,
                    params: e, // 单击列时的参数
                    column, // 表格列数据
                    queryList: that.listQuery, // 请求参数（回显需要）
                    columnConfig: config,
                    searchCode: result || {}
                  }
                  that.historyColumn = column.property
                })
              }
            }
          },
          [
            // 列图标
            h(element, {
              ...renderContent
            })
          ]
        )
      ])
    },
    // 处理下拉选择
    handleFilter(name) {
      switch (name) {
        case 'inspectionSheetTypeName':
          new Promise(resolve => {
            const list = this.getInspectsheetsDetailAllInspectType()
            resolve(list)
          }).then(res => {
            this.$set(this.searchQuery, 'options', res)
          })
          break
        case 'standardResult':
          new Promise(resolve => {
            const list = this.getInspectsheetsDetailAllQualifiedType()
            resolve(list)
          }).then(res => {
            this.$set(this.searchQuery, 'options', res)
          })
          break
        case 'documentTypeName':
          new Promise(resolve => {
            const list = this.getInspectsheetsDetailAllDocumentType()
            resolve(list)
          }).then(res => {
            this.$set(this.searchQuery, 'options', res)
          })
          break
      }
    },
    // 送检类型
    async getInspectsheetsDetailAllInspectType() {
      const res = await getInspectsheetsDetailAllInspectType()
      if (res.data.code === '200') {
        return res.data.data
      }
      return []
    },
    // 单据类型
    async getInspectsheetsDetailAllDocumentType() {
      const res = await getInspectsheetsDetailAllDocumentType()
      if (res.data.code === '200') {
        return res.data.data
      }
      return []
    },
    // 合格的类型
    async getInspectsheetsDetailAllQualifiedType() {
      const res = await getInspectsheetsDetailAllQualifiedType()
      if (res.data.code === '200') {
        return res.data.data.map(item => ({
          code: item,
          name: item
        }))
      }
      return []
    },
    /**
     * @description:是否需要高亮图标
     * @param {Object} result: 搜索类值
     * @param {Object} config: 列配置
     * @return {String}
     */
    isExistFilter(result = {}, config = {}) {
      if (!result) return ''
      let res
      if (config.columnType === 'material') {
        res = this.materialFields[result.name]
      } else {
        res = this.listQuery[result.name]
      }
      if (Array.isArray(result.queryTip)) {
        res = this.listQuery[result.queryTip[0]]
      } else if (result.queryName) {
        const materialCode = result.queryName
        if (materialCode in this.materialFields) {
          res = this.materialFields[materialCode]
        } else {
          res = this.listQuery[result.queryName]
        }
      }
      return res ? 'search-col-active' : ''
    },
    // 自定义操作列表头
    renderActionColumn(h, { column }) {
      const that = this
      return h('span', {}, [
        h('span', ''),
        h('i', {
          class: 'el-icon-setting',
          style: 'font-size: 18px; cursor: pointer;',
          directives: [
            {
              name: 'permission',
              value: { action: 'product.inspection.report:columnConfigResult' }
            }
          ],
          on: {
            click: function () {
              that.isShowCustomColumn = !that.isShowCustomColumn
            }
          }
        })
      ])
    },
    // TODO 表格拖拽有问题
    // 表格列宽拖拽
    headerDragend(newWidth, oldWidth, column, event) {
      const currentColumn = column.property

      const tempList = this.columnList.map(item => {
        if (item.code === currentColumn) {
          return { code: item.code, width: newWidth }
        }
        return { code: item.code, width: item.width }
      })
      const columnList = this.columnList.map(item => {
        if (item.code === currentColumn) {
          return { ...item, code: item.code, width: newWidth }
        }
        return { ...item, code: item.code, width: item.width }
      })
      // 如果有多列的配置，保存的时候也需要携带过去
      const tem = { setting: this.orderBtnType }
      if (this.columnAllSetting && Object.keys(this.columnAllSetting).length) {
        Object.keys(this.columnAllSetting).forEach(el => {
          tem[el] = this.columnAllSetting[el]
        })
      }
      // 更新当前活动页配置选择的数组
      tem[this.orderBtnType] = tempList
      this.customColumnList = columnList
      this.columnDragendList = tem
    },
    // 处理跳转数据
    handleBackList(type) {
      const conditions = Object.assign(this.listQuery, { type })
      sessionStorage.setItem('conditions', JSON.stringify(conditions))
    },
    // 处理详情按钮的样式
    handleDeleteBtnStyle(row) {
      const { state } = row || {}
      if (state === 1) {
        return 'delete-text'
      }
      return 'delete-text disable-delete'
    },
    // 是否展示审批按钮
    isAllowApproval(row) {
      const { approvalStatus, state } = row || {}
      return this.isExistApproveBtn && approvalStatus === 1 && state !== 3
    },
    // 源代码判断逻辑，
    isShowApproval(row) {
      const { approvalStatus, state } = row || {}
      return approvalStatus === 2 || approvalStatus === 3 || state === 3
    },
    // 表格操作更多选项
    handleCommand(val) {
      const { method, row, required, str } = val || {}
      if (!method) {
        return
      }
      sessionStorage.setItem('tableType', this.orderBtnType)
      if (str && required) {
        method(row, required, str)
      } else {
        method(row)
      }
    },
    // 复选框选中个数
    handleSelectionChange(val) {
      this.$emit('tableSelectRow', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  flex: 1;
  display: flex;
  overflow: hidden;

  .table-content {
    flex: 1;
    overflow: hidden;
    height: 100%;
  }
  .table-column-content {
    width: 100%;
    .table-content {
      display: block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      padding: 0;
    }
  }
  .disable-delete {
    color: #a6aebe;
    cursor: not-allowed;
  }
  ::v-deep .el-table td {
    height: 38px;
    padding: 0;
  }
  ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
    height: 18px;
  }
}
</style>

<style>
.search-col-active {
  color: #1890ff;
}
</style>
