/*
 * @Author: limengjuan
 * @Date: 2022-06-07 12:02:34
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-08 12:17:30
 * @Description:产线产出对比统计分析
 */
import { v4 as uuidv4 } from 'uuid'
const PRODUCTlINE_COMPARE_ANALYSIS = [
  {
    id: uuidv4(),
    address: require('@/assets/images/analysis/compare.png'),
    name: '产线产出对比统计分析大屏',
    components: 'CompareAnalysis',
    width: 1920 * 0.7,
    height: 977 * 0.7,
    currentWidth: '1920',
    currentHeight: '977',
    type: 'compareAnalysis',
    zIndex: 1
  }
]
const CompareAnalysis = () =>
  import('@/views/production-line-comparison/index.vue')
const compareComponents = {
  CompareAnalysis
}
export { PRODUCTlINE_COMPARE_ANALYSIS, compareComponents }
