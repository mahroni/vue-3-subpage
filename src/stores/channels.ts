import { defineStore } from 'pinia';
import { ref } from 'vue';
import { channelApi } from '../api/channels';

export const useChannelsStore = defineStore('channels', () => {
  // State
  const channels = ref<any>({});

  // Getters
  const getChannels = async () => {
    const { data } = await channelApi.getUsers();
    const data2 = data as any;
    channels.value = data2.data;
  };

  const getWhatsappChannels = async () => {
    channels.value = channels.value.wa_channels;
  };

  return {
    channels,
    getChannels,
    getWhatsappChannels,
  };
});
