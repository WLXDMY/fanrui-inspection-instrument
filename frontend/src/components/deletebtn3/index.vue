
<template>
  <!-- <el-button type="danger" size="mini" @click="deletedetails()">删除</el-button> -->
  <div class="delete-text" @click="deletedetails()">删除</div>
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
    return {}
  },
  methods: {
    deletedetails() {
      this.$confirm(`${this.tableConfig.deletename}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('show', this.deleteid)
          return new Promise((resolve, reject) => {
            deletebtn(`${this.tableConfig.url}${this.deleteid}`)
              .then((response) => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.$emit('deletegetlist', this.deleteid)
                resolve()
              })
              .catch((error) => {
                reject(error)
              })
          }).catch(() => {
            return false
          })
        })
        .catch(() => {
          return false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-text {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #ff4949;
  border-radius: 4px;
  opacity: 1;
  padding: 0 3px;
  cursor: pointer;
}
.delete-text:hover {
  background-color: rgba(24, 144, 255, 0.2);
}
</style>
