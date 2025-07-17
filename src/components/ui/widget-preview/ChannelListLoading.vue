<script setup lang="ts">
import { ChevronRightIcon } from '@/components/icons';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const channels = [
  {
    label: 'Qiscus',
    iconUrl: CHANNEL_BADGE_URL.qiscus,
  },
  {
    label: 'WhatsApp',
    iconUrl: CHANNEL_BADGE_URL.whatsapp,
  },
  {
    label: 'Instagram',
    iconUrl: CHANNEL_BADGE_URL.instagram,
  },
];
</script>

<template>
  <div class="text-navy-500 flex w-[360px] flex-col rounded-4xl bg-white shadow-card-float">
    <div class="flex-1 p-8">
      <div class="flex w-full flex-col gap-3">
        <div class="bg-surface-disable h-4.5 w-37 animate-pulse rounded-full"></div>
        <div class="bg-surface-disable h-4.5 w-full animate-pulse rounded-full"></div>
      </div>

      <div class="mt-8 flex w-full flex-col gap-4">
        <div v-for="channel in channels" :key="channel.label"
          class="flex items-center justify-between rounded-xl p-4 shadow-card">
          <div class="flex flex-1 items-center gap-2">
            <img :src="channel.iconUrl" alt="" class="h-6 w-6" width="24" height="24" />
            <div class="bg-surface-disable h-4.5 w-44 animate-pulse rounded-xl"></div>
          </div>

          <div>
            <ChevronRightIcon :size="24" />
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-300 py-2 text-center text-xs font-medium text-black-700">
      Powered by <span class="text-link-400">Qiscus</span>
    </div>
  </div>
</template>
