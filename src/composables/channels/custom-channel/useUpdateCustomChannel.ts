import { customChannelApi } from "@/api/channels";
import type { IResponse } from "@/types/api";
import type { CustomChannel } from "@/types/schemas/channels/custom-channel";
import { ref } from "vue";

export const useUpdateCustomChannel = () => {
    const loading = ref(false);
    const data = ref<CustomChannel | null>(null);
    const error = ref<Error | null>(null);

    const update = async (id: string | number, payload: any) => {
        try {
            loading.value = true;
            error.value = null;

            const response = await customChannelApi.update({
                id: id,
                ...payload,
            });

            const dataResponse = response.data as unknown as IResponse<any>;
            const { custom_channel } = dataResponse.data;
            data.value = custom_channel;
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
        update,
    };
}