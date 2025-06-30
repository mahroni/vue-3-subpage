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
  <div class="flex w-[360px] flex-col rounded-4xl bg-white shadow-[0px_8px_32px_0px_#0A0A0A1F]">
    <!-- Main Section -->
    <div class="flex flex-col gap-8 p-8">
      <!-- Header Section -->
      <div class="flex flex-col gap-6">
        <ButtonIcon>
          <ChevronLeftIcon :size="24" class="!text-navy-500" />
        </ButtonIcon>

        <div class="text-surface-primary-blue flex flex-col">
          <div class="mt-6 text-2xl">{{ props.title }}</div>
          <div class="text-2xl font-bold">{{ props.subtitle }}</div>
        </div>
      </div>

      <!-- Channel List Section -->
      <div class="flex max-h-[350px] flex-col gap-4 overflow-y-auto">
        <p v-if="props.introduction" class="text-text-title text-sm font-medium">
          {{ props.introduction }}
        </p>

        <!-- Channel List Item -->
        <button
          v-for="action in props.channels"
          :key="action.label"
          class="hover:bg-surface-primary-blue/5 flex cursor-pointer justify-between rounded-xl p-4 shadow-[0px_4px_12px_0px_#0A0A0A1A]"
        >
          <div class="flex items-center gap-2">
            <img
              :src="action.iconUrl"
              alt=""
              class="h-6 w-6"
              width="24"
              height="24"
              v-if="action.iconUrl"
            />
            <ChatIcon :size="24" v-else />
            <div class="text-sm font-medium">{{ action.label }}</div>
          </div>

          <div>
            <ChevronRightIcon :size="24" />
          </div>
        </button>

        <!-- Skeleton Loading -->
        <div
          v-for="i in 2"
          :key="i"
          class="bg-surface-disable h-14 min-h-14 w-full animate-pulse rounded-xl"
        ></div>
      </div>
    </div>

    <!-- Footer Section (Powered by Qiscus) -->
    <div class="border-t border-gray-300 py-2 text-center text-xs font-medium text-[#0A0A0A]">
      Powered by <span class="text-link-400">Qiscus</span>
    </div>
  </div>
</template>
