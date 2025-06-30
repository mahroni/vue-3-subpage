import { ref } from 'vue';

import { qiscusApi } from '@/api/channels';
import type { IPagination2 } from '@/types/api';
import type { IQiscusChannel } from '@/types/channels';

export const useFetchQiscus = () => {
  const loading = ref(false);
  const data = ref<IQiscusChannel[]>([]);
  const meta = ref<IPagination2>({});
  const error = ref<Error | null>(null);

  const fetchChannels = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await qiscusApi.get(meta.value);
      const dataResponse = response.data as any;

      data.value = dataResponse.data;
      meta.value = dataResponse.meta ?? {};
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      data.value = [];
      meta.value = {};
    } finally {
      loading.value = false;
    }
  };

  // watchEffect(() => {
  //   fetchChannels();
  // });

  return {
    loading,
    data,
    meta,
    error,
    fetchChannels,
  };
};
