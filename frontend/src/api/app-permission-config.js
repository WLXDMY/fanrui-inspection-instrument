import request from '@/utils/request'

/**
 *
 * 小程序配置页面
 *
 */
// 获取配置过的小程序列表
export function getAppPermissionList(params) {
  return request({
    url: `/api/sys/list`,
    method: 'get',
    params
  })
}

// 获取所有小程序(新增使用)
export function getAllAppList(params) {
  return request({
    url: `/api/sys/app/list`,
    method: 'get',
    params
  })
}

// 新增小程序权限（多选）
export function addAppPermission(query) {
  return request({
    url: `/api/sys/insert`,
    method: 'post',
    data: query
  })
}

// 编辑小程序权限
export function editAppPermission(query) {
  return request({
    url: `/api/sys/update`,
    method: 'post',
    data: query
  })
}

// 获取所有工位实列
export function getAllModelTreeList() {
  return request({
    url: `/api/sys/model/true/list`,
    method: 'get'
  })
}

// 删除小程序权限
export function deleteAppPermissionById(id) {
  return request({
    url: `/api/sys/delete/${id}`,
    method: 'delete'
  })
}
