<template>
  <el-select v-model="childSelectedValue" class="select" v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="item in options"
      :key="item.value"
      ref="option-item"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    childSelectedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    console.log(this, 'this')
  }
}
</script>

<style lang="scss" scoped>

/deep/.el-select-dropdown__list ,.hover {
background-color: #ccc;
}
</style>
