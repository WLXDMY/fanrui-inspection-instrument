/*
 * @Author: chenzejie
 * @Date: 2023-03-31 10:01:54
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-02-25 09:46:04
 * @Description:
 */

import store from '@/store'

/**
 * @function 将当前页筛选条件存储到sessionStorage
 * @description
 * @param listQuery 筛选条件
 * @param listQuery.orderBtnType 按单/按物料
 * @return undefined
 **/
function setForwardSessionCommon(listQuery) {
  sessionStorage.setItem('conditions', JSON.stringify(listQuery))
}

/**
 * @function 从sessionStorage获取筛选条件
 * @description
 * @param listQuery 筛选条件
 * @param listQuery.orderBtnType 按单/按物料
 * @param config 分页参数配置 current 页码；size 页容量
 * @return listQuery 返回处理后的筛选列表的参数对象
 **/
function getForwardSessionCommon(config = { current: 'current', size: 'size' }) {
  const conditions = JSON.parse(sessionStorage.getItem('conditions') || '{}')
  const listQuery = {
    ...conditions,
    [config.current]: conditions[config.current] || 1,
    [config.size]: conditions[config.size] || 20,
    orderBtnType: conditions?.orderBtnType
  }
  !conditions?.orderBtnType && delete listQuery.orderBtnType
  return listQuery
}

/**
 * @function 离开路由时删除sessionStorage中的筛选条件
 * @description
 * @param whiteList 白名单
 * @param to 即将跳转到的路由
 * @return undefined
 **/
function beforeRouteLeaveSessionCommon(whiteList, to) {
  if (!whiteList.includes(to.name)) {
    sessionStorage.removeItem('conditions')
  }
}

// ***************存在tab页版************

/**
 * @function 将当前页筛选条件存储到sessionStorage
 * @description
 * @param tabName 当前tab页名
 * @param listQuery 筛选条件
 * @return undefined
 **/
function setForwardSessionTab(listQuery, tabName) {
  const conditions = JSON.parse(sessionStorage.getItem('conditions') || '{}')
  conditions[tabName] = listQuery
  conditions.activeName = tabName
  sessionStorage.setItem('conditions', JSON.stringify(conditions))
}

/**
 * @function 从sessionStorage获取筛选条件
 * @description
 * @param listQuery 筛选条件
 * @param config 分页参数配置 current 页码；size 页容量
 * @return listQuery 返回处理后的筛选列表的参数对象  listQuery.activeName 当前激活的tab分页
 **/
function getForwardSessionTab(
  config = {
    current: 'current',
    size: 'size'
  },
  tabName
) {
  const conditions = JSON.parse(sessionStorage.getItem('conditions') || '{}')
  const listQuery = {
    ...((tabName && conditions[tabName]) || {}),
    [config.current]: (tabName && conditions[tabName] && conditions[tabName][config.current]) || 1,
    [config.size]: (tabName && conditions[tabName] && conditions[tabName][config.size]) || 20,
    activeName: conditions?.activeName
  }
  return listQuery
}

/**
 * @function 解决 async 函数内烦人 try catch, 使得代码更加简洁
 * @param {*} promise
 * @returns Array<error, data>
 */
function to(promise) {
  // 如果不是 promise 就返回自身
  if (!promise.then) return promise
  // 核心代码
  return promise
    .then(data => {
      return [null, data]
    })
    .catch(err => [err])
}

/**
 * 根据提供的过滤器对对象进行过滤。
 *
 * @param {object} ob - 要过滤的对象。
 * @param {(string | string[])} filters - 要应用的过滤器。可以是字符串或字符串数组。
 * @return {object} - 过滤后的对象。
 */
function objectFilter(ob, filters) {
  if (!ob || typeof ob !== 'object') return ob
  const result = JSON.parse(JSON.stringify(ob))
  if (typeof filters === 'string') {
    delete result[filters]
  }
  if (Array.isArray(filters)) {
    // eslint-disable-next-line no-unused-vars
    for (const f of filters) {
      delete result[f]
    }
  }
  return result
}

/**
 * @description: 详情页禁用所有输入框
 * @return {*}
 */
function disableInputDetail() {
  console.log(this)
  const doms = this.$el.querySelectorAll('input.el-input__inner')
  console.log(doms)
  for (const dom of doms) {
    // 新增：检查输入框是否在 .project-handle 容器内，如果是则跳过禁用
    if (dom.closest('.project-handle')) {
      continue
    }

    dom.disabled = true
    // 禁用状态下，字体颜色设置为黑色
    dom.style.cssText +=
      'background-color: #F5F7FA;border-color: #dfe4ed;color: #000;cursor: not-allowed; pointer-events: none;'
    // 针对下拉框的情况
    if (dom.nextElementSibling) {
      dom.nextElementSibling.childNodes[0].style.pointerEvents = 'none'
      dom.parentNode.parentNode.style.pointerEvents = 'none'
    }

    // 检查是否有绑定 approval-handle 的元素，并排除它们
    // 如果input中某个img 有class approval-handle，则不处理禁用
    const approvalImg = dom.parentNode.querySelector('img.approval-handle')
    if (approvalImg) {
      approvalImg.style.pointerEvents = 'auto' // 保持可点击
    }
  }
}

/**
 * @description: 获取定量分析参考值数据
 * @return {*}
 */
function showReferenceValue(item) {
  let result = ''
  // if (item.analyzeMethodName === '定量分析') {
  if (item.comparator === 'between') {
    // 介于(不包含上下限)
    result = Number(item.downLimitValue) + '~' + Number(item.upperLimitValue) + '(不包含上下限)'
  } if (item.comparator === 'greaterBetweenLessequal') {
    // 介于(包含上限)
    result = Number(item.downLimitValue) + '~' + Number(item.upperLimitValue) + '(包含上限)'
  } if (item.comparator === 'greaterequalBetweenLess') {
    // 介于(包含下限)
    result = Number(item.downLimitValue) + '~' + Number(item.upperLimitValue) + '(包含下限)'
  } if (item.comparator === 'greaterequalBetweenLessequal') {
    // 介于(包含上下限)
    result = Number(item.downLimitValue) + '~' + Number(item.upperLimitValue) + '(包含上下限)'
  } else if (item.comparator === 'equal') {
    // 等于
    result = '等于' + Number(item.referenceValue)
  } else if (item.comparator === 'big') {
    // 大于
    result = '大于' + Number(item.referenceValue)
  } else if (item.comparator === 'bigEqual') {
    // 大于等于
    result = '大于等于' + Number(item.referenceValue)
  } else if (item.comparator === 'small') {
    // 小于
    result = '小于' + Number(item.referenceValue)
  } else if (item.comparator === 'smallEqual') {
    // 小于等于
    result = '小于等于' + Number(item.referenceValue)
  } else if (item.comparator === 'notEqual') {
    // 不等于
    result = '不等于' + Number(item.referenceValue)
  }
  // }
  return result
}

/**
 * @description: 定量分析,根据参考值数据，判断是否合格
 * @return {*}
 */
function changeCheckResult(item, value) {
  let singleConclusion = null
  // if (item.analyzeMethodName === '定量分析') {
  if (item.comparator === 'between') {
    // 介于(不包含上下限)
    if (
      Number(value) > Number(item.downLimitValue) &&
        Number(value) < Number(item.upperLimitValue)
    ) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  } else if (item.comparator === 'greaterBetweenLessequal') {
    // 介于(包含上限)
    if (
      Number(value) > Number(item.downLimitValue) &&
        Number(value) <= Number(item.upperLimitValue)
    ) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  } else if (item.comparator === 'greaterequalBetweenLess') {
    // 介于(包含下限)
    if (
      Number(value) >= Number(item.downLimitValue) &&
        Number(value) < Number(item.upperLimitValue)
    ) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  } else if (item.comparator === 'greaterequalBetweenLessequal') {
    // 介于(包含上下限)
    if (
      Number(value) >= Number(item.downLimitValue) &&
        Number(value) <= Number(item.upperLimitValue)
    ) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  } else if (item.comparator === 'equal') {
    // 等于
    if (Number(value) === Number(item.referenceValue)) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  } else if (item.comparator === 'big') {
    // 大于
    if (Number(value) > Number(item.referenceValue)) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  } else if (item.comparator === 'bigEqual') {
    // 大于等于
    if (Number(value) >= Number(item.referenceValue)) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  } else if (item.comparator === 'small') {
    // 小于
    if (Number(value) < Number(item.referenceValue)) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  } else if (item.comparator === 'smallEqual') {
    // 小于等于
    if (Number(value) <= Number(item.referenceValue)) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  } else if (item.comparator === 'notEqual') {
    // 不等于
    if (Number(value) !== Number(item.referenceValue)) {
      singleConclusion = 1
    } else {
      singleConclusion = 0
    }
  }
  // }
  return singleConclusion
}

/**
 * @function 获取页面字段配置 fieldConfig
 * @description 获取“当前模块”下的“当前页”的的字段配置
 * @param fieldCode 当前字段
 * @param fullRouteCode 当前模块关键字
 * @param pageFullPathCode 当前页关键字
 * @return 当前字段配置
 **/
function FC(fieldCode, fullRouteCode, pageFullPathCode) {
  return store.getters.fieldRuleDetail?.[fullRouteCode]?.[
    pageFullPathCode
  ]?.find(j => j.fieldCode === fieldCode)
}

/**
 * @function 获取字段的字段名配置 fieldsConfigName
 * @description
 * @param fieldPath
 *   fullRouteCode 当前模块关键字
 *   pageFullPathCode 当前页关键字
 * @param backFieldName 字段的字段名的后背字段名
 * @return 字段的字段名
 **/
const FN = (fieldPath, fieldCode, backFieldName) => {
  const { fullRouteCode, pageFullPathCode } = fieldPath
  return (
    (FC(fieldCode, fullRouteCode, pageFullPathCode)?.fieldCustomName ||
      FC(fieldCode, fullRouteCode, pageFullPathCode)?.fieldDefaultName ||
      backFieldName) + ':'
  )
}

/**
 * @function 获取字段的“正则校验”、“是否必填”配置 fieldsConfigRules
 * @description
 * @param fieldPath
 *   fullRouteCode 当前模块关键字
 *   pageFullPathCode 当前页关键字
 * @param fieldCode 字段关键字
 * @return 字段的“正则校验”、“是否必填”配置
 **/
const FR = (fieldPath, fieldCode, type) => {
  const { fullRouteCode, pageFullPathCode } = fieldPath
  const fieldConfig = FC(fieldCode, fullRouteCode, pageFullPathCode)
  // return fieldConfig?.rules
  // rules 一直都是null
  // 根据 isNeed 值判断是否必填
  return fieldConfig?.isNeed
    ? [
      {
        required: fieldConfig?.isNeed,
        message: '请输入'
      }
      // {
      //   pattern: fieldConfig?.rules || '',
      //   type: type || 'string',
      //   message: '数据格式错误'
      // }
    ]
    : [
      // {
      //   required: fieldConfig?.isNeed,
      //   message: '请输入'
      //   // type: type || 'string'
      // }
      {
        required: false,
        message: '请输入'
      }
    ]
}

export default {
  setForwardSessionCommon,
  getForwardSessionCommon,
  setForwardSessionTab,
  getForwardSessionTab,
  beforeRouteLeaveSessionCommon,
  to,
  objectFilter,
  disableInputDetail,
  showReferenceValue,
  changeCheckResult,
  FC,
  FN,
  FR
}
