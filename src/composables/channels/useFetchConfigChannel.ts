import { ref } from 'vue';

import { configApi } from '@/api/channels';
import type { IResponse } from '@/types/api';
import type { IAutoResponder } from '@/types/channels';

export const useFetchConfig = () => {
  const loading = ref(false);
  const data = ref<IAutoResponder | null>(null);
  const error = ref<Error | null>(null);

  const fetch = async (id: number | string, source: string) => {
    try {
      loading.value = true;
      error.value = null;

      const params = {
        source,
      };
      const response = await configApi.get(id, params);
      const dataResponse = response.data as unknown as IResponse<any>;

      const { channel_config } = dataResponse.data;

      data.value = channel_config;
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
