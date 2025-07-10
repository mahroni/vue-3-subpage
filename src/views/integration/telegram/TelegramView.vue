<script setup lang="ts">
import Banner from '@/components/common/Banner.vue';
import { Button, Switch } from '@/components/common/common';
import MainTab from '@/components/common/Tabs/MainTab.vue';
import { BackIcon, HomeIcon } from '@/components/icons';
import AutoResponderForm from '@/features/widget/components/forms/AutoResponderForm.vue';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { onMounted, ref } from 'vue';
import CreateTelegramForm from '@/features/telegram/components/form/CreateTelegramForm.vue';
import CollapsibleGroup from '@/components/common/CollapsibleGroup.vue';
import type { IAutoResponder } from '@/types/channels';
import { useSweetAlert } from '@/composables/useSweetAlert';

const { showAlert } = useSweetAlert();

const activeTab = ref<string>('Overview');
const isBot = ref(false);
const channel = ref({
  username: '',
  name: '',
  token: '',
  configs: {
    offline_message: '',
    online_message: '',
    send_offline_each_message: false,
    send_online_if_resolved: false,
  },
})
const configs = ref<IAutoResponder>({ ...channel.value.configs })
const isEnableTelegram = ref(false)
const isEnableAutoResponder = ref(false)

const isAutoresponderFormOpen = ref(false);

const items = [
  {
    id: '1',
    title: 'Enable Telegram Integration',
    content:
      "Enabling Telegram Integration allows the bot to communicate seamlessly in a chat room, even if the feature is turned off. When activated, the bot can still send messages, ensuring that key updates and notifications are delivered without interruption.",
    initiallyOpen: true,
  },
  {
    id: '2',
    title: 'Auto Responder',
    content:
      'Auto Responder is a system that automatically sends messages only to this channel according to the customer service operating hours. Admin can set the auto responder message when services are both during and outside the office hour.',
  },
]

// --- UI State Change Functions ---
function openAutoResponderForm() {
  isAutoresponderFormOpen.value = true;
}

function closeAutoResponderForm() {
  isAutoresponderFormOpen.value = false;
}

// --- Composable / API Interaction Functions ---
function initiateChannelSetupConfirmation() {
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
        openAutoResponderForm(); // Call UI state change function
      } else if (result.dismiss === 'cancel') {
        submitChannelConfiguration(); // Call API interaction function
      }
    });
}

function submitChannelConfiguration() {
  // This is where you'd typically make an API call to save the channel data.
  // For now, it just shows a success message.
  return showAlert.success({
    title: 'Success',
    text: 'Failed to create Telegram channel. Please try again.', // Consider changing this text for a success message
    confirmButtonText: 'Okay',
    showCancelButton: false,
  });
}

function toggleTelegramIntegration(status: boolean) {
  console.log('toggle Telegram integration status', status);
  // Here, you would typically make an API call to update the Telegram integration status
}

function toggleAutoResponder(status: boolean) {
  console.log('toggle auto responder status', status);
  // Here, you would typically make an API call to update the auto responder status
}

onMounted(() => {
  // fetched
})
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
      <div class="flex items-center gap-3">
        <img :src="CHANNEL_BADGE_URL.telegram" alt="Qiscus Logo" class="h-6 w-6" width="24" height="24" />
        <h2 class="text-xl font-semibold text-[#0A0A0A]">Telegram</h2>
      </div>

      <Banner>
        <p class="text-sm font-medium text-[#0A0A0A]">
          To integrate the Qiscus Omnichannel Chat with Telegram, you can check this
          <a class="text-notification-link font-semibold underline"
            href="https://documentation.qiscus.com/omnichannel-chat/application#telegram"
            target="_blank">Documentation</a>.
        </p>
      </Banner>

      <template v-if="!isAutoresponderFormOpen">
        <MainTab :tabs="['Overview', 'Settings']" v-model="activeTab" />

        <template v-if="activeTab == 'Settings'">
          <CollapsibleGroup :items="items">
            <template #item-id-1="{ item }">
              <div class="flex justify-between gap-8 text-[#565656] text-sm">
                <div v-html="item.content"></div>
                <div>
                  <Switch variant="success" v-model="isEnableTelegram" @change="toggleTelegramIntegration"
                    size="medium" />
                </div>
              </div>
            </template>
            <template #item-id-2="{ item }">
              <div class="flex justify-between gap-8 text-[#565656] text-sm">
                {{ item.content }}
                <div>
                  <Switch variant="success" size="medium" v-model="isEnableAutoResponder"
                    @change="toggleAutoResponder" />
                </div>
              </div>
              <Button intent="secondary" class="mt-4" @click="openAutoResponderForm">Set Channel Auto
                Responder</Button>
            </template>
          </CollapsibleGroup>
        </template>

        <template v-if="activeTab == 'Overview'">
          <form v-if="!isAutoresponderFormOpen" @submit.prevent="initiateChannelSetupConfirmation"
            class="flex flex-col gap-8">
            <CreateTelegramForm v-model="channel" />

            <div class="mt-8 flex justify-end gap-4">
              <Button type="submit">Next</Button>
            </div>

            <div class="mt-8 flex justify-between">
              <Button intent="danger">Delete Channel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </template>
      </template>


      <form @submit.prevent="" v-if="isAutoresponderFormOpen">
        <AutoResponderForm v-model="configs" :is-bot="isBot" />

        <div class="mt-8 flex justify-end gap-4">
          <Button intent="secondary" @click="closeAutoResponderForm">Back</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  </div>
</template>