// router/index.js 保持普通 QMS 的结构；上传模式不会把该占位路由注册到页面。
export default {
  path: '/__instrument-only-unused',
  hidden: true,
  children: []
}
