const assert = require('assert').strict
const fs = require('fs')
const path = require('path')

function read(relativePath) {
  const filePath = path.resolve(__dirname, relativePath)
  assert.ok(fs.existsSync(filePath), `缺少实现文件：${relativePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

const listSource = read('../src/views/quality_management/instrument/index.vue')
const editSource = read('../src/views/quality_management/instrument/components/itemCommonPage.vue')
const extensionSource = read('../src/views/quality_management/instrument/components/InstrumentExtensionSection.vue')

assert.match(listSource, /<ItemGroupTree/, '列表页必须保留左侧仪器分类树')
assert.match(listSource, /<ElTableContent/, '列表页必须保留右侧仪器表格')
assert.match(listSource, /@click="handleAdd"/, '新增触发逻辑必须保持不变')
assert.match(listSource, /@click="hdBtnBacthEdit"/, '批量编辑触发逻辑必须保持不变')
assert.match(listSource, /@click="jumpLinkToItemGroup"/, '分类管理触发逻辑必须保持不变')
assert.match(listSource, /@click="reset\(\)"/, '重置触发逻辑必须保持不变')
assert.match(listSource, /@click="handleUpdate\(row\)"/, '编辑触发逻辑必须保持不变')
assert.match(listSource, /@click="handleMore\(row\)"/, '详情触发逻辑必须保持不变')
assert.match(listSource, /@click="handleDelete\(row\)"/, '删除触发逻辑必须保持不变')
assert.match(
  listSource,
  /::v-deep\s+\.instrument-content\s*>\s*\.bg-box\s*>\s*\.pagination-container\s*\{[\s\S]*position:\s*static/,
  '分页条必须参与右侧内容区布局，不能被表格固定列覆盖'
)
assert.match(
  listSource,
  /::v-deep\s+\.instrument-content\s*>\s*\.bg-box\s*>\s*\.pagination-container\s*\{[\s\S]*width:\s*100%/,
  '分页条必须限制在右侧内容区内'
)

assert.match(editSource, /@click="back"/, '返回触发逻辑必须保持不变')
assert.match(editSource, /@click="handleSaveBtn"/, '保存触发逻辑必须保持不变')
assert.doesNotMatch(editSource, /max-width:\s*1200px/, '编辑页不能比列表内容区更窄')
assert.match(editSource, /\.scroll\s*\{[\s\S]*padding:\s*16px/, '编辑页必须与列表页使用相同的 16px 内容边距')
assert.match(editSource, /grid-template-columns:\s*repeat\(3/, '基本信息必须使用稳定的三列布局')
assert.match(extensionSource, /<el-row\s+:gutter="20"\s+class="extension-fields">/, '扩展信息列间距必须与基本信息的 20px 网格一致')
assert.match(editSource, /label-width="128px"/, '基本信息标签宽度必须为长字段名称预留单行空间')
assert.match(extensionSource, /label-width="128px"/, '扩展信息标签宽度必须与基本信息的 128px 标签宽度一致')
assert.match(extensionSource, /\.extension-form\s+\.el-form-item__label\s*\{[\s\S]*white-space:\s*nowrap/, '扩展字段标签必须保持单行显示')

assert.match(extensionSource, /@click="openFieldEditor"/, '字段编辑触发逻辑必须保持不变')
assert.match(extensionSource, /custom-class="field-editor-dialog"/, '字段弹窗必须使用独立样式作用域')
assert.match(extensionSource, /width="1040px"/, '桌面字段弹窗必须容纳下拉选项配置列')
assert.match(extensionSource, /\.extension-info-content\s*\{[\s\S]*min-height:\s*0/, '扩展信息高度必须由字段行数自然撑开')
assert.match(extensionSource, /v-for="field in fields"[\s\S]*:span="8"/, '扩展字段桌面端必须与基础信息一致，每行显示三个')
assert.match(extensionSource, /<el-form[^>]*:inline="true"[^>]*class="extension-form"/, '扩展字段输入框宽度必须沿用基础信息的行内表单规格')
assert.match(extensionSource, /\.extension-form\s+\.el-date-editor\.el-input\s*\{[\s\S]*width:\s*207px/, '时间输入框必须与基础信息文本框保持相同宽度')
assert.match(extensionSource, /@media\s*\(max-width:\s*1199px\)[\s\S]*\.el-col-8[\s\S]*width:\s*50%/, '扩展字段中等宽度下必须切换为每行两个')
assert.match(extensionSource, /@media\s*\(max-width:\s*899px\)[\s\S]*\.el-col-8[\s\S]*width:\s*100%/, '扩展字段窄屏下必须切换为每行一个')

console.log('PASS: instrument UI framework and trigger logic are preserved')
