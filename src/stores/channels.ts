import { defineStore } from 'pinia';
import { ref } from 'vue';
import { channelsApi } from '../api/channels';
import type { IWhatsappChannel } from '../types/channels';

export const useChannelsStore = defineStore('channels', () => {
  // State
  const channels = ref<any>({});
  const whatsapp_channels = ref<IWhatsappChannel[]>([]);
  const qiscus_channels = ref<IWhatsappChannel[]>([]);

  // getter
  const getWhatsappChannels = async () => {
    whatsapp_channels.value = channels.value.whatsapp_channels || [];
  };

  // methods
  const getChannels = async () => {
    const { data } = await channelsApi.getChannels();
    const data2 = data as any;
    channels.value = data2.data;

    qiscus_channels.value = channels.value.qiscus_channels || [];
  };

  const updateChannelStatus = async (id: number, isActive: boolean, channelType: string) => {
    // const { data } = await qiscusChannelApi.updateChannelStatus(id, isActive);

    if (channelType === 'qiscus') {
      const findIndex = qiscus_channels.value.findIndex((channel) => channel.id === id);
      if (findIndex !== -1 && qiscus_channels.value[findIndex]) {
        qiscus_channels.value[findIndex].is_active = isActive;
      }
    } else {
      const findIndex = whatsapp_channels.value.findIndex((channel) => channel.id === id);
      if (findIndex !== -1 && whatsapp_channels.value[findIndex]) {
        whatsapp_channels.value[findIndex].is_active = isActive;
      }
    }
  };

  return {
    channels,
    whatsapp_channels,
    qiscus_channels,
    getChannels,
    getWhatsappChannels,
    updateChannelStatus,
  };
});
