<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <router-link to="/" class="text-primary flex items-center gap-2 font-semibold">
      <ArrowLeftIcon :size="20" />
      Integration
    </router-link>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <ChatIcon :size="20" />
      <h2 class="text-text-title text-xl font-semibold">Qiscus Live Chat</h2>
    </div>

    <!-- Banner documentation -->
    <QiscusBannerDoc />

    <!-- Table section -->
    <div class="shadow-large flex items-center justify-between rounded-2xl bg-white">
      <!-- Search Input with Icon -->
      <TableListChannel
        :channels="qiscus_channels"
        @updateChannelStatus="updateChannelStatus"
        @search="search"
        @pagination="pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useAppConfigStore } from '@/stores/app-config';
import { useQiscusStore } from '@/stores/integration-qiscus';
import TableListChannel from '@/pages/integration/qiscus/TableListChannel.vue';
import type { IQiscusChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { ArrowLeftIcon, ChatIcon } from '@/components/icons';
import QiscusBannerDoc from '@/pages/integration/qiscus/QiscusBannerDoc.vue';

// props
const appConfigStore = useAppConfigStore();

appConfigStore.setConfig({
  userToken: '1FNe6EiEUpRWJYoxlZe1',
  appId: 'zalda-vvq7pksvblaiy7s',
  appVersion: '1.0.0',
});

const channelsStore = useQiscusStore();

const qiscus_channels = computed(() =>
  channelsStore.channels.map((channel: IQiscusChannel) => ({
    id: channel.id,
    name: channel.name,
    channelId: channel.id.toString(),
    isActive: channel.is_active,
    badgeUrl: channel.badge_url ? channel.badge_url : CHANNEL_BADGE_URL.qiscus,
  }))
);

function updateChannelStatus(data: { id: number; isActive: boolean }) {
  // channelsStore.updateChannelStatus(data.id, data.isActive, channelType);
  // alert success
}

function search(query: string) {
  channelsStore.meta.search = query;
  channelsStore.meta.page = 1;
  channelsStore.getQiscusChannels();
}

function pagination(type: string) {
  switch (type) {
    case 'next':
      channelsStore.meta.page += 1;
      break;
    case 'prev':
      if (channelsStore.meta.page > 1) {
        channelsStore.meta.page -= 1;
      }
      break;
    case 'first':
      channelsStore.meta.page = 1;
      break;
    case 'last':
      channelsStore.meta.page = channelsStore.meta.total_page;
      break;
  }
  channelsStore.getQiscusChannels();
}

onMounted(async () => {
  await channelsStore.getQiscusChannels();
});
</script>
