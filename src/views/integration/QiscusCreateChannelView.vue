<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <button class="text-primary flex items-center gap-2 font-semibold">
      <Icon name="arrow-left" :size="20" />
      Integration
    </button>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <Icon name="chat" :size="20" />
      <h2 class="text-text-title text-xl font-semibold">New Integration - Qiscus Live Chat</h2>
    </div>

    <div class="bg-surface-highlight rounded-lg p-4 text-sm font-medium">
      <p>
        To learn more about Qiscus Live Chat Integration, you can refer to this
        <a
          class="text-notification-link font-semibold underline"
          href="https://docs.qiscus.com/docs/live-chat-integration"
          target="_blank"
          >Documentation</a
        >.
      </p>
    </div>

    <!-- Form section -->
    <CreateNewForm />
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue';
import CreateNewForm from '@/pages/integration/qiscus/CreateNewForm.vue';
</script>
