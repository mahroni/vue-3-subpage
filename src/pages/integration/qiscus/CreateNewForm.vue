<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="!isAutoresponderFormOpen" class="flex flex-col gap-8">
      <QiscusBannerDoc />

      <div class="border-[#ECECEC] bg-[#FAFAFA] flex flex-col items-start justify-center gap-8 rounded-xl border p-6">
        <p class="text-[#A0A0A0] text-xs">
          Build your Qiscus Live Chat based on your need using our builder.
        </p>

        <div class="flex w-140 items-center gap-5">
          <ImageInput id="widget-image" v-model="channel.badge_url" :isUploading="uSdkImage.loading.value"
            @upload="uploadImage" autocomplete="off" />
          <div class="flex flex-1 flex-col items-start gap-1">
            <h4 class="text-[#565656] text-sm font-semibold">Channel Badge Icon</h4>
            <p class="text-[#A0A0A0] text-xs">
              Upload an image that will be used as your Channel Badge icon. We recommend you to upload
              image 100px x 100px (square image) for better result.
            </p>
          </div>
        </div>

        <div class="w-[552px]">
          <Input v-model="channel.name" :disabled="false" :error="false" errorMessage="This field has an error"
            id="default-input" label="Channel Name" placeholder="Enter your channel name here" />
        </div>
      </div>

      <!-- Term Section -->
      <div class="shadow-medium flex flex-col items-start justify-center gap-4 rounded-lg bg-white p-6">
        <div class="flex flex-col items-start gap-2 text-sm">
          <h5 class="text-[#0A0A0A] font-semibold">Term of condition</h5>
          <p class="text-[#A0A0A0]">
            By creating a new Qiscus Live Chat, you agree and acknowledge that the Enhance Conversation
            Security feature is automatically enabled. Customers will not be able to see the
            conversation history if they use a different device or browser, and this might impact your
            total Monthly Active Users (MAU). You can disable this feature through the Settings menu on
            each Qiscus Live Chat channel.
          </p>
        </div>

        <Banner intent="positive" class="text-[#0A0A0A] font-medium text-sm leading-5">
          This feature becomes accessible starting from Qiscus Omnichannel iOS v1.2.3, Qiscus Omnichannel Android
          v1.2.3, Qiscus Chat SDK Flutter v1.2.3, and Qiscus Chat SDK React Native v1.2.3.
        </Banner>

        <Checkbox label="Agree with the term of condition" v-model="channel.is_secure_toc" />
      </div>
    </div>

    <div class="flex justify-end gap-4 mt-8">
      <Button intent="secondary" @click="emit('cancel')">Cancel</Button>
      <Button type="submit" :disabled="isDisabled">Save</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import Checkbox from '@/components/common/Checkbox.vue';
import { Banner, Button } from '@/components/common/common';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import { useCreateQiscus } from '@/composables/channels/qiscus';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useSweetAlert } from '@/composables/useSweetAlert';
import QiscusBannerDoc from './QiscusBannerDoc.vue';

// declare
const uQiscus = useCreateQiscus()
const uSdkImage = useUploadSdkImage();
const { showAlert } = useSweetAlert();


const emit = defineEmits(['submit', 'cancel']);

// state
const isAutoresponderFormOpen = ref(false);

const channel = ref({
  badge_url: '',
  name: '',
  is_active: true,
  is_secure: true,
  is_secure_toc: false,
})

// computed
const isDisabled = computed(() => {
  return !channel.value.name || !channel.value.is_secure_toc || uQiscus.loading.value;
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

  channel.value.badge_url = uSdkImage.data.value?.url || '';
}

const handleSubmit = async () => emit('submit', channel.value);
</script>
