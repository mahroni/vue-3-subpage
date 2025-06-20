import { createApp } from 'vue'

import App from './App.vue'
import { createRouter } from './router'

import './assets/css/tailwind.css'
import './assets/css/style.css'

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

// Auto-mount if #app exists (for development)
if (document.querySelector('#app')) {
  createQiscusApp('#app')
}
