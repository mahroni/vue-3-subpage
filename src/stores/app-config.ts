import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface AppConfig {
  userToken: string;
  appId: string;
  appVersion: string;
  sdkUserId: string;
  userSdkToken: string;
}

export const useAppConfigStore = defineStore('appConfig', () => {
  // State
  const userToken = ref<string>('');
  const appId = ref<string>('');
  const appVersion = ref<string>('');
  const sdkUserId = ref<string>('');
  const userSdkToken = ref<string>('');

  // Getters
  const isConfigured = () => {
    return !!(userToken.value && appId.value && appVersion.value);
  };

  const getHeaders = () => {
    return {
      Authorization: userToken.value,
      APP_ID: appId.value,
      'Qiscus-App-Id': appId.value,
      'App-Version': appVersion.value,
    };
  };

  const getHeadersSdk = () => {
    return {
      qiscus_sdk_app_id: appId.value,
      qiscus_sdk_user_id: sdkUserId.value,
      qiscus_sdk_token: userSdkToken.value,
    };
  };

  // Actions
  const setConfig = (config: AppConfig) => {
    userToken.value = config.userToken;
    appId.value = config.appId;
    appVersion.value = config.appVersion;
    sdkUserId.value = config.sdkUserId;
    userSdkToken.value = config.userSdkToken;
  };

  const setUserToken = (token: string) => {
    userToken.value = token;
  };

  const setAppId = (id: string) => {
    appId.value = id;
  };

  const setAppVersion = (version: string) => {
    appVersion.value = version;
  };

  const setSdkUserId = (id: string) => {
    sdkUserId.value = id;
  };

  const setUserSdkToken = (token: string) => {
    userSdkToken.value = token;
  };

  const clearConfig = () => {
    userToken.value = '';
    appId.value = '';
    appVersion.value = '';
    sdkUserId.value = '';
    userSdkToken.value = '';
  };

  return {
    // State
    userToken,
    appId,
    appVersion,

    // Getters
    isConfigured,
    getHeaders,
    getHeadersSdk,

    // Actions
    setConfig,
    setUserToken,
    setAppId,
    setAppVersion,
    setSdkUserId,
    setUserSdkToken,
    clearConfig,
  };
});
