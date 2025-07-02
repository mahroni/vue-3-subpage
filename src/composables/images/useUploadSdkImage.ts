import { ref } from 'vue';

import { useAppConfigStore } from '@/stores/app-config';

interface IFileSdk {
  url: string;
  name: string;
  pages: number;
  size: number;
}

export const useUploadSdkImage = () => {
  const loading = ref(false);
  const data = ref<IFileSdk | null>(null);
  const error = ref<Error | null>(null);

  const upload = async (file: File) => {
    try {
      loading.value = true;
      error.value = null;
      const formData = new FormData();
      formData.append('file', file);

      const headers = {
        ...useAppConfigStore().getHeadersSdk(),
      };

      const url = import.meta.env.VITE_SDK_API_BASE_URL_V2 || 'https://api3.qiscus.com/api/v2/';

      let response = await fetch(`${url}/sdk/upload`, {
        method: 'POST',
        body: formData,
        headers: headers,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload image');
      }
      const imageResponse = result.results;
      data.value = imageResponse.file as IFileSdk;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    error,
    upload,
  };
};
