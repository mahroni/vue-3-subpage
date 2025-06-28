// src/composables/posts/useFetchPost.ts
import { type Ref, ref, watch } from 'vue';

import { filterFilledObj } from '@/utils/helper/object';

// Import watch

interface IParams {
  q?: string;
  limit?: string;
}

export const useFetchPost = (sourceParams: Ref<IParams> | undefined = ref({})) => {
  const loading = ref(false);
  const data = ref<any[]>([]);
  const error = ref<Error | null>(null);

  const fetchPost = async (currentParams: IParams) => {
    try {
      loading.value = true;
      error.value = null;

      const filterParams = filterFilledObj(currentParams);

      const queryString = new URLSearchParams(filterParams as Record<string, string>).toString();
      let url = `https://dummyjson.com/posts`;

      if (Object.keys(filterParams).length) {
        url += `/search?${queryString}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      data.value = result.posts;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      data.value = [];
    } finally {
      // remove the timeout
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    }
  };

  // Watch the sourceParams and trigger fetchPost
  watch(
    sourceParams,
    (newParams) => {
      fetchPost(newParams);
    },
    { immediate: true }
  ); // immediate: true to fetch on initial load, deep: true for nested changes

  return {
    loading,
    data,
    error,
    // We no longer expose `params` directly from the composable as it's driven by `sourceParams`
    fetchPost, // You might still want to expose this for manual re-fetching
  };
};
