<!--
 * @Author: your name
 * @Date: 2021-09-17 15:16:55
 * @LastEditTime: 2021-09-25 10:47:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \master\src\components\uploadBtn.vue
-->
<!--  -->
<template>
  <div>
    <div class="upFile">
      <slot name="title" />
      <input
        :id="id"
        type="file"
        title=""
        :disabled="disabled"
        @change="changeFile"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    file: {
      type: [Object, String, File]
    },
    id: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  watch: {
    file(newVal, oldVal) {
      if (newVal === '') {
        const fileDom = document.getElementById(this.id)
        fileDom.value = ''
      }
    }
  },
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    changeFile(e) {
      const file = e.target.files[0]
      this.$emit('bindFile', file)
    }
  }
}
</script>
<style lang="scss" scoped>
.upFile {
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
}
.upFile input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  width: 100%;
  height: 100%;
}
</style>
