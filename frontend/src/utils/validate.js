/*
 * @Descripttion:
 * @version:
 * @Author: zhangzheng
 * @Date: 2020-12-04 11:31:54
 * @LastEditors: youjuan.hu
 * @LastEditTime: 2023-03-28 17:07:37
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 手机
export function validTel(tel) {
  const reg = /^(13[0-9]|14[57]|15[0-9]|17[067]|18[0-9])\d{8}$/
  return reg.test(tel)
}

export function queryString(str = window.location.href) {
  const obj = {}
  str.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (obj[k] = v))
  return obj
}
