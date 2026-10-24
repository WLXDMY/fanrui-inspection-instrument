<template>
  <el-dialog
    class="validateDialog"
    title="保存结果"
    :visible.sync="visible"
    :close-on-click-modal="false"
  >
    <div class="tipsInfo">
      <i class="el-icon-warning" />
      <span> 执行失败{{ failedSum }}个 </span>
      （您可以单击字段自动定位到当前位置）
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="400px">
      <el-table-column type="index" width="80" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="position" label="所在位置" width="200">
      </el-table-column>
      <el-table-column class-name="fieldName-column" label="字段名" width="200">
        <template slot-scope="scope">
          <span @click="jumpPosition(scope.row)">{{
            scope.row.fieldName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="descriptions-column"
        prop="descriptions"
        label="问题描述"
      >
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="visible = false">取 消</el-button> -->
      <el-button type="primary" @click="clickSure">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ValidateDialog',
  components: {},
  props: {},
  data() {
    return {
      visible: false,
      okCallback: null,
      tableData: []
    }
  },
  computed: {
    failedSum() {
      return this.tableData?.length || 0
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getParams(options = {}) {
      console.log('🚀 ~ getParams ~ options:', options)
      this.changeTabs = options.otherFunc?.changeTabs
      this.expandInfo = options.otherFunc?.expandInfo
      this.tableData = options.tableData
      this.visible = true
    },
    // 跳转到指定位置
    jumpPosition(row) {
      this.visible = false
      console.log('🚀 ~ row:', row)
      if (this.changeTabs && row.tabName) {
        this.changeTabs(row.tabName)
      }
      if (this.expandInfo && !row.tabName) {
        console.log(row.tabName)
        this.isElementDisplay(row.dom) && this.expandInfo()
      }
      setTimeout(() => {
        row.dom.scrollIntoView({
          block: 'nearest',
          inline: 'center'
        })
      }, 100)
    },
    isElementDisplay(element) {
      if (!element) return false
      let el = element
      let level = 0
      while (el && level < 5) {
        // 检查当前元素及其向上五层的父元素
        const style = window.getComputedStyle(el)
        if (style.display === 'none') {
          return true
        }
        el = el.parentElement
        level++
      }
      return false
    },
    clickSure() {
      this.visible = false
      this.jumpPosition(this.tableData[0])
    }
  }
}
</script>

<style lang="scss">
.validateDialog {
  // .el-dialog__header {
  //   background-color: #f2f5fc;
  // }
  .el-table {
    border: 1px solid #dfe6ec;
  }
  .el-table__header-wrapper .el-table__cell {
    background-color: #f2f5fc;
  }
  .el-table__body-wrapper {
    .fieldName-column .cell {
      color: #1890ff; /* 设置文字颜色 */
      cursor: pointer;
    }

    .descriptions-column .cell {
      color: #f9921c; /* 设置文字颜色 */
    }
  }
  .tipsInfo {
    height: 50px;
    display: flex;
    align-items: center;
    margin-top: -15px;
    i {
      margin: 2px;
      font-size: 20px;
      color: #f9921c;
    }
    span {
      color: #f9921c;
    }
  }
}
</style>
