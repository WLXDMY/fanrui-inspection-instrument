const isUploadPackage = process.env.VUE_APP_UPLOAD_PACKAGE === 'true'

let uploadRuntimePromise = null
let uploadRuntimeRefreshedAt = 0
const UPLOAD_RUNTIME_TTL = 30000

function normalizeBaseUrl(value) {
  return String(value || '').trim().replace(/\/+$/, '')
}

function splitAuthorization(value) {
  const rawValue = String(value || '').trim()
  const matched = rawValue.match(/^(Bearer|Basic)\s+(.+)$/i)
  if (!matched) {
    return {
      tokenType: localStorage.getItem('Token-Type') || 'Bearer',
      token: rawValue
    }
  }
  return { tokenType: matched[1], token: matched[2] }
}

async function readHostRuntime() {
  if (!isUploadPackage) return

  const bridge = window.flutter_inappwebview
  if (!bridge || typeof bridge.callHandler !== 'function') return

  const cachedToken = localStorage.getItem('Token')
  const hostAuthorization = splitAuthorization(await bridge.callHandler('getToken'))
  const authorization = hostAuthorization.token ? hostAuthorization : splitAuthorization(cachedToken)
  if (authorization.token) {
    localStorage.setItem('Token', authorization.token)
    localStorage.setItem('Token-Type', authorization.tokenType)
  }

  const baseUrl = normalizeBaseUrl(await bridge.callHandler('getBaseurl'))
  if (baseUrl) localStorage.setItem('baseUrl', baseUrl)
}

export function ensureUploadRuntime({ forceRefresh = false } = {}) {
  if (!isUploadPackage) return Promise.resolve()
  const expired = Date.now() - uploadRuntimeRefreshedAt >= UPLOAD_RUNTIME_TTL
  if (forceRefresh || expired || !uploadRuntimePromise) {
    uploadRuntimeRefreshedAt = Date.now()
    uploadRuntimePromise = readHostRuntime().catch(() => undefined)
  }
  return uploadRuntimePromise
}

export function getUploadFactoryBaseUrl() {
  if (!isUploadPackage) return process.env.VUE_APP_NGINX_PATH

  const runtimeBaseUrl = normalizeBaseUrl(localStorage.getItem('baseUrl'))
  if (runtimeBaseUrl) return `${runtimeBaseUrl}/factory/v1`

  return process.env.VUE_APP_NGINX_PATH
}

export function getUploadExtensionBaseUrl() {
  const fallback = process.env.VUE_APP_INSTRUMENT_EXTENSION_API || '/instrument-extension/api/v1'
  if (!isUploadPackage) return fallback

  const runtimeBaseUrl = normalizeBaseUrl(localStorage.getItem('baseUrl'))
  if (runtimeBaseUrl) return `${runtimeBaseUrl}/instrument-extension/api/v1`

  return fallback
}
