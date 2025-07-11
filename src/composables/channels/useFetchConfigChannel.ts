import { ref } from 'vue';
import { z } from 'zod';

import { configApi } from '@/api/channels';
import { type ConfigChannel, ConfigChannelResponseSchema } from '@/types/schemas/config-channel';

export const useFetchConfig = () => {
  const loading = ref(false);
  const data = ref<ConfigChannel | null>(null);
  const error = ref<Error | null>(null);

  const fetch = async (id: number | string, source: string) => {
    try {
      loading.value = true;
      error.value = null;

      const params = {
        source,
      };
      const response = await configApi.get(id, params);

      // Validate the response using Zod schema
      const validatedResponse = ConfigChannelResponseSchema.parse(response.data);
      data.value = validatedResponse.data.channel_config;
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
