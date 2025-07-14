<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Banner from '@/components/common/Banner.vue';
import CollapsibleGroup from '@/components/common/CollapsibleGroup.vue';
import MainTab from '@/components/common/Tabs/MainTab.vue';
import { Button, Switch } from '@/components/common/common';
import { BackIcon, HomeIcon } from '@/components/icons';
import { useCreateQiscus } from '@/composables/channels/qiscus';
import { useSweetAlert } from '@/composables/useSweetAlert';
import CreateTelegramForm from '@/features/telegram/components/form/CreateTelegramForm.vue';
import AutoResponderForm from '@/features/widget/components/forms/AutoResponderForm.vue';
import type { IAutoResponder, IWidgetChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const { showAlert } = useSweetAlert();
const router = useRouter();
const uQiscus = useCreateQiscus();

const activeTab = ref<string>('Overview');
const isBot = ref(false);

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

const telegramData = ref({
  token: '',
  username: '',
  name: '',
});

const configs = ref<IAutoResponder>({ ...channel.value.configs });
const isEnableTelegram = ref(false);
const isEnableAutoResponder = ref(false);

const isAutoresponderFormOpen = ref(false);

const items = [
  {
    id: '1',
    title: 'Enable Telegram Integration',
    content:
      'Enabling Telegram Integration allows the bot to communicate seamlessly in a chat room, even if the feature is turned off. When activated, the bot can still send messages, ensuring that key updates and notifications are delivered without interruption.',
    initiallyOpen: true,
  },
  {
    id: '2',
    title: 'Auto Responder',
    content:
      'Auto Responder is a system that automatically sends messages only to this channel according to the customer service operating hours. Admin can set the auto responder message when services are both during and outside the office hour.',
  },
];

function handleOpenAutoResponderForm() {
  isAutoresponderFormOpen.value = true;
}

function handleCancelAutoResponder() {
  isAutoresponderFormOpen.value = false;
}

function confirmSubmit() {
  showAlert
    .warning({
      title: 'Add Channel Auto Responder',
      text: 'Do you want to set up channel auto <br>responder to this channel?',
      confirmButtonText: 'Add Channel Auto Responder',
      cancelButtonText: 'Setup Later',
    })
    .then((result: any) => {
      console.log('result', result);
      if (result.isConfirmed) {
        isAutoresponderFormOpen.value = true;
      } else if (result.dismiss === 'cancel') {
        handleSubmit();
      }
    });
}

async function handleSubmit() {
  isAutoresponderFormOpen.value = false;

  const payload: any = { ...channel.value };

  // Add fallback for badge_url if empty or null
  if (!payload.badge_url || payload.badge_url.trim() === '') {
    payload.badge_url = CHANNEL_BADGE_URL.qiscus;
  }

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

  router.replace({ name: 'qiscus-detail', params: { id: uQiscus.data.value?.id } });
}
</script>

<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <div class="flex items-center justify-between">
      <router-link to="/" replace class="text-primary flex items-center gap-2 font-semibold">
        <BackIcon :size="20" />
        Integration
      </router-link>

      <router-link to="/" replace class="text-primary flex items-center gap-2 font-semibold">
        <HomeIcon :size="20" />
        Integration
      </router-link>
    </div>

    <div class="mx-auto flex w-11/12 flex-col gap-8">
      <!-- Header -->
      <div class="flex items-center gap-3">
        <img
          :src="CHANNEL_BADGE_URL.qiscus"
          alt="Qiscus Logo"
          class="h-6 w-6"
          width="24"
          height="24"
        />
        <h2 class="text-xl font-semibold text-[#0A0A0A]">New Integration - Qiscus Live Chat</h2>
      </div>

      <Banner>
        <p class="text-sm font-medium text-[#0A0A0A]">
          To integrate the Qiscus Omnichannel Chat with Telegram, you can check this
          <a
            class="text-notification-link font-semibold underline"
            href="https://documentation.qiscus.com/omnichannel-chat/application#telegram"
            target="_blank"
            >Documentation</a
          >.
        </p>
      </Banner>

      <template v-if="!isAutoresponderFormOpen">
        <MainTab :tabs="['Overview', 'Settings']" v-model="activeTab" />

        <template v-if="activeTab == 'Settings'">
          <CollapsibleGroup :items="items">
            <template #item-id-1="{ item }">
              <div class="flex justify-between gap-8 text-sm text-[#565656]">
                <div v-html="item.content"></div>
                <div>
                  <Switch variant="success" v-model="isEnableTelegram" size="medium" />
                </div>
              </div>
            </template>
            <template #item-id-2="{ item }">
              <div class="flex justify-between gap-8 text-sm text-[#565656]">
                {{ item.content }}
                <div>
                  <Switch variant="success" size="medium" v-model="isEnableAutoResponder" />
                </div>
              </div>
              <Button intent="secondary" class="mt-4" @click="handleOpenAutoResponderForm"
                >Set Channel Auto Responder</Button
              >
            </template>
          </CollapsibleGroup>
        </template>

        <template v-if="activeTab == 'Overview'">
          <!-- Form section -->
          <form
            v-if="!isAutoresponderFormOpen"
            @submit.prevent="confirmSubmit"
            class="flex flex-col gap-8"
          >
            <CreateTelegramForm v-model="telegramData" />

            <div class="mt-8 flex justify-end gap-4">
              <!-- <Button intent="secondary" to="/" replace>Back</Button> -->
              <Button type="submit">Next</Button>
            </div>
          </form>
        </template>
      </template>

      <form @submit.prevent="" v-if="isAutoresponderFormOpen">
        <AutoResponderForm v-model="configs" :is-bot="isBot" />

        <div class="mt-8 flex justify-end gap-4">
          <Button intent="secondary" @click="handleCancelAutoResponder">Back</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  </div>
</template>
