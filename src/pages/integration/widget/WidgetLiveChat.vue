<template>
    <div class="flex flex-col gap-4 w-full border-[1px] border-gray-300 rounded-2xl bg-white-100">
        <div class="flex justify-between items-center p-4 border-b-[1px] border-gray-300 w-full">
            <RoundedTab :tabs="tabs" v-model="activeTab" />
        </div>
        <template v-if="activeTab === 'Welcome Dialog'">
            <WelcomeDialog />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref, type Component } from 'vue';
import RoundedTab from '../../../components/common/Tabs/RoundedTab.vue';
import ServerIcon from '../../../components/icons/ServerIcon.vue';
import ToggleLeftIcon from '../../../components/icons/ToggleLeftIcon.vue';
import IntegrationIcon from '../../../components/icons/IntegrationIcon.vue';
import WelcomeDialog from './widget-builder/WelcomeDialog.vue';

interface Tab {
    label: string;
    icon: Component;
}

const tabs = [
    { label: 'Welcome Dialog', icon: ServerIcon },
    { label: 'Call to Action', icon: ToggleLeftIcon },
    { label: 'Channels', icon: IntegrationIcon },
] as Tab[]

const activeTab = ref(tabs[0]?.label || '')
</script>