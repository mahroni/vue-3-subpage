import { defineStore } from 'pinia';
import { ref } from 'vue';
import { qiscusApi } from '@/api/channels';
import type { IQiscusChannel } from '../types/channels';
import type { IResponse } from '@/types/api';

export const useQiscusStore = defineStore('qiscus', () => {
  // State
  const loading = ref(false);
  const channels = ref<IQiscusChannel[]>([]);
  const meta = ref<any>({});
  const detail = ref<IQiscusChannel | null>(null);

  // Methods
  const fetchQiscusChannels = async () => {
    try {
      loading.value = true;
      const response = await qiscusApi.get(meta.value);
      const data = response as unknown as IResponse<IQiscusChannel[]>;
      console.log('data', data);
      channels.value = data.data.data || [];
      meta.value = data.data.meta || {};
      console.log('meta', data.data.meta);
    } catch (error) {
      console.error('Error fetching Qiscus channels:', error);
      channels.value = [];
      meta.value = {};
    } finally {
      loading.value = false;
    }
  };

  const fetchDetailChannel = async (id: number) => {
    const { data } = await qiscusApi.getById(id);
    const data2 = data as any;
    detail.value = data2.data;
  };

  return {
    channels,
    meta,
    detail,
    loading,
    fetchQiscusChannels,
    fetchDetailChannel,
  };
});
