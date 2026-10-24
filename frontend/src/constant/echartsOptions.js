/*
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-06-05 12:02:46
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-06-05 16:46:36
 * @FilePath: \screen\src\constant\echartsOptions.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 柱状图
import * as echarts from 'echarts'
export const barConfigOptions = {
  grid: {

    left: 81,
    top: 40
  },
  title: {
    text: '完成数',
    textStyle: {
      color: '#FFE900',
      fontSize: 18
    },
    left: 54

  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#04BBFF'
      }
    },

    axisLabel: { // x轴文字的配置
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: 20
      }
    }

  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: ['rgba(26,64,106,0.549)'],
        width: 1,
        type: 'solid'
      }},
    axisLine: { // y轴线的颜色
      show: true,
      lineStyle: {
        color: '#04BBFF',
        width: 1,
        type: 'solid'
      }
    },
    axisTick: { // 坐标轴刻度设置
      show: false
    },
    axisLabel: { // y轴文字的配置
      fontSize: 20,
      color: '#fff'
    }
  },
  series: [
    {
      data: [],
      type: 'bar',

      itemStyle: {
        normal: {
          color: function(params) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#0080FF ' },
              { offset: 1, color: '#00FFEE' }
            ], false)
          }
        }
      }
    }
  ]
}

export const pieConfigOptions = {
  title: {

  },

  // 图例数据解析
  legend: {

    orient: 'vertical',
    left: 27,
    bottom: 26,
    itemStyle: {
      color: '#fff'
    },
    textStyle: {
      color: '#fff',
      fontSize: 24
    },
    icon: 'circle'

  },

  tooltip: {
    trigger: 'item'
  },
  color: [
    '#8E68EA',
    '#EF8D01',
    '#EFD701',
    '#2F2FE5',
    '#37D064',
    '#01C6FE'
  ],
  series: [
    {
      type: 'pie',

      data: [], // 数据源
      center: [558, 178],
      radius: [0, 150],
      label: {
        formatter: (params) => {
          return params.percent + '%'
        }

      },
      labelLine: {
        length: 20,
        length2: 38

      }
    }

  ]
}
