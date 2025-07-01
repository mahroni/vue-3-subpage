import { ref } from 'vue';

import { configApi } from '@/api/channels';
import type { IResponse } from '@/types/api';
import type { IQiscusChannel } from '@/types/channels';

export const useFetchConfig = () => {
  const loading = ref(false);
  const data = ref<IQiscusChannel | null>(null);
  const error = ref<Error | null>(null);

  const fetchConfig = async (id: number, source: string) => {
    try {
      loading.value = true;
      error.value = null;

      const params = {
        source,
      };
      const response = await configApi.get(id, params);
      const dataResponse = response.data as unknown as IResponse<IQiscusChannel>;

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
    fetchConfig,
  };
};
