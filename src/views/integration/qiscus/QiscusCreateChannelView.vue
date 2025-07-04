<script setup lang="ts">
import { useRouter } from 'vue-router';

import { Button } from '@/components/common/common';
import { BackIcon } from '@/components/icons';
import { useCreateQiscus } from '@/composables/channels/qiscus';
import { useSweetAlert } from '@/composables/useSweetAlert';
import AutoResponderForm from '@/pages/integration/AutoResponderForm.vue';
import CreateNewForm from '@/pages/integration/qiscus/CreateNewForm.vue';
import type { IWidgetChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { ref } from 'vue';

const { showAlert } = useSweetAlert();
const router = useRouter();
const uQiscus = useCreateQiscus()

const isBot = ref(false)
const isAutoresponderFormOpen = ref(false);


const channel = ref<IWidgetChannel>({
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
});

function confirmSubmit(payload: any) {
  channel.value = {
    ...channel.value,
    ...payload,
  };

  showAlert.warning({
    title: 'Add Channel Auto Responder',
    text: 'Do you want to set up channel auto <br>responder to this channel?',
    confirmButtonText: 'Add Channel Auto Responder',
    cancelButtonText: 'Setup Later',
  }).then((result) => {
    if (result.isConfirmed) {
      isAutoresponderFormOpen.value = true;
    } else {
      handleSubmit();
    }
  });
}

async function handleSubmit() {
  isAutoresponderFormOpen.value = false;

  const payload: any = { ...channel.value };

  if (payload.configs.offline_message === '' && payload.configs.online_message === '') {
    delete payload.configs;
  }


  await uQiscus.create(payload);

  if (uQiscus.error.value) {
    return showAlert.error({
      title: 'Failed',
      text: 'Failed to create Qiscus channel. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  router.push({ name: 'qiscus-detail', params: { id: uQiscus.data.value?.id } });
}

function handleCancelAutoResponder() {
  isAutoresponderFormOpen.value = false;
}
</script>


<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <button @click="router.back()" class="text-primary flex cursor-pointer items-center gap-2 font-semibold">
      <BackIcon :size="20" />
      Qiscus Live Chat List
    </button>

    <!-- Header -->
    <div class="flex items-center gap-3">
      <img :src="CHANNEL_BADGE_URL.qiscus" alt="Qiscus Logo" class="h-6 w-6" width="24" height="24" />
      <h2 class="text-[#0A0A0A] text-xl font-semibold">New Integration - Qiscus Live Chat</h2>
    </div>

    <!-- Form section -->
    <form @submit.prevent="confirmSubmit" v-if="!isAutoresponderFormOpen">
      <CreateNewForm v-model="channel" />

      <div class="flex justify-end gap-4 mt-8">
        <Button intent="secondary" @click="router.back()">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>

    <form @submit.prevent="handleSubmit" v-if="isAutoresponderFormOpen">
      <AutoResponderForm v-model="channel.configs" :is-bot="isBot" />

      <div class="flex justify-end gap-4 mt-8">
        <Button intent="secondary" @click="handleCancelAutoResponder">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  </div>
</template>
