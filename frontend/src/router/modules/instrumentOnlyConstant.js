// 上传包不编译无关页面和图片；非法地址统一回到检验仪器列表。
export default [
  {
    path: '*',
    redirect: '/inspection-manage/qms-product-inspection/instrument',
    hidden: true
  }
]
