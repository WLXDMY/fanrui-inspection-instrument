const assert = require('assert').strict
const fs = require('fs')
const path = require('path')

const requestSource = fs.readFileSync(
  path.resolve(__dirname, '../src/utils/request.js'),
  'utf8'
)

assert.match(
  requestSource,
  /if \(\/401\/\.test\(error\.message\) && process\.env\.VUE_APP_LOCAL_SOURCE_PREVIEW !== 'true'\)/,
  '本地源码预览收到 401 时不得执行 resetLogin/location.reload'
)

console.log('PASS: local preview 401 reload guard is present')
