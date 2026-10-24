/*
 * @Author: shunhua.liang
 * @Date: 2022-04-11 16:39:31
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-10-10 13:42:23
 * @Description:
 */
import { postFormConfigFieldRuleDetail } from '@/api/common.js'
const state = {
  fieldRuleDetail: {
    // '/order-model/production-workorder': {}
  } // 所有页面字段名配置- fullRouteCode字段：具体页面关键字
}

const mutations = {
  SET_FIELDRULEDETAIL: (state, playload) => {
    state.fieldRuleDetail = {
      ...state.fieldRuleDetail,
      [playload.fullRouteCode]: playload.ruleData
    }
  }
}

const actions = {
  async postFormConfigFieldRuleDetail({ commit }, playload) {
    // console.log('根据配置显示配置的字段名', playload)

    // 根据配置显示配置的字段名
    const res = await postFormConfigFieldRuleDetail(playload)
    const { code, data, message } = res.data
    if (code === '200') {
      const ruleData = {}
      data.forEach(item => {
        ruleData[item.fullPathCode] = [
          ...(ruleData[item.fullPathCode] || []),
          item
        ]
      })
      commit('SET_FIELDRULEDETAIL', { ...playload, ruleData })
      // console.log('进入js函数中 ruleData', ruleData)
    } else {
      this.$notify({
        title: '告警',
        message: message || '系统错误',
        type: 'error',
        duration: 2000
      })
    }
  },
  // 从服务器获取配置文件
  getFieldConfig({ commit }) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'public/fieldConfig.json', true)
    const Etag = localStorage.getItem('fieldConfig-Etag')
    const lastModified = localStorage.getItem('fieldConfig-lastModified')
    if (Etag) {
      xhr.setRequestHeader('Etag', Etag)
    }
    if (lastModified) {
      xhr.setRequestHeader('Last-Modified', lastModified)
    }

    xhr.onreadystatechange = function() {
    // eslint-disable-next-line
      if (xhr.readyState == 4 && xhr.status == 200) {
        localStorage.setItem(
          'fieldConfig-lastModified',
          xhr.getResponseHeader('Last-Modified')
        )
        localStorage.setItem('fieldConfig-Etag', xhr.getResponseHeader('Etag'))
        // 文件内容在xhr.responseText中
        const fileContent = xhr.responseText
        const ruleData = {}
        JSON.parse(fileContent).forEach(item => {
          ruleData[item.fullPathCode] = [
            ...(ruleData[item.fullPathCode] || []),
            item
          ]
        })
        commit('SET_FIELDRULEDETAIL', ruleData)
      }
    }
    xhr.send()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
