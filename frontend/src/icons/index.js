/*
 * @Author: zhaozhuo
 * @Date: 2021-12-30 11:05:03
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-01-07 19:04:32
 * @Description:
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
