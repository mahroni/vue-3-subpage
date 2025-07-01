<template>
    <div class="flex w-full items-start gap-8 self-stretch justify-between">
        <div class="flex w-full flex-col gap-8 flex-1">
            <WIdgetFormLayout label="Chat">
                <template #inputs>
                    <ImageInput v-model="chatReact.customerServiceAvatar" :isUploading="chatReact.isUploading"
                        @upload="uploadImage"
                        label="Customer Service Avatar" id="customer-service-avatar">
                        <template #tips>
                            <div class="text-[#A0A0A0] text-sm font-normal">
                                We recommend an image of at least 360x360 pixels. You can upload
                                images in JPG,
                                JPEG, or
                                PNG format with a maximum size of 2MB.
                            </div>
                        </template>
                    </ImageInput>
                    <Input v-model="chatReact.customerServiceName" label="Customer Service Name"
                        id="customer-service-name" />
                </template>
            </WIdgetFormLayout>
        </div>

        <!-- PREVIEW -->
        <div class="flex p-6 flex-1 flex-col items-end sticky top-20 bg-white-100 z-50">
            <ChatFormLoading/>
        </div>
    </div>
</template>

<script setup lang="ts">
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import ChatFormLoading from '@/components/ui/widget-preview/ChatFormLoading.vue';
import { reactive } from 'vue';
import WIdgetFormLayout from '../form/WIdgetFormLayout.vue';

const chatReact = reactive({
    customerServiceName: '',
    customerServiceAvatar: '',
    isUploading: false,
});

const uploadImage = async (file: File, revertPreview: () => void) => {
    const formData = new FormData();
    formData.append('file', file);
    chatReact.isUploading = true;
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        chatReact.customerServiceAvatar = data.data.imageUrl;
    } catch (error) {
        console.error(error);
        revertPreview();
    } finally {
        chatReact.isUploading = false;
    }
}
</script>