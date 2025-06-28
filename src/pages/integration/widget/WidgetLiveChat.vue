<template>
  <div class="bg-white-100 flex w-full flex-col gap-4 rounded-2xl border-[1px] border-gray-300">
    <div class="flex w-full items-center justify-between border-b-[1px] border-gray-300 p-4">
      <RoundedTab :tabs="tabs" v-model="activeTab" />
    </div>
    <template v-if="activeTab === 'Welcome Dialog'">
      <WelcomeDialog />
    </template>
    <template v-if="activeTab === 'Call to Action'">
      <CallToAction />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Component } from 'vue';
import RoundedTab from '@/components/common/Tabs/RoundedTab.vue';
import ServerIcon from '@/components/icons/ServerIcon.vue';
import ToggleLeftIcon from '@/components/icons/ToggleLeftIcon.vue';
import IntegrationIcon from '@/components/icons/IntegrationIcon.vue';
import WelcomeDialog from './widget-builder/WelcomeDialog.vue';
import CallToAction from './widget-builder/CallToAction.vue';

interface Tab {
  label: string;
  icon: Component;
}

const tabs = [
  { label: 'Welcome Dialog', icon: ServerIcon },
  { label: 'Call to Action', icon: ToggleLeftIcon },
  { label: 'Channels', icon: IntegrationIcon },
] as Tab[];

const activeTab = ref(tabs[0]?.label || '');
</script>
