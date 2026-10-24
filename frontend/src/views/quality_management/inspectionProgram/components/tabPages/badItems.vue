<!--
 * @Author: zhaozhuo
 * @Date: 2022-10-10 16:59:28
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-11-19 13:57:52
 * @Description: ...
-->
<template>
  <div>
    <el-button
      v-if="type !== 'detail'"
      :disabled="forbidClick || initStatus === 1"
      class="add-btn"
      type="primary"
      size="small"
      @click="handleAdd"
      >选择关联缺陷</el-button
    >
    <el-table
      :data="badItemsSelectedList"
      style="width: 100%"
      :header-cell-style="{
        background: '#F3F3F3',
        color: 'rgba(0, 0, 0, 0.85)',
        height: '48px'
      }"
      max-height="400"
      highlight-current-row
      row-key="defectId"
    >
      <el-table-column type="index" label="序号" />
      <el-table-column prop="defectCode" label="缺陷编码" />
      <el-table-column prop="defectName" label="缺陷名称" />
      <el-table-column prop="remark" label="缺陷描述" />
      <el-table-column v-if="type !== 'detail' && initStatus != 1" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="{ row, $index }">
          <div class="delete-text" @click="handleDelete(row, $index)">删除</div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      class="baditems-dialog"
      width="70%"
      title="缺陷定义选择"
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
    >
      <div class="table-content">
        <ElTableContent
          ref="defectTable"
          :list-query="listQuery"
          :search="tableSearch"
          :table-data="badItemsList"
          :table-column="tableColumn"
          modular-type="defectDefinition"
          column-permission-action="qms-product-inspection.inspection-manage.defect:columnConfigList"
          :request-config="requestConfig"
          :action-width="0"
          @select="handleBadSelectChange"
          @selectAll="handleBadSelectAll"
          @makeNewRequest="makeNewRequest"
        />
      </div>
      <pagination3
        v-show="listQuery.total > 0"
        style="position: static"
        :total="listQuery.total"
        :page.sync="listQuery.current"
        :limit.sync="listQuery.size"
        @pagination="qualityPlanDefineList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel"> 取消 </el-button>
        <el-button type="primary" size="small" @click="handleConfirm"> 确认 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import ElTableContent from '@/components/ElTableColumn'
import Pagination3 from '@/components/Pagination3'
import { USE_DEFECTS_API } from '@/api/facilityQualityManagement.js'
import { deleteSchemeBadItem } from '@/api/quality-manage'
import { type } from '@/utils/deepCopy'
const DEFECTS_API = USE_DEFECTS_API() // 不良api
export default {
  name: 'BadItems',
  components: {
    Pagination3,
    ElTableContent
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    type: String,
    forbidClick: {
      type: Boolean,
      default: false
    },
    formInline: {
      type: Object,
      default: () => {}
    },
    initStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      requestConfig: {
        isMaterial: false
      },
      tableColumn: [
        {
          id: uuidv4(),
          label: '缺陷编码',
          code: 'code',
          width: ''
        },
        {
          id: uuidv4(),
          label: '缺陷名称',
          code: 'name',
          width: ''
        }
      ],
      tableSearch: [{ name: 'name', type: 'input' }],
      badItemsList: [],
      badItemsSelectedList: [],
      badItemsSelectedCode: [],
      dialogVisible: false,
      filterMethod(query, item) {
        return item.defectCode.toString().indexOf(query) > -1 || item.defectName.toString().indexOf(query) > -1
      },
      defectsOptions: [],
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      },
      defectSelect: [] // 选择的缺陷
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
    }
  },
  mounted() {
    this.qualityPlanDefineList()
  },
  methods: {
    handleCancel() {
      this.dialogVisible = false
    },
    // 缺陷选择-当前页单个
    handleBadSelectChange(selection, row) {
      if (selection.some(item => item.id === row.id)) {
        const obj = {
          defectCode: row.code,
          defectName: row.name,
          defectId: row.id
        }
        this.defectSelect.push(obj)
      } else {
        const hasIndex = this.defectSelect.findIndex(i => i.defectId === row.id)
        if (hasIndex !== -1) {
          this.defectSelect.splice(hasIndex, 1)
        }
      }
    },
    // 缺陷选择-当前页全部
    handleBadSelectAll(selection) {
      // 选择当前页全部
      if (selection.length !== 0) {
        const filterArr = selection
          .filter(item => {
            return !this.defectSelect.some(i => i.defectId === item.id)
          })
          .map(items => {
            return {
              defectCode: items.code,
              defectName: items.name,
              defectId: items.id
            }
          })
        this.defectSelect.push(...filterArr)
      }
      // 取消当前页全部
      if (selection.length === 0) {
        this.defectSelect = this.defectSelect.filter(item => {
          return !this.badItemsList.some(i => i.id === item.defectId)
        })
      }
    },
    // 表格筛选回调
    makeNewRequest(val) {
      Object.keys(val).forEach(el => {
        this.listQuery[el] = val[el]
      })
      this.qualityPlanDefineList()
    },
    // 获取不良定义列表
    qualityPlanDefineList() {
      const params = {
        statues: [1],
        ...this.listQuery
      }
      DEFECTS_API.getDefectsListApi(params).then(res => {
        console.log(res)
        this.badItemsList = res.data && res.data.data ? res.data.data.records : []
        this.listQuery.total = res.data.data.total
        this.reShowRow() // 回显
      })
    },
    // 弹窗弹出
    async handleAdd() {
      this.dialogVisible = true
      this.defectSelect = JSON.parse(JSON.stringify(this.badItemsSelectedList))
      this.reShowRow()
    },
    // 回显
    async reShowRow() {
      // 回显选中
      let timer = setTimeout(() => {
        if (!this.$refs['defectTable']) {
          clearTimeout(timer)
          timer = null
          return
        }
        this.badItemsList.forEach(row => {
          const hasIndex = this.defectSelect.findIndex(i => {
            return i.defectId === row.id
          })
          if (hasIndex !== -1) {
            this.$refs['defectTable'].$refs['listTable'].toggleRowSelection(row, true)
          }
        })
        clearTimeout(timer)
        timer = null
      }, 500)
    },
    // 删除
    handleDelete(row, $index) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 编辑状态下删除 调取接口删除
          if (this.isEditType && row.id) {
            await deleteSchemeBadItem(this.formInline.schemeId, [row.id])
          }
          this.badItemsSelectedList.splice($index, 1)
        })
        .catch(() => {})
    },
    // 弹窗选择回调
    async handleConfirm() {
      const preDelArr = []
      const selectedIds = this.defectSelect.map(item => item.defectId)
      this.badItemsSelectedList.forEach(item => {
        const bol = selectedIds.includes(item.defectId)
        if (!bol) {
          if (item.id) {
            // 已存在后端的项目
            preDelArr.push(item.id)
          } else {
            // 新增未保存的项目 标记一下
            item.flagDelete = true
          }
        }
      })

      // 删除 新增为保存的项目
      this.badItemsSelectedList = this.badItemsSelectedList.filter(item => !item.flagDelete)
      // 删除 已存在后端的项目
      if (preDelArr.length !== 0) {
        await deleteSchemeBadItem(this.formInline.schemeId, [...preDelArr])
        this.badItemsSelectedList = this.badItemsSelectedList.filter(item => !preDelArr.includes(item.id))
      }

      // 新增项目
      const ids = this.badItemsSelectedList.map(item => item.defectId)
      const newSelectedRows = this.defectSelect
        .filter(item => !ids.includes(item.defectId))
        .map(item => {
          const obj = JSON.parse(JSON.stringify(item))
          delete obj.id
          return obj
        })
      this.badItemsSelectedList.push(...newSelectedRows)
      this.dialogVisible = false
    },
    // 数据回显
    async handleEcho(data) {
      this.badItemsSelectedList = data.map(item => {
        return {
          ...item,
          isOriginal: true,
          defectName: item.defectEntity && item.defectEntity.name ? item.defectEntity.name : '',
          remark: item.defectEntity && item.defectEntity.remark ? item.defectEntity.remark : ''
        }
      })
      // 弹窗回显
      this.defectSelect = JSON.parse(JSON.stringify(this.badItemsSelectedList))
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  margin-bottom: 15px;
}
.delete-text {
  width: 35px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #ff4949;
  border-radius: 4px;
  opacity: 1;
  padding: 0 3px;
  cursor: pointer;
}
.delete-text:hover {
  background-color: rgba(24, 144, 255, 0.2);
}
.baditems-dialog {
  ::v-deep .el-dialog__body {
    padding-bottom: 10px;
  }
  ::v-deep .el-transfer-panel {
    width: 299px !important;
  }
}

.table-content {
  height: 450px;
  overflow: scroll;
}
</style>
