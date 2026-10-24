/*
 * @Author: your name
 * @Date: 2020-12-01 11:33:19
 * @LastEditTime: 2023-05-06 17:18:57
 * @LastEditors: xqm 13697256625@163.com
 * @Description: In User Settings Edit
 * @FilePath: \34-智能工厂项目\后台\master\src\settings.js
 */
module.exports = {
  // title: 'Vue Element Admin',
  title: '数字工厂',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',
  cachedPages: [],
  // 是否在精制环境
  isNotAppletENV: !window.flutter_inappwebview
}
