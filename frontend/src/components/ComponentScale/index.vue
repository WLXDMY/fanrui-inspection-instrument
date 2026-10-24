<!--
 * @Author: your name
 * @Date: 2021-10-18 19:10:19
 * @LastEditTime: 2022-01-21 14:02:01
 * @LastEditors: shunhua.liang
 * @Description: In User Settings Edit
 * @FilePath: \master\src\components\componentScale\index.vue
-->
<template>
  <div
    class="ScreenAdapter"
    :style="style"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: '',
  // 参数注入
  props: {
    width: {
      type: String,
      default: '1920'
    },
    height: {
      type: String,
      default: '1080'
    },
    scaleSize: {
      type: [Boolean, Number],
      default: false
    },
    home: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        transform: 'scale(1) translate(-50%, -50%)'
      }
    }
  },
  mounted() {
    this.setScale()
    window.onresize = this.Debounce(this.setScale, 500)
  },
  methods: {
    Debounce: (fn, t) => {
      const delay = t || 500
      let timer
      return function() {
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        const context = this
        timer = setTimeout(() => {
          timer = null
          fn.apply(context, args)
        }, delay)
      }
    },
    // 获取放大缩小比例
    getScale() {
      // const w = window.innerWidth / this.width
      // const h = window.innerHeight / this.height
      // 改
      const w = this.width / 1360
      const h = this.height / 765
      return w < h ? w : h
    },
    // 设置比例
    setScale() {
      //   this.style.transform = 'scale(' + this.getScale() + ') translate(-50%, -50%)'
      // const transform = this.isEdit ? 'translate(-50%, -50%)' : 'translate(-54%, -62%)'
      // if (this.home) {
      //   return
      // }
      // this.scaleSize ? this.style.transform = 'scale(' + this.scaleSize + ') ' + transform : this.style.transform = 'scale(0.7) translate(-50%, -50%)'
      this.style.transform = 'scale(0.7) translate(-50%, -50%)'
    }
  }
}
</script>
<style lang="scss" scoped>
.ScreenAdapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  background: rgb(0,7,49);
}
</style>
