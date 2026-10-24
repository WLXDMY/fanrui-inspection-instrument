/*
 * @Author: zhaozhuo
 * @Date: 2022-10-19 12:13:28
 * @LastEditors: zhaozhuo
 * @LastEditTime: 2022-10-26 11:36:18
 * @Description: ...
 */
import Layout from '@/views/layout'

export default [
  // 个人中心
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/profile/index',
        component: () => import('@/views/profile/index'),
        name: '个人中心',
        meta: {
          title: '个人中心',
          icon: 'user',
          noCache: true
        }
      },
      {
        path: '/profile/about',
        component: () => import('@/views/profile/about'),
        name: '关于',
        meta: {
          title: '关于',
          icon: 'user',
          noCache: true
        }
      }
    ]
  },
  // 404
  {
    path: '*',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
    meta: {
      title: '404',
      noCache: true
    }
  }
]
