<!--
 * @Author: xqm 13697256625@163.com
 * @Date: 2022-08-30 15:00:19
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-05-23 17:19:25
 * @FilePath: \systemmanagement\src\components\CommonTable\RightColumnsConfig.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="right-column-config">
    <template v-if="showRightColumnsConfig">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate">全选</el-checkbox>
      <el-checkbox-group v-model="checkedColumns">
        <el-checkbox
          v-for="item in columnsConfigDeep"
          :key="item.prop"
          v-dragging="{ item: item, list: columnsConfigDeep,group: 'checkbox' }"
          :label="item.prop"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <div class="btns">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="saveConfig">确认</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueDND from 'awe-dnd'
Vue.use(VueDND)
export default {
  props: {
    rightColumns: {
      type: Array,
      default: () => []
    },
    showRightColumnsConfig: {
      type: Boolean,
      default: false

    }
  },
  data() {
    return {
      checkedColumns: [],
      isIndeterminate: true,
      columnsConfigDeep: []
    }
  },
  computed: {
    checkAll: {
      get() {
        if (this.checkedColumns.length === this.columnsConfigDeep.length) {
          this.isIndeterminate = false
          return true
        } else {
          this.isIndeterminate = true
          return false
        }
      },
      set(val) {
        if (val) {
          this.isIndeterminate = false
          this.checkedColumns = this.columnsConfigDeep.map(i => i.prop)
        } else {
          this.checkedColumns = []
        }
      }
    }

  },
  watch: {
    checkedColumns: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.columnsConfigDeep.forEach(i => {
          const index = this.checkedColumns.findIndex(si => si === i.prop)
          if (index > -1) {
            i.checked = true
          } else {
            i.checked = false
          }
        })
        if (newValue.length > 0) {
          this.$emit('updateColumns', JSON.parse(JSON.stringify(this.columnsConfigDeep)))
        }
      }
    },
    rightColumns: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.columnsConfigDeep = JSON.parse(JSON.stringify(newVal))
        const propArr = []
        this.columnsConfigDeep.forEach(i => {
          if (i.checked) {
            propArr.push(i.prop)
          }
        })
        this.checkedColumns = propArr
      }
    }
  },
  mounted() {
    this.hdDrag()
  },
  created() {
  },
  methods: {
    cancel() {
      this.$parent.showRightColumnsConfig = false
    },
    saveConfig() {
      this.$emit('saveColumnsConfig')
      this.$parent.showRightColumnsConfig = false
    },
    hdDrag() {
      this.$dragging.$on('dragged', ({ value }) => {
        const { list: sortedList } = value
        this.$emit('updateColumns', JSON.parse(JSON.stringify(sortedList)))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.right-column-config {
width: 300px;
height: 100%;
background-color: #FAFAFA;
padding-top: 15px;
padding-left: 10px;
border: 1px solid #1890ff;
position: relative;
.btns {
  position: absolute;
  right: 10px;
  bottom: 10px;
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
