import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter } from './router'

// interface QiscusAppConfig {
//   appId?: string | number;
//   basePath?: string;
//   // Add other configuration options as needed
// }

export function createQiscusApp(container: string | Element, appId?: string | number) {
  const app = createApp(App)
  
  // Create router with the provided appId
  const router = createRouter(appId)
  app.use(router)
  
  const mountElement = typeof container === 'string' ? document.querySelector(container) : container
  if (mountElement) {
    app.mount(mountElement)
  }
  
  return app
}

// Alternative function that accepts a config object
// export function createQiscusAppWithConfig(container: string | Element, config: QiscusAppConfig = {}) {
//   return createQiscusApp(container, config.appId)
// }

// Auto-mount if #app exists (for development)
if (document.querySelector('#app')) {
  createQiscusApp('#app')
}
