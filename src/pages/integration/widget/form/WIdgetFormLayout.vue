<template>
  <div class="flex w-full flex-col gap-4 rounded-2xl border-[1px] border-gray-300 bg-gray-200 p-6">
    <div class="flex w-full items-center justify-between gap-2">
      <label class="text-text-subtitle text-base font-semibold">{{ label }}</label>
      <Switch v-if="isSwitch" size="large" v-model="modelValue" variant="success" />
    </div>
    <Divider v-if="modelValue || $slots['additional-info']" />
    <slot name="additional-info" />
    <div class="flex flex-col gap-6" v-if="modelValue || !isSwitch">
      <slot name="inputs" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import Switch from '@/components/common/Switch.vue';
import Divider from '@/components/ui/Divider.vue';

const props = defineProps<{
  label: string;
  modelValue?: boolean;
  isSwitch?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});
</script>
