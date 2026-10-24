<!--
 * @Author: limengjuan
 * @Date: 2021-12-15 13:05:19
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-26 10:50:13
 * @Description: 拆分检验单-生产巡检单
-->
<template>
  <div class="wrapper-list-tabs">
    <el-tabs v-model="activeName">
      <el-tab-pane label="生产巡检单" name="checkSheet">
        <CheckSheet v-if="activeName == 'checkSheet'" />
      </el-tab-pane>
      <!-- <el-tab-pane label="检验记录" name="checkRecord">
        <CheckRecordfrom />
      </el-tab-pane>
      <el-tab-pane label="缺陷记录" name="defectRecord">
        <DefectRecord />
      </el-tab-pane> -->
    </el-tabs>
    <PushDownDialog
      v-if="showDialog"
      ref="dialogRef"
      :type-code="502"
      :show-dialog.sync="showDialog"
    />
  </div>
</template>
<script>
import CheckSheet from '../components/checkSheet/ProductionProcessIndex.vue'
// import CheckRecordfrom from './newComponents/checkRecord.vue'
// import DefectRecord from './newComponents/defectRecord.vue'
import PushDownDialog from './newComponents/pushDownDialog/index.vue'
export default {
  components: {
    CheckSheet,
    // CheckRecordfrom,
    // DefectRecord,
    PushDownDialog
  },
  data() {
    return {
      activeName: 'checkSheet',
      loading: false,
      showDialog: false
    }
  },

  created() {},
  mounted() {
    const pushDownData = JSON.parse(sessionStorage.getItem('PUSH_DOWN_DATA'))
    if (
      this.$route.query?.pushDownOrigin &&
      this.$route.query?.pushDownOrigin !== '' &&
      pushDownData &&
      typeof pushDownData === 'object' &&
      pushDownData !== null
    ) {
      this.showDialog = true
    }
  },

  methods: {}
}
</script>
<style lang="scss" scoped></style>
