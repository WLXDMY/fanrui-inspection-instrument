<!--
 * @Author: youjuan.hu
 * @Date: 2023-02-14 15:00:07
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-11-21 15:36:39
 * @Description: 计划、任务-设备分类树形图
-->
<template>
  <div class="content-left-box" :style="{ width: width }">
    <!-- 左移/右移箭头 -->
    <img
      v-if="showArrow"
      class="left-arrow"
      src="@/assets/images/common/tree-switch.png"
      alt=""
      width="38"
      height="56"
      @click="handleArrow('off')"
    >
    <img
      v-if="!showArrow"
      class="left-arrow"
      src="@/assets/images/common/tree-switch-r.png"
      alt=""
      width="38"
      height="56"
      @click="handleArrow('on')"
    >
    <header :style="{ display: showArrow ? 'block' : 'none' }">
      <el-input v-model="groupName" style="padding: 5px 5px" placeholder="请输入检验项目组">
        <el-button slot="append" icon="el-icon-search" @click="clickItemGroupName" />
      </el-input>
      <el-checkbox v-model="checkedAll" style="padding-left: 19px">全部</el-checkbox>
    </header>
    <main :style="{ display: showArrow ? 'block' : 'none' }">
      <el-tree
        ref="itemGroupTree"
        node-key="id"
        :data="treeList"
        :props="props"
        show-checkbox
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        @check="subRoleTreeCheck"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </main>
  </div>
</template>

<script>
import { getProjectGroupTreeList } from '@/api/quality-manage.js'
export default {
  data() {
    return {
      props: {
        label: 'groupName',
        children: 'sonItemGroupList'
      },
      count: 1,
      totalCount: 0, // 总的项目组数量
      groupName: '',
      treeList: [],
      selectGroupIds: [],
      checkedAll: false, // 全选
      defaultCheckedKeys: [],
      showArrow: true,
      width: '260px'
    }
  },
  watch: {
    checkedAll: {
      handler(newVal, oldVal) {
        const tempGroupIds = []
        if (newVal) {
          this.recurseSelectGroup(tempGroupIds, this.treeList)
          this.$refs?.itemGroupTree?.setCheckedKeys(tempGroupIds)
        } else {
          this.$refs?.itemGroupTree?.setCheckedKeys([])
        }
        this.selectGroupIds = tempGroupIds
        this.emitChangeCheck()
      }
      // immediate: true,
      // deep: true
    }
  },
  mounted() {
    this.getAllTreeItemGroup()
  },
  methods: {
    // 左移/右移箭头
    handleArrow(type) {
      if (type === 'off') {
        this.width = '20px'
        this.showArrow = false
      } else if (type === 'on') {
        this.width = '300px'
        this.showArrow = true
      }
    },
    // 获取所有选中的节点id
    subRoleTreeCheck(keys, leafOnly) {
      const { checkedNodes = [] } = leafOnly
      this.selectGroupIds = checkedNodes?.map(item => item.id)
      this.emitChangeCheck()
    },
    recurseSelectGroup(selectGroupIds, sonItemGroupList) {
      if (sonItemGroupList) {
        sonItemGroupList.forEach(item => {
          selectGroupIds.push(item.id)
          if (item.sonItemGroupList) {
            this.recurseSelectGroup(selectGroupIds, item.sonItemGroupList)
          }
        })
      }
    },
    resetAllSelect() {
      const tempGroupIds = []
      // this.recurseSelectGroup(tempGroupIds, this.treeList)
      this.$refs?.itemGroupTree?.setCheckedKeys(tempGroupIds)
    },
    async clickItemGroupName() {
      const res = await getProjectGroupTreeList({ groupName: this.groupName })
      this.treeList = res.data?.data
      // this.checkedAll = true
      const tempGroupIds = []
      if (this.checkedAll) {
        this.recurseSelectGroup(tempGroupIds, this.treeList)
      }
      this.selectGroupIds = tempGroupIds
      this.emitChangeCheck()
    },
    emitChangeCheck() {
      let params = []
      if (this.selectGroupIds && this.selectGroupIds.length !== this.totalCount) {
        params = this.selectGroupIds
      }
      this.$emit('changeCheck', params)
    },
    async getAllTreeItemGroup() {
      const res = await getProjectGroupTreeList({})
      this.treeList = res.data?.data
      // this.checkedAll = true
      if (this.treeList) {
        const tempGroupIds = []
        this.recurseSelectGroup(tempGroupIds, this.treeList)
        this.totalCount = tempGroupIds.length
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div,
header {
  box-sizing: border-box;
}
.content-left-box {
  position: relative;
  display: flex;
  flex-direction: column;
  .left-arrow {
    position: absolute;
    top: 200px;
    right: -9px;
    z-index: 100;
  }
  header {
    height: 80px;
    //background: #f2f5fc;
    border-radius: 1px;
    line-height: 40px;
    padding-left: 5px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #333333;
  }
  main {
    flex: 1 0 auto;
    height: 0;
    box-sizing: border-box;
    .el-tree {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
