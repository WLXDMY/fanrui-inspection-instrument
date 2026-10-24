// 平台上传包只编译检验仪器模块；普通 QMS 构建仍使用 qualityManagement.js。
import Layout from '@/views/layout'

export default {
  path: '/inspection-manage',
  component: Layout,
  name: '质量管理',
  meta: {
    title: '质量管理',
    icon: 'menu_quality_management'
  },
  children: [
    {
      path: '/inspection-manage/qms-product-inspection/instrument',
      component: () => import('@/views/quality_management/instrument/index.vue'),
      name: 'instrument',
      meta: { title: '检验仪器' }
    },
    {
      path: '/inspection-manage/qms-product-inspection/instrument/add',
      component: () => import('@/views/quality_management/instrument/components/itemCommonPage.vue'),
      name: 'instrumentAdd',
      hidden: true,
      meta: { title: '检验仪器新增' }
    },
    {
      path: '/inspection-manage/qms-product-inspection/instrument/detail',
      component: () => import('@/views/quality_management/instrument/components/itemCommonPage.vue'),
      name: 'instrumentDetail',
      hidden: true,
      meta: { title: '检验仪器详情' }
    },
    {
      path: '/inspection-manage/qms-product-inspection/instrument/edit',
      component: () => import('@/views/quality_management/instrument/components/itemCommonPage.vue'),
      name: 'instrumentEdit',
      hidden: true,
      meta: { title: '检验仪器编辑' }
    },
    {
      path: '/inspection-manage/qms-product-inspection/instrument-classify',
      component: () => import('@/views/quality_management/instrumentClassify/index.vue'),
      name: 'instrumentClassify',
      hidden: true,
      meta: { title: '仪器分类' }
    }
  ]
}
