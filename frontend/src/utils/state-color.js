/*
 * @Author: limengjuan
 * @Date: 2021-10-12 15:55:58
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-12-12 16:00:30
 * @Description:
 */
const stateColorList = [
  { stateName: '创建', color: '#1890FF' },
  { stateName: '待检验', color: '#1890FF' },
  { stateName: '待复核', color: '#03E2E2' },
  { stateName: '待核准', color: '#03E2E2' },
  { stateName: '待决策', color: '#03E2E2' },
  { stateName: '检验完成', color: '#52C41A' },
  { stateName: '已审核', color: '#FCA625' },
  { stateName: '已审批', color: '#4950FC' },
  { stateName: '待派工', color: '#03E2E2' },
  { stateName: '已派工', color: '#4950FC' },
  { stateName: '待审批', color: '#03E2E2' },
  { stateName: '审批中', color: '#03E2E2' },
  { stateName: '已批准', color: '#4950FC' },
  { stateName: '待生成', color: '#DD2D15' },
  { stateName: '审核', color: '#FCA625' },
  { stateName: '批准', color: '#4950FC' },
  { stateName: '发放', color: '#03E2E2' },
  { stateName: '待审核', color: '#03E2E2' },
  { stateName: '待提交', color: '#03E2E2' },
  { stateName: '未开始', color: '#03E2E2' },
  { stateName: '已审核待批准', color: '#FCA625' },
  { stateName: '驳回', color: '#FF4949' },
  { stateName: '草稿', color: '#F2980D' },
  { stateName: '生效', color: '#03E2E2' },
  { stateName: '完成', color: '#52C41A' },
  { stateName: '已通过', color: '#52C41A' },
  { stateName: '关闭', color: '#FF4949' },
  { stateName: '取消', color: '#8B96A3' },
  { stateName: '启用', color: '#52C41A' },
  { stateName: '停用', color: '#FF4949' },
  { stateName: '已驳回', color: '#FF4949' },
  { stateName: '已撤销', color: '#FF4949' },
  { stateName: '废弃', color: '#8B96A3' },
  { stateName: '废除', color: '#8B96A3' },
  { stateName: '禁用', color: '#FF4949' },
  { stateName: '作废', color: '#8B96A3' },
  { stateName: '投入', color: '#4950FC' },
  { stateName: '投产', color: '#4950FC' },
  { stateName: '挂起', color: '#F9700A' },
  { stateName: '送货', color: '#FCA625' },
  { stateName: '待处理', color: '#FCA625' },
  { stateName: '正在处理', color: '#1890FF' },
  { stateName: '已关闭', color: '#8B96A3' },
  { stateName: '未处理', color: '#DD2D15' },
  { stateName: '处理中', color: '#FFB813' },
  { stateName: '已处理', color: '#52C41A' },
  { stateName: '处理完成', color: '#52C41A' },
  { stateName: '轻微告警', color: '#90B83B' },
  { stateName: '严重告警', color: '#FF322F' },
  { stateName: '一般告警', color: '#FFB813' },
  { stateName: '没有参数', color: '#999999' },
  { stateName: '生产中', color: '#43EA80' },
  { stateName: '故障', color: '#DD2D15' },
  { stateName: '停机', color: '#95A8D6' },
  { stateName: '待机', color: '#0084FF' },
  { stateName: '运行中', color: '#3FF0A2' },
  { stateName: '暂停', color: '#FFB813' },
  { stateName: '待解决', color: '#FCA625' },
  { stateName: '已解决', color: '#4950FC' },
  { stateName: '未恢复', color: '#DD2D15' },
  { stateName: '已恢复', color: '#4950FC' },
  { stateName: '正常', color: '#56d0f5' },
  { stateName: '加急', color: '#fc8900' },
  { stateName: '优先', color: '#1e60fb' },
  { stateName: '特急', color: '#fe0102' },
  { stateName: '待提交', color: '#F9700A' }
]

const getStateColor = stateName => {
  const tempArr = stateColorList.find(state => state.stateName === stateName)
  return tempArr ? tempArr.color : ''
}

export default {
  stateColorList,
  getStateColor
}
