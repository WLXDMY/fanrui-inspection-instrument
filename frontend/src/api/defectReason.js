/*
 * @Author: laidz laidz@yelinked.com
 * @Date: 2024-07-29 14:40:40
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2024-08-01 09:51:16
 * @Description:
 */
import request from '@/utils/request'
import { download, upload } from '@/api/fileTransfer'

// 缺陷原因模块接口
export const USE_DEFECTS_REASON_API = () => {
  return {
    // 列表
    getDefectsListApi: async data => {
      return request({
        url: `/qms/product/v1/defects/reason/list`,
        method: 'post',
        data
      })
    },
    // 新增
    addDefectsApi: async data => {
      return request({
        url: `/qms/product/v1/defects/reason/add`,
        method: 'post',
        data
      })
    },
    // 详情
    getDefectsDetailApi: async id => {
      return request({
        url: `/qms/product/v1/defects/reason/detail/${id}`,
        method: 'get'
      })
    },

    // 状态枚举
    getDefectsStatusApi: async => {
      return request({
        url: `/qms/product/v1/dicts/status/list`,
        method: 'get'
      })
    },
    // 编辑
    getDefectsPutApi: async data => {
      return request({
        url: `/qms/product/v1/defects/reason/update`,
        method: 'put',
        data
      })
    },
    // 删除
    defectsDelApi: async data => {
      return request({
        url: `/qms/product/v1/defects/reason/delete/batch`,
        method: 'delete',
        data
      })
    },
    // 批量修改状态
    defectsPutStateBatchApi: async data => {
      return request({
        url: `/qms/product/v1/defects/reason/update/state/batch`,
        method: 'post',
        data
      })
    },
    //  模版下载
    teamsDefaultTemplateExport: async data => {
      return download(`/qms/product/v1/defects/reason/export/default/template`)
    },
    //  导入
    defectDefineExcelImport: async file => {
      return upload(`/qms/product/v1/defects/reason/excel/import`, file)
    },
    //  导入进度
    defectDefineImportProgress: async data => {
      return request({
        url: `/qms/product/v1/defects/reason/import/progress`,
        method: 'get',
        data
      })
    },
    // 导出
    defectDefineExport: async data => {
      return request({
        url: `/qms/product/v1/defects/reason/export`,
        method: 'post',
        data,
        responseType: 'blob'
      })
    }
  }
}
