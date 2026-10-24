<template>
  <div>
    <el-button
      v-if="type !== 'detail'"
      :disabled="initStatus === 1"
      class="add-btn"
      type="primary"
      size="small"
      @click="hdcustomer"
    >选择工序</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{
        background: '#F3F3F3',
        color: 'rgba(0, 0, 0, 0.85)',
        height: '48px'
      }"
      max-height="400"
      highlight-current-row
    >
      <el-table-column type="index" label="序号" />
      <el-table-column prop="processProcedureCode" label="工序编号" />
      <el-table-column prop="processProcedureName" label="工序名称" />

      <el-table-column
        v-if="type !== 'detail' && initStatus != 1"
        label="操作"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <div class="delete-text" @click="handleDelete(row, $index)">删除</div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="showDialog"
      title="关联工序选择"
      class="dialog"
      :append-to-body="true"
      :visible.sync="showDialog"
      width="70%"
      :show-close="false"
    >
      <CommonRadioGroup class="CommonRadioGroup" :tab-value.sync="tabValue" :radio-list="radioList" @click="handleClick" />
      <el-tabs v-model="tabValue" class="noShowHeader">
        <el-tab-pane :label="radioList[0].label" :name="radioList[0].value">
          <ElTableContent
            ref="elTableontentRef"
            max-height="400"
            :action-width="0"
            :search="tableSearch"
            :table-data="customerListOptions"
            :table-column="tableColumn"
            :list-query="listQuery"
            :request-config="requestConfig"
            row-key="procedureId"
            :select-option="tableData"
            @selectionChange="handleSelectionChange"
            @filterSearch="filterSearch"
            @makeNewRequest="makeNewRequest"
          />
          <pagination3
            v-show="total > 0"
            style="position: static"
            :total="total"
            :page.sync="listQuery.current"
            :limit.sync="listQuery.size"
            @pagination="getCustomerList"
          />

          <!-- 刷新 -->
          <div class="refresh" @click="reset">
            <i class="el-icon-refresh-right" />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="radioList[1].label" :name="radioList[1].value">
          <!--
          <el-select
            v-model="materialCode"
            placeholder="请选择物料"
            size="mini"
            style="width: 248px;margin-bottom: 10px"
            @change="changeMaterialCode"
          >
            <el-option
              v-for="(item, index) in materialList"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
          -->

          <y-complexSelect2
            v-model="materialCode"
            style="width: 248px;margin-bottom: 10px"
            :disabled="isDetailType"
            @btnClickCallback="showMaterialDialog = true"
            @selectChange="
              (e, options) => changeMaterialCode(e, options)
            "
          />
          <!--<span v-if="materialCode===''">请先选择物料编码</span>-->

          <ElTableContent
            ref="elTableontentRef2"
            max-height="400"
            :action-width="0"
            :search="tableSearch2"
            :table-data="customerListOptions2"
            :table-column="tableColumn2"
            :list-query="listQuery2"
            :request-config="requestConfig"
            row-key="procedureId"
            :select-option="tableData"
            @selectionChange="handleSelectionChange"
            @filterSearch="filterSearch"
            @makeNewRequest="getCustomerListByMaterial"
          />
          <pagination3
            v-show="total2 > 0"
            style="position: static"
            :total="total2"
            :page.sync="listQuery2.current"
            :limit.sync="listQuery2.size"
            @pagination="getCustomerListByMaterial"
          />

          <!-- 刷新 -->
          <div class="refresh2" @click="reset2">
            <i class="el-icon-refresh-right" />
          </div>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel"> 取消 </el-button>
        <el-button type="primary" size="small" @click="hdConfirm"> 确认 </el-button>
      </div>

    </el-dialog>

    <!-- 物料查询 -->
    <material-dialog
      v-if="showMaterialDialog"
      :material-dialog-visible="showMaterialDialog"
      title="物料选择"
      :product-material-code="productOrderForm.productCode"
      :sort-product="sortProduct"
      @cancel="cancelSelectMaterial"
      @confirm="confirmSelectMaterial"
    />
  </div>
</template>
<script>
import CommonRadioGroup from '@/components/CommonRadioGroup/index.vue'
import MaterialDialog from '@/components/MaterialDialog/index.vue'
import Pagination3 from '@/components/Pagination3'
import { technologyroute, schemesCraftByMaterial, productList } from '@/api/quality-manage'
import { getCustomerList, deleteSchemeCustomer } from '@/api/quality-manage'
import { v4 as uuidv4 } from 'uuid'
import ElTableContent from '@/components/ElTableColumn'
const table = [
  {
    id: uuidv4(),
    label: '工序编号',
    code: 'procedureCode',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '工序名称',
    code: 'name',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]
const LIST = [
  { name: 'name', type: 'input' },
  { name: 'procedureCode', type: 'input', queryName: 'code' }
]
const table2 = [
  {
    id: uuidv4(),
    label: '工序编号',
    code: 'procedureCode',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4(),
    label: '工序名称',
    code: 'procedureName',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  }
]
// const LIST2 = [
//   { name: 'procedureName', type: 'input' },
//   { name: 'procedureCode', type: 'input', queryName: 'code' }
// ]
export default {
  components: {
    ElTableContent,
    Pagination3,
    CommonRadioGroup,
    MaterialDialog
  },
  props: {
    initStatus: {
      type: Number,
      default: 0
    },
    customerData: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    formInline: {
      type: Object,
      default: () => ({})
    },
    forbidClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      customerListOptions: [], // 客户列表
      showDialog: false, // 弹窗
      mutipleSelection: [], // 多选
      tableData: [], // 客户数据
      tableColumn: table, // 弹窗表格列
      tableSearch: LIST, // 弹窗表格搜索
      listQuery: {
        size: 20,
        current: 1
      },
      total: 0,
      requestConfig: {
        isMaterial: false
      },
      tabValue: 'all',
      materialCode: '',
      // 按物料搜索条件
      showMaterialDialog: false,
      // 物料
      productOrderForm: {
        productCode: ''
      },
      sortProduct: 'product',

      tableColumn2: table2, // 弹窗表格列
      tableSearch2: [], // 弹窗表格搜索
      // tableSearch2: LIST2, // 弹窗表格搜索
      listQuery2: {
        size: 20,
        current: 1
      },
      total2: 0,
      customerListOptions2: [] // 按物料列表

    }
  },
  computed: {
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    },
    isDetailType() {
      return this.$route.name.includes('Detail')
    },
    radioList() {
      const list = [
        { label: '全部工序', value: 'all' },
        { label: '按物料选择', value: 'byMaterial' }
      ]
      return list
    }
  },
  watch: {
    customerData: {
      handler(val) {
        this.tableData = val
      },
      deep: true
    }
  },
  mounted() {
    this.getCustomerList()
    // this.getCustomerListByMaterial()
    // this.getProductList()
  },
  methods: {
    // 回显
    async reShowRow() {
      // 回显选中
      let timer = setTimeout(() => {
        if (!this.$refs['elTableontentRef'] || !this.$refs['elTableontentRef'].$refs['listTable']) {
          clearTimeout(timer)
          timer = null
          return
        }
        this.customerListOptions.forEach(row => {
          const hasIndex = this.tableData.findIndex(i => {
            return i.processProcedureId === row.procedureId
            // return i.customerId === row.customerId
          })
          if (hasIndex !== -1) {
            this.$refs['elTableontentRef'].$refs['listTable'].toggleRowSelection(row, true)
          }
        })
        clearTimeout(timer)
        timer = null
      }, 500)
    },
    resetListQuery() {
      this.listQuery = {
        size: 20,
        current: 1
      }
    },
    resetListQuery2() {
      this.listQuery2 = {
        size: 20,
        current: 1
      }
    },
    reset() {
      this.resetListQuery()
      this.getCustomerList()
    },
    reset2() {
      this.resetListQuery2()
      this.getCustomerListByMaterial()
    },
    cancel() {
      this.showDialog = false
      this.resetListQuery()
      this.resetListQuery2()
      // 清空物料编码
      this.materialCode = ''
      this.tabValue = 'all'
    },
    cancel2() {
      this.showDialog = false
      this.resetListQuery2()
    },
    makeNewRequest(params) {
      console.log('makeNewRequest -> ', params)
      this.getCustomerList(params)
    },
    filterSearch(val) {
      console.log('filterSearch -> ', val)
    },
    // 弹窗多选
    handleSelectionChange(val) {
      console.log('handleSelectionChange -> ', val)
      this.mutipleSelection = val
    },
    // 弹窗确认
    hdConfirm() {
      this.showDialog = false
      // 清空物料编码
      this.materialCode = ''
      this.tabValue = 'all'

      console.log('hdConfirm -> ', this.mutipleSelection)
      // 过滤数据
      let data = this.mutipleSelection.filter(item => {
        const hasIndex = this.tableData.findIndex(i => {
          return (
            (i.processProcedureId === item.procedureId && i.isOriginal) || i.processProcedureId === item.procedureId
          )
          // return (i.customerId === item.customerId && i.isOriginal) || i.customerId === item.customerId
        })
        if (hasIndex !== -1) {
          return false
        }
        return true
      })
      console.log('弹窗确认 data', data)
      data = data.map(items => {
        return {
          processProcedureCode: items.procedureCode,
          processProcedureName: items.name || items.procedureName,
          processProcedureId: items.procedureId
        }
      })
      console.log('弹窗确认 后后 data', data)

      this.tableData.push(...data)
      console.log('弹窗确认 this.tableData', this.tableData)

      this.resetListQuery()
      this.resetListQuery2()
    },
    // 删除关联客户
    handleDelete(row, index) {
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // if (row.id && row.isOriginal) {
          //   await deleteSchemeCustomer(this.formInline.schemeId, [row.id])
          // }
          this.tableData.splice(index, 1)
        })
        .catch(() => {
          return
        })
    },
    // 新增关联客户
    hdcustomer() {
      this.showDialog = true
      this.reShowRow()
    },
    // 获取客户列表
    getCustomerList(params) {
      const data = {
        state: 4,
        ...this.listQuery
      }
      technologyroute(data).then(res => {
        if (res.data.code === '200') {
          this.customerListOptions = res.data && res.data.data ? res.data.data.records : []
          this.total = res.data.data.total
          this.reShowRow() // 回显
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || '获取工序列表失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 检验方案查询工序-按照物料
    getCustomerListByMaterial(params) {
      const data = {
        ...this.listQuery2,
        materialCode: this.materialCode
        // materialCode: '92559A001'
      }
      schemesCraftByMaterial(data).then(res => {
        console.log('检验方案查询工序-按照物料', res)

        if (+res.data.status === 1) {
          this.customerListOptions2 = res.data && res.data.data ? res.data.data.records : []
          // 处理格式问题
          // this.customerListOptions2 = this.customerListOptions.map(item => {
          //   return {
          //     ...item,
          //     name: item.procedureName
          //   }
          // })
          this.total2 = res.data.data.total
          console.log('检验方案查询工序-按照物料 222', this.customerListOptions2)
          this.reShowRow() // 回显
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message || '按照物料获取工序列表失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 数据回显
    handleEcho(data) {
      this.tableData = data.map(item => {
        return {
          ...item,
          isOriginal: true
        }
      })
    },
    // 物料列表数据
    getProductList() {
      const params = {
        current: 1,
        isShowBomInfo: true,
        size: 20
      }

      productList(params).then(res => {
        if (res.data.code === '200') {
          this.materialList = res.data && res.data.data ? res.data.data.records : []
        }
      })
    },
    // 修改物料编码时
    changeMaterialCode(val, options) {
      // console.log('修改物料编码时 val', val)
      // console.log('修改物料编码时 options', options)

      if (val) {
        // const hasItem = options.find(el => el.code === val)
        // console.log('修改物料编码时 hasItem', hasItem)
        this.materialCode = val
      } else {
        this.materialCode = ''
      }
      this.getCustomerListByMaterial()
    },
    // 切换tabs
    handleClick(tab) {
      // console.log('切换tab', tab)
      // console.log('切换tab tabValue', this.tabValue)
      // 需要将分页重置
      this.resetListQuery()
      this.resetListQuery2()

      if (this.tabValue === 'all') {
        this.getCustomerList()
      } else if (this.tabValue === 'byMaterial') {
        this.getCustomerListByMaterial()
      }
    },
    // 关闭物料查询弹窗
    cancelSelectMaterial() {
      this.showMaterialDialog = false
    },
    // 搜索弹窗确认
    confirmSelectMaterial(row) {
      console.log('搜索弹窗确认 13', row)
      this.materialCode = row.code
      console.log('搜索弹窗确认 materialCode', this.materialCode)
      this.getCustomerListByMaterial()
      this.cancelSelectMaterial()
    }
  }
}
</script>
<style lang="scss" scoped>
.add-btn {
  margin-bottom: 15px;
}
.delete-text {
  color: #ff4618;
  cursor: pointer;
}
.refresh {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  > i {
    font-size: 20px;
  }
}

.refresh2 {
  position: absolute;
  right: 20px;
  top: 60px;
  cursor: pointer;
  > i {
    font-size: 20px;
  }
}

.dialog {
  &:deep(.el-dialog__body) {
    padding-bottom: 0 !important;
  }
}
::v-deep .noShowHeader > .el-tabs__header {
  display: none;
}
</style>
