import { defineStore } from 'pinia';
import { ref } from 'vue';

import { whatsappApi } from '@/api/channels';

import type { IWhatsappChannel } from '../types/channels';

export const useWhatsappStore = defineStore('whatsapp', () => {
  // State
  const channels = ref<IWhatsappChannel[]>([]);
  const meta = ref<any>({});

  // Methods
  const getWhatsappChannels = async () => {
    const { data } = await whatsappApi.get(meta.value);
    const data2 = data as any;
    channels.value = data2.data.wa_channels || [];
    meta.value = data2.meta || {};
  };

  return {
    channels,
    meta,
    getWhatsappChannels,
  };
});
