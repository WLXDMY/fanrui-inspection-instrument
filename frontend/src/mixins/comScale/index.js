/*
 * @Author: shunhua.liang
 * @Date: 2022-06-21 09:14:45
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-06-29 16:18:18
 * @Description:
 */
export default {
  watch: {
    // 父级参数
    screenParams: {
      handler(newVal) {
        const { width, height } = newVal || {};
        (width) && (this.currentWidth = width / 0.7 + 'px');
        (height) && (this.currentHeight = height / 0.7 + 'px')
      },
      immediate: true,
      deep: true
    }
  }
}
