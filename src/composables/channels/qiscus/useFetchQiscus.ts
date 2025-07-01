import { ref } from 'vue';

import { qiscusApi } from '@/api/channels';
import type { IPagination2, IResponse } from '@/types/api';
import type { IQiscusChannel } from '@/types/channels';
import { filterFilledObj } from '@/utils/helper/object';

const initMeta: IPagination2 = {
  page: 0,
  limit: 0,
  total_page: 0,
  total: 0,
};

export const useFetchQiscus = () => {
  const loading = ref(false);
  const data = ref<IQiscusChannel[]>([]);
  const meta = ref<IPagination2>({ ...initMeta });
  const error = ref<Error | null>(null);

  const fetchChannels = async (params?: any) => {
    try {
      loading.value = true;
      error.value = null;

      const newParams = _getParams(params);
      const response = await qiscusApi.get(newParams);
      const dataResponse = response.data as unknown as IResponse<IQiscusChannel[]>;

      data.value = dataResponse.data;
      meta.value = dataResponse.meta as unknown as IPagination2;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      data.value = [];
      meta.value = { ...initMeta };
    } finally {
      loading.value = false;
    }
  };

  function _getParams(params: IPagination2) {
    return filterFilledObj(params);
  }

  return {
    loading,
    data,
    meta,
    error,
    fetchChannels,
  };
};
