<template>
    <div class="flex flex-col gap-4 w-full border-[1px] border-gray-300 rounded-2xl bg-white-100">
        <div class="flex justify-between items-center p-4 border-b-[1px] border-gray-300 w-full">
            <RoundedTab :tabs="tabs" v-model="activeTab" />
        </div>
        <template v-if="activeTab === 'Welcome Dialog'">
            <WelcomeDialog />
        </template>
        <template v-if="activeTab === 'Call to Action'">
            <CallToAction />
        </template>
        <template v-if="activeTab === 'Login Form'">
            <LoginForm />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { type Component, ref } from 'vue';

import RoundedTab from '@/components/common/Tabs/RoundedTab.vue';
import { ChatOutlineIcon, IntegrationIcon, PalleteIcon, ServerIcon, TableIcon, ToggleLeftIcon } from '@/components/icons';
import CallToAction from './widget-builder/CallToAction.vue';
import LoginForm from './widget-builder/LoginForm.vue';
import WelcomeDialog from './widget-builder/WelcomeDialog.vue';

interface Tab {
  label: string;
  icon: Component;
}

const tabs = [
    { label: 'Welcome Dialog', icon: ServerIcon },
    { label: 'Call to Action', icon: ToggleLeftIcon },
    { label: 'Channels', icon: IntegrationIcon },
    { label: 'Login Form', icon: TableIcon},
    { label: 'Chat', icon: ChatOutlineIcon},
    { label: 'Color Scheme', icon: PalleteIcon}
] as Tab[]

const activeTab = ref(tabs[0]?.label || '');
</script>
