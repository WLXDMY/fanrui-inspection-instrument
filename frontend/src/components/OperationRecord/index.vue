<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-05-31 16:44:38
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-10-18 16:32:08
 * @FilePath: \yelink-qms\src\components\OperationRecord\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <section class="centerArea">
    <el-form
      :style="{ 'pointer-events': 'none' }"
      :inline="true"
      :model="recordInfo"
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item v-if="recordInfo && recordInfo.createByName" :label="recordInfoLabel.createByNameLabel">
        <el-input v-model="recordInfo.createByName" disabled size="mini" />
      </el-form-item>
      <el-form-item v-if="recordInfo && recordInfo.createTime" :label="recordInfoLabel.createTimeLabel">
        <el-date-picker v-model="recordInfo.createTime" disabled type="datetime" placeholder="选择日期时间" />
      </el-form-item>
      <el-form-item v-if="recordInfo && recordInfo.updateByName" :label="recordInfoLabel.updateByNameLabel">
        <el-input v-model="recordInfo.updateByName" size="mini" disabled />
      </el-form-item>
      <el-form-item v-if="recordInfo && recordInfo.updateTime" :label="recordInfoLabel.updateTimeLabel">
        <el-date-picker v-model="recordInfo.updateTime" disabled type="datetime" placeholder="选择日期时间" />
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  props: {
    recordInfo: {
      type: Object,
      default: () => {}
    },
    // 操作记录下面的字段名称
    recordInfoLabel: {
      type: Object,
      default: () => {
        return {
          createByNameLabel: '创建人:',
          createTimeLabel: '创建时间:',
          updateByNameLabel: '更新人:',
          updateTimeLabel: '更新时间:'
        }
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.centerArea {
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 4px 4px 4px 4px;
  background: white;
  padding: 12px 0px 9px 18px;
}
</style>
