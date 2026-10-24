/*
 * @Author: shunhua.liang
 * @Date: 2022-07-07 11:40:36
 * @LastEditors: chenzejie
 * @LastEditTime: 2022-12-20 12:09:45
 * @Description:
 */
export default {
  props: {
    srceenComponents: {
      type: Array,
      default: () => []
    },
    screenTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeIndex: -1, // 右侧树弹框tab(设备大屏)
      list2: [], // 右侧树（可拖动的元素）
      currentLineId: '' // 产线大屏ID
    }
  },
  watch: {
    list2: {
      handler(val, old) {
        console.log(val, 'list2')
      },
      deep: true,
      immediate: true
    },

    srceenComponents: {
      handler(newV, oldV) {
        // console.log(newV, 'newV')
        newV.forEach(el => {
          el.components = el.components.split('-')[0]
        })
        this.list2 = [...newV]
      },
      immediate: true
    }
  },
  methods: {
    dragstop(item, index, left, top) {
      this.$set(this.list2, index, { ...item, left, top })
      this.$emit('addCompSite', this.list2[index])
    },
    // 每当组件调整大小时调用
    resize(x, y, width, height, element) {
      this.list2.forEach(el => {
        if (
          el.components === element.components &&
          el.sameComNumber === element.sameComNumber
        ) {
          el.width = width
          el.height = height
          this.$emit('addCompSize', el)
        }
      })
    },
    // 组件被单击时
    onActivated(index) {
      this.activeIndex = index
    },
    // 删除组件
    removeElement(item) {
      // this.$emit('delTab', item.components)
      // const index = this.list2.findIndex(el => el.components === item.components)
      // index > -1 && this.list2.splice(index, 1)
      // this.activeIndex = -1

      const index = this.list2.findIndex(
        i =>
          item.components === i.components &&
          item.sameComNumber === i.sameComNumber
      )
      index > -1 && this.list2.splice(index, 1)
      this.$emit('delTab', item)
    },
    syncComponentsList(addComsList) {
      this.list2 = addComsList.map(i => ({
        ...i,
        components: i.components.split('-')[0],
        left: i.comLeft,
        top: i.comTop
      }))
    },

    // 把当前添加组件传递到父组件中
    addComponent(val) {
      const {
        item: { _underlying_vm_: currentAddCom = {}}
      } = val || {}
      this.$emit('addTab', { ...currentAddCom })
    }
  }
}
