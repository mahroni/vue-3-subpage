import { ref, toValue } from 'vue';

import { qiscusApi } from '@/api/channels';
import type { IResponse } from '@/types/api';
import type { IQiscusChannel } from '@/types/channels';

interface FetchChannelsMeta {
  page?: number;
  limit?: number;
  [key: string]: any;
}

export const useFetchQiscus = () => {
  const loading = ref(false);
  const data = ref<IQiscusChannel[]>([]);
  const meta = ref<FetchChannelsMeta>({});
  const error = ref<Error | null>(null);

  const fetchChannels = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await qiscusApi.get({});
      const dataResponse = response.data as unknown as IResponse<IQiscusChannel[]>;

      data.value = dataResponse.data;
      meta.value = dataResponse.meta;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      data.value = [];
      meta.value = {};
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data: toValue(data),
    meta,
    error,
    fetchChannels,
  };
};
