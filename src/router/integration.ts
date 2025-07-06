import Home from '@/views/integration/ChannelPage.vue';
import QiscusListChannelView from '@/views/integration/QiscusListChannelView.vue';
import QiscusCreateChannelView from '@/views/integration/qiscus/QiscusCreateChannelView.vue';
import QiscusDetailView from '@/views/integration/qiscus/QiscusDetailView.vue';

export const integrationRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/whatsapp',
    name: 'whatsapp',
    beforeEnter: () => {
      window.location.href = `/integration?ch=whatsapp`;
      return false;
    },
  },
  {
    path: '/instagram',
    name: 'instagram',
    beforeEnter: () => {
      window.location.href = `/integration?ch=instagram`;
      return false;
    },
  },
  {
    path: '/tiktok',
    name: 'tiktok',
    beforeEnter: () => {
      window.location.href = `/integration?ch=tiktok`;
      return false;
    },
  },
  {
    path: '/facebook',
    name: 'facebook',
    beforeEnter: () => {
      window.location.href = `/integration?ch=facebook`;
      return false;
    },
  },
  {
    path: '/line',
    name: 'line',
    beforeEnter: () => {
      window.location.href = `/integration?ch=line`;
      return false;
    },
  },
  {
    path: '/telegram',
    name: 'telegram',
    beforeEnter: () => {
      window.location.href = `/integration?ch=telegram`;
      return false;
    },
  },
  {
    path: '/qiscus',
    name: 'qiscus',
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
    beforeEnter: () => {
      window.location.href = `/integration?ch=custom_channel`;
      return false;
    },
  },
  {
    path: '/bot_integration',
    name: 'bot_integration',
    beforeEnter: () => {
      window.location.href = `/integration?ch=bot_integration`;
      return false;
    },
  },
];

export default integrationRoutes;
