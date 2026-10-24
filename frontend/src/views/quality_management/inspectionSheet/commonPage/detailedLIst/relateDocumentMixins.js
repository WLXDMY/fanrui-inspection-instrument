/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-30 09:54:53
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-08-07 09:38:56
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\detailedLIst\relateDocumentMixins.js
 * @Description: 不推荐使用mixins 这里是为了关联单据的相关逻辑放到一个文件中管理 避免detailedList文件太臃肿
 */
import { getSchemeByMaterial, getSampleNumByScheme } from '@/api/quality-manage.js'
import {
  PurchaseColumn,
  WorkOrderColumn,
  ProjectOrderColumn,
  ProductTakeOutColumn,
  SaleOrderColumn,
  SaleOutOrderColumn,
  ProductOrderColumn,
  PurchaseReturnColumn,
  DeliveryOrderColumn
} from './constant.js'
export const relateDocumentMixins = {
  methods: {
    // 打开关联单据编号弹窗
    clickShowDocumentDialog(row, $index) {
      this.$emit('update:clickIndex', $index)
      if (this.baseForm.relateDocumentType === 'purchaseReceive') {
        this.receiptOrderVisible = true
        return
      }
      switch (this.baseForm.relateDocumentType) {
        case 'purchaseOrder':
          this.dialogTitle = '关联采购订单'
          this.tableColumn = PurchaseColumn
          this.requestConfig = {
            url: '/ams/purchases/list',
            method: 'post'
          }
          this.extraParams = {
            states: '2,3'
          }
          break
        case 'workOrder':
          this.dialogTitle = '关联生产工单'
          this.tableColumn = WorkOrderColumn
          this.requestConfig = {
            url: '/api/workorders/list/simple',
            method: 'post'
          }
          // 首件检验关联只支持投产状态
          this.extraParams = {
            states: '2,3,4,5'
            // states: this.baseForm.type === 'firstItemInspect' ? '3' : '3,4'
          }
          break
        case 'productTakeOut':
          this.dialogTitle = '关联生产领料出库单'
          this.tableColumn = ProductTakeOutColumn
          this.requestConfig = {
            url: '/wms/stocks/output/list',
            method: 'post'
          }
          this.extraParams = {
            states: '1,2',
            showType: 'material',
            inOrOutType: 'workOrderTakeOut'
          }
          break
        case 'productSupplementOut':
          this.dialogTitle = '关联生产补料出库单'
          this.tableColumn = ProductTakeOutColumn
          this.requestConfig = {
            url: '/wms/stocks/output/list',
            method: 'post'
          }
          this.extraParams = {
            states: '1,2',
            showType: 'material',
            inOrOutType: 'workOrderSupplement,workConsumeOut'
          }
          break
        case 'saleOrder':
          this.dialogTitle = '关联销售订单'
          this.tableColumn = SaleOrderColumn
          this.requestConfig = {
            url: '/ams/sale/orders/order/list',
            method: 'post'
          }
          this.extraParams = {
            states: '2',
            showType: 'material'
          }
          break
        case 'saleOutOrder':
          this.dialogTitle = '关联销售出库单'
          this.tableColumn = SaleOutOrderColumn
          this.requestConfig = {
            url: '/wms/stock/sale/out/listForMaterial',
            method: 'post'
          }
          this.extraParams = {
            statusList: '1,2',
            showType: 'material'
          }
          break
        case 'productOrder':
          this.dialogTitle = '关联生产订单'
          this.tableColumn = ProductOrderColumn
          this.requestConfig = {
            url: '/ams/product/orders/list',
            method: 'post'
          }
          this.extraParams = {
            states: '2',
            showType: 'material'
          }
          break
        case 'purchaseReturn':
          this.dialogTitle = '关联采购退料单'
          this.tableColumn = PurchaseReturnColumn
          this.requestConfig = {
            url: '/ams/purchase/return/list',
            method: 'post'
          }
          this.extraParams = {
            states: '2,3'
          }
          break
        case 'deliveryOrder':
          this.dialogTitle = '关联发货通知单'
          this.tableColumn = DeliveryOrderColumn
          this.requestConfig = {
            url: '/api/stocks/delivery/list',
            method: 'post'
          }
          this.extraParams = {
            states: '2,4'
          }
          break
        case 'projectOrder':
          this.dialogTitle = '关联项目合同'
          this.tableColumn = ProjectOrderColumn
          this.requestConfig = {
            url: '/pms/project/define/list',
            method: 'post'
          }
          this.extraParams = {
            states: '2,3'
          }
          break

        default:
          break
      }
      this.showDocumentDialog = true
    },
    // 关联单据弹窗确认
    handleDocumentConfirm(rows) {
      this.showDocumentDialog = false
      switch (this.baseForm.relateDocumentType) {
        case 'purchaseOrder':
          this.purchaseOrderConfirm(rows)
          break
        case 'workOrder':
          this.workOrderConfirm(rows)
          break
        case 'productTakeOut':
        case 'productSupplementOut':
          this.productTakeOutConfirm(rows)
          break
        case 'saleOrder':
          this.saleOrderConfirm(rows)
          break
        case 'saleOutOrder':
          this.saleOutOrderConfirm(rows)
          break
        case 'productOrder':
          this.productOrderConfirm(rows)
          break
        case 'purchaseReturn':
          this.purchaseReturnConfirm(rows)
          break
        case 'deliveryOrder':
          this.deliveryOrderConfirm(rows)
          break
        default:
          break
      }
    },
    // 统一处理
    centralizedTreatment(rowData) {
      this.formInline.detailTableData = this.formInline.detailTableData.filter(item => item.relateDocumentCode)
      this.formInline.detailTableData.push(...rowData)
      this.loading = false

      // 这里需要重新选中一下 因为原本的占位行被删除了
      const row = this.formInline.detailTableData[this.clickIndex]
      if (!row) return
      this.$emit('update:currentRow', row)
      this.$refs.commonTable.setCurrentRow(row)
    },
    // 采购收料单确认
    async handleReceipConfirm(rows) {
      this.loading = true
      this.receiptOrderVisible = false

      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        const { receiptCode, materialFields } = row
        const params = {
          type: this.baseForm.type,
          materialId: materialFields?.id,
          materialCode: materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        try {
          const params1 = {
            num: row.barCount || row.planAmount,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        const obj = {
          ...row,
          relateDocumentCode: receiptCode,
          relateRowId: row.materialRowId,
          relateRowLineNum: row.lineNumber,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity: row.barCount || row.planAmount || 0,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    },

    // 采购订单确认
    async purchaseOrderConfirm(rows) {
      this.loading = true
      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
        const { purchaseCode, materialFields, requestMaterialEntities = [] } = row
        const params = {
          type: this.baseForm.type,
          materialId: materialFields?.id,
          materialCode: materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        const inspectQuantity = requestMaterialEntities[0]?.planNum || 0
        try {
          const params1 = {
            num: inspectQuantity,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ purchaseOrderConfirm ~ error:', error)
        }

        const obj = {
          ...row,
          relateDocumentCode: purchaseCode,
          relateRowId: requestMaterialEntities[0]?.id,
          relateRowLineNum: requestMaterialEntities[0]?.lineNumber,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    },
    // 生产订单确定
    async workOrderConfirm(rows) {
      this.loading = true
      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
        const { workOrderId, workOrderNumber, materialFields } = row
        const params = {
          type: this.baseForm.type,
          materialId: materialFields?.id,
          materialCode: materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        const inspectQuantity = row.planQuantity || 0
        try {
          const params1 = {
            num: inspectQuantity,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ workOrderConfirm ~ error:', error)
        }

        const obj = {
          ...row,
          relateDocumentCode: workOrderNumber,
          relateRowId: workOrderId,
          relateRowLineNum: 1,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    },
    // 生产领料出库
    async productTakeOutConfirm(rows) {
      this.loading = true
      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
        const { orderNumber, materialFields, materialDetails = [] } = row
        const params = {
          type: this.baseForm.type,
          materialId: materialFields?.id,
          materialCode: materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        const inspectQuantity = row.planAmount || 0
        try {
          const params1 = {
            num: inspectQuantity,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ productTakeOutConfirm ~ error:', error)
        }

        const obj = {
          ...row,
          relateDocumentCode: orderNumber,
          relateRowId: materialDetails[0]?.id,
          // relateRowLineNum: ,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    },
    // 销售订单确定
    async saleOrderConfirm(rows) {
      this.loading = true
      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
        const { saleOrderNumber, saleOrderMaterial = {}} = row
        const params = {
          type: this.baseForm.type,
          materialId: saleOrderMaterial?.materialFields?.id,
          materialCode: saleOrderMaterial?.materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        const inspectQuantity = saleOrderMaterial.salesQuantity || 0
        try {
          const params1 = {
            num: inspectQuantity,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ saleOrderConfirm ~ error:', error)
        }

        const obj = {
          ...row,
          relateDocumentCode: saleOrderNumber,
          relateRowId: saleOrderMaterial?.id,
          relateRowLineNum: saleOrderMaterial?.lineNumber,
          materialCode: saleOrderMaterial?.materialFields?.code,
          materialId: saleOrderMaterial?.materialFields?.id,
          materialName: saleOrderMaterial?.materialFields?.name,
          materialStandard: saleOrderMaterial?.materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    },
    // 销售出库单
    async saleOutOrderConfirm(rows) {
      this.loading = true
      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
        const { orderNo, materialFields } = row
        const params = {
          type: this.baseForm.type,
          materialId: materialFields?.id,
          materialCode: materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        const inspectQuantity = row.materialPlanNum || 0
        try {
          const params1 = {
            num: inspectQuantity,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ saleOutOrderConfirm ~ error:', error)
        }

        const obj = {
          ...row,
          relateDocumentCode: orderNo,
          // relateRowId: saleOrderMaterial?.id,
          // relateRowLineNum: saleOrderMaterial?.lineNumber,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    },
    // 生产订单确定
    async productOrderConfirm(rows) {
      this.loading = true
      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
        const { productOrderNumber, productOrderMaterial = {}} = row
        const params = {
          type: this.baseForm.type,
          materialId: productOrderMaterial?.materialFields?.id,
          materialCode: productOrderMaterial?.materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        const inspectQuantity = productOrderMaterial.planQuantity || 0
        try {
          const params1 = {
            num: inspectQuantity,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ productOrderConfirm ~ error:', error)
        }

        const obj = {
          ...row,
          relateDocumentCode: productOrderNumber,
          relateRowId: productOrderMaterial?.id,
          relateRowLineNum: productOrderMaterial?.lineNumber,
          materialCode: productOrderMaterial?.materialFields?.code,
          materialId: productOrderMaterial?.materialFields?.id,
          materialName: productOrderMaterial?.materialFields?.name,
          materialStandard: productOrderMaterial?.materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    },
    // 采购退料单确定
    async purchaseReturnConfirm(rows) {
      this.loading = true
      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
        const { returnCode, materialFields = {}, lineMaterialEntities = {}} = row
        const params = {
          type: this.baseForm.type,
          materialId: materialFields?.id,
          materialCode: materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        const inspectQuantity = lineMaterialEntities.amount || 0
        try {
          const params1 = {
            num: inspectQuantity,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ purchaseReturnConfirm ~ error:', error)
        }

        const obj = {
          ...row,
          relateDocumentCode: returnCode,
          relateRowId: lineMaterialEntities.id,
          relateRowLineNum: lineMaterialEntities.lineNumber,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    },
    // 发货通知单确定
    async deliveryOrderConfirm(rows) {
      this.loading = true
      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
        const { sendNumber, materialFields = {}} = row
        const params = {
          type: this.baseForm.type,
          materialId: materialFields?.id,
          materialCode: materialFields?.code
        }
        const res = await getSchemeByMaterial(params)
        const schemeItem = res.data?.data[0] || {}
        const samplePlanEntity = schemeItem?.samplePlanEntity || {}

        // 根据方案查送检数量
        let samplingQuantity = 0
        const inspectQuantity = row.amount || 0
        try {
          const params1 = {
            num: inspectQuantity,
            schemeId: schemeItem?.schemeId
          }
          if (params1.num && params1.schemeId) {
            const result = await getSampleNumByScheme(params1)
            samplingQuantity = result.data?.data?.sampleNum || 0
          }
        } catch (error) {
          console.log('🚀 ~ deliveryOrderConfirm ~ error:', error)
        }

        const obj = {
          ...row,
          relateDocumentCode: sendNumber,
          //   relateRowId: id,
          //   relateRowLineNum: lineNumber,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          inspectQuantity,
          samplingQuantity,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          materialDecisions: [],
          materialNums: [],
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    }
  }
}
