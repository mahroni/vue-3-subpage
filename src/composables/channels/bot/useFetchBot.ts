import { ref } from 'vue';
import { z } from 'zod';

import { botApi } from '@/api/channels';
import { type BotData, BotResponseSchema } from '@/types/schemas/bot';

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
      // Log all errors for debugging
      console.error('Error fetching Qiscus channel detail:', err);

      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        error.value = new Error(
          `Validation failed: ${err.issues.map((e) => e.message).join(', ')}`
        );
      } else {
        error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      }
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
