<!--
 * @Author:xuqiuming
 * @Date: 2021-09-13 18:42:28
 * @LastEditTime: 2023-05-15 11:20:12
 * @LastEditors: xqm 13697256625@163.com

-->
<template>
  <div
    class="planRateTable"
    :style="{
      width: typeof width === 'number' ? width + 'px' : width,
      height: typeof height === 'number' ? height + 'px' : height
    }"
  >
    <div class="table">
      <div :style="headerStyle" class="thead">
        <div class="th">
          <section
            v-for="item in colums"
            :key="item.prop"
            class="td"
            :style="{ width: item.width,lineHeight:headerStyle.lineHeight||'58px',color:headerStyle.color||'#18c2fc',opacity:1 }"
          >
            <template v-if="item.headType==='slot'">
              <slot :name="item.prop+'Header'" />
            </template>
            <template v-else>
              {{ item.label }}
            </template>

          </section>
        </div>
      </div>

      <template v-if="isScrollTable">
        <VueSeamlessScroll
          ref="warp"
          v-bind="$attrs"
          :data="tableData"
          :class-option="{ autoPlay }"
          class="seamless-scroll"
        >
          <ul class="tbody">
            <li
              v-for="item in tableData"
              :key="item[keyProp]"
              :style="{ height: trHeight + 'px',...trStyle }"
              class="tr"
              :class="{ active: item.active }"
              @click="hdclickTr(item)"
            >
              <section
                v-for="sitem in colums"
                :key="sitem.prop"
                class="td"
                :style="{ width: syncTheadTdWidth(sitem.prop),color:trStyle.color||'#18c2fc',opacity:1 }"
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
            </li>
          </ul>
        </VueSeamlessScroll>
      </template>
      <template v-else>
        <div class="tbody">
          <div
            v-for="(item,index) in tableData"
            :key="item[keyProp]"
            :style="{ height: trHeight + 'px',...trStyle,background:(isSpecialMarkRow && item.isSpecialMarkDate)?'linear-gradient(90deg, #721D4F 0%, #E15050 51%, #721D4F 100%)':(isSpecialMarkRow&&(index%2 ===0) )?'linear-gradient(90deg, rgba(12,42,135,0.36) 0%, #1C3D9F 47%, rgba(16,45,136,0.36) 100%)':''

            }"
            class="tr"
            :class="{ active: item.active }"
            @click="hdclickTr(item)"
          >
            <section
              v-for="(sitem, sindex) in colums"
              :key="sitem.prop"
              class="td"
              :style="{
                width: syncTheadTdWidth(sitem.prop),

                color:trStyle.color||'#18c2fc',
                paddingLeft: (isShowHierarchy && sindex === 0 && item[treeProps.relatedId] !== null) ? '20px' : ''
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
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import VueSeamlessScroll from 'vue-seamless-scroll'
export default {
  components: {
    VueSeamlessScroll
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
      default: 902
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
    isScrollTable: {
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
    headerStyle: { // 设置表头样式
      type: Object,
      default: () => ({

        lineHeight: '58px',
        color: '#18c2fc'

      })
    },
    // 是否开启特殊标记行
    isSpecialMarkRow: {
      type: Boolean,
      default: false
    },
    trStyle: { // 表格body的行样式
      type: Object,
      default: () => ({
        color: '#18c2fc'
      })
    }
  },
  data() {
    return {
      isAllowScroll: true // 是否允许数据滚动
    }
  },
  watch: {
    // 监听是否暂停轮播事件
    '$store.getters.isAllowRotation': {
      handler(newVal) {
        if (this.isListenerScroll) {
          this.$nextTick(() => {
            this.isAllowScroll = newVal
            if (newVal) {
              this.$refs.warp.isHover = false
              this.$refs.warp?._startMove()
            } else {
              this.$refs.warp.isHover = true
            }
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    syncTheadTdWidth(prop = '') {
      const index = this.colums.findIndex(i => i.prop === prop)
      if (index > -1) {
        return this.colums[index].width
      }
    },
    hdclickTr(currentItem) {
      this.$emit('hdclickTr', currentItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.planRateTable {
  color: #fff;
  .table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .thead {
      width: 100%;
      height: 58px;
      background: rgba(19, 44, 119, 0.68);
      .th {
        width: 100%;
        display: flex;
        height: 100%;
        .td {
          line-height: 58px;
          text-align: center;
          color: #18c2fc;
          font-size: 18px;
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
    .tbody {
      padding: 0;
      margin: 0;
      list-style: none;
      .tr {
        display: flex;
        // height: 48px;
        border-bottom: 1px solid #152657;
        border-left: 1px solid #152657;
        border-right: 1px solid #152657;
        list-style: none;
        cursor: pointer;

        .td {
          text-align: center;
          line-height: 48px;
          font-size: 16px;
          font-family: SourceHanSansCN-Regular;
          color: #7bbcee;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex-grow: 1;
        }
      }

      .active {
        background: linear-gradient(180deg, #132e80 0%, #264bbf 100%);
        opacity: 0.8;
      }
    }
  }
}
</style>
