import { ref } from 'vue';

import { botApi } from '@/api/channels';
import type { IResponse } from '@/types/api';
import type { IBotChannel } from '@/types/channels';

export const useFetchBot = () => {
  const loading = ref(false);
  const data = ref<IBotChannel | null>(null);
  const error = ref<Error | null>(null);

  const fetch = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await botApi.get();
      const dataResponse = response.data as unknown as IResponse<IBotChannel>;

      data.value = dataResponse.data;
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
    fetch,
  };
};
