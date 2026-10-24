<!--
 * @Author: limengjuan
 * @Date: 2022-01-14 15:12:03
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-01-17 14:52:24
 * @Description:
-->
<template>
  <div class="color-box">
    <div class="info-item">
      <div class="infoname">规格：</div>
      <div v-if="list && list.length" class="infotext">
        {{ filterList("colorSpecification") }}
      </div>
    </div>
    <div class="info-item">
      <div class="infoname">颜色：</div>
      <div v-if="list && list.length" class="infotext">
        {{ filterList("color") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    filterList(key) {
      const len = this.list.length - 1
      return this.list.reduce((str, item, currentIndex) => {
        currentIndex == len ? str += item[key] : str += item[key] + ','
        return str
      }, '')
    }
  }
}
</script>
<style lang="scss" scoped>
.color-box {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .info-item {
    width: 25%;
    display: flex;
    line-height: 24px;
    font-size: 14px;
    padding-bottom: 14px;
    font-weight: 400;
    .infoname {
      display: flex;
      justify-content: flex-end;
      width: 126px;
      padding-right: 10px;
    }
  }
}
</style>
