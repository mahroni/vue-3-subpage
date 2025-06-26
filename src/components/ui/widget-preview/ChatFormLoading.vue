<script setup lang="ts">
import { ChevronLeftIcon } from '@/components/icons';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import ButtonIcon from '@/components/common/ButtonIcon.vue';

</script>

<template>
  <div class="bg-white flex flex-col rounded-4xl shadow-[0px_8px_32px_0px_#0A0A0A1F] text-navy-500 w-[360px]">
    <div class="p-8">
      <div class="flex gap-3 items-center">
        <ButtonIcon>
          <ChevronLeftIcon :size="24" class="text-navy-500" />
        </ButtonIcon>
        <img :src="CHANNEL_BADGE_URL.qiscus" width="32" height="32" />
        <div class="text-sm font-medium text-[#0A0A0A]">Qiscus Customer Care</div>
      </div>

      <div class="flex flex-col gap-4 mt-8">
        <div class="bg-surface-disable h-4.5 w-37 rounded-full animate-pulse self-center"></div>

        <div
          class="mt-4 rounded-t-[24px] rounded-br-[24px] rounded-bl-[4px] bg-surface-disable animate-pulse p-4 flex flex-col gap-3">
          <div class="flex gap-3">
            <div class="w-6 h-6 rounded-full bg-white"></div>
            <div class="h-6 rounded-full bg-white w-[92px]"></div>
          </div>
          <div class="min-h-6 h-6 rounded-full bg-white w-full"></div>
          <div class="min-h-6 h-6 rounded-full bg-white w-full"></div>

        </div>
      </div>


    </div>

    <div class="py-3 px-8">
      <div class="bg-surface-disable h-[56px] animate-pulse w-full rounded-full"></div>
    </div>

    <div class="border-t border-gray-300 py-2 font-medium text-center text-xs text-[#0A0A0A]">Powered by <span
        class="text-link-400">Qiscus</span></div>
  </div>
</template>