<script setup lang="ts">
import { SignIcon, QiscusIcon } from '@/components/icons';
import UserIcon from '@/components/icons/UserIcon.vue';

const props = defineProps<{
  title: string;
  subtitle: string;
  description: string;
}>();
</script>

<template>
  <div class="bg-white flex flex-col rounded-4xl shadow-[0px_8px_32px_0px_#0A0A0A1F] text-navy-500 w-[360px]">
    <div class="p-8 flex-1">
      <QiscusIcon :size="32" />
      <div class="mt-6 text-2xl">{{ props.title }}</div>
      <div class="text-2xl font-bold">{{ props.subtitle }}</div>
      <div class="text-md mt-8">{{ props.description }}</div>

      <div class="mt-8 flex flex-col gap-4 w-full">
        <div class="rounded-2xl px-3 py-4 w-full flex items-center gap-3 shadow-[0px_4px_12px_0px_#0A0A0A1A]">
          <div class="bg-[#F5F5F5] rounded-lg p-[7px]">
            <UserIcon :size="18" />
          </div>
          <input type="text" class="w-full outline-none placeholder:text-[#A0A0A0]" placeholder="Type your name"
            disabled />

        </div>

        <div class="rounded-2xl px-3 py-4 w-full flex items-center gap-3 shadow-[0px_4px_12px_0px_#0A0A0A1A]">
          <div class="bg-[#F5F5F5] rounded-lg p-[7px]">
            <SignIcon :size="18" />
          </div>
          <input type="text" class="w-full outline-none placeholder:text-[#A0A0A0]"
            placeholder="Type your email address" disabled />
        </div>
      </div>
    </div>

    <div class="py-3 px-8">
      <button class="w-full rounded-2xl bg-navy-500 text-white py-4 text-base font-medium">Start Chat</button>
    </div>

    <div class="border-t border-gray-300 py-2 font-medium text-center text-xs text-[#0A0A0A]">Powered by <span
        class="text-link-400">Qiscus</span></div>
  </div>
</template>