<template>
  <form @submit.prevent="update" class="flex flex-col gap-8">
    <!-- Banner documentation -->
    <QiscusBannerDoc />
    <div
      class="border-stroke-regular bg-surface-secondary flex flex-col items-start justify-center gap-8 rounded-xl border p-6">
      <p class="text-text-placeholder text-xs font-normal">
        Build your Qiscus Live Chat based on your need using our builder.
      </p>

      <div class="flex w-140 items-center gap-5">
        <ImageInput v-model="channel.badge_url" id="channel-badge" @error="(e) => (errorMessages = e)"
          :isUploading="uSdkImage.loading.value" @upload="uploadImage" />
        <div class="flex flex-1 flex-col items-start gap-1">
          <h4 class="text-text-subtitle text-sm font-semibold">Channel Badge Icon</h4>
          <p class="text-text-placeholder text-xs font-normal">
            Upload an image that will be used as your Channel Badge icon. We recommend you to upload
            image 100px x 100px (square image) for better result.
          </p>
        </div>
      </div>

      <Banner v-if="errorMessages" intent="negative" closeable>
        {{ errorMessages }}
      </Banner>

      <div class="w-[552px]">
        <Input label="Channel Name" v-model="channel.name" :disabled="false" :error="false"
          errorMessage="This field has an error" id="default-input" placeholder="Enter your channel name here" />
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <Button intent="secondary" @click="router.back()">Back</Button>
      <Button type="submit" :disabled="isDisabled">Save</Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Banner from '@/components/common/Banner.vue';
import Button from '@/components/common/Button.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import { useFetchBot } from "@/composables/channels/bot/useFetchBot";
import { useFetchQiscusDetail, useUpdateQiscus } from '@/composables/channels/qiscus';
import { useFetchConfig } from '@/composables/channels/useFetchConfigChannel';
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import { useSweetAlert } from '@/composables/useSweetAlert';
import QiscusBannerDoc from '@/pages/integration/qiscus/QiscusBannerDoc.vue';
import { useAppConfigStore } from '@/stores/app-config';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';



const route = useRoute()
const router = useRouter()
const { showAlert } = useSweetAlert()
const { fetchChannelById, data: widget } = useFetchQiscusDetail()
const { update: updateChannel, error, loading } = useUpdateQiscus()
const uConfig = useFetchConfig()
const uBot = useFetchBot()
const { getWidgetConfig } = useQiscusLiveChatStore()
const { appId } = useAppConfigStore()
const uSdkImage = useUploadSdkImage();

const errorMessages = ref<string>('');

const channel = reactive({
  id: '',
  badge_url: '',
  name: '',
});

// computed
const isDisabled = computed(() => !channel.name || !channel.badge_url || loading.value)

async function update() {
  if (!channel.name || !channel.badge_url) return;
  const params = {
    badge_url: channel.badge_url,
    name: channel.name,
  };

  await updateChannel(channel.id, params)

  if (error.value) return showAlert.error({
    title: 'Error',
    text: `Failed to update channel. Please try again.`,
    confirmButtonText: 'Okay',
    showCancelButton: false,
  })

  showAlert.success({
    title: 'Success',
    text: `Update channel successfully`,
    confirmButtonText: 'Okay',
    showCancelButton: false,
  })
}


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

  channel.badge_url = uSdkImage.data.value?.url || '';
}

function setData() {
  channel.name = widget.value?.name ?? ''
  channel.badge_url = widget.value?.badge_url ?? ''
}

onMounted(async () => {
  const { id } = route.params;
  if (!id) return
  // Ensure id is string or number, not array
  channel.id = (Array.isArray(id) ? id[0] : id) as string;
  await fetchChannelById(channel.id)

  // get additional data
  await uConfig.fetch(channel.id, 'qiscus')
  uBot.fetch()

  setData()

  // get widget config
  getWidgetConfig(appId, channel.id)
})
</script>
