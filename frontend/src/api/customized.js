// 定制化页面接口文档
import request from '@/utils/request'

// 获取展示组件内容名称
export function getCustomizationComponentName(params) {
  return request({
    url: '/api/customization/component/name/list',
    method: 'get',
    params
  })
}
