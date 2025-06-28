<script setup lang="ts">
import { ref } from 'vue';

import Input from '@/components/form/Input.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import TextArea from '@/components/form/TextArea.vue';
import Button from '@/components/common/Button.vue';
import Icon from '@/components/icons/Icon.vue';
import Divider from '@/components/ui/Divider.vue';
import Switch from '@/components/common/Switch.vue';
import Modal from '@/components/common/Modal.vue';
import Banner from '@/components/common/Banner.vue';
import WidgetFormLayout from '@/pages/integration/widget/form/WIdgetFormLayout.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import PreviewChannels from './components/PreviewChannels.vue';

const isQiscusLiveChat = ref(true);
const isModalOpen = ref(false);

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
        v-model="isQiscusLiveChat"
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

      <div class="w-full p-4" v-if="qiscusLiveChatStore.isChannelsEnabled">
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
            <Modal :isOpen="isModalOpen" @close="isModalOpen = false" width="w-[592px]">
              <template #title> Add Channel</template>
              <template #content>
                <div class="flex flex-col gap-6 pb-6">
                  <Banner :closeable="false" intent="positive" type="solid">
                    <p class="text-text-title text-sm font-medium">
                      To learn more regarding Link Channel, you can check this
                      <a
                        class="text-notification-link underline"
                        href="https://docs.qiscus.com"
                        target="_blank"
                      >
                        Documentation.
                      </a>
                    </p>
                  </Banner>

                  <Input
                    v-model="qiscusLiveChatStore.channelName"
                    :disabled="false"
                    :error="false"
                    errorMessage="This field has an error"
                    id="default-input"
                    label="Channel Name"
                    placeholder="Type your channel name "
                  />

                  <TextArea
                    v-model="qiscusLiveChatStore.channelLink"
                    id="description"
                    label="Channel Link"
                    placeholder="Enter the channel URL (ex: https://ig.me/m/username)"
                  />

                  <div>
                    <!-- <label for="channel-badge-icon"> Channel Badge Icon</label> -->
                    <div class="flex items-baseline gap-2">
                      <ImageInput
                        id="channel-badge-icon"
                        label="Channel Badge Icon"
                        :showTips="true"
                        tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB."
                      />
                    </div>
                  </div>
                </div>
              </template>
              <template #footer>
                <Button intent="secondary" size="small">Cancel</Button>
                <Button @click="isModalOpen = false" size="small">Add Channel</Button>
              </template>
            </Modal>
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

    <!-- Preview Section -->
    <div class="flex flex-1 flex-col items-end gap-4 p-6">
      <PreviewChannels />
    </div>
  </div>
</template>
