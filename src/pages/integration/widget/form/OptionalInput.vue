<script lang="ts" setup>
import { computed } from 'vue';

import Switch from '@/components/common/Switch.vue';
import Divider from '@/components/ui/Divider.vue';

const props = defineProps<{
  label: string;
  modelValue?: boolean;
  id: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});
</script>

<template>
  <div
    class="bg-surface-primary-white border-stroke-regular flex w-full flex-col gap-4 rounded-lg border p-4"
  >
    <div class="flex w-full items-center justify-between gap-4">
      <label class="text-text-title text-base font-semibold">{{ label }}</label>
      <Switch :id="id" v-model="modelValue" variant="success" />
    </div>
    <Divider v-if="modelValue" />
    <div v-if="modelValue">
      <slot />
    </div>
  </div>
</template>
