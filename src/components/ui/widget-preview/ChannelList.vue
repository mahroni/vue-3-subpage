<script setup lang="ts">
import ButtonIcon from '@/components/common/ButtonIcon.vue';
import { ChatIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

interface Props {
  imageUrl: string;
  title: string;
  subtitle: string;
  introduction: string;
  channels: {
    label: string;
    iconUrl: string;
  }[];
}

const props = withDefaults(defineProps<Props>(), {
  imageUrl: '',
  title: 'Hello there,',
  subtitle: 'Welcome to Qiscus!',
  introduction: 'Welcome to Qiscus!',
  channels: () => [
    {
      label: 'Live Chat',
      iconUrl: CHANNEL_BADGE_URL.qiscus,
    },
  ],
});
</script>

<template>
  <div class="bg-white flex flex-col rounded-4xl shadow-[0px_8px_32px_0px_#0A0A0A1F] text-navy-500 w-[360px]">
    <div class="p-8 flex-1 ">
      <ButtonIcon>
        <ChevronLeftIcon :size="24" class="!text-navy-500" />
      </ButtonIcon>

      <div class="mt-6 text-2xl">{{ props.title }}</div>
      <div class="text-2xl font-bold">{{ props.subtitle }}</div>

      <div class="mt-8 flex flex-col gap-2 overflow-y-auto max-h-[350px]">
        <button v-for="action in props.channels" :key="action.label"
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

        <div v-for="i in 2" :key="i" class="bg-surface-disable min-h-14 h-14 w-full rounded-xl animate-pulse"></div>
      </div>
    </div>

    <div class="border-t border-gray-300 py-2 font-medium text-center text-xs text-[#0A0A0A]">Powered by <span
        class="text-link-400">Qiscus</span></div>
  </div>
</template>