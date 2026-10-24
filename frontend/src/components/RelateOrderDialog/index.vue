<template>
  <!-- 销售订单、生产订单弹窗 -->
  <el-dialog
    class="relate-order-dialog"
    width="85%"
    :title="
      title ? title : orderNumType === 'saleOrder' ? '销售订单' : '生产订单'
    "
    :show-close="false"
    :visible.sync="saleOrderDialog"
    :before-close="dialogBack"
  >
    <section class="content">
      <div class="saleOrderContainer">
        <div v-if="false" class="searchbox">
          <div v-if="false" class="right-box level">
            <el-button plain size="mini" class="top-btn" @click="reset">
              重置
            </el-button>
            <el-button
              size="mini"
              type="primary"
              style="color: #ffffff"
              class="top-btn"
              @click="getOrderlist"
            >
              查询
            </el-button>
          </div>
        </div>
        <!-- 表格 -->
        <div class="table-info table-saleinfo">
          <el-table
            ref="listTable"
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{
              background: '#FAFAFA',
              color: '#000000',
              'font-family': 'Source Han Sans CN',
              'font-size': '14px'
            }"
            height="100%"
            highlight-current-row
            @row-click="rowClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column v-if="isMultiple" type="selection" width="55" />
            <template v-if="orderNumType === 'saleOrder'">
              <el-table-column
                v-for="(item, index) in DIALOG_SALES_TABLE"
                :key="index"
                :label="item.label"
                :prop="item.code"
                :width="item.width"
                :min-width="item.minWidth"
                :render-header="renderColumnHeader"
                show-overflow-tooltip
              >
                <template slot-scope="{ row }">
                  <div
                    v-if="item.code === 'approvalStatusName'"
                    class="state-column"
                  >
                    <div
                      class="left-radius"
                      :style="{
                        background: window.stateColor.getStateColor(
                          row.approvalStatusName
                        )
                      }"
                    />
                    <span>{{ row.approvalStatusName }}</span>
                  </div>
                  <div v-else-if="item.code === 'state'" class="state-column">
                    <div
                      class="left-radius"
                      :style="{
                        background: window.stateColor.getStateColor(
                          row.stateName
                        )
                      }"
                    />
                    <span>{{ row.stateName }}</span>
                  </div>
                  <span v-else-if="item.code === 'priority'">
                    {{
                      row.saleOrderMaterial
                        ? row.saleOrderMaterial.priority
                        : ''
                    }}
                  </span>
                  <span v-else-if="item.code === 'code'">
                    {{
                      row.saleOrderMaterial
                        ? row.saleOrderMaterial.materialCode
                        : ''
                    }}
                  </span>
                  <span v-else-if="item.code === 'name'">
                    {{
                      (row.saleOrderMaterial &&
                        row.saleOrderMaterial.materialFields &&
                        row.saleOrderMaterial.materialFields.name) ||
                        ''
                    }}
                  </span>
                  <!-- <span v-else>{{ row[item.code] }}</span> -->
                  <span v-else>{{
                    filterMaterialCode(item.code)
                      ? row.materialFields[getCode(item.code)]
                      : row[item.code]
                  }}</span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="orderNumType === 'workOrder'">
              <el-table-column
                v-for="(item, index) in WORK_ORDER"
                :key="index"
                :label="item.label"
                :prop="item.code"
                :width="item.width"
                :min-width="item.minWidth"
                :render-header="renderColumnHeader"
                show-overflow-tooltip
              >
                <template slot-scope="{ row }">
                  <div
                    v-if="item.code === 'approvalStatusName'"
                    class="state-column"
                  >
                    <div
                      class="left-radius"
                      :style="{
                        background: window.stateColor.getStateColor(
                          row.approvalStatusName
                        )
                      }"
                    />
                    <span>{{ row.approvalStatusName }}</span>
                  </div>
                  <div v-else-if="item.code === 'state'" class="state-column">
                    <div
                      class="left-radius"
                      :style="{
                        background: window.stateColor.getStateColor(
                          row.stateName
                        )
                      }"
                    />
                    <span>{{ row.stateName }}</span>
                  </div>
                  <div v-else-if="item.code === 'haveBom'">
                    {{ row.materialFields.haveBom ? '有' : '无' }}
                  </div>
                  <div v-else-if="item.code === 'haveCraft'">
                    {{ row.materialFields.haveCraft ? '有' : '无' }}
                  </div>

                  <span v-else>{{
                    filterMaterialCode(item.code)
                      ? row.materialFields[getCode(item.code)]
                      : row[item.code]
                  }}</span>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                v-for="(item, index) in PRODUCT_ORDER"
                :key="index"
                :label="item.label"
                :prop="item.code"
                :width="item.width"
                :min-width="item.minWidth"
                :render-header="renderColumnHeader"
                show-overflow-tooltip
              >
                <template slot-scope="{ row }">
                  <!-- <span v-if="item.code === 'orderProcedureFinishEntities'">{{
                    filterFlowSheet(row.orderProcedureFinishEntities)
                  }}</span> -->
                  <!-- 工序进度 -->
                  <div
                    v-if="item.code === 'orderProcedureFinishEntities'"
                    class="table-column-content"
                  >
                    <div class="table-progress">
                      <el-progress
                        class="progress-box"
                        :stroke-width="15"
                        :format="formatPercent(row)"
                        :percentage="setPercent(row) * 1"
                      />
                    </div>
                  </div>
                  <span
                    v-else-if="item.code === 'orderProcedureFinishEntities1'"
                  >{{ filterFlowSheet(row.orderProcedureFinishEntities) }}
                  </span>
                  <span
                    v-else-if="item.code === 'finishCount'"
                  >{{ row.finishCount || '0' }}
                  </span>
                  <div
                    v-else-if="item.code === 'approvalStatusName'"
                    class="state-column"
                  >
                    <div
                      class="left-radius"
                      :style="{
                        background: window.stateColor.getStateColor(
                          row.approvalStatusName
                        )
                      }"
                    />
                    <span>{{ row.approvalStatusName }}</span>
                  </div>
                  <div v-else-if="item.code === 'state'" class="state-column">
                    <div
                      class="left-radius"
                      :style="{
                        background: window.stateColor.getStateColor(
                          row.stateName
                        )
                      }"
                    />
                    <span>{{ row.stateName }}</span>
                  </div>
                  <div v-else-if="item.code === 'haveBom'">
                    {{ row.haveBom ? '有' : '无' }}
                  </div>
                  <div v-else-if="item.code === 'haveCraft'">
                    {{ row.haveCraft ? '有' : '无' }}
                  </div>
                  <!-- <span v-else>{{ row[item.code] }}</span> -->
                  <span v-else>{{
                    filterMaterialCode(item.code)
                      ? row.materialFields
                        ? row.materialFields[getCode(item.code)]
                        : ''
                      : row[item.code]
                  }}</span>
                </template>
              </el-table-column>
            </template>
            <el-table-column
              v-for="item in extendMaterialList"
              :key="item.id"
              :label="item.label"
              :prop="item.code"
              :width="item.width"
              :min-width="item.minWidth"
              :render-header="renderColumnHeader"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                {{
                  row.saleOrderMaterial
                    ? row.saleOrderMaterial.materialFields
                      ? row.saleOrderMaterial.materialFields[item.code]
                      : ''
                    : ''
                }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination3
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.current"
          :limit.sync="listQuery.size"
          @pagination="getOrderlist"
        />
      </div>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBack">取 消</el-button>
        <el-button type="primary" @click="saveSaleOrderDialog">确 定</el-button>
      </span>
      <!-- 刷新 -->
      <div class="refresh" @click="reset">
        <i class="el-icon-refresh-right" />
      </div>

      <!-- 采购需求，选择采购类型 -->
      <div v-if="showPurchaseModel" class="radio-group">
        <el-radio-group v-model="purchaseModel">
          <el-radio label="direct">直接采购</el-radio>
          <el-radio label="byTierOneBom">按一级BOM采购</el-radio>
          <el-radio label="byMultiLevelBom">按多级BOM采购(过滤生产品)</el-radio>
        </el-radio-group>
      </div>
    </section>
  </el-dialog>
</template>

<script>
import { selectUserList } from '@/api/base'
import { getProductOrderList } from '@/api/salesOrder'
import { getApprovalStatusList } from '@/api/procurement-management'
import { workorderList } from '@/api/workorder-model'
import Pagination3 from '@/components/Pagination3'
import { orderQuery } from '@/api/base'
import { WORK_ORDER as PRODUCT_ORDER } from '@/constant/productionOrder.js'
import { DIALOG_SALES_TABLE } from '@/constant/salesOrder.js'
import { WORK_ORDER } from '@/constant/workorder.js'
import { LIST as PRODUCT_LIST } from '@/constant/productOrderSearchList'
import { LIST as SALES_LIST } from '@/constant/searchSale'
import { LIST as WORK_LIST } from '@/constant/productionWorkorderSearchList.js'
import { getMaterialWordList } from '@/api/common.js'
import SearchBox from '@/components/SearchBox/index.vue'
import { v4 as uuidv4 } from 'uuid'
import { getOrderAllGrades } from '@/api/workorder-model'
import { productLineList } from '@/api/capacityList.js'
import { getWorkordersAllExecutionState } from '@/api/workorder-model'
import { lineTypeList } from '@/api/factory.js'
import { getSalesList } from '@/api/salesOrderModify'
export default {
  name: 'NewWebRelateorderdialog',
  components: { Pagination3, SearchBox },
  props: {
    saleOrderDialog: {
      type: Boolean,
      required: true
    },
    orderNumType: {
      type: String,
      required: true
    },
    isMultiple: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      }
    },
    state: {
      type: String,
      required: false,
      default: () => {
        return ''
      }
    },
    // 是否校验规则
    isValidRule: {
      type: Boolean,
      require: false,
      default: () => {
        return true
      }
    },
    title: {
      type: String,
      require: false,
      default: ''
    },
    // 不需要展示的字段，而该字段从后台获取
    extendColumnField: {
      type: Array,
      require: false,
      default: () => {
        return []
      }
    },
    showPurchaseModel: {
      type: Boolean,
      require: false,
      default: () => {
        return false
      }
    },
    isHomeWorkorder: {
      type: Boolean,
      require: false,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      window,
      code: 'workOrder',
      curSaleRow: null,
      tableData: [],
      listQuery: {
        customerName: '',
        orderNumber: '',
        orderMaterialCode: '',
        orderMaterialName: '',
        approver: '',
        approvalStatus: '',
        current: 1,
        size: 20,
        completionRate: '',
        relatedOrderNum: '',
        relatedRootOrderNum: '',
        saleOrderCode: ''
      },
      total: 0,
      approvealList: [],
      approvealStatusList: [],
      completionRateList: [],
      PRODUCT_ORDER,
      WORK_ORDER,
      DIALOG_SALES_TABLE,
      searchList: [],
      searchQuery: {
        isShow: false,
        params: {},
        column: {},
        searchCode: {}
      },
      isShowSearchBox: false,
      historyColumnProperty: '', // 上次点击保存的列
      multipleSelection: [],
      extendMaterialList: [], // 拓展物料字段
      extendSearchType: [], // 过滤类型
      materialFields: {},
      executionStatusList: [],
      purchaseModel: 'direct'
    }
  },
  created() {
    this.getWorkordersAllExecutionState()
    this.productLineList()
    this.getMaterialWord()
    const list = ['haveBom', 'productReserveNum']
    this.PRODUCT_ORDER = PRODUCT_ORDER.filter(item => {
      return !list.includes(item.code)
    })
  },
  mounted() {
    this.selectUserList()
    this.getApprovalStatusList()
    this.getOrderlist()

    const temp =
      this.orderNumType === 'productOrder'
        ? PRODUCT_LIST
        : this.orderNumType === 'saleOrder'
          ? SALES_LIST
          : WORK_LIST
    this.searchList = temp.filter(item => item.name !== 'state')
    if (this.orderNumType === 'productOrder') {
      this.getProductOrderList()
    }
    this.$nextTick(() => {
      this.$refs?.listTable?.doLayout()
    })
  },

  methods: {
    // 获取有启用字段全集
    async getMaterialWord() {
      const result = await getMaterialWordList()
      const { code, data = [], message } = result.data || {}
      if (+code === 200) {
        const list = data.filter(item => {
          return !this.extendColumnField.includes(item.fieldCode)
        })
        this.extendMaterialList = list.map(item => {
          return {
            id: uuidv4(),
            label: item.fieldName,
            code: item.fieldCode,
            width: null,
            showOverflowTooltip: false,
            type: null,
            fixed: null,
            minWidth: '140px',
            columnType: 'material',
            class: 'handle'
          }
        })
        this.extendSearchType = list.map(item => {
          return {
            name: item.fieldCode,
            type: item.fieldType
          }
        })
        this.$nextTick(() => {
          this.$refs?.listTable?.doLayout()
        })
        return true
      } else {
        this.$notify({
          title: '提示',
          message: message,
          type: 'warning',
          duration: 2000
        })
        return true
      }
    },

    filterMaterialCode(value) {
      if (!value) return
      const list = [
        'materialName',
        'materialDrawingNumber',
        'materialTypeName',
        'comp'
      ]
      return list.includes(value)
    },
    getCode(value) {
      if (!value) return
      const list = [
        {
          code: 'materialName',
          realCode: 'name'
        },
        {
          code: 'materialTypeName',
          realCode: 'typeName'
        },
        {
          code: 'comp',
          realCode: 'comp'
        }
      ]
      const result = list.find(item => item.code === value)
      if (result) {
        return result.realCode
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 过滤工序进度数据
    filterFlowSheet(orderProcedureFinishEntities) {
      if (orderProcedureFinishEntities && orderProcedureFinishEntities.length) {
        const str = orderProcedureFinishEntities.reduce((str, item) => {
          str += `${item.craftProcedureName}(${item.finishSum})-`
          return str
        }, '')
        return str.slice(0, -1)
      }
      return '--'
    },
    // 2.创建人审批人
    selectUserList() {
      selectUserList().then(res => {
        const { code, data } = res.data
        if (code === '200') {
          this.approvealList = (data || []).map(item => ({
            ...item,
            code: item.username,
            name: item.nickname
          }))
        }
      })
    },
    // 获取审批状态
    getApprovalStatusList() {
      getApprovalStatusList().then(res => {
        const { code, data } = res.data
        if (code === '200') {
          this.approvealStatusList = data || []
        }
      })
    },
    // 获取完成率
    async getProductOrderList() {
      const res = await getProductOrderList()
      const { code, data } = res.data
      if (code === '200') {
        this.completionRateList = data || []
      }
      return data
    },
    //  重置销售订单
    reset() {
      this.purchaseModel = 'direct'
      Object.keys(this.listQuery).forEach(el => {
        this.listQuery[el] = ''
      })
      this.listQuery = {
        customerName: '',
        orderNumber: '',
        orderMaterialCode: '',
        orderMaterialName: '',
        approver: '',
        approvalStatus: '',
        current: 1,
        size: 20,
        completionRate: '',
        relatedOrderNum: '',
        relatedRootOrderNum: '',
        saleOrderCode: ''
      }
      Object.keys(this.materialFields).forEach(el => {
        this.materialFields[el] = ''
      })
      this.getOrderlist()
    },
    // 获取销售订单列表
    getOrderlist() {
      if (this.orderNumType === 'workOrder') {
        const param = {
          ...this.listQuery,
          state: this.state,
          isAssignment: this.isHomeWorkorder ? true : null // 是否是作业工单isAssignment=true
          //   state: "2,3",
        }
        workorderList(param).then(res => {
          const { code, data, message } = res.data
          if (code === '200') {
            this.tableData = (data.records || []).map(i => ({
              ...i,
              saleOrderMaterial: { materialFields: i.materialFields }
            }))
            this.total = data.total
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
        })
      } else if (this.orderNumType === 'saleOrder') {
        const param = {
          ...this.listQuery,
          states: '2,3',
          showType: 'material'
        }
        // orderQuery(param).then(res => {
        getSalesList(param).then(res => {
          const { code, data, message } = res.data
          if (code === '200') {
            this.tableData = data.records || []
            this.total = data.total
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
        })
      } else {
        const param = {
          ...this.listQuery,
          states: '2,3'
          // orderNumType: this.orderNumType
        }
        orderQuery(param).then(res => {
          const { code, data, message } = res.data
          if (code === '200') {
            this.tableData = data.records?.map(item => {
              return {
                ...item,
                haveBom: item?.materialFields?.haveBom,
                haveCraft: item?.materialFields?.haveCraft,
                ...item?.productOrderMaterial?.materialFields,
                stateName: item?.stateName,
                approvalStatusName: item?.approvalStatusName,
                saleOrderMaterial: {
                  materialFields: item?.productOrderMaterial?.materialFields
                },
                materialFields: item?.productOrderMaterial?.materialFields,
                procedureProcessDetail:
                  item?.productOrderMaterial?.procedureProcessDetail,
                scheduledProductionQuantity:
                  item?.productOrderMaterial?.scheduledProductionQuantity,
                planQuantity: item?.productOrderMaterial?.planQuantity,
                progress: item?.productOrderMaterial?.progress,
                planProductStartTime:
                  item?.productOrderMaterial?.planProductStartTime,
                planProductEndTime:
                  item?.productOrderMaterial?.planProductEndTime,
                customerName: item?.customerName,
                requireGoodsDate: item?.productOrderMaterial?.requireGoodsDate,
                actualApprover: item?.actualApprover
              }
            })
            this.total = data.total
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
        })
      }
    },
    // 选中销售订单某一行表格
    rowClick(val) {
      this.curSaleRow = val
    },
    // 关闭销售订单弹窗
    dialogBack() {
      this.curSaleRow = null
      this.$emit('cancel')
      this.tableData = []
      this.total = 0
    },
    // 保存销售订单
    saveSaleOrderDialog() {
      if (this.isMultiple) {
        if (this.multipleSelection.length <= 0) {
          this.$notify({
            title: '提示',
            message: '请至少选择一条数据',
            type: 'warning',
            duration: 2000
          })
          return
        }
      } else {
        if (!this.curSaleRow) {
          this.$notify({
            title: '提示',
            message: '请选择一条数据',
            type: 'warning',
            duration: 2000
          })
          return
        }
      }
      if (
        !this.isMultiple &&
        this.orderNumType === 'saleOrder' &&
        this.curSaleRow.isProductOrder
      ) {
        // 生产工单页面使用逻辑
        // 选择销售订单时 校验一下所选择的销售订单有没有关联生产订单，若无则正常体现数据，若有则阻止提示“XXXX销售订单已有生产订单，不可直接关联生产工单”
        if (this.isValidRule) {
          this.$notify({
            title: '提示',
            message: `${this.curSaleRow.saleOrderNumber}销售订单已有生产订单，不可直接关联生产工单`,
            type: 'warning',
            duration: 2000
          })
          return
        }
      }

      this.$emit(
        'confirm',
        this.isMultiple ? this.multipleSelection : this.curSaleRow,
        this.purchaseModel || null // 采购需求，选择采购模式
      )
    },
    // 表头搜索start
    // 查看是否有过滤值
    isExistFilter(result, columnConfig) {
      if (!result) return ''
      let res
      if (columnConfig.columnType === 'material') {
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
    // 自定义表头
    renderColumnHeader(h, { column }) {
      const list =
        this.orderNumType === 'productOrder'
          ? PRODUCT_LIST
          : this.orderNumType === 'saleOrder'
            ? SALES_LIST
            : WORK_LIST
      const listSearch = list.concat(this.extendSearchType)
      const columnList =
        this.orderNumType === 'productOrder'
          ? PRODUCT_ORDER
          : this.orderNumType === 'saleOrder'
            ? DIALOG_SALES_TABLE
            : WORK_ORDER
      const configList = columnList.concat(this.extendMaterialList)
      const result = listSearch
        .filter(item => item.name !== 'state')
        .find(item => item.name === column.property)
      const columnConfig = configList.find(
        item => item.code === column.property
      )
      let svgIcon = '' // svg 图标
      let element = 'i' // dom 元素
      let renderContent = {}
      const { type } = result || {}
      // 是否有过滤值
      const activeCls = this.isExistFilter(result, columnConfig)
      // 根据类型的不同来展示不同的图标效果
      switch (type) {
        case 'input':
        case 'input-number':
        case 'textArea':
        case 'timeline':
        case 'filter':
        case 'datePicke':
        case 'switch':
          element = 'svg-icon'
          svgIcon = 'filter'
          renderContent = {
            props: {
              className: activeCls,
              iconClass: svgIcon
            }
          }
          break
      }
      const that = this
      return h('span', {}, [
        h('span', {}, column.label),
        h(
          'span',
          {
            class: 'sale-order-table-column-setting',
            style:
              'margin-left: 5px; font-size: 16px; cursor: pointer; position:relative',
            on: {
              click: function(e) {
                that.$nextTick(() => {
                  if (that.historyColumnProperty === column.property) {
                    that.isShowSearchBox = !that.isShowSearchBox
                  } else {
                    that.isShowSearchBox = true
                  }
                  that.handleFilter(column.property)
                  that.$set(that.searchQuery, 'isShow', true)
                  that.$set(that.searchQuery, 'params', e)
                  that.$set(that.searchQuery, 'column', column)
                  that.$set(that.searchQuery, 'queryList', that.listQuery)
                  that.$set(that.searchQuery, 'columnConfig', columnConfig) // 自定义的列配置
                  that.searchQuery['searchCode'] = result
                  that.historyColumnProperty = column.property
                })
              }
            }
          },
          [
            h(element, {
              ...renderContent
            })
          ]
        )
      ])
    },
    // 列搜索
    actionList(value) {
      this.listQuery = {
        ...this.listQuery,
        ...value
      }
      if ('materialFields' in value) {
        const { materialFields = {}} = value
        Object.keys(materialFields).forEach(key => {
          this.materialFields[key] = materialFields[key]
        })
        this.$set(this.listQuery, 'materialFields', this.materialFields)
      }
      this.isShowSearchBox = false
      this.getOrderlist()
    },
    clearList(value) {
      this.listQuery = {
        ...this.listQuery,
        ...value
      }
      if ('materialFields' in value) {
        const { materialFields = {}} = value
        Object.keys(materialFields).forEach(key => {
          this.materialFields[key] = materialFields[key]
        })
        this.$set(this.listQuery, 'materialFields', this.materialFields)
      }
    },
    // 处理下拉选择
    handleFilter(name) {
      console.log(name)
      this.$nextTick(() => {
        switch (name) {
          case 'approvalStatusName':
            this.$set(this.searchQuery, 'options', this.approvealStatusList)
            break
          case 'approverName':
            this.$set(this.searchQuery, 'options', this.approvealList)
            break
          case 'completionRate':
            this.$set(this.searchQuery, 'options', this.completionRateList)
            break
          case 'progress':
            new Promise(resolve => {
              const result = this.getProductOrderList()
              resolve(result)
            }).then(res => {
              this.$set(this.searchQuery, 'options', res)
            })

            break
          case 'priority':
            new Promise(resolve => {
              const list = this.getOrderAllGrades()
              resolve(list)
            }).then(res => {
              const result = []
              Object.keys(res).forEach(el => {
                result.push({ code: el, name: res[el] })
              })
              this.$set(this.searchQuery, 'options', result)
            })
            break
          case 'lineName':
            this.$set(
              this.searchQuery,
              'options',
              this.setListNameAndCode(this.lineList, 'name', 'productionLineId')
            )
            break
          case 'executionStatusName':
            this.$set(
              this.searchQuery,
              'options',
              this.setListNameAndCode(this.executionStatusList, 'name', 'type')
            )
            break
          case 'lineModelName':
            new Promise(resolve => {
              const result = this.getLineList()
              resolve(result)
            }).then(res => {
              this.$set(this.searchQuery, 'options', res)
            })
        }
      })
    },
    // 获取制造单元类型
    async getLineList() {
      const result = await lineTypeList()
      const { code, data = [] } = result.data
      if (+code === 200) {
        return data.map(item => {
          return {
            code: item.id,
            name: item.name
          }
        })
      }
      return []
    },
    getWorkordersAllExecutionState() {
      getWorkordersAllExecutionState().then(res => {
        if (res.data.code === '200') {
          this.executionStatusList = res.data.data
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || '获取工单执行数据失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 获取产线列表
    productLineList() {
      productLineList().then(res => {
        if (res.data.code === '200') {
          this.lineList = res.data.data.records
        }
      })
    },
    setListNameAndCode(list, key, value) {
      return list.map(item => ({
        ...item,
        name: item[key],
        code: item[value]
      }))
    },
    // 优先级
    async getOrderAllGrades() {
      const res = await getOrderAllGrades()
      if (res.data.code === '200') {
        return res.data.data
      }
      return []
    },
    // 搜索框关闭
    closeDialogSearch() {
      this.isShowSearchBox = false
    },
    // 滚动条滚动
    tableScrollEvent() {
      this.$nextTick(() => {
        const selectWrap = document.querySelector('.el-table__body-wrapper')
        const that = this
        selectWrap.addEventListener('scroll', function(e) {
          that.$nextTick(() => {
            //  横向滚动
            if (that.$refs?.listTable.bodyWrapper.scrollLeft > 0) {
              that.isShowSearchBox = false
            }
          })
        })
      })
    },
    // 工序进度进度条方法  可封装，复制来源src\views\intelligentCreation\production\productionOrderProgress\components\formatPercent.js
    formatPercent(data) {
      return function() {
        const { procedureProcess } = data
        if (!procedureProcess) return '0%'
        return `${(procedureProcess * 100).toFixed(1)}%`
      }
    },
    setPercent(data) {
      const { procedureProcess } = data
      if (!procedureProcess) return 0
      if (procedureProcess > 1) return 100
      return (procedureProcess * 100).toFixed(1)
    }
    // 表头搜索end
  }
}
</script>

<style lang="scss" scoped>
// 销售订单弹窗
.relate-order-dialog {
  ::v-deep .el-dialog__body {
    // height: 568px;
    // overflow: hidden;
    .el-table__body-wrapper::-webkit-scrollbar {
      height: 8px;
    }
  }
  .saleOrderContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    .searchbox {
      width: 100%;
      opacity: 1;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
      padding: 0 0 22px 0;
      display: flex;
      justify-content: space-between;

      .left-box {
        width: 1539px;
        flex-wrap: wrap;

        .input-box {
          height: 32px;
          margin: 22px 0 0 0;

          .input-top {
            width: 280px;
          }

          .input-name {
            display: flex;
            justify-content: flex-end;
            width: 90px;
            margin: 0 7px 0 0;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: medium;
            // color: rgba(0, 0, 0, 0.85);
            color: #333333;
            opacity: 1;
          }
        }
      }

      .right-box {
        margin: 22px 56px 0 0;

        .top-btn {
          height: 32px;
          color: rgba(0, 0, 0, 0.85);
        }

        .top-btn:hover {
          color: #409eff;
        }
      }
    }
    .table-info {
      // flex: 1 0 auto;
      // height: 0;
      padding-bottom: 68px;
      height: 450px;
    }
  }
}
.content {
  position: relative;
  .refresh {
    position: absolute;
    right: 0px;
    top: -50px;
    cursor: pointer;
    > i {
      font-size: 20px;
    }
  }
  .radio-group {
    position: absolute;
    top: -30px;
    right: 200px;
  }
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin: 12px 12px 0 0;
}
::v-deep .progress-box {
  display: flex;
  align-items: center;

  .el-progress__text {
    font-size: 12px !important;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(153, 153, 153, 0.85);
  }
}

.state-column {
  display: flex;
  align-items: center;
}
</style>

<style>
.search-col-active {
  color: #1890ff;
}
</style>
