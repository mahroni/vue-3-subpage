import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IconName } from '@/components/icons/Icon.vue';

interface ChannelItem {
  id: number;
  icon: IconName;
  name: string;
  enabled: boolean;
}
export const useQiscusLiveChatStore = defineStore('create-qiscus-live-chat', () => {
  // State
  const isChannelsEnabled = ref<boolean>(false);
  const previewTitle = ref<string>('Ask for Question');
  const previewSubtitle = ref<string>('In Everythings!');
  const previewIntroduction = ref<string>('More personalized chat with us on:');
  const previewLiveChatName = ref<string>('');
  const channelName = ref<string>('');
  const channelLink = ref<string>('');
  const channelBadgeIcon = ref<string>('');

  const channelList = ref<ChannelItem[]>([
    { id: 1, icon: 'whatsapp', name: 'Whatsapp', enabled: true },
    { id: 2, icon: 'facebook', name: 'Facebook', enabled: false },
    { id: 3, icon: 'line', name: 'Line', enabled: false },
    { id: 4, icon: 'telegram', name: 'Telegram', enabled: false },
    { id: 5, icon: 'instagram', name: 'Instagram', enabled: true },
    { id: 6, icon: 'tiktok', name: 'Tiktok', enabled: true },
  ]);

  // Getters

  // Actions

  return {
    // State
    isChannelsEnabled,
    previewTitle,
    previewSubtitle,
    previewIntroduction,
    previewLiveChatName,
    channelName,
    channelLink,
    channelBadgeIcon,
    channelList,

    // Getters

    // Actions
  };
});
