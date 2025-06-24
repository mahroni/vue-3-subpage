<template>
  <div class="flex flex-col gap-8">
    <!-- Banner documentation -->
    <QiscusBannerDoc />
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
          v-model="channelName"
          :disabled="false"
          :error="false"
          errorMessage="This field has an error"
          id="default-input"
          placeholder="Enter your channel name here"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/form/Input.vue';
import QiscusBannerDoc from '@/pages/integration/qiscus/QiscusBannerDoc.vue';

const channelName = ref('');
</script>
