<!--
 * @Author: chenzejie
 * @Date: 2022-09-01 10:57:44
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-03-09 15:07:11
 * @Description:
-->
<template>
  <div>
    <el-dialog
      title="物料特征参数"
      :visible.sync="specificParamsVisible"
      width="592px"
      append-to-body
      custom-class="choice-dialog"
      :close-on-click-modal="false"
      @closed="$emit('cancel')"
    >
      <div
        v-for="(item, index) in specificParamsList"
        :key="index"
        class="specific-params-item"
      >
        <label>
          <span v-if="!isSearch" style="color: red">*</span>
          {{ item.auxiliaryAttrName }}：
        </label>
        <el-select
          v-model="item.valueCode"
          filterable
          clearable
          remote
          placeholder="请输入关键词"
          :loading="loading"
          :allow-create="isSearch"
          class="select-class"
          :remote-method="$event => remoteMethod($event, item, index)"
          @clear="handleClear(item, index)"
          @focus="
            e =>
              auxiliaryAttrValueList(
                item.auxiliaryAttrCode,
                specificParamsList[index]
              )
          "
        >
          <el-option
            v-for="i in item.options"
            :key="i.valueCode"
            :label="i.valueName"
            :value="i.valueCode"
          />
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('cancel')">
          {{ isSearch ? '清 空' : '取 消' }}
        </el-button>
        <el-button type="primary" @click="confirmSpecificParams">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  materialSkuAttrList,
  addMaterialSku,
  auxiliaryAttrValueList
} from '@/api/product-management'
import { getAuxiliaryAttrList } from '@/api/auxiliaryAttr'

import SpecificParamsValueDialog from './components/specificParamsValueDialog.vue'
export default {
  components: {
    SpecificParamsValueDialog
  },
  props: {
    // 父页面物料
    materialCode: {
      type: String,
      default: () => ''
    },
    skuId: {
      type: [Number, String],
      default: 0
    },
    // 是否为列表查询
    isSearch: {
      type: Boolean,
      default: () => false
    },
    // 为列表查询时，数据回显
    backValue: {
      type: [Array, String],
      default: () => []
    }
  },
  data() {
    return {
      specificParamsVisible: false,
      specificParamsValueVisible: false,
      specificParamsList: [],
      specificParamsCode: '',
      loading: false
    }
  },
  created() {
    if (this.isSearch) {
      this.getAuxiliaryAttrList()
    } else {
      this.materialSkuAttrList()
    }
  },
  methods: {
    // 查询物料特征参数列表
    getAuxiliaryAttrList() {
      getAuxiliaryAttrList({}).then(res => {
        const { code, data, message } = res.data || {}
        if (code === '200') {
          this.specificParamsList = this.handleBackValue(data?.records || [])
          this.specificParamsVisible = true
        } else {
          this.$notify({
            title: '提示',
            message: message || '获取物料特征参数列表失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 数据回显
    handleBackValue(list) {
      (this.backValue || []).forEach(item => {
        const index = list.findIndex(
          i => i.auxiliaryAttrCode === item.auxiliaryAttrCode
        )
        this.auxiliaryAttrValueList(item.auxiliaryAttrCode).then(res => {
          this.$set(list[index], 'options', res)
          this.$set(list[index], 'valueCode', item.valueCode)
        })
      })
      return list
    },
    // 根据物料查询物料特征参数列表
    materialSkuAttrList() {
      materialSkuAttrList({
        materialCode: this.materialCode,
        skuId: this.skuId
      }).then(res => {
        const { code, data, message } = res.data || {}
        if (code === '200') {
          this.specificParamsList = data
          this.specificParamsVisible = true
          ;(data ?? []).forEach(async(item, index) => {
            this.auxiliaryAttrValueList(
              item.auxiliaryAttrCode,
              this.specificParamsList[index]
            )
          })
        } else {
          this.$notify({
            title: '提示',
            message: message || '获取物料特征参数列表失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    async remoteMethod(valueName, item, index) {
      this.auxiliaryAttrValueList(
        item.auxiliaryAttrCode,
        this.specificParamsList[index],
        valueName || null
      )
    },
    async handleClear(item, index) {
      this.auxiliaryAttrValueList(
        item.auxiliaryAttrCode,
        this.specificParamsList[index]
      )
    },
    /**
     * @function 获取列表数据
     * @param auxiliaryAttrCode {String} 特征参数编码
     * @param container {Object} 特征值选项将添加到的对象
     * @return void
     **/
    async auxiliaryAttrValueList(
      auxiliaryAttrCode,
      container = null,
      valueName = null
    ) {
      const result = await auxiliaryAttrValueList({
        current: 1,
        size: 9999,
        state: 1,
        auxiliaryAttrCode,
        valueName
      })
      const { code, data, message } = result.data
      if (+code === 200) {
        container && this.$set(container, 'options', data || [])
        return data
      } else {
        this.$notify({
          title: '提示',
          message,
          type: 'error',
          duration: 2000
        })
      }
    },
    // 特征参数确认
    confirmSpecificParams() {
      if (this.isSearch) {
        const materialSkus = []
        this.specificParamsList.forEach(item => {
          if (item.valueCode) {
            materialSkus.push({
              auxiliaryAttrCode: item.auxiliaryAttrCode,
              valueCode: item.valueCode,
              valueName:
                item.options.find(i => i.valueCode === item.valueCode)
                  ?.valueName || item.valueCode
            })
          }
        })
        this.$emit('confirm', materialSkus)
      } else {
        if (this.specificParamsList.findIndex(item => !item.valueCode) !== -1) {
          this.$notify({
            title: '告警',
            message: '请正确填写表单',
            type: 'error',
            duration: 2000
          })
        } else {
          const params = this.specificParamsList.map(item => ({
            ...item,
            valueName: item.options.find(i => i.valueCode === item.valueCode)
              .valueName
          }))
          addMaterialSku(params).then(res => {
            const { code, data, message } = res.data
            if (code === '200') {
              this.$emit('confirm', data)
            } else {
              this.$notify({
                title: '告警',
                message: message || '系统错误',
                type: 'error',
                duration: 2000
              })
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .choice-dialog {
  z-index: 99999;
  .specific-params-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    label {
      flex: 0 0 20%;
      text-align: right;
      margin-right: 10px;
    }
    .select-class {
      flex: 1;
    }
  }
  .el-dialog__header {
    border-bottom: 1px solid #dfe6ec;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #333333;
  }
  .el-dialog__body {
    overflow: auto;
    padding: 33px 140px 20px 40px !important;
  }
}
</style>
