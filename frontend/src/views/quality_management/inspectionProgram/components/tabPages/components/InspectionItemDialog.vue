<template>
  <el-dialog
    :title="title"
    class="material-dialog"
    :visible.sync="materialDialogVisible"
    width="70%"
    :append-to-body="true"
    :before-close="onCancel"
    :show-close="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="container1-3 inspection-plan-list">
      <ItemGroupTree ref="itemGroupTreeRef" @changeCheck="handleChangeGroupCheck" />

      <div class="material-dialog-content bg-box">
        <ElTableContent
          ref="listTable"
          v-loading="loading"
          :search="tableSearch"
          :list-query="listQuery"
          :table-data="tableData"
          :table-column="tableColumn"
          :action-width="0"
          :select-option="selectList"
          :request-config="requestConfig"
          :reserve-selection="false"
          modular-type="productInspectionProjectItem"
          column-permission-action="qms-product-inspection.inspection-manage.project:columnConfigList"
          @select="handleSelect"
          @select-all="handleSelectAll"
          @filterSearch="filterSearch"
          @makeNewRequest="makeNewRequest"
        >
          <template
            v-slot:export="{ special: { row } }"
          ><span>{{ row.export ? '是' : '否' }}</span></template>
        </ElTableContent>
        <div class="pagination-section">
          <div>
            <el-checkbox :indeterminate="indeterminate" :value="isAllSeleted" @change="isAllSeletedChange">
              筛选全选
            </el-checkbox>
            <span v-if="showSelection"> 已选{{ totalSelected }}条</span>
          </div>
          <el-pagination
            v-show="total > 0"
            layout="total,prev, pager, next,sizes"
            :total="total"
            :current-page.sync="listQuery.current"
            :page-size.sync="listQuery.size"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            @size-change="getAllListData"
            @current-change="getAllListData"
          />
        </div>
        <!-- 刷新 -->
        <div class="refresh" @click="reset">
          <i class="el-icon-refresh-right" />
        </div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer" style="margin-top: 10px">
      <slot name="footer">
        <el-button size="small" @click="onCancel"> 取消 </el-button>
        <el-button type="primary" size="small" :disabled="tableData.length <= 0" @click="onConfirm"> 确认 </el-button>
      </slot>
    </div>
  </el-dialog>
</template>
<script>
import {
  getCheckProjectList,
  getProjectGroupList,
  getProjectItemStateList,
  getMethodsList
} from '@/api/quality-manage.js'
import ElTableContent from './ElTableColumn'
import { v4 as uuidv4 } from 'uuid'
import ItemGroupTree from '@/views/quality_management/components/ItemGroupTree.vue'

const PRODUCT_INSPECTION_PROJECT = [
  // {
  //   id: uuidv4,
  //   label: '序号',
  //   code: 'index',
  //   width: '80',
  //   minWidth: null,
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  // },
  // {
  //   id: uuidv4,
  //   label: '检验项目组',
  //   code: 'groupName',
  //   width: '180',
  //   minWidth: null,
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
  //   parentFields: 'itemGroupEntity'
  // },
  {
    id: uuidv4,
    label: '检验项目',
    code: 'name',
    width: '180',
    minWidth: null,
    isSortBox: true,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '检验项目编码',
    code: 'code',
    width: '180',
    isSortBox: true,
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '状态',
    code: 'statusName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '检验标准',
    code: 'verificationBasis',
    width: '100',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '检验方法',
    code: 'verificationMethod',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '检验仪器',
    code: 'verificationInstrument',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '检验条件',
    code: 'inspectionCondition',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '分析方法',
    code: 'analyzeMethodCodeName',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },

  {
    id: uuidv4,
    label: '比较符',
    code: 'comparatorCodeName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '标准/参考值',
    code: 'referenceValue',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '上限值',
    code: 'upperLimitValue',
    width: '120',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '下限值',
    code: 'downLimitValue',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '输入方式',
    code: 'inputModeName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '备注',
    code: 'remark',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  {
    id: uuidv4,
    label: '抽样方案',
    code: 'samplePlanName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  },
  // {
  //   id: uuidv4,
  //   label: '单位',
  //   code: 'unit',
  //   width: '150',
  //   minWidth: null,
  //   showOverflowTooltip: true,
  //   type: null,
  //   fixed: null,
  //   columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  // },
  {
    id: uuidv4,
    label: '是否生成检验报告',
    code: 'export',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: '',
    special: true
  }
]
const PRODUCT_INSPECTION_PROJECT_LIST = [
  {
    name: 'groupName',
    type: 'filter',
    queryName: 'treeInspectionItemGroupIds'
  }, // 检验项目组
  { name: 'name', type: 'input', queryName: 'name' }, // 检验项目
  { name: 'code', type: 'input', queryName: 'code' }, // 检验项目编码
  { name: 'verificationBasis', type: 'input', queryName: 'verificationBasis' }, // 检验标准
  { name: 'verificationMethod', type: 'input', queryName: 'verificationMethod' }, // 检验方法
  { name: 'verificationInstrument', type: 'input', queryName: 'verificationInstrument' }, // 检验仪器
  { name: 'inspectionCondition', type: 'input', queryName: 'inspectionCondition' }, // 检验条件
  { name: 'analyzeMethodCodeName', type: 'filter', queryName: 'analyzeMethodCodes' }, // 分析方法
  { name: 'remark', type: 'input', queryName: 'remark' } // 备注

]
export default {
  name: 'MaterialScreenDialog',
  components: {
    ElTableContent,
    ItemGroupTree
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    materialDialogVisible: { type: Boolean, default: false },

    // 是否支持多选
    showSelection: {
      type: Boolean,
      require: false,
      default: true
    },
    transferValue: {
      type: Array,
      default: () => []
    },
    transferData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      window,
      tableColumn: PRODUCT_INSPECTION_PROJECT,
      tableSearch: PRODUCT_INSPECTION_PROJECT_LIST,
      selectList: [],
      tableData: [],
      loading: false,
      total: 20,
      listQuery: {
        statues: [1],
        current: 1,
        size: 20
      },
      approvealList: [], // 审批人
      isExistApproveBtn: false,
      code: 'productInspectionProject',
      requestConfig: {
        approval: 'productInspectionProject',
        approvalFields: ['approvalStatusName']
      },
      // 跨页多选
      allData: [],
      selectedIds: [], // 已选择的id数组
      selectedRows: [], // 已选行
      showTransferData: [],
      methodsList: [] // 检验方法判定
    }
  },
  computed: {
    // 所有数据的id数组
    allDataIds() {
      const res = this.allData.map(item => item.id)
      // console.log(res)
      return res
    },
    // 是否为半选状态:当selectedIds存在且selectedIds小于全部的数据id时，应为半选状态
    indeterminate() {
      const res = !!(this.selectedIds.length && this.selectedIds.length < this.allDataIds.length)
      return res
    },
    // 是否为全选状态:当selectedIds存在且selectedIds等于全部的数据id时，应为全选状态
    isAllSeleted() {
      const res = !!(this.selectedIds.length && this.selectedIds.length === this.allDataIds.length)
      return res
    },
    //
    totalSelected() {
      return this.selectedIds.length
    }
  },
  watch: {
    materialDialogVisible: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.init()
        }
      }
    },
    transferData: {
      handler(val) {
        if (val && val.length !== 0) {
          this.showTransferData = val.map(item => {
            return {
              ...item,
              id: item.itemId
            }
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getMethodsList()
  },
  methods: {
    // 获取(检验)方法数据列表
    async getMethodsList() {
      const result = await getMethodsList()
      const { data } = result.data || {}
      this.methodsList = data || []
    },
    handleChangeGroupCheck(groupIds) {
      if (groupIds) {
        this.listQuery.treeInspectionItemGroupIds = groupIds.join(',')
      } else {
        this.listQuery.treeInspectionItemGroupIds = ''
      }
      this.getAllListData()
    },
    init() {
      console.log('this.transferValue', this.transferValue)
      this.selectedIds = [...this.transferValue]
      this.getAllListData()
      this.getProjectGroupList()
    },
    // 跨页多选逻辑------------------------------------------------
    // 单行选项变化
    handleSelect(multipleSelection, row) {
      if (multipleSelection.some(item => item.id === row.id)) {
        // 选中
        // 加入跨页的selectedIds
        this.selectedIds.push(row.id)
        // this.selectedRows.push(row)
        this.showTransferData.push(row)
      } else {
        // 取消选中
        // 过滤出非取消选中行的ids
        this.selectedIds = this.selectedIds.filter(id => id !== row.id)
        // this.selectedRows = this.selectedRows.filter(id => id !== row.id)
        const hasIndex = this.showTransferData.findIndex(i => i.id === row.id)
        if (hasIndex !== -1) {
          this.showTransferData.splice(hasIndex, 1)
        }
      }
      this.selectedRows = multipleSelection
    },
    handleSelectAll(multipleSelection) {
      this.selectedRows = multipleSelection
      /*  this.selectedIds = multipleSelection.map(i => i.id) */
      if (multipleSelection.length !== 0) {
        const idData = multipleSelection
          .filter(selected => {
            return !this.selectedIds.includes(selected.id)
          })
          .map(i => i.id)
        this.selectedIds.push(...idData)

        const data = multipleSelection.filter(selected => {
          return !this.showTransferData.some(item => item.id === selected.id)
        })
        this.showTransferData.push(...data)
      } else if (multipleSelection.length === 0) {
        this.selectedIds = this.selectedIds.filter(id => {
          return !this.tableData.some(item => item.id === id)
        })

        this.showTransferData = this.showTransferData.filter(selected => {
          return !this.tableData.some(item => item.id === selected.id)
        })
      }
      console.log(this.selectedIds)
    },
    isAllSeletedChange(val) {
      // console.log(val)
      if (val) {
        this.selectedIds = [...this.allDataIds]
      } else {
        this.selectedIds = []
        this.selectedRows = []
      }
      // 设置选中状态
      this.setSeletedData(this.tableData)
    },
    /*
    回显表格数据（用于请求完tableData/跨页反选全选切换）
    参数data：请求成功的table数据
    */
    setSeletedData(data = []) {
      this.$nextTick(() => {
        const dataArr = []
        // this.$refs.listTable.clearSelection()
        data.forEach(row => {
          const isSelected = this.selectedIds.includes(row.id)
          // console.log(isSelected)
          // 当前数据为被选中状态
          if (isSelected) {
            dataArr.push(row)
          }
          this.$refs.listTable.toggleRowSelection(row, isSelected)
          this.selectedRows = dataArr
        })
      })
    },

    reset() {
      Object.keys(this.listQuery).forEach(el => {
        this.listQuery[el] = ''
      })
      this.listQuery = {
        ...this.listQuery,
        sortList: undefined,
        statues: [1],
        current: 1,
        size: 20
      }
      this.getAllListData()
      this.$refs.itemGroupTreeRef.resetAllSelect()
    },

    async getAllListData() {
      this.getNoPageData() // 同时更新不分页的数据
      this.loading = true
      const result = await getCheckProjectList({
        ...this.listQuery
      })
      const { data } = result.data || {}
      this.loading = false
      this.tableData = data?.records || []
      this.tableData = this.tableData.map(item => {
        return {
          ...item,
          samplePlanName: item.samplePlanEntity?.name
        }
      })
      this.total = data.total
      this.setSeletedData(this.tableData)
    },
    async getNoPageData() {
      const result = await getCheckProjectList({
        ...this.listQuery,
        current: 1,
        size: 9999
      })
      const { data } = result.data || {}
      this.allData = data?.records || []
    },

    // 处理下拉选择
    filterSearch(name) {
      switch (name) {
        case 'statusName':
          new Promise(resolve => {
            const result = this.getProjectItemStateList()
            resolve(result)
          }).then(res => {
            this.selectList = res
          })
          break
        case 'groupName':
          this.selectList = this.groupList.map(item => {
            return {
              code: item.id,
              name: item.groupName
            }
          })
          break
        case 'analyzeMethodCodeName':
          this.selectList = this.methodsList.map(item => {
            return {
              code: item.code,
              name: item.name
            }
          })
          break
      }
    },
    // 获取状态列表
    async getProjectItemStateList() {
      const res = await getProjectItemStateList()
      const { data } = res.data || {}
      return data
    },
    // 获取检验项目组数据列表
    async getProjectGroupList() {
      const result = await getProjectGroupList()
      const { data } = result.data || {}
      this.groupList = data.records || {}
    },
    // 接收表格筛选的数据，并请求
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        this.listQuery[el] = val[el]
      })
      this.getAllListData()
    },
    onCancel() {
      this.$emit('cancel')
    },
    onConfirm() {
      this.$emit('confirm', this.selectedIds, this.showTransferData, this.selectedRows)
    }
  }
}
</script>

<style lang="scss" scoped>
.material-dialog {
  ::v-deep .el-dialog {
    position: relative;
    .search-col-active {
      color: #1890ff;
    }
  }
  .material-dialog-content {
    height: 500px;
    width: 100%;
    // display: flex;
    // flex-direction: column;
    ::v-deep thead.has-gutter label.el-checkbox {
      display: inline-block !important;
    }
    .pagination-section {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }
    // .dialog-footer {
    //   display: flex;
    //   justify-content: center;
    // }
  }
}

.materialPrice {
  padding-bottom: 29px;
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
.inspection-plan-list {
  height: 91%;
  display: flex;
  padding: 0;
  border: 1px solid #f1f1f1;
  .content-left-box {
    width: 220px;
    // width: 319px;
    // height: 100%;
    height: 500px;
    background: #ffffff;
    margin-right: 12px;
    padding: 10px 12px 20px 0;
  }
  .bg-box {
    flex: 1 0 auto;
    width: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    .table-top {
      .addbox {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 0px;
      }
    }

    .tablebox {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      //padding: 16px;
      flex: 1 0 auto;
      height: 0;
    }
    .pagination-box {
      position: relative;
      height: 68px;
    }
  }
}
</style>
