const assert = require('assert').strict
const fs = require('fs')
const path = require('path')

const layoutSource = fs.readFileSync(
  path.resolve(__dirname, '../src/views/layout/index.vue'),
  'utf8'
)
const previewSource = fs.readFileSync(
  path.resolve(__dirname, '../src/local-source-preview.js'),
  'utf8'
)

assert.match(
  layoutSource,
  /<sidebar v-if="!isSubApp && !isInstrumentOnlyPreview"/,
  '检验仪器专用预览不得显示 QMS 侧边栏'
)
assert.match(
  layoutSource,
  /<div v-if="!isSubApp && !isInstrumentOnlyPreview">\s*<navbar/,
  '检验仪器专用预览不得显示 QMS 顶部栏'
)
assert.match(
  layoutSource,
  /isSubApp \|\| isInstrumentOnlyPreview \? 'margin-left:0px' : ''/,
  '检验仪器专用预览的内容区不得保留侧栏间距'
)
assert.match(
  previewSource,
  /const instrumentRoutePaths = new Set\(/,
  '本地预览必须声明检验仪器专用路由白名单'
)
assert.match(
  previewSource,
  /store\.commit\('permission\/FRONT_ROUTES', instrumentOnlyRoutes\)/,
  '本地预览不得再向导航注入全部 QMS 路由'
)

console.log('PASS: local source preview is instrument-only')
