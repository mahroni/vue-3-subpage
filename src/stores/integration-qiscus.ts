import { qiscusApi } from '@/api/channels';
import type { IResponse } from '@/types/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IQiscusChannel } from '../types/channels';

export const useQiscusStore = defineStore('qiscus', () => {
  // State
  const isFetchingChannels = ref(false);
  const channels = ref<IQiscusChannel[]>([]);
  const meta = ref<any>({});
  const detail = ref<IQiscusChannel | null>(null);

  // Methods
  const fetchQiscusChannels = async () => {
    try {
      isFetchingChannels.value = true;
      const response: any = await qiscusApi.get(meta.value);
      const data: any = response.data as IResponse<IQiscusChannel[]>;

      channels.value = data.data || [];
      meta.value = data.data.meta || {};
    } catch (error) {
      console.error(error)
      channels.value = [];
      meta.value = {};
    } finally {
      isFetchingChannels.value = false;
    }
  };

  const fetchDetailChannel = async (id: number) => {
    const { data } = await qiscusApi.getById(id);
    const data2 = data as any;
    detail.value = data2.data;
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
    loading: isFetchingChannels,
  };
});
