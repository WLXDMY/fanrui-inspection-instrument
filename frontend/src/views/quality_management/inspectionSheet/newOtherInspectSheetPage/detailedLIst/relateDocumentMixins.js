/*
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-07-30 09:54:53
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-05-09 17:40:08
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionSheet\commonPage\detailedLIst\relateDocumentMixins.js
 * @Description: 不推荐使用mixins 这里是为了关联单据的相关逻辑放到一个文件中管理 避免detailedList文件太臃肿
 */
import { getSchemeByMaterial, getSampleNumByScheme, getAcceptValueByScheme, getDetailInspectionItemsWithSampleNum } from '@/api/quality-manage.js'
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

      // 新增后选中最后一个值,此时新增的数据已经在表格里面了，所以需要－1
      const clickIndex = this.formInline.detailTableData.length - 1
      this.$emit('update:clickIndex', clickIndex)
      // 这里需要重新选中一下 因为原本的占位行被删除了
      const row = this.formInline.detailTableData[this.clickIndex]
      if (!row) return
      this.$emit('update:currentRow', row)
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
        // 抽样数量
        let samplingQuantity = 0
        // 送检数量
        const inspectQuantity = row.barCount || row.planAmount || 0

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
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }
        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)
          if (!data || data.length === 0) {
            // return
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
                itemOptionList &&
                itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList.some(option => option.optionName === result))
                      .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }

              // let checkResult = row.defaultValue
              // const optionalValue = row.optionalValue?.split?.(',') || []
              // if (row.inputMode === 'multipleChoice') {
              //   checkResult = row.defaultValue?.split(',') || []
              // }
              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              // 解决stringency可能为0的情况
              let stringency = row.samplePlanEntity?.stringency
              if (stringency == null) {
                stringency = samplePlanEntity.stringency
              }

              const obj = {
                ...row,
                itemValues: itemValues,
                itemDefects: [],
                // 获取样次-检验项目里面的抽样方案
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: stringency,
                // stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                acceptValue: acceptValue || acceptValue2,
                refuseValue: refuseValue || refuseValue2,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                // optionalValue,
                itemOptionList,
                itemGuidanceFileList: row.itemFileList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
                // singleConclusion: row.defaultQualified ? 1 : ''
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          // 这个值保存物料信息
          materialFields: materialFields,
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
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity: row.barCount || row.planAmount || 0,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 由检验方案带出来样次
          materialNums: materialNums,
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
        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)
          if (!data || data.length === 0) {
            // return
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
                itemOptionList &&
                itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList.some(option => option.optionName === result))
                      .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }

              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              // 解决stringency可能为0的情况
              let stringency = row.samplePlanEntity?.stringency
              if (stringency == null) {
                stringency = samplePlanEntity.stringency
              }

              const obj = {
                ...row,
                itemValues: itemValues,
                itemDefects: [],
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: stringency,
                // stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                acceptValue: acceptValue || acceptValue2,
                refuseValue: refuseValue || refuseValue2,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                // optionalValue,
                itemOptionList,
                itemGuidanceFileList: row.itemFileList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
                // singleConclusion: row.defaultQualified ? 1 : ''
                // acceptValue,
                // refuseValue
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        console.log('采购订单 样次数据 ', materialNums)

        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          relateDocumentCode: purchaseCode,
          relateRowId: requestMaterialEntities[0]?.id,
          relateRowLineNum: requestMaterialEntities[0]?.lineNumber,
          // 这个值保存物料信息
          materialFields: materialFields,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 由检验方案带出来样次
          materialNums: materialNums,
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    },
    // 生产工单确定
    async workOrderConfirm(rows) {
      console.log('生产工单确定 111', rows)

      this.loading = true
      const rowData = []
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        delete row.id
        if (this.baseForm.type !== 'productionProcess' && this.baseForm.type !== 'processProceure') {
          console.log('生产工单确定 111 删除id', row?.craftId)
          delete row?.craftId
          // delete row?.workOrderNumber
        }

        const { workOrderId, workOrderNumber, materialFields } = row
        const params = {
          type: this.baseForm.type,
          materialId: materialFields?.id,
          materialCode: materialFields?.code
          // processProcedureId: row?.craftId
        }

        if (/^\d+$/.test(row?.procedureIds?.trim())) {
          console.log('procedureIds 只有一个值', row?.procedureIds)
          params.processProcedureId = row?.procedureIds
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
        console.log('123 送检数量的值 samplingQuantity', samplingQuantity)

        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }

          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)

          console.log('234 带出检验方案关联的检验项目', data)

          if (!data || data.length === 0) {
            // materialNums=[]
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
              itemOptionList &&
              itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList.some(option => option.optionName === result))
                      .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }
              // let checkResult = row.defaultValue
              // const optionalValue = row.optionalValue?.split?.(',') || []
              // if (row.inputMode === 'multipleChoice') {
              //   checkResult = row.defaultValue?.split(',') || []
              // }
              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              // 解决stringency可能为0的情况
              let stringency = row.samplePlanEntity?.stringency
              if (stringency == null) {
                stringency = samplePlanEntity.stringency
              }

              const obj = {
                ...row,
                itemValues: itemValues,
                itemDefects: [],
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: stringency,
                // stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                acceptValue: acceptValue || acceptValue2,
                refuseValue: refuseValue || refuseValue2,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                // optionalValue,
                itemOptionList,
                itemGuidanceFileList: row.itemFileList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
              // singleConclusion: row.defaultQualified ? 1 : ''
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          // 这个值保存物料信息
          materialFields: materialFields,
          relateDocumentCode: workOrderNumber,
          // 获取工序列表的id
          relateDocumentId: row.workOrderId,
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
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 由检验方案带出来样次
          materialNums: materialNums,
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

        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)
          if (!data || data.length === 0) {
            // return
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
              itemOptionList &&
              itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList.some(option => option.optionName === result))
                      .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }

              // let checkResult = row.defaultValue
              // const optionalValue = row.optionalValue?.split?.(',') || []
              // if (row.inputMode === 'multipleChoice') {
              //   checkResult = row.defaultValue?.split(',') || []
              // }
              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              // 解决stringency可能为0的情况
              let stringency = row.samplePlanEntity?.stringency
              if (stringency == null) {
                stringency = samplePlanEntity.stringency
              }

              const obj = {
                ...row,
                itemValues: itemValues,
                itemDefects: [],
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: stringency,
                // stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                acceptValue: acceptValue || acceptValue2,
                refuseValue: refuseValue || refuseValue2,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                // optionalValue,
                itemOptionList,
                itemGuidanceFileList: row.itemFileList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
              // singleConclusion: row.defaultQualified ? 1 : ''
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          relateDocumentCode: orderNumber,
          relateRowId: materialDetails[0]?.id,
          // relateRowLineNum: ,
          // 这个值保存物料信息
          materialFields: materialFields,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 由检验方案带出来样次
          materialNums: materialNums,
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
        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)
          if (!data || data.length === 0) {
            // return
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
              itemOptionList &&
              itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList.some(option => option.optionName === result))
                      .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }
              // let checkResult = row.defaultValue
              // const optionalValue = row.optionalValue?.split?.(',') || []
              // if (row.inputMode === 'multipleChoice') {
              //   checkResult = row.defaultValue?.split(',') || []
              // }
              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              // 解决stringency可能为0的情况
              let stringency = row.samplePlanEntity?.stringency
              if (stringency == null) {
                stringency = samplePlanEntity.stringency
              }

              const obj = {
                ...row,
                itemValues: itemValues,
                itemDefects: [],
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: stringency,
                // stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                acceptValue: acceptValue || acceptValue2,
                refuseValue: refuseValue || refuseValue2,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                // optionalValue,
                itemOptionList,
                itemGuidanceFileList: row.itemFileList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
              // singleConclusion: row.defaultQualified ? 1 : ''
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          relateDocumentCode: saleOrderNumber,
          // 这个值保存物料信息
          materialFields: saleOrderMaterial?.materialFields,
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
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 由检验方案带出来样次
          materialNums: materialNums,
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

        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)
          if (!data || data.length === 0) {
            // return
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
              itemOptionList &&
              itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList.some(option => option.optionName === result))
                      .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }
              // let checkResult = row.defaultValue
              // const optionalValue = row.optionalValue?.split?.(',') || []
              // if (row.inputMode === 'multipleChoice') {
              //   checkResult = row.defaultValue?.split(',') || []
              // }
              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              // 解决stringency可能为0的情况
              let stringency = row.samplePlanEntity?.stringency
              if (stringency == null) {
                stringency = samplePlanEntity.stringency
              }

              const obj = {
                ...row,
                itemValues: itemValues,
                // itemValues: [],
                itemDefects: [],
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: stringency,
                // stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                acceptValue: acceptValue || acceptValue2,
                refuseValue: refuseValue || refuseValue2,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                // optionalValue,
                itemOptionList,
                itemGuidanceFileList: row.itemFileList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
              // singleConclusion: row.defaultQualified ? 1 : ''
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          relateDocumentCode: orderNo,
          // relateRowId: saleOrderMaterial?.id,
          // relateRowLineNum: saleOrderMaterial?.lineNumber,
          // 这个值保存物料信息
          materialFields: materialFields,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 由检验方案带出来样次
          materialNums: materialNums,
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

        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)
          if (!data || data.length === 0) {
            // return
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
              itemOptionList &&
              itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList.some(option => option.optionName === result))
                      .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }
              // let checkResult = row.defaultValue
              // const optionalValue = row.optionalValue?.split?.(',') || []
              // if (row.inputMode === 'multipleChoice') {
              //   checkResult = row.defaultValue?.split(',') || []
              // }
              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              // 解决stringency可能为0的情况
              let stringency = row.samplePlanEntity?.stringency
              if (stringency == null) {
                stringency = samplePlanEntity.stringency
              }

              const obj = {
                ...row,
                itemValues: itemValues,
                itemDefects: [],
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: stringency,
                // stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                acceptValue: acceptValue || acceptValue2,
                refuseValue: refuseValue || refuseValue2,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                // optionalValue,
                itemOptionList,
                itemGuidanceFileList: row.itemFileList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
              // singleConclusion: row.defaultQualified ? 1 : ''
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          relateDocumentCode: productOrderNumber,
          // 这个值保存物料信息
          materialFields: productOrderMaterial.materialFields,
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
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 由检验方案带出来样次
          materialNums: materialNums,
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

        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)
          if (!data || data.length === 0) {
            // return
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
                itemOptionList &&
                itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList.some(option => option.optionName === result))
                      .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }
              // let checkResult = row.defaultValue
              // const optionalValue = row.optionalValue?.split?.(',') || []
              // if (row.inputMode === 'multipleChoice') {
              //   checkResult = row.defaultValue?.split(',') || []
              // }
              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              // 解决stringency可能为0的情况
              let stringency = row.samplePlanEntity?.stringency
              if (stringency == null) {
                stringency = samplePlanEntity.stringency
              }

              const obj = {
                ...row,
                itemValues: itemValues,
                itemDefects: [],
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: stringency,
                // stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                acceptValue: acceptValue || acceptValue2,
                refuseValue: refuseValue || refuseValue2,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                // optionalValue,
                itemOptionList,
                itemGuidanceFileList: row.itemFileList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
                // singleConclusion: row.defaultQualified ? 1 : ''
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          relateDocumentCode: returnCode,
          relateRowId: lineMaterialEntities.id,
          relateRowLineNum: lineMaterialEntities.lineNumber,
          // 这个值保存物料信息
          materialFields: materialFields,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 由检验方案带出来样次
          materialNums: materialNums,
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

        // 根据抽样方案和送检数量查出允收数/拒收数
        let acceptValue = 0
        let refuseValue = 0
        try {
          const params2 = {
            num: samplingQuantity,
            samplePlanId: schemeItem?.samplePlanId
          }
          if (params2.num && params2.samplePlanId) {
            const result2 = await getAcceptValueByScheme(params2)
            if (result2.data.status === 1) {
              const data = result2.data.data
              acceptValue = data.acceptValue
              refuseValue = data.refuseValue
            }
          }
        } catch (error) {
          console.log('🚀 ~ handleReceipConfirm ~ error:', error)
        }

        // 带出检验方案关联的检验项目 start
        const materialNums = []
        if (schemeItem.schemeId) {
          if (!schemeItem.schemeId) return
          const params = {
            num: samplingQuantity || 0,
            schemeId: schemeItem.schemeId
          }
          const {
            data: { data }
          } = await getDetailInspectionItemsWithSampleNum(params)
          if (!data || data.length === 0) {
            // return
          } else {
            const arr = []
            for (let index = 0; index < data.length; index++) {
              const row = data[index]
              // 获取选项
              const itemOptionList = row.itemOptionList && row.itemOptionList.filter(item => item.enableFlag)
              // 数组 多选
              let checkResult =
                itemOptionList &&
                itemOptionList.filter(item => item.enableFlag && item.defaultOptionFlag).map(item => item.optionName)

              if (row.inputMode === 'singleChoice') {
                checkResult = checkResult.join?.()
              }
              // 定性分析 默认选中检验项目判定
              let singleConclusion = row.defaultQualified ? 1 : ''
              if (row.analyzeMethodCode === 'qualitative') {
                const valArray = Array.isArray(checkResult) ? checkResult : [checkResult]
                const judgeFlagArray = [
                  ...new Set(
                    valArray
                      .filter(result => itemOptionList.some(option => option.optionName === result))
                      .map(result => itemOptionList.find(option => option.optionName === result).judgeFlag)
                  )
                ]
                if (judgeFlagArray.length > 0) {
                  if (row.inputMode === 'singleChoice') {
                    singleConclusion = judgeFlagArray[0]
                  } else if (row.inputMode === 'multipleChoice') {
                    if (judgeFlagArray.length === 1) {
                      singleConclusion = judgeFlagArray[0]
                    } else if (judgeFlagArray.length > 1) {
                      singleConclusion = 0
                    }
                  }
                }
              }
              // let checkResult = row.defaultValue
              // const optionalValue = row.optionalValue?.split?.(',') || []
              // if (row.inputMode === 'multipleChoice') {
              //   checkResult = row.defaultValue?.split(',') || []
              // }
              // 根据抽样方案和送检数量查出允收数/拒收数
              let acceptValue2 = 0
              let refuseValue2 = 0
              try {
                const params2 = {
                  num: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                  samplePlanId: row?.samplePlanId
                }
                if (params2.num && params2.samplePlanId) {
                  const result2 = await getAcceptValueByScheme(params2)
                  if (result2.data.status === 1) {
                    const data = result2.data.data
                    acceptValue2 = data.acceptValue
                    refuseValue2 = data.refuseValue
                  }
                }
              } catch (error) {
                console.log('🚀 ~ handleReceipConfirm ~ error:', error)
              }
              delete row.id

              // 获取样本检测值填写数组 start
              // 实际样本数
              const itemValues = []
              const actualQuality = row.actualQuality || row?.samplingQuantity || samplingQuantity || null
              // if (actualQuality > 0) {
              //   const itemValue = {
              //     // 输入方式
              //     inspectValue: checkResult,
              //     checkConclusion: singleConclusion,
              //     productCode: ''
              //   }
              //   for (let i = 0; i < actualQuality; i++) {
              //     itemValues.push(JSON.parse(JSON.stringify(itemValue)))
              //   }
              // }
              // 获取样本检测值填写数组 end

              // 解决stringency可能为0的情况
              let stringency = row.samplePlanEntity?.stringency
              if (stringency == null) {
                stringency = samplePlanEntity.stringency
              }

              const obj = {
                ...row,
                itemValues: itemValues,
                itemDefects: [],
                samplePlanId: row.samplePlanEntity?.id || samplePlanEntity.id,
                samplePlanName: row.samplePlanEntity?.name || samplePlanEntity.name,
                sampleType: row.samplePlanEntity?.type || samplePlanEntity.type,
                inspectLevel: row.samplePlanEntity?.inspectLevel || samplePlanEntity.inspectLevel,
                stringency: stringency,
                // stringency: row.samplePlanEntity?.stringency || samplePlanEntity.stringency,
                aqlValue: row.samplePlanEntity?.aqlValue || samplePlanEntity.aqlValue,
                samplingQuantity: row?.samplingQuantity || samplingQuantity || inspectQuantity,
                acceptValue: acceptValue || acceptValue2,
                refuseValue: refuseValue || refuseValue2,
                // 实际样本数
                actualQuality: actualQuality,
                // actualQuality: row.actualQuality || row?.samplingQuantity || samplingQuantity || null,
                itemId: row.itemId,
                itemName: row.itemName,
                analyzeMethod: row.analyzeMethodCode,
                defectLevel: row.defectLevel,
                itemGroupName: row.itemGroupName,
                comparator: row.itemComparator,
                upperLimitValue: row.itemUpperLimitValue,
                downLimitValue: row.itemDownLimitValue,
                // 上下公差
                upperTolerance: row.itemUpperTolerance,
                lowerTolerance: row.itemLowerTolerance,
                inspectionCondition: row.itemInspectionCondition,
                referenceValue: row.itemReferenceValue,
                importantInspection: row.importantInspection ? 1 : 0,
                required: row.required ? 1 : 0,
                recordInspectionValue: row.recordInspectionValue ? 1 : 0,
                checkResult,
                // optionalValue,
                itemOptionList,
                itemGuidanceFileList: row.itemFileList,
                singleConclusion,
                defaultQualified: row.defaultQualified ? 1 : ''
                // singleConclusion: row.defaultQualified ? 1 : ''
              }
              arr.push(obj)
            }
            if (arr.length > 0) {
              const obj = {
                name: `检验样次1`,
                // 样次关联的检验项目
                numItems: arr
              }
              materialNums.push(obj)
            }
          }
        }
        // 带出检验方案关联的检验项目 end

        const obj = {
          ...row,
          relateDocumentCode: sendNumber,
          //   relateRowId: id,
          //   relateRowLineNum: lineNumber,
          // 这个值保存物料信息
          materialFields: materialFields,
          materialCode: materialFields?.code,
          materialId: materialFields?.id,
          materialName: materialFields?.name,
          materialStandard: materialFields?.standard,
          // relateBatchType: 'purchase',
          relateBarCode: row.barCode,
          schemeId: schemeItem?.schemeId,
          schemeCode: schemeItem?.schemeCode,
          schemeName: schemeItem?.schemeName,
          schemeGuideFiles: schemeItem?.schemeFileEntities,
          inspectQuantity,
          samplingQuantity,
          acceptValue,
          refuseValue,
          samplePlanId: samplePlanEntity.id,
          samplePlanName: samplePlanEntity.name,
          inspectLevel: samplePlanEntity.inspectLevel,
          stringency: samplePlanEntity.stringency,
          aqlValue: samplePlanEntity.aqlValue,
          sampleType: samplePlanEntity.type,
          materialDecisions: [],
          // 由检验方案带出来样次
          materialNums: materialNums,
          materialDefects: [],
          inspectFiles: []
        }
        rowData.push(obj)
      }
      this.centralizedTreatment(rowData)
    }
  }
}
