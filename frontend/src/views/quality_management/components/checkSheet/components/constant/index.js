export const COLUMNS = {
  workOrder: [
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
  ],

  purchaseOrder: [
    {
      prop: 'purchaseCode',
      label: '采购订单号',
      minWidth: '180',
      filterBoxType: 'input'
    },
    //   {
    //     prop: 'state',
    //     label: '状态',
    //     minWidth: '150',
    //     options: [],
    //     optionsRequestConfig: {
    //       url: '/ams/purchases/state',
    //       method: 'get',
    //       labelKey: 'name',
    //       valueKey: 'code'
    //     },
    //     filterBoxType: 'select',
    //     key: 'state',
    //     columnType: 'bodySlot',
    //     checked: true
    //   },
    {
      prop: 'relatedTypeName',
      label: '关联单据类型',
      minWidth: '150',
      checked: true
    },

    {
      prop: 'requestCode',
      label: '关联单据编号',
      minWidth: '150',
      filterBoxType: 'input',
      checked: true
    },

    {
      prop: 'code',
      label: '物料编码',
      minWidth: '150',
      filterBoxType: 'input',
      checked: true,
      outSideKey: 'materialFields',
      multilevelkey: 'materialFields.code'
    },
    {
      prop: 'name',
      label: '物料名称',
      minWidth: '150',
      filterBoxType: 'input',
      checked: true,
      outSideKey: 'materialFields',
      multilevelkey: 'materialFields.name'
    },
    {
      prop: 'standard',
      label: '物料规格',
      minWidth: '150',
      filterBoxType: 'input',
      checked: true,
      outSideKey: 'materialFields',
      multilevelkey: 'materialFields.standard'
    },
    {
      prop: 'comp',
      label: '单位',
      minWidth: '150',
      filterBoxType: 'input',
      checked: true,
      outSideKey: 'materialFields',
      multilevelkey: 'materialFields.comp'
    }
  ],
  receiveOrder: [
    {
      prop: 'receiptCode',
      label: '收料单号',
      minWidth: '180',
      filterBoxType: 'input',
      checked: true
    },

    {
      prop: 'purchaseCode',
      label: '采购订单号',
      minWidth: '180',
      filterBoxType: 'input',
      checked: true
    },

    {
      prop: 'code',
      label: '物料编码',
      filterBoxType: 'input',
      minWidth: '150',
      checked: true,
      outSideKey: 'materialFields',
      multilevelkey: 'materialFields.code'
    },
    {
      prop: 'name',
      label: '物料名称',
      filterBoxType: 'input',
      outSideKey: 'materialFields',
      minWidth: '150',
      checked: true,
      multilevelkey: 'materialFields.name'
    },
    {
      prop: 'standard',
      label: '物料规格',
      minWidth: '150',
      filterBoxType: 'input',
      outSideKey: 'materialFields',
      checked: true,
      multilevelkey: 'materialFields.standard'
    }
  ],

  productPickMaterial: [
    {
      prop: 'orderNumber',
      label: '领料单号',
      minWidth: '200',
      filterBoxType: 'input'
    },
    {
      prop: 'code',
      label: '物料编码',
      filterBoxType: 'input',
      minWidth: '150',
      checked: true,
      outSideKey: 'materialFields',
      multilevelkey: 'materialFields.code'
    },
    {
      prop: 'name',
      label: '物料名称',
      filterBoxType: 'input',
      outSideKey: 'materialFields',
      minWidth: '150',
      checked: true,
      multilevelkey: 'materialFields.name'
    },
    {
      prop: 'standard',
      label: '物料规格',
      minWidth: '150',
      filterBoxType: 'input',
      outSideKey: 'materialFields',
      checked: true,
      multilevelkey: 'materialFields.standard'
    }
  ],

  productPatchMaterial: [
    {
      prop: 'orderNumber',
      label: '补料单号',
      minWidth: '200',
      filterBoxType: 'input'
    },
    {
      prop: 'code',
      label: '物料编码',
      filterBoxType: 'input',
      minWidth: '150',
      checked: true,
      outSideKey: 'materialFields',
      multilevelkey: 'materialFields.code'
    },
    {
      prop: 'name',
      label: '物料名称',
      filterBoxType: 'input',
      outSideKey: 'materialFields',
      minWidth: '150',
      checked: true,
      multilevelkey: 'materialFields.name'
    },
    {
      prop: 'standard',
      label: '物料规格',
      minWidth: '150',
      filterBoxType: 'input',
      outSideKey: 'materialFields',
      checked: true,
      multilevelkey: 'materialFields.standard'
    }
  ],

  checkOrder: [
    {
      prop: 'inspectionSheetCode',
      label: '送检单号',
      minWidth: '200',
      filterBoxType: 'input'
    },
    {
      prop: 'inspectionSheetTypeName',
      label: '送检类型',
      minWidth: '200',
      filterBoxType: 'input'
    },
    {
      prop: 'inspectionSheetTypeName',
      label: '关联单据类型',
      minWidth: '200',
      options: [],
      optionsRequestConfig: {
        url: '/qms/enums/get/doc/type',
        method: 'get',
        labelKey: 'name',
        valueKey: 'code'
      },
      filterBoxType: 'select',
      key: 'documentTypes'
    },

    {
      prop: 'code',
      label: '物料编码',
      filterBoxType: 'input',
      key: 'materialCode',
      minWidth: '150',
      checked: true,

      multilevelkey: 'materialFields.code'
    },
    {
      prop: 'name',
      label: '物料名称',
      key: 'materialName',
      filterBoxType: 'input',

      minWidth: '150',
      checked: true,
      multilevelkey: 'materialFields.name'
    },
    {
      prop: 'standard',
      label: '物料规格',
      key: 'materialStandard',
      minWidth: '150',
      filterBoxType: 'input',

      checked: true,
      multilevelkey: 'materialFields.standard'
    }
  ]
}
