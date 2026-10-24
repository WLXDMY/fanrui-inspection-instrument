<!-- 公共表格组件 column - 表头 noEmpty - 空数据容器  -->
<!-- 公共配置属性，全继承element属性，额外的：
 * @Author: xuqiuming
 * @Date: 2022-6-18 19:10:19
 * @LastEditTime: 2022-6-18 19:10:19
 * @LastEditors: xuqiuming
 * @Description: In User Settings Edit
-->
<template>

  <el-table
    ref="table"
    class="flex-fill responsive-table"
    v-bind="$attrs"
    :header-cell-style="{
      background: '#FAFAFA',
      color: '#000000',
      'font-family': 'Source Han Sans CN',
      'font-size': '14px'
    }"

    :row-style="{ height: '32px', color: '#333333' }"
    highlight-current-row
    v-on="$listeners"
  >
    <template v-for="(item, index) in columns">
      <el-table-column
        v-if="!item.type&& (!item.columnType || typeLists.indexOf(item.columnType)>-1)"
        :key=" item.prop + index"
        v-bind="{...item}"
      >
        <!-- slotHeader - 自定义表头 -->
        <template slot="header" slot-scope="scope">
          <slot
            v-if="item.columnType === 'headerSlot' || item.columnType === 'slot'"
            :name="item.prop + 'Header'"
            :row="scope.row"
          />
          <template v-else>
            {{ item.label }}
          </template>
        </template>
        <template slot-scope="scope">
          <!-- 自定义插槽 -->
          <template v-if="item.columnType === 'bodySlot' || item.columnType === 'slot'">
            <slot
              :name="item.prop"
              :row="scope.row"
              :$index="scope.$index"
            />
          </template>

          <!-- map转换 -->
          <template v-else-if="item.columnType === 'dataMap'">
            {{
              item.dataMap[scope.row[item.prop]] || ''
            }}
          </template>
          <!-- 格式化 -->
          <template v-else-if="item.columnType === 'format'">

            <div>  {{
              item.formatFuc([scope.row[item.prop]] )
            }}</div>
          </template>
          <template v-else>
            {{
              scope.row[item.prop] ||( scope.row[item.prop]=== 0? 0:'')
            }}
          </template>
        </template>
      </el-table-column>

      <el-table-column
        v-if="
          item.type
        "
        :key="item.prop + index"
        v-bind="{ ...item }"
      />
    </template>

  </el-table>

</template>

<script>

export default {

  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableDataLocal: [],
      typeLists: [ // 注册type类型
        'headerSlot',
        'bodySlot',
        'slot',
        'dataMap',
        'format'
      ]
    }
  },

  created() {
    console.log(this, 'thisCommon22')
  },
  mounted() {},
  methods: {

  }
}
</script>
<style lang="scss" scoped>

    /deep/ .el-table{
    .icon-active {
   color: #1890ff;

  }
    }

    .table {
      display: flex;
    }
  /deep/ .init-svg-icon {
       width: 3em;
      height: 1.2em;
  }

  </style>
