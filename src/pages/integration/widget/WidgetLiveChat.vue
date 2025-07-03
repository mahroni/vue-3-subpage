<script lang="ts" setup>
import { type Component, ref } from 'vue';

import RoundedTab from '@/components/common/Tabs/RoundedTab.vue';
import { Button, Drawer } from '@/components/common/common';
import {
  ChatOutlineIcon,
  CloseIcon,
  IntegrationIcon,
  PalleteIcon,
  ServerIcon,
  TableIcon,
  ToggleLeftIcon,
} from '@/components/icons';
import WelcomingPage from '@/components/ui/widget-preview/WelcomingPage.vue';

import { useAppConfigStore } from '@/stores/app-config';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import { useRoute } from 'vue-router';
import CallToAction from './widget-builder/CallToAction.vue';
import Chat from './widget-builder/Chat.vue';
import LoginForm from './widget-builder/LoginForm.vue';
import WelcomeDialog from './widget-builder/WelcomeDialog.vue';
import Channels from './widget-builder/channels/Channels.vue';
import ColorScheme from './widget-builder/color-scheme/ColorScheme.vue';

interface Tab {
  label: string;
  icon: Component;
}

const tabs = [
  { label: 'Welcome Dialog', icon: ServerIcon },
  { label: 'Call to Action', icon: ToggleLeftIcon },
  { label: 'Channels', icon: IntegrationIcon },
  { label: 'Login Form', icon: TableIcon },
  { label: 'Chat', icon: ChatOutlineIcon },
  { label: 'Color Scheme', icon: PalleteIcon },
] as Tab[];

const activeTab = ref(tabs[0]?.label || '');
const { postWidgetConfig } = useQiscusLiveChatStore();
const { appId } = useAppConfigStore();
const { params } = useRoute();

const isDrawerOpen = ref(false);
const saveAndPreview = async () => {
  await postWidgetConfig(appId, params.id as string);
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>

<template>
  <div class="bg-white-100 flex w-full flex-col rounded-2xl border-[1px] border-gray-300">
    <div
      class="bg-white-100 sticky top-0 z-50 flex w-full items-center justify-between border-b-[1px] border-gray-300 p-4"
    >
      <RoundedTab :tabs="tabs" v-model="activeTab" />
      <Button @click="saveAndPreview">Save & Preview</Button>
    </div>
    <div class="p-4">
      <template v-if="activeTab === 'Welcome Dialog'">
        <WelcomeDialog />
      </template>
      <template v-if="activeTab === 'Call to Action'">
        <CallToAction />
      </template>
      <template v-if="activeTab === 'Channels'">
        <Channels />
      </template>
      <template v-if="activeTab === 'Login Form'">
        <LoginForm />
      </template>
      <template v-if="activeTab === 'Chat'">
        <Chat />
      </template>
      <template v-if="activeTab === 'Color Scheme'">
        <ColorScheme />
      </template>
    </div>
  </div>
  <Drawer :isOpen="isDrawerOpen" @close="isDrawerOpen = false">
    <div class="flex h-full w-full flex-col items-end justify-end gap-4">
      <WelcomingPage
        imageUrl=""
        title="Hello, there,"
        subtitle="Welcome to Qiscus!"
        :actions="[
          {
            label: 'Ask for Questions',
            iconUrl: '',
          },
        ]"
      />

      <div class="bg-surface-primary-blue flex h-16 w-16 items-center justify-center rounded-full">
        <CloseIcon class="text-white-100" />
      </div>
    </div>
  </Drawer>
</template>
