// 含有 Layout
import Layout from '@/views/layout'
export default {
  path: '/common',
  component: Layout,
  hidden: true,
  meta: {
    title: ''
  },
  children: [
    // 其他路由
    {
      path: '/warehousingDistribution/common/importExcel/historyResult',
      component: () => import('@/views/common/importExcel/historyResult'),
      name: 'historyResult',
      meta: {
        title: '历史数据'
      },
      hidden: true
    },
    {
      path: '/warehousingDistribution/common/importExcel/viewLog',
      component: () => import('@/views/common/importExcel/viewLog'),
      name: 'viewLog',
      meta: {
        title: '查看日志（导出excel）'
      },
      hidden: true
    }
  ]
}
