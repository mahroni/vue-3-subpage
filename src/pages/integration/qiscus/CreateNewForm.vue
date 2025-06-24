<template>
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
        label="Channel Name"
        placeholder="Enter your channel name here"
      />
    </div>
  </div>

  <!-- Term Section -->
  <div class="shadow-medium flex flex-col items-start justify-center gap-4 rounded-lg bg-white p-6">
    <div class="flex flex-col items-start gap-2">
      <h5 class="text-text-title text-sm font-semibold">Term of condition</h5>
      <p class="text-text-placeholder text-sm">
        By creating a new Qiscus Live Chat, you agree and acknowledge that the Enhance Conversation
        Security feature is automatically enabled. Customers will not be able to see the
        conversation history if they use a different device or browser, and this might impact your
        total Monthly Active Users (MAU). You can disable this feature through the Settings menu on
        each Qiscus Live Chat channel.
      </p>
    </div>

    <div class="bg-surface-highlight flex w-full flex-col items-start gap-3 rounded-lg p-4">
      <p class="text-text-title text-sm font-medium">
        This feature becomes accessible starting from Qiscus Omnichannel iOS v1.2.3, Qiscus
        Omnichannel Android v1.2.3, Qiscus Chat SDK Flutter v1.2.3, and Qiscus Chat SDK React Native
        v1.2.3.
      </p>
    </div>

    <div>
      <Checkbox :disabled="false" label="Agree with the term of condition" v-model="modelValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '@/components/form/Input.vue';
import Checkbox from '@/components/common/Checkbox.vue';
import { ref } from 'vue';

const modelValue = ref(false);
const channelName = ref('');
</script>
