import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { createRouter } from './router';
import { useAppConfigStore } from './stores/app-config';

import 'sweetalert2/dist/sweetalert2.min.css';
import '@/assets/css/sweet-alert-custom.css';

import './assets/css/tailwind.css';
import './assets/css/style.css';

export interface QiscusAppConfig {
  userToken: string;
  appId: string;
  appVersion: string;
}

export function createOmnichannelApp(
  container: string | Element,
  config: QiscusAppConfig
) {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);

  if (config) {
    const appConfigStore = useAppConfigStore();
    appConfigStore.setConfig(config);
  }

  // Create router with the provided appId
  const router = createRouter(config.appId);
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
  createOmnichannelApp('#app', {
    userToken: import.meta.env.VITE_QISCUS_USER_TOKEN,
    appId: import.meta.env.VITE_QISCUS_APP_ID,
    appVersion: import.meta.env.VITE_QISCUS_APP_VERSION,
  });
}