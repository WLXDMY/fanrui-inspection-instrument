const assert = require('assert').strict
const fs = require('fs')
const path = require('path')

function read(relativePath) {
  const filePath = path.resolve(__dirname, relativePath)
  assert.ok(fs.existsSync(filePath), `缺少实现文件：${relativePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

const parentSource = read('../src/views/quality_management/instrument/components/itemCommonPage.vue')
const componentSource = read('../src/views/quality_management/instrument/components/InstrumentExtensionSection.vue')
const apiSource = read('../src/api/instrument-extension.js')
const proxySource = read('../../deployment/instrument-extension.nginx.conf')

assert.match(componentSource, />扩展信息</, '仪器页面必须显示“扩展信息”模块')
assert.match(componentSource, />字段编辑</, '扩展字段管理入口必须命名为“字段编辑”')
assert.match(componentSource, /title="扩展字段编辑"/, '字段编辑必须使用弹窗承载')
assert.match(componentSource, /:data="fieldRows"/, '字段编辑弹窗必须列出数据库中已有字段')
assert.match(componentSource, /openFieldEditor/, '点击字段编辑时必须加载并回显已有字段')
assert.match(componentSource, /saveFieldRow/, '字段编辑弹窗必须支持新增和修改字段')
assert.match(componentSource, /disableFieldRow/, '字段编辑弹窗必须支持停用字段')
assert.match(componentSource, /MAX_EXTENSION_FIELDS:\s*10/, '全局扩展字段最多只能配置 10 个')
assert.match(componentSource, /value="TEXT"/, '扩展字段必须支持文本输入类型')
assert.match(componentSource, /value="DATETIME"/, '扩展字段必须支持时间类型')
assert.match(componentSource, /el-empty/, '没有字段时必须提供明确空状态')
assert.match(
  componentSource,
  /<el-form[\s\S]*v-else-if="fields\.length"[\s\S]*:model="values"[\s\S]*<el-form-item/,
  '动态字段的 el-form-item 必须位于独立 el-form 内，确保 Element UI 可以渲染输入控件'
)
assert.match(
  componentSource,
  /if \(!this\.instrumentId\) \{[\s\S]*getFieldDefinitions\(\)[\s\S]*return[\s\S]*await synchronizeInstrument\(this\.instrumentId\)[\s\S]*const extension = await getInstrumentExtension\(this\.instrumentId\)[\s\S]*this\.applyExtension\(extension\)/,
  '仪器页面必须使用扩展聚合接口一次读回字段和值'
)
assert.match(
  componentSource,
  /const savedField =[\s\S]*createFieldDefinition\(payload\)[\s\S]*this\.mergeFieldDefinition\(savedField\)/,
  '字段创建成功后必须立即加入当前页面，不能等待第二次网络读取才显示'
)
assert.match(parentSource, /<instrument-extension-section/, '原仪器编辑与详情页必须挂载扩展信息组件')
assert.match(parentSource, /saveAfterInstrument/, '原保存按钮成功后必须同步保存扩展信息')
assert.match(apiSource, /\/field-definitions/, '前端必须读取全局字段定义')
assert.match(apiSource, /put\(`\/field-definitions\/\$\{encodeURIComponent\(id\)\}`/, '前端必须接入字段修改接口')
assert.match(apiSource, /delete\(`\/field-definitions\/\$\{encodeURIComponent\(id\)\}`/, '前端必须接入字段停用接口')
assert.match(apiSource, /\/instruments\/.*\/sync/, '前端必须按稳定仪器 id 同步编号和名称')
assert.match(apiSource, /\/instruments\/.*\/extension/, '前端必须保存并读回仪器扩展值')
assert.match(proxySource, /\/instrument-extension\/api\/v1\//, '本地代理必须为独立扩展服务提供同源入口')
assert.match(proxySource, /proxy_set_header Authorization \$http_authorization/, '同源代理必须透传登录授权')

console.log('PASS: instrument extension UI integration is present')
