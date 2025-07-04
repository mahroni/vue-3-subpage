<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MainTab from '@/components/common/Tabs/MainTab.vue';
import BackIcon from '@/components/icons/BackIcon.vue';
import WidgetCode from '@/pages/integration/widget/WidgetCode.vue';
import WidgetForm from '@/pages/integration/widget/WidgetForm.vue';
import WidgetLiveChat from '@/pages/integration/widget/WidgetLiveChat.vue';
import WidgetSettings from '@/pages/integration/widget/WidgetSetting.vue';

type TabName = string;

interface Tab {
  label: TabName;
  component: any;
  queryParam: string;
}

const tabs: Tab[] = [
  {
    label: 'Overview',
    component: WidgetForm,
    queryParam: 'overview',
  },
  {
    label: 'Live Chat Builder',
    component: WidgetLiveChat,
    queryParam: 'live_chat_builder',
  },
  {
    label: 'Code Installation',
    component: WidgetCode,
    queryParam: 'code_installation',
  },
  {
    label: 'Settings',
    component: WidgetSettings,
    queryParam: 'settings',
  },
];

const route = useRoute();
const router = useRouter();

// Computed properties
const validQueryParams = computed(() => tabs.map((tab) => tab.queryParam));
const tabLabels = computed(() => tabs.map((tab) => tab.label));

const currentTabComponent = computed(() => {
  return tabs.find((tab) => tab.label === activeTab.value)?.component;
});

// Initialize activeTab with proper validation
const getInitialTab = (): TabName => {
  const tabFromQuery = route.query.sub as string;
  const matchedTab = tabs.find((tab) => tab.queryParam === tabFromQuery);
  return matchedTab ? matchedTab.label : 'Overview';
};

const activeTab = ref<TabName>(getInitialTab());

// URL sync watchers
watch(activeTab, (newTab) => {
  const selectedTab = tabs.find((tab) => tab.label === newTab);
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      sub: selectedTab?.queryParam || 'overview',
    },
  });
});

watch(
  () => route.query.sub,
  (newQueryParam) => {
    if (typeof newQueryParam === 'string' && validQueryParams.value.includes(newQueryParam)) {
      const matchedTab = tabs.find((tab) => tab.queryParam === newQueryParam);
      if (matchedTab) {
        activeTab.value = matchedTab.label;
      }
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

    <MainTab :tabs="tabLabels" v-model="activeTab" />

    <div class="mt-4">
      <!-- Dynamic component rendering -->
      <component :is="currentTabComponent" v-if="currentTabComponent" />
    </div>
  </div>
</template>
