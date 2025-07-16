import type { RouteRecordRaw } from 'vue-router';



import ChannelView from '@/views/integration/ChannelView.vue';
import BotView from '@/views/integration/bot/BotView.vue';
import InstagramChannelView from '@/views/integration/instagram/InstagramChannelView.vue';
import TelegramCreateChannelView from '@/views/integration/telegram/TelegramCreateChannelView.vue';
import TelegramView from '@/views/integration/telegram/TelegramView.vue';
import WhatsappChannelView from '@/views/integration/whatsapp/WhatsappChannelView.vue';
import WidgetChannel from '@/views/integration/widget/WidgetChannelView.vue';
import WidgetCreateChannelView from '@/views/integration/widget/WidgetCreateChannelView.vue';
import WidgetDetailView from '@/views/integration/widget/WidgetDetailView.vue';





// Ensure RouteRecordRaw is imported

// This array explicitly defines your integration routes.
// It is correctly typed as RouteRecordRaw[].
export const integrationRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: ChannelView,
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    redirect: { name: 'whatsapp-list' },
    children: [
      {
        path: '', // Full path: /qiscus
        name: 'whatsapp-list',
        component: WhatsappChannelView,
      },
      // wip
      {
        path: ':id', // Full path: /qiscus/:id
        name: 'whatsapp-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=whatsapp&id=${to.params.id}`;
          return false;
        },
      },
      {
        path: 'create', // Full path: /qiscus/create
        name: 'whatsapp-new',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=whatsapp`;
          return false;
        },
      },
    ],
  },
  {
    path: '/instagram',
    name: 'instagram',
    redirect: { name: 'instagram-list' },
    children: [
      {
        path: '',
        name: 'instagram-list',
        component: InstagramChannelView,
      },
      {
        path: 'create',
        name: 'instagram-new',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=instagram`;
          return false;
        },
      },
      {
        path: ':id',
        name: 'instagram-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=instagram&id=${to.params.id}`;
          return false;
        },
      },
    ],
  },
  {
    path: '/tiktok',
    name: 'tiktok',
    redirect: { name: 'tiktok-list' },
    children: [
      {
        path: '',
        name: 'tiktok-list',
        component: () => import('@/views/integration/tiktok/TiktokChannelView.vue'),
      },
      {
        path: 'create',
        name: 'tiktok-new',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=tiktok`;
          return false;
        },
      },
      {
        path: ':id',
        name: 'tiktok-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=tiktok&id=${to.params.id}`;
          return false;
        },
      }
    ],
  },
  {
    path: '/facebook',
    name: 'facebook',
    redirect: { name: 'facebook-list' },
    children: [
      {
        path: '',
        name: 'facebook-list',
        component: () => import('@/views/integration/facebook/FbChannelView.vue'),
      },
      {
        path: 'create',
        name: 'facebook-new',
        component: () => null,
        beforeEnter: () => {
          window.location.href = `/integration?ch=facebook`;
          return false;
        },
      },
      {
        path: ':id',
        name: 'facebook-detail',
        component: () => null,
        beforeEnter: (to) => {
          window.location.href = `/integration?ch=facebook&id=${to.params.id}`;
          return false;
        },
      },
    ],
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
  // {
  //   path: '/telegram',
  //   name: 'telegram',
  //   component: () => TelegramView, // This route is a placeholder for custom channel integration
  // beforeEnter: () => {
  //   window.location.href = `/integration?ch=telegram`;
  //   return false;
  // },
  // },
  {
    path: '/telegram',
    name: 'telegram',
    redirect: { name: 'telegram-detail' },
    children: [
      {
        path: '',
        name: 'telegram-detail',
        component: TelegramView,
      },
      {
        path: 'create', // Full path: /telegram/create
        name: 'telegram-create',
        component: TelegramCreateChannelView,
      },
    ],
  },
  {
    path: '/qiscus',
    name: 'qiscus',
    // This is an internal Vue Router redirect, staying within the SPA.
    redirect: { name: 'qiscus-list' },
    children: [
      {
        path: '', // Full path: /qiscus
        name: 'qiscus-list',
        component: WidgetChannel,
      },
      {
        path: ':id', // Full path: /qiscus/:id
        name: 'qiscus-detail',
        component: WidgetDetailView,
        props: true, // Pass route params as props to the component
      },
      {
        path: 'create', // Full path: /qiscus/create
        name: 'qiscus-create',
        component: WidgetCreateChannelView,
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
    path: '/bot-integration',
    name: 'bot-integration',
    component: BotView,
  },
];

export default integrationRoutes;