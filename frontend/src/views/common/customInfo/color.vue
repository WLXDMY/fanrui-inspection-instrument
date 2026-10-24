<!--
 * @Author: limengjuan
 * @Date: 2022-01-14 09:53:08
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-01-24 11:19:05
 * @Description:
-->
<template>
  <div class="color-wrapper">
    <div v-for="(item, index) in colorList" :key="index" class="box">
      <div class="colorBox">
        <div class="line" style="marign-right:30px">
          <label slot="label" class="label el-form-item__label">规格:</label>
          <el-input
            v-model="item.colorSpecification"
            style="width:246px"
            placeholder="请输入"
            size="small"
            @change="updateList"
          />
        </div>
        <div class="line">
          <div
            slot="label"
            class="label colorLabel label-must el-form-item__label"
          >
            颜色:
          </div>
          <div class="color-ipt">
            <el-input
              v-model="item.color"
              style="width:246px"
              placeholder="请输入"
              size="small"
              required
              @change="updateList"
              @input="val => colorInput(index, val)"
              @blur="e => colorBlur(e, index)"
            />
            <div
              v-show="isShowError(index)"
              slot="error"
              style="width:130px;line-height: 1; color: red;"
            >
              此项为必填项
            </div>
          </div>
        </div>
      </div>
      <div class="subBtn">
        <img
          v-if="index == colorList.length - 1"
          src="@/assets/images/home/timeAdd@2x.png"
          alt=""
          class="addSpan"
          @click="add"
        >
        <img
          v-if="index == colorList.length - 1"
          src="@/assets/images/home/delete@2x.png"
          alt=""
          class="addSpan"
          @click="sub(index)"
        >
        <!-- <span v-if="index == colorList.length - 1" class="addSpan" @click="add">+</span>
        <span v-if="index == colorList.length - 1" class="addSpan" @click="sub(index)">-</span> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 存放颜色的数组
    list: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data() {
    return {
      colorList: [
        {
          colorSpecification: '',
          color: ''
        }
      ],
      validateArrIndex: []
    }
  },
  watch: {
    list: {
      handler(newVal) {
        if (newVal && newVal?.length) {
          this.colorList = newVal
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 加一行
    add() {
      const len = this.colorList.length
      this.$set(this.colorList, len, {
        colorSpecification: '',
        color: ''
      })
      this.updateList()
    },
    // 减一行
    sub(index) {
      if (this.colorList.length <= 1) {
        this.$notify({
          title: '提示',
          message: '至少保留一行输入框',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.colorList.splice(index, 1)
      this.updateList()
    },
    // 更新数据
    updateList() {
      this.$emit('update:list', this.colorList)
    },
    isShowError(index) {
      return this.validateArrIndex.includes(index)
    },
    colorBlur(e, index) {
      const color = this.colorList[index].color
      if (!color) {
        return this.validateArrIndex.push(index)
      }
    },
    colorInput(index, val) {
      if (val) {
        const spliceIndex = this.colorList.findIndex((item, i) => i == index)
        const nValidateArrIndex = JSON.parse(
          JSON.stringify(this.validateArrIndex)
        ).splice(spliceIndex, 1)
        this.validateArrIndex = nValidateArrIndex
      }
    },
    validateComponent() {
      this.validateArrIndex = this.colorList.reduce((arr, item, index) => {
        if (!item.color) {
          arr.push(index)
        }
        return arr
      }, [])
      if (this.validateArrIndex.length) {
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
.color-wrapper {
  width: 100%;
  .colorBox {
    display: flex;
    width: 700px;
    .line {
      display: flex;
      margin: 5px;
      margin-right: 40px;
      width: 50%;
      .color-ipt {
        display: flex;
        flex-direction: column;
      }
    }
    .label {
      display: inline-block;
    }
    .label-must {
      &::before {
        content: "*";
        color: #ff4949;
        margin-right: 4px;
      }
    }
  }
  .box {
    position: relative;
    .subBtn {
      position: absolute;
      top: 5px;
      left: 750px;
      .addSpan {
        text-align: center;
        line-height: 18px;
        width: 18px;
        height: 18px;
        margin-left: 8px;
        cursor: pointer;
      }
    }
  }
}
</style>
