import MaterialSelectComplex3 from './index.vue'
// 存储组件列表
const comp = [MaterialSelectComplex3]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = Vue => {
  // 判断是否安装
  if (install.installed) return
  install.installed = true
  comp.forEach(comp => {
    Vue.component(comp.name, comp)
  })
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
