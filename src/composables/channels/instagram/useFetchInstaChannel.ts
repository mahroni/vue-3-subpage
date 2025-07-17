import { ref } from "vue";
import z from "zod";



import { instagramApi } from '@/api/channels';
import {
  type InstaChannelList,
  InstaChannelResponseSchema,
} from '@/types/schemas/channels/insta-channel';
import type { MetaPagination } from '@/types/schemas/common';
import { filterFilledObj } from "@/utils/helper/object";





const initMeta: MetaPagination = {
    page: 0,
    limit: 0,
    total_page: 0,
    total: 0,
};

const _getParams = (params: MetaPagination) => {
    return filterFilledObj(params);
};

export const useFetchInstaChannel = () => {
    const loading = ref(false);
    const meta = ref<MetaPagination>({ ...initMeta });
    const error = ref<Error | null>(null);
    const data = ref<InstaChannelList>([]);

    const fetchChannels = async (params?: any) => {
        try {
            loading.value = true;
            error.value = null;

            const newParams = _getParams(params);
            const response = await instagramApi.get(newParams);

            const validatedResponse = InstaChannelResponseSchema.parse(response.data);

            data.value = validatedResponse.data;
            meta.value = validatedResponse.meta;
        } catch (err) {
            console.error('Error fetching:', err);
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
    }

    return {
        loading,
        data,
        meta,
        error,
        fetchChannels,
    }
}