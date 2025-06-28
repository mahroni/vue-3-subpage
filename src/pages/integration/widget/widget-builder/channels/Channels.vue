<script setup lang="ts">
import Input from '@/components/form/Input.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import TextArea from '@/components/form/TextArea.vue';

import WidgetFormLayout from '@/pages/integration/widget/form/WIdgetFormLayout.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import PreviewChannels from './components/PreviewChannels.vue';
import ChannelListCard from './components/ChannelListCard.vue';

const qiscusLiveChatStore = useQiscusLiveChatStore();
</script>

<template>
  <div class="flex w-full items-start gap-8 self-stretch">
    <div class="flex w-full flex-1 flex-col">
      <WidgetFormLayout label="Channels" isSwitch v-model="qiscusLiveChatStore.isChannelsEnabled">
        <template #inputs>
          <Input
            v-model="qiscusLiveChatStore.previewTitle"
            class="w-full"
            label="Welcome Channel Title"
            placeholder="Ask for Question"
          />

          <Input
            v-model="qiscusLiveChatStore.previewSubtitle"
            class="w-full"
            label="Welcome Channel Subtitle"
            placeholder="In Everythings!"
          />
          <TextArea
            v-model="qiscusLiveChatStore.previewIntroduction"
            id="description"
            label="Channel Introduction"
            placeholder="More personalized chat with us on:"
          />
        </template>
      </WidgetFormLayout>

      <WidgetFormLayout
        v-if="qiscusLiveChatStore.isChannelsEnabled"
        label="Enable Qiscus Live Chat"
        isSwitch
        v-model="qiscusLiveChatStore.isQiscusLiveChat"
      >
        <template #inputs>
          <Input
            v-model="qiscusLiveChatStore.previewLiveChatName"
            class="w-full"
            label="Live Chat Name"
            placeholder="Live Chat"
          />

          <ImageInput
            label="Icon"
            id="welcome-dialog-icon"
            tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB."
            :showTips="true"
          />
        </template>
      </WidgetFormLayout>

      <ChannelListCard v-if="qiscusLiveChatStore.isChannelsEnabled" />
    </div>

    <!-- Preview Section -->
    <div class="flex flex-1 flex-col items-end gap-4 p-6">
      <PreviewChannels />
    </div>
  </div>
</template>
