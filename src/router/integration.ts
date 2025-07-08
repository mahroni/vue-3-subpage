import type { RouteRecordRaw } from 'vue-router';

import Home from '@/views/integration/ChannelPage.vue';
import QiscusListChannelView from '@/views/integration/QiscusListChannelView.vue';
import QiscusCreateChannelView from '@/views/integration/qiscus/QiscusCreateChannelView.vue';
import QiscusDetailView from '@/views/integration/qiscus/QiscusDetailView.vue';

// Ensure RouteRecordRaw is imported

// This array explicitly defines your integration routes.
// It is correctly typed as RouteRecordRaw[].
export const integrationRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    component: () => null, // This route is a placeholder for custom channel integration
    beforeEnter: () => {
      window.location.href = `/integration?ch=whatsapp`;
      return false; // Crucial: tells Vue Router to stop its internal navigation
    },
  },
  {
    path: '/instagram',
    name: 'instagram',
    component: () => null, // This route is a placeholder for custom channel integration
    beforeEnter: () => {
      window.location.href = `/integration?ch=instagram`;
      return false;
    },
  },
  {
    path: '/tiktok',
    name: 'tiktok',
    component: () => null, // This route is a placeholder for custom channel integration
    beforeEnter: () => {
      window.location.href = `/integration?ch=tiktok`;
      return false;
    },
  },
  {
    path: '/facebook',
    name: 'facebook',
    component: () => null, // This route is a placeholder for custom channel integration
    beforeEnter: () => {
      window.location.href = `/integration?ch=facebook`;
      return false;
    },
  },
  {
    path: '/line',
    name: 'line',
    component: () => null, // This route is a placeholder for custom channel integration
    beforeEnter: () => {
      window.location.href = `/integration?ch=line`;
      return false;
    },
  },
  {
    path: '/telegram',
    name: 'telegram',
    component: () => null, // This route is a placeholder for custom channel integration
    beforeEnter: () => {
      window.location.href = `/integration?ch=telegram`;
      return false;
    },
  },
  {
    path: '/qiscus',
    name: 'qiscus',
    // This is an internal Vue Router redirect, staying within the SPA.
    redirect: { name: 'qiscusList' },
    children: [
      {
        path: '', // Full path: /qiscus
        name: 'qiscusList',
        component: QiscusListChannelView,
      },
      {
        path: ':id', // Full path: /qiscus/:id
        name: 'qiscusDetail',
        component: QiscusDetailView,
        props: true, // Pass route params as props to the component
      },
      {
        path: 'create', // Full path: /qiscus/create
        name: 'qiscusCreate',
        component: QiscusCreateChannelView,
      },
    ],
  },
  {
    path: '/custom_channel',
    name: 'custom_channel',
    component: () => null, // This route is a placeholder for custom channel integration
    beforeEnter: () => {
      window.location.href = `/integration?ch=custom_channel`;
      return false;
    },
  },
  {
    path: '/bot_integration',
    name: 'bot_integration',
    component: () => null, // This route is a placeholder for custom channel integration
    beforeEnter: () => {
      window.location.href = `/integration?ch=bot_integration`;
      return false;
    },
  },
];

export default integrationRoutes;
