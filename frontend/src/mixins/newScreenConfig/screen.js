
const { currentMiniProgramType: { appType }} = JSON.parse(localStorage.getItem('routeMiniProTypeContent'))

export default {

  methods: {
    // 处理组件配置
    hdComponentConfig(comData = {}) {
      const centerComProLineGroupOptions = [
        ...this.$refs.main.centerComProLineGroupOptions
      ]
      // 中央大屏下特殊组件处理
      if (
        appType === 'CENTER_SCREEN' && (comData.components.split('-')[0] === 'CentralGridOutput' ||
        comData.components.split('-')[0] === 'CentralProductionOutput' ||
        comData.components.split('-')[0] === 'CentralLineTime' ||
        comData.components.split('-')[0] === 'CentralOrderList' ||
        comData.components.split('-')[0] === 'CentralAssemblyGrid' ||
        comData.components.split('-')[0] === 'CentralFaultCharts' ||
        comData.components.split('-')[0] === 'ProcessCompletionRate' ||
        comData.components.split('-')[0] === 'CentralWorkshopBadStatistics' ||
        comData.components.split('-')[0] === 'CentralOrderOutput' ||
        comData.components.split('-')[0] === 'CentralOrderOutput3' ||
        comData.components.split('-')[0] === 'EnergyConsumptionOverview' ||
        comData.components.split('-')[0] === 'TimeIntervalAccount' ||
        comData.components.split('-')[0] === 'RoseCharts' ||
        comData.components.split('-')[0] === 'QualityRate' ||
        comData.components.split('-')[0] === 'FirstWeekQuality' ||
        comData.components.split('-')[0] === 'LastWeekQuality' ||
        comData.components.split('-')[0] === 'ProcessWeekQuality' ||
        comData.components.split('-')[0] === 'FirstDayQuality' ||
        comData.components.split('-')[0] === 'LastDayQuality' ||
        comData.components.split('-')[0] === 'ProcessDayQuality' ||
        comData.components.split('-')[0] === 'MainContentAll')) {
        const proLineGroupList = []
        if (comData.components.split('-')[0] === 'MainContentAll') {
          comData.form.proLineGroup.forEach(i => {
            const sindex = centerComProLineGroupOptions.findIndex(
              si => si.value === i
            )
            sindex > -1 &&
                proLineGroupList.push({
                  id: centerComProLineGroupOptions[sindex].value,
                  name: centerComProLineGroupOptions[sindex].label
                })
          })
        } else {
          const index = centerComProLineGroupOptions.findIndex(
            i => i.value === comData.form.proLineGroup
          )
          index > -1 &&
              proLineGroupList.push({
                id: centerComProLineGroupOptions[index].value,
                name: centerComProLineGroupOptions[index].label
              })
        }
        return {
          grid_ids: proLineGroupList,
          qualityType: comData.form?.qualityType
        }
        // 制造运营中心组件
      } else if (

        comData.components.split('-')[0] === 'GiantWorkStatistics' ||
            comData.components.split('-')[0] === 'GiantPlanSchedule' ||
            comData.components.split('-')[0] === 'GiantProcessCharts' ||
            comData.components.split('-')[0] === 'GiantProcessCharts2' ||
            comData.components.split('-')[0] === 'CurrentDayGiantProcessCharts') {
        const proLineGroupList = []
        const index = centerComProLineGroupOptions.findIndex(
          i => i.value === comData.form.proGridGroup
        )
        index > -1 &&
            proLineGroupList.push({
              id: centerComProLineGroupOptions[index].value,
              name: centerComProLineGroupOptions[index].label
            })
        const params = {
          grid_ids: proLineGroupList
        }
        if (comData.components.split('-')[0] === 'GiantWorkStatistics') {
          params.maintainTypes = comData.form.maintainTypes
        }
        return params
      } else if (comData.components.split('-')[0] === 'CenterProduceOpreate') {
        return {
          list: comData.form.list
        }
      } else if (
        comData.components.split('-')[0] === 'FailureAnalysis' ||
          comData.components.split('-')[0] === 'CompareAnalysis'
      ) {
        return {
          time_ranges: comData.form.timeRange
        }
        // 达标率组件
      } else if (comData.components.split('-')[0] === 'complianceRate') {
        return {
          deviceType: comData.form.deviceType,
          deviceMetrics: comData.form.deviceMetrics
        }
      } else if (comData.components.split('-')[0] === 'LineBadRateScreen') {
        return {
          stationList: comData.form.stationList
        }
      } else if (
        comData.components.split('-')[0] === 'TrendOfElectricityConsumption'
      ) {
        return {
          deviceCode: comData.form.deviceCode
        }
      } else if (
        comData.components.split('-')[0] === 'MainInterfaceData' ||
          comData.components.split('-')[0] === 'EquipmentParameters'
      ) {
        return {
          deviceId: comData.form.deviceId,
          deviceIndicators: comData.form.deviceIndicators
        }
      } else if (comData.components.split('-')[0] === 'DeviceStatus') {
        return {
          deviceId: comData.form.deviceId
        }
      } else if (comData.components.split('-')[0] === 'WorkshopLinesData') {
        return comData.form
      } else if (comData.components.split('-')[0] === 'ProductionEfficiency') {
        return comData.form
      } else if (comData.components.split('-')[0] === 'AdverseTrendChart') {
        return comData.form
      } else if (
        comData.components.split('-')[0] ===
            'DailyUnqualifiedFluctuationChart' ||
          comData.components.split('-')[0] === 'PlatonicDistributionOfBadData' ||
          comData.components.split('-')[0] === 'DowntimeDistribution' ||
          comData.components.split('-')[0] ===
            'AlarmDowntimeOfFrequencyStatistics' ||
          comData.components.split('-')[0] === 'AlarmDowntimeOfOutputStatistics'
      ) {
        return comData.form
      } else if (comData.components.split('-')[0] === 'WorkshopDailyOutput') {
        return {
          productionLineId: comData.form.productionLineId
        }
      } else if (comData.components.split('-')[0] === 'SaleTransparency') {
        return {
          screenTurnTime: comData.form.screenTurnTime
        }
      } else if (comData.components.split('-')[0] === 'ProductOrderProcessScreen') {
        return comData.form
      } else if (comData.components.split('-')[0] === 'PersonnelOutputChangeTrend' ||

        comData.components.split('-')[0] === 'NegativeTrendProportionChart' ||
        comData.components.split('-')[0] === 'DistributionOfDefectiveProducts' ||
        comData.components.split('-')[0] === 'OverviewState'
      ) {
        return comData.form
      } else {
        return {}
      }
    }
  }
}
