<script setup lang="ts">
import { storeToRefs } from 'pinia';

import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import CallToAction from '@/components/ui/widget-preview/CallToAction.vue';
import WelcomingPageLoading from '@/components/ui/widget-preview/WelcomingPageLoading.vue';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import OptionalInput from './components/form/OptionalInput.vue';
import WidgetFormLayout from './components/layout/WidgetFormLayout.vue';

const { callToActionState } = storeToRefs(useQiscusLiveChatStore());
const { loading, data, error, upload } = useUploadSdkImage();

const uploadImage = async (file: File) => {
  await upload(file);
  if (data.value) {
    callToActionState.value.iconImage = data.value.url;
  } else {
    console.error(error.value);
  }
};
</script>

<template>
  <div class="flex w-full items-start gap-8 self-stretch">
    <!-- Form Section -->
    <div class="flex w-full flex-1 flex-col gap-8">
      <WidgetFormLayout label="Call to Action Button">
        <template #additional-info> </template>

        <template #inputs>
          <OptionalInput
            id="with-text-switch"
            label="With Text"
            v-model="callToActionState.isWithText"
          >
            <Input
              id="live-chat-button-text"
              v-model="callToActionState.liveChatButtonText"
              class="w-full"
              label="Live Chat Button Text"
              placeholder="Talk to us"
              :maxlength="50"
            />
          </OptionalInput>

          <OptionalInput
            id="icon-on-cta"
            label="Icon on Call to Action"
            v-model="callToActionState.isWithIcon"
          >
            <ImageInput
              label="Icon Image"
              id="icon-image"
              v-model="callToActionState.iconImage"
              :isUploading="loading"
              @upload="uploadImage"
            >
              <template #tips>
                <div class="text-sm font-normal text-[#A0A0A0]">
                  We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                  JPEG, or PNG format with a maximum size of 2MB.
                </div>
              </template>
            </ImageInput>
          </OptionalInput>

          <InputCustom
            errorMessage="Something went wrong."
            id="border-radius-input"
            label="Border Radius"
            v-model="callToActionState.borderRadius"
            placeholder="Try everything!"
            type="number"
            :maxlength="50"
            :min="0"
          >
            <template #append-button="{ disabled }">
              <div :class="{ 'cursor-not-allowed opacity-50': disabled }">
                <span>Pixels</span>
              </div>
            </template>
          </InputCustom>
        </template>
      </WidgetFormLayout>
    </div>

    <!-- Preview Section -->
    <div class="sticky top-20 z-10 flex flex-1 flex-col items-end gap-4 p-6">
      <WelcomingPageLoading />

      <!-- CTA Preview -->
      <CallToAction
        :imageUrl="callToActionState.iconImage"
        :title="callToActionState.liveChatButtonText"
        :rounded="Number(callToActionState.borderRadius)"
      />
    </div>
  </div>
</template>
