const assert = require('assert').strict
const fs = require('fs')
const path = require('path')

function read(relativePath) {
  const filePath = path.resolve(__dirname, relativePath)
  assert.ok(fs.existsSync(filePath), `缺少上传包实现文件：${relativePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

const vueConfig = read('../vue.config.js')
const uploadEnv = read('../.env.upload')
const routerSource = read('../src/router/index.js')
const previewSource = read('../src/local-source-preview.js')
const extensionApiSource = read('../src/api/instrument-extension.js')

assert.match(vueConfig, /VUE_APP_UPLOAD_PACKAGE/, '上传构建必须使用独立开关，不能改变普通 QMS 生产构建')
assert.match(vueConfig, /isUploadPackage\s*\?\s*'\.\/\.\/'/, '上传构建必须使用与成功参考包一致的相对 publicPath')
assert.match(vueConfig, /isUploadPackage\s*\?\s*'dist-upload'/, '上传构建必须输出到独立 dist-upload')

assert.match(uploadEnv, /VUE_APP_UPLOAD_PACKAGE\s*=\s*true/, '上传模式必须显式启用')
assert.match(uploadEnv, /VUE_APP_STANDALONE_UPLOAD\s*=\s*true/, '上传包必须启用独立运行路由')
assert.match(uploadEnv, /VUE_APP_LOCAL_SOURCE_PREVIEW\s*=\s*true/, '上传包必须注入检验仪器路由和按钮权限')

assert.match(routerSource, /VUE_APP_STANDALONE_UPLOAD/, '路由必须识别独立上传模式')
assert.match(routerSource, /mode:\s*isStandaloneUpload\s*\?\s*'hash'\s*:\s*'history'/, '上传包必须使用可移植的 hash 路由')
assert.match(previewSource, /path:\s*'\/'[\s\S]*redirect:\s*'\/inspection-manage\/qms-product-inspection\/instrument'/, '上传包打开后必须进入检验仪器列表')

assert.match(extensionApiSource, /interceptors\.request\.use/, '扩展接口必须配置请求拦截器')
assert.match(extensionApiSource, /Authorization/, '扩展接口必须携带凡瑞登录授权')
assert.match(extensionApiSource, /getTokenType\(\)[\s\S]*getToken\(\)/, '扩展接口必须复用 QMS Token 和 Token-Type')

console.log('PASS: upload package contract is present')
