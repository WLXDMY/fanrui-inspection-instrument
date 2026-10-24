const {
  VUE_APP_SUB_WAREHOUSE_NAME,
  VUE_APP_SUB_WAREHOUSE_ENTRY
} = process.env
const isProd = process.env.NODE_ENV === 'production'

const configs = [
  {
    name: VUE_APP_SUB_WAREHOUSE_NAME,
    url: VUE_APP_SUB_WAREHOUSE_ENTRY,
    baseroute: `/${VUE_APP_SUB_WAREHOUSE_NAME}`
  }
]

// 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
if (isProd) {
  configs.forEach(item => {
    item.url = `${window.location.origin}/${item.url}`
  })
} else {
  const { protocol, hostname } = window.location
  if (window.__MICRO_APP_ENVIRONMENT__) {
    configs.forEach(item => {
      item.url = `${protocol}//${hostname}:${item.url}`
    })
  } else {
    configs.forEach(item => {
      item.url = `${protocol}//${hostname}:${item.url}`
      item.name = item.name?.replace('systemmanagement/', '')
      item.baseroute = item.baseroute.replace('systemmanagement/', '')
    })
  }
}

export default configs
