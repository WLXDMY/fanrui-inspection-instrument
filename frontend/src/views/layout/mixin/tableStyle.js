export default {
  methods: {
    // 表格样式
    cellClass() {
      return { textAlign: 'center', padding: '0 0', height: `calc((100vh - 355px)/${this.listQuery.limit}` }
    },
    // 表头样式
    headClass() {
      return { backgroundColor: '#FAFAFA', textAlign: 'center', height: '50px', color: '#000' }
    }
  }
}
