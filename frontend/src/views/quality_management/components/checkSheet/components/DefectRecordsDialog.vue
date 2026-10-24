<template>
  <el-dialog
    :title="title"
    class="material-dialog"
    :visible.sync="visible"
    width="70%"
    :before-close="onCancel"
    :show-close="false"
    v-bind="$attrs"
    v-on="$listeners"
  >

    <div class="material-dialog-content">
      <el-table
        ref="listTable"
        :data="originAllData"
        style="width: 100%"
        height="100%"
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column type="index" />
        <!-- <el-table-column prop="defectDefineId" label="id" /> -->
        <el-table-column prop="defectTypeName" label="不良类型" />
        <el-table-column prop="defectName" label="不良名称" />
      </el-table>
      <!-- <ElTableContent
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
        row-key="defectDefineId"
        modular-type="productInspectionProject"
        column-permission-action="product.inspection.project:columnConfigList"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @filterSearch="filterSearch"
        @makeNewRequest="makeNewRequest"
      /> -->
      <div class="pagination-section">
        <div>
          <!-- <el-checkbox :indeterminate="indeterminate" :value="isAllSeleted" @change="isAllSeletedChange">筛选全选</el-checkbox> -->
          <span v-if="showSelection"> 已选{{ totalSelected }}条</span>
        </div>
        <!-- <el-pagination
          v-show="total > 0"
          layout="total,prev, pager, next,sizes"
          :total="total"
          :current-page.sync="listQuery.current"
          :page-size.sync="listQuery.size"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          @size-change="getAllListData"
          @current-change="getAllListData"
        /> -->
      </div>
      <!-- 刷新 -->
      <!-- <div class="refresh" @click="reset">
        <i class="el-icon-refresh-right" />
      </div> -->
    </div>

    <div slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button size="small" @click="onCancel">
          取消
        </el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="originAllData.length <= 0"
          @click="onConfirm"
        >
          确认
        </el-button>
      </slot>
    </div>
  </el-dialog>
</template>
<script>
import {
  getCheckProjectList,
  getProjectGroupList,
  deleteProjectItem,
  downloadDataList,
  getProjectItemStateList
  // checkProjectSelectList
} from '@/api/quality-manage.js'
import Pagination3 from '@/components/Pagination3'
import {
//   PRODUCT_INSPECTION_PROJECT,
// PRODUCT_INSPECTION_PROJECT_LIST
} from '@/constant/productInspectionProject.js'
// import ElTableContent from './ElTableColumn'
import { saveAs } from 'file-saver'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
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
  {
    id: uuidv4,
    label: '检验项目组',
    code: 'inspectionItemGroupName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '检验项目',
    code: 'inspectionItemName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '状态',
    code: 'stateName',
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
    label: '检验方法判定',
    code: 'determinationOfDetectionMethodName',
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
    label: '单位',
    code: 'unit',
    width: '150',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '比较符',
    code: 'comparatorName',
    width: '180',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '' // 字段类型（判断是否是需要特殊取值的字段）
  },
  {
    id: uuidv4,
    label: '标准值/边界值',
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
    label: '是否生成检验报告',
    code: 'isExportName',
    width: '160',
    minWidth: null,
    showOverflowTooltip: true,
    type: null,
    fixed: null,
    columnType: '', // 字段类型（判断是否是需要特殊取值的字段）
    parentFields: ''
  }
]
const PRODUCT_INSPECTION_PROJECT_LIST = [
  {
    name: 'inspectionItemGroupName',
    type: 'filter',
    queryName: 'inspectionItemGroupName'
  }, // 检验项目组
  { name: 'inspectionItemName', type: 'input' }, // 检验项目
  { name: 'approveStatusName', type: 'filter', queryName: 'approveStatus' } // 审批状态
]
export default {
  name: 'MaterialScreenDialog',
  components: {
    Pagination3
    // ElTableContent
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    visible: { type: Boolean, default: false },

    // 是否支持多选
    showSelection: {
      type: Boolean,
      require: false,
      default: true
    },
    originAllData: {
      type: Array,
      default: () => []
    },
    transferValue: {
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
        states: '2',
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
      // 多选
      allData: [],
      multipleSelection: [] // 已选择数组
    }
  },
  computed: {
    //
    totalSelected() {
      return this.selectedIds.length
    },
    selectedIds() {
      const res = this.multipleSelection.map(item => item.defectDefineId)
      // console.log(res)
      return res
    }

  },
  watch: {
    visible: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (newValue) {
        }
      }
    }
  },
  methods: {
    open(selectedItems) {
      console.log(selectedItems)
      this.multipleSelection = [...selectedItems]
      this.setSeletedData()
      // this.tableConfig.data = this.$_.cloneDeep(row.recordPictures)
    },
    // 单行选项变化
    handleSelect(multipleSelection, row) {
      if (multipleSelection.some(item => item.defectDefineId === row.defectDefineId)) { // 选中
      // 加入跨页的selectedIds
        this.multipleSelection.push(row)
      } else { // 取消选中
      // 过滤出非取消选中行的ids
        this.multipleSelection = this.multipleSelection.filter(item => item.defectDefineId !== row.defectDefineId)
      }
      // console.log(this.selectedIds)
    },
    handleSelectAll(multipleSelection) {
      // console.log(multipleSelection)
      if (multipleSelection.length) { // 选中当页全选
        this.multipleSelection = [...this.originAllData]
      } else { // 取消当页全选
        this.multipleSelection = []
      }
      // console.log(this.selectedIds)
    },
    /*
    回显表格数据（用于请求完tableData/跨页反选全选切换）
    参数data：请求成功的table数据
    */
    setSeletedData() {
      this.$nextTick(() => {
        // this.$refs.listTable.clearSelection()
        this.originAllData.forEach(row => {
          const isSelected = this.selectedIds.includes(row.defectDefineId)
          // console.log(isSelected)
          // 当前数据为被选中状态
          this.$refs.listTable.toggleRowSelection(row, isSelected)
        })
      })
    },

    onCancel() {
      this.$emit('cancel')
    },
    onConfirm() {
      // console.log('confirm', this.selectedIds)
      this.$emit('confirm', this.multipleSelection)
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
</style>
