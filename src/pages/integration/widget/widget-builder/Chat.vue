<template>
  <div class="flex w-full items-start justify-between gap-8 self-stretch">
    <div class="flex w-full flex-1 flex-col gap-8">
      <WIdgetFormLayout label="Chat">
        <template #inputs>
          <ImageInput
            v-model="chatReact.customerServiceAvatar"
            :isUploading="chatReact.isUploading"
            @upload="uploadImage"
            label="Customer Service Avatar"
            id="customer-service-avatar"
          >
            <template #tips>
              <div class="text-sm font-normal text-[#A0A0A0]">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
          </ImageInput>
          <Input
            v-model="chatReact.customerServiceName"
            label="Customer Service Name"
            id="customer-service-name"
          />
        </template>
      </WIdgetFormLayout>
    </div>

    <!-- PREVIEW -->
    <div class="flex flex-1 flex-col items-end p-6">
      <ChatFormLoading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import ChatFormLoading from '@/components/ui/widget-preview/ChatFormLoading.vue';

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
};
</script>
