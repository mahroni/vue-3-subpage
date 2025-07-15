import { defineStore } from 'pinia';
import { ref } from 'vue';
import z from 'zod';

import { appApi } from '@/api/app';
import { AppResponseSchema, type AppSchemaType } from '@/types/schemas/app';

export const useAppDetailStore = defineStore('app:detail', () => {
  const detail = ref<AppSchemaType | null>(null);
  const error = ref<Error | null>(null);

  const fetch = async () => {
    try {
      const { data } = await appApi.get();

      // satisfy response schema
      const response = { data };

      const validatedResponse = AppResponseSchema.parse(response);
      detail.value = validatedResponse.data;
    } catch (err) {
      console.error('Error fetching plan data:', err);
      if (err instanceof z.ZodError) {
        console.error('Validation error:', err.issues);
        error.value = new Error(
          `Validation failed: ${err.issues.map((e) => e.message).join(', ')}`
        );
      } else {
        error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      }
    }
  };
  return {
    detail,
    error,
    fetch,
  };
});
