<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-07-05 14:14:26
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-07-13 14:48:51
 * @FilePath: \ams\src\views\reportManage\components\addEditDialog\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-dialog
    v-bind="$attrs"
    width="60%"
    :visible.sync="diaVisible"
    class="add-dialog"

    v-on="$listeners"
  >

    <main>

      <section v-show="this.orderType!=='workOrder'" class="header">
        <el-button type="primary" size="small" @click="cancelRealte">取消</el-button>
        <el-button type="primary" size="small" @click="deleteRelateOrder">删除</el-button>
      </section>

      <section v-if="upDownConfig.upOrderShow" :style="{height:upOrderHeight+'px'}" class="upOrder">
        <h3>
          上游单据
        </h3>
        <CommonTablePlus
          ref="common-table"
          v-loading="upOrder.loading"
          class="common-table"
          :data="upOrder.data"
          border
          :all-comumns="upOrder.allComumns"

          @selection-change="(vals)=>{handleSelectionChange(vals,'up')}"
        />
      </section>

      <section v-if="upDownConfig.downOrderShow" class="downOrder">
        <h3>
          下游单据
        </h3>
        <CommonTablePlus
          ref="common-table"
          v-loading="downOrder.loading"
          class="common-table"
          :data="downOrder.data"
          border
          :all-comumns="downOrder.allComumns"

          @selection-change="(vals)=>{handleSelectionChange(vals,'down')}"
        />
      </section>
    </main>
    <template #footer>
      <div class="bnts">
        <el-button

          size="small"

          @click="$emit('cancel')"
        >
          取消
        </el-button>
        <el-button

          type="primary"
          size="small"

          @click="confirm"
        >
          确认
        </el-button>

      </div>

    </template>
  </el-dialog>
</template>

<script>

export default {
  components: {
    CommonTablePlus: () => import('@/components/CommonTablePlus')
  },
  props: {
    orderCancelRelateVisible: {
      type: Boolean,
      default: false
    },
    orderType: {

      type: String,
      default: ''
    },
    upDownData: {
      type: Object,
      require: true,
      default: () => {}
    },
    upOrderHeight: {
      type: Number,
      default: 150
    }
  },
  data() {
    return {
      diaVisible: false,
      upOrder: {
        data: [],
        loading: false,
        allComumns: [
          // {
          //   type: 'selection',
          //   prop: 'index',
          //   width: '42',
          //   selectable: () => false,
          //   checked: true

          // },
          {
            prop: 'orderTypeName',
            label: '单据类型',
            minWidth: '100',
            checked: true

          },
          {
            prop: 'stateName',
            label: '状态',
            minWidth: '60',
            checked: true

          },
          {
            prop: 'orderNumber',
            label: '单号',
            minWidth: '200',
            checked: true

          },
          {
            prop: 'materialName',
            label: '物料名称',
            minWidth: '200',
            checked: true

          },
          {
            prop: 'materialCode',
            label: '物料编码',
            minWidth: '200',
            checked: true

          },
          {
            prop: 'procedureName',
            label: '工序名称',
            minWidth: '200',
            checked: true

          }],
        selections: []
      },
      downOrder: {
        data: [],
        loading: false,
        allComumns: [{
          type: 'selection',
          prop: 'index',
          width: '42',
          checked: true

        },
        {
          prop: 'orderTypeName',
          label: '单据类型',
          minWidth: '100',
          checked: true

        },
        {
          prop: 'stateName',
          label: '状态',
          minWidth: '60',
          checked: true

        },
        {
          prop: 'orderNumber',
          label: '单号',
          minWidth: '200',
          checked: true

        },
        {
          prop: 'materialName',
          label: '物料名称',
          minWidth: '200',
          checked: true

        },
        {
          prop: 'materialCode',
          label: '物料编码',
          minWidth: '200',
          checked: true

        },
        {
          prop: 'procedureName',
          label: '工序名称',
          minWidth: '200',
          checked: true

        }],
        selections: []
      }
    }
  },
  computed: {
    upDownConfig() {
      switch (this.orderType) {
        case 'saleOrder':
          return {
            upOrderShow: false,
            downOrderShow: true
          }
        case 'productOrder':
          return {
            upOrderShow: true,
            downOrderShow: true
          }
        case 'workOrder':
          return {
            upOrderShow: true,
            downOrderShow: false
          }

        default:
          return {
            upOrderShow: true,
            downOrderShow: true
          }
      }
    }
  },

  watch: {
    orderCancelRelateVisible: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.diaVisible = newValue
      }
    },
    upDownData: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        const { upstreamOrders, downstreamOrders } = newValue
        this.upOrder.data = upstreamOrders
        this.downOrder.data = downstreamOrders
      }
    }
  },
  methods: {

    confirm() {
      this.$emit('confirm')
    },
    cancelRealte() {
      if (!this.upOrder.selections.length && !this.downOrder.selections.length) {
        return this.$notify({
          type: 'warning',
          message: '请先勾选！'
        })
      }
      if (this.upOrder.selections.some(i => i.stateName !== '生效') || this.downOrder.selections.some(i => i.stateName !== '生效')) {
        return this.$notify({
          type: 'warning',
          message: '存在非生效态的单据！'
        })
      }

      this.$emit('cancelOrder', {
        upstreamOrders: this.upOrder.selections,
        downstreamOrders: this.downOrder.selections
      })
    },
    deleteRelateOrder() {
      console.log(this.upOrder.selections.length, this.downOrder.selections.length)
      if (!this.upOrder.selections.length && !this.downOrder.selections.length) {
        return this.$notify({
          type: 'warning',
          message: '请先勾选！'
        })
      }
      if (this.upOrder.selections.some(i => i.stateName !== '创建') || this.downOrder.selections.some(i => i.stateName !== '创建')) {
        return this.$notify({
          type: 'warning',
          message: '存在非创建态的单据！'
        })
      }
      this.$emit('deleteOrder', {
        upstreamOrders: this.upOrder.selections,
        downstreamOrders: this.downOrder.selections
      })
    },
    handleSelectionChange(vals, type) {
      if (type === 'up') {
        this.upOrder.selections = vals
      } else {
        this.downOrder.selections = vals
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  margin: 40px auto;
  height: 700px;
  main {
    display: flex;
    flex-direction: column;
    height: 100%;

  .header {
    display: flex;
    justify-content: flex-end;
  }
  .upOrder {
  //  height: 150px;
    h3 {
      margin-top: 0;
    }
    .common-table {
     height: calc(100% - 64px);
    }

  }
  .downOrder {
    flex: 1;
    h3 {
      margin-top: 0;
    }

  }
}

}
/deep/ .el-dialog__body {
  height: calc(100% - 54px);
  padding-bottom: 60px;

}

/deep/ .el-dialog__header .el-dialog__headerbtn {
  display: none;

}
/deep/ .el-dialog__footer {
  position: absolute;
  left: 50%;
  bottom:0;
  transform: translate(-50%,0);
}

</style>
