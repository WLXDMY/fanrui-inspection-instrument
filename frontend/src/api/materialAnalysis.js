/*
 * @Author: shunhua.liang
 * @Date: 2022-07-26 09:02:22
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-08-09 10:03:06
 * @Description:
 */
import request from '@/utils/request'
// 获取表格数据
export function getmaterialAnalysis(params) {
  return request({
    url: `/ams/product/orders/material/auxiliary/analysis`,
    method: 'get',
    params
  })
}

// 获取分类接口
export function getSortList(params) {
  return request({
    url: `/api/materials/sort`,
    method: 'get',
    params
  })
}
// 获取物料类型接口
// export function getMaterialType(params) {
//   return request({
//     url: `/api/dicts/common/type/list`,
//     method: 'get',
//     params
//   })
// }
// 获取物料类型接口
export function getMaterialType(params) {
  return request({
    url: `/api/materials/material/type/list`,
    method: 'get',
    params
  })
}

// 获取物料名称列表
export function getMaterialName(params) {
  return request({
    url: `/api/materials/list`,
    method: 'post',
    data: params
  })
}
// 获取进度条
export function getProgress() {
  return request({
    url: `/ams/product/orders/material/auxiliary/analysis/progress`,
    method: 'get',
    timeout: 5 * 60 * 1000
  })
}
