<template>
  <div class="flex w-full items-start gap-8 self-stretch p-4 justify-between">
    <div class="flex flex-col w-full gap-8 max-w-[50%]">
      <WidgetFormLayout label="Call to Action">
        <template #additional-info> </template>
  
        <template #inputs>
          <div
            class="border-stroke-regular flex w-full flex-col items-start gap-4 rounded-lg border bg-white p-4">
            <div class="flex w-full items-center justify-between">
              <h3 class="text-text-title text-base font-semibold">With Text</h3>
              <Switch v-model="isWithText" variant="success" />
            </div>
            <div v-if="isWithText" class="flex w-full flex-col items-start gap-4">
              <Divider />
              <Input v-model="text" class="w-full" label="Live Chat Button Text"
                placeholder="Talk to us" />
            </div>
          </div>
  
          <div
            class="border-stroke-regular flex flex-col items-start gap-4 rounded-lg border bg-white p-4">
            <div class="flex w-full items-center justify-between">
              <h3 class="text-text-title text-base font-semibold">Icon on Call to Action</h3>
              <Switch v-model="isWithIcon" variant="success" />
            </div>
            <div v-if="isWithIcon" class="flex w-full flex-col items-start gap-4">
              <Divider />
              <ImageInput label="Icon" id="welcome-dialog-icon"
                tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB."
                :showTips="true" />
            </div>
          </div>
  
          <InputCustom errorMessage="Something went wrong." id="channel-name-input"
            label="Border Radius" v-model="modelValue" placeholder="Try everything!" type="text">
            <template #append-button="{ disabled }">
              <div :class="{ 'cursor-not-allowed opacity-50': disabled }">
                <span>Pixels</span>
              </div>
            </template>
          </InputCustom>
        </template>
      </WidgetFormLayout>
    </div>

    <!-- PREVIEW -->
    <div class="flex p-6">
      <WelcomingPageLoading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Switch from '@/components/common/Switch.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import Divider from '@/components/ui/Divider.vue';
import WelcomingPageLoading from '@/components/ui/widget-preview/WelcomingPageLoading.vue';
import WidgetFormLayout from '@/pages/integration/widget/form/WIdgetFormLayout.vue';

const text = ref('');

const isWithText = ref(true);
const isWithIcon = ref(true);

const modelValue = ref('');
</script>
