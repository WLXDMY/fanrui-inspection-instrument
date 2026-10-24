<!-- 公共表格组件 column - 表头 noEmpty - 空数据容器  -->
<!-- 公共配置属性，全继承element属性，额外的：
 * @Author: xuqiuming
 * @Date: 2022-6-18 19:10:19
 * @LastEditTime: 2022-6-18 19:10:19
 * @LastEditors: xuqiuming
 * @Description: 250206-复制过来的
-->
<template>
  <div class="common-table-material">
    <el-table
      ref="table"
      class="flex-fill responsive-table"
      v-bind="$attrs"
      :header-cell-style="{
        background: '#F2F5FC',
        color: '#181d1f',
        'font-family': 'Source Han Sans CN',
        'font-size': '13px',
        'font-weight': '550'
      }"
      height="100%"
      :row-style="{ height: '42px' }"
      :header-row-style="{ height: '42px' }"
      highlight-current-row
      :cell-style="columnStyle"
      v-on="$listeners"
      @header-dragend="hdHeaderDragend"
    >
      <template v-for="(item, index) in tableColumns">
        <el-table-column
          v-if="
            !item.type &&
              (!item.columnType || typeLists.indexOf(item.columnType) > -1)
          "
          :key="item.uuidv4_id"
          v-bind="{ ...item }"
          :show-overflow-tooltip="item.prop == 'code' ? false : true"
          :render-header="(h, { column }) => hdRrenderHeader(h, column, item)"
        >
          <!-- slotHeader - 自定义表头 -->
          <template slot="header" slot-scope="scope">
            <slot
              v-if="
                item.columnType === 'headerSlot' || item.columnType === 'slot'
              "
              :name="item.prop + 'Header'"
              :row="scope.row"
            />
            <template v-else>
              {{ item.label }}
            </template>
          </template>
          <template slot-scope="scope">
            <!-- 自定义插槽 -->
            <template
              v-if="
                item.columnType === 'bodySlot' || item.columnType === 'slot'
              "
            >
              <slot
                :name="item.prop"
                :row="scope.row"
                :$index="scope.$index"
                :column="item"
              />
            </template>

            <!-- map转换 -->
            <template v-else-if="item.columnType === 'dataMap'">
              {{ item.dataMap[scope.row[item.prop]] || '' }}
            </template>
            <!-- 格式化 -->
            <template v-else-if="item.columnType === 'format'">
              {{ item.formatFuc([scope.row[item.prop]]) }}
            </template>
            <!-- 多级取值 -->
            <template v-else-if="item.multilevelkey">
              {{ hdMultilevelkey(item.multilevelkey, scope.row) }}
            </template>

            <template v-else>
              {{
                scope.row[item.prop] || (scope.row[item.prop] === 0 ? 0 : '')
              }}
            </template>
          </template>
        </el-table-column>

        <el-table-column
          v-if="item.type"
          :key="item.prop + index"
          width="100"
          v-bind="{ ...item }"
        />
      </template>
    </el-table>

    <RightColumnsConfig
      v-if="showRightColumnsConfig"
      :right-columns="rightColumns"
      @updateColumns="updateColumns"
      @cancel="showRightColumnsConfig = false"
      @saveColumnsConfig="saveColumnsConfig"
    />
  </div>
</template>

<script>
import request from '@/utils/request'
import { getColumnList, saveCurrentColumnList } from '@/api/column.js'
import { isExistApprove } from '@/api/examineApprove.js'

import RightColumnsConfig from './rightColumnsConfig.vue'
import { v4 as uuidv4 } from 'uuid'
import store from '@/store'
export default {
  components: { RightColumnsConfig },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    allComumns: {
      type: [Array, Object],
      require: true,
      default: () => []
    },

    // 该表格列操作权限路径
    columnPermissionAction: {
      type: String,
      require: false,
      default: () => ''
    },
    isHasMaterialExtensionKeys: {
      type: Boolean,
      default: false
    },
    // 列配置字段
    modelType: {
      type: String,
      default: ''
    },
    // 审批字段
    approveType: {
      type: String,
      default: ''
    },
    noApproveNotShowPropColums: {
      type: Array,
      default: () => []
    },
    materialOrOrder: {
      type: Object,
      default: () => {}
    },
    showOperateLabel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      columnLocal: [],
      typeLists: [
        // 注册type类型
        'headerSlot',
        'bodySlot',
        'slot',
        'dataMap',
        'format'
      ],

      filterBoxInfo: {},
      showRightColumnsConfig: false,
      allTableConfigColumns: [],
      tableColumns: [],
      rightColumns: []
    }
  },
  watch: {
    allTableConfigColumns: {
      deep: true,
      handler(newVal, oldValue) {
        this.tableColumns = JSON.parse(JSON.stringify(newVal))
          .filter(i => i.checked)
          .map(i => ({ ...i, uuidv4_id: uuidv4() }))

        this.$nextTick(() => {
          this.$refs?.table?.doLayout()
        })
      }
    },
    allComumns: {
      immediate: true,
      deep: true,
      handler(newVal, oldValue) {
        this.getColumnsConfig()
      }
    }
  },
  created() {},
  mounted() {
    const tableWrapper = document.getElementsByClassName(
      'el-table__body-wrapper'
    )[0]
  },

  methods: {
    // 普通形式
    async getColumnsConfig() {
      // 获取是否有审批功能
      const isHasApprove = await this.getIsExistApprove()
      // console.log('审批状态 -> ', isHasApprove)
      const columns = []
      // 本地列配置
      let allComumnsDeep = JSON.parse(JSON.stringify(this.allComumns))
      // 特征参数 全局配置
      const showSpecificParams =
        store.getters && store.getters.showSpecificParams

      const {
        data: { code, data, message }
      } = await getColumnList({ modelType: this.modelType })
      if (code === '200') {
        // 如果后端保存了 列配置
        if (this.modelType && data && data.columnInformation) {
          const preSaveColumns = JSON.parse(data.columnInformation)
          // 过滤掉
          // 如果有物料扩展字段
          if (this.isHasMaterialExtensionKeys) {
            allComumnsDeep = await this.addExtensionKeysIntoLocalColumns(
              allComumnsDeep
            )
            this.updateLocalColmnsByPreSaveColumns(
              columns,
              preSaveColumns,
              allComumnsDeep,
              showSpecificParams,
              isHasApprove
            )
            // 如果没有物料扩展字段
          } else {
            this.updateLocalColmnsByPreSaveColumns(
              columns,
              preSaveColumns,
              allComumnsDeep,
              showSpecificParams,
              isHasApprove
            )
          }
          // 如果后端没有保存列配置 （初始化）
        } else {
          // 如果没有保存个人列配置，取默认配置，再没有就是本地前端的配置
          const {
            data: {
              code: defaultCode,
              data: defaultData,
              message: defaultMessage
            }
          } = await getColumnList({
            modelType: this.modelType,
            username: 'all'
          })
          if (+defaultCode === 200) {
            if (defaultData && defaultData.columnInformation) {
              const preSaveColumns = JSON.parse(defaultData.columnInformation)
              if (this.isHasMaterialExtensionKeys) {
                this.updateLocalColmnsByPreSaveColumns(
                  columns,
                  preSaveColumns,
                  allComumnsDeep,
                  showSpecificParams,
                  isHasApprove
                )
                // 如果没有物料扩展字段
              } else {
                this.updateLocalColmnsByPreSaveColumns(
                  columns,
                  preSaveColumns,
                  allComumnsDeep,
                  showSpecificParams,
                  isHasApprove
                )
              }
            } else {
              // 都没有配置，取本地配置
              // 如果有扩展字段
              if (this.isHasMaterialExtensionKeys) {
                allComumnsDeep = await this.addExtensionKeysIntoLocalColumns(
                  allComumnsDeep
                )
                this.allTableConfigColumns =
                  this.filterIsHasApproveOrAuxiliaryAttrColumns(
                    allComumnsDeep,
                    showSpecificParams,
                    isHasApprove
                  )
              } else {
                this.allTableConfigColumns =
                  this.filterIsHasApproveOrAuxiliaryAttrColumns(
                    allComumnsDeep,
                    showSpecificParams,
                    isHasApprove
                  )
              }
            }
          } else {
            this.$notify({
              title: '提示',
              message: defaultMessage || '获取列配置失败',
              type: 'error',
              duration: 2000
            })
          }
        }
      } else {
        this.$notify({
          title: '提示',
          message: message || '获取列配置失败',
          type: 'error',
          duration: 2000
        })
      }
      this.getRightColumns()
    },
    filterIsHasApproveOrAuxiliaryAttrColumns(
      preSaveColumns,
      showSpecificParams,
      isHasApprove
    ) {
      const columns = preSaveColumns.filter(
        item =>
          item.prop !== 'auxiliaryAttr' ||
          (item.prop === 'auxiliaryAttr' && showSpecificParams)
      )

      if (!isHasApprove) {
        columns.forEach((i, index) => {
          const reg = new RegExp('approv', 'i')
          if (reg.test(i.prop)) {
            columns.splice(index, 1)
          }
        })
      }

      return columns
    },
    getRightColumns() {
      // 有左侧勾选列且有操作列
      if (
        this.allTableConfigColumns[0]?.type === 'selection' &&
        this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
          .prop === 'operate'
      ) {
        this.rightColumns = this.allTableConfigColumns.slice(
          1,
          this.allTableConfigColumns.length - 1
        )
        //  // 有左侧勾选列且没有右侧操作列
      } else if (
        this.allTableConfigColumns[0]?.type === 'selection' &&
        this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
          .prop !== 'operate'
      ) {
        this.rightColumns = this.allTableConfigColumns.slice(
          1,
          this.allTableConfigColumns.length
        )
        // 没有左侧勾选列有右侧操作列
      } else if (
        this.allTableConfigColumns[0]?.type !== 'selection' &&
        this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
          .prop === 'operate'
      ) {
        this.rightColumns = this.allTableConfigColumns.slice(
          0,
          this.allTableConfigColumns.length - 1
        )
        // 没有左侧勾选列没有右侧操作列
      } else {
        this.rightColumns = this.allTableConfigColumns.slice(
          0,
          this.allTableConfigColumns.length
        )
      }
    },
    async addExtensionKeysIntoLocalColumns(allComumnsDeep) {
      const {
        data: { code, data: materialKeys = [], message }
      } = await request({
        url: `/api/material/filed/config/list/using`,
        method: 'get'
      })
      if (code === '200') {
        allComumnsDeep.splice(
          allComumnsDeep.length - 1,
          0,
          ...materialKeys.map(i => ({
            prop: i.fieldCode,
            label: i.fieldName,
            minWidth: '150',
            checked: true
            // outSideKey: 'materialFields'
          }))
        )

        return allComumnsDeep
      } else {
        this.$notify({
          title: '提示',
          message: message || '获取物料扩展字段失败',
          type: 'error',
          duration: 2000
        })

        return []
      }
    },
    updateLocalColmnsByPreSaveColumns(
      columns = [],
      preSaveColumns,
      allComumnsDeep,
      showSpecificParams,
      isHasApprove
    ) {
      // 把上次保存的列配置去重 解决之前脏数据
      const uniPreSaveColumns = []
      preSaveColumns.forEach(preCol => {
        const index = uniPreSaveColumns.findIndex(i => i.prop === preCol.prop)
        if (index === -1) {
          uniPreSaveColumns.push(preCol)
        }
      })
      uniPreSaveColumns.forEach(saveColumn => {
        const index = allComumnsDeep.findIndex(i => i.prop === saveColumn.prop)
        if (index > -1) {
          columns.push({
            ...allComumnsDeep[index],
            minWidth:
              saveColumn.prop === 'operate'
                ? allComumnsDeep[index].minWidth
                : saveColumn.minWidth,
            checked: saveColumn.checked
          })
        }
      })
      // 如果本地有新增的列配置 则增加新的列配置
      allComumnsDeep.forEach(i => {
        const index = uniPreSaveColumns.findIndex(si => si.prop === i.prop)
        if (index === -1) {
          // columns.push(i)
          // columns
          if (i.type === 'selection' || i.type === 'index') {
            columns.unshift(i)
          }
          columns.splice(columns.length - 1, 0, i)
        }
      })

      this.allTableConfigColumns =
        this.filterIsHasApproveOrAuxiliaryAttrColumns(
          columns,
          showSpecificParams,
          isHasApprove
        )
    },
    hdHeaderDragend(newWidth, oldWidth, column, event) {
      const { property } = column
      const index = this.allTableConfigColumns.findIndex(
        i => i.prop === property
      )
      if (index > -1) {
        this.allTableConfigColumns[index].minWidth = newWidth + ''
      }
    },
    // 过滤是否有审批功能或者 是否有特征参数的列配置
    hdIsHasApproveOrAuxiliaryAttrColumnsConfig(
      columns,
      allComumnsDeep,
      showSpecificParams,
      isHasApprove
    ) {
      columns = allComumnsDeep.filter(
        item =>
          item.prop !== 'auxiliaryAttr' ||
          (item.prop === 'auxiliaryAttr' && showSpecificParams)
      )
      if (!isHasApprove) {
        this.noApproveNotShowPropColums.forEach(i => {
          const cIndex = columns.findIndex(si => si.prop === i)
          if (cIndex > -1) {
            columns.splice(cIndex, 1)
          }
        })
      }
      this.allTableConfigColumns = columns
    },
    // 获取是否有审批功能
    async getIsExistApprove() {
      if (this.approveType) {
        const {
          data: { code, data, message }
        } = await isExistApprove(this.approveType)

        if (code === '200') {
          this.$emit('getIsApprove', data)
          return data
        } else {
          this.$notify({
            title: '提示',
            message: message || 22,
            type: 'error',
            duration: 2000
          })
        }
      } else {
        return false
      }
    },
    uuidv4,
    // 确认当前 或者清空 或者重置查询
    updateQueryParams(queryParams, type) {
      this.$emit('getList', queryParams)
    },
    /**
     * @description 保存当前用户列配置  如果type是all 则是设为默认，不仅要保存设默认的配置，自己的列配置也要更新
     * @param {String} type 更新的类型
     * @param {Boolean} isShowSuccessTips 成功后是否显示通知
     */
    async saveColumnsConfig(type, isShowSuccessTips = true) {
      const {
        data: { code, message }
      } = await saveCurrentColumnList({
        columnInformation: JSON.stringify(this.allTableConfigColumns),
        modularType: this.modelType,
        userName: type || this.$store.getters.userInfo.username
      })
      if (code === '200') {
        if (type === 'all') {
          this.saveColumnsConfig('', false)
        }
        isShowSuccessTips &&
          this.$notify({
            message: '列配置保存成功！',
            type: 'success',
            duration: 2000
          })
        this.showRightColumnsConfig = false
      } else {
        this.$message({
          type: 'error',
          message
        })
      }
    },

    hightCurrentIcon(prop) {
      const index = this.tableColumns.findIndex(i => i.prop === prop)
      if (index > -1) {
        this.$set(this.tableColumns[index], 'active', true)
      }
    },
    // 修改样式
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (column.type !== 'selection') {
        return 'padding:0px;font-size:14px;border-right:0;border-top:0;border-left:0'
      }
    },
    clearSingleHightIcon(prop) {
      const index = this.tableColumns.findIndex(i => i.prop === prop)

      if (index > -1) {
        this.tableColumns[index].active = false
      }
    },
    // 右侧列配置更新当前所有列的配置
    updateColumns(newColumns) {
      // 有左侧勾选列且有操作列
      if (
        this.allTableConfigColumns[0].type === 'selection' &&
        this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
          .prop === 'operate'
      ) {
        this.allTableConfigColumns = [
          this.allTableConfigColumns[0],
          ...newColumns,
          this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
        ]
        //  // 有左侧勾选列且没有右侧操作列
      } else if (
        this.allTableConfigColumns[0].type === 'selection' &&
        this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
          .prop !== 'operate'
      ) {
        this.allTableConfigColumns = this.allTableConfigColumns = [
          this.allTableConfigColumns[0],
          ...newColumns
        ]
        // 没有左侧勾选列有右侧操作列
      } else if (
        this.allTableConfigColumns[0].type !== 'selection' &&
        this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
          .prop === 'operate'
      ) {
        this.allTableConfigColumns = this.allTableConfigColumns = [
          ...newColumns,
          this.allTableConfigColumns[this.allTableConfigColumns.length - 1]
        ]
        // 没有左侧勾选列没有右侧操作列
      } else {
        this.allTableConfigColumns = [...newColumns]
      }
      this.rightColumns = newColumns
      this.$nextTick(() => {
        this.$refs?.table?.doLayout()
      })
    },
    resetIconHight() {
      this.tableColumns.forEach(i => {
        i.active = false
      })
    },
    showIconHight(prop) {
      const index = this.tableColumns.findIndex(i => prop === i.prop)
      if (index > -1) {
        return this.tableColumns[index]['active']
      }
    },
    async requestOptions(optionsRequestConfig = {}) {
      let arr = []
      const { url, method, labelKey, valueKey, showItems, specialHandle } =
        optionsRequestConfig
      try {
        const {
          data: { code, data, message }
        } = await request({ url, method })

        if (code === '200') {
          let options
          specialHandle
            ? (options = this.hdSpecialOptions(url, data))
            : (options = data.map(i => ({
              value: i[valueKey] + '',
              label: i[labelKey]
            })))
          showItems
            ? showItems.forEach(j => {
              const index = options.findIndex(item => item.value === j)
              if (index > -1) {
                arr.push(options[index])
              }
            })
            : (arr = options)
          return arr
        } else {
          this.$notify({
            type: 'error',
            message
          })
        }
      } catch (error) {
        console.error(error, 'error')
      }
    },
    // 特殊处理枚举值 后端不规范
    hdSpecialOptions(url, data) {
      let specialOptions = []
      switch (url) {
        case '/ams/product/orders/all/grades':
          for (var key in data) {
            specialOptions.push({
              label: data[key],
              value: key
            })
          }
          break
        case '/api/grids/list':
          specialOptions = data?.records?.map(i => ({
            value: i.gcode,
            label: i.gname
          }))
          break
        default:
          break
      }
      return specialOptions
    },
    hdRrenderHeader(h, column, item) {
      const {
        filterBoxType,
        label,
        prop,
        key = '',
        options,
        outSideKey = '',
        optionsRequestConfig
      } = item
      if (!filterBoxType && prop !== 'operate') {
        return h(
          'span',
          {
            style:
              'display:flex;justify-content:space-between;padding-right:2px; text-align:left; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
          },
          [label]
        )
      }
      if (!filterBoxType && prop === 'operate') {
        return h(
          'span',
          {
            style:
              'display:flex;justify-content:space-between;padding-right:2px; text-align:left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
          },
          [
            this.showOperateLabel ? h('span', label) : '',
            h('i', {
              class: 'el-icon-setting',
              style: `margin-left:${
                this.showOperateLabel ? '100px' : '0px'
              };font-size: 18px; cursor: pointer;`,
              directives: [
                {
                  name: 'permission',
                  value: { action: this.columnPermissionAction }
                }
              ],
              on: {
                click: () => {
                  this.showRightColumnsConfig = !this.showRightColumnsConfig
                  this.$nextTick(() => {
                    this.$refs?.table?.doLayout()
                  })
                }
              }
            })
          ]
        )
      }
      return h(
        'span',
        {
          style:
            'display: block;width: 100%;text-align:left; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
        },
        [
          h('span', {}, label),
          h(
            'span',
            {
              style: 'cursor: pointer;',
              on: {
                click: async e => {
                  const { clientX = 0, clientY = 0 } = e || {}
                  this.filterBoxInfo = {
                    filterBoxType,
                    clientX,
                    clientY,
                    prop,
                    key,
                    options: optionsRequestConfig
                      ? await this.requestOptions(optionsRequestConfig)
                      : options,
                    outSideKey
                  }
                  this.$refs.searchBox.showSearchBox()
                }
              }
            },
            [
              h('svg-icon', {
                props: {
                  iconClass: 'filter',
                  className:
                    `${this.showIconHight(prop) ? 'icon-active' : ''}` +
                    ' init-svg-icon'
                }
              })
            ]
          )
        ]
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
::v-deep .el-table {
  // overflow: scroll;
  .icon-active {
    color: #1890ff;
  }
}
.common-table-material {
  overflow: hidden;
  height: 100%;
  ::v-deep .el-table td {
    height: 35px;
    padding: 0;
  }

  ::v-deep .el-table__body-wrapper {
    @include scrollBar;
  }
  // ::v-deep .is-scrolling-left {
  //   @include scrollBar
  // }
  ::v-deep .el-table__footer-wrapper {
    .el-table__footer {
      .has-gutter {
        .cell {
          padding-top: 0;
          padding-bottom: 0;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  ::v-deep .el-table__cell gutter {
    border-top: 1px solid #dfe6ec;
  }

  ::v-deep .el-table__fixed-right {
    // right: 18px!important;
    border-right: 1px solid #dfe6ec;
  }
  ::v-deep .table-cell-allow {
    background-color: #e6f3e9;
  }
  ::v-deep .table-cell-product {
    background: #fee8bf;
  }
  ::v-deep .el-table__footer-wrapper {
    height: 35px;
    .has-gutter .cell {
      margin-top: -10px;
    }
    .gutter {
      border-top: 1px solid #dfe6ec;
      background-color: #f1f1f1;
      position: relative;
    }
    .is-hidden {
      height: 35px;
    }
  }
  ::v-deep .el-table__fixed-footer-wrapper {
    .el-table__footer {
      tr {
        .el-table_1_column_57 {
          height: 35px;
        }
      }
    }
  }
  ::v-deep .el-table__header {
    th {
      padding: 2px 0 7px 0;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #dfe6ec;
        position: absolute;
        bottom: 5px;
        z-index: 9999999;
      }
    }
  }
  ::v-deep .el-table__header-wrapper {
    height: 42px;
    border-bottom: 1px solid #dfe6ec;
  }

  ::v-deep .el-table__footer-wrapper {
    border-bottom: 1px solid #dfe6ec;
  }
  ::v-deep .el-table__header-wrapper thead th .cell {
    padding-left: 8px;
  }
  ::v-deep .el-table__header-wrapper thead .el-table-column--selection .cell {
    padding-left: 12px;
  }
  ::v-deep tbody .el-table-column--selection .cell {
    padding-left: 12px;
    padding-right: 12px;
  }
}

/deep/ .init-svg-icon {
  width: 15px;
  height: 15px;
}

::v-deep .el-table .product-completed {
  background: #e6f3e9;
}
::v-deep .el-table .product-pendding {
  background: #fee8bf;
}
::v-deep .el-table .product-sdayujh {
  background: #ffbcbc;
}
::v-deep .el-table__cell {
  overflow: hidden;
}
::v-deep .cell {
  display: flex;
  justify-content: space-between;
  padding-right: 2px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
