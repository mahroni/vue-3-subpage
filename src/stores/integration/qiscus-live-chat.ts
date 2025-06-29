import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

interface ChannelItem {
  id: number;
  icon: string;
  name: string;
  enabled: boolean;
  link: string;
}

export const useQiscusLiveChatStore = defineStore('create-qiscus-live-chat', () => {
  // State
  const isChannelsEnabled = ref<boolean>(false);
  const isQiscusLiveChat = ref<boolean>(false);
  const previewTitle = ref<string>('Ask for Question');
  const previewSubtitle = ref<string>('In Everythings!');
  const previewIntroduction = ref<string>('More personalized chat with us on:');
  const previewLiveChatName = ref<string>('Live Chat');
  const channelName = ref<string>('');
  const channelLink = ref<string>('');
  const channelBadgeIcon = ref<string>('');

  const channelList = ref<ChannelItem[]>([
    { id: 1, icon: 'whatsapp', name: 'Whatsapp', enabled: true, link: '' },
    { id: 2, icon: 'facebook', name: 'Facebook', enabled: false, link: '' },
    { id: 3, icon: 'line', name: 'Line', enabled: false, link: '' },
    { id: 4, icon: 'telegram', name: 'Telegram', enabled: false, link: '' },
    { id: 6, icon: 'tiktok', name: 'Tiktok', enabled: true, link: '' },
  ]);

  // Getters

  // Actions
  const addChannel = (channel: any) => {
    const newId = Math.max(...channelList.value.map((item) => item.id), 0) + 1;
    const newChannel = {
      id: newId,
      ...channel,
    };
    channelList.value.push(newChannel);
  };

  const removeChannel = (channelId: number) => {
    const index = channelList.value.findIndex((channel) => channel.id === channelId);
    if (index !== -1) {
      channelList.value.splice(index, 1);
    }
  };

  const addQiscusLiveChatChannel = () => {
    // check if qiscus live chat channel already exists
    const existingChannel = channelList.value.find((channel) => channel.icon === 'qiscus');

    if (!existingChannel) {
      const newId = Math.max(...channelList.value.map((item) => item.id), 0) + 1;
      const qiscusChannel = {
        id: newId,
        icon: 'qiscus',
        name: previewLiveChatName.value || 'Live Chat',
        enabled: true,
        link: '',
      };
      channelList.value.push(qiscusChannel);
    }
  };

  const removeQiscusLiveChatChannel = () => {
    // remove channel with icon qiscus
    const index = channelList.value.findIndex((channel) => channel.icon === 'qiscus');
    if (index !== -1) {
      channelList.value.splice(index, 1);
    }
  };

  // Watch previewLiveChatName for update qiscus live chat channel name
  watch(previewLiveChatName, (newName) => {
    const qiscusChannel = channelList.value.find((channel) => channel.icon === 'qiscus');
    if (qiscusChannel) {
      qiscusChannel.name = newName || 'Live Chat';
    }
  });

  // Watch isQiscusLiveChat for automatically add/remove channel
  watch(isQiscusLiveChat, (newValue, oldValue) => {
    if (newValue && !oldValue) {
      // When enabled, add qiscus live chat channel
      addQiscusLiveChatChannel();
    } else if (!newValue && oldValue) {
      // When disabled, remove qiscus live chat channel
      removeQiscusLiveChatChannel();
    }
  });

  return {
    // State
    isChannelsEnabled,
    isQiscusLiveChat,
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
    addChannel,
    removeChannel,
    addQiscusLiveChatChannel,
    removeQiscusLiveChatChannel,
  };
});
