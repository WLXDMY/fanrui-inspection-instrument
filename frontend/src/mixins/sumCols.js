import { toThousands } from '@/utils/common-method'
/*
 * @Author: zhaozhuo
 * @Date: 2022-08-08 11:08:28
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-10-20 16:44:50
 * @Description: ...
 */
const sumCols = {
  data() {
    return {
      sumData: {}
    }
  },
  methods: {
    setSumData(sumData) {
      this.sumData = sumData || {}
    },
    getSummaries(params) {
      const { columns } = params
      return columns.reduce((sumArr, item) => {
        sumArr.push(this.sumData[item.property] === undefined ? '' : toThousands(this.sumData[item.property]))
        return sumArr
      }, [])
    }
  }
}

export default sumCols
