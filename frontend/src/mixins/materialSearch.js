/*
 * @Author: xqm 13697256625@163.com
 * @Date: 2022-08-24 11:39:12
 * @LastEditors: youjuan.hu
 * @LastEditTime: 2022-09-06 14:49:53
 * @FilePath: \systemmanagement\src\mixins\materialSearch.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getMaterialWordList } from '@/api/common.js'
import { getMaterialSort } from '@/api/product-management'
import { getMaterialType } from '@/api/materialAnalysis'
export default {
  async created() {
    await this.getMaterialWord()
    this.getAllSelectOptions()
  },
  methods: {
    // // 获取有启用字段全集
    async getMaterialWord() {
      console.log('getMaterialWord')
      const result = await getMaterialWordList()
      const { code, data = [], message } = result.data || {}
      if (+code === 200) {
        this.extendMaterialList = data
        this.columnConfig = [
          ...this.columnConfig,
          ...data.map((i) => ({
            prop: i.fieldCode,
            label: i.fieldName,
            minWidth: '200',
            filterBoxType: 'input'
          }))
        ]
        console.log(this.columnConfig, 'columnConfig-getMaterialWord')
      } else {
        this.$notify({
          title: '提示',
          message: message,
          type: 'warning',
          duration: 2000
        })
      }
    },
    getAllSelectOptions() {
      console.log(this.columnConfig, 'columnConfig')
      Promise.allSettled([getMaterialSort(), getMaterialType()]).then(
        (results) => {
          results = results.map((i) => i.value.data || {})
          const isAllFulfilled = results.every((item) => {
            return item.code === '200'
          })

          if (isAllFulfilled) {
            const [sortRes, typeRes] = results

            let { data: sortOptions } = sortRes
            sortOptions = sortOptions.map((i) => ({
              value: i.code,
              label: i.name
            }))
            let { data: typeOptions } = typeRes
            typeOptions = typeOptions.map((i) => ({
              value: i.id + '',
              label: i.name
            }))

            const optionsConfigList = [
              { options: sortOptions, prop: 'sortName' },
              { options: typeOptions, prop: 'typeName' }
            ]
            for (let i = 0; i < optionsConfigList.length; i++) {
              const index = this.columnConfig.findIndex(
                (sitem) => sitem.prop === optionsConfigList[i].prop
              )
              if (index > -1) {
                this.columnConfig[index].options = optionsConfigList[i].options
              }
            }
            console.log(this.columnConfig, 'this.columnConfig')
          } else {
            this.$notify({
              title: '提示',
              message: '服务异常',
              type: 'error',
              duration: 2000
            })
          }
        }
      )
    }
  }
}
