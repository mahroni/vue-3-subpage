import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface AppConfig {
  userToken: string
  appId: string
  appVersion: string
}

export const useAppConfigStore = defineStore('appConfig', () => {
  // State
  const userToken = ref<string>('')
  const appId = ref<string>('')
  const appVersion = ref<string>('')

  // Getters
  const isConfigured = () => {
    return !!(userToken.value && appId.value && appVersion.value)
  }

  const getHeaders = () => {
    return {
      'Authorization': userToken.value,
      'APP_ID': appId.value,
      'Qiscus-App-Id': appId.value,
      'App-Version': appVersion.value
    }
  }

  // Actions
  const setConfig = (config: AppConfig) => {
    userToken.value = config.userToken
    appId.value = config.appId
    appVersion.value = config.appVersion
  }

  const setUserToken = (token: string) => {
    userToken.value = token
  }

  const setAppId = (id: string) => {
    appId.value = id
  }

  const setAppVersion = (version: string) => {
    appVersion.value = version
  }

  const clearConfig = () => {
    userToken.value = ''
    appId.value = ''
    appVersion.value = ''
  }

  return {
    // State
    userToken,
    appId,
    appVersion,
    
    // Getters
    isConfigured,
    getHeaders,
    
    // Actions
    setConfig,
    setUserToken,
    setAppId,
    setAppVersion,
    clearConfig
  }
}) 