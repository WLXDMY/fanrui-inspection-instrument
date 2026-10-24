<template>
  <!-- 采购订单弹窗 -->
  <el-dialog
    class="relate-order-dialog"
    width="85%"
    title="采购订单"
    :show-close="false"
    :visible.sync="saleOrderDialog"
    :before-close="dialogBack"
  >
    <section class="content">
      <div class="saleOrderContainer">

        <!-- 表格 -->
        <div class="table-info table-saleinfo">
          <el-table
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
            <el-table-column
              v-for="(item, index) in PROCEDURE"
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
                      background: window.stateColor.getStateColor(row.stateName)
                    }"
                  />
                  <span>{{ row.stateName }}</span>
                </div>
                <!-- 采购订单类型 -->
                <template v-else-if="item.code === 'purchaseType'">
                  <span> {{ row.purchaseTypeName }}</span>
                </template>
                <!-- 贸易条件 -->
                <template v-else-if="item.code === 'tradeId'">
                  <span> {{ row.tradeId | getTradeName(tradeOptions) }}</span>
                </template>
                <!-- 运输条件 -->
                <template v-else-if="item.code === 'collectId'">
                  <span>
                    {{ row.collectId | getCollectName(collectOptions) }}</span>
                </template>
                <!-- 付款条件 -->
                <template v-else-if="item.code === 'payId'">
                  <span> {{ row.payId | getPayName(payOptions) }}</span>
                </template>
                <span v-else>
                  <template v-if="item.columnType === 'material'">{{
                    row.materialFields
                      ? row.materialFields[getCode(item.code)]
                      : ''
                  }}</template>
                  <template v-if="item.columnType !== 'material'">{{
                    row[item.code]
                  }}</template>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination3
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.size"
          @pagination="getPurchasesList"
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
    </section>
  </el-dialog>
</template>

<script>
import { getPurchasesList } from '@/api/procurement-management'
import Pagination3 from '@/components/Pagination3'
import { PROCEDURE } from '@/constant/purchasingOrder.js'
import { LIST as PURCHASING_ORDER_LIST } from '@/constant/purchasingOrderSearchList.js'
import { getTermsList } from '@/api/procurement-management'
import SearchBox from '@/components/SearchBox/index.vue'

export default {
  name: 'NewWebRelateorderdialog',
  components: { Pagination3, SearchBox },
  filters: {
    getPurchaseType: function(val) {
      if (val === 0) {
        return '正常采购'
      } else if (val === 1) {
        return '临时采购'
      }
      return ''
    },
    // getUserName: function (val, userOptions) {
    //   if (val) {
    //     return userOptions.filter((user) => user.id === val)[0]?.nickname || "";
    //   }
    //   return "";
    // },
    getTradeName: function(val, tradeOptions) {
      if (val) {
        return tradeOptions.filter(trade => trade.id === val)[0]?.name || ''
      }
      return ''
    },
    getCollectName: function(val, getCollectName) {
      if (val) {
        return (
          getCollectName.filter(collect => collect.id === val)[0]?.name || ''
        )
      }
      return ''
    },
    getPayName: function(val, payOptions) {
      if (val) {
        return payOptions.filter(pay => pay.id === val)[0]?.name || ''
      }
      return ''
    }
  },
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
    }
  },
  data() {
    return {
      window,
      code: 'workOrder',
      curSaleRow: null,
      tableData: [],
      listQuery: {
        currentPage: 1,
        size: 20
      },
      total: 0,
      PROCEDURE,
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
      tradeOptions: [],
      collectOptions: [],
      payOptions: []
    }
  },
  created() {
    this.getAllPromise()
  },
  mounted() {
    this.getPurchasesList()
    this.searchList = PURCHASING_ORDER_LIST
  },

  methods: {
    getCode(value) {
      if (!value) return
      const list = [
        {
          code: 'materialCode',
          realCode: 'code'
        },
        {
          code: 'materialName',
          realCode: 'name'
        }
      ]
      const result = list.find(item => item.code === value)
      if (result) {
        return result.realCode
      }
    },
    // 获取数据
    getAllPromise() {
      Promise.all([
        getTermsList({ type: 'tradeAgreement' }),
        getTermsList({ type: 'transportAgreement' }),
        getTermsList({ type: 'paymentAgreement' })
      ]).then(resArr => {
        const [r2, r3, r4] = resArr
        if (resArr.every(res => res?.data?.code === '200')) {
          this.tradeOptions = r2?.data?.data?.records
          this.collectOptions = r3?.data?.data?.records
          this.payOptions = r4?.data?.data?.records
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //  重置销售订单
    reset() {
      this.listQuery = {
        currentPage: 1,
        size: 20
      }
      this.getPurchasesList()
    },
    //   获取采购需求单号
    getPurchasesList() {
      const materialFields = {
        code: this.listQuery.materialCode,
        name: this.listQuery.materialName
      }
      const param = {
        state: '2,3',
        ...this.listQuery,
        materialFields
      }
      try {
        delete param.materialCode
        delete param.materialName
      } catch (err) {
        //
      }
      getPurchasesList(param).then(res => {
        const { code, data = {}, message } = res.data
        if (code === '200') {
          const { records = [] } = data
          this.tableData = records.map(item => {
            const { requestMaterialEntities } = item
            if (requestMaterialEntities && requestMaterialEntities.length) {
              return {
                ...item,
                receiptQuantity:
                  item.requestMaterialEntities[0]?.receiptQuantity || 0,
                inventoryQuantity:
                  item.requestMaterialEntities[0]?.inventoryQuantity,
                qualifiedQuantity:
                  item.requestMaterialEntities[0]?.qualifiedQuantity,
                unqualifiedQuantity:
                  item.requestMaterialEntities[0]?.unqualifiedQuantity
              }
            } else {
              return {
                ...item,
                receiptQuantity: 0,
                inventoryQuantity: 0,
                qualifiedQuantity: 0,
                unqualifiedQuantity: 0
              }
            }
          })
          this.total = data.total
        } else {
          this.$notify({
            title: '提示',
            message: message,
            type: 'error',
            duration: 2000
          })
        }
      })
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
          return this.$notify({
            title: '提示',
            message: '请至少选择一条数据',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        if (!this.curSaleRow) {
          return this.$notify({
            title: '提示',
            message: '请选择一条数据',
            type: 'warning',
            duration: 2000
          })
        }
      }
      this.$emit(
        'confirm',
        this.isMultiple ? this.multipleSelection : this.curSaleRow
      )
    },
    // 表头搜索start
    // 查看是否有过滤值
    isExistFilter(result) {
      if (!result) return ''
      let res = this.listQuery[result.name]
      if (Array.isArray(result.queryTip)) {
        res = this.listQuery[result.queryTip[0]]
      } else if (result.queryName) {
        res = this.listQuery[result.queryName]
      }
      return res ? 'search-col-active' : ''
    },
    // 自定义表头
    renderColumnHeader(h, { column }) {
      const result = PURCHASING_ORDER_LIST.find(
        item => item.name === column.property
      )
      let svgIcon = '' // svg 图标
      let element = 'i' // dom 元素
      let renderContent = {}
      const { type } = result || {}
      // 是否有过滤值
      const activeCls = this.isExistFilter(result)
      // 根据类型的不同来展示不同的图标效果
      switch (type) {
        case 'input':
        case 'timeline':
        case 'filter':
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
      return h('div', { style: 'cell-content' }, [
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
      this.isShowSearchBox = false
      this.getPurchasesList()
    },
    clearList(value) {
      this.listQuery = {
        ...this.listQuery,
        ...value
      }
    },
    // 处理下拉选择
    handleFilter(name) {
      switch (name) {
        case 'state':
          this.$set(this.searchQuery, 'options', [
            { code: 2, name: '生效' },
            { code: 3, name: '完成' }
          ])
          break
      }
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
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      margin: 12px 12px 0 0;
    }
    .state-column{
      display: flex;
      align-items: center;
    }
  }
}
</style>

<style>
.search-col-active {
  color: #1890ff;
}
.cell-content {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
}
</style>
