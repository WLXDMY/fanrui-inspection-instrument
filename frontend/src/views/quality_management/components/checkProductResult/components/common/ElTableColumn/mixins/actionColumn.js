/*
 * @Author: shunhua.liang
 * @Date: 2022-08-17 19:24:51
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-09-01 10:52:26
 * @Description: 表格右侧列操作
 */
import { v4 as uuidv4 } from 'uuid'
const actionColumn = {
  methods: {
    // 弹窗关闭
    closeDialog() {

    },
    // 获取用户设置列的值，重新请求列接口
    getColumnList() {
      this.isShowCustomColumn = false
      // 重新获取列的数据
      this.$nextTick(() => {
        this.getColumn()
      })
    },
    // 对表格列进行了拖拽，表格需要重新排序
    dragColumn(value = []) {
      // 如果为空数组，直接返回
      if (!value.length) return
      // 根据数据，过滤出需要展示的列数据
      const filterColumn = this.columnList.filter(item => {
        return value.includes(item.code)
      })
      // 根据数据，对另外一个数据进行排序
      filterColumn.sort((a, b) => {
        return value.indexOf(a.code) - value.indexOf(b.code)
      })
      // 赋值, 重新绑定key 值， 避免页面不刷新
      this.columnList = filterColumn.map(item => {
        return {
          ...item,
          id: uuidv4()
        }
      })
      this.$forceUpdate()
      // 对表格进行重新布局
      this.$nextTick(() => {
        this.$refs?.listTable?.doLayout()
      })
    }
  }
}

export default actionColumn
