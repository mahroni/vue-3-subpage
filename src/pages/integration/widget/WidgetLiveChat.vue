<script lang="ts" setup>
import { type Component, computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import RoundedTab from '@/components/common/Tabs/RoundedTab.vue';
import { Button, Drawer } from '@/components/common/common';
import {
  ChatOutlineIcon,
  IntegrationIcon,
  PalleteIcon,
  ServerIcon,
  TableIcon,
  ToggleLeftIcon,
} from '@/components/icons';
import { useAppConfigStore } from '@/stores/app-config';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import CallToAction from './widget-builder/CallToAction.vue';
import Chat from './widget-builder/Chat.vue';
import LoginForm from './widget-builder/LoginForm.vue';
import WelcomeDialog from './widget-builder/WelcomeDialog.vue';
import Channels from './widget-builder/channels/Channels.vue';
import ColorScheme from './widget-builder/color-scheme/ColorScheme.vue';

// Constants
const TAB_NAMES = {
  WELCOME_DIALOG: 'Welcome Dialog',
  CALL_TO_ACTION: 'Call to Action',
  CHANNELS: 'Channels',
  LOGIN_FORM: 'Login Form',
  CHAT: 'Chat',
  COLOR_SCHEME: 'Color Scheme',
} as const;

type TabName = (typeof TAB_NAMES)[keyof typeof TAB_NAMES];

interface Tab {
  label: TabName;
  icon: Component;
  component: Component;
}

const tabs: Tab[] = [
  { label: TAB_NAMES.WELCOME_DIALOG, icon: ServerIcon, component: WelcomeDialog },
  { label: TAB_NAMES.CALL_TO_ACTION, icon: ToggleLeftIcon, component: CallToAction },
  { label: TAB_NAMES.CHANNELS, icon: IntegrationIcon, component: Channels },
  { label: TAB_NAMES.LOGIN_FORM, icon: TableIcon, component: LoginForm },
  { label: TAB_NAMES.CHAT, icon: ChatOutlineIcon, component: Chat },
  { label: TAB_NAMES.COLOR_SCHEME, icon: PalleteIcon, component: ColorScheme },
];

const route = useRoute();
const router = useRouter();

// Computed properties
const currentTabComponent = computed(() => {
  return tabs.find((tab) => tab.label === activeTab.value)?.component;
});

const validTabNames = computed(() => tabs.map((tab) => tab.label));

// Initialize activeTab with proper validation
const getInitialTab = (): TabName => {
  const tabFromQuery = route.query.subTab as string;
  const isValidTab = validTabNames.value.includes(tabFromQuery as TabName);
  return isValidTab ? (tabFromQuery as TabName) : TAB_NAMES.WELCOME_DIALOG;
};

const activeTab = ref<TabName>(getInitialTab());

// URL sync watchers
watch(activeTab, (newTab) => {
  router.replace({
    query: {
      ...route.query,
      subTab: newTab,
    },
  });
});

watch(
  () => route.query.subTab,
  (newTab) => {
    if (typeof newTab === 'string' && validTabNames.value.includes(newTab as TabName)) {
      activeTab.value = newTab as TabName;
    }
  }
);

// Store integration
const { postWidgetConfig } = useQiscusLiveChatStore();
const { appId } = useAppConfigStore();

// Drawer state
const isDrawerOpen = ref(false);
const isLoading = ref(false);

// Methods with error handling
const saveAndPreview = async () => {
  if (!params.id || !appId) {
    console.error('Missing required parameters');
    return;
  }

  try {
    isLoading.value = true;
    await postWidgetConfig(appId, params.id as string);
    isDrawerOpen.value = true;
  } catch (error) {
    console.error('Failed to save widget configuration:', error);
    // Add user notification here
  } finally {
    isLoading.value = false;
  }
};

// Validate route params
const params = useRoute().params;
if (!params.id) {
  throw new Error('Channel ID is required');
}
</script>

<template>
  <div class="bg-white-100 flex w-full flex-col rounded-2xl border-[1px] border-gray-300">
    <div
      class="bg-white-100 sticky top-0 z-50 flex w-full items-center justify-between border-b-[1px] border-gray-300 p-4"
    >
      <RoundedTab :tabs="tabs" v-model="activeTab" />
      <Button @click="saveAndPreview" :loading="isLoading" :disabled="isLoading">
        Save & Preview
      </Button>
    </div>

    <div class="p-4">
      <!-- Dynamic component rendering -->
      <component :is="currentTabComponent" v-if="currentTabComponent" />
    </div>
  </div>

  <Drawer :isOpen="isDrawerOpen" @close="isDrawerOpen = false">
    <!-- Preview content should come from store/props -->
    <WidgetPreview />
  </Drawer>
</template>
