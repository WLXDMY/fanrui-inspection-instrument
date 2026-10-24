<template>
  <button :type="type" class="custom-button">
    <span><slot name="before" /></span>
    <!-- <img class="btn-img" src="@/assets/images/home/xinjian@2x.png" alt=""> -->
    <!-- <span class="btn-text">上传</span> -->
    <span><slot name="default" /></span>
    <!-- <img class="btn-img" src="@/assets/images/home/xinjian@2x.png" alt=""> -->
    <span><slot name="after" /></span>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    type: { required: false, type: String, default: 'primary' }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.custom-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1890ff;
  border-radius: 0;
  border: 0;
  .btn-text {
    // line-height: 18px;
    margin: 0 8px;
  }
}
</style>
