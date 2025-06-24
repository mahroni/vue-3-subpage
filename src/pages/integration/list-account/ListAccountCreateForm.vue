<template>
  <div class="flex flex-col gap-8 px-12 py-8">
    <button class="text-primary flex items-center gap-2 font-semibold">
      <Icon name="arrow-left" :size="20" />
      Integration
    </button>

    <!-- Header -->
    <div class="flex items-center gap-2">
      <Icon name="chat" :size="20" />
      <h2 class="text-text-title text-xl font-semibold">Qiscus Live Chat</h2>
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
    <div
      class="border-stroke-regular bg-surface-secondary flex flex-col items-start justify-center gap-8 rounded-xl border p-6"
    >
      <p class="text-text-placeholder text-xs font-normal">
        Build your Qiscus Live Chat based on your need using our builder.
      </p>

      <div class="flex w-140 items-center gap-5">
        <div class="h-20 w-20 bg-slate-400" />
        <div class="flex flex-1 flex-col items-start gap-1">
          <h4 class="text-text-subtitle text-sm font-semibold">Channel Badge Icon</h4>
          <p class="text-text-placeholder text-xs font-normal">
            Upload an image that will be used as your Channel Badge icon. We recommend you to upload
            image 100px x 100px (square image) for better result.
          </p>
        </div>
      </div>

      <div class="w-[552px]">
        <Input
          :disabled="false"
          :error="false"
          errorMessage="This field has an error"
          id="default-input"
          label="Channel Name"
          placeholder="Enter your name here"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue';
import Input from '@/components/form/Input.vue';
</script>
