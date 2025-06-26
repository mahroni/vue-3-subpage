<template>
  <div class="flex w-full items-start gap-8 self-stretch">
    <div class="flex w-full flex-1 flex-col">
      <WidgetFormLayout label="Channels" isSwitch v-model="isChannels">
        <!-- <template #additional-info> </template> -->

        <template #inputs>
          <Input
            v-model="text"
            class="w-full"
            label="Welcome Channel Title"
            placeholder="Ask for Question"
          />

          <Input
            v-model="text"
            class="w-full"
            label="Welcome Channel Subtitle"
            placeholder="In Everythings!"
          />
          <TextArea
            v-model="text"
            id="description"
            label="Channle Introduction"
            placeholder="More personalized chat with us on:"
          />
        </template>
      </WidgetFormLayout>
      <WidgetFormLayout label="Enable Qiscus Live Chat" isSwitch v-model="isQiscusLiveChat">
        <!-- <template #additional-info> </template> -->

        <template #inputs>
          <Input v-model="text" class="w-full" label="Live Chat Name" placeholder="Live Chat" />

          <ImageInput
            label="Icon"
            id="welcome-dialog-icon"
            tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB."
            :showTips="true"
          />
        </template>
      </WidgetFormLayout>

      <div class="flex w-full flex-1 flex-col items-start p-4">
        <div class="border-stroke-regular bg-surface-secondary w-full gap-8 rounded-lg border p-6">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WidgetFormLayout from '@/pages/integration/widget/form/WIdgetFormLayout.vue';
import Input from '@/components/form/Input.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import TextArea from '@/components/form/TextArea.vue';
import Button from '@/components/common/Button.vue';
import Icon from '@/components/icons/Icon.vue';
import Divider from '@/components/ui/Divider.vue';

const isChannels = ref(true);
const isQiscusLiveChat = ref(true);

const text = ref('');
</script>
