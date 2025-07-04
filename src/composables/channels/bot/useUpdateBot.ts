import { ref } from 'vue';

import { botApi } from '@/api/channels';
import type { IResponse } from '@/types/api';
import type { IBotChannel } from '@/types/channels';

export const useUpdateBot = () => {
  const loading = ref(false);
  const data = ref<IBotChannel | null>(null);
  const error = ref<Error | null>(null);

  const update = async (params: { is_active: boolean }) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await botApi.changeStatus(params);
      const dataResponse = response.data as unknown as IResponse<IBotChannel>;
      console.log(dataResponse);
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
    update,
  };
};
