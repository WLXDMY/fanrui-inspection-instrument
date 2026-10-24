import axios from 'axios'
import store from '@/store'
import { getToken, getTokenType } from '@/utils/auth'
import { ensureUploadRuntime, getUploadExtensionBaseUrl } from '@/utils/upload-runtime'

const extensionRequest = axios.create({
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
})

extensionRequest.interceptors.request.use(async config => {
  await ensureUploadRuntime()
  config.baseURL = getUploadExtensionBaseUrl()
  const tokenType = getTokenType() || 'Bearer'
  const token = store.getters.token || getToken()
  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`
  }
  const runningStatus = localStorage.getItem('yelinkEnv')
  if (runningStatus) {
    config.headers['Running-Status'] = runningStatus
  }
  return config
})

extensionRequest.interceptors.response.use(
  response => response,
  async error => {
    const config = error && error.config
    const method = String(config && config.method || '').toLowerCase()
    const isNetworkOrTimeout = !error.response || error.code === 'ECONNABORTED'
    if (config && method === 'get' && isNetworkOrTimeout && !config.__runtimeRetried) {
      config.__runtimeRetried = true
      await ensureUploadRuntime({ forceRefresh: true })
      config.baseURL = getUploadExtensionBaseUrl()
      return extensionRequest(config)
    }
    return Promise.reject(error)
  }
)

export function getFieldDefinitions() {
  return extensionRequest.get('/field-definitions').then(response => response.data)
}

export function createFieldDefinition(data) {
  return extensionRequest.post('/field-definitions', data).then(response => response.data)
}

export function updateFieldDefinition(id, data) {
  return extensionRequest
    .put(`/field-definitions/${encodeURIComponent(id)}`, data)
    .then(response => response.data)
}

export function disableFieldDefinition(id) {
  return extensionRequest
    .delete(`/field-definitions/${encodeURIComponent(id)}`)
    .then(response => response.data)
}

export function synchronizeInstrument(sourceInstrumentId) {
  return extensionRequest
    .post(`/instruments/${encodeURIComponent(sourceInstrumentId)}/sync`)
    .then(response => response.data)
}

export function getInstrumentExtension(sourceInstrumentId) {
  return extensionRequest
    .get(`/instruments/${encodeURIComponent(sourceInstrumentId)}/extension`)
    .then(response => response.data)
}

export function saveInstrumentExtension(sourceInstrumentId, data) {
  return extensionRequest
    .put(`/instruments/${encodeURIComponent(sourceInstrumentId)}/extension`, data)
    .then(response => response.data)
}
