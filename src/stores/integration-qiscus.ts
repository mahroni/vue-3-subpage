import { defineStore } from 'pinia';
import { ref } from 'vue';
import { qiscusApi } from '@/api/channels';
import type { IQiscusChannel } from '../types/channels';

export const useQiscusStore = defineStore('qiscus', () => {
  // State
  const channels = ref<IQiscusChannel[]>([]);
  const meta = ref<any>({});
  const detail = ref<IQiscusChannel | null>(null);

  // Methods
  const fetchQiscusChannels = async () => {
    const { data } = await qiscusApi.get(meta.value);
    const data2 = data as any;
    channels.value = data2.data || [];
    meta.value = data2.meta || {};
  };

  const fetchDetailChannel = async (id: number) => {
    const { data } = await qiscusApi.getById(id);
    const data2 = data as any;
    detail.value = data2.data.qiscus_channel;
  };

  const updateChannel = async () => {
    const { data } = await qiscusApi.update(detail.value);
    const data2 = data as any;
    detail.value = data2.data.qiscus_channel;
  };

  return {
    channels,
    meta,
    detail,
    fetchQiscusChannels,
    fetchDetailChannel,
    updateChannel,
  };
});
