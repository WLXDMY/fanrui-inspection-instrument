<template>
  <el-button type="danger" size="mini" @click="deletedetails()">删除</el-button>
</template>

<script>
import { deletebtn } from '@/api/base'
export default {
  props: {
    deleteid: {
      type: Number,
      default: null
    },
    tableConfig: {
      type: Object,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {
    deletedetails() {
      this.$confirm(`${this.tableConfig.deletename}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('show', this.deleteid)
        return new Promise((resolve, reject) => {
          deletebtn(`${this.tableConfig.url}${this.deleteid}`).then(response => {
            this.$emit('deletegetlist', this.deleteid)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).catch(() => {
          return false
        })
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
