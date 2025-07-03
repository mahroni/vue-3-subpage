<template>
  <form class="flex flex-col gap-8" @submit.prevent="handleSubmit">
    <Banner intent="negative" type="outline" v-if="!isBotEnabled">
      <div class="flex items-center gap-3">
        <WarningIcon :size="24" class="text-[#EB5757]" />
        <div class="text-sm text-[#0A0A0A]">Auto Responder is not working if the chatbot setting is enabled.</div>
      </div>
    </Banner>

    <Banner intent="positive">
      <div class="flex flex-col gap-[20px] text-sm">
        <div>
          <strong>Channel Auto Responder</strong> allows system to reply messages received in this
          channel according to operating hours. Admin can set the autoresponder message when
          services are both in the during and outside the office hour.
        </div>
        <div>
          To set the office hour, please go to the settings menu in the <strong>General - Office Hour
            section.</strong>
        </div>
      </div>
    </Banner>

    <div class="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_#0A0A0A1A] flex flex-col gap-6">
      <h2 class="font-semibold">Channel Auto Responder <span class="text-[#A0A0A0] font-medium">(Optional)</span>
      </h2>

      <Banner intent="positive">
        <div class="text-sm">
          Note: If you activate this autoresponder then the autoresponder setting on the <strong>Settings - General
            page</strong> will not be active.
        </div>
      </Banner>

      <div class="flex flex-col gap-2">
        <div class="text-sm text-[#565656]">Channel Auto Responder During Office Hour</div>

        <div class="text-xs text-[#A0A0A0]">When you set the autoresponder message, it will only be sent once at the
          beginning of each conversation outside office hour.</div>
        <TextArea v-model="config.online_message" autocomplete="off" :disabled="isBotEnabled" />
      </div>

      <div class="flex items-center gap-2 text-sm font-semibold text-[#565656]">
        <Checkbox
          label="Keep sending every time a customer initiates a chat session even though the room has been resolved"
          v-model="config.send_online_each_message" />
      </div>

      <Divider />

      <div class="flex flex-col gap-2">
        <div class="text-sm text-[#565656]">Channel Auto Responder Outside Office Hour</div>

        <div class="text-xs text-[#A0A0A0]">When you set the autoresponder message, it will only be sent once at the
          beginning of each conversation outside office hour.</div>
        <TextArea v-model="config.offline_message" autocomplete="off" :disabled="isBotEnabled" />
      </div>

      <div class="flex items-center gap-2 text-sm font-semibold text-[#565656]">
        <Checkbox label="Sent every time a customer sends a message" v-model="config.send_offline_each_message" />
      </div>

    </div>

    <div class="flex justify-end gap-4 mt-8">
      <Button intent="secondary" @click="emit('cancel')">Cancel</Button>
      <Button type="submit">Save</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import Checkbox from '@/components/common/Checkbox.vue';
import { Banner, Button } from '@/components/common/common';
import TextArea from '@/components/form/TextArea.vue';
import { WarningIcon } from '@/components/icons';
import Divider from '@/components/ui/Divider.vue';
import { reactive, ref } from 'vue';

const emit = defineEmits(['submit', 'cancel']);

const isBotEnabled = ref(true);

const config = reactive({
  offline_message: '',
  online_message: '',
  send_offline_each_message: false,
  send_online_each_message: false,
});

function handleSubmit() {
  console.log('Submitting Auto Responder Config:', config);
  // emit('submit', config.value);
}
</script>
