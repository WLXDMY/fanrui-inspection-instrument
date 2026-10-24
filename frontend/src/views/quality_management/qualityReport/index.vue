<!--
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-07-30 11:22:32
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-08-07 13:55:52
 * @Description: 缺陷分析模块
-->
<template>
  <div class="wrapper">
    <div class="container">
      <!-- tab 栏 -->
      <header>
        <el-menu :default-active="'0-0'" class="el-menu-demo" mode="horizontal">
          <el-submenu v-for="(board, index) in boardList" :key="index" :index="index + ''">
            <template slot="title">{{ board.typeName }}</template>
            <el-menu-item
              v-for="(item, sindex) in board.list"
              :key="item.componentName + sindex"
              :index="index + '-' + sindex"
              @click.native="renderComponent(item, board)"
              >{{ item.name }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </header>

      <!-- 下方搜索和表格 -->
      <main>
        <component
          :is="curComponent.componentName"
          :model-type="curComponent.props.modelType"
          :columns="curComponent.props.columns"
          :show-type="curComponent.props.showType"
          :columns-save-name="curComponent.props.columnsSaveName"
          :column-permission-action="curComponent.props.columnPermissionAction"
          :scheme-permission="curComponent.props.schemePermission"
          :name="curComponent.name"
        >
          <template slot="name"
            ><span style="color: #1890ff">
              {{ curComponent.name }}
            </span>
          </template>
        </component>
      </main>
    </div>
  </div>
</template>

<script>
// 表格参数
import {
  COLUMNS_CONFIG_TYPE,
  COLUMNS_CONFIG_DEFECT,
  COLUMNS_CONFIG_DEFECT_REASON,
  COLUMNS_CONFIG_SUPPLIER
} from './components/commonConstant'
export default {
  components: {
    commonPage1: () => import('./components/commonPage.vue'),
    commonPage2: () => import('./components/commonPage.vue'),
    commonPage3: () => import('./components/commonPage.vue'),
    commonPage4: () => import('./components/commonPage.vue')
  },
  data() {
    return {
      curComponent: {},
      curTypeName: '',
      // tabs参数
      boardList: [
        {
          typeName: '缺陷分析',
          list: [
            {
              name: '按类型',
              componentName: 'commonPage1',
              props: {
                // 接口中有用到，上传/下载自定义导出模板
                modelType: 19,
                columns: COLUMNS_CONFIG_TYPE,
                // 类型，前端自定义
                showType: 'analysisDefectType',
                // 表格的配置，右边列的图标, 列配置保存名称，强烈建议传入
                columnsSaveName: 'defectAnalyseType',
                // 方案配置权限
                schemePermission: 'qms-product-inspection.inspection-manage.productionQualityReport:schemeConfigList',
                // 表格列配置
                columnPermissionAction:
                  'qms-product-inspection.inspection-manage.productionQualityReport:columnConfigList'
              }
            },
            {
              name: '按缺陷',
              componentName: 'commonPage2',
              props: {
                modelType: 20,
                columns: COLUMNS_CONFIG_DEFECT,
                showType: 'analysisDefect',
                columnsSaveName: 'defectAnalyseDefect',
                schemePermission: 'qms-product-inspection.inspection-manage.productionQualityReport:schemeConfigList',
                columnPermissionAction:
                  'qms-product-inspection.inspection-manage.productionQualityReport:columnConfigList'
              }
            },
            {
              name: '按缺陷原因',
              componentName: 'commonPage3',
              props: {
                modelType: 21,
                columns: COLUMNS_CONFIG_DEFECT_REASON,
                showType: 'analysisDefectReason',
                columnsSaveName: 'defectAnalyseReason',
                schemePermission: 'qms-product-inspection.inspection-manage.productionQualityReport:schemeConfigList',
                columnPermissionAction:
                  'qms-product-inspection.inspection-manage.productionQualityReport:columnConfigList'
              }
            },
            {
              name: '按供应商',
              componentName: 'commonPage4',
              props: {
                modelType: 22,
                columns: COLUMNS_CONFIG_SUPPLIER,
                showType: 'analysisDefectSupplier',
                columnsSaveName: 'defectAnalyseSupplier',
                schemePermission: 'qms-product-inspection.inspection-manage.productionQualityReport:schemeConfigList',
                columnPermissionAction:
                  'qms-product-inspection.inspection-manage.productionQualityReport:columnConfigList'
              }
            }
          ]
        }
      ]
    }
  },
  created() {
    this.curTypeName = this.boardList[0].typeName
    this.curComponent = this.boardList[0].list[0]
  },
  methods: {
    renderComponent(component, board) {
      // 切换类型后移除
      sessionStorage.removeItem('schemeVal')
      sessionStorage.removeItem('conditions')
      this.curTypeName = board.typeName
      this.curComponent = component
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100% !important;
  width: 100% !important;
  padding: 4px 0 0 0 !important;
  background-color: #eaeff5 !important;
  .container {
    padding: 10px;
    width: 100%;
    height: 100%;
    background-color: #fff;

    header {
      ::v-deep .el-menu {
        .el-submenu {
          .el-submenu__title {
            height: 30px;
            margin: 0;
            padding-left: 0;
            line-height: 30px;
            padding-right: 40px;
          }
        }
      }
    }

    main {
      height: calc(100% - 31px);
    }
  }
}
</style>
