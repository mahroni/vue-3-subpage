import { ref } from 'vue';
import type { RouteRecordRaw, Router } from 'vue-router';
import { createRouter as createVueRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import NotFound from '@/views/NotFound.vue';

import integrationRoutes from './integration';

declare global {
  interface Window {
    vueAppBaseId?: string | number;
  }
}

// Export a reactive variable to hold the navigation direction
export const navigationDirection = ref<'back' | 'forward' | 'replace' | 'initial'>('initial');

/**
 * Creates and configures the Vue Router instance.
 * @param appId Optional ID for setting a dynamic base path.
 * @returns A configured Vue Router instance.
 */
export function createRouter(appId?: string | number): Router {
  const routes: RouteRecordRaw[] = [
    ...integrationRoutes,
    {
      path: '/home',
      name: 'SomeRoute',
      component: HomeView,
    },
    {
      // The catch-all route should always be at the end
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ];

  let dynamicAppId: string | undefined;

  if (appId) {
    dynamicAppId = String(appId);
  } else if (
    typeof window !== 'undefined' &&
    typeof window.vueAppBaseId !== 'undefined' &&
    window.vueAppBaseId !== null
  ) {
    dynamicAppId = String(window.vueAppBaseId);
  }

  // Determine the base path for the router history
  const VUE_ROUTER_BASE_PATH = dynamicAppId ? `/web/${dynamicAppId}/channels/` : '/';

  const router = createVueRouter({
    history: createWebHistory(VUE_ROUTER_BASE_PATH),
    routes: routes, // routes is already typed as RouteRecordRaw[]
  });

  if (typeof window !== 'undefined') {
    router.options.history.listen((_to, _from, info) => {
      navigationDirection.value = info.direction as 'back' | 'forward' | 'replace' | 'initial';
      console.log('History listen direction:', info.direction);
    });
  }

  router.beforeEach((_to, _from, next) => {
    console.log('BeforeEach - current navigation direction:', navigationDirection.value);
    next();
  });

  return router;
}
