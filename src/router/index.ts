import type { RouteRecordRaw, Router } from 'vue-router';
import { createRouter as createVueRouter, createWebHistory } from 'vue-router';

import WidgetLayout from '@/pages/integration/widget/WidgetLayout.vue';
import AutoResponder from '@/views/AutoResponder.vue';
import Home from '@/views/integration/ChannelPage.vue';
import QiscusCreateChannelView from '@/views/integration/QiscusCreateChannelView.vue';
import QiscusListChannelView from '@/views/integration/QiscusListChannelView.vue';

export function createRouter(appId?: string | number): Router {
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/whatsapp',
      name: 'whatsapp',
      component: QiscusListChannelView,
    },
    {
      path: '/instagram',
      name: 'instagram',
      beforeEnter: () => {
        window.location.href = `/integration?channel=instagram`;
        return false;
      },
    },
    {
      path: '/tiktok',
      name: 'tiktok',
      beforeEnter: () => {
        window.location.href = `/integration?channel=tiktok`;
        return false;
      },
    },
    {
      path: '/facebook',
      name: 'facebook',
      beforeEnter: () => {
        window.location.href = `/integration?channel=facebook",`;
        return false;
      },
    },
    {
      path: '/line',
      name: 'line',
      beforeEnter: () => {
        window.location.href = `/integration?channel=line",`;
        return false;
      },
    },
    {
      path: '/telegram',
      name: 'telegram',
      beforeEnter: () => {
        window.location.href = `/integration?channel=telegram",`;
        return false;
      },
    },
    {
      path: '/qiscus',
      name: 'qiscus',
      component: QiscusListChannelView,
    },
    {
      path: '/qiscus/:channelId',
      name: 'QiscusChannelDetail',
      component: WidgetLayout,
    },
    {
      path: '/qiscus/create',
      name: 'qiscusCreate',
      component: QiscusCreateChannelView,
    },
    {
      path: '/custom_channel',
      name: 'custom_channel',
      beforeEnter: () => {
        window.location.href = `/integration?channel=custom_channel`;
        return false;
      },
    },
    {
      path: '/bot_integration',
      name: 'bot_integration',
      beforeEnter: () => {
        window.location.href = `/integration?channel=bot_integration`;
        return false;
      },
    },
    {
      path: '/auto-responder',
      name: 'auto-responder',
      component: AutoResponder,
    },
    // {
    //   path: '/home',
    //   name: 'HomeView',
    //   component: () => import('../views/HomeView.vue'),
    // },
    {
      path: '/post',
      name: 'PostView',
      component: () => import('../views/PostView.vue'),
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

  const VUE_ROUTER_BASE_PATH = dynamicAppId ? `/web/${dynamicAppId}/new-integration/` : '/';

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
