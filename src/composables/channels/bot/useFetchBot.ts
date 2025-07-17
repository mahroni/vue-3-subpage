import { ref } from 'vue';

import { botApi } from '@/api/channels';
import { type BotData, BotResponseSchema } from '@/types/schemas/channels/bot/bot';
import { handleComposableError } from '@/utils/helper/errorHandler';

export const useFetchBot = () => {
  const loading = ref(false);
  const data = ref<BotData | null>(null);
  const error = ref<Error | null>(null);

  const fetch = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await botApi.get();

      // Validate the response using Zod schema
      const validatedResponse = BotResponseSchema.parse(response.data);
      data.value = validatedResponse.data;
    } catch (err) {
      handleComposableError(err, error, 'Error fetching bot');
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
