import { ref } from 'vue';
import { z } from 'zod';

import { qiscusApi } from '@/api/channels';
import { type QiscusChannel, QiscusDetailResponseSchema } from '@/types/schemas/qiscus';

export const useFetchQiscusDetail = () => {
  const loading = ref(false);
  const data = ref<QiscusChannel | null>(null);
  const error = ref<Error | null>(null);

  const fetchChannelById = async (id: number | string) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await qiscusApi.getById(id);

      // Validasi response dengan Zod (menggunakan parse seperti pendekatan Anda)
      const validatedResponse = QiscusDetailResponseSchema.parse(response.data);

      data.value = validatedResponse.data.qiscus_channel;
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle Zod validation errors
        console.error('Validation Error:', err.issues);
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
    fetchChannelById,
  };
};
