// src/composables/posts/useCreatePost.ts
import { ref } from 'vue';

interface ICreatePostParams {
  title: string;
  userId?: number;
  body?: string;
  tags?: string[];
  reactions?: { likes?: number; dislikes?: number };
}

export const useCreatePost = () => {
  const loading = ref(false);
  const data = ref<any | null>(null); // Data will be the created post object
  const error = ref<Error | null>(null);

  /**
   * Creates a new post by sending a POST request to the API.
   * @param postData The data for the new post.
   */
  const createPost = async (postData: ICreatePostParams) => {
    try {
      loading.value = true;
      error.value = null;
      data.value = null; // Clear previous data

      const url = `https://dummyjson.com/posts/add`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      data.value = result; // Assign the created post directly to data
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      data.value = null; // Ensure data is null on error
    } finally {
      // Remove the timeout, loading state will be updated immediately
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    createPost,
  };
};
