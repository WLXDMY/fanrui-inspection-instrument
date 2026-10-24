<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-15 16:49:38
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-09-01 15:39:38
 * @Description:
-->
<template>
  <!-- 定制内容 -->
  <div v-if="componentNameList.length" class="base-info">
    <div class="title">
      <div class="text">定制配置信息</div>
      <div class="open-img" @click="expand">
        <img
          src="@/assets/images/home/xiala@2x.png"
          alt=""
          width="11"
          height="12"
        >
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="isOpenCustomInfo">
        <!-- 编辑 -->
        <el-form
          v-if="isEdit"
          ref="dataForm"
          :model="extendInfo"
          :inline="true"
          :rules="rules"
          @submit.native.prevent
        >
          <template v-for="item in componentNameList">
            <el-form-item
              v-if="item.componentName == 'tbSurface'"
              :key="item.componentName"
              :prop="item.componentName"
              :label="`${item.componentCname}:`"
            >
              <el-switch
                v-model="extendInfo[item.componentName]"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="item.disabled"
              />
              <!-- 拼版数 -->
              <el-input
                v-if="item.componentName == 'makeUpQuantity'"
                v-model="extendInfo[item.componentName]"
                size="small"
                :disabled="item.disabled"
              />
            </el-form-item>
            <!-- 拼版数 -->
            <el-form-item
              v-if="item.componentName == 'makeUpQuantity' || item.componentName == 'batchNumber'"
              :key="item.componentName"
              :prop="item.componentName"
              :label="`${item.componentCname}:`"
            >
              <el-input
                v-model.number="extendInfo[item.componentName]"
                style="width:246px"
                size="small"
                :disabled="item.disabled"
                @input="(val) => onInput(val, item.componentName)"
              />
            </el-form-item>
            <!-- 颜色规格 -->
            <el-form-item
              v-if="item.componentName == 'colorSpecification'"
              :key="item.componentName"
              class="form-item-widthfulll"
              :prop="item.componentName"
            >
              <Color ref="color" :list.sync="extendInfo[item.componentName]" />
            </el-form-item>
          </template>
        </el-form>
        <!-- 详情显示 -->
        <div v-else class="info-box">
          <template v-for="item in componentNameList">
            <div
              v-if="item.componentName == 'tbSurface'"
              :key="item.componentName"
              class="info-item"
            >
              <div class="infoname">{{ item.componentCname }}:</div>
              <div class="infotext">
                {{ extendInfo[item.componentName] == true ? "是" : "否" }}
              </div>
            </div>
            <div
              v-if="item.componentName == 'makeUpQuantity' || item.componentName == 'batchNumber'"
              :key="item.componentName"
              class="info-item"
            >
              <div class="infoname">{{ item.componentCname }}:</div>
              <div class="infotext">
                {{ extendInfo[item.componentName] || "--" }}
              </div>
            </div>
            <ColorDetail
              v-if="item.componentName == 'colorSpecification'"
              :key="item.componentName"
              :list="extendInfo[item.componentName]"
            />
          </template>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import Color from './color.vue'
import ColorDetail from './colorDetail.vue'

export default {
  name: 'CustomInfo',
  components: { Color, ColorDetail },
  props: {
    isOpenCustomInfo: {
      type: Boolean,
      default: false
    },
    customInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    customFormConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      extendInfo: {},
      rules: {},
      componentNameList: [],
      colorData: []
    }
  },
  watch: {
    customFormConfig: {
      handler() {
        // 设置属性
        this.setFormItemProps()
      },
      deep: true
    },
    customInfo: {
      handler(nVal) {
        this.setCustomInfo(this.componentNameList, nVal)
      },
      deep: true
    },
    componentNameList: {
      handler(nVal) {
        this.setCustomInfo(nVal, this.customInfo)
      },
      deep: true
    }
  },
  created() {
    this.getCustomizationComponentName()
  },
  methods: {
    expand() {
      this.$emit('update:isOpenCustomInfo', !this.isOpenCustomInfo)
    },
    setCustomInfo(componentNameList, customInfo) {
      if (!customInfo) return
      componentNameList.forEach(item => {
        // eslint-disable-next-line eqeqeq
        if (item.supplementaryData == this.type) {
          this.$set(
            this.extendInfo,
            item.componentName,
            customInfo[item.componentName]
          )
        }
      })
    },
    setFormItemProps() {
      const customFormConfigKeys = Object.keys(this.customFormConfig || {})
      if (!customFormConfigKeys.length || !this.componentNameList.length) return
      customFormConfigKeys.forEach((key) => {
        // eslint-disable-next-line eqeqeq
        const curIndex = this.componentNameList.findIndex(item => key == item.componentName)
        // eslint-disable-next-line eqeqeq
        if (curIndex != -1) {
          this.$set(this.componentNameList, curIndex, {
            ...this.componentNameList[curIndex],
            ...this.customFormConfig[key]
          })
        }
      })
    },
    getCustomizationComponentName() {
      this.$store
        .dispatch('customized/getCustomizationComponentName', {
          locationMarkerName: 'web'
        })
        .then(customList => {
          this.componentNameList = customList.filter(
            // eslint-disable-next-line eqeqeq
            item => item.supplementaryData == this.type
          )
          this.setFormItemProps()
        })
        .catch(err => {
          console.log(err, 'err')
        })
    },
    onInput(val, key) {
      switch (key) {
        case 'makeUpQuantity':
          this.extendInfo[key] = val.replace(/[^\d]/g, '')
          break
        default:
          break
      }
    },
    validateOtherComponent(key) {
      switch (key) {
        case 'colorSpecification':
          if (this.$refs.color) {
            return this.$refs.color[0].validateComponent()
          } else {
            return true
          }
        default:
          break
      }
    },
    getCustomData() {
      return new Promise(resolve => {
        let customValid = null
        this.$refs['dataForm'].validate(valid => {
          customValid = valid
        })
        const isComponentValid = this.validateOtherComponent(
          'colorSpecification'
        )
        if (customValid && isComponentValid) {
          resolve(this.extendInfo)
        }
        resolve(null)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.base-info {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  padding: 24px 24px 16px 24px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  ::v-deep .el-form-item {
    width: 24%;
    .el-form-item__label {
      padding: 0 8px 0 0;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  ::v-deep .el-form--inline .el-form-item__label {
    // width: 35%;
    width: 110px;
  }
  ::v-deep .el-form-item--medium .el-form-item__content {
    width: 58%;
  }
  ::v-deep .form-item-widthfulll {
    width: 100%;
    .el-form-item__content {
      width: 100%;
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    font-size: 20px;
  }
  .info-box {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .info-item {
      width: 25%;
      display: flex;
      line-height: 24px;
      font-size: 14px;
      padding-bottom: 14px;
      font-weight: 400;

      .infoname {
        display: flex;
        justify-content: flex-end;
        width: 126px;
        padding-right: 10px;
      }

      .infounit {
        margin-left: 10px;
      }
      .file-url {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a {
          color: rgb(53, 129, 243);
        }
      }
    }
  }
  .save-btn {
    width: 88px;
    height: 32px;
    background: rgba(24, 144, 255, 0.2);
    color: #1890ff;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      margin-right: 8px;
    }
  }
}
</style>
