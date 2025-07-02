<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <button @click="router.back()" class="text-primary flex cursor-pointer items-center gap-2 font-semibold">
      <ChevronLeftIcon :size="20" />
      Qiscus Live Chat List
    </button>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <ChatIcon :size="20" />
      <h2 class="text-text-title text-xl font-semibold">New Integration - Qiscus Live Chat</h2>
    </div>

    <!-- banner documentation -->
    <QiscusBannerDoc />

    <!-- Form section -->
    <CreateNewForm />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { ChevronLeftIcon } from '@/components/icons';
import ChatIcon from '@/components/icons/ChatIcon.vue';
import CreateNewForm from '@/pages/integration/qiscus/CreateNewForm.vue';
import QiscusBannerDoc from '@/pages/integration/qiscus/QiscusBannerDoc.vue';

const router = useRouter();
</script>
