<script setup lang="ts">
import { ChatIcon, ChevronRightIcon, QiscusIcon } from '@/components/icons';

interface Props {
  imageUrl: string;
  title: string;
  subtitle: string;
  actions: {
    label: string;
    iconUrl: string;
  }[];
}

const props = withDefaults(defineProps<Props>(), {
  imageUrl: '',
  title: 'Hello there,',
  subtitle: 'Welcome to Qiscus!',
  actions: () => [
    {
      label: 'Ask for Questions',
      iconUrl: '',
    },
  ],
});
</script>

<template>
  <div class="bg-white flex flex-col rounded-4xl shadow-[0px_8px_32px_0px_#0A0A0A1F] text-navy-500 w-[360px]">
    <div class="p-8 flex-1">
      <QiscusIcon :size="32" v-if="!props.imageUrl" />
      <img :src="props.imageUrl" alt="" class="w-8 h-8" width="32" height="32" v-else />
      <div class="mt-6 text-2xl">{{ props.title }}</div>
      <div class="text-2xl font-bold">{{ props.subtitle }}</div>

      <div class="mt-8 flex flex-col gap-2">
        <button v-for="action in props.actions" :key="action.label"
          class="rounded-xl shadow-[0px_4px_12px_0px_#0A0A0A1A] p-4 flex justify-between hover:bg-surface-primary-blue/5 cursor-pointer">
          <div class="flex items-center gap-2">
            <img :src="action.iconUrl" alt="" class="w-6 h-6" width="24" height="24" v-if="action.iconUrl" />
            <ChatIcon :size="24" v-else />
            <div class="text-sm font-medium">{{ action.label }}</div>
          </div>

          <div>
            <ChevronRightIcon :size="24" />
          </div>
        </button>
      </div>
    </div>

    <div class="border-t border-gray-300 py-2 font-medium text-center text-xs text-[#0A0A0A]">Powered by <span
        class="text-link-400">Qiscus</span></div>
  </div>
</template>