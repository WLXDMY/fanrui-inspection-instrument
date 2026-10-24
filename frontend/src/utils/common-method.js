/*
 * @Author: zhaozhuo
 * @Date: 2022-08-24 14:39:50
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-08-26 16:58:45
 * @Description: ...
 */
import { MODULE_NAME } from '@/constant/moduleCName.js'
// import { getColumnList } from '@/api/column'

// 格式化物料提示弹框内容
export function formatMaterialTipContent(data) {
  const showList = []
  data.forEach((el) => {
    let words = ''
    words = `${setWord(el.billTypeCode)}总数超出关联${setWord(
      el.relatedBillTypeCode
    )}的总数`
    el.materialVos &&
      el.materialVos.forEach((item) => {
        words += `，物料${item.materialCode}超出${item.quantity}`
      })
    showList.push(words)
  })
  return showList
}

// 设置word 的中文名称
function setWord(name) {
  const list = MODULE_NAME.find((item) => item.code === name)
  return list ? list.cName : ''
}

// 下推订单总数提示弹框内容(销售订单下推)
export function formatPushDownOrderTotalTipContent(data) {
  let words = ''
  data.forEach((el) => {
    words = `${setWord(el.billTypeCode)}总数超出关联${setWord(
      el.relatedBillTypeCode
    )}的总数`
  })
  return words
}

// 数字转换千分位
export function toThousands(num, pointLength = 2) {
  num = Number(num)
  if (!num) return 0
  const _value = num.toString()
  const tempArr = _value.split('.')
  const startValue = tempArr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  const endValue = pointLength ? (num.toFixed(pointLength)).split('.')[1] : tempArr[1]
  const noDecimalPointValue = tempArr.length > 1 ? startValue + '.' + endValue : startValue

  return pointLength ? startValue + '.' + endValue : noDecimalPointValue
}

// 时间格式化
export const timeFomat = (times, spe) => {
  spe = spe || '-'
  const time = new Date(times)
  const year = time.getFullYear()
  const month = time.getMonth() + 1 < 10 ? '0' + time.getMonth() + 1 < 10 : time.getMonth() + 1 < 10
  const day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  const hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  const minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  const second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  return year + spe + month + spe + day + hour + spe + minute + spe + second
}

// // 获取表格列宽数据
// export async function getColumnWidthList(modelType, tableHeaderList) {
//   const params = {
//     modelType,
//   };
//   const result = await getColumnList(params);
//   const { code, data, message } = result.data || {};
//   if (+code === 200) {
//     const { columnInformation } = data || {};
//     // 初始化的情况下
//     if (data && columnInformation) {
//       const columnInformationObj = JSON.parse(columnInformation);
//       const tempArr = [];
//       tableHeaderList.forEach((item1, index1) => {
//         const temp = columnInformationObj.find(
//           (item2) => item2.code === item1.code
//         );
//         if (temp) {
//           tempArr.push({ ...item1, width: temp.width });
//         } else {
//           tempArr.push(item1);
//         }
//       });
//       console.log(tempArr,"tempArr");
//       return tempArr;
//     }
//     return null;
//   } else {
//     this.$notify({
//       title: "提示",
//       message: message,
//       type: "success",
//       duration: 2000,
//     });
//   }
// }
