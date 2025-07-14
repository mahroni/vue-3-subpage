import { ref } from 'vue';
import { z } from 'zod';

import { telegramApi } from '@/api/channels';
import type { IPagination2 } from '@/types/api';
import {
  type TelegramChannel,
  TelegramChannelResponseSchema,
} from '@/types/schemas/channels/telegram-list-channel';
import type { MetaPagination } from '@/types/schemas/common';
import { filterFilledObj } from '@/utils/helper/object';

const initMeta: IPagination2 = {
  page: 0,
  limit: 0,
  total_page: 0,
  total: 0,
};

export const useFetchTelegram = () => {
  const loading = ref(false);
  const data = ref<TelegramChannel[]>([]);
  const meta = ref<MetaPagination>({ ...initMeta });
  const error = ref<Error | null>(null);

  const fetchTelegram = async (params?: any) => {
    try {
      loading.value = true;
      error.value = null;

      const newParams = _getParams(params);
      const response = await telegramApi.get(newParams);

      const validatedResponse = TelegramChannelResponseSchema.parse(response.data);

      data.value = validatedResponse.data;
      meta.value = validatedResponse.meta;
    } catch (err) {
      // Log all errors for debugging
      console.error('Error fetching:', err);

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

  function _getParams(params: IPagination2) {
    return filterFilledObj(params);
  }

  return {
    loading,
    data,
    meta,
    error,
    fetchTelegram,
  };
};
