<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/components/common/Button.vue';
import Switch from '@/components/common/Switch.vue';
import { ChatIcon } from '@/components/icons';
import Icon from '@/components/icons/Icon.vue';
import Divider from '@/components/ui/Divider.vue';

import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import ModalAddChannel from './ModalAddChannel.vue';

const qiscusLiveChatStore = useQiscusLiveChatStore();
const isModalOpen = ref(false);
</script>

<template>
  <div class="w-full p-4">
    <div
      class="border-stroke-regular bg-surface-secondary flex w-full flex-col gap-y-4 rounded-lg border p-6"
    >
      <!-- header channel list -->
      <div class="flex w-full items-center justify-between">
        <h4 class="text-text-title text-base font-semibold">Channel List</h4>
        <Button
          intent="flat"
          size="small"
          class="text-text-disable gap-2 no-underline"
          disableAnimation
          @click="isModalOpen = true"
        >
          <Icon name="plus" :size="18" class="" />
          <span class="text-xs font-semibold"> Add More Channel </span>
        </Button>
      </div>

      <Divider />

      <!-- channel list -->
      <div class="flex flex-col items-start gap-6">
        <div
          v-for="channel in qiscusLiveChatStore.channelList"
          :key="channel.id"
          class="flex w-full items-center gap-4"
        >
          <div class="flex w-full items-center gap-2">
            <!-- Icon & Name -->
            <div class="flex flex-1 items-center gap-3">
              <img
              :src="CHANNEL_BADGE_URL[channel.icon as keyof typeof CHANNEL_BADGE_URL]"
              alt=""
              class="h-6 w-6"
              width="24"
              height="24"
              v-if="channel.icon"
            />
            <ChatIcon :size="24" v-else />
              <h4 class="text-text-title text-sm font-medium">{{ channel.name }}</h4>
            </div>

            <!-- Status -->
            <Switch v-model="channel.enabled" variant="success" />
            <Button intent="flat" size="small" class="">
              <Icon name="more" :size="24" class="text-icon-black" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Add Channel -->
  <ModalAddChannel v-model="isModalOpen" />
</template>
