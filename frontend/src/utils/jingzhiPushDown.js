import { Notification } from 'element-ui'
/**
 * 通过向 '/api/business/config/get/value' 端点发出 GET 请求，
 * 获取 'general.batchOpenPage.enable' 配置参数的值。
 *
 * @return {Promise} 返回一个解析请求响应的 Promise 对象。
 */
// export function pushDownSwitch() {
//   return request({
//     url: '/api/business/config/get/value',
//     method: 'get',
//     params: {
//       valueFullPathCode: 'general.batchOpenPage.enable'
//     }
//   })
// }

/**
 * 精制环境下,下推数据到新的 tab 页面,需要做以下处理
 *
 * @param {string} appid - 应用ID
 * @param {string} path - 路径
 * @param {object} saveData - 要下推的数据
 * @param {object}  saveDataV2(可选) - 要下推的PUSH_DOWN_DATA数据
 * @return {boolean} true - 下推成功, false - 下推失败
 */
export async function jingzhiPushDown(appid, path, saveData, saveDataV2) {
  console.log('🚀 ~ jingzhiPushDown ~ path:', path)
  if (!path || !appid || !window.flutter_inappwebview) return false
  localStorage.setItem('jingZhiPushDownPath', path)
  // 这样做是为了兼容各个下推数据保存时,定义名称不一致的问题
  if (saveData && typeof saveData === 'object') {
    localStorage.setItem('amsPushDownData', JSON.stringify(saveData))
  }
  if (saveDataV2 && typeof saveDataV2 === 'object') {
    localStorage.setItem('amsPushDownDataV2', JSON.stringify(saveDataV2))
  }
  const purePath = path.replace(/^([^?]+)(\?.*)?$/, (m, v, v2) => v)
  console.log('🚀 ~ jingzhiPushDown ~ purePath:', purePath)
  const pathSuffix = purePath.replace(/^(\/.+)(\/.+)/, (m, v, v2) => v)
  console.log('🚀 ~ jingzhiPushDown ~ pathSuffix:', pathSuffix)
  // 过滤以 lastsuffix 为主, pathSuffix 为目前仅为兼容使用
  const lastSuffix = purePath.replace(/.+\/(.+)$/, (m, v) => v)
  console.log('🚀 ~ jingzhiPushDown ~ lastSuffix:', lastSuffix)
  // const goRoute = path.replace(/^(\/.*?\/.*?)(\/.+)/, (m, v, v2) => v2)
  // const appData = await window.flutter_inappwebview.callHandler(
  //   'getEnterpriseApps'
  // )
  // console.log('appData -> ', appData)
  // let applicationId = ''
  // const loopFn = app => {
  //   const releases_page = app.releases?.[0].page ?? []
  //   const releasesData = app.releases?.[0] ?? {}
  //   for (const page of releases_page) {
  //     if (page.url === lastSuffix) {
  //       applicationId = releasesData.applicationId
  //       console.log(
  //         'applicationId url lastSuffix -> ',
  //         applicationId,
  //         page.url,
  //         page
  //       )
  //       break
  //     } else if (page.url === pathSuffix) {
  //       applicationId = releasesData.applicationId
  //       console.log('applicationId url-> ', applicationId, page.url, page)
  //       break
  //     } else if (page.url === purePath) {
  //       applicationId = releasesData.applicationId
  //       console.log('applicationId url-> ', applicationId, page.url, page)
  //       break
  //     }
  //   }
  // }
  // for (const apps of appData) {
  //   // 这里多判断了一层 apps
  //   for (const app of apps.apps) {
  //     if (app.apps) {
  //       for (const app2 of app.apps) {
  //         loopFn(app2)
  //       }
  //     }
  //     loopFn(app)
  //   }
  // }
  // if (!applicationId) {
  //   Notification({
  //     title: '提示',
  //     message: '没有找到对应的程序,请检查路由配置是否正确',
  //     type: 'warning'
  //   })
  //   // applicationId = appid
  //   localStorage.removeItem('jingZhiPushDownPath')
  //   localStorage.removeItem('amsPushDownData')
  //   localStorage.removeItem('amsPushDownDataV2')
  //   // 如果找不到 application id
  //   return true
  // }

  // const {
  //   data: { code, data }
  // } = await pushDownSwitch()
  // if (code !== '200' || data.value !== 'true') return false
  // push_ip_test001
  window.flutter_inappwebview
    .callHandler('startProgramWitApplicationId_v2', appid, path, '', true)
    .then(function(result) {
      if (result) {
        console.log(result, '跳转成功!!!')
      } else {
        Notification({
          title: '提示',
          message: '跳转失败',
          type: 'error'
        })
        localStorage.removeItem('jingZhiPushDownPath')
        localStorage.removeItem('amsPushDownData')
        localStorage.removeItem('amsPushDownDataV2')
      }
    })
  return true
}

/**
 * @description: 进入路由后的处理 将数据存到sessionStorage
 * @return {*}
 */
export function jingZhiPushDownRouterHandler() {
  // 将数据存储到 sessionStorage
  const amsPushDownData = JSON.parse(localStorage.getItem('amsPushDownData'))
  if (amsPushDownData && typeof amsPushDownData === 'object') {
    Object.keys(amsPushDownData).forEach(key => {
      sessionStorage.setItem(key, JSON.stringify(amsPushDownData[key]))
    })
    //   清除数据
    localStorage.removeItem('amsPushDownData')
  }

  // 将数据存储到 sessionStorage
  const amsPushDownDataV2 = JSON.parse(
    localStorage.getItem('amsPushDownDataV2')
  )
  if (amsPushDownDataV2 && typeof amsPushDownDataV2 === 'object') {
    Object.keys(amsPushDownDataV2).forEach(key => {
      sessionStorage.setItem(key, JSON.stringify(amsPushDownDataV2[key]))
    })
    //   清除数据
    localStorage.removeItem('amsPushDownDataV2')
  }
}
