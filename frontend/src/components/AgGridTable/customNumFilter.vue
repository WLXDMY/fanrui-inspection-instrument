<!--
 * @Author: zhaozhuo
 * @Date: 2021-11-29 09:01:18
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-24 14:49:19
 * @Description:
-->
<template>
  <div class="custom-numfilter">
    <el-select v-model="filterSelectValue" :popper-append-to-body="false" class="ipt-item mb-10" size="mini" placeholder="请选择" @change="selectvalChange">
      <el-option
        v-for="item in filterOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input v-model="rangeVal1" class="ipt-item mb-10" size="mini" placeholder="请输入数字" @input="verifyNum('rangeVal1')" @keyup.enter.native="confirmFilter" />
    <el-input v-show="isSelectRange" v-model="rangeVal2" class="ipt-item mb-10" size="mini" placeholder="请输入数字" @input="verifyNum('rangeVal2')" @keyup.enter.native="confirmFilter" />
    <div class="footer-box">
      <el-button
        class="btn-cancel"
        size="mini"
        @click="confirmFilter"
      >
        确定
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomNumFilter',
  inject: ['agTable'],
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    field: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filterSelectValue: 'gtEqual',
      filterOptions: [
        {
          label: '大于等于',
          value: 'gtEqual'
        },
        {
          label: '小于等于',
          value: 'ltEqual'
        },
        {
          label: '范围',
          value: 'range'
        }
      ],
      rangeVal1: '',
      rangeVal2: '',
      cloneFilterParam: {}
    }
  },
  computed: {
    isSelectRange() {
      return this.filterSelectValue === 'range'
    }
  },
  watch: {
    isActive(status) {
      if (!status) return

      // 恢复数据
      if (!this.cloneFilterParam[this.field]) {
        this.filterSelectValue = 'gtEqual'
        this.rangeVal1 = ''
        this.rangeVal2 = ''
        return
      }
      const curFilterParams = this.cloneFilterParam[this.field]
      if (curFilterParams.selectType !== 'range') {
        this.rangeVal1 = curFilterParams.inputVals
      } else {
        const valArr = curFilterParams.inputVals.split(',')
        this.rangeVal1 = valArr[0]
        this.rangeVal2 = valArr[1]
      }
    }
  },
  mounted() {
    this.agTable.customFilterComs.push(this)
  },
  methods: {
    // 重置参数
    resetData() {
      this.$emit('update-filteractive', { key: 'filterActive', status: false })
      this.cloneFilterParam = {}
      this.filterSelectValue = 'gtEqual'
      this.rangeVal1 = ''
      this.rangeVal2 = ''
    },
    selectvalChange(val) {
      if (val === 'range') {
        this.rangeVal2 = ''
      }
    },
    verifyNum(key) {
      const num = this[key].replace(/[^-\d.]*/g, '').match(/^-|\d|\./g)
      if (num && num.length) {
        this[key] = num.join('').replace(/(\.\d{0,2})(.*)$/, '$1')
      } else {
        this[key] = ''
      }
    },
    // 发送过滤参数
    confirmFilter() {
      const filterParam = {}
      if (this.filterSelectValue === 'range' && (this.rangeVal1 && this.rangeVal2)) {
        filterParam[this.field] = {
          selectType: this.filterSelectValue,
          inputVals: `${this.rangeVal1},${this.rangeVal2}`
        }
      } else if (this.filterSelectValue !== 'range' && this.rangeVal1) {
        filterParam[this.field] = {
          selectType: this.filterSelectValue,
          inputVals: this.rangeVal1
        }
      } else {
        this.$notify({
          title: '提示',
          message: '请输入筛选数字',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.cloneFilterParam = JSON.parse(JSON.stringify(filterParam))

      this.$emit('update-filtervisible', { key: 'isFilterVisible', status: false })
      this.$emit('update-filteractive', { key: 'filterActive', status: true })
      this.agTable.getList({
        numberFilterList: [{
          id: this.field,
          term: filterParam[this.field].selectType,
          value: filterParam[this.field].inputVals
        }]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mb-10 {
  margin-bottom: 10px;
}
.custom-numfilter {
  padding: 0 5px;
  .ipt-item {
    width: 100%;
  }
  .footer-box {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
