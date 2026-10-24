<!--
 * @Author: shunhua.liang
 * @Date: 2022-05-09 18:28:25
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-21 14:08:12
 * @Description: 自定义列
-->

<template>
  <div class="custom-column">
    <!-- 选择 -->
    <section class="define-box">
      <section class="content">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0" />
        <el-checkbox-group
          v-model="checkedColumns"
          @change="handleCheckedColumnChange"
        >
          <el-checkbox
            v-for="(item, index) in columnList"
            :key="index"
            v-dragging="{ item: item, list: columnList, group: 'checkbox' }"
            :label="item.code"
            class="handle"
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </section>
      <!-- 操作按钮 -->
      <section class="action">
        <button class="cancel" @click="cancel">取消</button>
        <button class="sure" @click="obitColumn">确认</button>
      </section>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { saveCurrentColumnList } from '@/api/column'
import VueDND from 'awe-dnd'

Vue.use(VueDND)
export default {
  props: {
    // 配置的的表头，一般不允许更改
    configList: {
      type: Array,
      require: false,
      default: () => {
        return []
      }
    },
    // type
    modularType: {
      type: String,
      require: true,
      default: () => {
        return ''
      }
    },
    // 是否有多个列的配置
    multiColumn: {
      type: Object,
      require: false,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      checkedColumns: [],
      columnList: [],
      show: true,
      configColumnList: [], // 非对象的列配置
      settingColumnList: []
    }
  },
  watch: {
    configList: {
      handler(newVal = []) {
        this.columnList = newVal.filter(item => item.label)
        // 已经勾选的列数据
        this.checkedColumns = newVal
          .filter(item => item.isSelected)
          .map(item => item.code)
        this.configColumnList = newVal
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 复选框拖拽
      this.$dragging.$on('dragged', ({ value }) => {
        const { list } = value
        const result = list.map(item => {
          return item.code
        })
        // 过滤出已经选择排序好的元素
        const template = result.filter(item =>
          this.checkedColumns.includes(item)
        )
        this.checkedColumns = template
      })
    })
  },
  methods: {
    // 全选
    handleCheckAllChange(val) {
      const checkAllList = this.columnList.map(item => {
        return item.code
      })
      this.checkedColumns = val ? checkAllList : []
      this.isIndeterminate = false
    },
    // 选择数据
    handleCheckedColumnChange(val) {
      const checkedCount = val.length
      this.checkAll = checkedCount === this.columnList.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.columnList.length
    },
    // 取消
    cancel() {
      this.$emit('closeDialog')
    },
    // 判断类型
    judgeType(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    },
    // 确认
    obitColumn(type) {
      const { columnName, columnSetting, columnCurrent } =
        this.multiColumn || {}
      const list = []
      let tem = ''
      this.checkedColumns?.forEach(el => {
        columnCurrent?.forEach(item => {
          const res = list.findIndex(
            child => child.code === el && child.name === item.label
          )
          if (el === item.code && res === -1) {
            list.push({ code: el, width: item.width, name: item.label })
          }
        })
        // const res = columnCurrent.filter(item=> item.code === el)
        // if(res.length === 1) {
        //   const { label,width } = res[0]
        //   list.push({
        //     code: el,
        //     width,
        //     name: label
        //   })
        // } else if(res.length > 1) {
        //   const template = res.find(item=> {
        //     return list.findIndex(child=> child.code === item.code && child.name === item.name)
        //   })
        //   console.log(template, list, res)

        //   if(template) {
        //     list.push({
        //       code: el,
        //       width:template?.width,
        //       name: template?.label
        //     })
        //   } else {
        //     list.push({
        //         code: el,
        //         width:res[0]?.width,
        //         name: res[0]?.label
        //     })
        //   }

        // }
      })
      // 如果 columnName 有值 表明是多列的配置
      if (columnName && columnSetting) {
        Object.keys(columnSetting).forEach(el => {
          // 排除setting
          if (el !== 'setting') {
            // 判断是否已经是字符串了
            if (this.judgeType(columnSetting[el]) !== 'string') {
              columnSetting[el] = JSON.stringify(columnSetting[el])
            }
          }
        })
        columnSetting[columnName] = JSON.stringify(list)
        tem = JSON.stringify(columnSetting)
      } else {
        tem = JSON.stringify(list)
      }

      const params = {
        columnInformation: tem,
        modularType: this.modularType,
        // 后端接口有变化
        userName: 'all'
        // userName: type || this.$store.getters.userInfo.username
      }
      saveCurrentColumnList(params).then(res => {
        const { code, message } = res.data || {}
        if (+code === 200) {
          this.$emit('updateColumn')
          this.$notify({
            title: '提示',
            message: message,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '提示',
            message: message,
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-column {
  height: 100%;
  box-sizing: border-box;
  margin-left: 10px;
  .define-box {
    width: 300px;
    height: 100%;
    border: 1px solid #1890ff;
    padding: 10px 20px 0 20px;
  }
  .content {
    height: calc(100% - 60px);
    overflow: auto;
  }
  .action {
    display: flex;
    justify-content: flex-end;
    button {
      width: 64px;
      height: 32px;
      border: 1px solid #d9d9d9;
      background: none;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;
    }
    button:nth-of-type(2) {
      background: #1890ff;
      color: #ffffff;
      margin-left: 20px;
    }
  }

  ::v-deep .el-checkbox {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
