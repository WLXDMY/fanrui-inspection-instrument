<template>
  <section class="extension-info">
    <div class="extension-info-title">
      <p>扩展信息</p>
      <div class="extension-actions">
        <span class="field-count">共用字段 {{ fields.length }}/{{ MAX_EXTENSION_FIELDS }}</span>
        <el-button
          v-if="!readonly"
          class="field-editor-trigger"
          type="text"
          icon="el-icon-edit"
          aria-label="编辑全部检验仪器共用字段"
          @click="openFieldEditor"
        >字段编辑</el-button>
      </div>
    </div>

    <div v-loading="loading" class="extension-info-content" :class="{ 'is-loading': loading }">
      <el-alert
        v-if="!instrumentId"
        title="请先保存仪器基本信息，再配置扩展信息"
        type="info"
        :closable="false"
        show-icon
      />

      <el-alert
        v-if="loadError"
        class="extension-alert"
        :title="loadError"
        type="error"
        :closable="false"
        show-icon
      >
        <el-button type="text" @click="load">重新加载</el-button>
      </el-alert>

      <el-empty
        v-if="!loading && !loadError && fields.length === 0"
        description="暂无扩展字段，点击“字段编辑”进行配置"
        :image-size="72"
      />

      <el-form v-else-if="fields.length" :inline="true" :model="values" class="extension-form">
        <el-row :gutter="20" class="extension-fields">
          <el-col v-for="field in fields" :key="field.id" :span="8">
            <el-form-item :label="`${field.label}:`" :required="field.required" label-width="128px">
              <el-select
                v-if="isSelectField(field)"
                v-model="values[field.id]"
                clearable
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="readonly"
              >
                <el-option
                  v-for="option in selectOptionsFor(field)"
                  :key="option"
                  :label="option"
                  :value="String(option)"
                />
              </el-select>
              <el-input
                v-else-if="field.fieldType === 'TEXT'"
                v-model="values[field.id]"
                clearable
                maxlength="2000"
                placeholder="请输入"
                size="mini"
                :disabled="readonly"
              />
              <el-date-picker
                v-else-if="field.fieldType === 'DATETIME'"
                v-model="values[field.id]"
                type="datetime"
                clearable
                placeholder="请选择时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-ddTHH:mm:ss"
                size="mini"
                :disabled="readonly"
              />
              <el-input
                v-else
                v-model="values[field.id]"
                clearable
                placeholder="请输入"
                size="mini"
                :disabled="readonly"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-dialog
      title="扩展字段编辑"
      custom-class="field-editor-dialog"
      :visible.sync="fieldEditorVisible"
      width="1040px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-alert
        title="字段配置由全部检验仪器共用；每台仪器填写的字段值仍单独保存。"
        type="info"
        :closable="false"
        show-icon
      />

      <el-alert
        v-if="fieldEditorError"
        class="field-editor-alert"
        :title="fieldEditorError"
        type="error"
        :closable="false"
        show-icon
      />

      <div class="field-editor-toolbar">
        <span>已配置 {{ fields.length }}/{{ MAX_EXTENSION_FIELDS }} 个字段</span>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          size="mini"
          :disabled="fields.length >= MAX_EXTENSION_FIELDS || hasNewFieldRow"
          @click="addFieldRow"
        >新增字段</el-button>
      </div>

      <el-table
        v-loading="fieldEditorLoading"
        :data="fieldRows"
        border
        max-height="460"
        empty-text="暂无字段，请点击右上角“新增字段”"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="字段名称" min-width="230">
          <template slot-scope="scope">
            <el-input
              v-model.trim="scope.row.label"
              maxlength="128"
              clearable
              placeholder="请输入字段名称"
              size="mini"
            />
          </template>
        </el-table-column>
        <el-table-column label="字段类型" width="180">
          <template slot-scope="scope">
            <el-select v-model="scope.row.fieldType" placeholder="请选择字段类型" size="mini">
              <el-option label="文本输入" value="TEXT" />
              <el-option label="时间" value="DATETIME" />
              <el-option label="下拉输入" value="SELECT" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="下拉选项" min-width="250">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.fieldType === 'SELECT'"
              v-model.trim="scope.row.selectOptionsText"
              maxlength="240"
              clearable
              placeholder="例如：30, 90, 180, 365"
              size="mini"
            />
            <span v-else class="not-applicable">—</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              :loading="isFieldRowSaving(scope.row)"
              @click="saveFieldRow(scope.row)"
            >{{ scope.row.isNew ? '创建' : '保存修改' }}</el-button>
            <el-divider direction="vertical" />
            <el-button type="text" class="danger-action" @click="disableFieldRow(scope.row)">
              {{ scope.row.isNew ? '取消' : '停用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer">
        <el-button @click="fieldEditorVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  createFieldDefinition,
  disableFieldDefinition,
  getFieldDefinitions,
  getInstrumentExtension,
  saveInstrumentExtension,
  synchronizeInstrument,
  updateFieldDefinition
} from '@/api/instrument-extension'

export default {
  name: 'InstrumentExtensionSection',
  props: {
    instrumentId: {
      type: [String, Number],
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      MAX_EXTENSION_FIELDS: 10,
      DEFAULT_SELECT_OPTIONS: ['30', '90', '180', '365'],
      fields: [],
      values: {},
      loading: false,
      loadError: '',
      fieldEditorVisible: false,
      fieldEditorLoading: false,
      fieldEditorError: '',
      fieldRows: [],
      fieldRowSaving: {}
    }
  },
  computed: {
    hasNewFieldRow() {
      return this.fieldRows.some(row => row.isNew)
    }
  },
  watch: {
    instrumentId: {
      immediate: true,
      handler() {
        this.load()
      }
    }
  },
  methods: {
    isSelectField(field) {
      if (!field) return false
      if (field.fieldType === 'NUMBER') return true
      return field.fieldType === 'TEXT' && Array.isArray(field.selectOptions) && field.selectOptions.length > 0
    },
    selectOptionsFor(field) {
      if (field && Array.isArray(field.selectOptions) && field.selectOptions.length > 0) {
        return field.selectOptions.map(option => String(option))
      }
      return field && field.fieldType === 'NUMBER' ? this.DEFAULT_SELECT_OPTIONS : []
    },
    async load() {
      this.loading = true
      this.loadError = ''
      try {
        if (!this.instrumentId) {
          const definitions = await getFieldDefinitions()
          this.applyDefinitions(definitions)
          return
        }
        await synchronizeInstrument(this.instrumentId)
        const extension = await getInstrumentExtension(this.instrumentId)
        this.applyExtension(extension)
      } catch (error) {
        this.loadError = this.errorMessage(error, '扩展信息加载失败')
      } finally {
        this.loading = false
      }
    },
    applyDefinitions(definitions) {
      const previousValues = this.values
      this.fields = Array.isArray(definitions) ? definitions : []
      const nextValues = {}
      this.fields.forEach(field => {
        nextValues[field.id] = Object.prototype.hasOwnProperty.call(previousValues, field.id)
          ? previousValues[field.id]
          : ''
      })
      this.values = nextValues
    },
    mergeFieldDefinition(field) {
      if (!field || field.id == null) return
      const existingIndex = this.fields.findIndex(item => Number(item.id) === Number(field.id))
      if (existingIndex === -1) {
        this.fields = [...this.fields, field].sort((first, second) => first.slotNumber - second.slotNumber)
      } else {
        this.$set(this.fields, existingIndex, field)
      }
      if (!Object.prototype.hasOwnProperty.call(this.values, field.id)) {
        this.$set(this.values, field.id, '')
      }
    },
    applyExtension(extension) {
      this.fields = Array.isArray(extension && extension.fields) ? extension.fields : []
      const nextValues = {}
      const savedValues = Array.isArray(extension && extension.values) ? extension.values : []
      this.fields.forEach(field => {
        const saved = savedValues.find(value => Number(value.fieldDefinitionId) === Number(field.id))
        nextValues[field.id] = this.readSavedValue(field, saved)
      })
      this.values = nextValues
    },
    readSavedValue(field, saved) {
      if (!saved) return ''
      if (field.fieldType === 'DATETIME') return saved.dateTimeValue || ''
      if (field.fieldType === 'DATE') return saved.dateValue || ''
      if (field.fieldType === 'NUMBER') return saved.numberValue == null ? '' : String(saved.numberValue)
      return saved.textValue || ''
    },
    async openFieldEditor() {
      this.fieldEditorVisible = true
      this.fieldEditorLoading = true
      this.fieldEditorError = ''
      try {
        const definitions = await getFieldDefinitions()
        this.applyDefinitions(definitions)
        this.fieldRows = this.fields.map(field => this.toFieldRow(field))
      } catch (error) {
        this.fieldEditorError = this.errorMessage(error, '字段配置加载失败')
      } finally {
        this.fieldEditorLoading = false
      }
    },
    toFieldRow(field) {
      const isSelect = this.isSelectField(field)
      const selectOptions = isSelect ? this.selectOptionsFor(field) : []
      return {
        id: field.id,
        fieldKey: field.fieldKey,
        label: field.label,
        fieldType: isSelect ? 'SELECT' : field.fieldType,
        originalFieldType: isSelect ? 'SELECT' : field.fieldType,
        selectOptionsText: selectOptions.join(', '),
        originalSelectOptionsText: selectOptions.join(', '),
        required: Boolean(field.required),
        isNew: false
      }
    },
    addFieldRow() {
      if (this.fields.length >= this.MAX_EXTENSION_FIELDS || this.hasNewFieldRow) return
      this.fieldRows.push({
        id: `new-${Date.now()}`,
        fieldKey: `custom_field_${Date.now()}`,
        label: '',
        fieldType: 'TEXT',
        originalFieldType: 'TEXT',
        selectOptionsText: this.DEFAULT_SELECT_OPTIONS.join(', '),
        originalSelectOptionsText: '',
        required: false,
        isNew: true
      })
    },
    isFieldRowSaving(row) {
      return Boolean(this.fieldRowSaving[row.id])
    },
    async saveFieldRow(row) {
      if (!row.label) {
        this.$message.warning('请输入字段名称')
        return
      }
      let selectOptions = []
      if (row.fieldType === 'SELECT') {
        try {
          selectOptions = this.parseSelectOptions(row.selectOptionsText)
        } catch (error) {
          this.$message.warning(error.message)
          return
        }
      }
      const selectOptionsChanged = row.originalSelectOptionsText !== selectOptions.join(', ')
      if (!row.isNew && (row.originalFieldType !== row.fieldType || selectOptionsChanged)) {
        try {
          await this.$confirm(
            '修改字段类型或下拉选项后，不再符合新配置的已有值需要重新选择。是否继续？',
            '确认修改字段配置',
            { type: 'warning' }
          )
        } catch (error) {
          return
        }
      }
      this.$set(this.fieldRowSaving, row.id, true)
      this.fieldEditorError = ''
      try {
        const payload = {
          label: row.label,
          fieldKey: row.fieldKey,
          fieldType: row.fieldType === 'SELECT' ? 'TEXT' : row.fieldType,
          selectOptions,
          required: false
        }
        const savedField = row.isNew
          ? await createFieldDefinition(payload)
          : await updateFieldDefinition(row.id, payload)
        this.mergeFieldDefinition(savedField)
        await this.refreshAfterFieldChange()
        this.$message.success(row.isNew ? '字段创建成功，已同步到全部检验仪器' : '字段修改成功')
      } catch (error) {
        this.fieldEditorError = this.errorMessage(error, row.isNew ? '字段创建失败' : '字段修改失败')
      } finally {
        this.$delete(this.fieldRowSaving, row.id)
      }
    },
    async disableFieldRow(row) {
      if (row.isNew) {
        this.fieldRows = this.fieldRows.filter(item => item.id !== row.id)
        return
      }
      try {
        await this.$confirm(
          `确定停用字段“${row.label}”吗？停用后全部检验仪器将不再显示该字段，历史值不会被物理删除。`,
          '确认停用字段',
          { type: 'warning' }
        )
      } catch (error) {
        return
      }
      this.$set(this.fieldRowSaving, row.id, true)
      this.fieldEditorError = ''
      try {
        await disableFieldDefinition(row.id)
        await this.refreshAfterFieldChange()
        this.$message.success('字段已停用')
      } catch (error) {
        this.fieldEditorError = this.errorMessage(error, '字段停用失败')
      } finally {
        this.$delete(this.fieldRowSaving, row.id)
      }
    },
    async refreshAfterFieldChange() {
      const definitions = await getFieldDefinitions()
      this.applyDefinitions(definitions)
      if (this.instrumentId) {
        const extension = await getInstrumentExtension(this.instrumentId)
        this.applyExtension(extension)
      }
      this.fieldRows = this.fields.map(field => this.toFieldRow(field))
    },
    parseSelectOptions(value) {
      const parts = String(value || '')
        .split(/[,，\s]+/)
        .map(item => item.trim())
        .filter(Boolean)
      if (!parts.length) {
        throw new Error('请至少配置一个下拉选项')
      }
      if (parts.length > 50) {
        throw new Error('下拉选项不能超过 50 个')
      }
      const options = parts.map(item => {
        if (item.length > 128) {
          throw new Error('每个下拉选项不能超过 128 个字符')
        }
        return item
      })
      if (new Set(options).size !== options.length) {
        throw new Error('下拉选项不能重复')
      }
      return options
    },
    async saveAfterInstrument(sourceInstrumentId) {
      const stableId = sourceInstrumentId || this.instrumentId
      if (!stableId) return null
      await synchronizeInstrument(stableId)
      const payload = {}
      this.fields.forEach(field => {
        payload[field.id] = this.values[field.id] == null ? '' : String(this.values[field.id])
      })
      if (this.fields.length) {
        await saveInstrumentExtension(stableId, {
          values: payload,
          idempotencyKey: `instrument-${stableId}-${Date.now()}`
        })
      }
      const extension = await getInstrumentExtension(stableId)
      this.applyExtension(extension)
      return extension
    },
    errorMessage(error, fallback) {
      const responseMessage = error && error.response && error.response.data && error.response.data.message
      return responseMessage || (error && error.message) || fallback
    }
  }
}
</script>

<style lang="scss" scoped>
// TODO(token): 原 QMS Vue 2 工程暂未暴露 UI 2.0 设计令牌，以下颜色沿用规范色值。
.extension-info {
  overflow: hidden;
  padding: 0 24px 16px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(31, 35, 41, 0.04);
}

.extension-info-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 52px;
  border-bottom: 1px solid #ebeef5;

  p {
    position: relative;
    margin: 0;
    padding-left: 12px;
    color: #1f2329;
    font-size: 16px;
    font-weight: 600;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 3px;
      height: 16px;
      border-radius: 2px;
      background: #409eff;
      content: '';
      transform: translateY(-50%);
    }
  }
}

.extension-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.field-count {
  color: #515a6e;
  font-size: 12px;
}

.field-editor-trigger {
  min-width: 76px;
  min-height: 32px;
  padding: 0 8px;
}

.extension-info-content {
  min-height: 0;
  padding-top: 18px;
}

.extension-info-content.is-loading {
  min-height: 80px;
}

.extension-alert {
  margin-bottom: 8px;
}

.field-editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0 10px;
  color: #515a6e;
  font-size: 13px;
}

.field-editor-alert {
  margin-top: 12px;
}

.danger-action {
  color: #f56c6c;
}

.not-applicable {
  color: #9ea9bc;
}

.extension-fields {
  padding-top: 0;
}

::v-deep .el-input--mini,
::v-deep .el-date-editor.el-input {
  width: 100%;
}

::v-deep .extension-form .el-date-editor.el-input {
  width: 207px;
  max-width: 100%;
}

::v-deep .extension-form .el-form-item {
  margin-bottom: 20px;
}

::v-deep .extension-form .el-form-item__label {
  color: #515a6e;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 1199px) {
  ::v-deep .extension-fields .el-col-8 {
    width: 50%;
  }
}

@media (max-width: 899px) {
  .extension-info {
    padding: 0 16px 12px;
  }

  .extension-actions {
    gap: 6px;
  }

  ::v-deep .extension-fields .el-col-8 {
    width: 100%;
  }
}
</style>

<style lang="scss">
.field-editor-dialog {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 18px 48px rgba(31, 35, 41, 0.2);

  .el-dialog__header {
    padding: 20px 24px 16px;
    border-bottom: 1px solid #ebeef5;
  }

  .el-dialog__title {
    color: #1f2329;
    font-size: 18px;
    font-weight: 600;
  }

  .el-dialog__headerbtn {
    top: 18px;
    right: 20px;
    width: 32px;
    height: 32px;
    border-radius: 4px;

    &:hover {
      background: #f2f6fc;
    }
  }

  .el-dialog__body {
    padding: 20px 24px 24px;
  }

  .el-alert {
    align-items: flex-start;
    padding: 10px 12px;
  }

  .field-editor-toolbar {
    min-height: 34px;
  }

  .el-table {
    border-radius: 4px;
  }

  .el-table th {
    height: 44px;
    background: #f5f7fa;
    color: #303133;
    font-weight: 600;
  }

  .el-table td {
    height: 52px;
  }

  .el-input,
  .el-select {
    width: 100%;
  }

  .el-dialog__footer {
    padding: 12px 24px 16px;
    border-top: 1px solid #ebeef5;
    background: #fafbfc;
  }
}

@media (max-width: 899px) {
  .field-editor-dialog {
    width: calc(100% - 32px) !important;
    margin-top: 6vh !important;
  }
}
</style>
