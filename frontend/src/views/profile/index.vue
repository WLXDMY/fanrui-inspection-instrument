<!--
 * @Author: youjuan.hu
 * @Date: 2022-09-08 20:08:41
 * @LastEditors: youjuan.hu
 * @LastEditTime: 2022-12-20 15:30:26
 * @Description:
-->
<template>
  <div class="container">
    <div class="personal-center-left">
      <el-menu default-active="1" @select="handleSelectMenu">
        <el-menu-item index="1">
          <span slot="title">基本设置</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">安全设置</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="personal-center-right">
      <BasicSetup v-if="menuItem === '1'" />
      <SecuritySetting v-else-if="menuItem === '2'" />
    </div>
  </div>
</template>

<script>
import BasicSetup from '@/views/profile/basic-setup/index'
import SecuritySetting from '@/views/profile/security-settings/index'
export default {
  components: {
    BasicSetup,
    SecuritySetting
  },
  data() {
    return {
      menuItem: '1',
      userdata: {},
      pwd: ''
    }
  },
  mounted() {},
  methods: {
    handleSelectMenu(index, indexPath) {
      this.menuItem = index
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #eaeff5;
  padding: 24px 24px;
  height: calc(100vh - 48px);
  overflow: auto;
  display: flex;

  .personal-center-left {
    width: 224px;
    height: auto;
    background-color: #fff;
    padding-top: 19px;
    .el-menu {
      font-weight: 500;
      font-family: Source Han Sans CN;
      font-size: 14px;
      .is-active {
        background: #e6f7ff;
        color: #1890ff;
        border-right: 3px solid #1890ff;
      }
      .el-menu-item {
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .personal-center-right {
    flex: 1;
    overflow: auto;
    height: auto;
    padding-top: 19px;
    background-color: #fff;
  }
}
</style>
