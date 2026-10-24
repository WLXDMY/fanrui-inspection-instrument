/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-05-29 14:30:44
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-04-24 17:51:16
 * @FilePath: \yelink-qms\src\router\modules\qualityManagement.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Layout from '@/views/layout'
import store from '@/store'

export default {
  path: '/inspection-manage',
  component: Layout,
  name: '质量管理',
  meta: {
    title: '质量管理',
    icon: 'menu_quality_management'
  },
  children: [
    // 检验项目
    {
      path: '/inspection-manage/qms-product-inspection/project',
      component: () => import('@/views/quality_management/inspectionitems/index.vue'),
      name: 'inspectionitems',
      meta: {
        title: '产品检验项目'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/project']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/project'
          })
        }
        next()
      }
    },
    // 检验项目新增
    {
      path: '/inspection-manage/qms-product-inspection/project/add',
      component: () => import('@/views/quality_management/inspectionitems/components/itemCommonPage.vue'),
      name: 'inspectionitemsAdd',
      hidden: true,
      meta: {
        title: '检验项目新增'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/project']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/project'
          })
        }
        next()
      }
    },
    // 检验项目详情
    {
      path: '/inspection-manage/qms-product-inspection/project/detail',
      component: () => import('@/views/quality_management/inspectionitems/components/itemCommonPage.vue'),
      name: 'inspectionitemsDetail',
      hidden: true,
      meta: {
        title: '检验项目详情'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/project']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/project'
          })
        }
        next()
      }
    },
    // 检验项目编辑
    {
      path: '/inspection-manage/qms-product-inspection/project/edit',
      component: () => import('@/views/quality_management/inspectionitems/components/itemCommonPage.vue'),
      name: 'inspectionitemsEdit',
      hidden: true,
      meta: {
        title: '检验项目编辑'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/project']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/project'
          })
        }
        next()
      }
    },
    {
      // 该页面隐藏，在检验项目中可以点击
      path: '/inspection-manage/qms-product-inspection/projectgroup2',
      component: () => import('@/views/quality_management/inspectionItemGroup/index.vue'),
      name: 'inspectionItemGroup',
      hidden: true,
      meta: {
        title: '产品检验项目组'
      }
    },
    // 检验仪器 start
    {
      path: '/inspection-manage/qms-product-inspection/instrument',
      component: () => import('@/views/quality_management/instrument/index.vue'),
      name: 'instrument',
      meta: {
        title: '检验仪器'
      }
      // beforeEnter: (to, from, next) => {
      //   if (
      //     !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/project']
      //   ) {
      //     store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
      //       fullRouteCode: '/inspection-manage/qms-product-inspection/project'
      //     })
      //   }
      //   next()
      // }
    },
    // 检验仪器新增
    {
      path: '/inspection-manage/qms-product-inspection/instrument/add',
      component: () => import('@/views/quality_management/instrument/components/itemCommonPage.vue'),
      name: 'instrumentAdd',
      hidden: true,
      meta: {
        title: '检验仪器新增'
      }
      // beforeEnter: (to, from, next) => {
      //   if (
      //     !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/project']
      //   ) {
      //     store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
      //       fullRouteCode: '/inspection-manage/qms-product-inspection/project'
      //     })
      //   }
      //   next()
      // }
    },
    // 检验仪器详情
    {
      path: '/inspection-manage/qms-product-inspection/instrument/detail',
      component: () => import('@/views/quality_management/instrument/components/itemCommonPage.vue'),
      name: 'instrumentDetail',
      hidden: true,
      meta: {
        title: '检验仪器详情'
      }
      // beforeEnter: (to, from, next) => {
      //   if (
      //     !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/project']
      //   ) {
      //     store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
      //       fullRouteCode: '/inspection-manage/qms-product-inspection/project'
      //     })
      //   }
      //   next()
      // }
    },
    // 检验仪器编辑
    {
      path: '/inspection-manage/qms-product-inspection/instrument/edit',
      component: () => import('@/views/quality_management/instrument/components/itemCommonPage.vue'),
      name: 'instrumentEdit',
      hidden: true,
      meta: {
        title: '检验仪器编辑'
      }
      // beforeEnter: (to, from, next) => {
      //   if (
      //     !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/project']
      //   ) {
      //     store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
      //       fullRouteCode: '/inspection-manage/qms-product-inspection/project'
      //     })
      //   }
      //   next()
      // }
    },
    {
      // 该页面隐藏，在检验仪器中可以点击
      path: '/inspection-manage/qms-product-inspection/instrument-classify',
      component: () => import('@/views/quality_management/instrumentClassify/index.vue'),
      name: 'instrumentClassify',
      hidden: true,
      meta: {
        title: '仪器分类'
      }
    },
    // 检验仪器 end
    {
      path: '/inspection-manage/qms-product-inspection/samplePlane',
      component: () => import('@/views/quality_management/samplingProgram/index.vue'),
      name: 'samplingProgram',
      meta: {
        title: '产品抽样方案'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/samplePlane']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/samplePlane'
          })
        }
        next()
      }
    },
    // 产品抽样方案新增
    {
      path: '/inspection-manage/qms-product-inspection/samplePlane/add',
      component: () => import('@/views/quality_management/samplingProgram/components/commonPage.vue'),
      name: 'samplingProgramAdd',
      hidden: true,
      meta: {
        title: '产品抽样方案新增'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/samplePlane']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/samplePlane'
          })
        }
        next()
      }
    },
    // 产品抽样方案详情
    {
      path: '/inspection-manage/qms-product-inspection/samplePlane/detail',
      component: () => import('@/views/quality_management/samplingProgram/components/commonPage.vue'),
      name: 'samplingProgramDetail',
      hidden: true,
      meta: {
        title: '产品抽样方案详情'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/samplePlane']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/samplePlane'
          })
        }
        next()
      }
    },
    // 产品抽样方案编辑
    {
      path: '/inspection-manage/qms-product-inspection/samplePlane/edit',
      component: () => import('@/views/quality_management/samplingProgram/components/commonPage.vue'),
      name: 'samplingProgramEdit',
      hidden: true,
      meta: {
        title: '产品抽样方案编辑'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/samplePlane']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/samplePlane'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/scheme',
      component: () => import('@/views/quality_management/inspectionProgram/index.vue'),
      name: 'inspectionProgram',
      meta: {
        title: '产品检验方案'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/scheme']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/scheme'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/scheme/add',
      component: () => import('@/views/quality_management/inspectionProgram/components/commonPage.vue'),
      name: 'inspectionProgramAdd',
      hidden: true,
      meta: {
        title: '产品检验方案新增'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/scheme']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/scheme'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/scheme/detail',
      component: () => import('@/views/quality_management/inspectionProgram/components/commonPage.vue'),
      name: 'inspectionProgramDetail',
      hidden: true,
      meta: {
        title: '产品检验方案详情'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/scheme']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/scheme'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/scheme/edit',
      component: () => import('@/views/quality_management/inspectionProgram/components/commonPage.vue'),
      name: 'inspectionProgramEdit',
      hidden: true,
      meta: {
        title: '产品检验方案编辑'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/scheme']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/scheme'
          })
        }
        next()
      }
    },
    // 产品检验单
    {
      path: '/inspection-manage/qms-product-inspection/productInspection',
      component: () => import('@/views/quality_management/inspectionSheet/index.vue'),
      name: 'productInspection',
      meta: {
        title: '产品检验单'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productInspection'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/productInspection/add',
      component: () => import('@/views/quality_management/inspectionSheet/newInspectionSheetPage/index.vue'),
      name: 'productInspectionAdd',
      hidden: true,
      meta: {
        title: '产品检验单新增'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productInspection'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/productInspection/edit',
      component: () => import('@/views/quality_management/inspectionSheet/newInspectionSheetPage/index.vue'),
      name: 'productInspectionEdit',
      hidden: true,
      meta: {
        title: '产品检验单编辑'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productInspection'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/productInspection/detail',
      component: () => import('@/views/quality_management/inspectionSheet/newInspectionSheetPage/index.vue'),
      name: 'productInspectionDetail',
      hidden: true,
      meta: {
        title: '产品检验单详情'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productInspection'
          })
        }
        next()
      }
    },
    // 来料检验单
    {
      path: '/inspection-manage/qms-product-inspection/incomingInspect',
      component: () => import('@/views/quality_management/inspectionSheet/incomingInspectIndex.vue'),
      name: 'incomingInspection',
      meta: {
        title: '来料检验单'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/incomingInspect']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/incomingInspect'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/incomingInspect/add',
      component: () => import('@/views/quality_management/inspectionSheet/newIncomingInspectSheetPage/index.vue'),
      name: 'incomingInspectAdd',
      hidden: true,
      meta: {
        title: '来料检验单新增'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/incomingInspect']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/incomingInspect'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/incomingInspect/edit',
      component: () => import('@/views/quality_management/inspectionSheet/newIncomingInspectSheetPage/index.vue'),
      name: 'incomingInspectEdit',
      hidden: true,
      meta: {
        title: '来料检验单编辑'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/incomingInspect']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/incomingInspect'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/incomingInspect/detail',
      component: () => import('@/views/quality_management/inspectionSheet/newIncomingInspectSheetPage/index.vue'),
      name: 'incomingInspectDetail',
      hidden: true,
      meta: {
        title: '来料检验单详情'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/incomingInspect']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/incomingInspect'
          })
        }
        next()
      }
    },
    // 生产检验单
    {
      path: '/inspection-manage/qms-product-inspection/productionInspect',
      component: () => import('@/views/quality_management/inspectionSheet/productionInspectIndex.vue'),
      name: 'productionInspection',
      meta: {
        title: '生产检验单'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productionInspect']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productionInspect'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/productionInspect/add',
      component: () => import('@/views/quality_management/inspectionSheet/newProductionInspectSheetPage/index.vue'),
      name: 'productionInspectAdd',
      hidden: true,
      meta: {
        title: '生产检验单新增'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productionInspect']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productionInspect'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/productionInspect/edit',
      component: () => import('@/views/quality_management/inspectionSheet/newProductionInspectSheetPage/index.vue'),
      name: 'productionInspectEdit',
      hidden: true,
      meta: {
        title: '生产检验单编辑'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productionInspect']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productionInspect'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/productionInspect/detail',
      component: () => import('@/views/quality_management/inspectionSheet/newProductionInspectSheetPage/index.vue'),
      name: 'productionInspectDetail',
      hidden: true,
      meta: {
        title: '生产检验单详情'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productionInspect']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productionInspect'
          })
        }
        next()
      }
    },
    // 生产巡检单
    {
      path: '/inspection-manage/qms-product-inspection/productionProcess',
      component: () => import('@/views/quality_management/inspectionSheet/productionProcessIndex.vue'),
      name: 'productionProcess',
      meta: {
        title: '生产巡检单'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productionProcess']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productionProcess'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/productionProcess/add',
      component: () => import('@/views/quality_management/inspectionSheet/newProductionProcessSheetPage/index.vue'),
      name: 'productionProcessAdd',
      hidden: true,
      meta: {
        title: '生产巡检单新增'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productionProcess']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productionProcess'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/productionProcess/edit',
      component: () => import('@/views/quality_management/inspectionSheet/newProductionProcessSheetPage/index.vue'),
      name: 'productionProcessEdit',
      hidden: true,
      meta: {
        title: '生产巡检单编辑'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productionProcess']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productionProcess'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/productionProcess/detail',
      component: () => import('@/views/quality_management/inspectionSheet/newProductionProcessSheetPage/index.vue'),
      name: 'productionProcessDetail',
      hidden: true,
      meta: {
        title: '生产巡检单详情'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/productionProcess']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/productionProcess'
          })
        }
        next()
      }
    },
    // 销售检验单
    {
      path: '/inspection-manage/qms-product-inspection/saleInspect',
      component: () => import('@/views/quality_management/inspectionSheet/saleInspectIndex.vue'),
      name: 'saleInspect',
      meta: {
        title: '销售检验单'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/saleInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/saleInspection'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/saleInspect/add',
      component: () => import('@/views/quality_management/inspectionSheet/newSaleInspectSheetPage/index.vue'),
      name: 'saleInspectAdd',
      hidden: true,
      meta: {
        title: '销售检验单新增'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/saleInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/saleInspection'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/saleInspect/edit',
      component: () => import('@/views/quality_management/inspectionSheet/newSaleInspectSheetPage/index.vue'),
      name: 'saleInspectEdit',
      hidden: true,
      meta: {
        title: '销售检验单编辑'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/saleInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/saleInspection'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/saleInspect/detail',
      component: () => import('@/views/quality_management/inspectionSheet/newSaleInspectSheetPage/index.vue'),
      name: 'saleInspectDetail',
      hidden: true,
      meta: {
        title: '销售检验单详情'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/saleInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/saleInspection'
          })
        }
        next()
      }
    },
    // 其他检验单
    {
      path: '/inspection-manage/qms-product-inspection/otherInspect',
      component: () => import('@/views/quality_management/inspectionSheet/otherInspectIndex.vue'),
      name: 'otherInspect',
      meta: {
        title: '其他检验单'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/otherInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/otherInspection'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/otherInspect/add',
      component: () => import('@/views/quality_management/inspectionSheet/newOtherInspectSheetPage/index.vue'),
      name: 'otherInspectAdd',
      hidden: true,
      meta: {
        title: '其他检验单新增'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/otherInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/otherInspection'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/otherInspect/edit',
      component: () => import('@/views/quality_management/inspectionSheet/newOtherInspectSheetPage/index.vue'),
      name: 'otherInspectEdit',
      hidden: true,
      meta: {
        title: '其他检验单编辑'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/otherInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/otherInspection'
          })
        }
        next()
      }
    },
    {
      path: '/inspection-manage/qms-product-inspection/otherInspect/detail',
      component: () => import('@/views/quality_management/inspectionSheet/newOtherInspectSheetPage/index.vue'),
      name: 'otherInspectDetail',
      hidden: true,
      meta: {
        title: '其他检验单详情'
      },
      beforeEnter: (to, from, next) => {
        if (
          !store.getters.fieldRuleDetail['/inspection-manage/qms-product-inspection/otherInspection']
        ) {
          store.dispatch('fieldsConfig/postFormConfigFieldRuleDetail', {
            fullRouteCode: '/inspection-manage/qms-product-inspection/otherInspection'
          })
        }
        next()
      }
    },
    // 不良缺陷
    {
      path: '/inspection-manage/qms-product-inspection/defect',
      component: () => import('@/views/quality_management/processQuality/index.vue'),
      name: 'processQuality',
      meta: {
        title: '缺陷定义'
      }
    },
    // 不良缺陷新增
    {
      path: '/inspection-manage/qms-product-inspection/defect/add',
      component: () => import('@/views/quality_management/processQuality/components/commonPage.vue'),
      name: 'processQualityAdd',
      hidden: true,
      meta: {
        title: '缺陷定义新增'
      }
    },
    // 不良缺陷编辑
    {
      path: '/inspection-manage/qms-product-inspection/defect/edit',
      component: () => import('@/views/quality_management/processQuality/components/commonPage.vue'),
      name: 'processQualityEdit',
      hidden: true,
      meta: {
        title: '缺陷定义编辑'
      }
    },
    // 不良缺陷详情
    {
      path: '/inspection-manage/qms-product-inspection/defect/detail',
      component: () => import('@/views/quality_management/processQuality/components/commonPage.vue'),
      name: 'processQualityDetail',
      hidden: true,
      meta: {
        title: '缺陷定义详情'
      }
    },
    // 缺陷类型定义
    {
      path: '/inspection-manage/qms-product-inspection/defect/defectTypeDefine',
      hidden: true,
      component: () => import('@/views/quality_management/processQuality/components/BadTypeDefine.vue'),
      name: 'badTypeDefine',
      meta: {
        title: '缺陷类型管理'
      }
    },
    // 缺陷原因
    {
      path: '/inspection-manage/qms-product-inspection/defectReason',
      component: () => import('@/views/quality_management/defectReason/index.vue'),
      name: 'defectReason',
      meta: {
        title: '缺陷原因'
      }
    },
    // 缺陷原因新增
    {
      path: '/inspection-manage/qms-product-inspection/defectReason/add',
      component: () => import('@/views/quality_management/defectReason/components/commonPage.vue'),
      name: 'defectReasonAdd',
      hidden: true,
      meta: {
        title: '缺陷原因新增'
      }
    },
    // 缺陷原因编辑
    {
      path: '/inspection-manage/qms-product-inspection/defectReason/edit',
      component: () => import('@/views/quality_management/defectReason/components/commonPage.vue'),
      name: 'defectReasonEdit',
      hidden: true,
      meta: {
        title: '缺陷原因编辑'
      }
    },
    // 缺陷原因详情
    {
      path: '/inspection-manage/qms-product-inspection/defectReason/detail',
      component: () => import('@/views/quality_management/defectReason/components/commonPage.vue'),
      name: 'defectReasonDetail',
      hidden: true,
      meta: {
        title: '缺陷原因详情'
      }
    },
    // 缺陷后果
    {
      path: '/inspection-manage/qms-product-inspection/defectResult',
      component: () => import('@/views/quality_management/defectResult/index.vue'),
      name: 'defectResult',
      meta: {
        title: '缺陷后果'
      }
    },
    // 缺陷后果新增
    {
      path: '/inspection-manage/qms-product-inspection/defectResult/add',
      component: () => import('@/views/quality_management/defectResult/components/commonPage.vue'),
      name: 'defectResultAdd',
      hidden: true,
      meta: {
        title: '缺陷后果新增'
      }
    },
    // 缺陷后果编辑
    {
      path: '/inspection-manage/qms-product-inspection/defectResult/edit',
      component: () => import('@/views/quality_management/defectResult/components/commonPage.vue'),
      name: 'defectResultEdit',
      hidden: true,
      meta: {
        title: '缺陷后果编辑'
      }
    },
    // 缺陷后果详情
    {
      path: '/inspection-manage/qms-product-inspection/defectResult/detail',
      component: () => import('@/views/quality_management/defectResult/components/commonPage.vue'),
      name: 'defectResultDetail',
      hidden: true,
      meta: {
        title: '缺陷后果详情'
      }
    },
    // 质量看板-缺陷分析
    {
      path: '/inspection-manage/qms-product-inspection/productionQualityReport',
      component: () => import('@/views/quality_management/qualityReport/index.vue'),
      name: 'qualityReport',
      meta: {
        title: '质量看板'
      }
    }
  ]
}
