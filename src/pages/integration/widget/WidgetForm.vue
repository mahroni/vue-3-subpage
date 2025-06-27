<template>
  <div class="flex flex-col gap-8">
    <!-- Banner documentation -->
    <QiscusBannerDoc />
    <div
      class="border-stroke-regular bg-surface-secondary flex flex-col items-start justify-center gap-8 rounded-xl border p-6">
      <p class="text-text-placeholder text-xs font-normal">
        Build your Qiscus Live Chat based on your need using our builder.
      </p>

      <div class="flex items-center gap-5">
        <ImageInput v-model="channelBadge" />
        <div class="border-primary flex h-20 w-20 items-center justify-center rounded-lg border border-dashed">
          <img :src="channelBadge ?? ''" width="68" height="68" alt="Channel Badge " />
        </div>
        <div class="flex flex-1  w-[452px] flex-col items-start gap-1">
          <h4 class="text-text-subtitle text-sm font-semibold">Channel Badge Icon</h4>
          <p class="text-text-placeholder text-xs font-normal">
            Upload an image that will be used as your Channel Badge icon. We recommend you to upload
            image 100px x 100px (square image) for better result.
          </p>
        </div>
      </div>

      <div class="w-[552px]">
        <Input v-model="channelName" :disabled="false" :error="false" errorMessage="This field has an error"
          id="default-input" placeholder="Enter your channel name here" />
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <Button intent="secondary">Cancel</Button>
      <Button @click="onUpdateChannel" :disabled="!channelName || !channelBadge">Save</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQiscusStore } from '@/stores/integration-qiscus';
import Input from '@/components/form/Input.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import QiscusBannerDoc from '@/pages/integration/qiscus/QiscusBannerDoc.vue';
import Button from '@/components/common/Button.vue';

const channelName = ref<string | null>(null);

const route = useRoute();
const channelsStore = useQiscusStore();

const channelBadge = computed(() => channelsStore.detail?.badge_url);

function onUpdateChannel() {
  if (!channelName.value || !channelBadge.value) return;
  channelsStore.updateChannel();
}

onMounted(async () => {
  const chId = route.params.channelId;
  if (!chId) return;
  await channelsStore.fetchDetailChannel(Number(chId));
  channelName.value = channelsStore.detail?.name ?? null;
});
</script>
