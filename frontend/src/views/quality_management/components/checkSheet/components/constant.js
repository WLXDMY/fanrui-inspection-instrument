/*
 * @Author: xqm 13697256625@163.com
 * @Date: 2023-08-17 16:21:57
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2023-10-16 12:29:30
 * @FilePath: \qms\src\views\inspection-manage\productInspection\checkSheet\components\constant.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const TABLE_CONFIG = [
  // {
  //   label: '样次id',
  //   prop: ' inspectionNumId'
  // },
  {
    label: '检验项目组',
    prop: 'inspectionItemGroupName'
  },
  {
    label: '检验项目名称',
    prop: 'inspectionItemName'
  },
  {
    label: '检验结果',
    prop: 'examineValue',
    modelType: 'select'
  },
  {
    label: '抽检方式',
    prop: 'inspectionMethod'
  },
  {
    label: '方法判定',
    prop: 'determinationOfDetectionMethodName'
  },
  {
    label: '标准值/边界值',
    prop: 'itemReferenceValue'
  },
  {
    label: '比较符',
    prop: 'itemComparatorName'
  },
  {
    label: '上限值',
    prop: 'itemUpperLimitValue'
  },
  {
    label: '下限值',
    prop: 'itemDownLimitValue'
  },
  {
    label: '参考结论',
    prop: 'examineResult;'
  },
  {
    label: '单项结论',
    prop: 'standardResult',
    select: true
  },
  {
    label: '复检结论',
    prop: 'recheckResult',
    select: true
  },
  {
    label: '检验附件',
    prop: 'recordPictures',
    width: 200,
    imgs: true
  },
  {
    label: '检验备注',
    input: true,
    prop: 'remark'
  }
  // {
  //   label: '输入方式 (下拉选)',
  //   prop: 'inputMode'
  // },
  // {
  //   label: '可选值',
  //   prop: 'itemOptionalValue'
  // }
]

export const workOrderColumns = [
  {
    prop: 'workOrderNumber',
    label: '工单编号',
    minWidth: '200',
    filterBoxType: 'input'
  },
  {
    prop: 'workOrderName',
    label: '工单名称',
    minWidth: '200',
    filterBoxType: 'input'
  },
  {
    prop: 'productOrderNumber',
    label: '生产订单',
    minWidth: '200',
    filterBoxType: 'input'
  },
  {
    prop: 'name',
    label: '物料名称',
    minWidth: '200',
    filterBoxType: 'input',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.name'
  },
  {
    prop: 'code',
    label: '物料编码',
    minWidth: '200',
    filterBoxType: 'input',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.code'
  }
]

export const productOrderColumns = [
  {
    prop: 'productOrderNumber',
    label: '生产订单',
    minWidth: '200',
    filterBoxType: 'input'
  },
  {
    prop: 'workOrderNumber',
    label: '工单编号',
    minWidth: '200',
    filterBoxType: 'input'
  },
  {
    prop: 'workOrderName',
    label: '工单名称',
    minWidth: '200',
    filterBoxType: 'input'
  },
  {
    prop: 'name',
    label: '物料名称',
    minWidth: '200',
    filterBoxType: 'input',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.name'
  },
  {
    prop: 'code',
    label: '物料编码',
    minWidth: '200',
    filterBoxType: 'input',
    outSideKey: 'materialFields',
    multilevelkey: 'materialFields.code'
  }
]

export const checkSheetMaterialColumns = [
  {
    prop: 'inspectionSheetId',
    label: '产品检验单id',
    minWidth: '100',
    checked: false
  },
  {
    prop: 'inspectionSheetNumber',
    label: '产品检验单号',
    minWidth: '100',
    checked: false
  },
  {
    prop: 'relateOrderMaterialRowId',
    label: '关联单据的物料行id',
    minWidth: '100',
    checked: false
  },
  {
    prop: 'materialId',
    label: '物料id',
    minWidth: '100',
    checked: false
  },
  {
    prop: 'materialCode',
    label: '物料编码',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'materialName',
    label: '物料名称',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'materialStandard',
    label: '物料规格',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'comp',
    label: '单位',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'inspectionSchemeId',
    label: '检验方案id',
    minWidth: '100',
    checked: false
  },
  {
    prop: 'inspectionSchemeName',
    label: '检验方案名称',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'acceptanceQualityLimit',
    label: 'AQL值',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'inspectionLevel',
    label: '检验水平',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'inspectionLevelName',
    label: '检验水平名称',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'strictLevel',
    label: '严宽水平',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'materialBatch',
    label: '物料批次号',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'originalQuantity',
    label: '送检数量',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'samplingQuantity',
    label: '抽样数量',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'qualifiedQuantity',
    label: '合格数量',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'unqualifiedQuantity',
    label: '不合格数量',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'checkResult',
    label: '检验结论',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'remark',
    label: '备注',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'materialFields',
    label: '物料字段',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'operate',
    label: '操作',
    minWidth: '100',
    fixed: 'right',
    checked: true
  }
]

export const checkSheetBadInfoColumns = [
  {
    prop: 'inspectionSheetId',
    label: '送检单id',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectId',
    label: '不良id',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectQuantity',
    label: '不良数量',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'remark',
    label: '备注',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectCode',
    label: '不良定义编号',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectName',
    label: '不良定义名称',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectType',
    label: '不良类型',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'defectTypeName',
    label: '不良类型名称',
    minWidth: '100',
    checked: true
  }
]

export const checkSheetAttListColumns = [
  {
    prop: 'id',
    label: '主键',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'inspectionSheetId',
    label: '送检单id',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'inspectionNumId',
    label: '样次id',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'name',
    label: '文件名',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'url',
    label: '文件路径',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'createBy',
    label: '创建人',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'type',
    label: '图片类型',
    minWidth: '100',
    checked: true
  },
  {
    prop: 'inspectionNum',
    label: '对应样次',
    minWidth: '100',
    checked: true
  }
]
