<!-- 公共表格组件 column - 表头 noEmpty - 空数据容器  -->
<!-- 公共配置属性，全继承element属性，额外的：
 * @Author: xuqiuming
 * @Date: 2022-6-18 19:10:19
 * @LastEditTime: 2022-6-18 19:10:19
 * @LastEditors: xuqiuming
 * @Description: In User Settings Edit
-->
<template>
  <div>
    <el-table
      ref="table"
      class="flex-fill responsive-table"
      :data="tableDataLocal"
      v-bind="$attrs"
      :header-cell-style="{
        background: '#FAFAFA',
        color: '#000000',
        'font-family': 'Source Han Sans CN',
        'font-size': '14px'}"
      highlight-current-row
      v-on="$listeners"
    >
      <template v-for="(item, index) in columnLocal">
        <el-table-column
          v-if="!item.type&& (!item.columnType || typeLists.includes(item.columnType))"
          :key=" item.prop + index"
          v-bind="{...item}"
          :render-header="(h,{column})=>hdRrenderHeader(h,column,item)"
        >
          <!-- slotHeader - 自定义表头 -->
          <template slot="header" slot-scope="scope">
            <slot
              v-if="item.columnType === 'slotHeader'"
              :name="item.prop + 'Header'"
              :row="scope.row"
            />
            <template v-else>
              {{ item.label }}
            </template>
          </template>
          <template slot-scope="scope">
            <template v-if="!item.columnType">
              {{
                scope.row[item.prop] ||( scope.row[item.prop]=== 0? 0:'')
              }}
            </template>
            <!-- 自定义插槽 -->
            <slot
              v-else-if="item.columnType === 'slot' || item.columnType === 'slotHeader'"
              :name="item.prop"
              :row="scope.row"
              :$index="scope.$index"
            />
            <!-- map转换 -->
            <template v-else-if="item.columnType === 'dataMap'">
              {{
                item.dataMap[scope.row[item.prop]] || ''
              }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.type "
          :key="item.prop + index"
          v-bind="{ ...item }"
        />
      </template>
      <!-- 空数据插槽 -->
      <div
        v-if="!noEmpty"
        slot="empty"
        class=""
      >
        <div class="emptyBox">{{ '暂无数据' }}
          <slot name="empty" />
        </div>
      </div>

    </el-table>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    column: {
      type: Array,
      default: () => []
    },
    noEmpty: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableDataLocal: [],
      columnLocal: [], //
      typeLists: [ // 注册type类型
        'slotHeader',
        'slot',
        'dataMap'
      ],
      // 筛选框
      filterBoxInfo: {
        type: '',
        clientX: 0,
        clientY: 0,
        prop: ''
      }
    }
  },
  computed: {

  },
  watch: {
    tableData: {
      deep: true,
      handler(val) {
        this.tableDataLocal = val
      },
      immediate: true
    },
    column: {
      deep: true,
      handler(val) {
        this.columnLocal = JSON.parse(JSON.stringify(val))
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    clearSingleHightIcon(prop) {
      const index = this.columnLocal.findIndex(i => prop === i.prop)
      if (index > -1) {
        this.columnLocal[index].active = false
      }
    },
    hightCurrentIcon(prop) {
      const index = this.columnLocal.findIndex(i => prop === i.prop)
      if (index > -1) {
        this.columnLocal[index].active = true
      }
    },
    resetIconHight() {
      this.columnLocal.forEach(i => {
        i.active = false
      })
    },
    hdRrenderHeader(h, column, item) {
      const { filterBoxType, label, prop, key = '', options = [], outSideKey = '', optionsRequestConfig } = item
      if (!filterBoxType) {
        return h('span', {}, [h('span', {}, label)])
      } else {
        return h('span', {}, [
          h('span', {}, label),
          h('span',
            { on: {
              click: async(e) => {
                this.$refs.searchBox.showSearchBox()
                const { clientX = 0, clientY = 0 } = e || {}
                this.filterBoxInfo = {
                  filterBoxType,
                  clientX,
                  clientY,
                  prop,
                  options: optionsRequestConfig ? await this.requestOptions(optionsRequestConfig) : options,
                  key,
                  outSideKey
                }
              }
            },
            style: 'cursor:pointer'
            },
            [
              h('svg-icon', {
                props: {
                  iconClass: 'filter',

                  className: `${item.active ? 'icon-active' : ''}` + '  init-svg-icon'
                }
              })
            ]
          )
        ])
      }
    },
    async requestOptions(optionsRequestConfig = {}) {
      let arr = []
      const { url, method, labelKey, valueKey, showItems, specialHandle } =
        optionsRequestConfig
      try {
        const {
          data: { code, data, message }
        } = await request({ url, method })

        if (code === '200') {
          let options
          specialHandle ? options = this.hdSpecialOptions(url, data) : options = data.map(i => ({
            value: i[valueKey] + '',
            label: i[labelKey]
          }))
          showItems ? showItems.forEach(j => {
            const index = options.findIndex(item => item.value === j)
            if (index > -1) {
              arr.push(options[index])
            }
          }) : arr = options
          return arr
        } else {
          this.$message({
            type: 'error',
            message
          })
        }
      } catch (error) {
        console.error(error, 'error')
      }
    },
    // 特殊处理枚举值 后端不规范
    hdSpecialOptions(url, data) {
      let specialOptions = []
      switch (url) {
        case '/ams/product/orders/all/grades':
          for (var key in data) {
            specialOptions.push({
              label: data[key],
              value: key
            })
          }
          break
        case '/api/grids/list':
          specialOptions = data?.records?.map(i => ({
            value: i.gcode,
            label: i.gname
          }))
          break
        default:
          break
      }
      return specialOptions
    }

  }
}
</script>
<style lang="scss" scoped>

  /deep/ .el-table{
  .icon-active {
 color: #1890ff;

}
  }
/deep/ .init-svg-icon {
     width: 3em;
    height: 1.2em;
}
</style>
