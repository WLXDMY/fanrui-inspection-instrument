/*
 * @Author: zhaozhuo
 * @Date: 2022-05-07 10:30:20
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-05-07 10:38:43
 * @Description: ...
 */
const backFill = {
  methods: {
    backfillList(keysArr) {
      const conditions = JSON.parse(window.sessionStorage.getItem('conditions')) || {}
      keysArr.forEach(key => {
        this[key] = conditions[key] || this[key]
      })
      window.sessionStorage.removeItem('conditions')
    },
    saveBackfillList(conditions) {
      window.sessionStorage.setItem('conditions', JSON.stringify(conditions))
    }
  }
}

export default backFill
