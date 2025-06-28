import { ref, watchEffect, unref, type Ref } from 'vue';
import type { IQiscusChannel } from '@/types/channels';
import { qiscusApi } from '@/api/channels';
import type { IResponse } from '@/types/api';

interface FetchChannelsMeta {
  page?: number;
  limit?: number;
  [key: string]: any;
}

export const useFetchChannels = (initialMeta: FetchChannelsMeta | Ref<FetchChannelsMeta> = {}) => {
  const loading = ref(false);
  const data = ref<IQiscusChannel[]>([]);
  const meta = ref<FetchChannelsMeta>(unref(initialMeta));
  const error = ref<Error | null>(null);

  const fetchChannels = async (overrideMeta?: FetchChannelsMeta) => {
    try {
      loading.value = true;
      error.value = null;

      const currentMeta = overrideMeta ? { ...meta.value, ...overrideMeta } : meta.value;

      const response = await qiscusApi.get(currentMeta);
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

  watchEffect(() => {
    fetchChannels();
  });

  return {
    loading,
    data,
    meta,
    error,
    fetchChannels,
  };
};
