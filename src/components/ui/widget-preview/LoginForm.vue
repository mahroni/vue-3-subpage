<script setup lang="ts">
import { QiscusIcon, SignIcon } from '@/components/icons';
import UserIcon from '@/components/icons/UserIcon.vue';

const props = defineProps<{
  title: string;
  subtitle: string;
  description: string;
  buttonText?: string;
}>();
</script>

<template>
  <div
    class="text-navy-500 flex w-[360px] flex-col rounded-4xl bg-white shadow-[0px_8px_32px_0px_#0A0A0A1F]"
  >
    <div class="flex-1 p-8">
      <QiscusIcon :size="32" />
      <div class="mt-6 text-2xl break-words">{{ props.title }}</div>
      <div class="text-2xl font-bold break-words">{{ props.subtitle }}</div>
      <div class="text-md mt-8 break-words">{{ props.description }}</div>

      <div class="mt-8 flex w-full flex-col gap-4">
        <div
          class="flex w-full items-center gap-3 rounded-2xl px-3 py-4 shadow-[0px_4px_12px_0px_#0A0A0A1A]"
        >
          <div class="rounded-lg bg-[#F5F5F5] p-[7px]">
            <UserIcon :size="18" />
          </div>
          <input
            type="text"
            class="w-full outline-none placeholder:text-[#A0A0A0]"
            placeholder="Type your name"
            disabled
          />
        </div>

        <div
          class="flex w-full items-center gap-3 rounded-2xl px-3 py-4 shadow-[0px_4px_12px_0px_#0A0A0A1A]"
        >
          <div class="rounded-lg bg-[#F5F5F5] p-[7px]">
            <SignIcon :size="18" />
          </div>
          <input
            type="text"
            class="w-full outline-none placeholder:text-[#A0A0A0]"
            placeholder="Type your email address"
            disabled
          />
        </div>
      </div>
    </div>

    <div class="px-8 py-3">
      <button
        class="bg-navy-500 w-full rounded-2xl px-3 py-4 text-base font-medium break-words text-white"
      >
        {{ props.buttonText || 'Start Chat' }}
      </button>
    </div>

    <div class="border-t border-gray-300 py-2 text-center text-xs font-medium text-[#0A0A0A]">
      Powered by <span class="text-link-400">Qiscus</span>
    </div>
  </div>
</template>
