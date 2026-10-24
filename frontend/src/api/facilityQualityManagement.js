import request from '@/utils/request'
import { download, upload } from '@/api/fileTransfer'

// 不良缺陷模块接口
export const USE_DEFECTS_API = () => {
  return {
    // 不良缺陷列表
    getDefectsListApi: async data => {
      return request({
        url: `/qms/product/v1/defects/list`,
        method: 'post',
        data
      })
    },
    // 不良缺陷新
    addDefectsApi: async data => {
      return request({
        url: `/qms/product/v1/defects/add`,
        method: 'post',
        data
      })
    },
    // 不良缺陷详情
    getDefectsDetailApi: async id => {
      return request({
        url: `/qms/product/v1/defects/detail/${id}`,
        method: 'get'
      })
    },

    // 不良缺陷状态枚举
    getDefectsStatusApi: async => {
      return request({
        url: `/qms/product/v1/dicts/status/list`,
        method: 'get'
      })
    },
    // 不良缺陷编辑
    getDefectsPutApi: async data => {
      return request({
        url: `/qms/product/v1/defects/update`,
        method: 'put',
        data
      })
    },
    // 不良缺陷删除
    defectsDelApi: async data => {
      return request({
        url: `/qms/product/v1/defects/delete/batch`,
        method: 'delete',
        data
      })
    },
    // 不良缺陷批量修改状态
    defectsPutStateBatchApi: async data => {
      return request({
        url: `/qms/product/v1/defects/update/state/batch`,
        method: 'post',
        data
      })
    },
    // 不良缺陷 模版下载
    teamsDefaultTemplateExport: async data => {
      return download(`/qms/product/v1/defects/export/default/template`)
    },
    // 不良缺陷 导入
    defectDefineExcelImport: async file => {
      return upload(`/qms/product/v1/defects/excel/import`, file)
    },
    // 不良缺陷 导入进度
    defectDefineImportProgress: async data => {
      return request({
        url: `/qms/product/v1/defects/import/progress`,
        method: 'get',
        data
      })
    },
    // 不良缺陷等级
    defectDefineLevelList: async data => {
      return request({
        url: `/qms/product/v1/dicts/defect/level/list`,
        method: 'get',
        data
      })
    },
    // 缺陷导出
    defectDefineExport: async data => {
      return download(`/qms/product/v1/defects/export`, data, 'post')
    }
  }
}
