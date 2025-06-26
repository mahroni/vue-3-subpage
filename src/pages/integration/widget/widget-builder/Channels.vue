<template>
  <div class="flex w-full items-start gap-8 self-stretch">
    <div class="flex w-full flex-1 flex-col">
      <WidgetFormLayout label="Channels" isSwitch v-model="isChannels">
        <!-- <template #additional-info> </template> -->

        <template #inputs>
          <Input
            v-model="previewTitle"
            class="w-full"
            label="Welcome Channel Title"
            placeholder="Ask for Question"
          />

          <Input
            v-model="previewSubtitle"
            class="w-full"
            label="Welcome Channel Subtitle"
            placeholder="In Everythings!"
          />
          <TextArea
            v-model="previewIntroduction"
            id="description"
            label="Channel Introduction"
            placeholder="More personalized chat with us on:"
          />
        </template>
      </WidgetFormLayout>
      <WidgetFormLayout label="Enable Qiscus Live Chat" isSwitch v-model="isQiscusLiveChat">
        <!-- <template #additional-info> </template> -->

        <template #inputs>
          <Input
            v-model="previewLiveChatName"
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

      <div class="w-full p-4">
        <div
          class="border-stroke-regular bg-surface-secondary flex w-full flex-col gap-y-4 rounded-lg border p-6"
        >
          <!-- header channle list -->
          <div class="flex w-full items-center justify-between">
            <h4 class="text-text-title text-base font-semibold">Channel List</h4>
            <Button
              intent="flat"
              size="small"
              class="text-text-disable gap-2 no-underline"
              disableAnimation
            >
              <Icon name="plus" :size="18" class="" />
              <span class="text-xs font-semibold"> Add More Channel </span>
            </Button>
          </div>

          <Divider />

          <!-- channel list -->
          <div class="flex flex-col items-start gap-6">
            <div
              v-for="channel in channelList"
              :key="channel.id"
              class="flex w-full items-center gap-4"
            >
              <div class="flex w-full items-center gap-2">
                <!-- Icon & Name -->
                <div class="flex flex-1 items-center gap-3">
                  <Icon :name="channel.icon" :size="24" class="text-primary" />
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
    </div>

    <!-- Preview Section (new) -->
    <div class="flex flex-1 flex-col items-end gap-4 p-6">
      <ChannelList
        :title="previewTitle"
        :subtitle="previewSubtitle"
        :introduction="previewIntroduction"
        :channels="channelPreviewData"
        :imageUrl="''"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import WidgetFormLayout from '@/pages/integration/widget/form/WIdgetFormLayout.vue';
import Input from '@/components/form/Input.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import TextArea from '@/components/form/TextArea.vue';
import Button from '@/components/common/Button.vue';
import Icon, { type IconName } from '@/components/icons/Icon.vue';
import Divider from '@/components/ui/Divider.vue';
import Switch from '@/components/common/Switch.vue';
import ChannelList from '@/components/ui/widget-preview/ChannelList.vue';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

const isChannels = ref(true);
const isQiscusLiveChat = ref(true);

interface ChannelItem {
  id: number;
  icon: IconName;
  name: string;
  enabled: boolean;
}

const channelList = ref<ChannelItem[]>([
  { id: 1, icon: 'whatsapp', name: 'Whatsapp', enabled: true },
  { id: 2, icon: 'facebook', name: 'Facebook', enabled: false },
  { id: 3, icon: 'line', name: 'Line', enabled: false },
  { id: 4, icon: 'telegram', name: 'Telegram', enabled: false },
  { id: 5, icon: 'instagram', name: 'Instagram', enabled: true },
  { id: 6, icon: 'tiktok', name: 'Tiktok', enabled: true },
]);

// Data untuk preview
const previewTitle = ref('Hello there,');
const previewSubtitle = ref('Welcome to Qiscus!');
const previewIntroduction = ref('More personalized chat with us on:');
const previewLiveChatName = ref('Live Chat');

const channelPreviewData = computed(() => {
  return channelList.value
    .filter((channel) => channel.enabled)
    .map((channel) => ({
      label: channel.name,
      iconUrl: CHANNEL_BADGE_URL[channel.icon as keyof typeof CHANNEL_BADGE_URL] || '',
    }));
});
</script>
