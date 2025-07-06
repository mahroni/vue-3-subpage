import type { RouteRecordRaw, Router } from 'vue-router';
import { createRouter as createVueRouter, createWebHistory } from 'vue-router';

import NotFound from '@/views/NotFound.vue';

// routes
import integrationRoutes from './integration';

export function createRouter(appId?: string | number): Router {
  const routes = [
    ...integrationRoutes, // Import integration routes from integration.ts
    // {
    //   path: '/home',
    //   name: 'HomeView',
    //   component: () => import('../views/HomeView.vue'),
    // },
    // {
    //   path: '/post',
    //   name: 'PostView',
    //   component: () => import('../views/PostView.vue'),
    // },
    {
      path: '/:pathMatch(.*)*', // This matches anything
      name: 'NotFound',
      component: NotFound,
    },
  ];

  // Use the provided appId or fall back to window.vueAppBaseId
  let dynamicAppId = '';

  if (appId) {
    dynamicAppId = String(appId);
  } else if (typeof window !== 'undefined' && 'vueAppBaseId' in window && window.vueAppBaseId) {
    dynamicAppId = String(window.vueAppBaseId);
  }

  // console.log('ROUTER DEBUG: Using appId:', dynamicAppId);

  const VUE_ROUTER_BASE_PATH = dynamicAppId ? `/web/${dynamicAppId}/channels/` : '/';

  const router = createVueRouter({
    history: createWebHistory(VUE_ROUTER_BASE_PATH),
    routes: routes as RouteRecordRaw[],
  });

  return router;
}

// Declare global window property
declare global {
  interface Window {
    vueAppBaseId?: string | number;
  }
}
