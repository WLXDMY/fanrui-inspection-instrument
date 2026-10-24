import Layout from '@/views/layout'

export default [
  // 工厂建模
  {
    path: '/factory-model',
    component: Layout,
    name: '工厂建模',
    meta: {
      title: '工厂建模',
      icon: 'menu_factory_model'
    },
    children: [
      {
        path: '/factory-model/companyInfo/index',
        component: () => import('@/views/factory-model/companyInfo/index'),
        name: '公司信息',
        meta: {
          title: '公司信息'
        }
      },

      {
        path: '/factory-model/product-model/index',
        component: () => import('@/views/product-model/index'),
        name: 'productModelList',
        meta: {
          title: '工厂模型'
        }
      },
      {
        path: '/factory-model/factory-area',
        component: () => import('@/views/factory-model/factory-area/index'),
        name: '厂区',
        meta: {
          title: '厂区'
        }
      },
      {
        path: '/factory-model/factory-area/detail/:id',
        hidden: true,
        component: () =>
          import('@/views/factory-model/factory-area/components/detail'),
        name: 'factoryAreaDetail',
        meta: {
          title: '厂区详情',
          activeMenu: '/factory-model/factory-area'
        }
      },
      {
        path: '/factory-model/factory-area/edit/:id',
        hidden: true,
        component: () =>
          import('@/views/factory-model/factory-area/components/edit'),
        name: 'factoryAreaEdit',
        meta: {
          title: '编辑厂区',
          activeMenu: '/factory-model/factory-area'
        }
      },
      {
        path: '/factory-model/workshop',
        component: () => import('@/views/factory-model/workshop/index'),
        name: '车间',
        meta: {
          title: '车间'
        }
      },
      {
        path: '/factory-model/workshop/detail/:id',
        hidden: true,
        component: () =>
          import('@/views/factory-model/workshop/components/detail'),
        name: 'workshopDetails',
        meta: {
          title: '车间详情',
          activeMenu: '/factory-model/workshop'
        }
      },
      {
        path: '/factory-model/workshop/edit/:id',
        hidden: true,
        component: () =>
          import('@/views/factory-model/workshop/components/edit'),
        name: 'workshopEdit',
        meta: {
          title: '编辑车间',
          activeMenu: '/factory-model/workshop'
        }
      },
      {
        path: '/factory-model/work-center',
        component: () => import('@/views/factory-model/work-center/index'),
        name: 'workCenter',
        meta: {
          title: '工作中心'
        }
      },
      {
        path: '/factory-model/work-center/detail/:id',
        hidden: true,
        component: () =>
          import('@/views/factory-model/work-center/components/detail'),
        name: 'workCenterDetail',
        meta: {
          title: '工作中心详情',
          activeMenu: '/factory-model/work-center'
        }
      },
      {
        path: '/factory-model/work-center/edit/:id',
        hidden: true,
        component: () =>
          import('@/views/factory-model/work-center/components/edit'),
        name: 'workCenterEdit',
        meta: {
          title: '编辑工作中心',
          activeMenu: '/factory-model/work-center'
        }
      },
      {
        path: '/factory-model/work-center/add',
        hidden: true,
        component: () =>
          import('@/views/factory-model/work-center/components/add'),
        name: 'workCenterAdd',
        meta: {
          title: '新增工作中心',
          activeMenu: '/factory-model/work-center'
        }
      },
      {
        path: '/factory-model/product-line',
        component: () => import('@/views/factory-model/product-line/index'),
        name: '制造单元',
        meta: {
          title: '制造单元'
        }
      },
      {
        path: '/factory-model/product-line/detail/:id/:modelId',
        hidden: true,
        component: () =>
          import('@/views/factory-model/product-line/components/detail'),
        name: 'productLineDetail',
        meta: {
          title: '制造单元详情',
          activeMenu: '/factory-model/product-line'
        }
      },
      {
        path: '/factory-model/product-line/edit/:id',
        hidden: true,
        component: () =>
          import('@/views/factory-model/product-line/components/edit'),
        name: 'productLineEdit',
        meta: {
          title: '制造单元编辑',
          activeMenu: '/factory-model/product-line'
        }
      },
      {
        path: '/factory-model/station',
        component: () => import('@/views/factory-model/station/index'),
        name: '工位',
        meta: {
          title: '工位'
        }
      },
      {
        path: '/factory-model/station/details/:id/:modelId',
        component: () =>
          import('@/views/factory-model/station/components/details'),
        name: 'stationDetail',
        meta: {
          title: '工位详情',
          activeMenu: '/factory-model/station'
        },
        hidden: true
      },
      {
        path: '/factory-model/station/editbox/:id',
        component: () =>
          import('@/views/factory-model/station/components/editbox'),
        name: 'stationEdit',
        meta: {
          title: '工位编辑',
          activeMenu: '/factory-model/station'
        },
        hidden: true
      },
      {
        path: '/factory-model/team',
        component: () => import('@/views/factory-model/team/index'),
        name: 'team',
        meta: {
          title: '班组'
        }
      }
    ]
  },
  // 生产配置
  {
    path: '/production-config',
    component: Layout,
    name: '',
    meta: {
      title: '生产配置',
      icon: 'menu_production_config'
    },
    children: [
      // 工作日历
      {
        path: '/production-config/workCalendar/worksCalendar',
        component: () =>
          import('@/views/production-config/worksCalendar/index'),
        name: 'worksCalendar',
        meta: {
          title: '工作日历'
        }
      },

      {
        path: '/production-config/workCalendar/worksCalendar/edit/:id',
        component: () =>
          import('@/views/production-config/worksCalendar/components/edit'),
        name: 'worksCalendarEdit',
        meta: {
          title: '工作日历编辑'
        },
        hidden: true
      },
      {
        path: '/production-config/workCalendar/worksCalendar/shiftTotal',
        component: () =>
          import(
            '@/views/production-config/worksCalendar/components/shiftTotal'
          ),
        name: 'worksCalendarShiftTotal',
        meta: {
          title: '班次汇总'
        },
        hidden: true
      },
      // 班次配置
      {
        path: '/production-config/flight-config',
        component: () =>
          import('@/views/production-config/flight-config/index'),
        name: 'flightConfig',
        meta: {
          title: '班次配置'
        }
      },
      // 首班时间配置
      {
        path: '/production-config/firstShiftTimeConfig',
        component: () =>
          import('@/views/production-config/firstShiftTimeConfig/index'),
        name: 'firstShiftTimeConfig',
        meta: {
          title: '首班时间配置'
        }
      },
      // 产能列表
      {
        path: '/production-config/capacityList',
        component: () => import('@/views/production-config/capacityList/index'),
        name: 'capacityList',
        meta: {
          title: '产能列表'
        }
      },
      {
        path: '/production-config/capacityList/importPage',
        component: () =>
          import(
            '@/views/production-config/capacityList/components/importPage.vue'
          ),
        name: 'capacityListImport',
        meta: {
          title: '产能列表导入'
        },
        hidden: true
      }
    ]
  },
  // 指标
  /* {
    path: '/target',
    component: Layout,
    meta: {
      title: '工厂指标',
      icon: 'menu_factory_target'
    },
    children: [
      {
        path: '/target/factoryTarget',
        component: () => import('@/views/target/factoryTarget/index'),
        name: 'targetList',
        meta: {
          title: '工厂指标'
        }
      },
      {
        path: '/target/synthesizeTarget',
        component: () => import('@/views/target/synthesizeTarget/index'),
        name: 'synthesizeTarget',
        meta: {
          title: '综合指标'
        }
      }
    ]
  },*/
  // 设备信息
  /* {
    path: '/equipment',
    component: Layout,
    // redirect: '/equipment/device',
    name: '',
    meta: {
      title: '设备信息',
      icon: 'menu_device_info'
    },
    children: [
      {
        path: '/equipment/device',
        component: () => import('@/views/equipment/device/index'),
        name: 'device',
        meta: {
          title: '生产设备'
        }
      },
      {
        path: '/equipment/device/detail/:deviceId/:modelId/:typeCode',
        hidden: true,
        component: () => import('@/views/equipment/device/components/detail'),
        name: 'deviceDetail',
        meta: {
          title: '生产设备详情'
        }
      },
      {
        path: '/equipment/device/edit/:deviceId/:modelId',
        hidden: true,
        component: () => import('@/views/equipment/device/components/edit'),
        name: 'deviceEdit',
        meta: {
          title: '生产设备编辑'
        }
      },
      {
        path: '/equipment/device/information/:id/:deviceId/:modelId',
        hidden: true,
        component: () =>
          import('@/views/equipment/device/components/fault-alarm-detail'),
        name: 'deviceDetailInfo',
        meta: {
          title: '告警详情'
        }
      },
      {
        path: '/equipment/device-contrast',
        hidden: true,
        component: () =>
          import('@/views/equipment/device/device-contrast/index.vue'),
        name: 'deviceContrast',
        meta: {
          title: '生产设备分类对比'
        }
      },
      {
        path: '/equipment/test-equipment',
        component: () => import('@/views/equipment/test-equipment/index'),
        name: '采集设备',
        meta: {
          title: '采集设备'
        }
      },
      {
        path: '/equipment/test-equipment/details/:id',
        hidden: true,
        component: () =>
          import('@/views/equipment/test-equipment/components/details'),
        name: 'collectionDetail',
        meta: {
          title: '采集设备详情'
        }
      },
      {
        path: '/equipment/test-equipment/edit/:id',
        hidden: true,
        component: () =>
          import('@/views/equipment/test-equipment/components/edit'),
        name: 'collectionEdit',
        meta: {
          title: '采集设备编辑'
        }
      },
      {
        path: '/equipment/test-equipment/setup/:id',
        hidden: true,
        component: () =>
          import('@/views/equipment/test-equipment/components/setup'),
        name: 'devicesetup',
        meta: {
          title: '采集设备设置'
        }
      },
      {
        path: '/equipment/station-machine',
        component: () => import('@/views/equipment/station-machine/index'),
        name: '终端设备',
        meta: {
          title: '终端设备'
        }
      },
      {
        path: '/equipment/video-device',
        component: () => import('@/views/equipment/video-device/index'),
        name: '视频设备',
        meta: {
          title: '视频设备'
        }
      },
      {
        path: '/equipment/video-device/palyer',
        hidden: true,
        component: () =>
          import('@/views/equipment/video-device/components/player'),
        name: '视频播放',
        meta: {
          title: '视频播放'
        }
      },
      {
        path: '/equipment/station-machine/edit',
        hidden: true,
        component: () =>
          import('@/views/equipment/station-machine/components/edit'),
        name: 'stationMachineEdit1',
        meta: {
          title: '采集设备编辑'
        }
      },
      {
        path: '/equipment/station-machine/detail/:data',
        hidden: true,
        component: () =>
          import('@/views/equipment/station-machine/components/detail'),
        name: 'stationMachineDetail',
        meta: {
          title: '采集设备详情'
        }
      },
      // 工艺装备
      {
        path: '/equipment/technology-device',
        component: () => import('@/views/equipment/technology-device/index'),
        name: 'technologyDevice',
        meta: { title: '工艺装备' }
      },
      {
        path: '/equipment/technology-device-type',
        hidden: true,
        component: () =>
          import(
            '@/views/equipment/technology-device/components/technology-device-type'
          ),
        name: 'technologyDeviceType',
        meta: {
          title: '工装类型'
        }
      },

      // 大屏管理(旧)
      /!*{
        path: '/equipment/screen-management-old',
        component: () => import('@/views/screen-management/index'),
        name: 'screenManagement',
        meta: { title: '大屏管理(旧)', affix: true }
      },
      {
        path: '/screen-management/add',
        // component: () =>
        //   import('@/views/screen-management/components/add.vue'),
        component: () =>
          import('@/views/screen-management/components/line-add.vue'),
        name: 'addScreenManagement',
        hidden: true,
        meta: {
          title: '新增'
        }
      },
      {
        path: '/screen-management/edit',
        component: () =>
          import('@/views/screen-management/components/edit.vue'),
        name: 'editScreenManagement',
        hidden: true,
        meta: {
          title: '编辑'
        }
      },
      // 大屏管理(新)
      {
        path: '/equipment/screen-management',
        component: () => import('@/views/screen-management-new/index.vue'),
        name: 'ScreenManage',
        meta: { title: '大屏管理', affix: true }
      },
      {
        path: '/screen-management-new/add',
        // component: () =>
        component: () => import('@/views/screen-management-new/screenAdd.vue'),
        name: 'screenAdd',
        hidden: true,
        meta: {
          title: '新增'
        }
      },
      {
        path: '/screen-management-new/importTemplate',
        component: () =>
          import('@/views/screen-management-new/importTemplate.vue'),
        name: 'importTemplate',
        hidden: true,
        meta: {
          title: '导入模板'
        }
      },
      {
        path: '/screen-management-new/edit',
        component: () => import('@/views/screen-management-new/screenEdit.vue'),
        name: 'screenEdit',
        hidden: true,
        meta: {
          title: '编辑'
        }
      },*!/

      // 设备类型
      {
        path: '/equipment/equipment-model',
        component: () => import('@/views/equipment/equipment-model/index.vue'),
        name: 'equipmentModel',
        meta: { title: '设备类型' }
      },
      {
        path: '/equipment/equipment-model/detail/:id',
        hidden: true,
        component: () =>
          import('@/views/equipment/equipment-model/components/detail'),
        name: 'equipmentModelDetail',
        meta: { title: '设备类型详情' }
      },
      // 设备维修
      {
        path: '/equipment/warranty',
        component: () => import('@/views/equipment/equipment-warranty/index'),
        name: 'equipmentWarranty',
        meta: {
          title: '设备维修'
        }
      },
      // 设备保修-生产工单保修单
      {
        path: '/equipment/order/add/:activeName',
        hidden: true,
        component: () =>
          import('@/views/equipment/equipment-warranty/maintenance-order/add'),
        name: 'maintenanceOrderAdd',
        meta: {
          title: '维修工单新增'
        }
      },

      {
        path: '/equipment/order/detail/:id/:activeName',
        hidden: true,
        component: () =>
          import(
            '@/views/equipment/equipment-warranty/maintenance-order/detail'
          ),
        name: 'maintenanceOrderDetail',
        meta: {
          title: '维修工单详情'
        }
      },
      {
        path: '/equipment/order/edit/:id/:activeName',
        hidden: true,
        component: () =>
          import('@/views/equipment/equipment-warranty/maintenance-order/edit'),
        name: 'maintenanceOrderEdit',
        meta: {
          title: '维修工单编辑'
        }
      }
      // // 设备保修-记录单保修单
      // {
      //   path: '/equipment/record/add/:activeName',
      //   hidden: true,
      //   component: () =>
      //     import('@/views/equipment/equipment-warranty/maintenance-record/add'),
      //   name: 'maintenanceRecordAdd',
      //   meta: {
      //     title: '维修记录单新增'
      //   }
      // },
      // {
      //   path: '/equipment/record/detail/:id/:activeName',
      //   hidden: true,
      //   component: () =>
      //     import(
      //       '@/views/equipment/equipment-warranty/maintenance-record/detail'
      //     ),
      //   name: 'maintenanceRecordDetail',
      //   meta: {
      //     title: '维修记录单详情'
      //   }
      // },
      // {
      //   path: '/equipment/record/edit/:id/:activeName',
      //   hidden: true,
      //   component: () =>
      //     import(
      //       '@/views/equipment/equipment-warranty/maintenance-record/edit'
      //     ),
      //   name: 'maintenanceRecordEdit',
      //   meta: {
      //     title: '维修记录单编辑'
      //   }
      // }
    ]
  },*/
  // 配送配置
  /* {
    path: '/avg/dispath',
    component: Layout,
    name: '配送配置',
    meta: {
      title: '配送配置',
      icon: 'menu_distribution_configuration'
    },
    children: [
      {
        path: '/avg/dispath/index',
        component: () => import('@/views/configuration-location/index'),
        name: 'configurationLocation',
        meta: {
          title: '点位配置'
        }
      },
      {
        path: '/avg/point/list',
        component: () => import('@/views/point-list/index.vue'),
        name: 'agvPointList',
        meta: {
          title: '线路配置'
        }
      },
      {
        path: '/add/path',
        component: () => import('@/views/point-list/components/add-path.vue'),
        meta: {
          title: '新增路线'
        },
        hidden: true
      }
    ]
  },*/
  // 物料配置
  {
    path: '/material-config',
    component: Layout,
    name: '',
    meta: {
      title: '物料配置',
      icon: 'menu_material_config'
    },
    children: [
      // 物料类型配置
      {
        path: '/material-config/material-type-config',
        component: () =>
          import('@/views/material-config/material-type-config/index'),
        name: 'materialConfig',
        meta: {
          title: '物料类型配置'
        }
      },
      // 扩展字段配置
      {
        path: '/material-config/extend-config',
        component: () => import('@/views/material-config/extend-config/index'),
        name: 'extendConfig',
        meta: {
          title: '扩展字段配置'
        }
      },
      // 物料类型新增
      {
        path: '/material-config/material-type-config/add',
        component: () =>
          import('@/views/material-config/material-type-config/add'),
        name: 'materialConfig',
        hidden: true,
        meta: {
          title: '物料类型新增'
        }
      },
      {
        path: '/material-config/material-type-config/edit',
        component: () =>
          import('@/views/material-config/material-type-config/edit'),
        name: 'materialConfig',
        hidden: true,
        meta: {
          title: '物料类型编辑'
        }
      },
      // 单位配置
      {
        path: '/material-config/unit-config',
        component: () => import('@/views/material-config/unit-config/index'),
        name: 'unitConfig',
        meta: {
          title: '单位配置'
        }
      }
    ]
  },
  {
    path: '/label-manage',
    component: Layout,
    name: '标签管理',
    meta: {
      title: '标签管理',
      icon: 'menu_label_management'
    },
    children: [
      {
        path: '/label-manage/labelRules',
        // component: () => import('@/views/label-manage/labelRules.vue'),
        component: () => import('@/views/label-manage/index.vue'),
        name: 'labelManagement',
        meta: {
          title: '标签管理'
        }
      },
      {
        path: '/label-manage/labelRules/list/:codeType',
        component: () =>
          import('@/views/label-manage/components/LabelRuleTable.vue'),
        name: 'labelManagementList',
        hidden: true,
        meta: {
          title: '标签管理'
        }
      },
      {
        path: '/label-manage/labelEdit',
        component: () =>
          import('@/views/label-manage/components/edit/index.vue'),
        name: 'labelEdit',
        hidden: true,
        beforeEnter: (to, from, next) => {
          const { query, meta } = to
          if (query.type === 'add') {
            meta.title = '新增'
          } else if (query.type === 'copy') {
            meta.title = '复制'
          } else {
            meta.title = '编辑'
          }
          next()
        }
      },
      {
        path: '/label-manage/edit/:id',
        component: () => import('@/views/label-manage/components/edit.vue'),
        name: 'editLabelManagement',
        hidden: true,
        meta: {
          title: '编辑'
        }
      },
      {
        path: '/label-manage/addEditTable',
        component: () => import('@/views/label-manage/components/add.vue'),
        name: 'newAddLabelManagement',
        hidden: true,
        meta: {
          title: '新增规则'
        }
      }
    ]
  },
  // 单据配置
  {
    path: '/documents-config',
    component: Layout,
    meta: {
      title: '单据配置',
      icon: 'menu_documents_config'
    },
    children: [
      // 编码规则
      {
        path: '/documents-config/num-rule',
        component: () => import('@/views/documents-config/num-rule/index'),
        name: 'numRule',
        meta: {
          title: '编码规则'
        }
      },
      {
        path: '/documents-config/num-rule/add',
        hidden: true,
        component: () =>
          import('@/views/documents-config/num-rule/components/add.vue'),
        name: 'addNumRule',
        meta: {
          title: '新增编码规则',
          activeMenu: '/documents-config/num-rule'
        }
      },
      {
        path: '/documents-config/num-rule/edit/:id',
        hidden: true,
        component: () =>
          import('@/views/documents-config/num-rule/components/edit.vue'),
        name: 'editNumRule',
        meta: {
          title: '编辑编码规则',
          activeMenu: '/documents-config/num-rule'
        }
      },
      {
        path: '/documents-config/num-rule/detail/:id',
        hidden: true,
        component: () =>
          import('@/views/documents-config/num-rule/components/detail.vue'),
        name: 'detailNumRule',
        meta: {
          title: '编码规则详情',
          activeMenu: '/documents-config/num-rule'
        }
      },
      // 审批配置
      {
        path: '/documents-config/approveConfig',
        component: () => import('@/views/documents-config/approveConfig/index'),
        name: 'approveConfig',
        meta: {
          title: '审批配置'
        }
      },
      // 打印配置
      {
        path: '/documents-config/print-config',
        component: () => import('@/views/documents-config/printConfig/index'),
        name: 'printConfig',
        meta: {
          title: '打印配置'
        }
      },
      // 打印配置新增/编辑
      {
        path: '/documents-config/print-config/edit',
        component: () =>
          import('@/views/documents-config/printConfig/items/edit.vue'),
        name: 'printConfigEdit',
        hidden: true,
        beforeEnter: (to, from, next) => {
          const { params, meta } = to
          if (params.id) {
            meta.title = '编辑打印配置'
          } else {
            meta.title = '新增打印配置'
          }
          next()
        },
        meta: {
          title: '编辑打印配置'
        }
      },
      // 条款管理
      {
        path: '/documents-config/clause',
        component: () => import('@/views/documents-config/clause/index'),
        name: 'clauseIndex',
        meta: {
          title: '条款管理'
        }
      },
      {
        path: '/documents-config/clause/detail/:id',
        hidden: true,
        component: () => import('@/views/documents-config/clause/detail'),
        name: 'clauseDetail',
        meta: {
          title: '条款管理'
        }
      },
      // 出入库类型配置
      {
        path: '/documents-config/inbound-outbound-type-confige',
        component: () =>
          import('@/views/documents-config/inbound-outbound-type-config/index'),
        name: 'inboundOutboundTypeConfig',
        meta: {
          title: '出入库类型配置'
        }
      },
      // 扫码规则
      {
        path: '/documents-config/scan-rule',
        component: () => import('@/views/documents-config/scan-rule/index'),
        name: 'scanRule',
        meta: {
          title: '扫码规则'
        }
      },
      // 解码规则
      {
        path: '/documents-config/decode-rule',
        component: () => import('@/views/documents-config/decode-rule/index'),
        name: 'decodeRule',
        meta: {
          title: '解码规则'
        }
      }
    ]
  },
  // 人员信息
  /* {
    path: '/base-info',
    component: Layout,
    name: '人员信息',
    meta: {
      title: '人员信息',
      icon: 'menu_personnal_info'
    },
    children: [
      {
        path: '/base-info/organization',
        component: () => import('@/views/base-info/organization/index'),
        name: 'organization',
        meta: {
          title: '组织机构'
        }
      },
      {
        path: '/base-info/post-manager',
        component: () => import('@/views/base-info/post-manager/index'),
        name: 'postManager',
        meta: {
          title: '岗位管理'
        }
      },
      {
        path: '/base-info/user',
        component: () => import('@/views/base-info/user/index'),
        name: 'baseInfo-user',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/base-info/user/detail/:id',
        hidden: true,
        component: () => import('@/views/base-info/user/components/detail'),
        name: 'userDetail',
        meta: {
          title: '用户详情',
          activeMenu: '/base-info/user'
        }
      },
      {
        path: '/base-info/user/edit/:id',
        hidden: true,
        component: () => import('@/views/base-info/user/components/edit'),
        name: 'userEdit',
        meta: {
          title: '编辑用户',
          activeMenu: '/base-info/user'
        }
      },
      {
        path: '/base-info/role-permission',
        component: () => import('@/views/base-info/role-permission/index'),
        name: 'rolePermission',
        meta: {
          title: '角色权限'
        }
      },
      {
        path: '/base-info/role-permission/web-permission-maintain/:id',
        hidden: true,
        component: () =>
          import(
            '@/views/base-info/role-permission/components/web-permission-maintain'
          ),
        name: 'webPermissionMaintain',
        meta: {
          title: '电脑端权限维护',
          activeMenu: '/base-info/role-permission'
        }
      },
      {
        path: '/base-info/role-permission/mobile-permission-maintain/:id',
        hidden: true,
        component: () =>
          import(
            '@/views/base-info/role-permission/components/mobile-permission-maintain'
          ),
        name: 'mobilePermissionMaintain',
        meta: {
          title: '移动端权限维护',
          activeMenu: '/base-info/role-permission'
        }
      },
      {
        path: '/base-info/terminal-permission',
        component: () => import('@/views/base-info/terminal-permission/index'),
        name: 'terminalPermission',
        meta: {
          title: '终端权限管理'
        }
      },
      {
        path: '/base-info/terminal-permission/add',
        hidden: true,
        component: () =>
          import('@/views/base-info/terminal-permission/components/add.vue'),
        name: 'terminalPermissioAdd',
        meta: {
          title: '新增终端权限',
          activeMenu: '/base-info/terminal-permission'
        }
      },
      {
        path: '/base-info/terminal-permission/edit/:id',
        hidden: true,
        component: () =>
          import('@/views/base-info/terminal-permission/components/edit.vue'),
        name: 'terminalPermissioEdit',
        meta: {
          title: '编辑终端权限',
          activeMenu: '/base-info/terminal-permission'
        }
      }
    ]
  },*/
  // 系统设置
  {
    path: '/system_settings',
    component: Layout,
    name: '系统设置',
    meta: {
      title: '系统设置',
      icon: 'menu_system_setting'
    },
    children: [
      {
        path: '/system_settings/init-config',
        component: () => import('@/views/system_settings/init-config/index'),
        name: 'initConfig',
        meta: {
          title: '初始化配置'
        }
      },
      {
        path: '/system_settings/chang-system-status',
        component: () =>
          import('@/views/system_settings/chang-system-status/index'),
        name: 'changeSystemStatus',
        meta: {
          title: '系统状态设置'
        }
      },
      {
        path: '/system_settings/DBclear/',
        component: () => import('@/views/system_settings/DBclear/index'),
        name: 'DBclear',
        meta: {
          title: 'DB容量设置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration',
        component: () =>
          import('@/views/system_settings/BusinessConfiguration/index'),
        name: 'BusinessConfiguration',
        meta: {
          title: '业务配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/saleOrderPushDownRoute',
        component: () =>
          import('@/views/system_settings/saleOrderPushDown/index'),
        name: 'saleOrderPushDownRoute',
        hidden: true,
        meta: {
          title: '销售订单下推配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/saleOrderListConfigRoute',
        component: () =>
          import('@/views/system_settings/saleOrderListConfig/index'),
        name: 'saleOrderListConfigRoute',
        hidden: true,
        meta: {
          title: '销售订单列表配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/productOrderPushDownRoute',
        component: () =>
          import('@/views/system_settings/productOrderPushDown/index'),
        name: 'productOrderPushDownRoute',
        hidden: true,
        meta: {
          title: '生产订单下推配置'
        }
      },

      {
        path: '/system_settings/BusinessConfiguration/productOrderListConfigRoute',
        component: () =>
          import('@/views/system_settings/productOrderListConfig/index'),
        name: 'productOrderListConfigRoute',
        hidden: true,
        meta: {
          title: '生产订单列表配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/productOrderStateConfigRoute',
        component: () =>
          import('@/views/system_settings/productOrderStateConfig/index'),
        name: 'productOrderStateConfigRoute',
        hidden: true,
        meta: {
          title: '生产订单状态配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/workordersAssignmentStateConfigRoute',
        component: () =>
          import(
            '@/views/system_settings/workordersAssignmentStateConfig/index'
          ),
        name: 'workordersAssignmentStateConfigRoute',
        hidden: true,
        meta: {
          title: '生产工单派工配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/workerOrderPushDownRoute',
        component: () =>
          import('@/views/system_settings/workerOrderPushDown/index'),
        name: 'workerOrderPushDownRoute',
        hidden: true,
        meta: {
          title: '生产工单下推配置'
        }
      },

      {
        path: '/system_settings/BusinessConfiguration/workOrderReportVerificationRoute',
        component: () =>
          import('@/views/system_settings/workOrderReportVerification/index'),
        name: 'workOrderReportVerificationRoute',
        hidden: true,
        meta: {
          title: '工单报工校验配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/workOrderSupplementaryReportConfigRoute',
        component: () =>
          import(
            '@/views/system_settings/workOrderSupplementaryReportConfig/index'
          ),
        name: 'workOrderSupplementaryReportConfigRoute',
        hidden: true,
        meta: {
          title: '补报功能配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/deliveryApplicationPushDownRoute',
        component: () =>
          import('@/views/system_settings/deliveryApplicationPushDown/index'),
        name: 'deliveryApplicationPushDownRoute',
        hidden: true,
        meta: {
          title: '出货申请单下推配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/procurementReqPushDownRoute',
        component: () =>
          import('@/views/system_settings/procurementReqPushDown/index'),
        name: 'procurementReqPushDownRoute',
        hidden: true,
        meta: {
          title: '采购需求下推配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/procurementOrderPushDownRoute',
        component: () =>
          import('@/views/system_settings/procurementOrderPushDown/index'),
        name: 'procurementOrderPushDownRoute',
        hidden: true,
        meta: {
          title: '采购订单下推配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/outsourcingMaterailOrderPushDown',
        component: () =>
          import(
            '@/views/system_settings/outsourcingMaterailOrderPushDown/index'
          ),
        name: 'outsourcingMaterailOrderPushDownRoute',
        hidden: true,
        meta: {
          title: '委外订单用料清单下推配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/productionMaterialsPushDown',
        component: () =>
          import('@/views/system_settings/productionMaterialsPushDown/index'),
        name: 'productionMaterialsPushDownRoute',
        hidden: true,
        meta: {
          title: '生产订单用料清单下推配置'
        }
      },
      {
        path: '/system_settings/productionMaterialsIntelligentRecommendationConfig',
        hidden: true,
        component: () =>
          import(
            '@/views/system_settings/productionMaterialsIntelligentRecommendationConfig/index.vue'
          ),
        name: 'productionMaterialsIntelligentRecommendationConfig',
        meta: { title: '用料清单智能推荐配置' }
      },
      {
        path: '/system_settings/BusinessConfiguration/outsourcingOrderPushDownRoute',
        component: () =>
          import('@/views/system_settings/outsourcingOrderPushDown/index'),
        name: 'outsourcingOrderPushDownRoute',
        hidden: true,
        meta: {
          title: '委外订单下推配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/outsourcingOrderReceivingNotePushDownRoute',
        component: () =>
          import(
            '@/views/system_settings/outsourcingOrderReceivingNotePushDown/index'
          ),
        name: 'outsourcingOrderReceivingNotePushDownRoute',
        hidden: true,
        meta: {
          title: '委外订单收货单下推配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/procurementDelPushDownRoute',
        component: () =>
          import('@/views/system_settings/procurementDelPushDown/index'),
        name: 'procurementDelPushDownRoute',
        hidden: true,
        meta: {
          title: '采购收料下推配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/purchaseReturnApplicationPushDownRoute',
        component: () =>
          import(
            '@/views/system_settings/purchaseReturnApplicationPushDown/index'
          ),
        name: 'purchaseReturnApplicationPushDownRoute',
        hidden: true,
        meta: {
          title: '采购退料申请单下推配置'
        }
      },
      {
        path: '/system_settings/BusinessConfiguration/homeWorkOrderReportVerificationRoute',
        component: () =>
          import(
            '@/views/system_settings/homeWorkOrderReportVerification/index'
          ),
        name: 'homeWorkOrderReportVerificationRoute',
        hidden: true,
        meta: {
          title: '作业工单报工校验配置'
        }
      },
      // 系统同步配置
      {
        path: '/system_settings/initialize',
        component: () => import('@/views/system_settings/initialize/index'),
        name: 'initialConfiguration',
        meta: {
          title: '系统同步配置'
        }
      },
      {
        path: '/system_settings/whiteCardSetting',
        component: () =>
          import('@/views/system_settings/whiteCardSetting/index'),
        name: 'whiteCardSetting',
        meta: {
          title: '白牌设置'
        }
      },
      {
        path: '/system_settings/app-permission-config',
        component: () =>
          import('@/views/system_settings/app-permission-config/index'),
        name: 'appPermissionConfig',
        meta: {
          title: '小程序设置'
        }
      },
      {
        path: '/applet/config',
        hidden: true,
        component: () =>
          import('@/views/business-config/applet-config/index.vue'),
        name: 'appletConfig',
        meta: {
          title: '小程序权限配置'
        }
      },
      {
        path: '/system_settings/work-center-config',
        hidden: true,
        component: () =>
          import('@/views/system_settings/work-center-config/index.vue'),
        name: 'workCenterConfigChild',
        meta: {
          title: '工作中心配置'
        }
      },
      {
        path: '/system_settings/specific-params-config',
        hidden: true,
        component: () =>
          import('@/views/system_settings/specific-params-config/index.vue'),
        name: 'specificParamsConfigChild',
        meta: {
          title: '物料特征参数配置'
        }
      },
      {
        path: '/system_settings/technology-config',
        hidden: true,
        component: () =>
          import('@/views/system_settings/technology-config/index.vue'),
        name: 'technologyConfigChild',
        meta: {
          title: '工艺配置'
        }
      },
      // 消息通知配置
      {
        path: '/system_settings/circulation-notice-config',
        component: () =>
          import(
            '@/views/system_settings/flowNotificationConfiguration/index.vue'
          ),
        name: 'flowNotificationConfiguration',
        meta: { title: '消息通知配置' }
      },
      {
        path: '/system_settings/flowNotificationConfiguration/add',
        hidden: true,
        component: () =>
          import(
            '@/views/system_settings/flowNotificationConfiguration/items/add.vue'
          ),
        name: 'flowNotificationConfigurationAdd',
        meta: { title: '新增消息通知配置' }
      },
      {
        path: '/system_settings/flowNotificationConfiguration/edit',
        hidden: true,
        component: () =>
          import(
            '@/views/system_settings/flowNotificationConfiguration/items/edit.vue'
          ),
        name: 'flowNotificationConfigurationEdit',
        meta: { title: '编辑消息通知配置' }
      },
      {
        path: '/system_settings/flowNotificationConfiguration/detail',
        hidden: true,
        component: () =>
          import(
            '@/views/system_settings/flowNotificationConfiguration/items/detail.vue'
          ),
        name: 'flowNotificationConfigurationDetail',
        meta: { title: '消息通知配置详情' }
      },
      // 仓库查看权限配置
      {
        path: '/system_settings/warehouseView',
        hidden: true,
        component: () =>
          import('@/views/system_settings/warehouseView/index.vue'),
        name: 'warehouseView',
        meta: { title: '仓库查看权限配置' }
      },
      // 采购入库单下推配置
      {
        path: '/system_settings/purchaseOutOfStorage',
        hidden: true,
        component: () =>
          import('@/views/system_settings/purchaseOutOfStorage/index.vue'),
        name: 'purchaseOutOfStorage',
        meta: { title: '采购入库单下推配置' }
      },
      // 委外领料出库单下推配置
      {
        path: '/system_settings/outstoreMaterail',
        hidden: true,
        component: () =>
          import('@/views/system_settings/outstoreMaterail/index.vue'),
        name: 'outstoreMaterailSystem',
        meta: { title: '委外领料出库单下推配置' }
      },
      // 委外补料出库单下推配置
      {
        path: '/system_settings/repairMaterail',
        hidden: true,
        component: () =>
          import('@/views/system_settings/repairMaterail/index.vue'),
        name: 'repairMaterailSystem',
        meta: { title: '委外补料出库单下推配置' }
      },
      // 销售出库单下推配置
      {
        path: '/system_settings/salesIssueReceipt',
        hidden: true,
        component: () =>
          import('@/views/system_settings/salesIssueReceipt/index.vue'),
        name: 'salesIssueReceipt',
        meta: { title: '销售出库单下推配置' }
      },
      // 其他出库申请单下推配置
      {
        path: '/system_settings/issueRequisition',
        hidden: true,
        component: () =>
          import('@/views/system_settings/issueRequisition/index.vue'),
        name: 'issueRequisitionSystem',
        meta: { title: '其他出库申请单下推配置' }
      },
      {
        path: '/system_settings/procurementOrderConfig',
        hidden: true,
        component: () =>
          import('@/views/system_settings/procurementOrderConfig/index.vue'),
        name: 'procurementOrderConfig',
        meta: { title: '采购订单配置' }
      }
    ]
  },
  // 操作日志
  {
    path: '/system-operation',
    component: Layout,
    name: 'operation',
    meta: {
      title: '操作日志',
      icon: 'menu_operation_log'
    },
    children: [
      {
        path: '/system/operation',
        component: () => import('@/views/system/operation/index'),
        name: 'operation',
        meta: {
          title: '操作日志'
        }
      }
    ]
  }
  // 大屏预览(新)
  /* {
    path: '/preview-new/line',
    component: () => import('@/views/preview-new/index'),
    hidden: true,
    children: [
      {
        path: '/preview-new/line',
        component: () => import('@/views/preview-new/pages'),
        name: 'previewNew',
        meta: {
          title: '产线大屏',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }*/
]
