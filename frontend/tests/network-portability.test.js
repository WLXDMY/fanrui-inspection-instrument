const assert = require('assert').strict
const fs = require('fs')
const path = require('path')

function read(relativePath) {
  const filePath = path.resolve(__dirname, relativePath)
  assert.ok(fs.existsSync(filePath), `缺少网络可移植性文件：${relativePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

const uploadEnv = read('../.env.upload')
const runtimeSource = read('../src/utils/upload-runtime.js')
const extensionSource = read('../src/api/instrument-extension.js')
const mainUploadSource = read('../src/main-upload.js')
const nginxRoute = read('../../deployment/instrument-extension.nginx.conf')

assert.doesNotMatch(uploadEnv, /172\.16\.0\.3:18091/, '上传包不得固定访问设备私网 18091')
assert.match(uploadEnv, /VUE_APP_INSTRUMENT_EXTENSION_API\s*=\s*['"]?\/instrument-extension\/api\/v1/, '上传环境必须使用同源扩展路径兜底')
assert.match(runtimeSource, /runtimeBaseUrl[\s\S]*instrument-extension\/api\/v1/, '扩展路径必须基于宿主实时 baseUrl')
assert.match(mainUploadSource, /visibilitychange/, '页面从后台恢复时必须刷新宿主地址')
assert.match(mainUploadSource, /addEventListener\(['"]online['"]/, '网络恢复时必须刷新宿主地址')
assert.match(extensionSource, /config\.method[\s\S]*get[\s\S]*__runtimeRetried/, '只能对 GET 网络错误自动重试一次')
assert.match(nginxRoute, /location \^~ \/instrument-extension\/api\/v1\//, '设备入口必须提供独立同源路由')
assert.match(nginxRoute, /proxy_pass http:\/\/127\.0\.0\.1:18091\/api\/v1\//, '同源路由必须只转发到本机独立扩展服务')
assert.match(nginxRoute, /proxy_set_header Authorization \$http_authorization/, '代理必须透传登录授权')

console.log('PASS: upload package follows the active host network and same-origin gateway')
