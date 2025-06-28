<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import ChannelList from '@/components/ui/widget-preview/ChannelList.vue';
import ChannelListLoading from '@/components/ui/widget-preview/ChannelListLoading.vue';

const qiscusLiveChatStore = useQiscusLiveChatStore();

const channelPreviewData = computed(() => {
  return qiscusLiveChatStore.channelList
    .filter((channel) => channel.enabled)
    .map((channel) => ({
      label: channel.name,
      iconUrl: CHANNEL_BADGE_URL[channel.icon as keyof typeof CHANNEL_BADGE_URL] || '',
    }));
});

onMounted(() => {
  console.log('ini data channelPreviewData', channelPreviewData.value);
});
</script>

<template>
  <div class="flex flex-col items-end gap-4">
    <ChannelList
      v-if="qiscusLiveChatStore.isChannelsEnabled"
      :title="qiscusLiveChatStore.previewTitle"
      :subtitle="qiscusLiveChatStore.previewSubtitle"
      :introduction="qiscusLiveChatStore.previewIntroduction"
      :channels="channelPreviewData"
      :imageUrl="''"
    />
    <ChannelListLoading v-else />

    <div class="bg-surface-disable h-16 w-16 rounded-full" />
  </div>
</template>
