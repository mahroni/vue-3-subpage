<script setup lang="ts">
import { ref } from 'vue';

import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import TextArea from '@/components/form/TextArea.vue';
import WidgetFormLayout from '@/pages/integration/widget/form/WIdgetFormLayout.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import ChannelListCard from './components/ChannelListCard.vue';
import PreviewChannels from './components/PreviewChannels.vue';

const qiscusLiveChatStore = useQiscusLiveChatStore();
const isUploadingChannelBadge = ref(false);

const uploadImage = async (file: File, revertPreview: () => void) => {
  console.log(file, revertPreview);
};
</script>

<template>
  <div class="flex w-full items-start gap-8 self-stretch">
    <!-- Form Section -->
    <div class="flex w-full flex-1 flex-col gap-8">
      <WidgetFormLayout label="Channels" isSwitch v-model="qiscusLiveChatStore.isChannelsEnabled">
        <template #inputs>
          <Input
            v-model="qiscusLiveChatStore.previewTitle"
            class="w-full"
            label="Welcome Channel Title"
            placeholder="Ask for Question"
            :inputAttrs="{ maxlength: 50 }"
          />

          <Input
            v-model="qiscusLiveChatStore.previewSubtitle"
            class="w-full"
            label="Welcome Channel Subtitle"
            placeholder="In Everythings!"
            :inputAttrs="{ maxlength: 50 }"
          />
          <TextArea
            v-model="qiscusLiveChatStore.previewIntroduction"
            id="description"
            label="Channel Introduction"
            placeholder="More personalized chat with us on:"
            :textareaAttrs="{ maxlength: 50 }"
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
            :inputAttrs="{ maxlength: 50 }"
          />

          <ImageInput
            label="Live Chat Badge"
            id="live-chat-badge"
            v-model="qiscusLiveChatStore.channelBadgeIcon"
            :isUploading="isUploadingChannelBadge"
            @upload="uploadImage"
          >
            <template #tips>
              <div class="text-sm font-normal text-[#A0A0A0]">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
          </ImageInput>
        </template>
      </WidgetFormLayout>

      <ChannelListCard v-if="qiscusLiveChatStore.isChannelsEnabled" />
    </div>

    <!-- Preview Section -->
    <div class="sticky top-20 z-10 flex flex-1 flex-col items-end gap-4 p-6">
      <PreviewChannels />
    </div>
  </div>
</template>
