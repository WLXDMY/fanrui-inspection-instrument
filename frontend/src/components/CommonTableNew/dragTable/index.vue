<!--
 * @Author:xuqiuming
 * @Date: 2021-09-13 18:42:28
 * @LastEditTime: 2024-08-06 16:39:46
 * @LastEditors: laidz laidz@yelinked.com

-->
<template>
  <div
    class="planRateTable"
    :style="{
      width: typeof width === 'number' ? width + 'px' : width,
      height: typeof height === 'number' ? height + 'px' : height
    }"
  >
    <el-input
      v-if="showSchemeSearch"
      v-model="columnData"
      placeholder="请输入字段名称查询"
      class="filter-input"
      clearable
      @input="hdSearch"
    />
    <div class="table">
      <div class="thead">
        <div class="th">
          <section v-for="item in colums" :key="item.prop" :style="{ width: item.width }" class="td">
            <template v-if="item.headType === 'slot'">
              <slot :name="item.prop + 'Header'" />
            </template>
            <template v-else>
              {{ item.label }}
            </template>
          </section>
        </div>
      </div>

      <SortableList v-model="tmpConfigList" :lock-to-container-edges="true" class="list" lock-axis="y" :distance="1">
        <SortableItem
          v-for="(item, index) in tmpConfigList"
          :key="item.prop"
          :index="index"
          :style="{ height: trHeight + 'px', ...trStyle }"
          class="tr"
          :class="{ active: item.active }"
        >
          <section
            v-for="(sitem, sindex) in colums"
            :key="sitem.prop"
            class="td"
            :style="{
              width: syncTheadTdWidth(sitem.prop),
              paddingLeft: isShowHierarchy && sindex === 0 && item[treeProps.relatedId] !== null ? '20px' : ''
            }"
          >
            <template v-if="sitem.type === 'dataMap'">
              {{ sitem.data[item[sitem.prop]] }}
            </template>
            <template v-else-if="sitem.type === 'slot'">
              <slot :name="sitem.prop" :row="item" />
            </template>
            <template v-else-if="sitem.type === 'formatData'">
              {{ sitem.formatFunc(item[sitem.prop]) }}
            </template>
            <template v-else>
              {{ item[sitem.prop] }}
            </template>
          </section>
        </SortableItem>
      </SortableList>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    SortableList: () => import('./sortableList.vue'),
    SortableItem: () => import('./sortableItem.vue')
  },
  props: {
    colums: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    width: {
      type: [Number, String],
      default: 800
    },
    height: {
      type: [Number, String],
      default: 647
    },
    trHeight: {
      type: Number,
      default: 48
    },
    autoPlay: {
      type: Boolean,
      default: false
    },

    keyProp: {
      type: String,
      default: ''
    },
    isListenerScroll: {
      type: Boolean,
      default: false
    },
    isShowHierarchy: {
      type: Boolean,
      default: false
    },
    treeProps: {
      type: Object,
      default: () => {}
    },

    trStyle: {
      // 表格body的行样式
      type: Object,
      default: () => ({})
    },
    // 是否展示列表筛选的搜索框
    showSchemeSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columnConfigList: [], // 原始表格数据
      tmpConfigList: [], // 动态更新的表格数据
      columnData: '',
      timer: ''
    }
  },

  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.columnConfigList = JSON.parse(JSON.stringify(newValue)) //
        this.tmpConfigList = JSON.parse(JSON.stringify(newValue))
      }
    },
    tmpConfigList: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.$emit('updateCommonTableColumns', JSON.parse(JSON.stringify(newValue)))
      }
    }
  },

  methods: {
    hdSearch(str) {
      console.log(str, 'str')
      const originConfig = JSON.parse(JSON.stringify(this.columnConfigList))
      clearTimeout(this.timer)
      this.timer = null

      setTimeout(() => {
        if (!str) {
          this.tmpConfigList = originConfig
          return
        }

        this.tmpConfigList = originConfig.filter(i => i.label.indexOf(str) !== -1)

        console.log(this.tmpConfigList, 'this.tmpConfigList')
      }, 1000)
    },
    syncTheadTdWidth(prop = '') {
      const index = this.colums.findIndex(i => i.prop === prop)
      if (index > -1) {
        return this.colums[index].width
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.planRateTable {
  .table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .thead {
      width: 100%;
      height: 42px;
      background: #f2f5fc;
      .th {
        width: 100%;
        display: flex;
        height: 100%;
        border: 1px solid #dfe6ec;
        .td {
          line-height: 42px;
          text-align: center;
          font-size: 14px;
          font-family: SourceHanSansCN-Bold;
          flex-grow: 1;
        }
      }
    }
    .seamless-scroll {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      overflow: hidden;
      flex: 1;
    }
    .list {
      padding: 0;
      margin: 0;
      list-style: none;
      height: 522px;
      // overflow: auto;

      .tr {
        display: flex;
        border: 1px solid #dfe6ec;
        border-top: none;
        list-style: none;
        cursor: pointer;
        width: 100%;

        .td {
          text-align: center;
          line-height: 48px;
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex-grow: 1;
          padding-right: 8px;
        }
      }

      .active {
        opacity: 0.8;
      }
    }
  }
}
.filter-input {
  width: 30%;
  float: right;
  margin-bottom: 10px;
}
</style>
