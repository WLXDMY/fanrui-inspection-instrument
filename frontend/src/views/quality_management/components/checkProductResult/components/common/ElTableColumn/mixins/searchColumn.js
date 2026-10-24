/*
 * @Author: shunhua.liang
 * @Date: 2022-08-30 09:49:26
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-09-01 15:04:02
 * @Description: 表格列搜索功能
 */

const searchColumn = {
  data() {
    return {
      isShowSearchBox: false, // 是否展示搜索弹窗
      searchList: [],
      searchQuery: {}
    }
  },
  methods: {
    // 搜索框的值
    actionList(val) {
      this.isShowSearchBox = false
      this.$emit('tableHeaderSearch', val)
    },
    // 单击清空时的操作
    clearList(val) {
      this.$emit('tableHeaderClear', val)
    },
    // 关闭搜索弹窗
    closeDialogSearch() {
      this.isShowSearchBox = false
    }
  }

}

export default searchColumn
