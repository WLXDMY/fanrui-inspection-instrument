<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2022-08-30 15:00:19
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-12-15 11:46:56
 * @FilePath: \systemmanagement\src\components\CommonTable\RightColumnsConfig.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="right-column-config">
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
      >全选</el-checkbox
    >

    <SortableList
      v-model="columnsConfigDeep"
      :lockToContainerEdges="true"
      class="list"
      lockAxis="y"
      :distance="1"
    >
      <SortableItem
        v-for="(item, index) in columnsConfigDeep"
        :key="index"
        v-model="item.checked"
        class="list-item"
        :item="item"
        :index="index"
      >
      </SortableItem>
    </SortableList>

    <div class="btns">
      <el-button class="cancel" @click="cancel">取消</el-button>
      <!-- 是否管理员角色或者运维角色 -->
      <el-button
        v-if="
          $store?.getters?.userInfo?.roleId?.split(',').includes('1') ||
          $store?.getters?.userInfo?.roleId?.split(',').includes('3')
        "
        type="primary"
        @click="saveConfig('all')"
      >
        设为默认
      </el-button>
      <el-button type="primary" @click="saveConfig()">确认</el-button>
    </div>
  </div>
</template>

<script>
// import ItemVue from '@/views/layout/components/Sidebar/Item.vue'
// import Vue from 'vue'
// import VueDND from 'awe-dnd'
// Vue.use(VueDND)
// import { SlickList, SlickItem } from 'vue-slicksort'
export default {
  components: {
    SortableList: () => import('./rightColumnsConfigComs/sortableList.vue'),
    SortableItem: () => import('./rightColumnsConfigComs/sortableItem.vue')
  },
  props: {
    rightColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isIndeterminate: true,
      columnsConfigDeep: JSON.parse(JSON.stringify(this.rightColumns))
    }
  },
  computed: {
    checkAll: {
      get() {
        if (this.columnsConfigDeep.every(i => i.checked)) {
          this.isIndeterminate = false
          return true
        } else if (this.columnsConfigDeep.every(i => !i.checked)) {
          this.isIndeterminate = false
          return false
        } else {
          this.isIndeterminate = true
          return false
        }
      },
      set(val) {
        if (val) {
          this.columnsConfigDeep = JSON.parse(
            JSON.stringify(this.columnsConfigDeep)
          ).map(i => ({ ...i, checked: true }))
        } else {
          this.columnsConfigDeep = JSON.parse(
            JSON.stringify(this.columnsConfigDeep)
          ).map(i => ({ ...i, checked: false }))
        }
      }
    }
  },
  watch: {
    columnsConfigDeep: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal && newVal.length && oldVal.length !== 0) {
          console.log(newVal, oldVal, 'newVal, oldVal')
          this.$emit(
            'updateColumns',
            JSON.parse(JSON.stringify(this.columnsConfigDeep)) || []
          )
        }
      }
    }
  },
  created() {},

  methods: {
    cancel() {
      this.$emit('cancel')
    },
    async saveConfig(type) {
      if (type === 'all') {
        const res = await this.$confirm(
          '确认将当前列配置设置为默认吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(() => {})
        if (res !== 'confirm') {
          return
        }
      }
      this.$emit('saveColumnsConfig', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.right-column-config {
  width: 300px;
  top: 42px;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #fff;
  padding-top: 15px;
  padding-left: 10px;
  border: 1px solid #1890ff;
  position: absolute;
  .btns {
    position: absolute;
    right: 10px;
    bottom: 10px;

    .cancel {
      color: #1890ff !important;
    }
  }
}

.el-checkbox-group {
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
}
::v-deep .el-checkbox {
  display: block;
  margin-bottom: 10px;
}
// display: inline-block;
</style>
