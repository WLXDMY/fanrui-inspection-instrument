/*
 * @Author: shunhua.liang
 * @Date: 2021-12-21 16:01:36
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-06-05 11:35:29
 * @Description:
 */
// 质量管理
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
    // {
    //   path:
    //     '/inspection-manage/processQuality/qualityDefinition',
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityDefinition/index.vue'
    //     ),
    //   name: 'qualityDefinition',
    //   meta: {
    //     title: '不良定义'
    //   }
    // },
    // {
    //   path: '/inspection-manage/processQuality',
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityRecord/index.vue'
    //     ),
    //   name: 'qualityRecord',
    //   meta: {
    //     title: '工位检验'
    //   }
    // },
    // {
    //   path: '/inspection-manage/qualityReport',
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/qualityReport/index.vue'
    //     ),

    //   name: 'qualityReport',
    //   meta: {
    //     title: '质量报表'
    //   }
    // },
    // {
    //   path: '/inspection-manage/processQuality/paln',
    //   component: () =>
    //     import('@/views/inspection-manage/processQuality/qualityPlan/index.vue'),
    //   name: 'productInspectionPlan',
    //   meta: {
    //     title: '工位检验方案'
    //   }
    // },
    // {
    //   path: '/inspection-manage/reworkQuality/define',
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainDefinition/index.vue'
    //     ),
    //   name: 'qualityDefinition',
    //   meta: {
    //     title: '检验返工定义'
    //   }
    // },
    // {
    //   path: '/inspection-manage/reworkQuality',
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainRecord/index.vue'
    //     ),
    //   name: 'reworkQuality',
    //   meta: {
    //     title: '检验返工'
    //   }
    // },
    // {
    //   path: '/inspection-manage/reworkQuality/feedback',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainRecord/components/feedback.vue'
    //     ),
    //   name: 'feedback',
    //   meta: {
    //     title: '来料反馈'
    //   }
    // },
    // {
    //   path: '/inspection-manage/reworkQuality/plan/project',
    //   component: () =>
    //     import('@/views/inspection-manage/reworkQuality/maintainPlan/index.vue'),
    //   name: 'qualityDefinition',
    //   meta: {
    //     title: '检验返工方案'
    //   }
    // },
    // {
    //   path:
    //     '/inspection-manage/reworkQuality/maintainDefinition/maintainTypeDefine',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainDefinition/components/MaintenanceTypeDefine.vue'
    //     ),
    //   name: 'maintenanceTypeDefine',
    //   meta: {
    //     title: '维修类型定义'
    //   }
    // },
    // {
    //   path:
    //     '/inspection-manage/reworkQuality/maintainDefinition/defineFaultType',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainDefinition/components/defineFaultType.vue'
    //     ),
    //   name: 'defineFaultType',
    //   meta: {
    //     title: '故障类型定义'
    //   }
    // },
    {
      path: '/inspection-manage/productInspection/define',
      component: () => import('@/views/inspection-manage/productInspection/projectTeamDefine/index.vue'),
      name: 'productInspectionProjectTeamDefine',
      hidden: true,
      meta: {
        title: '产品检验项目组定义'
      }
    },
    {
      path: '/inspection-manage/productInspection/projectgroup',
      component: () => import('@/views/inspection-manage/productInspection/checkProjectGroup/index.vue'),
      name: 'qualityDefinitionGroup',
      meta: {
        title: '产品检验项目组'
      }
    },
    {
      path: '/inspection-manage/productInspection/project',
      component: () => import('@/views/inspection-manage/productInspection/checkProject/index.vue'),
      name: 'qualityDefinition',
      meta: {
        title: '产品检验项目'
      }
    },
    // 产品抽样检验标准
    {
      path: '/inspection-manage/testingStandards',
      component: () => import('@/views/inspection-manage/productInspection/testingStandards/index.vue'),
      name: 'testingStandards',
      meta: {
        title: '产品抽样检验标准'
      }
    },
    // 产品抽样检验标准新增
    {
      path: '/inspection-manage/testingStandards/add',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/testingStandards/add.vue'),
      name: 'testingStandardsAdd',
      meta: {
        title: '产品抽样检验标准新增'
      }
    },
    // 产品抽样检验标准编辑
    {
      path: '/inspection-manage/testingStandards/edit',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/testingStandards/edit.vue'),
      name: 'testingStandardsEdit',
      meta: {
        title: '产品抽样检验标准编辑'
      }
    },
    // 产品抽样检验标准详情
    {
      path: '/inspection-manage/testingStandards/detail',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/testingStandards/detail.vue'),
      name: 'testingStandardsDetail',
      meta: {
        title: '产品抽样检验标准详情'
      }
    },
    {
      path: '/inspection-manage/productInspection/plan',
      component: () => import('@/views/inspection-manage/productInspection/checkPlanHomePage/index.vue'),
      name: 'qualityDefinition',
      meta: {
        title: '产品检验方案'
      }
    },
    {
      path: '/inspection-manage/productInspection/template',
      component: () => import('@/views/inspection-manage/productInspection/checkTemplateHomePage/index.vue'),
      name: 'qualityDefinitionTemplate',
      meta: {
        title: '产品检验方案模板'
      }
    },
    // 检验方案模板新增
    {
      path: '/inspection-manage/checktemplate/add',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkTemplate/components/add.vue'),
      name: 'addCheckTemplate',
      meta: {
        title: '检验方案模板新增'
      }
    },
    // 检验方案模板编辑
    {
      path: '/inspection-manage/checktemplate/edit',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkTemplate/components/edit.vue'),
      name: 'editCheckTemplate',
      meta: {
        title: '检验方案模板编辑'
      }
    },
    // 检验方案模板详情
    {
      path: '/inspection-manage/checktemplate/detail',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkTemplate/components/detail.vue'),
      name: 'detailCheckTemplate',
      meta: {
        title: '检验方案模板详情'
      }
    },
    {
      path: '/inspection-manage/checktemplate/copy-template',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkTemplate/components/add.vue'),
      name: 'copyCheckTemplate',
      meta: {
        title: '检验方案模板复制'
      }
    },
    {
      path: '/inspection-manage/checktemplate/approval-template',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkTemplate/components/approval.vue'),
      name: 'approvalCheckTemplate',
      meta: {
        title: '检验方案模板审批'
      }
    },
    /* {
      path: '/inspection-manage/productInspection/checkConfig',
      component: () =>
        import(
          '@/views/inspection-manage/productInspection/checkConfig/index.vue'
          ),
      name: 'checkConfig',
      meta: {
        title: '检验配置'
      }
    },*/
    // 检验结果定义
    {
      path: '/inspection-manage/result-definition/index',
      component: () => import('@/views/inspection-manage/definition-result/index.vue'),
      name: 'definitionResultQuality',
      hidden: true,
      meta: {
        title: '检验结果定义'
      }
    },
    // -----------------------检验报告路由---------------------------
    {
      path: '/inspection-manage/examiningReport/detail',
      component: () => import('@/views/inspection-manage/productInspection/examiningReport/components/detail.vue'),
      name: 'examiningReportDetail',
      hidden: true,
      meta: {
        title: '检验报告详情'
      }
    },
    // 检验报告编辑
    {
      path: '/inspection-manage/examiningReport/edit',
      component: () => import('@/views/inspection-manage/productInspection/examiningReport/components/edit.vue'),
      name: 'examiningReportEdit',
      hidden: true,
      meta: {
        title: '检验报告编辑'
      }
    },
    // 报告预览
    {
      path: '/inspection-manage/examiningReport/previewReport',
      component: () =>
        import('@/views/inspection-manage/productInspection/examiningReport/components/previewReport.vue'),
      name: 'examiningReportPreview',
      hidden: true,
      meta: {
        title: '检验报告预览'
      }
    },
    // 审批预览
    {
      path: '/inspection-manage/examiningReport/components/previewReport',
      component: () =>
        import('@/views/inspection-manage/productInspection/examiningReport/components/previewReport.vue'),
      name: 'examiningReportApprovalPreview',
      hidden: true,
      meta: {
        title: '审批预览'
      }
    },
    {
      path: '/inspection-manage/productInspection',
      component: () => import('@/views/inspection-manage/productInspection/checkPlan/index.vue'),
      name: 'productInspection',
      meta: {
        title: '产品检验'
      }
    },
    {
      path: '/inspection-manage/qualityReport/detail:id',
      hidden: true,
      component: () => import('@/views/inspection-manage/processQuality/qualityReport/components/detail.vue'),
      name: 'qualityReportDetails',
      meta: {
        title: '工位检验报表详情'
      }
    },
    // // 新增检验方案
    // {
    //   path:
    //     '/inspection-manage/processQuality/qualityPlan/add/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityPlan/components/add.vue'
    //     ),
    //   name: 'addQualityPlan',
    //   meta: {
    //     title: '工位检验方案新增'
    //   }
    // },
    // // 检验方案编辑
    // {
    //   path:
    //     '/inspection-manage/processQuality/qualityPlan/edit/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityPlan/components/edit.vue'
    //     ),
    //   name: 'QualityPlanEdit',
    //   meta: {
    //     title: '工位检验方案编辑'
    //   }
    // },
    // // 检验方案详情
    // {
    //   path:
    //     '/inspection-manage/processQuality/qualityPlan/detail/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityPlan/components/detail.vue'
    //     ),
    //   name: 'QualityPlanDetail',
    //   meta: {
    //     title: '工位检验方案详情'
    //   }
    // },
    // // ------------------------------------------------2 不良定义 ----------------------------------------------------
    // // 新增不良定义
    // {
    //   path:
    //     '/inspection-manage/processQuality/qualityDefinition/add',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityDefinition/components/add.vue'
    //     ),
    //   name: 'addQualityDefinition',
    //   meta: {
    //     title: '不良定义新增'
    //   }
    // },
    // // 不良定义详情
    // {
    //   path:
    //     '/inspection-manage/processQuality/qualityDefinition/detail',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityDefinition/components/detail.vue'
    //     ),
    //   name: 'qualityDefinitionDetail',
    //   meta: {
    //     title: '不良定义详情'
    //   }
    // },
    // // 不良定义导入
    // {
    //   path:
    //     '/inspection-manage/processQuality/qualityDefinition/importPage',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityDefinition/components/importPage.vue'
    //     ),
    //   name: 'qualityDefinitionImport',
    //   meta: {
    //     title: '不良定义导入'
    //   }
    // },
    // // 不良定义编辑
    // {
    //   path:
    //     '/inspection-manage/processQuality/qualityDefinition/edit',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityDefinition/components/edit.vue'
    //     ),
    //   name: 'qualityDefinitionEdit',
    //   meta: {
    //     title: '不良定义编辑'
    //   }
    // },
    // // 1.5不良定义 不良类型定义
    // {
    //   path:
    //     '/inspection-manage/processQuality/qualityDefinition/badTypeDefine',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityDefinition/components/BadTypeDefine.vue'
    //     ),
    //   name: 'qualityDefinitionBadTypeDefine',
    //   meta: {
    //     title: '不良类型定义'
    //   }
    // },
    // // 3.检验记录
    // {
    //   path: '/inspection-manage/processQuality/qualityRecord',
    //   // component: () => import( '@/views/inspection-manage/qualityRecord/index.vue' ),
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/processQuality/qualityRecord/index.vue'
    //     ),
    //   name: 'productionLineManagement',
    //   meta: {
    //     title: '检验记录'
    //   }
    // },
    // // 维修方案详情
    // {
    //   path:
    //     '/inspection-manage/reworkQuality/maintainPlan/detail/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainPlan/components/detail.vue'
    //     ),
    //   name: 'maintainPlanDetail',
    //   meta: {
    //     title: '检验返工方案详情'
    //   }
    // },
    // // 维修方案编辑
    // {
    //   path:
    //     '/inspection-manage/reworkQuality/maintainPlan/edit/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainPlan/components/edit.vue'
    //     ),
    //   name: 'maintainPlanEdit',
    //   meta: {
    //     title: '检验返工方案编辑'
    //   }
    // },
    // // 新增维修方案
    // {
    //   path:
    //     '/inspection-manage/reworkQuality/maintainPlan/add/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainPlan/components/add.vue'
    //     ),
    //   name: 'addMaintainPlan',
    //   meta: {
    //     title: '检验返工方案新增'
    //   }
    // },
    // // 新增维修定义
    // {
    //   path:
    //     '/inspection-manage/reworkQuality/maintainDefinition/add/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainDefinition/components/add.vue'
    //     ),
    //   name: 'addMaintainDefinition',
    //   meta: {
    //     title: '检验返工定义新增'
    //   }
    // },
    // // 维修定义详情
    // {
    //   path:
    //     '/inspection-manage/reworkQuality/maintainDefinition/detail/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainDefinition/components/detail.vue'
    //     ),
    //   name: 'detailMaintainDefinition',
    //   meta: {
    //     title: '检验返工定义详情'
    //   }
    // },
    // // 维修定义编辑
    // {
    //   path:
    //     '/inspection-manage/reworkQuality/maintainDefinition/edit/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainDefinition/components/edit.vue'
    //     ),
    //   name: 'editMaintainDefinition',
    //   meta: {
    //     title: '检验返工定义编辑'
    //   }
    // },
    // // 维修定义导入页面
    // {
    //   path:
    //     '/inspection-manage/reworkQuality/maintainDefinition/importPage/:activeName',
    //   hidden: true,
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/reworkQuality/maintainDefinition/components/importPage.vue'
    //     ),
    //   name: 'importPageMaintainDefinition',
    //   meta: {
    //     title: '检验返工定义导入'
    //   }
    // },
    {
      path: '/inspection-manage/productInspection/import/preview',
      component: () => import('@/views/inspection-manage/productInspection/checkProject/components/importPage.vue'),
      name: 'productInspectionImportView',
      hidden: true,
      meta: {
        title: '导入'
      }
    },
    // 检验结果编辑路由
    {
      path: '/inspection-manage/check/add',
      component: () => import('@/views/inspection-manage/productInspection/checkResult/components/edit.vue'),
      name: 'qualitiesCheckAdd',
      hidden: true,
      meta: {
        title: '检验结果编辑'
      }
    },
    // 检验结果详情路由
    {
      path: '/inspection-manage/check/detail',
      component: () => import('@/views/inspection-manage/productInspection/checkResult/components/detail.vue'),
      name: 'qualitiesCheckDetail',
      hidden: true,
      meta: {
        title: '检验结果详情'
      }
    },
    {
      path: '/inspection-manage/check/approval',
      component: () => import('@/views/inspection-manage/productInspection/checkResult/components/approval.vue'),
      name: 'qualitiesCheckDetail',
      hidden: true,
      meta: {
        title: '检验结果审批'
      }
    },
    // 检验项目新增
    {
      path: '/inspection-manage/check/project/add',
      component: () => import('@/views/inspection-manage/productInspection/checkProject/components/add.vue'),
      name: 'qualitiesCheckProjectAdd',
      hidden: true,
      meta: {
        title: '检验项目新增'
      }
    },
    // 检验项目详情
    {
      path: '/inspection-manage/check/project/detail',
      component: () => import('@/views/inspection-manage/productInspection/checkProject/components/detail.vue'),
      name: 'qualitiesCheckProjectDetail',
      hidden: true,
      meta: {
        title: '检验项目详情'
      }
    },
    // 检验项目编辑
    {
      path: '/inspection-manage/check/project/edit',
      component: () => import('@/views/inspection-manage/productInspection/checkProject/components/edit.vue'),
      name: 'qualitiesCheckProjectEdit',
      hidden: true,
      meta: {
        title: '检验项目编辑'
      }
    },
    // 审批
    {
      path: '/inspection-manage/check/project/approval',
      component: () => import('@/views/inspection-manage/productInspection/checkProject/components/approval.vue'),
      name: 'qualitiesCheckProjectApproval',
      hidden: true,
      meta: {
        title: '检验项目审批'
      }
    },
    // 检验项目复制
    {
      path: '/inspection-manage/check/project/duplication',
      component: () => import('@/views/inspection-manage/productInspection/checkProject/components/duplication.vue'),
      name: 'qualitiesCheckProjectDuplication',
      hidden: true,
      meta: {
        title: '检验项目复制'
      }
    },
    // 检验方案新增
    {
      path: '/inspection-manage/checkPlan/add',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkPlan/components/add.vue'),
      name: 'addCheckPlan',
      meta: {
        title: '检验方案新增'
      }
    },
    // 检验方案复制
    {
      path: '/checkPlan/add',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkPlan/components/add.vue'),
      name: 'copyCheckPlan',
      meta: {
        title: '检验方案复制'
      }
    },
    // 检验方案审批
    {
      path: '/inspection-manage/checkPlan/approval',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkPlan/components/approval.vue'),
      name: 'approvalCheckPlan',
      meta: {
        title: '检验方案审批'
      }
    },

    // 编辑
    {
      path: '/inspection-manage/checkPlan/edit',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkPlan/components/edit.vue'),
      name: 'editCheckPlan',
      meta: {
        title: '检验方案编辑'
      }
    },
    // 检验方案详情
    {
      path: '/inspection-manage/checkPlan/detail',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkPlan/components/detail.vue'),
      name: 'detailCheckPlan',
      meta: {
        title: '检验方案详情'
      }
    },
    // 项目组定义详情
    {
      // path: '/inspection-manage/productInspection/projectTeamDefine/detail/:activeName',
      path: '/inspection-manage/teamDefine/detail',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/projectTeamDefine/components/detail.vue'),
      name: 'projectTeamDefineDetail',
      meta: {
        title: '项目组定义详情'
      }
    },
    // 送检单新增
    {
      path: '/inspection-manage/checkSheet/add',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkSheet/components/add.vue'),
      name: 'checkSheetAdd',
      meta: {
        title: '送检单新增'
      }
    },
    // 送检单编辑
    {
      path: '/inspection-manage/checkSheet/edit',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkSheet/components/edit.vue'),
      name: 'checkSheetEdit',
      meta: {
        title: '送检单编辑'
      }
    },
    // 送检单详情页面
    {
      path: '/inspection-manage/checkSheet/detail',
      hidden: true,
      component: () => import('@/views/inspection-manage/productInspection/checkSheet/components/detail.vue'),
      name: 'checkSheetDetail',
      meta: {
        title: '送检单详情'
      }
    }
    // 检验报告
    // -----------------------检验报告路由---------------------------
    // {
    //   path: '/inspection-manage/examiningReport/detail',
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/productInspection/examiningReport/components/detail.vue'
    //     ),
    //   name: 'examiningReportDetail',
    //   hidden: true,
    //   meta: {
    //     title: '检验报告详情'
    //   }
    // },
    // 检验报告编辑
    // {
    //   path: '/inspection-manage/examiningReport/edit',
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/productInspection/examiningReport/components/edit.vue'
    //     ),
    //   name: 'examiningReportEdit',
    //   hidden: true,
    //   meta: {
    //     title: '检验报告编辑'
    //   }
    // },
    // 报告预览
    // {
    //   path: '/inspection-manage/examiningReport/previewReport',
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/productInspection/examiningReport/components/previewReport.vue'
    //     ),
    //   name: 'examiningReportPreview',
    //   hidden: true,
    //   meta: {
    //     title: '检验报告预览'
    //   }
    // },
    // 审批预览
    // {
    //   path: '/inspection-manage/examiningReport/components/previewReport',
    //   component: () =>
    //     import(
    //       '@/views/inspection-manage/productInspection/examiningReport/components/previewReport.vue'
    //     ),
    //   name: 'examiningReportApprovalPreview',
    //   hidden: true,
    //   meta: {
    //     title: '审批预览'
    //   }
    // }
  ]
}
