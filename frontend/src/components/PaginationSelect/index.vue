
<!--
 * @Author: xuqiuming
 * @Date: 2022-06-21 14:02:01
 * @LastEditTime: 2022-09-19 10:37:17
 * @LastEditors: xqm 13697256625@163.com
 * @Description: In User Settings Edit
-->
<template>
  <div class="t_pagination_select">
    <el-select
      v-model="childSelectedValue"
      :style="{width: width||'100%'}"
      v-bind="attrs"
      :filterable="filterable"
      :remote="remote"
      :remote-method="remoteSearch"
      v-on="$listeners"
      @change="(val) => $emit('change',{val,type})"
    >
      <el-option
        v-for="item in optionSource"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
      />
      <el-pagination
        small
        layout="total,prev, pager, next"
        :hide-on-single-page="true"
        :page-size="paginationOption.pageSize"
        :current-page="paginationOption.currentPage"
        :pager-count="paginationOption.pagerCount"
        :total="paginationOption.total"
        @current-change="(val) => $emit('page-change',{val,type})"
      />
    </el-select>
  </div>
</template>

<script>

export default {
  name: 'TPaginationSelect',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    // 选择框宽度
    width: {
      type: String
    },
    // 传入的option数组中，要作为最终选择项的键值名称
    valueKey: {
      type: String
    },
    // 传入的option数组中，要作为显示项的键值名称
    labelKey: {
      type: String
    },
    // 下拉框组件数据源
    optionSource: {
      type: Array,
      default: () => ([])
    },
    // 分页配置项
    paginationOption: {
      type: Object,
      default: () => {
        return {
          pageSize: 6, // 每页显示条数
          currentPage: 1, // 当前页
          pagerCount: 5, // 按钮数，超过时会折叠
          total: 0 // 总条数
        }
      }
    },
    filterable: {
      type: Boolean,
      default: true
    },
    remote: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    }
  },

  computed: {
    childSelectedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    attrs() {
      return {
        'popper-append-to-body': false,
        clearable: true,
        filterable: true,
        ...this.$attrs
      }
    }
  },
  watch: {
    childSelectedValue(val) {
      this.childSelectedValue = val
    }
  },
  methods: {
    remoteSearch(v) {
      this.$emit('fuzzySearch', { v, type: this.type })
    }
  }
}
</script>
 <style lang="scss" scoped>
.t_pagination_select {
  ::v-deep .el-pagination {
    display: flex;
    margin-top: 15px;
    margin-left: 15px;
    background-color: #fff;
    align-items: center;
    .el-pager {
      display: flex;
      align-items: center;
    }
  }

}

</style>
