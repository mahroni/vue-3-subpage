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
    <MainTab :tabs="tabs" v-model="activeTab" />

    <div v-if="activeTab === 'Overview'">
      <WidgetForm />
    </div>
    <div v-if="activeTab === 'Live Chat Builder'">
      <WidgetLiveChat />
    </div>
    <div v-if="activeTab === 'Code Installation'">
      <WidgetCode />
    </div>
    <div v-if="activeTab === 'Settings'">
      <WidgetSettings />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import MainTab from '@/components/common/Tabs/MainTab.vue';

import BackIcon from '@/components/icons/BackIcon.vue';
import WidgetCode from '@/pages/integration/widget/WidgetCode.vue';
import WidgetForm from '@/pages/integration/widget/WidgetForm.vue';
import WidgetLiveChat from '@/pages/integration/widget/WidgetLiveChat.vue';
import WidgetSettings from '@/pages/integration/widget/WidgetSetting.vue';

const tabs = ['Overview', 'Live Chat Builder', 'Code Installation', 'Settings'];
const activeTab = ref(tabs[0] || 'overview');
</script>
