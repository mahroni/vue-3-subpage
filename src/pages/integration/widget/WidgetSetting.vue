<template>
  <CollapsibleGroup :items="items">
    <template #item-id-1="{ item }">
      <div class="flex justify-between mb-4 gap-8">
        {{ item.content }}
        <Switch size="medium" />
      </div>
      <Button intent="secondary">Set Channel Auto Responder</Button>
    </template>
    <template #item-id-2="{ item }">
      <div class="flex justify-between mb-4 gap-8">
        <div v-html="item.content"></div>
        <Switch @click="onToggleEnhanceConversationSecurity" v-model="isSecure" size="medium" />
      </div>
    </template>
  </CollapsibleGroup>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQiscusStore } from '@/stores/integration-qiscus';
import CollapsibleGroup from "@/components/common/CollapsibleGroup.vue";
import Button from "@/components/common/Button.vue";
import Switch from "@/components/common/Switch.vue";

const channelsStore = useQiscusStore();
const items = [
  {
    id: "1",
    title: "Auto Responder",
    content:
      "Auto Responder is a system that automatically sends messages only to this channel according to the customer service operating hours. Admin can set the auto responder message when services are both during and outside the office hour.",
    initiallyOpen: true,
  },
  {
    id: "2",
    title: "Enhance Conversation Security",
    content:
      "A new chat room will be created every time a customer uses a different device or browser to send messages to your Live Chat channel. See the <a href='https://documentation.qiscus.com/omnichannel-chat/widget#security-in-qiscus-widget' class='text-link-400' target='_blank' rel='noopener noreferrer'>documentation</a> for more detailed information.",
  },
];

const isSecure = ref(channelsStore.detail?.is_secure ?? false);

const onToggleEnhanceConversationSecurity = () => {
  if (!channelsStore.detail) return;
  isSecure.value = !isSecure.value;
  channelsStore.detail.is_secure = isSecure.value;
  channelsStore.updateChannel();
};
</script>
