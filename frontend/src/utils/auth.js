/*
 * @Descripttion:
 * @version:
 * @Author: zhangzheng
 * @Date: 2020-12-04 11:31:54
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-01-12 18:32:04
 */
import Cookies from 'js-cookie'

const TokenKey = 'Token'
const TokenTypeKey = 'Token-Type'
const FreshTokenKey = 'Fresh-Token'
const ProductLines = 'productLines'
const FromRouteName = 'fromRouteName'

export function getToken() {
  if (process.env.VUE_APP_UPLOAD_PACKAGE === 'true') {
    return localStorage.getItem(TokenKey) || Cookies.get(TokenKey)
  }
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  if (process.env.VUE_APP_UPLOAD_PACKAGE === 'true') {
    localStorage.setItem(TokenKey, token)
  }
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTokenType(tokenType) {
  if (process.env.VUE_APP_UPLOAD_PACKAGE === 'true') {
    localStorage.setItem(TokenTypeKey, tokenType)
  }
  return Cookies.set(TokenTypeKey, tokenType)
}

export function getTokenType() {
  if (process.env.VUE_APP_UPLOAD_PACKAGE === 'true') {
    return localStorage.getItem(TokenTypeKey) || Cookies.get(TokenTypeKey) || 'Bearer'
  }
  return Cookies.get(TokenTypeKey)
}

export function setFreshToken(freshToken) {
  return Cookies.set(FreshTokenKey, freshToken)
}

export function getFreshToken() {
  return Cookies.get(FreshTokenKey)
}

export function setProductLines(productLines) {
  return localStorage.setItem(ProductLines, productLines)
}

export function getProductLines() {
  return localStorage.getItem(ProductLines)
}

export function setFromRouteName(fromRouteName) {
  return Cookies.set(FromRouteName, fromRouteName)
}

export function getFromRouteName() {
  return Cookies.get(FromRouteName)
}

export function removeFromRouteName() {
  return Cookies.remove(FromRouteName)
}
