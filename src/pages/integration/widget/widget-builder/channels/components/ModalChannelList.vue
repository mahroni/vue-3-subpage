<script setup lang="ts">
import { ref, watch } from 'vue';

import Banner from '@/components/common/Banner.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import TextArea from '@/components/form/TextArea.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

const qiscusLiveChatStore = useQiscusLiveChatStore();

const channelName = ref<string>('');
const channelLink = ref<string>('');
const channelBadgeIcon = ref<string>('');

// props
const { modelValue, editingChannel } = defineProps<{
  modelValue: boolean;
  editingChannel?: any;
}>();

// emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

// Watch for editing channel changes
watch(
  () => editingChannel,
  (newChannel) => {
    if (newChannel) {
      channelName.value = newChannel.name || '';
      channelLink.value = newChannel.link || '';
      channelBadgeIcon.value = newChannel.icon || '';
    } else {
      // Reset form when not editing
      channelName.value = '';
      channelLink.value = '';
      channelBadgeIcon.value = '';
    }
  },
  { immediate: true }
);

const closeModal = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleAddChannel = () => {
  if (editingChannel) {
    // Update existing channel
    qiscusLiveChatStore.updateChannel(editingChannel.id, {
      icon: channelBadgeIcon.value,
      name: channelName.value,
      link: channelLink.value,
    });
  } else {
    // Add new channel
    qiscusLiveChatStore.addChannel({
      icon: channelBadgeIcon.value,
      name: channelName.value,
      enabled: false,
      link: channelLink.value,
    });
  }
  closeModal();
};
</script>

<template>
  <Modal :isOpen="modelValue" @close="closeModal" width="w-[592px]">
    <template #title>{{ editingChannel ? 'Edit Channel' : 'Add Channel' }}</template>
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
      <Button intent="primary" size="small" @click="handleAddChannel">
        {{ editingChannel ? 'Update Channel' : 'Add Channel' }}
      </Button>
    </template>
  </Modal>
</template>
