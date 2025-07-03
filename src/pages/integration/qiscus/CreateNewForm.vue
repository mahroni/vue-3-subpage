<template>
  <form @submit.prevent="showConfirm" class="flex flex-col gap-8">
    <div
      class="border-stroke-regular bg-surface-secondary flex flex-col items-start justify-center gap-8 rounded-xl border p-6">
      <p class="text-text-placeholder text-xs font-normal">
        Build your Qiscus Live Chat based on your need using our builder.
      </p>

      <div class="flex w-140 items-center gap-5">
        <ImageInput id="widget-image" v-model="imageUrl" :isUploading="uSdkImage.loading.value" @upload="uploadImage" />
        <div class="flex flex-1 flex-col items-start gap-1">
          <h4 class="text-text-subtitle text-sm font-semibold">Channel Badge Icon</h4>
          <p class="text-text-placeholder text-xs font-normal">
            Upload an image that will be used as your Channel Badge icon. We recommend you to upload
            image 100px x 100px (square image) for better result.
          </p>
        </div>
      </div>

      <div class="w-[552px]">
        <Input v-model="channelName" :disabled="false" :error="false" errorMessage="This field has an error"
          id="default-input" label="Channel Name" placeholder="Enter your channel name here" />
      </div>
    </div>

    <!-- Term Section -->
    <div class="shadow-medium flex flex-col items-start justify-center gap-4 rounded-lg bg-white p-6">
      <div class="flex flex-col items-start gap-2">
        <h5 class="text-text-title text-sm font-semibold">Term of condition</h5>
        <p class="text-text-placeholder text-sm">
          By creating a new Qiscus Live Chat, you agree and acknowledge that the Enhance Conversation
          Security feature is automatically enabled. Customers will not be able to see the
          conversation history if they use a different device or browser, and this might impact your
          total Monthly Active Users (MAU). You can disable this feature through the Settings menu on
          each Qiscus Live Chat channel.
        </p>
      </div>

      <div class="bg-surface-highlight flex w-full flex-col items-start gap-3 rounded-lg p-4">
        <p class="text-text-title text-sm font-medium">
          This feature becomes accessible starting from Qiscus Omnichannel iOS v1.2.3, Qiscus
          Omnichannel Android v1.2.3, Qiscus Chat SDK Flutter v1.2.3, and Qiscus Chat SDK React Native
          v1.2.3.
        </p>
      </div>

      <div>
        <Checkbox label="Agree with the term of condition" v-model="isAgreementToc" />
      </div>
    </div>

    <div class="flex justify-end gap-4">
      <Button intent="secondary" @click="router.back()">Cancel</Button>
      <Button type="submit" :disabled="isDisabled">Save</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import Checkbox from '@/components/common/Checkbox.vue';
import { Button } from '@/components/common/common';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import { useCreateQiscus } from '@/composables/channels/qiscus';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useSweetAlert } from '@/composables/useSweetAlert';
import { useRouter } from 'vue-router';

// declare
const router = useRouter();
const uQiscus = useCreateQiscus()
const uSdkImage = useUploadSdkImage();
const { showAlert } = useSweetAlert();

// state
const isAgreementToc = ref(false);
const channelName = ref('');
const imageUrl = ref<string>('');

// computed
const isDisabled = computed(() => {
  return !channelName.value || !isAgreementToc.value || uQiscus.loading.value;
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

  imageUrl.value = uSdkImage.data.value?.url || '';
}

async function handleSubmit() {
  const payload = {
    name: channelName.value,
    badge_url: imageUrl.value,
    is_active: true,
    is_secure: true,
    is_secure_toc: isAgreementToc.value,
  };

  await uQiscus.create(payload)

  if (uQiscus.error.value) {
    return showAlert.error({
      title: 'Failed',
      text: 'Failed to create Qiscus channel. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  router.push({ name: 'qiscus-detail', params: { id: uQiscus.data.value?.id } });
};

function showConfirm() {
  showAlert.warning({
    title: 'Add Channel Auto Responder',
    text: 'Do you want to set up channel auto <br>responder to this channel?',
    confirmButtonText: 'Add Channel Auto Responder',
    cancelButtonText: 'Setup Later',
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('User chose to add channel auto responder');
    } else {
      handleSubmit();
    }
  });
}
</script>
