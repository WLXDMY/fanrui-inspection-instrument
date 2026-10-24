<!--
 * @Author: chenzejie
 * @Date: 2022-09-01 10:57:44
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-06-28 16:57:36
 * @Description:
-->
<template>
  <el-dialog
    :title="checkType === 'bom' ? 'BOM列表' : '工艺列表'"
    :visible.sync="checkBomCraftVisible"
    width="20%"
    custom-class="check-detail-dialog"
    @closed="closeCheckBomCraft"
  >
    <el-table
      :data="detailTableData"
      :header-cell-style="{
        background: '#F3F3F3',
        color: 'rgba(0, 0, 0, 0.85)',
        height: '48px'
      }"
      :row-style="{ height: '48px' }"
      max-height="400px"
      highlight-current-row
      :show-header="false"
    >
      <el-table-column v-if="checkType === 'bom'" prop="bomNum" label="BOM">
        <template slot-scope="{ row }">
          <span class="link" @click="toBomDetail(row)">
            {{ row.bomNum }}
          </span>
        </template>
      </el-table-column>
      <el-table-column v-else prop="name" label="工艺">
        <template slot-scope="{ row }">
          <span class="link" @click="toCraftDetail(row)">
            {{ row.name }}
          </span>
        </template>
      </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeCheckBomCraft">取 消</el-button>
      <el-button
        type="primary"
        :disabled="!isProduct || (inAddBom && checkType === 'bom')"
        @click="addBomCraft"
      >
        {{ checkType === 'bom' ? '新增BOM' : '新增工艺' }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getBomsListByCode,
  getCraftsListByCode
} from '@/api/product-management'

export default {
  props: {
    checkType: {
      type: String,
      default: 'bom'
    },
    inAddBom: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: ''
    },
    // 物料类型，仅生产品可以新增bom
    sort: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      detailTableData: [],
      checkBomCraftVisible: true
    }
  },
  computed: {
    isProduct() {
      return this.sort === 'product'
    }
  },
  created() {
    this.checkType === 'bom'
      ? this.getBomsListByCode()
      : this.getCraftsListByCode()
  },
  methods: {
    // 根据物料查询bom列表
    getBomsListByCode() {
      getBomsListByCode(this.code).then(res => {
        const { code, data, message } = res.data || {}
        if (code === '200') {
          this.detailTableData = data
        } else {
          this.$notify({
            title: '提示',
            message: message || '获取BOM数据失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 根据物料查询工艺列表
    getCraftsListByCode() {
      getCraftsListByCode(this.code).then(res => {
        const { code, data, message } = res.data || {}
        if (code === '200') {
          this.detailTableData = data
        } else {
          this.$notify({
            title: '提示',
            message: message || '获取工艺数据失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    toBomDetail(row) {
      // this.$router.push({
      //   name: `bomDetail`,
      //   params: {
      //     id: row.id,
      //     type: 'detail'
      //   }
      // })
      const params = {
        id: row.id,
        type: 'detail'
      }
      const path = `/genieos/dfs/product-management/bom/detail/${row.id}/detail`
      window.history.replaceState(params, null, path)
      sessionStorage.setItem('_historyState', JSON.stringify(params))
    },
    toCraftDetail(row) {
      // this.$router.push({
      //   name: 'productManagement-technologyRoute',
      //   params: {
      //     id: row.craftId,
      //     type: 'detail'
      //   }
      // })
      const params = {
        id: row.craftId,
        type: 'detail'
      }
      const path = `/genieos/dfs/product-management/technology-route/${row.craftId}/${params.type}`
      window.history.replaceState(params, null, path)
      sessionStorage.setItem('_historyState', JSON.stringify(params))
    },
    // 新增bom或者工艺
    addBomCraft() {
      if (this.checkType === 'bom') {
        const { name } = this.$route || {}
        if (name === 'bomAdd') {
          // this.$notify({
          //   title: '提示',
          //   message: '已在新增bom界面',
          //   type: 'error',
          //   duration: 2000
          // })
        } else {
          this.$router.push({
            name: 'bomAdd',
            params: {
              code: this.code
            }
          })
        }
      } else {
        this.$router.push({
          name: 'addTechnology',
          params: {
            code: this.code
          }
        })
      }
    },
    closeCheckBomCraft() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.check-detail-dialog {
  .link {
    color: #1890ff;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
