const assert = require('assert').strict
const fs = require('fs')
const path = require('path')

function read(relativePath) {
  const filePath = path.resolve(__dirname, relativePath)
  assert.ok(fs.existsSync(filePath), `缺少精简构建文件：${relativePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

const vueConfig = read('../vue.config.js')
const uploadEnv = read('../.env.upload')
const uploadEntry = read('../src/main-upload.js')
const uploadRoutes = read('../src/router/modules/instrumentOnly.js')
const uploadConstants = read('../src/router/modules/instrumentOnlyConstant.js')
const uploadHtml = read('../src/index-upload.html')

assert.match(vueConfig, /if \(!isUploadPackage\)[\s\S]*EasyPlayer-lib\.min\.js/, 'EasyPlayer 只能复制到普通 QMS 构建')
assert.match(vueConfig, /config\.entry\('app'\)\.clear\(\)\.add\(resolve\('src\/main-upload\.js'\)\)/, '上传模式必须使用独立精简入口')
assert.match(vueConfig, /instrumentOnly\.js/, '上传模式必须使用检验仪器专用路由')
assert.doesNotMatch(uploadHtml, /EasyPlayer|libDecoder|\.wasm|\.swf/, '上传 HTML 不得加载视频播放器')
assert.doesNotMatch(uploadEnv, /VUE_CLI_BABEL_TRANSPILE_MODULES\s*=\s*true/, '上传构建必须保留动态分包，不能把所有页面并入首屏')

const expectedRoutes = [
  '/inspection-manage/qms-product-inspection/instrument',
  '/inspection-manage/qms-product-inspection/instrument/add',
  '/inspection-manage/qms-product-inspection/instrument/detail',
  '/inspection-manage/qms-product-inspection/instrument/edit',
  '/inspection-manage/qms-product-inspection/instrument-classify'
]
for (const routePath of expectedRoutes) {
  assert.ok(uploadRoutes.includes(`path: '${routePath}'`), `缺少检验仪器路由：${routePath}`)
}
assert.equal((uploadRoutes.match(/path:\s*'\/inspection-manage\/qms-product-inspection/g) || []).length, 5, '上传路由只能包含 5 个检验仪器页面')
assert.match(uploadConstants, /path:\s*'\*'[\s\S]*redirect:\s*'\/inspection-manage\/qms-product-inspection\/instrument'/, '未知地址必须返回检验仪器列表')
assert.doesNotMatch(uploadConstants, /profile|about|404|暂无权限/, '上传常量路由不得编译无关页面或大图')

for (const unusedImport of ['echarts', 'v-gantt-chart', '@ag-grid-community', 'MaterialSelectComplex', "from 'lodash'"]) {
  assert.ok(!uploadEntry.includes(unusedImport), `上传入口不得引入未使用依赖：${unusedImport}`)
}
for (const requiredImport of ['element-ui', 'CommonCodeRuleDialog', 'validateDialog', 'directive/permission', 'utils/common.js']) {
  assert.ok(uploadEntry.includes(requiredImport), `上传入口必须保留检验仪器依赖：${requiredImport}`)
}

console.log('PASS: upload-only P1/P2 slim build contract is present')
