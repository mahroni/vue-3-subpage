<template>
  <div class="text-text-title flex min-h-screen flex-col gap-8 px-12 py-8 text-sm">
    <router-link to="/" class="text-primary flex items-center gap-2 font-semibold">
      <ArrowLeftIcon :size="20" />
      Integration
    </router-link>

    <div class="flex gap-3">
      <img src="https://omnichannel.qiscus.com/img/qiscus_badge.svg" alt="Qiscus Logo" />
      <h2 class="text-text-title text-xl font-semibold">New Integration - Qiscus Live Chat</h2>
    </div>
    <MainTab :tabs="tabs" v-model="activeTab" />

    <!-- ini pakai v-if -->
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
import MainTab from '../../../components/common/Tabs/MainTab.vue';
import WidgetForm from './WidgetForm.vue';
import WidgetLiveChat from './WidgetLiveChat.vue';
import WidgetCode from './WidgetCode.vue';
import WidgetSettings from './WidgetSetting.vue';
import { ArrowLeftIcon } from '@/components/icons';

const tabs = ['Overview', 'Live Chat Builder', 'Code Installation', 'Settings'];
const activeTab = ref(tabs[0] || 'overview');
</script>
