<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-06-01 14:55:20
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-07 19:29:17
 * @FilePath: \ams\src\views\procurement-management\materials-list\materialCheckAddComponents\badInformation.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>

  <div>

    <section class="btns">
      <el-button v-show="pageType!=='detail'" type="primary" :disabled="state===3||state===4" size="small" @click="badDialogVisible=true">新增不良</el-button>
    </section>
    <CommonTablePlus
      ref="common-table"
      class="common-table"
      :data="data"
      border
      :all-comumns="allComumns"
    >
      <template #defectQuantity="{ row}">
        <NumberInput
          v-model="row.defectQuantity"
          :disabled="pageType==='detail' || state===3 || state===4"
          size="small"
        />
      </template>
      <template #remark="{ row }">
        <el-input
          v-model="row.remark"
          :disabled="pageType==='detail' || state===3 || state===4"
          size="small"
        />
      </template>
      <template #operate="{ row, $index }">
        <el-button v-show="pageType!=='detail'&&(state===1 || state===2)" class="delete-button" type="text" @click="deleteBadItem($index)">删除</el-button>
      </template>
    </CommonTablePlus>

    <GeneralSelectDialog
      v-if="badDialogVisible"
      title="不良项选择"
      :column-config="badColumns"
      :visible="badDialogVisible"
      :table-data="originBadData"
      @confirm="confirm"
      @cancel="badDialogVisible=false"
    />
  </div>

</template>

<script>
const columns = [
  {
    prop: 'index',
    label: '序号',
    type: 'index',
    checked: true
  },
  {
    prop: 'defectTypeName',
    label: '不良类型',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectName',
    label: '不良项',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectQuantity',
    label: '不良数量',
    minWidth: '100',
    columnType: 'bodySlot',
    checked: true

  },
  {
    prop: 'remark',
    label: '备注',
    minWidth: '100',
    columnType: 'bodySlot',
    checked: true

  },
  {
    prop: 'operate',
    label: '操作',
    minWidth: '250',
    columnType: 'slot',
    fixed: 'right',
    checked: true
  }

]
const badColumns = [
  {
    prop: 'defectTypeName',
    label: '不良类型',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectName',
    label: '不良项',
    minWidth: '100',
    checked: true
  }
]
export default {
  components: {
    CommonTablePlus: () => import('@/components/CommonTablePlus'),
    GeneralSelectDialog: () => import('@/components/GeneralSelectDialog'),
    NumberInput: () => import('@/components/NumberInput')

  },
  props: {
    defectEntities: {
      type: Array,
      default: () => []
    },
    badData: {
      type: Array,
      default: () => []
    },
    pageType: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      allComumns: columns,
      badColumns: badColumns,
      data: [],
      originBadData: [],
      badDialogVisible: false
    }
  },
  watch: {
    defectEntities: {
      handler(newValue, oldValue) {
        this.originBadData = JSON.parse(JSON.stringify(newValue)).map(i => ({ ...i, defectQuantity: '', remark: '' }))
      }
    },
    badData: {
      immediate: true,
      handler(newValue, oldValue) {
        this.data = JSON.parse(JSON.stringify(newValue))
      }
    },
    data: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        // console.log('bad imformation -> ', newValue)
        // this.data = JSON.parse(JSON.stringify(newValue))
        this.$emit('getBadData', JSON.parse(JSON.stringify(newValue)))
      }
    }
  },
  methods: {
    confirm(row) {
      this.data.push(row)
      this.badDialogVisible = false
    },
    deleteBadItem(index) {
      this.data.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.btns {
    display: flex;
    align-items: flex-start;
    height: 42px;
}

.common-table {
    height: 400px;
}
.delete-button {
  ::v-deep span {
    color:red !important;
  }
}
</style>
