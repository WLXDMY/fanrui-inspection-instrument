<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-18 15:28:07
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-07-05 10:32:44
 * @Description:
-->
<template>
  <div class="form-box">
    <el-form ref="formData" :rules="formRules" :model="formData" size="small">
      <div
        v-for="(item) in formItems"
        :key="item.attr"
        class="level input-box flex-align-center"
      >
        <div
          :class="['input-name', item.isRequired ? 'required' : '']"
        >
          {{ item.label }}
        </div>
        <template v-if="item.iptType == 'select'">
          <el-form-item :prop="item.attr">
            <el-select
              v-model="formData[item.attr]"
              :placeholder="item.placeholder"
              size="small"
              class="input-top"
              :style="item.style"
              @visible-change.once="getSelectList(item)"
            >
              <el-option
                v-for="e in item.listArr"
                :key="e.type"
                :label="e.name"
                :value="e.type"
              />
            </el-select>
          </el-form-item>
        </template>
        <template v-else-if="item.iptType == 'remoteSelect'">
          <el-form-item :prop="item.attr">
            <el-select
              v-model="formData[item.attr]"
              filterable
              remote
              :placeholder="item.placeholder"
              :remote-method="keyword => remoteMethod(keyword, item.attr)"
              class="input-top"
              size="small"
              :style="item.style"
              @change="val => changeRemoteSelect(val, item.listAttr)"
            >
              <el-option
                v-for="e in item.listArr"
                :key="e.value"
                :label="e.label"
                :value="e.value"
              />
            </el-select>
          </el-form-item>
        </template>
        <template v-else-if="item.iptType == 'date'">
          <el-form-item :prop="item.attr">
            <el-date-picker
              v-model="formData[item.attr]"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="small"
              :style="item.style"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item :prop="item.attr">
            <el-input
              v-model="formData[item.attr]"
              :placeholder="item.placeholder"
              :clearable="item.isClearable"
              :disabled="item.isDisabled"
              :type="item.type"
              :class="item.type ? 'input-top' : ''"
              size="small"
              :style="item.style"
            />
          </el-form-item>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Formbox',
  props: {
    formRules: {
      type: Object,
      default() {
        return {}
      }
    },
    formItems: {
      type: Array,
      default() {
        return []
      }
    },
    initFormData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  watch: {
    initFormData: {
      handler(nVal) {
        this.formItems.forEach(item => {
          this.$set(this.formData, item.attr, nVal[item.attr])
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 获取选择列表
    getSelectList(item) {
      const { listApi } = item
      listApi().then((list) => {
        item.listArr = list
      })
    },
    // 远程
    remoteMethod(keyword, item) {
      const { listApi } = item
      listApi(keyword).then((list) => {
        item.listArr = list
      })
    },
    changeRemoteSelect(val, listAttr) {
      // todo
    },
    // 外部获取数据
    getFormData() {
      return new Promise(resolve => [
        this.$refs.formData.validate(valid => {
          if (valid) {
            resolve(this.formData)
          } else {
            resolve(false)
          }
        })
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  ::v-deep .el-form {
    display: flex;
    height: 100%;
    width: 100%;
    flex-wrap: wrap;
  }
  .input-box {
    height: 32px;
    margin-bottom: 14px;
    .input-top {
      width: 280px;
    }
    .input-name {
      display: flex;
      justify-content: flex-end;
      width: 120px !important;
      margin: 0 7px 0 0;
      font-size: 14px;
      font-weight: medium;
      color: #333333;
      opacity: 1;
    }
    .required::before {
      content: '*';
      color: #ff4949;
      margin-right: 4px;
    }
    ::v-deep .el-form-item {
      margin-bottom: 0 !important;
    }
  }
}
</style>
