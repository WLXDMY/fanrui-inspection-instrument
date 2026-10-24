<!--
 * @Author: zhaozhuo
 * @Date: 2022-08-03 16:33:22
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-08-11 11:28:59
 * @Description: ...
-->
<template>
  <div class="print-btn">
    <slot>
      <el-button size="small" type="primary">打印</el-button>
    </slot>
    <SelectTemplateDialog ref="selectTemplateDialog" @setTemplateData="setTemplateData" />
  </div>
</template>

<script>
import Vue from 'vue'
import { hiPrintPlugin, hiprint, disAutoConnect } from 'vue-plugin-hiprint'

import SelectTemplateDialog from './components/selectTemplateDialog.vue'

Vue.use(hiPrintPlugin)
disAutoConnect() // 取消自动连接客户端
const noop = function() {}
let hiprintTemplate
export default {
  name: 'PrintBtn',
  components: {
    SelectTemplateDialog
  },
  props: {
    templateType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      printData: {},
      cb: noop
    }
  },
  methods: {
    setTemplateData(templateItem) {
      hiprintTemplate = new hiprint.PrintTemplate({
        template: JSON.parse(templateItem.templateData) || {}
      })
      this.print()
    },
    // 调用打印
    print(printData = this.printData, cb = this.cb) {
      if (!hiprintTemplate) {
        this.$message.warning('正在获取打印模板...')
        return
      }
      // 获取打印数据，完成调用done, done中可以传回调函数
      hiprintTemplate.print(printData, {}, {
        callback: cb
      })
    },
    // 点击打印按钮
    printBtnClick(params) {
      this.printData = params.printData
      this.cb = params.cb || noop
      this.$refs.selectTemplateDialog.show(this.templateType)
    }
  }
}
</script>

<style lang="scss" scoped>
.print-btn {
  display: inline-block;
}
</style>
