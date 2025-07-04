import { ref } from 'vue';

import { qiscusApi } from '@/api/channels';
import type { IResponse } from '@/types/api';
import type { IWidgetChannel } from '@/types/channels';

export const useFetchQiscusDetail = () => {
  const loading = ref(false);
  const data = ref<IWidgetChannel | null>(null);
  const error = ref<Error | null>(null);

  const fetchChannelById = async (id: number | string) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await qiscusApi.getById(id);
      const dataResponse = response.data as unknown as IResponse<any>;

      const { qiscus_channel } = dataResponse.data;
      data.value = qiscus_channel;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    fetchChannelById,
  };
};
