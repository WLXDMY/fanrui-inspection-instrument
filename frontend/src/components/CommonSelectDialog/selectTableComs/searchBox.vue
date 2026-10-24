<template>
  <div v-show="isShowSearchBox" ref="search-box" :class="{'search-box':true}" :style="{top:filterBoxInfo.clientY +30+'px',left:filterBoxInfo.clientX+'px'}">
    <template v-if="filterBoxInfo.filterBoxType==='input'">
      <div class="conent-input">
        <el-input v-model="searchValue" />
        <div class="btns">
          <el-button size="mini" @click="clearSingleSearchValue">清空</el-button>
          <el-button size="mini" type="primary" @click="search">确定</el-button>
        </div>
      </div>
    </template>

    <template v-else-if="filterBoxInfo.filterBoxType==='select'">
      <div class="select-wrapper">
        <div class="content">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="searchValue">
            <el-checkbox
              v-for="item in filterBoxInfo.options"
              :key="item.prop"
              :label="item.value"
              @click.native.prevent="radioClick(item)"
            >{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="btns">
          <el-button size="mini" @click="clearSingleSearchValue">清空</el-button>
          <el-button size="mini" type="primary" @click="search">确定</el-button>
        </div>
      </div>

    </template>
    <template v-else-if="filterBoxInfo.filterBoxType==='single-select'">
      <div class="content-single-select">
        <el-radio-group v-model="searchValue">
          <el-radio-button
            v-for="item in filterBoxInfo.options"
            :key="item.prop"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
        <div class="btns">
          <el-button size="mini" @click="clearSingleSearchValue">清空</el-button>
          <el-button size="mini" type="primary" @click="search">确定</el-button>
        </div>
      </div>
    </template>
    <template v-else-if="filterBoxInfo.filterBoxType==='date-rage'">
      <div class="content-date-rage">
        <el-date-picker
          v-model="searchValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00','23:59:59']"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeTimeRage"
          @keyup.enter="changeTimeRage"
        />
      </div>
    </template>
  </div>
</template>

<script>
// 筛选框的类型 input select dateRage
import { eventBus } from '@/main.js'
export default {
  props: {
    filterBoxInfo: {
      type: Object,
      default: () => {

      }
    }

  },
  data() {
    return {
      searchValue: '',
      searchValueStore: {

      }, // 存储对象 用于保存值且回选

      // checkAll: false,
      isIndeterminate: true,
      isShowSearchBox: false

    }
  },
  computed: {
    checkAll: {
      get() {
        if (this.searchValue.length === this.filterBoxInfo.options.length) {
          this.isIndeterminate = false
          return true
        } else if (this.searchValue.length < this.filterBoxInfo.options.length) {
          this.isIndeterminate = true
          return false
        } else {
          return false
        }
      },
      set(value) {
        if (value) {
          this.searchValue = this.filterBoxInfo.options.map(i => i.value)
        }
      }
    }

  },
  watch: {
    filterBoxInfo: {
      deep: true,
      handler(newValue, oldValue) {
        const { prop, filterBoxType, key, outSideKey } = newValue

        this.initSearchValue(prop, filterBoxType, key, outSideKey)
      }
    }
  },
  mounted() {
    eventBus.$on('resetQuery', this.resetQuery)
    // 点击弹窗之外关闭弹窗
    document.addEventListener('click', e => this.closeDialog(e))
  },
  beforeDestroy() {
    eventBus.$off('resetQuery', this.resetQuery)
    window.removeEventListener('click', this.closeDialog, false)
  },

  methods: {
    showSearchBox() {
      this.isShowSearchBox = true
    },
    // 关闭菜单弹窗
    closeDialog(e) {
      if ((!this.$refs['search-box']?.contains(e.target) && e.target.nodeName !== 'svg')) {
        this.isShowSearchBox = false
      }
    },
    resetQuery() {
      this.$emit('resetIconHight')
      this.searchValueStore = {}
      this.searchValue = ''
      eventBus.$emit('getQueryParams', this.searchValueStore)
    },
    // 初始化添加

    // key 表示需要特殊处理的传参
    initSearchValue(prop, filterBoxType, key, outSideKey) {
      if (!outSideKey) {
        // 初始化
        if (!(key in this.searchValueStore) && filterBoxType === 'select') {
          this.searchValueStore[key] = ''
          this.searchValue = []
        // 回选
        } else if ((key in this.searchValueStore) && filterBoxType === 'select') {
          this.searchValue = this.searchValueStore[key] ? this.searchValueStore[key].split(',').map(item => isNaN(+item) ? item : +item) : []

        // 初始化
        } else if (!key && !(prop in this.searchValueStore) && filterBoxType === 'input') {
          this.searchValueStore[prop] = ''
          this.searchValue = ''
        // 回选
        } else if (!key && (prop in this.searchValueStore) && filterBoxType === 'input') {
          this.searchValue = this.searchValueStore[prop]
          // 初始化
        } else if (key && !(key in this.searchValueStore) && filterBoxType === 'input') {
          this.searchValueStore[key] = ''
          this.searchValue = ''
        // 回选
        } else if (key && key in this.searchValueStore && filterBoxType === 'input') {
          this.searchValue = this.searchValueStore[key]
          // 初始化
        } else if (filterBoxType === 'date-rage' && !(key[0] in this.searchValueStore) && !(key[1] in this.searchValueStore)) {
          this.searchValueStore[key[0]] = ''
          this.searchValueStore[key[1]] = ''
          this.searchValue = []
        // 回选
        } else if (filterBoxType === 'date-rage' && (key[0] in this.searchValueStore) && (key[1] in this.searchValueStore)) {
          this.searchValue = [this.searchValueStore[key[0]], this.searchValueStore[key[1]]]
        // 初始化
        } else if (filterBoxType === 'single-select' && !(prop in this.searchValueStore)) {
          this.searchValueStore[prop] = ''
        // 回选
        } else if (filterBoxType === 'single-select' && (prop in this.searchValueStore)) {
          this.searchValue = this.searchValueStore[prop]
        }
      } else {
        //  如果有外层的包裹对象
        // 初始化
        if (!(outSideKey in this.searchValueStore)) {
          this.searchValueStore[outSideKey] = {}
          if (!(key in this.searchValueStore[outSideKey]) && filterBoxType === 'select') {
            this.searchValueStore[outSideKey][key] = ''
            this.searchValue = []
          } else if (!(prop in this.searchValueStore[outSideKey]) && filterBoxType === 'input') {
            this.searchValueStore[outSideKey][prop] = ''
            this.searchValue = ''
          } else if (filterBoxType === 'date-rage' && (key[0] in this.searchValueStore[outSideKey]) && (key[1] in this.searchValueStore[outSideKey])) {
            this.searchValue = [this.searchValueStore[outSideKey][key[0]], this.searchValueStore[outSideKey][key[1]]]
          } else if (filterBoxType === 'single-select' && !(prop in this.searchValueStore[outSideKey])) {
            this.searchValueStore[outSideKey][key] = ''
          }
          // 回选
        } else {
          if ((key in this.searchValueStore[outSideKey]) && filterBoxType === 'select') {
            this.searchValue = this.searchValueStore[outSideKey][key] ? this.searchValueStore[outSideKey][key].split(',') : []
          } else if (prop in this.searchValueStore[outSideKey] && filterBoxType === 'input') {
            this.searchValue = this.searchValueStore[outSideKey][prop]
          } else if (filterBoxType === 'date-rage' && (key[0] in this.searchValueStore[outSideKey]) && (key[1] in this.searchValueStore[outSideKey])) {
            this.searchValue = [this.searchValueStore[outSideKey][key[0]], this.searchValueStore[outSideKey][key[1]]]
          } else if (filterBoxType === 'single-select' && prop in this.searchValueStore[outSideKey]) {
            this.searchValue = this.searchValueStore[outSideKey][prop]
          }
        }
      }
    },
    clearSingleSearchValue() {
      const { prop, filterBoxType, key, outSideKey } = this.filterBoxInfo
      if (!outSideKey) {
        if (filterBoxType === 'select') {
          this.searchValueStore[key] = ''
          this.searchValue = []
        } else if (!key && (filterBoxType === 'input' || filterBoxType === 'single-select')) {
          this.searchValueStore[prop] = ''
          this.searchValue = ''
        } else if (filterBoxType === 'input' && key) {
          this.searchValueStore[key] = ''
          this.searchValue = ''
        } else if (filterBoxType === 'date-rage') {
          this.searchValueStore[key[0]] = ''
          this.searchValueStore[key[1]] = ''
          this.searchValue = []
        }
      } else {
        if (filterBoxType === 'select') {
          this.searchValueStore[outSideKey][key] = ''
          this.searchValue = []
        } else if (filterBoxType === 'input' || filterBoxType === 'single-select') {
          this.searchValueStore[outSideKey][prop] = ''
          this.searchValue = ''
        } else if (filterBoxType === 'date-rage') {
          this.searchValueStore[outSideKey][key[0]] = ''
          this.searchValueStore[outSideKey][key[1]] = ''
          this.searchValue = []
        }
      }
      this.isShowSearchBox = false
      eventBus.$emit('getQueryParams', this.searchValueStore)
      this.$emit('clearSingleHightIcon', prop)
    },
    search() {
      const { prop, filterBoxType, key, outSideKey } = this.filterBoxInfo
      if (!outSideKey) {
        if (filterBoxType === 'select') {
          this.searchValueStore[key] = this.searchValue.join(',')
        } else if (!key && (filterBoxType === 'input' || filterBoxType === 'single-select')) {
          this.searchValueStore[prop] = this.searchValue
        } else if (filterBoxType === 'input' && key) {
          this.searchValueStore[key] = this.searchValue
        } else if (filterBoxType === 'date-rage') {
          this.searchValueStore[key[0]] = this.searchValue ? this.searchValue[0] : ''
          this.searchValueStore[key[1]] = this.searchValue ? this.searchValue[1] : ''
        }
      } else {
        if (filterBoxType === 'select') {
          this.searchValueStore[outSideKey][key] = this.searchValue.join(',')
        } else if (filterBoxType === 'input' || filterBoxType === 'single-select') {
          this.searchValueStore[outSideKey][prop] = this.searchValue
        } else if (filterBoxType === 'date-rage') {
          this.searchValueStore[outSideKey][key[0]] = this.searchValue[0]
          this.searchValueStore[outSideKey][key[1]] = this.searchValue[1]
        }
      }
      if (this.searchValue === '' || (this.searchValue && this.searchValue.length === 0) || (filterBoxType === 'date-rage' && !this.searchValueStore[key[0]] && !this.searchValueStore[key[1]])) {
        this.$emit('clearSingleHightIcon', prop)
      } else {
        this.$emit('hightCurrentIcon', prop)
      }
      this.searchValue = ''
      this.isShowSearchBox = false
      eventBus.$emit('getQueryParams', this.searchValueStore)
    },

    handleCheckAllChange(val) {
      this.searchValue = val ? this.filterBoxInfo.options.map(i => i.value) : []
      this.isIndeterminate = false
    },
    changeTimeRage() {
      this.isShowSearchBox = false
      this.search()
    },
    radioClick(item) {
      const index = this.searchValue.findIndex(i => i === item.value)
      if (index > -1) {
        this.searchValue.splice(index, 1)
      } else {
        this.searchValue.push(item.value)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .search-box {
          position: fixed;
          width: 200px;
          transform: translate(-50%,0);
          .conent-input {
               padding: 8px 10px 10px 8px;
              width: 100%;
              height: 88px;
              background: #fff;
              border-radius: 4px;
              border: 1px solid #ccc;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .btns {
                display: flex;
                justify-content: space-between;
                margin-top: 8px;
              }
          }

      .select-wrapper {
            background: #fff;
            display: flex;
            flex-direction: column;
            border-radius: 4px;
            border: 1px solid #ccc;
            padding: 10px;
            width: 100%;
            height: 380px;
            .content {
             overflow-y: auto;
              height:300px;
              width:100%;
            }
            .btns {
                width: 100%;
                bottom: 10px;
                height: calc(100% - 300px);
                background-color:#fff ;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              }
            .el-checkbox-group{
              display: flex;
              flex-direction: column;
              /deep/ .el-checkbox {
                height: 30px;
              }
            }
          }
  }
    .content-single-select {
          overflow-y: auto;
          position: relative;
          height: 200px;
          padding: 10px 10px 20px 10px;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 4px;
          border: 1px solid #ccc;
          .el-radio-group {
            display: flex;
            flex-direction: column;
            ::v-deep .el-radio-button {
              height: 30px;
            }
            ::v-deep .el-radio-button__inner {
              display: block;
              border: none;
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 30px;
            }
          }
          .btns {
            display: flex;
            justify-content: space-between;
          }

    }

  </style>

