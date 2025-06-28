<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import Banner from '@/components/common/Banner.vue';
import Input from '@/components/form/Input.vue';
import TextArea from '@/components/form/TextArea.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

const qiscusLiveChatStore = useQiscusLiveChatStore();

const channelName = ref<string>('');
const channelLink = ref<string>('');
const channelBadgeIcon = ref<string>('');

// props
const { modelValue } = defineProps<{
  modelValue: boolean;
}>();

// emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const closeModal = () => {
  emit('update:modelValue', false);
};

const handleAddChannel = () => {
  qiscusLiveChatStore.addChannel({
    icon: channelBadgeIcon.value,
    name: channelName.value,
    enabled: false,
  });
  closeModal();
};
</script>

<template>
  <Modal :isOpen="modelValue" @close="closeModal" width="w-[592px]">
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
          v-model="channelName"
          :disabled="false"
          :error="false"
          errorMessage="This field has an error"
          id="default-input"
          label="Channel Name"
          placeholder="Type your channel name "
        />

        <TextArea
          v-model="channelLink"
          id="description"
          label="Channel Link"
          placeholder="Enter the channel URL (ex: https://ig.me/m/username)"
        />

        <!-- Channel Badge Icon -->
        <div>
          <!-- <label for="channel-badge-icon"> Channel Badge Icon</label> -->
          <div class="flex items-baseline gap-2">
            <ImageInput
              id="channel-badge-icon"
              label="Channel Badge Icon"
              v-model="channelBadgeIcon"
              :showTips="true"
              tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB."
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <Button intent="secondary" size="small" @click="closeModal">Cancel</Button>
      <Button intent="primary" size="small" @click="handleAddChannel">Add Channel</Button>
    </template>
  </Modal>
</template>
