/*
 * @Author: zhaozhuo
 * @Date: 2021-12-31 16:27:47
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-08-01 14:44:34
 * @Description:
 */

const prodPlugins = []
// if (process.env.NODE_ENV === 'production') {
//   prodPlugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
// }

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [...prodPlugins]
}
