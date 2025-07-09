<template>
  <div class="flex flex-col gap-8">
    <QiscusBannerDoc />

    <div
      class="flex flex-col items-start justify-center gap-8 rounded-xl border border-[#ECECEC] bg-[#FAFAFA] p-6"
    >
      <p class="text-xs text-[#A0A0A0]">
        Build your Qiscus Live Chat based on your need using our builder.
      </p>

      <div class="flex w-140 items-center gap-5">
        <ImageInput
          id="widget-image"
          v-model="formData.badge_url"
          :isUploading="uSdkImage.loading.value"
          @upload="uploadImage"
          autocomplete="off"
        />
        <div class="flex flex-1 flex-col items-start gap-1">
          <h4 class="text-sm font-semibold text-[#565656]">Channel Badge Icon</h4>
          <p class="text-xs text-[#A0A0A0]">
            Upload an image that will be used as your Channel Badge icon. We recommend you to upload
            image 100px x 100px (square image) for better result.
          </p>
        </div>
      </div>

      <div class="w-[552px]">
        <Input
          v-model="formData.name"
          :disabled="false"
          :error="false"
          errorMessage="This field has an error"
          id="default-input"
          label="Channel Name"
          placeholder="Enter your channel name here"
        />
      </div>
    </div>

    <!-- Term Section -->
    <div
      class="shadow-medium flex flex-col items-start justify-center gap-4 rounded-lg bg-white p-6"
    >
      <div class="flex flex-col items-start gap-2 text-sm">
        <h5 class="font-semibold text-[#0A0A0A]">Term of condition</h5>
        <p class="text-[#A0A0A0]">
          By creating a new Qiscus Live Chat, you agree and acknowledge that the Enhance
          Conversation Security feature is automatically enabled. Customers will not be able to see
          the conversation history if they use a different device or browser, and this might impact
          your total Monthly Active Users (MAU). You can disable this feature through the Settings
          menu on each Qiscus Live Chat channel.
        </p>
      </div>

      <Banner intent="positive" class="text-sm leading-5 font-medium text-[#0A0A0A]">
        This feature becomes accessible starting from Qiscus Omnichannel iOS v1.2.3, Qiscus
        Omnichannel Android v1.2.3, Qiscus Chat SDK Flutter v1.2.3, and Qiscus Chat SDK React Native
        v1.2.3.
      </Banner>

      <Checkbox
        id="agree-term-checkbox"
        label="Agree with the term of condition"
        v-model="formData.is_secure_toc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import Checkbox from '@/components/common/Checkbox.vue';
import { Banner } from '@/components/common/common';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useSweetAlert } from '@/composables/useSweetAlert';
import type { IWidgetChannel } from '@/types/channels';

import QiscusBannerDoc from './QiscusBannerDoc.vue';

// declare
const uSdkImage = useUploadSdkImage();
const { showAlert } = useSweetAlert();

const props = withDefaults(defineProps<{ modelValue: IWidgetChannel }>(), {
  modelValue: () => ({
    badge_url: '',
    name: '',
    is_active: true,
    is_secure: true,
    is_secure_toc: false,
    configs: {
      offline_message: '',
      online_message: '',
      send_offline_each_message: false,
      send_online_if_resolved: false,
    },
  }),
});

const emit = defineEmits(['update:modelValue']);

const formData = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: IWidgetChannel) {
    emit('update:modelValue', newValue);
  },
});

async function uploadImage(file: File) {
  await uSdkImage.upload(file);

  if (uSdkImage.error.value) {
    console.error('Error uploading image:', uSdkImage.error.value);

    return showAlert.error({
      title: 'Upload Failed',
      text: 'Failed to upload image. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  formData.value.badge_url = uSdkImage.data.value?.url || '';
}
</script>
