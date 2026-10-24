/*
 * @Author: limengjuan
 * @Date: 2022-06-07 12:00:58
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-08 19:56:39
 * @Description:产线故障统计分析
 */
import { v4 as uuidv4 } from 'uuid'
const PRODUCTlINE_FAILURE_ANALYSIS = [
  {
    id: uuidv4(),
    address: require('@/assets/images/analysis/default.png'),
    name: '产线故障统计分析大屏',
    components: 'failureAnalysis',
    width: 1920 * 0.7,
    height: 977 * 0.7,
    currentWidth: '1920',
    currentHeight: '977',
    type: 'failureAnalysis',
    zIndex: 1
  }
]
const FailureAnalysis = () =>
  import('@/views/production-failure-analysis/index.vue')
const failureAnalysisComponents = {
  FailureAnalysis
}
export { PRODUCTlINE_FAILURE_ANALYSIS, failureAnalysisComponents }
