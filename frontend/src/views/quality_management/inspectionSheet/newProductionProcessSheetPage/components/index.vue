<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-12-05 14:16:10
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-25 16:09:28
 * @Description: 审批记录抽屉
-->
<template>
  <div>
    <el-drawer
      ref="drawer"
      size="40%"
      :before-close="handleClose"
      :visible.sync="diaVisible"
      modal
      wrapper-closable
      :modal-append-to-body="false"
      custom-class="demo-drawer"
    >
      <template #title>
        <div class="drawer-title">{{ titleDrawer }}</div>
      </template>

      <div class="demo-drawer__content">
        <el-divider />
        <div class="content">
          <el-steps direction="vertical" :active="activeIndex" :space="40">
            <el-step v-for="(item, index) in listDrawer" :key="index">
              <template slot="title">
                <div class="first-container">
                  <div class="left">{{ item.approvalPersonName }} {{ item.approvalPersonStatusName }}</div>
                  <div class="right">{{ item.approvalTime }}</div>
                </div>
              </template>
              <template slot="description">
                <div v-if="item.afterApprovalStatus === 6">{{ '审批单编号' + item.externalApprovalNumber }}</div>
                <!-- 描述内容 -->
                <div v-else>{{ item.approvalSuggestion }}</div>
              </template>
            </el-step>
          </el-steps>
          <el-empty v-if="listDrawer.length === 0" description="暂无数据" />
        </div>
        <!-- <div class="content">
          <el-steps direction="vertical" :active="3">
            <el-step v-for="(item, index) in 4" :key="index">
              <template slot="title">{{ '步骤' + item + 1 }} </template>
              <template slot="description"> 描述内容 </template>
            </el-step>
          </el-steps>
        </div> -->

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <!-- <el-button type="primary" @click="confirmForm">确 定</el-button> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'InspectDetailDrawer',
  components: {},
  inject: ['sheetInitStatus'],
  props: {
    titleDrawer: {
      type: String,
      default: ''
    },
    listDrawer: {
      type: Array,
      default() {
        return () => []
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    diaVisible: {
      get() {
        return this.visible
      },
      set() {}
    },
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isDetailType() {
      return this.$route.name.includes('Detail') || this.sheetInitStatus()
    },
    activeIndex() {
      return this.listDrawer.length || 0
    }
  },
  watch: {},
  created() {},
  mounted() {
    if (this.isDetailType) {
      setTimeout(() => {
        this.$disableInputDetail()
      }, 1500)
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('cancel')
      done()
    },
    cancelForm() {
      this.$emit('cancel')
    },
    confirmForm() {
      this.$emit('confirm')
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-title {
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
}
::v-deep .el-drawer__header {
  margin-bottom: 12px;
  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  padding: 20px 20px 0 20px;
}
.demo-drawer {
  .demo-drawer__content {
    padding: 0 15px 15px 15px;
    .content {
      margin-top: 12px;
    }
  }
  .demo-drawer__footer {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
}
::v-deep .noShowHeader > .el-tabs__header {
  display: none;
}
.first-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    color: #000;
  }
}
//去掉number输入框的上下箭头
::v-deep {
  .hide-spinners input::-webkit-outer-spin-button,
  .hide-spinners input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .hide-spinners input[type='number'] {
    -moz-appearance: textfield;
  }
  // 解决input number框输入中文后光标上移的问题
  .hide-spinners .el-input__inner {
    line-height: 1px !important;
  }
}
::v-deep .el-form-item--medium .el-form-item__content {
  width: 248px;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 248px;
}
::v-deep .el-divider--horizontal {
  margin: 0;
}
::v-deep .no-border-radius .el-input__inner {
  border-radius: 0px !important;
}
::v-deep .el-tabs__content {
  height: 100%;
  overflow: hidden;
}
</style>
