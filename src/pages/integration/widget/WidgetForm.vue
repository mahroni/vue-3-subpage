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
        <ImageInput v-model="channelBadge" id="channel-badge" @error="(e) => (errorMessages = e)" />
        <div class="flex flex-1 flex-col items-start gap-1">
          <h4 class="text-text-subtitle text-sm font-semibold">Channel Badge Icon</h4>
          <p class="text-text-placeholder text-xs font-normal">
            Upload an image that will be used as your Channel Badge icon. We recommend you to upload
            image 100px x 100px (square image) for better result.
          </p>
        </div>
      </div>

      <Banner v-if="errorMessages" intent="negative" closeable>
        {{ errorMessages }}
      </Banner>

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
    <div class="flex justify-end gap-4">
      <Button intent="secondary">Cancel</Button>
      <Button @click="onUpdateChannel" :disabled="!channelName || !channelBadge">Save</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import Banner from '@/components/common/Banner.vue';
import Button from '@/components/common/Button.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import QiscusBannerDoc from '@/pages/integration/qiscus/QiscusBannerDoc.vue';
import { useQiscusStore } from '@/stores/integration-qiscus';

const channelName = ref<string>('');
const errorMessages = ref<string>('');

const route = useRoute();
const channelsStore = useQiscusStore();

const channelBadge = computed(() => channelsStore.detail?.badge_url);

function onUpdateChannel() {
  if (!channelName.value || !channelBadge.value) return;
  const params = {
    badge_url: channelBadge.value,
    id: Number(channelsStore.detail?.id),
    name: channelName.value,
  };
  channelsStore.updateChannel(params);
}

onMounted(async () => {
  const chId = route.params.channelId;
  if (!chId) return;
  await channelsStore.fetchDetailChannel(Number(chId));
  channelName.value = channelsStore.detail?.name ?? '';
});
</script>
