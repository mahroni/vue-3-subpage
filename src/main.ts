import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { createRouter } from './router';
import { useAppConfigStore } from './stores/app-config';

import './assets/css/tailwind.css';
import './assets/css/style.css';

export interface QiscusAppConfig {
  userToken: string;
  appId: string;
  appVersion: string;
}

export function createQiscusApp(
  container: string | Element,
  appId?: string | number,
  config?: QiscusAppConfig
) {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);

  // Initialize app configuration if provided
  if (config) {
    const appConfigStore = useAppConfigStore();
    appConfigStore.setConfig(config);
  }

  // Create router with the provided appId
  const router = createRouter(appId);
  app.use(router);

  const mountElement =
    typeof container === 'string' ? document.querySelector(container) : container;
  if (mountElement) {
    app.mount(mountElement);
  }

  return app;
}

// Auto-mount if #app exists (for development)
if (document.querySelector('#app')) {
  createQiscusApp('#app');
}
