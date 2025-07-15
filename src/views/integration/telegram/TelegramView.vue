<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import Banner from '@/components/common/Banner.vue';
import CollapsibleGroup from '@/components/common/CollapsibleGroup.vue';
import MainTab from '@/components/common/Tabs/MainTab.vue';
import { Button, Switch } from '@/components/common/common';
import { BackIcon, HomeIcon } from '@/components/icons';
import { useDeleteTelegram } from '@/composables/channels/telegram/useDeleteTelegram';
import { useFetchTelegram } from '@/composables/channels/telegram/useFetchTelegram';
import { useUpdateTelegram } from '@/composables/channels/telegram/useUpdateTelegram';
import { useSweetAlert } from '@/composables/useSweetAlert';
import CreateTelegramForm from '@/features/telegram/components/form/CreateTelegramForm.vue';
import AutoResponderForm from '@/features/widget/components/forms/AutoResponderForm.vue';
import type { IAutoResponder, IUpdateTelegramChannel } from '@/types/channels';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const { fetchTelegram, data: telegramData } = useFetchTelegram();
const {
  updateTelegram,
  loading: updateTelegramLoading,
  error: updateTelegramError,
} = useUpdateTelegram();
const { deleteTelegram } = useDeleteTelegram();

const { showAlert } = useSweetAlert();

const currentChannel = computed(() => telegramData.value[0] || null);

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
});
const configs = ref<IAutoResponder>({ ...channel.value.configs });
const isEnableTelegram = ref(false);
const isEnableAutoResponder = ref(false);

const isAutoresponderFormOpen = ref(false);

const items = [
  {
    id: '1',
    title: 'Enable Bot Integration',
    content:
      'Turning on bot integration lets the bot chat smoothly in a room, even if the toggle is off. When you enable this feature, the bot can still send messages, making sure important updates and notifications get through without any breaks.',
    initiallyOpen: true,
  },
  {
    id: '2',
    title: 'Enable Bot On Disable Chat',
    content:
      'Allow bot to send messages when the bot toggle button is disabled in a chat room. If you set the toggle to enabled, you allow sending messages from bot to room even though the bot toggle in the room is disabled.',
  },
];

// --- UI State Change Functions ---
function openAutoResponderForm() {
  isAutoresponderFormOpen.value = true;
}

function closeAutoResponderForm() {
  isAutoresponderFormOpen.value = false;
}
// --- Data Reset Functions ---
function resetChannelData() {
  channel.value = {
    username: '',
    name: '',
    token: '',
    configs: {
      offline_message: '',
      online_message: '',
      send_offline_each_message: false,
      send_online_if_resolved: false,
    },
  };

  isEnableTelegram.value = false;
  // isEnableAutoResponder.value = false;
}

// --- Data Population Functions ---
function populateChannelData() {
  if (currentChannel.value) {
    // Map the fetched telegram data to the channel ref structure
    channel.value = {
      username: currentChannel.value.username || '',
      name: currentChannel.value.username || '', // Use username as name if name is not available
      token: currentChannel.value.bot_token || '',
      configs: {
        offline_message: '',
        online_message: '',
        send_offline_each_message: false,
        send_online_if_resolved: false,
      },
    };

    // Set the integration status based on fetched data
    isEnableTelegram.value = currentChannel.value.is_active || false;
  } else {
    // Reset form values when no channel exists (empty response)
    resetChannelData();
  }
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

function handleDeleteChannel() {
  showAlert
    .warning({
      title: 'Delete Channel',
      text: 'This channel will disappear from the Integration menu if you delete it. In addition, all ongoing conversations associated with this channel will be deleted for all agents',
      confirmButtonText: 'Let me think again',
      cancelButtonText: 'Yes, delete it!',
    })
    .then(async (result: any) => {
      if (result.dismiss === 'cancel') {
        try {
          await deleteTelegram(currentChannel.value?.id);
          showAlert.success({
            title: 'Success',
            text: 'Delete channel has been succeeded.',
            confirmButtonText: 'Okay',
            showCancelButton: false,
          });

          await fetchTelegram();
          populateChannelData();
        } catch (error) {
          console.error('Error deleting channel:', error);
          showAlert.error({
            title: 'Error',
            text: 'Failed to delete channel. Please try again.',
            confirmButtonText: 'Okay',
            showCancelButton: false,
          });
        }
      }
    });
}

async function submitChannelConfiguration() {
  const payload: IUpdateTelegramChannel = {
    name: channel.value.name,
    is_active: isEnableTelegram.value,
  };

  try {
    await updateTelegram(currentChannel.value?.id, payload);

    if (updateTelegramError.value) {
      showAlert.error({
        title: 'Error',
        text: 'Failed to update Telegram. Please try again.',
        confirmButtonText: 'Okay',
        showCancelButton: false,
      });
      return;
    }

    showAlert.success({
      title: 'Success',
      text: 'Telegram has been updated.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  } catch (error) {
    showAlert.error({
      title: 'Error',
      text: 'Failed to update Telegram. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }
}

function toggleTelegramIntegration(status: boolean) {
  console.log('toggle Telegram integration status', status);
  // Here, you would typically make an API call to update the Telegram integration status
}

function toggleAutoResponder(status: boolean) {
  console.log('toggle auto responder status', status);
  // Here, you would typically make an API call to update the auto responder status
}

onMounted(async () => {
  await fetchTelegram();

  // Populate the channel data after fetching
  populateChannelData();
});
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
        <img :src="CHANNEL_BADGE_URL.telegram" alt="Telegram Logo" class="h-6 w-6" width="24" height="24" />
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
              <div class="flex justify-between gap-8 text-sm text-[#565656]">
                <div v-html="item.content"></div>
                <div>
                  <Switch variant="success" v-model="isEnableTelegram" @change="toggleTelegramIntegration"
                    size="medium" />
                </div>
              </div>
            </template>
            <template #item-id-2="{ item }">
              <div class="flex justify-between gap-8 text-sm text-[#565656]">
                {{ item.content }}
                <div>
                  <Switch variant="success" size="medium" v-model="isEnableAutoResponder"
                    @change="toggleAutoResponder" />
                </div>
              </div>
              <Button intent="secondary" class="mt-4" @click="openAutoResponderForm">Set Channel Auto Responder</Button>
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
              <Button intent="danger" @click="handleDeleteChannel">Delete Channel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </template>
      </template>

      <form @submit.prevent="" v-if="isAutoresponderFormOpen">
        <AutoResponderForm v-model="configs" :is-bot="isBot" />

        <div class="mt-8 flex justify-end gap-4">
          <Button intent="secondary" @click="closeAutoResponderForm">Back</Button>
          <Button type="submit" :disabled="updateTelegramLoading">Save Changes</Button>
        </div>
      </form>
    </div>
  </div>
</template>
