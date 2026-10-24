<template lang="">
  <div>
    <MaterailTable
      ref="common-table"
      :data="tableData"
      border
      :all-comumns="columns"
      height="365px"
      class="materail-table"
      model-type="inspectItems"
    >
      <template v-if="type !== 'detail'" #operate="{ row, $index }">
        <div class="delete" @click="hdDelete(row, $index)">删除</div>
      </template>
    </MaterailTable>
    <div class="add-new">
      <el-button v-if="type !== 'detail'" type="primary" size="small" @click="addNew">新增产品流水码</el-button>
    </div>
    <div>
      <el-dialog
        title="新增产品流水码"
        :visible.sync="showDialog"
        width="400px"
      >
        <el-form ref="form" :model="form" :rules="rule">
          <el-form-item label="流水码:" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    MaterailTable: () => import('@/components/MaterailTable')
  },
  props: {
    serialCodeList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      columns: [
        {
          prop: 'pipelineCode',
          label: '送检产品流水码',
          minWidth: '350',
          checked: true
        },
        {
          prop: 'operate',
          label: '操作',
          minWidth: '50',
          columnType: 'slot',
          fixed: 'right',
          checked: true
        }
      ],
      tableData: [
        // { pipelineCode: 'hello world' },
        // { pipelineCode: 'hello world1' },
        // { pipelineCode: 'hello world2' },
        // { pipelineCode: 'hello world4' },
        // { pipelineCode: 'hello world5' }
      ],
      showDialog: false,
      form: {
        name: ''
      },
      rule: {
        name: [{ required: true, message: '流水码必填', trigger: 'blur' }]
      }
    }
  },
  watch: {
    serialCodeList: {
      handler() {
        this.tableData = this.serialCodeList.map(s => ({ pipelineCode: s }))
      },
      immediate: true
    },
    tableData: {
      handler(val) {
        this.$emit('serialCodeListUpdate', JSON.parse(JSON.stringify(val.map(v => v.pipelineCode))))
      },
      immediate: true
    }
  },
  methods: {
    // 新增确定
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('新增成功')
          this.tableData.push({ pipelineCode: this.form.name })
          this.showDialog = false
        } else {
          return false
        }
      })
    },
    // 新增流水码
    addNew() {
      this.form.name = ''
      this.showDialog = true
    },
    hdDelete(row, index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.materail-table {
  height: 300px !important;
    ::v-deep .el-form-item {
    margin: 0;
    .el-form-item__error {
      z-index: 88;
    }
  }
    ::v-deep .el-form-item__content {
        overflow: visible;
        padding-right: 8px;
        .el-input {
        width: 100%;
        }
      }
}
.delete {
  color: red;
  text-align: center;
  cursor: pointer;
}
.add-new {
  margin-top: 20px;
}
</style>
