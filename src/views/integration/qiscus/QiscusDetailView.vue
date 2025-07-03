<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MainTab from '@/components/common/Tabs/MainTab.vue';
import BackIcon from '@/components/icons/BackIcon.vue';
import WidgetCode from '@/pages/integration/widget/WidgetCode.vue';
import WidgetForm from '@/pages/integration/widget/WidgetForm.vue';
import WidgetLiveChat from '@/pages/integration/widget/WidgetLiveChat.vue';
import WidgetSettings from '@/pages/integration/widget/WidgetSetting.vue';

// Constants
const TAB_NAMES = {
  OVERVIEW: 'Overview',
  LIVE_CHAT_BUILDER: 'Live Chat Builder',
  CODE_INSTALLATION: 'Code Installation',
  SETTINGS: 'Settings',
} as const;

type TabName = (typeof TAB_NAMES)[keyof typeof TAB_NAMES];

const route = useRoute();
const router = useRouter();

// Computed properties
const validTabNames = computed(() => Object.values(TAB_NAMES));

// Initialize activeTab with proper validation
const getInitialTab = (): TabName => {
  const tabFromQuery = route.query.tab as string;
  const isValidTab = validTabNames.value.includes(tabFromQuery as TabName);
  return isValidTab ? (tabFromQuery as TabName) : TAB_NAMES.OVERVIEW;
};

const activeTab = ref<TabName>(getInitialTab());

// URL sync watchers
watch(activeTab, (newTab) => {
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      tab: newTab,
    },
  });
});

watch(
  () => route.query.tab,
  (newTab) => {
    if (typeof newTab === 'string' && validTabNames.value.includes(newTab as TabName)) {
      activeTab.value = newTab as TabName;
    }
  }
);
</script>

<template>
  <div class="text-text-title flex min-h-screen flex-col gap-8 px-12 py-8 text-sm">
    <router-link to="/" class="text-primary flex items-center gap-2 font-semibold">
      <BackIcon :size="20" />
      Integration
    </router-link>

    <div class="flex gap-3">
      <img src="https://omnichannel.qiscus.com/img/qiscus_badge.svg" alt="Qiscus Logo" />
      <h2 class="text-text-title text-xl font-semibold">New Integration - Qiscus Live Chat</h2>
    </div>
    <MainTab :tabs="validTabNames" v-model="activeTab" />

    <div v-if="activeTab === TAB_NAMES.OVERVIEW">
      <WidgetForm />
    </div>
    <div v-if="activeTab === TAB_NAMES.LIVE_CHAT_BUILDER">
      <WidgetLiveChat />
    </div>
    <div v-if="activeTab === TAB_NAMES.CODE_INSTALLATION">
      <WidgetCode />
    </div>
    <div v-if="activeTab === TAB_NAMES.SETTINGS">
      <WidgetSettings />
    </div>
  </div>
</template>
