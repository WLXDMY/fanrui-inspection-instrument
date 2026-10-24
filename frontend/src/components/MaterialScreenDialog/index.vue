<template>
  <el-dialog
    :title="title"
    class="material-dialog"
    :visible.sync="materialDialogVisible"
    width="70%"
    :before-close="onCancel"
    :show-close="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="material-dialog-content">
      <div v-loading="materialLoading" class="tablebox">
        <el-table
          v-if="isShowTable"
          ref="listTable"
          :data="materialDialogList || []"
          height="100%"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
        >
          <el-table-column
            v-if="showSelection"
            label-class-name="selection-class"
            type="selection"
            width="55"
          />
          <template v-for="item in tableColList">
            <el-table-column
              v-if="isShowCol(item)"
              :key="item.id"
              :prop="item.code"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :class-name="item.class"
              :min-width="item.minWidth"
              :render-header="renderColumnHeader"
            />
          </template>
          <template v-if="!productMaterialCode">
            <el-table-column
              v-for="item in extendMaterialList"
              :key="item.id"
              :prop="item.code"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :class-name="item.class"
              :min-width="item.minWidth"
              :render-header="renderColumnHeader"
            />
          </template>
        </el-table>
      </div>
      <div class="pagination-section">
        <div>
          <el-checkbox v-model="screenFlag" @change="screenChange">筛选全选</el-checkbox>
          <span v-if="showSelection"> 已选{{ totalSelected }}条</span>
        </div>
        <el-pagination
          background
          layout="prev, pager, next,sizes"
          :total="materialPagination.total"
          :current-page.sync="materialPagination.current"
          :page-size.sync="materialPagination.size"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          @size-change="handleQueryMaterial"
          @current-change="handleQueryMaterial"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <slot name="footer">
          <el-button v-if="showCancel" size="small" @click="onCancel">
            取消
          </el-button>
          <el-button
            v-if="showConfirm"
            type="primary"
            size="small"
            :loading="loadingStatus"
            :disabled="materialDialogList.length <= 0"
            @click="onConfirm"
          >
            确认
          </el-button>
        </slot>
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
      <!-- 刷新 -->
      <div class="refresh" @click="handleResetMaterial">
        <i class="el-icon-refresh-right" />
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
import { getMaterialSort, materialsList } from '@/api/product-management'
import { getBomProductMaterial } from '@/api/base.js'
import { getMaterialType } from '@/api/materialAnalysis'
import { getMaterialWordList } from '@/api/common.js'
import { MATERIALDIALOG_TABLE } from '@/constant/materialDialog.js'
import { LIST as MATERIALDIALOGSEARCHLIST_TABLE } from '@/constant/materialDialogSearchList.js'
import SearchBox from '@/components/SearchBox/index.vue'

export default {
  name: 'MaterialScreenDialog',
  components: { SearchBox },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    materialDialogVisible: { type: Boolean, default: false },
    // 控制确认按钮与取消按钮的隐藏
    showCancel: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    // 确认上传是等待样式的隐藏
    loadingStatus: {
      type: Boolean,
      default: false
    },
    productMaterialCode: {
      type: String,
      default: ''
    },
    // 请求的参数
    queryList: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    },
    // 是否支持多选
    showSelection: {
      type: Boolean,
      require: false,
      default: () => false
    }
    // 外层已选择了的选项
    // chosedSelection: {
    //   type: Array,
    //   require: false,
    //   default: () => []
    // }
  },
  data() {
    return {
      queryForm: {
        code: '',
        name: '',
        type: '',
        standard: '',
        sort: '',
        comp: '',
        version: '',
        state: 2
      },
      currentRow: null,
      section: [],
      materialSortOptions: [],
      materialTypeOptions: [],
      materialPagination: {
        total: 0,
        current: 1,
        size: 20
      },
      materialLoading: false,
      materialDialogList: [],
      extendMaterialList: [],
      allColList: JSON.parse(JSON.stringify(MATERIALDIALOG_TABLE)),
      tableColList: JSON.parse(JSON.stringify(MATERIALDIALOG_TABLE)),
      searchList: MATERIALDIALOGSEARCHLIST_TABLE,
      isShowSearchBox: false, // 是否展示搜索框
      searchQuery: {
        isShow: false,
        params: {},
        column: {},
        searchCode: {}
      },
      materialFields: {}, // 物料字段
      isShowTable: true,
      isRegisterScrollEvent: false,
      screenFlag: false, // 筛选全选：true-表示已选 false-表示未选
      totalSelected: 0, // 总的已选条数
      screenUnselectedList: [], // 筛选全选未选中的List
      selectCurrentRow: {},
      screentQueryForm: {} // 筛选的查询条件
    }
  },
  watch: {
    materialDialogVisible: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.handleQueryMaterial()
        }
      }
    }
  },
  async created() {
    if (!this.productMaterialCode) {
      await this.getMaterialWord()
    }
  },
  mounted() {
    this.getMaterialSort()
    this.getMaterialType()
  },
  methods: {
    // 获取有启用字段全集
    async getMaterialWord() {
      const result = await getMaterialWordList()
      const { code, data = [], message } = result.data || {}
      if (+code === 200) {
        this.extendMaterialList = (data || []).map(item => ({
          id: uuidv4(),
          label: item.fieldName,
          code: item.fieldCode,
          width: null,
          showOverflowTooltip: false,
          type: null,
          fixed: null,
          minWidth: '120',
          columnType: 'material',
          class: 'handle'
        }))
        this.allColList.push(...this.extendMaterialList)
      } else {
        this.$notify({
          title: '提示',
          message: message,
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 筛选全选
    screenChange() {
      console.log('screen', this.queryForm)
      if (this.screenFlag) {
        this.$refs.listTable.toggleAllSelection()
        this.totalSelected = this.materialPagination.total
        console.log('total -> ', this.totalSelected)
      } else {
        this.$refs.listTable.clearSelection()
        this.totalSelected = this.section.length
        this.screenUnselectedList.length = 0
      }
    },
    // 筛选全选的逻辑
    screenJudge() {
      // 筛选
      if (this.screenFlag) {
        this.screenUnselectedF()
      } else {
        this.totalSelected = this.section.length
      }
    },
    // 页面切换
    screenPageSwitch() {
      if (this.screenFlag) {
        this.$nextTick(() => {
          this.materialDialogList.forEach(item => {
            if (!this.screenUnselectedList.includes(item.id)) {
              this.$refs.listTable.toggleRowSelection(item)
            }
          })
        })
      }
    },
    // 页面点击（筛选）
    screenUnselectedF() {
      if (this.section.length === 0) {
        this.materialDialogList.forEach(item => {
          if (this.screenUnselectedList.indexOf(item.id) < 0) {
            this.screenUnselectedList.push(item.id)
          }
        })
        this.totalSelected = this.materialPagination.total - this.screenUnselectedList.length
      } else if (this.section.length === this.materialDialogList.length) {
        this.materialDialogList.forEach(item => {
          this.screenUnselectedList = this.screenUnselectedList.filter(unitem => unitem !== item.id)
        })
        this.totalSelected = this.materialPagination.total - this.screenUnselectedList.length
      }
      const currentCodeId = this.selectCurrentRow.id
      if (!currentCodeId) {
        return
      }
      const selectedIdList = this.section.map(item => item.id)
      const comparator = selectedIdList.indexOf(currentCodeId)
      // 移除
      if (comparator < 0) {
        if (this.screenUnselectedList.indexOf(currentCodeId) < 0) {
          this.screenUnselectedList.push(currentCodeId)
        }
      } else if (comparator > 0) {
        this.screenUnselectedList = this.screenUnselectedList.filter(item => item !== currentCodeId)
      }
      this.totalSelected = this.materialPagination.total - this.screenUnselectedList.length
    },
    // 获取物料分类
    getMaterialSort() {
      getMaterialSort().then(res => {
        if (res.data.code === '200') {
          this.materialSortOptions = res.data.data || []
        }
      })
    },
    // 获取物料类型
    getMaterialType() {
      getMaterialType().then(res => {
        if (res.data.code === '200') {
          this.materialTypeOptions = (res.data.data || []).map(item => ({
            ...item,
            code: item.id
          }))
        }
      })
    },
    onCancel() {
      this.$emit('cancel')
      this.handleResetMaterial()
    },
    onConfirm() {
      // showSelection：true ==》开启多选
      if (
        ((this.showSelection && !this.section.length) || (!this.showSelection && !this.currentRow)) && !this.screenFlag
      ) {
        this.$notify({
          title: '提示',
          message: '请选择一个物料',
          type: 'warning',
          duration: 2000
        })
        return
      }

      // 相同物料校验
      // if (this.chosedSelection.length) {
      //   if (
      //     !this.chosedSelection.every(item => {
      //       return !this.section.map(i => i.code).includes(item.code)
      //     })
      //   ) {
      //     this.$notify({
      //       title: '告警',
      //       message: 'BOM存在相同物料',
      //       type: 'error',
      //       duration: 2000
      //     })
      //     return
      //   }
      // }
      this.screentQueryForm = this.queryForm
      this.$emit('confirm', this.showSelection ? this.section : this.currentRow)
      this.queryForm = {
        code: '',
        name: '',
        type: '',
        standard: '',
        sort: '',
        comp: '',
        version: ''
      }
      this.materialPagination = {
        total: 0,
        current: 1,
        size: 20
      }
      this.materialFields = {}
      this.materialDialogList = []
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleSelect(section, row) {
      // this.currentRow = row
      this.selectCurrentRow = row
      this.section = section
      this.screenJudge()
    },
    handleSelectionChange(section) {
      this.section = section
      this.screenJudge()
    },
    handleQueryMaterial() {
      this.materialLoading = true
      const param = {
        ...this.materialPagination,
        ...this.queryForm.materialFields,
        ...this.queryList,
        states: '2',
        current: this.materialPagination.current,
        size: this.materialPagination.size
      }
      console.log('handleQueryMaterial', param)
      delete param.total
      if (this.productMaterialCode) {
        this.getBomListByMaterial(param)
      } else {
        this.getMaterialList(param)
      }
    },
    // 获取BOM信息
    getBomListByMaterial(param) {
      getBomProductMaterial({
        ...param,
        productMaterialCode: this.productMaterialCode,
        current: this.materialPagination.current,
        size: this.materialPagination.size
      }).then(res => {
        this.isShowTable = false
        this.materialLoading = false
        if (res.data.code === '200') {
          this.materialDialogList = res.data.data.records || []
          this.materialPagination.total = res.data.data.total || 0
        }
        setTimeout(() => {
          this.isShowTable = true
          this.tableScrollEvent()
        }, 20)
      })
    },
    // 获取物料信息
    getMaterialList(param) {
      materialsList(param).then(res => {
        this.isShowTable = false
        this.materialLoading = false
        if (res.data.code === '200') {
          console.log(res.data.data.records)
          this.materialDialogList =
            res.data.data.records.map(item => {
              return {
                ...item,
                materialId: item.id,
                loseRate: (item.materialFields.loseRate * 100).toFixed(2) + '%'
              }
            }) || []
          this.materialPagination.total = res.data.data.total || 0
        }
        setTimeout(() => {
          this.isShowTable = true
          this.tableScrollEvent()
          this.screenPageSwitch()
        }, 20)
      })
    },
    handleResetMaterial() {
      this.queryForm = {
        code: '',
        name: '',
        type: '',
        standard: '',
        sort: '',
        comp: '',
        version: '',
        materialFields: {}
      }
      if ('materialFields' in this.queryForm) {
        Object.keys(this.materialFields).forEach(el => {
          this.materialFields[el] = ''
        })
        this.$set(this.queryForm, 'materialFields', this.materialFields)
      }
      this.handleQueryMaterial()
    },
    // 自定义表头
    renderColumnHeader(h, { column }) {
      const result = this.searchList.find(item => item.name === column.property)
      const columnConfig = this.allColList.find(
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
                  that.isShowSearchBox = true
                  that.handleFilter(column.property)
                  that.$set(that.searchQuery, 'isShow', true)
                  that.$set(that.searchQuery, 'params', e)
                  that.$set(that.searchQuery, 'column', column)
                  that.$set(that.searchQuery, 'queryList', that.queryForm)
                  that.$set(that.searchQuery, 'columnConfig', columnConfig) // 自定义的列配置
                  that.searchQuery['searchCode'] = result
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
    // 查看是否有过滤值
    isExistFilter(result, columnConfig) {
      if (!result) return ''
      let res
      if (columnConfig.columnType === 'material') {
        if (result.queryName) {
          const materialCode = result.queryName
          if (materialCode in this.materialFields) {
            res = this.materialFields[materialCode]
          }
        } else {
          res = this.materialFields[result.name]
        }
      } else {
        if (Array.isArray(result.queryTip)) {
          res = this.queryForm[result.queryTip[0]]
        } else if (result.queryName) {
          res = this.queryForm[result.queryName]
        } else {
          res = this.queryForm[result.name]
        }
      }
      return res ? 'search-col-active' : ''
    },
    // 列搜索
    actionList(value) {
      this.queryForm = {
        ...this.queryForm,
        ...value,
        current: 1,
        size: 20
      }
      if ('materialFields' in value) {
        const { materialFields = {}} = value
        Object.keys(materialFields).forEach(el => {
          this.materialFields[el] = materialFields[el]
        })
        this.$set(this.queryForm, 'materialFields', this.materialFields) // 加上之后搜索条件会累计
        this.queryForm = {
          ...this.queryForm,
          ...materialFields
        }
      }

      this.isShowSearchBox = false
      this.handleQueryMaterial()
    },
    clearList(value) {
      this.queryForm = {
        ...this.queryForm,
        ...value,
        current: 1,
        size: 20
      }
      if ('materialFields' in value) {
        const { materialFields = {}} = value
        // for (const key in materialFields) {
        //   this.materialFields[key] = materialFields[key]
        // }
        Object.keys(materialFields).forEach(key => {
          this.materialFields[key] = materialFields[key]
        })
        this.$set(this.queryForm, 'materialFields', this.materialFields)
      }
    },
    // 处理下拉选择
    handleFilter(name) {
      switch (name) {
        case 'sortName':
          this.$set(this.searchQuery, 'options', this.materialSortOptions)
          break
        case 'typeName':
          this.$set(this.searchQuery, 'options', this.materialTypeOptions)
          break
      }
    },
    // 搜索框关闭
    closeDialogSearch() {
      this.isShowSearchBox = false
    },
    // 是否展示列
    isShowCol(item) {
      if (item.code === 'drawingNumber' || item.code === 'standard') {
        if (this.productMaterialCode) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    // 滚动条滚动
    tableScrollEvent() {
      if (this.isRegisterScrollEvent) return
      this.$nextTick(() => {
        const selectWrap = this.$el.querySelector('.el-table__body-wrapper')
        const that = this
        selectWrap.addEventListener('scroll', function(e) {
          that.$nextTick(() => {
            //  横向滚动
            if (that.$refs?.listTable.bodyWrapper.scrollLeft > 0) {
              that.isShowSearchBox = false
            }
          })
        })
        this.isRegisterScrollEvent = true
      })
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
    display: flex;
    flex-direction: column;
    .tablebox {
      height: 0;
      flex: 1 0 auto;
      .ag-theme-balham {
        width: 100%;
        height: 100%;
        ::v-deep .ag-header-cell-menu-button,
        .ag-floating-filter-button {
          display: none;
        }
      }
    }
    ::v-deep thead.has-gutter label.el-checkbox {
      display: inline-block !important;
    }
    .pagination-section {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }
    .dialog-footer {
      display: flex;
      justify-content: center;
    }
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
