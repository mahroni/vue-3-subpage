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
  <div class="bg-white flex flex-col rounded-4xl shadow-[0px_8px_32px_0px_#0A0A0A1F] text-navy-500 w-[360px]">
    <div class="p-8 flex-1">
      <div class="flex w-full flex-col gap-3">
        <div class="bg-surface-disable h-4.5 w-37 rounded-full animate-pulse"></div>
        <div class="bg-surface-disable h-4.5 w-full rounded-full animate-pulse"></div>
      </div>

      <div class="flex w-full flex-col gap-4 mt-8">
        <div v-for="channel in channels" :key="channel.label"
          class="rounded-xl shadow-[0px_4px_12px_0px_#0A0A0A1A] p-4 flex justify-between   items-center">
          <div class="flex items-center gap-2 flex-1">
            <img :src="channel.iconUrl" alt="" class="w-6 h-6" width="24" height="24" />
            <div class="bg-surface-disable h-4.5 w-44 rounded-xl animate-pulse"></div>
          </div>

          <div>
            <ChevronRightIcon :size="24" />
          </div>
        </div>
      </div>

    </div>
    <div class="border-t border-gray-300 py-2 font-medium text-center text-xs text-[#0A0A0A]">Powered by <span
        class="text-link-400">Qiscus</span></div>
  </div>
</template>