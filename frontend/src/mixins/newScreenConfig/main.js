/*
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-06-01 11:46:22
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-14 09:50:57
 * @FilePath: \dfs\src\mixins\newScreenConfig\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { workordersAllState } from '@/api/screen'
export default {
  methods: {
    async addTab(singleComp) {
      // 拖动相同的组件组件名称自增
      const arr = this.tabsList.filter(i => {
        if (i.components.indexOf(singleComp.components) > -1) {
          return true
        }
      })
      // console.log(arr, 'arrarr')
      if (arr.length !== 0) {
        arr.sort((item1, item2) => {
          return item1.sameComNumber - item2.sameComNumber
        })
        singleComp['components'] = singleComp.components + `-${arr[arr.length - 1].sameComNumber + 1}`
        singleComp['name'] = singleComp.name + `-${arr[arr.length - 1].sameComNumber + 1}`
        singleComp['sameComNumber'] = arr[arr.length - 1].sameComNumber + 1
      } else {
        singleComp['components'] = singleComp.components + `-1`
        singleComp['name'] = singleComp.name + `-1`
        singleComp['sameComNumber'] = 1
      }
      singleComp['form'] = await this.createInitFormProperty(singleComp)
      singleComp['comTop'] = 0
      singleComp['comLeft'] = 0
      this.tabsList.push(singleComp)
      console.log(this, 'this')
      this.$refs.drag[0].syncComponentsList(this.tabsList.slice(2))
      // 有相同的tab替换当前的tab
      // singleComp['form'] = this.createInitFormProperty(singleComp)
      // singleComp.comTop = 0
      // singleComp.comLeft = 0
      // const index = this.tabsList.findIndex(
      //   i => singleComp.components === i.components
      // )
      // index > -1 && this.tabsList.splice(index, 1, singleComp)
      // index === -1 && this.tabsList.push(singleComp)
    },
    delTab(singleCom) {
      const index = this.tabsList.findIndex(i => i.components.split('-')[0] === singleCom.components && singleCom.sameComNumber === i.sameComNumber)
      index > -1 && this.tabsList.splice(index, 1)
    },
    addCompSite(singleCom) {
      const index = this.tabsList.findIndex(i => i.components.split('-')[0] === singleCom.components && singleCom.sameComNumber === i.sameComNumber)
      index > -1 && ((this.tabsList[index].comTop = singleCom.top), (this.tabsList[index].comLeft = singleCom.left))
    },
    addCompSize(singleCom) {
      const index = this.tabsList.findIndex(i => i.components.split('-')[0] === singleCom.components && singleCom.sameComNumber === i.sameComNumber)
      if (index > -1) {
        this.tabsList[index].currentWidth = singleCom.width / 0.7 + ''
        this.tabsList[index].currentHeight = singleCom.height / 0.7 + ''
        this.tabsList[index].width = singleCom.width
        this.tabsList[index].height = singleCom.height
      }
    },
    async  createInitFormProperty({ components = '' }) {
      const componentName = components.split('-')[0]
      if (componentName === 'complianceRate') {
        return { comName: '', deviceType: '', deviceMetrics: '' }
        // 制造运营中心
      } else if (componentName === 'CenterProduceOpreate') {
        return {
          list: this.treeList
        }
        // 中央大屏组件特殊处理
      } else if (

        (componentName === 'CentralGridOutput' ||
          componentName === 'CentralProductionOutput' ||
          componentName === 'CentralLineTime' ||
          componentName === 'CentralOrderList' ||
          componentName === 'CentralAssemblyGrid' ||
          componentName === 'CentralFaultCharts' ||
          componentName === 'ProcessCompletionRate' ||
          componentName === 'CentralWorkshopBadStatistics' ||
          componentName === 'CentralOrderOutput' ||
          componentName === 'CentralOrderOutput3' ||
          componentName === 'EnergyConsumptionOverview' ||
          componentName === 'TimeIntervalAccount' ||
          componentName === 'RoseCharts' ||
          componentName === 'QualityRate' ||
          componentName === 'FirstWeekQuality' ||
          componentName === 'LastWeekQuality' ||
          componentName === 'ProcessWeekQuality' ||
          componentName === 'FirstDayQuality' ||
          componentName === 'LastDayQuality' ||
          componentName === 'ProcessDayQuality')
      ) {
        return {
          name: '',
          proLineGroup:
          componentName === 'MainContentAll' ? [] : 'all',
          qualityType: ['1', '3', '4']
        }

        // 中央大屏生产订单工序
      } else if (

        (componentName === 'ProductOrderProcessScreen'
        )) {
        return {
          name: '',
          screenTurnTime: ''
          // workOrderCenter: [],
          // workOrderCenterOptions: await this.getWorkCenterOptions() || []
        }

        // 产线故障统计分析和产线产出对比统计分析组件
      } else if (

        (componentName === 'GiantWorkStatistics' ||
          componentName === 'GiantPlanSchedule' ||
          componentName === 'GiantProcessCharts' ||
          componentName === 'GiantProcessCharts2' ||
          componentName === 'CurrentDayGiantProcessCharts')
      ) {
        const params = { name: '', proGridGroup: 'all' }
        if (componentName === 'GiantWorkStatistics') {
          params.maintainTypes = ''
        }
        return params
      } else if (
        componentName === 'FailureAnalysis' ||
        componentName === 'CompareAnalysis'
      ) {
        return {
          name: '',
          timeRange: ''
        }
      } else if (componentName === 'LineBadRateScreen') {
        return {
          name: '',
          stationList: []
        }
      } else if (componentName === 'TrendOfElectricityConsumption') {
        return {
          name: '',
          deviceCode: ''
        }
      } else if (
        componentName === 'MainInterfaceData' ||
        componentName === 'EquipmentParameters'
      ) {
        return {
          name: '',
          deviceId: '',
          deviceIndicators: []
        }
      } else if (componentName === 'DeviceStatus') {
        return {
          name: '',
          deviceId: ''
        }
      } else if (componentName === 'WorkshopLinesData') {
        return {
          name: '',
          allHasSelectedGroup: [{ lineOptions: [] }]
        }
      } else if (componentName === 'ProductionEfficiency') {
        return {
          name: '',
          completionRateThresholdValue: '',
          workOrderStates: [],
          workOrderStateOptions: await this.getWorkOrderStateOptions(),
          productLine: [],
          passRateThresholdValue: '',
          productionEfficiencyThresholdValue: ''
        }
        // 中央大屏配置组件产线
      } else if (componentName === 'PersonnelOutputChangeTrend' ||
      componentName === 'NegativeTrendProportionChart' ||
      componentName === 'DistributionOfDefectiveProducts' ||
      componentName === 'OverviewState') {
        return {
          name: '',
          productLine: []

        }
      } else if (componentName === 'AdverseTrendChart') {
        return {
          name: '',
          productLine: [],
          passRateThresholdValue: ''
        }
      } else if (
        componentName === 'DailyUnqualifiedFluctuationChart' ||
        componentName === 'PlatonicDistributionOfBadData' ||
        componentName === 'DowntimeDistribution' ||
        componentName === 'AlarmDowntimeOfFrequencyStatistics' ||
        componentName === 'AlarmDowntimeOfOutputStatistics'
      ) {
        return {
          name: '',
          lineIds: [],
          thresholdValue: ''

        }
      } else if (componentName === 'WorkshopDailyOutput') {
        return {
          name: '',
          productionLineId: []
        }
      } else if (componentName === 'SaleTransparency') {
        return {
          name: '',
          screenTurnTime: ''
        }
      } else {
        return {
          name: ''
        }
      }
    },
    async  getWorkOrderStateOptions() {
      const { data: { code, data }} = await workordersAllState()
      if (code === '200') {
        return data
      } else {
        return []
      }
    }
  }
}
