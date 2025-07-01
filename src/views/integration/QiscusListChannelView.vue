<template>
  <div class="flex h-screen flex-col gap-8 px-12 py-8">
    <router-link to="/" class="text-primary flex items-center gap-2 font-semibold">
      <ChevronLeftIcon :size="20" class="text-primary" />
      Integration
    </router-link>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <img
        :src="CHANNEL_BADGE_URL.qiscus"
        alt="Qiscus Logo"
        loading="lazy"
        width="20"
        height="20"
      />
      <h2 class="text-text-title text-xl font-semibold">Qiscus Live Chat</h2>
    </div>

    <!-- Banner documentation -->
    <QiscusBannerDoc />

    <!-- Table section -->
    <div class="shadow-large flex flex-1 items-center justify-between overflow-hidden rounded-2xl">
      <!-- Search Input with Icon -->
      <TableListChannel
        :channels="qiscus_channels"
        @updateChannelStatus="updateChannelStatus"
        @search="search"
        @pagination="pagination"
        class="h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { ChevronLeftIcon } from '@/components/icons';
import { useFetchQiscus } from '@/composables/channels/qiscus/useFetchQiscus';
import QiscusBannerDoc from '@/pages/integration/qiscus/QiscusBannerDoc.vue';
import TableListChannel from '@/pages/integration/qiscus/TableListChannel.vue';
import { useAppConfigStore } from '@/stores/app-config';
import type { IQiscusChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

// props
const appConfigStore = useAppConfigStore();

appConfigStore.setConfig({
  userToken: '1FNe6EiEUpRWJYoxlZe1',
  appId: 'zalda-vvq7pksvblaiy7s',
  appVersion: '1.0.0',
});

const Qiscus = useFetchQiscus();

const qiscus_channels = computed(() =>
  Qiscus.data.value.map((channel: IQiscusChannel) => ({
    id: channel.id,
    name: channel.name,
    channelId: channel.id.toString(),
    isActive: channel.is_active,
    badgeUrl: channel.badge_url ? channel.badge_url : CHANNEL_BADGE_URL.qiscus,
  }))
);

function updateChannelStatus(data: { id: number; isActive: boolean }) {
  console.log(data);

  // channelsStore.updateChannelStatus(data.id, data.isActive, channelType);
  // alert success
}

function search(query: string) {
  Qiscus.meta.value.page = 1;
  // Qiscus.meta.value.search = query;
  Qiscus.fetchChannels();
}

function pagination(type: string) {
  switch (type) {
    case 'next':
      if (!Qiscus.meta.value.page) return;
      Qiscus.meta.value.page += 1;
      break;
    case 'prev':
      if (Qiscus.meta.value.page && Qiscus.meta.value.page > 1) {
        Qiscus.meta.value.page -= 1;
      }
      break;
    case 'first':
      Qiscus.meta.value.page = 1;
      break;
    case 'last':
      Qiscus.meta.value.page = Qiscus.meta.value.total_page;
      break;
  }
  Qiscus.fetchChannels();
}

onMounted(async () => {
  await Qiscus.fetchChannels();
});
</script>
