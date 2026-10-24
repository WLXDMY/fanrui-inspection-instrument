import request from '@/utils/request'
import { Notification } from 'element-ui'
/**
 * 通过向 '/api/business/config/get/value' 端点发出 GET 请求，
 * 获取 'general.batchOpenPage.enable' 配置参数的值。
 *
 * @return {Promise} 返回一个解析请求响应的 Promise 对象。
 */
export function pushDownSwitch() {
  return request({
    url: '/api/business/config/get/value',
    method: 'get',
    params: {
      valueFullPathCode: 'general.batchOpenPage.enable'
    }
  })
}

/**
 * 精制环境下,下推数据到新的 tab 页面,需要做以下处理
 *
 * @param {string} appid - 应用ID
 * @param {string} path - 路径
 * @param {object} saveData - 要下推的数据
 * @return {boolean} true - 下推成功, false - 下推失败
 */
export async function jingzhiPushDown(appid, path, saveData) {
  console.log('🚀 ~ jingzhiPushDown ~ path:', path)
  if (!path || !appid || !window.flutter_inappwebview) return false
  localStorage.setItem('jingZhiPushDownPath', path)
  // 这样做是为了兼容各个下推数据保存时,定义名称不一致的问题
  if (saveData && typeof saveData === 'object') {
    localStorage.setItem('amsPushDownData', JSON.stringify(saveData))
  }
  const purePath = path.replace(/^([^?]+)(\?.*)?$/, (m, v, v2) => v)
  console.log('🚀 ~ jingzhiPushDown ~ purePath:', purePath)
  const pathSuffix = purePath.replace(/^(\/.+)(\/.+)/, (m, v, v2) => v)
  console.log('🚀 ~ jingzhiPushDown ~ pathSuffix:', pathSuffix)
  // 过滤以 lastsuffix 为主, pathSuffix 为目前仅为兼容使用
  const lastSuffix = purePath.replace(/.+\/(.+)$/, (m, v) => v)
  console.log('🚀 ~ jingzhiPushDown ~ lastSuffix:', lastSuffix)
  // const goRoute = path.replace(/^(\/.*?\/.*?)(\/.+)/, (m, v, v2) => v2)
  const appData = await window.flutter_inappwebview.callHandler(
    'getEnterpriseApps'
  )
  console.log('appData -> ', appData)
  let applicationId = ''
  const loopFn = app => {
    const releases_page = app.releases?.[0].page ?? []
    const releasesData = app.releases?.[0] ?? {}
    for (const page of releases_page) {
      if (page.url === lastSuffix) {
        applicationId = releasesData.applicationId
        console.log(
          'applicationId url lastSuffix -> ',
          applicationId,
          page.url,
          page
        )
        break
      } else if (page.url === pathSuffix) {
        applicationId = releasesData.applicationId
        console.log('applicationId url-> ', applicationId, page.url, page)
        break
      }
    }
  }
  for (const apps of appData) {
    // 这里多判断了一层 apps
    for (const app of apps.apps) {
      if (app.apps) {
        for (const app2 of app.apps) {
          loopFn(app2)
        }
      }
      loopFn(app)
    }
  }
  if (!applicationId) {
    Notification({
      title: '提示',
      message: '没有找到对应的程序,请检查路由配置是否正确',
      type: 'warning'
    })
    // applicationId = appid
    localStorage.removeItem('jingZhiPushDownPath')
    localStorage.removeItem('amsPushDownData')
    // 如果找不到 application id
    return true
  }

  const {
    data: { code, data }
  } = await pushDownSwitch()
  if (code !== '200' || data.value !== 'true') return false
  // push_ip_test001
  window.flutter_inappwebview
    .callHandler(
      'startProgramWitApplicationId_v2',
      applicationId,
      path,
      '',
      true
    )
    .then(function (result) {
      if (result) {
        console.log(result, '跳转成功!!!')
      } else {
        Notification({
          title: '提示',
          message: '跳转失败,请正确设置 applicationId',
          type: 'error'
        })
        localStorage.removeItem('jingZhiPushDownPath')
        localStorage.removeItem('amsPushDownData')
      }
    })

  return true
}

/**
 * 执行给定应用ID和路径的下推强制操作。
 *
 * @param {string} appid - 应用的ID。
 * @param {string} path - 下推强制操作的路径。
 * @param {any} saveData - 可选的保存数据，用于将来使用。
 * @return {boolean} 如果下推强制操作成功执行，则返回true，否则返回false。
 */
export async function jingzhiPushDownForce(appid, path, saveData) {
  if (!path || !appid || !window.flutter_inappwebview) return false
  localStorage.setItem('jingZhiPushDownPath', path)
  // 这样做是为了兼容各个下推数据保存时,定义名称不一致的问题
  if (saveData && typeof saveData === 'object') {
    localStorage.setItem('amsPushDownData', JSON.stringify(saveData))
  }
  const purePath = path.replace(/^([^?]+)(\?.*)?$/, (m, v, v2) => v)
  const pathSuffix = purePath.replace(/^(\/.+)(\/.+)/, (m, v, v2) => v)
  // 过滤以 lastsuffix 为主, pathSuffix 为目前仅为兼容使用
  const lastSuffix = purePath.replace(/.+\/(.+)$/, (m, v) => v)
  console.log('pathSuffix -> ', path, pathSuffix)
  const appData = await window.flutter_inappwebview.callHandler(
    'getEnterpriseApps'
  )
  // console.log('appData -> ', appData)
  let applicationId = ''
  const loopFn = app => {
    const releases_page = app.releases?.[0].page ?? []
    const releasesData = app.releases?.[0] ?? {}
    for (const page of releases_page) {
      if (page.url === lastSuffix) {
        applicationId = releasesData.applicationId
        console.log(
          'applicationId url lastSuffix -> ',
          applicationId,
          page.url,
          page
        )
        break
      } else if (page.url === pathSuffix) {
        applicationId = releasesData.applicationId
        console.log('applicationId url-> ', applicationId, page.url, page)
        break
      }
    }
  }
  for (const apps of appData) {
    // 这里多判断了一层 apps
    for (const app of apps.apps) {
      if (app.apps) {
        for (const app2 of app.apps) {
          loopFn(app2)
        }
      }
      loopFn(app)
    }
  }
  if (!applicationId) {
    Notification({
      title: '提示',
      message: '没有找到对应的程序,请检查路由配置是否正确',
      type: 'warning'
    })
    applicationId = appid
  }
  // push_ip_test001
  window.flutter_inappwebview
    .callHandler(
      'startProgramWitApplicationId_v2',
      applicationId,
      path,
      '',
      true
    )
    .then(function (result) {
      console.log(result, '跳转成功!!!')
      if (result) {
        console.log(result, '跳转成功!!!')
      } else {
        Notification({
          title: '提示',
          message: '跳转失败,请正确设置 applicationId',
          type: 'error'
        })
        localStorage.removeItem('jingZhiPushDownPath')
        localStorage.removeItem('amsPushDownData')
      }
    })

  return true
}

/**
 * 精制下推时路由拦截并处理
 *
 * @return {void} 该函数没有返回值。
 */
export function jingZhiPushDownRouterHandler(router) {
  const path = localStorage.getItem('jingZhiPushDownPath')
  if (!path || !window.flutter_inappwebview) return

  // 清除 path
  localStorage.removeItem('jingZhiPushDownPath')

  // 将数据存储到 sessionStorage
  const amsPushDownData = JSON.parse(localStorage.getItem('amsPushDownData'))
  if (amsPushDownData && typeof amsPushDownData === 'object') {
    Object.keys(amsPushDownData).forEach(key => {
      sessionStorage.setItem(key, JSON.stringify(amsPushDownData[key]))
    })
    //   清除数据
    localStorage.removeItem('amsPushDownData')
  }

  // 跳转到对应路由
  // window.history.replaceState(null, null, path)
  // 目前还没更好的触发路由响应的方法,所以直接刷新页面,强制路由刷新
  // location.reload()
  // console.log('path --> ', path)
  const goRoute = path.replace(/^(\/.*?\/.*?)(\/.+)/, (m, v, v2) => v2)
  // console.log('goRoute --> ', goRoute)
  router.push(goRoute)

  // 阻断 next() 不需要再跳到别的页面了
  return true
}
