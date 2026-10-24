const assert = require('assert').strict
const fs = require('fs')
const path = require('path')

function read(relativePath) {
  const filePath = path.resolve(__dirname, relativePath)
  assert.ok(fs.existsSync(filePath), `缺少小程序运行时适配文件：${relativePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

const runtimeSource = read('../src/utils/upload-runtime.js')
const requestSource = read('../src/utils/request.js')
const extensionSource = read('../src/api/instrument-extension.js')
const authSource = read('../src/utils/auth.js')

assert.match(runtimeSource, /flutter_inappwebview/, '上传包必须支持从精制桥接读取运行参数')
assert.match(runtimeSource, /callHandler\(['"]getBaseurl['"]\)/, '上传包必须从宿主读取凡瑞服务地址')
assert.match(runtimeSource, /callHandler\(['"]getToken['"]\)/, '上传包必须从宿主读取当前登录授权')
assert.match(runtimeSource, /localStorage\.getItem\(['"]baseUrl['"]\)/, '上传包必须优先复用本地服务地址')
assert.match(runtimeSource, /localStorage\.getItem\(['"]Token['"]\)/, '上传包必须优先复用本地登录授权')
assert.match(runtimeSource, /forceRefresh/, '上传包必须支持网络切换后强制刷新宿主运行参数')
assert.match(runtimeSource, /getUploadExtensionBaseUrl/, '扩展接口必须与主接口共用宿主 baseUrl')
assert.doesNotMatch(runtimeSource, /if \(!localStorage\.getItem\(['"]baseUrl['"]\)\)/, '宿主地址不能只在缓存为空时读取')
assert.doesNotMatch(runtimeSource, /eyJ[A-Za-z0-9_-]{20,}/, '上传包不得写入临时 JWT')

assert.match(requestSource, /ensureUploadRuntime/, 'QMS 主接口必须等待小程序运行参数就绪')
assert.match(requestSource, /getUploadFactoryBaseUrl/, 'QMS 主接口必须使用宿主 baseUrl 拼接 factory\/v1')
assert.match(requestSource, /const token = getToken\(\)/, 'QMS 主接口应直接读取宿主授权，不依赖微前端 store 初始化')

assert.match(extensionSource, /ensureUploadRuntime/, '扩展接口必须与 QMS 主接口共用宿主授权初始化')
assert.match(extensionSource, /getUploadExtensionBaseUrl/, '扩展接口必须在每次请求时解析当前宿主地址')
assert.match(extensionSource, /forceRefresh:\s*true/, '扩展 GET 网络失败后必须刷新宿主地址再重试一次')
assert.match(extensionSource, /const runningStatus = localStorage\.getItem\(['"]yelinkEnv['"]\)/, '扩展接口应先读取有效运行状态')
assert.match(extensionSource, /if \(runningStatus\)/, '没有运行状态时不得发送无意义请求头')
assert.doesNotMatch(extensionSource, /Running-Status['"]\]\s*=\s*localStorage\.getItem\(['"]yelinkEnv['"]\)\s*\|\|\s*null/, '不得把 null 作为 Running-Status 发给服务端')
assert.doesNotMatch(requestSource, /Running-Status['"]\]\s*=\s*localStorage\.getItem\(['"]yelinkEnv['"]\)\s*\|\|\s*null/, 'QMS 主接口同样不得发送空 Running-Status')
assert.match(authSource, /localStorage\.getItem\(TokenKey\)/, '授权工具必须支持宿主 localStorage')
assert.match(authSource, /localStorage\.getItem\(TokenTypeKey\)/, '授权类型必须支持宿主 localStorage')

console.log('PASS: uploaded miniapp reuses host runtime address and authorization')
