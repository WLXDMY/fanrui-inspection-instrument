<!--
 * @Author: shunhua.liang
 * @Date: 2022-09-16 11:22:23
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-07 11:37:38
 * @Description: 检验项目和缺陷记录右侧列选择组件
-->

<template>
  <div class="custom-column" :style="styleModify">
    <!-- 可供选择的区域 -->
    <section class="column-top">
      <header class="select-btn">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
      </header>
      <main class="select-content">
        <el-checkbox-group
          v-model="checkedColumns"
          @change="handleCheckColumnChange"
        >
          <el-checkbox
            v-for="(item, index) in columnList"
            :key="index"
            v-dragging="{ item: item, list: columnList, group: 'checkbox' }"
            :label="item.code"
            class="handle"
          >{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </main>
    </section>
    <!-- 按钮操作区 -->
    <footer class="action">
      <el-button class="cancel" @click="cancel">取消</el-button>
      <!-- 是否管理员角色或者运维角色 -->
      <el-button
        v-if="
          $store?.getters?.userInfo?.roleId?.split(',').includes('1') ||
          $store?.getters?.userInfo?.roleId?.split(',').includes('3')
        "
        size="mini"
        type="primary"
        class="sure"
        @click="obitColumn('all')"
      >
        全局生效
      </el-button>
      <el-button size="mini" type="primary" class="sure" @click="obitColumn()">
        个人生效
      </el-button>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import VueDND from 'awe-dnd'

Vue.use(VueDND)
export default {
  props: {
    // 所有的列字段
    column: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    // 样式修改
    styleModify: {
      type: Object,
      require: false,
      default: () => {
        return {}
      }
    },
    // 选中的列元素
    checkColumn: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      checkedColumns: [], // 选中的列
      columnList: [] // 动态要展示的列
    }
  },
  watch: {
    column: {
      handler(newVal) {
        if (!newVal.length) return
        this.columnList = JSON.parse(JSON.stringify(newVal))
      },
      deep: true,
      immediate: true
    },
    // 选中的列回显
    checkColumn: {
      handler(newVal) {
        if (!newVal.length) return
        this.checkedColumns = newVal.map(item => item.code)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 复选框拖拽
      this.$dragging.$on('dragged', ({ value }) => {
        const { list } = value
        const result = list.map(item => {
          return item.code
        })
        // 过滤出已经选择排序好的元素
        const template = result.filter(item =>
          this.checkedColumns.includes(item)
        )
        this.checkedColumns = template
      })
    })
  },
  methods: {
    // 全选、全不选
    handleCheckAllChange(val) {
      const checkAllList = this.columnList.map(item => {
        return item.code
      })
      this.checkedColumns = val ? checkAllList : []
      this.isIndeterminate = false
    },
    // 单个复选框的选中与非被选中
    handleCheckColumnChange(val) {
      const checkedCount = val.length
      this.checkAll = checkedCount === this.columnList.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.columnList.length
    },
    // 取消
    cancel() {
      this.$emit('closeDialog')
    },
    // 确认
    async obitColumn(type) {
      if (type === 'all') {
        const res = await this.$confirm(
          '确认将当前列配置设置为全局生效吗？',
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

      const result = []
      this.checkedColumns.forEach(el => {
        this.column.forEach(item => {
          if (item.code === el) {
            result.push(item)
          }
        })
      })
      this.$emit('aginRenderColumn', result, type)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-column {
  position: absolute;
  top: 85px;
  right: 0;
  bottom: 5px;
  width: 380px;
  background: white;
  padding: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  z-index: 1999;
  height: 64%;
  .column-top {
    height: calc(100% - 42px);
    overflow: hidden;
    .select-content {
      height: calc(100% - 28px);
      margin-top: 10px;
      overflow: auto;
      ::v-deep .el-checkbox {
        display: block;
        margin-bottom: 10px;
      }
    }
  }
  .action {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    button {
      border: 1px solid #d9d9d9;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      cursor: pointer;
    }
  }
}
</style>
