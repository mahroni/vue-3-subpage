<script lang="ts" setup>
import { type Component, ref } from 'vue';

import RoundedTab from '@/components/common/Tabs/RoundedTab.vue';
import {
  ChatOutlineIcon,
  IntegrationIcon,
  PalleteIcon,
  ServerIcon,
  TableIcon,
  ToggleLeftIcon,
} from '@/components/icons';

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
</script>

<template>
  <div class="bg-white-100 flex w-full flex-col rounded-2xl border-[1px] border-gray-300">
    <div
      class="bg-white-100 sticky top-0 z-50 flex w-full items-center justify-between border-b-[1px] border-gray-300 p-4"
    >
      <RoundedTab :tabs="tabs" v-model="activeTab" />
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
</template>
