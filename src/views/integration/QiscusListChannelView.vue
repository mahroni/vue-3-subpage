<template>
  <div class="flex h-screen flex-col gap-8 px-12 py-8">
    <router-link to="/" class="text-primary flex items-center gap-2 font-semibold">
      <BackIcon :size="20" class="text-primary" />
      Integration
    </router-link>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <img :src="CHANNEL_BADGE_URL.qiscus" alt="Qiscus Logo" loading="lazy" width="20" height="20" />
      <h2 class="text-text-title text-xl font-semibold">Qiscus Live Chat</h2>
    </div>

    <!-- Banner documentation -->
    <QiscusBannerDoc />

    <!-- Table section -->
    <div class="shadow-large flex flex-1 items-center justify-between overflow-hidden rounded-2xl">
      <!-- Search Input with Icon -->
      <TableListChannel class="h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">

import { BackIcon } from '@/components/icons';
import QiscusBannerDoc from '@/pages/integration/qiscus/QiscusBannerDoc.vue';
import TableListChannel from '@/pages/integration/qiscus/TableListChannel.vue';
import { useAppConfigStore } from '@/stores/app-config';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';


// props
const appConfigStore = useAppConfigStore();

appConfigStore.setConfig({
  userToken: '1FNe6EiEUpRWJYoxlZe1',
  userSdkToken: 'mUALeQiy60OMvF7RdheE1615272089',
  appId: 'zalda-vvq7pksvblaiy7s',
  appVersion: '1.0.0',
  sdkUserId: '724424069',
});
</script>
