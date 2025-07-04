import { ref } from 'vue';

import { configApi } from '@/api/channels';
import type { IAutoResponder, IUpdateConfig } from '@/types/channels';

export const useUpdateConfig = () => {
  const loading = ref(false);
  const data = ref<IAutoResponder | null>(null);
  const error = ref<Error | null>(null);

  const update = async (id: number | string, data: IUpdateConfig) => {
    try {
      loading.value = true;
      error.value = null;

      await configApi.update(id, data);
      // const response = await configApi.update(id, data);
      // const dataResponse = response.data as unknown as IResponse<any>;

      // const { channel_config } = dataResponse.data;

      // data.value = channel_config as any as IUpdateConfig;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      // data.value = null;
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
