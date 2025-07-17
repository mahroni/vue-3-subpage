import { customChannelApi } from "@/api/channels";
import { CustomChannelResponseSchema, type CustomChannelList } from "@/types/schemas/channels/custom-channel";
import type { MetaPagination } from "@/types/schemas/common";
import { filterFilledObj } from "@/utils/helper/object";
import { ref } from "vue";
import z from "zod";

const initMeta: MetaPagination = {
    page: 0,
    limit: 0,
    total_page: 0,
    total: 0,
};

const _getParams = (params: MetaPagination) => {
    return filterFilledObj(params);
};

export const useFetchCustomChannel = () => {
    const loading = ref(false);
    const meta = ref<MetaPagination>({ ...initMeta });
    const error = ref<Error | null>(null);
    const data = ref<CustomChannelList>([]);

    const fetchChannels = async (params?: any) => {
        try {
            loading.value = true;
            error.value = null;

            const newParams = _getParams(params);
            const response = await customChannelApi.get(newParams);

            const validatedResponse = CustomChannelResponseSchema.parse(response.data);

            data.value = validatedResponse.data;
            meta.value = validatedResponse.meta;
        } catch (err) {
            console.error('Error fetching:', err);
            if (err instanceof z.ZodError) {
                console.error('Validation error:', err.issues);
                error.value = new Error(
                    `Validation failed: ${err.issues.map((e) => e.message).join(', ')}`
                );
            }
        } finally {
            loading.value = false;
        }
    };

    return {
        fetchChannels,
        data,
        meta,
        loading,
        error,
    };
}