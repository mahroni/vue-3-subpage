<template>
  <CollapsibleGroup :items="items">
    <template #item-id-1="{ item }">
      <div class="flex justify-between gap-8">
        {{ item.content }}
        <div>
          <Switch variant="success" size="medium" v-model="isSecure" @change="onToggleAutoResponder" />
        </div>
      </div>
      <Button intent="secondary" class="mt-4" @click="handleOpenAutoResponderForm">Set Channel Auto Responder</Button>
    </template>
    <template #item-id-2="{ item }">
      <div class="flex justify-between gap-8">
        <div v-html="item.content"></div>
        <div>
          <Switch variant="success" @change="onToggleEnhanceConversationSecurity" v-model="isSecure" size="medium" />
        </div>
      </div>
    </template>
  </CollapsibleGroup>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/components/common/Button.vue';
import CollapsibleGroup from '@/components/common/CollapsibleGroup.vue';
import Switch from '@/components/common/Switch.vue';
import { useQiscusStore } from '@/stores/integration-qiscus';

const channelsStore = useQiscusStore();
const items = [
  {
    id: '1',
    title: 'Auto Responder',
    content:
      'Auto Responder is a system that automatically sends messages only to this channel according to the customer service operating hours. Admin can set the auto responder message when services are both during and outside the office hour.',
    initiallyOpen: true,
  },
  {
    id: '2',
    title: 'Enhance Conversation Security',
    content:
      "A new chat room will be created every time a customer uses a different device or browser to send messages to your Live Chat channel. See the <a href='https://documentation.qiscus.com/omnichannel-chat/widget#security-in-qiscus-widget' class='text-link-400' target='_blank' rel='noopener noreferrer'>documentation</a> for more detailed information.",
  },
];


const emit = defineEmits(['openAutoResponderForm', 'onChangeAutoResponder']);

const isSecure = ref(channelsStore.detail?.is_secure ?? false);

const onToggleEnhanceConversationSecurity = (e: boolean) => {
  const params = {
    id: Number(channelsStore.detail?.id),
    is_secure: e,
  };
  channelsStore.updateChannel(params);
};

const onToggleAutoResponder = (e: boolean) => {
  emit('onChangeAutoResponder', e);
};
const handleOpenAutoResponderForm = () => {
  emit('openAutoResponderForm', true);
};
</script>
