<script setup lang="ts">
import Checkbox from '@/components/common/Checkbox.vue';
import { Banner } from '@/components/common/common';
import TextArea from '@/components/form/TextArea.vue';
import { WarningIcon } from '@/components/icons';
import Divider from '@/components/ui/Divider.vue';
import type { IAutoResponder } from '@/types/channels';
import { computed } from 'vue';


const props = withDefaults(defineProps<{ modelValue: IAutoResponder, isBot: boolean }>(), {
  isBot: false,
  modelValue: () => ({
    offline_message: '',
    online_message: '',
    send_offline_each_message: false,
    send_online_if_resolved: false,
  }),
});

const emit = defineEmits(['update:modelValue']);

const formData = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: IAutoResponder) {

    emit('update:modelValue', newValue);
  }
});

</script>

<template>
  <div class="flex flex-col gap-8">
    <Banner intent="negative" type="outline" v-if="isBot">
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
        <TextArea v-model="formData.online_message" autocomplete="off" :disabled="isBot" />
      </div>

      <div class="flex items-center gap-2 text-sm font-semibold text-[#565656]">
        <Checkbox
          label="Keep sending every time a customer initiates a chat session even though the room has been resolved"
          v-model="formData.send_online_if_resolved" />
      </div>

      <Divider />

      <div class="flex flex-col gap-2">
        <div class="text-sm text-[#565656]">Channel Auto Responder Outside Office Hour</div>

        <div class="text-xs text-[#A0A0A0]">When you set the autoresponder message, it will only be sent once at the
          beginning of each conversation outside office hour.</div>
        <TextArea v-model="formData.offline_message" autocomplete="off" :disabled="isBot" />
      </div>

      <div class="flex items-center gap-2 text-sm font-semibold text-[#565656]">
        <Checkbox label="Sent every time a customer sends a message" v-model="formData.send_offline_each_message" />
      </div>
    </div>
  </div>
</template>
