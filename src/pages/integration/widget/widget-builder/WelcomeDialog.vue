<template>
  <div class="flex w-full items-start justify-between gap-8 self-stretch p-4">
    <div class="flex w-full flex-1 flex-col gap-8">
      <WidgetFormLayout label="Welcome Dialog" v-model="welcomeDialog" isSwitch>
        <template #inputs>
          <ImageInput
            label="Brand Icon"
            id="welcome-dialog-image"
            v-model="qiscusLiveChatStore.brandIconWelcomeDialog"
            :isUploading="isUploadingBrandIcon"
            @upload="uploadImage"
          >
            <template #tips>
              <div class="text-sm font-normal text-[#A0A0A0]">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
          </ImageInput>
          <TextArea v-model="qiscusLiveChatStore.firstDescriptionWelcomeDialog" label="First Description" />
          <TextArea v-model="qiscusLiveChatStore.secondDescriptionWelcomeDialog" label="Second Description" />
          <ImageInput v-model="firstAction.iconUrl" label="Icon" id="welcome-dialog-icon">
            <template #tips>
              <div class="text-sm font-normal text-[#A0A0A0]">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
          </ImageInput>
          <Input v-model="firstAction.label" label="Description" />
          <InputCustom v-model="qiscusLiveChatStore.appearDelayWelcomeDialog" label="Appear Delay">
            <template #append-button>
              <div class="text-text-title text-sm font-medium">Seconds</div>
            </template>
          </InputCustom>
          <Checkbox v-model="qiscusLiveChatStore.isAutoExpandWelcomeDialog" label="Make Auto Expand" />
        </template>
      </WidgetFormLayout>
      <WidgetFormLayout label="Attention Grabber" v-model="attentionGrabber" isSwitch>
        <template #additional-info>
          <Banner intent="warning" type="solid">
            <div class="flex items-center gap-4">
              <WarningIcon :size="24" class="text-negative-400" />
              <span class="text-text-title text-sm font-normal">
                Welcome dialog won't be rendered if attention grabber is active
              </span>
            </div>
          </Banner>
        </template>
        <template #inputs>
          <OptionalInput label="Image" v-model="qiscusLiveChatStore.isAttentionGrabberImage">
            <DragDropInput
              label="Upload Image"
              accept="image/png,image/jpg"
              acceptText="PNG or JPG"
              :maxSize="31457280"
              :maxFiles="1"
              :isUploading="isUploadingAttentionGrabberImage"
              @upload="uploadAttentionGrabberImage"
            />
          </OptionalInput>
          <OptionalInput label="Text" v-model="qiscusLiveChatStore.isAttentionGrabberText">
            <TextArea
              v-model="qiscusLiveChatStore.attentionGrabberTextDescription"
              label="Text Description"
            />
          </OptionalInput>
          <InputCustom
            v-model="qiscusLiveChatStore.attentionGrabberAppearDelay"
            label="Appear Delay"
          >
            <template #append-button>
              <div class="text-text-title text-sm font-medium">Seconds</div>
            </template>
          </InputCustom>
        </template>
      </WidgetFormLayout>
    </div>

    <!-- PREVIEW -->
    <div v-if="qiscusLiveChatStore.isWelcomeDialog" class="flex flex-1 flex-col items-end p-6">
      <WelcomingPage
        :title="qiscusLiveChatStore.firstDescriptionWelcomeDialog"
        :subtitle="qiscusLiveChatStore.secondDescriptionWelcomeDialog"
        :imageUrl="qiscusLiveChatStore.brandIconWelcomeDialog"
        :actions="qiscusLiveChatStore.actionsWelcomeDialog"
      />
    </div>

    <div
      v-else-if="qiscusLiveChatStore.isAttentionGrabber"
      class="flex flex-1 flex-col items-end p-6"
    >
      <AttentionGrabber
        :imageUrl="
          qiscusLiveChatStore.isAttentionGrabberImage ? qiscusLiveChatStore.attentionGrabberImage : ''
        "
        :title="
          qiscusLiveChatStore.isAttentionGrabberText
            ? qiscusLiveChatStore.attentionGrabberTextDescription
            : ''
        "
      />
    </div>

    <div v-else class="flex flex-1 flex-col items-end p-6">
      <WelcomingPageLoading />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import Banner from '@/components/common/Banner.vue';
import Checkbox from '@/components/common/Checkbox.vue';
import DragDropInput from '@/components/form/DragDropInput.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import TextArea from '@/components/form/TextArea.vue';
import { WarningIcon } from '@/components/icons';
import AttentionGrabber from '@/components/ui/widget-preview/AttentionGrabber.vue';
import WelcomingPage from '@/components/ui/widget-preview/WelcomingPage.vue';
import WelcomingPageLoading from '@/components/ui/widget-preview/WelcomingPageLoading.vue';

import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
import OptionalInput from '../form/OptionalInput.vue';
import WidgetFormLayout from '../form/WIdgetFormLayout.vue';

const qiscusLiveChatStore = useQiscusLiveChatStore();
const isUploadingAttentionGrabberImage = ref(false);
const isUploadingBrandIcon = ref(false);

// mock upload image
const uploadImage = async (file: File, revertPreview: () => void) => {
  const formData = new FormData();
  formData.append('file', file);
  isUploadingBrandIcon.value = true;
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    qiscusLiveChatStore.brandIconWelcomeDialog = data.data.imageUrl;
  } catch (error) {
    console.error(error);
    revertPreview();
  } finally {
    isUploadingBrandIcon.value = false;
  }
};

const uploadAttentionGrabberImage = async (files: File[]) => {
  const file = files[0]; // Take the first file since maxFiles is 1
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  isUploadingAttentionGrabberImage.value = true;
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    qiscusLiveChatStore.attentionGrabberImage = data.data.imageUrl;
  } catch (error) {
    console.error(error);
  } finally {
    isUploadingAttentionGrabberImage.value = false;
  }
};

const welcomeDialog = computed({
  get: () => qiscusLiveChatStore.isWelcomeDialog,
  set: (value: boolean) => {
    qiscusLiveChatStore.isWelcomeDialog = value;
    // If welcome dialog is turned on, turn off attention grabber
    if (value) {
      qiscusLiveChatStore.isAttentionGrabber = false;
    }
  },
});

const attentionGrabber = computed({
  get: () => qiscusLiveChatStore.isAttentionGrabber,
  set: (value: boolean) => {
    qiscusLiveChatStore.isAttentionGrabber = value;
    // If attention grabber is turned on, turn off welcome dialog
    if (value) {
      qiscusLiveChatStore.isWelcomeDialog = false;
    }
  },
});

// Ensure first action always exists
const firstAction = computed(() => {
  if (!qiscusLiveChatStore.actionsWelcomeDialog[0]) {
    qiscusLiveChatStore.actionsWelcomeDialog.push({ label: '', iconUrl: '' });
  }
  return qiscusLiveChatStore.actionsWelcomeDialog[0]!;
});
</script>
