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

    <Banner>
      <p>
        To learn more about Qiscus Live Chat Integration, you can refer to this
        <a
          class="text-notification-link font-semibold underline"
          href="https://docs.qiscus.com/docs/live-chat-integration"
          target="_blank"
          >Documentation</a
        >.
      </p>
    </Banner>

    <!-- Table section -->
    <div class="shadow-large rounded-2xl bg-white p-4">
      <div class="flex items-center justify-between">
        <!-- Search Input with Icon -->
        <TableListChannel
          :channels="qiscus_channels"
          @updateChannelStatus="updateChannelStatus"
          @search="search"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useAppConfigStore } from '@/stores/app-config';
import { useChannelsStore } from '@/stores/channels';
import TableListChannel from '@/pages/integration/qiscus/TableListChannel.vue';
import Banner from '@/components/common/Banner.vue';
import type { IWhatsappChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { ArrowLeftIcon, ChatIcon } from '@/components/icons';

// props
const channelType = 'qiscus';
const appConfigStore = useAppConfigStore();

appConfigStore.setConfig({
  userToken: '1FNe6EiEUpRWJYoxlZe1',
  appId: 'zalda-vvq7pksvblaiy7s',
  appVersion: '1.0.0',
});

const channelsStore = useChannelsStore();

const qiscus_channels = computed(() =>
  channelsStore.qiscus_channels.map((channel: IWhatsappChannel) => ({
    id: channel.id,
    name: channel.name,
    channelId: channel.id.toString(),
    isActive: channel.is_active,
    badgeUrl: channel.badge_url ? channel.badge_url : CHANNEL_BADGE_URL.qiscus,
  }))
) as unknown as IWhatsappChannel[];

function updateChannelStatus(data: { id: number; isActive: boolean }) {
  channelsStore.updateChannelStatus(data.id, data.isActive, channelType);

  // alert success
}

function search(query: string) {
  console.log('search', query);
}

onMounted(async () => {
  await channelsStore.getChannels();
  await channelsStore.getQiscusChannels();
});
</script>
