<template>
  <div class="flex w-full items-start gap-8 self-stretch justify-between relative">
    <div class="flex flex-col gap-8 w-full flex-1">
      <WidgetFormLayout label="Welcome Dialog" v-model="welcomeDialog" isSwitch>
        <template #inputs>
          <ImageInput label="Brand Icon" id="welcome-dialog-image"
            v-model="welcomeDialogReact.brandIcon" :isUploading="welcomeDialogReact.isUploading"
            @upload="uploadImage">
            <template #tips>
              <div class="text-[#A0A0A0] text-sm font-normal">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or
                PNG format with a maximum size of 2MB.
              </div>
            </template>
          </ImageInput>
          <TextArea v-model="welcomeDialogReact.firstDescription" label="First Description" />
          <TextArea v-model="welcomeDialogReact.secondDescription" label="Second Description" />
          <ImageInput v-model="welcomeDialogActions.iconUrl" label="Icon" id="welcome-dialog-icon">
            <template #tips>
              <div class="text-[#A0A0A0] text-sm font-normal">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or
                PNG format with a maximum size of 2MB.
              </div>
            </template>
          </ImageInput>
          <Input v-model="welcomeDialogActions.label" label="Description" />
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
            <DragDropInput label="Upload Image" accept="image/png,image/jpg" acceptText="PNG or JPG"
              :maxSize="31457280" :maxFiles="1" :isUploading="welcomeDialogReact.isAttentionGrabberUploading" @upload="uploadAttentionGrabberImage"/>
          </OptionalInput>
          <OptionalInput label="Text" v-model="welcomeDialogReact.isAttentionGrabberText">
            <TextArea v-model="welcomeDialogReact.attentionGrabberTextDescription"
              label="Text Description" />
          </OptionalInput>
          <InputCustom v-model="welcomeDialogReact.attentionGrabberAppearDelay"
            label="Appear Delay">
            <template #append-button>
              <div class="text-text-title text-sm font-medium">Seconds</div>
            </template>
          </InputCustom>
        </template>
      </WidgetFormLayout>
    </div>

    <!-- PREVIEW -->
    <div v-if="welcomeDialogReact.isWelcomeDialog" class="flex p-6 flex-1 flex-col items-end sticky top-20 bg-white-100 z-50">
      <WelcomingPage :title="welcomeDialogReact.firstDescription" :subtitle="welcomeDialogReact.secondDescription"
        :imageUrl="welcomeDialogReact.brandIcon" :actions="welcomeDialogReact.actions" />
    </div>

    <div v-else-if="welcomeDialogReact.isAttentionGrabber" class="flex p-6 flex-1 flex-col items-end sticky top-20 bg-white-100 z-50">
      <AttentionGrabber :imageUrl="welcomeDialogReact.isAttentionGrabberImage ? welcomeDialogReact.attentionGrabberImage : ''" :title="welcomeDialogReact.isAttentionGrabberText ? welcomeDialogReact.attentionGrabberTextDescription : ''" />
    </div>

    <div v-else class="flex p-6 flex-1 flex-col items-end sticky top-20 bg-white-100 z-50">
      <WelcomingPageLoading/>
    </div>
  </div>
</template>

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

import AttentionGrabber from '@/components/ui/widget-preview/AttentionGrabber.vue';
import WelcomingPageLoading from '@/components/ui/widget-preview/WelcomingPageLoading.vue';
import OptionalInput from '../form/OptionalInput.vue';
import WidgetFormLayout from '../form/WIdgetFormLayout.vue';

const welcomeDialogActions = reactive(
  {
    label: 'Ask for Questions',
    iconUrl: '',
  },
);

const welcomeDialogReact = reactive({
  isWelcomeDialog: true,
  isAttentionGrabber: false,
  firstDescription: 'Hello There,',
  secondDescription: 'Welcome to Qiscus',
  description: 'Ask for Questions',
  appearDelay: '',
  isMakeAutoExpand: false,
  isAttentionGrabberImage: true,
  isAttentionGrabberText: true,
  attentionGrabberTextDescription: '',
  attentionGrabberAppearDelay: '',
  attentionGrabberImage: '',
  brandIcon: '',
  isUploading: false,
  isAttentionGrabberUploading: false,
  actions: [
    welcomeDialogActions,
  ],
});



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

const uploadAttentionGrabberImage = async (files: File[]) => {
  const file = files[0]; // Take the first file since maxFiles is 1
  if (!file) return;
  
  const formData = new FormData();
  formData.append('file', file);
  welcomeDialogReact.isAttentionGrabberUploading = true;
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    welcomeDialogReact.attentionGrabberImage = data.data.imageUrl;
  } catch (error) {
    console.error(error);
  } finally {
    welcomeDialogReact.isAttentionGrabberUploading = false;
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
