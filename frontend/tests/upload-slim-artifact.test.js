const assert = require('assert').strict
const fs = require('fs')
const path = require('path')

const distRoot = path.resolve(__dirname, '../dist-upload')
assert.ok(fs.existsSync(path.join(distRoot, 'index.html')), '请先执行 npm run build:upload')

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = path.join(directory, entry.name)
    return entry.isDirectory() ? listFiles(absolutePath) : [absolutePath]
  })
}

const files = listFiles(distRoot)
const names = files.map(file => path.basename(file))
const totalBytes = files.reduce((total, file) => total + fs.statSync(file).size, 0)
const indexHtml = fs.readFileSync(path.join(distRoot, 'index.html'), 'utf8')
const compiledJavaScript = files
  .filter(file => file.endsWith('.js'))
  .map(file => fs.readFileSync(file, 'utf8'))
  .join('\n')

for (const forbiddenPattern of [/EasyPlayer/i, /libDecoder/i, /\.swf$/i, /crossdomain/i, /暂无权限/, /^404\./, /EMCImg|AMSImg|DFSImg|logoabout/]) {
  assert.ok(!names.some(name => forbiddenPattern.test(name)), `精简产物仍包含无关文件：${forbiddenPattern}`)
}
assert.doesNotMatch(indexHtml, /EasyPlayer|libDecoder|\.wasm|\.swf/, '精简产物首页不得引用视频播放器')
assert.ok(!names.includes('index-upload.html'), '模板源文件不能作为多余文件进入安装包')
assert.ok(totalBytes < 3 * 1024 * 1024, `精简产物超过 3 MiB：${totalBytes}`)

assert.match(compiledJavaScript, /\/inspection-manage\/qms-product-inspection\/instrument/, '精简产物必须包含检验仪器路由')
assert.match(compiledJavaScript, /\/inspection-manage\/qms-product-inspection\/instrument-classify/, '精简产物必须包含仪器分类路由')

console.log(`PASS: upload artifact is slim (${files.length} files, ${(totalBytes / 1024 / 1024).toFixed(3)} MiB raw)`)
