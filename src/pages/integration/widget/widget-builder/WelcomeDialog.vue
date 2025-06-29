<script lang="ts" setup>
import { computed, reactive } from 'vue';

import Banner from '@/components/common/Banner.vue';
import Checkbox from '@/components/common/Checkbox.vue';
import DragDropInput from '@/components/form/DragDropInput.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import TextArea from '@/components/form/TextArea.vue';
import { WarningIcon } from '@/components/icons';
import WelcomingPage from '@/components/ui/widget-preview/WelcomingPage.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import OptionalInput from '../form/OptionalInput.vue';
import WidgetFormLayout from '../form/WIdgetFormLayout.vue';

const welcomeDialogReact = reactive({
  isWelcomeDialog: true,
  isAttentionGrabber: false,
  firstDescription: '',
  secondDescription: '',
  description: '',
  appearDelay: '',
  isMakeAutoExpand: false,
  isAttentionGrabberImage: true,
  isAttentionGrabberText: true,
  attentionGrabberTextDescription: '',
  attentionGrabberAppearDelay: '',
  brandIcon: '',
  isUploading: false,
});

const qiscusLiveChatStore = useQiscusLiveChatStore();

// mock upload image
const uploadImage = async (file: File, revertPreview: () => void) => {
  const formData = new FormData();
  formData.append('file', file);
  welcomeDialogReact.isUploading = true;
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    welcomeDialogReact.brandIcon = data.data.imageUrl;
  } catch (error) {
    console.error(error);
    revertPreview();
  } finally {
    welcomeDialogReact.isUploading = false;
  }
};

const welcomeDialog = computed({
  get: () => welcomeDialogReact.isWelcomeDialog,
  set: (value: boolean) => {
    welcomeDialogReact.isWelcomeDialog = value;
    // If welcome dialog is turned on, turn off attention grabber
    if (value) {
      welcomeDialogReact.isAttentionGrabber = false;
    }
  },
});

const attentionGrabber = computed({
  get: () => welcomeDialogReact.isAttentionGrabber,
  set: (value: boolean) => {
    welcomeDialogReact.isAttentionGrabber = value;
    // If attention grabber is turned on, turn off welcome dialog
    if (value) {
      welcomeDialogReact.isWelcomeDialog = false;
    }
  },
});
</script>

<template>
  <div class="flex w-full items-start gap-8 self-stretch">
    <!-- Form Section -->
    <div class="flex w-full flex-1 flex-col gap-8">
      <WidgetFormLayout label="Welcome Dialog" v-model="welcomeDialog" isSwitch>
        <template #inputs>
          <ImageInput
            label="Brand Icon"
            id="welcome-dialog-image"
            tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB."
            :showTips="true"
            v-model="welcomeDialogReact.brandIcon"
            :isUploading="welcomeDialogReact.isUploading"
            @upload="uploadImage"
          />
          <TextArea v-model="qiscusLiveChatStore.previewTitle" label="Greeting Title" />
          <TextArea v-model="qiscusLiveChatStore.previewSubtitle" label="Welcome Message" />
          <ImageInput
            label="Icon"
            id="welcome-dialog-icon"
            tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB."
            :showTips="true"
          />
          <Input v-model="welcomeDialogReact.description" label="Description" />
          <InputCustom v-model="welcomeDialogReact.appearDelay" label="Appear Delay">
            <template #append-button>
              <div class="text-text-title text-sm font-medium">Seconds</div>
            </template>
          </InputCustom>
          <Checkbox v-model="welcomeDialogReact.isMakeAutoExpand" label="Make Auto Expand" />
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
          <OptionalInput label="Image" v-model="welcomeDialogReact.isAttentionGrabberImage">
            <DragDropInput
              label="Upload Image"
              accept="image/png,image/jpg"
              acceptText="PNG or JPG"
              :maxSize="31457280"
              :maxFiles="5"
            />
          </OptionalInput>
          <OptionalInput label="Text" v-model="welcomeDialogReact.isAttentionGrabberText">
            <TextArea
              v-model="welcomeDialogReact.attentionGrabberTextDescription"
              label="Text Description"
            />
          </OptionalInput>
          <InputCustom
            v-model="welcomeDialogReact.attentionGrabberAppearDelay"
            label="Appear Delay"
          >
            <template #append-button>
              <div class="text-text-title text-sm font-medium">Seconds</div>
            </template>
          </InputCustom>
        </template>
      </WidgetFormLayout>
    </div>

    <!-- Preview Section -->
    <div class="flex flex-1 flex-col items-end gap-4 p-6">
      <WelcomingPage
        :imageUrl="welcomeDialogReact.brandIcon"
        :title="qiscusLiveChatStore.previewTitle"
        :subtitle="qiscusLiveChatStore.previewSubtitle"
        :actions="[
          {
            label: 'Ask for Questions',
            iconUrl: '',
          },
        ]"
      />
    </div>
  </div>
</template>
