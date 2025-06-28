<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <button
      @click="router.go(-1)"
      class="text-primary flex cursor-pointer items-center gap-2 font-semibold"
    >
      <Icon name="arrow-left" :size="20" />
      Integration
    </button>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <Icon name="chat" :size="20" />
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

import Icon from '@/components/icons/Icon.vue';
import CreateNewForm from '@/pages/integration/qiscus/CreateNewForm.vue';
import QiscusBannerDoc from '@/pages/integration/qiscus/QiscusBannerDoc.vue';

const router = useRouter();
</script>
