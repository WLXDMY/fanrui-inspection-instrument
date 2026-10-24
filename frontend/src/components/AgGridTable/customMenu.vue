<!--
 * @Author: zhaozhuo
 * @Date: 2021-12-01 09:31:33
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2021-12-23 17:16:57
 * @Description:
-->
<template>
  <ul class="el-scrollbar__view el-cascader-menu__list">
    <li
      v-for="option in options"
      id="cascader-menu-5117-0-0"
      :key="option.value"
      class="el-cascader-node"
      @click="changeSelect(option)"
    >
      <span class="el-cascader-node__label">{{ option.label }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CustomMenu',
  inject: ['agTable'],
  props: {
    field: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      curPinVal: 'noPin',
      options: [
        {
          value: 'autoSizeCurCol',
          label: '自动调节此列大小'
        },
        {
          value: 'autoSizeAllCol',
          label: '自动调节所有列大小'
        },
        {
          value: 'resetCols',
          label: '重置列'
        },
        {
          value: 'savaColState',
          label: '保存列状态'
        },
        {
          value: 'clearFilterCurcol',
          label: '清理当前列过滤'
        },
        {
          value: 'clearSortCurcol',
          label: '清理当前列排序'
        },
        {
          value: 'clearFilterCol',
          label: '清理所有过滤'
        },
        {
          value: 'clearSortCol',
          label: '清理所有排序'
        }
      ]
    }
  },
  methods: {
    // 重置各组件数据
    resetComData(coms, field) {
      coms.forEach(com => {
        if (field) {
          if (field === com.field) {
            com.resetData()
          }
        } else {
          com.resetData()
        }
      })
    },
    changeSelect(option) {
      const { value } = option
      const {
        columnApi,
        customFilterComs,
        customHeaders,
        saveColStateReq,
        sortCols,
        filterCols,
        colSum,
        getList
      } = this.agTable

      const dealSortParams = () => {
        return sortCols.reduce((paramsString, col) => {
          paramsString += `,${col.field}${col.sortDef ? '_' : ''}${col.sortDef}`
          return paramsString
        }, '')
      }

      switch (value) {
        case 'autoSizeCurCol':
          // eslint-disable-next-line no-case-declarations
          const colId =
            this.field === 'orderNumber' ? 'ag-Grid-AutoColumn' : this.field
          columnApi.autoSizeColumn(colId)
          break
        case 'autoSizeAllCol':
          // eslint-disable-next-line
          const allColumnIds = []
          columnApi.getAllColumns().forEach(column => {
            allColumnIds.push(column.colId)
          })
          columnApi.autoSizeColumns(allColumnIds)
          break
        case 'resetCols':
          columnApi.resetColumnState()
          columnApi.moveColumn('serial', 0)
          break
        case 'savaColState':
          // eslint-disable-next-line
          const colState = JSON.stringify(columnApi.getColumnState())
          saveColStateReq({
            colState: colState
          })
          break
        case 'clearFilterCurcol':
          this.resetComData(customFilterComs, this.field)
          if (Object.prototype.hasOwnProperty.call(colSum, this.field)) {
            getList({
              numberFilterList: [
                {
                  id: this.field,
                  term: '',
                  value: ''
                }
              ]
            })
          } else {
            getList({
              [this.field]: ''
            })
          }
          break
        case 'clearSortCurcol':
          this.resetComData(customHeaders, this.field)
          sortCols.forEach(col => {
            if (col.field === this.field) {
              col.sortDef = ''
            }
          })
          // eslint-disable-next-line no-case-declarations
          const curcolParams = dealSortParams()
          getList({ keys: curcolParams.slice(1) })
          break
        case 'clearFilterCol':
          this.resetComData(customFilterComs)
          // eslint-disable-next-line no-case-declarations
          const filterColsParamsObj = filterCols.reduce((obj, col) => {
            if (!Object.prototype.hasOwnProperty.call(colSum, col.field)) {
              obj[col.field] = ''
            }
            return obj
          }, {})
          getList({
            ...filterColsParamsObj,
            numberFilterList: null,
            extendMaterialList: []
          })
          break
        case 'clearSortCol':
          this.resetComData(customHeaders)
          sortCols.forEach(col => (col.sortDef = ''))
          getList({ keys: '' })
          break
      }
      this.$emit('update-menuvisible', { key: 'isMenuVisible', status: false })
    }
  }
}
</script>
<style lang="scss" scoped></style>
