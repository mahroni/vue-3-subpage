import { defineStore } from 'pinia';
import { ref } from 'vue';
import { qiscusApi } from '@/api/channels';
import type { IQiscusChannel } from '../types/channels';

export const useQiscusStore = defineStore('qiscus', () => {
  // State
  const channels = ref<IQiscusChannel[]>([]);
  const meta = ref<any>({});

  // Methods
  const getQiscusChannels = async () => {
    const { data } = await qiscusApi.get(meta.value);
    const data2 = data as any;
    channels.value = data2.data.qiscus_channels || [];
    meta.value = data2.meta || {};
  };

  return {
    channels,
    meta,
    getQiscusChannels,
  };
});
