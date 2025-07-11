import { ref } from 'vue';
import { z } from 'zod';

import { qiscusApi } from '@/api/channels';
import type { MetaPagination } from '@/types/schemas/common';
import {
  type QiscusChannelList,
  QiscusChannelResponseSchema,
} from '@/types/schemas/qiscus-list-channel';
import { filterFilledObj } from '@/utils/helper/object';

const initMeta: MetaPagination = {
  page: 0,
  limit: 0,
  total_page: 0,
  total: 0,
};

export const useFetchQiscus = () => {
  const loading = ref(false);
  const data = ref<QiscusChannelList>([]);
  const meta = ref<MetaPagination>({ ...initMeta });
  const error = ref<Error | null>(null);

  const fetchChannels = async (params?: any) => {
    try {
      loading.value = true;
      error.value = null;

      const newParams = _getParams(params);
      const response = await qiscusApi.get(newParams);

      const validatedResponse = QiscusChannelResponseSchema.parse(response.data);

      data.value = validatedResponse.data;
      meta.value = validatedResponse.meta;
    } catch (err) {
      // Log all errors for debugging
      console.error('Error fetching Qiscus channel detail:', err);

      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        console.error('Validation error:', err.issues);
        error.value = new Error(
          `Validation failed: ${err.issues.map((e) => e.message).join(', ')}`
        );
      } else {
        error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      }
      data.value = [];
      meta.value = { ...initMeta };
    } finally {
      loading.value = false;
    }
  };

  function _getParams(params: MetaPagination) {
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
