<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <button @click="router.back()" class="text-primary flex cursor-pointer items-center gap-2 font-semibold">
      <BackIcon :size="20" />
      Qiscus Live Chat List
    </button>

    <!-- Header -->
    <div class="flex items-center gap-3">
      <img :src="CHANNEL_BADGE_URL.qiscus" alt="Qiscus Logo" class="h-6 w-6" width="24" height="24" />
      <h2 class="text-[#0A0A0A] text-xl font-semibold">New Integration - Qiscus Live Chat</h2>
    </div>

    <!-- Form section -->
    <CreateNewForm />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { BackIcon } from '@/components/icons';
import CreateNewForm from '@/pages/integration/qiscus/CreateNewForm.vue';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const router = useRouter();
</script>
