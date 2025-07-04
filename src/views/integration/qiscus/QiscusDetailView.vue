<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Button from '@/components/common/Button.vue';
import MainTab from '@/components/common/Tabs/MainTab.vue';
import BackIcon from '@/components/icons/BackIcon.vue';
import { useFetchBot } from '@/composables/channels/bot';
import { useFetchQiscusDetail, useUpdateQiscus } from '@/composables/channels/qiscus';
import { useFetchConfig } from '@/composables/channels/useFetchConfigChannel';
import { useUpdateConfig } from '@/composables/channels/useUpdateConfigChannel';
import { useSweetAlert } from '@/composables/useSweetAlert';
import AutoResponderForm from '@/pages/integration/AutoResponderForm.vue';
import WidgetCode from '@/pages/integration/widget/WidgetCode.vue';
import WidgetForm from '@/pages/integration/widget/WidgetForm.vue';
import WidgetLiveChat from '@/pages/integration/widget/WidgetLiveChat.vue';
import WidgetSettings from '@/pages/integration/widget/WidgetSetting.vue';
import type { IWidgetChannel } from '@/types/channels';

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
    queryParam: 'builder',
  },
  {
    label: 'Code Installation',
    component: WidgetCode,
    queryParam: 'code',
  },
  {
    label: 'Settings',
    component: WidgetSettings,
    queryParam: 'settings',
  },
];

const route = useRoute();
const router = useRouter();
const { showAlert } = useSweetAlert();

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

const isBot = ref(false);
const isAutoresponderFormOpen = ref(false);
const channel = reactive<IWidgetChannel>({
  id: '',
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

const { fetchChannelById, data: widget } = useFetchQiscusDetail();
const uConfig = useFetchConfig();
const uBot = useFetchBot();

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

function setData() {
  channel.name = widget.value?.name ?? '';
  channel.badge_url = widget.value?.badge_url ?? '';
  channel.configs = (uConfig.data.value as any) ?? {};
}

const uQiscus = useUpdateQiscus();
async function handleSubmitAutoResponder() {
  const payload: any = { ...channel.configs };

  if (channel.id) {
    await uQiscus.update(channel.id, payload);
  }

  if (uQiscus.error.value) {
    return showAlert.error({
      title: 'Failed',
      text: 'Failed to update Qiscus channel. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  isAutoresponderFormOpen.value = false;
}

function handleCancelAutoResponder() {
  isAutoresponderFormOpen.value = false;
}

function handleOpenAutoResponderForm(isOpen: boolean = true) {
  isAutoresponderFormOpen.value = isOpen;
}

const useConfig = useUpdateConfig();
async function handleChangeAutoResponder(e: boolean) {
  if (!channel.id) return;

  useConfig.update(channel.id as string, {
    ...channel.configs,
    enabled: e,
    source: 'qiscus',
  });

  if (useConfig.error.value) {
    return showAlert.error({
      title: 'Failed',
      text: 'Failed to update auto responder. Please try again.',
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }

  showAlert.success({
    title: 'Success',
    text: 'Auto responder updated successfully.',
    confirmButtonText: 'Okay',
    showCancelButton: false,
  });
}

onMounted(async () => {
  const { id } = route.params;
  if (!id) return;
  // Ensure id is string or number, not array
  channel.id = (Array.isArray(id) ? id[0] : id) as string;
  await fetchChannelById(channel.id);

  await uConfig.fetch(channel.id, 'qiscus');
  await uBot.fetch();
  isBot.value = uBot.data.value?.is_bot_enabled || false;

  // need to set data autoresponder
  // iConfig.data.value.is_enabled

  setData();
});
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

    <div v-if="!isAutoresponderFormOpen" class="flex flex-col gap-8">
      <MainTab :tabs="tabLabels" v-model="activeTab" />

      <div class="mt-4">
        <!-- Dynamic component rendering -->
        <component
          :is="currentTabComponent"
          v-if="currentTabComponent"
          @open-auto-responder-form="handleOpenAutoResponderForm"
          @on-change-auto-responder="handleChangeAutoResponder"
        />
      </div>
    </div>

    <form @submit.prevent="handleSubmitAutoResponder" v-if="isAutoresponderFormOpen">
      <AutoResponderForm v-model="channel.configs" :is-bot="isBot" />

      <div class="mt-8 flex justify-end gap-4">
        <Button intent="secondary" @click="handleCancelAutoResponder">Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  </div>
</template>
