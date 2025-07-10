<script lang="ts" setup>
import Input from '@/components/form/Input.vue';
import { computed } from 'vue';

interface IModel {
  token: string
  username: string
  name: string
}
const props = withDefaults(defineProps<{ modelValue: IModel }>(), {
  modelValue: () => ({
    token: '',
    username: '',
    name: '',
  }),
});

const emit = defineEmits(['update:modelValue']);

const formData = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: IModel) {
    emit('update:modelValue', newValue);
  },
});
</script>

<template>
  <div class="border border-[#ECECEC] rounded-xl bg-[#FAFAFA] p-6">
    <p class="text-xs text-[#A0A0A0] mb-4">Fill in the required credentials below to connect with your Telegram
      Channel.</p>
    <Input id="input-bot-token" v-model="formData.token" label="Bot Token" class="max-w-[472px]"
      placeholder="Insert your bot token" />
  </div>

  <div class="shadow-[0px_4px_12px_0px_#0A0A0A1A] rounded-xl p-6">
    <h3 class="font-semibold text-[#0A0A0A]">Bot Information</h3>
    <p class="text-xs text-[#A0A0A0] mb-4">Your bot profile will shown here</p>

    <div class="flex gap-8">
      <Input id="input-bot-token" label="Bot Username" class="max-w-[472px] flex-1"
        placeholder="This field fills in automatically when you're linked to Telegram." disabled
        v-model="formData.username" />
      <Input id="input-bot-token" label="Bot name" class="max-w-[472px] flex-1"
        placeholder="This field fills in automatically when you're linked to Telegram." disabled
        v-model="formData.name" />
    </div>
  </div>
</template>