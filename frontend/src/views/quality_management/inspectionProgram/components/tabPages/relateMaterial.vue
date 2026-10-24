<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-06-04 14:29:16
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-13 15:42:38
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionProgram\components\tabPages\relateMaterial.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="relateMaterial">
    <section class="centerArea">
      <el-button
        v-if="!isDetailType"
        :disabled="initStatus === 1"
        type="primary"
        size="small"
        @click="addType"
      >选择关联物料类型</el-button>
      <span class="switch">
        通用方案
        <el-switch
          v-model="generalMaterialTemp"
          :disabled="isDetailType || initStatus === 1"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
        开启后该方案默认关联所有物料
      </span>
      <el-table :data="materalTypetableData" height="250" border style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="物料类型" />
        <el-table-column label="操作">
          <template slot-scope="{ row, column, $index }">
            <el-button
              v-if="!isDetailType"
              :disabled="initStatus === 1"
              type="text"
              style="color: #ff4949"
              @click="handleDeleteItem(row, $index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        v-if="!isDetailType"
        :disabled="initStatus === 1"
        type="primary"
        size="small"
        @click="addMaterial"
      >选择关联物料</el-button>
      <el-table :data="materaltableData" height="250" border style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="code" label="物料编码" />
        <el-table-column prop="name" label="物料名称" />
        <el-table-column prop="standard" label="物料规格" />
        <el-table-column prop="typeName" label="物料类型" />
        <el-table-column prop="sortName" label="物料分类" />
        <el-table-column label="操作">
          <template slot-scope="{ row, column, $index }">
            <el-button
              v-if="!isDetailType"
              :disabled="initStatus === 1"
              type="text"
              style="color: #ff4949"
              @click="deleteItem(row, $index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <CommonSelectDialogPlus
      v-if="showDialog"
      :title="title"
      :request-config="requestConfig"
      :extra-params="extraParams"
      :current-name="currentName"
      :column-config="tableColumn"
      :visible="showDialog"
      :append-to-body="true"
      @confirm="handleConfirm"
      @cancel="showDialog = false"
    />
  </div>
</template>
<script>
import { deleteMaterialTypeItem, deleteMaterialItem } from '@/api/quality-manage.js'
import { Materialtype, Material } from './constant.js'
export default {
  name: 'RelateMaterial',
  components: {
    CommonSelectDialogPlus: () => import('@/components/CommonSelectDialogPlus/index.vue')
  },
  props: {
    formInline: {
      type: Object,
      default() {
        return {}
      }
    },
    initStatus: {
      type: Number,
      default: 0
    },
    generalMaterial: {
      type: [Number, Boolean],
      default: 0
    }
  },
  data() {
    return {
      generalMaterialTemp: false,
      requestConfig: {},
      extraParams: {},
      materaltableData: [],
      materalTypetableData: [],
      showDialog: false,
      tableColumn: [],
      title: '',
      currentName: 'current'
    }
  },
  computed: {
    isDetailType() {
      return this.$route.name.includes('Detail')
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    }
  },
  watch: {
    generalMaterial: {
      handler(val) {
        this.generalMaterialTemp = val
      }
    },
    generalMaterialTemp: {
      handler(val) {
        this.$emit('update:generalMaterial', val)
      }
    }
  },
  created() {},
  methods: {
    addMaterial() {
      this.title = '物料选择'
      this.tableColumn = Material
      this.requestConfig = {
        url: '/api/materials/list',
        method: 'post'
      }
      this.extraParams = {}
      this.currentName = 'current'
      this.showDialog = true
    },
    addType() {
      this.title = '新增关联物料类型'
      this.tableColumn = Materialtype
      this.requestConfig = {
        url: '/api/dicts/common/type/list',
        method: 'get'
      }
      this.currentName = 'currentPage'
      this.extraParams = {
        type: 'materialType'
      }
      this.showDialog = true
    },
    handleConfirm(row) {
      if (this.title === '新增关联物料类型') {
        const filterRow = row.filter(item => {
          const hasIndex = this.materalTypetableData.findIndex(i => {
            return (i.materialType === item.id && i.isOriginal) || i.id === item.id
          })
          if (hasIndex !== -1) {
            return false
          }
          return true
        })
        this.materalTypetableData.push(...filterRow)
      } else {
        const filterRow = row.filter(item => {
          const hasIndex = this.materaltableData.findIndex(i => {
            return (i.materialId === item.id && i.isOriginal) || i.id === item.id
          })
          if (hasIndex !== -1) {
            return false
          }
          return true
        })
        this.materaltableData.push(...filterRow)
      }
      this.showDialog = false
      console.log('🚀 ~ handleConfirm ~ row:', row)
    },
    // 删除关联物料类型行数据
    handleDeleteItem(row, index) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          this.materalTypetableData.splice(index, 1)
          // 编辑状态下的删除调取接口
          if (this.isEditType && row.isOriginal) {
            await deleteMaterialTypeItem(this.formInline.schemeId, [row.id])
          }
        })
        .catch(() => {})
    },
    // 删除关联物料行数据
    deleteItem(row, index) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          this.materaltableData.splice(index, 1)
          // 编辑状态下的删除调取接口
          if (this.isEditType && row.isOriginal) {
            await deleteMaterialItem(this.formInline.schemeId, [row.id])
          }
        })
        .catch(() => {})
    },
    // 物料数据回显
    handleEchoMaterials(data) {
      this.materaltableData = data.map((item, index) => {
        return {
          ...item,
          isOriginal: true, // 区别开是已经新增过的数据还是编辑的时候新增的数据  materialDTO
          code: item.materialCode,
          skuId: item.skuId,
          name: item.materialDTO && item.materialDTO.name ? item.materialDTO.name : '',
          standard: item.materialDTO && item.materialDTO.standard ? item.materialDTO.standard : '',
          typeName: item.materialDTO && item.materialDTO.typeName ? item.materialDTO.typeName : '',
          sortName: item.materialDTO && item.materialDTO.sortName ? item.materialDTO.sortName : ''
        }
      })
    },
    // 物料类型数据回显
    handleEchoMaterialsType(data) {
      this.materalTypetableData = data.map((item, index) => {
        return {
          ...item,
          isOriginal: true, // 区别开是已经新增过的数据还是编辑的时候新增的数据
          type: item.materialType,
          name: item.materialTypeName
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.relateMaterial {
  .centerArea {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
    .switch {
      display: inline-block;
      margin-left: 20px;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .el-button {
      margin-bottom: 5px;
    }
    .el-button:nth-of-type(2) {
      margin-top: 5px;
    }
  }
}
</style>
