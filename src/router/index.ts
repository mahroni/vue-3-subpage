import { createRouter as createVueRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import Home from '../views/ChannelPage.vue'

export function createRouter(appId?: string | number): Router {
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    }
  ]

  // Use the provided appId or fall back to window.vueAppBaseId
  let dynamicAppId = "";
  
  if (appId) {
    dynamicAppId = String(appId);
  } else if (typeof window !== 'undefined' && 'vueAppBaseId' in window && window.vueAppBaseId) {
    dynamicAppId = String(window.vueAppBaseId);
  }

  console.log("ROUTER DEBUG: Using appId:", dynamicAppId);

  const VUE_ROUTER_BASE_PATH = dynamicAppId ? `/web/${dynamicAppId}/new-integration/` : "/";
  
  const router = createVueRouter({
    history: createWebHistory(VUE_ROUTER_BASE_PATH),
    routes,
  });

  router.beforeEach((to, from, next) => {
    console.log("ROUTER DEBUG (4): Navigating from:", from.fullPath, "to:", to.fullPath);
    next();
  });

  router.afterEach((to) => {
    console.log("ROUTER DEBUG (5): Successfully navigated to:", to.fullPath);
  });

  return router;
}

// Declare global window property
declare global {
  interface Window {
    vueAppBaseId?: string | number;
  }
}